/**
 * Family Health Profiles Types and Utilities
 * Manages family members' health data under one account
 */

export type RelationshipType =
    | "self"
    | "spouse"
    | "parent"
    | "child"
    | "grandparent"
    | "grandchild"
    | "sibling"
    | "other";

export type BloodGroup =
    | "A+" | "A-"
    | "B+" | "B-"
    | "AB+" | "AB-"
    | "O+" | "O-"
    | "unknown";

export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

export interface EmergencyContact {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    alternatePhone?: string;
    email?: string;
    isDoctor?: boolean;
    specialization?: string;
    hospitalName?: string;
}

export interface MedicalCondition {
    id: string;
    name: string;
    diagnosedDate?: string;
    status: "active" | "managed" | "resolved";
    notes?: string;
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate?: string;
    endDate?: string;
    prescribedBy?: string;
    notes?: string;
}

export interface Allergy {
    id: string;
    allergen: string;
    severity: "mild" | "moderate" | "severe";
    reaction?: string;
    notes?: string;
}

export interface Vaccination {
    id: string;
    name: string;
    date: string;
    nextDueDate?: string;
    provider?: string;
    notes?: string;
}

export interface FamilyMember {
    id: string;
    userId: string; // Parent account ID
    name: string;
    relationship: RelationshipType;
    dateOfBirth: string;
    gender: Gender;
    bloodGroup: BloodGroup;
    profileImage?: string;

    // Medical Information
    height?: number; // in cm
    weight?: number; // in kg
    medicalConditions: MedicalCondition[];
    medications: Medication[];
    allergies: Allergy[];
    vaccinations: Vaccination[];

    // Emergency Information
    emergencyContacts: EmergencyContact[];
    primaryDoctor?: EmergencyContact;
    preferredHospital?: string;
    insuranceProvider?: string;
    insurancePolicyNumber?: string;

    // Settings
    notificationsEnabled: boolean;
    medicationReminders: boolean;
    appointmentReminders: boolean;

    // Metadata
    createdAt: string;
    updatedAt: string;
}

export interface FamilyProfilesState {
    members: FamilyMember[];
    selectedMemberId: string | null;
    isLoading: boolean;
    error: string | null;
}

// Helper function to calculate age
export function calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Helper function to get BMI
export function calculateBMI(heightCm: number, weightKg: number): {
    bmi: number;
    category: string;
    color: string;
} {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    let category: string;
    let color: string;

    if (bmi < 18.5) {
        category = "Underweight";
        color = "text-amber-500";
    } else if (bmi < 25) {
        category = "Normal";
        color = "text-green-500";
    } else if (bmi < 30) {
        category = "Overweight";
        color = "text-amber-500";
    } else {
        category = "Obese";
        color = "text-red-500";
    }

    return { bmi: Math.round(bmi * 10) / 10, category, color };
}

// Get relationship label with localization support
export function getRelationshipLabel(relationship: RelationshipType, language: string = "en"): string {
    const labels: Record<string, Record<RelationshipType, string>> = {
        en: {
            self: "Self",
            spouse: "Spouse",
            parent: "Parent",
            child: "Child",
            grandparent: "Grandparent",
            grandchild: "Grandchild",
            sibling: "Sibling",
            other: "Other"
        },
        hi: {
            self: "स्वयं",
            spouse: "जीवनसाथी",
            parent: "माता-पिता",
            child: "बच्चा",
            grandparent: "दादा-दादी/नाना-नानी",
            grandchild: "पोता-पोती/नाती-नातिन",
            sibling: "भाई-बहन",
            other: "अन्य"
        },
        te: {
            self: "స్వయం",
            spouse: "భాగస్వామి",
            parent: "తల్లిదండ్రులు",
            child: "పిల్లలు",
            grandparent: "తాత-అమ్మమ్మ",
            grandchild: "మనవడు/మనవరాలు",
            sibling: "సోదరుడు/సోదరి",
            other: "ఇతర"
        },
        ta: {
            self: "சுயம்",
            spouse: "வாழ்க்கைத்துணை",
            parent: "பெற்றோர்",
            child: "குழந்தை",
            grandparent: "தாத்தா-பாட்டி",
            grandchild: "பேரக்குழந்தை",
            sibling: "உடன்பிறப்பு",
            other: "மற்றவை"
        }
    };

    return labels[language]?.[relationship] || labels.en[relationship];
}

// Create empty family member
export function createEmptyFamilyMember(userId: string): Omit<FamilyMember, "id" | "createdAt" | "updatedAt"> {
    return {
        userId,
        name: "",
        relationship: "other",
        dateOfBirth: "",
        gender: "prefer_not_to_say",
        bloodGroup: "unknown",
        medicalConditions: [],
        medications: [],
        allergies: [],
        vaccinations: [],
        emergencyContacts: [],
        notificationsEnabled: true,
        medicationReminders: true,
        appointmentReminders: true
    };
}

export default {
    calculateAge,
    calculateBMI,
    getRelationshipLabel,
    createEmptyFamilyMember
};
