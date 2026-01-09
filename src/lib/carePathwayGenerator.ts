/**
 * Symptom to Care Pathway Generator
 * A hybrid LLM + Rule-based system for generating safe, accurate care pathways
 * 
 * SAFETY PRINCIPLES:
 * 1. Rule-based logic ensures consistent, evidence-based recommendations
 * 2. LLM enhances explanations but cannot override safety rules
 * 3. Emergency conditions trigger immediate escalation
 * 4. All recommendations include appropriate disclaimers
 */

import { supabase } from "@/integrations/supabase/client";
import {
    Medicine,
    HomeCareRemedy,
    NaturalRemedy,
    medicines,
    homeCareRemedies,
    naturalRemedies,
    symptomMedicineMap,
    emergencyConditions,
    safetyDisclaimer,
    medicineGuidelines
} from "@/data/medicines";

// Types for Care Pathway
export interface CarePathwayStep {
    order: number;
    type: "immediate" | "short-term" | "ongoing" | "monitoring";
    title: string;
    description: string;
    timeframe: string;
    actions: string[];
    warnings?: string[];
}

export interface MedicineRecommendation {
    medicine: Medicine;
    priority: "primary" | "alternative";
    reason: string;
    personalizedDosage?: string;
    precautionsForUser: string[];
}

export interface CarePathway {
    id: string;
    generatedAt: Date;
    symptoms: string[];
    userProfile: {
        age: string;
        gender: string;
        severity: number;
        duration: string;
    };
    urgencyLevel: "low" | "moderate" | "high" | "emergency";
    urgencyExplanation: string;

    // Care Pathway Steps
    immediateActions: CarePathwayStep[];

    // Recommendations
    medicineRecommendations: MedicineRecommendation[];
    homeCareRecommendations: HomeCareRemedy[];
    naturalRemedies: NaturalRemedy[];

    // AI-Enhanced Content
    personalizedAdvice: string;
    symptomExplanation: string;
    whenToSeekHelp: string[];
    recoveryTimeline: string;

    // Safety
    emergencyWarnings: string[];
    contraindications: string[];
    disclaimer: typeof safetyDisclaimer;
}

// Rule-based symptom severity scoring
interface SymptomSeverityRule {
    symptom: string;
    baseSeverity: number;
    escalationFactors: {
        duration: Record<string, number>;
        ageGroup: Record<string, number>;
        combinedWith: { symptoms: string[]; multiplier: number }[];
    };
}

