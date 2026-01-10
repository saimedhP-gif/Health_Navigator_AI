import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Stethoscope, Pill, AlertCircle, Syringe, Phone } from "lucide-react";

// Base Modal Component
function BaseModal({
    isOpen,
    onClose,
    title,
    icon: Icon,
    iconColor,
    children
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: React.ElementType;
    iconColor: string;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl z-10"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${iconColor}`}>
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold">{title}</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                {children}
            </motion.div>
        </div>
    );
}

// Add Medical Condition Modal
export function AddConditionModal({
    isOpen,
    onClose,
    onSave
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; status: "active" | "managed" | "resolved"; diagnosedDate?: string; notes?: string }) => void;
}) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"active" | "managed" | "resolved">("active");
    const [diagnosedDate, setDiagnosedDate] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, status, diagnosedDate: diagnosedDate || undefined, notes: notes || undefined });
        setName(""); setStatus("active"); setDiagnosedDate(""); setNotes("");
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Add Medical Condition" icon={Stethoscope} iconColor="bg-primary">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Condition Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                        placeholder="e.g., Diabetes, Hypertension"
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value as any)}
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none">
                        <option value="active">Active (वर्तमान)</option>
                        <option value="managed">Managed (नियंत्रित)</option>
                        <option value="resolved">Resolved (ठीक)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Diagnosed Date</label>
                    <input type="date" value={diagnosedDate} onChange={(e) => setDiagnosedDate(e.target.value)}
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                        placeholder="Any additional notes..."
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1">Add Condition</Button>
                </div>
            </form>
        </BaseModal>
    );
}

// Add Medication Modal
export function AddMedicationModal({
    isOpen,
    onClose,
    onSave
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; dosage: string; frequency: string; notes?: string }) => void;
}) {
    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, dosage, frequency, notes: notes || undefined });
        setName(""); setDosage(""); setFrequency(""); setNotes("");
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Add Medication" icon={Pill} iconColor="bg-blue-500">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Medicine Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                        placeholder="e.g., Metformin, Paracetamol"
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Dosage *</label>
                        <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} required
                            placeholder="e.g., 500mg"
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Frequency *</label>
                        <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} required
                            placeholder="e.g., Twice daily"
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                        placeholder="e.g., Take after meals"
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1">Add Medication</Button>
                </div>
            </form>
        </BaseModal>
    );
}

// Add Allergy Modal
export function AddAllergyModal({
    isOpen,
    onClose,
    onSave
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { allergen: string; severity: "mild" | "moderate" | "severe"; reaction?: string }) => void;
}) {
    const [allergen, setAllergen] = useState("");
    const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("moderate");
    const [reaction, setReaction] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ allergen, severity, reaction: reaction || undefined });
        setAllergen(""); setSeverity("moderate"); setReaction("");
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Add Allergy" icon={AlertCircle} iconColor="bg-amber-500">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Allergen *</label>
                    <input type="text" value={allergen} onChange={(e) => setAllergen(e.target.value)} required
                        placeholder="e.g., Penicillin, Peanuts, Dust"
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Severity</label>
                    <select value={severity} onChange={(e) => setSeverity(e.target.value as any)}
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none">
                        <option value="mild">Mild - Minor symptoms</option>
                        <option value="moderate">Moderate - Visible symptoms</option>
                        <option value="severe">Severe - Life threatening</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Reaction</label>
                    <input type="text" value={reaction} onChange={(e) => setReaction(e.target.value)}
                        placeholder="e.g., Rash, Swelling, Breathing difficulty"
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1">Add Allergy</Button>
                </div>
            </form>
        </BaseModal>
    );
}

// Add Vaccination Modal
export function AddVaccinationModal({
    isOpen,
    onClose,
    onSave
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; date: string; nextDueDate?: string; notes?: string }) => void;
}) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [nextDueDate, setNextDueDate] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, date, nextDueDate: nextDueDate || undefined, notes: notes || undefined });
        setName(""); setDate(""); setNextDueDate(""); setNotes("");
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Add Vaccination" icon={Syringe} iconColor="bg-green-500">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Vaccine Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                        placeholder="e.g., COVID-19, Flu Shot, Hepatitis B"
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Date Given *</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Next Due Date</label>
                        <input type="date" value={nextDueDate} onChange={(e) => setNextDueDate(e.target.value)}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                        placeholder="e.g., Booster dose, Side effects experienced"
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1">Add Vaccination</Button>
                </div>
            </form>
        </BaseModal>
    );
}

// Add Emergency Contact Modal
export function AddEmergencyContactModal({
    isOpen,
    onClose,
    onSave
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; relationship: string; phone: string; isDoctor?: boolean }) => void;
}) {
    const [name, setName] = useState("");
    const [relationship, setRelationship] = useState("");
    const [phone, setPhone] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, relationship, phone, isDoctor: isDoctor || undefined });
        setName(""); setRelationship(""); setPhone(""); setIsDoctor(false);
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Add Emergency Contact" icon={Phone} iconColor="bg-red-500">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Contact Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                        placeholder="e.g., Dr. Sharma, Spouse Name"
                        className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Relationship *</label>
                        <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} required
                            placeholder="e.g., Spouse, Doctor"
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone *</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
                            placeholder="e.g., 9876543210"
                            className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="isDoctor" checked={isDoctor} onChange={(e) => setIsDoctor(e.target.checked)}
                        className="w-4 h-4 rounded border-border" />
                    <label htmlFor="isDoctor" className="text-sm">This is a doctor/medical professional</label>
                </div>
                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1">Add Contact</Button>
                </div>
            </form>
        </BaseModal>
    );
}
