// Symptom Details with Follow-up Questions and Recommendations

export interface FollowUpQuestion {
    id: string;
    question: string;
    options: {
        value: string;
        label: string;
        emoji?: string;
        severity?: "low" | "medium" | "high" | "emergency";
    }[];
    multiple?: boolean;
}

export interface Medicine {
    name: string;
    dosage: string;
    frequency: string;
    notes?: string;
    ageGroup?: "all" | "adult" | "child" | "infant";
}

export interface HomeRemedy {
    name: string;
    instructions: string;
    emoji?: string;
}

export interface NaturalRemedy {
    name: string;
    benefits: string;
    howToUse: string;
    emoji?: string;
}

export interface DoctorRecommendation {
    specialty: string;
    urgency: "routine" | "soon" | "urgent" | "emergency";
    reason: string;
}

export interface SymptomDetail {
    id: string;
    name: string;
    description: string;
    emoji: string;
    followUpQuestions: FollowUpQuestion[];
    recommendations: {
        medicines: Medicine[];
        homeRemedies: HomeRemedy[];
        naturalRemedies: NaturalRemedy[];
        doctorRecommendations: DoctorRecommendation[];
        warnings: string[];
        generalAdvice: string[];
    };
}

export const symptomDetails: Record<string, SymptomDetail> = {
    fever: {
        id: "fever",
        name: "Fever",
        description: "Fever is an increase in body temperature above the normal range (98.6°F / 37°C). It's usually a sign that your body is fighting an infection.",
        emoji: "🤒",
        followUpQuestions: [
            {
                id: "fever_temperature",
                question: "What is the temperature reading?",
                options: [
                    { value: "low", label: "Low Grade (99-100.4°F / 37.2-38°C)", emoji: "🌡️", severity: "low" },
                    { value: "moderate", label: "Moderate (100.4-102°F / 38-39°C)", emoji: "🌡️", severity: "medium" },
                    { value: "high", label: "High (102-104°F / 39-40°C)", emoji: "🌡️", severity: "high" },
                    { value: "very_high", label: "Very High (Above 104°F / 40°C)", emoji: "🚨", severity: "emergency" }
                ]
            },
            {
                id: "fever_type",
                question: "What type of fever pattern do you notice?",
                options: [
                    { value: "continuous", label: "Continuous (stays high)", emoji: "📈" },
                    { value: "intermittent", label: "Intermittent (comes and goes)", emoji: "📊" },
                    { value: "remittent", label: "Remittent (fluctuates but doesn't return to normal)", emoji: "〰️" },
                    { value: "unknown", label: "Not sure", emoji: "❓" }
                ]
            },
            {
                id: "fever_duration",
                question: "How long have you had the fever?",
                options: [
                    { value: "just_started", label: "Just started (< 6 hours)", emoji: "⏱️", severity: "low" },
                    { value: "today", label: "Since today", emoji: "📅", severity: "low" },
                    { value: "1_2_days", label: "1-2 days", emoji: "📆", severity: "medium" },
                    { value: "3_5_days", label: "3-5 days", emoji: "📆", severity: "high" },
                    { value: "more_than_week", label: "More than a week", emoji: "🗓️", severity: "high" }
                ]
            },
            {
                id: "fever_accompanying",
                question: "Do you have any of these symptoms with fever?",
                options: [
                    { value: "chills", label: "Chills / Shivering", emoji: "🥶" },
                    { value: "sweating", label: "Sweating", emoji: "💦" },
                    { value: "headache", label: "Headache", emoji: "🤕" },
                    { value: "body_aches", label: "Body aches", emoji: "😣" },
                    { value: "fatigue", label: "Fatigue / Weakness", emoji: "😴" },
                    { value: "sore_throat", label: "Sore throat", emoji: "🗣️" },
                    { value: "cough", label: "Cough", emoji: "😷" },
                    { value: "runny_nose", label: "Runny nose", emoji: "🤧" },
                    { value: "rash", label: "Skin rash", emoji: "🔴" },
                    { value: "vomiting", label: "Vomiting", emoji: "🤮" }
                ],
                multiple: true
            }
        ],
        recommendations: {
            medicines: [
                {
                    name: "Paracetamol (Acetaminophen)",
                    dosage: "500-1000mg for adults, 10-15mg/kg for children",
                    frequency: "Every 4-6 hours as needed",
                    notes: "Do not exceed 4g per day for adults. Safe for children when dosed by weight.",
                    ageGroup: "all"
                },
                {
                    name: "Ibuprofen",
                    dosage: "200-400mg for adults, 5-10mg/kg for children",
                    frequency: "Every 6-8 hours with food",
                    notes: "Avoid if you have stomach issues, kidney problems, or are pregnant. Not for infants under 6 months.",
                    ageGroup: "all"
                },
                {
                    name: "Crocin / Dolo 650",
                    dosage: "650mg",
                    frequency: "Every 4-6 hours",
                    notes: "Popular brand in India. Contains Paracetamol.",
                    ageGroup: "adult"
                },
                {
                    name: "Calpol (for children)",
                    dosage: "As per age/weight on package",
                    frequency: "Every 4-6 hours",
                    notes: "Syrup form suitable for children",
                    ageGroup: "child"
                }
            ],
            homeRemedies: [
                {
                    name: "Lukewarm Sponge Bath",
                    instructions: "Gently sponge the body with lukewarm (not cold) water to help reduce temperature. Avoid cold water as it can cause shivering.",
                    emoji: "🛁"
                },
                {
                    name: "Stay Hydrated",
                    instructions: "Drink plenty of fluids - water, ORS, coconut water, clear broths. Aim for 8-10 glasses per day.",
                    emoji: "💧"
                },
                {
                    name: "Rest",
                    instructions: "Get plenty of rest. Your body needs energy to fight the infection.",
                    emoji: "🛌"
                },
                {
                    name: "Light Clothing",
                    instructions: "Wear light, breathable clothing. Don't over-bundle even if feeling chilly.",
                    emoji: "👕"
                },
                {
                    name: "Cool Compress",
                    instructions: "Place a cool, damp cloth on forehead, wrists, and neck to help bring down temperature.",
                    emoji: "🧊"
                }
            ],
            naturalRemedies: [
                {
                    name: "Tulsi (Holy Basil) Tea",
                    benefits: "Has antibacterial and antiviral properties. Helps boost immunity.",
                    howToUse: "Boil 10-15 fresh tulsi leaves in water for 10 minutes. Strain and drink 2-3 times daily.",
                    emoji: "🌿"
                },
                {
                    name: "Ginger-Honey Water",
                    benefits: "Ginger has anti-inflammatory properties. Honey soothes throat and provides energy.",
                    howToUse: "Add 1 inch grated ginger to hot water, steep for 5 minutes, add 1 tsp honey. Drink warm.",
                    emoji: "🫚"
                },
                {
                    name: "Turmeric Milk (Golden Milk)",
                    benefits: "Turmeric has anti-inflammatory and antimicrobial properties.",
                    howToUse: "Add 1/2 tsp turmeric powder to warm milk. Can add honey for taste. Drink before bed.",
                    emoji: "🥛"
                },
                {
                    name: "Coriander Seed Water",
                    benefits: "Traditional remedy that may help reduce fever and boost immunity.",
                    howToUse: "Boil 1 tbsp coriander seeds in 2 cups water until reduced to half. Strain and drink.",
                    emoji: "🌱"
                },
                {
                    name: "Fenugreek Water",
                    benefits: "Contains compounds that may help reduce fever.",
                    howToUse: "Soak 1 tbsp fenugreek seeds overnight. Strain and drink the water in the morning.",
                    emoji: "🫘"
                }
            ],
            doctorRecommendations: [
                {
                    specialty: "General Physician",
                    urgency: "routine",
                    reason: "For low-grade fever lasting more than 2-3 days without improvement"
                },
                {
                    specialty: "General Physician / Pediatrician",
                    urgency: "soon",
                    reason: "If fever is above 102°F (39°C) or doesn't respond to medication"
                },
                {
                    specialty: "Emergency Medicine",
                    urgency: "urgent",
                    reason: "If fever is above 104°F (40°C), especially in children"
                },
                {
                    specialty: "Infectious Disease Specialist",
                    urgency: "soon",
                    reason: "If fever persists for more than a week or is accompanied by unusual symptoms"
                }
            ],
            warnings: [
                "🚨 Seek IMMEDIATE medical care if temperature is above 104°F (40°C)",
                "🚨 For infants under 3 months, ANY fever requires immediate medical attention",
                "⚠️ If fever is accompanied by severe headache, stiff neck, or confusion - go to ER",
                "⚠️ If you have difficulty breathing or chest pain with fever - seek emergency care",
                "⚠️ Don't give aspirin to children or teenagers (risk of Reye's syndrome)",
                "⚠️ If fever returns after being gone for 24+ hours, consult a doctor"
            ],
            generalAdvice: [
                "Monitor temperature every 4-6 hours",
                "Keep a fever diary noting times and temperatures",
                "Eat light, easily digestible foods like khichdi, soup, fruits",
                "Avoid cold drinks and cold foods",
                "Maintain room temperature around 25-26°C",
                "Avoid strenuous activities until fever-free for 24 hours"
            ]
        }
    },
    cough: {
        id: "cough",
        name: "Cough",
        description: "Cough is a reflex action to clear your airways. It can be dry (non-productive) or wet (productive with phlegm/mucus).",
        emoji: "😷",
        followUpQuestions: [
            {
                id: "cough_type",
                question: "What type of cough do you have?",
                options: [
                    { value: "dry", label: "Dry cough (no phlegm)", emoji: "🌵" },
                    { value: "wet", label: "Wet/Productive cough (with phlegm)", emoji: "💧" },
                    { value: "barking", label: "Barking cough (loud, seal-like)", emoji: "🦭", severity: "high" },
                    { value: "whooping", label: "Whooping cough (gasping sound)", emoji: "😤", severity: "emergency" }
                ]
            },
            {
                id: "cough_phlegm_color",
                question: "If you have phlegm, what color is it?",
                options: [
                    { value: "clear", label: "Clear/White", emoji: "⚪", severity: "low" },
                    { value: "yellow", label: "Yellow", emoji: "🟡", severity: "medium" },
                    { value: "green", label: "Green", emoji: "🟢", severity: "medium" },
                    { value: "brown", label: "Brown/Rust", emoji: "🟤", severity: "high" },
                    { value: "blood", label: "Blood-tinged", emoji: "🔴", severity: "emergency" },
                    { value: "no_phlegm", label: "No phlegm (dry cough)", emoji: "❌" }
                ]
            },
            {
                id: "cough_duration",
                question: "How long have you had this cough?",
                options: [
                    { value: "few_days", label: "1-3 days", emoji: "📅", severity: "low" },
                    { value: "week", label: "About a week", emoji: "📆", severity: "low" },
                    { value: "two_weeks", label: "1-2 weeks", emoji: "📆", severity: "medium" },
                    { value: "three_weeks_plus", label: "More than 3 weeks", emoji: "🗓️", severity: "high" }
                ]
            },
            {
                id: "cough_timing",
                question: "When is the cough worse?",
                options: [
                    { value: "morning", label: "Worse in the morning", emoji: "🌅" },
                    { value: "night", label: "Worse at night", emoji: "🌙" },
                    { value: "after_eating", label: "After eating", emoji: "🍽️" },
                    { value: "exercise", label: "During/after exercise", emoji: "🏃" },
                    { value: "constant", label: "Constant throughout the day", emoji: "⏰" }
                ]
            }
        ],
        recommendations: {
            medicines: [
                {
                    name: "Dextromethorphan (for dry cough)",
                    dosage: "10-20mg for adults",
                    frequency: "Every 4-6 hours",
                    notes: "Cough suppressant. Not for children under 4 years.",
                    ageGroup: "adult"
                },
                {
                    name: "Guaifenesin (for wet cough)",
                    dosage: "200-400mg for adults",
                    frequency: "Every 4 hours",
                    notes: "Expectorant that helps thin mucus. Drink plenty of water.",
                    ageGroup: "adult"
                },
                {
                    name: "Benadryl Cough Syrup",
                    dosage: "As per package directions",
                    frequency: "3-4 times daily",
                    notes: "Contains antihistamine. May cause drowsiness.",
                    ageGroup: "all"
                },
                {
                    name: "Honitus / Dabur Honitus",
                    dosage: "2 teaspoons",
                    frequency: "3-4 times daily",
                    notes: "Ayurvedic cough syrup safe for all ages.",
                    ageGroup: "all"
                }
            ],
            homeRemedies: [
                {
                    name: "Honey",
                    instructions: "Take 1-2 teaspoons of raw honey directly or mix with warm water. Not for children under 1 year.",
                    emoji: "🍯"
                },
                {
                    name: "Warm Water with Honey & Lemon",
                    instructions: "Mix 1 tbsp honey + juice of half lemon in warm water. Drink 2-3 times daily.",
                    emoji: "🍋"
                },
                {
                    name: "Steam Inhalation",
                    instructions: "Inhale steam from a bowl of hot water. Add a few drops of eucalyptus oil if available. Do for 5-10 minutes.",
                    emoji: "♨️"
                },
                {
                    name: "Salt Water Gargle",
                    instructions: "Dissolve 1/2 teaspoon salt in warm water. Gargle for 30 seconds, 3-4 times daily.",
                    emoji: "🧂"
                },
                {
                    name: "Elevate Head While Sleeping",
                    instructions: "Use extra pillows to elevate your head. This prevents mucus from pooling in throat.",
                    emoji: "🛏️"
                }
            ],
            naturalRemedies: [
                {
                    name: "Ginger Tea",
                    benefits: "Anti-inflammatory, soothes throat, helps with congestion.",
                    howToUse: "Boil fresh ginger slices in water for 10 minutes. Add honey and drink warm.",
                    emoji: "🫚"
                },
                {
                    name: "Turmeric Milk",
                    benefits: "Natural antibiotic, reduces inflammation in respiratory tract.",
                    howToUse: "Add 1/2 tsp turmeric to warm milk. Drink before bed.",
                    emoji: "🥛"
                },
                {
                    name: "Licorice Root (Mulethi)",
                    benefits: "Soothes throat irritation, natural expectorant.",
                    howToUse: "Suck on a small piece of mulethi or make tea by boiling in water.",
                    emoji: "🌿"
                },
                {
                    name: "Black Pepper & Honey",
                    benefits: "Black pepper has antimicrobial properties, stimulates mucus flow.",
                    howToUse: "Mix 1/4 tsp black pepper powder with 1 tbsp honey. Take 2-3 times daily.",
                    emoji: "🫛"
                },
                {
                    name: "Peppermint Tea",
                    benefits: "Menthol in peppermint helps soothe and open airways.",
                    howToUse: "Steep peppermint leaves in hot water for 5 minutes. Drink warm.",
                    emoji: "🌱"
                }
            ],
            doctorRecommendations: [
                {
                    specialty: "General Physician",
                    urgency: "routine",
                    reason: "If cough persists more than 2 weeks without improvement"
                },
                {
                    specialty: "Pulmonologist",
                    urgency: "soon",
                    reason: "Chronic cough (more than 3 weeks), wheezing, or asthma-like symptoms"
                },
                {
                    specialty: "ENT Specialist",
                    urgency: "soon",
                    reason: "If cough is related to sinus issues or post-nasal drip"
                },
                {
                    specialty: "Emergency Medicine",
                    urgency: "emergency",
                    reason: "If coughing up blood, having severe difficulty breathing"
                }
            ],
            warnings: [
                "🚨 Coughing up blood requires immediate medical attention",
                "🚨 Severe difficulty breathing - go to ER immediately",
                "⚠️ Cough lasting more than 3 weeks needs medical evaluation",
                "⚠️ Barking cough in children (croup) may need urgent care",
                "⚠️ Whooping cough is highly contagious - isolate and consult doctor",
                "⚠️ If you have chest pain with cough, seek medical advice"
            ],
            generalAdvice: [
                "Stay well hydrated - drink 8-10 glasses of water daily",
                "Avoid cold drinks and ice cream",
                "Use a humidifier to keep air moist",
                "Avoid irritants like smoke, dust, and strong perfumes",
                "Cover your mouth when coughing to prevent spread",
                "Get adequate rest to help your body heal"
            ]
        }
    },
    headache: {
        id: "headache",
        name: "Headache",
        description: "Headache is pain in any part of the head. It can range from mild discomfort to severe, debilitating pain.",
        emoji: "🤕",
        followUpQuestions: [
            {
                id: "headache_location",
                question: "Where is the headache located?",
                options: [
                    { value: "forehead", label: "Forehead / Front", emoji: "➡️" },
                    { value: "temples", label: "Temples (sides)", emoji: "↔️" },
                    { value: "back", label: "Back of head", emoji: "⬅️" },
                    { value: "one_side", label: "One side only", emoji: "◀️" },
                    { value: "whole_head", label: "Whole head", emoji: "🔄" },
                    { value: "behind_eyes", label: "Behind eyes", emoji: "👁️" }
                ]
            },
            {
                id: "headache_type",
                question: "How would you describe the pain?",
                options: [
                    { value: "throbbing", label: "Throbbing / Pulsating", emoji: "💓" },
                    { value: "pressing", label: "Pressing / Tightening", emoji: "🗜️" },
                    { value: "sharp", label: "Sharp / Stabbing", emoji: "⚡" },
                    { value: "dull", label: "Dull ache", emoji: "😐" }
                ]
            },
            {
                id: "headache_severity",
                question: "How severe is the headache?",
                options: [
                    { value: "mild", label: "Mild (can continue activities)", emoji: "😐", severity: "low" },
                    { value: "moderate", label: "Moderate (affects activities)", emoji: "😣", severity: "medium" },
                    { value: "severe", label: "Severe (can't do anything)", emoji: "😫", severity: "high" },
                    { value: "worst_ever", label: "Worst headache of my life", emoji: "🚨", severity: "emergency" }
                ]
            },
            {
                id: "headache_accompanying",
                question: "Do you have any of these symptoms?",
                options: [
                    { value: "nausea", label: "Nausea or vomiting", emoji: "🤢" },
                    { value: "light_sensitivity", label: "Sensitivity to light", emoji: "💡" },
                    { value: "sound_sensitivity", label: "Sensitivity to sound", emoji: "🔊" },
                    { value: "vision_changes", label: "Vision changes", emoji: "👁️" },
                    { value: "stiff_neck", label: "Stiff neck", emoji: "😖", severity: "emergency" },
                    { value: "fever", label: "Fever", emoji: "🤒" },
                    { value: "confusion", label: "Confusion", emoji: "😵", severity: "emergency" }
                ],
                multiple: true
            }
        ],
        recommendations: {
            medicines: [
                {
                    name: "Paracetamol",
                    dosage: "500-1000mg for adults",
                    frequency: "Every 4-6 hours as needed",
                    notes: "First-line treatment for mild to moderate headaches",
                    ageGroup: "all"
                },
                {
                    name: "Ibuprofen",
                    dosage: "200-400mg for adults",
                    frequency: "Every 6-8 hours with food",
                    notes: "Good for tension headaches. Avoid on empty stomach.",
                    ageGroup: "adult"
                },
                {
                    name: "Disprin (Aspirin)",
                    dosage: "300-600mg",
                    frequency: "Every 4-6 hours",
                    notes: "Not for children under 16. Not if you have stomach issues.",
                    ageGroup: "adult"
                },
                {
                    name: "Saridon",
                    dosage: "1 tablet",
                    frequency: "Every 4-6 hours, max 3 tablets/day",
                    notes: "Combination pain reliever. Popular in India.",
                    ageGroup: "adult"
                }
            ],
            homeRemedies: [
                {
                    name: "Cold or Warm Compress",
                    instructions: "Apply cold pack to forehead for tension headache, or warm compress to back of neck for muscle tension.",
                    emoji: "🧊"
                },
                {
                    name: "Rest in Dark Room",
                    instructions: "Lie down in a quiet, dark room. Close your eyes and relax for 20-30 minutes.",
                    emoji: "🌑"
                },
                {
                    name: "Caffeine",
                    instructions: "A small amount of caffeine (tea/coffee) can help with some headaches. Don't overdo it.",
                    emoji: "☕"
                },
                {
                    name: "Head Massage",
                    instructions: "Gently massage temples, base of skull, and neck muscles in circular motions.",
                    emoji: "💆"
                },
                {
                    name: "Stay Hydrated",
                    instructions: "Dehydration is a common cause of headaches. Drink water regularly.",
                    emoji: "💧"
                }
            ],
            naturalRemedies: [
                {
                    name: "Peppermint Oil",
                    benefits: "Has a cooling effect that can help relieve tension headaches.",
                    howToUse: "Apply diluted peppermint oil to temples and forehead. Avoid eyes.",
                    emoji: "🌿"
                },
                {
                    name: "Ginger Tea",
                    benefits: "Anti-inflammatory properties that may help with headaches and nausea.",
                    howToUse: "Boil fresh ginger in water for 10 minutes. Drink warm.",
                    emoji: "🫚"
                },
                {
                    name: "Lavender Oil Aromatherapy",
                    benefits: "Calming and may help reduce tension and migraine pain.",
                    howToUse: "Inhale lavender essential oil or add a few drops to a warm bath.",
                    emoji: "💜"
                },
                {
                    name: "Clove",
                    benefits: "Has pain-relieving properties.",
                    howToUse: "Crush 2-3 cloves, put in a clean cloth, and inhale the aroma.",
                    emoji: "🌰"
                },
                {
                    name: "Cinnamon Paste",
                    benefits: "May help with headaches caused by cold weather.",
                    howToUse: "Make paste with cinnamon powder + water. Apply to forehead for 15-20 minutes.",
                    emoji: "🪵"
                }
            ],
            doctorRecommendations: [
                {
                    specialty: "General Physician",
                    urgency: "routine",
                    reason: "Regular headaches that don't respond to OTC medicines"
                },
                {
                    specialty: "Neurologist",
                    urgency: "soon",
                    reason: "Frequent migraines, severe recurring headaches, or unusual headache patterns"
                },
                {
                    specialty: "Ophthalmologist",
                    urgency: "routine",
                    reason: "Headaches accompanied by vision changes or eye strain"
                },
                {
                    specialty: "Emergency Medicine",
                    urgency: "emergency",
                    reason: "Sudden severe headache ('thunderclap'), headache with stiff neck, fever, confusion"
                }
            ],
            warnings: [
                "🚨 'Worst headache of your life' requires IMMEDIATE emergency care",
                "🚨 Headache with stiff neck, fever, confusion - could be meningitis - ER NOW",
                "🚨 Sudden severe headache could indicate brain hemorrhage",
                "⚠️ Headache after head injury needs medical evaluation",
                "⚠️ New headache pattern in people over 50 should be checked",
                "⚠️ Headache with vision changes, numbness, or weakness - seek urgent care"
            ],
            generalAdvice: [
                "Maintain a headache diary to identify triggers",
                "Ensure adequate sleep (7-8 hours)",
                "Take regular breaks from screens",
                "Stay hydrated throughout the day",
                "Practice stress management techniques",
                "Avoid skipping meals"
            ]
        }
    }
};

