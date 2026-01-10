import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Utensils,
    Heart,
    Leaf,
    ShoppingCart,
    Clock,
    Flame,
    Activity,
    ChevronRight,
    Plus,
    Minus,
    CheckCircle2,
    AlertTriangle,
    Sparkles,
    Apple,
    Coffee,
    Sun,
    Moon,
    Soup,
    Salad,
    Sandwich,
    UtensilsCrossed,
    MapPin,
    Filter,
    Download,
    Share2,
    Star,
    Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Health conditions
const healthConditions = [
    { id: "diabetes", name: "Diabetes", emoji: "🩸", tips: "Low glycemic index, limit sugar" },
    { id: "hypertension", name: "High Blood Pressure", emoji: "❤️", tips: "Low sodium, DASH diet" },
    { id: "heart", name: "Heart Disease", emoji: "🫀", tips: "Low fat, high fiber" },
    { id: "cholesterol", name: "High Cholesterol", emoji: "🧬", tips: "Avoid trans fats, increase fiber" },
    { id: "weight-loss", name: "Weight Loss", emoji: "⚖️", tips: "Calorie deficit, high protein" },
    { id: "pcos", name: "PCOS", emoji: "👩", tips: "Low carb, anti-inflammatory" },
    { id: "thyroid", name: "Thyroid Issues", emoji: "🦋", tips: "Avoid goitrogens, iodine-rich" },
    { id: "general", name: "General Wellness", emoji: "✨", tips: "Balanced nutrition" }
];

// Regional cuisines
const regionalCuisines = [
    { id: "north", name: "North Indian", states: "Punjab, Delhi, UP", popular: ["Roti", "Dal", "Paneer"] },
    { id: "south", name: "South Indian", states: "Tamil Nadu, Kerala, Karnataka", popular: ["Idli", "Sambar", "Rice"] },
    { id: "west", name: "West Indian", states: "Maharashtra, Gujarat, Rajasthan", popular: ["Thepla", "Poha", "Bhakri"] },
    { id: "east", name: "East Indian", states: "Bengal, Odisha, Bihar", popular: ["Fish", "Rice", "Mishti"] },
    { id: "continental", name: "Continental/Mixed", states: "Fusion", popular: ["Salads", "Wraps", "Bowls"] }
];

// Sample meal plans for diabetes
const diabetesMealPlans = {
    breakfast: [
        {
            name: "Methi Paratha with Curd",
            calories: 280,
            protein: 10,
            carbs: 35,
            fat: 12,
            gi: "Low",
            ingredients: ["Whole wheat flour", "Fenugreek leaves", "Curd", "Minimal oil"],
            healthBenefits: ["Fenugreek helps control blood sugar", "Probiotics in curd aid digestion"],
            recipe: "Mix chopped methi with wheat flour, make soft dough, roll thin parathas, cook with minimal oil."
        },
        {
            name: "Vegetable Upma",
            calories: 220,
            protein: 6,
            carbs: 30,
            fat: 8,
            gi: "Medium",
            ingredients: ["Semolina/Rava", "Mixed vegetables", "Mustard seeds", "Curry leaves"],
            healthBenefits: ["Fiber from vegetables", "Complex carbohydrates for sustained energy"],
            recipe: "Roast rava, temper with mustard seeds, add vegetables, cook with water."
        },
        {
            name: "Moong Dal Chilla",
            calories: 180,
            protein: 12,
            carbs: 20,
            fat: 5,
            gi: "Low",
            ingredients: ["Moong dal", "Onion", "Green chilli", "Tomato"],
            healthBenefits: ["High protein", "Low glycemic index", "Rich in fiber"],
            recipe: "Soak moong dal, grind to batter, add vegetables, make thin crepes."
        }
    ],
    lunch: [
        {
            name: "Brown Rice + Dal + Sabzi + Salad",
            calories: 420,
            protein: 15,
            carbs: 60,
            fat: 10,
            gi: "Medium",
            ingredients: ["Brown rice", "Toor dal", "Seasonal vegetables", "Green salad"],
            healthBenefits: ["Complete protein", "Fiber-rich", "Low glycemic brown rice"],
            recipe: "Cook brown rice, prepare simple dal tadka, stir-fry vegetables minimally."
        },
        {
            name: "Roti + Palak Paneer + Raita",
            calories: 380,
            protein: 18,
            carbs: 35,
            fat: 15,
            gi: "Low",
            ingredients: ["Whole wheat roti", "Spinach", "Low-fat paneer", "Curd"],
            healthBenefits: ["Iron from spinach", "Protein from paneer", "Probiotics from raita"],
            recipe: "Make multigrain rotis, cook spinach with paneer cubes, prepare mint raita."
        }
    ],
    dinner: [
        {
            name: "Vegetable Khichdi + Kadhi",
            calories: 320,
            protein: 12,
            carbs: 45,
            fat: 8,
            gi: "Medium",
            ingredients: ["Rice", "Moong dal", "Mixed vegetables", "Curd-based kadhi"],
            healthBenefits: ["Easy to digest", "Complete nutrition", "Soothing for stomach"],
            recipe: "Cook rice and dal together with vegetables, prepare light kadhi."
        },
        {
            name: "Bajra Roti + Lauki Sabzi",
            calories: 250,
            protein: 8,
            carbs: 40,
            fat: 6,
            gi: "Low",
            ingredients: ["Bajra flour", "Bottle gourd", "Minimal spices"],
            healthBenefits: ["Bajra is diabetic-friendly", "Lauki aids hydration", "Low calorie"],
            recipe: "Make bajra rotis, cook lauki with light spices."
        }
    ],
    snacks: [
        { name: "Roasted Chana", calories: 100, portion: "1/4 cup" },
        { name: "Cucumber + Hummus", calories: 80, portion: "1 cup + 2 tbsp" },
        { name: "Mixed Nuts", calories: 120, portion: "10-12 pieces" },
        { name: "Greek Yogurt", calories: 100, portion: "1 small bowl" },
        { name: "Sprouts Chaat", calories: 90, portion: "1 bowl" }
    ]
};

