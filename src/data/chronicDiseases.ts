export interface ChronicDisease {
    id: string;
    name: string;
    icon: string;
    category: string;
    description: string;
    prevalence: string;
    riskFactors: string[];
    symptoms: string[];
    dailyManagement: {
        title: string;
        tips: string[];
    }[];
    dietRecommendations: {
        eat: string[];
        avoid: string[];
    };
    exerciseGuidelines: string[];
    medicationTips: string[];
    emotionalSupport: string[];
    emergencySigns: string[];
    lifestyleModifications: string[];
    monitoringChecklist: { item: string; frequency: string }[];
}

export const chronicDiseases: ChronicDisease[] = [
    {
        id: "diabetes-management",
        name: "Diabetes",
        icon: "🩺",
        category: "Metabolic",
        description: "Diabetes is a chronic condition where your body has trouble regulating blood sugar levels. With proper management, you can live a full, healthy life.",
        prevalence: "Over 400 million people worldwide live with diabetes",
        riskFactors: [
            "Family history of diabetes",
            "Overweight or obesity",
            "Sedentary lifestyle",
            "Age over 45",
            "High blood pressure",
            "History of gestational diabetes"
        ],
        symptoms: [
            "Increased thirst and frequent urination",
            "Unexplained weight loss",
            "Fatigue and weakness",
            "Blurred vision",
            "Slow-healing wounds",
            "Tingling in hands or feet"
        ],
        dailyManagement: [
            {
                title: "Morning Routine",
                tips: [
                    "Check blood sugar before breakfast",
                    "Take medications as prescribed",
                    "Eat a balanced breakfast with protein and fiber",
                    "Check your feet for any cuts or sores"
                ]
            },
            {
                title: "Throughout the Day",
                tips: [
                    "Eat regular meals at consistent times",
                    "Stay hydrated with water",
                    "Take short walks after meals",
                    "Monitor blood sugar before and after exercise"
                ]
            },
            {
                title: "Evening Care",
                tips: [
                    "Have dinner at least 2-3 hours before bed",
                    "Check blood sugar before sleeping",
                    "Inspect feet and apply moisturizer",
                    "Prepare healthy snacks for next day"
                ]
            }
        ],
        dietRecommendations: {
            eat: [
                "Non-starchy vegetables (broccoli, spinach, peppers)",
                "Whole grains (brown rice, quinoa, oats)",
                "Lean proteins (fish, chicken, legumes)",
                "Healthy fats (nuts, olive oil, avocado)",
                "Fresh fruits in moderation",
                "High-fiber foods"
            ],
            avoid: [
                "Sugary drinks and sodas",
                "Refined carbohydrates (white bread, pastries)",
                "Fried and processed foods",
                "Excessive alcohol",
                "High-sodium packaged foods",
                "Sweetened breakfast cereals"
            ]
        },
        exerciseGuidelines: [
            "Aim for 150 minutes of moderate activity per week",
            "Include both aerobic and resistance exercises",
            "Start slowly and gradually increase intensity",
            "Check blood sugar before and after exercise",
            "Carry fast-acting glucose during workouts",
            "Stay hydrated during physical activity"
        ],
        medicationTips: [
            "Take medications at the same time each day",
            "Never skip doses without consulting your doctor",
            "Keep a medication log",
            "Store insulin properly according to instructions",
            "Know the signs of low blood sugar",
            "Carry emergency glucose tablets"
        ],
        emotionalSupport: [
            "Join a diabetes support group",
            "Share your feelings with trusted friends or family",
            "Practice stress-reduction techniques",
            "Celebrate small health victories",
            "Consider talking to a counselor if feeling overwhelmed",
            "Connect with others managing diabetes online"
        ],
        emergencySigns: [
            "Blood sugar below 70 mg/dL or above 300 mg/dL",
            "Confusion or difficulty concentrating",
            "Rapid heartbeat or shakiness",
            "Fruity-smelling breath (sign of ketoacidosis)",
            "Nausea, vomiting, or abdominal pain",
            "Unconsciousness or seizures - CALL EMERGENCY"
        ],
        lifestyleModifications: [
            "Maintain a healthy weight",
            "Quit smoking",
            "Limit alcohol consumption",
            "Get adequate sleep (7-8 hours)",
            "Manage stress effectively",
            "Stay consistent with meal timing"
        ],
        monitoringChecklist: [
            { item: "Blood sugar check", frequency: "Daily (as recommended)" },
            { item: "Foot examination", frequency: "Daily" },
            { item: "Blood pressure check", frequency: "Weekly" },
            { item: "HbA1c test", frequency: "Every 3 months" },
            { item: "Eye examination", frequency: "Annually" },
            { item: "Kidney function test", frequency: "Annually" }
        ]
    },
    {
        id: "hypertension-management",
        name: "Hypertension",
        icon: "❤️",
        category: "Cardiovascular",
        description: "High blood pressure is a condition where the force of blood against artery walls is consistently too high. Managing it reduces risk of heart disease and stroke.",
        prevalence: "Nearly 1.3 billion people worldwide have hypertension",
        riskFactors: [
            "Age (risk increases with age)",
            "Family history",
            "Being overweight",
            "Lack of physical activity",
            "High sodium diet",
            "Chronic stress"
        ],
        symptoms: [
            "Often called 'silent killer' - usually no symptoms",
            "Severe headaches (in very high BP)",
            "Shortness of breath",
            "Nosebleeds",
            "Dizziness",
            "Chest pain"
        ],
        dailyManagement: [
            {
                title: "Morning Routine",
                tips: [
                    "Take blood pressure medication as prescribed",
                    "Measure BP before breakfast (same time daily)",
                    "Start day with gentle stretching",
                    "Eat a heart-healthy breakfast"
                ]
            },
            {
                title: "Throughout the Day",
                tips: [
                    "Practice deep breathing during stress",
                    "Take regular breaks from sitting",
                    "Choose low-sodium meal options",
                    "Stay physically active"
                ]
            },
            {
                title: "Evening Care",
                tips: [
                    "Avoid heavy meals close to bedtime",
                    "Practice relaxation techniques",
                    "Limit screen time before sleep",
                    "Take evening BP reading if recommended"
                ]
            }
        ],
        dietRecommendations: {
            eat: [
                "Fresh fruits and vegetables",
                "Whole grains",
                "Low-fat dairy products",
                "Lean proteins",
                "Potassium-rich foods (bananas, spinach)",
                "Foods high in magnesium"
            ],
            avoid: [
                "Salt and high-sodium foods",
                "Processed and packaged foods",
                "Red meat in excess",
                "Full-fat dairy",
                "Alcohol in excess",
                "Caffeine in large amounts"
            ]
        },
        exerciseGuidelines: [
            "Get at least 30 minutes of moderate exercise daily",
            "Walking, swimming, and cycling are excellent choices",
            "Avoid heavy weightlifting without guidance",
            "Warm up and cool down properly",
            "Stop exercising if you feel dizzy or chest pain",
            "Consistency is more important than intensity"
        ],
        medicationTips: [
            "Take BP medications at the same time daily",
            "Don't stop medication even if BP is normal",
            "Report side effects to your doctor",
            "Keep track of your medications",
            "Refill prescriptions before running out",
            "Understand how each medication works"
        ],
        emotionalSupport: [
            "Stress directly affects blood pressure",
            "Practice mindfulness and meditation",
            "Engage in hobbies you enjoy",
            "Maintain social connections",
            "Get enough quality sleep",
            "Seek help if feeling anxious or depressed"
        ],
        emergencySigns: [
            "BP reading above 180/120 mmHg",
            "Severe headache with confusion",
            "Chest pain or difficulty breathing",
            "Vision problems",
            "Difficulty speaking or weakness on one side",
            "Severe nosebleed that won't stop"
        ],
        lifestyleModifications: [
            "Reduce sodium to less than 2,300 mg daily",
            "Lose weight if overweight",
            "Quit smoking completely",
            "Limit alcohol to 1-2 drinks per day",
            "Manage stress through relaxation techniques",
            "Get 7-9 hours of quality sleep"
        ],
        monitoringChecklist: [
            { item: "Blood pressure measurement", frequency: "Daily or as advised" },
            { item: "Weight check", frequency: "Weekly" },
            { item: "Sodium intake tracking", frequency: "Daily" },
            { item: "Doctor visit", frequency: "Every 3-6 months" },
            { item: "Blood tests (cholesterol, kidney)", frequency: "Every 6-12 months" },
            { item: "ECG/Heart checkup", frequency: "Annually" }
        ]
    },
    {
        id: "asthma-management",
        name: "Asthma",
        icon: "💨",
        category: "Respiratory",
        description: "Asthma is a chronic condition affecting your airways. With proper management, you can control symptoms and live an active life.",
        prevalence: "Over 300 million people worldwide have asthma",
        riskFactors: [
            "Family history of asthma or allergies",
            "History of childhood respiratory infections",
            "Exposure to allergens or irritants",
            "Smoking or secondhand smoke exposure",
            "Obesity",
            "Occupational exposures"
        ],
        symptoms: [
            "Wheezing (whistling sound when breathing)",
            "Shortness of breath",
            "Chest tightness",
            "Coughing, especially at night",
            "Difficulty exercising",
            "Waking up due to breathing problems"
        ],
        dailyManagement: [
            {
                title: "Morning Routine",
                tips: [
                    "Take controller medication as prescribed",
                    "Check peak flow if recommended",
                    "Review air quality forecast",
                    "Keep rescue inhaler accessible"
                ]
            },
            {
                title: "Throughout the Day",
                tips: [
                    "Avoid known triggers",
                    "Stay hydrated",
                    "Take breaks in air-conditioned spaces on high pollen days",
                    "Practice breathing exercises"
                ]
            },
            {
                title: "Evening Care",
                tips: [
                    "Keep bedroom allergen-free",
                    "Use dust mite covers on bedding",
                    "Take evening medications if prescribed",
                    "Keep inhaler by bedside"
                ]
            }
        ],
        dietRecommendations: {
            eat: [
                "Fruits and vegetables rich in antioxidants",
                "Fish with omega-3 fatty acids",
                "Whole grains",
                "Foods with vitamin D",
                "Ginger and turmeric (anti-inflammatory)",
                "Plenty of water"
            ],
            avoid: [
                "Sulfites (in wine, dried fruits, pickled foods)",
                "Foods you're allergic to",
                "Highly processed foods",
                "Excessive dairy if it triggers symptoms",
                "Gas-producing foods before exercise",
                "Cold drinks if they trigger symptoms"
            ]
        },
        exerciseGuidelines: [
            "Exercise is beneficial for asthma control",
            "Warm up for 10-15 minutes before exercise",
            "Use rescue inhaler 15 minutes before if needed",
            "Avoid exercising in cold, dry air",
            "Choose swimming - humid air is easier on airways",
            "Stop and use inhaler if symptoms start"
        ],
        medicationTips: [
            "Know the difference between controller and rescue inhalers",
            "Use controller medication daily, even when feeling well",
            "Learn proper inhaler technique",
            "Rinse mouth after using steroid inhalers",
            "Track when you use rescue inhaler",
            "Keep spare rescue inhaler in multiple locations"
        ],
        emotionalSupport: [
            "Asthma can cause anxiety about breathing",
            "Learn relaxation breathing techniques",
            "Join an asthma support community",
            "Communicate openly with family about your needs",
            "Don't let asthma limit your life goals",
            "Seek counseling if anxiety about attacks is overwhelming"
        ],
        emergencySigns: [
            "Rescue inhaler provides no relief",
            "Severe shortness of breath - can't speak in sentences",
            "Lips or fingernails turning blue",
            "Struggling to breathe - using neck/chest muscles",
            "Peak flow reading in red zone",
            "Feeling panic or drowsiness from lack of oxygen"
        ],
        lifestyleModifications: [
            "Identify and avoid your personal triggers",
            "Keep home clean and dust-free",
            "Use air purifiers if helpful",
            "Don't smoke and avoid secondhand smoke",
            "Maintain a healthy weight",
            "Get flu and pneumonia vaccines"
        ],
        monitoringChecklist: [
            { item: "Peak flow measurement", frequency: "Daily or as advised" },
            { item: "Symptom diary", frequency: "Daily" },
            { item: "Rescue inhaler usage tracking", frequency: "Ongoing" },
            { item: "Trigger identification", frequency: "Ongoing" },
            { item: "Asthma action plan review", frequency: "Every 6 months" },
            { item: "Pulmonologist visit", frequency: "Every 6-12 months" }
        ]
    },
    {
        id: "arthritis-management",
        name: "Arthritis",
        icon: "🦴",
        category: "Musculoskeletal",
        description: "Arthritis causes joint pain and stiffness. With proper care, you can reduce pain, maintain mobility, and preserve joint function.",
        prevalence: "Over 350 million people worldwide have arthritis",
        riskFactors: [
            "Age (risk increases after 50)",
            "Family history",
            "Previous joint injuries",
            "Obesity",
            "Certain occupations with repetitive movements",
            "Gender (more common in women)"
        ],
        symptoms: [
            "Joint pain and tenderness",
            "Stiffness, especially in morning",
            "Swelling around joints",
            "Reduced range of motion",
            "Heat and redness in affected areas",
            "Fatigue (especially in inflammatory arthritis)"
        ],
        dailyManagement: [
            {
                title: "Morning Routine",
                tips: [
                    "Take a warm shower to reduce stiffness",
                    "Do gentle stretching exercises",
                    "Take morning medications with food",
                    "Use assistive devices if needed"
                ]
            },
            {
                title: "Throughout the Day",
                tips: [
                    "Alternate activity with rest periods",
                    "Protect joints during daily tasks",
                    "Use proper posture",
                    "Apply heat or cold as needed"
                ]
            },
            {
                title: "Evening Care",
                tips: [
                    "Gentle evening stretches",
                    "Apply topical treatments if used",
                    "Prepare for comfortable sleep position",
                    "Use supportive pillows for joints"
                ]
            }
        ],
        dietRecommendations: {
            eat: [
                "Fatty fish (salmon, mackerel) for omega-3s",
                "Colorful fruits and vegetables",
                "Nuts and seeds",
                "Olive oil",
                "Whole grains",
                "Anti-inflammatory spices (turmeric, ginger)"
            ],
            avoid: [
                "Processed and fried foods",
                "Sugar and refined carbs",
                "Red meat in excess",
                "Alcohol",
                "Highly processed vegetable oils",
                "Foods that trigger your symptoms"
            ]
        },
        exerciseGuidelines: [
            "Low-impact exercises are best (swimming, walking, cycling)",
            "Include range-of-motion exercises daily",
            "Strengthen muscles around affected joints",
            "Don't exercise inflamed joints",
            "Warm up joints before activity",
            "Listen to your body and rest when needed"
        ],
        medicationTips: [
            "Take anti-inflammatory medications with food",
            "Apply topical treatments as directed",
            "Don't exceed recommended doses of pain relievers",
            "Report new symptoms to your doctor",
            "Understand the difference between types of arthritis medications",
            "Consider physical therapy as part of treatment"
        ],
        emotionalSupport: [
            "Chronic pain can affect mood - this is normal",
            "Join an arthritis support group",
            "Practice mindfulness for pain management",
            "Stay socially connected despite limitations",
            "Celebrate what you CAN do",
            "Seek help for depression if needed"
        ],
        emergencySigns: [
            "Sudden severe joint swelling",
            "Joint feels hot and looks very red",
            "Fever along with joint symptoms",
            "Inability to move a joint",
            "Sudden worsening of symptoms",
            "Signs of infection (warmth, redness, fever)"
        ],
        lifestyleModifications: [
            "Maintain a healthy weight to reduce joint stress",
            "Use ergonomic tools and assistive devices",
            "Protect joints during activities",
            "Balance activity with rest",
            "Sleep on a supportive mattress",
            "Quit smoking (worsens arthritis)"
        ],
        monitoringChecklist: [
            { item: "Pain and stiffness levels", frequency: "Daily" },
            { item: "Joint mobility assessment", frequency: "Weekly" },
            { item: "Medication effectiveness", frequency: "Ongoing" },
            { item: "Rheumatologist visit", frequency: "Every 3-6 months" },
            { item: "Blood tests (inflammation markers)", frequency: "Every 3-6 months" },
            { item: "X-rays/imaging if needed", frequency: "Annually or as advised" }
        ]
    },
    {
        id: "copd-management",
        name: "COPD",
        icon: "🫁",
        category: "Respiratory",
        description: "Chronic Obstructive Pulmonary Disease makes breathing difficult. With proper management, you can slow progression and maintain quality of life.",
        prevalence: "Over 380 million people worldwide have COPD",
        riskFactors: [
            "Smoking (primary cause)",
            "Long-term exposure to lung irritants",
            "Alpha-1 antitrypsin deficiency",
            "Occupational dust and chemicals",
            "Indoor air pollution",
            "Respiratory infections in childhood"
        ],
        symptoms: [
            "Chronic cough with mucus",
            "Shortness of breath, especially with activity",
            "Wheezing",
            "Chest tightness",
            "Frequent respiratory infections",
            "Low energy and fatigue"
        ],
        dailyManagement: [
            {
                title: "Morning Routine",
                tips: [
                    "Take controller medications",
                    "Practice pursed-lip breathing",
                    "Clear airways with controlled coughing",
                    "Check oxygen levels if using oximeter"
                ]
            },
            {
                title: "Throughout the Day",
                tips: [
                    "Pace activities to avoid breathlessness",
                    "Stay hydrated to thin mucus",
                    "Avoid air pollutants and irritants",
                    "Take rest breaks during activities"
                ]
            },
            {
                title: "Evening Care",
                tips: [
                    "Use humidifier if air is dry",
                    "Sleep with head elevated if needed",
                    "Take evening medications",
                    "Practice relaxation for better sleep"
                ]
            }
        ],
        dietRecommendations: {
            eat: [
                "High-protein foods for muscle strength",
                "Complex carbohydrates",
                "Healthy fats",
                "Fresh fruits and vegetables",
                "Small, frequent meals",
                "Plenty of fluids"
            ],
            avoid: [
                "Foods that cause bloating",
                "Excessive salt",
                "Fried and fatty foods",
                "Carbonated beverages",
                "Large meals that press on diaphragm",
                "Foods you're allergic to"
            ]
        },
        exerciseGuidelines: [
            "Start with pulmonary rehabilitation program",
            "Walking is excellent and adaptable",
            "Include breathing exercises daily",
            "Arm exercises help with daily activities",
            "Exercise at a comfortable pace",
            "Use supplemental oxygen if prescribed during exercise"
        ],
        medicationTips: [
            "Use inhalers with proper technique",
            "Understand the difference between your medications",
            "Take controller medications daily",
            "Keep rescue inhaler always accessible",
            "Complete antibiotic courses for infections",
            "Get flu and pneumonia vaccines"
        ],
        emotionalSupport: [
            "COPD can cause anxiety and depression",
            "Breathing difficulties can be frightening - this is normal",
            "Join a COPD support group",
            "Learn relaxation techniques to manage breathlessness",
            "Stay socially active within your limits",
            "Consider pulmonary rehabilitation for support"
        ],
        emergencySigns: [
            "Severe shortness of breath that doesn't improve with medication",
            "Confusion or excessive sleepiness",
            "Lips or fingernails turning blue",
            "Rapid heartbeat that doesn't slow down",
            "High fever with worsening symptoms",
            "Unable to speak due to breathlessness"
        ],
        lifestyleModifications: [
            "QUIT SMOKING - most important step",
            "Avoid secondhand smoke and pollutants",
            "Conserve energy with activity pacing",
            "Maintain healthy weight",
            "Get adequate rest",
            "Keep air clean at home"
        ],
        monitoringChecklist: [
            { item: "Oxygen saturation check", frequency: "Daily if using oximeter" },
            { item: "Symptom tracking (cough, mucus, breathlessness)", frequency: "Daily" },
            { item: "Peak flow or spirometry", frequency: "As advised" },
            { item: "Weight monitoring", frequency: "Weekly" },
            { item: "Pulmonologist visit", frequency: "Every 3-6 months" },
            { item: "Pulmonary function test", frequency: "Annually" }
        ]
    },
    {
        id: "heart-disease-management",
        name: "Heart Disease",
        icon: "🫀",
        category: "Cardiovascular",
        description: "Heart disease includes conditions affecting your heart. With lifestyle changes and proper care, you can protect your heart and improve quality of life.",
        prevalence: "Heart disease is the leading cause of death globally",
        riskFactors: [
            "High blood pressure",
            "High cholesterol",
            "Diabetes",
            "Smoking",
            "Obesity",
            "Family history of heart disease"
        ],
        symptoms: [
            "Chest pain or discomfort",
            "Shortness of breath",
            "Fatigue",
            "Swelling in legs and feet",
            "Irregular heartbeat",
            "Dizziness or lightheadedness"
        ],
        dailyManagement: [
            {
                title: "Morning Routine",
                tips: [
                    "Take heart medications as prescribed",
                    "Check blood pressure and heart rate",
                    "Eat a heart-healthy breakfast",
                    "Plan physical activity for the day"
                ]
            },
            {
                title: "Throughout the Day",
                tips: [
                    "Stay physically active",
                    "Manage stress levels",
                    "Choose heart-healthy meals and snacks",
                    "Stay hydrated with water"
                ]
            },
            {
                title: "Evening Care",
                tips: [
                    "Have a light, early dinner",
                    "Practice relaxation before bed",
                    "Take evening medications",
                    "Get adequate, quality sleep"
                ]
            }
        ],
        dietRecommendations: {
            eat: [
                "Fish rich in omega-3s (salmon, sardines)",
                "Lots of vegetables and fruits",
                "Whole grains",
                "Nuts and legumes",
                "Olive oil",
                "Foods high in fiber"
            ],
            avoid: [
                "Saturated and trans fats",
                "Excessive salt (sodium)",
                "Sugary foods and drinks",
                "Red and processed meats",
                "Refined carbohydrates",
                "Excessive alcohol"
            ]
        },
        exerciseGuidelines: [
            "Follow your doctor's specific exercise recommendations",
            "Start slowly if new to exercise",
            "Aim for 150 minutes of moderate activity per week",
            "Include both cardio and light strength training",
            "Know warning signs to stop exercise",
            "Consider cardiac rehabilitation if recommended"
        ],
        medicationTips: [
            "Take medications exactly as prescribed",
            "Never stop heart medications without consulting doctor",
            "Understand what each medication does",
            "Keep a list of all medications with you",
            "Report any side effects immediately",
            "Use pill organizers to stay on track"
        ],
        emotionalSupport: [
            "Heart disease diagnosis can be emotionally overwhelming",
            "Depression is common and affects heart health",
            "Join a cardiac support group",
            "Practice stress reduction daily",
            "Stay connected with loved ones",
            "Consider counseling if struggling emotionally"
        ],
        emergencySigns: [
            "Chest pain lasting more than a few minutes - CALL EMERGENCY",
            "Pain spreading to arm, jaw, or back",
            "Sudden severe shortness of breath",
            "Fainting or near-fainting",
            "Sudden cold sweat with discomfort",
            "Rapid or irregular heartbeat with other symptoms"
        ],
        lifestyleModifications: [
            "Quit smoking completely",
            "Maintain healthy weight",
            "Limit alcohol consumption",
            "Manage stress effectively",
            "Get 7-8 hours of quality sleep",
            "Control blood pressure, cholesterol, and diabetes"
        ],
        monitoringChecklist: [
            { item: "Blood pressure check", frequency: "Daily" },
            { item: "Weight monitoring", frequency: "Daily (for heart failure)" },
            { item: "Symptom tracking", frequency: "Daily" },
            { item: "Cardiologist visit", frequency: "Every 3-6 months" },
            { item: "Blood tests (lipids, glucose)", frequency: "Every 3-6 months" },
            { item: "ECG and cardiac tests", frequency: "As recommended" }
        ]
    }
];
