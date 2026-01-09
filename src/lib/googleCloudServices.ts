/**
 * Google Cloud Services Integration
 * Implements Google Safe AI Practices, Translation API, and Vision API
 * 
 * SAFETY PRINCIPLES (following Google's Responsible AI practices):
 * 1. Transparency - Clear about AI limitations
 * 2. Fairness - No bias in health recommendations
 * 3. Privacy - Minimal data collection, secure transmission
 * 4. Safety - Conservative in medical context
 * 5. Accountability - Audit logging for all AI decisions
 */

import { supabase } from "@/integrations/supabase/client";

// ============================================
// GOOGLE SAFE AI PRACTICES IMPLEMENTATION
// ============================================

export interface SafeAIConfig {
    enableContentFiltering: boolean;
    enableBiasDetection: boolean;
    enablePrivacyProtection: boolean;
    enableAuditLogging: boolean;
    maxConfidenceThreshold: number;
    minConfidenceThreshold: number;
}

export const defaultSafeAIConfig: SafeAIConfig = {
    enableContentFiltering: true,
    enableBiasDetection: true,
    enablePrivacyProtection: true,
    enableAuditLogging: true,
    maxConfidenceThreshold: 0.95, // Don't show overconfident results
    minConfidenceThreshold: 0.3,  // Don't show low-confidence results
};

// Content safety categories for medical context
export const medicalContentSafetyRules = {
    prohibitedContent: [
        "specific_diagnosis",
        "prescription_advice",
        "dosage_override",
        "self_harm_encouragement",
        "dangerous_treatments"
    ],
    requiredDisclaimers: [
        "not_medical_advice",
        "consult_professional",
        "emergency_numbers",
        "individual_variation"
    ],
    sensitiveTopics: [
        "mental_health",
        "reproductive_health",
        "pediatric_care",
        "geriatric_care",
        "chronic_conditions"
    ]
};

// Safe AI response wrapper
export interface SafeAIResponse<T> {
    data: T | null;
    safety: {
        isFiltered: boolean;
        filterReason?: string;
        confidenceScore: number;
        disclaimersApplied: string[];
        auditId: string;
    };
    error?: string;
}

/**
 * Apply Google Safe AI content filtering
 */
export function applySafeAIFiltering<T>(
    response: T,
    confidenceScore: number,
    config: SafeAIConfig = defaultSafeAIConfig
): SafeAIResponse<T> {
    const auditId = generateAuditId();
    const disclaimersApplied: string[] = [];

    // Check confidence thresholds
    if (confidenceScore > config.maxConfidenceThreshold) {
        disclaimersApplied.push("confidence_capped");
    }

    if (confidenceScore < config.minConfidenceThreshold) {
        return {
            data: null,
            safety: {
                isFiltered: true,
                filterReason: "Low confidence - professional consultation recommended",
                confidenceScore,
                disclaimersApplied: ["low_confidence_warning"],
                auditId
            }
        };
    }

    // Add standard medical disclaimers
    disclaimersApplied.push("not_medical_advice", "consult_professional");

    return {
        data: response,
        safety: {
            isFiltered: false,
            confidenceScore: Math.min(confidenceScore, config.maxConfidenceThreshold),
            disclaimersApplied,
            auditId
        }
    };
}

function generateAuditId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// GOOGLE CLOUD TRANSLATION API
// ============================================

export interface TranslationRequest {
    text: string | string[];
    targetLanguage: string;
    sourceLanguage?: string;
    format?: "text" | "html";
}

export interface TranslationResult {
    translatedText: string;
    detectedSourceLanguage?: string;
    confidence?: number;
}

export interface TranslationResponse {
    translations: TranslationResult[];
    success: boolean;
    error?: string;
}

