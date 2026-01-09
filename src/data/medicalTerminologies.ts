/**
 * Medical Terminologies - Standard Clinical Codes
 * SNOMED CT, ICD-10-CM, RxNorm, LOINC mappings
 * 
 * DISCLAIMER: This is for educational/decision support purposes only.
 * Always verify codes with official sources for clinical use.
 */

// SNOMED CT Symptom Codes
export interface SnomedCode {
    code: string;
    display: string;
    category: string;
}

export const snomedSymptomCodes: Record<string, SnomedCode> = {
    "fever": { code: "386661006", display: "Fever", category: "Finding" },
    "headache": { code: "25064002", display: "Headache", category: "Finding" },
    "cough": { code: "49727002", display: "Cough", category: "Finding" },
    "sore throat": { code: "162397003", display: "Sore throat", category: "Finding" },
    "fatigue": { code: "84229001", display: "Fatigue", category: "Finding" },
    "body aches": { code: "68962001", display: "Muscle pain", category: "Finding" },
    "nausea": { code: "422587007", display: "Nausea", category: "Finding" },
    "vomiting": { code: "422400008", display: "Vomiting", category: "Finding" },
    "diarrhea": { code: "62315008", display: "Diarrhea", category: "Finding" },
    "chest pain": { code: "29857009", display: "Chest pain", category: "Finding" },
    "shortness of breath": { code: "267036007", display: "Dyspnea", category: "Finding" },
    "difficulty breathing": { code: "230145002", display: "Difficulty breathing", category: "Finding" },
    "abdominal pain": { code: "21522001", display: "Abdominal pain", category: "Finding" },
    "dizziness": { code: "404640003", display: "Dizziness", category: "Finding" },
    "runny nose": { code: "64531003", display: "Rhinorrhea", category: "Finding" },
    "congestion": { code: "68235000", display: "Nasal congestion", category: "Finding" },
    "sneezing": { code: "162367006", display: "Sneezing", category: "Finding" },
    "joint pain": { code: "57676002", display: "Arthralgia", category: "Finding" },
    "back pain": { code: "161891005", display: "Back pain", category: "Finding" },
    "skin rash": { code: "271807003", display: "Skin rash", category: "Finding" },
    "itching": { code: "418290006", display: "Pruritus", category: "Finding" },
    "swelling": { code: "442672001", display: "Swelling", category: "Finding" },
    "numbness": { code: "44077006", display: "Numbness", category: "Finding" },
    "tingling": { code: "62507009", display: "Paresthesia", category: "Finding" },
    "weakness": { code: "13791008", display: "Asthenia", category: "Finding" },
    "loss of appetite": { code: "79890006", display: "Loss of appetite", category: "Finding" },
    "weight loss": { code: "89362005", display: "Weight loss", category: "Finding" },
    "chills": { code: "43724002", display: "Chills", category: "Finding" },
    "sweating": { code: "415690000", display: "Sweating", category: "Finding" },
    "palpitations": { code: "80313002", display: "Palpitations", category: "Finding" },
    "insomnia": { code: "193462001", display: "Insomnia", category: "Finding" },
    "anxiety": { code: "48694002", display: "Anxiety", category: "Finding" },
    "depression": { code: "35489007", display: "Depressive disorder", category: "Finding" },
    "confusion": { code: "40917007", display: "Confusion", category: "Finding" },
    "memory problems": { code: "386807006", display: "Memory impairment", category: "Finding" },
    "blurred vision": { code: "246636008", display: "Blurred vision", category: "Finding" },
    "eye pain": { code: "41652007", display: "Eye pain", category: "Finding" },
    "ear pain": { code: "16001004", display: "Otalgia", category: "Finding" },
    "hearing loss": { code: "15188001", display: "Hearing loss", category: "Finding" },
    "hoarseness": { code: "50219008", display: "Hoarseness", category: "Finding" },
    "difficulty swallowing": { code: "40739000", display: "Dysphagia", category: "Finding" },
    "heartburn": { code: "16331000", display: "Heartburn", category: "Finding" },
    "bloating": { code: "249497008", display: "Abdominal bloating", category: "Finding" },
    "constipation": { code: "14760008", display: "Constipation", category: "Finding" },
    "blood in stool": { code: "405729008", display: "Hematochezia", category: "Finding" },
    "blood in urine": { code: "34436003", display: "Hematuria", category: "Finding" },
    "frequent urination": { code: "162116003", display: "Urinary frequency", category: "Finding" },
    "painful urination": { code: "49650001", display: "Dysuria", category: "Finding" },
    "menstrual pain": { code: "431237007", display: "Dysmenorrhea", category: "Finding" },
};

