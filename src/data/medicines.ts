// IMPORTANT DISCLAIMER:
// This information is for educational purposes only and should NOT replace professional medical advice.
// Always consult a qualified healthcare provider before taking any medication.
// Never self-medicate for serious conditions.
// This data follows WHO guidelines and general medical consensus.

export interface Medicine {
    id: string;
    name: string;
    genericName: string;
    brandExamples: string[];
    category: string;
    type: "OTC" | "Prescription" | "Ayurvedic" | "Homeopathic";
    usedFor: string[];
    howItWorks: string;
    dosageGuidelines: {
        adults: string;
        children?: string;
        elderly?: string;
        frequency: string;
        maxDuration: string;
    };
    sideEffects: {
        common: string[];
        rare: string[];
        serious: string[];
    };
    warnings: string[];
    contraindications: string[];
    interactions: string[];
    safetyClass: "Generally Safe" | "Use Caution" | "Consult Doctor" | "Prescription Only";
    pregnancyCategory: "A" | "B" | "C" | "D" | "X" | "Not Classified";
    icon: string;
}

export interface HomeCareRemedy {
    id: string;
    name: string;
    description: string;
    forSymptoms: string[];
    instructions: string[];
    ingredients?: string[];
    benefits: string[];
    precautions: string[];
    effectiveness: "Highly Effective" | "Moderately Effective" | "Supportive Care" | "Preventive";
    icon: string;
}

export interface NaturalRemedy {
    id: string;
    name: string;
    type: "Herb" | "Spice" | "Essential Oil" | "Food" | "Technique";
    description: string;
    forSymptoms: string[];
    howToUse: string[];
    scientificBasis: string;
    precautions: string[];
    icon: string;
}

// LEGAL AND ETHICAL SAFETY LAYER
export const safetyDisclaimer = {
    title: "⚠️ Important Medical Disclaimer",
    points: [
        "This information is for general educational purposes only.",
        "It is NOT a substitute for professional medical advice, diagnosis, or treatment.",
        "Always seek the advice of your physician or qualified healthcare provider.",
        "Never disregard professional medical advice or delay seeking it.",
        "If you think you may have a medical emergency, call your doctor or emergency services immediately.",
        "Reliance on any information provided here is solely at your own risk."
    ],
    emergencyNote: "🚨 For life-threatening emergencies, call emergency services (108/112) immediately."
};

export const medicineGuidelines = {
    beforeTaking: [
        "Read the medicine label carefully",
        "Check expiry date before use",
        "Verify if you have any allergies to the ingredients",
        "Inform your doctor about all medications you're currently taking",
        "Do not exceed the recommended dosage",
        "Store medicines as per instructions on the label"
    ],
    redFlags: [
        "Severe allergic reactions (difficulty breathing, swelling, rash)",
        "Symptoms worsen after taking medication",
        "New symptoms appear after starting medication",
        "Prescribed medication not showing improvement after recommended duration",
        "Any unusual bleeding or bruising"
    ]
};

