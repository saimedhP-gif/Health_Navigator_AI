import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Plus, 
  X, 
  Loader2, 
  Shield, 
  AlertCircle,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Interaction {
  medication: string;
  severity: "mild" | "moderate" | "severe" | "contraindicated";
  description: string;
  mechanism: string;
  recommendation: string;
}

interface InteractionResult {
  hasInteractions: boolean;
  riskLevel: "low" | "moderate" | "high" | "unknown";
  interactions: Interaction[];
  generalWarning: string;
  disclaimer: string;
}

interface DrugInteractionCheckerProps {
  leafName: string;
  activeCompounds: string[];
}

const severityColors = {
  mild: { bg: "bg-health-blue-light", text: "text-health-blue", icon: CheckCircle },
  moderate: { bg: "bg-health-amber-light", text: "text-health-amber", icon: AlertCircle },
  severe: { bg: "bg-health-red-light", text: "text-health-red", icon: AlertTriangle },
  contraindicated: { bg: "bg-destructive/10", text: "text-destructive", icon: Shield },
};

const riskLevelColors = {
  low: { bg: "bg-health-green-light", text: "text-health-green", label: "Low Risk" },
  moderate: { bg: "bg-health-amber-light", text: "text-health-amber", label: "Moderate Risk" },
  high: { bg: "bg-health-red-light", text: "text-health-red", label: "High Risk" },
  unknown: { bg: "bg-muted", text: "text-muted-foreground", label: "Unknown Risk" },
};

export function DrugInteractionChecker({ leafName, activeCompounds }: DrugInteractionCheckerProps) {
  const [medications, setMedications] = useState<string[]>([""]);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<InteractionResult | null>(null);
  const { toast } = useToast();

  const addMedication = () => {
    if (medications.length < 10) {
      setMedications([...medications, ""]);
    }
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const updateMedication = (index: number, value: string) => {
    const updated = [...medications];
    updated[index] = value;
    setMedications(updated);
  };

  const checkInteractions = async () => {
    const validMedications = medications.filter(m => m.trim());
    
    if (validMedications.length === 0) {
      toast({
        title: "No medications entered",
        description: "Please enter at least one medication to check.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('check-drug-interactions', {
        body: {
          medications: validMedications,
          leafName,
          leafCompounds: activeCompounds,
        },
      });

      if (error) throw error;
      setResult(data);
    } catch (error) {
      console.error('Error checking interactions:', error);
      toast({
        title: "Error",
        description: "Failed to check drug interactions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="health-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-health-amber-light flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-health-amber" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Drug Interaction Checker</h2>
          <p className="text-sm text-muted-foreground">Check for potential interactions with your medications</p>
        </div>
      </div>

      {/* Medication inputs */}
      <div className="space-y-3 mb-4">
        {medications.map((med, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={med}
              onChange={(e) => updateMedication(index, e.target.value)}
              placeholder={`Medication ${index + 1} (e.g., Warfarin, Metformin)`}
              className="flex-1"
            />
            {medications.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeMedication(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {medications.length < 10 && (
          <Button variant="outline" size="sm" onClick={addMedication} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Medication
          </Button>
        )}
        <Button 
          onClick={checkInteractions} 
          disabled={isChecking}
          className="gap-2"
        >
          {isChecking ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              Check Interactions
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Risk Level */}
            <div className={`p-4 rounded-xl ${riskLevelColors[result.riskLevel].bg}`}>
              <div className="flex items-center gap-2 mb-2">
                {result.riskLevel === "high" || result.riskLevel === "unknown" ? (
                  <AlertTriangle className={`w-5 h-5 ${riskLevelColors[result.riskLevel].text}`} />
                ) : result.riskLevel === "moderate" ? (
                  <AlertCircle className={`w-5 h-5 ${riskLevelColors[result.riskLevel].text}`} />
                ) : (
                  <CheckCircle className={`w-5 h-5 ${riskLevelColors[result.riskLevel].text}`} />
                )}
                <span className={`font-semibold ${riskLevelColors[result.riskLevel].text}`}>
                  {riskLevelColors[result.riskLevel].label}
                </span>
              </div>
              <p className="text-sm">{result.generalWarning}</p>
            </div>

            {/* Individual Interactions */}
            {result.interactions && result.interactions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Potential Interactions:</h4>
                {result.interactions.map((interaction, index) => {
                  const severity = severityColors[interaction.severity] || severityColors.moderate;
                  const Icon = severity.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${severity.bg} border-${severity.text}/20`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${severity.text}`} />
                        <span className={`font-medium ${severity.text}`}>
                          {interaction.medication}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${severity.bg} ${severity.text} capitalize`}>
                          {interaction.severity}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{interaction.description}</p>
                      {interaction.mechanism && (
                        <p className="text-xs text-muted-foreground mb-2">
                          <strong>Mechanism:</strong> {interaction.mechanism}
                        </p>
                      )}
                      {interaction.recommendation && (
                        <p className="text-xs font-medium text-primary">
                          <strong>Recommendation:</strong> {interaction.recommendation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* No interactions found */}
            {(!result.interactions || result.interactions.length === 0) && !result.hasInteractions && (
              <div className="p-4 rounded-xl bg-health-green-light">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-health-green" />
                  <span className="font-medium text-health-green">No known interactions found</span>
                </div>
                <p className="text-sm mt-2 text-muted-foreground">
                  However, this doesn't guarantee safety. Always consult a healthcare provider before combining herbal remedies with medications.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-muted border border-border">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  {result.disclaimer || "This information is for educational purposes only and should not replace professional medical advice. Always consult a qualified healthcare provider before using herbal remedies, especially if you are taking medications."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
