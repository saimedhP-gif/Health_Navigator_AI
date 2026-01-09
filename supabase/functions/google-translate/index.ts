import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Google Cloud Translation API Edge Function
 * Provides multi-language support for medical content
 * 
 * SAFETY: Medical terms are handled carefully to preserve accuracy
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

// Medical terms that should not be translated (preserve in original language)
const preservedMedicalTerms = [
    "COVID-19", "SARS-CoV-2", "HIV", "AIDS", "MRI", "CT", "ECG", "EKG",
    "NSAID", "OTC", "BMI", "BP", "HR", "SpO2", "ICU", "ER", "ED",
    "mg", "ml", "mcg", "IU", "mmHg", "bpm"
];

interface TranslationRequest {
    text: string | string[];
    targetLanguage: string;
    sourceLanguage?: string;
    format?: "text" | "html";
}

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
        const body: TranslationRequest = await req.json();
        const { text, targetLanguage, sourceLanguage, format } = body;

        if (!text || !targetLanguage) {
            return new Response(JSON.stringify({ error: "Missing required fields: text, targetLanguage" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const GOOGLE_CLOUD_API_KEY = Deno.env.get("GOOGLE_CLOUD_API_KEY");

        if (!GOOGLE_CLOUD_API_KEY) {
            console.error("Google Cloud API key not configured");
            // Return fallback - original text with warning
            return new Response(JSON.stringify({
                translations: Array.isArray(text)
                    ? text.map(t => ({ translatedText: t, detectedSourceLanguage: "en" }))
                    : [{ translatedText: text, detectedSourceLanguage: "en" }],
                warning: "Translation service unavailable - showing original text"
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Prepare text array
        const textArray = Array.isArray(text) ? text : [text];

        // Preserve medical terms by replacing with placeholders
        const processedTexts = textArray.map(t => {
            let processed = t;
            preservedMedicalTerms.forEach((term, index) => {
                const regex = new RegExp(`\\b${term}\\b`, 'gi');
                processed = processed.replace(regex, `{{MT${index}}}`);
            });
            return processed;
        });

        console.log(`Translating ${textArray.length} text(s) to ${targetLanguage}, remaining quota:`, remaining);

        // Call Google Cloud Translation API v2
        const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_CLOUD_API_KEY}`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                q: processedTexts,
                target: targetLanguage,
                source: sourceLanguage !== 'auto' ? sourceLanguage : undefined,
                format: format || "text"
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Google Translate API error:", response.status, errorData);

            // Return original text on error
            return new Response(JSON.stringify({
                translations: textArray.map(t => ({
                    translatedText: t,
                    detectedSourceLanguage: sourceLanguage || "unknown"
                })),
                warning: "Translation failed - showing original text"
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const data = await response.json();

        // Process translations - restore medical terms
        const translations = data.data.translations.map((t: { translatedText: string; detectedSourceLanguage?: string }, index: number) => {
            let translatedText = t.translatedText;
            preservedMedicalTerms.forEach((term, termIndex) => {
                translatedText = translatedText.replace(new RegExp(`\\{\\{MT${termIndex}\\}\\}`, 'gi'), term);
            });

            return {
                translatedText,
                detectedSourceLanguage: t.detectedSourceLanguage,
                originalText: textArray[index]
            };
        });

        return new Response(JSON.stringify({ translations }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Translation service error:", error instanceof Error ? error.message : "Unknown error");

        return new Response(JSON.stringify({
            error: "Translation service error",
            translations: []
        }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
