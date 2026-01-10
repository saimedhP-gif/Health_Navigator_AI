import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, Globe, Loader2, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { translateText, supportedMedicalLanguages, SupportedLanguageCode } from "@/lib/googleCloudServices";

/**
 * Voice Assistant Component
 * Provides speech-to-text and text-to-speech capabilities
 * with multi-language support using Web Speech API + Google Cloud
 */

// Check browser support
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const speechSynthesis = window.speechSynthesis;

interface VoiceAssistantProps {
    onTranscript: (text: string, language: string) => void;
    onListeningChange?: (isListening: boolean) => void;
    disabled?: boolean;
    language?: SupportedLanguageCode;
    className?: string;
}

interface SpeakOptions {
    text: string;
    language?: SupportedLanguageCode;
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    onError?: (error: string) => void;
}

// Language to voice mapping for TTS
const languageVoiceMap: Record<string, string> = {
    "en": "en-US",
    "hi": "hi-IN",
    "es": "es-ES",
    "fr": "fr-FR",
    "de": "de-DE",
    "zh": "zh-CN",
    "ar": "ar-SA",
    "pt": "pt-BR",
    "bn": "bn-IN",
    "ta": "ta-IN",
    "te": "te-IN",
    "mr": "mr-IN",
    "gu": "gu-IN",
    "kn": "kn-IN",
    "ml": "ml-IN",
    "pa": "pa-IN",
    "ur": "ur-PK"
};

/**
 * Voice Input Button Component
 */
export function VoiceInputButton({
    onTranscript,
    onListeningChange,
    disabled = false,
    language = "en",
    className = ""
}: VoiceAssistantProps) {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [interimTranscript, setInterimTranscript] = useState("");
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (!SpeechRecognition) {
            setIsSupported(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = languageVoiceMap[language] || "en-US";

        recognition.onresult = (event: any) => {
            let interim = "";
            let final = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += transcript;
                } else {
                    interim += transcript;
                }
            }

            setInterimTranscript(interim);

            if (final) {
                onTranscript(final.trim(), language);
                setInterimTranscript("");
            }
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setError(event.error);
            setIsListening(false);
            onListeningChange?.(false);
        };

        recognition.onend = () => {
            if (isListening) {
                // Restart if we want to keep listening
                try {
                    recognition.start();
                } catch (e) {
                    setIsListening(false);
                    onListeningChange?.(false);
                }
            }
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, [language, onTranscript, onListeningChange]);

    // Update language when it changes
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = languageVoiceMap[language] || "en-US";
        }
    }, [language]);

    const toggleListening = useCallback(() => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
            onListeningChange?.(false);
        } else {
            setError(null);
            try {
                recognitionRef.current.start();
                setIsListening(true);
                onListeningChange?.(true);
            } catch (e) {
                console.error("Failed to start recognition:", e);
                setError("Failed to start voice recognition");
            }
        }
    }, [isListening, onListeningChange]);

    if (!isSupported) {
        return (
            <Button
                variant="ghost"
                size="icon"
                disabled
                title="Voice input not supported in this browser"
                className={className}
            >
                <MicOff className="w-5 h-5 text-gray-500" />
            </Button>
        );
    }

    return (
        <div className="relative">
            <Button
                variant={isListening ? "destructive" : "ghost"}
                size="icon"
                onClick={toggleListening}
                disabled={disabled}
                title={isListening ? "Stop listening" : "Start voice input"}
                className={`${className} ${isListening ? "animate-pulse" : ""}`}
            >
                {isListening ? (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <Mic className="w-5 h-5" />
                    </motion.div>
                ) : (
                    <Mic className="w-5 h-5" />
                )}
            </Button>

            {/* Listening indicator */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 
                                   bg-red-500 text-white text-xs rounded-lg whitespace-nowrap"
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            Listening...
                        </div>
                        {interimTranscript && (
                            <div className="mt-1 text-xs opacity-80 max-w-48 truncate">
                                {interimTranscript}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error indicator */}
            {error && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 
                               bg-red-900 text-red-200 text-xs rounded-lg whitespace-nowrap">
                    {error}
                </div>
            )}
        </div>
    );
}

