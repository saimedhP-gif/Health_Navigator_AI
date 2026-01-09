import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

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
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB limit for base64 (roughly 7.5MB image)
const BASE64_PATTERN = /^[A-Za-z0-9+/]*={0,2}$/;

function validateImageBase64(body: unknown): { valid: boolean; error?: string; data?: string } {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: 'Invalid request format' };
  }

  const { imageBase64 } = body as Record<string, unknown>;

  if (typeof imageBase64 !== 'string') {
    return { valid: false, error: 'Image data must be a string' };
  }

  if (imageBase64.length === 0) {
    return { valid: false, error: 'No image provided' };
  }

  if (imageBase64.length > MAX_IMAGE_SIZE) {
    return { valid: false, error: 'Image too large. Maximum size is 10MB' };
  }

  // Basic base64 format validation (check if it contains only valid base64 characters)
  // Remove any whitespace first
  const cleanBase64 = imageBase64.replace(/\s/g, '');
  
  // Check if it looks like valid base64
  if (!BASE64_PATTERN.test(cleanBase64)) {
    return { valid: false, error: 'Invalid image data format' };
  }

  return { valid: true, data: cleanBase64 };
}

const PRESCRIPTION_ANALYSIS_PROMPT = `You are a helpful assistant that helps users understand their medical prescriptions and doctor's notes. Your role is to explain medical terms in simple language.

CRITICAL RULES - YOU MUST FOLLOW THESE:
1. NEVER tell users to take or not take any medication
2. NEVER provide dosage recommendations
3. NEVER diagnose conditions
4. NEVER suggest changing medications
5. ALWAYS remind users to follow their doctor's instructions
6. ALWAYS recommend consulting their pharmacist or doctor for questions

WHAT YOU CAN DO:
- Identify and list medications visible in the prescription
- Explain what each medication is commonly used for (general information only)
- Explain medical terms in simple language
- Identify the prescribing doctor's information if visible
- Note the date and any visible instructions
- Explain abbreviations like "bid", "tid", "prn" in simple terms

OUTPUT FORMAT:
Return a JSON object with this structure:
{
  "medications": [
    {
      "name": "Medication name",
      "commonUse": "What this medication is commonly prescribed for",
      "notes": "Any visible instructions or notes"
    }
  ],
  "doctorInfo": "Doctor name/clinic if visible",
  "date": "Prescription date if visible",
  "generalNotes": "Any other helpful observations",
  "importantReminder": "Always follow your doctor's instructions and consult them or your pharmacist with any questions about your medication."
}

If you cannot read the prescription clearly, indicate that in your response and suggest the user take a clearer photo.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientKey = getRateLimitKey(req);
  const { allowed, remaining } = checkRateLimit(clientKey);
  
  if (!allowed) {
    console.log("Rate limit exceeded for client");
    return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment before trying again." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
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
    const validation = validateImageBase64(body);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const imageBase64 = validation.data!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("API key not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Analyzing prescription image, remaining quota:", remaining);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: PRESCRIPTION_ANALYSIS_PROMPT },
          { 
            role: "user", 
            content: [
              { type: "text", text: "Please analyze this prescription/doctor's note and help me understand what medications are listed and what they're commonly used for. Remember: I will follow my doctor's instructions - I just want to understand the prescription better." },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
            ]
          },
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
      
      return new Response(JSON.stringify({ error: "Failed to analyze prescription" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI response received successfully");

    let result;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response");
      result = {
        medications: [],
        generalNotes: content,
        importantReminder: "Always follow your doctor's instructions and consult them or your pharmacist with any questions about your medication."
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Prescription analysis error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({ error: "An error occurred processing your request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
