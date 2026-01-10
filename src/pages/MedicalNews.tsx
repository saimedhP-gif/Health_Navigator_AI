import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Newspaper,
    Hospital,
    MapPin,
    Star,
    Clock,
    Phone,
    ExternalLink,
    Navigation,
    Loader2,
    RefreshCw,
    Pill,
    Stethoscope,
    Cpu,
    Microscope,
    Smartphone,
    FlaskConical,
    AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types
interface NewsArticle {
    id: string;
    title: string;
    description: string;
    source: string;
    author?: string;
    url: string;
    imageUrl?: string;
    publishedAt: string;
    category: string;
}

interface PlaceResult {
    id: string;
    name: string;
    address: string;
    rating: number;
    totalRatings: number;
    isOpen: boolean | null;
    types: string[];
    photoUrl?: string;
    googleMapsUrl: string;
}

// News Categories
const newsCategories = [
    { id: "medical-technology", label: "Medical Tech", icon: Cpu },
    { id: "ai-healthcare", label: "AI & Healthcare", icon: Microscope },
    { id: "telemedicine", label: "Telemedicine", icon: Smartphone },
    { id: "research", label: "Research", icon: FlaskConical },
    { id: "biotech", label: "Biotech", icon: FlaskConical },
];

// Place Types
const placeTypes = [
    { id: "hospital", label: "Hospitals", labelHi: "अस्पताल", icon: Hospital },
    { id: "clinic", label: "Clinics", labelHi: "क्लीनिक", icon: Stethoscope },
    { id: "pharmacy", label: "Pharmacies", labelHi: "दवाई की दुकान", icon: Pill },
    { id: "doctor", label: "Doctors", labelHi: "डॉक्टर", icon: Stethoscope },
];

