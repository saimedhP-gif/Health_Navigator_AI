export interface NaturalTechnique {
  id: string;
  name: string;
  category: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  description: string;
  benefits: string[];
  howToStart: string[];
  safetyNotes: string[];
  frequency: string;
}

export const naturalHealthTechniques: NaturalTechnique[] = [
  // Nutrition & Herbal Remedies
  {
    id: "anti-inflammatory-diet",
    name: "Anti-Inflammatory Diet",
    category: "Nutrition & Herbal",
    icon: "🥗",
    difficulty: "beginner",
    duration: "Ongoing lifestyle",
    description: "A dietary approach focusing on whole foods that reduce inflammation in the body, emphasizing fruits, vegetables, healthy fats, and lean proteins while limiting processed foods and refined sugars.",
    benefits: [
      "Reduces chronic inflammation linked to many diseases",
      "Supports heart health and cardiovascular function",
      "May help manage joint pain and arthritis symptoms",
      "Improves energy levels and mental clarity",
      "Supports healthy weight management"
    ],
    howToStart: [
      "Increase intake of colorful fruits and vegetables (aim for 5+ servings daily)",
      "Choose whole grains over refined grains",
      "Include fatty fish like salmon 2-3 times per week for omega-3s",
      "Use olive oil as your primary cooking fat",
      "Add anti-inflammatory spices like turmeric, ginger, and garlic to meals",
      "Limit processed foods, added sugars, and red meat"
    ],
    safetyNotes: [
      "Consult a healthcare provider before making major dietary changes, especially if you have diabetes or take medications",
      "Introduce new foods gradually to monitor for any adverse reactions",
      "Ensure you're meeting all nutritional needs, especially protein and B12"
    ],
    frequency: "Daily - make it your regular eating pattern"
  },
  {
    id: "herbal-teas",
    name: "Medicinal Herbal Teas",
    category: "Nutrition & Herbal",
    icon: "🍵",
    difficulty: "beginner",
    duration: "10-15 minutes",
    description: "Using herbal infusions for their therapeutic properties. Different herbs offer various health benefits from calming to immune-boosting effects.",
    benefits: [
      "Chamomile: promotes relaxation and better sleep",
      "Ginger: aids digestion and reduces nausea",
      "Peppermint: relieves digestive discomfort and headaches",
      "Echinacea: may support immune function",
      "Green tea: rich in antioxidants, supports metabolism"
    ],
    howToStart: [
      "Start with one type of herbal tea to observe its effects on you",
      "Use fresh, high-quality loose-leaf herbs or reputable tea brands",
      "Steep for the recommended time (usually 5-10 minutes) for optimal benefits",
      "Drink 1-3 cups daily depending on the herb",
      "Best consumed without added sugars to maximize health benefits"
    ],
    safetyNotes: [
      "Some herbs interact with medications - consult your pharmacist or doctor",
      "Avoid certain herbs during pregnancy (e.g., chamomile in large amounts)",
      "Watch for allergic reactions, especially with chamomile if allergic to ragweed",
      "Do not use herbal teas as a substitute for prescribed medications"
    ],
    frequency: "1-3 cups daily, depending on the herb"
  },
  {
    id: "immune-boosting-foods",
    name: "Immune-Boosting Foods",
    category: "Nutrition & Herbal",
    icon: "🍊",
    difficulty: "beginner",
    duration: "Ongoing lifestyle",
    description: "Incorporating specific nutrient-rich foods that support and strengthen the immune system, including vitamin C-rich fruits, zinc-containing foods, and probiotic sources.",
    benefits: [
      "Strengthens the body's natural defense mechanisms",
      "May reduce duration and severity of common illnesses",
      "Supports overall gut health which is linked to immunity",
      "Provides essential vitamins and minerals naturally",
      "Reduces inflammation that can weaken immune response"
    ],
    howToStart: [
      "Add citrus fruits (oranges, lemons, grapefruits) daily for vitamin C",
      "Include garlic and onions in cooking for their antimicrobial properties",
      "Eat probiotic-rich foods like yogurt, kefir, or sauerkraut",
      "Consume zinc-rich foods like pumpkin seeds, chickpeas, and lentils",
      "Include mushrooms (shiitake, maitake) for beta-glucans",
      "Stay well-hydrated with water and herbal teas"
    ],
    safetyNotes: [
      "Supplements should not replace a balanced diet",
      "Excessive vitamin intake can be harmful - food sources are preferred",
      "Those with autoimmune conditions should consult a doctor before boosting immune function"
    ],
    frequency: "Include immune-supporting foods in every meal"
  },
  
  // Mind-Body Practices
  {
    id: "basic-meditation",
    name: "Basic Mindfulness Meditation",
    category: "Mind-Body",
    icon: "🧘",
    difficulty: "beginner",
    duration: "5-20 minutes",
    description: "A practice of focused attention and present-moment awareness that helps calm the mind, reduce stress, and improve emotional regulation. Suitable for complete beginners.",
    benefits: [
      "Reduces stress and anxiety symptoms",
      "Improves focus and concentration",
      "Enhances emotional regulation",
      "May lower blood pressure",
      "Promotes better sleep quality",
      "Increases self-awareness and mindfulness in daily life"
    ],
    howToStart: [
      "Find a quiet, comfortable space where you won't be disturbed",
      "Sit comfortably with your back straight (chair or cushion)",
      "Set a timer for 5 minutes to start",
      "Close your eyes and focus on your natural breathing",
      "When thoughts arise, gently acknowledge them and return focus to breath",
      "Gradually increase duration as comfort grows",
      "Consider using guided meditation apps for structure"
    ],
    safetyNotes: [
      "If you experience increased anxiety during meditation, try shorter sessions or guided practices",
      "Those with trauma history may want to start with eyes open or movement-based meditation",
      "Meditation is a complement to, not replacement for, professional mental health treatment"
    ],
    frequency: "Daily practice recommended, even just 5 minutes"
  },
  {
    id: "box-breathing",
    name: "Box Breathing Technique",
    category: "Mind-Body",
    icon: "📦",
    difficulty: "beginner",
    duration: "2-5 minutes",
    description: "A powerful yet simple breathing technique used by Navy SEALs to calm the nervous system. It involves equal counts of inhaling, holding, exhaling, and holding again.",
    benefits: [
      "Rapidly reduces acute stress and anxiety",
      "Activates the parasympathetic (calming) nervous system",
      "Improves focus and mental clarity",
      "Can be done anywhere, anytime",
      "Helps regulate emotional responses",
      "May help with sleep onset when done before bed"
    ],
    howToStart: [
      "Sit or stand comfortably with good posture",
      "Exhale completely to empty your lungs",
      "Inhale slowly through your nose for 4 counts",
      "Hold your breath for 4 counts",
      "Exhale slowly through your mouth for 4 counts",
      "Hold your breath (lungs empty) for 4 counts",
      "Repeat for 4-8 cycles",
      "Adjust count timing to your comfort (3 or 5 counts if needed)"
    ],
    safetyNotes: [
      "If you feel dizzy, return to normal breathing immediately",
      "Those with respiratory conditions should consult a doctor first",
      "Do not practice while driving or operating machinery"
    ],
    frequency: "As needed for stress relief, or 2-3 times daily for ongoing benefits"
  },
  {
    id: "progressive-muscle-relaxation",
    name: "Progressive Muscle Relaxation",
    category: "Mind-Body",
    icon: "💪",
    difficulty: "beginner",
    duration: "10-20 minutes",
    description: "A technique involving systematically tensing and releasing different muscle groups to achieve deep physical and mental relaxation. Excellent for stress relief and sleep improvement.",
    benefits: [
      "Releases physical tension stored in muscles",
      "Reduces symptoms of anxiety and stress",
      "Improves sleep quality when done before bed",
      "Increases body awareness",
      "May help reduce headaches and chronic pain",
      "Teaches the difference between tension and relaxation"
    ],
    howToStart: [
      "Lie down or sit comfortably in a quiet space",
      "Take a few deep breaths to center yourself",
      "Start with your feet: tense the muscles for 5-10 seconds",
      "Release and notice the sensation of relaxation for 15-20 seconds",
      "Move upward: calves, thighs, abdomen, chest, hands, arms, shoulders, face",
      "End with a few deep breaths and notice your overall state",
      "Practice regularly to improve the relaxation response"
    ],
    safetyNotes: [
      "Do not tense muscles to the point of pain or cramping",
      "Skip any muscle groups that are injured",
      "If you have high blood pressure, consult a doctor as tensing can briefly raise BP"
    ],
    frequency: "Daily, especially before bed or during high-stress periods"
  },
  {
    id: "gratitude-practice",
    name: "Gratitude Journaling",
    category: "Mind-Body",
    icon: "📓",
    difficulty: "beginner",
    duration: "5-10 minutes",
    description: "A simple daily practice of writing down things you're grateful for, which has been shown to shift mental focus toward positivity and improve overall well-being.",
    benefits: [
      "Improves overall mood and emotional well-being",
      "Reduces symptoms of depression and anxiety",
      "Enhances relationships and social connections",
      "Improves sleep quality",
      "Increases resilience to stress",
      "Creates a lasting positive mindset shift"
    ],
    howToStart: [
      "Get a dedicated journal or notebook for this practice",
      "Set a specific time daily (morning or evening works best)",
      "Write 3-5 things you're grateful for each day",
      "Be specific rather than general ('the warm sun on my face during lunch')",
      "Include small things, not just major events",
      "Notice how you feel after writing"
    ],
    safetyNotes: [
      "Don't use this to suppress or invalidate difficult emotions",
      "It's okay if some days feel harder than others",
      "This is a supplement to, not replacement for, professional mental health care"
    ],
    frequency: "Daily practice yields the best results"
  },
  
  // Physical Wellness
  {
    id: "gentle-morning-yoga",
    name: "Gentle Morning Yoga Routine",
    category: "Physical Wellness",
    icon: "🌅",
    difficulty: "beginner",
    duration: "15-30 minutes",
    description: "A series of gentle yoga poses designed to wake up the body, increase flexibility, and set a calm, focused tone for the day. Suitable for all fitness levels.",
    benefits: [
      "Increases flexibility and range of motion",
      "Energizes the body naturally without caffeine",
      "Reduces morning stiffness and muscle tension",
      "Improves posture over time",
      "Combines physical movement with mindfulness",
      "Sets a positive intention for the day"
    ],
    howToStart: [
      "Start with Cat-Cow stretches to warm up the spine (1 minute)",
      "Move to Child's Pose for gentle back stretch (30 seconds)",
      "Practice Downward-Facing Dog for full body stretch (30 seconds)",
      "Step forward into a Low Lunge on each side (30 seconds each)",
      "Stand in Mountain Pose with arms raised (30 seconds)",
      "End with Standing Forward Fold (30 seconds)",
      "Use a yoga mat and comfortable clothing",
      "Follow along with a beginner YouTube video for guidance"
    ],
    safetyNotes: [
      "Never force a stretch - stop if you feel pain",
      "Inform your instructor of any injuries or conditions",
      "Modify poses as needed using blocks, straps, or chairs",
      "Avoid inversions if you have high blood pressure or glaucoma"
    ],
    frequency: "Daily or 3-5 times per week for best results"
  },
  {
    id: "nature-walking",
    name: "Forest Bathing / Nature Walking",
    category: "Physical Wellness",
    icon: "🌳",
    difficulty: "beginner",
    duration: "20-60 minutes",
    description: "The Japanese practice of 'Shinrin-yoku' involves mindfully walking in nature, engaging all senses to absorb the forest atmosphere. Research shows significant health benefits.",
    benefits: [
      "Significantly reduces cortisol (stress hormone) levels",
      "Lowers blood pressure and heart rate",
      "Boosts immune system function (increases NK cells)",
      "Improves mood and reduces anxiety and depression",
      "Enhances creativity and cognitive function",
      "Provides gentle exercise without intensity"
    ],
    howToStart: [
      "Find a natural area: park, forest, trail, or garden",
      "Leave phones on silent and avoid distractions",
      "Walk slowly and deliberately, without a destination goal",
      "Engage your senses: notice colors, sounds, smells, textures",
      "Stop occasionally to observe nature closely",
      "Breathe deeply and let your mind wander naturally",
      "Aim for at least 20 minutes for measurable benefits"
    ],
    safetyNotes: [
      "Tell someone where you're going if walking alone",
      "Wear appropriate footwear for the terrain",
      "Be aware of weather conditions and wildlife",
      "Stay on marked trails in unfamiliar areas"
    ],
    frequency: "At least once weekly, more often if possible"
  },
  {
    id: "sleep-hygiene",
    name: "Sleep Hygiene Optimization",
    category: "Physical Wellness",
    icon: "😴",
    difficulty: "beginner",
    duration: "Ongoing practice",
    description: "A set of habits and environmental adjustments that promote consistent, restorative sleep. Good sleep hygiene is fundamental to physical and mental health.",
    benefits: [
      "Improves sleep quality and duration",
      "Enhances daytime energy and alertness",
      "Supports immune function and healing",
      "Improves mood and emotional regulation",
      "Enhances memory consolidation and learning",
      "Reduces risk of chronic diseases"
    ],
    howToStart: [
      "Set consistent wake and sleep times, even on weekends",
      "Create a dark, cool (65-68°F/18-20°C), quiet bedroom",
      "Avoid screens for 1 hour before bed (blue light blocks melatonin)",
      "Stop caffeine at least 6 hours before bedtime",
      "Limit alcohol, which disrupts sleep quality",
      "Create a relaxing bedtime routine (reading, gentle stretching, bath)",
      "Reserve bed for sleep and intimacy only",
      "Get morning sunlight exposure to regulate circadian rhythm"
    ],
    safetyNotes: [
      "Persistent sleep problems may indicate a sleep disorder - consult a doctor",
      "Avoid sleeping pills without medical supervision",
      "If you regularly take more than 20 minutes to fall asleep, see a sleep specialist"
    ],
    frequency: "Apply these practices every day for best results"
  },
  {
    id: "desk-stretching",
    name: "Office Desk Stretches",
    category: "Physical Wellness",
    icon: "💼",
    difficulty: "beginner",
    duration: "5-10 minutes",
    description: "Simple stretches that can be done at your desk to counteract the negative effects of prolonged sitting, reduce tension, and maintain flexibility throughout the workday.",
    benefits: [
      "Reduces neck, shoulder, and back tension",
      "Improves posture and spinal alignment",
      "Increases blood flow and energy",
      "Prevents repetitive strain injuries",
      "Improves focus and productivity",
      "Can be done in work clothes without equipment"
    ],
    howToStart: [
      "Neck rolls: slowly rotate head in circles (30 seconds each direction)",
      "Shoulder shrugs: raise shoulders to ears, hold 5 seconds, release",
      "Seated spinal twist: twist torso while holding chair (20 seconds each side)",
      "Chest opener: clasp hands behind back, lift and squeeze shoulder blades",
      "Wrist stretches: extend arm, pull fingers back gently (20 seconds each)",
      "Seated hip stretch: cross ankle over opposite knee, lean forward gently",
      "Set hourly reminders to stand and stretch"
    ],
    safetyNotes: [
      "Move slowly and gently, never forcing any stretch",
      "Stop if you feel pain (mild discomfort is okay)",
      "If you have injuries, consult a physical therapist for appropriate modifications"
    ],
    frequency: "Every 1-2 hours during sedentary work"
  },
  
  // Traditional & Alternative Therapies
  {
    id: "aromatherapy-basics",
    name: "Aromatherapy Essentials",
    category: "Traditional Therapies",
    icon: "💐",
    difficulty: "beginner",
    duration: "15-30 minutes (varies)",
    description: "Using essential oils derived from plants for therapeutic purposes. Different oils have different properties, from calming lavender to energizing peppermint.",
    benefits: [
      "Lavender: promotes relaxation and sleep",
      "Peppermint: improves alertness and eases headaches",
      "Eucalyptus: supports respiratory health",
      "Tea tree: has antimicrobial properties",
      "Lemon: uplifts mood and purifies air",
      "Chamomile: calms anxiety and promotes sleep"
    ],
    howToStart: [
      "Start with 3-5 high-quality essential oils from reputable brands",
      "Use a diffuser to disperse oils into the air safely",
      "For topical use, always dilute with a carrier oil (coconut, jojoba)",
      "Start with low concentrations to test sensitivity",
      "Create blends based on your needs (relaxation, focus, immunity)",
      "Learn which oils complement each other"
    ],
    safetyNotes: [
      "Never apply undiluted essential oils directly to skin",
      "Some oils are toxic to pets - research before diffusing around animals",
      "Certain oils should be avoided during pregnancy",
      "Do not ingest essential oils without professional guidance",
      "Perform a patch test before widespread topical use"
    ],
    frequency: "Use as needed, typically 30-60 minutes of diffusing at a time"
  },
  {
    id: "acupressure-basics",
    name: "Self-Acupressure Points",
    category: "Traditional Therapies",
    icon: "👆",
    difficulty: "beginner",
    duration: "2-10 minutes",
    description: "Applying pressure to specific points on the body based on traditional Chinese medicine principles. Can be done without equipment to relieve various common ailments.",
    benefits: [
      "Can provide relief from headaches and migraines",
      "May reduce nausea (PC6 point)",
      "Helps relieve stress and anxiety",
      "May improve sleep quality",
      "Accessible self-care tool requiring no equipment",
      "Based on thousands of years of traditional practice"
    ],
    howToStart: [
      "LI4 (Hegu): For headaches - press web between thumb and index finger",
      "PC6 (Neiguan): For nausea - 3 finger widths below wrist crease, between tendons",
      "GB20: For tension headaches - base of skull, in hollow between neck muscles",
      "ST36: For energy - 4 finger widths below kneecap, outside of shinbone",
      "Apply firm pressure for 1-3 minutes per point",
      "Breathe deeply while applying pressure",
      "Press to the point of mild discomfort, not pain"
    ],
    safetyNotes: [
      "Avoid pressing on wounds, bruises, or varicose veins",
      "LI4 should be avoided during pregnancy",
      "If pain increases, stop immediately",
      "Not a replacement for medical treatment of serious conditions"
    ],
    frequency: "As needed for symptom relief"
  },
  {
    id: "contrast-hydrotherapy",
    name: "Contrast Hydrotherapy",
    category: "Traditional Therapies",
    icon: "🚿",
    difficulty: "intermediate",
    duration: "10-15 minutes",
    description: "Alternating between hot and cold water to improve circulation, reduce inflammation, boost immunity, and increase energy. Can be done in the shower.",
    benefits: [
      "Improves blood circulation throughout the body",
      "May boost immune system function",
      "Reduces muscle soreness after exercise",
      "Increases alertness and energy",
      "May improve lymphatic drainage",
      "Trains cardiovascular system"
    ],
    howToStart: [
      "Start at the end of your regular shower",
      "Begin with 1 minute of warm/hot water (comfortable, not scalding)",
      "Switch to 30 seconds of cool/cold water",
      "Repeat the cycle 3-5 times",
      "Always end on cold for an energizing effect",
      "Start with mild temperature contrasts and gradually increase",
      "Focus the cold water on less sensitive areas first (arms, legs)"
    ],
    safetyNotes: [
      "Avoid if you have heart conditions or uncontrolled blood pressure",
      "Do not use extreme temperatures",
      "Avoid if you have Raynaud's disease or cold sensitivity",
      "Consult a doctor if pregnant or have circulatory issues"
    ],
    frequency: "3-7 times per week for ongoing benefits"
  },
  {
    id: "sound-healing",
    name: "Sound Healing & Music Therapy",
    category: "Traditional Therapies",
    icon: "🎵",
    difficulty: "beginner",
    duration: "10-30 minutes",
    description: "Using sound vibrations, music, and rhythmic patterns to promote relaxation, reduce stress, and support healing. Includes singing bowls, binaural beats, and calming music.",
    benefits: [
      "Induces deep relaxation and reduces stress",
      "May lower blood pressure and heart rate",
      "Helps with meditation and focus",
      "Can improve mood and reduce anxiety",
      "May enhance sleep quality",
      "Creates sacred space for self-reflection"
    ],
    howToStart: [
      "Explore different types: singing bowls, binaural beats, nature sounds, calming music",
      "Find a comfortable position and quiet environment",
      "Use headphones for binaural beats (different frequencies in each ear)",
      "Set an intention for your session (relaxation, healing, focus)",
      "Allow your mind to follow the sounds without judgment",
      "Notice sensations in your body as you listen",
      "Many free resources available on YouTube and Spotify"
    ],
    safetyNotes: [
      "Binaural beats may not be suitable for those with epilepsy",
      "Do not use as a replacement for medical treatment",
      "If certain sounds cause distress, stop and try something different",
      "Keep volume at safe levels to protect hearing"
    ],
    frequency: "Daily or as needed for stress relief"
  },
  
  // Lifestyle & Prevention
  {
    id: "stress-management",
    name: "Comprehensive Stress Management",
    category: "Lifestyle & Prevention",
    icon: "🧠",
    difficulty: "beginner",
    duration: "Ongoing practice",
    description: "A holistic approach to managing stress through multiple strategies including time management, boundary setting, relaxation techniques, and lifestyle modifications.",
    benefits: [
      "Reduces chronic stress and its health impacts",
      "Improves mental clarity and decision-making",
      "Enhances emotional resilience",
      "Improves sleep quality",
      "Strengthens immune function",
      "Improves relationships through better emotional regulation"
    ],
    howToStart: [
      "Identify your main stressors and triggers",
      "Practice saying 'no' to non-essential commitments",
      "Break large tasks into smaller, manageable steps",
      "Schedule regular breaks and downtime",
      "Build a support network of friends and family",
      "Limit news and social media consumption",
      "Incorporate daily relaxation practices (breathing, meditation)",
      "Maintain regular exercise, even walking helps"
    ],
    safetyNotes: [
      "Chronic stress may require professional support - don't hesitate to seek help",
      "Some stress is normal and even beneficial (eustress)",
      "If stress is overwhelming, consult a mental health professional"
    ],
    frequency: "Apply stress management strategies daily"
  },
  {
    id: "digital-detox",
    name: "Digital Detox Practice",
    category: "Lifestyle & Prevention",
    icon: "📵",
    difficulty: "beginner",
    duration: "1-24+ hours",
    description: "Intentionally disconnecting from digital devices and screens to reduce mental overwhelm, improve sleep, and reconnect with the physical world and in-person relationships.",
    benefits: [
      "Reduces mental fatigue and information overload",
      "Improves sleep quality (reduces blue light exposure)",
      "Increases present-moment awareness",
      "Enhances in-person social connections",
      "Reduces comparison and social media-related anxiety",
      "Increases productivity and focus"
    ],
    howToStart: [
      "Start with phone-free meals",
      "Create a charging station outside the bedroom",
      "Set specific 'no phone' hours (e.g., first hour after waking)",
      "Turn off non-essential notifications",
      "Plan screen-free activities: reading, crafts, outdoor time",
      "Try a 'digital sabbath' - one day per week offline",
      "Use app timers to limit social media usage"
    ],
    safetyNotes: [
      "Let important contacts know about your detox periods",
      "Ensure you can still be reached for genuine emergencies",
      "If you experience significant anxiety from disconnecting, start very gradually"
    ],
    frequency: "Daily phone-free periods, plus longer detoxes weekly or monthly"
  },
  {
    id: "circadian-optimization",
    name: "Circadian Rhythm Optimization",
    category: "Lifestyle & Prevention",
    icon: "☀️",
    difficulty: "beginner",
    duration: "Ongoing practice",
    description: "Aligning your daily activities with your body's natural 24-hour internal clock to optimize energy, sleep, digestion, and overall health.",
    benefits: [
      "Improves sleep quality and duration",
      "Increases daytime energy and alertness",
      "Enhances mood and emotional stability",
      "Optimizes hormone production",
      "Improves metabolic health",
      "Enhances cognitive performance"
    ],
    howToStart: [
      "Get bright light exposure within 30 minutes of waking",
      "Go outside during daylight hours, especially morning",
      "Keep consistent sleep and wake times (even weekends)",
      "Dim lights 2 hours before bed",
      "Avoid eating 2-3 hours before sleep",
      "Exercise in the morning or early afternoon (not late evening)",
      "Use blue light blocking glasses in the evening if needed"
    ],
    safetyNotes: [
      "Shift workers may need specialized advice for their schedules",
      "Light therapy boxes can help but should be used appropriately",
      "Sudden changes to sleep schedule can cause temporary issues"
    ],
    frequency: "Apply these practices daily for cumulative benefits"
  },
  {
    id: "environmental-wellness",
    name: "Home Environmental Wellness",
    category: "Lifestyle & Prevention",
    icon: "🏠",
    difficulty: "beginner",
    duration: "Ongoing practice",
    description: "Creating a healthy living environment through air quality improvement, natural light optimization, reducing toxin exposure, and connecting with nature indoors.",
    benefits: [
      "Improves respiratory health through better air quality",
      "Reduces exposure to harmful chemicals",
      "Enhances mood through natural light and plants",
      "Creates a calming, restorative home environment",
      "May reduce allergy and asthma symptoms",
      "Supports better sleep through environmental optimization"
    ],
    howToStart: [
      "Open windows regularly for fresh air circulation",
      "Add air-purifying houseplants (spider plant, peace lily, snake plant)",
      "Switch to natural, non-toxic cleaning products",
      "Use natural materials in home decor when possible",
      "Maximize natural light during the day",
      "Remove shoes at the door to reduce tracked-in pollutants",
      "Dust and vacuum regularly to reduce allergens",
      "Consider an air purifier for bedrooms"
    ],
    safetyNotes: [
      "Some houseplants are toxic to pets - research before purchasing",
      "Ensure proper ventilation when using any cleaning products",
      "Test for radon if you haven't already"
    ],
    frequency: "Implement changes gradually, maintain as ongoing practice"
  }
];

export const techniqueCategories = [
  "Nutrition & Herbal",
  "Mind-Body",
  "Physical Wellness",
  "Traditional Therapies",
  "Lifestyle & Prevention"
];
