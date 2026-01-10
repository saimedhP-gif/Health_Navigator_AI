import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Camera,
    Upload,
    X,
    Sparkles,
    AlertTriangle,
    CheckCircle2,
    Loader2,
    Image,
    Stethoscope,
    Calendar,
    ChevronRight,
    Info,
    Phone,
    MapPin,
    Clock,
    ArrowRight,
    RotateCcw,
    History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Common skin conditions database
const skinConditions = [
    {
        id: "acne",
        name: "Acne",
        description: "Common skin condition causing pimples, usually on the face",
        severity: "mild",
        symptoms: ["Pimples", "Blackheads", "Whiteheads", "Oily skin"],
        treatments: ["Benzoyl peroxide", "Salicylic acid wash", "Keep skin clean", "Avoid touching face"],
        seeDoctor: "If severe, painful cysts, or not improving after 2-3 weeks of OTC treatment"
    },
    {
        id: "eczema",
        name: "Eczema (Dermatitis)",
        description: "Inflammatory condition causing itchy, red, dry skin",
        severity: "moderate",
        symptoms: ["Itchy skin", "Red patches", "Dry, scaly skin", "Inflammation"],
        treatments: ["Moisturize regularly", "Use mild soaps", "Avoid irritants", "Hydrocortisone cream"],
        seeDoctor: "If widespread, infected, or not responding to treatment"
    },
    {
        id: "psoriasis",
        name: "Psoriasis",
        description: "Chronic condition causing thick, scaly patches of skin",
        severity: "moderate",
        symptoms: ["Thick, red patches", "Silvery scales", "Dry, cracked skin", "Itching"],
        treatments: ["Coal tar products", "Moisturizers", "Vitamin D creams", "Light therapy"],
        seeDoctor: "Recommended for proper diagnosis and treatment plan"
    },
    {
        id: "ringworm",
        name: "Ringworm (Fungal Infection)",
        description: "Fungal infection causing ring-shaped rash",
        severity: "mild",
        symptoms: ["Ring-shaped rash", "Red, scaly border", "Itching", "Clear center"],
        treatments: ["Antifungal cream", "Keep area dry", "Don't share towels", "Wash hands often"],
        seeDoctor: "If spreading, on scalp, or not improving after 2 weeks"
    },
    {
        id: "rash",
        name: "Skin Rash",
        description: "General skin irritation that can have many causes",
        severity: "varies",
        symptoms: ["Redness", "Bumps", "Itching", "Skin changes"],
        treatments: ["Identify and avoid trigger", "Calamine lotion", "Cool compress", "Antihistamines"],
        seeDoctor: "If accompanied by fever, spreading rapidly, or difficulty breathing"
    },
    {
        id: "hives",
        name: "Hives (Urticaria)",
        description: "Raised, itchy welts triggered by allergic reaction",
        severity: "mild to moderate",
        symptoms: ["Raised welts", "Intense itching", "Red or skin-colored", "Come and go"],
        treatments: ["Antihistamines", "Cool compress", "Avoid triggers", "Loose clothing"],
        seeDoctor: "Immediately if accompanied by breathing difficulty or swelling of face/throat"
    }
];

// Dermatologists near me (dummy data)
const dermatologists = [
    { name: "Dr. Priya Sharma", specialty: "General Dermatology", rating: 4.8, distance: "1.2 km", available: "Today" },
    { name: "Dr. Rajesh Kumar", specialty: "Cosmetic Dermatology", rating: 4.6, distance: "2.5 km", available: "Tomorrow" },
    { name: "Dr. Anita Patel", specialty: "Pediatric Dermatology", rating: 4.9, distance: "3.1 km", available: "Today" },
    { name: "Dr. Vivek Mehta", specialty: "Skin Allergies", rating: 4.7, distance: "4.0 km", available: "Wed" }
];

interface AnalysisResult {
    condition: typeof skinConditions[0];
    confidence: number;
    alternateConditions: { name: string; confidence: number }[];
}