const symptomSeverityRules: SymptomSeverityRule[] = [
    {
        symptom: "Chest Pain",
        baseSeverity: 9,
        escalationFactors: {
            duration: { "Less than 24 hours": 0, "1-3 days": 1, "4-7 days": 2 },
            ageGroup: { "Under 18": 0, "18-30": 0, "31-45": 1, "46-60": 2, "61-75": 3, "Over 75": 4 },
            combinedWith: [
                { symptoms: ["Difficulty Breathing"], multiplier: 1.5 },
                { symptoms: ["Dizziness", "Nausea"], multiplier: 1.3 }
            ]
        }
    },
    {
        symptom: "Difficulty Breathing",
        baseSeverity: 9,
        escalationFactors: {
            duration: { "Less than 24 hours": 0, "1-3 days": 1, "4-7 days": 2 },
            ageGroup: { "Under 18": 1, "18-30": 0, "31-45": 0, "46-60": 1, "61-75": 2, "Over 75": 3 },
            combinedWith: [
                { symptoms: ["Fever"], multiplier: 1.4 },
                { symptoms: ["Chest Pain"], multiplier: 1.5 }
            ]
        }
    },
    {
        symptom: "Fever",
        baseSeverity: 4,
        escalationFactors: {
            duration: { "Less than 24 hours": 0, "1-3 days": 1, "4-7 days": 3, "1-2 weeks": 5, "2+ weeks": 7 },
            ageGroup: { "Under 18": 1, "18-30": 0, "31-45": 0, "46-60": 1, "61-75": 2, "Over 75": 3 },
            combinedWith: [
                { symptoms: ["Headache", "Stiff Neck"], multiplier: 2 },
                { symptoms: ["Body Aches", "Fatigue"], multiplier: 1.2 }
            ]
        }
    },
    {
        symptom: "Headache",
        baseSeverity: 3,
        escalationFactors: {
            duration: { "Less than 24 hours": 0, "1-3 days": 1, "4-7 days": 2, "1-2 weeks": 4 },
            ageGroup: { "Under 18": 0, "18-30": 0, "31-45": 0, "46-60": 1, "61-75": 1, "Over 75": 2 },
            combinedWith: [
                { symptoms: ["Fever", "Stiff Neck"], multiplier: 2 },
                { symptoms: ["Dizziness", "Nausea"], multiplier: 1.5 },
                { symptoms: ["Vision Problems"], multiplier: 2 }
            ]
        }
    },
    {
        symptom: "Cough",
        baseSeverity: 3,
        escalationFactors: {
            duration: { "Less than 24 hours": 0, "1-3 days": 0, "4-7 days": 1, "1-2 weeks": 2, "2+ weeks": 4 },
            ageGroup: { "Under 18": 1, "18-30": 0, "31-45": 0, "46-60": 1, "61-75": 2, "Over 75": 3 },
            combinedWith: [
                { symptoms: ["Difficulty Breathing"], multiplier: 2 },
                { symptoms: ["Fever", "Chest Pain"], multiplier: 1.5 }
            ]
        }
    },
    {
        symptom: "Diarrhea",
        baseSeverity: 4,
        escalationFactors: {
            duration: { "Less than 24 hours": 0, "1-3 days": 1, "4-7 days": 3 },
            ageGroup: { "Under 18": 2, "18-30": 0, "31-45": 0, "46-60": 1, "61-75": 2, "Over 75": 3 },
            combinedWith: [
                { symptoms: ["Fever", "Abdominal Pain"], multiplier: 1.5 },
                { symptoms: ["Nausea", "Vomiting"], multiplier: 1.3 }
            ]
        }
    },
    {
        symptom: "Abdominal Pain",
        baseSeverity: 5,
        escalationFactors: {
            duration: { "Less than 24 hours": 0, "1-3 days": 2, "4-7 days": 4 },
            ageGroup: { "Under 18": 1, "18-30": 0, "31-45": 0, "46-60": 1, "61-75": 2, "Over 75": 3 },
            combinedWith: [
                { symptoms: ["Fever", "Vomiting"], multiplier: 1.5 },
                { symptoms: ["Diarrhea"], multiplier: 1.3 }
            ]
        }
    }
];

// Default rule for symptoms not specifically defined
const defaultSymptomRule: Omit<SymptomSeverityRule, "symptom"> = {
    baseSeverity: 3,
    escalationFactors: {
        duration: { "Less than 24 hours": 0, "1-3 days": 1, "4-7 days": 2, "1-2 weeks": 3, "2+ weeks": 5 },
        ageGroup: { "Under 18": 1, "18-30": 0, "31-45": 0, "46-60": 1, "61-75": 2, "Over 75": 3 },
        combinedWith: []
    }
};

/**
 * Calculate urgency score based on rules
 */
function calculateUrgencyScore(
    symptoms: string[],
    age: string,
    duration: string,
    severity: number
): { score: number; factors: string[] } {
    let totalScore = 0;
    const factors: string[] = [];

    // Check for emergency conditions first
    const hasEmergency = symptoms.some(s => emergencyConditions.includes(s));
    if (hasEmergency) {
        return { score: 10, factors: ["Emergency condition detected"] };
    }

    // Calculate score for each symptom
    for (const symptom of symptoms) {
        const rule = symptomSeverityRules.find(r => r.symptom === symptom) ||
            { symptom, ...defaultSymptomRule };

        let symptomScore = rule.baseSeverity;

        // Apply duration factor
        const durationFactor = rule.escalationFactors.duration[duration] || 0;
        symptomScore += durationFactor;
        if (durationFactor > 1) {
            factors.push(`${symptom} duration (${duration}) increases concern`);
        }

        // Apply age factor
        const ageFactor = rule.escalationFactors.ageGroup[age] || 0;
        symptomScore += ageFactor;
        if (ageFactor > 1) {
            factors.push(`Age group (${age}) requires extra attention for ${symptom}`);
        }

        // Apply combination factors
        for (const combo of rule.escalationFactors.combinedWith) {
            const hasCombo = combo.symptoms.every(s => symptoms.includes(s));
            if (hasCombo) {
                symptomScore *= combo.multiplier;
                factors.push(`${symptom} combined with ${combo.symptoms.join(", ")} raises concern`);
            }
        }

        totalScore = Math.max(totalScore, symptomScore);
    }

    // Apply user-reported severity
    const severityMultiplier = 1 + (severity - 5) * 0.1;
    totalScore *= severityMultiplier;

    // Multiple symptoms increase overall concern
    if (symptoms.length > 3) {
        totalScore *= 1.2;
        factors.push("Multiple simultaneous symptoms require attention");
    }

    return { score: Math.min(10, totalScore), factors };
}

