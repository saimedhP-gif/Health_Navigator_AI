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
    de: {
        "nav.symptoms": "Symptome prüfen",
        "nav.chat": "Gesundheits-Chat",
        "nav.library": "Gesundheitsbibliothek",
        "nav.about": "Über uns",
        "btn.getStarted": "Loslegen",
        "btn.signIn": "Anmelden",
        "btn.continue": "Weiter",
        "btn.back": "Zurück",
        "disclaimer.title": "Medizinischer Haftungsausschluss",
        "disclaimer.notDiagnosis": "Dies ist keine medizinische Diagnose",
        "disclaimer.consultDoctor": "Bitte konsultieren Sie einen Arzt",
        "emergency.call": "Notdienst anrufen",
        "loading": "Laden...",
        "error": "Ein Fehler ist aufgetreten"
    },
    zh: {
        "nav.symptoms": "检查症状",
        "nav.chat": "健康聊天",
        "nav.library": "健康图书馆",
        "nav.about": "关于我们",
        "btn.getStarted": "开始",
        "btn.signIn": "登录",
        "btn.continue": "继续",
        "btn.back": "返回",
        "disclaimer.title": "医学免责声明",
        "disclaimer.notDiagnosis": "这不是医学诊断",
        "disclaimer.consultDoctor": "请咨询医疗专业人员",
        "emergency.call": "拨打急救电话",
        "loading": "加载中...",
        "error": "发生错误"
    },
    ar: {
        "nav.symptoms": "فحص الأعراض",
        "nav.chat": "دردشة صحية",
        "nav.library": "مكتبة صحية",
        "nav.about": "معلومات عنا",
        "btn.getStarted": "ابدأ",
        "btn.signIn": "تسجيل الدخول",
        "btn.continue": "متابعة",
        "btn.back": "رجوع",
        "disclaimer.title": "إخلاء مسؤولية طبية",
        "disclaimer.notDiagnosis": "هذا ليس تشخيصًا طبيًا",
        "disclaimer.consultDoctor": "يرجى استشارة أخصائي الرعاية الصحية",
        "emergency.call": "اتصل بخدمات الطوارئ",
        "loading": "جاري التحميل...",
        "error": "حدث خطأ"
    },
    pt: {
        "nav.symptoms": "Verificar Sintomas",
        "nav.chat": "Chat de Saúde",
        "nav.library": "Biblioteca de Saúde",
        "nav.about": "Sobre Nós",
        "btn.getStarted": "Começar",
        "btn.signIn": "Entrar",
        "btn.continue": "Continuar",
        "btn.back": "Voltar",
        "disclaimer.title": "Aviso Médico",
        "disclaimer.notDiagnosis": "Isto não é um diagnóstico médico",
        "disclaimer.consultDoctor": "Por favor consulte um profissional de saúde",
        "emergency.call": "Ligar para Emergência",
        "loading": "Carregando...",
        "error": "Ocorreu um erro"
    },
    bn: {
        "nav.symptoms": "লক্ষণ পরীক্ষা করুন",
        "nav.chat": "স্বাস্থ্য চ্যাট",
        "nav.library": "স্বাস্থ্য লাইব্রেরি",
        "nav.about": "আমাদের সম্পর্কে",
        "btn.getStarted": "শুরু করুন",
        "btn.signIn": "সাইন ইন",
        "btn.continue": "চালিয়ে যান",
        "btn.back": "পিছনে",
        "disclaimer.title": "চিকিৎসা দাবিত্যাগ",
        "disclaimer.notDiagnosis": "এটি চিকিৎসা রোগ নির্ণয় নয়",
        "disclaimer.consultDoctor": "অনুগ্রহ করে স্বাস্থ্য পেশাদারের সাথে পরামর্শ করুন",
        "emergency.call": "জরুরি সেবায় কল করুন",
        "loading": "লোড হচ্ছে...",
        "error": "একটি ত্রুটি হয়েছে"
    },
    ta: {
        "nav.symptoms": "அறிகுறிகளை சரிபார்க்கவும்",
        "nav.chat": "சுகாதார அரட்டை",
        "nav.library": "சுகாதார நூலகம்",
        "nav.about": "எங்களை பற்றி",
        "btn.getStarted": "தொடங்கு",
        "btn.signIn": "உள்நுழைக",
        "btn.continue": "தொடரவும்",
        "btn.back": "பின்செல்",
        "disclaimer.title": "மருத்துவ மறுப்பு",
        "disclaimer.notDiagnosis": "இது மருத்துவ கண்டறிதல் அல்ல",
        "disclaimer.consultDoctor": "தயவுசெய்து சுகாதார நிபுணரை அணுகவும்",
        "emergency.call": "அவசர சேவைகளை அழைக்கவும்",
        "loading": "ஏற்றுகிறது...",
        "error": "பிழை ஏற்பட்டது",
        "btn.translate": "மொழிபெயர்க்க"
    },
    te: {
        "nav.symptoms": "లక్షణాలను తనిఖీ చేయండి",
        "nav.chat": "ఆరోగ్య చాట్",
        "nav.library": "ఆరోగ్య లైబ్రరీ",
        "nav.about": "మా గురించి",
        "btn.getStarted": "ప్రారంభించండి",
        "btn.signIn": "సైన్ ఇన్",
        "btn.continue": "కొనసాగించు",
        "btn.back": "వెనుకకు",
        "disclaimer.title": "వైద్య నిరాకరణ",
        "disclaimer.notDiagnosis": "ఇది వైద్య నిర్ధారణ కాదు",
        "disclaimer.consultDoctor": "దయచేసి ఆరోగ్య నిపుణులను సంప్రదించండి",
        "emergency.call": "అత్యవసర సేవలకు కాల్ చేయండి",
        "loading": "లోడ్ అవుతోంది...",
        "error": "లోపం సంభవించింది",
        "btn.translate": "అనువదించు"
    },
    mr: {
        "nav.symptoms": "लक्षणे तपासा",
        "nav.chat": "आरोग्य चॅट",
        "nav.library": "आरोग्य ग्रंथालय",
        "nav.about": "आमच्याबद्दल",
        "btn.getStarted": "सुरू करा",
        "btn.signIn": "साइन इन",
        "btn.continue": "पुढे जा",
        "btn.back": "मागे",
        "disclaimer.title": "वैद्यकीय अस्वीकरण",
        "disclaimer.notDiagnosis": "हे वैद्यकीय निदान नाही",
        "disclaimer.consultDoctor": "कृपया आरोग्य व्यावसायिकांचा सल्ला घ्या",
        "emergency.call": "आपत्कालीन सेवांना कॉल करा",
        "loading": "लोड होत आहे...",
        "error": "त्रुटी आली"
    },
    gu: {
        "nav.symptoms": "લક્ષણો તપાસો",
        "nav.chat": "આરોગ્ય ચેટ",
        "nav.library": "આરોગ્ય પુસ્તકાલય",
        "nav.about": "અમારા વિશે",
        "btn.getStarted": "શરૂ કરો",
        "btn.signIn": "સાઇન ઇન",
        "btn.continue": "ચાલુ રાખો",
        "btn.back": "પાછળ",
        "disclaimer.title": "તબીબી અસ્વીકાર",
        "disclaimer.notDiagnosis": "આ તબીબી નિદાન નથી",
        "disclaimer.consultDoctor": "કૃપા કરીને આરોગ્ય વ્યાવસાયિકનો સંપર્ક કરો",
        "emergency.call": "ઇમરજન્સી સેવાઓને કૉલ કરો",
        "loading": "લોડ થઈ રહ્યું છે...",
        "error": "એક ભૂલ આવી"
    },
    kn: {
        "nav.symptoms": "ರೋಗಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
        "nav.chat": "ಆರೋಗ್ಯ ಚಾಟ್",
        "nav.library": "ಆರೋಗ್ಯ ಗ್ರಂಥಾಲಯ",
        "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
        "btn.getStarted": "ಪ್ರಾರಂಭಿಸಿ",
        "btn.signIn": "ಸೈನ್ ಇನ್",
        "btn.continue": "ಮುಂದುವರಿಸಿ",
        "btn.back": "ಹಿಂದೆ",
        "disclaimer.title": "ವೈದ್ಯಕೀಯ ಹಕ್ಕುತ್ಯಾಗ",
        "disclaimer.notDiagnosis": "ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ",
        "disclaimer.consultDoctor": "ದಯವಿಟ್ಟು ಆರೋಗ್ಯ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ",
        "emergency.call": "ತುರ್ತು ಸೇವೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ",
        "loading": "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        "error": "ದೋಷ ಸಂಭವಿಸಿದೆ",
        "btn.translate": "ಅನುವಾದಿಸು"
    },
    ml: {
        "nav.symptoms": "ലക്ഷണങ്ങൾ പരിശോധിക്കുക",
        "nav.chat": "ആരോഗ്യ ചാറ്റ്",
        "nav.library": "ആരോഗ്യ ലൈബ്രറി",
        "nav.about": "ഞങ്ങളെക്കുറിച്ച്",
        "btn.getStarted": "ആരംഭിക്കുക",
        "btn.signIn": "സൈൻ ഇൻ",
        "btn.continue": "തുടരുക",
        "btn.back": "പിന്നോട്ട്",
        "disclaimer.title": "മെഡിക്കൽ നിരാകരണം",
        "disclaimer.notDiagnosis": "ഇത് വൈദ്യ രോഗനിർണ്ണയമല്ല",
        "disclaimer.consultDoctor": "ദയവായി ആരോഗ്യ വിദഗ്ധനെ സമീപിക്കുക",
        "emergency.call": "എമർജൻസി സേവനങ്ങൾ വിളിക്കുക",
        "loading": "ലോഡ് ചെയ്യുന്നു...",
        "error": "ഒരു പിശക് സംഭവിച്ചു",
        "btn.translate": "വിവർത്തനം"
    },
    pa: {
        "nav.symptoms": "ਲੱਛਣ ਜਾਂਚੋ",
        "nav.chat": "ਸਿਹਤ ਚੈਟ",
        "nav.library": "ਸਿਹਤ ਲਾਇਬ੍ਰੇਰੀ",
        "nav.about": "ਸਾਡੇ ਬਾਰੇ",
        "btn.getStarted": "ਸ਼ੁਰੂ ਕਰੋ",
        "btn.signIn": "ਸਾਈਨ ਇਨ",
        "btn.continue": "ਜਾਰੀ ਰੱਖੋ",
        "btn.back": "ਪਿੱਛੇ",
        "disclaimer.title": "ਮੈਡੀਕਲ ਬੇਦਾਅਵਾ",
        "disclaimer.notDiagnosis": "ਇਹ ਮੈਡੀਕਲ ਤਸ਼ਖੀਸ਼ ਨਹੀਂ ਹੈ",
        "disclaimer.consultDoctor": "ਕਿਰਪਾ ਕਰਕੇ ਸਿਹਤ ਮਾਹਿਰ ਨਾਲ ਸਲਾਹ ਕਰੋ",
        "emergency.call": "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰੋ",
        "loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
        "error": "ਇੱਕ ਗਲਤੀ ਹੋਈ"
    },
    ur: {
        "nav.symptoms": "علامات چیک کریں",
        "nav.chat": "صحت چیٹ",
        "nav.library": "صحت لائبریری",
        "nav.about": "ہمارے بارے میں",
        "btn.getStarted": "شروع کریں",
        "btn.signIn": "سائن ان",
        "btn.continue": "جاری رکھیں",
        "btn.back": "واپس",
        "disclaimer.title": "طبی دستبرداری",
        "disclaimer.notDiagnosis": "یہ طبی تشخیص نہیں ہے",
        "disclaimer.consultDoctor": "براہ کرم صحت کے ماہر سے مشورہ کریں",
        "emergency.call": "ایمرجنسی سروسز کو کال کریں",
        "loading": "لوڈ ہو رہا ہے...",
        "error": "ایک خرابی ہوئی"
    }
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
