import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  X,
  ChevronRight,
  ArrowLeft,
  Leaf,
  Brain,
  Heart,
  Sparkles,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Repeat
} from "lucide-react";
import { naturalHealthTechniques, techniqueCategories, type NaturalTechnique } from "@/data/naturalHealthTechniques";
import { MedicinalLeavesSection } from "@/components/MedicinalLeavesSection";

const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, typeof Heart> = {
    "Nutrition & Herbal": Leaf,
    "Mind-Body": Brain,
    "Physical Wellness": Heart,
    "Traditional Therapies": Sparkles,
    "Lifestyle & Prevention": Repeat,
  };
  return iconMap[category] || Leaf;
};

const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    "Nutrition & Herbal": "health-green",
    "Mind-Body": "health-blue",
    "Physical Wellness": "health-red",
    "Traditional Therapies": "health-amber",
    "Lifestyle & Prevention": "health-teal",
  };
  return colorMap[category] || "health-green";
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-health-green-light text-health-green",
  intermediate: "bg-health-amber-light text-health-amber",
  advanced: "bg-health-red-light text-health-red",
};

export default function NaturalHealth() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnique, setSelectedTechnique] = useState<NaturalTechnique | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("techniques");

  const filteredTechniques = useMemo(() => {
    return naturalHealthTechniques.filter((technique) => {
      const matchesSearch = !searchQuery.trim() || 
        technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technique.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technique.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technique.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || technique.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      "health-red": { bg: "bg-health-red-light", text: "text-health-red", border: "border-health-red" },
      "health-amber": { bg: "bg-health-amber-light", text: "text-health-amber", border: "border-health-amber" },
      "health-blue": { bg: "bg-health-blue-light", text: "text-health-blue", border: "border-health-blue" },
      "health-green": { bg: "bg-health-green-light", text: "text-health-green", border: "border-health-green" },
      "health-teal": { bg: "bg-health-teal-light", text: "text-primary", border: "border-primary" },
    };
    return colorMap[color] || colorMap["health-green"];
  };

  return (
    <Layout>
      <div className="min-h-[80vh] py-8 md:py-12">
        <div className="container max-w-5xl">
          {/* Main Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-health-green-light text-health-green text-sm font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Natural Wellness Guide
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Natural Health & Herbal Medicine</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Evidence-based natural approaches and traditional medicinal plants to support your health and well-being.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="techniques" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Techniques
              </TabsTrigger>
              <TabsTrigger value="leaves" className="gap-2">
                <Leaf className="w-4 h-4" />
                Medicinal Leaves
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leaves">
              <MedicinalLeavesSection />
            </TabsContent>

            <TabsContent value="techniques">
          <AnimatePresence mode="wait">
            {!selectedTechnique ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Sub Header for Techniques */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">Natural Health Techniques</h2>
                  <p className="text-muted-foreground text-sm">
                    Always consult healthcare professionals before starting new health practices.
                  </p>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search techniques, benefits, or categories..."
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="rounded-full"
                  >
                    All Techniques ({naturalHealthTechniques.length})
                  </Button>
                  {techniqueCategories.map((category) => {
                    const count = naturalHealthTechniques.filter(t => t.category === category).length;
                    const CategoryIcon = getCategoryIcon(category);
                    return (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="rounded-full gap-1"
                      >
                        <CategoryIcon className="w-3 h-3" />
                        {category} ({count})
                      </Button>
                    );
                  })}
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-4">
                  Showing {filteredTechniques.length} technique{filteredTechniques.length !== 1 ? "s" : ""}
                </p>

                {/* Techniques Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTechniques.map((technique, index) => {
                    const color = getCategoryColor(technique.category);
                    const colors = getColorClasses(color);
                    return (
                      <motion.button
                        key={technique.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.02, 0.5) }}
                        onClick={() => setSelectedTechnique(technique)}
                        className="health-card text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 text-xl`}>
                            {technique.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                              {technique.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[technique.difficulty]}`}>
                                {technique.difficulty}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {technique.duration}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {technique.description}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {filteredTechniques.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No techniques found matching "{searchQuery}"</p>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="mt-8 p-4 rounded-2xl bg-health-amber-light border border-health-amber/30">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-health-amber flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-health-amber mb-1">Important Disclaimer</p>
                      <p className="text-sm text-muted-foreground">
                        This information is for educational purposes only and is not a substitute for professional medical advice. 
                        Natural health techniques complement but do not replace medical treatment. 
                        Always consult healthcare providers before starting new health practices.
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
              >
                {/* Back Button */}
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTechnique(null)}
                  className="mb-6 gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Techniques
                </Button>

                {/* Technique Header */}
                {(() => {
                  const color = getCategoryColor(selectedTechnique.category);
                  const colors = getColorClasses(color);
                  return (
                    <div className="health-card mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0 text-3xl`}>
                          {selectedTechnique.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[selectedTechnique.difficulty]}`}>
                              {selectedTechnique.difficulty}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {selectedTechnique.duration}
                            </span>
                            <span className="text-xs text-muted-foreground">{selectedTechnique.category}</span>
                          </div>
                          <h1 className="text-2xl md:text-3xl font-bold mb-2">{selectedTechnique.name}</h1>
                          <p className="text-muted-foreground">{selectedTechnique.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Benefits */}
                <div className="health-card mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-health-green-light flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-health-green" />
                    </div>
                    <h2 className="text-xl font-semibold">Benefits</h2>
                  </div>
                  <ul className="space-y-2">
                    {selectedTechnique.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-health-green mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Start */}
                <div className="health-card mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">How to Get Started</h2>
                  </div>
                  <ol className="space-y-3">
                    {selectedTechnique.howToStart.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Safety Notes */}
                <div className="p-6 rounded-2xl bg-health-amber-light border border-health-amber/30 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-health-amber/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-health-amber" />
                    </div>
                    <h2 className="text-xl font-semibold text-health-amber">Safety Considerations</h2>
                  </div>
                  <ul className="space-y-2">
                    {selectedTechnique.safetyNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-health-amber mt-1 flex-shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Frequency */}
                <div className="health-card mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-health-blue-light flex items-center justify-center">
                      <Repeat className="w-5 h-5 text-health-blue" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Recommended Frequency</h2>
                      <p className="text-muted-foreground">{selectedTechnique.frequency}</p>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 rounded-2xl bg-muted border border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    ⚠️ This content is for educational purposes only and does not constitute medical advice. 
                    Always consult a healthcare professional before starting any new health practice.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