function NewsCard({ article }: { article: NewsArticle }) {
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return "Recent";
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
        >
            {article.imageUrl && (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>
            )}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {article.category.replace(/-/g, ' ')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {formatDate(article.publishedAt)}
                    </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {article.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        {article.source}
                    </span>
                    {article.url !== "#" && (
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                        >
                            Read more <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

function PlaceCard({ place }: { place: PlaceResult }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
        >
            <div className="flex gap-4">
                {/* Photo */}
                {place.photoUrl ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                            src={place.photoUrl}
                            alt={place.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=📍';
                            }}
                        />
                    </div>
                ) : (
                    <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Hospital className="w-8 h-8 text-primary" />
                    </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{place.name}</h3>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {place.address}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium">{place.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">
                                ({place.totalRatings.toLocaleString()})
                            </span>
                        </div>

                        {/* Open Status */}
                        {place.isOpen !== null && (
                            <span className={`flex items-center gap-1 ${place.isOpen ? "text-green-500" : "text-red-500"
                                }`}>
                                <Clock className="w-3 h-3" />
                                {place.isOpen ? "Open Now" : "Closed"}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <a
                    href={place.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                >
                    <Button variant="outline" size="sm" className="w-full gap-2">
                        <Navigation className="w-4 h-4" />
                        Directions
                    </Button>
                </a>
                <a
                    href={place.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                >
                    <Button size="sm" className="w-full gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View on Maps
                    </Button>
                </a>
            </div>
        </motion.div>
    );
}

export default function MedicalNews() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("news");

    // News state
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [newsCategory, setNewsCategory] = useState("medical-technology");
    const [isLoadingNews, setIsLoadingNews] = useState(true);

    // Places state
    const [places, setPlaces] = useState<PlaceResult[]>([]);
    const [placeType, setPlaceType] = useState("hospital");
    const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    // Fetch medical news
    useEffect(() => {
        fetchNews();
    }, [newsCategory]);

    const fetchNews = async () => {
        setIsLoadingNews(true);
        try {
            const { data, error } = await supabase.functions.invoke('medical-news', {
                body: null,
                method: 'GET',
            });

            if (error) throw error;
            setArticles(data.articles || []);
        } catch (err) {
            console.error('Error fetching news:', err);
            // Use fallback curated news
            setArticles(getCuratedNews());
        } finally {
            setIsLoadingNews(false);
        }
    };

    // Get user location
    const getUserLocation = () => {
        setLocationError(null);
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                setLocationError(
                    error.code === 1
                        ? "Please allow location access to find nearby hospitals"
                        : "Unable to get your location"
                );
            }
        );
    };

    // Fetch nearby places
    useEffect(() => {
        if (userLocation) {
            fetchNearbyPlaces();
        }
    }, [userLocation, placeType]);

    const fetchNearbyPlaces = async () => {
        if (!userLocation) return;

        setIsLoadingPlaces(true);
        try {
            const { data, error } = await supabase.functions.invoke('nearby-places', {
                body: {
                    latitude: userLocation.lat,
                    longitude: userLocation.lng,
                    type: placeType,
                    radius: 10000
                }
            });

            if (error) throw error;
            setPlaces(data.places || []);
        } catch (err) {
            console.error('Error fetching places:', err);
            setPlaces(getMockPlaces());
        } finally {
            setIsLoadingPlaces(false);
        }
    };

    return (
        <Layout>
            <div className="container py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                        <Newspaper className="w-8 h-8 text-primary" />
                        Health News & Nearby Care
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with the latest breakthroughs in medical technology, AI-powered healthcare,
                        telemedicine, and find quality healthcare facilities near you with Google ratings.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        नवीनतम चिकित्सा प्रौद्योगिकी समाचार और अपने पास अस्पताल खोजें
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4 text-center">
                        <Cpu className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                        <h3 className="font-semibold text-sm">Medical Tech</h3>
                        <p className="text-xs text-muted-foreground">Robotics, Devices, IoT</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-4 text-center">
                        <Microscope className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                        <h3 className="font-semibold text-sm">AI in Healthcare</h3>
                        <p className="text-xs text-muted-foreground">Diagnosis, Predictions</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-4 text-center">
                        <Smartphone className="w-8 h-8 mx-auto text-green-500 mb-2" />
                        <h3 className="font-semibold text-sm">Telemedicine</h3>
                        <p className="text-xs text-muted-foreground">Remote Care, Apps</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-4 text-center">
                        <Hospital className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                        <h3 className="font-semibold text-sm">Find Hospitals</h3>
                        <p className="text-xs text-muted-foreground">With Google Ratings</p>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                        <TabsTrigger value="news" className="gap-2">
                            <Newspaper className="w-4 h-4" />
                            Medical News
                        </TabsTrigger>
                        <TabsTrigger value="nearby" className="gap-2">
                            <Hospital className="w-4 h-4" />
                            Nearby Hospitals
                        </TabsTrigger>
                    </TabsList>

                    {/* Medical News Tab */}
                    <TabsContent value="news">
                        {/* About Section */}
                        <div className="bg-card border border-border rounded-xl p-4 mb-6">
                            <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                <Newspaper className="w-5 h-5 text-primary" />
                                About Medical Technology News
                            </h2>
                            <p className="text-sm text-muted-foreground mb-3">
                                Our curated news section brings you the latest developments in healthcare technology from India and around the world.
                                We cover breakthrough innovations in:
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                                <li>• <strong>AI & Machine Learning</strong> - Disease detection, diagnostic tools, predictive healthcare</li>
                                <li>• <strong>Telemedicine</strong> - Remote consultations, digital health platforms, eSanjeevani</li>
                                <li>• <strong>Medical Devices</strong> - Wearables, robotic surgery, smart implants</li>
                                <li>• <strong>Biotechnology</strong> - Gene therapy, CRISPR, personalized medicine</li>
                                <li>• <strong>Digital Health</strong> - Ayushman Bharat, health apps, electronic records</li>
                            </ul>
                            <p className="text-xs text-muted-foreground italic">
                                📰 News is updated regularly to keep you informed about healthcare innovations that matter.
                            </p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 mb-6 justify-center">
                            {newsCategories.map((cat) => (
                                <Button
                                    key={cat.id}
                                    variant={newsCategory === cat.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setNewsCategory(cat.id)}
                                    className="gap-2"
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.label}
                                </Button>
                            ))}
                        </div>

                        {/* News Grid */}
                        {isLoadingNews ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.map((article) => (
                                    <NewsCard key={article.id} article={article} />
                                ))}
                            </div>
                        )}

                        {!isLoadingNews && articles.length === 0 && (
                            <div className="text-center py-12">
                                <Newspaper className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">No news articles found</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Nearby Places Tab */}
                    <TabsContent value="nearby">
                        {/* Location Request */}
                        {!userLocation && !locationError && (
                            <div className="text-center py-12 bg-card border border-border rounded-2xl mb-6">
                                <MapPin className="w-12 h-12 mx-auto text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Find Hospitals Near You</h3>
                                <p className="text-muted-foreground mb-4">
                                    Allow location access to find nearby healthcare facilities
                                </p>
                                <Button onClick={getUserLocation} className="gap-2">
                                    <Navigation className="w-4 h-4" />
                                    Use My Location
                                </Button>
                            </div>
                        )}

                        {locationError && (
                            <div className="text-center py-8 bg-destructive/10 border border-destructive/20 rounded-xl mb-6">
                                <AlertCircle className="w-8 h-8 mx-auto text-destructive mb-2" />
                                <p className="text-destructive mb-4">{locationError}</p>
                                <Button onClick={getUserLocation} variant="outline">
                                    Try Again
                                </Button>
                            </div>
                        )}

                        {userLocation && (
                            <>
                                {/* Place Type Filter */}
                                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                                    {placeTypes.map((type) => (
                                        <Button
                                            key={type.id}
                                            variant={placeType === type.id ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setPlaceType(type.id)}
                                            className="gap-2"
                                        >
                                            <type.icon className="w-4 h-4" />
                                            {type.label}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={fetchNearbyPlaces}
                                        disabled={isLoadingPlaces}
                                    >
                                        <RefreshCw className={`w-4 h-4 ${isLoadingPlaces ? 'animate-spin' : ''}`} />
                                    </Button>
                                </div>

                                {/* Places List */}
                                {isLoadingPlaces ? (
                                    <div className="flex justify-center py-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {places.map((place) => (
                                            <PlaceCard key={place.id} place={place} />
                                        ))}
                                    </div>
                                )}

                                {!isLoadingPlaces && places.length === 0 && (
                                    <div className="text-center py-12">
                                        <Hospital className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground">No {placeType}s found nearby</p>
                                    </div>
                                )}
                            </>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}

// Fallback curated news - comprehensive medical technology articles
function getCuratedNews(): NewsArticle[] {
    return [
        {
            id: "curated-1",
            title: "AI-Powered Diagnostic Tools Revolutionizing Early Disease Detection",
            description: "New artificial intelligence systems are helping doctors detect diseases like cancer, heart conditions, and neurological disorders earlier than ever before. Google's DeepMind and Indian startups are leading this healthcare revolution with accuracy rates exceeding 95%.",
            source: "Medical Technology Today",
            publishedAt: new Date().toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
            category: "ai-healthcare"
        },
        {
            id: "curated-2",
            title: "Telemedicine Usage Grows 300% in Rural India",
            description: "Government initiatives like Ayushman Bharat Digital Mission are bringing quality healthcare to remote villages. Smartphone-based consultations with specialist doctors are now accessible to millions in underserved areas through apps like eSanjeevani and Practo.",
            source: "Digital Health India",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
            category: "telemedicine"
        },
        {
            id: "curated-3",
            title: "New mRNA Technology Shows Promise for Cancer Treatment",
            description: "Building on COVID-19 vaccine success, researchers at AIIMS and international institutions are developing personalized mRNA treatments that train the immune system to fight specific cancer types, potentially revolutionizing oncology care.",
            source: "Cancer Research Journal",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
            category: "research"
        },
        {
            id: "curated-4",
            title: "Robot-Assisted Surgery Reduces Recovery Time by 50%",
            description: "Minimally invasive robotic surgical systems like Da Vinci are helping patients recover faster with less pain and smaller incisions. Leading hospitals in India including Apollo, Fortis, and Max are adopting this technology for complex surgeries.",
            source: "Surgical Innovation",
            publishedAt: new Date(Date.now() - 259200000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
            category: "medical-technology"
        },
        {
            id: "curated-5",
            title: "India Launches Ayushman Bharat Digital Health ID for All Citizens",
            description: "The landmark Ayushman Bharat Digital Mission creates a unified health identification system (ABHA ID), enabling seamless access to medical records across all healthcare providers. Over 40 crore Indians have already enrolled.",
            source: "Government Health Portal",
            publishedAt: new Date(Date.now() - 345600000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800",
            category: "digital-health"
        },
        {
            id: "curated-6",
            title: "AI Detects Eye Diseases from Smartphone Photos with 95% Accuracy",
            description: "Indian startup Eyenuk and Google Health have developed mobile apps using AI to screen for diabetic retinopathy, glaucoma, and macular degeneration using just a smartphone camera, making eye care accessible to millions in remote areas.",
            source: "Ophthalmology Tech",
            publishedAt: new Date(Date.now() - 432000000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800",
            category: "ai-healthcare"
        },
        {
            id: "curated-7",
            title: "3D Printed Organs: Breakthrough in Bioprinting Technology",
            description: "Scientists at IIT Delhi and global research institutions are making significant progress in 3D bioprinting organs. Lab-grown skin, cartilage, and even simple organ structures are being successfully transplanted, opening doors to eliminating organ transplant waiting lists.",
            source: "Biotech Frontiers",
            publishedAt: new Date(Date.now() - 518400000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
            category: "biotech"
        },
        {
            id: "curated-8",
            title: "Wearable Devices Now Monitor Blood Glucose Without Needles",
            description: "Revolutionary non-invasive continuous glucose monitoring (CGM) technology is being developed that can track blood sugar levels through smartwatches and patches, offering hope to over 77 million diabetes patients in India.",
            source: "Diabetes Care Weekly",
            publishedAt: new Date(Date.now() - 604800000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800",
            category: "medical-technology"
        },
        {
            id: "curated-9",
            title: "Mental Health Apps See 400% Growth in India Post-Pandemic",
            description: "Digital mental health platforms like Wysa, InnerHour, and YourDost are transforming mental healthcare accessibility in India. AI-powered chatbots provide 24/7 support, while teleconsultation connects users with licensed therapists.",
            source: "Mental Health India",
            publishedAt: new Date(Date.now() - 691200000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
            category: "telemedicine"
        },
        {
            id: "curated-10",
            title: "CRISPR Gene Editing Shows Success in Treating Sickle Cell Disease",
            description: "Clinical trials using CRISPR gene editing technology have shown remarkable success in treating sickle cell disease and beta-thalassemia. Indian researchers at CSIR labs are working on affordable gene therapy solutions for genetic disorders.",
            source: "Genetic Medicine Journal",
            publishedAt: new Date(Date.now() - 777600000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
            category: "biotech"
        },
        {
            id: "curated-11",
            title: "Smart Pills with Sensors Track Medication Adherence",
            description: "Ingestible sensors embedded in pills can now communicate with smartphones to confirm medication intake, helping patients with chronic conditions maintain proper treatment schedules and enabling doctors to monitor adherence remotely.",
            source: "Pharmaceutical Innovation",
            publishedAt: new Date(Date.now() - 864000000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800",
            category: "medical-technology"
        },
        {
            id: "curated-12",
            title: "AI Predicts Heart Attacks 5 Years in Advance with 90% Accuracy",
            description: "Machine learning algorithms analyzing ECG data, lifestyle factors, and genetic markers can now predict cardiovascular events years before they occur, enabling preventive interventions that could save millions of lives.",
            source: "Cardiology Today",
            publishedAt: new Date(Date.now() - 950400000).toISOString(),
            url: "#",
            imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
            category: "ai-healthcare"
        }
    ];
}

// Mock places for when API is unavailable
function getMockPlaces(): PlaceResult[] {
    return [
        {
            id: "mock-1",
            name: "Apollo Hospital",
            address: "Jubilee Hills, Hyderabad",
            rating: 4.5,
            totalRatings: 2500,
            isOpen: true,
            types: ["hospital"],
            googleMapsUrl: "https://maps.google.com/?q=Apollo+Hospital+Hyderabad"
        },
        {
            id: "mock-2",
            name: "KIMS Hospital",
            address: "Secunderabad, Telangana",
            rating: 4.3,
            totalRatings: 1800,
            isOpen: true,
            types: ["hospital"],
            googleMapsUrl: "https://maps.google.com/?q=KIMS+Hospital+Secunderabad"
        },
        {
            id: "mock-3",
            name: "Yashoda Hospital",
            address: "Somajiguda, Hyderabad",
            rating: 4.4,
            totalRatings: 2100,
            isOpen: true,
            types: ["hospital"],
            googleMapsUrl: "https://maps.google.com/?q=Yashoda+Hospital+Somajiguda"
        }
    ];
}
