import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    translateText,
    supportedMedicalLanguages,
    SupportedLanguageCode
} from "@/lib/googleCloudServices";

/**
 * Translation Context and Provider
 * Uses Google Cloud Translation API for multi-language support
 */

interface TranslationContextType {
    currentLanguage: SupportedLanguageCode;
    setLanguage: (lang: SupportedLanguageCode) => void;
    translate: (text: string) => Promise<string>;
    translateBatch: (texts: string[]) => Promise<string[]>;
    isLoading: boolean;
    t: (key: string, fallback?: string) => string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

// Common UI translations (cached locally for performance)
const commonTranslations: Record<SupportedLanguageCode, Record<string, string>> = {
    en: {
        "nav.symptoms": "Check Symptoms",
        "nav.chat": "Health Chat",
        "nav.library": "Health Library",
        "nav.about": "About Us",
        "btn.getStarted": "Get Started",
        "btn.signIn": "Sign In",
        "btn.continue": "Continue",
        "btn.back": "Back",
        "disclaimer.title": "Medical Disclaimer",
        "disclaimer.notDiagnosis": "This is not a medical diagnosis",
        "disclaimer.consultDoctor": "Please consult a healthcare professional",
        "emergency.call": "Call Emergency Services",
        "loading": "Loading...",
        "error": "An error occurred"
    },
    hi: {
        "nav.symptoms": "लक्षण जांचें",
        "nav.chat": "स्वास्थ्य चैट",
        "nav.library": "स्वास्थ्य पुस्तकालय",
        "nav.about": "हमारे बारे में",
        "btn.getStarted": "शुरू करें",
        "btn.signIn": "साइन इन",
        "btn.continue": "जारी रखें",
        "btn.back": "वापस",
        "disclaimer.title": "चिकित्सा अस्वीकरण",
        "disclaimer.notDiagnosis": "यह चिकित्सा निदान नहीं है",
        "disclaimer.consultDoctor": "कृपया स्वास्थ्य पेशेवर से परामर्श करें",
        "emergency.call": "आपातकालीन सेवाओं को कॉल करें",
        "loading": "लोड हो रहा है...",
        "error": "एक त्रुटि हुई"
    },
    es: {
        "nav.symptoms": "Verificar Síntomas",
        "nav.chat": "Chat de Salud",
        "nav.library": "Biblioteca de Salud",
        "nav.about": "Sobre Nosotros",
        "btn.getStarted": "Comenzar",
        "btn.signIn": "Iniciar Sesión",
        "btn.continue": "Continuar",
        "btn.back": "Atrás",
        "disclaimer.title": "Aviso Médico",
        "disclaimer.notDiagnosis": "Esto no es un diagnóstico médico",
        "disclaimer.consultDoctor": "Por favor consulte a un profesional de la salud",
        "emergency.call": "Llame a Servicios de Emergencia",
        "loading": "Cargando...",
        "error": "Ocurrió un error"
    },
    fr: {
        "nav.symptoms": "Vérifier les Symptômes",
        "nav.chat": "Chat Santé",
        "nav.library": "Bibliothèque Santé",
        "nav.about": "À Propos",
        "btn.getStarted": "Commencer",
        "btn.signIn": "Se Connecter",
        "btn.continue": "Continuer",
        "btn.back": "Retour",
        "disclaimer.title": "Avis Médical",
        "disclaimer.notDiagnosis": "Ceci n'est pas un diagnostic médical",
        "disclaimer.consultDoctor": "Veuillez consulter un professionnel de santé",
        "emergency.call": "Appeler les Services d'Urgence",
        "loading": "Chargement...",
        "error": "Une erreur s'est produite"
    },
    de: {},
    zh: {},
    ar: {},
    pt: {},
    bn: {},
    ta: {},
    te: {},
    mr: {},
    gu: {},
    kn: {},
    ml: {},
    pa: {},
    ur: {}
};

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguageCode>(() => {
        // Get from localStorage or browser preference
        const saved = localStorage.getItem('preferredLanguage') as SupportedLanguageCode;
        if (saved && saved in supportedMedicalLanguages) return saved;

        const browserLang = navigator.language.split('-')[0] as SupportedLanguageCode;
        if (browserLang in supportedMedicalLanguages) return browserLang;

        return 'en';
    });
    const [isLoading, setIsLoading] = useState(false);
    const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});

    useEffect(() => {
        localStorage.setItem('preferredLanguage', currentLanguage);
        document.documentElement.dir = supportedMedicalLanguages[currentLanguage].rtl ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);

    const setLanguage = (lang: SupportedLanguageCode) => {
        setCurrentLanguage(lang);
        setDynamicTranslations({}); // Clear dynamic cache on language change
    };

    const translate = async (text: string): Promise<string> => {
        if (currentLanguage === 'en') return text;

        // Check cache first
        const cacheKey = `${currentLanguage}:${text}`;
        if (dynamicTranslations[cacheKey]) {
            return dynamicTranslations[cacheKey];
        }

        setIsLoading(true);
        try {
            const response = await translateText({
                text,
                targetLanguage: currentLanguage
            });

            if (response.success && response.translations.length > 0) {
                const translated = response.translations[0].translatedText;
                setDynamicTranslations(prev => ({ ...prev, [cacheKey]: translated }));
                return translated;
            }
            return text;
        } catch {
            return text;
        } finally {
            setIsLoading(false);
        }
    };

    const translateBatch = async (texts: string[]): Promise<string[]> => {
        if (currentLanguage === 'en') return texts;

        setIsLoading(true);
        try {
            const response = await translateText({
                text: texts,
                targetLanguage: currentLanguage
            });

            if (response.success) {
                return response.translations.map(t => t.translatedText);
            }
            return texts;
        } catch {
            return texts;
        } finally {
            setIsLoading(false);
        }
    };

    // Get static translation by key
    const t = (key: string, fallback?: string): string => {
        const langTranslations = commonTranslations[currentLanguage];
        if (langTranslations && langTranslations[key]) {
            return langTranslations[key];
        }
        // Fallback to English
        return commonTranslations.en[key] || fallback || key;
    };

    return (
        <TranslationContext.Provider value={{
            currentLanguage,
            setLanguage,
            translate,
            translateBatch,
            isLoading,
            t
        }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within TranslationProvider');
    }
    return context;
}

/**
 * Language Selector Dropdown Component
 */
export function LanguageSelector({ variant = "default" }: { variant?: "default" | "compact" }) {
    const { currentLanguage, setLanguage } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLangInfo = supportedMedicalLanguages[currentLanguage];
    const languages = Object.entries(supportedMedicalLanguages) as [SupportedLanguageCode, typeof currentLangInfo][];

    return (
        <div className="relative">
            <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 ${variant === "compact" ? "px-2" : "px-3"
                    } hover:bg-white/10`}
            >
                <Globe className="w-4 h-4 text-blue-400" />
                {variant === "default" && (
                    <span className="text-sm text-gray-300">{currentLangInfo.nativeName}</span>
                )}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-white/10 
                                       rounded-xl shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="p-2 border-b border-white/10">
                                <p className="text-xs text-gray-400 px-2">
                                    Powered by Google Cloud Translation
                                </p>
                            </div>
                            <div className="max-h-80 overflow-y-auto p-2">
                                {languages.map(([code, info]) => (
                                    <button
                                        key={code}
                                        onClick={() => {
                                            setLanguage(code);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg
                                                   transition-colors ${currentLanguage === code
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : 'hover:bg-white/5 text-gray-300'
                                            }`}
                                    >
                                        <div className="flex flex-col items-start">
                                            <span className="font-medium">{info.nativeName}</span>
                                            <span className="text-xs text-gray-500">{info.name}</span>
                                        </div>
                                        {currentLanguage === code && (
                                            <Check className="w-4 h-4 text-blue-400" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Translated Text Component
 * Automatically translates content
 */
export function TranslatedText({
    children,
    as: Component = "span",
    className = ""
}: {
    children: string;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
}) {
    const { currentLanguage, translate, isLoading } = useTranslation();
    const [translatedText, setTranslatedText] = useState(children);

    useEffect(() => {
        if (currentLanguage === 'en') {
            setTranslatedText(children);
            return;
        }

        translate(children).then(setTranslatedText);
    }, [children, currentLanguage, translate]);

    return (
        <Component className={`${className} ${isLoading ? 'opacity-70' : ''}`}>
            {translatedText}
        </Component>
    );
}

export default {
    TranslationProvider,
    useTranslation,
    LanguageSelector,
    TranslatedText
};
