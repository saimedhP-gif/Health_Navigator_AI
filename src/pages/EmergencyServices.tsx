import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Phone,
    Ambulance,
    Droplets,
    MapPin,
    Clock,
    Share2,
    AlertTriangle,
    Heart,
    Shield,
    Navigation,
    ChevronRight,
    Loader2,
    ExternalLink,
    Users,
    Star,
    Siren,
    Hospital,
    Copy,
    Check,
    PhoneCall,
    Send,
    MessageCircle,
    Activity,
    Zap,
    Info,
    X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Emergency Numbers by Country
const emergencyNumbers = {
    india: {
        ambulance: "108",
        police: "100",
        fire: "101",
        women: "1091",
        child: "1098",
        nationalEmergency: "112",
        bloodBank: "104"
    }
};

// Blood Group Types
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Emergency Types
const emergencyTypes = [
    { id: "cardiac", label: "Heart Attack", labelHi: "दिल का दौरा", icon: Heart, color: "red", priority: 1 },
    { id: "accident", label: "Accident/Injury", labelHi: "दुर्घटना", icon: AlertTriangle, color: "orange", priority: 1 },
    { id: "breathing", label: "Breathing Problem", labelHi: "सांस की समस्या", icon: Activity, color: "blue", priority: 1 },
    { id: "stroke", label: "Stroke", labelHi: "स्ट्रोक", icon: Zap, color: "purple", priority: 1 },
    { id: "unconscious", label: "Unconscious", labelHi: "बेहोश", icon: Users, color: "red", priority: 1 },
    { id: "other", label: "Other Emergency", labelHi: "अन्य आपातकाल", icon: Siren, color: "gray", priority: 2 }
];

