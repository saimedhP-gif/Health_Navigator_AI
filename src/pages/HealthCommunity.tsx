import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Users,
    MessageSquare,
    Heart,
    Calendar,
    Search,
    Filter,
    ChevronRight,
    ThumbsUp,
    MessageCircle,
    Share2,
    Bookmark,
    Clock,
    MapPin,
    User,
    Shield,
    CheckCircle2,
    Send,
    Eye,
    Award,
    TrendingUp,
    AlertCircle,
    Plus,
    X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Support groups data
const supportGroups = [
    {
        id: "diabetes",
        name: "Diabetes Support",
        emoji: "🩸",
        members: 12453,
        posts: 3421,
        description: "Connect with others managing diabetes. Share tips, recipes, and support.",
        color: "from-blue-500 to-cyan-500",
        topics: ["Type 1", "Type 2", "Diet Tips", "Insulin", "Exercise"]
    },
    {
        id: "cancer",
        name: "Cancer Warriors",
        emoji: "🎗️",
        members: 8932,
        posts: 2876,
        description: "A safe space for cancer patients, survivors, and caregivers.",
        color: "from-pink-500 to-purple-500",
        topics: ["Treatment", "Support", "Survivor Stories", "Caregiving", "Recovery"]
    },
    {
        id: "heart",
        name: "Heart Health",
        emoji: "❤️",
        members: 7621,
        posts: 1987,
        description: "For those with heart conditions. Share experiences and learn from each other.",
        color: "from-red-500 to-orange-500",
        topics: ["Blood Pressure", "Cholesterol", "Surgery", "Lifestyle", "Medications"]
    },
    {
        id: "mental-health",
        name: "Mental Wellness",
        emoji: "🧠",
        members: 15234,
        posts: 5621,
        description: "Support for anxiety, depression, and other mental health conditions.",
        color: "from-purple-500 to-indigo-500",
        topics: ["Anxiety", "Depression", "Therapy", "Self-Care", "Mindfulness"]
    },
    {
        id: "chronic-pain",
        name: "Chronic Pain Warriors",
        emoji: "💪",
        members: 6543,
        posts: 1543,
        description: "Managing chronic pain together. Tips, support, and understanding.",
        color: "from-amber-500 to-yellow-500",
        topics: ["Fibromyalgia", "Arthritis", "Back Pain", "Treatment", "Coping"]
    },
    {
        id: "pregnancy",
        name: "Expecting Parents",
        emoji: "🤰",
        members: 11234,
        posts: 4532,
        description: "Support and advice for pregnancy, birth, and new parenthood.",
        color: "from-green-500 to-teal-500",
        topics: ["First Trimester", "Nutrition", "Baby Prep", "Birth Stories", "Postpartum"]
    }
];

// Anonymous Q&A with doctors
const doctorQA = [
    {
        id: 1,
        question: "Is it normal to feel dizzy after starting blood pressure medication?",
        category: "Cardiology",
        askedBy: "Anonymous",
        timeAgo: "2 hours ago",
        views: 234,
        answers: 3,
        doctorAnswer: {
            doctor: "Dr. Rajesh M.",
            specialty: "Cardiologist",
            verified: true,
            answer: "Yes, mild dizziness can occur when starting BP medication as your body adjusts. However, if it's severe or persistent, please consult your doctor to adjust the dosage.",
            helpful: 45
        }
    },
    {
        id: 2,
        question: "What are the early warning signs of diabetes I should watch for?",
        category: "Endocrinology",
        askedBy: "Anonymous",
        timeAgo: "5 hours ago",
        views: 567,
        answers: 5,
        doctorAnswer: {
            doctor: "Dr. Priya S.",
            specialty: "Endocrinologist",
            verified: true,
            answer: "Early signs include increased thirst, frequent urination, unexplained weight loss, fatigue, blurred vision, and slow-healing wounds. If you notice these, get your blood sugar tested.",
            helpful: 89
        }
    },
    {
        id: 3,
        question: "How long should I wait before taking painkillers again?",
        category: "General Medicine",
        askedBy: "Anonymous",
        timeAgo: "1 day ago",
        views: 892,
        answers: 4,
        doctorAnswer: {
            doctor: "Dr. Amit K.",
            specialty: "General Physician",
            verified: true,
            answer: "For most OTC painkillers like Paracetamol, wait 4-6 hours between doses. Never exceed the maximum daily limit. For prescription medications, follow your doctor's instructions.",
            helpful: 156
        }
    }
];

