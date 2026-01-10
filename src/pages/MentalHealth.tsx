import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Brain,
    Smile,
    Frown,
    Meh,
    Heart,
    Wind,
    Phone,
    MessageSquare,
    Calendar,
    Clock,
    Play,
    Pause,
    RotateCcw,
    CheckCircle2,
    BookOpen,
    Users,
    Shield,
    AlertTriangle,
    Sparkles,
    ChevronRight,
    Volume2,
    HeartHandshake
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mood options
const moodOptions = [
    { value: 5, emoji: "😄", label: "Great", color: "text-green-500 bg-green-500/10 border-green-500" },
    { value: 4, emoji: "🙂", label: "Good", color: "text-teal-500 bg-teal-500/10 border-teal-500" },
    { value: 3, emoji: "😐", label: "Okay", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500" },
    { value: 2, emoji: "😔", label: "Low", color: "text-orange-500 bg-orange-500/10 border-orange-500" },
    { value: 1, emoji: "😢", label: "Struggling", color: "text-red-500 bg-red-500/10 border-red-500" }
];

// Breathing exercises
const breathingExercises = [
    { id: "478", name: "4-7-8 Relaxation", inhale: 4, hold: 7, exhale: 8, description: "Calming breath that helps reduce anxiety" },
    { id: "box", name: "Box Breathing", inhale: 4, hold: 4, exhale: 4, description: "Used by Navy SEALs for stress relief" },
    { id: "calm", name: "Calming Breath", inhale: 5, hold: 2, exhale: 7, description: "Gentle exercise for beginners" }
];

// Meditation guides
const meditations = [
    { id: "body-scan", title: "Body Scan", duration: "10 min", description: "Progressive relaxation from head to toe" },
    { id: "gratitude", title: "Gratitude Meditation", duration: "5 min", description: "Focus on things you're thankful for" },
    { id: "loving-kindness", title: "Loving Kindness", duration: "8 min", description: "Cultivate compassion for yourself and others" },
    { id: "sleep", title: "Sleep Meditation", duration: "15 min", description: "Drift off to peaceful sleep" }
];

// Crisis helplines
const crisisHelplines = [
    { name: "iCall (TISS)", number: "9152987821", description: "Mon-Sat, 8am-10pm", type: "Counseling" },
    { name: "Vandrevala Foundation", number: "1860-2662-345", description: "24/7 Support", type: "Crisis" },
    { name: "NIMHANS", number: "080-46110007", description: "Mon-Sat, 9am-5pm", type: "Mental Health" },
    { name: "Snehi", number: "044-24640050", description: "24/7 Emotional Support", type: "Support" },
    { name: "AASRA", number: "9820466726", description: "24/7 Crisis Line", type: "Crisis" }
];

// CBT Exercises
const cbtExercises = [
    {
        id: "thought-record",
        title: "Thought Record",
        description: "Identify and challenge negative thought patterns",
        steps: [
            "Write down the situation that triggered your emotion",
            "Identify the automatic thought that came to mind",
            "Rate how strongly you believe this thought (0-100%)",
            "List evidence that supports this thought",
            "List evidence that contradicts this thought",
            "Create a balanced alternative thought",
            "Re-rate your belief in the original thought"
        ]
    },
    {
        id: "behavioral-activation",
        title: "Behavioral Activation",
        description: "Schedule enjoyable activities to improve mood",
        steps: [
            "List activities that used to bring you joy",
            "Rate each activity on how easy/hard it is to do",
            "Start with easier activities first",
            "Schedule one small activity for today",
            "After doing it, note how you felt before and after"
        ]
    },
    {
        id: "gratitude-journal",
        title: "Gratitude Practice",
        description: "Focus on positive aspects of your life",
        steps: [
            "Write down 3 things you're grateful for today",
            "For each one, explain WHY you're grateful",
            "Notice how this shifts your perspective",
            "Try to find new things each day"
        ]
    }
];

export default function MentalHealth() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"mood" | "breathing" | "cbt" | "meditation" | "crisis">("mood");

    // Mood tracking state
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [moodNote, setMoodNote] = useState("");
    const [moodHistory, setMoodHistory] = useState<{ date: string; mood: number; note: string }[]>([]);

    // Breathing exercise state
    const [selectedBreathing, setSelectedBreathing] = useState(breathingExercises[0]);
    const [isBreathing, setIsBreathing] = useState(false);
    const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
    const [breathCount, setBreathCount] = useState(0);
    const [breathTimer, setBreathTimer] = useState(0);

    // CBT state
    const [selectedCBT, setSelectedCBT] = useState<typeof cbtExercises[0] | null>(null);
    const [cbtProgress, setCbtProgress] = useState<Record<string, boolean>>({});

    // Save mood entry
    const saveMoodEntry = () => {
        if (selectedMood === null) return;

        const entry = {
            date: new Date().toISOString(),
            mood: selectedMood,
            note: moodNote
        };

        setMoodHistory(prev => [entry, ...prev]);
        toast({
            title: "Mood logged! 💜",
            description: "Your mood has been recorded. Keep tracking for insights!",
        });
        setSelectedMood(null);
        setMoodNote("");
    };

    // Start/stop breathing exercise
    const toggleBreathing = () => {
        if (isBreathing) {
            setIsBreathing(false);
            setBreathPhase("inhale");
            setBreathCount(0);
            setBreathTimer(0);
        } else {
            setIsBreathing(true);
            runBreathingCycle();
        }
    };

    const runBreathingCycle = () => {
        let phase: "inhale" | "hold" | "exhale" = "inhale";
        let timer = 0;
        let cycles = 0;

        const interval = setInterval(() => {
            if (!isBreathing) {
                clearInterval(interval);
                return;
            }

            timer++;
            setBreathTimer(timer);

            const { inhale, hold, exhale } = selectedBreathing;

            if (phase === "inhale" && timer >= inhale) {
                phase = "hold";
                timer = 0;
                setBreathPhase("hold");
                setBreathTimer(0);
            } else if (phase === "hold" && timer >= hold) {
                phase = "exhale";
                timer = 0;
                setBreathPhase("exhale");
                setBreathTimer(0);
            } else if (phase === "exhale" && timer >= exhale) {
                phase = "inhale";
                timer = 0;
                cycles++;
                setBreathPhase("inhale");
                setBreathTimer(0);
                setBreathCount(cycles);
            }
        }, 1000);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-purple-500/5 to-background py-12">
                <div className="container max-w-5xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
                            <Brain className="w-5 h-5 text-purple-500" />
                            <span className="text-purple-500 font-medium">Mental Health Companion</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Mind Matters 💜</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Track your mood, practice mindfulness, and access support resources. You're not alone in this journey.
                        </p>
                    </motion.div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {[
                            { id: "mood", label: "Mood Tracker", icon: Smile },
                            { id: "breathing", label: "Breathing", icon: Wind },
                            { id: "cbt", label: "CBT Exercises", icon: Brain },
                            { id: "meditation", label: "Meditation", icon: Heart },
                            { id: "crisis", label: "Crisis Support", icon: Phone }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${activeTab === tab.id
                                        ? "bg-purple-500 text-white"
                                        : "bg-card border border-border hover:border-purple-500/50"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        {/* Mood Tracker */}
                        {activeTab === "mood" && (
                            <motion.div
                                key="mood"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="health-card">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Smile className="w-5 h-5 text-purple-500" />
                                        How are you feeling right now?
                                    </h2>

                                    {/* Mood Selection */}
                                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                                        {moodOptions.map((mood) => (
                                            <button
                                                key={mood.value}
                                                onClick={() => setSelectedMood(mood.value)}
                                                className={`p-4 rounded-2xl border-2 transition-all ${selectedMood === mood.value
                                                        ? mood.color
                                                        : "border-border hover:border-purple-500/50"
                                                    }`}
                                            >
                                                <span className="text-4xl block mb-1">{mood.emoji}</span>
                                                <span className="text-sm font-medium">{mood.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Note */}
                                    {selectedMood !== null && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                        >
                                            <textarea
                                                value={moodNote}
                                                onChange={(e) => setMoodNote(e.target.value)}
                                                placeholder="What's on your mind? (optional)"
                                                className="w-full p-4 rounded-xl border-2 border-border bg-background resize-none h-24 focus:border-purple-500 focus:outline-none"
                                            />
                                            <Button onClick={saveMoodEntry} className="w-full mt-4 gap-2">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Log This Mood
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Mood History */}
                                {moodHistory.length > 0 && (
                                    <div className="health-card">
                                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-purple-500" />
                                            Recent Mood Entries
                                        </h3>
                                        <div className="space-y-3">
                                            {moodHistory.slice(0, 5).map((entry, i) => {
                                                const mood = moodOptions.find(m => m.value === entry.mood);
                                                return (
                                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                                                        <span className="text-2xl">{mood?.emoji}</span>
                                                        <div className="flex-1">
                                                            <p className="font-medium">{mood?.label}</p>
                                                            {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(entry.date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Breathing Exercises */}
                        {activeTab === "breathing" && (
                            <motion.div
                                key="breathing"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="health-card text-center">
                                    <h2 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                                        <Wind className="w-5 h-5 text-purple-500" />
                                        Breathing Exercise
                                    </h2>

                                    {/* Exercise Selection */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                                        {breathingExercises.map((ex) => (
                                            <button
                                                key={ex.id}
                                                onClick={() => setSelectedBreathing(ex)}
                                                disabled={isBreathing}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedBreathing.id === ex.id
                                                        ? "bg-purple-500 text-white"
                                                        : "bg-muted hover:bg-muted/80"
                                                    }`}
                                            >
                                                {ex.name}
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-muted-foreground mb-6">{selectedBreathing.description}</p>

                                    {/* Breathing Animation */}
                                    <div className="relative w-48 h-48 mx-auto mb-6">
                                        <motion.div
                                            animate={{
                                                scale: breathPhase === "inhale" ? [1, 1.5] : breathPhase === "hold" ? 1.5 : [1.5, 1],
                                            }}
                                            transition={{ duration: breathPhase === "inhale" ? selectedBreathing.inhale : breathPhase === "exhale" ? selectedBreathing.exhale : 0 }}
                                            className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
                                        >
                                            <div className="text-white text-center">
                                                <p className="text-3xl font-bold capitalize">{isBreathing ? breathPhase : "Ready"}</p>
                                                {isBreathing && <p className="text-lg">{breathTimer}s</p>}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex justify-center gap-4">
                                        <Button
                                            onClick={toggleBreathing}
                                            size="lg"
                                            className="gap-2"
                                        >
                                            {isBreathing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                            {isBreathing ? "Stop" : "Start"}
                                        </Button>
                                    </div>

                                    {breathCount > 0 && (
                                        <p className="mt-4 text-muted-foreground">
                                            Completed {breathCount} breath cycle{breathCount > 1 ? 's' : ''} 🎉
                                        </p>
                                    )}
                                </div>

                                {/* Instructions */}
                                <div className="health-card">
                                    <h3 className="font-semibold mb-3">How to Practice</h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-500">1.</span>
                                            Find a comfortable position and close your eyes
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-500">2.</span>
                                            Breathe in through your nose when you see "Inhale"
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-500">3.</span>
                                            Hold your breath gently during "Hold"
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-500">4.</span>
                                            Exhale slowly through your mouth during "Exhale"
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {/* CBT Exercises */}
                        {activeTab === "cbt" && (
                            <motion.div
                                key="cbt"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="health-card">
                                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                        <Brain className="w-5 h-5 text-purple-500" />
                                        Cognitive Behavioral Therapy Exercises
                                    </h2>
                                    <p className="text-muted-foreground mb-6">
                                        Evidence-based techniques to help you manage thoughts and emotions.
                                    </p>

                                    <div className="grid gap-4">
                                        {cbtExercises.map((exercise) => (
                                            <div
                                                key={exercise.id}
                                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedCBT?.id === exercise.id
                                                        ? "border-purple-500 bg-purple-500/5"
                                                        : "border-border hover:border-purple-500/50"
                                                    }`}
                                                onClick={() => setSelectedCBT(selectedCBT?.id === exercise.id ? null : exercise)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold">{exercise.title}</h3>
                                                        <p className="text-sm text-muted-foreground">{exercise.description}</p>
                                                    </div>
                                                    <ChevronRight className={`w-5 h-5 transition-transform ${selectedCBT?.id === exercise.id ? "rotate-90" : ""
                                                        }`} />
                                                </div>

                                                <AnimatePresence>
                                                    {selectedCBT?.id === exercise.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-4 pt-4 border-t border-border"
                                                        >
                                                            <h4 className="text-sm font-medium mb-3">Steps:</h4>
                                                            <ul className="space-y-2">
                                                                {exercise.steps.map((step, i) => (
                                                                    <li key={i} className="flex items-start gap-3">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setCbtProgress(prev => ({
                                                                                    ...prev,
                                                                                    [`${exercise.id}-${i}`]: !prev[`${exercise.id}-${i}`]
                                                                                }));
                                                                            }}
                                                                            className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${cbtProgress[`${exercise.id}-${i}`]
                                                                                    ? "bg-purple-500 border-purple-500 text-white"
                                                                                    : "border-border"
                                                                                }`}
                                                                        >
                                                                            {cbtProgress[`${exercise.id}-${i}`] && <CheckCircle2 className="w-4 h-4" />}
                                                                        </button>
                                                                        <span className={`text-sm ${cbtProgress[`${exercise.id}-${i}`] ? "line-through text-muted-foreground" : ""
                                                                            }`}>
                                                                            {step}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Meditation */}
                        {activeTab === "meditation" && (
                            <motion.div
                                key="meditation"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="health-card">
                                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-purple-500" />
                                        Guided Meditations
                                    </h2>
                                    <p className="text-muted-foreground mb-6">
                                        Find your calm with these guided meditation sessions.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {meditations.map((med) => (
                                            <div
                                                key={med.id}
                                                className="p-4 rounded-xl border border-border hover:border-purple-500/50 transition-all cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                                                        <Play className="w-6 h-6 text-purple-500 group-hover:text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{med.title}</h3>
                                                        <p className="text-sm text-muted-foreground">{med.description}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Clock className="w-3 h-3 text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground">{med.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Tips */}
                                <div className="health-card">
                                    <h3 className="font-semibold mb-4">Meditation Tips</h3>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div className="p-3 rounded-xl bg-muted/50">
                                            <span className="text-2xl mb-2 block">🪷</span>
                                            <h4 className="font-medium text-sm">Find Quiet Space</h4>
                                            <p className="text-xs text-muted-foreground">Choose a calm environment</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-muted/50">
                                            <span className="text-2xl mb-2 block">⏰</span>
                                            <h4 className="font-medium text-sm">Start Small</h4>
                                            <p className="text-xs text-muted-foreground">Even 5 minutes helps</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-muted/50">
                                            <span className="text-2xl mb-2 block">🔄</span>
                                            <h4 className="font-medium text-sm">Be Consistent</h4>
                                            <p className="text-xs text-muted-foreground">Daily practice builds habit</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Crisis Support */}
                        {activeTab === "crisis" && (
                            <motion.div
                                key="crisis"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Emergency Notice */}
                                <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/30">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-red-500">If you're in immediate danger</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Please call emergency services (112) or go to your nearest hospital emergency room immediately.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="health-card">
                                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                        <HeartHandshake className="w-5 h-5 text-purple-500" />
                                        Crisis Helplines (India)
                                    </h2>
                                    <p className="text-muted-foreground mb-6">
                                        Trained counselors are available to help. You don't have to face this alone.
                                    </p>

                                    <div className="space-y-4">
                                        {crisisHelplines.map((helpline, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-purple-500/50 transition-all"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                                    <Phone className="w-6 h-6 text-purple-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold">{helpline.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{helpline.description}</p>
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-500">
                                                        {helpline.type}
                                                    </span>
                                                </div>
                                                <a
                                                    href={`tel:${helpline.number}`}
                                                    className="px-4 py-2 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors"
                                                >
                                                    {helpline.number}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Self-Care Reminder */}
                                <div className="health-card bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/30">
                                    <div className="text-center">
                                        <span className="text-4xl mb-4 block">💜</span>
                                        <h3 className="font-semibold text-lg mb-2">You Matter</h3>
                                        <p className="text-muted-foreground max-w-md mx-auto">
                                            Whatever you're going through, please remember that seeking help is a sign of strength, not weakness.
                                            There are people who care about you and want to help.
                                        </p>
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
