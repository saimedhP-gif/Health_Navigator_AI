import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Vertex AI Edge Function
 * Provides AI-powered health assistance using Google Cloud Vertex AI
 * 
 * Features:
 * - Access to Gemini Pro models via Vertex AI
 * - Enterprise-grade security and compliance
 * - Advanced model configurations
 * - Medical safety guardrails
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

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

// Medical safety system prompt for healthcare applications
const MEDICAL_SAFETY_CONTEXT = `You are a helpful health information assistant powered by Google Cloud Vertex AI. 
You must follow these strict medical safety guidelines:

NEVER:
- Provide specific medical diagnoses
- Prescribe medications or specific dosages
- Tell users to stop taking prescribed medications
- Make claims about treating or curing diseases
- Provide advice that could delay emergency care

ALWAYS:
- Recommend consulting healthcare professionals for serious symptoms
- Include emergency warning signs when relevant
- Be culturally sensitive and support multiple languages
- Provide general health education only
- Include appropriate medical disclaimers
- Be supportive and empathetic

SAFETY DISCLAIMERS TO INCLUDE:
- "This is general health information, not medical advice"
- "Please consult a qualified healthcare professional"
- "In case of emergency, call local emergency services"

For family health queries, consider:
- Age-appropriate advice (infant, child, adult, elderly)
- Family medical history context when provided
- Preventive care and wellness recommendations
`;

interface VertexAIRequest {
    prompt: string;
    systemContext?: string;
    language?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    topK?: number;
    // Family context
    familyMemberAge?: number;
    familyMemberRelationship?: string;
    // Conversation history for multi-turn
    conversationHistory?: Array<{ role: string; content: string }>;
    // Model selection
    model?: "gemini-pro" | "gemini-pro-vision" | "gemini-1.5-pro";
}

interface VertexAIResponse {
    response: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    safetyRatings?: Array<{
        category: string;
        probability: string;
    }>;
    error?: string;
    isEmergency?: boolean;
}

