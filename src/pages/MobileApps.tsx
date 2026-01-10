import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Smartphone,
    Download,
    Bell,
    Wifi,
    WifiOff,
    Watch,
    Heart,
    Activity,
    Droplets,
    Moon,
    CheckCircle2,
    Star,
    Shield,
    Zap,
    Clock,
    MessageSquare,
    Apple,
    Play,
    QrCode,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// App features
const appFeatures = [
    {
        icon: WifiOff,
        title: "Offline Mode",
        description: "Access symptom checker, health library, and saved data without internet connection",
        color: "text-blue-500 bg-blue-500/10"
    },
    {
        icon: Bell,
        title: "Smart Notifications",
        description: "Medication reminders, health tips, appointment alerts, and emergency updates",
        color: "text-purple-500 bg-purple-500/10"
    },
    {
        icon: Activity,
        title: "Quick Vitals Widget",
        description: "Home screen widget for instant blood pressure, sugar, and weight logging",
        color: "text-green-500 bg-green-500/10"
    },
    {
        icon: Watch,
        title: "Smartwatch Apps",
        description: "Apple Watch & WearOS apps for heart rate, step tracking, and quick logging",
        color: "text-red-500 bg-red-500/10"
    },
    {
        icon: Shield,
        title: "Secure Health Vault",
        description: "Encrypted storage for medical records, prescriptions, and test reports",
        color: "text-amber-500 bg-amber-500/10"
    },
    {
        icon: Zap,
        title: "Fast & Lightweight",
        description: "Optimized for low-end devices, minimal battery usage, small app size",
        color: "text-teal-500 bg-teal-500/10"
    }
];

// Smartwatch features
const watchFeatures = [
    { icon: Heart, label: "Heart Rate", description: "Continuous monitoring" },
    { icon: Activity, label: "Step Counter", description: "Daily activity tracking" },
    { icon: Droplets, label: "Blood Oxygen", description: "SpO2 measurement" },
    { icon: Moon, label: "Sleep Tracking", description: "Sleep quality analysis" },
    { icon: Bell, label: "Med Reminders", description: "Wrist notifications" },
    { icon: Zap, label: "Quick Log", description: "One-tap vitals entry" }
];

// App reviews
const appReviews = [
    { name: "Priya S.", rating: 5, review: "Best health app! The offline mode is a lifesaver in rural areas.", date: "2 days ago" },
    { name: "Rajesh K.", rating: 5, review: "The medication reminders have helped my mother-in-law so much.", date: "1 week ago" },
    { name: "Anjali M.", rating: 4, review: "Love the Apple Watch integration. Very convenient for logging vitals.", date: "2 weeks ago" }
];