// Helper function to get symptom detail
export const getSymptomDetail = (symptomName: string): SymptomDetail | null => {
    const normalizedName = symptomName.toLowerCase().replace(/\s+/g, '_');
    return symptomDetails[normalizedName] || null;
};

// Get recommendations based on follow-up answers
export interface SymptomAssessment {
    symptomId: string;
    answers: Record<string, string | string[]>;
}

export const getDetailedRecommendations = (assessment: SymptomAssessment) => {
    const symptomDetail = symptomDetails[assessment.symptomId];
    if (!symptomDetail) return null;

    // Determine urgency based on answers
    let urgencyLevel: "low" | "medium" | "high" | "emergency" = "low";

    for (const [questionId, answer] of Object.entries(assessment.answers)) {
        const question = symptomDetail.followUpQuestions.find(q => q.id === questionId);
        if (question) {
            const answers = Array.isArray(answer) ? answer : [answer];
            for (const ans of answers) {
                const option = question.options.find(o => o.value === ans);
                if (option?.severity) {
                    if (option.severity === "emergency") {
                        urgencyLevel = "emergency";
                    } else if (option.severity === "high" && urgencyLevel !== "emergency") {
                        urgencyLevel = "high";
                    } else if (option.severity === "medium" && urgencyLevel === "low") {
                        urgencyLevel = "medium";
                    }
                }
            }
        }
    }

    return {
        symptomDetail,
        urgencyLevel,
        recommendations: symptomDetail.recommendations
    };
};