// ICD-10-CM Diagnosis Codes
export interface ICD10Code {
    code: string;
    display: string;
    category: string;
    chapter: string;
}

export const icd10Codes: Record<string, ICD10Code> = {
    // Respiratory Infections
    "common_cold": { code: "J00", display: "Acute nasopharyngitis (common cold)", category: "Respiratory", chapter: "X" },
    "influenza": { code: "J10.1", display: "Influenza with other respiratory manifestations", category: "Respiratory", chapter: "X" },
    "covid19": { code: "U07.1", display: "COVID-19", category: "Infectious", chapter: "XXII" },
    "bronchitis": { code: "J20.9", display: "Acute bronchitis, unspecified", category: "Respiratory", chapter: "X" },
    "pneumonia": { code: "J18.9", display: "Pneumonia, unspecified organism", category: "Respiratory", chapter: "X" },
    "sinusitis": { code: "J01.90", display: "Acute sinusitis, unspecified", category: "Respiratory", chapter: "X" },
    "pharyngitis": { code: "J02.9", display: "Acute pharyngitis, unspecified", category: "Respiratory", chapter: "X" },
    "tonsillitis": { code: "J03.90", display: "Acute tonsillitis, unspecified", category: "Respiratory", chapter: "X" },
    "laryngitis": { code: "J04.0", display: "Acute laryngitis", category: "Respiratory", chapter: "X" },
    "asthma": { code: "J45.909", display: "Unspecified asthma, uncomplicated", category: "Respiratory", chapter: "X" },

    // Gastrointestinal
    "gastroenteritis": { code: "A09", display: "Infectious gastroenteritis and colitis", category: "Gastrointestinal", chapter: "I" },
    "food_poisoning": { code: "A05.9", display: "Bacterial foodborne intoxication", category: "Gastrointestinal", chapter: "I" },
    "gerd": { code: "K21.0", display: "Gastro-esophageal reflux disease", category: "Gastrointestinal", chapter: "XI" },
    "gastritis": { code: "K29.70", display: "Gastritis, unspecified", category: "Gastrointestinal", chapter: "XI" },
    "ibs": { code: "K58.9", display: "Irritable bowel syndrome", category: "Gastrointestinal", chapter: "XI" },
    "appendicitis": { code: "K35.80", display: "Unspecified acute appendicitis", category: "Gastrointestinal", chapter: "XI" },

    // Cardiovascular
    "hypertension": { code: "I10", display: "Essential (primary) hypertension", category: "Cardiovascular", chapter: "IX" },
    "heart_failure": { code: "I50.9", display: "Heart failure, unspecified", category: "Cardiovascular", chapter: "IX" },
    "angina": { code: "I20.9", display: "Angina pectoris, unspecified", category: "Cardiovascular", chapter: "IX" },
    "myocardial_infarction": { code: "I21.9", display: "Acute myocardial infarction", category: "Cardiovascular", chapter: "IX" },
    "atrial_fibrillation": { code: "I48.91", display: "Unspecified atrial fibrillation", category: "Cardiovascular", chapter: "IX" },

    // Neurological
    "migraine": { code: "G43.909", display: "Migraine, unspecified", category: "Neurological", chapter: "VI" },
    "tension_headache": { code: "G44.209", display: "Tension-type headache", category: "Neurological", chapter: "VI" },
    "stroke": { code: "I63.9", display: "Cerebral infarction, unspecified", category: "Neurological", chapter: "IX" },
    "epilepsy": { code: "G40.909", display: "Epilepsy, unspecified", category: "Neurological", chapter: "VI" },
    "peripheral_neuropathy": { code: "G62.9", display: "Polyneuropathy, unspecified", category: "Neurological", chapter: "VI" },

    // Musculoskeletal
    "osteoarthritis": { code: "M19.90", display: "Unspecified osteoarthritis", category: "Musculoskeletal", chapter: "XIII" },
    "rheumatoid_arthritis": { code: "M06.9", display: "Rheumatoid arthritis", category: "Musculoskeletal", chapter: "XIII" },
    "low_back_pain": { code: "M54.5", display: "Low back pain", category: "Musculoskeletal", chapter: "XIII" },
    "fibromyalgia": { code: "M79.7", display: "Fibromyalgia", category: "Musculoskeletal", chapter: "XIII" },

    // Mental Health
    "anxiety_disorder": { code: "F41.9", display: "Anxiety disorder, unspecified", category: "Mental Health", chapter: "V" },
    "depression_major": { code: "F32.9", display: "Major depressive disorder", category: "Mental Health", chapter: "V" },
    "panic_disorder": { code: "F41.0", display: "Panic disorder", category: "Mental Health", chapter: "V" },
    "insomnia_disorder": { code: "G47.00", display: "Insomnia, unspecified", category: "Mental Health", chapter: "VI" },

    // Dermatological
    "eczema": { code: "L30.9", display: "Dermatitis, unspecified", category: "Dermatological", chapter: "XII" },
    "psoriasis": { code: "L40.9", display: "Psoriasis, unspecified", category: "Dermatological", chapter: "XII" },
    "urticaria": { code: "L50.9", display: "Urticaria, unspecified", category: "Dermatological", chapter: "XII" },
    "cellulitis": { code: "L03.90", display: "Cellulitis, unspecified", category: "Dermatological", chapter: "XII" },

    // Endocrine
    "diabetes_type2": { code: "E11.9", display: "Type 2 diabetes mellitus", category: "Endocrine", chapter: "IV" },
    "hypothyroidism": { code: "E03.9", display: "Hypothyroidism, unspecified", category: "Endocrine", chapter: "IV" },
    "hyperthyroidism": { code: "E05.90", display: "Thyrotoxicosis, unspecified", category: "Endocrine", chapter: "IV" },

    // Infectious
    "uti": { code: "N39.0", display: "Urinary tract infection", category: "Infectious", chapter: "XIV" },
    "conjunctivitis": { code: "H10.9", display: "Unspecified conjunctivitis", category: "Infectious", chapter: "VII" },
    "otitis_media": { code: "H66.90", display: "Otitis media, unspecified", category: "Infectious", chapter: "VIII" },
    "dental_abscess": { code: "K04.7", display: "Periapical abscess", category: "Infectious", chapter: "XI" },
};

