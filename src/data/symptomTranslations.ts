// Common symptom translations for multi-language search
export const symptomTranslations: Record<string, { en: string; es: string; hi: string; fr: string }> = {
  // General symptoms
  "fever": { en: "fever", es: "fiebre", hi: "बुखार", fr: "fièvre" },
  "headache": { en: "headache", es: "dolor de cabeza", hi: "सिरदर्द", fr: "mal de tête" },
  "fatigue": { en: "fatigue", es: "fatiga", hi: "थकान", fr: "fatigue" },
  "weakness": { en: "weakness", es: "debilidad", hi: "कमजोरी", fr: "faiblesse" },
  "chills": { en: "chills", es: "escalofríos", hi: "ठंड लगना", fr: "frissons" },
  "sweating": { en: "sweating", es: "sudoración", hi: "पसीना", fr: "transpiration" },
  "nausea": { en: "nausea", es: "náuseas", hi: "मतली", fr: "nausée" },
  "vomiting": { en: "vomiting", es: "vómitos", hi: "उल्टी", fr: "vomissements" },
  "dizziness": { en: "dizziness", es: "mareo", hi: "चक्कर आना", fr: "vertige" },
  "pain": { en: "pain", es: "dolor", hi: "दर्द", fr: "douleur" },
  
  // Respiratory
  "cough": { en: "cough", es: "tos", hi: "खांसी", fr: "toux" },
  "sore throat": { en: "sore throat", es: "dolor de garganta", hi: "गले में खराश", fr: "mal de gorge" },
  "runny nose": { en: "runny nose", es: "secreción nasal", hi: "बहती नाक", fr: "nez qui coule" },
  "congestion": { en: "congestion", es: "congestión", hi: "जमाव", fr: "congestion" },
  "sneezing": { en: "sneezing", es: "estornudos", hi: "छींक", fr: "éternuements" },
  "shortness of breath": { en: "shortness of breath", es: "dificultad para respirar", hi: "सांस लेने में तकलीफ", fr: "essoufflement" },
  "wheezing": { en: "wheezing", es: "sibilancias", hi: "घरघराहट", fr: "respiration sifflante" },
  
  // Digestive
  "stomach pain": { en: "stomach pain", es: "dolor de estómago", hi: "पेट दर्द", fr: "douleur à l'estomac" },
  "diarrhea": { en: "diarrhea", es: "diarrea", hi: "दस्त", fr: "diarrhée" },
  "constipation": { en: "constipation", es: "estreñimiento", hi: "कब्ज", fr: "constipation" },
  "bloating": { en: "bloating", es: "hinchazón", hi: "सूजन", fr: "ballonnement" },
  "heartburn": { en: "heartburn", es: "acidez", hi: "सीने में जलन", fr: "brûlures d'estomac" },
  "loss of appetite": { en: "loss of appetite", es: "pérdida de apetito", hi: "भूख न लगना", fr: "perte d'appétit" },
  
  // Skin
  "rash": { en: "rash", es: "erupción", hi: "चकत्ते", fr: "éruption cutanée" },
  "itching": { en: "itching", es: "picazón", hi: "खुजली", fr: "démangeaisons" },
  "swelling": { en: "swelling", es: "hinchazón", hi: "सूजन", fr: "gonflement" },
  "redness": { en: "redness", es: "enrojecimiento", hi: "लालिमा", fr: "rougeur" },
  "dry skin": { en: "dry skin", es: "piel seca", hi: "रूखी त्वचा", fr: "peau sèche" },
  
  // Musculoskeletal
  "muscle pain": { en: "muscle pain", es: "dolor muscular", hi: "मांसपेशियों में दर्द", fr: "douleur musculaire" },
  "joint pain": { en: "joint pain", es: "dolor articular", hi: "जोड़ों का दर्द", fr: "douleur articulaire" },
  "back pain": { en: "back pain", es: "dolor de espalda", hi: "पीठ दर्द", fr: "mal de dos" },
  "stiffness": { en: "stiffness", es: "rigidez", hi: "अकड़न", fr: "raideur" },
  
  // Neurological
  "confusion": { en: "confusion", es: "confusión", hi: "भ्रम", fr: "confusion" },
  "memory loss": { en: "memory loss", es: "pérdida de memoria", hi: "याददाश्त की कमी", fr: "perte de mémoire" },
  "numbness": { en: "numbness", es: "entumecimiento", hi: "सुन्नपन", fr: "engourdissement" },
  "tingling": { en: "tingling", es: "hormigueo", hi: "झुनझुनी", fr: "picotements" },
  
  // Cardiovascular
  "chest pain": { en: "chest pain", es: "dolor de pecho", hi: "सीने में दर्द", fr: "douleur thoracique" },
  "palpitations": { en: "palpitations", es: "palpitaciones", hi: "धड़कन", fr: "palpitations" },
  "high blood pressure": { en: "high blood pressure", es: "presión arterial alta", hi: "उच्च रक्तचाप", fr: "hypertension" },
  
  // Mental Health
  "anxiety": { en: "anxiety", es: "ansiedad", hi: "चिंता", fr: "anxiété" },
  "depression": { en: "depression", es: "depresión", hi: "अवसाद", fr: "dépression" },
  "insomnia": { en: "insomnia", es: "insomnio", hi: "अनिद्रा", fr: "insomnie" },
  "stress": { en: "stress", es: "estrés", hi: "तनाव", fr: "stress" },
  
  // Eye
  "blurred vision": { en: "blurred vision", es: "visión borrosa", hi: "धुंधली दृष्टि", fr: "vision floue" },
  "eye pain": { en: "eye pain", es: "dolor de ojos", hi: "आँख में दर्द", fr: "douleur oculaire" },
  "red eyes": { en: "red eyes", es: "ojos rojos", hi: "लाल आँखें", fr: "yeux rouges" },
  
  // Ear
  "ear pain": { en: "ear pain", es: "dolor de oído", hi: "कान में दर्द", fr: "douleur à l'oreille" },
  "hearing loss": { en: "hearing loss", es: "pérdida de audición", hi: "सुनने में कमी", fr: "perte auditive" },
  "ringing in ears": { en: "ringing in ears", es: "zumbido en los oídos", hi: "कान में घंटी बजना", fr: "acouphènes" },
  
  // Urinary
  "frequent urination": { en: "frequent urination", es: "micción frecuente", hi: "बार-बार पेशाब आना", fr: "miction fréquente" },
  "burning urination": { en: "burning urination", es: "ardor al orinar", hi: "पेशाब में जलन", fr: "brûlure à la miction" },
  "blood in urine": { en: "blood in urine", es: "sangre en la orina", hi: "पेशाब में खून", fr: "sang dans les urines" },
};

