/**
 * Kids Symptoms Database
 * Comprehensive list of 100+ symptoms specific to children under 5 years
 * Categorized by body system and urgency level
 */

export interface KidsSymptom {
    id: string;
    name: string;
    nameHindi?: string;
    category: SymptomCategory;
    urgency: UrgencyLevel;
    description: string;
    emoji?: string;
    ageRelevance?: AgeGroup[];
    relatedSymptoms?: string[];
}

export type SymptomCategory =
    | "respiratory"
    | "digestive"
    | "skin"
    | "fever"
    | "neurological"
    | "behavioral"
    | "ear_nose_throat"
    | "eye"
    | "musculoskeletal"
    | "urinary"
    | "general"
    | "allergic"
    | "dental"
    | "developmental";

export type UrgencyLevel = "low" | "medium" | "high" | "emergency";

export type AgeGroup = "newborn" | "infant" | "toddler" | "preschool";

export const ageGroupInfo: Record<AgeGroup, { label: string; range: string; emoji: string }> = {
    newborn: { label: "Newborn", range: "0-28 days", emoji: "👶" },
    infant: { label: "Infant", range: "1-12 months", emoji: "🍼" },
    toddler: { label: "Toddler", range: "1-3 years", emoji: "🧒" },
    preschool: { label: "Preschool", range: "3-5 years", emoji: "👧" }
};

export const symptomCategories: Record<SymptomCategory, { label: string; emoji: string; color: string }> = {
    respiratory: { label: "Breathing & Lungs", emoji: "🫁", color: "blue" },
    digestive: { label: "Tummy & Digestion", emoji: "🍽️", color: "orange" },
    skin: { label: "Skin & Rashes", emoji: "🩹", color: "pink" },
    fever: { label: "Fever & Temperature", emoji: "🌡️", color: "red" },
    neurological: { label: "Brain & Nerves", emoji: "🧠", color: "purple" },
    behavioral: { label: "Behavior & Mood", emoji: "😢", color: "yellow" },
    ear_nose_throat: { label: "Ear, Nose & Throat", emoji: "👂", color: "teal" },
    eye: { label: "Eyes", emoji: "👁️", color: "cyan" },
    musculoskeletal: { label: "Bones & Muscles", emoji: "💪", color: "green" },
    urinary: { label: "Bathroom Issues", emoji: "🚽", color: "indigo" },
    general: { label: "General Health", emoji: "❤️", color: "rose" },
    allergic: { label: "Allergies", emoji: "🤧", color: "amber" },
    dental: { label: "Teeth & Mouth", emoji: "🦷", color: "slate" },
    developmental: { label: "Growth & Development", emoji: "📊", color: "emerald" }
};