// RxNorm Medication Codes
export interface RxNormCode {
    rxcui: string;
    name: string;
    category: string;
    otcAvailable: boolean;
}

export const rxnormCodes: Record<string, RxNormCode> = {
    // Pain Relievers
    "acetaminophen": { rxcui: "161", name: "Acetaminophen (Paracetamol)", category: "Analgesic", otcAvailable: true },
    "ibuprofen": { rxcui: "5640", name: "Ibuprofen", category: "NSAID", otcAvailable: true },
    "aspirin": { rxcui: "1191", name: "Aspirin", category: "NSAID/Antiplatelet", otcAvailable: true },
    "naproxen": { rxcui: "7258", name: "Naproxen", category: "NSAID", otcAvailable: true },

    // Antihistamines
    "cetirizine": { rxcui: "20610", name: "Cetirizine", category: "Antihistamine", otcAvailable: true },
    "loratadine": { rxcui: "28889", name: "Loratadine", category: "Antihistamine", otcAvailable: true },
    "diphenhydramine": { rxcui: "3498", name: "Diphenhydramine", category: "Antihistamine", otcAvailable: true },
    "fexofenadine": { rxcui: "26225", name: "Fexofenadine", category: "Antihistamine", otcAvailable: true },

    // Cough & Cold
    "dextromethorphan": { rxcui: "3289", name: "Dextromethorphan", category: "Antitussive", otcAvailable: true },
    "guaifenesin": { rxcui: "5032", name: "Guaifenesin", category: "Expectorant", otcAvailable: true },
    "pseudoephedrine": { rxcui: "8896", name: "Pseudoephedrine", category: "Decongestant", otcAvailable: true },
    "phenylephrine": { rxcui: "8163", name: "Phenylephrine", category: "Decongestant", otcAvailable: true },

    // Gastrointestinal
    "omeprazole": { rxcui: "7646", name: "Omeprazole", category: "PPI", otcAvailable: true },
    "ranitidine": { rxcui: "9143", name: "Famotidine", category: "H2 Blocker", otcAvailable: true },
    "loperamide": { rxcui: "6468", name: "Loperamide", category: "Antidiarrheal", otcAvailable: true },
    "bismuth_subsalicylate": { rxcui: "1356", name: "Bismuth Subsalicylate", category: "Antidiarrheal", otcAvailable: true },
    "antacid": { rxcui: "18600", name: "Calcium Carbonate", category: "Antacid", otcAvailable: true },

    // Topical
    "hydrocortisone": { rxcui: "5492", name: "Hydrocortisone", category: "Corticosteroid", otcAvailable: true },
    "bacitracin": { rxcui: "1291", name: "Bacitracin", category: "Antibiotic", otcAvailable: true },
    "clotrimazole": { rxcui: "2623", name: "Clotrimazole", category: "Antifungal", otcAvailable: true },
};