// First Aid Guides
const emergencyGuides: Record<string, { title: string; titleHi: string; steps: string[]; stepsHi: string[]; warning: string }> = {
    cardiac: {
        title: "Heart Attack First Aid",
        titleHi: "दिल के दौरे की प्राथमिक चिकित्सा",
        steps: [
            "Call 108 immediately - Every second counts!",
            "Have the person sit or lie down in a comfortable position",
            "Loosen any tight clothing around chest and neck",
            "If person has aspirin and is not allergic, give one (325mg) to chew",
            "Stay calm and keep the person calm",
            "If person becomes unconscious, begin CPR if trained",
            "Do NOT give water or food"
        ],
        stepsHi: [
            "तुरंत 108 पर कॉल करें - हर सेकंड महत्वपूर्ण है!",
            "व्यक्ति को आरामदायक स्थिति में बैठाएं या लिटाएं",
            "छाती और गर्दन के पास कसे कपड़े ढीले करें",
            "अगर एस्पिरिन है और एलर्जी नहीं है तो एक दें",
            "शांत रहें और व्यक्ति को शांत रखें",
            "अगर बेहोश हो जाए तो CPR शुरू करें",
            "पानी या खाना न दें"
        ],
        warning: "⚠️ Time is critical. Call 108 immediately!"
    },
    accident: {
        title: "Accident & Injury First Aid",
        titleHi: "दुर्घटना प्राथमिक चिकित्सा",
        steps: [
            "Ensure scene is safe before approaching",
            "Call 108 for ambulance",
            "Do NOT move the person unless in immediate danger",
            "Control bleeding with direct pressure using clean cloth",
            "Keep the person warm with blanket or jacket",
            "Keep them calm and conscious through conversation",
            "Do NOT remove any objects stuck in wounds"
        ],
        stepsHi: [
            "पास जाने से पहले सुनिश्चित करें कि जगह सुरक्षित है",
            "एम्बुलेंस के लिए 108 पर कॉल करें",
            "तत्काल खतरा न हो तो व्यक्ति को न हिलाएं",
            "साफ कपड़े से सीधा दबाव देकर खून रोकें",
            "कंबल या जैकेट से व्यक्ति को गर्म रखें",
            "बातचीत से उन्हें शांत और सचेत रखें",
            "घाव में फंसी वस्तुओं को न निकालें"
        ],
        warning: "⚠️ Do NOT move the person if spinal injury is suspected!"
    },
    breathing: {
        title: "Breathing Emergency First Aid",
        titleHi: "सांस की आपातकालीन प्राथमिक चिकित्सा",
        steps: [
            "Call 108 immediately",
            "Help the person sit upright - do not lay them down",
            "Loosen any tight clothing",
            "If they have an inhaler, help them use it",
            "Open windows for fresh air",
            "Stay calm and help them take slow breaths",
            "If choking, perform Heimlich maneuver if trained"
        ],
        stepsHi: [
            "तुरंत 108 पर कॉल करें",
            "व्यक्ति को सीधा बैठाएं - लिटाएं नहीं",
            "तंग कपड़े ढीले करें",
            "अगर इनहेलर है तो उसका उपयोग करने में मदद करें",
            "ताजी हवा के लिए खिड़कियां खोलें",
            "शांत रहें और धीमी सांस लेने में मदद करें",
            "अगर गला घुट रहा हो तो Heimlich करें"
        ],
        warning: "⚠️ If lips/nails turn blue, this is severe - call 108 NOW!"
    },
    stroke: {
        title: "Stroke First Aid - Act F.A.S.T.",
        titleHi: "स्ट्रोक प्राथमिक चिकित्सा",
        steps: [
            "F - FACE: Ask to smile. Does one side droop?",
            "A - ARMS: Ask to raise both arms. Does one drift down?",
            "S - SPEECH: Ask to repeat a phrase. Is speech slurred?",
            "T - TIME: If ANY of these, call 108 IMMEDIATELY!",
            "Note the exact time symptoms started",
            "Keep person lying down with head slightly raised",
            "Do NOT give food, water, or any medication"
        ],
        stepsHi: [
            "F - चेहरा: मुस्कुराने को कहें। क्या एक तरफ झुका है?",
            "A - बाहें: दोनों हाथ उठाने को कहें। क्या एक गिरता है?",
            "S - बोली: वाक्य दोहराने को कहें। क्या बोली लड़खड़ाती है?",
            "T - समय: इनमें से कोई भी हो तो तुरंत 108 कॉल करें!",
            "लक्षण शुरू होने का सही समय नोट करें",
            "व्यक्ति को लिटाएं, सिर थोड़ा ऊंचा रखें",
            "खाना, पानी या दवा न दें"
        ],
        warning: "⚠️ Every minute matters in stroke! Brain damage increases each minute without treatment."
    },
    unconscious: {
        title: "Unconscious Person First Aid",
        titleHi: "बेहोश व्यक्ति की प्राथमिक चिकित्सा",
        steps: [
            "Call 108 immediately",
            "Check if person is breathing",
            "If breathing, place in recovery position (on their side)",
            "If NOT breathing, start CPR if trained",
            "Clear any blockage from mouth/airway",
            "Loosen tight clothing",
            "Keep monitoring breathing until help arrives"
        ],
        stepsHi: [
            "तुरंत 108 पर कॉल करें",
            "जांचें कि व्यक्ति सांस ले रहा है या नहीं",
            "अगर सांस ले रहे हैं तो करवट पर लिटाएं",
            "अगर सांस नहीं है तो CPR शुरू करें",
            "मुंह/गले से कोई रुकावट साफ करें",
            "तंग कपड़े ढीले करें",
            "मदद आने तक सांस पर नजर रखें"
        ],
        warning: "⚠️ If no breathing, start CPR immediately while waiting for ambulance!"
    },
    other: {
        title: "General Emergency Guide",
        titleHi: "सामान्य आपातकालीन गाइड",
        steps: [
            "Stay calm and assess the situation",
            "Call 108 for ambulance or 112 for general emergency",
            "Ensure safety of yourself and others first",
            "Provide clear location details when calling",
            "Follow instructions from emergency operator",
            "Stay with the person until help arrives",
            "Gather any relevant medical history/allergies"
        ],
        stepsHi: [
            "शांत रहें और स्थिति का आकलन करें",
            "एम्बुलेंस के लिए 108 या 112 पर कॉल करें",
            "पहले अपनी और दूसरों की सुरक्षा सुनिश्चित करें",
            "कॉल करते समय स्पष्ट स्थान बताएं",
            "आपातकालीन ऑपरेटर के निर्देशों का पालन करें",
            "मदद आने तक व्यक्ति के साथ रहें",
            "चिकित्सा इतिहास/एलर्जी की जानकारी इकट्ठा करें"
        ],
        warning: "⚠️ Stay on the line with 108 until they confirm help is on the way."
    }
};

