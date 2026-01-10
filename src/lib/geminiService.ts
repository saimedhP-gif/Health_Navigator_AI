/**
 * AI Service - Gemini & Vertex AI Integration
 * Client-side wrapper for Google AI services
 * 
 * Supports:
 * - Google Gemini API (standard)
 * - Google Cloud Vertex AI (enterprise)
 * - Automatic fallback between services
 */

import { supabase } from "@/integrations/supabase/client";

export type AIProvider = "gemini" | "vertex-ai" | "auto";
export type AIModel = "gemini-pro" | "gemini-pro-vision" | "gemini-1.5-pro";

export interface AIMessage {
    role: "user" | "assistant";
    content: string;
}

export interface AIRequestOptions {
    prompt: string;
    provider?: AIProvider;
    model?: AIModel;
    context?: string;
    language?: string;
    temperature?: number;
    maxTokens?: number;
    // Family context
    familyMemberAge?: number;
    familyMemberRelationship?: string;
    // Conversation history
    conversationHistory?: AIMessage[];
}

export interface AIResponse {
    response: string;
    provider: string;
    model: string;
    safetyWarnings?: string[];
    recommendedActions?: string[];
    isEmergency?: boolean;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    error?: string;
}

/**
 * Send a prompt to AI (auto-selects best provider)
 */
export async function askAI(options: AIRequestOptions): Promise<AIResponse> {
    const provider = options.provider || "auto";

    // Try Vertex AI first if auto or explicitly selected
    if (provider === "vertex-ai" || provider === "auto") {
        try {
            const result = await callVertexAI(options);
            if (!result.error) {
                return result;
            }
        } catch (err) {
            console.warn("Vertex AI unavailable, falling back to Gemini:", err);
        }
    }

    // Fallback to Gemini API
    return callGeminiAPI(options);
}

/**
 * Call Vertex AI Edge Function
 */