// LOINC Codes for Lab Tests
export interface LOINCCode {
    code: string;
    name: string;
    category: string;
}

export const loincCodes: Record<string, LOINCCode> = {
    "temperature": { code: "8310-5", name: "Body temperature", category: "Vital Signs" },
    "heart_rate": { code: "8867-4", name: "Heart rate", category: "Vital Signs" },
    "blood_pressure_systolic": { code: "8480-6", name: "Systolic blood pressure", category: "Vital Signs" },
    "blood_pressure_diastolic": { code: "8462-4", name: "Diastolic BP", category: "Vital Signs" },
    "respiratory_rate": { code: "9279-1", name: "Respiratory rate", category: "Vital Signs" },
    "oxygen_saturation": { code: "2708-6", name: "Oxygen saturation", category: "Vital Signs" },
    "blood_glucose": { code: "2339-0", name: "Glucose [Mass/volume] in Blood", category: "Chemistry" },
    "hemoglobin": { code: "718-7", name: "Hemoglobin", category: "Hematology" },
    "wbc": { code: "6690-2", name: "Leukocytes [#/volume] in Blood", category: "Hematology" },
    "creatinine": { code: "2160-0", name: "Creatinine [Mass/volume] in Serum", category: "Chemistry" },
};

// Symptom to Medical Intent Mapping
export interface MedicalIntent {
    id: string;
    name: string;
    description: string;
    specialtyNeeded: string;
    urgencyHint: "low" | "medium" | "high" | "emergency";
    typicalActions: string[];
}

