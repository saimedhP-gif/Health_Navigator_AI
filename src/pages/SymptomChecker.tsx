import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  User,
  Calendar,
  Activity,
  Clock,
  Thermometer,
  Loader2,
  Pill,
  Home,
  Leaf,
  Shield,
  Info,
  ChevronDown,
  ChevronUp,
  Phone,
  Sparkles,
  ListChecks,
  Mic,
  Volume2,
  VolumeX,
  Search,
  Baby,
  X
} from "lucide-react";
import {
  getRecommendationsForSymptoms,
  safetyDisclaimer,
  medicineGuidelines,
  Medicine,
  HomeCareRemedy,
  NaturalRemedy
} from "@/data/medicines";
import {
  generateCarePathway,
  CarePathway,
  CarePathwayStep
} from "@/lib/carePathwayGenerator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { VoiceInputButton, useTextToSpeech } from "@/components/voice/VoiceAssistant";
import {
  kidsSymptoms,
  symptomCategories,
  ageGroupInfo,
  KidsSymptom,
  SymptomCategory,
  AgeGroup,
  searchSymptoms as searchKidsSymptoms
} from "@/data/kidsSymptoms";
import {
  symptomDetails,
  SymptomDetail,
  FollowUpQuestion,
  getSymptomDetail,
  getDetailedRecommendations
} from "@/data/symptomDetails";

// Extended symptoms list - 100+ symptoms
const adultSymptoms = [
  // General
  "Headache", "Fever", "Fatigue", "Body Aches", "Weakness", "Chills", "Night Sweats",
  "Weight Loss", "Weight Gain", "Loss of Appetite", "Excessive Thirst", "Dehydration",
  // Respiratory
  "Cough", "Dry Cough", "Wet Cough", "Sore Throat", "Runny Nose", "Stuffy Nose",
  "Difficulty Breathing", "Shortness of Breath", "Wheezing", "Chest Congestion",
  "Rapid Breathing", "Sneezing", "Nasal Discharge", "Sinus Pain", "Hoarse Voice",
  // Digestive
  "Nausea", "Vomiting", "Diarrhea", "Constipation", "Abdominal Pain", "Stomach Cramps",
  "Bloating", "Gas", "Heartburn", "Acid Reflux", "Indigestion", "Loss of Appetite",
  "Blood in Stool", "Dark Stool", "Difficulty Swallowing",
  // Pain
  "Chest Pain", "Back Pain", "Neck Pain", "Joint Pain", "Muscle Pain", "Leg Pain",
  "Arm Pain", "Hip Pain", "Shoulder Pain", "Knee Pain", "Ankle Pain", "Wrist Pain",
  // Neurological
  "Dizziness", "Lightheadedness", "Vertigo", "Fainting", "Confusion", "Memory Problems",
  "Numbness", "Tingling", "Seizures", "Tremors", "Balance Problems", "Blurred Vision",
  // Skin
  "Skin Rash", "Itching", "Hives", "Dry Skin", "Redness", "Swelling", "Bruising",
  "Skin Discoloration", "Blisters", "Bumps", "Acne", "Eczema", "Psoriasis",
  // Cardiovascular
  "Heart Palpitations", "Rapid Heartbeat", "Slow Heartbeat", "Irregular Heartbeat",
  "High Blood Pressure", "Low Blood Pressure", "Swollen Legs", "Cold Extremities",
  // Mental Health
  "Anxiety", "Depression", "Mood Swings", "Irritability", "Sleep Problems", "Insomnia",
  "Excessive Sleep", "Stress", "Panic Attacks", "Loss of Interest",
  // Urinary
  "Frequent Urination", "Painful Urination", "Blood in Urine", "Dark Urine",
  "Difficulty Urinating", "Incontinence", "Urgency",
  // Eye/Ear
  "Eye Pain", "Red Eyes", "Eye Discharge", "Blurred Vision", "Double Vision",
  "Ear Pain", "Hearing Loss", "Ringing in Ears", "Ear Discharge",
  // Other
  "Swollen Lymph Nodes", "Dry Mouth", "Excessive Salivation", "Hair Loss",
  "Brittle Nails", "Cold Intolerance", "Heat Intolerance", "Excessive Sweating"
];

// Kids age groups for symptoms
const kidsAgeGroups = [
  { value: "Newborn (0-28 days)", emoji: "👶", desc: "Brand new baby" },
  { value: "Infant (1-12 months)", emoji: "🍼", desc: "Baby's first year" },
  { value: "Toddler (1-3 years)", emoji: "🧒", desc: "Learning to walk & talk" },
  { value: "Preschool (3-5 years)", emoji: "👧", desc: "Ready for school" }
];

type UrgencyLevel = "green" | "amber" | "red";

interface SymptomResult {
  urgency: UrgencyLevel;
  title: string;
  explanation: string;
  actions: string[];
  antibioticNote: string;
  possibleCauses: string[];
}

