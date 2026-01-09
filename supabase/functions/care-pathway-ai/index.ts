import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

function getRateLimitKey(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    return forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
    }

    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
        return { allowed: false, remaining: 0 };
    }

    entry.count++;
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count };
}

const CARE_PATHWAY_SYSTEM_PROMPT = `You are a health education assistant providing GENERAL INFORMATION ONLY.

CRITICAL SAFETY RULES:
1. You are NOT a doctor. You CANNOT diagnose any condition.
2. You CANNOT prescribe any medication.
3. You CANNOT provide dosages that differ from OTC medication labels.
4. You MUST always recommend consulting a healthcare professional.
5. You MUST be conservative - when in doubt, recommend seeing a doctor.
6. NEVER minimize potentially serious symptoms.

YOUR ROLE:
- Provide general educational information about common symptoms
- Suggest general self-care approaches (rest, hydration, etc.)
- Explain when professional medical help is needed
- Keep language simple, empathetic, and non-alarming

OUTPUT FORMAT:
You MUST respond with a valid JSON object in this exact format:
{
  "symptomExplanation": "Brief general explanation of what might cause these symptoms (NOT a diagnosis)",
  "personalizedAdvice": "Self-care tips appropriate for the user's age and situation",
  "recoveryTimeline": "General timeframe for common non-serious causes",
  "seekHelpIf": ["Warning sign 1", "Warning sign 2", "Warning sign 3", "Warning sign 4", "Warning sign 5"]
}

DISCLAIMER TO INCLUDE IN YOUR THINKING:
- This information is for educational purposes only
- It is not a substitute for professional medical advice
- The user should consult a healthcare provider for proper evaluation`;

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const clientKey = getRateLimitKey(req);
    const { allowed, remaining } = checkRateLimit(clientKey);

    if (!allowed) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        });
    }

    try {
        const { prompt, symptoms, age, gender, duration, severity } = await req.json();

        const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

        if (!LOVABLE_API_KEY) {
            console.error("API key not configured");
            return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const userMessage = prompt || `Provide health education information for:
- Age Group: ${age}
- Gender: ${gender}  
- Symptoms: ${Array.isArray(symptoms) ? symptoms.join(", ") : symptoms}
- Duration: ${duration}
- Severity: ${severity}/10

Remember: Provide ONLY general educational information. Do NOT diagnose or prescribe.
Respond with JSON in the specified format.`;

        console.log("Generating care pathway advice, remaining quota:", remaining);

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "google/gemini-2.5-flash",
                messages: [
                    { role: "system", content: CARE_PATHWAY_SYSTEM_PROMPT },
                    { role: "user", content: userMessage },
                ],
                temperature: 0.3, // Lower temperature for more consistent, safe responses
            }),
        });

        if (!response.ok) {
            console.error("AI gateway error:", response.status);

            // Return fallback response instead of error
            return new Response(JSON.stringify({
                symptomExplanation: "Your symptoms may have various causes. While many common symptoms resolve on their own with proper rest and care, it's important to monitor how you feel.",
                personalizedAdvice: "Focus on rest, staying hydrated, and maintaining good nutrition. Listen to your body and avoid overexertion during recovery.",
                recoveryTimeline: "Many common conditions improve within 3-7 days with proper self-care. If symptoms persist beyond this time, consider consulting a healthcare provider.",
                seekHelpIf: [
                    "Symptoms suddenly worsen",
                    "You develop difficulty breathing",
                    "You have a high fever that doesn't respond to medication",
                    "You experience severe pain",
                    "You feel confused or disoriented"
                ]
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        console.log("Care pathway AI response received");

        // Parse the JSON response
        let result;
        try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);

                // Validate required fields
                if (!result.symptomExplanation || !result.personalizedAdvice ||
                    !result.recoveryTimeline || !result.seekHelpIf) {
                    throw new Error("Missing required fields");
                }

                // Ensure seekHelpIf is an array
                if (!Array.isArray(result.seekHelpIf)) {
                    result.seekHelpIf = [result.seekHelpIf];
                }
            } else {
                throw new Error("No JSON found in response");
            }
        } catch (parseError) {
            console.error("Failed to parse AI response, using fallback");
            result = {
                symptomExplanation: "Your symptoms are being evaluated. Many common conditions can cause similar symptoms, and proper assessment by a healthcare provider can help determine the cause.",
                personalizedAdvice: "Rest adequately, stay well-hydrated, and eat nutritious foods to support your body's recovery. Avoid strenuous activities until you feel better.",
                recoveryTimeline: "Most common conditions improve within a few days to a week. Seek medical attention if symptoms persist or worsen.",
                seekHelpIf: [
                    "Symptoms persist beyond expected duration",
                    "You experience new or worsening symptoms",
                    "You develop fever above 103°F (39.4°C)",
                    "You have difficulty performing normal activities",
                    "You feel the situation is becoming serious"
                ]
            };
        }

        // Add safety wrapper
        result._disclaimer = "This information is for educational purposes only and is not a substitute for professional medical advice.";
        result._generatedAt = new Date().toISOString();

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Care pathway error:", error instanceof Error ? error.message : "Unknown error");

        // Return safe fallback on any error
        return new Response(JSON.stringify({
            symptomExplanation: "We're unable to provide specific analysis at this time. Please consider consulting a healthcare provider for proper evaluation of your symptoms.",
            personalizedAdvice: "Rest, stay hydrated, and monitor your symptoms. Maintain good hygiene and avoid spreading potential infections.",
            recoveryTimeline: "Recovery time varies depending on the underlying cause. A healthcare provider can give you more specific guidance.",
            seekHelpIf: [
                "Symptoms worsen or don't improve",
                "You develop new symptoms",
                "You feel seriously unwell",
                "You have any concerns about your health",
                "Symptoms affect your daily activities significantly"
            ]
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
