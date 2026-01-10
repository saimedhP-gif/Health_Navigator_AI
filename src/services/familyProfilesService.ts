/**
 * Family Profiles Service
 * Manages family health data with local storage persistence
 * Can be migrated to Supabase when database tables are created
 */

import {
    FamilyMember,
    MedicalCondition,
    Medication,
    Allergy,
    Vaccination,
    EmergencyContact
} from "@/lib/familyProfiles";

const STORAGE_KEY = "health_navigator_family_profiles";

// Get all family members
export function getFamilyMembers(userId: string): FamilyMember[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        const allMembers: FamilyMember[] = JSON.parse(data);
        return allMembers.filter(m => m.userId === userId);
    } catch (error) {
        console.error("Error loading family members:", error);
        return [];
    }
}

// Save family members
export function saveFamilyMembers(members: FamilyMember[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch (error) {
        console.error("Error saving family members:", error);
    }
}

// Add a new family member
export function addFamilyMember(member: Omit<FamilyMember, "id" | "createdAt" | "updatedAt">): FamilyMember {
    const members = getAllFamilyMembers();
    const newMember: FamilyMember = {
        ...member,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    members.push(newMember);
    saveFamilyMembers(members);
    return newMember;
}

// Update a family member
export function updateFamilyMember(memberId: string, updates: Partial<FamilyMember>): FamilyMember | null {
    const members = getAllFamilyMembers();
    const index = members.findIndex(m => m.id === memberId);
    if (index === -1) return null;

    members[index] = {
        ...members[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };
    saveFamilyMembers(members);
    return members[index];
}

// Delete a family member
export function deleteFamilyMember(memberId: string): boolean {
    const members = getAllFamilyMembers();
    const filtered = members.filter(m => m.id !== memberId);
    if (filtered.length === members.length) return false;
    saveFamilyMembers(filtered);
    return true;
}

// Add medical condition
export function addMedicalCondition(memberId: string, condition: Omit<MedicalCondition, "id">): MedicalCondition | null {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return null;

    const newCondition: MedicalCondition = {
        ...condition,
        id: generateId(),
    };
    member.medicalConditions.push(newCondition);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return newCondition;
}

// Update medical condition
export function updateMedicalCondition(memberId: string, conditionId: string, updates: Partial<MedicalCondition>): boolean {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return false;

    const index = member.medicalConditions.findIndex(c => c.id === conditionId);
    if (index === -1) return false;

    member.medicalConditions[index] = { ...member.medicalConditions[index], ...updates };
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return true;
}

// Delete medical condition
export function deleteMedicalCondition(memberId: string, conditionId: string): boolean {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return false;

    member.medicalConditions = member.medicalConditions.filter(c => c.id !== conditionId);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return true;
}

// Add medication
export function addMedication(memberId: string, medication: Omit<Medication, "id">): Medication | null {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return null;

    const newMedication: Medication = {
        ...medication,
        id: generateId(),
    };
    member.medications.push(newMedication);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return newMedication;
}

// Update medication
export function updateMedication(memberId: string, medicationId: string, updates: Partial<Medication>): boolean {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return false;

    const index = member.medications.findIndex(m => m.id === medicationId);
    if (index === -1) return false;

    member.medications[index] = { ...member.medications[index], ...updates };
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return true;
}

// Delete medication
export function deleteMedication(memberId: string, medicationId: string): boolean {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return false;

    member.medications = member.medications.filter(m => m.id !== medicationId);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return true;
}

// Add allergy
export function addAllergy(memberId: string, allergy: Omit<Allergy, "id">): Allergy | null {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return null;

    const newAllergy: Allergy = {
        ...allergy,
        id: generateId(),
    };
    member.allergies.push(newAllergy);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return newAllergy;
}

// Delete allergy
export function deleteAllergy(memberId: string, allergyId: string): boolean {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return false;

    member.allergies = member.allergies.filter(a => a.id !== allergyId);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return true;
}

// Add vaccination
export function addVaccination(memberId: string, vaccination: Omit<Vaccination, "id">): Vaccination | null {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return null;

    const newVaccination: Vaccination = {
        ...vaccination,
        id: generateId(),
    };
    member.vaccinations.push(newVaccination);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return newVaccination;
}

// Delete vaccination
export function deleteVaccination(memberId: string, vaccinationId: string): boolean {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return false;

    member.vaccinations = member.vaccinations.filter(v => v.id !== vaccinationId);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return true;
}

// Add emergency contact
export function addEmergencyContact(memberId: string, contact: Omit<EmergencyContact, "id">): EmergencyContact | null {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return null;

    const newContact: EmergencyContact = {
        ...contact,
        id: generateId(),
    };
    member.emergencyContacts.push(newContact);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return newContact;
}

// Delete emergency contact
export function deleteEmergencyContact(memberId: string, contactId: string): boolean {
    const members = getAllFamilyMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return false;

    member.emergencyContacts = member.emergencyContacts.filter(c => c.id !== contactId);
    member.updatedAt = new Date().toISOString();
    saveFamilyMembers(members);
    return true;
}

// Initialize with self profile if empty
export function initializeFamilyProfiles(userId: string, userName?: string): FamilyMember {
    const members = getFamilyMembers(userId);
    const selfMember = members.find(m => m.relationship === "self");

    if (selfMember) return selfMember;

    // Create a self profile
    const newSelf = addFamilyMember({
        userId,
        name: userName || "Self",
        relationship: "self",
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
        appointmentReminders: true,
    });

    return newSelf;
}

// Helper functions
function getAllFamilyMembers(): FamilyMember[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default {
    getFamilyMembers,
    saveFamilyMembers,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    addMedicalCondition,
    updateMedicalCondition,
    deleteMedicalCondition,
    addMedication,
    updateMedication,
    deleteMedication,
    addAllergy,
    deleteAllergy,
    addVaccination,
    deleteVaccination,
    addEmergencyContact,
    deleteEmergencyContact,
    initializeFamilyProfiles,
};