// Get access token using service account
async function getAccessToken(): Promise<string | null> {
    const serviceAccountKey = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");

    if (!serviceAccountKey) {
        console.error("Service account key not configured");
        return null;
    }

    try {
        const key = JSON.parse(serviceAccountKey);

        // Create JWT
        const header = {
            alg: "RS256",
            typ: "JWT"
        };

        const now = Math.floor(Date.now() / 1000);
        const payload = {
            iss: key.client_email,
            sub: key.client_email,
            aud: "https://oauth2.googleapis.com/token",
            iat: now,
            exp: now + 3600,
            scope: "https://www.googleapis.com/auth/cloud-platform"
        };

        // For simplicity, we'll use API key instead of OAuth2 for this implementation
        // In production, implement proper JWT signing with the private key
        return null;
    } catch (error) {
        console.error("Error parsing service account key:", error);
        return null;
    }
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const clientKey = getRateLimitKey(req);
    const { allowed, remaining } = checkRateLimit(clientKey);

    if (!allowed) {
        return new Response(JSON.stringify({
            error: "Rate limit exceeded. Please wait before trying again.",
            response: "I'm receiving too many requests. Please wait a moment and try again."
        }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        });
    }

    try {
        const body: VertexAIRequest = await req.json();
        const {
            prompt,
            systemContext,
            language = "en",
            temperature = 0.7,
            maxTokens = 1024,
            topP = 0.95,
            topK = 40,
            familyMemberAge,
            familyMemberRelationship,
            conversationHistory = [],
            model = "gemini-pro"
        } = body;

        if (!prompt) {
            return new Response(JSON.stringify({
                error: "Missing required field: prompt",
                response: "Please provide a question or prompt."
            }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Get configuration
        const PROJECT_ID = Deno.env.get("GOOGLE_CLOUD_PROJECT_ID");
        const LOCATION = Deno.env.get("VERTEX_AI_LOCATION") || "us-central1";
        const API_KEY = Deno.env.get("GOOGLE_CLOUD_API_KEY") || Deno.env.get("GOOGLE_GEMINI_API_KEY");

        if (!PROJECT_ID || !API_KEY) {
            console.error("Vertex AI configuration missing");

            // Fallback to Gemini API if Vertex AI is not configured
            return await fallbackToGeminiAPI(body, API_KEY);
        }

        // Build system instruction with medical safety
        let systemInstruction = MEDICAL_SAFETY_CONTEXT;

        if (systemContext) {
            systemInstruction += `\n\nAdditional Context: ${systemContext}`;
        }

        if (language !== "en") {
            systemInstruction += `\n\nIMPORTANT: Respond in the language with code "${language}". Be culturally appropriate.`;
        }

        if (familyMemberAge !== undefined) {
            const ageContext = getAgeContext(familyMemberAge);
            systemInstruction += `\n\n${ageContext}`;
        }

        if (familyMemberRelationship) {
            systemInstruction += `\n\nThis query is about the user's ${familyMemberRelationship}.`;
        }

        // Build conversation contents
        const contents = [];

        // Add conversation history
        for (const msg of conversationHistory.slice(-10)) {
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

        // Vertex AI endpoint
        const vertexEndpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${model}:generateContent`;

        const response = await fetch(vertexEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                contents,
                systemInstruction: {
                    parts: [{ text: systemInstruction }]
                },
                generationConfig: {
                    temperature,
                    maxOutputTokens: maxTokens,
                    topP,
                    topK,
                },
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
                ]
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Vertex AI error:", response.status, errorText);

            // Fallback to standard Gemini API
            return await fallbackToGeminiAPI(body, API_KEY);
        }

        const data = await response.json();

        // Extract response
        let responseText = "";
        let safetyRatings: Array<{ category: string; probability: string }> = [];

        if (data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            if (candidate.content && candidate.content.parts) {
                responseText = candidate.content.parts
                    .map((part: { text?: string }) => part.text || "")
                    .join("");
            }
            if (candidate.safetyRatings) {
                safetyRatings = candidate.safetyRatings;
            }
        }

        if (!responseText) {
            responseText = "I apologize, but I couldn't generate a helpful response. Please try rephrasing your question.";
        }

        // Check for emergency keywords
        const isEmergency = checkForEmergency(prompt);

        const result: VertexAIResponse = {
            response: responseText,
            model: `vertex-ai/${model}`,
            safetyRatings,
            isEmergency,
            usage: data.usageMetadata ? {
                promptTokens: data.usageMetadata.promptTokenCount || 0,
                completionTokens: data.usageMetadata.candidatesTokenCount || 0,
                totalTokens: data.usageMetadata.totalTokenCount || 0
            } : undefined
        };

        if (isEmergency) {
            result.response = `⚠️ EMERGENCY WARNING: Based on your description, you may need immediate medical attention.\n\n🚨 Please call emergency services:\n- India: 108 or 112\n- USA: 911\n- UK: 999\n\n${responseText}`;
        }

        console.log(`Vertex AI request processed: model=${model}, language=${language}, remaining=${remaining}`);

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Vertex AI service error:", error instanceof Error ? error.message : "Unknown error");

        return new Response(JSON.stringify({
            response: "I apologize, but an error occurred. Please try again later or consult a healthcare professional directly.",
            error: error instanceof Error ? error.message : "Unknown error",
            model: "vertex-ai/error"
        }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});

// Helper function to get age-appropriate context
function getAgeContext(age: number): string {
    if (age < 1) {
        return "This query is about an infant (under 1 year). Be extremely cautious. Always recommend immediate pediatric consultation for any concerning symptoms.";
    } else if (age < 3) {
        return "This query is about a toddler (1-3 years). Be cautious about symptoms and always recommend pediatric care.";
    } else if (age < 12) {
        return `This query is about a child (age ${age}). Provide age-appropriate advice and recommend pediatric care when appropriate.`;
    } else if (age < 18) {
        return `This query is about a teenager (age ${age}). Be sensitive to adolescent health concerns and mental health.`;
    } else if (age < 65) {
        return `This query is about an adult (age ${age}). Provide general adult health guidance.`;
    } else {
        return `This query is about an elderly person (age ${age}). Consider age-related health factors, medication interactions, and fall risks.`;
    }
}

// Check for emergency keywords
function checkForEmergency(prompt: string): boolean {
    const emergencyKeywords = [
        "chest pain", "heart attack", "stroke", "can't breathe", "cannot breathe",
        "difficulty breathing", "unconscious", "not breathing", "severe bleeding",
        "choking", "seizure", "overdose", "poisoning", "suicide", "self-harm",
        "severe allergic", "anaphylaxis", "collapsed", "unresponsive"
    ];

    const lowerPrompt = prompt.toLowerCase();
    return emergencyKeywords.some(keyword => lowerPrompt.includes(keyword));
}

// Fallback to standard Gemini API
async function fallbackToGeminiAPI(body: VertexAIRequest, apiKey: string | undefined): Promise<Response> {
    if (!apiKey) {
        return new Response(JSON.stringify({
            response: "I apologize, but the AI service is currently unavailable. Please try again later.",
            error: "API configuration missing",
            model: "fallback/unavailable"
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

        const response = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: body.prompt }] }],
                generationConfig: {
                    maxOutputTokens: body.maxTokens || 1024,
                    temperature: body.temperature || 0.7,
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        let responseText = "";

        if (data.candidates && data.candidates[0]?.content?.parts) {
            responseText = data.candidates[0].content.parts
                .map((part: { text?: string }) => part.text || "")
                .join("");
        }

        return new Response(JSON.stringify({
            response: responseText || "I couldn't generate a response. Please try again.",
            model: "gemini-pro/fallback"
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Fallback Gemini API error:", error);
        return new Response(JSON.stringify({
            response: "I apologize, but the AI service is currently unavailable.",
            error: error instanceof Error ? error.message : "Unknown error",
            model: "fallback/error"
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
}
