import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Search,
    X,
    ChevronRight,
    ArrowLeft,
    AlertTriangle,
    CheckCircle2,
    Heart,
    Activity,
    Utensils,
    Dumbbell,
    Pill,
    Calendar,
    Brain,
    Compass,
    Sun,
    Moon,
    Clock,
    XCircle,
    CheckCircle
} from "lucide-react";
import { chronicDiseases, type ChronicDisease } from "@/data/chronicDiseases";

const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
        "Metabolic": "from-teal-500 to-emerald-500",
        "Cardiovascular": "from-red-500 to-rose-500",
        "Respiratory": "from-blue-500 to-cyan-500",
        "Musculoskeletal": "from-amber-500 to-orange-500",
    };
    return colorMap[category] || "from-purple-500 to-indigo-500";
};

const getCategoryBg = (category: string): string => {
    const colorMap: Record<string, string> = {
        "Metabolic": "bg-teal-500",
        "Cardiovascular": "bg-red-500",
        "Respiratory": "bg-blue-500",
        "Musculoskeletal": "bg-amber-500",
    };
    return colorMap[category] || "bg-purple-500";
};

type TabType = "overview" | "daily" | "diet" | "exercise" | "medication" | "monitoring";

export default function ChronicDiseaseNavigator() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDisease, setSelectedDisease] = useState<ChronicDisease | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>("overview");

    const filteredDiseases = chronicDiseases.filter((disease) =>
        disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
        { id: "overview", label: "Overview", icon: Compass },
        { id: "daily", label: "Daily Care", icon: Calendar },
        { id: "diet", label: "Diet", icon: Utensils },
        { id: "exercise", label: "Exercise", icon: Dumbbell },
        { id: "medication", label: "Medication", icon: Pill },
        { id: "monitoring", label: "Monitoring", icon: Activity },
    ];

    return (
        <Layout>
            <div className="min-h-[80vh] py-8 md:py-12">
                <div className="container max-w-5xl">
                    <AnimatePresence mode="wait">
                        {!selectedDisease ? (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-rose-500 text-white mb-4">
                                        <Compass className="w-8 h-8" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                        Chronic Disease Navigator
                                    </h1>
                                    <p className="text-muted-foreground text-lg">
                                        Your comprehensive guide to <span className="font-semibold text-primary">managing chronic conditions</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Daily care tips, diet guides, exercise plans & monitoring checklists
                                    </p>
                                </div>

                                {/* Search */}
                                <div className="relative mb-8">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search conditions... (e.g., diabetes, heart disease)"
                                        className="w-full pl-12 pr-12 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-lg"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"
                                        >
                                            <X className="w-5 h-5 text-muted-foreground" />
                                        </button>
                                    )}
                                </div>

                                {/* Results count */}
                                <p className="text-sm text-muted-foreground mb-4">
                                    {filteredDiseases.length} chronic conditions covered
                                </p>

                                {/* Disease Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredDiseases.map((disease, index) => {
                                        const gradient = getCategoryColor(disease.category);
                                        return (
                                            <motion.button
                                                key={disease.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: Math.min(index * 0.1, 0.5) }}
                                                onClick={() => {
                                                    setSelectedDisease(disease);
                                                    setActiveTab("overview");
                                                }}
                                                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 text-left hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                                            >
                                                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradient}`} />

                                                <div className="flex items-start gap-4">
                                                    <div className="text-5xl">{disease.icon}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                                                            {disease.name}
                                                        </h3>
                                                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                                                            {disease.category}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {disease.description}
                                                        </p>
                                                    </div>
                                                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                                </div>

                                                <div className="flex gap-2 mt-4 flex-wrap">
                                                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                                        Daily Care Guide
                                                    </span>
                                                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 font-medium">
                                                        Diet Plan
                                                    </span>
                                                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-medium">
                                                        Exercise Tips
                                                    </span>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {filteredDiseases.length === 0 && (
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground">No conditions found for "{searchQuery}"</p>
                                    </div>
                                )}

                                {/* Info Box */}
                                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-rose-500/10 border border-primary/20">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Heart className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2">Living Well with Chronic Conditions</h3>
                                            <p className="text-muted-foreground">
                                                Managing a chronic condition is a journey. This navigator provides daily guidance,
                                                monitoring checklists, and lifestyle tips to help you take control of your health.
                                                <span className="text-primary font-medium"> Small daily actions lead to big improvements!</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="detail"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {/* Back Button */}
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedDisease(null)}
                                    className="gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Conditions
                                </Button>

                                {/* Header Card */}
                                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getCategoryColor(selectedDisease.category)} p-8 text-white`}>
                                    <div className="absolute top-0 right-0 text-[150px] opacity-20 leading-none">
                                        {selectedDisease.icon}
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-white/80 text-sm uppercase tracking-wide mb-2">
                                            {selectedDisease.category}
                                        </p>
                                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                            {selectedDisease.name} Navigator
                                        </h1>
                                        <p className="text-white/90 text-lg mb-4">
                                            {selectedDisease.description}
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                                            <Activity className="w-4 h-4" />
                                            <span className="text-sm">{selectedDisease.prevalence}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Tabs */}
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {tabs.map((tab) => (
                                        <Button
                                            key={tab.id}
                                            variant={activeTab === tab.id ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setActiveTab(tab.id)}
                                            className="gap-2 flex-shrink-0 rounded-full"
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </Button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {activeTab === "overview" && (
                                            <div className="space-y-6">
                                                {/* Risk Factors */}
                                                <div className="health-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                                            <AlertTriangle className="w-6 h-6 text-amber-500" />
                                                        </div>
                                                        <h2 className="text-xl font-bold">Risk Factors</h2>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {selectedDisease.riskFactors.map((factor, index) => (
                                                            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                                                                <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-600">
                                                                    {index + 1}
                                                                </span>
                                                                <span className="text-sm">{factor}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Symptoms */}
                                                <div className="health-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                                            <Activity className="w-6 h-6 text-blue-500" />
                                                        </div>
                                                        <h2 className="text-xl font-bold">Common Symptoms</h2>
                                                    </div>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {selectedDisease.symptoms.map((symptom, index) => (
                                                            <li key={index} className="flex items-start gap-3">
                                                                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                                <span>{symptom}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Emergency Signs */}
                                                <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/30 border-2 border-red-400 dark:border-red-600">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                                                            <AlertTriangle className="w-6 h-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-xl font-bold text-red-700 dark:text-red-400">🚨 Emergency Warning Signs</h2>
                                                            <p className="text-sm text-red-600">Seek immediate medical help if you experience:</p>
                                                        </div>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {selectedDisease.emergencySigns.map((sign, index) => (
                                                            <li key={index} className="flex items-start gap-3">
                                                                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                                <span className="text-red-800 dark:text-red-200 font-medium">{sign}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Emotional Support */}
                                                <div className="health-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                                            <Brain className="w-6 h-6 text-purple-500" />
                                                        </div>
                                                        <h2 className="text-xl font-bold">Emotional Support & Mental Health</h2>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {selectedDisease.emotionalSupport.map((tip, index) => (
                                                            <li key={index} className="flex items-start gap-3">
                                                                <Heart className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                                                <span>{tip}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "daily" && (
                                            <div className="space-y-6">
                                                {selectedDisease.dailyManagement.map((section, index) => {
                                                    const icons = [Sun, Clock, Moon];
                                                    const colors = ["amber", "blue", "indigo"];
                                                    const Icon = icons[index] || Clock;
                                                    const color = colors[index] || "blue";

                                                    return (
                                                        <div key={index} className="health-card">
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center`}>
                                                                    <Icon className={`w-6 h-6 text-${color}-500`} />
                                                                </div>
                                                                <h2 className="text-xl font-bold">{section.title}</h2>
                                                            </div>
                                                            <ul className="space-y-3">
                                                                {section.tips.map((tip, tipIndex) => (
                                                                    <li key={tipIndex} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                                                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                                        <span>{tip}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    );
                                                })}

                                                {/* Lifestyle Modifications */}
                                                <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border border-green-200 dark:border-green-800">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                                                        </div>
                                                        <h2 className="text-xl font-bold text-green-700 dark:text-green-400">Lifestyle Modifications</h2>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {selectedDisease.lifestyleModifications.map((mod, index) => (
                                                            <li key={index} className="flex items-start gap-3">
                                                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                                <span className="text-green-800 dark:text-green-200">{mod}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "diet" && (
                                            <div className="space-y-6">
                                                {/* Foods to Eat */}
                                                <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                                                        </div>
                                                        <h2 className="text-xl font-bold text-green-700 dark:text-green-400">✅ Foods to Eat</h2>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {selectedDisease.dietRecommendations.eat.map((food, index) => (
                                                            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-green-900/30">
                                                                <span className="text-xl">🥗</span>
                                                                <span className="text-green-800 dark:text-green-200">{food}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Foods to Avoid */}
                                                <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                                                            <XCircle className="w-6 h-6 text-red-600" />
                                                        </div>
                                                        <h2 className="text-xl font-bold text-red-700 dark:text-red-400">❌ Foods to Avoid</h2>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {selectedDisease.dietRecommendations.avoid.map((food, index) => (
                                                            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-red-900/30">
                                                                <span className="text-xl">🚫</span>
                                                                <span className="text-red-800 dark:text-red-200">{food}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "exercise" && (
                                            <div className="space-y-6">
                                                <div className="health-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                                            <Dumbbell className="w-6 h-6 text-blue-500" />
                                                        </div>
                                                        <h2 className="text-xl font-bold">Exercise Guidelines</h2>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {selectedDisease.exerciseGuidelines.map((guideline, index) => (
                                                            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                                                                <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                                    {index + 1}
                                                                </span>
                                                                <span className="text-blue-800 dark:text-blue-200 pt-1">{guideline}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "medication" && (
                                            <div className="space-y-6">
                                                <div className="health-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                                            <Pill className="w-6 h-6 text-purple-500" />
                                                        </div>
                                                        <h2 className="text-xl font-bold">Medication Tips</h2>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {selectedDisease.medicationTips.map((tip, index) => (
                                                            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                                                                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                                                <span className="text-purple-800 dark:text-purple-200">{tip}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "monitoring" && (
                                            <div className="space-y-6">
                                                <div className="health-card">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                                                            <Activity className="w-6 h-6 text-teal-500" />
                                                        </div>
                                                        <h2 className="text-xl font-bold">Monitoring Checklist</h2>
                                                    </div>
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr className="border-b border-border">
                                                                    <th className="text-left py-3 px-4 font-semibold">What to Monitor</th>
                                                                    <th className="text-left py-3 px-4 font-semibold">Frequency</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {selectedDisease.monitoringChecklist.map((item, index) => (
                                                                    <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                                                                        <td className="py-3 px-4">
                                                                            <div className="flex items-center gap-3">
                                                                                <CheckCircle className="w-5 h-5 text-teal-500" />
                                                                                {item.item}
                                                                            </div>
                                                                        </td>
                                                                        <td className="py-3 px-4">
                                                                            <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium">
                                                                                {item.frequency}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Disclaimer */}
                                <div className="p-4 rounded-2xl bg-muted border border-border">
                                    <p className="text-sm text-muted-foreground text-center">
                                        ⚠️ <strong>Important:</strong> This information is for educational purposes only and is not a substitute
                                        for professional medical advice. Always consult your healthcare provider for personalized guidance.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}
