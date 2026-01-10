import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Google Gemini AI Edge Function
 * Provides AI-powered health assistance using Google's Gemini model
 * 
 * Features:
 * - Medical symptom analysis
 * - Health advice in multiple languages
 * - Family health recommendations
 * - Safe AI practices for medical context
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

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

// Medical safety system prompt
const MEDICAL_SAFETY_PROMPT = `You are a helpful health information assistant. You must follow these rules strictly:

1. NEVER provide specific medical diagnoses
2. NEVER prescribe medications or specific dosages
3. NEVER tell users to stop taking prescribed medications without consulting their doctor
4. ALWAYS recommend consulting a healthcare professional for serious symptoms
5. ALWAYS include emergency warning signs when relevant
6. Be culturally sensitive and support multiple languages
7. Provide general health education and information only
8. When discussing symptoms, always mention when to seek emergency care
9. Respect privacy - do not ask for unnecessary personal information
10. Be supportive and empathetic in your responses

IMPORTANT DISCLAIMERS TO INCLUDE:
- This is general health information, not medical advice
- Always consult a qualified healthcare professional for diagnosis and treatment
- In case of emergency, call local emergency services immediately

You can provide:
- General health education
- Wellness tips
- Information about common conditions
- When to seek medical care
- Healthy lifestyle recommendations
- Family health tips for all ages (children, adults, elderly)
`;

interface GeminiRequest {
    prompt: string;
    context?: string;
    language?: string;
    familyMemberAge?: number;
    familyMemberRelationship?: string;
    conversationHistory?: Array<{ role: string; content: string }>;
    maxTokens?: number;
}

interface GeminiResponse {
    response: string;
    safetyWarnings?: string[];
    recommendedActions?: string[];
    shouldSeekEmergencyCare?: boolean;
    confidence?: number;
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const clientKey = getRateLimitKey(req);
    const { allowed, remaining } = checkRateLimit(clientKey);

    if (!allowed) {
        return new Response(JSON.stringify({
            error: "Rate limit exceeded. Please wait before trying again."
        }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        });
    }

    try {
        const body: GeminiRequest = await req.json();
        const {
            prompt,
            context,
            language = "en",
            familyMemberAge,
            familyMemberRelationship,
            conversationHistory = [],
            maxTokens = 1024
        } = body;

        if (!prompt) {
            return new Response(JSON.stringify({ error: "Missing required field: prompt" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const GOOGLE_API_KEY = Deno.env.get("GOOGLE_GEMINI_API_KEY") || Deno.env.get("GOOGLE_CLOUD_API_KEY");

        if (!GOOGLE_API_KEY) {
            console.error("Google API key not configured");
            return new Response(JSON.stringify({
                response: "I apologize, but the AI service is currently unavailable. Please try again later or consult a healthcare professional directly.",
                safetyWarnings: ["AI service unavailable"],
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Build context-aware system prompt
        let systemPrompt = MEDICAL_SAFETY_PROMPT;

        if (language !== "en") {
            systemPrompt += `\n\nIMPORTANT: Respond in the language with code "${language}". Be culturally appropriate for users of this language.`;
        }

        if (familyMemberAge !== undefined) {
            if (familyMemberAge < 2) {
                systemPrompt += `\n\nThis query is about an infant (under 2 years). Be extra cautious and always recommend pediatric consultation.`;
            } else if (familyMemberAge < 12) {
                systemPrompt += `\n\nThis query is about a child (age ${familyMemberAge}). Provide age-appropriate advice and recommend pediatric care when needed.`;
            } else if (familyMemberAge < 18) {
                systemPrompt += `\n\nThis query is about a teenager (age ${familyMemberAge}). Be sensitive to adolescent health concerns.`;
            } else if (familyMemberAge > 65) {
                systemPrompt += `\n\nThis query is about an elderly person (age ${familyMemberAge}). Consider age-related health factors and medication interactions.`;
            }
        }

        if (familyMemberRelationship) {
            systemPrompt += `\n\nThe family member's relationship to the user: ${familyMemberRelationship}.`;
        }

        if (context) {
            systemPrompt += `\n\nAdditional context: ${context}`;
        }

        // Build conversation for Gemini
        const contents = [];

        // Add conversation history
        for (const msg of conversationHistory.slice(-10)) { // Keep last 10 messages
            contents.push({
                role: msg.role === "assistant" ? "model" : "user",
                parts: [{ text: msg.content }]
            });
        }

        // Add current prompt
        contents.push({
            role: "user",
            parts: [{ text: prompt }]
        });

        // Call Gemini API
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

        const geminiResponse = await fetch(geminiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents,
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
                generationConfig: {
                    maxOutputTokens: maxTokens,
                    temperature: 0.7,
                    topP: 0.9,
                    topK: 40,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            }),
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error("Gemini API error:", geminiResponse.status, errorText);

            return new Response(JSON.stringify({
                response: "I apologize, but I'm unable to process your request right now. Please try again later or consult a healthcare professional directly.",
                safetyWarnings: ["Service temporarily unavailable"],
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const geminiData = await geminiResponse.json();

        // Extract response text
        let responseText = "";
        if (geminiData.candidates && geminiData.candidates.length > 0) {
            const candidate = geminiData.candidates[0];
            if (candidate.content && candidate.content.parts) {
                responseText = candidate.content.parts
                    .map((part: any) => part.text)
                    .join("");
            }
        }

        if (!responseText) {
            responseText = "I apologize, but I couldn't generate a helpful response. Please try rephrasing your question.";
        }

        // Check for emergency keywords
        const emergencyKeywords = [
            "chest pain", "difficulty breathing", "unconscious", "severe bleeding",
            "stroke", "heart attack", "seizure", "poisoning", "suicide", "self-harm",
            "not breathing", "choking", "severe allergic"
        ];

        const lowerPrompt = prompt.toLowerCase();
        const shouldSeekEmergencyCare = emergencyKeywords.some(keyword =>
            lowerPrompt.includes(keyword)
        );

        const response: GeminiResponse = {
            response: responseText,
            safetyWarnings: [],
            recommendedActions: [],
            shouldSeekEmergencyCare,
        };

        if (shouldSeekEmergencyCare) {
            response.safetyWarnings = [
                "Based on your description, you may need emergency medical care.",
                "Please call emergency services (108/112 in India, 911 in US) immediately if this is a real emergency."
            ];
            response.recommendedActions = [
                "Call emergency services immediately",
                "Stay calm and provide your location",
                "Follow dispatcher instructions"
            ];
        }

        console.log(`Gemini request processed for language: ${language}, remaining quota:`, remaining);

        return new Response(JSON.stringify(response), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Gemini service error:", error instanceof Error ? error.message : "Unknown error");

        return new Response(JSON.stringify({
            response: "I apologize, but an error occurred. Please try again later.",
            safetyWarnings: ["Service error occurred"],
        }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