// Patient stories
const patientStories = [
    {
        id: 1,
        title: "My Journey with Type 2 Diabetes: 5 Years Later",
        author: "Ramesh K.",
        authorAvatar: "🙍‍♂️",
        condition: "Diabetes",
        excerpt: "When I was diagnosed at 45, I thought my life was over. But with diet changes, exercise, and medication, I've reversed my HbA1c from 9.5 to 5.8...",
        likes: 234,
        comments: 45,
        readTime: "5 min read",
        featured: true
    },
    {
        id: 2,
        title: "How I Overcame Severe Anxiety Without Medication",
        author: "Priya M.",
        authorAvatar: "👩",
        condition: "Mental Health",
        excerpt: "Therapy, meditation, and lifestyle changes transformed my life. Here's my step-by-step approach to managing anxiety naturally...",
        likes: 456,
        comments: 89,
        readTime: "7 min read",
        featured: true
    },
    {
        id: 3,
        title: "Living with Rheumatoid Arthritis: Tips That Actually Work",
        author: "Sunita D.",
        authorAvatar: "👵",
        condition: "Arthritis",
        excerpt: "After 10 years with RA, I've learned what helps and what doesn't. From morning routines to diet modifications...",
        likes: 189,
        comments: 34,
        readTime: "6 min read",
        featured: false
    },
    {
        id: 4,
        title: "My Cancer Survival Story: From Stage 3 to Cancer-Free",
        author: "Vikram S.",
        authorAvatar: "🙍‍♂️",
        condition: "Cancer",
        excerpt: "The diagnosis was devastating, but 3 years of treatment and an incredible support system helped me beat the odds...",
        likes: 567,
        comments: 123,
        readTime: "10 min read",
        featured: true
    }
];

// Local health events
const healthEvents = [
    {
        id: 1,
        title: "Free Diabetes Screening Camp",
        organizer: "Apollo Hospitals",
        date: "Jan 15, 2026",
        time: "9:00 AM - 5:00 PM",
        location: "Apollo Hospital, Jubilee Hills",
        city: "Hyderabad",
        type: "Screening",
        free: true,
        spots: 150
    },
    {
        id: 2,
        title: "Mental Health Awareness Walk",
        organizer: "NIMHANS Foundation",
        date: "Jan 20, 2026",
        time: "7:00 AM",
        location: "Cubbon Park",
        city: "Bangalore",
        type: "Awareness",
        free: true,
        spots: 500
    },
    {
        id: 3,
        title: "Yoga for Heart Health Workshop",
        organizer: "Art of Living",
        date: "Jan 25, 2026",
        time: "6:00 AM - 8:00 AM",
        location: "Art of Living Center",
        city: "Mumbai",
        type: "Workshop",
        free: false,
        spots: 50
    },
    {
        id: 4,
        title: "Cancer Support Group Meeting",
        organizer: "Tata Memorial Hospital",
        date: "Every Saturday",
        time: "10:00 AM - 12:00 PM",
        location: "Tata Memorial Hospital",
        city: "Mumbai",
        type: "Support Group",
        free: true,
        spots: 30
    }
];

