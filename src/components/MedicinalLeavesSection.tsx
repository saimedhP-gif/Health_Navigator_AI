import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  X,
  ChevronRight,
  ArrowLeft,
  Leaf,
  MapPin,
  FlaskConical,
  BookOpen,
  AlertTriangle,
  Shield,
  Beaker,
  Globe,
  Heart,
  Map,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { medicinalLeaves, type MedicinalLeaf } from "@/data/medicinalLeaves";
import { MedicinalLeavesMap } from "./MedicinalLeavesMap";
import { DrugInteractionChecker } from "./DrugInteractionChecker";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const evidenceLevelColors: Record<string, { bg: string; text: string; label: string }> = {
  strong: { bg: "bg-health-green-light", text: "text-health-green", label: "Strong Evidence" },
  moderate: { bg: "bg-health-blue-light", text: "text-health-blue", label: "Moderate Evidence" },
  emerging: { bg: "bg-health-amber-light", text: "text-health-amber", label: "Emerging Research" },
  traditional: { bg: "bg-muted", text: "text-muted-foreground", label: "Traditional Use" },
};

interface MedicinalLeavesSectionProps {
  onBack?: () => void;
}

export function MedicinalLeavesSection({ onBack }: MedicinalLeavesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeaf, setSelectedLeaf] = useState<MedicinalLeaf | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showMap, setShowMap] = useState(false);
  const [bookmarkedLeaves, setBookmarkedLeaves] = useState<Set<string>>(new Set());
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch bookmarked leaves
  useEffect(() => {
    if (user) {
      fetchBookmarkedLeaves();
    }
  }, [user]);

  const fetchBookmarkedLeaves = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("bookmarked_leaves")
      .select("leaf_id");
    if (data) {
      setBookmarkedLeaves(new Set(data.map((b: { leaf_id: string }) => b.leaf_id)));
    }
  };

  const toggleBookmark = async (leaf: MedicinalLeaf, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to bookmark medicinal leaves.",
        variant: "destructive",
      });
      return;
    }

    const isBookmarked = bookmarkedLeaves.has(leaf.id);
    
    if (isBookmarked) {
      const { error } = await supabase
        .from("bookmarked_leaves")
        .delete()
        .eq("user_id", user.id)
        .eq("leaf_id", leaf.id);
      
      if (!error) {
        setBookmarkedLeaves((prev) => {
          const next = new Set(prev);
          next.delete(leaf.id);
          return next;
        });
        toast({ title: "Removed from bookmarks" });
      }
    } else {
      const { error } = await supabase
        .from("bookmarked_leaves")
        .insert({ user_id: user.id, leaf_id: leaf.id, leaf_name: leaf.commonName });
      
      if (!error) {
        setBookmarkedLeaves((prev) => new Set(prev).add(leaf.id));
        toast({ title: "Added to bookmarks" });
      }
    }
  };

  const filterOptions = [
    { id: "all", label: "All Leaves" },
    { id: "digestive", label: "Digestive" },
    { id: "immune", label: "Immune" },
    { id: "cognitive", label: "Brain Health" },
    { id: "skin", label: "Skin & Wounds" },
    { id: "blood-sugar", label: "Blood Sugar" },
    { id: "respiratory", label: "Respiratory" },
  ];

  const filteredLeaves = useMemo(() => {
    return medicinalLeaves.filter((leaf) => {
      const matchesSearch =
        !searchQuery.trim() ||
        leaf.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leaf.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leaf.conditions.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        leaf.regions.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesFilter = true;
      if (selectedFilter !== "all") {
        const conditionKeywords: Record<string, string[]> = {
          digestive: ["digestive", "stomach", "diarrhea", "nausea", "gut"],
          immune: ["immune", "infection", "antimicrobial", "fever"],
          cognitive: ["cognitive", "memory", "brain", "mental", "anxiety", "stress"],
          skin: ["skin", "wound", "burn", "acne", "eczema", "healing"],
          "blood-sugar": ["blood sugar", "diabetes", "glucose"],
          respiratory: ["respiratory", "cough", "congestion", "breathing", "asthma"],
        };
        const keywords = conditionKeywords[selectedFilter] || [];
        matchesFilter = leaf.conditions.some((c) =>
          keywords.some((k) => c.toLowerCase().includes(k))
        );
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <AnimatePresence mode="wait">
      {!selectedLeaf ? (
        <motion.div
          key="list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-health-green-light text-health-green text-sm font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Traditional Plant Medicine
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Medicinal Leaves from Around the World
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore traditional medicinal leaves used globally, with scientific names, regional uses,
              active compounds, preparation methods, and safety information.
            </p>
          </div>

          {/* Map Toggle */}
          <div className="flex justify-center mb-6">
            <Button
              variant={showMap ? "default" : "outline"}
              onClick={() => setShowMap(!showMap)}
              className="gap-2"
            >
              <Map className="w-4 h-4" />
              {showMap ? "Hide World Map" : "View World Map"}
            </Button>
          </div>

          {/* Interactive Map */}
          <AnimatePresence>
            {showMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <MedicinalLeavesMap onSelectLeaf={setSelectedLeaf} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, region, or condition..."
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

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className="rounded-full"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredLeaves.length} medicinal{" "}
            {filteredLeaves.length !== 1 ? "leaves" : "leaf"}
          </p>

          {/* Leaves Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeaves.map((leaf, index) => {
              const evidence = evidenceLevelColors[leaf.scientificEvidence.level];
              return (
                <motion.div
                  key={leaf.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.02, 0.5) }}
                  className="health-card text-left group relative"
                >
                  <button
                    onClick={() => setSelectedLeaf(leaf)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-health-green-light flex items-center justify-center flex-shrink-0 text-2xl">
                        {leaf.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base mb-0.5 group-hover:text-primary transition-colors">
                          {leaf.commonName}
                        </h3>
                        <p className="text-xs text-muted-foreground italic mb-2">
                          {leaf.scientificName}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${evidence.bg} ${evidence.text}`}>
                            {evidence.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{leaf.regions.slice(0, 2).join(", ")}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </button>
                  <button
                    onClick={(e) => toggleBookmark(leaf, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
                    title={bookmarkedLeaves.has(leaf.id) ? "Remove bookmark" : "Add bookmark"}
                  >
                    {bookmarkedLeaves.has(leaf.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-primary" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {filteredLeaves.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No medicinal leaves found matching "{searchQuery}"</p>
            </div>
          )}

          {/* Important Disclaimer */}
          <div className="mt-8 p-4 rounded-2xl bg-health-red-light border border-health-red/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-health-red flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-health-red mb-1">Critical Safety Notice</p>
                <p className="text-sm text-muted-foreground">
                  Natural remedies are <strong>supportive treatments only</strong> and are{" "}
                  <strong>not guaranteed cures</strong>. Many medicinal plants can interact with
                  medications or have serious side effects. Always consult a qualified healthcare
                  provider before using any herbal remedy, especially if pregnant, breastfeeding, or
                  on medications.
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
          {/* Back Button & Bookmark */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setSelectedLeaf(null)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Medicinal Leaves
            </Button>
            <Button
              variant={bookmarkedLeaves.has(selectedLeaf.id) ? "default" : "outline"}
              onClick={() => toggleBookmark(selectedLeaf)}
              className="gap-2"
            >
              {bookmarkedLeaves.has(selectedLeaf.id) ? (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  Bookmark
                </>
              )}
            </Button>
          </div>
          {/* Leaf Header */}
          <div className="health-card mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-health-green-light flex items-center justify-center flex-shrink-0 text-3xl">
                {selectedLeaf.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      evidenceLevelColors[selectedLeaf.scientificEvidence.level].bg
                    } ${evidenceLevelColors[selectedLeaf.scientificEvidence.level].text}`}
                  >
                    {evidenceLevelColors[selectedLeaf.scientificEvidence.level].label}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{selectedLeaf.commonName}</h1>
                <p className="text-lg text-muted-foreground italic mb-3">{selectedLeaf.scientificName}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{selectedLeaf.regions.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div className="health-card mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-health-blue-light flex items-center justify-center">
                <Heart className="w-5 h-5 text-health-blue" />
              </div>
              <h2 className="text-xl font-semibold">Traditional Uses & Conditions</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedLeaf.conditions.map((condition, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-health-blue-light text-health-blue text-sm rounded-full"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>

          {/* Active Compounds */}
          <div className="health-card mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Active Compounds</h2>
            </div>
            <ul className="space-y-2">
              {selectedLeaf.activeCompounds.map((compound, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Beaker className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{compound}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation Methods */}
          <div className="health-card mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-health-amber-light flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-health-amber" />
              </div>
              <h2 className="text-xl font-semibold">Preparation Methods</h2>
            </div>
            <div className="space-y-4">
              {selectedLeaf.preparationMethods.map((prep, index) => (
                <div key={index} className="border-l-2 border-health-amber pl-4">
                  <h4 className="font-medium text-health-amber mb-1">{prep.method}</h4>
                  <p className="text-sm text-muted-foreground">{prep.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific Evidence */}
          <div className="health-card mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-health-green-light flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-health-green" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Scientific Evidence</h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    evidenceLevelColors[selectedLeaf.scientificEvidence.level].bg
                  } ${evidenceLevelColors[selectedLeaf.scientificEvidence.level].text}`}
                >
                  {evidenceLevelColors[selectedLeaf.scientificEvidence.level].label}
                </span>
              </div>
            </div>
            <p className="mb-4">{selectedLeaf.scientificEvidence.summary}</p>
            {selectedLeaf.scientificEvidence.studies && selectedLeaf.scientificEvidence.studies.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-sm">Referenced Studies:</h4>
                <ul className="space-y-1">
                  {selectedLeaf.scientificEvidence.studies.map((study, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-health-green">•</span>
                      {study}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Safety Information - Critical Section */}
          <div className="p-6 rounded-2xl bg-health-red-light border border-health-red/30 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-health-red/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-health-red" />
              </div>
              <h2 className="text-xl font-semibold text-health-red">Safety Information</h2>
            </div>

            {/* Dosage */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Dosage Guidelines:</h4>
              <p className="text-sm">{selectedLeaf.safety.dosageGuidelines}</p>
            </div>

            {/* Contraindications */}
            <div className="mb-4">
              <h4 className="font-medium mb-2 text-health-red">Contraindications (Do NOT Use If):</h4>
              <ul className="space-y-1">
                {selectedLeaf.safety.contraindications.map((item, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <X className="w-4 h-4 text-health-red mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings */}
            <div>
              <h4 className="font-medium mb-2 text-health-amber">Warnings:</h4>
              <ul className="space-y-1">
                {selectedLeaf.safety.warnings.map((warning, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-health-amber mt-0.5 flex-shrink-0" />
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Drug Interaction Checker */}
          <DrugInteractionChecker 
            leafName={selectedLeaf.commonName} 
            activeCompounds={selectedLeaf.activeCompounds} 
          />
          <div className="p-4 rounded-2xl bg-muted border border-border">
            <p className="text-sm text-muted-foreground text-center">
              ⚠️ <strong>Natural remedies are supportive treatments and not guaranteed cures.</strong>{" "}
              This information is for educational purposes only. Always consult a qualified healthcare
              professional before using any herbal remedy, especially alongside medications.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
