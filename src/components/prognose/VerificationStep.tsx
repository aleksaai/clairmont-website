import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Loader2, Send } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VerificationStepProps {
  data: FormData;
  onSubmit: () => void;
  onBack: () => void;
  onGoToStep: (step: number) => void;
}

interface CheckResult {
  id: string;
  label: string;
  status: "ok" | "error" | "warning";
  message: string;
}

interface VerificationResponse {
  results: CheckResult[];
  canSubmit: boolean;
  hasWarnings: boolean;
  hasErrors: boolean;
}

const VerificationStep = ({ data, onSubmit, onBack, onGoToStep }: VerificationStepProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [hasWarnings, setHasWarnings] = useState(false);
  const [noTaxYearsConfirmed, setNoTaxYearsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    runVerification();
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (isPdf) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
          return;
        }
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      };
      img.src = url;
    });
  };

  const runVerification = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert ID card files to base64
      const idCardFiles: string[] = [];
      if (data.documents?.idCard) {
        for (const file of data.documents.idCard) {
          if (file instanceof File) {
            const base64 = await fileToBase64(file);
            idCardFiles.push(base64);
          }
        }
      }

      // Convert tax certificate files to base64
      const taxCertificateFiles: Record<string, string[]> = {};
      if (data.taxCertificatesByYear) {
        for (const [year, files] of Object.entries(data.taxCertificatesByYear)) {
          taxCertificateFiles[year] = [];
          if (Array.isArray(files)) {
            for (const file of files) {
              if (file instanceof File) {
                const base64 = await fileToBase64(file);
                taxCertificateFiles[year].push(base64);
              }
            }
          }
        }
      }

      const hasTaxYears = data.taxYears && data.taxYears.length > 0;

      const { data: responseData, error: fnError } = await supabase.functions.invoke(
        "verify-prognose-documents",
        {
          body: {
            idCardFiles,
            taxCertificateFiles,
            taxYears: data.taxYears || [],
            iban: data.iban || "",
            hasTaxYears,
          },
        }
      );

      if (fnError) throw fnError;

      const response = responseData as VerificationResponse;
      setResults(response.results);
      setCanSubmit(response.canSubmit);
      setHasWarnings(response.hasWarnings);
    } catch (err) {
      console.error("Verification error:", err);
      setError("Die Prüfung konnte nicht durchgeführt werden. Sie können den Antrag trotzdem absenden.");
      setCanSubmit(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getStepForResult = (resultId: string): number | null => {
    // Map result IDs to form steps
    if (resultId === "idCard") return 12; // DocumentUploadStep approximate
    if (resultId === "iban") return null; // Already on BankDetailsStep, just go back
    if (resultId === "taxYears") return 6; // IncomeStep
    if (resultId.startsWith("taxCert_")) return 7; // TaxCertificateUploadStep
    return null;
  };

  const handleGoBack = (resultId: string) => {
    const step = getStepForResult(resultId);
    if (step !== null) {
      onGoToStep(step);
    } else {
      onBack();
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "ok":
        return <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />;
      case "error":
        return <XCircle className="w-6 h-6 text-red-400 shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0" />;
      default:
        return null;
    }
  };

  const effectiveCanSubmit = canSubmit || (hasWarnings && !results.some(r => r.status === "error"));

  // Handle "no tax years" confirmation
  const handleConfirmNoTaxYears = () => {
    setNoTaxYearsConfirmed(true);
    setResults(prev => prev.map(r => 
      r.id === "taxYears" 
        ? { ...r, status: "ok" as const, message: "Bestätigt: Keine Lohnsteuerbescheinigung vorhanden." }
        : r
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Antrag wird geprüft
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          {isLoading
            ? "Ihre Dokumente werden von unserer KI überprüft..."
            : "Hier sind die Ergebnisse der automatischen Prüfung."}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <Loader2 className="w-12 h-12 text-[hsl(var(--primary))] animate-spin" />
          <p className="text-[hsl(var(--glass-text))]/80 text-center">
            Dokumente werden analysiert...
          </p>
          <p className="text-sm text-[hsl(var(--glass-text))]/50 text-center">
            Dies kann einen Moment dauern.
          </p>
        </div>
      ) : error ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-[hsl(var(--glass-text))]">{error}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((result) => (
            <div
              key={result.id}
              className={`rounded-2xl p-4 border ${
                result.status === "ok"
                  ? "bg-green-500/5 border-green-500/20"
                  : result.status === "error"
                  ? "bg-red-500/5 border-red-500/20"
                  : "bg-yellow-500/5 border-yellow-500/20"
              }`}
            >
              <div className="flex items-start gap-3">
                {statusIcon(result.status)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[hsl(var(--glass-text))]">
                    {result.label}
                  </h4>
                  <p className="text-sm text-[hsl(var(--glass-text))]/70 mt-1">
                    {result.message}
                  </p>

                  {/* Special handling for "no tax years" warning */}
                  {result.id === "taxYears" && result.status === "warning" && !noTaxYearsConfirmed && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full text-xs"
                        onClick={() => handleGoBack(result.id)}
                      >
                        Zurück & Steuerjahre auswählen
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full text-xs text-[hsl(var(--glass-text))]/60"
                        onClick={handleConfirmNoTaxYears}
                      >
                        Ja, ich habe wirklich keine
                      </Button>
                    </div>
                  )}

                  {/* Back button for errors */}
                  {result.status === "error" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs mt-3"
                      onClick={() => handleGoBack(result.id)}
                    >
                      Zurück & korrigieren
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="flex gap-4 pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="flex-1 rounded-full"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Zurück
          </Button>

          {effectiveCanSubmit && (
            <Button
              onClick={onSubmit}
              size="lg"
              className="flex-1 rounded-full group"
            >
              <Send className="mr-2 h-5 w-5" />
              {hasWarnings && !results.every(r => r.status === "ok")
                ? "Trotzdem absenden"
                : "Prognose absenden"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationStep;
