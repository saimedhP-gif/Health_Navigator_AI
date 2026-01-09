export interface MedicinalLeaf {
  id: string;
  commonName: string;
  scientificName: string;
  icon: string;
  regions: string[];
  conditions: string[];
  activeCompounds: string[];
  preparationMethods: {
    method: string;
    description: string;
  }[];
  scientificEvidence: {
    level: "strong" | "moderate" | "emerging" | "traditional";
    summary: string;
    studies?: string[];
  };
  safety: {
    dosageGuidelines: string;
    contraindications: string[];
    warnings: string[];
  };
}

export const medicinalLeaves: MedicinalLeaf[] = [
  {
    id: "neem",
    commonName: "Neem",
    scientificName: "Azadirachta indica",
    icon: "🌿",
    regions: ["India", "Southeast Asia", "Africa", "Middle East"],
    conditions: [
      "Skin conditions (acne, eczema, psoriasis)",
      "Oral health and gum disease",
      "Blood sugar regulation support",
      "Digestive issues",
      "Fever reduction",
      "Wound healing"
    ],
    activeCompounds: [
      "Azadirachtin (insecticidal)",
      "Nimbin and Nimbidin (anti-inflammatory)",
      "Quercetin (antioxidant)",
      "Gedunin (antimalarial properties)"
    ],
    preparationMethods: [
      {
        method: "Leaf Tea",
        description: "Steep 5-10 dried leaves in hot water for 10 minutes. Bitter taste; honey may be added."
      },
      {
        method: "Paste for Skin",
        description: "Grind fresh leaves with water to make a paste. Apply to affected skin areas for 15-20 minutes."
      },
      {
        method: "Neem Oil",
        description: "Cold-pressed oil from seeds used topically for skin and hair. Always dilute before use."
      },
      {
        method: "Powder",
        description: "Dried, ground leaves taken in capsules or mixed with water (1/4-1/2 teaspoon)."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Laboratory studies show antimicrobial, anti-inflammatory, and hypoglycemic properties. Clinical trials are limited but promising for skin conditions and oral health.",
      studies: [
        "Journal of Ethnopharmacology: Antimicrobial activity against various pathogens",
        "Indian Journal of Physiology: Blood sugar lowering effects in animal studies"
      ]
    },
    safety: {
      dosageGuidelines: "Leaf tea: 1 cup daily maximum. Topical: patch test first. Internal use should be limited to 2-4 weeks.",
      contraindications: [
        "Pregnancy and breastfeeding (may cause miscarriage)",
        "Children under 12 years",
        "Those trying to conceive (may affect fertility)",
        "Autoimmune conditions",
        "Scheduled surgery (stop 2 weeks before)"
      ],
      warnings: [
        "Can interact with diabetes and blood pressure medications",
        "May cause liver damage with prolonged internal use",
        "Never give neem oil to children internally - can be fatal"
      ]
    }
  },
  {
    id: "tulsi",
    commonName: "Holy Basil (Tulsi)",
    scientificName: "Ocimum tenuiflorum",
    icon: "🌱",
    regions: ["India", "Southeast Asia", "Australia", "West Africa"],
    conditions: [
      "Stress and anxiety relief",
      "Respiratory infections (cold, cough, flu)",
      "Inflammation reduction",
      "Blood sugar support",
      "Heart health",
      "Immune system support"
    ],
    activeCompounds: [
      "Eugenol (anti-inflammatory, analgesic)",
      "Rosmarinic acid (antioxidant)",
      "Ursolic acid (anti-cancer properties)",
      "Ocimumosides A and B (adaptogenic)"
    ],
    preparationMethods: [
      {
        method: "Fresh Leaf Tea",
        description: "Steep 5-10 fresh leaves in boiling water for 5-10 minutes. Add honey and ginger for enhanced effect."
      },
      {
        method: "Dried Leaf Tea",
        description: "Use 1 teaspoon dried tulsi per cup, steep 10 minutes. Available in tea bags."
      },
      {
        method: "Fresh Leaf Chewing",
        description: "Chew 4-5 fresh leaves daily in the morning on an empty stomach (traditional practice)."
      },
      {
        method: "Powder/Capsules",
        description: "300-2000mg dried leaf powder daily in divided doses."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Multiple human trials support adaptogenic and stress-relieving effects. Evidence for blood sugar regulation and immune modulation exists but needs larger studies.",
      studies: [
        "Journal of Ayurveda and Integrative Medicine: Reduces stress and improves cognition",
        "Evidence-Based Complementary Medicine: Immunomodulatory effects documented"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 2-3 cups daily. Capsules: Follow manufacturer guidelines. Safe for long-term use at moderate doses.",
      contraindications: [
        "Pregnancy and breastfeeding (may affect fertility)",
        "Before surgery (affects blood clotting)",
        "Those on blood-thinning medications"
      ],
      warnings: [
        "May enhance effects of diabetes medications",
        "Could interact with thyroid medications",
        "Start with low doses to assess tolerance"
      ]
    }
  },
  {
    id: "moringa",
    commonName: "Moringa (Drumstick Tree)",
    scientificName: "Moringa oleifera",
    icon: "🍃",
    regions: ["India", "Africa", "Philippines", "South America", "Caribbean"],
    conditions: [
      "Nutritional deficiency support",
      "Inflammation and joint pain",
      "Blood sugar regulation",
      "Cholesterol management",
      "Anemia support",
      "Lactation support"
    ],
    activeCompounds: [
      "Isothiocyanates (anti-inflammatory)",
      "Quercetin (antioxidant, blood pressure)",
      "Chlorogenic acid (blood sugar regulation)",
      "High vitamin A, C, E content",
      "Complete protein with all essential amino acids"
    ],
    preparationMethods: [
      {
        method: "Leaf Powder",
        description: "Add 1-2 teaspoons to smoothies, soups, or water daily. Has a mild, earthy taste."
      },
      {
        method: "Fresh Leaf Tea",
        description: "Steep fresh or dried leaves in hot water for 5 minutes. Can be combined with green tea."
      },
      {
        method: "Capsules",
        description: "500-2000mg dried leaf powder in capsule form, taken with meals."
      },
      {
        method: "Cooking",
        description: "Add fresh leaves to soups, stews, or stir-fries like spinach."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Strong evidence for nutritional benefits. Preliminary human trials show promise for blood sugar and cholesterol. Recognized by WHO for combating malnutrition.",
      studies: [
        "Phytotherapy Research: Significant reduction in fasting blood glucose",
        "Journal of Food Science and Technology: High antioxidant activity documented"
      ]
    },
    safety: {
      dosageGuidelines: "Powder: 1-2 teaspoons (2-6g) daily. Start low and increase gradually. Leaves are safer than seeds or roots.",
      contraindications: [
        "Pregnancy (root, bark, and flowers may cause uterine contractions)",
        "Those on blood pressure medications",
        "Those on diabetes medications",
        "Thyroid conditions"
      ],
      warnings: [
        "Avoid roots and bark - contain toxic substances",
        "May lower blood pressure and blood sugar significantly",
        "Can interact with medications metabolized by the liver"
      ]
    }
  },
  {
    id: "eucalyptus",
    commonName: "Eucalyptus",
    scientificName: "Eucalyptus globulus",
    icon: "🌿",
    regions: ["Australia", "Mediterranean", "South America", "China", "India"],
    conditions: [
      "Respiratory congestion and coughs",
      "Sinusitis and nasal congestion",
      "Muscle and joint pain",
      "Wound healing",
      "Fever reduction",
      "Insect repellent"
    ],
    activeCompounds: [
      "Eucalyptol (1,8-cineole) - primary active compound",
      "Alpha-pinene (anti-inflammatory)",
      "Limonene (antioxidant)",
      "Tannins (antimicrobial)"
    ],
    preparationMethods: [
      {
        method: "Steam Inhalation",
        description: "Add 3-4 drops of eucalyptus oil or handful of leaves to hot water. Inhale steam with towel over head for 5-10 minutes."
      },
      {
        method: "Chest Rub",
        description: "Mix 2-3 drops eucalyptus oil with 1 tablespoon carrier oil. Rub on chest for congestion relief."
      },
      {
        method: "Leaf Tea",
        description: "Steep 2-3 fresh or dried leaves in boiling water for 10 minutes. Use for sore throats (gargle, don't swallow large amounts)."
      },
      {
        method: "Bath Soak",
        description: "Add a few drops of oil or fresh leaves to warm bath for muscle relaxation."
      }
    ],
    scientificEvidence: {
      level: "strong",
      summary: "Well-documented antimicrobial and expectorant properties. Eucalyptol is an approved medicine in many countries for respiratory conditions.",
      studies: [
        "Clinical Microbiology Reviews: Strong antibacterial and antifungal activity",
        "Respiratory Research: Eucalyptol reduces exacerbations in COPD patients"
      ]
    },
    safety: {
      dosageGuidelines: "Inhalation: 5-10 minutes 2-3 times daily. Topical: Always dilute oil. Internal use not recommended without supervision.",
      contraindications: [
        "Children under 3 years (risk of breathing problems)",
        "Asthma (may trigger attacks in some)",
        "Liver disease",
        "Scheduled surgery"
      ],
      warnings: [
        "Eucalyptus oil is toxic if ingested - keep away from children",
        "Can interact with diabetes and blood pressure medications",
        "May reduce effectiveness of some medications",
        "Always do patch test before topical application"
      ]
    }
  },
  {
    id: "peppermint",
    commonName: "Peppermint",
    scientificName: "Mentha × piperita",
    icon: "🌿",
    regions: ["Europe", "North America", "Middle East", "Asia (cultivated worldwide)"],
    conditions: [
      "Digestive issues (IBS, bloating, gas)",
      "Tension headaches",
      "Nausea and vomiting",
      "Respiratory congestion",
      "Muscle pain relief",
      "Mental alertness"
    ],
    activeCompounds: [
      "Menthol (cooling, analgesic)",
      "Menthone (antibacterial)",
      "Limonene (antioxidant)",
      "Rosmarinic acid (anti-inflammatory)"
    ],
    preparationMethods: [
      {
        method: "Fresh/Dried Leaf Tea",
        description: "Steep 1 tablespoon fresh leaves or 1 teaspoon dried in hot water for 5-10 minutes. Drink after meals for digestion."
      },
      {
        method: "Peppermint Oil Capsules",
        description: "Enteric-coated capsules (0.2-0.4ml oil) for IBS. Take before meals."
      },
      {
        method: "Topical Oil",
        description: "Dilute 2-3 drops in carrier oil. Apply to temples for headaches or to muscles for pain."
      },
      {
        method: "Inhalation",
        description: "Add to steam or diffuser for congestion and alertness."
      }
    ],
    scientificEvidence: {
      level: "strong",
      summary: "Strong clinical evidence for IBS symptom relief and tension headaches. Peppermint oil capsules are recommended by gastroenterology guidelines for IBS.",
      studies: [
        "BMJ: Peppermint oil significantly improves IBS symptoms",
        "Cephalalgia: Effective for tension-type headache when applied topically"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 3-4 cups daily maximum. Oil capsules: 0.2-0.4ml 2-3 times daily. Topical: Dilute to 1-2% concentration.",
      contraindications: [
        "GERD/acid reflux (relaxes lower esophageal sphincter)",
        "Gallbladder problems",
        "Hiatal hernia",
        "Children under 8 (avoid oil near face)"
      ],
      warnings: [
        "Pure oil can cause skin irritation - always dilute",
        "May worsen heartburn symptoms",
        "Can interact with certain medications (cyclosporine)",
        "Avoid applying near eyes, nose, or mouth"
      ]
    }
  },
  {
    id: "ginkgo",
    commonName: "Ginkgo",
    scientificName: "Ginkgo biloba",
    icon: "🍂",
    regions: ["China (origin)", "Japan", "Korea", "Europe", "North America"],
    conditions: [
      "Cognitive function and memory support",
      "Circulation problems (intermittent claudication)",
      "Tinnitus (ringing in ears)",
      "Vertigo and dizziness",
      "Eye health (glaucoma, macular degeneration)",
      "Anxiety support"
    ],
    activeCompounds: [
      "Flavonoid glycosides (antioxidant)",
      "Terpene lactones (ginkgolides, bilobalide)",
      "Ginkgolic acids (removed in standardized extracts - toxic)"
    ],
    preparationMethods: [
      {
        method: "Standardized Extract",
        description: "120-240mg daily of extract standardized to 24% flavonoid glycosides and 6% terpene lactones, divided into 2-3 doses."
      },
      {
        method: "Leaf Tea",
        description: "Steep 1-2 teaspoons dried leaves for 10 minutes. Less reliable potency than extracts."
      },
      {
        method: "Tincture",
        description: "1-2ml liquid extract 2-3 times daily."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Some positive trials for circulation and cognitive function in dementia patients. Mixed results for healthy adults. Large trials show modest benefits.",
      studies: [
        "JAMA: Modest improvement in dementia patients",
        "Cochrane Review: Inconsistent but some evidence for cognitive benefit"
      ]
    },
    safety: {
      dosageGuidelines: "120-240mg standardized extract daily. Effects may take 4-6 weeks to appear. Use standardized extracts to avoid toxic ginkgolic acids.",
      contraindications: [
        "Bleeding disorders",
        "Before surgery (stop 2 weeks prior)",
        "Epilepsy (may lower seizure threshold)",
        "Pregnancy and breastfeeding"
      ],
      warnings: [
        "Increases bleeding risk - caution with blood thinners and NSAIDs",
        "Raw seeds are toxic and should never be consumed",
        "May cause headaches, dizziness, or GI upset",
        "Can interact with many medications"
      ]
    }
  },
  {
    id: "aloe-vera",
    commonName: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    icon: "🌵",
    regions: ["North Africa (origin)", "Mediterranean", "Caribbean", "Subtropical regions worldwide"],
    conditions: [
      "Burns and sunburn",
      "Wound healing",
      "Skin conditions (psoriasis, eczema)",
      "Constipation (latex)",
      "Oral health",
      "Moisturization and skin aging"
    ],
    activeCompounds: [
      "Acemannan (immune modulator)",
      "Anthraquinones (laxative - in latex)",
      "Vitamins A, C, E, B12",
      "Enzymes (bradykinase - reduces inflammation)",
      "Salicylic acid (anti-inflammatory)"
    ],
    preparationMethods: [
      {
        method: "Fresh Gel (Topical)",
        description: "Cut leaf, scoop clear gel, apply directly to skin. Avoid yellow latex layer near rind."
      },
      {
        method: "Commercial Gel",
        description: "Apply products with 90%+ aloe content to burns, wounds, or skin. Check for added ingredients."
      },
      {
        method: "Juice (Internal)",
        description: "1-2 tablespoons of decolorized aloe juice before meals. Choose products without aloin/latex."
      },
      {
        method: "Mouthwash",
        description: "Aloe juice or gel diluted in water for oral health. Do not swallow."
      }
    ],
    scientificEvidence: {
      level: "strong",
      summary: "Strong evidence for wound healing and burns. Good evidence for skin moisturization. Limited evidence for internal uses.",
      studies: [
        "Burns Journal: Accelerates healing of first and second-degree burns",
        "Skin Pharmacology and Physiology: Improves skin hydration"
      ]
    },
    safety: {
      dosageGuidelines: "Topical: Apply liberally as needed. Internal juice: 1-2 tablespoons daily maximum. Avoid latex-containing products.",
      contraindications: [
        "Pregnancy (latex can cause contractions)",
        "Hemorrhoids or kidney problems (if using latex)",
        "Intestinal conditions (Crohn's, ulcerative colitis)",
        "Diabetes (monitor blood sugar closely)"
      ],
      warnings: [
        "Aloe latex is a strong laxative - use with extreme caution",
        "Long-term internal use may cause electrolyte imbalance",
        "Can interact with diabetes and heart medications",
        "Topical allergies possible - patch test first"
      ]
    }
  },
  {
    id: "sage",
    commonName: "Sage",
    scientificName: "Salvia officinalis",
    icon: "🌿",
    regions: ["Mediterranean (origin)", "Europe", "North America", "Middle East"],
    conditions: [
      "Cognitive function and memory",
      "Menopausal symptoms (hot flashes)",
      "Sore throat and mouth inflammation",
      "Digestive issues",
      "Excessive sweating",
      "Blood sugar support"
    ],
    activeCompounds: [
      "Rosmarinic acid (antioxidant)",
      "Carnosic acid (neuroprotective)",
      "Thujone (toxic in large amounts)",
      "Camphor",
      "Salvianolic acids"
    ],
    preparationMethods: [
      {
        method: "Leaf Tea",
        description: "Steep 1-2 teaspoons dried sage in hot water for 10 minutes. Drink 1-3 cups daily."
      },
      {
        method: "Gargle",
        description: "Strong sage tea used as gargle for sore throats. Steep 5 minutes, cool, gargle for 30 seconds."
      },
      {
        method: "Tincture",
        description: "1-4ml liquid extract 2-3 times daily."
      },
      {
        method: "Culinary Use",
        description: "Fresh or dried sage in cooking provides mild therapeutic benefits."
      },
      {
        method: "Capsules",
        description: "300-600mg dried leaf extract daily."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Good evidence for cognitive improvement in healthy adults. Promising results for menopausal hot flashes. Traditional uses for throat and digestion less studied.",
      studies: [
        "Pharmacology Biochemistry and Behavior: Improved memory and attention in healthy adults",
        "Advances in Therapy: Significant reduction in hot flashes"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 1-3 cups daily for up to 2 weeks, then take a break. Avoid large doses due to thujone content.",
      contraindications: [
        "Pregnancy and breastfeeding (thujone risk)",
        "Epilepsy (thujone may trigger seizures)",
        "Hormone-sensitive conditions (has estrogenic effects)"
      ],
      warnings: [
        "High doses of sage oil are toxic due to thujone",
        "Limit use to 2 weeks at therapeutic doses, then break",
        "May interact with diabetes and sedative medications",
        "Can enhance effects of anticonvulsants"
      ]
    }
  },
  {
    id: "nettle",
    commonName: "Stinging Nettle",
    scientificName: "Urtica dioica",
    icon: "🌿",
    regions: ["Europe", "Asia", "North America", "North Africa"],
    conditions: [
      "Allergies and hay fever",
      "Urinary tract support (BPH)",
      "Arthritis and joint pain",
      "Blood sugar support",
      "Anemia (high iron content)",
      "Eczema and skin conditions"
    ],
    activeCompounds: [
      "Lectins and polysaccharides (immune modulating)",
      "Histamine (paradoxically anti-allergic when processed)",
      "Beta-sitosterol (prostate health)",
      "High minerals: iron, calcium, magnesium, silica"
    ],
    preparationMethods: [
      {
        method: "Dried Leaf Tea",
        description: "Steep 1-2 teaspoons dried leaves in boiling water for 10-15 minutes. Drink 3 cups daily."
      },
      {
        method: "Fresh Leaf Cooking",
        description: "Young leaves cooked like spinach (cooking neutralizes sting). Highly nutritious."
      },
      {
        method: "Capsules/Extract",
        description: "300-600mg dried leaf 2-3 times daily. Root extract for prostate (300mg 2-3x daily)."
      },
      {
        method: "Freeze-Dried Capsules",
        description: "600mg freeze-dried leaf for allergies, taken at onset of symptoms."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Promising evidence for allergies and benign prostatic hyperplasia (BPH). Well-documented nutritional value. Anti-inflammatory properties supported by research.",
      studies: [
        "Planta Medica: Freeze-dried nettle reduces allergy symptoms",
        "World Journal of Urology: Root extract improves BPH symptoms"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 2-4 cups daily. Capsules: 600-1200mg daily. Safe for long-term use at moderate doses.",
      contraindications: [
        "Pregnancy (may stimulate uterine contractions)",
        "Kidney disease (diuretic effect)",
        "Those on blood thinners (contains vitamin K)"
      ],
      warnings: [
        "Fresh leaves cause painful stinging - handle with gloves",
        "May lower blood sugar - monitor if diabetic",
        "Diuretic effect - stay hydrated",
        "May interact with lithium and blood pressure medications"
      ]
    }
  },
  {
    id: "gotu-kola",
    commonName: "Gotu Kola",
    scientificName: "Centella asiatica",
    icon: "🍀",
    regions: ["India", "Sri Lanka", "Southeast Asia", "China", "South Africa"],
    conditions: [
      "Wound healing and scars",
      "Venous insufficiency (varicose veins)",
      "Cognitive function and memory",
      "Anxiety and stress",
      "Skin health and cellulite",
      "Stretch marks"
    ],
    activeCompounds: [
      "Asiaticoside (wound healing)",
      "Asiatic acid (collagen synthesis)",
      "Madecassic acid (anti-inflammatory)",
      "Madecassoside (skin healing)"
    ],
    preparationMethods: [
      {
        method: "Fresh Leaf",
        description: "Eat 1-2 fresh leaves daily (common in Asian cuisine in salads). Mild, slightly bitter taste."
      },
      {
        method: "Dried Leaf Tea",
        description: "Steep 1-2 teaspoons dried leaves in hot water for 10 minutes. Drink 2-3 cups daily."
      },
      {
        method: "Standardized Extract",
        description: "60-120mg total triterpenes daily, in divided doses."
      },
      {
        method: "Topical Cream",
        description: "Apply creams containing 1% asiaticoside to wounds, scars, or stretch marks."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Good evidence for wound healing and venous insufficiency. Promising cognitive benefits in preliminary studies. Long history of traditional use for brain function.",
      studies: [
        "Angiology: Improves symptoms of venous insufficiency",
        "Journal of Ethnopharmacology: Enhances cognitive function in animal studies"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 2-3 cups daily. Extract: 60-120mg total triterpenes. Safe for 4-6 weeks; take breaks between courses.",
      contraindications: [
        "Pregnancy and breastfeeding",
        "Liver disease",
        "Scheduled surgery (stop 2 weeks before)",
        "Those on sedatives or hepatotoxic drugs"
      ],
      warnings: [
        "Long-term use may cause liver problems - take breaks",
        "May cause drowsiness in some people",
        "Can increase sun sensitivity",
        "May interact with cholesterol and diabetes medications"
      ]
    }
  },
  {
    id: "curry-leaf",
    commonName: "Curry Leaf",
    scientificName: "Murraya koenigii",
    icon: "🌿",
    regions: ["India", "Sri Lanka", "Southeast Asia"],
    conditions: [
      "Blood sugar regulation",
      "Cholesterol management",
      "Digestive support",
      "Hair health and premature graying",
      "Nausea and morning sickness",
      "Antioxidant support"
    ],
    activeCompounds: [
      "Carbazole alkaloids (antidiabetic)",
      "Koenigine and koenine (antioxidant)",
      "Beta-carotene",
      "Vitamin C and iron"
    ],
    preparationMethods: [
      {
        method: "Fresh Leaves in Cooking",
        description: "Add 10-15 fresh leaves to curries, dals, and stir-fries. Temper in hot oil for aroma."
      },
      {
        method: "Raw Leaf Consumption",
        description: "Chew 4-5 fresh leaves on empty stomach in morning for blood sugar support."
      },
      {
        method: "Leaf Powder",
        description: "Dry leaves in shade, grind to powder. Add 1 teaspoon to food or smoothies."
      },
      {
        method: "Hair Oil",
        description: "Boil fresh leaves in coconut oil until leaves darken. Apply to hair for growth and anti-graying."
      }
    ],
    scientificEvidence: {
      level: "emerging",
      summary: "Animal studies show promising antidiabetic and cholesterol-lowering effects. Human studies are limited. Traditional use for centuries in Indian medicine.",
      studies: [
        "Journal of Food Science: Antioxidant and lipid-lowering activity",
        "Indian Journal of Experimental Biology: Blood sugar lowering in diabetic rats"
      ]
    },
    safety: {
      dosageGuidelines: "Culinary use: unlimited. Medicinal: 5-8 fresh leaves daily. Powder: 1-2 teaspoons daily.",
      contraindications: [
        "No major contraindications at culinary doses",
        "Pregnancy - large medicinal doses not studied"
      ],
      warnings: [
        "May enhance effects of diabetes medications",
        "Consult doctor before using medicinally with diabetes drugs",
        "Source fresh organic leaves when possible"
      ]
    }
  },
  {
    id: "olive-leaf",
    commonName: "Olive Leaf",
    scientificName: "Olea europaea",
    icon: "🫒",
    regions: ["Mediterranean (origin)", "Middle East", "North Africa", "California", "Australia"],
    conditions: [
      "Cardiovascular health",
      "Blood pressure support",
      "Immune system support",
      "Blood sugar regulation",
      "Antioxidant protection",
      "Antimicrobial activity"
    ],
    activeCompounds: [
      "Oleuropein (primary active - antioxidant, antimicrobial)",
      "Hydroxytyrosol (powerful antioxidant)",
      "Oleocanthal (anti-inflammatory, similar to ibuprofen)",
      "Oleanolic acid"
    ],
    preparationMethods: [
      {
        method: "Dried Leaf Tea",
        description: "Steep 1 tablespoon dried leaves in hot water for 15-20 minutes. Drink 1-2 cups daily."
      },
      {
        method: "Standardized Extract",
        description: "500-1000mg extract standardized to 15-20% oleuropein, taken daily."
      },
      {
        method: "Liquid Extract",
        description: "1-2ml tincture 2-3 times daily."
      },
      {
        method: "Fresh Leaves",
        description: "Rarely used fresh due to bitterness. Better processed into tea or extract."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Good evidence for blood pressure reduction and antioxidant effects. Preliminary evidence for blood sugar and antimicrobial benefits.",
      studies: [
        "Phytomedicine: Significant blood pressure reduction in hypertensive patients",
        "European Journal of Clinical Nutrition: Improved insulin sensitivity"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 1-2 cups daily. Extract: 500-1000mg daily. May take several weeks for cardiovascular benefits.",
      contraindications: [
        "Pregnancy and breastfeeding (insufficient data)",
        "Those on blood pressure medications (may cause hypotension)",
        "Those on diabetes medications"
      ],
      warnings: [
        "May cause Herxheimer reaction (die-off symptoms) initially",
        "Can interact with blood pressure and diabetes medications",
        "May enhance effects of blood thinners",
        "Start with low doses and increase gradually"
      ]
    }
  },
  {
    id: "brahmi",
    commonName: "Brahmi (Water Hyssop)",
    scientificName: "Bacopa monnieri",
    icon: "🌿",
    regions: ["India", "Southeast Asia", "Australia", "Africa (wetlands)"],
    conditions: [
      "Memory and cognitive enhancement",
      "Anxiety and stress relief",
      "ADHD support",
      "Epilepsy support (traditional)",
      "Inflammation reduction",
      "Antioxidant protection"
    ],
    activeCompounds: [
      "Bacosides A and B (neuroprotective)",
      "Bacosaponins (cognitive enhancement)",
      "Betulinic acid (anti-inflammatory)",
      "Apigenin (anxiolytic)"
    ],
    preparationMethods: [
      {
        method: "Fresh Leaf Juice",
        description: "Blend 1-2 teaspoons fresh leaves with water. Drink in morning (traditional practice)."
      },
      {
        method: "Dried Powder",
        description: "Mix 1/2-1 teaspoon powder with warm water, milk, or honey. Take twice daily."
      },
      {
        method: "Standardized Extract",
        description: "300-450mg extract standardized to 55% bacosides, taken daily."
      },
      {
        method: "Oil for Scalp",
        description: "Brahmi oil (infused coconut oil) massaged into scalp for hair and relaxation."
      }
    ],
    scientificEvidence: {
      level: "strong",
      summary: "Multiple human trials demonstrate improved memory, attention, and cognitive processing. One of the best-studied cognitive herbs. Benefits may take 4-6 weeks.",
      studies: [
        "Psychopharmacology: Significant improvement in memory acquisition and retention",
        "Journal of Alternative and Complementary Medicine: Improved attention and cognitive processing"
      ]
    },
    safety: {
      dosageGuidelines: "Extract: 300-450mg daily. Powder: 1-2g daily. Best taken with food to reduce GI upset. Allow 8-12 weeks for full effects.",
      contraindications: [
        "Pregnancy and breastfeeding",
        "Thyroid disorders (may affect thyroid hormones)",
        "Slow heart rate (bradycardia)",
        "GI ulcers or obstructions"
      ],
      warnings: [
        "May cause GI upset, nausea, or dry mouth initially",
        "Can increase effects of sedatives and thyroid medications",
        "May slow heart rate",
        "Effects are gradual - allow adequate time"
      ]
    }
  },
  {
    id: "guava-leaf",
    commonName: "Guava Leaf",
    scientificName: "Psidium guajava",
    icon: "🍃",
    regions: ["Central America (origin)", "Caribbean", "Southeast Asia", "Africa", "India"],
    conditions: [
      "Diarrhea treatment",
      "Blood sugar regulation",
      "Oral health",
      "Weight management",
      "Menstrual pain",
      "Wound healing"
    ],
    activeCompounds: [
      "Quercetin (antioxidant, anti-inflammatory)",
      "Gallic acid (antimicrobial)",
      "Catechin (antioxidant)",
      "Vitamin C (in fresh leaves)"
    ],
    preparationMethods: [
      {
        method: "Leaf Tea",
        description: "Boil 4-5 fresh leaves or steep 1 tablespoon dried in hot water for 10 minutes. Drink 2-3 cups daily."
      },
      {
        method: "Mouthwash",
        description: "Use cooled guava leaf tea as mouthwash for gum health. Swish for 30 seconds, spit."
      },
      {
        method: "Leaf Paste",
        description: "Crush fresh leaves to paste for wound application (traditional use)."
      },
      {
        method: "Capsules",
        description: "Follow manufacturer guidelines for standardized leaf extracts."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Good evidence for antidiarrheal effects and blood sugar reduction. Studies support antimicrobial and anti-inflammatory properties.",
      studies: [
        "Journal of Ethnopharmacology: Significant antidiarrheal activity",
        "Nutrition & Metabolism: Reduces post-meal blood sugar spikes"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 2-3 cups daily. Safe for long-term use at moderate doses.",
      contraindications: [
        "Pregnancy (limited data - use cautiously)",
        "Those on diabetes medications (may cause hypoglycemia)",
        "Eczema (may worsen in some cases)"
      ],
      warnings: [
        "May lower blood sugar - monitor if diabetic",
        "Could interact with diabetes and heart medications",
        "Constipation possible with excessive use"
      ]
    }
  },
  {
    id: "bay-leaf",
    commonName: "Bay Leaf (Laurel)",
    scientificName: "Laurus nobilis",
    icon: "🌿",
    regions: ["Mediterranean (origin)", "Asia Minor", "South America", "India"],
    conditions: [
      "Digestive health",
      "Blood sugar support",
      "Respiratory health",
      "Wound healing",
      "Dandruff and scalp conditions",
      "Anxiety and stress"
    ],
    activeCompounds: [
      "Eugenol (analgesic, antimicrobial)",
      "Cineole (expectorant)",
      "Linalool (calming)",
      "Vitamins A, C, B6, iron"
    ],
    preparationMethods: [
      {
        method: "Culinary Use",
        description: "Add 1-2 leaves to soups, stews, and rice for flavor and mild benefits. Remove before eating."
      },
      {
        method: "Bay Leaf Tea",
        description: "Steep 2-3 dried leaves in boiling water for 10 minutes. Drink 1-2 cups daily."
      },
      {
        method: "Steam Inhalation",
        description: "Add bay leaves to hot water and inhale steam for congestion relief."
      },
      {
        method: "Scalp Rinse",
        description: "Boil leaves in water, cool, and use as final hair rinse for dandruff."
      }
    ],
    scientificEvidence: {
      level: "emerging",
      summary: "Preliminary studies show potential for blood sugar regulation and cholesterol improvement. Traditional uses well-documented but clinical trials limited.",
      studies: [
        "Journal of Clinical Biochemistry and Nutrition: Improved blood glucose and lipid profiles",
        "Phytotherapy Research: Antioxidant and anti-inflammatory activity"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 1-2 cups daily. Culinary: 1-3 leaves per dish. Always remove whole leaves before eating.",
      contraindications: [
        "Pregnancy (may affect uterus in large amounts)",
        "Upcoming surgery (stop 2 weeks before)",
        "Diabetes medications (may lower blood sugar)"
      ],
      warnings: [
        "Whole leaves are choking hazard - always remove from dishes",
        "Essential oil is toxic if ingested",
        "May slow central nervous system - avoid before surgery",
        "May interact with sedatives and diabetes drugs"
      ]
    }
  },
  // South American Medicinal Leaves
  {
    id: "yerba-mate",
    commonName: "Yerba Mate",
    scientificName: "Ilex paraguariensis",
    icon: "🧉",
    regions: ["Argentina", "Brazil", "Paraguay", "Uruguay", "Southern Brazil"],
    conditions: [
      "Mental focus and alertness",
      "Physical energy and endurance",
      "Weight management",
      "Antioxidant protection",
      "Cholesterol management",
      "Digestive support"
    ],
    activeCompounds: [
      "Caffeine (stimulant, less than coffee)",
      "Theobromine (mild stimulant, mood enhancer)",
      "Chlorogenic acid (antioxidant, blood sugar)",
      "Saponins (anti-inflammatory, cholesterol)",
      "Polyphenols (antioxidant)"
    ],
    preparationMethods: [
      {
        method: "Traditional Mate",
        description: "Fill gourd 2/3 with yerba mate, add warm water (70-80°C, not boiling), sip through bombilla. Refill multiple times."
      },
      {
        method: "Mate Tea",
        description: "Steep 1-2 tablespoons in hot water for 3-5 minutes. Can be enjoyed hot or iced."
      },
      {
        method: "Cold Brew (Tereré)",
        description: "Steep in cold water with citrus or mint for refreshing summer drink (Paraguayan style)."
      },
      {
        method: "Capsules/Extract",
        description: "500-1000mg standardized extract daily for concentrated benefits."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Good evidence for antioxidant activity and metabolic benefits. Studies show improved lipid profiles and modest weight loss effects. Cognitive enhancement documented.",
      studies: [
        "Journal of Food Science: High antioxidant capacity comparable to green tea",
        "Obesity Research: Modest anti-obesity effects in clinical trials"
      ]
    },
    safety: {
      dosageGuidelines: "Traditional consumption: 1-4 liters daily in South America. Moderate use: 1-3 cups daily. Avoid consuming very hot (cancer risk).",
      contraindications: [
        "Anxiety disorders (caffeine content)",
        "Insomnia or sleep disorders",
        "Heart arrhythmias",
        "Pregnancy and breastfeeding (limit caffeine)",
        "Children (caffeine sensitivity)"
      ],
      warnings: [
        "Very hot mate linked to esophageal cancer - let it cool slightly",
        "Contains caffeine - limit intake in afternoon/evening",
        "May interact with stimulant medications and MAO inhibitors",
        "Can increase blood pressure in sensitive individuals"
      ]
    }
  },
  {
    id: "cats-claw",
    commonName: "Cat's Claw",
    scientificName: "Uncaria tomentosa",
    icon: "🌿",
    regions: ["Peru", "Amazon Rainforest", "Central America", "South America"],
    conditions: [
      "Immune system support",
      "Arthritis and joint inflammation",
      "Digestive health (gastritis, ulcers)",
      "Viral infections",
      "Cancer support (adjunct therapy)",
      "Cognitive function"
    ],
    activeCompounds: [
      "Oxindole alkaloids (immune modulation)",
      "Quinovic acid glycosides (anti-inflammatory)",
      "Proanthocyanidins (antioxidant)",
      "Sterols (immune support)",
      "Polyphenols"
    ],
    preparationMethods: [
      {
        method: "Bark/Root Tea",
        description: "Simmer 1-2 teaspoons dried bark in water for 15-20 minutes. Drink 1-3 cups daily."
      },
      {
        method: "Standardized Extract",
        description: "250-350mg extract standardized to 3% alkaloids, taken 1-2 times daily."
      },
      {
        method: "Tincture",
        description: "1-2ml liquid extract 2-3 times daily."
      },
      {
        method: "Capsules",
        description: "500-1000mg dried bark powder, 2-3 times daily with meals."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Promising evidence for immune modulation and anti-inflammatory effects. Some clinical trials support use for osteoarthritis. Traditionally used by Amazonian tribes for centuries.",
      studies: [
        "Journal of Rheumatology: Reduced pain in osteoarthritis patients",
        "Phytomedicine: Immune-enhancing effects documented"
      ]
    },
    safety: {
      dosageGuidelines: "Extract: 250-350mg 1-2x daily. Tea: 1-3 cups daily. Use for 8 weeks, then take 2-week break.",
      contraindications: [
        "Pregnancy and breastfeeding",
        "Autoimmune diseases (lupus, MS, rheumatoid arthritis)",
        "Before surgery (affects blood clotting and immunity)",
        "Organ transplant recipients (immunosuppressants)",
        "Leukemia"
      ],
      warnings: [
        "May stimulate immune system - dangerous for autoimmune conditions",
        "Can interact with blood thinners and immunosuppressants",
        "May lower blood pressure",
        "Discontinue 2 weeks before surgery"
      ]
    }
  },
  {
    id: "guayusa",
    commonName: "Guayusa",
    scientificName: "Ilex guayusa",
    icon: "🍃",
    regions: ["Ecuador", "Peru", "Colombia", "Amazon Rainforest"],
    conditions: [
      "Mental clarity and focus",
      "Sustained energy without jitters",
      "Antioxidant protection",
      "Blood sugar regulation",
      "Digestive health",
      "Dream enhancement (traditional use)"
    ],
    activeCompounds: [
      "Caffeine (similar to coffee)",
      "L-theanine (calming, focus)",
      "Theobromine (mood enhancer)",
      "Chlorogenic acids (antioxidant)",
      "15 essential amino acids"
    ],
    preparationMethods: [
      {
        method: "Traditional Tea",
        description: "Steep 1-2 tablespoons dried leaves in hot water for 5-7 minutes. Traditionally consumed before dawn."
      },
      {
        method: "Cold Brew",
        description: "Steep leaves in cold water overnight for smooth, less bitter taste."
      },
      {
        method: "Energy Blend",
        description: "Combine with mint, lemongrass, or citrus for flavored energy drink."
      }
    ],
    scientificEvidence: {
      level: "emerging",
      summary: "Limited clinical research but promising antioxidant profile. Contains unique combination of caffeine and L-theanine similar to tea. Traditional use by Kichwa people for thousands of years.",
      studies: [
        "Journal of Ethnopharmacology: High antioxidant and phenolic content",
        "Food Chemistry: Comparable caffeine to coffee with smoother energy curve"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 1-3 cups daily. Contains caffeine similar to coffee - adjust based on sensitivity.",
      contraindications: [
        "Caffeine sensitivity",
        "Anxiety disorders",
        "Pregnancy and breastfeeding",
        "Heart conditions",
        "Insomnia"
      ],
      warnings: [
        "High caffeine content - avoid late in day",
        "May interact with stimulant medications",
        "Start with small amounts to assess tolerance"
      ]
    }
  },
  {
    id: "boldo",
    commonName: "Boldo",
    scientificName: "Peumus boldus",
    icon: "🌿",
    regions: ["Chile", "Peru", "Argentina", "Mediterranean (cultivated)"],
    conditions: [
      "Liver and gallbladder support",
      "Digestive complaints",
      "Constipation relief",
      "Intestinal spasms",
      "Mild urinary infections",
      "Hangover relief (traditional)"
    ],
    activeCompounds: [
      "Boldine (antioxidant, hepatoprotective)",
      "Ascaridole (antiseptic - toxic in high doses)",
      "Eucalyptol (digestive aid)",
      "Flavonoids"
    ],
    preparationMethods: [
      {
        method: "Leaf Tea",
        description: "Steep 1 teaspoon dried leaves in hot water for 10 minutes. Drink after meals, max 2-3 cups daily."
      },
      {
        method: "Tincture",
        description: "0.5-1ml liquid extract before meals for digestive support."
      },
      {
        method: "Combined Formulas",
        description: "Often combined with artichoke or milk thistle for liver support."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Good evidence for hepatoprotective and antioxidant effects of boldine. Used in South American medicine for liver and digestive issues. Some clinical validation for gallbladder function.",
      studies: [
        "Planta Medica: Boldine shows significant antioxidant and anti-inflammatory activity",
        "Phytotherapy Research: Hepatoprotective effects documented"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 1-2 cups daily maximum. Do not use for more than 4 weeks continuously. Avoid essential oil internally.",
      contraindications: [
        "Pregnancy and breastfeeding",
        "Liver disease (despite traditional use)",
        "Gallstones or bile duct obstruction",
        "Children"
      ],
      warnings: [
        "Contains ascaridole which is toxic in high doses",
        "Essential oil is TOXIC - never take internally",
        "May enhance effects of blood thinners",
        "Short-term use only recommended"
      ]
    }
  },
  {
    id: "graviola",
    commonName: "Graviola (Soursop)",
    scientificName: "Annona muricata",
    icon: "🍃",
    regions: ["Brazil", "Caribbean", "Central America", "Southeast Asia", "West Africa"],
    conditions: [
      "Cancer research (experimental)",
      "Parasitic infections",
      "Bacterial infections",
      "Inflammation",
      "Sleep support",
      "Blood sugar regulation"
    ],
    activeCompounds: [
      "Annonaceous acetogenins (cytotoxic)",
      "Alkaloids",
      "Flavonoids",
      "Phenols"
    ],
    preparationMethods: [
      {
        method: "Leaf Tea",
        description: "Steep 3-4 dried leaves in hot water for 15-20 minutes. Drink 1-2 cups daily maximum."
      },
      {
        method: "Capsules",
        description: "500-1500mg dried leaf powder daily in divided doses."
      },
      {
        method: "Fruit Consumption",
        description: "Fresh fruit eaten for nutritional benefits (separate from medicinal leaf use)."
      }
    ],
    scientificEvidence: {
      level: "emerging",
      summary: "Laboratory studies show cytotoxic effects on cancer cells, but NO human clinical trials prove anti-cancer benefits. Traditional use for infections and inflammation. Research is preliminary.",
      studies: [
        "Journal of Natural Products: Acetogenins show cytotoxicity in lab studies",
        "NOTE: No clinical trials in humans for cancer treatment"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 1-2 cups daily maximum. Limit use to 30 days, then take breaks. Avoid excessive consumption.",
      contraindications: [
        "Pregnancy and breastfeeding",
        "Parkinson's disease",
        "Low blood pressure",
        "Those on blood pressure medications",
        "Scheduled surgery"
      ],
      warnings: [
        "IMPORTANT: Not a proven cancer treatment - do not replace medical care",
        "May cause neurotoxicity with long-term use (Parkinsonism-like symptoms)",
        "Can significantly lower blood pressure",
        "May enhance effects of sedatives and antidepressants",
        "Seeds are toxic - never consume"
      ]
    }
  },
  {
    id: "muira-puama",
    commonName: "Muira Puama",
    scientificName: "Ptychopetalum olacoides",
    icon: "🌿",
    regions: ["Brazil", "Amazon Rainforest", "French Guiana"],
    conditions: [
      "Sexual health and libido",
      "Cognitive function and memory",
      "Nerve tonic (neurasthenia)",
      "Stress and fatigue",
      "Joint pain",
      "Digestive support"
    ],
    activeCompounds: [
      "Lupeol (anti-inflammatory)",
      "Alpha-copaene",
      "Phytosterols",
      "Fatty acids",
      "Alkaloids"
    ],
    preparationMethods: [
      {
        method: "Bark/Root Tea",
        description: "Simmer 1-2 teaspoons in water for 15 minutes. Drink 1-2 cups daily."
      },
      {
        method: "Tincture",
        description: "1-2ml extract 2-3 times daily."
      },
      {
        method: "Standardized Extract",
        description: "1000-1500mg daily in divided doses."
      }
    ],
    scientificEvidence: {
      level: "emerging",
      summary: "Limited clinical research. Small studies suggest benefits for sexual function and cognitive enhancement. Long traditional use in Brazilian folk medicine. More research needed.",
      studies: [
        "American Journal of Natural Medicine: Improved libido in preliminary study",
        "Psychopharmacology: Memory enhancement in animal studies"
      ]
    },
    safety: {
      dosageGuidelines: "Extract: 1000-1500mg daily. Tea: 1-2 cups daily. Use for 8 weeks, then reassess.",
      contraindications: [
        "Pregnancy and breastfeeding",
        "Hormone-sensitive conditions",
        "Children"
      ],
      warnings: [
        "Limited safety data available",
        "May interact with hormonal medications",
        "Start with lower doses to assess tolerance"
      ]
    }
  },
  // African Medicinal Leaves
  {
    id: "rooibos",
    commonName: "Rooibos (Red Bush)",
    scientificName: "Aspalathus linearis",
    icon: "🍂",
    regions: ["South Africa (Cederberg region only)", "Western Cape"],
    conditions: [
      "Antioxidant support",
      "Caffeine-free relaxation",
      "Skin conditions (eczema, allergies)",
      "Digestive comfort",
      "Bone health support",
      "Heart health"
    ],
    activeCompounds: [
      "Aspalathin (unique antioxidant)",
      "Nothofagin (antioxidant)",
      "Quercetin (anti-inflammatory)",
      "Luteolin (antioxidant)",
      "Minerals: calcium, magnesium, zinc"
    ],
    preparationMethods: [
      {
        method: "Traditional Tea",
        description: "Steep 1-2 teaspoons in boiling water for 5-10 minutes. Can steep longer without bitterness."
      },
      {
        method: "Iced Rooibos",
        description: "Brew strong, cool, and serve over ice with lemon or honey."
      },
      {
        method: "Rooibos Latte",
        description: "Brew concentrated rooibos, add steamed milk and honey for 'red cappuccino'."
      },
      {
        method: "Topical",
        description: "Cooled tea applied to skin for eczema, diaper rash, or sunburn."
      }
    ],
    scientificEvidence: {
      level: "moderate",
      summary: "Good evidence for antioxidant activity. Studies support benefits for skin conditions and metabolic health. Caffeine-free with no oxalic acid, making it kidney-friendly.",
      studies: [
        "Journal of Ethnopharmacology: Potent antioxidant and anti-inflammatory effects",
        "Phytomedicine: Improved cardiovascular risk markers"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: Unlimited - one of the safest herbal teas. No caffeine, low tannins. Safe for children and pregnant women in moderate amounts.",
      contraindications: [
        "Rare allergic reactions possible",
        "Hormone-sensitive conditions (very weak estrogenic activity)"
      ],
      warnings: [
        "One of the safest herbal beverages",
        "May have very weak estrogenic effects - caution with hormone-sensitive conditions",
        "Quality varies - choose organic South African source"
      ]
    }
  },
  {
    id: "buchu",
    commonName: "Buchu",
    scientificName: "Agathosma betulina",
    icon: "🌿",
    regions: ["South Africa (Western Cape)", "Traditionally Khoi-San medicine"],
    conditions: [
      "Urinary tract infections",
      "Kidney and bladder health",
      "Digestive aid",
      "Arthritis and rheumatism",
      "Water retention",
      "Prostate health"
    ],
    activeCompounds: [
      "Diosphenol (pulegone - antiseptic)",
      "Limonene (anti-inflammatory)",
      "Menthone",
      "Isomenthone",
      "Flavonoids"
    ],
    preparationMethods: [
      {
        method: "Leaf Tea",
        description: "Steep 1-2 teaspoons dried leaves in hot water for 10 minutes. Drink 2-3 cups daily."
      },
      {
        method: "Tincture",
        description: "1-2ml extract 3 times daily."
      },
      {
        method: "Capsules",
        description: "500-1000mg dried leaf 2-3 times daily."
      },
      {
        method: "Buchu Vinegar/Brandy",
        description: "Traditional preparation: leaves steeped in vinegar or brandy for external and internal use."
      }
    ],
    scientificEvidence: {
      level: "traditional",
      summary: "Long history in Khoi-San traditional medicine. Limited clinical research but documented antiseptic and diuretic properties. Used in pharmaceutical preparations for UTIs.",
      studies: [
        "Journal of Ethnopharmacology: Antimicrobial activity documented",
        "Traditional use in South African pharmacopeia"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 2-3 cups daily for up to 2 weeks. Do not use long-term without breaks.",
      contraindications: [
        "Pregnancy (may cause miscarriage)",
        "Breastfeeding",
        "Kidney disease (despite traditional use for kidneys)",
        "Liver disease"
      ],
      warnings: [
        "Contains pulegone which is toxic in high doses",
        "Can irritate kidneys if overused",
        "May interact with diuretics and lithium",
        "Use therapeutic doses short-term only"
      ]
    }
  },
  {
    id: "african-wormwood",
    commonName: "African Wormwood (Lengana)",
    scientificName: "Artemisia afra",
    icon: "🌿",
    regions: ["South Africa", "Ethiopia", "Kenya", "Zimbabwe", "Throughout Eastern and Southern Africa"],
    conditions: [
      "Respiratory infections (coughs, colds, flu)",
      "Fever reduction",
      "Malaria (traditional treatment)",
      "Digestive disorders",
      "Headaches",
      "Menstrual complaints"
    ],
    activeCompounds: [
      "1,8-Cineole/Eucalyptol (expectorant)",
      "Alpha and beta-thujone (antimicrobial - toxic in excess)",
      "Camphor",
      "Artemisinin-related compounds (weaker than A. annua)",
      "Flavonoids"
    ],
    preparationMethods: [
      {
        method: "Leaf Tea",
        description: "Steep 1-2 teaspoons fresh or dried leaves in hot water for 10 minutes. Drink 1-2 cups daily maximum."
      },
      {
        method: "Steam Inhalation",
        description: "Add leaves to boiling water and inhale steam for respiratory relief."
      },
      {
        method: "Poultice",
        description: "Crush fresh leaves and apply to forehead for headaches or to chest for congestion."
      },
      {
        method: "Smoke/Burning",
        description: "Traditional: dried leaves burned to repel insects and purify spaces."
      }
    ],
    scientificEvidence: {
      level: "emerging",
      summary: "Traditional medicine across Africa for centuries. Laboratory studies confirm antimicrobial and anti-inflammatory properties. NOT proven effective for malaria - seek proper medical treatment.",
      studies: [
        "South African Journal of Botany: Antimicrobial activity against respiratory pathogens",
        "Journal of Ethnopharmacology: Anti-inflammatory effects documented"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 1-2 cups daily maximum. Use for 1-2 weeks only, then take extended break. VERY LOW doses only.",
      contraindications: [
        "Pregnancy (may cause miscarriage)",
        "Breastfeeding",
        "Epilepsy (thujone may trigger seizures)",
        "Liver or kidney disease",
        "Children under 12"
      ],
      warnings: [
        "Contains thujone - TOXIC in high doses or prolonged use",
        "NOT a replacement for antimalarial medication",
        "May cause seizures in susceptible individuals",
        "Strict adherence to dosage limits essential",
        "Short-term use only"
      ]
    }
  },
  {
    id: "devils-claw",
    commonName: "Devil's Claw",
    scientificName: "Harpagophytum procumbens",
    icon: "🌿",
    regions: ["Namibia", "Botswana", "South Africa", "Kalahari Desert"],
    conditions: [
      "Arthritis and joint pain",
      "Lower back pain",
      "Tendinitis",
      "Digestive stimulation",
      "Fever reduction",
      "Headaches"
    ],
    activeCompounds: [
      "Harpagoside (primary anti-inflammatory)",
      "Harpagide (pain relief)",
      "Procumbide",
      "Iridoid glycosides"
    ],
    preparationMethods: [
      {
        method: "Root/Tuber Tea",
        description: "Simmer 1-2 teaspoons dried root in water for 15-20 minutes. Very bitter taste."
      },
      {
        method: "Standardized Extract",
        description: "600-2400mg extract standardized to 2-3% harpagoside, taken in divided doses."
      },
      {
        method: "Capsules",
        description: "1500-3000mg dried root daily with meals."
      },
      {
        method: "Tincture",
        description: "1-2ml extract 3 times daily."
      }
    ],
    scientificEvidence: {
      level: "strong",
      summary: "Well-researched with multiple clinical trials. Effective for osteoarthritis and lower back pain. Approved in Germany and France for joint disorders.",
      studies: [
        "Phytomedicine: Comparable to rofecoxib for lower back pain",
        "Rheumatology: Significant improvement in osteoarthritis symptoms"
      ]
    },
    safety: {
      dosageGuidelines: "Extract: 600-2400mg daily (containing 50-100mg harpagoside). May take 4-8 weeks for full effect.",
      contraindications: [
        "Pregnancy and breastfeeding",
        "Stomach or duodenal ulcers",
        "Gallstones",
        "Heart conditions (affects heart rate)",
        "Diabetes (may affect blood sugar)"
      ],
      warnings: [
        "May cause digestive upset - take with food",
        "Can interact with blood thinners and heart medications",
        "May lower blood sugar - monitor if diabetic",
        "Avoid with NSAIDs unless supervised"
      ]
    }
  },
  {
    id: "pelargonium",
    commonName: "Umckaloabo (African Geranium)",
    scientificName: "Pelargonium sidoides",
    icon: "🌸",
    regions: ["South Africa", "Lesotho", "Zulu traditional medicine"],
    conditions: [
      "Acute bronchitis",
      "Upper respiratory infections",
      "Common cold",
      "Sinusitis",
      "Sore throat",
      "Tonsillitis"
    ],
    activeCompounds: [
      "Umckalin (antimicrobial)",
      "Coumarins (immunomodulatory)",
      "Gallic acid (antiviral)",
      "Proanthocyanidins",
      "Polyphenols"
    ],
    preparationMethods: [
      {
        method: "Liquid Extract (EPs 7630)",
        description: "Commercial standardized extract: 30 drops (adults) 3 times daily for acute infections."
      },
      {
        method: "Tablets",
        description: "20mg standardized extract 3 times daily."
      },
      {
        method: "Syrup",
        description: "Commercial preparations for children available with age-appropriate dosing."
      }
    ],
    scientificEvidence: {
      level: "strong",
      summary: "One of the most well-researched herbal remedies. Multiple clinical trials confirm effectiveness for acute bronchitis. Approved medicine in Germany (Umckaloabo®).",
      studies: [
        "Cochrane Review: Effective for acute bronchitis in adults and children",
        "Phytomedicine: Reduces duration and severity of respiratory infections"
      ]
    },
    safety: {
      dosageGuidelines: "Follow product instructions. Typically 30 drops or 20mg tablets 3x daily for 5-7 days. Safe for children over 1 year (age-appropriate dosing).",
      contraindications: [
        "Pregnancy and breastfeeding (insufficient data)",
        "Liver disease",
        "Bleeding disorders",
        "Before surgery (stop 2 weeks prior)"
      ],
      warnings: [
        "Rare liver toxicity reported - monitor for symptoms",
        "May increase bleeding risk with anticoagulants",
        "Generally very well-tolerated",
        "Use commercial standardized preparations for reliability"
      ]
    }
  },
  {
    id: "sutherlandia",
    commonName: "Sutherlandia (Cancer Bush)",
    scientificName: "Lessertia frutescens (syn. Sutherlandia frutescens)",
    icon: "🌿",
    regions: ["South Africa", "Namibia", "Botswana", "Lesotho"],
    conditions: [
      "Immune support (HIV/AIDS traditional use)",
      "Stress and anxiety (adaptogen)",
      "Inflammation",
      "Diabetes support",
      "General tonic and wellness",
      "Cancer support (experimental, not treatment)"
    ],
    activeCompounds: [
      "L-canavanine (amino acid analogue)",
      "Pinitol (blood sugar regulation)",
      "GABA (calming)",
      "Flavonoids",
      "Triterpenoid saponins"
    ],
    preparationMethods: [
      {
        method: "Leaf Tea",
        description: "Steep 1-2 teaspoons dried leaves in hot water for 10-15 minutes. Drink 2-3 cups daily."
      },
      {
        method: "Capsules",
        description: "300-600mg dried leaf 2-3 times daily."
      },
      {
        method: "Tincture",
        description: "2-5ml liquid extract 2-3 times daily."
      }
    ],
    scientificEvidence: {
      level: "emerging",
      summary: "Traditional use for 'wasting diseases' including HIV/AIDS. Laboratory studies show immunomodulatory and anti-stress effects. NO proven efficacy for cancer - do not replace medical treatment.",
      studies: [
        "Journal of Ethnopharmacology: Adaptogenic and anti-stress properties",
        "NOTE: Claims for cancer treatment are NOT scientifically proven"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 2-3 cups daily. Capsules: 600-1800mg daily. Use under healthcare supervision, especially if on medications.",
      contraindications: [
        "Pregnancy and breastfeeding",
        "Autoimmune diseases",
        "Before surgery",
        "Those on antiretroviral medications (may interact)",
        "Organ transplant recipients"
      ],
      warnings: [
        "IMPORTANT: Not a proven treatment for HIV/AIDS or cancer",
        "L-canavanine may cause autoimmune-like effects in some",
        "May interact with immunosuppressants and diabetes medications",
        "Use only as complementary support, not replacement therapy"
      ]
    }
  },
  {
    id: "hibiscus",
    commonName: "Hibiscus (Roselle)",
    scientificName: "Hibiscus sabdariffa",
    icon: "🌺",
    regions: ["West Africa (origin)", "Egypt", "Sudan", "Mexico", "Caribbean", "Southeast Asia"],
    conditions: [
      "High blood pressure",
      "Cholesterol management",
      "Liver health",
      "Weight management",
      "Antioxidant protection",
      "Mild diuretic"
    ],
    activeCompounds: [
      "Anthocyanins (antioxidant, blood pressure)",
      "Hibiscus acid",
      "Vitamin C",
      "Flavonoids",
      "Organic acids"
    ],
    preparationMethods: [
      {
        method: "Hibiscus Tea (Agua de Jamaica)",
        description: "Steep 1-2 tablespoons dried calyces in hot water for 15-20 minutes. Strain and enjoy hot or iced."
      },
      {
        method: "Cold Brew",
        description: "Steep in cold water for 8-24 hours for smoother, less tart flavor."
      },
      {
        method: "Standardized Extract",
        description: "250-500mg extract standardized to anthocyanins, 1-2 times daily."
      },
      {
        method: "Traditional Preparations",
        description: "West Africa: 'Bissap' or 'Sobolo' - sweetened hibiscus drink with spices."
      }
    ],
    scientificEvidence: {
      level: "strong",
      summary: "Well-documented blood pressure lowering effects in multiple clinical trials. Comparable to some medications for mild hypertension. Also shown to improve lipid profiles.",
      studies: [
        "Journal of Human Hypertension: Significant reduction in blood pressure",
        "Fitoterapia: Lowers LDL cholesterol and triglycerides"
      ]
    },
    safety: {
      dosageGuidelines: "Tea: 2-3 cups daily. Studies used 1.25-2.5g dried calyces steeped in 150-240ml water. Safe for long-term use.",
      contraindications: [
        "Pregnancy (may have estrogenic effects)",
        "Low blood pressure",
        "Those on blood pressure medications (may enhance effects)",
        "Before surgery"
      ],
      warnings: [
        "May significantly lower blood pressure - monitor if on BP meds",
        "Can interact with chloroquine (antimalarial) - reduces effectiveness",
        "May affect acetaminophen metabolism",
        "Very tart - often sweetened (watch sugar intake)"
      ]
    }
  },
  {
    id: "morula",
    commonName: "Morula (Marula)",
    scientificName: "Sclerocarya birrea",
    icon: "🌳",
    regions: ["Southern Africa", "West Africa", "Madagascar", "Sahel region"],
    conditions: [
      "Diarrhea treatment",
      "Skin nourishment (oil)",
      "Malaria (traditional)",
      "Dysentery",
      "Anti-inflammatory support",
      "Antioxidant protection"
    ],
    activeCompounds: [
      "Gallic acid (antimicrobial)",
      "Oleic acid (in oil)",
      "Catechins (antioxidant)",
      "Procyanidins",
      "Vitamin C (in fruit)"
    ],
    preparationMethods: [
      {
        method: "Bark Decoction",
        description: "Boil bark pieces in water for 20-30 minutes. Strain and drink for digestive issues."
      },
      {
        method: "Leaf Tea",
        description: "Steep leaves in hot water for 10-15 minutes. Less common than bark."
      },
      {
        method: "Marula Oil (Seeds)",
        description: "Cold-pressed seed oil applied topically for skin hydration and anti-aging."
      }
    ],
    scientificEvidence: {
      level: "emerging",
      summary: "Traditional medicine across Africa. Laboratory studies confirm antimicrobial and anti-diarrheal properties. Marula oil has documented skin benefits.",
      studies: [
        "Journal of Ethnopharmacology: Antidiarrheal activity confirmed",
        "International Journal of Cosmetic Science: Marula oil skin benefits"
      ]
    },
    safety: {
      dosageGuidelines: "Bark tea: 1-2 cups daily for short-term use. Oil: apply topically as needed.",
      contraindications: [
        "Pregnancy and breastfeeding (insufficient data)",
        "Children (internal use)",
        "Those on diabetes medications"
      ],
      warnings: [
        "Internal use: limited safety data",
        "May lower blood sugar",
        "Bark should be used short-term only",
        "Marula oil is safe for topical use"
      ]
    }
  }
];

export const leafCategories = [
  "All Leaves",
  "Digestive Health",
  "Immune Support",
  "Cognitive Function",
  "Skin & Wounds",
  "Blood Sugar",
  "Respiratory"
];

export const getLeavesByCondition = (condition: string): MedicinalLeaf[] => {
  return medicinalLeaves.filter(leaf => 
    leaf.conditions.some(c => c.toLowerCase().includes(condition.toLowerCase()))
  );
};

export const getLeavesByRegion = (region: string): MedicinalLeaf[] => {
  return medicinalLeaves.filter(leaf =>
    leaf.regions.some(r => r.toLowerCase().includes(region.toLowerCase()))
  );
};