export default function SymptomChecker() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState(3);
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Medicine recommendations state
  const [activeRecommendationTab, setActiveRecommendationTab] = useState<"medicines" | "homeCare" | "natural" | "pathway" | "doctors" | "homeRemedies" | "naturalRemedies">("pathway");
  const [expandedMedicines, setExpandedMedicines] = useState<Set<string>>(new Set());
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Care Pathway state
  const [carePathway, setCarePathway] = useState<CarePathway | null>(null);
  const [isGeneratingPathway, setIsGeneratingPathway] = useState(false);

  // Voice assistance state
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // Kids mode and search state
  const [isKidsMode, setIsKidsMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKidsSymptoms, setSelectedKidsSymptoms] = useState<KidsSymptom[]>([]);

  // Symptom detail modal state
  const [showSymptomDetail, setShowSymptomDetail] = useState(false);
  const [activeSymptomDetail, setActiveSymptomDetail] = useState<SymptomDetail | null>(null);
  const [symptomFollowUpAnswers, setSymptomFollowUpAnswers] = useState<Record<string, string | string[]>>({});
  const [showDetailedRecommendations, setShowDetailedRecommendations] = useState(false);

  const totalSteps = 5;

  const handleSymptomToggle = (symptom: string) => {
    const isCurrentlySelected = selectedSymptoms.includes(symptom);

    if (isCurrentlySelected) {
      // Just remove the symptom
      setSelectedSymptoms((prev) => prev.filter((s) => s !== symptom));
    } else {
      // Add the symptom
      setSelectedSymptoms((prev) => [...prev, symptom]);

      // Check if this symptom has detailed follow-up questions
      const detail = getSymptomDetail(symptom);
      if (detail) {
        setActiveSymptomDetail(detail);
        setSymptomFollowUpAnswers({});
        setShowSymptomDetail(true);
        if (isVoiceEnabled) {
          speak({ text: `Selected ${symptom}. Let me ask you some follow-up questions.`, language: "en", rate: 1.0 });
        }
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsGeneratingPathway(true);
    try {
      // Run symptom analysis and care pathway generation in parallel
      const [analysisResult, pathwayResult] = await Promise.allSettled([
        // Existing symptom analysis
        supabase.functions.invoke('analyze-symptoms', {
          body: {
            age,
            gender,
            symptoms: selectedSymptoms,
            duration,
            severity,
          },
        }),
        // New care pathway generation (LLM + Rule based)
        generateCarePathway(selectedSymptoms, age, gender, duration, severity)
      ]);

      // Handle symptom analysis result
      if (analysisResult.status === 'fulfilled' && !analysisResult.value.error) {
        const resultData = analysisResult.value.data as SymptomResult;
        setResult(resultData);

        // Save to history if user is logged in
        if (user) {
          const urgencyLevel = resultData.urgency === "amber" ? "yellow" : resultData.urgency;
          await supabase.from("symptom_checks").insert([{
            user_id: user.id,
            age: parseInt(age.match(/\d+/)?.[0] || "0") || 30,
            gender: gender.toLowerCase(),
            symptoms: selectedSymptoms,
            duration,
            severity: String(severity),
            analysis_result: JSON.parse(JSON.stringify(resultData)),
            urgency_level: urgencyLevel,
          }]);
        }
      } else {
        throw new Error("Failed to analyze symptoms");
      }

      // Handle care pathway result
      if (pathwayResult.status === 'fulfilled') {
        setCarePathway(pathwayResult.value);
      } else {
        console.warn("Care pathway generation failed, continuing without it");
      }

      setStep(6);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      toast({
        title: "Error",
        description: "Failed to analyze symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsGeneratingPathway(false);
    }
  };

  const resetChecker = () => {
    setStep(1);
    setAge("");
    setGender("");
    setSelectedSymptoms([]);
    setSelectedKidsSymptoms([]);
    setDuration("");
    setSeverity(3);
    setResult(null);
    setCarePathway(null);
    setActiveRecommendationTab("pathway");
    setExpandedMedicines(new Set());
    setShowDisclaimer(true);
    setIsKidsMode(false);
    setSearchQuery("");
    setVoiceTranscript("");
    setShowSymptomDetail(false);
    setActiveSymptomDetail(null);
    setSymptomFollowUpAnswers({});
    setShowDetailedRecommendations(false);
  };

  const toggleMedicineExpand = (id: string) => {
    setExpandedMedicines(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Get medicine recommendations for selected symptoms
  const recommendations = getRecommendationsForSymptoms(selectedSymptoms);

  const canProceed = () => {
    switch (step) {
      case 1:
        return age !== "";
      case 2:
        return gender !== "";
      case 3:
        return selectedSymptoms.length > 0 || selectedKidsSymptoms.length > 0;
      case 4:
        return duration !== "";
      case 5:
        return true;
      default:
        return false;
    }
  };

  const urgencyColors = {
    green: "bg-health-green-light border-health-green text-health-green",
    amber: "bg-health-amber-light border-health-amber text-health-amber",
    red: "bg-health-red-light border-health-red text-health-red",
  };

  const urgencyEmoji = {
    green: "🟢",
    amber: "🟡",
    red: "🔴",
  };

  return (
    <Layout>
      <div className="min-h-[80vh] py-8 md:py-12">
        <div className="container max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Symptom Checker</h1>
            <p className="text-muted-foreground">
              Answer a few questions to get AI-powered guidance on your symptoms.
            </p>
          </motion.div>

          {/* Progress Bar */}
          {step <= 5 && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round((step / totalSteps) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="health-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">What is the patient's age?</h2>
                      <p className="text-sm text-muted-foreground">This helps us provide age-appropriate guidance.</p>
                    </div>
                  </div>
                  {/* Voice Toggle */}
                  <Button
                    variant={isVoiceEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setIsVoiceEnabled(!isVoiceEnabled);
                      if (isSpeaking) stop();
                    }}
                    className="gap-2"
                  >
                    {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    Voice
                  </Button>
                </div>

                {/* Kids Under 5 Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Baby className="w-5 h-5 text-pink-500" />
                    <h3 className="font-semibold text-pink-500">Children Under 5</h3>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-pink-500/20 text-pink-500">100+ symptoms</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {kidsAgeGroups.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setAge(option.value);
                          setIsKidsMode(true);
                          if (isVoiceEnabled) {
                            speak({ text: `Selected ${option.value}`, language: "en", rate: 1.2 });
                          }
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${age === option.value
                          ? "border-pink-500 bg-pink-500/10"
                          : "border-border hover:border-pink-500/50"
                          }`}
                      >
                        <span className="text-2xl block mb-1">{option.emoji}</span>
                        <span className="font-medium text-sm block">{option.value}</span>
                        <span className="text-xs text-muted-foreground">{option.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-4 text-sm text-muted-foreground">or select adult age</span>
                  </div>
                </div>

                {/* Adult Age Groups */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["5-12 years", "13-17 years", "18-30", "31-45", "46-60", "61-75", "Over 75"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setAge(option);
                        setIsKidsMode(option === "5-12 years");
                        if (isVoiceEnabled) {
                          speak({ text: `Selected ${option}`, language: "en", rate: 1.2 });
                        }
                      }}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${age === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="health-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">What is your gender?</h2>
                    <p className="text-sm text-muted-foreground">Some symptoms may vary by gender.</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {["Male", "Female", "Other"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setGender(option)}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${gender === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="health-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isKidsMode ? "bg-pink-500/10" : "bg-primary/10"}`}>
                    {isKidsMode ? <Baby className="w-6 h-6 text-pink-500" /> : <Activity className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {isKidsMode ? "What symptoms is your child experiencing?" : "Select your symptoms"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {isKidsMode
                        ? `${kidsSymptoms.length}+ child-specific symptoms available. Use voice search!`
                        : `${adultSymptoms.length}+ symptoms available. Choose all that apply.`}
                    </p>
                  </div>
                </div>

                {/* Voice Search & Text Search */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={isKidsMode ? "Search symptoms (e.g., fever, cough, rash)" : "Search symptoms..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Voice Input Button */}
                  <VoiceInputButton
                    onTranscript={(text) => {
                      setVoiceTranscript(text);
                      setSearchQuery(text);
                      if (isVoiceEnabled) {
                        speak({ text: `Searching for ${text}`, language: "en", rate: 1.2 });
                      }
                    }}
                    language="en"
                    className="!w-12 !h-12"
                  />
                </div>

                {/* Voice Transcript Feedback */}
                {voiceTranscript && (
                  <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/30">
                    <div className="flex items-center gap-2 text-sm">
                      <Mic className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Voice search:</span>
                      <span className="font-medium">{voiceTranscript}</span>
                    </div>
                  </div>
                )}

                {/* Selected Symptoms Count */}
                {(selectedSymptoms.length > 0 || selectedKidsSymptoms.length > 0) && (
                  <div className={`mb-4 p-3 rounded-xl border ${isKidsMode ? "bg-pink-500/10 border-pink-500/30" : "bg-primary/10 border-primary/30"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-5 h-5 ${isKidsMode ? "text-pink-500" : "text-primary"}`} />
                        <span className="font-medium">
                          {isKidsMode ? selectedKidsSymptoms.length : selectedSymptoms.length} symptom(s) selected
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedSymptoms([]);
                          setSelectedKidsSymptoms([]);
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {isKidsMode
                        ? selectedKidsSymptoms.map(s => (
                          <span
                            key={s.id}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${s.urgency === "emergency" ? "bg-red-500/20 text-red-400" :
                              s.urgency === "high" ? "bg-amber-500/20 text-amber-400" :
                                "bg-pink-500/20 text-pink-500"
                              }`}
                          >
                            {s.emoji} {s.name}
                            <button
                              onClick={() => setSelectedKidsSymptoms(prev => prev.filter(x => x.id !== s.id))}
                              className="hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                        : selectedSymptoms.map(s => (
                          <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                            {s}
                            <button
                              onClick={() => setSelectedSymptoms(prev => prev.filter(x => x !== s))}
                              className="hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      }
                    </div>
                  </div>
                )}

                {/* Symptoms Grid */}
                <div className="max-h-[400px] overflow-y-auto pr-2">
                  {isKidsMode ? (
                    // Kids symptoms by category
                    <div className="space-y-4">
                      {Object.entries(symptomCategories).map(([category, catInfo]) => {
                        const categorySymptoms = kidsSymptoms.filter(s =>
                          s.category === category &&
                          (searchQuery === "" || s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        );
                        if (categorySymptoms.length === 0) return null;

                        return (
                          <div key={category}>
                            <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                              <span>{catInfo.emoji}</span>
                              {catInfo.label}
                              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{categorySymptoms.length}</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                              {categorySymptoms.slice(0, 10).map(symptom => {
                                const isSelected = selectedKidsSymptoms.some(s => s.id === symptom.id);
                                return (
                                  <button
                                    key={symptom.id}
                                    onClick={() => {
                                      if (isSelected) {
                                        setSelectedKidsSymptoms(prev => prev.filter(s => s.id !== symptom.id));
                                      } else {
                                        setSelectedKidsSymptoms(prev => [...prev, symptom]);
                                        setSelectedSymptoms(prev => [...prev, symptom.name]);
                                        if (isVoiceEnabled) {
                                          speak({ text: `Added ${symptom.name}`, language: "en", rate: 1.2 });
                                        }
                                      }
                                    }}
                                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left flex items-center gap-2 ${isSelected
                                      ? symptom.urgency === "emergency"
                                        ? "border-red-500 bg-red-500/10"
                                        : symptom.urgency === "high"
                                          ? "border-amber-500 bg-amber-500/10"
                                          : "border-pink-500 bg-pink-500/10"
                                      : "border-border hover:border-pink-500/50"
                                      }`}
                                  >
                                    <span className="text-lg">{symptom.emoji}</span>
                                    <div className="flex-1 min-w-0">
                                      <span className="block truncate">{symptom.name}</span>
                                    </div>
                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-pink-500 flex-shrink-0" />}
                                    {symptom.urgency === "emergency" && <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Adult symptoms
                    <div className="grid grid-cols-2 gap-2">
                      {adultSymptoms
                        .filter(s => searchQuery === "" || s.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((symptom) => (
                          <button
                            key={symptom}
                            onClick={() => handleSymptomToggle(symptom)}
                            className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${selectedSymptoms.includes(symptom)
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50"
                              }`}
                          >
                            <span className="flex items-center gap-2">
                              {selectedSymptoms.includes(symptom) && (
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                              )}
                              {symptom}
                            </span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="health-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">How long have you had these symptoms?</h2>
                    <p className="text-sm text-muted-foreground">Duration helps determine urgency.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["Less than 24 hours", "1-3 days", "4-7 days", "1-2 weeks", "2+ weeks", "Ongoing/Chronic"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setDuration(option)}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${duration === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="health-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Thermometer className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">How severe are your symptoms?</h2>
                    <p className="text-sm text-muted-foreground">1 = Mild, 10 = Very Severe</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={severity}
                    onChange={(e) => setSeverity(parseInt(e.target.value))}
                    className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  />

                  <div className="text-center">
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary text-2xl font-bold">
                      {severity}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 6 && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Result Header */}
                <div className={`p-6 rounded-2xl border-2 ${urgencyColors[result.urgency]}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{urgencyEmoji[result.urgency]}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{result.title}</h2>
                      <p className="text-sm opacity-80">{result.explanation}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Warning */}
                {recommendations.hasEmergency && (
                  <div className="p-5 rounded-2xl bg-red-500/10 border-2 border-red-500">
                    <div className="flex items-start gap-4">
                      <Phone className="w-8 h-8 text-red-500 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-red-500">🚨 Seek Immediate Medical Attention</h3>
                        <p className="text-sm mt-1 text-red-400">
                          Your symptoms ({recommendations.emergencySymptoms.join(", ")}) require immediate medical evaluation.
                        </p>
                        <p className="text-sm mt-2 font-semibold text-red-500">
                          Call Emergency Services (108/112) or visit the nearest hospital immediately.
                        </p>
                        <p className="text-xs mt-2 text-muted-foreground">
                          Do not rely on self-medication for these symptoms.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Safety Disclaimer */}
                {showDisclaimer && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-500">{safetyDisclaimer.title}</h4>
                          <ul className="mt-2 space-y-1">
                            {safetyDisclaimer.points.slice(0, 3).map((point, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span>•</span> {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowDisclaimer(false)}
                        className="text-muted-foreground hover:text-foreground text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* What To Do */}
                <div className="health-card">
                  <h3 className="text-lg font-semibold mb-4">What to do now</h3>
                  <ul className="space-y-3">
                    {result.actions.map((action, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Medicine Recommendations Section */}
                {!recommendations.hasEmergency && (
                  <div className="health-card">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Pill className="w-5 h-5 text-primary" />
                      Recommended Relief Options
                    </h3>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                      <button
                        onClick={() => setActiveRecommendationTab("pathway")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeRecommendationTab === "pathway"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-muted hover:bg-muted/80"
                          }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        AI Care Pathway
                      </button>
                      <button
                        onClick={() => setActiveRecommendationTab("medicines")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeRecommendationTab === "medicines"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                          }`}
                      >
                        <Pill className="w-4 h-4" />
                        Medicines ({recommendations.medicines.length})
                      </button>
                      <button
                        onClick={() => setActiveRecommendationTab("homeCare")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeRecommendationTab === "homeCare"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                          }`}
                      >
                        <Home className="w-4 h-4" />
                        Home Care ({recommendations.homeCare.length})
                      </button>
                      <button
                        onClick={() => setActiveRecommendationTab("natural")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeRecommendationTab === "natural"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                          }`}
                      >
                        <Leaf className="w-4 h-4" />
                        Natural Remedies ({recommendations.natural.length})
                      </button>
                    </div>

                    {/* Care Pathway Tab (LLM + Rule Based) */}
                    {activeRecommendationTab === "pathway" && (
                      <div className="space-y-4">
                        {isGeneratingPathway ? (
                          <div className="flex flex-col items-center justify-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                            <p className="text-sm text-muted-foreground">Generating your personalized care pathway...</p>
                          </div>
                        ) : carePathway ? (
                          <>
                            {/* AI Generated Badge */}
                            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 mb-4">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                <p className="text-xs text-purple-600 dark:text-purple-400">
                                  <strong>AI-Enhanced Care Pathway</strong> — Personalized using LLM + Rule-based analysis
                                </p>
                              </div>
                            </div>

                            {/* Urgency Assessment */}
                            <div className={`p-4 rounded-xl border ${carePathway.urgencyLevel === 'emergency' ? 'bg-red-500/10 border-red-500' :
                              carePathway.urgencyLevel === 'high' ? 'bg-amber-500/10 border-amber-500' :
                                carePathway.urgencyLevel === 'moderate' ? 'bg-yellow-500/10 border-yellow-500' :
                                  'bg-green-500/10 border-green-500'
                              }`}>
                              <h4 className="font-semibold flex items-center gap-2 mb-2">
                                <Activity className="w-5 h-5" />
                                Urgency Assessment: {carePathway.urgencyLevel.charAt(0).toUpperCase() + carePathway.urgencyLevel.slice(1)}
                              </h4>
                              <p className="text-sm text-muted-foreground">{carePathway.urgencyExplanation}</p>
                            </div>

                            {/* Symptom Explanation */}
                            <div className="p-4 rounded-xl bg-card border">
                              <h4 className="font-semibold flex items-center gap-2 mb-2">
                                <Info className="w-5 h-5 text-blue-500" />
                                Understanding Your Symptoms
                              </h4>
                              <p className="text-sm text-muted-foreground">{carePathway.symptomExplanation}</p>
                            </div>

                            {/* Immediate Actions */}
                            {carePathway.immediateActions.length > 0 && (
                              <div className="p-4 rounded-xl bg-card border">
                                <h4 className="font-semibold flex items-center gap-2 mb-3">
                                  <ListChecks className="w-5 h-5 text-primary" />
                                  Your Care Pathway Steps
                                </h4>
                                <div className="space-y-4">
                                  {carePathway.immediateActions.map((step) => (
                                    <div key={step.order} className="border-l-2 border-primary pl-4">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                                          {step.order}
                                        </span>
                                        <h5 className="font-medium">{step.title}</h5>
                                        <span className="text-xs text-muted-foreground">({step.timeframe})</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                                      <ul className="text-sm space-y-1">
                                        {step.actions.map((action, i) => (
                                          <li key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            {action}
                                          </li>
                                        ))}
                                      </ul>
                                      {step.warnings && step.warnings.length > 0 && (
                                        <div className="mt-2 p-2 rounded bg-amber-500/10">
                                          {step.warnings.map((warning, i) => (
                                            <p key={i} className="text-xs text-amber-600">⚠️ {warning}</p>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Personalized Advice */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/5 to-blue-500/5 border">
                              <h4 className="font-semibold flex items-center gap-2 mb-2">
                                <User className="w-5 h-5 text-green-500" />
                                Personalized Advice for You
                              </h4>
                              <p className="text-sm text-muted-foreground">{carePathway.personalizedAdvice}</p>
                            </div>

                            {/* Recovery Timeline */}
                            <div className="p-4 rounded-xl bg-card border">
                              <h4 className="font-semibold flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-primary" />
                                Expected Recovery Timeline
                              </h4>
                              <p className="text-sm text-muted-foreground">{carePathway.recoveryTimeline}</p>
                            </div>

                            {/* When to Seek Help */}
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                              <h4 className="font-semibold flex items-center gap-2 mb-2 text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                                Seek Medical Help If:
                              </h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {carePathway.whenToSeekHelp.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span>🚨</span> {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Recommended Medicines from Pathway */}
                            {carePathway.medicineRecommendations.length > 0 && (
                              <div className="p-4 rounded-xl bg-card border">
                                <h4 className="font-semibold flex items-center gap-2 mb-3">
                                  <Pill className="w-5 h-5 text-primary" />
                                  Suggested OTC Medicines
                                </h4>
                                <div className="grid gap-2">
                                  {carePathway.medicineRecommendations.map((rec) => (
                                    <div key={rec.medicine.id} className="p-3 rounded-lg bg-muted/50 border">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium flex items-center gap-2">
                                          {rec.medicine.icon} {rec.medicine.name}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${rec.priority === 'primary'
                                          ? 'bg-green-500/10 text-green-500'
                                          : 'bg-blue-500/10 text-blue-500'
                                          }`}>
                                          {rec.priority === 'primary' ? 'Recommended' : 'Alternative'}
                                        </span>
                                      </div>
                                      <p className="text-xs text-muted-foreground">{rec.reason}</p>
                                      {rec.precautionsForUser.length > 0 && (
                                        <div className="mt-2">
                                          <p className="text-xs text-amber-500 font-medium">Precautions:</p>
                                          <ul className="text-xs text-muted-foreground">
                                            {rec.precautionsForUser.slice(0, 2).map((p, i) => (
                                              <li key={i}>• {p}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">Care pathway could not be generated. Please check the other tabs for recommendations.</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Medicines Tab */}
                    {activeRecommendationTab === "medicines" && (
                      <div className="space-y-4">
                        {recommendations.medicines.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">
                            No specific OTC medicines recommended for these symptoms. Please consult a healthcare professional.
                          </p>
                        ) : (
                          <>
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
                              <p className="text-xs text-amber-600 dark:text-amber-400">
                                💊 <strong>Before taking any medicine:</strong> Read the label carefully, check for allergies, and don't exceed recommended doses.
                              </p>
                            </div>
                            {recommendations.medicines.map((medicine) => (
                              <div
                                key={medicine.id}
                                className="border rounded-xl overflow-hidden transition-all"
                              >
                                {/* Medicine Header */}
                                <button
                                  onClick={() => toggleMedicineExpand(medicine.id)}
                                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-2xl">{medicine.icon}</span>
                                    <div className="text-left">
                                      <h4 className="font-semibold">{medicine.name}</h4>
                                      <p className="text-xs text-muted-foreground">{medicine.genericName}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-1 rounded-full ${medicine.safetyClass === "Generally Safe"
                                      ? "bg-green-500/10 text-green-500"
                                      : medicine.safetyClass === "Use Caution"
                                        ? "bg-amber-500/10 text-amber-500"
                                        : "bg-red-500/10 text-red-500"
                                      }`}>
                                      {medicine.safetyClass}
                                    </span>
                                    {expandedMedicines.has(medicine.id) ? (
                                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                    )}
                                  </div>
                                </button>

                                {/* Expanded Content */}
                                {expandedMedicines.has(medicine.id) && (
                                  <div className="px-4 pb-4 space-y-4 border-t bg-muted/30">
                                    {/* How It Works */}
                                    <div className="pt-4">
                                      <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                                        <Info className="w-4 h-4 text-blue-500" />
                                        How It Works
                                      </h5>
                                      <p className="text-sm text-muted-foreground">{medicine.howItWorks}</p>
                                    </div>

                                    {/* Used For */}
                                    <div>
                                      <h5 className="font-medium text-sm mb-2">Used For</h5>
                                      <div className="flex flex-wrap gap-1">
                                        {medicine.usedFor.map((use, i) => (
                                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                            {use}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Dosage Guidelines */}
                                    <div>
                                      <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-green-500" />
                                        Dosage Guidelines
                                      </h5>
                                      <div className="bg-card p-3 rounded-lg space-y-2 text-sm">
                                        <p><strong>Adults:</strong> {medicine.dosageGuidelines.adults}</p>
                                        {medicine.dosageGuidelines.children && (
                                          <p><strong>Children:</strong> {medicine.dosageGuidelines.children}</p>
                                        )}
                                        <p><strong>Frequency:</strong> {medicine.dosageGuidelines.frequency}</p>
                                        <p className="text-amber-500"><strong>Max Duration:</strong> {medicine.dosageGuidelines.maxDuration}</p>
                                      </div>
                                    </div>

                                    {/* Side Effects */}
                                    <div>
                                      <h5 className="font-medium text-sm mb-2">Possible Side Effects</h5>
                                      <div className="space-y-2">
                                        <div>
                                          <span className="text-xs text-green-500 font-medium">Common (usually mild):</span>
                                          <p className="text-xs text-muted-foreground">{medicine.sideEffects.common.join(", ")}</p>
                                        </div>
                                        {medicine.sideEffects.serious.length > 0 && (
                                          <div>
                                            <span className="text-xs text-red-500 font-medium">Serious (seek help if these occur):</span>
                                            <p className="text-xs text-muted-foreground">{medicine.sideEffects.serious.join(", ")}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Warnings */}
                                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                                      <h5 className="font-medium text-sm mb-2 flex items-center gap-2 text-amber-500">
                                        <AlertTriangle className="w-4 h-4" />
                                        Important Warnings
                                      </h5>
                                      <ul className="text-xs text-muted-foreground space-y-1">
                                        {medicine.warnings.map((warning, i) => (
                                          <li key={i} className="flex items-start gap-2">
                                            <span>⚠️</span> {warning}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Contraindications */}
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                                      <h5 className="font-medium text-sm mb-2 text-red-500">🚫 Do NOT use if:</h5>
                                      <ul className="text-xs text-muted-foreground space-y-1">
                                        {medicine.contraindications.map((contra, i) => (
                                          <li key={i}>• {contra}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Brand Examples */}
                                    <div>
                                      <h5 className="font-medium text-sm mb-2">Common Brands</h5>
                                      <p className="text-xs text-muted-foreground">{medicine.brandExamples.join(", ")}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}

                    {/* Home Care Tab */}
                    {activeRecommendationTab === "homeCare" && (
                      <div className="space-y-4">
                        {recommendations.homeCare.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">
                            No specific home care recommendations for these symptoms.
                          </p>
                        ) : (
                          recommendations.homeCare.map((remedy) => (
                            <div
                              key={remedy.id}
                              className="border rounded-xl overflow-hidden"
                            >
                              <button
                                onClick={() => toggleMedicineExpand(remedy.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{remedy.icon}</span>
                                  <div className="text-left">
                                    <h4 className="font-semibold">{remedy.name}</h4>
                                    <p className="text-xs text-muted-foreground">{remedy.effectiveness}</p>
                                  </div>
                                </div>
                                {expandedMedicines.has(remedy.id) ? (
                                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                )}
                              </button>

                              {expandedMedicines.has(remedy.id) && (
                                <div className="px-4 pb-4 space-y-4 border-t bg-muted/30">
                                  <div className="pt-4">
                                    <p className="text-sm text-muted-foreground">{remedy.description}</p>
                                  </div>

                                  <div>
                                    <h5 className="font-medium text-sm mb-2">Instructions</h5>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                      {remedy.instructions.map((step, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-primary font-bold">{i + 1}.</span> {step}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {remedy.ingredients && (
                                    <div>
                                      <h5 className="font-medium text-sm mb-2">What You'll Need</h5>
                                      <div className="flex flex-wrap gap-1">
                                        {remedy.ingredients.map((ing, i) => (
                                          <span key={i} className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                                            {ing}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  <div>
                                    <h5 className="font-medium text-sm mb-2">Benefits</h5>
                                    <ul className="text-xs text-muted-foreground space-y-1">
                                      {remedy.benefits.map((benefit, i) => (
                                        <li key={i}>✓ {benefit}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  {remedy.precautions.length > 0 && (
                                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                                      <h5 className="font-medium text-sm mb-2 text-amber-500">Precautions</h5>
                                      <ul className="text-xs text-muted-foreground space-y-1">
                                        {remedy.precautions.map((pre, i) => (
                                          <li key={i}>⚠️ {pre}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Natural Remedies Tab */}
                    {activeRecommendationTab === "natural" && (
                      <div className="space-y-4">
                        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 mb-4">
                          <p className="text-xs text-green-600 dark:text-green-400">
                            🌿 <strong>About Natural Remedies:</strong> These are traditional and evidence-based natural approaches. They may complement but should not replace medical treatment.
                          </p>
                        </div>
                        {recommendations.natural.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">
                            No specific natural remedies recommended for these symptoms.
                          </p>
                        ) : (
                          recommendations.natural.map((remedy) => (
                            <div
                              key={remedy.id}
                              className="border rounded-xl overflow-hidden"
                            >
                              <button
                                onClick={() => toggleMedicineExpand(remedy.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{remedy.icon}</span>
                                  <div className="text-left">
                                    <h4 className="font-semibold">{remedy.name}</h4>
                                    <p className="text-xs text-muted-foreground">{remedy.type}</p>
                                  </div>
                                </div>
                                {expandedMedicines.has(remedy.id) ? (
                                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                )}
                              </button>

                              {expandedMedicines.has(remedy.id) && (
                                <div className="px-4 pb-4 space-y-4 border-t bg-muted/30">
                                  <div className="pt-4">
                                    <p className="text-sm text-muted-foreground">{remedy.description}</p>
                                  </div>

                                  <div>
                                    <h5 className="font-medium text-sm mb-2">How to Use</h5>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                      {remedy.howToUse.map((step, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-green-500">•</span> {step}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                                    <h5 className="font-medium text-sm mb-2 text-blue-500">Scientific Basis</h5>
                                    <p className="text-xs text-muted-foreground">{remedy.scientificBasis}</p>
                                  </div>

                                  {remedy.precautions.length > 0 && (
                                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                                      <h5 className="font-medium text-sm mb-2 text-amber-500">Precautions</h5>
                                      <ul className="text-xs text-muted-foreground space-y-1">
                                        {remedy.precautions.map((pre, i) => (
                                          <li key={i}>⚠️ {pre}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Antibiotic Warning */}
                <div className="p-4 rounded-2xl bg-health-amber-light border border-health-amber/30">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-health-amber flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-health-amber">About Antibiotics</h4>
                      <p className="text-sm text-muted-foreground mt-1">{result.antibioticNote}</p>
                    </div>
                  </div>
                </div>

                {/* Possible Causes */}
                <div className="health-card">
                  <h3 className="text-lg font-semibold mb-3">Possible causes to discuss with your doctor</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.possibleCauses.map((cause, index) => (
                      <span key={index} className="px-3 py-1.5 bg-muted rounded-lg text-sm">
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medicine Guidelines */}
                <div className="health-card">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Before Taking Any Medicine
                  </h3>
                  <ul className="space-y-2">
                    {medicineGuidelines.beforeTaking.map((guideline, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {guideline}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Red Flags Section */}
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
                  <h4 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Seek Immediate Medical Help If:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {medicineGuidelines.redFlags.map((flag, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>🚨</span> {flag}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="p-4 rounded-2xl bg-muted border border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    ⚠️ This is for informational purposes only and is not a medical diagnosis.
                    Always consult a healthcare professional for medical advice.
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    🚨 Emergency: Call 108 (Ambulance) or 112 (Emergency Services)
                  </p>
                </div>

                <Button onClick={resetChecker} variant="outline" className="w-full" size="lg">
                  Check New Symptoms
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step <= 5 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {step < 5 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isLoading}
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get Results
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Symptom Detail Modal */}
      <AnimatePresence>
        {showSymptomDetail && activeSymptomDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSymptomDetail(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {!showDetailedRecommendations ? (
                // Follow-up Questions View
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                      {activeSymptomDetail.emoji}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">{activeSymptomDetail.name}</h2>
                      <p className="text-sm text-muted-foreground">{activeSymptomDetail.description}</p>
                    </div>
                    <button
                      onClick={() => setShowSymptomDetail(false)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Follow-up Questions */}
                  <div className="space-y-6">
                    {activeSymptomDetail.followUpQuestions.map((question, qIndex) => (
                      <div key={question.id} className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center">
                            {qIndex + 1}
                          </span>
                          {question.question}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((option) => {
                            const isSelected = question.multiple
                              ? (symptomFollowUpAnswers[question.id] as string[] || []).includes(option.value)
                              : symptomFollowUpAnswers[question.id] === option.value;

                            return (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSymptomFollowUpAnswers(prev => {
                                    if (question.multiple) {
                                      const current = (prev[question.id] as string[]) || [];
                                      if (current.includes(option.value)) {
                                        return { ...prev, [question.id]: current.filter(v => v !== option.value) };
                                      } else {
                                        return { ...prev, [question.id]: [...current, option.value] };
                                      }
                                    } else {
                                      return { ...prev, [question.id]: option.value };
                                    }
                                  });
                                }}
                                className={`p-3 rounded-xl border-2 text-sm text-left transition-all flex items-center gap-2 ${isSelected
                                  ? option.severity === "emergency"
                                    ? "border-red-500 bg-red-500/10 text-red-500"
                                    : option.severity === "high"
                                      ? "border-amber-500 bg-amber-500/10 text-amber-500"
                                      : "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:border-primary/50"
                                  }`}
                              >
                                <span className="text-lg">{option.emoji}</span>
                                <span className="flex-1">{option.label}</span>
                                {isSelected && <CheckCircle2 className="w-4 h-4" />}
                                {option.severity === "emergency" && !isSelected && (
                                  <AlertTriangle className="w-4 h-4 text-red-500" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {question.multiple && (
                          <p className="text-xs text-muted-foreground">Select all that apply</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setShowSymptomDetail(false)}
                      className="flex-1"
                    >
                      Skip Questions
                    </Button>
                    <Button
                      onClick={() => setShowDetailedRecommendations(true)}
                      className="flex-1 gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Get Recommendations
                    </Button>
                  </div>
                </div>
              ) : (
                // Detailed Recommendations View
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                      {activeSymptomDetail.emoji}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{activeSymptomDetail.name} - Recommendations</h2>
                      <p className="text-sm text-muted-foreground">Based on your answers</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowDetailedRecommendations(false);
                        setShowSymptomDetail(false);
                      }}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Warnings - Show First */}
                  {activeSymptomDetail.recommendations.warnings.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                      <h3 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Important Warnings
                      </h3>
                      <ul className="space-y-1">
                        {activeSymptomDetail.recommendations.warnings.map((warning, i) => (
                          <li key={i} className="text-sm text-red-400">{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tabs for Different Recommendation Types */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {["doctors", "medicines", "homeRemedies", "naturalRemedies"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveRecommendationTab(tab as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeRecommendationTab === tab
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                          }`}
                      >
                        {tab === "doctors" && "👨‍⚕️ Doctors"}
                        {tab === "medicines" && "💊 Medicines"}
                        {tab === "homeRemedies" && "🏠 Home Remedies"}
                        {tab === "naturalRemedies" && "🌿 Natural Health"}
                      </button>
                    ))}
                  </div>

                  {/* Recommendations Content */}
                  <div className="max-h-[400px] overflow-y-auto">
                    {/* Doctor Recommendations */}
                    {activeRecommendationTab === "doctors" && (
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2 text-blue-500">
                          <User className="w-5 h-5" />
                          When to See a Doctor
                        </h3>
                        {activeSymptomDetail.recommendations.doctorRecommendations.map((doc, i) => (
                          <div key={i} className={`p-4 rounded-xl border-2 ${doc.urgency === "emergency" ? "border-red-500 bg-red-500/5" :
                            doc.urgency === "urgent" ? "border-amber-500 bg-amber-500/5" :
                              doc.urgency === "soon" ? "border-blue-500 bg-blue-500/5" :
                                "border-border"
                            }`}>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">👨‍⚕️</span>
                              <div>
                                <h4 className="font-semibold">{doc.specialty}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${doc.urgency === "emergency" ? "bg-red-500/20 text-red-500" :
                                  doc.urgency === "urgent" ? "bg-amber-500/20 text-amber-500" :
                                    doc.urgency === "soon" ? "bg-blue-500/20 text-blue-500" :
                                      "bg-muted text-muted-foreground"
                                  }`}>
                                  {doc.urgency.charAt(0).toUpperCase() + doc.urgency.slice(1)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{doc.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Medicines */}
                    {activeRecommendationTab === "medicines" && (
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2 text-purple-500">
                          <Pill className="w-5 h-5" />
                          Suggested Medicines
                        </h3>
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
                          <p className="text-sm text-amber-600">
                            ⚠️ Always consult a doctor or pharmacist before taking any medicine. These are general suggestions only.
                          </p>
                        </div>
                        {activeSymptomDetail.recommendations.medicines.map((med, i) => (
                          <div key={i} className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">💊</span>
                              <div className="flex-1">
                                <h4 className="font-semibold">{med.name}</h4>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                                  {med.ageGroup === "all" ? "All ages" :
                                    med.ageGroup === "adult" ? "Adults only" :
                                      med.ageGroup === "child" ? "For children" : "For infants"}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Dosage:</span>
                                <p>{med.dosage}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Frequency:</span>
                                <p>{med.frequency}</p>
                              </div>
                            </div>
                            {med.notes && (
                              <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded-lg">
                                📝 {med.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Home Remedies */}
                    {activeRecommendationTab === "homeRemedies" && (
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2 text-green-500">
                          <Home className="w-5 h-5" />
                          Home Remedies
                        </h3>
                        {activeSymptomDetail.recommendations.homeRemedies.map((remedy, i) => (
                          <div key={i} className="p-4 rounded-xl border border-border hover:border-green-500/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{remedy.emoji}</span>
                              <h4 className="font-semibold">{remedy.name}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{remedy.instructions}</p>
                          </div>
                        ))}

                        {/* General Advice */}
                        {activeSymptomDetail.recommendations.generalAdvice.length > 0 && (
                          <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                            <h4 className="font-semibold text-blue-500 mb-2">💡 General Advice</h4>
                            <ul className="space-y-1">
                              {activeSymptomDetail.recommendations.generalAdvice.map((advice, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-blue-500">•</span>
                                  {advice}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Natural Remedies */}
                    {activeRecommendationTab === "naturalRemedies" && (
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2 text-emerald-500">
                          <Leaf className="w-5 h-5" />
                          Natural & Ayurvedic Remedies
                        </h3>
                        {activeSymptomDetail.recommendations.naturalRemedies.map((remedy, i) => (
                          <div key={i} className="p-4 rounded-xl border border-border hover:border-emerald-500/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{remedy.emoji}</span>
                              <h4 className="font-semibold">{remedy.name}</h4>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-muted-foreground font-medium">Benefits:</span>
                                <p>{remedy.benefits}</p>
                              </div>
                              <div className="p-2 bg-muted rounded-lg">
                                <span className="text-muted-foreground font-medium">How to use:</span>
                                <p>{remedy.howToUse}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <Button
                      onClick={() => {
                        setShowDetailedRecommendations(false);
                        setShowSymptomDetail(false);
                      }}
                      className="w-full"
                    >
                      Done - Continue with Symptom Check
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