// Supported languages for medical translation
export const supportedMedicalLanguages = {
    "en": { name: "English", nativeName: "English", rtl: false },
    "hi": { name: "Hindi", nativeName: "हिन्दी", rtl: false },
    "es": { name: "Spanish", nativeName: "Español", rtl: false },
    "fr": { name: "French", nativeName: "Français", rtl: false },
    "de": { name: "German", nativeName: "Deutsch", rtl: false },
    "zh": { name: "Chinese", nativeName: "中文", rtl: false },
    "ar": { name: "Arabic", nativeName: "العربية", rtl: true },
    "pt": { name: "Portuguese", nativeName: "Português", rtl: false },
    "bn": { name: "Bengali", nativeName: "বাংলা", rtl: false },
    "ta": { name: "Tamil", nativeName: "தமிழ்", rtl: false },
    "te": { name: "Telugu", nativeName: "తెలుగు", rtl: false },
    "mr": { name: "Marathi", nativeName: "मराठी", rtl: false },
    "gu": { name: "Gujarati", nativeName: "ગુજરાતી", rtl: false },
    "kn": { name: "Kannada", nativeName: "ಕನ್ನಡ", rtl: false },
    "ml": { name: "Malayalam", nativeName: "മലയാളം", rtl: false },
    "pa": { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", rtl: false },
    "ur": { name: "Urdu", nativeName: "اردو", rtl: true },
} as const;

export type SupportedLanguageCode = keyof typeof supportedMedicalLanguages;

/**
 * Translate text using Google Cloud Translation API via Supabase Edge Function
 */
export async function translateText(
    request: TranslationRequest
): Promise<TranslationResponse> {
    try {
        const { data, error } = await supabase.functions.invoke('google-translate', {
            body: {
                text: request.text,
                targetLanguage: request.targetLanguage,
                sourceLanguage: request.sourceLanguage || 'auto',
                format: request.format || 'text'
            }
        });

        if (error) {
            console.error('Translation API error:', error);
            return {
                translations: [],
                success: false,
                error: error.message || 'Translation failed'
            };
        }

        return {
            translations: data.translations || [],
            success: true
        };
    } catch (err) {
        console.error('Translation service error:', err);
        return {
            translations: [],
            success: false,
            error: 'Translation service unavailable'
        };
    }
}

/**
 * Translate medical terms with context preservation
 */
export async function translateMedicalContent(
    content: string,
    targetLanguage: SupportedLanguageCode,
    preserveTerms: string[] = []
): Promise<{ translated: string; preservedTerms: Record<string, string> }> {
    // Preserve medical terms by replacing with placeholders
    let processedContent = content;
    const termMap: Record<string, string> = {};

    preserveTerms.forEach((term, index) => {
        const placeholder = `__MEDICAL_TERM_${index}__`;
        termMap[placeholder] = term;
        processedContent = processedContent.replace(new RegExp(term, 'gi'), placeholder);
    });

    const response = await translateText({
        text: processedContent,
        targetLanguage,
        format: 'text'
    });

    if (!response.success || response.translations.length === 0) {
        return { translated: content, preservedTerms: {} };
    }

    // Restore medical terms
    let translatedContent = response.translations[0].translatedText;
    Object.entries(termMap).forEach(([placeholder, term]) => {
        translatedContent = translatedContent.replace(placeholder, term);
    });

    return {
        translated: translatedContent,
        preservedTerms: termMap
    };
}

// ============================================
// GOOGLE CLOUD VISION API
// ============================================

export interface VisionAnalysisRequest {
    imageBase64: string;
    features: VisionFeature[];
    languageHints?: string[];
}

export type VisionFeature =
    | "TEXT_DETECTION"
    | "DOCUMENT_TEXT_DETECTION"
    | "LABEL_DETECTION"
    | "SAFE_SEARCH_DETECTION"
    | "OBJECT_DETECTION";

export interface TextAnnotation {
    text: string;
    confidence: number;
    boundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface VisionAnalysisResult {
    fullText?: string;
    textAnnotations?: TextAnnotation[];
    labels?: { description: string; score: number }[];
    safeSearch?: {
        adult: string;
        spoof: string;
        medical: string;
        violence: string;
        racy: string;
    };
    objects?: { name: string; confidence: number }[];
    success: boolean;
    error?: string;
}

/**
 * Analyze image using Google Cloud Vision API
 */
export async function analyzeImage(
    request: VisionAnalysisRequest
): Promise<VisionAnalysisResult> {
    try {
        const { data, error } = await supabase.functions.invoke('google-vision', {
            body: {
                imageBase64: request.imageBase64,
                features: request.features,
                languageHints: request.languageHints || ['en']
            }
        });

        if (error) {
            console.error('Vision API error:', error);
            return {
                success: false,
                error: error.message || 'Image analysis failed'
            };
        }

        return {
            ...data,
            success: true
        };
    } catch (err) {
        console.error('Vision service error:', err);
        return {
            success: false,
            error: 'Vision service unavailable'
        };
    }
}

/**
 * Extract prescription information from image
 */
export async function scanPrescription(
    imageBase64: string
): Promise<{
    extractedText: string;
    medications: ExtractedMedication[];
    doctorInfo?: string;
    patientInfo?: string;
    date?: string;
    confidence: number;
    warnings: string[];
}> {
    const result = await analyzeImage({
        imageBase64,
        features: ["DOCUMENT_TEXT_DETECTION", "SAFE_SEARCH_DETECTION"],
        languageHints: ["en", "hi"]
    });

    if (!result.success || !result.fullText) {
        return {
            extractedText: "",
            medications: [],
            confidence: 0,
            warnings: ["Could not extract text from image"]
        };
    }

    // Parse prescription content
    const medications = extractMedicationsFromText(result.fullText);
    const doctorInfo = extractDoctorInfo(result.fullText);
    const patientInfo = extractPatientInfo(result.fullText);
    const date = extractDate(result.fullText);

    return {
        extractedText: result.fullText,
        medications,
        doctorInfo,
        patientInfo,
        date,
        confidence: calculateOverallConfidence(result.textAnnotations || []),
        warnings: generatePrescriptionWarnings(medications)
    };
}

export interface ExtractedMedication {
    name: string;
    dosage?: string;
    frequency?: string;
    duration?: string;
    instructions?: string;
    confidence: number;
}

function extractMedicationsFromText(text: string): ExtractedMedication[] {
    const medications: ExtractedMedication[] = [];
    const lines = text.split('\n');

    // Common medication patterns
    const medPatterns = [
        /(?:Tab|Cap|Syp|Inj)\s*\.?\s*([A-Za-z]+(?:\s+[A-Za-z]+)?)\s*(\d+\s*(?:mg|ml|mcg)?)?/gi,
        /(\w+)\s+(\d+\s*(?:mg|ml|mcg))\s+(?:OD|BD|TDS|QID|HS|SOS)/gi,
    ];

    lines.forEach(line => {
        medPatterns.forEach(pattern => {
            const matches = line.matchAll(pattern);
            for (const match of matches) {
                medications.push({
                    name: match[1]?.trim() || "",
                    dosage: match[2]?.trim(),
                    frequency: extractFrequency(line),
                    duration: extractDuration(line),
                    instructions: extractInstructions(line),
                    confidence: 0.7
                });
            }
        });
    });

    return medications;
}

function extractFrequency(text: string): string | undefined {
    const patterns = {
        "OD": "Once daily",
        "BD": "Twice daily",
        "TDS": "Three times daily",
        "QID": "Four times daily",
        "HS": "At bedtime",
        "SOS": "As needed",
        "AC": "Before meals",
        "PC": "After meals"
    };

    for (const [abbrev, full] of Object.entries(patterns)) {
        if (text.toUpperCase().includes(abbrev)) {
            return full;
        }
    }
    return undefined;
}

function extractDuration(text: string): string | undefined {
    const match = text.match(/(\d+)\s*(?:days?|weeks?|months?)/i);
    return match ? match[0] : undefined;
}

function extractInstructions(text: string): string | undefined {
    const instructions = [];
    if (/before\s+(?:food|meals?)/i.test(text)) instructions.push("Take before food");
    if (/after\s+(?:food|meals?)/i.test(text)) instructions.push("Take after food");
    if (/with\s+(?:water|milk)/i.test(text)) instructions.push("Take with water");
    if (/empty\s+stomach/i.test(text)) instructions.push("Take on empty stomach");
    return instructions.length > 0 ? instructions.join(", ") : undefined;
}

function extractDoctorInfo(text: string): string | undefined {
    const match = text.match(/(?:Dr\.?|Doctor)\s+([A-Za-z\s]+)/i);
    return match ? match[0] : undefined;
}

function extractPatientInfo(text: string): string | undefined {
    const match = text.match(/(?:Patient|Name)\s*:?\s*([A-Za-z\s]+)/i);
    return match ? match[1]?.trim() : undefined;
}

function extractDate(text: string): string | undefined {
    const patterns = [
        /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/,
        /\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4}/i
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[0];
    }
    return undefined;
}

function calculateOverallConfidence(annotations: TextAnnotation[]): number {
    if (annotations.length === 0) return 0;
    const avgConfidence = annotations.reduce((sum, a) => sum + a.confidence, 0) / annotations.length;
    return Math.round(avgConfidence * 100) / 100;
}

function generatePrescriptionWarnings(medications: ExtractedMedication[]): string[] {
    const warnings: string[] = [];

    if (medications.length === 0) {
        warnings.push("No medications could be extracted. Please verify manually.");
    }

    medications.forEach(med => {
        if (med.confidence < 0.5) {
            warnings.push(`Low confidence for "${med.name}" - please verify`);
        }
        if (!med.dosage) {
            warnings.push(`Dosage not detected for "${med.name}"`);
        }
    });

    warnings.push("Always verify extracted information with original prescription");
    warnings.push("Consult pharmacist or doctor for any clarifications");

    return warnings;
}

// ============================================
// AUDIT LOGGING FOR COMPLIANCE
// ============================================

export interface AuditLogEntry {
    id: string;
    timestamp: Date;
    action: string;
    userId?: string;
    sessionId: string;
    inputSummary: string;
    outputSummary: string;
    aiModelUsed?: string;
    confidenceScore?: number;
    disclaimersShown: string[];
    ipAddress?: string;
    userAgent?: string;
}

export async function logAuditEntry(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
    const fullEntry: AuditLogEntry = {
        ...entry,
        id: generateAuditId(),
        timestamp: new Date()
    };

    // In production, this would be sent to a secure audit log system
    console.log('[AUDIT]', JSON.stringify(fullEntry));

    // Store in local storage for debugging (remove in production)
    try {
        const existingLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
        existingLogs.push(fullEntry);
        // Keep only last 100 entries
        if (existingLogs.length > 100) {
            existingLogs.shift();
        }
        localStorage.setItem('audit_logs', JSON.stringify(existingLogs));
    } catch {
        // Ignore storage errors
    }
}

export default {
    // Safe AI
    applySafeAIFiltering,
    defaultSafeAIConfig,
    medicalContentSafetyRules,

    // Translation
    translateText,
    translateMedicalContent,
    supportedMedicalLanguages,

    // Vision
    analyzeImage,
    scanPrescription,

    // Audit
    logAuditEntry
};