/**
 * Determine urgency level from score
 */
function getUrgencyLevel(score: number): CarePathway["urgencyLevel"] {
    if (score >= 8) return "emergency";
    if (score >= 6) return "high";
    if (score >= 4) return "moderate";
    return "low";
}

/**
 * Generate immediate action steps based on urgency
 */
function generateImmediateActions(
    urgencyLevel: CarePathway["urgencyLevel"],
    symptoms: string[]
): CarePathwayStep[] {
    const steps: CarePathwayStep[] = [];

    if (urgencyLevel === "emergency") {
        steps.push({
            order: 1,
            type: "immediate",
            title: "🚨 Seek Emergency Care Immediately",
            description: "Your symptoms require immediate medical evaluation.",
            timeframe: "Now",
            actions: [
                "Call emergency services (108/112) immediately",
                "Do not drive yourself to the hospital if experiencing chest pain or difficulty breathing",
                "Stay calm and keep the patient in a comfortable position",
                "Be ready to provide information about symptoms and their duration"
            ],
            warnings: [
                "Do not delay seeking help",
                "Do not take any new medications without emergency guidance"
            ]
        });
        return steps;
    }

    if (urgencyLevel === "high") {
        steps.push({
            order: 1,
            type: "immediate",
            title: "📞 Contact Healthcare Provider",
            description: "Your symptoms need professional medical evaluation within 24 hours.",
            timeframe: "Within 24 hours",
            actions: [
                "Call your doctor or visit an urgent care clinic",
                "Rest and avoid strenuous activities",
                "Monitor your symptoms closely",
                "Keep a symptom diary noting any changes"
            ]
        });
    }

    // Add symptom-specific immediate actions
    if (symptoms.includes("Fever")) {
        steps.push({
            order: steps.length + 1,
            type: "immediate",
            title: "🌡️ Manage Fever",
            description: "Take steps to reduce fever and prevent dehydration.",
            timeframe: "Immediate",
            actions: [
                "Take temperature every 4 hours",
                "Drink plenty of fluids (water, ORS, clear broths)",
                "Wear light, breathable clothing",
                "Use a lukewarm compress if temperature is high"
            ]
        });
    }

    if (symptoms.includes("Diarrhea") || symptoms.includes("Vomiting") || symptoms.includes("Nausea")) {
        steps.push({
            order: steps.length + 1,
            type: "immediate",
            title: "💧 Prevent Dehydration",
            description: "Fluid loss from vomiting or diarrhea can be dangerous.",
            timeframe: "Ongoing",
            actions: [
                "Sip ORS (Oral Rehydration Solution) frequently",
                "Avoid solid food until symptoms improve",
                "Gradually introduce bland foods (BRAT diet)",
                "Watch for signs of dehydration (dark urine, dizziness)"
            ],
            warnings: [
                "Seek help if unable to keep fluids down for more than 6 hours"
            ]
        });
    }

    if (symptoms.includes("Headache")) {
        steps.push({
            order: steps.length + 1,
            type: "immediate",
            title: "🧠 Headache Relief",
            description: "Take steps to ease headache and identify triggers.",
            timeframe: "Immediate",
            actions: [
                "Rest in a quiet, dark room",
                "Apply cold compress to forehead",
                "Stay hydrated",
                "Avoid screens and bright lights"
            ]
        });
    }

    if (symptoms.includes("Cough") || symptoms.includes("Sore Throat")) {
        steps.push({
            order: steps.length + 1,
            type: "immediate",
            title: "🗣️ Respiratory Care",
            description: "Soothe throat and respiratory symptoms.",
            timeframe: "Ongoing",
            actions: [
                "Gargle with warm salt water",
                "Drink warm fluids (honey and lemon tea)",
                "Use steam inhalation for congestion",
                "Avoid cold drinks and irritants"
            ]
        });
    }

    // Add general step for all conditions
    steps.push({
        order: steps.length + 1,
        type: "monitoring",
        title: "📊 Monitor Your Symptoms",
        description: "Keep track of how your symptoms change over time.",
        timeframe: "Throughout recovery",
        actions: [
            "Note any new symptoms that develop",
            "Track temperature if you have fever",
            "Monitor fluid intake and output",
            "Rate your overall feeling daily (1-10 scale)"
        ],
        warnings: [
            "Seek medical help if symptoms worsen significantly",
            "Contact doctor if no improvement after recommended home care duration"
        ]
    });

    return steps;
}