async function callVertexAI(options: AIRequestOptions): Promise<AIResponse> {
    try {
        const { data, error } = await supabase.functions.invoke('vertex-ai', {
            body: {
                prompt: options.prompt,
                systemContext: options.context,
                language: options.language || "en",
                temperature: options.temperature || 0.7,
                maxTokens: options.maxTokens || 1024,
                familyMemberAge: options.familyMemberAge,
                familyMemberRelationship: options.familyMemberRelationship,
                conversationHistory: options.conversationHistory,
                model: options.model || "gemini-pro"
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            response: data.response,
            provider: "vertex-ai",
            model: data.model || "gemini-pro",
            isEmergency: data.isEmergency,
            usage: data.usage,
            safetyWarnings: data.isEmergency ? [
                "Emergency situation detected",
                "Please seek immediate medical attention"
            ] : undefined
        };
    } catch (err) {
        console.error('Vertex AI error:', err);
        return {
            response: "",
            provider: "vertex-ai",
            model: "error",
            error: err instanceof Error ? err.message : "Unknown error"
        };
    }
}

/**
 * Call Gemini API Edge Function
 */
async function callGeminiAPI(options: AIRequestOptions): Promise<AIResponse> {
    try {
        const { data, error } = await supabase.functions.invoke('gemini-ai', {
            body: {
                prompt: options.prompt,
                context: options.context,
                language: options.language || "en",
                familyMemberAge: options.familyMemberAge,
                familyMemberRelationship: options.familyMemberRelationship,
                conversationHistory: options.conversationHistory,
                maxTokens: options.maxTokens || 1024
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            response: data.response,
            provider: "gemini",
            model: "gemini-pro",
            isEmergency: data.shouldSeekEmergencyCare,
            safetyWarnings: data.safetyWarnings,
            recommendedActions: data.recommendedActions
        };
    } catch (err) {
        console.error('Gemini API error:', err);
        return {
            response: "I apologize, but I'm unable to process your request right now. Please try again later.",
            provider: "gemini",
            model: "error",
            error: err instanceof Error ? err.message : "Unknown error",
            safetyWarnings: ["Service temporarily unavailable"]
        };
    }
}

/**
 * Get health advice for a family member
 */
export async function getFamilyHealthAdvice(
    prompt: string,
    familyMemberAge: number,
    familyMemberRelationship: string,
    language: string = "en"
): Promise<AIResponse> {
    return askAI({
        prompt,
        familyMemberAge,
        familyMemberRelationship,
        language,
        context: `Providing health advice for a ${familyMemberRelationship} aged ${familyMemberAge} years.`,
        provider: "auto"
    });
}

/**
 * Analyze symptoms using AI
 */
export async function analyzeSymptoms(
    symptoms: string[],
    language: string = "en",
    patientAge?: number,
    patientRelationship?: string
): Promise<AIResponse> {
    const symptomsText = symptoms.join(", ");
    const prompt = `I have the following symptoms: ${symptomsText}. 
    Please provide general health information about what might cause these symptoms, 
    and advice on when I should see a doctor. 
    Remember to include appropriate disclaimers and recommend professional consultation.`;

    return askAI({
        prompt,
        language,
        familyMemberAge: patientAge,
        familyMemberRelationship: patientRelationship,
        context: "Symptom analysis request - provide general information only",
        provider: "auto"
    });
}

/**
 * Get medication information
 */
export async function getMedicationInfo(
    medicationName: string,
    language: string = "en"
): Promise<AIResponse> {
    const prompt = `Please provide general information about the medication "${medicationName}".
    Include:
    - General purpose/uses
    - Common side effects to watch for
    - General precautions
    - When to consult a doctor
    
    Include disclaimers that this is general information and users should consult their doctor.`;

    return askAI({
        prompt,
        language,
        context: "Medication information request - general info only",
        provider: "auto"
    });
}

/**
 * Get wellness tips for different age groups
 */
export async function getWellnessTips(
    ageGroup: "infant" | "child" | "teen" | "adult" | "elderly",
    language: string = "en"
): Promise<AIResponse> {
    const ageDescriptions = {
        infant: "infants (under 2 years)",
        child: "children (ages 2-12)",
        teen: "teenagers (ages 13-17)",
        adult: "adults (ages 18-65)",
        elderly: "elderly individuals (ages 65+)"
    };

    const prompt = `Please provide 5 helpful wellness and preventive health tips for ${ageDescriptions[ageGroup]}.
    Include tips about nutrition, exercise, sleep, mental health, and preventive care.
    Make the advice practical and easy to follow.`;

    return askAI({
        prompt,
        language,
        context: `Wellness tips for ${ageGroup} individuals`,
        provider: "auto"
    });
}

/**
 * Get emergency first aid guidance
 */
export async function getEmergencyGuidance(
    situation: string,
    language: string = "en"
): Promise<AIResponse> {
    const prompt = `URGENT: Someone needs help with: ${situation}
    
    Please provide:
    1. Immediate first aid steps while waiting for help
    2. Warning signs that indicate the situation is critical
    3. What information to give emergency services
    
    IMPORTANT: Always remind to call emergency services (108/112 in India, 911 in US).`;

    return askAI({
        prompt,
        language,
        context: "Emergency guidance - always recommend calling emergency services first",
        provider: "auto",
        temperature: 0.3 // Lower temperature for more consistent emergency advice
    });
}

/**
 * Chat with AI for general health questions
 */
export async function healthChat(
    message: string,
    conversationHistory: AIMessage[],
    language: string = "en",
    familyContext?: {
        memberAge?: number;
        memberRelationship?: string;
    }
): Promise<AIResponse> {
    return askAI({
        prompt: message,
        conversationHistory,
        language,
        familyMemberAge: familyContext?.memberAge,
        familyMemberRelationship: familyContext?.memberRelationship,
        context: "General health chat - provide helpful information with appropriate disclaimers",
        provider: "auto"
    });
}

export default {
    askAI,
    callVertexAI,
    callGeminiAPI,
    getFamilyHealthAdvice,
    analyzeSymptoms,
    getMedicationInfo,
    getWellnessTips,
    getEmergencyGuidance,
    healthChat
};

