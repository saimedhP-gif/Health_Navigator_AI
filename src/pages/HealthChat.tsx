import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Send,
  Bot,
  User,
  AlertCircle,
  Heart,
  Loader2,
  Save,
  Volume2,
  VolumeX,
  Globe,
  Settings,
  Mic
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  VoiceInputButton,
  VoiceOutputButton,
  VoiceLanguageSelector,
  TranslateAndSpeak,
  useTextToSpeech
} from "@/components/voice/VoiceAssistant";
import {
  translateText,
  supportedMedicalLanguages,
  SupportedLanguageCode
} from "@/lib/googleCloudServices";
import { SafeAIBanner } from "@/components/safety/SafeAIComponents";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  originalContent?: string; // For translated messages
  language?: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/health-chat`;

export default function HealthChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Health Navigator AI assistant. 👋\n\nI'm here to help you understand health information and guide you toward appropriate care. I can answer questions about symptoms, explain health concepts, and discuss when you might need to see a doctor.\n\n**Important:** I cannot diagnose conditions, prescribe medications, or provide dosage information. For medical advice, always consult a healthcare professional.\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguageCode>("en");
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Translate welcome message when language changes
  useEffect(() => {
    const translateWelcome = async () => {
      if (selectedLanguage === "en" || messages.length > 1) return;

      setIsTranslating(true);
      const welcomeMsg = messages[0];

      try {
        const response = await translateText({
          text: welcomeMsg.content,
          targetLanguage: selectedLanguage
        });

        if (response.success && response.translations.length > 0) {
          setMessages([{
            ...welcomeMsg,
            content: response.translations[0].translatedText,
            originalContent: welcomeMsg.content,
            language: selectedLanguage
          }]);
        }
      } catch (error) {
        console.error("Translation error:", error);
      } finally {
        setIsTranslating(false);
      }
    };

    translateWelcome();
  }, [selectedLanguage]);

  // Handle voice transcript
  const handleVoiceTranscript = (transcript: string, language: string) => {
    setInput(prev => prev + (prev ? " " : "") + transcript);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    // Translate user input to English if needed for AI processing
    let messageToSend = input.trim();
    let originalInput = input.trim();

    if (selectedLanguage !== "en") {
      setIsTranslating(true);
      try {
        const response = await translateText({
          text: input.trim(),
          targetLanguage: "en",
          sourceLanguage: selectedLanguage
        });
        if (response.success && response.translations.length > 0) {
          messageToSend = response.translations[0].translatedText;
        }
      } catch (error) {
        console.error("Translation error:", error);
      }
      setIsTranslating(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: originalInput,
      originalContent: messageToSend !== originalInput ? messageToSend : undefined,
      language: selectedLanguage
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.originalContent || m.content, // Send English content to AI
          })),
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Rate limit reached",
            description: "Please wait a moment before sending another message.",
            variant: "destructive",
          });
          setIsTyping(false);
          return;
        }
        throw new Error("Failed to get response");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let textBuffer = "";

      // Create assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        language: "en"
      };
      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        // Process line-by-line
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessage.id
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {
            // Incomplete JSON, put back and wait for more data
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
            }
          } catch {
            /* ignore */
          }
        }
      }

      // Translate response if needed
      if (selectedLanguage !== "en" && assistantContent) {
        setIsTranslating(true);
        try {
          const translationResponse = await translateText({
            text: assistantContent,
            targetLanguage: selectedLanguage
          });

          if (translationResponse.success && translationResponse.translations.length > 0) {
            const translatedContent = translationResponse.translations[0].translatedText;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessage.id
                  ? {
                    ...m,
                    content: translatedContent,
                    originalContent: assistantContent,
                    language: selectedLanguage
                  }
                  : m
              )
            );
            assistantContent = translatedContent;
          }
        } catch (error) {
          console.error("Translation error:", error);
        }
        setIsTranslating(false);
      }

      // Auto-speak response if enabled
      if (autoSpeak && assistantContent) {
        speak({ text: assistantContent, language: selectedLanguage });
      }

    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);

      // Save chat session if user is logged in
      if (user && messages.length > 1) {
        const chatMessages = messages.map(m => ({ role: m.role, content: m.content }));
        const title = messages[1]?.content.slice(0, 50) + "..." || "Health Conversation";

        if (currentSessionId) {
          await supabase
            .from("chat_sessions")
            .update({ messages: chatMessages, title })
            .eq("id", currentSessionId);
        } else {
          const { data } = await supabase
            .from("chat_sessions")
            .insert({
              user_id: user.id,
              messages: chatMessages,
              title,
            })
            .select("id")
            .single();
          if (data) setCurrentSessionId(data.id);
        }
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions: Record<SupportedLanguageCode, string[]> = {
    en: [
      "What causes headaches?",
      "When should I see a doctor for a fever?",
      "Why is antibiotic resistance a problem?",
      "What are signs of a medical emergency?",
    ],
    hi: [
      "सिरदर्द का कारण क्या है?",
      "बुखार के लिए डॉक्टर को कब दिखाना चाहिए?",
      "एंटीबायोटिक प्रतिरोध क्यों एक समस्या है?",
      "मेडिकल इमरजेंसी के लक्षण क्या हैं?",
    ],
    es: [
      "¿Qué causa los dolores de cabeza?",
      "¿Cuándo debo ver a un médico por fiebre?",
      "¿Por qué la resistencia a antibióticos es un problema?",
      "¿Cuáles son los signos de emergencia médica?",
    ],
    fr: [
      "Qu'est-ce qui cause les maux de tête?",
      "Quand consulter un médecin pour la fièvre?",
      "Pourquoi la résistance aux antibiotiques est-elle un problème?",
      "Quels sont les signes d'urgence médicale?",
    ],
    de: [],
    zh: [],
    ar: [],
    pt: [],
    bn: [],
    ta: [],
    te: [],
    mr: [],
    gu: [],
    kn: [],
    ml: [],
    pa: [],
    ur: []
  };

  const currentQuestions = suggestedQuestions[selectedLanguage] || suggestedQuestions.en;

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px]">
        <div className="container max-w-3xl flex flex-col h-full py-4">
          {/* Header with Language & Voice Settings */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <VoiceLanguageSelector
                value={selectedLanguage}
                onChange={setSelectedLanguage}
              />
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                Health Chat Assistant
                {isSpeaking && (
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Volume2 className="w-5 h-5 text-blue-400" />
                  </motion.div>
                )}
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAutoSpeak(!autoSpeak)}
                  className={`text-xs ${autoSpeak ? 'text-blue-400' : 'text-gray-400'}`}
                  title={autoSpeak ? "Auto-speak enabled" : "Enable auto-speak"}
                >
                  {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="ml-1 hidden sm:inline">Auto</span>
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedLanguage === "hi" ? "स्वास्थ्य प्रश्न पूछें • मार्गदर्शन प्राप्त करें • जानकारी रखें" :
                selectedLanguage === "es" ? "Haga preguntas de salud • Obtenga orientación • Manténgase informado" :
                  "Ask health questions • Get guidance • Stay informed"}
            </p>
          </div>

          {/* Safe AI Banner */}
          <SafeAIBanner />

          {/* Disclaimer */}
          <div className="p-3 rounded-xl bg-health-amber-light border border-health-amber/30 mb-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-health-amber flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                {selectedLanguage === "hi"
                  ? "केवल सूचनात्मक उद्देश्यों के लिए। निदान या प्रिस्क्रिप्शन नहीं दे सकता। हमेशा स्वास्थ्य पेशेवर से परामर्श करें।"
                  : selectedLanguage === "es"
                    ? "Solo para fines informativos. No puede diagnosticar ni recetar. Siempre consulte a un profesional de la salud."
                    : "For informational purposes only. Cannot diagnose or prescribe. Always consult a healthcare professional."}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {isTranslating && (
              <div className="flex items-center justify-center gap-2 text-sm text-blue-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Translating...</span>
              </div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-health-teal-light text-primary"
                    }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Heart className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-4 rounded-2xl relative group ${message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card border border-border rounded-bl-md"
                    }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Voice output button for assistant messages */}
                  {message.role === "assistant" && message.content && (
                    <div className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TranslateAndSpeak
                        text={message.originalContent || message.content}
                        targetLanguage={selectedLanguage}
                        className="bg-slate-700 hover:bg-slate-600 rounded-full p-1.5"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && messages[messages.length - 1]?.role === "user" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-health-teal-light flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-card border border-border p-4 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="flex-shrink-0 mb-4">
              <p className="text-xs text-muted-foreground mb-2">
                {selectedLanguage === "hi" ? "ये पूछने का प्रयास करें:" :
                  selectedLanguage === "es" ? "Intente preguntar:" :
                    "Try asking:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => setInput(question)}
                    className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input with Voice */}
          <div className="flex-shrink-0 flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  selectedLanguage === "hi" ? "स्वास्थ्य प्रश्न पूछें..." :
                    selectedLanguage === "es" ? "Haga una pregunta de salud..." :
                      "Ask a health question..."
                }
                rows={1}
                disabled={isTyping}
                className="w-full p-4 pr-24 rounded-2xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none text-sm disabled:opacity-50"
              />
              {/* Voice input button inside textarea */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <VoiceInputButton
                  onTranscript={handleVoiceTranscript}
                  language={selectedLanguage}
                  disabled={isTyping}
                  className="p-2 hover:bg-slate-700/50 rounded-lg"
                />
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping || isTranslating}
              size="icon"
              className="h-14 w-14 rounded-2xl flex-shrink-0"
            >
              {isTyping || isTranslating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Voice & Language indicator */}
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Mic className="w-3 h-3" />
              {selectedLanguage === "hi" ? "वॉइस इनपुट समर्थित" :
                selectedLanguage === "es" ? "Entrada de voz compatible" :
                  "Voice input supported"}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {supportedMedicalLanguages[selectedLanguage]?.name}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