/**
 * Generate medicine recommendations with personalization
 */
function generateMedicineRecommendations(
    symptoms: string[],
    age: string,
    gender: string
): MedicineRecommendation[] {
    const recommendations: MedicineRecommendation[] = [];
    const medicineIds = new Set<string>();

    // Collect all relevant medicines from symptom mapping
    for (const symptom of symptoms) {
        const mapping = symptomMedicineMap[symptom];
        if (mapping) {
            mapping.medicines.forEach(id => medicineIds.add(id));
        }
    }

    // Get medicine details and create recommendations
    for (const id of medicineIds) {
        const medicine = medicines.find(m => m.id === id);
        if (!medicine) continue;

        // Skip prescription-only for OTC recommendations
        if (medicine.type === "Prescription") continue;

        // Generate personalized precautions
        const personalizedPrecautions: string[] = [];

        // Age-specific precautions
        if (age === "Under 18") {
            if (medicine.id === "aspirin") {
                continue; // Skip aspirin for children
            }
            personalizedPrecautions.push("Use pediatric formulation if available. Consult pediatrician for correct dosage.");
        }

        if (age === "Over 75" || age === "61-75") {
            personalizedPrecautions.push("Start with lower dose. Monitor for side effects more closely.");
            if (medicine.category === "NSAID") {
                personalizedPrecautions.push("Elderly are at higher risk for NSAID-related side effects. Consider paracetamol first.");
            }
        }

        // Gender-specific notes
        if (gender === "Female") {
            if (medicine.pregnancyCategory === "D" || medicine.pregnancyCategory === "X") {
                personalizedPrecautions.push("⚠️ Not recommended during pregnancy. If pregnant or planning pregnancy, consult doctor.");
            }
        }

        // Determine priority
        const isPrimary = medicine.safetyClass === "Generally Safe";

        recommendations.push({
            medicine,
            priority: isPrimary ? "primary" : "alternative",
            reason: `Helps with: ${symptoms.filter(s =>
                symptomMedicineMap[s]?.medicines.includes(id)
            ).join(", ")}`,
            precautionsForUser: [
                ...personalizedPrecautions,
                ...medicine.warnings.slice(0, 2)
            ]
        });
    }

    // Sort by priority (primary first)
    return recommendations.sort((a, b) =>
        a.priority === "primary" ? -1 : b.priority === "primary" ? 1 : 0
    );
}

/**
 * Generate LLM prompt for personalized advice
 */
function generateLLMPrompt(
    symptoms: string[],
    age: string,
    gender: string,
    duration: string,
    severity: number,
    urgencyLevel: string
): string {
    return `You are a health education assistant providing GENERAL INFORMATION only.

Patient Profile:
- Age Group: ${age}
- Gender: ${gender}
- Symptoms: ${symptoms.join(", ")}
- Duration: ${duration}
- Severity: ${severity}/10
- Assessed Urgency: ${urgencyLevel}

Generate a brief, empathetic, and educational response that includes:
1. A general explanation of what might be causing these symptoms (DO NOT DIAGNOSE)
2. Personalized self-care advice based on the profile
3. Estimated recovery timeline for common causes
4. Clear signs that would require seeking medical help

CRITICAL RULES:
- DO NOT diagnose any specific condition
- DO NOT recommend prescription medications
- DO NOT provide dosages that differ from standard labels
- ALWAYS emphasize consulting a healthcare professional
- Keep response concise and easy to understand
- Use simple language suitable for general public

Format your response as JSON:
{
  "symptomExplanation": "Brief general explanation of possible causes",
  "personalizedAdvice": "Specific self-care tips for this profile",
  "recoveryTimeline": "General timeframe for common causes",
  "seekHelpIf": ["Warning sign 1", "Warning sign 2", ...]
}`;
}

