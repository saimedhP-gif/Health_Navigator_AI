import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP (stricter for symptom analysis)

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

// Input validation
const VALID_GENDERS = ['Male', 'Female', 'Other'] as const;
const MAX_SYMPTOMS = 20;
const MAX_SYMPTOM_LENGTH = 100;
const MAX_AGE_LENGTH = 20;
const MAX_DURATION_LENGTH = 50;

interface ValidatedSymptomData {
  age: string;
  gender: string;
  symptoms: string[];
  duration: string;
  severity: number;
}

function validateSymptomData(body: unknown): { valid: boolean; error?: string; data?: ValidatedSymptomData } {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: 'Invalid request format' };
  }

  const { age, gender, symptoms, duration, severity } = body as Record<string, unknown>;

  // Validate age
  if (typeof age !== 'string' || age.trim().length === 0) {
    return { valid: false, error: 'Age is required' };
  }
  if (age.length > MAX_AGE_LENGTH) {
    return { valid: false, error: 'Age value too long' };
  }

  // Validate gender
  if (typeof gender !== 'string' || !VALID_GENDERS.includes(gender as typeof VALID_GENDERS[number])) {
    return { valid: false, error: 'Invalid gender value' };
  }

  // Validate symptoms
  if (!Array.isArray(symptoms)) {
    return { valid: false, error: 'Symptoms must be an array' };
  }
  if (symptoms.length === 0) {
    return { valid: false, error: 'At least one symptom is required' };
  }
  if (symptoms.length > MAX_SYMPTOMS) {
    return { valid: false, error: `Too many symptoms. Maximum: ${MAX_SYMPTOMS}` };
  }
  for (const symptom of symptoms) {
    if (typeof symptom !== 'string' || symptom.trim().length === 0) {
      return { valid: false, error: 'Each symptom must be a non-empty string' };
    }
    if (symptom.length > MAX_SYMPTOM_LENGTH) {
      return { valid: false, error: `Symptom too long. Maximum: ${MAX_SYMPTOM_LENGTH} characters` };
    }
  }

  // Validate duration
  if (typeof duration !== 'string' || duration.trim().length === 0) {
    return { valid: false, error: 'Duration is required' };
  }
  if (duration.length > MAX_DURATION_LENGTH) {
    return { valid: false, error: 'Duration value too long' };
  }

  // Validate severity
  if (typeof severity !== 'number' || !Number.isInteger(severity)) {
    return { valid: false, error: 'Severity must be an integer' };
  }
  if (severity < 1 || severity > 10) {
    return { valid: false, error: 'Severity must be between 1 and 10' };
  }

  return {
    valid: true,
    data: {
      age: age.trim(),
      gender,
      symptoms: symptoms.map((s: string) => s.trim()),
      duration: duration.trim(),
      severity
    }
  };
}

const SYMPTOM_SYSTEM_PROMPT = `You are a health guidance assistant that analyzes symptom information and provides urgency-level guidance. You help users understand whether they should self-care, see a doctor, or seek emergency care.

CRITICAL RULES:
1. NEVER diagnose specific diseases
2. NEVER prescribe medications
3. Always encourage professional consultation when appropriate
4. Be conservative - when in doubt, recommend seeing a doctor

INPUT FORMAT:
You will receive symptom data including age, gender, symptoms list, duration, and severity (1-10).

OUTPUT FORMAT:
You MUST respond with a valid JSON object in this exact format:
{
  "urgency": "green" | "amber" | "red",
  "title": "Short title describing urgency",
  "explanation": "2-3 sentence explanation of the assessment",
  "actions": ["action 1", "action 2", "action 3", "action 4"],
  "antibioticNote": "Information about antibiotic use for this situation",
  "possibleCauses": ["possible cause 1", "possible cause 2", "possible cause 3"]
}

URGENCY LEVELS:
- "green": Self-care likely sufficient. Minor symptoms, low severity, typical viral/common issues.
- "amber": Doctor visit recommended. Moderate symptoms, concerning duration, or symptoms requiring evaluation.
- "red": Emergency care advised. ALWAYS use for: chest pain, difficulty breathing, severe bleeding, stroke symptoms, high fever with confusion, severe allergic reactions.

GUIDELINES:
- If severity >= 8, lean toward amber or red
- If symptoms include "chest pain" or "difficulty breathing", use RED
- Duration > 1 week with worsening symptoms should lean amber
- Age extremes (very young or elderly) should lower threshold for amber/red
- Always remind that antibiotics don't help viral infections
- Keep language simple and non-alarming but honest
- Never use actual disease names - use phrases like "possible causes to discuss with your doctor"`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientKey = getRateLimitKey(req);
  const { allowed, remaining } = checkRateLimit(clientKey);
  
  if (!allowed) {
    console.log("Rate limit exceeded for client");
    return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment before trying again." }), {
      status: 429,
      headers: { 
        ...corsHeaders, 
        "Content-Type": "application/json",
        "Retry-After": "60"
      },
    });
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate input
    const validation = validateSymptomData(body);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { age, gender, symptoms, duration, severity } = validation.data!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("API key not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Analyzing symptoms, remaining quota:", remaining);

    const userMessage = `Please analyze these symptoms and provide urgency guidance:
- Age: ${age}
- Gender: ${gender}
- Symptoms: ${symptoms.join(", ")}
- Duration: ${duration}
- Severity: ${severity}/10

Provide your response as a JSON object following the exact format specified.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYMPTOM_SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Failed to analyze symptoms" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI response received successfully");

    // Parse the JSON response from the AI
    let result;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response");
      // Fallback response
      result = {
        urgency: "amber",
        title: "Doctor Visit Recommended",
        explanation: "Based on your symptoms, we recommend consulting with a healthcare provider for proper evaluation.",
        actions: [
          "Schedule an appointment with your doctor",
          "Rest and stay hydrated",
          "Monitor your symptoms",
          "Seek emergency care if symptoms worsen"
        ],
        antibioticNote: "Only a doctor can determine if antibiotics are needed after proper examination.",
        possibleCauses: ["Condition requiring professional assessment"]
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Symptom analysis error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({ error: "An error occurred processing your request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