// Grocery list generator
const generateGroceryList = (mealPlan: typeof diabetesMealPlans) => {
    const groceries = {
        grains: ["Whole wheat flour (1 kg)", "Brown rice (1 kg)", "Bajra flour (500g)", "Moong dal (500g)", "Toor dal (500g)"],
        vegetables: ["Spinach (2 bunches)", "Methi leaves (1 bunch)", "Bottle gourd (1)", "Mixed vegetables (1 kg)", "Tomatoes (500g)", "Onions (500g)"],
        dairy: ["Low-fat curd (1 kg)", "Low-fat paneer (200g)", "Low-fat milk (1 L)"],
        proteins: ["Moong dal", "Chana (500g)", "Sprouts"],
        others: ["Mustard oil (500ml)", "Mixed nuts (200g)", "Green chillies", "Ginger", "Garlic", "Curry leaves"]
    };
    return groceries;
};

// Nutrition goals
const nutritionGoals = {
    diabetes: { calories: 1600, protein: 60, carbs: 180, fat: 45, fiber: 30, sugar: 25 },
    hypertension: { calories: 1800, protein: 65, carbs: 200, fat: 50, fiber: 35, sodium: 1500 },
    "weight-loss": { calories: 1400, protein: 70, carbs: 140, fat: 40, fiber: 30, sugar: 20 },
    general: { calories: 2000, protein: 55, carbs: 250, fat: 65, fiber: 25, sugar: 50 }
};

