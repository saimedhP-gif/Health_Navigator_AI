import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Mic,
    MicOff,
    Send,
    Loader2,
    Sparkles,
    AlertTriangle,
    CheckCircle2,
    Pill,
    Home,
    Stethoscope,
    Clock,
    MapPin,
    ChevronRight,
    ArrowRight,
    Heart,
    Activity,
    Thermometer,
    Brain,
    Shield,
    Leaf,
    Phone,
    Building2,
    User,
    RefreshCw,
    Volume2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VoiceInputButton, useTextToSpeech } from "@/components/voice/VoiceAssistant";

// Condition database with care pathways
const conditionDatabase = [
    {
        id: "common-cold",
        name: "Common Cold",
        description: "Viral infection affecting the upper respiratory tract",
        symptoms: ["runny nose", "sneezing", "sore throat", "cough", "congestion", "mild fever", "body aches"],
        severity: "mild",
        selfCare: [
            "Rest and get plenty of sleep",
            "Stay hydrated - drink 8-10 glasses of water daily",
            "Use saline nasal spray for congestion",
            "Gargle with warm salt water for sore throat",
            "Use a humidifier to add moisture to air",
            "Drink warm fluids like soup and herbal tea"
        ],
        otcMedications: [
            { name: "Paracetamol (Crocin/Dolo)", dosage: "500-650mg", frequency: "Every 4-6 hours", purpose: "Fever and body aches" },
            { name: "Cetirizine", dosage: "10mg", frequency: "Once daily", purpose: "Runny nose and sneezing" },
            { name: "Nasal Decongestant Spray", dosage: "As directed", frequency: "Max 3 days", purpose: "Nasal congestion" }
        ],
        seeDoctor: "If symptoms last more than 10 days, high fever (>102°F), difficulty breathing, or symptoms worsen",
        specialist: "General Physician",
        urgency: "low"
    },
    {
        id: "migraine",
        name: "Migraine",
        description: "Severe headache often with nausea and sensitivity to light",
        symptoms: ["severe headache", "one-sided headache", "throbbing pain", "nausea", "vomiting", "light sensitivity", "aura"],
        severity: "moderate",
        selfCare: [
            "Rest in a quiet, dark room",
            "Apply cold compress to forehead",
            "Stay hydrated",
            "Avoid screens and bright lights",
            "Try relaxation techniques",
            "Maintain regular sleep schedule"
        ],
        otcMedications: [
            { name: "Ibuprofen", dosage: "400mg", frequency: "Every 6-8 hours", purpose: "Pain relief" },
            { name: "Paracetamol + Caffeine", dosage: "As directed", frequency: "At onset", purpose: "Migraine relief" },
            { name: "Domperidone", dosage: "10mg", frequency: "Before meals if nauseous", purpose: "Nausea" }
        ],
        seeDoctor: "If migraines are frequent (>4/month), extremely severe, or accompanied by confusion, weakness, or vision changes",
        specialist: "Neurologist",
        urgency: "medium"
    },
    {
        id: "gastritis",
        name: "Gastritis / Acidity",
        description: "Inflammation of stomach lining causing burning sensation",
        symptoms: ["stomach pain", "burning sensation", "acidity", "bloating", "nausea", "indigestion", "heartburn"],
        severity: "mild",
        selfCare: [
            "Eat smaller, frequent meals",
            "Avoid spicy, fried, and acidic foods",
            "Don't lie down immediately after eating",
            "Reduce stress with relaxation techniques",
            "Avoid alcohol and smoking",
            "Drink cold milk for temporary relief"
        ],
        otcMedications: [
            { name: "Antacid (Digene/Gelusil)", dosage: "As directed", frequency: "After meals", purpose: "Neutralize stomach acid" },
            { name: "Pantoprazole", dosage: "40mg", frequency: "Before breakfast", purpose: "Reduce acid production" },
            { name: "Domperidone", dosage: "10mg", frequency: "Before meals", purpose: "Improve digestion" }
        ],
        seeDoctor: "If symptoms persist more than 2 weeks, vomiting blood, black stools, or severe pain",
        specialist: "Gastroenterologist",
        urgency: "low"
    },
    {
        id: "anxiety",
        name: "Anxiety / Stress",
        description: "Feelings of worry, nervousness, or unease",
        symptoms: ["anxiety", "worry", "nervousness", "racing heart", "sweating", "difficulty sleeping", "restlessness", "panic"],
        severity: "moderate",
        selfCare: [
            "Practice deep breathing exercises (4-7-8 technique)",
            "Try progressive muscle relaxation",
            "Exercise regularly - at least 30 mins daily",
            "Limit caffeine and alcohol",
            "Maintain a regular sleep schedule",
            "Practice mindfulness or meditation",
            "Talk to a trusted friend or family member"
        ],
        otcMedications: [
            { name: "Ashwagandha supplements", dosage: "300-600mg", frequency: "Daily", purpose: "Stress reduction" },
            { name: "Melatonin (for sleep)", dosage: "3-5mg", frequency: "Before bed", purpose: "Sleep issues" }
        ],
        seeDoctor: "If anxiety interferes with daily life, panic attacks, or thoughts of self-harm",
        specialist: "Psychiatrist / Psychologist",
        urgency: "medium"
    },
    {
        id: "back-pain",
        name: "Lower Back Pain",
        description: "Pain in the lower back region, often from muscle strain",
        symptoms: ["back pain", "lower back pain", "muscle stiffness", "difficulty moving", "pain when bending"],
        severity: "mild",
        selfCare: [
            "Apply hot or cold compress",
            "Maintain good posture",
            "Avoid prolonged sitting",
            "Do gentle stretching exercises",
            "Sleep on a firm mattress",
            "Use ergonomic chair for work"
        ],
        otcMedications: [
            { name: "Ibuprofen", dosage: "400mg", frequency: "Every 6-8 hours with food", purpose: "Pain and inflammation" },
            { name: "Muscle relaxant (Thiocolchicoside)", dosage: "4mg", frequency: "Twice daily", purpose: "Muscle spasm" },
            { name: "Pain relief spray/gel", dosage: "Apply locally", frequency: "2-3 times daily", purpose: "Topical relief" }
        ],
        seeDoctor: "If pain persists >2 weeks, numbness/tingling in legs, or follows an injury",
        specialist: "Orthopedic Specialist",
        urgency: "low"
    },
    {
        id: "food-poisoning",
        name: "Food Poisoning",
        description: "Illness from consuming contaminated food or water",
        symptoms: ["vomiting", "diarrhea", "stomach cramps", "nausea", "fever", "food poisoning"],
        severity: "moderate",
        selfCare: [
            "Stay hydrated with ORS solution",
            "Rest and avoid solid food initially",
            "Eat bland foods (bananas, rice, toast) when ready",
            "Avoid dairy, caffeine, and spicy foods",
            "Wash hands frequently",
            "Don't take anti-diarrheal unless advised"
        ],
        otcMedications: [
            { name: "ORS (Oral Rehydration Salt)", dosage: "1 sachet in 1L water", frequency: "Sip frequently", purpose: "Prevent dehydration" },
            { name: "Ondansetron", dosage: "4mg", frequency: "As needed", purpose: "Stop vomiting" },
            { name: "Probiotics", dosage: "As directed", frequency: "Daily", purpose: "Restore gut bacteria" }
        ],
        seeDoctor: "If symptoms last >2 days, blood in stool, high fever, or signs of severe dehydration",
        specialist: "General Physician / Gastroenterologist",
        urgency: "medium"
    },
    {
        id: "allergic-reaction",
        name: "Allergic Reaction",
        description: "Immune system response to an allergen",
        symptoms: ["itching", "rash", "hives", "swelling", "sneezing", "watery eyes", "allergic reaction"],
        severity: "mild to severe",
        selfCare: [
            "Identify and avoid the allergen",
            "Apply cold compress to itchy areas",
            "Wear loose, comfortable clothing",
            "Take a cool bath",
            "Use hypoallergenic products",
            "Keep environment clean and dust-free"
        ],
        otcMedications: [
            { name: "Cetirizine", dosage: "10mg", frequency: "Once daily", purpose: "Antihistamine" },
            { name: "Calamine lotion", dosage: "Apply locally", frequency: "2-3 times daily", purpose: "Soothe itching" },
            { name: "Hydrocortisone cream 1%", dosage: "Thin layer", frequency: "Twice daily", purpose: "Reduce inflammation" }
        ],
        seeDoctor: "IMMEDIATELY if difficulty breathing, throat swelling, or dizziness (anaphylaxis)",
        specialist: "Allergist / Immunologist",
        urgency: "high"
    }
];

