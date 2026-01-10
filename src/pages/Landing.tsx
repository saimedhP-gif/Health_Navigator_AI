import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Shield,
  AlertTriangle,
  Stethoscope,
  BookOpen,
  ArrowRight,
  Activity,
  Pill,
  Lock,
  Globe,
  Mic,
  Sparkles,
  Users,
  Clock,
  CheckCircle,
  Brain,
  MessageSquare,
  MapPin,
  FileText,
  Zap,
  Award,
  HeartPulse,
  Languages,
  Volume2,
  Leaf,
  Building2,
  Phone,
  Siren,
  Camera,
  Smile,
  Wind,
  HeartHandshake,
  Smartphone
} from "lucide-react";

export default function Landing() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Activity,
      title: t("landing.featureSymptomAction"),
      description: t("landing.featureSymptomActionDesc"),
    },
    {
      icon: Pill,
      title: t("landing.featureAntibiotic"),
      description: t("landing.featureAntibioticDesc"),
    },
    {
      icon: AlertTriangle,
      title: t("landing.featureEmergency"),
      description: t("landing.featureEmergencyDesc"),
    },
    {
      icon: BookOpen,
      title: t("landing.featureEducation"),
      description: t("landing.featureEducationDesc"),
    },
  ];

  const trustPoints = [
    {
      icon: Shield,
      title: t("landing.trustNotDiagnosis"),
      description: t("landing.trustNotDiagnosisDesc"),
    },
    {
      icon: Stethoscope,
      title: t("landing.trustDoctorReviewed"),
      description: t("landing.trustDoctorReviewedDesc"),
    },
    {
      icon: Lock,
      title: t("landing.trustPrivacy"),
      description: t("landing.trustPrivacyDesc"),
    },
  ];

  // Advanced capabilities
  const capabilities = [
    {
      icon: Brain,
      title: "AI-Powered Symptom Analysis",
      description: "Our advanced AI understands natural language symptoms and converts them into structured medical intents using SNOMED CT and ICD-10 codes.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: MessageSquare,
      title: "Interactive Health Conversations",
      description: "Engage in dynamic Q&A sessions that clarify symptoms, ask follow-up questions, and explain conditions in simple, understandable language.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: HeartPulse,
      title: "Medical Triage System",
      description: "Real-time urgency assessment that categorizes symptoms from self-care to emergency, with safety warnings and recommended next steps.",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: MapPin,
      title: "Hospital & Clinic Finder",
      description: "Location-based recommendations for nearby healthcare facilities, filtered by specialty, distance, ratings, and emergency capabilities.",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Pill,
      title: "Medicine Suggestions",
      description: "Safe OTC medication recommendations with dosage guidelines, contraindication warnings, and non-pharmacological self-care advice.",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: FileText,
      title: "Prescription Scanner",
      description: "Upload prescription images for AI-powered text extraction, medication identification, and dosage reminders using Google Cloud Vision.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    }
  ];

  // Technology features
  const techFeatures = [
    {
      icon: Languages,
      title: "17+ Languages",
      description: "Multi-language support with Google Cloud Translation for global accessibility"
    },
    {
      icon: Volume2,
      title: "Voice Assistant",
      description: "Speech-to-text input and text-to-speech output for hands-free interaction"
    },
    {
      icon: Sparkles,
      title: "Google Safe AI",
      description: "Built with responsible AI practices ensuring safety, fairness, and transparency"
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Instant symptom analysis with sub-second response times"
    }
  ];

  // Statistics
  const stats = [
    { number: "1000+", label: "Medical Conditions", icon: Heart },
    { number: "17+", label: "Languages Supported", icon: Globe },
    { number: "24/7", label: "Always Available", icon: Clock },
    { number: "100%", label: "Privacy Focused", icon: Lock }
  ];

  // Use cases
  const useCases = [
    {
      icon: Users,
      title: "For Patients",
      description: "Search symptoms before visiting a doctor, understand health conditions, and get guidance on next steps.",
      examples: ["Pre-visit symptom check", "Medication information", "Emergency guidance"]
    },
    {
      icon: Building2,
      title: "For Healthcare Providers",
      description: "Embed triage capabilities in telehealth platforms, pre-screen patients, and route to appropriate departments.",
      examples: ["Pre-triage screening", "Call center support", "Patient education"]
    },
    {
      icon: Leaf,
      title: "For Wellness Seekers",
      description: "Explore natural remedies, medicinal plants, and holistic approaches to health management.",
      examples: ["Home remedies", "Natural treatments", "Preventive care"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-pattern">
        {/* Animated background glows */}
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="absolute inset-0 bg-gradient-to-br from-health-teal-light/30 via-background to-health-blue-light/30" />

        {/* Decorative grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="container relative py-24 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-primary text-sm font-semibold mb-8 premium-shadow"
            >
              <div className="w-2 h-2 rounded-full bg-health-green animate-pulse" />
              <Heart className="w-4 h-4" />
              {t("landing.badge")}
              <span className="pro-badge ml-2">AI Powered</span>
            </motion.div>

            {/* Hero Title */}
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-8 tracking-tight">
              {t("landing.heroTitle")}{" "}
              <span className="animated-gradient-text">{t("landing.heroHighlight")}</span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("landing.heroSubtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="btn-premium text-base px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link to="/symptoms" className="gap-3">
                  {t("landing.checkSymptoms")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg" className="text-base px-8 py-6 hover:bg-primary/5 transition-all">
                <a href="#how-it-works">{t("landing.howItWorks")}</a>
              </Button>
            </div>

            {/* AI Smart Diagnosis - Primary Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8"
            >
              <Link to="/smart-diagnosis">
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-health-mint to-health-green p-[2px] hover:shadow-xl hover:shadow-primary/20 transition-all">
                  <div className="relative bg-background rounded-2xl p-6 flex items-center gap-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-health-mint/5 to-health-green/5" />
                    <div className="relative flex-shrink-0 p-4 rounded-xl bg-gradient-to-br from-primary to-health-green group-hover:scale-110 transition-transform">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="relative flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-xl">AI-Powered Smart Diagnosis</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary">NEW</span>
                      </div>
                      <p className="text-muted-foreground">
                        Describe symptoms naturally with voice or text • Get instant AI analysis • Personalized care pathway
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="flex items-center gap-1 text-sm text-primary">
                          <Mic className="w-4 h-4" /> Voice Input
                        </span>
                        <span className="flex items-center gap-1 text-sm text-primary">
                          <Activity className="w-4 h-4" /> AI Analysis
                        </span>
                        <span className="flex items-center gap-1 text-sm text-primary">
                          <Heart className="w-4 h-4" /> Care Pathway
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="relative w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Emergency Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Link to="/emergency">
                <div className="group inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 hover:border-red-500 transition-all hover:shadow-lg hover:shadow-red-500/20 cursor-pointer">
                  <div className="p-3 rounded-xl bg-red-500 group-hover:scale-110 transition-transform animate-pulse">
                    <Siren className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-red-500 flex items-center gap-2">
                      🚨 Emergency Services
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ambulance • Blood Bank • First Aid Guides
                    </p>
                  </div>
                  <div className="hidden sm:flex gap-2">
                    <a
                      href="tel:108"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      108
                    </a>
                    <a
                      href="tel:112"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      112
                    </a>
                  </div>
                  <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform hidden sm:block" />
                </div>
              </Link>
            </motion.div>

            {/* New Feature Cards Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
            >
              {/* Mental Health Companion */}
              <Link to="/mental-health" className="flex-1 max-w-md">
                <div className="group p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-2 border-purple-500/30 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 group-hover:scale-110 transition-transform">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-purple-600 dark:text-purple-400">Mental Health Companion</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-500">AI-Powered</span>
                    </div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex items-center gap-2"><Smile className="w-4 h-4 text-purple-500" /> Mood Tracking Journal</li>
                    <li className="flex items-center gap-2"><Wind className="w-4 h-4 text-purple-500" /> Breathing & Meditation</li>
                    <li className="flex items-center gap-2"><HeartHandshake className="w-4 h-4 text-purple-500" /> Crisis Helpline Integration</li>
                  </ul>
                </div>
              </Link>

              {/* Skin Condition Analyzer */}
              <Link to="/skin-analyzer" className="flex-1 max-w-md">
                <div className="group p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 hover:border-amber-500 transition-all hover:shadow-lg hover:shadow-amber-500/10 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-amber-600 dark:text-amber-400">Skin Condition Analyzer</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">Dermatology AI</span>
                    </div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex items-center gap-2"><Camera className="w-4 h-4 text-amber-500" /> Upload Skin Photo</li>
                    <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> AI Analysis & Insights</li>
                    <li className="flex items-center gap-2"><Stethoscope className="w-4 h-4 text-amber-500" /> Connect with Dermatologists</li>
                  </ul>
                </div>
              </Link>
            </motion.div>

            {/* Health Community Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 flex justify-center"
            >
              <Link to="/community" className="w-full max-w-2xl">
                <div className="group p-5 rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-2 border-teal-500/30 hover:border-teal-500 transition-all hover:shadow-lg hover:shadow-teal-500/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-teal-600 dark:text-teal-400">Health Community Forums</h3>
                      <p className="text-sm text-muted-foreground">
                        Support groups • Ask Doctors • Patient Stories • Health Events
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-teal-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Diet & Nutrition Planner Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-4 flex justify-center"
            >
              <Link to="/diet-planner" className="w-full max-w-2xl">
                <div className="group p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-lime-500/10 border-2 border-green-500/30 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-lime-600 group-hover:scale-110 transition-transform">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-green-600 dark:text-green-400">Diet & Nutrition Planner</h3>
                      <p className="text-sm text-muted-foreground">
                        Indian cuisine meal plans • Calorie tracking • Grocery lists • Recipes
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Mobile Apps Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-4 flex justify-center"
            >
              <Link to="/mobile-app" className="w-full max-w-2xl">
                <div className="group p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-2 border-indigo-500/30 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">Get the Mobile App</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-500">Coming Soon</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Offline mode • Push notifications • Apple Watch & WearOS
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {trustPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group relative"
              >
                <div className="glass-card p-6 rounded-2xl feature-card h-full">
                  <div className="flex items-start gap-4">
                    <div className="icon-container w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-health-mint/20 flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">{point.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-health-mint/10 to-primary/5" />
        <div className="absolute inset-0 bg-pattern opacity-50" />

        <div className="container relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center stat-container group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-health-mint/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="stat-number text-4xl md:text-5xl font-extrabold animated-gradient-text mb-2">{stat.number}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Health Navigator AI */}
      <section className="py-24 md:py-32 relative">
        {/* Section divider */}
        <div className="section-divider mb-24" />

        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
              >
                About Our Platform
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
                What is <span className="animated-gradient-text">Health Navigator AI</span>?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A comprehensive clinical decision support system that combines AI technology with medical knowledge
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Health Navigator AI is an intelligent health assistant that understands your symptoms
                  in natural language and provides personalized guidance. Using advanced AI models trained
                  on medical knowledge bases, it helps you:
                </p>
                <ul className="space-y-5">
                  {[
                    "Understand what your symptoms might indicate",
                    "Determine the urgency of your condition",
                    "Get recommendations for next steps",
                    "Find nearby healthcare facilities",
                    "Learn about medications and treatments",
                    "Access health education in your language"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-health-mint/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-base font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-health-mint/30 rounded-3xl blur-3xl animate-pulse" />
                <div className="relative glass-card rounded-3xl p-8 shadow-xl gradient-border">
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-health-mint flex items-center justify-center shadow-lg">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">AI Doctor Simulator</h4>
                      <p className="text-sm text-muted-foreground">Conversational health guidance</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border/30">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">You</span>
                      <p className="mt-2 text-sm leading-relaxed">"I have fever, sore throat and body pain since yesterday"</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-health-mint/10 border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">AI Analysis</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed">Suspected upper respiratory infection. Symptoms suggest possible viral illness. Recommended: rest, hydration, monitor temperature...</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-health-mint/5 rounded-full blur-3xl" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            >
              Core Features
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
              Powerful <span className="animated-gradient-text">Capabilities</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Built with cutting-edge technology to provide comprehensive health guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 feature-card group"
              >
                <div className={`icon-container w-16 h-16 rounded-2xl ${cap.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                  <cap.icon className={`w-8 h-8 ${cap.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("landing.featuresTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("landing.featuresSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="health-card group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Who Can Benefit?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed for diverse users with different health information needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.examples.map((example, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Levels Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("landing.urgencyTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("landing.urgencySubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-health-green-light border-2 border-health-green/30"
            >
              <div className="text-4xl mb-3">🟢</div>
              <h3 className="text-lg font-semibold text-health-green mb-2">{t("landing.urgencyGreen")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("landing.urgencyGreenDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-health-amber-light border-2 border-health-amber/30"
            >
              <div className="text-4xl mb-3">🟡</div>
              <h3 className="text-lg font-semibold text-health-amber mb-2">{t("landing.urgencyAmber")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("landing.urgencyAmberDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-health-red-light border-2 border-health-red/30"
            >
              <div className="text-4xl mb-3">🔴</div>
              <h3 className="text-lg font-semibold text-health-red mb-2">{t("landing.urgencyRed")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("landing.urgencyRedDesc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety & Compliance */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary/5 via-card to-health-blue/5 border border-border rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Safety & Compliance</h3>
                  <p className="text-sm text-muted-foreground">Built with Google Safe AI Practices</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Not a Diagnosis", desc: "We provide guidance, not medical diagnoses. Always consult healthcare professionals." },
                  { title: "Privacy First", desc: "Your health data is encrypted, never stored permanently, and never shared with third parties." },
                  { title: "Clinician Reviewed", desc: "All medical rules and pathways are reviewed by licensed healthcare professionals." },
                  { title: "Transparent AI", desc: "We clearly communicate AI limitations and provide reasoning for all recommendations." },
                  { title: "Conservative Approach", desc: "When in doubt, we always recommend professional consultation for safety." },
                  { title: "Audit Logging", desc: "All AI decisions are logged for quality assurance and safety monitoring." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-health-mint/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-health-mint/20 rounded-full blur-3xl" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="glass-card rounded-3xl p-10 md:p-16 premium-shadow">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
              >
                Get Started Today
              </motion.span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
                {t("landing.ctaTitle")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                {t("landing.ctaSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="hero" size="lg" className="btn-premium text-base px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Link to="/symptoms" className="gap-3">
                    {t("landing.checkYourSymptoms")}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="hero-outline" size="lg" className="text-base px-8 py-6 hover:bg-primary/5 transition-all">
                  <Link to="/chat">{t("landing.talkToHealthAI")}</Link>
                </Button>
              </div>

              <div className="mt-10 pt-8 border-t border-border/30">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  This is a clinical decision support tool, not a substitute for professional medical advice.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