export default function DietPlanner() {
    const { toast } = useToast();
    const [step, setStep] = useState<"conditions" | "cuisine" | "plan">("conditions");
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [selectedCuisine, setSelectedCuisine] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"meals" | "recipes" | "grocery" | "tracker">("meals");
    const [selectedMeal, setSelectedMeal] = useState<typeof diabetesMealPlans.breakfast[0] | null>(null);
    const [dailyLog, setDailyLog] = useState<{ meal: string; calories: number }[]>([]);
    const [waterIntake, setWaterIntake] = useState(0);

    // Toggle condition selection
    const toggleCondition = (conditionId: string) => {
        setSelectedConditions(prev =>
            prev.includes(conditionId)
                ? prev.filter(c => c !== conditionId)
                : [...prev, conditionId]
        );
    };

    // Log meal
    const logMeal = (meal: string, calories: number) => {
        setDailyLog(prev => [...prev, { meal, calories }]);
        toast({
            title: "Meal logged! 🍽️",
            description: `Added ${meal} (${calories} cal) to your daily log.`,
        });
    };

    // Calculate totals
    const totalCalories = dailyLog.reduce((sum, log) => sum + log.calories, 0);
    const goalCalories = selectedConditions.includes("diabetes")
        ? nutritionGoals.diabetes.calories
        : selectedConditions.includes("weight-loss")
            ? nutritionGoals["weight-loss"].calories
            : nutritionGoals.general.calories;

    const groceryList = generateGroceryList(diabetesMealPlans);

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-green-500/5 to-background py-12">
                <div className="container max-w-5xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                            <Utensils className="w-5 h-5 text-green-500" />
                            <span className="text-green-500 font-medium">Diet & Nutrition Planner</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Eat Right, Live Healthy 🥗</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Personalized Indian meal plans based on your health conditions with regional cuisine options.
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {/* Step 1: Select Health Conditions */}
                        {step === "conditions" && (
                            <motion.div
                                key="conditions"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="health-card">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-green-500" />
                                        Select Your Health Conditions
                                    </h2>
                                    <p className="text-muted-foreground mb-6">
                                        Choose all that apply. We'll customize your meal plan accordingly.
                                    </p>

                                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                                        {healthConditions.map((condition) => (
                                            <button
                                                key={condition.id}
                                                onClick={() => toggleCondition(condition.id)}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${selectedConditions.includes(condition.id)
                                                        ? "border-green-500 bg-green-500/10"
                                                        : "border-border hover:border-green-500/50"
                                                    }`}
                                            >
                                                <span className="text-2xl block mb-2">{condition.emoji}</span>
                                                <h3 className="font-semibold text-sm">{condition.name}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">{condition.tips}</p>
                                                {selectedConditions.includes(condition.id) && (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 absolute top-2 right-2" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={() => setStep("cuisine")}
                                        disabled={selectedConditions.length === 0}
                                        className="w-full mt-6 gap-2"
                                    >
                                        Continue
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Select Regional Cuisine */}
                        {step === "cuisine" && (
                            <motion.div
                                key="cuisine"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="health-card">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-green-500" />
                                        Choose Your Cuisine Preference
                                    </h2>
                                    <p className="text-muted-foreground mb-6">
                                        Select your preferred regional cuisine style.
                                    </p>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {regionalCuisines.map((cuisine) => (
                                            <button
                                                key={cuisine.id}
                                                onClick={() => setSelectedCuisine(cuisine.id)}
                                                className={`p-5 rounded-xl border-2 text-left transition-all ${selectedCuisine === cuisine.id
                                                        ? "border-green-500 bg-green-500/10"
                                                        : "border-border hover:border-green-500/50"
                                                    }`}
                                            >
                                                <h3 className="font-semibold mb-1">{cuisine.name}</h3>
                                                <p className="text-xs text-muted-foreground mb-2">{cuisine.states}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {cuisine.popular.map((item, i) => (
                                                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-muted">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <Button variant="outline" onClick={() => setStep("conditions")}>
                                            Back
                                        </Button>
                                        <Button
                                            onClick={() => setStep("plan")}
                                            disabled={!selectedCuisine}
                                            className="flex-1 gap-2"
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            Generate My Meal Plan
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: View Meal Plan */}
                        {step === "plan" && (
                            <motion.div
                                key="plan"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Tab Navigation */}
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {[
                                        { id: "meals", label: "Meal Plan", icon: Utensils },
                                        { id: "recipes", label: "Recipes", icon: UtensilsCrossed },
                                        { id: "grocery", label: "Grocery List", icon: ShoppingCart },
                                        { id: "tracker", label: "Daily Tracker", icon: Activity }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${activeTab === tab.id
                                                    ? "bg-green-500 text-white"
                                                    : "bg-card border border-border hover:border-green-500/50"
                                                }`}
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Meal Plan Tab */}
                                {activeTab === "meals" && (
                                    <div className="space-y-6">
                                        {/* Breakfast */}
                                        <div className="health-card">
                                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                                <Coffee className="w-5 h-5 text-amber-500" />
                                                Breakfast Options
                                            </h3>
                                            <div className="grid gap-3">
                                                {diabetesMealPlans.breakfast.map((meal, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => setSelectedMeal(meal)}
                                                        className="p-4 rounded-xl border border-border hover:border-green-500/50 cursor-pointer transition-all"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-semibold">{meal.name}</h4>
                                                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                                                    <span className="flex items-center gap-1">
                                                                        <Flame className="w-3 h-3" /> {meal.calories} cal
                                                                    </span>
                                                                    <span>P: {meal.protein}g</span>
                                                                    <span>C: {meal.carbs}g</span>
                                                                    <span className={`px-2 py-0.5 rounded-full text-xs ${meal.gi === "Low" ? "bg-green-500/20 text-green-500" : "bg-amber-500/20 text-amber-500"
                                                                        }`}>
                                                                        GI: {meal.gi}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        logMeal(meal.name, meal.calories);
                                                                    }}
                                                                >
                                                                    <Plus className="w-4 h-4" /> Log
                                                                </Button>
                                                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Lunch */}
                                        <div className="health-card">
                                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                                <Sun className="w-5 h-5 text-orange-500" />
                                                Lunch Options
                                            </h3>
                                            <div className="grid gap-3">
                                                {diabetesMealPlans.lunch.map((meal, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => setSelectedMeal(meal)}
                                                        className="p-4 rounded-xl border border-border hover:border-green-500/50 cursor-pointer transition-all"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-semibold">{meal.name}</h4>
                                                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                                                    <span className="flex items-center gap-1">
                                                                        <Flame className="w-3 h-3" /> {meal.calories} cal
                                                                    </span>
                                                                    <span>P: {meal.protein}g</span>
                                                                    <span>C: {meal.carbs}g</span>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    logMeal(meal.name, meal.calories);
                                                                }}
                                                            >
                                                                <Plus className="w-4 h-4" /> Log
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Dinner */}
                                        <div className="health-card">
                                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                                <Moon className="w-5 h-5 text-indigo-500" />
                                                Dinner Options
                                            </h3>
                                            <div className="grid gap-3">
                                                {diabetesMealPlans.dinner.map((meal, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => setSelectedMeal(meal)}
                                                        className="p-4 rounded-xl border border-border hover:border-green-500/50 cursor-pointer transition-all"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-semibold">{meal.name}</h4>
                                                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                                                    <span className="flex items-center gap-1">
                                                                        <Flame className="w-3 h-3" /> {meal.calories} cal
                                                                    </span>
                                                                    <span>P: {meal.protein}g</span>
                                                                    <span>C: {meal.carbs}g</span>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    logMeal(meal.name, meal.calories);
                                                                }}
                                                            >
                                                                <Plus className="w-4 h-4" /> Log
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Snacks */}
                                        <div className="health-card">
                                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                                <Apple className="w-5 h-5 text-red-500" />
                                                Healthy Snacks
                                            </h3>
                                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                {diabetesMealPlans.snacks.map((snack, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-3 rounded-xl border border-border hover:border-green-500/50 transition-all"
                                                    >
                                                        <h4 className="font-medium text-sm">{snack.name}</h4>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <span className="text-xs text-muted-foreground">{snack.portion}</span>
                                                            <span className="text-xs text-green-500">{snack.calories} cal</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Recipes Tab */}
                                {activeTab === "recipes" && (
                                    <div className="space-y-6">
                                        {selectedMeal ? (
                                            <div className="health-card">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h2 className="text-xl font-semibold">{selectedMeal.name}</h2>
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedMeal(null)}>
                                                        ← Back to list
                                                    </Button>
                                                </div>

                                                <div className="grid sm:grid-cols-4 gap-4 mb-6">
                                                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                                                        <p className="text-2xl font-bold text-green-500">{selectedMeal.calories}</p>
                                                        <p className="text-xs text-muted-foreground">Calories</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                                                        <p className="text-2xl font-bold text-blue-500">{selectedMeal.protein}g</p>
                                                        <p className="text-xs text-muted-foreground">Protein</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                                                        <p className="text-2xl font-bold text-amber-500">{selectedMeal.carbs}g</p>
                                                        <p className="text-xs text-muted-foreground">Carbs</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                                                        <p className="text-2xl font-bold text-purple-500">{selectedMeal.fat}g</p>
                                                        <p className="text-xs text-muted-foreground">Fat</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                            <ShoppingCart className="w-4 h-4 text-green-500" />
                                                            Ingredients
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedMeal.ingredients.map((ing, i) => (
                                                                <span key={i} className="px-3 py-1 rounded-full bg-muted text-sm">
                                                                    {ing}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                            <UtensilsCrossed className="w-4 h-4 text-green-500" />
                                                            How to Make
                                                        </h3>
                                                        <p className="text-muted-foreground">{selectedMeal.recipe}</p>
                                                    </div>

                                                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                                                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-600">
                                                            <Heart className="w-4 h-4" />
                                                            Health Benefits
                                                        </h3>
                                                        <ul className="space-y-1">
                                                            {selectedMeal.healthBenefits.map((benefit, i) => (
                                                                <li key={i} className="text-sm flex items-start gap-2">
                                                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                                    {benefit}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="health-card text-center py-12">
                                                <UtensilsCrossed className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                                <h3 className="font-semibold mb-2">Select a Meal to View Recipe</h3>
                                                <p className="text-muted-foreground">
                                                    Click on any meal from the Meal Plan tab to see detailed recipe and health benefits.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Grocery List Tab */}
                                {activeTab === "grocery" && (
                                    <div className="space-y-6">
                                        <div className="health-card">
                                            <div className="flex items-center justify-between mb-6">
                                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                                    <ShoppingCart className="w-5 h-5 text-green-500" />
                                                    Weekly Grocery List
                                                </h2>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </Button>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6">
                                                {/* Grains */}
                                                <div>
                                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                        🌾 Grains & Pulses
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {groceryList.grains.map((item, i) => (
                                                            <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                                                <span className="text-sm">{item}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Vegetables */}
                                                <div>
                                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                        🥬 Vegetables
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {groceryList.vegetables.map((item, i) => (
                                                            <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                                                <span className="text-sm">{item}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Dairy */}
                                                <div>
                                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                        🥛 Dairy
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {groceryList.dairy.map((item, i) => (
                                                            <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                                                <span className="text-sm">{item}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Others */}
                                                <div>
                                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                        🛒 Other Items
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {groceryList.others.map((item, i) => (
                                                            <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                                                <span className="text-sm">{item}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Daily Tracker Tab */}
                                {activeTab === "tracker" && (
                                    <div className="space-y-6">
                                        {/* Calorie Summary */}
                                        <div className="health-card">
                                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-green-500" />
                                                Today's Progress
                                            </h2>

                                            {/* Calorie Progress */}
                                            <div className="mb-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">Calories</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {totalCalories} / {goalCalories} cal
                                                    </span>
                                                </div>
                                                <div className="h-4 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all ${totalCalories > goalCalories ? "bg-red-500" : "bg-green-500"
                                                            }`}
                                                        style={{ width: `${Math.min((totalCalories / goalCalories) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {goalCalories - totalCalories > 0
                                                        ? `${goalCalories - totalCalories} calories remaining`
                                                        : `${totalCalories - goalCalories} calories over goal`}
                                                </p>
                                            </div>

                                            {/* Water Intake */}
                                            <div className="mb-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">💧 Water Intake</span>
                                                    <span className="text-sm text-muted-foreground">{waterIntake} / 8 glasses</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {[...Array(8)].map((_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setWaterIntake(i + 1)}
                                                            className={`w-8 h-8 rounded-full transition-all ${i < waterIntake ? "bg-blue-500 text-white" : "bg-muted"
                                                                }`}
                                                        >
                                                            💧
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Logged Meals */}
                                            <div>
                                                <h3 className="font-semibold mb-3">Logged Meals</h3>
                                                {dailyLog.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {dailyLog.map((log, i) => (
                                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                                                                <span className="font-medium">{log.meal}</span>
                                                                <span className="text-sm text-muted-foreground">{log.calories} cal</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-muted-foreground text-center py-8">
                                                        No meals logged today. Start tracking from the Meal Plan tab!
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Nutrition Tips */}
                                        <div className="health-card bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/30">
                                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                <Leaf className="w-5 h-5 text-green-500" />
                                                Nutrition Tips for Your Conditions
                                            </h3>
                                            <ul className="space-y-2">
                                                {selectedConditions.map((condId) => {
                                                    const cond = healthConditions.find(c => c.id === condId);
                                                    return cond ? (
                                                        <li key={condId} className="flex items-start gap-2 text-sm">
                                                            <span>{cond.emoji}</span>
                                                            <span><strong>{cond.name}:</strong> {cond.tips}</span>
                                                        </li>
                                                    ) : null;
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Back Button */}
                                <div className="text-center">
                                    <Button variant="outline" onClick={() => setStep("conditions")}>
                                        ← Start Over
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}