// Nearby hospitals (sample data)
const nearbyHospitals = [
    { name: "Apollo Hospitals", distance: "1.2 km", type: "Multi-specialty", emergency: true },
    { name: "KIMS Hospital", distance: "2.5 km", type: "Super-specialty", emergency: true },
    { name: "Care Hospital", distance: "3.0 km", type: "Multi-specialty", emergency: true }
];

export default function SmartDiagnosis() {
    const { toast } = useToast();
    const { speak } = useTextToSpeech();
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [symptomInput, setSymptomInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<typeof conditionDatabase[0] | null>(null);
    const [showCarePathway, setShowCarePathway] = useState(false);
    const [activePathwayTab, setActivePathwayTab] = useState<"selfcare" | "medications" | "doctor" | "hospitals">("selfcare");

    // Handle voice input
    const handleVoiceInput = (transcript: string) => {
        setSymptomInput(prev => prev + (prev ? " " : "") + transcript);
        setIsListening(false);
    };

    // Analyze symptoms
    const analyzeSymptoms = async () => {
        if (!symptomInput.trim()) {
            toast({
                title: "Please describe your symptoms",
                description: "Tell us what you're experiencing in your own words.",
                variant: "destructive"
            });
            return;
        }

        setIsAnalyzing(true);

        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Find matching condition based on keywords
        const inputLower = symptomInput.toLowerCase();
        let bestMatch = conditionDatabase[0];
        let highestScore = 0;

        conditionDatabase.forEach(condition => {
            let score = 0;
            condition.symptoms.forEach(symptom => {
                if (inputLower.includes(symptom.toLowerCase())) {
                    score++;
                }
            });
            if (score > highestScore) {
                highestScore = score;
                bestMatch = condition;
            }
        });

        setAnalysisResult(bestMatch);
        setShowCarePathway(true);
        setIsAnalyzing(false);

        // Voice feedback
        speak({
            text: `Based on your symptoms, this could be ${bestMatch.name}. Let me show you a personalized care pathway.`,
            language: "en",
            rate: 1.0
        });

        toast({
            title: "Analysis Complete! ✨",
            description: `Possible condition identified: ${bestMatch.name}`,
        });
    };

    // Reset analysis
    const resetAnalysis = () => {
        setSymptomInput("");
        setAnalysisResult(null);
        setShowCarePathway(false);
        setActivePathwayTab("selfcare");
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background py-12">
                <div className="container max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-primary font-medium">AI-Powered Diagnosis</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Smart Symptom Analysis 🔬</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Describe your symptoms naturally and get a personalized care pathway with treatment options.
                        </p>
                    </motion.div>

                    {/* Main Content */}
                    <AnimatePresence mode="wait">
                        {!showCarePathway ? (
                            // Symptom Input Section
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Disclaimer */}
                                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-amber-600 dark:text-amber-400">Important</p>
                                            <p className="text-muted-foreground mt-1">
                                                This AI tool provides general guidance only. For medical emergencies, call 112 or visit the nearest hospital immediately.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Card */}
                                <div className="health-card">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-primary" />
                                        Describe Your Symptoms
                                    </h2>

                                    <div className="relative">
                                        <textarea
                                            ref={inputRef}
                                            value={symptomInput}
                                            onChange={(e) => setSymptomInput(e.target.value)}
                                            placeholder="Tell me what you're experiencing... 

For example:
• I have a bad headache and feeling nauseous
• I've had stomach pain and acidity since morning
• I'm feeling anxious and can't sleep well"
                                            className="w-full p-4 rounded-xl border-2 border-border bg-background resize-none h-40 focus:border-primary focus:outline-none pr-16"
                                        />

                                        {/* Voice Input Button */}
                                        <div className="absolute bottom-4 right-4">
                                            <VoiceInputButton
                                                onTranscript={handleVoiceInput}
                                                language="en"
                                                className="w-10 h-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Symptom Buttons */}
                                    <div className="mt-4">
                                        <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["Headache", "Fever", "Stomach pain", "Cough", "Anxiety", "Back pain", "Nausea"].map((symptom) => (
                                                <button
                                                    key={symptom}
                                                    onClick={() => setSymptomInput(prev => prev + (prev ? ", " : "") + symptom.toLowerCase())}
                                                    className="px-3 py-1.5 rounded-full text-sm bg-muted hover:bg-muted/80 transition-colors"
                                                >
                                                    + {symptom}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Analyze Button */}
                                    <Button
                                        onClick={analyzeSymptoms}
                                        disabled={isAnalyzing || !symptomInput.trim()}
                                        className="w-full mt-6 gap-2"
                                        size="lg"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Analyzing your symptoms...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Analyze & Get Care Pathway
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* How it Works */}
                                <div className="health-card">
                                    <h3 className="font-semibold mb-4">How It Works</h3>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                                            <div>
                                                <h4 className="font-medium text-sm">Describe Symptoms</h4>
                                                <p className="text-xs text-muted-foreground">Use voice or text</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                                            <div>
                                                <h4 className="font-medium text-sm">AI Analysis</h4>
                                                <p className="text-xs text-muted-foreground">Identify possible conditions</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                                            <div>
                                                <h4 className="font-medium text-sm">Care Pathway</h4>
                                                <p className="text-xs text-muted-foreground">Get personalized guidance</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            // Care Pathway Results
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Diagnosis Summary */}
                                {analysisResult && (
                                    <div className={`health-card border-2 ${analysisResult.urgency === "high" ? "border-red-500 bg-red-500/5" :
                                            analysisResult.urgency === "medium" ? "border-amber-500 bg-amber-500/5" :
                                                "border-green-500 bg-green-500/5"
                                        }`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${analysisResult.urgency === "high" ? "bg-red-500/20 text-red-500" :
                                                            analysisResult.urgency === "medium" ? "bg-amber-500/20 text-amber-500" :
                                                                "bg-green-500/20 text-green-500"
                                                        }`}>
                                                        {analysisResult.urgency === "high" ? "⚠️ Urgent" :
                                                            analysisResult.urgency === "medium" ? "📋 Moderate" :
                                                                "✓ Mild"}
                                                    </span>
                                                </div>
                                                <h2 className="text-2xl font-bold">{analysisResult.name}</h2>
                                                <p className="text-muted-foreground mt-1">{analysisResult.description}</p>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={resetAnalysis} className="gap-2">
                                                <RefreshCw className="w-4 h-4" />
                                                New Analysis
                                            </Button>
                                        </div>

                                        {/* User's Input */}
                                        <div className="mt-4 p-3 rounded-xl bg-muted/50">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-medium">Your symptoms:</span> {symptomInput}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Care Pathway Tabs */}
                                <div className="health-card">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-primary" />
                                        Your Personalized Care Pathway
                                    </h2>

                                    {/* Tab Navigation */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {[
                                            { id: "selfcare", label: "Self-Care", icon: Home },
                                            { id: "medications", label: "Medications", icon: Pill },
                                            { id: "doctor", label: "See Doctor", icon: Stethoscope },
                                            { id: "hospitals", label: "Hospitals", icon: Building2 }
                                        ].map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActivePathwayTab(tab.id as any)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${activePathwayTab === tab.id
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted hover:bg-muted/80"
                                                    }`}
                                            >
                                                <tab.icon className="w-4 h-4" />
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab Content */}
                                    <AnimatePresence mode="wait">
                                        {/* Self-Care Tab */}
                                        {activePathwayTab === "selfcare" && analysisResult && (
                                            <motion.div
                                                key="selfcare"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-3"
                                            >
                                                <h3 className="font-semibold flex items-center gap-2 text-green-500">
                                                    <Home className="w-5 h-5" />
                                                    Immediate Self-Care Steps
                                                </h3>
                                                <div className="grid gap-3">
                                                    {analysisResult.selfCare.map((step, i) => (
                                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                            <span className="text-sm">{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Medications Tab */}
                                        {activePathwayTab === "medications" && analysisResult && (
                                            <motion.div
                                                key="medications"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-4"
                                            >
                                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
                                                    <p className="text-sm text-amber-600 flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                        Always consult a doctor or pharmacist before taking any medication.
                                                    </p>
                                                </div>

                                                <h3 className="font-semibold flex items-center gap-2 text-purple-500">
                                                    <Pill className="w-5 h-5" />
                                                    Suggested OTC Medications
                                                </h3>
                                                <div className="space-y-3">
                                                    {analysisResult.otcMedications.map((med, i) => (
                                                        <div key={i} className="p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <span className="text-2xl">💊</span>
                                                                <div>
                                                                    <h4 className="font-semibold">{med.name}</h4>
                                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{med.purpose}</span>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                                <div>
                                                                    <span className="text-muted-foreground">Dosage:</span>
                                                                    <p className="font-medium">{med.dosage}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-muted-foreground">Frequency:</span>
                                                                    <p className="font-medium">{med.frequency}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* See Doctor Tab */}
                                        {activePathwayTab === "doctor" && analysisResult && (
                                            <motion.div
                                                key="doctor"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-4"
                                            >
                                                <h3 className="font-semibold flex items-center gap-2 text-blue-500">
                                                    <Stethoscope className="w-5 h-5" />
                                                    When to See a Doctor
                                                </h3>

                                                <div className={`p-4 rounded-xl ${analysisResult.urgency === "high" ? "bg-red-500/10 border-2 border-red-500" :
                                                        analysisResult.urgency === "medium" ? "bg-amber-500/10 border-2 border-amber-500" :
                                                            "bg-blue-500/10 border-2 border-blue-500"
                                                    }`}>
                                                    <div className="flex items-start gap-3">
                                                        <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${analysisResult.urgency === "high" ? "text-red-500" :
                                                                analysisResult.urgency === "medium" ? "text-amber-500" :
                                                                    "text-blue-500"
                                                            }`} />
                                                        <div>
                                                            <h4 className="font-semibold mb-1">Seek Medical Attention If:</h4>
                                                            <p className="text-sm">{analysisResult.seeDoctor}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4 rounded-xl bg-muted/50">
                                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                        <User className="w-5 h-5 text-primary" />
                                                        Recommended Specialist
                                                    </h4>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                                <Stethoscope className="w-6 h-6 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold">{analysisResult.specialist}</p>
                                                                <p className="text-sm text-muted-foreground">Specialist for this condition</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="outline" size="sm">
                                                            Find Nearby
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Hospitals Tab */}
                                        {activePathwayTab === "hospitals" && (
                                            <motion.div
                                                key="hospitals"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-4"
                                            >
                                                <h3 className="font-semibold flex items-center gap-2 text-red-500">
                                                    <Building2 className="w-5 h-5" />
                                                    Nearest Hospitals
                                                </h3>

                                                <div className="space-y-3">
                                                    {nearbyHospitals.map((hospital, i) => (
                                                        <div key={i} className="p-4 rounded-xl border border-border hover:border-red-500/50 transition-colors">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                                                        <Building2 className="w-6 h-6 text-red-500" />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">{hospital.name}</h4>
                                                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                                            <span className="flex items-center gap-1">
                                                                                <MapPin className="w-3 h-3" /> {hospital.distance}
                                                                            </span>
                                                                            <span>{hospital.type}</span>
                                                                            {hospital.emergency && (
                                                                                <span className="text-red-500">24/7 Emergency</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Button size="sm" variant="destructive" className="gap-1">
                                                                    <Phone className="w-4 h-4" />
                                                                    Call
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <Link to="/emergency">
                                                    <Button variant="outline" className="w-full gap-2 mt-4">
                                                        <MapPin className="w-4 h-4" />
                                                        View All Emergency Services
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Emergency Warning */}
                                <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/30">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-red-500">Medical Emergency?</p>
                                            <p className="text-sm text-muted-foreground">
                                                If you're experiencing a medical emergency, call <strong>112</strong> immediately or visit the nearest emergency room.
                                            </p>
                                        </div>
                                        <a href="tel:112">
                                            <Button variant="destructive" className="gap-2">
                                                <Phone className="w-4 h-4" />
                                                112
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}
