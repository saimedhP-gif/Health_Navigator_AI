import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings,
    Type,
    Eye,
    Volume2,
    Hand,
    Sun,
    Moon,
    Zap,
    Accessibility,
    Check,
    RotateCcw,
    ChevronDown,
    ChevronRight,
    Users,
    Ear
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

/**
 * Accessibility Settings Panel
 * Comprehensive accessibility controls for the Health Navigator app
 */

interface SettingToggleProps {
    label: string;
    labelHi?: string;
    labelTe?: string;
    labelTa?: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon?: React.ReactNode;
}

function SettingToggle({
    label,
    description,
    checked,
    onChange,
    icon
}: SettingToggleProps) {
    const id = label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
            <div className="flex items-start gap-3 flex-1">
                {icon && (
                    <div className="mt-0.5 text-blue-400">
                        {icon}
                    </div>
                )}
                <div className="flex-1">
                    <label
                        htmlFor={id}
                        className="font-medium cursor-pointer text-gray-200"
                    >
                        {label}
                    </label>
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>
            </div>
            <button
                id={id}
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${checked ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'
                        }`}
                />
                <span className="sr-only">{checked ? 'Enabled' : 'Disabled'}</span>
            </button>
        </div>
    );
}

export function AccessibilitySettingsPanel() {
    const { settings, updateSetting, resetSettings, applyElderlyPreset, applyVisuallyImpairedPreset } = useAccessibility();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>("display");

    const sections = [
        {
            id: "display",
            title: "Display & Text",
            titleHi: "डिस्प्ले और टेक्स्ट",
            titleTe: "ప్రదర్శన & టెక్స్ట్",
            titleTa: "காட்சி & உரை",
            icon: <Type className="w-4 h-4" />,
        },
        {
            id: "voice",
            title: "Voice & Audio",
            titleHi: "वॉइस और ऑडियो",
            titleTe: "వాయిస్ & ఆడియో",
            titleTa: "குரல் & ஆடியோ",
            icon: <Volume2 className="w-4 h-4" />,
        },
        {
            id: "navigation",
            title: "Navigation",
            titleHi: "नेविगेशन",
            titleTe: "నావిగేషన్",
            titleTa: "வழிசெலுத்தல்",
            icon: <Hand className="w-4 h-4" />,
        },
    ];

    return (
        <div className="relative">
            {/* Accessibility Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
                aria-label="Accessibility Settings"
                aria-expanded={isOpen}
            >
                <Accessibility className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Accessibility</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40 bg-black/50"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Settings Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="fixed sm:absolute right-4 sm:right-0 top-16 sm:top-full sm:mt-2 w-[calc(100%-2rem)] sm:w-96 
                                       bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 
                                       max-h-[80vh] overflow-hidden"
                            role="dialog"
                            aria-label="Accessibility Settings"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 bg-slate-900/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Accessibility className="w-5 h-5 text-blue-400" />
                                        <h2 className="text-lg font-semibold text-white">
                                            Accessibility
                                        </h2>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetSettings}
                                        className="text-xs text-gray-400 hover:text-white"
                                    >
                                        <RotateCcw className="w-3 h-3 mr-1" />
                                        Reset
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    Customize your experience for better accessibility
                                </p>
                            </div>

                            {/* Quick Presets */}
                            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                                <p className="text-xs font-medium text-gray-300 mb-3">Quick Presets</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={applyElderlyPreset}
                                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 
                                                   border border-white/10 transition-colors text-center"
                                        aria-label="Apply elderly-friendly preset"
                                    >
                                        <Users className="w-5 h-5 text-amber-400" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Elderly Mode</p>
                                            <p className="text-xs text-gray-400">बुजुर्ग मोड</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={applyVisuallyImpairedPreset}
                                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 
                                                   border border-white/10 transition-colors text-center"
                                        aria-label="Apply visually impaired preset"
                                    >
                                        <Eye className="w-5 h-5 text-green-400" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Low Vision</p>
                                            <p className="text-xs text-gray-400">कम दृष्टि</p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Settings Sections */}
                            <div className="max-h-[50vh] overflow-y-auto">
                                {sections.map(section => (
                                    <div key={section.id} className="border-b border-white/5 last:border-0">
                                        <button
                                            onClick={() => setActiveSection(
                                                activeSection === section.id ? null : section.id
                                            )}
                                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                                            aria-expanded={activeSection === section.id}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-blue-400">{section.icon}</span>
                                                <span className="font-medium text-gray-200">{section.title}</span>
                                            </div>
                                            {activeSection === section.id ? (
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {activeSection === section.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-4">
                                                        {section.id === "display" && (
                                                            <>
                                                                <SettingToggle
                                                                    label="Large Text"
                                                                    description="Increase text size for better readability (बड़ा टेक्स्ट)"
                                                                    checked={settings.largeText}
                                                                    onChange={(v) => updateSetting('largeText', v)}
                                                                    icon={<Type className="w-4 h-4" />}
                                                                />
                                                                <SettingToggle
                                                                    label="Extra Large Text"
                                                                    description="Maximum text size for low vision (अतिरिक्त बड़ा)"
                                                                    checked={settings.extraLargeText}
                                                                    onChange={(v) => updateSetting('extraLargeText', v)}
                                                                    icon={<Type className="w-5 h-5" />}
                                                                />
                                                                <SettingToggle
                                                                    label="High Contrast"
                                                                    description="Increase color contrast (उच्च कंट्रास्ट)"
                                                                    checked={settings.highContrast}
                                                                    onChange={(v) => updateSetting('highContrast', v)}
                                                                    icon={<Sun className="w-4 h-4" />}
                                                                />
                                                                <SettingToggle
                                                                    label="Reduce Motion"
                                                                    description="Minimize animations (कम एनिमेशन)"
                                                                    checked={settings.reducedMotion}
                                                                    onChange={(v) => updateSetting('reducedMotion', v)}
                                                                    icon={<Zap className="w-4 h-4" />}
                                                                />
                                                            </>
                                                        )}
                                                        {section.id === "voice" && (
                                                            <>
                                                                <SettingToggle
                                                                    label="Voice-First Mode"
                                                                    description="Prioritize voice interaction for hands-free use (वॉइस प्राथमिकता)"
                                                                    checked={settings.voiceFirstMode}
                                                                    onChange={(v) => updateSetting('voiceFirstMode', v)}
                                                                    icon={<Volume2 className="w-4 h-4" />}
                                                                />
                                                                <SettingToggle
                                                                    label="Auto-Read Responses"
                                                                    description="Automatically read AI responses aloud (स्वचालित पठन)"
                                                                    checked={settings.autoReadResponses}
                                                                    onChange={(v) => updateSetting('autoReadResponses', v)}
                                                                    icon={<Ear className="w-4 h-4" />}
                                                                />
                                                                <SettingToggle
                                                                    label="Slow Speech Rate"
                                                                    description="Slower voice for elderly users (धीमी आवाज)"
                                                                    checked={settings.slowSpeechRate}
                                                                    onChange={(v) => updateSetting('slowSpeechRate', v)}
                                                                    icon={<Volume2 className="w-4 h-4" />}
                                                                />
                                                            </>
                                                        )}
                                                        {section.id === "navigation" && (
                                                            <>
                                                                <SettingToggle
                                                                    label="Enhanced Focus Indicators"
                                                                    description="Visible focus outlines for keyboard navigation"
                                                                    checked={settings.focusIndicators}
                                                                    onChange={(v) => updateSetting('focusIndicators', v)}
                                                                    icon={<Hand className="w-4 h-4" />}
                                                                />
                                                                <SettingToggle
                                                                    label="Screen Reader Optimized"
                                                                    description="Extra labels and announcements for screen readers"
                                                                    checked={settings.screenReaderOptimized}
                                                                    onChange={(v) => updateSetting('screenReaderOptimized', v)}
                                                                    icon={<Eye className="w-4 h-4" />}
                                                                />
                                                                <SettingToggle
                                                                    label="Announce Changes"
                                                                    description="Announce dynamic content updates"
                                                                    checked={settings.announceChanges}
                                                                    onChange={(v) => updateSetting('announceChanges', v)}
                                                                    icon={<Volume2 className="w-4 h-4" />}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-white/10 bg-slate-900/50">
                                <p className="text-xs text-gray-400 text-center">
                                    Settings are saved automatically • सेटिंग्स स्वचालित रूप से सहेजे जाते हैं
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Compact Accessibility Quick Toggle
 * For use in headers and toolbars
 */
export function AccessibilityQuickToggle() {
    const { settings, updateSetting } = useAccessibility();

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => updateSetting('largeText', !settings.largeText)}
                className={`w-8 h-8 ${settings.largeText ? 'text-blue-400' : 'text-gray-400'}`}
                aria-label={settings.largeText ? "Disable large text" : "Enable large text"}
                title="Toggle large text"
            >
                <Type className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                className={`w-8 h-8 ${settings.highContrast ? 'text-yellow-400' : 'text-gray-400'}`}
                aria-label={settings.highContrast ? "Disable high contrast" : "Enable high contrast"}
                title="Toggle high contrast"
            >
                <Sun className="w-4 h-4" />
            </Button>
        </div>
    );
}

export default {
    AccessibilitySettingsPanel,
    AccessibilityQuickToggle,
};
