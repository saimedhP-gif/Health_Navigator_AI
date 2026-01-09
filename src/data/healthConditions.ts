export interface HealthCondition {
  id: string;
  name: string;
  nameHi?: string;
  nameEs?: string;
  nameFr?: string;
  category: string;
  icon: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  whenToSeeDoctor: string[];
}

export const healthConditions: HealthCondition[] = [
  // Common Infections
  {
    id: "fever",
    name: "Fever",
    category: "Common Infections",
    icon: "🌡️",
    description: "An elevated body temperature, usually a sign that your body is fighting an infection. Normal body temperature is around 98.6°F (37°C).",
    symptoms: ["Elevated body temperature (above 100.4°F/38°C)", "Chills and shivering", "Sweating", "Headache", "Muscle aches", "Loss of appetite", "Dehydration", "Weakness"],
    prevention: ["Wash hands frequently", "Avoid close contact with sick people", "Get recommended vaccinations", "Maintain good hygiene", "Stay hydrated"],
    whenToSeeDoctor: ["Fever above 103°F (39.4°C)", "Fever lasting more than 3 days", "Severe headache with stiff neck", "Difficulty breathing", "Confusion or unusual behavior", "Persistent vomiting"]
  },
  {
    id: "common-cold",
    name: "Common Cold",
    category: "Common Infections",
    icon: "🤧",
    description: "A viral infection of the upper respiratory tract. It's usually harmless and resolves on its own within 7-10 days.",
    symptoms: ["Runny or stuffy nose", "Sore throat", "Cough", "Congestion", "Slight body aches", "Sneezing", "Low-grade fever", "Mild fatigue"],
    prevention: ["Wash hands frequently", "Avoid touching face", "Stay away from sick people", "Disinfect frequently touched surfaces", "Maintain healthy immune system"],
    whenToSeeDoctor: ["Symptoms lasting more than 10 days", "High fever (above 101.3°F)", "Severe sore throat", "Worsening symptoms after improvement", "Shortness of breath"]
  },
  {
    id: "flu",
    name: "Influenza (Flu)",
    category: "Common Infections",
    icon: "😷",
    description: "A contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness and sometimes death.",
    symptoms: ["High fever", "Severe body aches", "Extreme fatigue", "Dry cough", "Headache", "Chills", "Sore throat", "Runny nose"],
    prevention: ["Get annual flu vaccine", "Wash hands frequently", "Avoid close contact with sick people", "Cover coughs and sneezes", "Stay home when sick"],
    whenToSeeDoctor: ["Difficulty breathing", "Chest pain", "Confusion", "Severe vomiting", "Symptoms that improve then return worse", "High-risk individuals (elderly, pregnant, chronic conditions)"]
  },
  {
    id: "covid-19",
    name: "COVID-19",
    category: "Common Infections",
    icon: "🦠",
    description: "A respiratory illness caused by the SARS-CoV-2 coronavirus. Symptoms range from mild to severe.",
    symptoms: ["Fever or chills", "Cough", "Shortness of breath", "Fatigue", "Body aches", "Loss of taste or smell", "Sore throat", "Congestion", "Headache"],
    prevention: ["Get vaccinated", "Wash hands frequently", "Wear masks in crowded spaces", "Maintain physical distance", "Ensure good ventilation", "Stay home if sick"],
    whenToSeeDoctor: ["Difficulty breathing", "Persistent chest pain", "Confusion", "Inability to stay awake", "Bluish lips or face", "Oxygen saturation below 95%"]
  },
  {
    id: "strep-throat",
    name: "Strep Throat",
    category: "Common Infections",
    icon: "🗣️",
    description: "A bacterial infection causing severe sore throat. Unlike viral sore throats, strep throat requires antibiotic treatment.",
    symptoms: ["Severe sore throat", "Painful swallowing", "Red, swollen tonsils", "White patches on tonsils", "Fever", "Swollen lymph nodes", "Headache", "Body aches"],
    prevention: ["Wash hands frequently", "Avoid sharing utensils", "Replace toothbrush after illness", "Cover coughs and sneezes"],
    whenToSeeDoctor: ["Severe sore throat lasting more than 2 days", "Difficulty swallowing or breathing", "Fever above 101°F", "Rash accompanying sore throat", "Recurrent strep infections"]
  },
  {
    id: "bronchitis",
    name: "Bronchitis",
    category: "Respiratory",
    icon: "🫁",
    description: "Inflammation of the bronchial tubes that carry air to the lungs. Can be acute (short-term) or chronic (long-lasting).",
    symptoms: ["Persistent cough", "Mucus production", "Fatigue", "Shortness of breath", "Chest discomfort", "Low fever", "Chills", "Body aches"],
    prevention: ["Avoid smoking", "Get flu vaccine", "Wash hands frequently", "Wear mask in polluted areas", "Avoid lung irritants"],
    whenToSeeDoctor: ["Cough lasting more than 3 weeks", "Blood in mucus", "High fever", "Difficulty breathing", "Wheezing", "Recurrent bronchitis episodes"]
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    category: "Respiratory",
    icon: "🏥",
    description: "An infection that inflames the air sacs in one or both lungs. Can be caused by bacteria, viruses, or fungi.",
    symptoms: ["Cough with phlegm", "Fever and chills", "Difficulty breathing", "Chest pain when breathing", "Fatigue", "Nausea or vomiting", "Confusion (in elderly)"],
    prevention: ["Get vaccinated (pneumococcal, flu)", "Wash hands frequently", "Don't smoke", "Maintain good health", "Practice good oral hygiene"],
    whenToSeeDoctor: ["Difficulty breathing", "Chest pain", "High fever (above 102°F)", "Persistent cough with pus", "Confusion", "Bluish skin color"]
  },
  {
    id: "asthma",
    name: "Asthma",
    category: "Respiratory",
    icon: "💨",
    description: "A chronic condition affecting the airways. The airways narrow and swell, producing extra mucus and making breathing difficult.",
    symptoms: ["Shortness of breath", "Chest tightness", "Wheezing when exhaling", "Coughing (especially at night)", "Difficulty sleeping due to breathing", "Fatigue during exercise"],
    prevention: ["Identify and avoid triggers", "Use air purifiers", "Take medications as prescribed", "Monitor breathing", "Get flu vaccine annually"],
    whenToSeeDoctor: ["Frequent asthma attacks", "Increasing medication use", "Symptoms not improving with inhaler", "Difficulty speaking due to breathlessness", "Blue lips or fingernails"]
  },
  {
    id: "sinusitis",
    name: "Sinusitis",
    category: "Respiratory",
    icon: "👃",
    description: "Inflammation or swelling of the tissue lining the sinuses. Can be caused by infections, allergies, or structural issues.",
    symptoms: ["Facial pain or pressure", "Nasal congestion", "Thick nasal discharge", "Reduced sense of smell", "Cough", "Ear pressure", "Headache", "Fatigue"],
    prevention: ["Manage allergies", "Use humidifier", "Avoid pollutants", "Stay hydrated", "Practice good hand hygiene"],
    whenToSeeDoctor: ["Symptoms lasting more than 10 days", "High fever", "Severe headache", "Vision changes", "Swelling around eyes", "Symptoms returning after improvement"]
  },
  {
    id: "allergies",
    name: "Allergies",
    category: "Immune System",
    icon: "🌸",
    description: "An immune system response to substances that are usually harmless. Common allergens include pollen, dust, pet dander, and certain foods.",
    symptoms: ["Sneezing", "Runny or stuffy nose", "Itchy eyes, nose, or throat", "Watery eyes", "Hives or skin rash", "Swelling", "Coughing", "Fatigue"],
    prevention: ["Identify and avoid allergens", "Keep windows closed during high pollen", "Use air purifiers", "Wash bedding frequently", "Shower after outdoor activities"],
    whenToSeeDoctor: ["Severe allergic reactions (anaphylaxis)", "Symptoms affecting daily life", "Over-the-counter medications not helping", "Recurring sinus infections", "Wheezing or difficulty breathing"]
  },
  // Digestive Issues
  {
    id: "food-poisoning",
    name: "Food Poisoning",
    category: "Digestive",
    icon: "🤢",
    description: "Illness caused by eating contaminated food. Symptoms usually begin within hours of eating the contaminated food.",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Stomach cramps", "Fever", "Headache", "Weakness", "Loss of appetite"],
    prevention: ["Wash hands before handling food", "Cook food thoroughly", "Refrigerate leftovers promptly", "Avoid cross-contamination", "Check expiration dates"],
    whenToSeeDoctor: ["Bloody diarrhea", "High fever (above 101.5°F)", "Vomiting preventing fluid intake", "Signs of dehydration", "Symptoms lasting more than 3 days", "Pregnant or elderly patients"]
  },
  {
    id: "gastritis",
    name: "Gastritis",
    category: "Digestive",
    icon: "🔥",
    description: "Inflammation of the stomach lining. Can be acute (sudden) or chronic (developing over time).",
    symptoms: ["Burning stomach pain", "Nausea", "Vomiting", "Feeling of fullness after eating", "Indigestion", "Loss of appetite", "Bloating", "Hiccups"],
    prevention: ["Avoid spicy and acidic foods", "Limit alcohol", "Don't smoke", "Manage stress", "Eat smaller, frequent meals", "Avoid NSAIDs when possible"],
    whenToSeeDoctor: ["Blood in vomit or stool", "Severe abdominal pain", "Unexplained weight loss", "Symptoms lasting more than a week", "Difficulty swallowing"]
  },
  {
    id: "acid-reflux",
    name: "Acid Reflux (GERD)",
    category: "Digestive",
    icon: "🌋",
    description: "A condition where stomach acid frequently flows back into the esophagus, causing irritation and heartburn.",
    symptoms: ["Heartburn", "Regurgitation", "Difficulty swallowing", "Chest pain", "Chronic cough", "Hoarseness", "Feeling of lump in throat", "Disrupted sleep"],
    prevention: ["Maintain healthy weight", "Avoid trigger foods", "Don't lie down after eating", "Elevate head while sleeping", "Eat smaller meals", "Quit smoking"],
    whenToSeeDoctor: ["Symptoms occurring more than twice a week", "Difficulty swallowing", "Persistent nausea or vomiting", "Unexplained weight loss", "Chest pain (rule out heart issues)"]
  },
  {
    id: "ibs",
    name: "Irritable Bowel Syndrome (IBS)",
    category: "Digestive",
    icon: "🌀",
    description: "A common disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, and changes in bowel habits.",
    symptoms: ["Abdominal cramping", "Bloating", "Gas", "Diarrhea or constipation", "Mucus in stool", "Feeling of incomplete bowel movement"],
    prevention: ["Manage stress", "Eat regular meals", "Stay hydrated", "Exercise regularly", "Identify trigger foods", "Get enough sleep"],
    whenToSeeDoctor: ["Unexplained weight loss", "Blood in stool", "Severe pain not relieved by gas or bowel movement", "Symptoms worsening at night", "Iron deficiency anemia"]
  },
  {
    id: "constipation",
    name: "Constipation",
    category: "Digestive",
    icon: "🚽",
    description: "Infrequent bowel movements or difficulty passing stool. Usually defined as having fewer than three bowel movements per week.",
    symptoms: ["Infrequent bowel movements", "Hard or lumpy stools", "Straining during bowel movements", "Feeling of incomplete evacuation", "Abdominal discomfort", "Bloating"],
    prevention: ["Eat high-fiber foods", "Drink plenty of water", "Exercise regularly", "Don't ignore urge to go", "Establish regular bathroom routine"],
    whenToSeeDoctor: ["Constipation lasting more than 3 weeks", "Blood in stool", "Severe abdominal pain", "Unexplained weight loss", "Alternating constipation and diarrhea"]
  },
  {
    id: "diarrhea",
    name: "Diarrhea",
    category: "Digestive",
    icon: "💧",
    description: "Loose, watery stools occurring more frequently than usual. Usually lasts a couple of days and resolves without treatment.",
    symptoms: ["Loose, watery stools", "Abdominal cramps", "Urgency to have bowel movement", "Nausea", "Bloating", "Fever (if infection)", "Blood or mucus in stool (severe cases)"],
    prevention: ["Wash hands frequently", "Practice food safety", "Drink safe water", "Be cautious when traveling", "Avoid contaminated foods"],
    whenToSeeDoctor: ["Diarrhea lasting more than 2 days", "Signs of dehydration", "Severe abdominal pain", "Blood in stool", "High fever", "Children, elderly, or immunocompromised patients"]
  },
  // Cardiovascular
  {
    id: "hypertension",
    name: "High Blood Pressure (Hypertension)",
    category: "Cardiovascular",
    icon: "❤️",
    description: "A condition where blood pressure against artery walls is too high. Often called the 'silent killer' because it usually has no symptoms.",
    symptoms: ["Usually no symptoms", "Headaches (severe cases)", "Shortness of breath", "Nosebleeds", "Flushing", "Dizziness", "Chest pain", "Blood in urine"],
    prevention: ["Maintain healthy weight", "Exercise regularly", "Eat less salt", "Limit alcohol", "Don't smoke", "Manage stress", "Regular blood pressure checks"],
    whenToSeeDoctor: ["Blood pressure above 140/90", "Severe headache", "Difficulty breathing", "Chest pain", "Vision problems", "Blood in urine"]
  },
  {
    id: "hypotension",
    name: "Low Blood Pressure (Hypotension)",
    category: "Cardiovascular",
    icon: "📉",
    description: "Blood pressure lower than normal, which can cause inadequate blood flow to organs. May be normal for some people.",
    symptoms: ["Dizziness or lightheadedness", "Fainting", "Blurred vision", "Nausea", "Fatigue", "Lack of concentration", "Cold, clammy skin", "Rapid, shallow breathing"],
    prevention: ["Stay hydrated", "Rise slowly from sitting/lying", "Eat smaller, frequent meals", "Limit alcohol", "Avoid standing for long periods"],
    whenToSeeDoctor: ["Frequent fainting", "Persistent dizziness", "Symptoms affecting daily life", "Signs of shock", "Blood pressure consistently below 90/60"]
  },
  {
    id: "heart-palpitations",
    name: "Heart Palpitations",
    category: "Cardiovascular",
    icon: "💓",
    description: "Sensations of having a fast-beating, fluttering, or pounding heart. Usually harmless but can sometimes indicate an underlying condition.",
    symptoms: ["Feeling of rapid heartbeat", "Fluttering sensation in chest", "Pounding heartbeat", "Skipped beats", "Chest discomfort", "Shortness of breath", "Dizziness"],
    prevention: ["Limit caffeine and alcohol", "Manage stress", "Get enough sleep", "Stay hydrated", "Exercise regularly", "Avoid stimulants"],
    whenToSeeDoctor: ["Palpitations with chest pain", "Severe shortness of breath", "Fainting", "Palpitations lasting more than a few minutes", "History of heart disease", "Palpitations becoming more frequent"]
  },
  // Skin Conditions
  {
    id: "acne",
    name: "Acne",
    category: "Skin",
    icon: "😊",
    description: "A skin condition occurring when hair follicles become clogged with oil and dead skin cells. Common in teenagers but affects all ages.",
    symptoms: ["Whiteheads", "Blackheads", "Papules (small red bumps)", "Pustules (pimples with pus)", "Nodules (large, painful lumps)", "Cysts", "Scarring"],
    prevention: ["Wash face twice daily", "Use non-comedogenic products", "Don't pick at skin", "Keep hair clean", "Eat balanced diet", "Manage stress"],
    whenToSeeDoctor: ["Severe acne causing scarring", "Over-the-counter treatments not working", "Acne affecting self-esteem", "Sudden onset in adults", "Painful cysts or nodules"]
  },
  {
    id: "eczema",
    name: "Eczema (Atopic Dermatitis)",
    category: "Skin",
    icon: "🖐️",
    description: "A condition that makes skin red, inflamed, and itchy. Common in children but can occur at any age. It's chronic and tends to flare periodically.",
    symptoms: ["Dry, sensitive skin", "Intense itching", "Red, inflamed skin", "Rough, leathery patches", "Oozing or crusting", "Swelling", "Dark colored patches"],
    prevention: ["Moisturize regularly", "Avoid harsh soaps", "Take short, lukewarm showers", "Identify and avoid triggers", "Use hypoallergenic products", "Manage stress"],
    whenToSeeDoctor: ["Symptoms affecting sleep or daily activities", "Signs of skin infection", "Symptoms not improving with treatment", "Large areas affected", "Painful or oozing skin"]
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    category: "Skin",
    icon: "🧬",
    description: "A chronic autoimmune condition causing rapid skin cell buildup, resulting in scaling on the skin's surface. Not contagious.",
    symptoms: ["Red patches with silvery scales", "Dry, cracked skin", "Itching or burning", "Thickened nails", "Stiff, swollen joints", "Small scaling spots"],
    prevention: ["Avoid skin injuries", "Manage stress", "Maintain healthy weight", "Limit alcohol", "Don't smoke", "Keep skin moisturized"],
    whenToSeeDoctor: ["Psoriasis covering large body areas", "Joint pain or swelling", "Symptoms affecting daily life", "Signs of infection", "Treatment not working"]
  },
  {
    id: "hives",
    name: "Hives (Urticaria)",
    category: "Skin",
    icon: "🔴",
    description: "Raised, itchy welts on the skin triggered by an allergic reaction. Individual hives usually last less than 24 hours.",
    symptoms: ["Raised, red or skin-colored welts", "Intense itching", "Swelling", "Welts that change shape", "Welts appearing in batches", "Burning or stinging sensation"],
    prevention: ["Identify and avoid triggers", "Manage stress", "Wear loose clothing", "Avoid extreme temperatures", "Keep allergy medications handy"],
    whenToSeeDoctor: ["Difficulty breathing", "Throat or tongue swelling", "Hives lasting more than 6 weeks", "Severe discomfort", "Accompanying fever", "Signs of anaphylaxis"]
  },
  {
    id: "ringworm",
    name: "Ringworm",
    category: "Skin",
    icon: "⭕",
    description: "A fungal infection of the skin causing a ring-shaped rash. Despite the name, it's not caused by a worm but by fungi.",
    symptoms: ["Ring-shaped rash", "Red, scaly, itchy patches", "Patches that blister or ooze", "Raised, defined edges", "Clear center as it spreads", "Hair loss in affected area"],
    prevention: ["Keep skin clean and dry", "Don't share personal items", "Wear sandals in public showers", "Avoid touching infected animals", "Wash hands after contact with pets"],
    whenToSeeDoctor: ["Infection spreading", "Not improving after 2 weeks of OTC treatment", "Fever", "Signs of bacterial infection", "Ringworm on scalp"]
  },
  // Mental Health
  {
    id: "anxiety",
    name: "Anxiety",
    category: "Mental Health",
    icon: "😰",
    description: "A feeling of worry, nervousness, or unease. While normal in some situations, persistent anxiety may indicate an anxiety disorder.",
    symptoms: ["Excessive worry", "Restlessness", "Difficulty concentrating", "Sleep problems", "Rapid heartbeat", "Sweating", "Trembling", "Fatigue"],
    prevention: ["Regular exercise", "Practice relaxation techniques", "Limit caffeine and alcohol", "Get enough sleep", "Maintain social connections", "Manage stress"],
    whenToSeeDoctor: ["Anxiety interfering with daily life", "Panic attacks", "Avoiding activities due to anxiety", "Physical symptoms persisting", "Thoughts of self-harm", "Difficulty functioning at work or home"]
  },
  {
    id: "depression",
    name: "Depression",
    category: "Mental Health",
    icon: "😔",
    description: "A mood disorder causing persistent feelings of sadness and loss of interest. It affects how you feel, think, and handle daily activities.",
    symptoms: ["Persistent sadness", "Loss of interest in activities", "Changes in appetite", "Sleep disturbances", "Fatigue", "Feelings of worthlessness", "Difficulty concentrating", "Thoughts of death"],
    prevention: ["Stay physically active", "Maintain social connections", "Get enough sleep", "Limit alcohol", "Seek help early", "Practice stress management"],
    whenToSeeDoctor: ["Symptoms lasting more than 2 weeks", "Difficulty functioning daily", "Thoughts of suicide or self-harm", "Symptoms worsening", "Substance use to cope"]
  },
  {
    id: "insomnia",
    name: "Insomnia",
    category: "Mental Health",
    icon: "🌙",
    description: "Difficulty falling asleep or staying asleep. Can be short-term (acute) or long-lasting (chronic).",
    symptoms: ["Difficulty falling asleep", "Waking during the night", "Waking too early", "Not feeling rested", "Daytime tiredness", "Irritability", "Difficulty concentrating", "Mood disturbances"],
    prevention: ["Maintain regular sleep schedule", "Create restful environment", "Limit screen time before bed", "Avoid caffeine late in day", "Exercise regularly (not before bed)", "Manage stress"],
    whenToSeeDoctor: ["Insomnia lasting more than 4 weeks", "Symptoms affecting daily function", "Falling asleep unexpectedly", "Severe daytime sleepiness", "Other health issues present"]
  },
  {
    id: "stress",
    name: "Chronic Stress",
    category: "Mental Health",
    icon: "😤",
    description: "Prolonged and constant feeling of stress that can negatively affect health if untreated. Different from acute stress, which is short-term.",
    symptoms: ["Headaches", "Muscle tension", "Fatigue", "Sleep problems", "Anxiety", "Irritability", "Lack of motivation", "Difficulty concentrating", "Digestive issues"],
    prevention: ["Regular exercise", "Practice mindfulness", "Maintain work-life balance", "Connect with others", "Limit caffeine", "Take breaks", "Get enough sleep"],
    whenToSeeDoctor: ["Stress affecting daily life", "Physical symptoms persisting", "Using substances to cope", "Feelings of hopelessness", "Difficulty managing responsibilities"]
  },
  // Musculoskeletal
  {
    id: "back-pain",
    name: "Back Pain",
    category: "Musculoskeletal",
    icon: "🔙",
    description: "Pain in the back that can range from a dull ache to sharp, stabbing sensation. One of the most common medical problems.",
    symptoms: ["Muscle ache", "Shooting or stabbing pain", "Pain radiating down leg", "Limited flexibility", "Inability to stand straight", "Pain worsening with bending or lifting"],
    prevention: ["Maintain good posture", "Exercise regularly", "Maintain healthy weight", "Lift properly", "Avoid prolonged sitting", "Strengthen core muscles"],
    whenToSeeDoctor: ["Pain lasting more than a few weeks", "Severe pain not improving with rest", "Pain spreading down legs", "Weakness or numbness in legs", "Unexplained weight loss", "Bowel or bladder problems"]
  },
  {
    id: "arthritis",
    name: "Arthritis",
    category: "Musculoskeletal",
    icon: "🦴",
    description: "Inflammation of one or more joints, causing pain and stiffness. There are many types, with osteoarthritis and rheumatoid arthritis being most common.",
    symptoms: ["Joint pain", "Stiffness", "Swelling", "Redness", "Decreased range of motion", "Warmth in joints", "Fatigue", "Morning stiffness"],
    prevention: ["Maintain healthy weight", "Stay active", "Protect joints from injury", "Don't smoke", "Eat anti-inflammatory foods", "Avoid repetitive joint stress"],
    whenToSeeDoctor: ["Joint pain lasting more than 3 days", "Severe swelling", "Joint deformity", "Inability to use joint", "Fever with joint pain", "Rapid onset of symptoms"]
  },
  {
    id: "muscle-strain",
    name: "Muscle Strain",
    category: "Musculoskeletal",
    icon: "💪",
    description: "Stretching or tearing of muscle fibers, usually from overuse, fatigue, or improper use. Also called a pulled muscle.",
    symptoms: ["Sudden pain", "Soreness", "Limited range of motion", "Bruising", "Swelling", "Muscle spasms", "Stiffness", "Weakness"],
    prevention: ["Warm up before exercise", "Stretch regularly", "Stay conditioned for activities", "Use proper technique", "Don't overdo it", "Rest when fatigued"],
    whenToSeeDoctor: ["Severe pain", "Unable to walk or move", "Numbness in affected area", "Pain not improving after a week", "Significant swelling", "Suspected complete tear"]
  },
  {
    id: "osteoporosis",
    name: "Osteoporosis",
    category: "Musculoskeletal",
    icon: "🏗️",
    description: "A condition causing bones to become weak and brittle. Bones become so weak that a fall or even mild stress can cause a fracture.",
    symptoms: ["Often no symptoms until fracture", "Back pain", "Loss of height over time", "Stooped posture", "Bone fractures from minor incidents"],
    prevention: ["Get enough calcium and vitamin D", "Regular weight-bearing exercise", "Avoid smoking", "Limit alcohol", "Have bone density tested", "Prevent falls"],
    whenToSeeDoctor: ["Unexplained back pain", "Loss of height", "Fracture from minor trauma", "Family history of osteoporosis", "Post-menopausal women", "Long-term steroid use"]
  },
  // Neurological
  {
    id: "migraine",
    name: "Migraine",
    category: "Neurological",
    icon: "🤕",
    description: "A type of headache causing severe throbbing pain, usually on one side of the head. Often accompanied by nausea and sensitivity to light and sound.",
    symptoms: ["Intense throbbing headache", "Nausea and vomiting", "Sensitivity to light", "Sensitivity to sound", "Visual disturbances (aura)", "Dizziness", "Fatigue"],
    prevention: ["Identify and avoid triggers", "Maintain regular sleep schedule", "Stay hydrated", "Manage stress", "Exercise regularly", "Limit caffeine"],
    whenToSeeDoctor: ["New or different headache pattern", "Sudden, severe headache", "Headache with fever or stiff neck", "Headache after head injury", "Chronic daily headaches", "Neurological symptoms with headache"]
  },
  {
    id: "tension-headache",
    name: "Tension Headache",
    category: "Neurological",
    icon: "😣",
    description: "The most common type of headache, often described as a tight band around the head. Usually caused by stress, muscle tension, or poor posture.",
    symptoms: ["Dull, aching head pain", "Pressure across forehead", "Tenderness on scalp, neck, shoulders", "Tightness around head", "Mild to moderate intensity", "Sensitivity to light or sound"],
    prevention: ["Manage stress", "Maintain good posture", "Take regular breaks", "Stay hydrated", "Get enough sleep", "Exercise regularly"],
    whenToSeeDoctor: ["Headaches occurring more than 15 days per month", "Need pain relievers more than twice a week", "Pattern of headaches changes", "Headache suddenly worsens", "Headache with confusion or weakness"]
  },
  {
    id: "vertigo",
    name: "Vertigo",
    category: "Neurological",
    icon: "🌀",
    description: "A sensation of spinning or dizziness when you're not actually moving. Often caused by inner ear problems.",
    symptoms: ["Sensation of spinning", "Loss of balance", "Nausea and vomiting", "Sweating", "Abnormal eye movements", "Headache", "Ringing in ears", "Difficulty focusing"],
    prevention: ["Move slowly when changing positions", "Stay hydrated", "Avoid sudden head movements", "Manage stress", "Get enough sleep"],
    whenToSeeDoctor: ["Sudden, severe vertigo", "Vertigo with headache or hearing loss", "Fever or double vision", "Difficulty walking", "Fainting", "Numbness or weakness"]
  },
  // Infectious Diseases
  {
    id: "dengue",
    name: "Dengue Fever",
    category: "Infectious Diseases",
    icon: "🦟",
    description: "A mosquito-borne viral infection causing flu-like symptoms. In severe cases, it can cause serious bleeding and shock.",
    symptoms: ["High fever", "Severe headache", "Pain behind eyes", "Joint and muscle pain", "Rash", "Nausea and vomiting", "Mild bleeding", "Fatigue"],
    prevention: ["Use mosquito repellent", "Wear protective clothing", "Use mosquito nets", "Eliminate standing water", "Use screens on windows", "Be extra cautious during outbreaks"],
    whenToSeeDoctor: ["High fever lasting more than 2 days", "Severe abdominal pain", "Persistent vomiting", "Bleeding from gums or nose", "Blood in stool or vomit", "Difficulty breathing", "Cold, clammy skin"]
  },
  {
    id: "malaria",
    name: "Malaria",
    category: "Infectious Diseases",
    icon: "🩸",
    description: "A life-threatening disease caused by parasites transmitted through mosquito bites. Most common in tropical and subtropical regions.",
    symptoms: ["High fever", "Chills and sweating", "Headache", "Nausea and vomiting", "Muscle pain", "Fatigue", "Rapid breathing", "Rapid heart rate"],
    prevention: ["Take antimalarial medication when traveling", "Use insect repellent", "Sleep under mosquito nets", "Wear protective clothing", "Avoid outdoor activities at dusk/dawn"],
    whenToSeeDoctor: ["Any symptoms after visiting malaria zone", "High fever with chills", "Symptoms recurring cyclically", "Confusion or drowsiness", "Difficulty breathing", "Seizures"]
  },
  {
    id: "tuberculosis",
    name: "Tuberculosis (TB)",
    category: "Infectious Diseases",
    icon: "🫁",
    description: "A bacterial infection primarily affecting the lungs. Spreads through airborne droplets when infected people cough or sneeze.",
    symptoms: ["Persistent cough (3+ weeks)", "Coughing up blood", "Chest pain", "Unintentional weight loss", "Fatigue", "Fever", "Night sweats", "Chills", "Loss of appetite"],
    prevention: ["BCG vaccination", "Avoid close contact with infected individuals", "Ensure good ventilation", "Complete TB treatment if prescribed", "Cover mouth when coughing"],
    whenToSeeDoctor: ["Cough lasting more than 3 weeks", "Unexplained weight loss", "Night sweats", "Coughing up blood", "Contact with TB patient", "Fever lasting more than a week"]
  },
  {
    id: "typhoid",
    name: "Typhoid Fever",
    category: "Infectious Diseases",
    icon: "🍽️",
    description: "A bacterial infection caused by Salmonella typhi, spread through contaminated food or water.",
    symptoms: ["Sustained high fever", "Headache", "Stomach pain", "Constipation or diarrhea", "Rose-colored spots on chest", "Weakness", "Fatigue", "Loss of appetite"],
    prevention: ["Get vaccinated before traveling", "Drink only safe water", "Eat thoroughly cooked food", "Avoid raw fruits and vegetables", "Wash hands frequently"],
    whenToSeeDoctor: ["High fever lasting more than 3 days", "Severe abdominal pain", "Confusion", "Unable to eat or drink", "Symptoms after traveling to endemic areas"]
  },
  {
    id: "hepatitis",
    name: "Hepatitis",
    category: "Infectious Diseases",
    icon: "🫙",
    description: "Inflammation of the liver, usually caused by viral infection. There are several types (A, B, C, D, E) with different transmission routes.",
    symptoms: ["Fatigue", "Flu-like symptoms", "Dark urine", "Pale stool", "Abdominal pain", "Loss of appetite", "Unexplained weight loss", "Yellow skin and eyes (jaundice)"],
    prevention: ["Get vaccinated (Hepatitis A and B)", "Practice safe sex", "Don't share needles", "Be cautious with tattoos/piercings", "Wash hands thoroughly", "Drink safe water"],
    whenToSeeDoctor: ["Jaundice (yellow skin/eyes)", "Dark urine", "Severe fatigue", "Abdominal swelling", "Confusion", "Easy bruising or bleeding"]
  },
  {
    id: "chickenpox",
    name: "Chickenpox",
    category: "Infectious Diseases",
    icon: "🔵",
    description: "A highly contagious viral infection causing itchy, blister-like rash. Most common in children but can affect anyone who hasn't had it or been vaccinated.",
    symptoms: ["Itchy, fluid-filled blisters", "Fever", "Tiredness", "Loss of appetite", "Headache", "Rash progressing from spots to blisters to scabs"],
    prevention: ["Varicella vaccine", "Avoid contact with infected people", "Isolate infected individuals", "Good hygiene practices"],
    whenToSeeDoctor: ["Rash spreading to eyes", "Very red, warm, or tender skin", "Difficulty breathing", "High fever", "Confusion", "Stiff neck", "Immunocompromised individuals"]
  },
  // Metabolic/Endocrine
  {
    id: "diabetes-type2",
    name: "Type 2 Diabetes",
    category: "Metabolic",
    icon: "🩺",
    description: "A chronic condition affecting how the body processes blood sugar. The body either resists insulin or doesn't produce enough.",
    symptoms: ["Increased thirst", "Frequent urination", "Increased hunger", "Unintended weight loss", "Fatigue", "Blurred vision", "Slow-healing sores", "Frequent infections", "Darkened skin patches"],
    prevention: ["Maintain healthy weight", "Exercise regularly", "Eat balanced diet", "Limit sugar and refined carbs", "Don't smoke", "Regular health check-ups"],
    whenToSeeDoctor: ["Excessive thirst or urination", "Unexplained weight loss", "Fatigue", "Blurred vision", "Slow-healing wounds", "Frequent infections", "Numbness in hands or feet"]
  },
  {
    id: "hyperthyroidism",
    name: "Hyperthyroidism",
    category: "Metabolic",
    icon: "⚡",
    description: "A condition where the thyroid gland produces too much thyroid hormone, accelerating metabolism.",
    symptoms: ["Rapid heartbeat", "Weight loss despite good appetite", "Anxiety and nervousness", "Tremors", "Sweating", "Difficulty sleeping", "Thin skin", "Brittle hair", "Increased sensitivity to heat"],
    prevention: ["Regular thyroid check-ups", "Avoid excess iodine", "Manage stress", "Don't smoke", "Limit caffeine"],
    whenToSeeDoctor: ["Unexplained weight loss", "Rapid or irregular heartbeat", "Excessive sweating", "Difficulty sleeping", "Tremors", "Eye problems (bulging, irritation)"]
  },
  {
    id: "hypothyroidism",
    name: "Hypothyroidism",
    category: "Metabolic",
    icon: "🐢",
    description: "A condition where the thyroid gland doesn't produce enough thyroid hormone, slowing metabolism.",
    symptoms: ["Fatigue", "Weight gain", "Sensitivity to cold", "Constipation", "Dry skin", "Puffy face", "Hoarse voice", "Muscle weakness", "Elevated cholesterol", "Depression"],
    prevention: ["Regular thyroid screening", "Ensure adequate iodine intake", "Avoid excessive soy consumption", "Regular check-ups if at risk"],
    whenToSeeDoctor: ["Persistent fatigue", "Unexplained weight gain", "Feeling cold all the time", "Constipation", "Dry skin", "Depression", "Memory problems"]
  },
  // Eye Conditions
  {
    id: "conjunctivitis",
    name: "Pink Eye (Conjunctivitis)",
    category: "Eye",
    icon: "👁️",
    description: "Inflammation of the conjunctiva (the clear tissue covering the white of the eye). Can be caused by viruses, bacteria, or allergies.",
    symptoms: ["Redness in white of eye", "Increased tears", "Thick discharge", "Itching or burning", "Gritty feeling", "Crusting of eyelids", "Blurred vision", "Sensitivity to light"],
    prevention: ["Wash hands frequently", "Don't touch eyes", "Don't share personal items", "Replace eye makeup regularly", "Clean contact lenses properly"],
    whenToSeeDoctor: ["Severe eye pain", "Vision changes", "Sensitivity to light", "Symptoms not improving after 24-48 hours", "Newborns with symptoms", "Weakened immune system"]
  },
  {
    id: "dry-eye",
    name: "Dry Eye Syndrome",
    category: "Eye",
    icon: "💧",
    description: "A condition where eyes don't produce enough tears or the tears evaporate too quickly, causing discomfort and vision problems.",
    symptoms: ["Stinging or burning", "Scratchy sensation", "Stringy mucus", "Sensitivity to light", "Eye redness", "Feeling of something in eyes", "Difficulty wearing contacts", "Watery eyes (reflex tearing)", "Blurred vision"],
    prevention: ["Take breaks from screens", "Use humidifier", "Wear sunglasses outdoors", "Stay hydrated", "Blink regularly", "Position screens below eye level"],
    whenToSeeDoctor: ["Persistent dryness", "Red, painful eyes", "Vision changes", "Symptoms interfering with daily activities", "Symptoms despite using artificial tears"]
  },
  {
    id: "eye-strain",
    name: "Digital Eye Strain",
    category: "Eye",
    icon: "💻",
    description: "Eye discomfort caused by prolonged use of digital devices. Also called computer vision syndrome.",
    symptoms: ["Eye fatigue", "Headaches", "Blurred vision", "Dry eyes", "Neck and shoulder pain", "Difficulty focusing", "Increased sensitivity to light"],
    prevention: ["Follow 20-20-20 rule", "Proper screen positioning", "Adjust lighting", "Reduce glare", "Take regular breaks", "Use blue light filters"],
    whenToSeeDoctor: ["Persistent symptoms despite precautions", "Severe headaches", "Significant vision changes", "Eye pain", "Double vision"]
  },
  // Ear, Nose, Throat
  {
    id: "ear-infection",
    name: "Ear Infection",
    category: "ENT",
    icon: "👂",
    description: "An infection of the middle ear, very common in children. Can be caused by bacteria or viruses.",
    symptoms: ["Ear pain", "Difficulty hearing", "Fluid drainage", "Fever", "Trouble sleeping", "Irritability (in children)", "Loss of balance", "Tugging at ear"],
    prevention: ["Keep ears dry", "Avoid secondhand smoke", "Breastfeed infants", "Stay up to date on vaccines", "Wash hands frequently"],
    whenToSeeDoctor: ["Symptoms lasting more than a day", "Severe ear pain", "Discharge from ear", "Symptoms in infant under 6 months", "Fever above 102°F", "Hearing loss"]
  },
  {
    id: "tinnitus",
    name: "Tinnitus",
    category: "ENT",
    icon: "🔔",
    description: "Perception of noise or ringing in the ears when no external sound is present. Often a symptom of an underlying condition.",
    symptoms: ["Ringing in ears", "Buzzing or humming", "Clicking or roaring sounds", "Hearing phantom sounds", "Sounds may vary in pitch", "May affect one or both ears"],
    prevention: ["Protect hearing from loud noises", "Turn down volume", "Use hearing protection", "Manage cardiovascular health", "Limit caffeine and alcohol"],
    whenToSeeDoctor: ["Tinnitus developing after upper respiratory infection", "Tinnitus with dizziness or hearing loss", "Tinnitus causing anxiety or depression", "Tinnitus without obvious cause", "Pulsatile tinnitus (rhythmic with heartbeat)"]
  },
  {
    id: "tonsillitis",
    name: "Tonsillitis",
    category: "ENT",
    icon: "🗣️",
    description: "Inflammation of the tonsils, usually from viral infection but sometimes bacterial. Very common in children.",
    symptoms: ["Sore throat", "Difficulty swallowing", "Red, swollen tonsils", "White or yellow coating on tonsils", "Fever", "Swollen lymph nodes", "Bad breath", "Scratchy voice"],
    prevention: ["Wash hands frequently", "Avoid sharing food or drinks", "Replace toothbrush after illness", "Avoid close contact with sick people"],
    whenToSeeDoctor: ["Sore throat lasting more than 2 days", "Difficulty swallowing or breathing", "Extreme weakness", "High fever", "Drooling (due to painful swallowing)", "Recurrent tonsillitis"]
  },
  // Urinary
  {
    id: "uti",
    name: "Urinary Tract Infection (UTI)",
    category: "Urinary",
    icon: "💦",
    description: "An infection in any part of the urinary system. Most infections involve the lower urinary tract (bladder and urethra).",
    symptoms: ["Strong urge to urinate", "Burning during urination", "Frequent urination", "Cloudy urine", "Blood in urine", "Strong-smelling urine", "Pelvic pain (women)", "Rectal pain (men)"],
    prevention: ["Drink plenty of water", "Wipe front to back", "Urinate after intercourse", "Avoid irritating products", "Don't hold urine", "Wear cotton underwear"],
    whenToSeeDoctor: ["First UTI", "Blood in urine", "Fever or back pain", "Symptoms not improving after 2 days", "Recurrent UTIs", "Pregnant women with symptoms", "Men with UTI symptoms"]
  },
  {
    id: "kidney-stones",
    name: "Kidney Stones",
    category: "Urinary",
    icon: "💎",
    description: "Hard deposits made of minerals and salts that form inside the kidneys. Passing kidney stones can be very painful.",
    symptoms: ["Severe pain in side and back", "Pain radiating to lower abdomen", "Pain coming in waves", "Painful urination", "Pink, red, or brown urine", "Cloudy or foul-smelling urine", "Nausea and vomiting", "Frequent urination"],
    prevention: ["Stay well hydrated", "Reduce sodium intake", "Limit animal protein", "Avoid stone-forming foods if prone", "Maintain healthy weight"],
    whenToSeeDoctor: ["Severe pain", "Blood in urine", "Difficulty passing urine", "Pain with fever and chills", "Nausea and vomiting", "Pain so severe you can't sit still"]
  },
  // Women's Health
  {
    id: "menstrual-cramps",
    name: "Menstrual Cramps",
    category: "Women's Health",
    icon: "🌸",
    description: "Throbbing or cramping pains in the lower abdomen before and during menstruation. Very common and usually not a sign of anything serious.",
    symptoms: ["Lower abdominal cramping", "Lower back pain", "Pain radiating to thighs", "Nausea", "Loose stools", "Headache", "Dizziness", "Fatigue"],
    prevention: ["Regular exercise", "Heat application", "Stress management", "Healthy diet", "Adequate sleep", "Limit caffeine and alcohol"],
    whenToSeeDoctor: ["Cramps severely disrupting life", "Getting progressively worse", "Starting after age 25", "Fever during period", "Pain between periods", "Unusual discharge"]
  },
  {
    id: "pcos",
    name: "Polycystic Ovary Syndrome (PCOS)",
    category: "Women's Health",
    icon: "♀️",
    description: "A hormonal disorder common among women of reproductive age. Can cause irregular periods and excess androgen levels.",
    symptoms: ["Irregular periods", "Heavy bleeding", "Excess hair growth", "Acne", "Weight gain", "Darkening of skin", "Hair thinning", "Difficulty getting pregnant"],
    prevention: ["Maintain healthy weight", "Exercise regularly", "Eat balanced diet", "Manage blood sugar", "Regular health check-ups"],
    whenToSeeDoctor: ["Irregular or missed periods", "Difficulty getting pregnant", "Signs of excess androgen", "Unexplained weight gain", "Heavy periods"]
  },
  // General
  {
    id: "dehydration",
    name: "Dehydration",
    category: "General",
    icon: "🥤",
    description: "A condition when the body loses more fluids than it takes in. Can range from mild to severe and life-threatening.",
    symptoms: ["Extreme thirst", "Less frequent urination", "Dark-colored urine", "Fatigue", "Dizziness", "Confusion", "Dry mouth and skin", "Headache"],
    prevention: ["Drink plenty of fluids", "Eat water-rich foods", "Increase fluids during exercise", "Drink more in hot weather", "Replace fluids when ill"],
    whenToSeeDoctor: ["Diarrhea for 24+ hours", "Bloody or black stool", "Unable to keep fluids down", "Disorientation", "Extreme thirst", "No urination for 8+ hours"]
  },
  {
    id: "anemia",
    name: "Anemia",
    category: "General",
    icon: "🩸",
    description: "A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues.",
    symptoms: ["Fatigue", "Weakness", "Pale or yellowish skin", "Irregular heartbeats", "Shortness of breath", "Dizziness", "Cold hands and feet", "Headache", "Chest pain"],
    prevention: ["Eat iron-rich foods", "Vitamin C with iron foods", "Avoid tea/coffee with meals", "Get enough B12 and folate", "Regular health check-ups"],
    whenToSeeDoctor: ["Persistent fatigue", "Shortness of breath", "Dizziness", "Irregular heartbeat", "Pale skin", "Cold extremities"]
  },
  {
    id: "fatigue",
    name: "Chronic Fatigue",
    category: "General",
    icon: "😴",
    description: "Extreme tiredness that doesn't improve with rest and isn't directly caused by other medical conditions.",
    symptoms: ["Unrelenting tiredness", "Difficulty concentrating", "Impaired memory", "Sore throat", "Enlarged lymph nodes", "Unexplained muscle pain", "Joint pain", "Unrefreshing sleep", "Extreme exhaustion after activity"],
    prevention: ["Regular sleep schedule", "Balanced diet", "Regular exercise", "Stress management", "Avoid overexertion", "Limit caffeine"],
    whenToSeeDoctor: ["Fatigue lasting more than 2 weeks", "Fatigue affecting daily activities", "Fatigue with other symptoms", "No improvement with rest", "Sudden onset of severe fatigue"]
  },
  {
    id: "vitamin-d-deficiency",
    name: "Vitamin D Deficiency",
    category: "General",
    icon: "☀️",
    description: "A condition where the body doesn't have enough vitamin D, which is essential for bone health and immune function.",
    symptoms: ["Fatigue", "Bone pain", "Muscle weakness", "Muscle aches or cramps", "Mood changes", "Frequent illness", "Slow wound healing"],
    prevention: ["Get regular sunlight exposure", "Eat vitamin D rich foods", "Consider supplements", "Regular health check-ups"],
    whenToSeeDoctor: ["Persistent fatigue", "Bone or muscle pain", "Frequent infections", "Depression", "Hair loss"]
  },
  // Additional conditions to reach 100+
  {
    id: "gout",
    name: "Gout",
    category: "Musculoskeletal",
    icon: "🦶",
    description: "A form of arthritis characterized by sudden, severe attacks of pain, swelling, and redness, often in the big toe.",
    symptoms: ["Intense joint pain", "Lingering discomfort", "Inflammation and redness", "Limited range of motion", "Warmth in joint"],
    prevention: ["Limit alcohol", "Limit high-purine foods", "Stay hydrated", "Maintain healthy weight", "Avoid sugary drinks"],
    whenToSeeDoctor: ["Sudden, intense joint pain", "Joint is hot and swollen", "Fever with joint pain", "Recurrent gout attacks"]
  },
  {
    id: "sciatica",
    name: "Sciatica",
    category: "Musculoskeletal",
    icon: "⚡",
    description: "Pain radiating along the sciatic nerve, which runs from the lower back through the hips and down each leg.",
    symptoms: ["Lower back pain", "Pain radiating to buttock and leg", "Numbness or tingling", "Muscle weakness", "Pain worsening with sitting", "Sharp or burning sensation"],
    prevention: ["Exercise regularly", "Maintain good posture", "Use proper lifting techniques", "Strengthen core muscles", "Avoid prolonged sitting"],
    whenToSeeDoctor: ["Severe pain", "Sudden onset after injury", "Numbness or weakness in leg", "Loss of bladder or bowel control", "Pain worsening despite rest"]
  },
  {
    id: "carpal-tunnel",
    name: "Carpal Tunnel Syndrome",
    category: "Musculoskeletal",
    icon: "✋",
    description: "A condition causing numbness, tingling, and weakness in the hand due to pressure on the median nerve in the wrist.",
    symptoms: ["Numbness in fingers", "Tingling sensation", "Weakness in hand", "Difficulty gripping", "Pain in wrist or hand", "Symptoms worse at night"],
    prevention: ["Take breaks from repetitive tasks", "Keep wrists straight", "Use ergonomic equipment", "Stretch hands regularly", "Avoid excessive force"],
    whenToSeeDoctor: ["Persistent symptoms", "Weakness affecting daily tasks", "Sleep disrupted by symptoms", "Loss of coordination", "Muscle wasting at base of thumb"]
  },
  {
    id: "shingles",
    name: "Shingles",
    category: "Infectious Diseases",
    icon: "🔥",
    description: "A viral infection causing a painful rash. Caused by the same virus that causes chickenpox (varicella-zoster).",
    symptoms: ["Pain, burning, or tingling", "Sensitivity to touch", "Red rash appearing days after pain", "Fluid-filled blisters", "Itching", "Fever", "Headache", "Fatigue"],
    prevention: ["Get shingles vaccine", "Maintain healthy immune system", "Manage stress", "Get enough sleep"],
    whenToSeeDoctor: ["Rash near eye", "Over 60 years old", "Weakened immune system", "Widespread rash", "Severe pain", "Rash not healing"]
  },
  {
    id: "cellulitis",
    name: "Cellulitis",
    category: "Skin",
    icon: "🔴",
    description: "A bacterial skin infection causing redness, swelling, and pain in the affected area. Can spread rapidly and become serious.",
    symptoms: ["Red, swollen skin", "Tenderness and pain", "Warmth in affected area", "Fever", "Red streaking", "Skin dimpling", "Blisters"],
    prevention: ["Clean wounds promptly", "Keep skin moisturized", "Treat cuts immediately", "Wear protective gear", "Manage skin conditions"],
    whenToSeeDoctor: ["Red, swollen, tender rash", "Fever with rash", "Rash changing rapidly", "Numbness or tingling", "Rash near eyes", "Red streaks from wound"]
  },
  {
    id: "herpes",
    name: "Cold Sores (Oral Herpes)",
    category: "Infectious Diseases",
    icon: "💋",
    description: "Small, fluid-filled blisters around the lips caused by herpes simplex virus. Very common and usually not serious.",
    symptoms: ["Tingling or burning before outbreak", "Small, fluid-filled blisters", "Blisters on lips or around mouth", "Oozing and crusting", "Fever during first outbreak", "Swollen lymph nodes"],
    prevention: ["Avoid contact with sores", "Don't share personal items", "Use lip balm with SPF", "Manage stress", "Maintain strong immune system"],
    whenToSeeDoctor: ["Frequent outbreaks", "Sores not healing in 2 weeks", "Severe symptoms", "Weakened immune system", "Sores near eyes", "First outbreak"]
  },
  {
    id: "hemorrhoids",
    name: "Hemorrhoids",
    category: "Digestive",
    icon: "🩹",
    description: "Swollen veins in the lowest part of the rectum and anus. Very common and often related to straining during bowel movements.",
    symptoms: ["Bleeding during bowel movements", "Itching around anus", "Pain or discomfort", "Swelling around anus", "A lump near anus", "Fecal leakage"],
    prevention: ["Eat high-fiber diet", "Drink plenty of water", "Don't strain during bowel movements", "Exercise regularly", "Don't sit for long periods", "Go when you feel the urge"],
    whenToSeeDoctor: ["Bleeding during bowel movements", "Hemorrhoids not improving with home treatment", "Severe pain", "Change in bowel habits", "Dark or tarry stools"]
  },
  {
    id: "bursitis",
    name: "Bursitis",
    category: "Musculoskeletal",
    icon: "🦴",
    description: "Inflammation of the fluid-filled sacs (bursae) that cushion bones, tendons, and muscles near joints.",
    symptoms: ["Achy or stiff joint", "Pain with movement or pressure", "Swelling", "Redness", "Warmth in affected area"],
    prevention: ["Warm up before activities", "Take frequent breaks", "Use cushioning when kneeling", "Maintain healthy weight", "Use proper lifting techniques"],
    whenToSeeDoctor: ["Disabling joint pain", "Sudden inability to move joint", "Excessive swelling, redness, or rash", "Fever", "Pain lasting more than 2 weeks"]
  },
  {
    id: "plantar-fasciitis",
    name: "Plantar Fasciitis",
    category: "Musculoskeletal",
    icon: "👟",
    description: "Inflammation of the plantar fascia, a thick band of tissue connecting the heel bone to the toes. Common cause of heel pain.",
    symptoms: ["Stabbing heel pain", "Pain worst in morning", "Pain after standing long periods", "Pain after exercise (not during)", "Tenderness at bottom of foot"],
    prevention: ["Maintain healthy weight", "Wear supportive shoes", "Replace worn athletic shoes", "Stretch feet and calves", "Avoid going barefoot on hard surfaces"],
    whenToSeeDoctor: ["Pain not improving after several weeks", "Severe heel pain", "Pain affecting daily activities", "Numbness or tingling in foot"]
  },
  {
    id: "irritable-bladder",
    name: "Overactive Bladder",
    category: "Urinary",
    icon: "🚿",
    description: "A condition causing a sudden, urgent need to urinate. May also cause involuntary loss of urine.",
    symptoms: ["Sudden urge to urinate", "Frequent urination", "Waking to urinate at night", "Urge incontinence", "Needing to urinate 8+ times daily"],
    prevention: ["Limit caffeine and alcohol", "Maintain healthy weight", "Pelvic floor exercises", "Scheduled bathroom trips", "Stay hydrated but don't overdrink"],
    whenToSeeDoctor: ["Symptoms affecting quality of life", "Unable to reach bathroom in time", "Waking frequently at night", "Pain with urination", "Blood in urine"]
  },
  {
    id: "lactose-intolerance",
    name: "Lactose Intolerance",
    category: "Digestive",
    icon: "🥛",
    description: "Inability to fully digest lactose, the sugar in milk and dairy products. Not dangerous but can be uncomfortable.",
    symptoms: ["Bloating", "Diarrhea", "Gas", "Nausea", "Stomach cramps", "Symptoms 30 mins to 2 hours after consuming dairy"],
    prevention: ["Limit or avoid dairy products", "Try lactose-free alternatives", "Use lactase supplements", "Read food labels", "Introduce dairy gradually"],
    whenToSeeDoctor: ["Symptoms persisting despite avoiding dairy", "Significant weight loss", "Symptoms affecting nutrition", "Unsure if lactose intolerant"]
  },
  {
    id: "motion-sickness",
    name: "Motion Sickness",
    category: "General",
    icon: "🚗",
    description: "Nausea and dizziness caused by movement, such as traveling in a car, boat, or plane.",
    symptoms: ["Nausea", "Vomiting", "Dizziness", "Sweating", "Pale skin", "Headache", "Increased saliva", "Fatigue"],
    prevention: ["Sit in front of vehicle", "Look at horizon", "Get fresh air", "Avoid reading while moving", "Avoid heavy meals before travel", "Use motion sickness medication"],
    whenToSeeDoctor: ["Severe or prolonged symptoms", "Symptoms occurring without motion", "Hearing loss with symptoms", "Severe headache", "Persistent vomiting"]
  },
  {
    id: "athletes-foot",
    name: "Athlete's Foot",
    category: "Skin",
    icon: "🦶",
    description: "A fungal infection that usually begins between the toes. Common in people whose feet become sweaty in tight shoes.",
    symptoms: ["Itchy, scaly rash", "Burning or stinging", "Blisters", "Dry, scaly skin on soles", "Raw skin from scratching", "Discolored, crumbly toenails"],
    prevention: ["Keep feet dry", "Wear breathable shoes", "Change socks regularly", "Use antifungal powder", "Don't go barefoot in public areas", "Alternate shoes"],
    whenToSeeDoctor: ["Infection not improving with OTC treatment", "Diabetes and foot infection", "Excessive redness or swelling", "Drainage or pus", "Fever"]
  },
  {
    id: "nosebleed",
    name: "Nosebleed",
    category: "ENT",
    icon: "👃",
    description: "Bleeding from the nose, usually from blood vessels in the front of the nose. Common and usually not serious.",
    symptoms: ["Blood flowing from one or both nostrils", "Sensation of fluid in back of throat", "Frequent swallowing", "Feeling of blood in throat"],
    prevention: ["Use humidifier", "Don't pick nose", "Saline nasal spray", "Avoid blowing nose hard", "Protect nose from injury", "Treat allergies"],
    whenToSeeDoctor: ["Bleeding lasting more than 20 minutes", "Bleeding after injury", "Frequent nosebleeds", "Taking blood thinners", "Difficulty breathing", "Large amount of blood"]
  },
  {
    id: "heat-exhaustion",
    name: "Heat Exhaustion",
    category: "General",
    icon: "☀️",
    description: "A heat-related illness that can occur after exposure to high temperatures, especially with physical activity.",
    symptoms: ["Heavy sweating", "Cold, pale, clammy skin", "Fast, weak pulse", "Nausea or vomiting", "Muscle cramps", "Tiredness", "Weakness", "Dizziness", "Headache", "Fainting"],
    prevention: ["Stay hydrated", "Wear lightweight clothing", "Avoid peak sun hours", "Take breaks in shade", "Acclimatize to heat gradually"],
    whenToSeeDoctor: ["Symptoms worsening", "Vomiting", "Temperature above 104°F", "Confusion", "Loss of consciousness", "Symptoms lasting more than 1 hour"]
  },
  {
    id: "food-allergy",
    name: "Food Allergy",
    category: "Immune System",
    icon: "🥜",
    description: "An immune system reaction that occurs soon after eating certain foods. Even a tiny amount can trigger symptoms.",
    symptoms: ["Hives or itchy skin", "Swelling of lips, tongue, throat", "Wheezing or trouble breathing", "Abdominal pain", "Diarrhea", "Nausea or vomiting", "Dizziness or fainting"],
    prevention: ["Read food labels carefully", "Inform restaurants of allergies", "Carry emergency epinephrine", "Wear medical alert jewelry", "Avoid cross-contamination"],
    whenToSeeDoctor: ["Any allergic reaction to food", "Symptoms of anaphylaxis (throat swelling, difficulty breathing)", "Dizziness or fainting", "Rapid pulse", "Recurring reactions"]
  },
  {
    id: "sleep-apnea",
    name: "Sleep Apnea",
    category: "Respiratory",
    icon: "😴",
    description: "A serious sleep disorder where breathing repeatedly stops and starts during sleep.",
    symptoms: ["Loud snoring", "Episodes of stopped breathing", "Gasping for air during sleep", "Morning headache", "Difficulty staying asleep", "Excessive daytime sleepiness", "Difficulty concentrating", "Irritability"],
    prevention: ["Maintain healthy weight", "Exercise regularly", "Avoid alcohol before bed", "Sleep on side", "Don't smoke", "Treat allergies"],
    whenToSeeDoctor: ["Loud snoring disturbing sleep", "Waking gasping or choking", "Pauses in breathing observed by partner", "Excessive daytime drowsiness", "Morning headaches"]
  },
  {
    id: "warts",
    name: "Warts",
    category: "Skin",
    icon: "🔘",
    description: "Small, grainy skin growths caused by human papillomavirus (HPV). Common on hands and feet.",
    symptoms: ["Small, fleshy, grainy bumps", "Flesh-colored, white, pink, or tan", "Rough to the touch", "Sprinkled with black dots (clotted blood vessels)", "May occur in clusters"],
    prevention: ["Avoid touching warts", "Don't share personal items", "Keep feet dry", "Avoid walking barefoot in public", "Don't bite nails"],
    whenToSeeDoctor: ["Warts painful or change appearance", "Warts spreading", "Affecting daily activities", "Unsure if growth is a wart", "Diabetes or weakened immune system", "Warts on face or genitals"]
  },
  {
    id: "burns",
    name: "Burns",
    category: "Skin",
    icon: "🔥",
    description: "Damage to skin from heat, chemicals, electricity, or radiation. Severity ranges from first-degree (minor) to third-degree (severe).",
    symptoms: ["Red, painful skin (first-degree)", "Blisters (second-degree)", "White or charred skin (third-degree)", "Swelling", "Peeling skin"],
    prevention: ["Use oven mitts", "Keep hot liquids away from children", "Install smoke detectors", "Check water temperature", "Use sunscreen", "Handle chemicals carefully"],
    whenToSeeDoctor: ["Burns covering large area", "Burns on face, hands, feet, groin", "Deep burns (third-degree)", "Burns from chemicals or electricity", "Signs of infection", "Burns in children or elderly"]
  },
  {
    id: "sprains",
    name: "Sprains",
    category: "Musculoskeletal",
    icon: "🩹",
    description: "Stretching or tearing of ligaments, the tissue connecting bones at joints. Commonly affects ankles, knees, and wrists.",
    symptoms: ["Pain", "Swelling", "Bruising", "Limited ability to move joint", "Popping sensation at time of injury", "Instability in joint"],
    prevention: ["Warm up before exercise", "Wear proper footwear", "Be careful on uneven surfaces", "Strengthen muscles around joints", "Don't exercise when tired"],
    whenToSeeDoctor: ["Unable to bear weight", "Joint feels unstable", "Numbness in injured area", "Redness or red streaks", "Previous injury to same area", "Severe pain"]
  }
];

export const categories = [
  "Common Infections",
  "Respiratory",
  "Digestive",
  "Cardiovascular",
  "Skin",
  "Mental Health",
  "Musculoskeletal",
  "Neurological",
  "Infectious Diseases",
  "Metabolic",
  "Eye",
  "ENT",
  "Urinary",
  "Women's Health",
  "General",
  "Immune System"
];
