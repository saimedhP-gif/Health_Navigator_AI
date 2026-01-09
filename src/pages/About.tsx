import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { 
  Heart, 
  Shield, 
  Users, 
  Lock, 
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Globe,
  BookOpen
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "We never diagnose diseases or prescribe medications. Our guidance encourages professional consultation.",
  },
  {
    icon: Heart,
    title: "Empathy & Care",
    description: "We communicate with warmth and understanding, knowing health concerns can be stressful.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Your health information stays private. We don't store personal data or share it with third parties.",
  },
  {
    icon: BookOpen,
    title: "Health Education",
    description: "We empower users with knowledge to make informed decisions about their health.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "You Describe Symptoms",
    description: "Share your symptoms, duration, and severity through our simple questionnaire.",
  },
  {
    step: "2",
    title: "AI Analyzes Patterns",
    description: "Our AI identifies patterns and urgency levels based on medical guidelines.",
  },
  {
    step: "3",
    title: "You Get Guidance",
    description: "Receive clear recommendations: self-care, doctor visit, or emergency care.",
  },
  {
    step: "4",
    title: "Take Informed Action",
    description: "Use the guidance to make decisions, always with professional consultation encouraged.",
  },
];

const limitations = [
  "We do NOT diagnose diseases or medical conditions",
  "We do NOT prescribe medications or dosages",
  "We do NOT replace professional medical advice",
  "We do NOT store or share your personal health data",
  "We do NOT provide emergency medical services",
];

const whatWeDo = [
  "Help you understand symptom urgency",
  "Guide you toward appropriate care levels",
  "Educate about common health conditions",
  "Raise awareness about antibiotic misuse",
  "Provide clear, plain-language health information",
];

export default function About() {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        {/* Hero */}
        <section className="container max-w-4xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Our Mission
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Helping You Navigate Health Decisions{" "}
              <span className="gradient-text">Safely</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Health Navigator AI was created to bridge the gap between health concerns and professional 
              care — providing safe, accessible guidance to help people understand when and how to seek help.
            </p>
          </motion.div>
        </section>

        {/* Why We Built This */}
        <section className="bg-muted/30 py-16">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why We Built This</h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="health-card"
              >
                <div className="w-12 h-12 rounded-xl bg-health-amber-light flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-health-amber" />
                </div>
                <h3 className="text-xl font-semibold mb-3">The Problem</h3>
                <p className="text-muted-foreground">
                  Many people delay seeking care because they don't know if their symptoms are serious. 
                  Others rush to emergency rooms for minor issues. Antibiotic misuse is rising because 
                  people self-medicate without understanding when antibiotics help.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="health-card"
              >
                <div className="w-12 h-12 rounded-xl bg-health-green-light flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-health-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Solution</h3>
                <p className="text-muted-foreground">
                  We use AI to provide accessible health guidance in plain language. Our tool helps 
                  people understand symptom urgency, know what actions to take, and learn when 
                  professional care is needed — all while promoting safe practices.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="health-card"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How AI Works Safely */}
        <section className="bg-muted/30 py-16">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How Our AI Works Safely</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI is designed with strict safety guardrails to provide helpful guidance 
                without overstepping into medical diagnosis or treatment.
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do / Don't Do */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-health-red-light border border-health-red/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-health-red" />
                  <h3 className="text-xl font-semibold text-health-red">What We DON'T Do</h3>
                </div>
                <ul className="space-y-3">
                  {limitations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="text-health-red">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-health-green-light border border-health-green/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-health-green" />
                  <h3 className="text-xl font-semibold text-health-green">What We DO</h3>
                </div>
                <ul className="space-y-3">
                  {whatWeDo.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-health-green flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-card border-2 border-health-amber/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-health-amber" />
                <h2 className="text-2xl font-bold">Medical Disclaimer</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The information provided by Health Navigator AI is for <strong>general informational 
                  and educational purposes only</strong>. It is not intended to be a substitute for 
                  professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  <strong>Always seek the advice of your physician</strong> or other qualified health 
                  provider with any questions you may have regarding a medical condition. Never 
                  disregard professional medical advice or delay in seeking it because of something 
                  you have read on this platform.
                </p>
                <p>
                  If you think you may have a medical emergency, <strong>call your doctor or emergency 
                  services immediately</strong>. Health Navigator AI does not recommend or endorse any 
                  specific tests, physicians, products, procedures, opinions, or other information.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team/Mission */}
        <section className="py-16">
          <div className="container max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We envision a world where everyone has access to reliable health guidance, where 
                people feel empowered to make informed decisions, and where healthcare resources 
                are used more effectively — starting with understanding when and how to seek help.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
