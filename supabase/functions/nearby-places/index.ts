import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Google Places API Edge Function
 * Finds nearby clinics, hospitals, and healthcare facilities
 * with ratings and reviews from Google Maps
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return true;
    }

    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
        return false;
    }

    entry.count++;
    return true;
}

interface NearbySearchRequest {
    latitude: number;
    longitude: number;
    type: "hospital" | "clinic" | "pharmacy" | "doctor" | "dentist";
    radius?: number; // in meters, default 5000
    language?: string;
}

interface PlaceResult {
    id: string;
    name: string;
    address: string;
    rating: number;
    totalRatings: number;
    isOpen: boolean | null;
    distance?: string;
    types: string[];
    photoUrl?: string;
    phoneNumber?: string;
    website?: string;
    googleMapsUrl: string;
    priceLevel?: number;
}

interface NearbySearchResponse {
    places: PlaceResult[];
    nextPageToken?: string;
    error?: string;
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    if (!checkRateLimit(clientIp)) {
        return new Response(JSON.stringify({
            error: "Rate limit exceeded",
            places: []
        }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        const body: NearbySearchRequest = await req.json();
        const {
            latitude,
            longitude,
            type = "hospital",
            radius = 5000,
            language = "en"
        } = body;

        if (!latitude || !longitude) {
            return new Response(JSON.stringify({
                error: "Missing latitude or longitude",
                places: []
            }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY") || Deno.env.get("GOOGLE_CLOUD_API_KEY");

        if (!API_KEY) {
            console.error("Google Places API key not configured");
            return new Response(JSON.stringify({
                error: "Service not configured",
                places: getMockPlaces(type)
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Map type to Google Places type
        const googleType = getGooglePlaceType(type);

        // Call Google Places Nearby Search API
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${googleType}&language=${language}&key=${API_KEY}`;

        const response = await fetch(placesUrl);

        if (!response.ok) {
            throw new Error(`Google Places API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            console.error("Google Places error:", data.status, data.error_message);
            return new Response(JSON.stringify({
                error: data.error_message || "Failed to fetch nearby places",
                places: getMockPlaces(type)
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Transform results
        const places: PlaceResult[] = (data.results || []).map((place: any) => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity || place.formatted_address || "",
            rating: place.rating || 0,
            totalRatings: place.user_ratings_total || 0,
            isOpen: place.opening_hours?.open_now ?? null,
            types: place.types || [],
            photoUrl: place.photos?.[0]?.photo_reference
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${API_KEY}`
                : undefined,
            googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
            priceLevel: place.price_level
        }));

        // Sort by rating
        places.sort((a, b) => (b.rating * b.totalRatings) - (a.rating * a.totalRatings));

        const result: NearbySearchResponse = {
            places: places.slice(0, 20), // Limit to 20 results
            nextPageToken: data.next_page_token
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Places service error:", error);
        return new Response(JSON.stringify({
            error: "Failed to fetch nearby places",
            places: []
        }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});

function getGooglePlaceType(type: string): string {
    const typeMap: Record<string, string> = {
        hospital: "hospital",
        clinic: "doctor",
        pharmacy: "pharmacy",
        doctor: "doctor",
        dentist: "dentist"
    };
    return typeMap[type] || "hospital";
}

// Mock data for when API is not configured
function getMockPlaces(type: string): PlaceResult[] {
    return [
        {
            id: "mock-1",
            name: "Apollo Hospital",
            address: "Jubilee Hills, Hyderabad",
            rating: 4.5,
            totalRatings: 2500,
            isOpen: true,
            types: ["hospital"],
            googleMapsUrl: "https://maps.google.com",
        },
        {
            id: "mock-2",
            name: "KIMS Hospital",
            address: "Secunderabad, Telangana",
            rating: 4.3,
            totalRatings: 1800,
            isOpen: true,
            types: ["hospital"],
            googleMapsUrl: "https://maps.google.com",
        },
        {
            id: "mock-3",
            name: "Yashoda Hospital",
            address: "Somajiguda, Hyderabad",
            rating: 4.4,
            totalRatings: 2100,
            isOpen: true,
            types: ["hospital"],
            googleMapsUrl: "https://maps.google.com",
        }
    ];
}
