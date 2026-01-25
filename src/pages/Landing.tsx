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
      {/* Hero Section - Bento Box Layout */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-24 space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <div className="w-2 h-2 rounded-full bg-health-green animate-pulse" />
                <span className="text-sm font-semibold text-primary">AI-Powered Health Assistant</span>
              </motion.div>

              {/* Main Headline */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
                  Your Health,
                  <br />
                  <span className="bg-gradient-to-r from-primary via-health-mint to-health-green bg-clip-text text-transparent">
                    Simplified
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                  Get instant AI-powered health insights, connect with experts, and take control of your wellness journey.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  <Link to="/symptoms" className="gap-2">
                    Start Free Analysis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-semibold">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Conditions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">17+</div>
                  <div className="text-sm text-muted-foreground">Languages</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Bento Box Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 auto-rows-auto"
            >
              {/* AI Smart Diagnosis - Large Card */}
              <Link to="/smart-diagnosis" className="col-span-2 group">
                <div className="relative h-full min-h-[280px] rounded-3xl bg-gradient-to-br from-primary/10 via-health-mint/5 to-health-green/10 p-8 border-2 border-primary/20 hover:border-primary/40 transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-4">
                      <Sparkles className="w-3 h-3" />
                      NEW
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      AI Smart Diagnosis
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Describe your symptoms naturally and get instant AI-powered analysis with personalized care recommendations.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-2 text-sm">
                        <Mic className="w-4 h-4 text-primary" />
                        Voice Input
                      </span>
                      <span className="flex items-center gap-2 text-sm">
                        <Brain className="w-4 h-4 text-primary" />
                        AI Analysis
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>

              {/* Emergency Services */}
              <Link to="/emergency" className="col-span-2 group">
                <div className="relative h-full min-h-[180px] rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/10 p-6 border-2 border-red-500/30 hover:border-red-500/50 transition-all overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-red-500">
                        <Siren className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-red-500">Emergency</h3>
                        <p className="text-sm text-muted-foreground">24/7 Services</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href="tel:108" onClick={(e) => e.stopPropagation()} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
                        📞 108
                      </a>
                      <a href="tel:112" onClick={(e) => e.stopPropagation()} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
                        📞 112
                      </a>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Mental Health */}
              <Link to="/mental-health" className="group">
                <div className="relative h-full min-h-[240px] rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-6 border-2 border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 w-fit mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-500 transition-colors">Mental Health</h3>
                  <p className="text-sm text-muted-foreground mb-4">Mood tracking, meditation & crisis support</p>
                  <div className="flex items-center gap-2 text-sm text-purple-500">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Skin Analyzer */}
              <Link to="/skin-analyzer" className="group">
                <div className="relative h-full min-h-[240px] rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 border-2 border-amber-500/20 hover:border-amber-500/40 transition-all">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 w-fit mb-4">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-amber-500 transition-colors">Skin Analyzer</h3>
                  <p className="text-sm text-muted-foreground mb-4">AI-powered dermatology analysis</p>
                  <div className="flex items-center gap-2 text-sm text-amber-500">
                    <span>Analyze</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Health Community */}
              <Link to="/community" className="group">
                <div className="relative h-full min-h-[200px] rounded-3xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-6 border-2 border-teal-500/20 hover:border-teal-500/40 transition-all">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 w-fit mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-teal-500 transition-colors">Community</h3>
                  <p className="text-sm text-muted-foreground">Join support groups</p>
                </div>
              </Link>

              {/* Diet Planner */}
              <Link to="/diet-planner" className="group">
                <div className="relative h-full min-h-[200px] rounded-3xl bg-gradient-to-br from-green-500/10 to-lime-500/10 p-6 border-2 border-green-500/20 hover:border-green-500/40 transition-all">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-lime-600 w-fit mb-4">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-green-500 transition-colors">Diet Planner</h3>
                  <p className="text-sm text-muted-foreground">Personalized nutrition</p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {trustPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{point.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Core Features
            </span>
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

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
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
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                Get Started Today
              </span>

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