// Condition name translations
export const conditionNameTranslations: Record<string, { en: string; es: string; hi: string; fr: string }> = {
  "fever": { en: "Fever", es: "Fiebre", hi: "बुखार", fr: "Fièvre" },
  "common-cold": { en: "Common Cold", es: "Resfriado Común", hi: "सामान्य सर्दी", fr: "Rhume" },
  "flu": { en: "Influenza (Flu)", es: "Gripe", hi: "फ्लू", fr: "Grippe" },
  "covid-19": { en: "COVID-19", es: "COVID-19", hi: "कोविड-19", fr: "COVID-19" },
  "strep-throat": { en: "Strep Throat", es: "Faringitis Estreptocócica", hi: "स्ट्रेप थ्रोट", fr: "Angine streptococcique" },
  "bronchitis": { en: "Bronchitis", es: "Bronquitis", hi: "ब्रोंकाइटिस", fr: "Bronchite" },
  "pneumonia": { en: "Pneumonia", es: "Neumonía", hi: "निमोनिया", fr: "Pneumonie" },
  "asthma": { en: "Asthma", es: "Asma", hi: "दमा", fr: "Asthme" },
  "sinusitis": { en: "Sinusitis", es: "Sinusitis", hi: "साइनसाइटिस", fr: "Sinusite" },
  "allergies": { en: "Allergies", es: "Alergias", hi: "एलर्जी", fr: "Allergies" },
  "diabetes": { en: "Diabetes", es: "Diabetes", hi: "मधुमेह", fr: "Diabète" },
  "hypertension": { en: "Hypertension", es: "Hipertensión", hi: "उच्च रक्तचाप", fr: "Hypertension" },
  "heart-disease": { en: "Heart Disease", es: "Enfermedad Cardíaca", hi: "हृदय रोग", fr: "Maladie cardiaque" },
  "migraine": { en: "Migraine", es: "Migraña", hi: "माइग्रेन", fr: "Migraine" },
  "gastritis": { en: "Gastritis", es: "Gastritis", hi: "गैस्ट्राइटिस", fr: "Gastrite" },
  "ibs": { en: "Irritable Bowel Syndrome", es: "Síndrome del Intestino Irritable", hi: "चिड़चिड़ा आंत्र सिंड्रोम", fr: "Syndrome du côlon irritable" },
  "arthritis": { en: "Arthritis", es: "Artritis", hi: "गठिया", fr: "Arthrite" },
  "back-pain": { en: "Back Pain", es: "Dolor de Espalda", hi: "पीठ दर्द", fr: "Mal de dos" },
  "depression": { en: "Depression", es: "Depresión", hi: "अवसाद", fr: "Dépression" },
  "anxiety": { en: "Anxiety", es: "Ansiedad", hi: "चिंता", fr: "Anxiété" },
  "eczema": { en: "Eczema", es: "Eczema", hi: "एक्जिमा", fr: "Eczéma" },
  "acne": { en: "Acne", es: "Acné", hi: "मुँहासे", fr: "Acné" },
  "uti": { en: "Urinary Tract Infection", es: "Infección del Tracto Urinario", hi: "मूत्र पथ संक्रमण", fr: "Infection urinaire" },
  "kidney-stones": { en: "Kidney Stones", es: "Cálculos Renales", hi: "गुर्दे की पथरी", fr: "Calculs rénaux" },
  "anemia": { en: "Anemia", es: "Anemia", hi: "एनीमिया", fr: "Anémie" },
  "thyroid": { en: "Thyroid Disorders", es: "Trastornos de Tiroides", hi: "थायराइड विकार", fr: "Troubles de la thyroïde" },
  "dengue": { en: "Dengue", es: "Dengue", hi: "डेंगू", fr: "Dengue" },
  "malaria": { en: "Malaria", es: "Malaria", hi: "मलेरिया", fr: "Paludisme" },
  "typhoid": { en: "Typhoid", es: "Tifoidea", hi: "टाइफाइड", fr: "Typhoïde" },
  "tuberculosis": { en: "Tuberculosis", es: "Tuberculosis", hi: "तपेदिक", fr: "Tuberculose" },
  "hepatitis": { en: "Hepatitis", es: "Hepatitis", hi: "हेपेटाइटिस", fr: "Hépatite" },
  "chickenpox": { en: "Chickenpox", es: "Varicela", hi: "चिकनपॉक्स", fr: "Varicelle" },
  "measles": { en: "Measles", es: "Sarampión", hi: "खसरा", fr: "Rougeole" },
  "mumps": { en: "Mumps", es: "Paperas", hi: "गलसुआ", fr: "Oreillons" },
  "conjunctivitis": { en: "Conjunctivitis", es: "Conjuntivitis", hi: "आँख आना", fr: "Conjonctivite" },
  "glaucoma": { en: "Glaucoma", es: "Glaucoma", hi: "काला मोतिया", fr: "Glaucome" },
  "cataracts": { en: "Cataracts", es: "Cataratas", hi: "मोतियाबिंद", fr: "Cataracte" },
  "ear-infection": { en: "Ear Infection", es: "Infección de Oído", hi: "कान का संक्रमण", fr: "Infection de l'oreille" },
  "tonsillitis": { en: "Tonsillitis", es: "Amigdalitis", hi: "टॉन्सिलाइटिस", fr: "Amygdalite" },
  "food-poisoning": { en: "Food Poisoning", es: "Intoxicación Alimentaria", hi: "खाद्य विषाक्तता", fr: "Intoxication alimentaire" },
  "appendicitis": { en: "Appendicitis", es: "Apendicitis", hi: "अपेंडिसाइटिस", fr: "Appendicite" },
  "hemorrhoids": { en: "Hemorrhoids", es: "Hemorroides", hi: "बवासीर", fr: "Hémorroïdes" },
  "gallstones": { en: "Gallstones", es: "Cálculos Biliares", hi: "पित्त की पथरी", fr: "Calculs biliaires" },
  "hernia": { en: "Hernia", es: "Hernia", hi: "हर्निया", fr: "Hernie" },
  "osteoporosis": { en: "Osteoporosis", es: "Osteoporosis", hi: "ऑस्टियोपोरोसिस", fr: "Ostéoporose" },
  "sciatica": { en: "Sciatica", es: "Ciática", hi: "साइटिका", fr: "Sciatique" },
  "carpal-tunnel": { en: "Carpal Tunnel Syndrome", es: "Síndrome del Túnel Carpiano", hi: "कार्पल टनल सिंड्रोम", fr: "Syndrome du canal carpien" },
  "gout": { en: "Gout", es: "Gota", hi: "गाउट", fr: "Goutte" },
  "fibromyalgia": { en: "Fibromyalgia", es: "Fibromialgia", hi: "फाइब्रोमायल्जिया", fr: "Fibromyalgie" },
  "epilepsy": { en: "Epilepsy", es: "Epilepsia", hi: "मिर्गी", fr: "Épilepsie" },
  "parkinsons": { en: "Parkinson's Disease", es: "Enfermedad de Parkinson", hi: "पार्किंसंस रोग", fr: "Maladie de Parkinson" },
  "alzheimers": { en: "Alzheimer's Disease", es: "Enfermedad de Alzheimer", hi: "अल्जाइमर रोग", fr: "Maladie d'Alzheimer" },
  "stroke": { en: "Stroke", es: "Accidente Cerebrovascular", hi: "स्ट्रोक", fr: "AVC" },
  "insomnia": { en: "Insomnia", es: "Insomnio", hi: "अनिद्रा", fr: "Insomnie" },
  "bipolar": { en: "Bipolar Disorder", es: "Trastorno Bipolar", hi: "द्विध्रुवी विकार", fr: "Trouble bipolaire" },
  "ptsd": { en: "PTSD", es: "TEPT", hi: "पीटीएसडी", fr: "SSPT" },
  "ocd": { en: "OCD", es: "TOC", hi: "ओसीडी", fr: "TOC" },
  "psoriasis": { en: "Psoriasis", es: "Psoriasis", hi: "सोरायसिस", fr: "Psoriasis" },
  "vitiligo": { en: "Vitiligo", es: "Vitiligo", hi: "विटिलिगो", fr: "Vitiligo" },
  "shingles": { en: "Shingles", es: "Herpes Zóster", hi: "दाद", fr: "Zona" },
  "ringworm": { en: "Ringworm", es: "Tiña", hi: "दाद", fr: "Teigne" },
  "scabies": { en: "Scabies", es: "Sarna", hi: "खुजली", fr: "Gale" },
  "lice": { en: "Lice", es: "Piojos", hi: "जूँ", fr: "Poux" },
  "hives": { en: "Hives", es: "Urticaria", hi: "पित्ती", fr: "Urticaire" },
  "sunburn": { en: "Sunburn", es: "Quemadura Solar", hi: "धूप से जलन", fr: "Coup de soleil" },
  "sprains": { en: "Sprains", es: "Esguinces", hi: "मोच", fr: "Entorses" },
  "fractures": { en: "Fractures", es: "Fracturas", hi: "हड्डी टूटना", fr: "Fractures" },
};

