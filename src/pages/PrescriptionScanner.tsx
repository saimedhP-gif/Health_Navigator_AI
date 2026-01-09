import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, FileText, AlertTriangle, Pill, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface MedicationInfo {
  name: string;
  commonUse: string;
  notes?: string;
}

interface ScanResult {
  medications: MedicationInfo[];
  doctorInfo?: string;
  date?: string;
  generalNotes?: string;
  importantReminder: string;
}

export default function PrescriptionScanner() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Convert to base64 for API
    const base64Reader = new FileReader();
    base64Reader.onload = async (e) => {
      const base64 = (e.target?.result as string).split(",")[1];
      await analyzePrescription(base64);
    };
    base64Reader.readAsDataURL(file);
  };

  const analyzePrescription = async (imageBase64: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("scan-prescription", {
        body: { imageBase64 },
      });

      if (error) throw error;
      setResult(data);

      // Save to history if user is logged in
      if (user && data) {
        await supabase.from("prescription_scans").insert({
          user_id: user.id,
          scan_result: data,
        });
        toast({
          title: "Saved",
          description: "Prescription scan saved to your history.",
        });
      }
    } catch (err) {
      setError("Failed to analyze prescription. Please try again with a clearer image.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Prescription Scanner
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Understand Your Prescription
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload a photo of your prescription to learn what medications are listed and what they're commonly used for.
            </p>
          </div>

          {/* Warning Banner */}
          <Card className="mb-6 border-health-amber/30 bg-health-amber/5">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-health-amber flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-health-amber mb-1">Important Reminder</p>
                  <p className="text-muted-foreground">
                    This tool helps you understand your prescription — it does NOT provide medical advice. 
                    Always follow your doctor's instructions and consult your pharmacist with questions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {!result && !isLoading && (
            <Card>
              <CardContent className="p-8">
                <div
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Upload Prescription Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click to upload or drag and drop
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Camera className="w-4 h-4" />
                      Take Photo
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading && (
            <Card>
              <CardContent className="p-12 text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
                <h3 className="font-semibold mb-2">Analyzing Prescription...</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we process your image
                </p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="border-destructive/30">
              <CardContent className="p-6 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={handleReset}>Try Again</Button>
              </CardContent>
            </Card>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {previewUrl && (
                <Card>
                  <CardContent className="p-4">
                    <img
                      src={previewUrl}
                      alt="Prescription"
                      className="w-full max-h-64 object-contain rounded-lg"
                    />
                  </CardContent>
                </Card>
              )}

              {result.medications && result.medications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="w-5 h-5 text-primary" />
                      Medications Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.medications.map((med, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold text-lg mb-1">{med.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">Common use:</span> {med.commonUse}
                        </p>
                        {med.notes && (
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Notes:</span> {med.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {(result.doctorInfo || result.date) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Prescription Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result.doctorInfo && <p><strong>Doctor:</strong> {result.doctorInfo}</p>}
                    {result.date && <p><strong>Date:</strong> {result.date}</p>}
                  </CardContent>
                </Card>
              )}

              {result.generalNotes && (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{result.generalNotes}</p>
                  </CardContent>
                </Card>
              )}

              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-primary">{result.importantReminder}</p>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button onClick={handleReset} variant="outline">
                  Scan Another Prescription
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
