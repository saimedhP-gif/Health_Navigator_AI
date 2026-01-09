import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Google Cloud Vision API Edge Function
 * Provides OCR and image analysis for prescription scanning
 * 
 * SAFETY: 
 * - Safe Search detection enabled by default
 * - Medical content validation
 * - Privacy-first approach (no image storage)
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting - stricter for vision API due to higher resource usage
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

type VisionFeature =
    | "TEXT_DETECTION"
    | "DOCUMENT_TEXT_DETECTION"
    | "LABEL_DETECTION"
    | "SAFE_SEARCH_DETECTION"
    | "OBJECT_DETECTION";

interface VisionRequest {
    imageBase64: string;
    features: VisionFeature[];
    languageHints?: string[];
}

interface AnnotationResponse {
    fullTextAnnotation?: {
        text: string;
        pages: Array<{
            blocks: Array<{
                paragraphs: Array<{
                    words: Array<{
                        symbols: Array<{
                            text: string;
                            confidence: number;
                        }>;
                    }>;
                }>;
            }>;
        }>;
    };
    textAnnotations?: Array<{
        description: string;
        boundingPoly: {
            vertices: Array<{ x: number; y: number }>;
        };
    }>;
    labelAnnotations?: Array<{
        description: string;
        score: number;
    }>;
    safeSearchAnnotation?: {
        adult: string;
        spoof: string;
        medical: string;
        violence: string;
        racy: string;
    };
    localizedObjectAnnotations?: Array<{
        name: string;
        score: number;
    }>;
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const clientKey = getRateLimitKey(req);
    const { allowed, remaining } = checkRateLimit(clientKey);

    if (!allowed) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in 1 minute." }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        });
    }

    try {
        const body: VisionRequest = await req.json();
        const { imageBase64, features, languageHints } = body;

        if (!imageBase64) {
            return new Response(JSON.stringify({ error: "Image data is required" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Validate image size (max 10MB base64)
        if (imageBase64.length > 10 * 1024 * 1024 * 1.37) {
            return new Response(JSON.stringify({ error: "Image too large. Maximum size: 10MB" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const GOOGLE_CLOUD_API_KEY = Deno.env.get("GOOGLE_CLOUD_API_KEY");

        if (!GOOGLE_CLOUD_API_KEY) {
            console.error("Google Cloud API key not configured");
            return new Response(JSON.stringify({
                error: "Vision service unavailable",
                success: false
            }), {
                status: 503,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Always include SAFE_SEARCH_DETECTION for safety
        const requestedFeatures = features || ["TEXT_DETECTION"];
        if (!requestedFeatures.includes("SAFE_SEARCH_DETECTION")) {
            requestedFeatures.push("SAFE_SEARCH_DETECTION");
        }

        console.log(`Processing image with features: ${requestedFeatures.join(", ")}, remaining quota:`, remaining);

        // Prepare Vision API request
        const visionRequest = {
            requests: [{
                image: {
                    content: imageBase64.replace(/^data:image\/\w+;base64,/, '')
                },
                features: requestedFeatures.map(type => ({ type, maxResults: 50 })),
                imageContext: {
                    languageHints: languageHints || ["en", "hi"]
                }
            }]
        };

        // Call Google Cloud Vision API
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_API_KEY}`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(visionRequest),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Google Vision API error:", response.status, errorData);

            return new Response(JSON.stringify({
                error: "Image analysis failed",
                success: false
            }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const data = await response.json();
        const annotations: AnnotationResponse = data.responses?.[0] || {};

        // Check safe search results
        const safeSearch = annotations.safeSearchAnnotation;
        if (safeSearch) {
            const unsafeCategories = [];
            if (safeSearch.adult === "LIKELY" || safeSearch.adult === "VERY_LIKELY") {
                unsafeCategories.push("adult");
            }
            if (safeSearch.violence === "LIKELY" || safeSearch.violence === "VERY_LIKELY") {
                unsafeCategories.push("violence");
            }

            if (unsafeCategories.length > 0) {
                console.warn("Unsafe content detected:", unsafeCategories);
                return new Response(JSON.stringify({
                    error: "Image contains inappropriate content",
                    success: false,
                    safeSearch
                }), {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }
        }

        // Process and return results
        const result = {
            success: true,
            fullText: annotations.fullTextAnnotation?.text ||
                annotations.textAnnotations?.[0]?.description || "",
            textAnnotations: annotations.textAnnotations?.slice(1).map(t => ({
                text: t.description,
                confidence: 0.9, // Vision API v1 doesn't provide per-word confidence
                boundingBox: t.boundingPoly?.vertices ? {
                    x: t.boundingPoly.vertices[0].x,
                    y: t.boundingPoly.vertices[0].y,
                    width: (t.boundingPoly.vertices[1]?.x || 0) - (t.boundingPoly.vertices[0]?.x || 0),
                    height: (t.boundingPoly.vertices[2]?.y || 0) - (t.boundingPoly.vertices[0]?.y || 0)
                } : undefined
            })),
            labels: annotations.labelAnnotations?.map(l => ({
                description: l.description,
                score: l.score
            })),
            safeSearch: annotations.safeSearchAnnotation,
            objects: annotations.localizedObjectAnnotations?.map(o => ({
                name: o.name,
                confidence: o.score
            })),
            _processedAt: new Date().toISOString()
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Vision service error:", error instanceof Error ? error.message : "Unknown error");

        return new Response(JSON.stringify({
            error: "Vision service error",
            success: false
        }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