// Mock Blood Banks Data
const mockBloodBanks = [
    { id: 1, name: "Indian Red Cross Blood Bank", address: "Red Cross Road, Hyderabad", phone: "040-23234567", distance: "2.5 km", availability: { "A+": true, "A-": false, "B+": true, "B-": true, "O+": true, "O-": false, "AB+": true, "AB-": false } },
    { id: 2, name: "NIMS Blood Bank", address: "Punjagutta, Hyderabad", phone: "040-23456789", distance: "4.1 km", availability: { "A+": true, "A-": true, "B+": false, "B-": true, "O+": true, "O-": true, "AB+": false, "AB-": true } },
    { id: 3, name: "Apollo Blood Bank", address: "Jubilee Hills, Hyderabad", phone: "040-23555555", distance: "5.8 km", availability: { "A+": true, "A-": true, "B+": true, "B-": false, "O+": true, "O-": true, "AB+": true, "AB-": true } },
    { id: 4, name: "Yashoda Blood Bank", address: "Somajiguda, Hyderabad", phone: "040-44444444", distance: "3.2 km", availability: { "A+": true, "A-": false, "B+": true, "B-": true, "O+": false, "O-": false, "AB+": true, "AB-": false } }
];

// Mock Emergency Rooms
const mockEmergencyRooms = [
    { id: 1, name: "Apollo Emergency", address: "Jubilee Hills", distance: "2.1 km", waitTime: "~15 min", rating: 4.5, phone: "040-23607777", open24x7: true },
    { id: 2, name: "KIMS Emergency Care", address: "Secunderabad", distance: "3.4 km", waitTime: "~25 min", rating: 4.3, phone: "040-44885000", open24x7: true },
    { id: 3, name: "Yashoda Emergency", address: "Somajiguda", distance: "4.2 km", waitTime: "~10 min", rating: 4.4, phone: "040-45674567", open24x7: true },
    { id: 4, name: "NIMS Trauma Center", address: "Punjagutta", distance: "5.0 km", waitTime: "~30 min", rating: 4.2, phone: "040-23456789", open24x7: true }
];

// One-Tap Call Component
function EmergencyCallButton({ number, label, labelHi, icon: Icon, color }: { number: string; label: string; labelHi: string; icon: any; color: string }) {
    const handleCall = () => {
        window.location.href = `tel:${number}`;
    };

    return (
        <motion.button
            onClick={handleCall}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${color === "red"
                    ? "bg-red-500/10 border-red-500/50 hover:bg-red-500/20 hover:border-red-500"
                    : "bg-primary/10 border-primary/50 hover:bg-primary/20 hover:border-primary"
                }`}
        >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color === "red" ? "bg-red-500" : "bg-primary"
                }`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="text-left flex-1">
                <p className={`text-2xl font-bold ${color === "red" ? "text-red-500" : "text-primary"}`}>
                    {number}
                </p>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">{labelHi}</p>
            </div>
            <PhoneCall className={`w-6 h-6 ${color === "red" ? "text-red-500" : "text-primary"}`} />
        </motion.button>
    );
}