/**
 * Call LLM for enhanced explanations (using Supabase Edge Function)
 */
async function getLLMEnhancedContent(
    symptoms: string[],
    age: string,
    gender: string,
    duration: string,
    severity: number,
    urgencyLevel: string
): Promise<{
    symptomExplanation: string;
    personalizedAdvice: string;
    recoveryTimeline: string;
    seekHelpIf: string[];
} | null> {
    try {
        const prompt = generateLLMPrompt(symptoms, age, gender, duration, severity, urgencyLevel);

        const { data, error } = await supabase.functions.invoke('care-pathway-ai', {
            body: { prompt, symptoms, age, gender, duration, severity }
        });

        if (error) throw error;

        return data;
    } catch (error) {
        console.warn("LLM enhancement unavailable, using rule-based fallback:", error);
        return null;
    }
}

/**
 * Fallback content when LLM is unavailable
 */
function getRuleBasedFallbackContent(
    symptoms: string[],
    age: string,
    duration: string,
    urgencyLevel: string
): {
    symptomExplanation: string;
    personalizedAdvice: string;
    recoveryTimeline: string;
    seekHelpIf: string[];
} {
    // Generate symptom explanation based on patterns
    let explanation = "Your symptoms may be related to ";

    if (symptoms.includes("Fever") && symptoms.includes("Cough")) {
        explanation += "a viral respiratory infection, which is common and usually resolves on its own. ";
    } else if (symptoms.includes("Headache") && symptoms.includes("Fatigue")) {
        explanation += "stress, dehydration, or lack of sleep. These symptoms often improve with rest. ";
    } else if (symptoms.includes("Diarrhea") || symptoms.includes("Nausea")) {
        explanation += "a digestive issue, possibly from food or a viral stomach bug. ";
    } else {
        explanation += "various common conditions. The specific cause should be evaluated by a healthcare professional if symptoms persist. ";
    }

    // Age-specific advice
    let advice = "";
    if (age === "Under 18") {
        advice = "Ensure adequate rest and hydration. A parent or guardian should monitor symptoms closely. Consult a pediatrician if symptoms worsen or persist.";
    } else if (age === "Over 75" || age === "61-75") {
        advice = "Take extra precautions as symptoms may progress differently. Ensure you're staying well-hydrated and getting enough rest. Consider having someone check on you regularly.";
    } else {
        advice = "Focus on rest, hydration, and following the recommended home care steps. Listen to your body and don't push yourself too hard during recovery.";
    }

    // Recovery timeline based on duration and urgency
    let timeline = "";
    if (urgencyLevel === "low") {
        timeline = "Most common causes of these symptoms typically improve within 3-7 days with proper rest and self-care.";
    } else if (urgencyLevel === "moderate") {
        timeline = "These symptoms may take 1-2 weeks to fully resolve. If no improvement is seen within 5-7 days, consult a healthcare provider.";
    } else {
        timeline = "Given the nature of your symptoms, professional evaluation is recommended to determine the expected recovery time.";
    }

    return {
        symptomExplanation: explanation,
        personalizedAdvice: advice,
        recoveryTimeline: timeline,
        seekHelpIf: [
            "Symptoms suddenly get much worse",
            "New symptoms appear (especially difficulty breathing, chest pain, or confusion)",
            "Fever goes above 103°F (39.4°C)",
            "You're unable to keep fluids down for more than 6 hours",
            "Symptoms don't improve after the expected timeline"
        ]
    };
}

/**
 * Main function to generate complete care pathway
 */
