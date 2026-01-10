import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    Users,
    Plus,
    Heart,
    User,
    Baby,
    UserCircle,
    Phone,
    AlertCircle,
    Edit,
    Trash2,
    Calendar,
    Pill,
    Stethoscope,
    Shield,
    ChevronRight,
    AlertTriangle,
    CheckCircle,
    Loader2,
    Save,
    X,
    Syringe
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
    FamilyMember,
    RelationshipType,
    BloodGroup,
    Gender,
    EmergencyContact,
    MedicalCondition,
    Medication,
    Allergy,
    Vaccination,
    calculateAge,
    calculateBMI,
    getRelationshipLabel,
    createEmptyFamilyMember
} from "@/lib/familyProfiles";
import * as familyService from "@/services/familyProfilesService";
import {
    AddConditionModal,
    AddMedicationModal,
    AddAllergyModal,
    AddVaccinationModal,
    AddEmergencyContactModal
} from "@/components/family/HealthDataModals";

// Icons for different relationships
const relationshipIcons: Record<RelationshipType, React.ReactNode> = {
    self: <UserCircle className="w-5 h-5" />,
    spouse: <Heart className="w-5 h-5" />,
    parent: <User className="w-5 h-5" />,
    child: <Baby className="w-5 h-5" />,
    grandparent: <User className="w-5 h-5" />,
    grandchild: <Baby className="w-5 h-5" />,
    sibling: <Users className="w-5 h-5" />,
    other: <User className="w-5 h-5" />
};