export default function HealthCommunity() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"groups" | "qa" | "stories" | "events">("groups");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGroup, setSelectedGroup] = useState<typeof supportGroups[0] | null>(null);
    const [showAskQuestion, setShowAskQuestion] = useState(false);
    const [newQuestion, setNewQuestion] = useState("");

    // Join group handler
    const handleJoinGroup = (group: typeof supportGroups[0]) => {
        toast({
            title: `Joined ${group.name}! 🎉`,
            description: "You'll now see posts from this group in your feed.",
        });
    };

    // Submit question handler
    const handleSubmitQuestion = () => {
        if (!newQuestion.trim()) return;
        toast({
            title: "Question Submitted! ✓",
            description: "A verified doctor will answer your question soon.",
        });
        setNewQuestion("");
        setShowAskQuestion(false);
    };

    // Register for event
    const handleRegisterEvent = (event: typeof healthEvents[0]) => {
        toast({
            title: "Registered Successfully! 📅",
            description: `You're registered for ${event.title}`,
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-teal-500/5 to-background py-12">
                <div className="container max-w-6xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 mb-4">
                            <Users className="w-5 h-5 text-teal-500" />
                            <span className="text-teal-500 font-medium">Health Community</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Connect. Share. Heal. 💚</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Join thousands of people supporting each other through health challenges. You're never alone.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search groups, questions, stories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-border bg-background focus:border-teal-500 focus:outline-none"
                        />
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {[
                            { id: "groups", label: "Support Groups", icon: Users },
                            { id: "qa", label: "Ask Doctors", icon: MessageSquare },
                            { id: "stories", label: "Patient Stories", icon: Heart },
                            { id: "events", label: "Health Events", icon: Calendar }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${activeTab === tab.id
                                        ? "bg-teal-500 text-white"
                                        : "bg-card border border-border hover:border-teal-500/50"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        {/* Support Groups */}
                        {activeTab === "groups" && (
                            <motion.div
                                key="groups"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {supportGroups.map((group) => (
                                        <motion.div
                                            key={group.id}
                                            whileHover={{ y: -4 }}
                                            className="health-card overflow-hidden"
                                        >
                                            <div className={`h-2 bg-gradient-to-r ${group.color}`} />
                                            <div className="p-5">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-3xl">{group.emoji}</span>
                                                    <div>
                                                        <h3 className="font-bold">{group.name}</h3>
                                                        <p className="text-xs text-muted-foreground">
                                                            {group.members.toLocaleString()} members • {group.posts.toLocaleString()} posts
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {group.topics.slice(0, 3).map((topic) => (
                                                        <span key={topic} className="text-xs px-2 py-1 rounded-full bg-muted">
                                                            {topic}
                                                        </span>
                                                    ))}
                                                    {group.topics.length > 3 && (
                                                        <span className="text-xs px-2 py-1 rounded-full bg-muted">
                                                            +{group.topics.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                                <Button
                                                    onClick={() => handleJoinGroup(group)}
                                                    className="w-full gap-2"
                                                    variant="outline"
                                                >
                                                    <Users className="w-4 h-4" />
                                                    Join Group
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Anonymous Q&A */}
                        {activeTab === "qa" && (
                            <motion.div
                                key="qa"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Ask Question Button */}
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-teal-500" />
                                        Anonymous Q&A with Verified Doctors
                                    </h2>
                                    <Button onClick={() => setShowAskQuestion(true)} className="gap-2">
                                        <Plus className="w-4 h-4" />
                                        Ask a Question
                                    </Button>
                                </div>

                                {/* Ask Question Modal */}
                                <AnimatePresence>
                                    {showAskQuestion && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                                            onClick={() => setShowAskQuestion(false)}
                                        >
                                            <motion.div
                                                initial={{ scale: 0.95 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0.95 }}
                                                className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-lg font-semibold">Ask a Doctor</h3>
                                                    <button onClick={() => setShowAskQuestion(false)}>
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 mb-4">
                                                    <div className="flex items-start gap-2">
                                                        <Shield className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                                        <p className="text-sm text-muted-foreground">
                                                            Your question will be posted anonymously. A verified doctor will respond within 24-48 hours.
                                                        </p>
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={newQuestion}
                                                    onChange={(e) => setNewQuestion(e.target.value)}
                                                    placeholder="Type your health question here..."
                                                    className="w-full p-4 rounded-xl border-2 border-border bg-background resize-none h-32 focus:border-teal-500 focus:outline-none"
                                                />
                                                <Button onClick={handleSubmitQuestion} className="w-full mt-4 gap-2">
                                                    <Send className="w-4 h-4" />
                                                    Submit Question
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Q&A List */}
                                <div className="space-y-4">
                                    {doctorQA.map((qa) => (
                                        <div key={qa.id} className="health-card">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm text-muted-foreground">{qa.askedBy}</span>
                                                        <span className="text-xs text-muted-foreground">• {qa.timeAgo}</span>
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-500">
                                                            {qa.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-semibold mb-3">{qa.question}</h3>

                                                    {/* Doctor's Answer */}
                                                    <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/20">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                                                                <User className="w-4 h-4 text-white" />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-1">
                                                                    <span className="font-medium text-sm">{qa.doctorAnswer.doctor}</span>
                                                                    {qa.doctorAnswer.verified && (
                                                                        <CheckCircle2 className="w-4 h-4 text-teal-500" />
                                                                    )}
                                                                </div>
                                                                <span className="text-xs text-muted-foreground">{qa.doctorAnswer.specialty}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{qa.doctorAnswer.answer}</p>
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-teal-500">
                                                                <ThumbsUp className="w-4 h-4" />
                                                                {qa.doctorAnswer.helpful} helpful
                                                            </button>
                                                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-teal-500">
                                                                <MessageCircle className="w-4 h-4" />
                                                                {qa.answers} answers
                                                            </button>
                                                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                <Eye className="w-4 h-4" />
                                                                {qa.views} views
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Patient Stories */}
                        {activeTab === "stories" && (
                            <motion.div
                                key="stories"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-teal-500" />
                                        Inspiring Patient Stories
                                    </h2>
                                    <Button variant="outline" className="gap-2">
                                        <Plus className="w-4 h-4" />
                                        Share Your Story
                                    </Button>
                                </div>

                                {/* Featured Stories */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    {patientStories.filter(s => s.featured).map((story) => (
                                        <motion.div
                                            key={story.id}
                                            whileHover={{ y: -4 }}
                                            className="health-card cursor-pointer group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="text-4xl">{story.authorAvatar}</div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-500">
                                                            {story.condition}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">{story.readTime}</span>
                                                    </div>
                                                    <h3 className="font-semibold mb-2 group-hover:text-teal-500 transition-colors">
                                                        {story.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-3">{story.excerpt}</p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-muted-foreground">By {story.author}</span>
                                                        <div className="flex items-center gap-4">
                                                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                <Heart className="w-4 h-4" /> {story.likes}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                <MessageCircle className="w-4 h-4" /> {story.comments}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* All Stories */}
                                <div className="space-y-4">
                                    {patientStories.filter(s => !s.featured).map((story) => (
                                        <div key={story.id} className="health-card">
                                            <div className="flex items-center gap-4">
                                                <div className="text-3xl">{story.authorAvatar}</div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold hover:text-teal-500 cursor-pointer">{story.title}</h3>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-sm text-muted-foreground">By {story.author}</span>
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{story.condition}</span>
                                                        <span className="text-xs text-muted-foreground">{story.readTime}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Heart className="w-4 h-4" /> {story.likes}
                                                    </span>
                                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Health Events */}
                        {activeTab === "events" && (
                            <motion.div
                                key="events"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-teal-500" />
                                        Upcoming Health Events
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <MapPin className="w-4 h-4" />
                                            Near Me
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Filter className="w-4 h-4" />
                                            Filter
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {healthEvents.map((event) => (
                                        <motion.div
                                            key={event.id}
                                            whileHover={{ y: -4 }}
                                            className="health-card"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${event.type === "Screening" ? "bg-blue-500/20 text-blue-500" :
                                                                event.type === "Workshop" ? "bg-purple-500/20 text-purple-500" :
                                                                    event.type === "Awareness" ? "bg-green-500/20 text-green-500" :
                                                                        "bg-amber-500/20 text-amber-500"
                                                            }`}>
                                                            {event.type}
                                                        </span>
                                                        {event.free && (
                                                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">
                                                                Free
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="font-semibold">{event.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{event.organizer}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Calendar className="w-4 h-4 text-teal-500" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Clock className="w-4 h-4 text-teal-500" />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-teal-500" />
                                                    <span>{event.location}, {event.city}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">
                                                    {event.spots} spots available
                                                </span>
                                                <Button
                                                    onClick={() => handleRegisterEvent(event)}
                                                    size="sm"
                                                    className="gap-2"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Register
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Community Guidelines */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30"
                    >
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-teal-500" />
                            Community Guidelines
                        </h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-sm">Be Respectful</h4>
                                    <p className="text-xs text-muted-foreground">Treat everyone with kindness</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-sm">Protect Privacy</h4>
                                    <p className="text-xs text-muted-foreground">Don't share personal info</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-sm">No Medical Advice</h4>
                                    <p className="text-xs text-muted-foreground">Share experiences, not diagnoses</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-sm">Support Each Other</h4>
                                    <p className="text-xs text-muted-foreground">We're all in this together</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