export default function MobileApps() {
    const { toast } = useToast();
    const [selectedPlatform, setSelectedPlatform] = useState<"ios" | "android">("android");

    const handleDownload = (platform: string) => {
        toast({
            title: "Coming Soon! 🚀",
            description: `The ${platform} app is currently in development. Join the waitlist to be notified!`,
        });
    };

    const handleWaitlist = () => {
        toast({
            title: "You're on the list! ✨",
            description: "We'll notify you when the mobile app launches.",
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background py-12">
                <div className="container max-w-5xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                            <Smartphone className="w-5 h-5 text-primary" />
                            <span className="text-primary font-medium">Mobile Apps</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Your Health, <span className="gradient-text">In Your Pocket</span> 📱
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Download our native mobile apps for the best health management experience with offline access,
                            smart notifications, and wearable device integration.
                        </p>
                    </motion.div>

                    {/* Download Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="health-card mb-8"
                    >
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Phone Mockup */}
                            <div className="relative flex justify-center">
                                <div className="relative w-64 h-[500px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
                                    {/* Phone Screen */}
                                    <div className="h-full bg-background rounded-[2.3rem] overflow-hidden relative">
                                        {/* Status Bar */}
                                        <div className="h-8 bg-primary/10 flex items-center justify-between px-6">
                                            <span className="text-xs font-medium">9:41</span>
                                            <div className="flex items-center gap-1">
                                                <Wifi className="w-3 h-3" />
                                                <Activity className="w-3 h-3" />
                                            </div>
                                        </div>
                                        {/* App Content Preview */}
                                        <div className="p-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                                    <Heart className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">Health Navigator</h4>
                                                    <p className="text-xs text-muted-foreground">Good Morning, User!</p>
                                                </div>
                                            </div>

                                            {/* Quick Stats */}
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                <div className="p-3 rounded-xl bg-green-500/10">
                                                    <p className="text-xs text-muted-foreground">Steps</p>
                                                    <p className="font-bold">8,234</p>
                                                </div>
                                                <div className="p-3 rounded-xl bg-red-500/10">
                                                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                                                    <p className="font-bold">72 bpm</p>
                                                </div>
                                                <div className="p-3 rounded-xl bg-blue-500/10">
                                                    <p className="text-xs text-muted-foreground">Blood Sugar</p>
                                                    <p className="font-bold">98 mg/dL</p>
                                                </div>
                                                <div className="p-3 rounded-xl bg-purple-500/10">
                                                    <p className="text-xs text-muted-foreground">BP</p>
                                                    <p className="font-bold">120/80</p>
                                                </div>
                                            </div>

                                            {/* Quick Actions */}
                                            <div className="space-y-2">
                                                <button className="w-full p-3 rounded-xl bg-primary text-white text-sm font-medium flex items-center justify-center gap-2">
                                                    <Sparkles className="w-4 h-4" />
                                                    Check Symptoms
                                                </button>
                                                <button className="w-full p-3 rounded-xl border border-border text-sm font-medium flex items-center justify-center gap-2">
                                                    <Bell className="w-4 h-4" />
                                                    Medication Reminder
                                                </button>
                                            </div>
                                        </div>

                                        {/* Bottom Nav */}
                                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around px-4">
                                            <div className="text-center">
                                                <Activity className="w-5 h-5 mx-auto text-primary" />
                                                <span className="text-xs">Home</span>
                                            </div>
                                            <div className="text-center text-muted-foreground">
                                                <Heart className="w-5 h-5 mx-auto" />
                                                <span className="text-xs">Health</span>
                                            </div>
                                            <div className="text-center text-muted-foreground">
                                                <MessageSquare className="w-5 h-5 mx-auto" />
                                                <span className="text-xs">Chat</span>
                                            </div>
                                            <div className="text-center text-muted-foreground">
                                                <Clock className="w-5 h-5 mx-auto" />
                                                <span className="text-xs">History</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-gray-900 rounded-b-2xl" />
                                </div>
                            </div>

                            {/* Download Options */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Download the App</h2>
                                <p className="text-muted-foreground mb-6">
                                    Get the full native experience with offline mode, push notifications, and seamless sync across devices.
                                </p>

                                {/* Platform Toggle */}
                                <div className="flex gap-2 mb-6">
                                    <button
                                        onClick={() => setSelectedPlatform("android")}
                                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${selectedPlatform === "android"
                                                ? "border-green-500 bg-green-500/10"
                                                : "border-border hover:border-green-500/50"
                                            }`}
                                    >
                                        <Play className="w-8 h-8 mx-auto mb-2 text-green-500" />
                                        <p className="font-semibold">Android</p>
                                        <p className="text-xs text-muted-foreground">Google Play</p>
                                    </button>
                                    <button
                                        onClick={() => setSelectedPlatform("ios")}
                                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${selectedPlatform === "ios"
                                                ? "border-gray-500 bg-gray-500/10"
                                                : "border-border hover:border-gray-500/50"
                                            }`}
                                    >
                                        <Apple className="w-8 h-8 mx-auto mb-2" />
                                        <p className="font-semibold">iOS</p>
                                        <p className="text-xs text-muted-foreground">App Store</p>
                                    </button>
                                </div>

                                <Button
                                    onClick={() => handleDownload(selectedPlatform === "ios" ? "iOS" : "Android")}
                                    size="lg"
                                    className="w-full gap-2 mb-4"
                                >
                                    <Download className="w-5 h-5" />
                                    Download for {selectedPlatform === "ios" ? "iOS" : "Android"}
                                </Button>

                                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.8 Rating
                                    </span>
                                    <span>•</span>
                                    <span>50K+ Downloads</span>
                                    <span>•</span>
                                    <span>15MB Size</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-center mb-8">Powerful Features</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {appFeatures.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="health-card"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Smartwatch Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="health-card mb-8"
                    >
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4">
                                    <Watch className="w-4 h-4" />
                                    Wearable Integration
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Apple Watch & WearOS Apps</h2>
                                <p className="text-muted-foreground mb-6">
                                    Track your health directly from your wrist. Get real-time vitals, medication reminders,
                                    and quick logging without pulling out your phone.
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                    {watchFeatures.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                                            <feature.icon className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="font-medium text-sm">{feature.label}</p>
                                                <p className="text-xs text-muted-foreground">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Watch Mockup */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    {/* Watch Frame */}
                                    <div className="w-48 h-56 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-2 shadow-2xl">
                                        {/* Watch Screen */}
                                        <div className="h-full bg-black rounded-[1.5rem] overflow-hidden p-3">
                                            <div className="text-white text-center">
                                                <p className="text-xs opacity-70">10:30</p>
                                                <div className="flex items-center justify-center gap-2 my-3">
                                                    <Heart className="w-8 h-8 text-red-500" />
                                                    <div className="text-left">
                                                        <p className="text-2xl font-bold">72</p>
                                                        <p className="text-xs opacity-70">BPM</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 mt-4">
                                                    <div className="p-2 rounded-lg bg-white/10">
                                                        <p className="text-lg font-bold">8,234</p>
                                                        <p className="text-xs opacity-70">Steps</p>
                                                    </div>
                                                    <div className="p-2 rounded-lg bg-white/10">
                                                        <p className="text-lg font-bold">98%</p>
                                                        <p className="text-xs opacity-70">SpO2</p>
                                                    </div>
                                                </div>
                                                <button className="mt-4 w-full p-2 rounded-lg bg-primary text-xs font-medium">
                                                    Log Vitals
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Watch Crown */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-8 bg-gray-700 rounded-r" />
                                    {/* Watch Bands */}
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-32 h-8 bg-gray-800 rounded-t-lg" />
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-32 h-8 bg-gray-800 rounded-b-lg" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Reviews Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-center mb-6">What Users Say</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {appReviews.map((review, i) => (
                                <div key={i} className="health-card">
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(review.rating)].map((_, j) => (
                                            <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">"{review.review}"</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm">{review.name}</span>
                                        <span className="text-xs text-muted-foreground">{review.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* PWA Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="health-card bg-gradient-to-r from-primary/10 to-health-green/10 border-primary/30"
                    >
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2">Can't Wait? Use the Web App!</h3>
                            <p className="text-muted-foreground mb-4">
                                Add this website to your home screen for an app-like experience right now.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Works Offline</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">No Download Required</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Instant Updates</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Waitlist Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-center"
                    >
                        <h2 className="text-xl font-bold mb-4">Join the Waitlist</h2>
                        <p className="text-muted-foreground mb-6">
                            Be the first to know when our mobile apps launch!
                        </p>
                        <div className="flex gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none"
                            />
                            <Button onClick={handleWaitlist} className="gap-2">
                                <Bell className="w-4 h-4" />
                                Notify Me
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