export async function generateCarePathway(
    symptoms: string[],
    age: string,
    gender: string,
    duration: string,
    severity: number
): Promise<CarePathway> {
    // 1. Calculate urgency using rule-based system
    const { score: urgencyScore, factors } = calculateUrgencyScore(symptoms, age, duration, severity);
    const urgencyLevel = getUrgencyLevel(urgencyScore);

    // 2. Generate immediate actions
    const immediateActions = generateImmediateActions(urgencyLevel, symptoms);

    // 3. Generate medicine recommendations (rule-based with personalization)
    const medicineRecommendations = generateMedicineRecommendations(symptoms, age, gender);

    // 4. Get home care and natural remedies from mapping
    const homeCareIds = new Set<string>();
    const naturalIds = new Set<string>();

    for (const symptom of symptoms) {
        const mapping = symptomMedicineMap[symptom];
        if (mapping) {
            mapping.homeCare.forEach(id => homeCareIds.add(id));
            mapping.natural.forEach(id => naturalIds.add(id));
        }
    }

    const homeCareRecommendations = homeCareRemedies.filter(r => homeCareIds.has(r.id));
    const naturalRemedyRecommendations = naturalRemedies.filter(r => naturalIds.has(r.id));

    // 5. Try to get LLM-enhanced content, fall back to rules if unavailable
    let enhancedContent = await getLLMEnhancedContent(symptoms, age, gender, duration, severity, urgencyLevel);

    if (!enhancedContent) {
        enhancedContent = getRuleBasedFallbackContent(symptoms, age, duration, urgencyLevel);
    }

    // 6. Generate contraindications based on medicines and user profile
    const contraindications: string[] = [];
    for (const rec of medicineRecommendations) {
        if (age === "Under 18" && rec.medicine.id === "aspirin") {
            contraindications.push("Aspirin should not be given to children due to risk of Reye's syndrome");
        }
        contraindications.push(...rec.medicine.contraindications.slice(0, 2));
    }

    // 7. Compile the complete care pathway
    const carePathway: CarePathway = {
        id: `cp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        generatedAt: new Date(),
        symptoms,
        userProfile: { age, gender, severity, duration },
        urgencyLevel,
        urgencyExplanation: factors.length > 0
            ? `Urgency factors: ${factors.join("; ")}`
            : "Based on standard assessment of your symptoms.",

        immediateActions,
        medicineRecommendations,
        homeCareRecommendations,
        naturalRemedies: naturalRemedyRecommendations,

        personalizedAdvice: enhancedContent.personalizedAdvice,
        symptomExplanation: enhancedContent.symptomExplanation,
        whenToSeekHelp: enhancedContent.seekHelpIf,
        recoveryTimeline: enhancedContent.recoveryTimeline,

        emergencyWarnings: urgencyLevel === "emergency"
            ? ["Call emergency services immediately", "Do not delay seeking care"]
            : [],
        contraindications: [...new Set(contraindications)],
        disclaimer: safetyDisclaimer
    };

    return carePathway;
}

/**
 * Quick symptom assessment without full pathway
 */
export function quickAssessSymptoms(
    symptoms: string[],
    age: string,
    duration: string,
    severity: number
): { urgency: CarePathway["urgencyLevel"]; needsImmediateCare: boolean; message: string } {
    const { score, factors } = calculateUrgencyScore(symptoms, age, duration, severity);
    const urgency = getUrgencyLevel(score);

    let message = "";
    let needsImmediateCare = false;

    switch (urgency) {
        case "emergency":
            message = "Your symptoms require immediate medical attention. Please call emergency services or go to the nearest emergency room.";
            needsImmediateCare = true;
            break;
        case "high":
            message = "Your symptoms should be evaluated by a healthcare provider within 24 hours. Please schedule a visit with your doctor or visit an urgent care clinic.";
            needsImmediateCare = false;
            break;
        case "moderate":
            message = "Your symptoms can likely be managed at home, but consider seeing a doctor if they don't improve within a few days.";
            needsImmediateCare = false;
            break;
        default:
            message = "Your symptoms appear mild and can likely be managed with home care. Monitor for any changes.";
            needsImmediateCare = false;
    }

    return { urgency, needsImmediateCare, message };
}

/**
 * Export types for use in components
 */
export type { CarePathway, CarePathwayStep, MedicineRecommendation };
