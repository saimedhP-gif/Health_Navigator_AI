import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  X,
  ChevronRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  Heart,
  Activity,
  Brain,
  Bone,
  Eye,
  Ear,
  Baby,
  Pill,
  Droplets,
  Wind,
  Bug
} from "lucide-react";
import { healthConditions, type HealthCondition } from "@/data/healthConditions";
import { 
  searchInAllLanguages, 
  getTranslatedName, 
  getTranslatedCategory,
  categoryTranslations 
} from "@/data/symptomTranslations";

const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, typeof Heart> = {
    "Common Infections": Bug,
    "Respiratory": Wind,
    "Cardiovascular": Heart,
    "Digestive": Activity,
    "Mental Health": Brain,
    "Musculoskeletal": Bone,
    "Neurological": Brain,
    "Skin": Droplets,
    "Eye": Eye,
    "ENT": Ear,
    "Metabolic": Pill,
    "Urinary": Droplets,
    "Women's Health": Baby,
    "Infectious Diseases": Bug,
    "General": Activity,
    "Immune System": Activity,
  };
  return iconMap[category] || Heart;
};

const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    "Common Infections": "health-amber",
    "Respiratory": "health-blue",
    "Cardiovascular": "health-red",
    "Digestive": "health-green",
    "Mental Health": "health-purple",
    "Musculoskeletal": "health-amber",
    "Neurological": "health-blue",
    "Skin": "health-red",
    "Eye": "health-blue",
    "ENT": "health-amber",
    "Metabolic": "health-green",
    "Urinary": "health-blue",
    "Women's Health": "health-red",
    "Infectious Diseases": "health-amber",
    "General": "health-blue",
    "Immune System": "health-green",
  };
  return colorMap[category] || "health-blue";
};

export default function HealthLibrary() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0]; // Get base language (en, es, hi, fr)
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState<HealthCondition | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(healthConditions.map(c => c.category))];

  // Multi-language search
  const filteredConditions = useMemo(() => {
    return healthConditions.filter((condition) => {
      if (!searchQuery.trim()) {
        return !selectedCategory || condition.category === selectedCategory;
      }

      const normalizedQuery = searchQuery.toLowerCase().trim();
      
      // Direct match in English content
      const matchesEnglish = 
        condition.name.toLowerCase().includes(normalizedQuery) ||
        condition.symptoms.some((s) => s.toLowerCase().includes(normalizedQuery)) ||
        condition.category.toLowerCase().includes(normalizedQuery) ||
        condition.description.toLowerCase().includes(normalizedQuery);
      
      // Get translated terms that match the query
      const translatedTerms = searchInAllLanguages(normalizedQuery, currentLang);
      
      // Check if any translated term matches the condition
      const matchesTranslated = translatedTerms.some(term => 
        condition.name.toLowerCase().includes(term) ||
        condition.symptoms.some((s) => s.toLowerCase().includes(term)) ||
        condition.category.toLowerCase().includes(term)
      );
      
      // Check translated condition name
      const translatedName = getTranslatedName(condition.id, currentLang);
      const matchesTranslatedName = translatedName?.toLowerCase().includes(normalizedQuery);
      
      // Check translated category
      const translatedCategory = getTranslatedCategory(condition.category, currentLang);
      const matchesTranslatedCategory = translatedCategory.toLowerCase().includes(normalizedQuery);
      
      const matchesSearch = matchesEnglish || matchesTranslated || matchesTranslatedName || matchesTranslatedCategory;
      const matchesCategoryFilter = !selectedCategory || condition.category === selectedCategory;
      
      return matchesSearch && matchesCategoryFilter;
    });
  }, [searchQuery, selectedCategory, currentLang]);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      "health-red": { bg: "bg-health-red-light", text: "text-health-red", border: "border-health-red" },
      "health-amber": { bg: "bg-health-amber-light", text: "text-health-amber", border: "border-health-amber" },
      "health-blue": { bg: "bg-health-blue-light", text: "text-health-blue", border: "border-health-blue" },
      "health-green": { bg: "bg-health-green-light", text: "text-health-green", border: "border-health-green" },
      "health-purple": { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-600" },
    };
    return colorMap[color] || colorMap["health-blue"];
  };

  // Get display name based on current language
  const getDisplayName = (condition: HealthCondition): string => {
    const translated = getTranslatedName(condition.id, currentLang);
    return translated || condition.name;
  };

  // Get display category based on current language
  const getDisplayCategory = (category: string): string => {
    return getTranslatedCategory(category, currentLang);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] py-8 md:py-12">
        <div className="container max-w-5xl">
          <AnimatePresence mode="wait">
            {!selectedCondition ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("library.title")}</h1>
                  <p className="text-muted-foreground">
                    {t("library.subtitle")}
                  </p>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("library.searchPlaceholder")}
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
                    {t("library.allCategories")} ({healthConditions.length})
                  </Button>
                  {categories.map((category) => {
                    const count = healthConditions.filter(c => c.category === category).length;
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
                        {getDisplayCategory(category)} ({count})
                      </Button>
                    );
                  })}
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-4">
                  {t("library.showingResults", { count: filteredConditions.length })}
                </p>

                {/* Conditions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredConditions.map((condition, index) => {
                    const color = getCategoryColor(condition.category);
                    const colors = getColorClasses(color);
                    return (
                      <motion.button
                        key={condition.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.02, 0.5) }}
                        onClick={() => setSelectedCondition(condition)}
                        className="health-card text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 text-xl`}>
                            {condition.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                              {getDisplayName(condition)}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-1">{getDisplayCategory(condition.category)}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {condition.description}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {filteredConditions.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">{t("library.noResults", { query: searchQuery })}</p>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="mt-8 p-4 rounded-2xl bg-muted border border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    ℹ️ {t("library.disclaimer")}
                  </p>
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
                  onClick={() => setSelectedCondition(null)}
                  className="mb-6 gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("library.backToLibrary")}
                </Button>

                {/* Condition Header */}
                {(() => {
                  const color = getCategoryColor(selectedCondition.category);
                  const colors = getColorClasses(color);
                  return (
                    <div className="health-card mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0 text-3xl`}>
                          {selectedCondition.icon}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{getDisplayCategory(selectedCondition.category)}</p>
                          <h1 className="text-2xl md:text-3xl font-bold mb-2">{getDisplayName(selectedCondition)}</h1>
                          <p className="text-muted-foreground">{selectedCondition.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Symptoms */}
                <div className="health-card mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">{t("library.symptoms")}</h2>
                  </div>
                  <ul className="space-y-2">
                    {selectedCondition.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div className="health-card mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-health-green-light flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-health-green" />
                    </div>
                    <h2 className="text-xl font-semibold">{t("library.prevention")}</h2>
                  </div>
                  <ul className="space-y-2">
                    {selectedCondition.prevention.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-health-green mt-1 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When to See a Doctor */}
                <div className="p-6 rounded-2xl bg-health-amber-light border border-health-amber/30 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-health-amber/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-health-amber" />
                    </div>
                    <h2 className="text-xl font-semibold text-health-amber">{t("library.whenToSeeDoctor")}</h2>
                  </div>
                  <ul className="space-y-2">
                    {selectedCondition.whenToSeeDoctor.map((sign, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-health-amber mt-1 flex-shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="p-4 rounded-2xl bg-muted border border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    ⚠️ {t("library.detailDisclaimer")}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