/**
 * Text-to-Speech Hook
 */
export function useTextToSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (!speechSynthesis) {
            setIsSupported(false);
            return;
        }

        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            speechSynthesis.cancel();
        };
    }, []);

    const speak = useCallback(({ text, language = "en", rate = 1, pitch = 1, onEnd, onError }: SpeakOptions) => {
        if (!speechSynthesis || !text) {
            onError?.("Speech synthesis not available");
            return;
        }

        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;

        // Find appropriate voice for language
        const targetLang = languageVoiceMap[language] || "en-US";
        const voice = voices.find(v => v.lang.startsWith(targetLang.split("-")[0])) ||
            voices.find(v => v.lang.startsWith("en"));

        if (voice) {
            utterance.voice = voice;
        }
        utterance.lang = targetLang;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            setIsSpeaking(false);
            onEnd?.();
        };
        utterance.onerror = (event) => {
            setIsSpeaking(false);
            onError?.(event.error);
        };

        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
    }, [voices]);

    const stop = useCallback(() => {
        speechSynthesis?.cancel();
        setIsSpeaking(false);
    }, []);

    const pause = useCallback(() => {
        speechSynthesis?.pause();
    }, []);

    const resume = useCallback(() => {
        speechSynthesis?.resume();
    }, []);

    return {
        speak,
        stop,
        pause,
        resume,
        isSpeaking,
        isSupported,
        voices
    };
}

/**
 * Voice Output Button Component
 */
export function VoiceOutputButton({
    text,
    language = "en",
    className = "",
    size = "icon"
}: {
    text: string;
    language?: SupportedLanguageCode;
    className?: string;
    size?: "icon" | "sm" | "default";
}) {
    const { speak, stop, isSpeaking, isSupported } = useTextToSpeech();

    if (!isSupported) {
        return null;
    }

    const handleClick = () => {
        if (isSpeaking) {
            stop();
        } else {
            speak({ text, language });
        }
    };

    return (
        <Button
            variant="ghost"
            size={size}
            onClick={handleClick}
            title={isSpeaking ? "Stop speaking" : "Read aloud"}
            className={className}
        >
            {isSpeaking ? (
                <VolumeX className="w-4 h-4" />
            ) : (
                <Volume2 className="w-4 h-4" />
            )}
        </Button>
    );
}

/**
 * Language Selector for Voice
 */
