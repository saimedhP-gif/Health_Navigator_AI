import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    AlertTriangle,
    Eye,
    Lock,
    Scale,
    FileText,
    CheckCircle,
    Info,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * SafeAIBanner Component
 * Displays Google Safe AI practices and disclaimers
 * Following Google's Responsible AI principles
 */

interface SafeAIPrinciple {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
}

const safeAIPrinciples: SafeAIPrinciple[] = [
    {
        icon: Eye,
        title: "Transparency",
        description: "We clearly communicate what our AI can and cannot do. This is decision support, not a diagnosis.",
        color: "text-blue-400"
    },
    {
        icon: Scale,
        title: "Fairness",
        description: "Our recommendations are designed to be unbiased across all demographics and health conditions.",
        color: "text-purple-400"
    },
    {
        icon: Lock,
        title: "Privacy First",
        description: "Your health data is encrypted, never stored permanently, and never shared with third parties.",
        color: "text-green-400"
    },
    {
        icon: Shield,
        title: "Safety",
        description: "Medical recommendations are conservative. When in doubt, we always advise professional consultation.",
        color: "text-amber-400"
    },
    {
        icon: FileText,
        title: "Accountability",
        description: "All AI decisions are logged for audit. Our clinical rules are reviewed by licensed healthcare professionals.",
        color: "text-cyan-400"
    }
];

export function SafeAIBanner({ onAccept }: { onAccept?: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-blue-900/30 
                       border border-blue-500/30 rounded-xl p-4 mb-6"
        >
            <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            Powered by Google Safe AI Practices
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                                Verified
                            </span>
                        </h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-400 hover:text-blue-300"
                        >
                            {isExpanded ? "Show Less" : "Learn More"}
                        </Button>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                        This AI follows responsible AI principles for healthcare applications.
                    </p>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {safeAIPrinciples.map((principle, index) => (
                                <motion.div
                                    key={principle.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 rounded-lg p-3"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <principle.icon className={`w-5 h-5 ${principle.color}`} />
                                        <span className="font-medium text-white">{principle.title}</span>
                                    </div>
                                    <p className="text-sm text-gray-400">{principle.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {onAccept && (
                            <div className="mt-4 flex justify-center">
                                <Button
                                    onClick={onAccept}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    I Understand - Continue
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/**
 * Medical Disclaimer Modal
 * Required disclaimer for all medical AI interactions
 */
export function MedicalDisclaimer({
    isOpen,
    onClose,
    onAccept
}: {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-2xl w-full 
                           border border-amber-500/30 shadow-2xl"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-amber-500/20 rounded-xl">
                                <AlertTriangle className="w-8 h-8 text-amber-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Important Medical Disclaimer</h2>
                                <p className="text-amber-400 text-sm">Please read carefully before proceeding</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-4 my-6">
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                            <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                This is NOT a Medical Diagnosis
                            </h3>
                            <p className="text-gray-300 text-sm">
                                This AI tool provides general health information for educational purposes only.
                                It cannot and does not provide medical diagnoses, treatment recommendations,
                                or replace professional medical advice.
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 space-y-3">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-400" />
                                By using this tool, you acknowledge:
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>This tool provides information, not medical advice or diagnosis</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>You should always consult a qualified healthcare professional for medical concerns</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>In emergencies, call emergency services (108/112/911) immediately</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>The AI may not have complete or up-to-date medical knowledge</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>Individual health conditions vary; what works for one person may not work for another</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Google Safe AI Compliance
                            </h3>
                            <p className="text-gray-300 text-sm">
                                This tool follows Google's Responsible AI practices including transparency,
                                fairness, privacy protection, and safety-first recommendations. All interactions
                                are logged for quality assurance and safety monitoring.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onAccept}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 
                                       hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            I Understand and Accept
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/**
 * Inline Safety Warning Component
 * For displaying contextual safety warnings
 */
export function SafetyWarning({
    type = "info",
    message,
    actions
}: {
    type?: "info" | "warning" | "error" | "emergency";
    message: string;
    actions?: { label: string; onClick: () => void }[];
}) {
    const styles = {
        info: {
            bg: "bg-blue-500/10 border-blue-500/30",
            icon: Info,
            iconColor: "text-blue-400"
        },
        warning: {
            bg: "bg-amber-500/10 border-amber-500/30",
            icon: AlertTriangle,
            iconColor: "text-amber-400"
        },
        error: {
            bg: "bg-red-500/10 border-red-500/30",
            icon: AlertTriangle,
            iconColor: "text-red-400"
        },
        emergency: {
            bg: "bg-red-600/20 border-red-500/50",
            icon: AlertTriangle,
            iconColor: "text-red-500"
        }
    };

    const style = styles[type];
    const Icon = style.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${style.bg} border rounded-lg p-3 flex items-start gap-3`}
        >
            <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
            <div className="flex-1">
                <p className="text-sm text-gray-200">{message}</p>
                {actions && actions.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={action.onClick}
                                className="text-xs"
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default {
    SafeAIBanner,
    MedicalDisclaimer,
    SafetyWarning
};
