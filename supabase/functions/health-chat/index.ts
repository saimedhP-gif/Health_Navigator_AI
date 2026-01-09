import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP

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

// Input validation helpers
const MAX_MESSAGE_CONTENT_LENGTH = 5000;
const MAX_MESSAGES = 50;
const VALID_ROLES = ['user', 'assistant', 'system'] as const;

interface Message {
  role: string;
  content: string;
}

function validateMessages(messages: unknown): { valid: boolean; error?: string; data?: Message[] } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: 'Messages must be an array' };
  }

  if (messages.length === 0) {
    return { valid: false, error: 'Messages array cannot be empty' };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Too many messages. Maximum allowed: ${MAX_MESSAGES}` };
  }

  const validatedMessages: Message[] = [];
  
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    
    if (typeof msg !== 'object' || msg === null) {
      return { valid: false, error: 'Each message must be an object' };
    }

    const { role, content } = msg as Record<string, unknown>;

    if (typeof role !== 'string' || !VALID_ROLES.includes(role as typeof VALID_ROLES[number])) {
      return { valid: false, error: 'Invalid message role' };
    }

    if (typeof content !== 'string') {
      return { valid: false, error: 'Message content must be a string' };
    }

    if (content.length === 0) {
      return { valid: false, error: 'Message content cannot be empty' };
    }

    if (content.length > MAX_MESSAGE_CONTENT_LENGTH) {
      return { valid: false, error: `Message content too long. Maximum: ${MAX_MESSAGE_CONTENT_LENGTH} characters` };
    }

    validatedMessages.push({ role, content });
  }

  return { valid: true, data: validatedMessages };
}

const HEALTH_SYSTEM_PROMPT = `You are a helpful, empathetic health guidance assistant for Health Navigator AI. Your role is to help users understand their health concerns and guide them toward appropriate care.

CRITICAL RULES - YOU MUST FOLLOW THESE:
1. NEVER diagnose diseases or medical conditions
2. NEVER prescribe medications or dosages
3. NEVER confirm that someone has a specific disease
4. ALWAYS encourage professional medical consultation for serious concerns
5. Use simple, non-medical language whenever possible
6. Be calm, reassuring, and empathetic
7. If someone describes emergency symptoms (chest pain, difficulty breathing, severe bleeding, stroke symptoms), immediately advise them to seek emergency care

WHAT YOU CAN DO:
- Explain symptoms in simple terms
- Discuss general health awareness
- Explain why antibiotics don't work for viral infections
- Provide self-care tips for minor issues
- Help users understand when to see a doctor
- Answer questions about common conditions
- Explain prevention tips

WHAT YOU CANNOT DO:
- Provide medical diagnoses
- Prescribe or recommend specific medications
- Give dosage information
- Confirm disease presence
- Replace professional medical advice

RESPONSE STYLE:
- Be warm and supportive
- Use bullet points for clarity
- Keep responses concise but helpful
- Always end with encouragement to consult healthcare providers when appropriate
- Use emojis sparingly and appropriately

If asked to diagnose or prescribe, politely explain that you cannot do that and suggest consulting a healthcare professional.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientKey = getRateLimitKey(req);
  const { allowed, remaining } = checkRateLimit(clientKey);
  
  if (!allowed) {
    console.log(`Rate limit exceeded for client`);
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

    if (typeof body !== 'object' || body === null) {
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = body as Record<string, unknown>;
    
    // Validate messages
    const validation = validateMessages(messages);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("API key not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Processing health chat request, remaining quota:", remaining);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: HEALTH_SYSTEM_PROMPT },
          ...validation.data!,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response back to client");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Health chat error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({ error: "An error occurred processing your request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