// Emergency Guide Modal
function EmergencyGuideModal({
    isOpen,
    onClose,
    emergencyType
}: {
    isOpen: boolean;
    onClose: () => void;
    emergencyType: string | null;
}) {
    if (!isOpen || !emergencyType || !emergencyGuides[emergencyType]) return null;

    const guide = emergencyGuides[emergencyType];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">{guide.title}</h2>
                            <p className="text-sm text-muted-foreground">{guide.titleHi}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-4">
                        {/* Warning */}
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
                            <p className="text-red-500 font-medium text-sm">{guide.warning}</p>
                        </div>

                        {/* Call 108 Button */}
                        <a href="tel:108" className="block mb-4">
                            <Button className="w-full bg-red-500 hover:bg-red-600 text-white gap-2 h-14 text-lg">
                                <Phone className="w-6 h-6" />
                                Call 108 Now - तुरंत कॉल करें
                            </Button>
                        </a>

                        {/* Steps */}
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Info className="w-5 h-5 text-primary" />
                            While Waiting for Help:
                        </h3>
                        <div className="space-y-3">
                            {guide.steps.map((step, index) => (
                                <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm">{step}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{guide.stepsHi[index]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// Share Location Component
function ShareLocationPanel({ userLocation }: { userLocation: { lat: number; lng: number } | null }) {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const getGoogleMapsLink = () => {
        if (!userLocation) return "";
        return `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
    };

    const copyLocation = async () => {
        const link = getGoogleMapsLink();
        if (link) {
            await navigator.clipboard.writeText(
                `🚨 EMERGENCY LOCATION 🚨\nI need help! My location:\n${link}\n\nPlease come immediately!`
            );
            setCopied(true);
            toast({ title: "Location Copied!", description: "Share this with family or emergency contacts" });
            setTimeout(() => setCopied(false), 3000);
        }
    };

    const shareWhatsApp = () => {
        const link = getGoogleMapsLink();
        const message = encodeURIComponent(
            `🚨 EMERGENCY 🚨\nI need help urgently!\n\n📍 My Location:\n${link}\n\nPlease come or send help immediately!`
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };

    const shareSMS = () => {
        const link = getGoogleMapsLink();
        const message = encodeURIComponent(`EMERGENCY! I need help. My location: ${link}`);
        window.location.href = `sms:?body=${message}`;
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Share2 className="w-5 h-5 text-primary" />
                    Share My Location with Family
                </CardTitle>
            </CardHeader>
            <CardContent>
                {userLocation ? (
                    <div className="space-y-3">
                        <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm truncate">{getGoogleMapsLink()}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" onClick={copyLocation} className="gap-2">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                Copy
                            </Button>
                            <Button onClick={shareWhatsApp} className="gap-2 bg-green-600 hover:bg-green-700">
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp
                            </Button>
                            <Button variant="outline" onClick={shareSMS} className="gap-2">
                                <Send className="w-4 h-4" />
                                SMS
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button variant="outline" className="w-full gap-2" onClick={() => window.location.reload()}>
                        <Navigation className="w-4 h-4" />
                        Enable Location to Share
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

// Main Emergency Page Component
export default function EmergencyServices() {
    const { toast } = useToast();
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedEmergencyType, setSelectedEmergencyType] = useState<string | null>(null);
    const [showGuide, setShowGuide] = useState(false);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("O+");
    const [activeTab, setActiveTab] = useState<"ambulance" | "blood" | "er">("ambulance");

    // Get user location on mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.warn("Location access denied:", error);
                }
            );
        }
    }, []);

    const handleEmergencyTypeSelect = (type: string) => {
        setSelectedEmergencyType(type);
        setShowGuide(true);
    };

    return (
        <Layout>
            <div className="container py-6 max-w-4xl">
                {/* Emergency Header */}
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 mb-4"
                    >
                        <Siren className="w-8 h-8 text-white animate-pulse" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-red-500">Emergency Services</h1>
                    <p className="text-muted-foreground">आपातकालीन सेवाएं</p>
                    <p className="text-sm text-muted-foreground mt-1">One-tap access to emergency help</p>
                </div>

                {/* Main Emergency Buttons */}
                <div className="grid gap-3 mb-6">
                    <EmergencyCallButton
                        number="108"
                        label="Ambulance (Government)"
                        labelHi="सरकारी एम्बुलेंस"
                        icon={Ambulance}
                        color="red"
                    />
                    <EmergencyCallButton
                        number="112"
                        label="National Emergency"
                        labelHi="राष्ट्रीय आपातकालीन"
                        icon={Shield}
                        color="red"
                    />
                </div>

                {/* Emergency Type Selection */}
                <Card className="mb-6">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            What's the Emergency? (Get First Aid Guide)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {emergencyTypes.map((type) => (
                                <motion.button
                                    key={type.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleEmergencyTypeSelect(type.id)}
                                    className="p-3 rounded-xl border border-border hover:border-primary/50 bg-card text-left transition-colors"
                                >
                                    <type.icon className={`w-6 h-6 mb-2 text-${type.color}-500`} />
                                    <p className="font-medium text-sm">{type.label}</p>
                                    <p className="text-xs text-muted-foreground">{type.labelHi}</p>
                                </motion.button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Share Location */}
                <ShareLocationPanel userLocation={userLocation} />

                {/* Services Tabs */}
                <div className="flex gap-2 mt-6 mb-4">
                    {[
                        { id: "ambulance", label: "Private Ambulance", icon: Ambulance },
                        { id: "blood", label: "Blood Banks", icon: Droplets },
                        { id: "er", label: "Emergency Rooms", icon: Hospital }
                    ].map((tab) => (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? "default" : "outline"}
                            onClick={() => setActiveTab(tab.id as any)}
                            className="flex-1 gap-2"
                            size="sm"
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden md:inline">{tab.label}</span>
                        </Button>
                    ))}
                </div>

                {/* Private Ambulance Tab */}
                {activeTab === "ambulance" && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Private Ambulance Services</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                { name: "Stanplus Ambulance", phone: "1800-4255-333", rating: 4.5, eta: "8-12 min" },
                                { name: "Medulance", phone: "1800-120-1233", rating: 4.3, eta: "10-15 min" },
                                { name: "Red Ambulance", phone: "1800-123-0123", rating: 4.2, eta: "12-18 min" }
                            ].map((amb, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                                    <div>
                                        <p className="font-medium">{amb.name}</p>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                {amb.rating}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                ETA: {amb.eta}
                                            </span>
                                        </div>
                                    </div>
                                    <a href={`tel:${amb.phone.replace(/-/g, "")}`}>
                                        <Button size="sm" className="gap-2">
                                            <Phone className="w-4 h-4" />
                                            Call
                                        </Button>
                                    </a>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Blood Banks Tab */}
                {activeTab === "blood" && (
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Nearby Blood Banks</CardTitle>
                                <a href="tel:104">
                                    <Button size="sm" variant="outline" className="gap-2">
                                        <Phone className="w-4 h-4" />
                                        Blood Bank Helpline: 104
                                    </Button>
                                </a>
                            </div>
                            {/* Blood Group Filter */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {bloodGroups.map((group) => (
                                    <Button
                                        key={group}
                                        size="sm"
                                        variant={selectedBloodGroup === group ? "default" : "outline"}
                                        onClick={() => setSelectedBloodGroup(group)}
                                        className="px-3"
                                    >
                                        {group}
                                    </Button>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {mockBloodBanks.map((bank) => (
                                <div key={bank.id} className="p-3 rounded-lg border border-border">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium">{bank.name}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {bank.address} • {bank.distance}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${bank.availability[selectedBloodGroup as keyof typeof bank.availability]
                                                    ? "bg-green-500/10 text-green-500"
                                                    : "bg-red-500/10 text-red-500"
                                                }`}>
                                                {selectedBloodGroup}: {bank.availability[selectedBloodGroup as keyof typeof bank.availability] ? "Available" : "Unavailable"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <a href={`tel:${bank.phone}`} className="flex-1">
                                            <Button size="sm" variant="outline" className="w-full gap-2">
                                                <Phone className="w-4 h-4" />
                                                {bank.phone}
                                            </Button>
                                        </a>
                                        <a href={`https://maps.google.com/?q=${encodeURIComponent(bank.address)}`} target="_blank">
                                            <Button size="sm" className="gap-2">
                                                <Navigation className="w-4 h-4" />
                                                Directions
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Emergency Rooms Tab */}
                {activeTab === "er" && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Nearest Emergency Rooms</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {mockEmergencyRooms.map((er) => (
                                <div key={er.id} className="p-3 rounded-lg border border-border">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{er.name}</p>
                                                {er.open24x7 && (
                                                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">
                                                        24/7
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {er.address} • {er.distance}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-sm">
                                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                {er.rating}
                                            </div>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Wait: {er.waitTime}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <a href={`tel:${er.phone}`} className="flex-1">
                                            <Button size="sm" variant="outline" className="w-full gap-2">
                                                <Phone className="w-4 h-4" />
                                                Call ER
                                            </Button>
                                        </a>
                                        <a href={`https://maps.google.com/?q=${encodeURIComponent(er.name + " " + er.address)}`} target="_blank" className="flex-1">
                                            <Button size="sm" className="w-full gap-2">
                                                <Navigation className="w-4 h-4" />
                                                Get Directions
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Emergency Guide Modal */}
                <EmergencyGuideModal
                    isOpen={showGuide}
                    onClose={() => {
                        setShowGuide(false);
                        setSelectedEmergencyType(null);
                    }}
                    emergencyType={selectedEmergencyType}
                />

                {/* Disclaimer */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                    ⚠️ This is for emergency assistance only. Always call 108/112 first in life-threatening situations.
                </p>
            </div>
        </Layout>
    );
}
