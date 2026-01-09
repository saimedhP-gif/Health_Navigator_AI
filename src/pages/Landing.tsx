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
  Building2
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-health-teal-light via-background to-health-blue-light opacity-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-health-blue/5 rounded-full blur-3xl" />

        <div className="container relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              {t("landing.badge")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("landing.heroTitle")}{" "}
              <span className="gradient-text">{t("landing.heroHighlight")}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t("landing.heroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/symptoms" className="gap-2">
                  {t("landing.checkSymptoms")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <a href="#how-it-works">{t("landing.howItWorks")}</a>
              </Button>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border/50 shadow-soft"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{point.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{point.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.number}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Health Navigator AI */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What is Health Navigator AI?
              </h2>
              <p className="text-lg text-muted-foreground">
                A comprehensive clinical decision support system that combines AI technology with medical knowledge
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Health Navigator AI is an intelligent health assistant that understands your symptoms
                  in natural language and provides personalized guidance. Using advanced AI models trained
                  on medical knowledge bases, it helps you:
                </p>
                <ul className="space-y-4">
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
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-health-blue/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card border border-border rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">AI Doctor Simulator</h4>
                      <p className="text-sm text-muted-foreground">Conversational health guidance</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">You:</span>
                      <p className="mt-1">"I have fever, sore throat and body pain since yesterday"</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <span className="text-primary text-sm">AI Analysis:</span>
                      <p className="mt-1">Suspected upper respiratory infection. Symptoms suggest possible viral illness. Recommended: rest, hydration, monitor temperature...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Capabilities */}
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
              Powerful Capabilities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology to provide comprehensive health guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="health-card group"
              >
                <div className={`w-14 h-14 rounded-2xl ${cap.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cap.icon className={`w-7 h-7 ${cap.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
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
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-health-blue/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("landing.ctaTitle")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("landing.ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/symptoms" className="gap-2">
                  {t("landing.checkYourSymptoms")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <Link to="/chat">{t("landing.talkToHealthAI")}</Link>
              </Button>
            </div>

            <p className="mt-8 text-xs text-muted-foreground">
              ⚠️ This is a clinical decision support tool, not a substitute for professional medical advice.
              Always consult a healthcare provider for medical concerns.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