export default function SkinAnalyzer() {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [showHistory, setShowHistory] = useState(false);
    const [analysisHistory, setAnalysisHistory] = useState<{ date: string; image: string; result: AnalysisResult }[]>([]);

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast({
                    title: "Invalid file type",
                    description: "Please upload an image file (JPG, PNG, etc.)",
                    variant: "destructive"
                });
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
                setAnalysisResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    // Simulate AI analysis
    const analyzeImage = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);

        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Randomly select a condition for demo
        const randomIndex = Math.floor(Math.random() * skinConditions.length);
        const mainCondition = skinConditions[randomIndex];

        // Generate alternate possibilities
        const alternates = skinConditions
            .filter(c => c.id !== mainCondition.id)
            .slice(0, 2)
            .map(c => ({ name: c.name, confidence: Math.floor(Math.random() * 30) + 10 }));

        const result: AnalysisResult = {
            condition: mainCondition,
            confidence: Math.floor(Math.random() * 25) + 65,
            alternateConditions: alternates
        };

        setAnalysisResult(result);
        setIsAnalyzing(false);

        // Save to history
        setAnalysisHistory(prev => [{
            date: new Date().toISOString(),
            image: selectedImage,
            result
        }, ...prev].slice(0, 10));

        toast({
            title: "Analysis Complete! ✨",
            description: "Review the results below. Remember to consult a dermatologist for proper diagnosis.",
        });
    };

    // Reset
    const resetAnalyzer = () => {
        setSelectedImage(null);
        setAnalysisResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-amber-500/5 to-background py-12">
                <div className="container max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                            <Camera className="w-5 h-5 text-amber-500" />
                            <span className="text-amber-500 font-medium">Skin Condition Analyzer</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Dermatology Assistant 🔬</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Upload a photo of your skin concern for AI-powered analysis. Get insights on possible conditions and treatment options.
                        </p>
                    </motion.div>

                    {/* Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-8"
                    >
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-medium text-amber-600 dark:text-amber-400">Important Disclaimer</p>
                                <p className="text-muted-foreground mt-1">
                                    This AI tool provides preliminary information only and is NOT a substitute for professional medical diagnosis.
                                    Always consult a qualified dermatologist for proper evaluation and treatment.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Upload Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="health-card"
                        >
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Camera className="w-5 h-5 text-amber-500" />
                                Upload Image
                            </h2>

                            {!selectedImage ? (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-amber-500/50 transition-colors"
                                >
                                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="font-medium mb-1">Click to upload image</p>
                                    <p className="text-sm text-muted-foreground">or drag and drop</p>
                                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 10MB</p>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={selectedImage}
                                        alt="Uploaded skin condition"
                                        className="w-full h-64 object-cover rounded-xl"
                                    />
                                    <button
                                        onClick={resetAnalyzer}
                                        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />

                            {selectedImage && !analysisResult && (
                                <Button
                                    onClick={analyzeImage}
                                    disabled={isAnalyzing}
                                    className="w-full mt-4 gap-2"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            Analyze Image
                                        </>
                                    )}
                                </Button>
                            )}

                            {analysisResult && (
                                <Button
                                    onClick={resetAnalyzer}
                                    variant="outline"
                                    className="w-full mt-4 gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Analyze Another Image
                                </Button>
                            )}
                        </motion.div>

                        {/* Results / Tips Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <AnimatePresence mode="wait">
                                {isAnalyzing ? (
                                    <motion.div
                                        key="analyzing"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="health-card h-full flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                                            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                                        </div>
                                        <h3 className="font-semibold mb-2">Analyzing Your Image...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Our AI is examining the image for patterns and characteristics
                                        </p>
                                    </motion.div>
                                ) : analysisResult ? (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="health-card"
                                    >
                                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-amber-500" />
                                            Analysis Results
                                        </h2>

                                        {/* Main Result */}
                                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-bold text-lg">{analysisResult.condition.name}</h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${analysisResult.confidence > 75
                                                        ? "bg-green-500/20 text-green-500"
                                                        : "bg-amber-500/20 text-amber-500"
                                                    }`}>
                                                    {analysisResult.confidence}% match
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">{analysisResult.condition.description}</p>

                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-xs font-medium text-muted-foreground">Common Symptoms:</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {analysisResult.condition.symptoms.map((s, i) => (
                                                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Other Possibilities */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium mb-2">Other Possibilities:</h4>
                                            <div className="space-y-2">
                                                {analysisResult.alternateConditions.map((alt, i) => (
                                                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                                        <span className="text-sm">{alt.name}</span>
                                                        <span className="text-xs text-muted-foreground">{alt.confidence}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* When to See Doctor */}
                                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                                            <h4 className="text-sm font-medium text-red-500 mb-1 flex items-center gap-1">
                                                <AlertTriangle className="w-4 h-4" />
                                                See a Doctor If:
                                            </h4>
                                            <p className="text-xs text-muted-foreground">{analysisResult.condition.seeDoctor}</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="tips"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="health-card"
                                    >
                                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Info className="w-5 h-5 text-amber-500" />
                                            Photo Tips
                                        </h2>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-sm">Use good lighting - natural light works best</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-sm">Take a clear, focused close-up of the affected area</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-sm">Include some surrounding normal skin for comparison</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-sm">Avoid using filters or image editing</span>
                                            </li>
                                        </ul>

                                        <div className="mt-6 p-4 rounded-xl bg-muted/50">
                                            <h3 className="font-medium mb-2">What we can analyze:</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {["Acne", "Eczema", "Rashes", "Psoriasis", "Fungal Infections", "Hives"].map((item) => (
                                                    <span key={item} className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-600">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Treatment Suggestions (shown after analysis) */}
                    {analysisResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="health-card mt-6"
                        >
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Stethoscope className="w-5 h-5 text-amber-500" />
                                Suggested Care
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {analysisResult.condition.treatments.map((treatment, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">{treatment}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Find Dermatologists */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="health-card mt-6"
                    >
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-amber-500" />
                            Dermatologists Near You
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {dermatologists.map((doc, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-xl border border-border hover:border-amber-500/50 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                            <Stethoscope className="w-6 h-6 text-amber-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{doc.name}</h3>
                                            <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {doc.distance}
                                                </span>
                                                <span className="text-xs flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {doc.available}
                                                </span>
                                                <span className="text-xs text-amber-500">★ {doc.rating}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Analysis History */}
                    {analysisHistory.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="health-card mt-6"
                        >
                            <button
                                onClick={() => setShowHistory(!showHistory)}
                                className="w-full flex items-center justify-between"
                            >
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <History className="w-5 h-5 text-amber-500" />
                                    Analysis History
                                </h2>
                                <ChevronRight className={`w-5 h-5 transition-transform ${showHistory ? "rotate-90" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {showHistory && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 space-y-3"
                                    >
                                        {analysisHistory.map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                                                <img
                                                    src={item.image}
                                                    alt="History item"
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-medium">{item.result.condition.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.result.confidence}% confidence
                                                    </p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(item.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
