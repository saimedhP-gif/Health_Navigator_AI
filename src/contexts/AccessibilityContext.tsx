import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Accessibility Context
 * Provides accessibility settings for users including:
 * - Large text mode for elderly users
 * - High contrast mode for better visibility
 * - Screen reader optimizations
 * - Reduced motion for users with vestibular disorders
 * - Voice-first mode for hands-free interaction
 */

export interface AccessibilitySettings {
    // Text & Display
    largeText: boolean;
    extraLargeText: boolean;
    highContrast: boolean;
    reducedMotion: boolean;

    // Voice & Audio
    voiceFirstMode: boolean;
    autoReadResponses: boolean;
    slowSpeechRate: boolean;

    // Navigation
    keyboardNavigation: boolean;
    focusIndicators: boolean;

    // Screen Reader
    screenReaderOptimized: boolean;
    announceChanges: boolean;
}

const defaultSettings: AccessibilitySettings = {
    largeText: false,
    extraLargeText: false,
    highContrast: false,
    reducedMotion: false,
    voiceFirstMode: false,
    autoReadResponses: false,
    slowSpeechRate: false,
    keyboardNavigation: true,
    focusIndicators: true,
    screenReaderOptimized: false,
    announceChanges: true,
};

interface AccessibilityContextType {
    settings: AccessibilitySettings;
    updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
    resetSettings: () => void;
    applyElderlyPreset: () => void;
    applyVisuallyImpairedPreset: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<AccessibilitySettings>(() => {
        // Load from localStorage
        const saved = localStorage.getItem('accessibilitySettings');
        if (saved) {
            try {
                return { ...defaultSettings, ...JSON.parse(saved) };
            } catch {
                return defaultSettings;
            }
        }

        // Check system preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

        return {
            ...defaultSettings,
            reducedMotion: prefersReducedMotion,
            highContrast: prefersHighContrast,
        };
    });

    // Apply settings to document
    useEffect(() => {
        const root = document.documentElement;

        // Text size
        root.classList.toggle('text-lg-mode', settings.largeText);
        root.classList.toggle('text-xl-mode', settings.extraLargeText);

        // High contrast
        root.classList.toggle('high-contrast', settings.highContrast);

        // Reduced motion
        root.classList.toggle('reduce-motion', settings.reducedMotion);

        // Focus indicators
        root.classList.toggle('enhanced-focus', settings.focusIndicators);

        // Screen reader optimized
        root.classList.toggle('sr-optimized', settings.screenReaderOptimized);

        // Save to localStorage
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = <K extends keyof AccessibilitySettings>(
        key: K,
        value: AccessibilitySettings[K]
    ) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        localStorage.removeItem('accessibilitySettings');
    };

    // Preset for elderly users
    const applyElderlyPreset = () => {
        setSettings({
            ...defaultSettings,
            largeText: true,
            voiceFirstMode: true,
            autoReadResponses: true,
            slowSpeechRate: true,
            focusIndicators: true,
            announceChanges: true,
            reducedMotion: true,
        });
    };

    // Preset for visually impaired users
    const applyVisuallyImpairedPreset = () => {
        setSettings({
            ...defaultSettings,
            extraLargeText: true,
            highContrast: true,
            screenReaderOptimized: true,
            focusIndicators: true,
            announceChanges: true,
            autoReadResponses: true,
        });
    };

    return (
        <AccessibilityContext.Provider value={{
            settings,
            updateSetting,
            resetSettings,
            applyElderlyPreset,
            applyVisuallyImpairedPreset,
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within AccessibilityProvider');
    }
    return context;
}

/**
 * Screen Reader Announcement Component
 * Announces dynamic content changes to screen readers
 */
export function ScreenReaderAnnouncement({
    message,
    priority = "polite"
}: {
    message: string;
    priority?: "polite" | "assertive";
}) {
    return (
        <div
            role="status"
            aria-live={priority}
            aria-atomic="true"
            className="sr-only"
        >
            {message}
        </div>
    );
}

export default {
    AccessibilityProvider,
    useAccessibility,
    ScreenReaderAnnouncement,
};