// Sample data for demonstration
const sampleFamilyMembers: FamilyMember[] = [
    {
        id: "1",
        userId: "user-1",
        name: "Self",
        relationship: "self",
        dateOfBirth: "1990-05-15",
        gender: "male",
        bloodGroup: "O+",
        height: 175,
        weight: 70,
        medicalConditions: [],
        medications: [],
        allergies: [{ id: "a1", allergen: "Penicillin", severity: "moderate", reaction: "Rash" }],
        vaccinations: [],
        emergencyContacts: [],
        notificationsEnabled: true,
        medicationReminders: true,
        appointmentReminders: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

function FamilyMemberCard({
    member,
    isSelected,
    onClick,
    onEdit,
    onDelete
}: {
    member: FamilyMember;
    isSelected: boolean;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const age = calculateAge(member.dateOfBirth);
    const bmiData = member.height && member.weight
        ? calculateBMI(member.height, member.weight)
        : null;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative p-4 rounded-xl border cursor-pointer transition-all ${isSelected
                ? "bg-primary/10 border-primary shadow-lg"
                : "bg-card border-border hover:border-primary/50"
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                    {member.profileImage ? (
                        <img src={member.profileImage} alt={member.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <span className="text-2xl font-bold">
                            {member.name.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{member.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${member.relationship === "self"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                            }`}>
                            {getRelationshipLabel(member.relationship)}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span>{age} years</span>
                        <span>•</span>
                        <span>{member.bloodGroup}</span>
                        {bmiData && (
                            <>
                                <span>•</span>
                                <span className={bmiData.color}>BMI: {bmiData.bmi}</span>
                            </>
                        )}
                    </div>

                    {/* Health Status Icons */}
                    <div className="flex gap-2 mt-2">
                        {member.medicalConditions.filter(c => c.status === "active").length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-amber-500">
                                <AlertTriangle className="w-3 h-3" />
                                {member.medicalConditions.filter(c => c.status === "active").length} condition(s)
                            </span>
                        )}
                        {member.medications.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-blue-500">
                                <Pill className="w-3 h-3" />
                                {member.medications.length} medication(s)
                            </span>
                        )}
                        {member.allergies.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-red-500">
                                <AlertCircle className="w-3 h-3" />
                                {member.allergies.length} allergy(ies)
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                    {member.relationship !== "self" && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function EmergencyContactCard({ contact }: { contact: EmergencyContact }) {
    return (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                </div>
                <a
                    href={`tel:${contact.phone}`}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                    Call
                </a>
            </div>
            {contact.isDoctor && (
                <div className="mt-2 pt-2 border-t border-red-500/20">
                    <p className="text-xs text-muted-foreground">
                        <Stethoscope className="w-3 h-3 inline mr-1" />
                        {contact.specialization} • {contact.hospitalName}
                    </p>
                </div>
            )}
        </div>
    );
}

function AddFamilyMemberModal({
    isOpen,
    onClose,
    onSave,
    editingMember
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (member: Partial<FamilyMember>) => void;
    editingMember?: FamilyMember | null;
}) {
    const [formData, setFormData] = useState({
        name: "",
        relationship: "child" as RelationshipType,
        dateOfBirth: "",
        gender: "prefer_not_to_say" as Gender,
        bloodGroup: "unknown" as BloodGroup,
        height: "",
        weight: ""
    });

    useEffect(() => {
        if (editingMember) {
            setFormData({
                name: editingMember.name,
                relationship: editingMember.relationship,
                dateOfBirth: editingMember.dateOfBirth,
                gender: editingMember.gender,
                bloodGroup: editingMember.bloodGroup,
                height: editingMember.height?.toString() || "",
                weight: editingMember.weight?.toString() || ""
            });
        } else {
            setFormData({
                name: "",
                relationship: "child",
                dateOfBirth: "",
                gender: "prefer_not_to_say",
                bloodGroup: "unknown",
                height: "",
                weight: ""
            });
        }
    }, [editingMember, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            height: formData.height ? Number(formData.height) : undefined,
            weight: formData.weight ? Number(formData.weight) : undefined
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                        {editingMember ? "Edit Family Member" : "Add Family Member"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                            required
                            placeholder="Enter name"
                        />
                    </div>

                    {/* Relationship */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Relationship *</label>
                        <select
                            value={formData.relationship}
                            onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value as RelationshipType }))}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                        >
                            <option value="spouse">Spouse (जीवनसाथी)</option>
                            <option value="parent">Parent (माता-पिता)</option>
                            <option value="child">Child (बच्चा)</option>
                            <option value="grandparent">Grandparent (दादा-दादी)</option>
                            <option value="grandchild">Grandchild (पोता-पोती)</option>
                            <option value="sibling">Sibling (भाई-बहन)</option>
                            <option value="other">Other (अन्य)</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                        <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                            required
                        />
                    </div>

                    {/* Gender and Blood Group */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Gender</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as Gender }))}
                                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                            >
                                <option value="male">Male (पुरुष)</option>
                                <option value="female">Female (महिला)</option>
                                <option value="other">Other</option>
                                <option value="prefer_not_to_say">Prefer not to say</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Blood Group</label>
                            <select
                                value={formData.bloodGroup}
                                onChange={(e) => setFormData(prev => ({ ...prev, bloodGroup: e.target.value as BloodGroup }))}
                                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                            >
                                <option value="unknown">Unknown</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>

                    {/* Height and Weight */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Height (cm)</label>
                            <input
                                type="number"
                                value={formData.height}
                                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                                placeholder="e.g., 170"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                value={formData.weight}
                                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                                placeholder="e.g., 65"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            <Save className="w-4 h-4 mr-2" />
                            {editingMember ? "Update" : "Add Member"}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default function FamilyProfiles() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Modal states for health data
    const [conditionModal, setConditionModal] = useState(false);
    const [medicationModal, setMedicationModal] = useState(false);
    const [allergyModal, setAllergyModal] = useState(false);
    const [vaccinationModal, setVaccinationModal] = useState(false);
    const [emergencyContactModal, setEmergencyContactModal] = useState(false);

    const selectedMember = familyMembers.find(m => m.id === selectedMemberId);

    // Load family members on mount
    useEffect(() => {
        if (user?.id) {
            const members = familyService.getFamilyMembers(user.id);
            if (members.length === 0) {
                const selfMember = familyService.initializeFamilyProfiles(user.id, user.email?.split('@')[0]);
                setFamilyMembers([selfMember]);
                setSelectedMemberId(selfMember.id);
            } else {
                setFamilyMembers(members);
                setSelectedMemberId(members[0]?.id || null);
            }
        }
        setIsLoading(false);
    }, [user?.id]);

    const refreshMembers = () => {
        if (user?.id) {
            setFamilyMembers(familyService.getFamilyMembers(user.id));
        }
    };

    const handleAddMember = (memberData: Partial<FamilyMember>) => {
        if (editingMember) {
            familyService.updateFamilyMember(editingMember.id, memberData);
            toast({ title: "Family member updated!" });
        } else {
            const newMember = familyService.addFamilyMember({
                userId: user?.id || "demo-user",
                name: memberData.name || "",
                relationship: memberData.relationship || "other",
                dateOfBirth: memberData.dateOfBirth || "",
                gender: memberData.gender || "prefer_not_to_say",
                bloodGroup: memberData.bloodGroup || "unknown",
                height: memberData.height,
                weight: memberData.weight,
                medicalConditions: [],
                medications: [],
                allergies: [],
                vaccinations: [],
                emergencyContacts: [],
                notificationsEnabled: true,
                medicationReminders: true,
                appointmentReminders: true,
            });
            setSelectedMemberId(newMember.id);
            toast({ title: "Family member added!" });
        }
        refreshMembers();
        setIsAddModalOpen(false);
        setEditingMember(null);
    };

    const handleDeleteMember = (memberId: string) => {
        familyService.deleteFamilyMember(memberId);
        refreshMembers();
        if (selectedMemberId === memberId) {
            setSelectedMemberId(familyMembers[0]?.id || null);
        }
        toast({ title: "Family member removed" });
    };

    // Health data handlers
    const handleAddCondition = (data: { name: string; status: "active" | "managed" | "resolved"; diagnosedDate?: string; notes?: string }) => {
        if (selectedMemberId) {
            familyService.addMedicalCondition(selectedMemberId, data);
            refreshMembers();
            setConditionModal(false);
            toast({ title: "Medical condition added!" });
        }
    };

    const handleAddMedication = (data: { name: string; dosage: string; frequency: string; notes?: string }) => {
        if (selectedMemberId) {
            familyService.addMedication(selectedMemberId, data);
            refreshMembers();
            setMedicationModal(false);
            toast({ title: "Medication added!" });
        }
    };

    const handleAddAllergy = (data: { allergen: string; severity: "mild" | "moderate" | "severe"; reaction?: string }) => {
        if (selectedMemberId) {
            familyService.addAllergy(selectedMemberId, data);
            refreshMembers();
            setAllergyModal(false);
            toast({ title: "Allergy added!" });
        }
    };

    const handleAddVaccination = (data: { name: string; date: string; nextDueDate?: string; notes?: string }) => {
        if (selectedMemberId) {
            familyService.addVaccination(selectedMemberId, data);
            refreshMembers();
            setVaccinationModal(false);
            toast({ title: "Vaccination record added!" });
        }
    };

    const handleAddEmergencyContact = (data: { name: string; relationship: string; phone: string; isDoctor?: boolean }) => {
        if (selectedMemberId) {
            familyService.addEmergencyContact(selectedMemberId, data);
            refreshMembers();
            setEmergencyContactModal(false);
            toast({ title: "Emergency contact added!" });
        }
    };

    if (!user) {
        return (
            <Layout>
                <div className="container py-12 text-center">
                    <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Family Health Profiles</h1>
                    <p className="text-muted-foreground mb-6">
                        Sign in to manage your family's health profiles
                    </p>
                    <Button asChild>
                        <a href="/auth">Sign In to Continue</a>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Users className="w-8 h-8 text-primary" />
                            Family Health Profiles
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage health information for your entire family • परिवार के स्वास्थ्य प्रोफाइल
                        </p>
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Family Member
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Family Members List */}
                    <div className="lg:col-span-1 space-y-3">
                        <h2 className="text-lg font-semibold mb-4">Family Members ({familyMembers.length})</h2>
                        {familyMembers.map(member => (
                            <FamilyMemberCard
                                key={member.id}
                                member={member}
                                isSelected={selectedMemberId === member.id}
                                onClick={() => setSelectedMemberId(member.id)}
                                onEdit={() => {
                                    setEditingMember(member);
                                    setIsAddModalOpen(true);
                                }}
                                onDelete={() => handleDeleteMember(member.id)}
                            />
                        ))}
                    </div>

                    {/* Selected Member Details */}
                    <div className="lg:col-span-2">
                        {selectedMember ? (
                            <div className="space-y-6">
                                {/* Profile Header */}
                                <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-6 border border-primary/20">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-primary-foreground">
                                            {selectedMember.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                                            <p className="text-muted-foreground">
                                                {getRelationshipLabel(selectedMember.relationship)} • {calculateAge(selectedMember.dateOfBirth)} years old
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="bg-background/50 rounded-lg p-3 text-center">
                                            <p className="text-xs text-muted-foreground">Blood Group</p>
                                            <p className="text-lg font-bold text-red-500">{selectedMember.bloodGroup}</p>
                                        </div>
                                        <div className="bg-background/50 rounded-lg p-3 text-center">
                                            <p className="text-xs text-muted-foreground">Height</p>
                                            <p className="text-lg font-bold">{selectedMember.height || "-"} cm</p>
                                        </div>
                                        <div className="bg-background/50 rounded-lg p-3 text-center">
                                            <p className="text-xs text-muted-foreground">Weight</p>
                                            <p className="text-lg font-bold">{selectedMember.weight || "-"} kg</p>
                                        </div>
                                        {selectedMember.height && selectedMember.weight && (
                                            <div className="bg-background/50 rounded-lg p-3 text-center">
                                                <p className="text-xs text-muted-foreground">BMI</p>
                                                <p className={`text-lg font-bold ${calculateBMI(selectedMember.height, selectedMember.weight).color}`}>
                                                    {calculateBMI(selectedMember.height, selectedMember.weight).bmi}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setConditionModal(true)}>
                                        <Stethoscope className="w-5 h-5 text-primary" />
                                        <span className="text-sm">Add Condition</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setMedicationModal(true)}>
                                        <Pill className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm">Add Medication</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setAllergyModal(true)}>
                                        <AlertCircle className="w-5 h-5 text-amber-500" />
                                        <span className="text-sm">Add Allergy</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setVaccinationModal(true)}>
                                        <Syringe className="w-5 h-5 text-green-500" />
                                        <span className="text-sm">Add Vaccine</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setEmergencyContactModal(true)}>
                                        <Phone className="w-5 h-5 text-red-500" />
                                        <span className="text-sm">Emergency Contact</span>
                                    </Button>
                                </div>

                                {/* Allergies Warning */}
                                {selectedMember.allergies.length > 0 && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                        <h3 className="font-semibold text-red-500 flex items-center gap-2 mb-3">
                                            <AlertTriangle className="w-5 h-5" />
                                            Known Allergies
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMember.allergies.map(allergy => (
                                                <span
                                                    key={allergy.id}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${allergy.severity === "severe"
                                                        ? "bg-red-500 text-white"
                                                        : allergy.severity === "moderate"
                                                            ? "bg-amber-500 text-white"
                                                            : "bg-yellow-500/20 text-yellow-600"
                                                        }`}
                                                >
                                                    {allergy.allergen}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Emergency Contacts */}
                                <div className="bg-card border border-border rounded-xl p-4">
                                    <h3 className="font-semibold flex items-center gap-2 mb-4">
                                        <Phone className="w-5 h-5 text-red-500" />
                                        Emergency Contacts
                                    </h3>
                                    {selectedMember.emergencyContacts.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedMember.emergencyContacts.map(contact => (
                                                <EmergencyContactCard key={contact.id} contact={contact} />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-sm">
                                            No emergency contacts added. Add emergency contacts for quick access during emergencies.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <Users className="w-12 h-12 text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">
                                    Select a family member to view details
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                <AddFamilyMemberModal
                    isOpen={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        setEditingMember(null);
                    }}
                    onSave={handleAddMember}
                    editingMember={editingMember}
                />
            </AnimatePresence>

            {/* Health Data Modals */}
            <AddConditionModal
                isOpen={conditionModal}
                onClose={() => setConditionModal(false)}
                onSave={handleAddCondition}
            />
            <AddMedicationModal
                isOpen={medicationModal}
                onClose={() => setMedicationModal(false)}
                onSave={handleAddMedication}
            />
            <AddAllergyModal
                isOpen={allergyModal}
                onClose={() => setAllergyModal(false)}
                onSave={handleAddAllergy}
            />
            <AddVaccinationModal
                isOpen={vaccinationModal}
                onClose={() => setVaccinationModal(false)}
                onSave={handleAddVaccination}
            />
            <AddEmergencyContactModal
                isOpen={emergencyContactModal}
                onClose={() => setEmergencyContactModal(false)}
                onSave={handleAddEmergencyContact}
            />
        </Layout>
    );
}
