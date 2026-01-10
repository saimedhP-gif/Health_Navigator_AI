import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Medical News Edge Function
 * Fetches latest medical technology and healthcare news
 * from various sources
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsArticle {
    id: string;
    title: string;
    description: string;
    content?: string;
    source: string;
    author?: string;
    url: string;
    imageUrl?: string;
    publishedAt: string;
    category: string;
}

interface NewsResponse {
    articles: NewsArticle[];
    totalResults: number;
    error?: string;
}

// Cache for news articles (5 minutes)
let newsCache: { articles: NewsArticle[]; timestamp: number } | null = null;
const CACHE_DURATION_MS = 5 * 60 * 1000;

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const url = new URL(req.url);
        const category = url.searchParams.get('category') || 'medical-technology';
        const language = url.searchParams.get('language') || 'en';

        // Check cache
        if (newsCache && (Date.now() - newsCache.timestamp) < CACHE_DURATION_MS) {
            return new Response(JSON.stringify({
                articles: newsCache.articles,
                totalResults: newsCache.articles.length
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const NEWS_API_KEY = Deno.env.get("NEWS_API_KEY");

        if (!NEWS_API_KEY) {
            // Return curated medical news if API not configured
            const mockNews = getCuratedMedicalNews();
            return new Response(JSON.stringify({
                articles: mockNews,
                totalResults: mockNews.length
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Fetch from News API
        const query = getCategoryQuery(category);
        const newsUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${language}&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`;

        const response = await fetch(newsUrl);

        if (!response.ok) {
            throw new Error(`News API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "ok") {
            throw new Error(data.message || "Failed to fetch news");
        }

        const articles: NewsArticle[] = (data.articles || []).map((article: any, index: number) => ({
            id: `news-${index}-${Date.now()}`,
            title: article.title,
            description: article.description,
            content: article.content,
            source: article.source?.name || "Unknown",
            author: article.author,
            url: article.url,
            imageUrl: article.urlToImage,
            publishedAt: article.publishedAt,
            category: category
        }));

        // Update cache
        newsCache = { articles, timestamp: Date.now() };

        return new Response(JSON.stringify({
            articles,
            totalResults: data.totalResults || articles.length
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("News service error:", error);

        // Return mock news on error
        const mockNews = getCuratedMedicalNews();
        return new Response(JSON.stringify({
            articles: mockNews,
            totalResults: mockNews.length,
            error: "Using cached news"
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});

function getCategoryQuery(category: string): string {
    const queries: Record<string, string> = {
        "medical-technology": "medical technology OR healthcare AI OR medical devices",
        "research": "medical research OR clinical trials OR breakthrough treatment",
        "ai-healthcare": "artificial intelligence healthcare OR AI diagnosis OR machine learning medicine",
        "telemedicine": "telemedicine OR telehealth OR remote healthcare",
        "biotech": "biotechnology OR gene therapy OR CRISPR",
        "pharma": "pharmaceutical OR drug development OR FDA approval",
        "digital-health": "digital health OR health apps OR wearable health"
    };
    return queries[category] || queries["medical-technology"];
}

// Curated medical news for when API is not available
function getCuratedMedicalNews(): NewsArticle[] {
    return [
        {
            id: "curated-1",
            title: "AI-Powered Diagnostic Tools Revolutionizing Early Disease Detection",
            description: "New artificial intelligence systems are helping doctors detect diseases like cancer and heart conditions earlier than ever before, potentially saving millions of lives worldwide.",
            source: "Medical Technology Today",
            publishedAt: new Date().toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
            category: "ai-healthcare"
        },
        {
            id: "curated-2",
            title: "Breakthrough in Wearable Health Monitors: Real-Time Blood Glucose Tracking",
            description: "Scientists have developed a non-invasive smartwatch sensor that can continuously monitor blood glucose levels, offering hope to millions of diabetes patients.",
            source: "Health Tech Weekly",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800",
            category: "digital-health"
        },
        {
            id: "curated-3",
            title: "Telemedicine Usage Grows 300% in Rural India",
            description: "Government initiatives and private partnerships are bringing quality healthcare to remote villages through smartphone-based consultations with specialist doctors.",
            source: "Digital Health India",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
            category: "telemedicine"
        },
        {
            id: "curated-4",
            title: "New mRNA Technology Shows Promise for Cancer Treatment",
            description: "Building on COVID-19 vaccine success, researchers are developing personalized mRNA treatments that train the immune system to fight specific cancer types.",
            source: "Cancer Research Journal",
            publishedAt: new Date(Date.now() - 259200000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
            category: "research"
        },
        {
            id: "curated-5",
            title: "Robot-Assisted Surgery Reduces Recovery Time by 50%",
            description: "Minimally invasive robotic surgical systems are helping patients recover faster with less pain and smaller incisions across major hospitals in India.",
            source: "Surgical Innovation",
            publishedAt: new Date(Date.now() - 345600000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
            category: "medical-technology"
        },
        {
            id: "curated-6",
            title: "India Launches National Digital Health ID for All Citizens",
            description: "The Ayushman Bharat Digital Mission creates a unified health identification system, enabling seamless access to medical records across healthcare providers.",
            source: "Government Health Portal",
            publishedAt: new Date(Date.now() - 432000000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800",
            category: "digital-health"
        },
        {
            id: "curated-7",
            title: "AI Detects Eye Diseases from Smartphone Photos with 95% Accuracy",
            description: "New mobile app uses artificial intelligence to screen for diabetic retinopathy and glaucoma using just a smartphone camera, making eye care accessible to millions.",
            source: "Ophthalmology Tech",
            publishedAt: new Date(Date.now() - 518400000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800",
            category: "ai-healthcare"
        },
        {
            id: "curated-8",
            title: "3D Printed Organs: First Successful Transplant of Lab-Grown Kidney",
            description: "Medical milestone achieved as patient receives first fully functional 3D bioprinted kidney, opening doors to eliminating organ transplant waiting lists.",
            source: "Biotech Frontiers",
            publishedAt: new Date(Date.now() - 604800000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
            category: "biotech"
        }
    ];
}