export function VoiceLanguageSelector({
    value,
    onChange,
    className = ""
}: {
    value: SupportedLanguageCode;
    onChange: (lang: SupportedLanguageCode) => void;
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    // Show all supported languages for better Indian language coverage
    const languages = Object.entries(supportedMedicalLanguages) as [SupportedLanguageCode, { name: string; nativeName: string }][];

    return (
        <div className={`relative ${className}`}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-xs"
            >
                <Globe className="w-4 h-4" />
                <span>{supportedMedicalLanguages[value]?.nativeName || value}</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="absolute bottom-full left-0 mb-2 bg-slate-800 border border-white/10 
                                       rounded-lg shadow-xl z-50 overflow-hidden min-w-48 max-h-80 overflow-y-auto"
                        >
                            {languages.map(([code, info]) => (
                                <button
                                    key={code}
                                    onClick={() => {
                                        onChange(code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-white/10 
                                               flex items-center justify-between ${value === code ? "bg-blue-500/20 text-blue-400" : "text-gray-300"
                                        }`}
                                >
                                    <span>{info.nativeName}</span>
                                    <span className="text-xs text-gray-500">{info.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Translate and Speak Component
 * Translates text and speaks it in the target language
 */
export function TranslateAndSpeak({
    text,
    targetLanguage,
    className = ""
}: {
    text: string;
    targetLanguage: SupportedLanguageCode;
    className?: string;
}) {
    const [isTranslating, setIsTranslating] = useState(false);
    const [translatedText, setTranslatedText] = useState<string | null>(null);
    const { speak, stop, isSpeaking, isSupported } = useTextToSpeech();

    const handleTranslateAndSpeak = async () => {
        if (isSpeaking) {
            stop();
            return;
        }

        if (targetLanguage === "en") {
            speak({ text, language: "en" });
            return;
        }

        setIsTranslating(true);
        try {
            const response = await translateText({
                text,
                targetLanguage
            });

            if (response.success && response.translations.length > 0) {
                const translated = response.translations[0].translatedText;
                setTranslatedText(translated);
                speak({ text: translated, language: targetLanguage });
            } else {
                // Fallback to English
                speak({ text, language: "en" });
            }
        } catch (error) {
            console.error("Translation error:", error);
            speak({ text, language: "en" });
        } finally {
            setIsTranslating(false);
        }
    };

    if (!isSupported) {
        return null;
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleTranslateAndSpeak}
            disabled={isTranslating}
            title={`Translate and speak in ${supportedMedicalLanguages[targetLanguage]?.name || targetLanguage}`}
            className={className}
        >
            {isTranslating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSpeaking ? (
                <StopCircle className="w-4 h-4 text-red-400" />
            ) : (
                <Volume2 className="w-4 h-4" />
            )}
        </Button>
    );
}

/**
 * Translate Button Component
 * Translates text without speaking - for displaying translated text inline
 */
export function TranslateButton({
    text,
    targetLanguage,
    onTranslated,
    className = ""
}: {
    text: string;
    targetLanguage: SupportedLanguageCode;
    onTranslated?: (translatedText: string) => void;
    className?: string;
}) {
    const [isTranslating, setIsTranslating] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);
    const [translatedText, setTranslatedText] = useState<string | null>(null);

    const handleTranslate = async () => {
        if (showTranslation && translatedText) {
            // Toggle off
            setShowTranslation(false);
            return;
        }

        if (translatedText) {
            // Already translated, just show
            setShowTranslation(true);
            return;
        }

        if (targetLanguage === "en") {
            setTranslatedText(text);
            setShowTranslation(true);
            return;
        }

        setIsTranslating(true);
        try {
            const response = await translateText({
                text,
                targetLanguage
            });

            if (response.success && response.translations.length > 0) {
                const translated = response.translations[0].translatedText;
                setTranslatedText(translated);
                setShowTranslation(true);
                onTranslated?.(translated);
            }
        } catch (error) {
            console.error("Translation error:", error);
        } finally {
            setIsTranslating(false);
        }
    };

    const translateLabel = {
        en: "Translate",
        hi: "अनुवाद करें",
        te: "అనువదించు",
        ta: "மொழிபெயர்",
        kn: "ಅನುವಾದಿಸು",
        ml: "വിവർത്തനം",
        es: "Traducir",
        fr: "Traduire",
        de: "Übersetzen",
        zh: "翻译",
        ar: "ترجمة",
        pt: "Traduzir",
        bn: "অনুবাদ করুন",
        mr: "अनुवाद करा",
        gu: "અનુવાદ કરો",
        pa: "ਅਨੁਵਾਦ ਕਰੋ",
        ur: "ترجمہ کریں"
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={handleTranslate}
                disabled={isTranslating}
                title={`Translate to ${supportedMedicalLanguages[targetLanguage]?.name || targetLanguage}`}
                className={`${className} text-xs flex items-center gap-1`}
            >
                {isTranslating ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                    <Globe className="w-3 h-3" />
                )}
                <span>{translateLabel[targetLanguage] || "Translate"}</span>
            </Button>

            <AnimatePresence>
                {showTranslation && translatedText && (
                    <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm"
                    >
                        <div className="flex items-center gap-2 mb-1 text-blue-400 text-xs">
                            <Globe className="w-3 h-3" />
                            <span>{supportedMedicalLanguages[targetLanguage]?.name}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{translatedText}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default {
    VoiceInputButton,
    VoiceOutputButton,
    VoiceLanguageSelector,
    TranslateAndSpeak,
    TranslateButton,
    useTextToSpeech
};