// Over-the-Counter Medicines for Common Symptoms
export const medicines: Medicine[] = [
    // PAIN RELIEVERS & FEVER REDUCERS
    {
        id: "paracetamol",
        name: "Paracetamol",
        genericName: "Acetaminophen/Paracetamol",
        brandExamples: ["Crocin", "Dolo", "Calpol", "Tylenol"],
        category: "Analgesic & Antipyretic",
        type: "OTC",
        usedFor: ["Headache", "Fever", "Body Aches", "Mild Pain", "Toothache"],
        howItWorks: "Paracetamol works by blocking the production of prostaglandins in the brain, which are chemicals that cause pain and fever. It raises the body's pain threshold and helps reduce fever by acting on the heat-regulating center in the brain.",
        dosageGuidelines: {
            adults: "500mg to 1000mg per dose",
            children: "10-15mg per kg body weight per dose (consult pediatrician)",
            elderly: "Lower doses may be needed. Consult doctor.",
            frequency: "Every 4-6 hours as needed",
            maxDuration: "Do not exceed 4g (4000mg) in 24 hours. Do not use for more than 10 days without consulting a doctor."
        },
        sideEffects: {
            common: ["Generally well tolerated when used as directed"],
            rare: ["Skin rash", "Nausea", "Allergic reactions"],
            serious: ["Liver damage (with overdose)", "Severe skin reactions (very rare)"]
        },
        warnings: [
            "Do not take more than the recommended dose",
            "Avoid alcohol while taking this medicine",
            "Check other medications for paracetamol content to avoid overdose",
            "Liver damage can occur with excessive use"
        ],
        contraindications: [
            "Severe liver disease",
            "Known allergy to paracetamol",
            "Chronic alcohol use (consult doctor first)"
        ],
        interactions: [
            "Warfarin (blood thinner) - may enhance effect",
            "Alcohol - increases liver damage risk",
            "Other paracetamol-containing products"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "B",
        icon: "💊"
    },
    {
        id: "ibuprofen",
        name: "Ibuprofen",
        genericName: "Ibuprofen",
        brandExamples: ["Brufen", "Advil", "Motrin", "Ibugesic"],
        category: "NSAID (Non-Steroidal Anti-Inflammatory Drug)",
        type: "OTC",
        usedFor: ["Headache", "Fever", "Body Aches", "Joint Pain", "Menstrual Cramps", "Inflammation", "Muscle Pain"],
        howItWorks: "Ibuprofen is a non-steroidal anti-inflammatory drug (NSAID) that works by blocking enzymes (COX-1 and COX-2) that produce prostaglandins. Prostaglandins cause inflammation, pain, and fever. By reducing prostaglandin production, ibuprofen reduces these symptoms.",
        dosageGuidelines: {
            adults: "200mg to 400mg per dose",
            children: "5-10mg per kg body weight per dose (only for children over 6 months, consult pediatrician)",
            elderly: "Start with lower doses. Consult doctor.",
            frequency: "Every 4-6 hours as needed",
            maxDuration: "Do not exceed 1200mg in 24 hours without medical supervision. Short-term use (up to 10 days) recommended."
        },
        sideEffects: {
            common: ["Stomach upset", "Nausea", "Dizziness", "Headache"],
            rare: ["Stomach ulcers", "Kidney problems", "High blood pressure"],
            serious: ["Gastrointestinal bleeding", "Heart attack or stroke (long-term high-dose use)", "Severe allergic reactions"]
        },
        warnings: [
            "Take with food to reduce stomach upset",
            "Not recommended for people with stomach ulcers",
            "Use caution in heart, kidney, or liver disease",
            "Avoid during late pregnancy (third trimester)",
            "May increase blood pressure"
        ],
        contraindications: [
            "Active stomach ulcer or bleeding",
            "Severe heart, kidney, or liver failure",
            "Third trimester of pregnancy",
            "History of allergic reactions to NSAIDs or aspirin",
            "Recent heart bypass surgery"
        ],
        interactions: [
            "Blood thinners (warfarin, aspirin) - increased bleeding risk",
            "ACE inhibitors and diuretics - reduced effectiveness",
            "Lithium - increased lithium levels",
            "Methotrexate - increased toxicity"
        ],
        safetyClass: "Use Caution",
        pregnancyCategory: "C",
        icon: "💊"
    },
    {
        id: "aspirin",
        name: "Aspirin",
        genericName: "Acetylsalicylic Acid",
        brandExamples: ["Disprin", "Ecosprin", "Aspirin"],
        category: "NSAID & Antiplatelet",
        type: "OTC",
        usedFor: ["Headache", "Fever", "Mild Pain", "Heart Attack Prevention (prescription)", "Inflammation"],
        howItWorks: "Aspirin is a salicylate that works by irreversibly inhibiting cyclooxygenase enzymes, reducing the production of prostaglandins and thromboxane. This reduces pain, fever, inflammation, and also prevents blood clots by affecting platelet function.",
        dosageGuidelines: {
            adults: "300-600mg for pain relief every 4-6 hours",
            children: "NOT recommended for children under 16 due to risk of Reye's syndrome",
            elderly: "Use with caution. Consult doctor.",
            frequency: "Every 4-6 hours as needed for pain",
            maxDuration: "Do not exceed 4g in 24 hours. Short-term use recommended."
        },
        sideEffects: {
            common: ["Stomach irritation", "Heartburn", "Nausea"],
            rare: ["Ringing in ears (tinnitus)", "Bruising", "Allergic reactions"],
            serious: ["Stomach ulcers and bleeding", "Bleeding in brain (rare)", "Reye's syndrome in children"]
        },
        warnings: [
            "NOT for children under 16 years",
            "Take with food to reduce stomach upset",
            "Stop aspirin before surgery (consult doctor)",
            "Risk of bleeding disorders",
            "Avoid in dengue fever (can cause bleeding)"
        ],
        contraindications: [
            "Children under 16 years",
            "Active bleeding disorders",
            "Stomach ulcers",
            "Aspirin-sensitive asthma",
            "Third trimester of pregnancy",
            "Dengue fever or other viral hemorrhagic fevers"
        ],
        interactions: [
            "Blood thinners - increased bleeding risk",
            "Ibuprofen - may reduce aspirin's cardioprotective effect",
            "Methotrexate - increased toxicity",
            "Corticosteroids - increased ulcer risk"
        ],
        safetyClass: "Use Caution",
        pregnancyCategory: "D",
        icon: "💊"
    },

    // COLD & FLU MEDICATIONS
    {
        id: "cetirizine",
        name: "Cetirizine",
        genericName: "Cetirizine Hydrochloride",
        brandExamples: ["Cetzine", "Zyrtec", "Alerid"],
        category: "Antihistamine",
        type: "OTC",
        usedFor: ["Allergies", "Runny Nose", "Sneezing", "Itchy Eyes", "Hives", "Skin Rash"],
        howItWorks: "Cetirizine is a second-generation antihistamine that works by blocking histamine H1 receptors. Histamine is released during allergic reactions and causes symptoms like itching, sneezing, and runny nose. By blocking histamine, cetirizine reduces these allergic symptoms.",
        dosageGuidelines: {
            adults: "10mg once daily",
            children: "2.5-5mg for ages 2-6, 5-10mg for ages 6-12 (consult pediatrician)",
            elderly: "May need lower doses if kidney function is reduced",
            frequency: "Once daily, preferably at the same time",
            maxDuration: "Can be used for extended periods for chronic allergies. Consult doctor for long-term use."
        },
        sideEffects: {
            common: ["Drowsiness (mild)", "Dry mouth", "Fatigue", "Headache"],
            rare: ["Dizziness", "Nausea", "Pharyngitis"],
            serious: ["Severe allergic reactions (very rare)"]
        },
        warnings: [
            "May cause mild drowsiness - be cautious when driving",
            "Avoid alcohol as it may increase drowsiness",
            "Adjust dose in kidney disease"
        ],
        contraindications: [
            "Known allergy to cetirizine or hydroxyzine",
            "Severe kidney disease (without dose adjustment)"
        ],
        interactions: [
            "Alcohol - increased drowsiness",
            "Sedatives - enhanced sedation",
            "Ritonavir - may increase cetirizine levels"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "B",
        icon: "🤧"
    },
    {
        id: "loratadine",
        name: "Loratadine",
        genericName: "Loratadine",
        brandExamples: ["Claritin", "Alavert", "Lorfast"],
        category: "Antihistamine",
        type: "OTC",
        usedFor: ["Allergies", "Runny Nose", "Sneezing", "Itchy Eyes", "Hives"],
        howItWorks: "Loratadine is a second-generation antihistamine that selectively blocks peripheral histamine H1 receptors. It has minimal penetration into the brain, making it non-drowsy for most people. It provides relief from allergic symptoms by preventing histamine from binding to its receptors.",
        dosageGuidelines: {
            adults: "10mg once daily",
            children: "5mg for ages 2-6, 10mg for ages 6 and above",
            elderly: "Same as adult dose, adjust if liver or kidney issues",
            frequency: "Once daily",
            maxDuration: "Can be used for extended periods. Consult doctor for long-term use."
        },
        sideEffects: {
            common: ["Headache", "Fatigue", "Dry mouth"],
            rare: ["Drowsiness (uncommon)", "Nervousness", "Stomach upset"],
            serious: ["Severe allergic reactions (very rare)"]
        },
        warnings: [
            "Generally non-drowsy but some people may experience sedation",
            "Adjust dose in liver disease"
        ],
        contraindications: [
            "Known allergy to loratadine",
            "Severe liver disease (without doctor supervision)"
        ],
        interactions: [
            "Ketoconazole, erythromycin - may increase loratadine levels",
            "Cimetidine - may increase loratadine levels"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "B",
        icon: "🤧"
    },
    {
        id: "dextromethorphan",
        name: "Dextromethorphan",
        genericName: "Dextromethorphan Hydrobromide",
        brandExamples: ["Benylin DM", "Robitussin DM", "Honitus"],
        category: "Cough Suppressant",
        type: "OTC",
        usedFor: ["Dry Cough", "Persistent Cough", "Cold-related Cough"],
        howItWorks: "Dextromethorphan works on the cough center in the brain (medulla) to suppress the cough reflex. It raises the threshold for coughing, making coughs less frequent. It does NOT treat the underlying cause of cough but provides symptomatic relief.",
        dosageGuidelines: {
            adults: "10-20mg every 4 hours or 30mg every 6-8 hours",
            children: "Not recommended under 4 years. 5-10mg for ages 4-12 (consult pediatrician)",
            frequency: "Every 4-8 hours depending on formulation",
            maxDuration: "Do not use for more than 7 days. If cough persists, consult a doctor."
        },
        sideEffects: {
            common: ["Drowsiness", "Dizziness", "Nausea"],
            rare: ["Confusion", "Nervousness", "Stomach upset"],
            serious: ["Serotonin syndrome (when combined with certain medications)", "Abuse potential at high doses"]
        },
        warnings: [
            "Do not use for productive (wet) cough",
            "Not for children under 4 years",
            "Avoid if you have asthma or chronic bronchitis",
            "Can be habit-forming at high doses"
        ],
        contraindications: [
            "Taking MAO inhibitors (within 14 days)",
            "Chronic cough due to smoking",
            "Productive cough (with mucus)",
            "Asthma (may worsen condition)"
        ],
        interactions: [
            "MAO inhibitors - dangerous interaction",
            "SSRIs and SNRIs - risk of serotonin syndrome",
            "Alcohol - increased sedation"
        ],
        safetyClass: "Use Caution",
        pregnancyCategory: "C",
        icon: "🗣️"
    },
    {
        id: "guaifenesin",
        name: "Guaifenesin",
        genericName: "Guaifenesin",
        brandExamples: ["Mucinex", "Robitussin", "Cofarest"],
        category: "Expectorant",
        type: "OTC",
        usedFor: ["Productive Cough", "Chest Congestion", "Thick Mucus"],
        howItWorks: "Guaifenesin is an expectorant that works by thinning and loosening mucus in the airways. It increases the volume and reduces the viscosity of respiratory tract secretions, making it easier to cough up phlegm and clear the airways.",
        dosageGuidelines: {
            adults: "200-400mg every 4 hours",
            children: "50-100mg for ages 2-6, 100-200mg for ages 6-12 (consult pediatrician)",
            frequency: "Every 4 hours as needed",
            maxDuration: "Do not use for more than 7 days without consulting a doctor."
        },
        sideEffects: {
            common: ["Nausea", "Vomiting", "Stomach upset", "Headache"],
            rare: ["Dizziness", "Drowsiness", "Skin rash"],
            serious: ["Severe allergic reactions (rare)"]
        },
        warnings: [
            "Drink plenty of fluids while taking this medicine",
            "Do not use for chronic cough due to smoking or asthma",
            "If cough persists more than 7 days, consult doctor"
        ],
        contraindications: [
            "Known allergy to guaifenesin",
            "Chronic cough from smoking"
        ],
        interactions: [
            "Generally has few significant drug interactions",
            "May affect certain lab tests"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "C",
        icon: "💨"
    },

    // DIGESTIVE MEDICATIONS
    {
        id: "omeprazole",
        name: "Omeprazole",
        genericName: "Omeprazole",
        brandExamples: ["Omez", "Prilosec", "Omecip"],
        category: "Proton Pump Inhibitor (PPI)",
        type: "OTC",
        usedFor: ["Acid Reflux", "Heartburn", "Gastritis", "Indigestion", "Stomach Ulcers"],
        howItWorks: "Omeprazole is a proton pump inhibitor that works by irreversibly blocking the hydrogen-potassium ATPase enzyme system (proton pump) in the stomach lining. This reduces the production of stomach acid, providing relief from acid-related conditions.",
        dosageGuidelines: {
            adults: "20mg once daily before breakfast",
            children: "Weight-based dosing (consult pediatrician)",
            elderly: "Same as adult dose",
            frequency: "Once daily, 30 minutes before first meal",
            maxDuration: "OTC use: up to 14 days. For longer use, consult a doctor."
        },
        sideEffects: {
            common: ["Headache", "Nausea", "Diarrhea", "Stomach pain", "Gas"],
            rare: ["Vitamin B12 deficiency (long-term)", "Magnesium deficiency (long-term)", "Bone fractures (long-term high dose)"],
            serious: ["Clostridium difficile infection (long-term)", "Kidney problems (rare)"]
        },
        warnings: [
            "Long-term use may cause vitamin and mineral deficiencies",
            "Take 30 minutes before meals for best effect",
            "May mask symptoms of stomach cancer - consult doctor if symptoms persist",
            "Long-term use may increase fracture risk"
        ],
        contraindications: [
            "Known allergy to omeprazole or other PPIs",
            "Taking rilpivirine (HIV medication)"
        ],
        interactions: [
            "Clopidogrel - may reduce effectiveness",
            "Methotrexate - increased levels",
            "Warfarin - may enhance effect",
            "Atazanavir, nelfinavir - reduced absorption"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "C",
        icon: "🔥"
    },
    {
        id: "antacid",
        name: "Antacid (Aluminum/Magnesium Hydroxide)",
        genericName: "Aluminum Hydroxide + Magnesium Hydroxide",
        brandExamples: ["Gelusil", "Maalox", "Digene"],
        category: "Antacid",
        type: "OTC",
        usedFor: ["Heartburn", "Acid Indigestion", "Sour Stomach", "Stomach Upset"],
        howItWorks: "Antacids work by directly neutralizing stomach acid through a chemical reaction. Aluminum hydroxide and magnesium hydroxide are weak bases that react with hydrochloric acid in the stomach, raising the pH and providing quick relief from acidity symptoms.",
        dosageGuidelines: {
            adults: "10-20ml or 1-2 tablets after meals and at bedtime",
            children: "Consult pediatrician for appropriate dose",
            frequency: "1-3 hours after meals or as needed",
            maxDuration: "Do not use for more than 2 weeks without consulting a doctor."
        },
        sideEffects: {
            common: ["Diarrhea (magnesium)", "Constipation (aluminum)", "Nausea"],
            rare: ["Electrolyte imbalances (long-term)", "Osteomalacia (long-term aluminum)"],
            serious: ["Aluminum toxicity in kidney disease", "Severe constipation"]
        },
        warnings: [
            "Separate from other medications by 2 hours",
            "May affect absorption of other drugs",
            "Not for long-term use without medical advice",
            "Aluminum antacids should be avoided in kidney disease"
        ],
        contraindications: [
            "Severe kidney disease (for aluminum-containing)",
            "Known allergy to components"
        ],
        interactions: [
            "Tetracycline antibiotics - reduced absorption",
            "Quinolone antibiotics - reduced absorption",
            "Iron supplements - reduced absorption",
            "Digoxin - altered absorption"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "B",
        icon: "🧪"
    },
    {
        id: "ondansetron",
        name: "Ondansetron",
        genericName: "Ondansetron",
        brandExamples: ["Ondem", "Zofran", "Emeset"],
        category: "Antiemetic",
        type: "Prescription",
        usedFor: ["Nausea", "Vomiting", "Motion Sickness (doctor prescribed)"],
        howItWorks: "Ondansetron works by blocking serotonin (5-HT3) receptors in the brain and gut. Serotonin is a chemical that triggers nausea and vomiting. By blocking these receptors, ondansetron prevents the signals that cause nausea and vomiting.",
        dosageGuidelines: {
            adults: "4-8mg every 8 hours as needed",
            children: "4mg for ages 4-12 (prescription required, consult doctor)",
            frequency: "Every 8 hours as needed",
            maxDuration: "As prescribed by doctor. Usually short-term use."
        },
        sideEffects: {
            common: ["Headache", "Constipation", "Dizziness", "Fatigue"],
            rare: ["Blurred vision", "Elevated liver enzymes"],
            serious: ["QT prolongation (heart rhythm issue)", "Serotonin syndrome"]
        },
        warnings: [
            "Prescription medication - use only as directed by doctor",
            "May cause heart rhythm changes in some people",
            "Inform doctor of heart conditions before use"
        ],
        contraindications: [
            "Known allergy to ondansetron",
            "Severe liver impairment (dose adjustment needed)",
            "Long QT syndrome"
        ],
        interactions: [
            "Apomorphine - severe drop in blood pressure",
            "QT-prolonging drugs - increased risk",
            "Tramadol - reduced pain relief"
        ],
        safetyClass: "Prescription Only",
        pregnancyCategory: "B",
        icon: "🤢"
    },
    {
        id: "loperamide",
        name: "Loperamide",
        genericName: "Loperamide Hydrochloride",
        brandExamples: ["Imodium", "Eldoper", "Lopraz"],
        category: "Anti-diarrheal",
        type: "OTC",
        usedFor: ["Diarrhea", "Traveler's Diarrhea"],
        howItWorks: "Loperamide works by slowing down the movement of the intestines. It binds to opioid receptors in the intestinal wall, reducing the muscle contractions that move food through the intestines. This allows more time for water and electrolytes to be absorbed, making stools firmer.",
        dosageGuidelines: {
            adults: "4mg initially, then 2mg after each loose stool",
            children: "Not recommended under 6 years without prescription. Consult pediatrician.",
            frequency: "After each loose stool",
            maxDuration: "Do not exceed 8mg in 24 hours. Do not use for more than 2 days without consulting a doctor."
        },
        sideEffects: {
            common: ["Constipation", "Dizziness", "Nausea", "Stomach cramps"],
            rare: ["Dry mouth", "Fatigue", "Skin rash"],
            serious: ["Severe constipation", "Paralytic ileus (rare)", "Heart rhythm problems (overdose)"]
        },
        warnings: [
            "Do not use if you have bloody diarrhea or fever",
            "Not for diarrhea caused by antibiotics",
            "Stop use if constipation or abdominal distension occurs",
            "Do not exceed recommended dose"
        ],
        contraindications: [
            "Bloody or mucoid diarrhea",
            "High fever with diarrhea",
            "Acute dysentery",
            "Bacterial enterocolitis (like C. difficile)"
        ],
        interactions: [
            "P-glycoprotein inhibitors - may increase loperamide levels",
            "Ritonavir - increased loperamide levels"
        ],
        safetyClass: "Use Caution",
        pregnancyCategory: "C",
        icon: "💧"
    },
    {
        id: "ors",
        name: "Oral Rehydration Salts (ORS)",
        genericName: "Sodium Chloride, Potassium Chloride, Sodium Citrate, Glucose",
        brandExamples: ["Electral", "Pedialyte", "ORS WHO Formula"],
        category: "Rehydration Solution",
        type: "OTC",
        usedFor: ["Diarrhea", "Dehydration", "Vomiting", "Fever-related Fluid Loss"],
        howItWorks: "ORS works by utilizing sodium-glucose co-transport in the intestines. Glucose enhances the absorption of sodium and water through the intestinal wall. The balanced electrolyte composition replaces lost fluids and minerals, preventing and treating dehydration.",
        dosageGuidelines: {
            adults: "Dissolve one packet in 1 liter of clean water. Drink as needed.",
            children: "Small, frequent sips. Give as much as the child will drink.",
            frequency: "After each loose stool or as needed for hydration",
            maxDuration: "Continue until diarrhea stops and hydration is maintained."
        },
        sideEffects: {
            common: ["None when prepared and used correctly"],
            rare: ["Nausea if drunk too quickly", "Hypernatremia if mixed incorrectly"],
            serious: ["Electrolyte imbalance if not prepared correctly"]
        },
        warnings: [
            "Dissolve in the correct amount of water as directed",
            "Do not add sugar, salt, or other ingredients",
            "Use clean, safe drinking water",
            "Discard solution after 24 hours"
        ],
        contraindications: [
            "Severe dehydration (requires IV fluids)",
            "Intestinal obstruction"
        ],
        interactions: [
            "No significant drug interactions"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "A",
        icon: "🥤"
    },

    // SKIN RELATED
    {
        id: "hydrocortisone",
        name: "Hydrocortisone Cream",
        genericName: "Hydrocortisone",
        brandExamples: ["Dermikem HC", "Cortisone-10", "Panderm"],
        category: "Topical Corticosteroid",
        type: "OTC",
        usedFor: ["Skin Rash", "Itching", "Eczema", "Insect Bites", "Minor Skin Irritation"],
        howItWorks: "Hydrocortisone is a mild corticosteroid that works by reducing inflammation, redness, itching, and swelling. It suppresses the release of inflammatory chemicals in the skin and constricts blood vessels, providing relief from various skin conditions.",
        dosageGuidelines: {
            adults: "Apply a thin layer to affected area 1-2 times daily",
            children: "Use lowest strength, apply thinly. Not for infants without doctor advice.",
            frequency: "1-2 times daily",
            maxDuration: "Do not use for more than 7 days on the face or 4 weeks on the body without medical advice."
        },
        sideEffects: {
            common: ["Burning sensation", "Itching at application site", "Dryness"],
            rare: ["Thinning of skin", "Stretch marks (with prolonged use)", "Color changes"],
            serious: ["Skin atrophy (long-term use)", "Adrenal suppression (extensive use)"]
        },
        warnings: [
            "Not for use on face for extended periods",
            "Do not use on broken or infected skin",
            "Do not cover with bandages unless directed",
            "Prolonged use may thin the skin"
        ],
        contraindications: [
            "Bacterial, viral, or fungal skin infections (untreated)",
            "Rosacea",
            "Acne",
            "Perioral dermatitis"
        ],
        interactions: [
            "Minimal when used topically as directed"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "C",
        icon: "🧴"
    },

    // THROAT RELATED
    {
        id: "throat-lozenges",
        name: "Throat Lozenges",
        genericName: "Menthol/Eucalyptus/Benzocaine combinations",
        brandExamples: ["Strepsils", "Halls", "Vicks"],
        category: "Throat Soothing",
        type: "OTC",
        usedFor: ["Sore Throat", "Throat Irritation", "Cough"],
        howItWorks: "Throat lozenges work through multiple mechanisms depending on their active ingredients. Menthol provides a cooling sensation and mild numbing effect. Benzocaine is a local anesthetic that numbs the throat. Antiseptic ingredients help fight bacteria. The sucking action also increases saliva production, which soothes the throat.",
        dosageGuidelines: {
            adults: "1 lozenge every 2-3 hours as needed",
            children: "Not for children under 5 years due to choking risk. Age-appropriate formulations available.",
            frequency: "Every 2-3 hours, not to exceed 8-10 per day",
            maxDuration: "Do not use for more than 7 days without consulting a doctor."
        },
        sideEffects: {
            common: ["Temporary numbness", "Mild stomach upset if swallowed"],
            rare: ["Allergic reactions", "Mouth irritation"],
            serious: ["Methemoglobinemia (rare, with benzocaine overdose)"]
        },
        warnings: [
            "Do not give to children under 5 (choking hazard)",
            "Do not use benzocaine lozenges in children under 2",
            "If sore throat persists more than 2 days, consult doctor"
        ],
        contraindications: [
            "Known allergy to ingredients",
            "Children under 5 years"
        ],
        interactions: [
            "Minimal drug interactions"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "C",
        icon: "🍬"
    },

    // EYE RELATED
    {
        id: "lubricant-eye-drops",
        name: "Lubricant Eye Drops",
        genericName: "Carboxymethylcellulose/Polyethylene Glycol",
        brandExamples: ["Refresh Tears", "Systane", "Tears Plus"],
        category: "Ophthalmic Lubricant",
        type: "OTC",
        usedFor: ["Dry Eyes", "Eye Irritation", "Eye Strain"],
        howItWorks: "Lubricant eye drops work by supplementing the natural tear film of the eye. They contain polymers that mimic the mucus layer of tears, providing moisture and lubrication to the eye surface. This reduces friction during blinking and protects the cornea from drying out.",
        dosageGuidelines: {
            adults: "1-2 drops in affected eye(s) as needed",
            children: "Same as adults, but consult doctor for infants",
            frequency: "As needed, typically 4-6 times daily or more",
            maxDuration: "Can be used long-term. If symptoms persist or worsen, consult an eye doctor."
        },
        sideEffects: {
            common: ["Temporary blurring of vision", "Mild stinging"],
            rare: ["Eye irritation", "Allergic reactions"],
            serious: ["Eye infection if contaminated (rare)"]
        },
        warnings: [
            "Do not touch dropper tip to any surface",
            "Do not use if solution changes color or becomes cloudy",
            "Wait 5-10 minutes between different eye medications",
            "Remove contact lenses before using (unless product is designed for contacts)"
        ],
        contraindications: [
            "Known allergy to components",
            "Eye infection (consult doctor first)"
        ],
        interactions: [
            "May affect absorption of other eye medications - use with 5-10 minute gap"
        ],
        safetyClass: "Generally Safe",
        pregnancyCategory: "A",
        icon: "👁️"
    }
];

// Home Care Remedies
export const homeCareRemedies: HomeCareRemedy[] = [
    {
        id: "rest-recovery",
        name: "Rest and Recovery",
        description: "Adequate rest allows the body's immune system to fight infections effectively and promotes healing.",
        forSymptoms: ["Fever", "Fatigue", "Body Aches", "Cold", "Flu"],
        instructions: [
            "Get 7-9 hours of sleep per night",
            "Take short naps during the day if needed",
            "Avoid strenuous activities",
            "Listen to your body and rest when tired",
            "Create a comfortable resting environment"
        ],
        benefits: [
            "Boosts immune system function",
            "Reduces inflammation",
            "Promotes tissue repair",
            "Conserves energy for healing"
        ],
        precautions: [
            "Seek medical help if extreme fatigue persists for weeks",
            "Don't ignore symptoms that worsen despite rest"
        ],
        effectiveness: "Highly Effective",
        icon: "🛌"
    },
    {
        id: "hydration",
        name: "Stay Hydrated",
        description: "Proper hydration helps maintain body functions and is essential during illness, especially with fever or diarrhea.",
        forSymptoms: ["Fever", "Diarrhea", "Vomiting", "Headache", "Fatigue", "Dry Mouth"],
        instructions: [
            "Drink at least 8-10 glasses of water daily",
            "Increase intake during fever or sweating",
            "Drink small sips frequently if nauseous",
            "Include warm fluids like soups and herbal teas",
            "Monitor urine color (pale yellow is ideal)"
        ],
        ingredients: ["Water", "ORS solution", "Clear broths", "Herbal teas", "Coconut water"],
        benefits: [
            "Replaces lost fluids",
            "Maintains electrolyte balance",
            "Helps regulate body temperature",
            "Supports kidney function",
            "Thins mucus secretions"
        ],
        precautions: [
            "Avoid sugary drinks as they can worsen diarrhea",
            "Limit caffeine as it can be dehydrating",
            "Seek help if unable to keep fluids down"
        ],
        effectiveness: "Highly Effective",
        icon: "💧"
    },
    {
        id: "warm-compress",
        name: "Warm Compress",
        description: "Applying warmth to affected areas increases blood flow, relaxes muscles, and reduces pain.",
        forSymptoms: ["Headache", "Muscle Pain", "Joint Pain", "Sinus Congestion", "Menstrual Cramps"],
        instructions: [
            "Soak a clean cloth in warm (not hot) water",
            "Wring out excess water",
            "Apply to affected area for 15-20 minutes",
            "Repeat 3-4 times daily as needed",
            "Use a hot water bottle wrapped in cloth as alternative"
        ],
        benefits: [
            "Increases blood circulation",
            "Relaxes tense muscles",
            "Reduces pain signals",
            "Opens sinus passages",
            "Provides comfort and relaxation"
        ],
        precautions: [
            "Do not use on open wounds or burns",
            "Test temperature before applying",
            "Do not apply heat to areas with poor circulation",
            "Avoid on swollen joints (use cold instead)"
        ],
        effectiveness: "Moderately Effective",
        icon: "🌡️"
    },
    {
        id: "cold-compress",
        name: "Cold Compress",
        description: "Cold therapy reduces inflammation, swelling, and numbs pain by constricting blood vessels.",
        forSymptoms: ["Swelling", "Sprains", "Bruises", "Headache", "Fever"],
        instructions: [
            "Wrap ice or frozen peas in a thin towel",
            "Apply to affected area for 15-20 minutes",
            "Remove for at least 40 minutes before reapplying",
            "Repeat several times daily",
            "Never apply ice directly to skin"
        ],
        benefits: [
            "Reduces swelling and inflammation",
            "Numbs nerve endings (pain relief)",
            "Slows blood flow to reduce bruising",
            "Helps with acute injuries"
        ],
        precautions: [
            "Never apply ice directly to skin (can cause frostbite)",
            "Do not use on stiff muscles or joints",
            "Avoid with circulatory problems",
            "Do not use for more than 20 minutes at a time"
        ],
        effectiveness: "Highly Effective",
        icon: "❄️"
    },
    {
        id: "steam-inhalation",
        name: "Steam Inhalation",
        description: "Inhaling warm, moist air helps loosen mucus, relieve congestion, and soothe irritated airways.",
        forSymptoms: ["Nasal Congestion", "Sinus Congestion", "Cough", "Sore Throat", "Cold"],
        instructions: [
            "Boil water and transfer to a large bowl",
            "Let it cool slightly (should be warm, not scalding)",
            "Lean over the bowl with a towel over your head",
            "Breathe deeply for 5-10 minutes",
            "Optional: Add eucalyptus oil or Vicks"
        ],
        ingredients: ["Hot water", "Eucalyptus oil (optional)", "Menthol (optional)"],
        benefits: [
            "Loosens mucus and phlegm",
            "Opens nasal passages",
            "Soothes irritated airways",
            "Provides temporary relief from congestion"
        ],
        precautions: [
            "Keep water away from children",
            "Don't get too close to avoid burns",
            "Not recommended for young children",
            "Stop if dizziness occurs"
        ],
        effectiveness: "Moderately Effective",
        icon: "💨"
    },
    {
        id: "gargling",
        name: "Salt Water Gargle",
        description: "Gargling with salt water reduces throat inflammation, kills bacteria, and loosens mucus.",
        forSymptoms: ["Sore Throat", "Cough", "Tonsillitis"],
        instructions: [
            "Dissolve 1/2 teaspoon salt in 1 cup warm water",
            "Take a sip and gargle for 30 seconds",
            "Spit out the water (do not swallow)",
            "Repeat until the glass is empty",
            "Do this 3-4 times daily"
        ],
        ingredients: ["Warm water", "Table salt or sea salt"],
        benefits: [
            "Reduces throat inflammation",
            "Has mild antiseptic effect",
            "Loosens mucus",
            "Provides temporary pain relief"
        ],
        precautions: [
            "Do not swallow the salt water",
            "Not suitable for very young children",
            "Use warm, not hot water"
        ],
        effectiveness: "Moderately Effective",
        icon: "🧂"
    },
    {
        id: "elevation",
        name: "Elevate Affected Area",
        description: "Elevating an injured or swollen body part above heart level helps reduce swelling by improving fluid drainage.",
        forSymptoms: ["Swelling", "Sprains", "Joint Pain"],
        instructions: [
            "Lie down and prop up the affected limb",
            "Use pillows to elevate above heart level",
            "Rest in this position for 15-30 minutes",
            "Repeat several times daily",
            "Combine with ice for best results"
        ],
        benefits: [
            "Reduces swelling through gravity",
            "Decreases pain",
            "Promotes healing",
            "Prevents fluid accumulation"
        ],
        precautions: [
            "Ensure comfortable positioning",
            "Don't elevate too high causing discomfort",
            "Seek medical help if swelling doesn't improve"
        ],
        effectiveness: "Moderately Effective",
        icon: "⬆️"
    },
    {
        id: "honey-lemon",
        name: "Honey and Lemon",
        description: "A traditional remedy that soothes sore throats and provides vitamin C. Honey has natural antimicrobial properties.",
        forSymptoms: ["Sore Throat", "Cough", "Cold"],
        instructions: [
            "Mix 1 tablespoon honey with juice of half a lemon",
            "Add to a cup of warm water",
            "Stir well and drink slowly",
            "Can be taken 2-3 times daily",
            "Best consumed before bedtime for cough"
        ],
        ingredients: ["Raw honey", "Fresh lemon", "Warm water"],
        benefits: [
            "Honey coats and soothes the throat",
            "Natural cough suppressant",
            "Lemon provides vitamin C",
            "Honey has antimicrobial properties"
        ],
        precautions: [
            "NEVER give honey to children under 1 year (botulism risk)",
            "Not recommended for diabetics without monitoring",
            "Use pasteurized honey for safety"
        ],
        effectiveness: "Moderately Effective",
        icon: "🍯"
    },
    {
        id: "rice-diet",
        name: "BRAT Diet for Diarrhea",
        description: "A bland diet that is easy to digest and helps firm up stools during diarrhea.",
        forSymptoms: ["Diarrhea", "Nausea", "Vomiting", "Stomach Upset"],
        instructions: [
            "Eat Bananas, Rice, Applesauce, and Toast",
            "Start with small portions",
            "Avoid dairy, fatty, and spicy foods",
            "Gradually add other bland foods",
            "Continue adequate fluid intake"
        ],
        ingredients: ["Bananas", "White rice", "Applesauce", "Toast"],
        benefits: [
            "Easy to digest",
            "Low in fiber (helps firm stools)",
            "Provides binding effect",
            "Gentle on upset stomach"
        ],
        precautions: [
            "Not nutritionally complete for long-term use",
            "Resume normal diet as symptoms improve",
            "Seek help if symptoms persist beyond 2 days"
        ],
        effectiveness: "Moderately Effective",
        icon: "🍚"
    }
];

// Natural Remedies (Ayurvedic and Traditional)
export const naturalRemedies: NaturalRemedy[] = [
    {
        id: "ginger",
        name: "Ginger",
        type: "Spice",
        description: "Ginger has been used for centuries to treat nausea, aid digestion, and reduce inflammation. It contains bioactive compounds like gingerol.",
        forSymptoms: ["Nausea", "Vomiting", "Indigestion", "Cold", "Sore Throat", "Motion Sickness"],
        howToUse: [
            "Ginger tea: Boil fresh ginger slices in water for 10 minutes",
            "Add honey and lemon for taste",
            "Chew small pieces of crystallized ginger for nausea",
            "Add to food while cooking",
            "Take 1-2 grams per day for anti-nausea effect"
        ],
        scientificBasis: "Studies show ginger can reduce nausea by affecting serotonin receptors and has anti-inflammatory effects similar to NSAIDs. Research supports its use for pregnancy-related nausea and motion sickness.",
        precautions: [
            "May interact with blood thinners",
            "Excessive amounts may cause heartburn",
            "Consult doctor if pregnant or on medications",
            "May lower blood sugar - diabetics should monitor"
        ],
        icon: "🫚"
    },
    {
        id: "turmeric",
        name: "Turmeric (Haldi)",
        type: "Spice",
        description: "Turmeric contains curcumin, a powerful anti-inflammatory and antioxidant compound used in traditional medicine for thousands of years.",
        forSymptoms: ["Joint Pain", "Inflammation", "Skin Problems", "Digestive Issues"],
        howToUse: [
            "Golden milk: Mix 1/2 tsp turmeric with warm milk",
            "Add a pinch of black pepper to enhance absorption",
            "Include in cooking (curries, soups)",
            "Turmeric paste can be applied to minor wounds",
            "Take 500-1000mg curcumin supplements with meals"
        ],
        scientificBasis: "Curcumin has been extensively studied for its anti-inflammatory properties. Research shows it may be as effective as some anti-inflammatory drugs. Black pepper increases curcumin absorption by 2000%.",
        precautions: [
            "May interact with blood thinners and diabetes medications",
            "High doses may cause stomach upset",
            "Avoid turmeric supplements before surgery",
            "Can stain teeth and skin"
        ],
        icon: "🌿"
    },
    {
        id: "tulsi",
        name: "Tulsi (Holy Basil)",
        type: "Herb",
        description: "Tulsi is considered a sacred plant in India and has adaptogenic properties that help the body cope with stress. It also has antimicrobial and anti-inflammatory effects.",
        forSymptoms: ["Cough", "Cold", "Fever", "Stress", "Headache", "Respiratory Issues"],
        howToUse: [
            "Tulsi tea: Steep fresh or dried leaves in hot water",
            "Chew 4-5 fresh leaves daily for immunity",
            "Add to regular tea while brewing",
            "Tulsi extract supplements available",
            "Inhale steam from tulsi water for congestion"
        ],
        scientificBasis: "Studies show tulsi has antimicrobial, anti-inflammatory, and adaptogenic properties. It may help lower blood sugar and cholesterol levels. Research supports its use for stress reduction.",
        precautions: [
            "May slow blood clotting",
            "Can interact with anticoagulants",
            "May affect fertility (in high doses)",
            "Consult doctor if pregnant or breastfeeding"
        ],
        icon: "🌱"
    },
    {
        id: "honey",
        name: "Raw Honey",
        type: "Food",
        description: "Raw honey has natural antibacterial and antiseptic properties. It has been used for centuries to treat wounds and soothe sore throats.",
        forSymptoms: ["Cough", "Sore Throat", "Wounds", "Skin Issues"],
        howToUse: [
            "Take 1-2 teaspoons for cough relief",
            "Add to warm water with lemon",
            "Apply to minor burns and wounds",
            "Mix with other herbal preparations",
            "Use as natural sweetener"
        ],
        scientificBasis: "Studies show honey is effective as a cough suppressant, comparable to dextromethorphan. Medical-grade honey (like Manuka) has proven wound-healing properties due to hydrogen peroxide and methylglyoxal content.",
        precautions: [
            "NEVER give to children under 1 year (risk of botulism)",
            "Contains natural sugars - monitor if diabetic",
            "Use only as directed for wounds",
            "Raw honey may contain allergens"
        ],
        icon: "🍯"
    },
    {
        id: "garlic",
        name: "Garlic",
        type: "Food",
        description: "Garlic contains allicin, a compound with potent antimicrobial and immune-boosting properties. It has been used medicinally since ancient times.",
        forSymptoms: ["Cold", "Flu", "Immune Support", "Respiratory Infections"],
        howToUse: [
            "Eat 1-2 raw cloves daily for immune support",
            "Add generously to cooking",
            "Crush and let sit for 10 minutes before cooking (activates allicin)",
            "Garlic supplements available",
            "Make garlic tea with honey and lemon"
        ],
        scientificBasis: "Research shows garlic can enhance immune function and may reduce the severity and duration of colds. Allicin has demonstrated antibacterial and antiviral properties in laboratory studies.",
        precautions: [
            "May interact with blood thinners",
            "Can cause bad breath and body odor",
            "May cause digestive discomfort in some",
            "Stop 2 weeks before surgery"
        ],
        icon: "🧄"
    },
    {
        id: "peppermint",
        name: "Peppermint",
        type: "Herb",
        description: "Peppermint contains menthol, which provides a cooling sensation and helps relax muscles. It's commonly used for digestive issues and respiratory symptoms.",
        forSymptoms: ["Headache", "Nasal Congestion", "Indigestion", "Nausea", "Irritable Bowel Syndrome"],
        howToUse: [
            "Peppermint tea: Steep fresh or dried leaves",
            "Apply diluted peppermint oil to temples for headache",
            "Inhale peppermint steam for congestion",
            "Peppermint oil capsules for IBS (enteric-coated)",
            "Add to warm water for a refreshing drink"
        ],
        scientificBasis: "Studies support peppermint oil for IBS symptoms. Menthol activates cold receptors, providing relief from congestion. Research shows it may help with tension headaches when applied topically.",
        precautions: [
            "Peppermint oil should be diluted before topical use",
            "May worsen heartburn in GERD",
            "Not for infants (menthol can cause breathing issues)",
            "Oil should not be ingested directly (use capsules)"
        ],
        icon: "🍃"
    },
    {
        id: "chamomile",
        name: "Chamomile",
        type: "Herb",
        description: "Chamomile is a gentle herb known for its calming effects. It contains apigenin, a compound that promotes relaxation and sleep.",
        forSymptoms: ["Insomnia", "Anxiety", "Stomach Upset", "Menstrual Cramps"],
        howToUse: [
            "Chamomile tea: Steep dried flowers for 5-10 minutes",
            "Drink 1-2 cups before bedtime for sleep",
            "Use cooled tea as a wash for skin irritation",
            "Available as supplements and essential oil",
            "Can be combined with honey and lemon"
        ],
        scientificBasis: "Apigenin in chamomile binds to benzodiazepine receptors in the brain, promoting relaxation. Studies show improvement in sleep quality and anxiety reduction with regular use.",
        precautions: [
            "May cause allergic reactions in people allergic to ragweed",
            "Can interact with sedatives and blood thinners",
            "Avoid before surgery due to sedative effects",
            "Consult doctor if pregnant"
        ],
        icon: "🌼"
    },
    {
        id: "eucalyptus",
        name: "Eucalyptus",
        type: "Essential Oil",
        description: "Eucalyptus oil contains eucalyptol, which helps clear respiratory passages and has antimicrobial properties.",
        forSymptoms: ["Nasal Congestion", "Cough", "Sinus Congestion", "Muscle Pain"],
        howToUse: [
            "Add a few drops to hot water for steam inhalation",
            "Use in a diffuser for respiratory relief",
            "Dilute with carrier oil for chest rub",
            "Add to bath water for soothing soak",
            "Available in balms and vapor rubs"
        ],
        scientificBasis: "Eucalyptol has been shown to have anti-inflammatory and decongestant properties. Studies support its use for respiratory conditions and its antimicrobial effects against common pathogens.",
        precautions: [
            "Never ingest eucalyptus oil",
            "Must be diluted before skin application",
            "Keep away from infants and young children",
            "Can be toxic in large amounts"
        ],
        icon: "🍃"
    }
];

// Symptom to Medicine Mapping
export const symptomMedicineMap: { [key: string]: { medicines: string[]; homeCare: string[]; natural: string[] } } = {
    "Headache": {
        medicines: ["paracetamol", "ibuprofen"],
        homeCare: ["rest-recovery", "hydration", "cold-compress"],
        natural: ["peppermint", "ginger"]
    },
    "Fever": {
        medicines: ["paracetamol", "ibuprofen"],
        homeCare: ["rest-recovery", "hydration", "cold-compress"],
        natural: ["tulsi", "ginger"]
    },
    "Cough": {
        medicines: ["dextromethorphan", "guaifenesin", "throat-lozenges"],
        homeCare: ["steam-inhalation", "honey-lemon", "gargling", "hydration"],
        natural: ["honey", "tulsi", "ginger", "eucalyptus"]
    },
    "Sore Throat": {
        medicines: ["throat-lozenges", "paracetamol", "ibuprofen"],
        homeCare: ["gargling", "honey-lemon", "hydration", "warm-compress"],
        natural: ["honey", "tulsi", "ginger"]
    },
    "Fatigue": {
        medicines: [],
        homeCare: ["rest-recovery", "hydration"],
        natural: ["tulsi"]
    },
    "Body Aches": {
        medicines: ["paracetamol", "ibuprofen"],
        homeCare: ["rest-recovery", "warm-compress", "hydration"],
        natural: ["turmeric", "ginger"]
    },
    "Nausea": {
        medicines: ["ondansetron"],
        homeCare: ["hydration", "rice-diet"],
        natural: ["ginger", "peppermint"]
    },
    "Dizziness": {
        medicines: [],
        homeCare: ["rest-recovery", "hydration"],
        natural: []
    },
    "Chest Pain": {
        medicines: [],
        homeCare: [],
        natural: []
    },
    "Difficulty Breathing": {
        medicines: [],
        homeCare: [],
        natural: []
    },
    "Abdominal Pain": {
        medicines: ["antacid", "omeprazole"],
        homeCare: ["warm-compress", "rice-diet"],
        natural: ["peppermint", "ginger", "chamomile"]
    },
    "Diarrhea": {
        medicines: ["loperamide", "ors"],
        homeCare: ["hydration", "rice-diet"],
        natural: []
    },
    "Skin Rash": {
        medicines: ["hydrocortisone", "cetirizine", "loratadine"],
        homeCare: ["cold-compress"],
        natural: ["turmeric"]
    },
    "Joint Pain": {
        medicines: ["ibuprofen", "paracetamol"],
        homeCare: ["warm-compress", "cold-compress", "elevation"],
        natural: ["turmeric", "ginger"]
    },
    "Runny Nose": {
        medicines: ["cetirizine", "loratadine"],
        homeCare: ["steam-inhalation", "hydration"],
        natural: ["eucalyptus", "tulsi", "ginger"]
    },
    "Loss of Appetite": {
        medicines: [],
        homeCare: ["hydration"],
        natural: ["ginger"]
    }
};

// Emergency conditions where medicines should NOT be suggested
export const emergencyConditions = [
    "Chest Pain",
    "Difficulty Breathing",
    "Severe Allergic Reaction",
    "Sudden Severe Headache",
    "Loss of Consciousness",
    "Severe Bleeding",
    "Stroke Symptoms",
    "Heart Attack Symptoms"
];

// Get recommendations for symptoms
export function getRecommendationsForSymptoms(symptoms: string[]): {
    medicines: Medicine[];
    homeCare: HomeCareRemedy[];
    natural: NaturalRemedy[];
    hasEmergency: boolean;
    emergencySymptoms: string[];
} {
    const medicineIds = new Set<string>();
    const homeCareIds = new Set<string>();
    const naturalIds = new Set<string>();
    const emergencySymptoms: string[] = [];

    for (const symptom of symptoms) {
        // Check for emergency
        if (emergencyConditions.includes(symptom)) {
            emergencySymptoms.push(symptom);
        }

        // Get recommendations
        const mapping = symptomMedicineMap[symptom];
        if (mapping) {
            mapping.medicines.forEach(id => medicineIds.add(id));
            mapping.homeCare.forEach(id => homeCareIds.add(id));
            mapping.natural.forEach(id => naturalIds.add(id));
        }
    }

    return {
        medicines: medicines.filter(m => medicineIds.has(m.id)),
        homeCare: homeCareRemedies.filter(h => homeCareIds.has(h.id)),
        natural: naturalRemedies.filter(n => naturalIds.has(n.id)),
        hasEmergency: emergencySymptoms.length > 0,
        emergencySymptoms
    };
}