export const medicalIntents: Record<string, MedicalIntent> = {
    "respiratory_infection_mild": {
        id: "resp_inf_mild",
        name: "Suspected mild upper respiratory infection",
        description: "Common cold or viral URI symptoms",
        specialtyNeeded: "Primary Care",
        urgencyHint: "low",
        typicalActions: ["Self-care instructions", "Symptom monitoring", "OTC medications"]
    },
    "respiratory_infection_moderate": {
        id: "resp_inf_mod",
        name: "Respiratory infection requiring evaluation",
        description: "URI with concerning features",
        specialtyNeeded: "Primary Care",
        urgencyHint: "medium",
        typicalActions: ["Doctor visit within 24-48h", "Possible testing", "Prescription if bacterial"]
    },
    "gastrointestinal_acute": {
        id: "gi_acute",
        name: "Acute gastrointestinal symptoms",
        description: "Gastroenteritis or food poisoning symptoms",
        specialtyNeeded: "Primary Care",
        urgencyHint: "low",
        typicalActions: ["Hydration", "BRAT diet", "Monitor for dehydration"]
    },
    "cardiac_emergency": {
        id: "cardiac_emergency",
        name: "Possible cardiac emergency",
        description: "Chest pain with concerning features",
        specialtyNeeded: "Emergency Medicine",
        urgencyHint: "emergency",
        typicalActions: ["Call emergency services immediately", "Do not delay"]
    },
    "neurological_emergency": {
        id: "neuro_emergency",
        name: "Possible stroke or neurological emergency",
        description: "Sudden neurological symptoms",
        specialtyNeeded: "Emergency Medicine",
        urgencyHint: "emergency",
        typicalActions: ["Call emergency services immediately", "Note symptom onset time"]
    },
    "allergic_reaction": {
        id: "allergic_mild",
        name: "Allergic reaction",
        description: "Mild to moderate allergic symptoms",
        specialtyNeeded: "Primary Care/Allergy",
        urgencyHint: "medium",
        typicalActions: ["Antihistamines", "Remove allergen", "Monitor for worsening"]
    },
    "anaphylaxis": {
        id: "anaphylaxis",
        name: "Possible anaphylaxis",
        description: "Severe allergic reaction",
        specialtyNeeded: "Emergency Medicine",
        urgencyHint: "emergency",
        typicalActions: ["Use epinephrine if available", "Call emergency services"]
    },
    "mental_health_crisis": {
        id: "mh_crisis",
        name: "Mental health crisis",
        description: "Acute psychological distress",
        specialtyNeeded: "Psychiatry/Crisis Services",
        urgencyHint: "high",
        typicalActions: ["Crisis helpline", "Immediate mental health evaluation"]
    },
    "chronic_management": {
        id: "chronic_mgmt",
        name: "Chronic condition management",
        description: "Ongoing condition requiring routine care",
        specialtyNeeded: "Primary Care/Specialist",
        urgencyHint: "low",
        typicalActions: ["Routine follow-up", "Medication review", "Lifestyle modification"]
    },
    "preventive_care": {
        id: "preventive",
        name: "Preventive care recommendation",
        description: "Health maintenance and screening",
        specialtyNeeded: "Primary Care",
        urgencyHint: "low",
        typicalActions: ["Schedule wellness visit", "Age-appropriate screenings"]
    }
};

// Helper function to get SNOMED code for a symptom
export function getSnomedCode(symptom: string): SnomedCode | null {
    const normalized = symptom.toLowerCase().trim();
    return snomedSymptomCodes[normalized] || null;
}

// Helper function to get ICD-10 code for a condition
export function getICD10Code(condition: string): ICD10Code | null {
    const normalized = condition.toLowerCase().replace(/\s+/g, '_').trim();
    return icd10Codes[normalized] || null;
}

// Helper function to get RxNorm code for a medication
export function getRxNormCode(medication: string): RxNormCode | null {
    const normalized = medication.toLowerCase().replace(/\s+/g, '_').trim();
    return rxnormCodes[normalized] || null;
}

export default {
    snomedSymptomCodes,
    icd10Codes,
    rxnormCodes,
    loincCodes,
    medicalIntents,
    getSnomedCode,
    getICD10Code,
    getRxNormCode
};