// Category translations
export const categoryTranslations: Record<string, { en: string; es: string; hi: string; fr: string }> = {
  "Common Infections": { en: "Common Infections", es: "Infecciones Comunes", hi: "सामान्य संक्रमण", fr: "Infections courantes" },
  "Respiratory": { en: "Respiratory", es: "Respiratorio", hi: "श्वसन", fr: "Respiratoire" },
  "Digestive": { en: "Digestive", es: "Digestivo", hi: "पाचन", fr: "Digestif" },
  "Cardiovascular": { en: "Cardiovascular", es: "Cardiovascular", hi: "हृदय संबंधी", fr: "Cardiovasculaire" },
  "Skin": { en: "Skin", es: "Piel", hi: "त्वचा", fr: "Peau" },
  "Mental Health": { en: "Mental Health", es: "Salud Mental", hi: "मानसिक स्वास्थ्य", fr: "Santé mentale" },
  "Musculoskeletal": { en: "Musculoskeletal", es: "Musculoesquelético", hi: "मांसपेशी और हड्डी", fr: "Musculo-squelettique" },
  "Neurological": { en: "Neurological", es: "Neurológico", hi: "तंत्रिका संबंधी", fr: "Neurologique" },
  "Infectious Diseases": { en: "Infectious Diseases", es: "Enfermedades Infecciosas", hi: "संक्रामक रोग", fr: "Maladies infectieuses" },
  "Metabolic": { en: "Metabolic", es: "Metabólico", hi: "चयापचय", fr: "Métabolique" },
  "Eye": { en: "Eye", es: "Ojos", hi: "आँख", fr: "Oeil" },
  "ENT": { en: "ENT", es: "ORL", hi: "कान-नाक-गला", fr: "ORL" },
  "Urinary": { en: "Urinary", es: "Urinario", hi: "मूत्र", fr: "Urinaire" },
  "Women's Health": { en: "Women's Health", es: "Salud de la Mujer", hi: "महिला स्वास्थ्य", fr: "Santé des femmes" },
  "General": { en: "General", es: "General", hi: "सामान्य", fr: "Général" },
  "Immune System": { en: "Immune System", es: "Sistema Inmunológico", hi: "प्रतिरक्षा प्रणाली", fr: "Système immunitaire" },
};