export const kidsSymptoms: KidsSymptom[] = [
    // RESPIRATORY SYMPTOMS (15+)
    {
        id: "cough",
        name: "Cough",
        nameHindi: "खांसी",
        category: "respiratory",
        urgency: "medium",
        description: "Dry or wet cough",
        emoji: "😷",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "runny_nose",
        name: "Runny Nose",
        nameHindi: "बहती नाक",
        category: "respiratory",
        urgency: "low",
        description: "Clear or colored nasal discharge",
        emoji: "🤧",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "blocked_nose",
        name: "Blocked/Stuffy Nose",
        nameHindi: "बंद नाक",
        category: "respiratory",
        urgency: "low",
        description: "Difficulty breathing through nose",
        emoji: "👃",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "wheezing",
        name: "Wheezing",
        nameHindi: "सांस में घरघराहट",
        category: "respiratory",
        urgency: "high",
        description: "Whistling sound while breathing",
        emoji: "🎵",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "rapid_breathing",
        name: "Rapid Breathing",
        nameHindi: "तेज़ सांस लेना",
        category: "respiratory",
        urgency: "high",
        description: "Breathing faster than normal",
        emoji: "💨",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "difficulty_breathing",
        name: "Difficulty Breathing",
        nameHindi: "सांस लेने में कठिनाई",
        category: "respiratory",
        urgency: "emergency",
        description: "Struggling to breathe, using extra muscles",
        emoji: "⚠️",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "noisy_breathing",
        name: "Noisy Breathing",
        nameHindi: "शोर भरी सांस",
        category: "respiratory",
        urgency: "medium",
        description: "Stridor or grunting sounds",
        emoji: "🔊",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "barking_cough",
        name: "Barking Cough (Croup)",
        nameHindi: "भौंकने जैसी खांसी",
        category: "respiratory",
        urgency: "high",
        description: "Seal-like barking cough, usually at night",
        emoji: "🦭",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "chest_congestion",
        name: "Chest Congestion",
        nameHindi: "छाती में जमाव",
        category: "respiratory",
        urgency: "medium",
        description: "Mucus buildup in chest",
        emoji: "😮‍💨",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "sneezing",
        name: "Frequent Sneezing",
        nameHindi: "बार-बार छींकना",
        category: "respiratory",
        urgency: "low",
        description: "Repeated sneezing episodes",
        emoji: "🤧",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "blue_lips",
        name: "Blue Lips/Skin",
        nameHindi: "नीले होंठ/त्वचा",
        category: "respiratory",
        urgency: "emergency",
        description: "Bluish discoloration around lips or fingertips",
        emoji: "💙",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "apnea",
        name: "Stops Breathing Briefly",
        nameHindi: "सांस रुकना",
        category: "respiratory",
        urgency: "emergency",
        description: "Pauses in breathing for 15+ seconds",
        emoji: "🚨",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "rib_retractions",
        name: "Rib Pulling In While Breathing",
        nameHindi: "सांस लेते समय पसलियां दिखना",
        category: "respiratory",
        urgency: "high",
        description: "Visible pulling between ribs during breathing",
        emoji: "⚡",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "nasal_flaring",
        name: "Nasal Flaring",
        nameHindi: "नाक का फूलना",
        category: "respiratory",
        urgency: "high",
        description: "Nostrils widening with each breath",
        emoji: "👃",
        ageRelevance: ["newborn", "infant", "toddler"]
    },
    {
        id: "choking",
        name: "Choking/Gagging",
        nameHindi: "गला घुटना",
        category: "respiratory",
        urgency: "emergency",
        description: "Unable to breathe due to obstruction",
        emoji: "🚫",
        ageRelevance: ["infant", "toddler", "preschool"]
    },

    // DIGESTIVE SYMPTOMS (18+)
    {
        id: "vomiting",
        name: "Vomiting",
        nameHindi: "उल्टी",
        category: "digestive",
        urgency: "medium",
        description: "Throwing up food or milk",
        emoji: "🤮",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "projectile_vomiting",
        name: "Projectile Vomiting",
        nameHindi: "ज़ोर से उल्टी",
        category: "digestive",
        urgency: "high",
        description: "Forceful vomiting shooting out",
        emoji: "💥",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "diarrhea",
        name: "Diarrhea",
        nameHindi: "दस्त",
        category: "digestive",
        urgency: "medium",
        description: "Loose, watery stools",
        emoji: "💧",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "bloody_stool",
        name: "Blood in Stool",
        nameHindi: "मल में खून",
        category: "digestive",
        urgency: "high",
        description: "Red or black colored stool",
        emoji: "🩸",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "constipation",
        name: "Constipation",
        nameHindi: "कब्ज़",
        category: "digestive",
        urgency: "low",
        description: "Hard stools, difficulty passing",
        emoji: "😣",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "stomach_pain",
        name: "Stomach/Tummy Pain",
        nameHindi: "पेट दर्द",
        category: "digestive",
        urgency: "medium",
        description: "Child holds or points to tummy",
        emoji: "😖",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "loss_of_appetite",
        name: "Not Eating/Drinking",
        nameHindi: "खाना-पीना बंद",
        category: "digestive",
        urgency: "medium",
        description: "Refusing food or decreased feeding",
        emoji: "🍼",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "excessive_spitting",
        name: "Excessive Spitting Up",
        nameHindi: "बार-बार दूध उगलना",
        category: "digestive",
        urgency: "low",
        description: "Frequent regurgitation after feeding",
        emoji: "🥛",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "bloated_belly",
        name: "Bloated/Swollen Belly",
        nameHindi: "फूला हुआ पेट",
        category: "digestive",
        urgency: "medium",
        description: "Distended or hard abdomen",
        emoji: "🎈",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "gas_colic",
        name: "Gas Pain/Colic",
        nameHindi: "गैस/पेट का दर्द",
        category: "digestive",
        urgency: "low",
        description: "Crying due to gas, pulling legs up",
        emoji: "😭",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "green_stool",
        name: "Green Colored Stool",
        nameHindi: "हरे रंग का मल",
        category: "digestive",
        urgency: "low",
        description: "Stool has green color",
        emoji: "💚",
        ageRelevance: ["newborn", "infant", "toddler"]
    },
    {
        id: "mucus_stool",
        name: "Mucus in Stool",
        nameHindi: "मल में बलगम",
        category: "digestive",
        urgency: "medium",
        description: "Slimy mucus visible in diaper",
        emoji: "🧫",
        ageRelevance: ["newborn", "infant", "toddler"]
    },
    {
        id: "abdominal_swelling",
        name: "Severe Belly Swelling",
        nameHindi: "पेट में सूजन",
        category: "digestive",
        urgency: "high",
        description: "Significant abdominal distension",
        emoji: "🆘",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "drooling",
        name: "Excessive Drooling",
        nameHindi: "लार टपकना",
        category: "digestive",
        urgency: "low",
        description: "More drool than usual",
        emoji: "💦",
        ageRelevance: ["infant", "toddler"]
    },
    {
        id: "difficulty_swallowing",
        name: "Difficulty Swallowing",
        nameHindi: "निगलने में कठिनाई",
        category: "digestive",
        urgency: "high",
        description: "Pain or trouble swallowing",
        emoji: "😨",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "refusing_breast",
        name: "Refusing Breast/Bottle",
        nameHindi: "दूध पीने से मना",
        category: "digestive",
        urgency: "medium",
        description: "Won't latch or take bottle",
        emoji: "🍼",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "hiccups_frequent",
        name: "Frequent Hiccups",
        nameHindi: "बार-बार हिचकी",
        category: "digestive",
        urgency: "low",
        description: "Persistent hiccups",
        emoji: "😯",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "food_allergy_reaction",
        name: "Food Reaction",
        nameHindi: "खाने से एलर्जी",
        category: "digestive",
        urgency: "high",
        description: "Reaction after eating certain foods",
        emoji: "🚨",
        ageRelevance: ["infant", "toddler", "preschool"]
    },

    // SKIN SYMPTOMS (15+)
    {
        id: "rash",
        name: "Skin Rash",
        nameHindi: "त्वचा पर दाने",
        category: "skin",
        urgency: "medium",
        description: "Red or pink spots on skin",
        emoji: "🔴",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "diaper_rash",
        name: "Diaper Rash",
        nameHindi: "डायपर रैश",
        category: "skin",
        urgency: "low",
        description: "Red irritated skin in diaper area",
        emoji: "🩱",
        ageRelevance: ["newborn", "infant", "toddler"]
    },
    {
        id: "hives",
        name: "Hives/Urticaria",
        nameHindi: "पित्ती",
        category: "skin",
        urgency: "high",
        description: "Raised itchy welts on skin",
        emoji: "🌡️",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "eczema",
        name: "Dry/Scaly Skin (Eczema)",
        nameHindi: "एक्जिमा",
        category: "skin",
        urgency: "low",
        description: "Dry, itchy, rough patches",
        emoji: "🏜️",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "cradle_cap",
        name: "Cradle Cap",
        nameHindi: "सिर पर पपड़ी",
        category: "skin",
        urgency: "low",
        description: "Scaly patches on baby's scalp",
        emoji: "👶",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "jaundice",
        name: "Yellow Skin/Eyes",
        nameHindi: "पीलिया",
        category: "skin",
        urgency: "high",
        description: "Yellowish tint to skin or eyes",
        emoji: "💛",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "pale_skin",
        name: "Pale/Gray Skin",
        nameHindi: "पीला/सफेद रंग",
        category: "skin",
        urgency: "high",
        description: "Unusually pale complexion",
        emoji: "😰",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "bruising",
        name: "Unexplained Bruising",
        nameHindi: "बिना कारण नील",
        category: "skin",
        urgency: "high",
        description: "Bruises appearing without injury",
        emoji: "🟣",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "petechiae",
        name: "Tiny Red/Purple Dots",
        nameHindi: "छोटे लाल धब्बे",
        category: "skin",
        urgency: "emergency",
        description: "Pinpoint red spots that don't fade",
        emoji: "❗",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "itching",
        name: "Itching/Scratching",
        nameHindi: "खुजली",
        category: "skin",
        urgency: "low",
        description: "Constant scratching or rubbing",
        emoji: "🤏",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "blisters",
        name: "Blisters",
        nameHindi: "छाले",
        category: "skin",
        urgency: "medium",
        description: "Fluid-filled bumps on skin",
        emoji: "💧",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "swelling_skin",
        name: "Skin Swelling",
        nameHindi: "त्वचा पर सूजन",
        category: "skin",
        urgency: "medium",
        description: "Puffy or swollen areas",
        emoji: "🎈",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "birthmark_changes",
        name: "Birthmark Changes",
        nameHindi: "जन्मचिन्ह में बदलाव",
        category: "skin",
        urgency: "medium",
        description: "Birthmark growing or changing",
        emoji: "🔄",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "heat_rash",
        name: "Heat Rash",
        nameHindi: "घमौरियां",
        category: "skin",
        urgency: "low",
        description: "Small red bumps in warm areas",
        emoji: "☀️",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "ringworm",
        name: "Ring-shaped Rash",
        nameHindi: "दाद",
        category: "skin",
        urgency: "low",
        description: "Circular red patches",
        emoji: "🔴",
        ageRelevance: ["toddler", "preschool"]
    },

    // FEVER SYMPTOMS (8+)
    {
        id: "fever",
        name: "Fever",
        nameHindi: "बुखार",
        category: "fever",
        urgency: "medium",
        description: "Temperature above 100.4°F (38°C)",
        emoji: "🌡️",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "high_fever",
        name: "High Fever (104°F+)",
        nameHindi: "तेज़ बुखार",
        category: "fever",
        urgency: "high",
        description: "Temperature above 104°F (40°C)",
        emoji: "🔥",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "fever_newborn",
        name: "Fever in Newborn (<3 months)",
        nameHindi: "नवजात में बुखार",
        category: "fever",
        urgency: "emergency",
        description: "Any fever in baby under 3 months",
        emoji: "🚨",
        ageRelevance: ["newborn"]
    },
    {
        id: "fever_rash",
        name: "Fever with Rash",
        nameHindi: "बुखार और दाने",
        category: "fever",
        urgency: "high",
        description: "Fever accompanied by skin rash",
        emoji: "🌡️",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "chills",
        name: "Chills/Shivering",
        nameHindi: "कंपकंपी",
        category: "fever",
        urgency: "medium",
        description: "Shaking or feeling cold",
        emoji: "🥶",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "night_sweats",
        name: "Night Sweats",
        nameHindi: "रात में पसीना",
        category: "fever",
        urgency: "medium",
        description: "Sweating heavily during sleep",
        emoji: "💦",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "fever_lasting",
        name: "Fever Lasting 3+ Days",
        nameHindi: "3 दिन से ज़्यादा बुखार",
        category: "fever",
        urgency: "high",
        description: "Persistent fever for multiple days",
        emoji: "📅",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "febrile_seizure",
        name: "Seizure with Fever",
        nameHindi: "बुखार में दौरे",
        category: "fever",
        urgency: "emergency",
        description: "Convulsions during fever",
        emoji: "⚡",
        ageRelevance: ["infant", "toddler", "preschool"]
    },

    // BEHAVIORAL SYMPTOMS (12+)
    {
        id: "irritability",
        name: "Unusually Irritable/Fussy",
        nameHindi: "बहुत चिड़चिड़ा",
        category: "behavioral",
        urgency: "medium",
        description: "More crying or fussiness than normal",
        emoji: "😫",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "lethargy",
        name: "Very Sleepy/Hard to Wake",
        nameHindi: "बहुत सुस्त",
        category: "behavioral",
        urgency: "high",
        description: "Unusually drowsy or unresponsive",
        emoji: "😴",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "inconsolable_crying",
        name: "Won't Stop Crying",
        nameHindi: "लगातार रोना",
        category: "behavioral",
        urgency: "high",
        description: "Crying that cannot be soothed",
        emoji: "😭",
        ageRelevance: ["newborn", "infant", "toddler"]
    },
    {
        id: "less_active",
        name: "Less Active Than Usual",
        nameHindi: "कम सक्रिय",
        category: "behavioral",
        urgency: "medium",
        description: "Not playing or moving as much",
        emoji: "😶",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "poor_eye_contact",
        name: "Not Making Eye Contact",
        nameHindi: "आंखों में नहीं देखना",
        category: "behavioral",
        urgency: "medium",
        description: "Avoiding or not meeting eyes",
        emoji: "👀",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "high_pitched_cry",
        name: "High-Pitched Cry",
        nameHindi: "तेज़ आवाज़ में रोना",
        category: "behavioral",
        urgency: "high",
        description: "Unusual high-pitched crying",
        emoji: "🔊",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "floppy_body",
        name: "Floppy/Limp Body",
        nameHindi: "शरीर में ढीलापन",
        category: "behavioral",
        urgency: "emergency",
        description: "Low muscle tone, seems lifeless",
        emoji: "🚨",
        ageRelevance: ["newborn", "infant", "toddler"]
    },
    {
        id: "no_smile",
        name: "Not Smiling/Responding",
        nameHindi: "मुस्कुरा नहीं रहा",
        category: "behavioral",
        urgency: "medium",
        description: "Not responding to interaction",
        emoji: "😐",
        ageRelevance: ["infant", "toddler"]
    },
    {
        id: "sleep_disturbance",
        name: "Sleep Problems",
        nameHindi: "नींद की समस्या",
        category: "behavioral",
        urgency: "low",
        description: "Difficulty sleeping or staying asleep",
        emoji: "🌙",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "arching_back",
        name: "Arching Back",
        nameHindi: "पीठ टेढ़ी करना",
        category: "behavioral",
        urgency: "medium",
        description: "Frequently arching backward",
        emoji: "🔙",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "stiffness",
        name: "Body Stiffness",
        nameHindi: "शरीर में अकड़न",
        category: "behavioral",
        urgency: "high",
        description: "Muscles seem tense or rigid",
        emoji: "💪",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "confusion",
        name: "Seems Confused",
        nameHindi: "भ्रमित लगना",
        category: "behavioral",
        urgency: "high",
        description: "Disoriented or confused behavior",
        emoji: "❓",
        ageRelevance: ["toddler", "preschool"]
    },

    // EAR, NOSE, THROAT SYMPTOMS (10+)
    {
        id: "ear_pain",
        name: "Ear Pain",
        nameHindi: "कान में दर्द",
        category: "ear_nose_throat",
        urgency: "medium",
        description: "Tugging or rubbing ear, crying",
        emoji: "👂",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "ear_discharge",
        name: "Fluid from Ear",
        nameHindi: "कान से स्राव",
        category: "ear_nose_throat",
        urgency: "high",
        description: "Pus or fluid draining from ear",
        emoji: "💧",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "sore_throat",
        name: "Sore Throat",
        nameHindi: "गले में दर्द",
        category: "ear_nose_throat",
        urgency: "medium",
        description: "Pain or difficulty swallowing",
        emoji: "😣",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "mouth_sores",
        name: "Mouth Sores/Ulcers",
        nameHindi: "मुंह में छाले",
        category: "ear_nose_throat",
        urgency: "medium",
        description: "Painful spots inside mouth",
        emoji: "😮",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "swollen_glands",
        name: "Swollen Neck Glands",
        nameHindi: "गर्दन में सूजन",
        category: "ear_nose_throat",
        urgency: "medium",
        description: "Lumps in neck area",
        emoji: "🔵",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "hoarse_voice",
        name: "Hoarse/Lost Voice",
        nameHindi: "आवाज़ बैठना",
        category: "ear_nose_throat",
        urgency: "low",
        description: "Changes in voice quality",
        emoji: "🗣️",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "snoring_new",
        name: "New Snoring",
        nameHindi: "खर्राटे लेना",
        category: "ear_nose_throat",
        urgency: "low",
        description: "Started snoring during sleep",
        emoji: "😪",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "hearing_issues",
        name: "Not Responding to Sounds",
        nameHindi: "आवाज़ पर प्रतिक्रिया नहीं",
        category: "ear_nose_throat",
        urgency: "medium",
        description: "Seems to not hear properly",
        emoji: "🔇",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "white_patches_throat",
        name: "White Patches in Throat",
        nameHindi: "गले में सफेद धब्बे",
        category: "ear_nose_throat",
        urgency: "medium",
        description: "White spots on tonsils or throat",
        emoji: "⚪",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "nosebleed",
        name: "Nosebleed",
        nameHindi: "नाक से खून",
        category: "ear_nose_throat",
        urgency: "medium",
        description: "Bleeding from nose",
        emoji: "🩸",
        ageRelevance: ["toddler", "preschool"]
    },

    // EYE SYMPTOMS (8+)
    {
        id: "red_eyes",
        name: "Red/Pink Eyes",
        nameHindi: "आंखें लाल",
        category: "eye",
        urgency: "medium",
        description: "Redness in eye whites",
        emoji: "👁️",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "eye_discharge",
        name: "Eye Discharge/Sticky Eyes",
        nameHindi: "आंखों से चिपचिपा पदार्थ",
        category: "eye",
        urgency: "medium",
        description: "Yellow or green discharge",
        emoji: "😫",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "swollen_eyelid",
        name: "Swollen Eyelid",
        nameHindi: "पलक में सूजन",
        category: "eye",
        urgency: "medium",
        description: "Puffy or swollen eyelid",
        emoji: "😑",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "crossed_eyes",
        name: "Crossed/Wandering Eyes",
        nameHindi: "भेंगापन",
        category: "eye",
        urgency: "low",
        description: "Eyes not aligned",
        emoji: "👀",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "light_sensitivity",
        name: "Light Sensitivity",
        nameHindi: "रोशनी से परेशानी",
        category: "eye",
        urgency: "medium",
        description: "Squinting or avoiding light",
        emoji: "🌞",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "excessive_tearing",
        name: "Excessive Tearing",
        nameHindi: "आंखों से पानी",
        category: "eye",
        urgency: "low",
        description: "Constant watery eyes",
        emoji: "💧",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "eye_rubbing",
        name: "Constant Eye Rubbing",
        nameHindi: "बार-बार आंखें मलना",
        category: "eye",
        urgency: "low",
        description: "Frequently rubbing eyes",
        emoji: "🤲",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "white_pupil",
        name: "White Reflection in Pupil",
        nameHindi: "पुतली में सफेद प्रतिबिंब",
        category: "eye",
        urgency: "emergency",
        description: "White appearance in photos",
        emoji: "⚪",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },

    // URINARY SYMPTOMS (6+)
    {
        id: "less_wet_diapers",
        name: "Fewer Wet Diapers",
        nameHindi: "कम गीले डायपर",
        category: "urinary",
        urgency: "high",
        description: "Less urination than normal",
        emoji: "🚼",
        ageRelevance: ["newborn", "infant", "toddler"]
    },
    {
        id: "dark_urine",
        name: "Dark/Strong Smelling Urine",
        nameHindi: "गहरे रंग का पेशाब",
        category: "urinary",
        urgency: "medium",
        description: "Concentrated or smelly urine",
        emoji: "🟡",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "blood_urine",
        name: "Blood in Urine",
        nameHindi: "पेशाब में खून",
        category: "urinary",
        urgency: "high",
        description: "Pink or red colored urine",
        emoji: "🩸",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "pain_urination",
        name: "Pain While Urinating",
        nameHindi: "पेशाब में दर्द",
        category: "urinary",
        urgency: "medium",
        description: "Crying during urination",
        emoji: "😣",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "frequent_urination",
        name: "Very Frequent Urination",
        nameHindi: "बार-बार पेशाब",
        category: "urinary",
        urgency: "medium",
        description: "Going more often than usual",
        emoji: "🚽",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "bedwetting_new",
        name: "New Bedwetting",
        nameHindi: "बिस्तर गीला करना",
        category: "urinary",
        urgency: "low",
        description: "After being dry at night",
        emoji: "🌙",
        ageRelevance: ["preschool"]
    },

    // GENERAL SYMPTOMS (10+)
    {
        id: "dehydration",
        name: "Signs of Dehydration",
        nameHindi: "पानी की कमी के लक्षण",
        category: "general",
        urgency: "high",
        description: "Dry mouth, no tears, sunken eyes",
        emoji: "🏜️",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "sunken_fontanelle",
        name: "Sunken Soft Spot",
        nameHindi: "धंसा हुआ तालू",
        category: "general",
        urgency: "high",
        description: "Sunken fontanelle on head",
        emoji: "👶",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "bulging_fontanelle",
        name: "Bulging Soft Spot",
        nameHindi: "उभरा हुआ तालू",
        category: "general",
        urgency: "emergency",
        description: "Swollen or bulging fontanelle",
        emoji: "🚨",
        ageRelevance: ["newborn", "infant"]
    },
    {
        id: "weight_loss",
        name: "Weight Loss/Not Gaining",
        nameHindi: "वज़न कम होना",
        category: "general",
        urgency: "medium",
        description: "Losing weight or not growing",
        emoji: "📉",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "headache",
        name: "Headache",
        nameHindi: "सिरदर्द",
        category: "general",
        urgency: "medium",
        description: "Holding head, light sensitivity",
        emoji: "🤕",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "fatigue",
        name: "Unusual Tiredness",
        nameHindi: "असामान्य थकान",
        category: "general",
        urgency: "medium",
        description: "More tired than usual",
        emoji: "😓",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "cold_extremities",
        name: "Cold Hands/Feet",
        nameHindi: "ठंडे हाथ-पैर",
        category: "general",
        urgency: "medium",
        description: "Unusually cold limbs",
        emoji: "🥶",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "excessive_thirst",
        name: "Very Thirsty",
        nameHindi: "बहुत प्यास",
        category: "general",
        urgency: "medium",
        description: "Drinking much more than usual",
        emoji: "🥤",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "no_tears",
        name: "No Tears When Crying",
        nameHindi: "रोते समय आंसू नहीं",
        category: "general",
        urgency: "high",
        description: "Crying without producing tears",
        emoji: "😢",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "umbilical_issues",
        name: "Belly Button Problems",
        nameHindi: "नाभि में समस्या",
        category: "general",
        urgency: "medium",
        description: "Redness, oozing, or smell",
        emoji: "🔴",
        ageRelevance: ["newborn"]
    },

    // NEUROLOGICAL SYMPTOMS (6+)
    {
        id: "seizure",
        name: "Seizure/Convulsions",
        nameHindi: "दौरे",
        category: "neurological",
        urgency: "emergency",
        description: "Shaking, jerking movements",
        emoji: "⚡",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "neck_stiffness",
        name: "Stiff Neck",
        nameHindi: "गर्दन में अकड़न",
        category: "neurological",
        urgency: "emergency",
        description: "Cannot touch chin to chest",
        emoji: "🚨",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "unequal_pupils",
        name: "Unequal Pupil Size",
        nameHindi: "असमान पुतलियां",
        category: "neurological",
        urgency: "emergency",
        description: "One pupil larger than other",
        emoji: "👁️",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "head_injury",
        name: "After Head Injury",
        nameHindi: "सिर पर चोट के बाद",
        category: "neurological",
        urgency: "high",
        description: "Symptoms after hitting head",
        emoji: "🤕",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "balance_problems",
        name: "Balance/Walking Problems",
        nameHindi: "संतुलन में समस्या",
        category: "neurological",
        urgency: "medium",
        description: "Difficulty walking or balancing",
        emoji: "🚶",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "tremors",
        name: "Shaking/Tremors",
        nameHindi: "कांपना",
        category: "neurological",
        urgency: "medium",
        description: "Involuntary shaking",
        emoji: "〰️",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },

    // ALLERGIC SYMPTOMS (5+)
    {
        id: "anaphylaxis",
        name: "Severe Allergic Reaction",
        nameHindi: "गंभीर एलर्जी",
        category: "allergic",
        urgency: "emergency",
        description: "Swelling, difficulty breathing",
        emoji: "🚨",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "lip_swelling",
        name: "Swollen Lips/Face",
        nameHindi: "होंठ/चेहरे पर सूजन",
        category: "allergic",
        urgency: "high",
        description: "Sudden facial swelling",
        emoji: "😮",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "itchy_eyes",
        name: "Itchy/Watery Eyes",
        nameHindi: "खुजली वाली आंखें",
        category: "allergic",
        urgency: "low",
        description: "Rubbing eyes, tearing",
        emoji: "👁️",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "allergic_rash",
        name: "Allergic Skin Reaction",
        nameHindi: "एलर्जी से दाने",
        category: "allergic",
        urgency: "medium",
        description: "Rash after exposure",
        emoji: "🔴",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "swollen_tongue",
        name: "Swollen Tongue",
        nameHindi: "जीभ में सूजन",
        category: "allergic",
        urgency: "emergency",
        description: "Tongue swelling",
        emoji: "👅",
        ageRelevance: ["infant", "toddler", "preschool"]
    },

    // DENTAL SYMPTOMS (4+)
    {
        id: "teething",
        name: "Teething Pain",
        nameHindi: "दांत निकलने का दर्द",
        category: "dental",
        urgency: "low",
        description: "Gum swelling, drooling, fussiness",
        emoji: "🦷",
        ageRelevance: ["infant", "toddler"]
    },
    {
        id: "tooth_pain",
        name: "Tooth Pain",
        nameHindi: "दांत में दर्द",
        category: "dental",
        urgency: "medium",
        description: "Pain in specific tooth",
        emoji: "😬",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "gum_swelling",
        name: "Swollen Gums",
        nameHindi: "मसूड़ों में सूजन",
        category: "dental",
        urgency: "medium",
        description: "Red or puffy gums",
        emoji: "🔴",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "thrush",
        name: "White Patches in Mouth (Thrush)",
        nameHindi: "मुंह में सफेद धब्बे",
        category: "dental",
        urgency: "low",
        description: "White coating on tongue/cheeks",
        emoji: "⚪",
        ageRelevance: ["newborn", "infant"]
    },

    // MUSCULOSKELETAL (4+)
    {
        id: "limping",
        name: "Limping",
        nameHindi: "लंगड़ाकर चलना",
        category: "musculoskeletal",
        urgency: "medium",
        description: "Walking with a limp",
        emoji: "🚶",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "joint_swelling",
        name: "Swollen Joint",
        nameHindi: "जोड़ में सूजन",
        category: "musculoskeletal",
        urgency: "high",
        description: "Puffy or swollen joints",
        emoji: "🦵",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "wont_use_arm_leg",
        name: "Won't Move Arm/Leg",
        nameHindi: "हाथ-पैर नहीं हिलाना",
        category: "musculoskeletal",
        urgency: "high",
        description: "Not using a limb",
        emoji: "💪",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "back_pain",
        name: "Back Pain",
        nameHindi: "पीठ दर्द",
        category: "musculoskeletal",
        urgency: "medium",
        description: "Complaining of back pain",
        emoji: "🔙",
        ageRelevance: ["preschool"]
    },

    // DEVELOPMENTAL CONCERNS (4+)
    {
        id: "not_meeting_milestones",
        name: "Missing Developmental Milestones",
        nameHindi: "विकास में देरी",
        category: "developmental",
        urgency: "medium",
        description: "Not reaching expected milestones",
        emoji: "📊",
        ageRelevance: ["newborn", "infant", "toddler", "preschool"]
    },
    {
        id: "regression",
        name: "Lost Skills (Regression)",
        nameHindi: "सीखे हुनर खोना",
        category: "developmental",
        urgency: "high",
        description: "Lost previously gained abilities",
        emoji: "📉",
        ageRelevance: ["infant", "toddler", "preschool"]
    },
    {
        id: "speech_delay",
        name: "Speech/Language Delay",
        nameHindi: "बोलने में देरी",
        category: "developmental",
        urgency: "medium",
        description: "Not talking as expected for age",
        emoji: "🗣️",
        ageRelevance: ["toddler", "preschool"]
    },
    {
        id: "motor_delay",
        name: "Motor Skill Delay",
        nameHindi: "चलने-फिरने में देरी",
        category: "developmental",
        urgency: "medium",
        description: "Not walking or moving as expected",
        emoji: "🏃",
        ageRelevance: ["infant", "toddler"]
    }
];

// Get symptoms by category
export const getSymptomsByCategory = (category: SymptomCategory): KidsSymptom[] => {
    return kidsSymptoms.filter(s => s.category === category);
};

// Get symptoms by age group
export const getSymptomsByAge = (ageGroup: AgeGroup): KidsSymptom[] => {
    return kidsSymptoms.filter(s =>
        !s.ageRelevance || s.ageRelevance.includes(ageGroup)
    );
};

// Get symptoms by urgency
export const getSymptomsByUrgency = (urgency: UrgencyLevel): KidsSymptom[] => {
    return kidsSymptoms.filter(s => s.urgency === urgency);
};

// Search symptoms by name
export const searchSymptoms = (query: string): KidsSymptom[] => {
    const lowerQuery = query.toLowerCase();
    return kidsSymptoms.filter(s =>
        s.name.toLowerCase().includes(lowerQuery) ||
        s.description.toLowerCase().includes(lowerQuery) ||
        (s.nameHindi && s.nameHindi.includes(query))
    );
};
