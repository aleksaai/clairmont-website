import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Download, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "@/pages/Prognose";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { generatePrognosePDF } from "@/utils/pdfGenerator";

interface SuccessStepProps {
  formData: FormData;
}

type SubmissionState = "submitting" | "success" | "error";

const SuccessStep = ({ formData }: SuccessStepProps) => {
  const navigate = useNavigate();
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("submitting");
  const [errorMessage, setErrorMessage] = useState("");

  const submitData = useCallback(async () => {
    setSubmissionState("submitting");
    setErrorMessage("");

    // Generate PDF
    try {
      const pdf = generatePrognosePDF(formData);
      setPdfBlob(pdf);
    } catch (error) {
      console.error('PDF generation error:', error);
    }

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase configuration is missing");
      }

      const payload = new window.FormData();
      payload.append("data", JSON.stringify(formData));

      const appendFiles = (key: string, files?: File[]) => {
        if (!files?.length) return;
        for (const file of files) {
          if (file instanceof File) payload.append(key, file, file.name);
        }
      };

      appendFiles("taxCertificate", formData.documents?.taxCertificate);
      appendFiles("idCard", formData.documents?.idCard);
      appendFiles("disabilityCertificate", formData.documents?.disabilityCertificate);
      appendFiles("otherDocuments", formData.documents?.otherDocuments);
      appendFiles("propertyDocuments", formData.propertyDocuments);
      appendFiles("additionalDocuments", formData.additionalDocuments);
      appendFiles("cryptoDocuments", formData.cryptoDocuments);
      appendFiles("trainingCostDocuments", formData.trainingCostDocuments);
      appendFiles("businessEquipmentDocuments", formData.businessEquipmentDocuments);
      appendFiles("businessDocuments", formData.businessDocuments);
      appendFiles("vehicleDocuments", formData.vehicleDocuments);
      appendFiles("educationDocuments", formData.educationDocuments);
      appendFiles("spouseIncomeDocuments", formData.spouseIncomeDocuments);
      appendFiles("spouseParentalBenefitDocuments", formData.spouseParentalBenefitDocuments);
      if (formData.spouseTaxDocument instanceof File) {
        payload.append("spouseIncomeDocuments", formData.spouseTaxDocument, formData.spouseTaxDocument.name);
      }

      if (formData.taxCertificatesByYear) {
        for (const [year, files] of Object.entries(formData.taxCertificatesByYear)) {
          appendFiles(`taxCertificateYear_${year}`, files);
        }
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/submit-prognose-webhook`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setSubmissionState("success");
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrorMessage(
        "Es gab ein Problem bei der Übermittlung Ihrer Daten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt."
      );
      setSubmissionState("error");
    }
  }, [formData]);

  useEffect(() => {
    submitData();
  }, [submitData]);

  const downloadPDF = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Steuer-Selbstauskunft_${formData.firstName}_${formData.lastName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('PDF heruntergeladen');
  };

  if (submissionState === "submitting") {
    return (
      <div className="space-y-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-[hsl(var(--primary))]/20 p-6">
            <Loader2 className="w-16 h-16 text-[hsl(var(--primary))] animate-spin" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-[hsl(var(--glass-text))] mb-4">
            Daten werden übermittelt...
          </h2>
          <p className="text-lg text-[hsl(var(--glass-text))]/80">
            Bitte warten Sie einen Moment, während wir Ihre Unterlagen hochladen und übermitteln.
          </p>
          <p className="text-sm text-[hsl(var(--glass-text))]/60 mt-2">
            Bitte schließen Sie diese Seite nicht.
          </p>
        </div>
      </div>
    );
  }

  if (submissionState === "error") {
    return (
      <div className="space-y-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/20 p-6">
            <AlertCircle className="w-16 h-16 text-red-400" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-[hsl(var(--glass-text))] mb-4">
            Übermittlung fehlgeschlagen
          </h2>
          <p className="text-lg text-[hsl(var(--glass-text))]/80">
            {errorMessage}
          </p>
        </div>
        <div className="space-y-3 pt-4">
          <Button onClick={submitData} size="lg" className="w-full rounded-full">
            <RefreshCw className="mr-2 h-5 w-5" />
            Erneut versuchen
          </Button>
          <Button onClick={() => navigate("/kontakt")} size="lg" variant="outline" className="w-full rounded-full">
            Kontakt aufnehmen
          </Button>
        </div>
        <p className="text-sm text-[hsl(var(--glass-text))]/60">
          Falls das Problem weiterhin besteht, kontaktieren Sie uns unter{" "}
          <a href="mailto:info@clairmont-advisory.de" className="underline hover:text-[hsl(var(--glass-text))]/80">
            info@clairmont-advisory.de
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-500/20 p-6">
          <CheckCircle2 className="w-16 h-16 text-green-400" />
        </div>
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl font-light text-[hsl(var(--glass-text))] mb-4">
          Vielen Dank! 🎉
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-[hsl(var(--glass-text))]/90">
            Wir prüfen Ihre Angaben und senden Ihnen innerhalb von 24 Stunden Ihre persönliche Steuer-Prognose per E-Mail.
          </p>
          <div className="flex items-center justify-center gap-2 text-[hsl(var(--glass-text))]/70">
            <Mail className="w-5 h-5" />
            <p className="text-base">Schauen Sie in Ihr Postfach</p>
          </div>
        </div>
      </div>
      <div className="bg-white/5 rounded-2xl p-6 space-y-3">
        <h3 className="text-lg font-medium text-[hsl(var(--glass-text))]">
          Was passiert als Nächstes?
        </h3>
        <ul className="text-left space-y-2 text-[hsl(var(--glass-text))]/80">
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>Unsere Experten prüfen Ihre Angaben gründlich</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>Sie erhalten Ihre individuelle Steuerprognose per E-Mail</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>Entscheiden Sie dann, ob Sie Ihre Steuererklärung mit uns einreichen möchten</span>
          </li>
        </ul>
      </div>
      <div className="space-y-3 pt-4">
        <Button onClick={downloadPDF} disabled={!pdfBlob} size="lg" className="w-full rounded-full">
          <Download className="mr-2 h-5 w-5" />
          PDF herunterladen
        </Button>
        <Button onClick={() => navigate("/")} size="lg" variant="outline" className="w-full rounded-full">
          Zurück zur Startseite
        </Button>
      </div>
      <p className="text-sm text-[hsl(var(--glass-text))]/60">
        Bei Fragen erreichen Sie uns unter{" "}
        <a href="mailto:info@clairmont-advisory.de" className="underline hover:text-[hsl(var(--glass-text))]/80">
          info@clairmont-advisory.de
        </a>
      </p>
    </div>
  );
};

export default SuccessStep;