// Helper function to search symptoms in all languages
export function searchInAllLanguages(query: string, currentLang: string): string[] {
  const normalizedQuery = query.toLowerCase().trim();
  const matchingEnglishTerms: string[] = [];
  
  // Search through symptom translations
  Object.entries(symptomTranslations).forEach(([key, translations]) => {
    const allTerms = Object.values(translations).map(t => t.toLowerCase());
    if (allTerms.some(term => term.includes(normalizedQuery) || normalizedQuery.includes(term))) {
      matchingEnglishTerms.push(translations.en.toLowerCase());
    }
  });
  
  // Search through condition name translations
  Object.entries(conditionNameTranslations).forEach(([key, translations]) => {
    const allTerms = Object.values(translations).map(t => t.toLowerCase());
    if (allTerms.some(term => term.includes(normalizedQuery) || normalizedQuery.includes(term))) {
      matchingEnglishTerms.push(translations.en.toLowerCase());
    }
  });
  
  // Search through category translations
  Object.entries(categoryTranslations).forEach(([key, translations]) => {
    const allTerms = Object.values(translations).map(t => t.toLowerCase());
    if (allTerms.some(term => term.includes(normalizedQuery) || normalizedQuery.includes(term))) {
      matchingEnglishTerms.push(translations.en.toLowerCase());
    }
  });
  
  return [...new Set(matchingEnglishTerms)];
}

// Get translated condition name
export function getTranslatedName(conditionId: string, lang: string): string | undefined {
  const translations = conditionNameTranslations[conditionId];
  if (!translations) return undefined;
  return translations[lang as keyof typeof translations] || translations.en;
}

// Get translated category
export function getTranslatedCategory(category: string, lang: string): string {
  const translations = categoryTranslations[category];
  if (!translations) return category;
  return translations[lang as keyof typeof translations] || translations.en;
}
