import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Download, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "@/pages/Prognose";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
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

    const failedUploads: string[] = [];

    const sanitizeFileName = (name: string): string => {
      return name
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9._-]/g, '_');
    };

    const uploadFiles = async (files: any, folder: string): Promise<string[]> => {
      if (!files || files.length === 0) return [];
      const paths: string[] = [];
      for (const file of files) {
        if (typeof file === 'string') { paths.push(file); continue; }
        if (file instanceof File) {
          try {
            const safeName = sanitizeFileName(file.name || 'upload');
            const filePath = `${folder}/${Date.now()}_${safeName}`;
            const { error } = await supabase.storage.from('prognose-documents').upload(filePath, file);
            if (error) { failedUploads.push(file.name); continue; }
            paths.push(filePath);
          } catch { failedUploads.push(file.name || 'unknown'); }
        }
      }
      return paths;
    };

    try {
      // Upload files
      const uploadedData = { ...formData };

      if (formData.documents) {
        const uploadedDocs: Record<string, string[]> = {};
        if (formData.documents.taxCertificate) uploadedDocs.taxCertificate = await uploadFiles(formData.documents.taxCertificate, 'tax-certificates');
        if (formData.documents.idCard) uploadedDocs.idCard = await uploadFiles(formData.documents.idCard, 'id-cards');
        if (formData.documents.disabilityCertificate) uploadedDocs.disabilityCertificate = await uploadFiles(formData.documents.disabilityCertificate, 'disability-certificates');
        if (formData.documents.otherDocuments) uploadedDocs.otherDocuments = await uploadFiles(formData.documents.otherDocuments, 'other-documents');
        uploadedData.documents = uploadedDocs as any;
      }

      if (formData.taxCertificatesByYear) {
        const uploadedByYear: Record<string, string[]> = {};
        for (const [year, files] of Object.entries(formData.taxCertificatesByYear)) {
          uploadedByYear[year] = await uploadFiles(files, `tax-certificates/${year}`);
        }
        uploadedData.taxCertificatesByYear = uploadedByYear as any;
      }

      if (formData.propertyDocuments) {
        uploadedData.propertyDocuments = await uploadFiles(formData.propertyDocuments, 'property-documents') as any;
      }
      if (formData.additionalDocuments) {
        uploadedData.additionalDocuments = await uploadFiles(formData.additionalDocuments, 'additional-documents') as any;
      }

      if (failedUploads.length > 0) {
        (uploadedData as any).failedUploads = failedUploads;
      }

      // Send webhook first so the core submission is registered even if the email step has issues
      const webhookFormData = new FormData();
      webhookFormData.append('data', JSON.stringify(formData));
      if (formData.documents) {
        formData.documents.taxCertificate?.forEach((file: File) => webhookFormData.append('taxCertificate', file));
        formData.documents.idCard?.forEach((file: File) => webhookFormData.append('idCard', file));
        formData.documents.disabilityCertificate?.forEach((file: File) => webhookFormData.append('disabilityCertificate', file));
        formData.documents.otherDocuments?.forEach((file: File) => webhookFormData.append('otherDocuments', file));
      }
      if (formData.taxCertificatesByYear) {
        for (const [year, files] of Object.entries(formData.taxCertificatesByYear)) {
          (files as File[] | undefined)?.forEach((file: File) => webhookFormData.append(`taxCertificateYear_${year}`, file));
        }
      }
      formData.additionalDocuments?.forEach((file: File) => webhookFormData.append('additionalDocuments', file));
      formData.propertyDocuments?.forEach((file: File) => webhookFormData.append('propertyDocuments', file));

      const { error: webhookError } = await supabase.functions.invoke('submit-prognose-webhook', {
        body: webhookFormData,
      });
      if (webhookError) throw webhookError;

      const { error: emailError } = await supabase.functions.invoke('send-prognose-email', {
        body: { formData: uploadedData, userEmail: formData.email || 'no-email@example.com' }
      });

      if (emailError) {
        console.error('Email delivery warning:', emailError);
        toast.warning('Ihre Anfrage wurde gespeichert, aber die interne Benachrichtigung musste im Hintergrund erneut verarbeitet werden.');
      }

      if (failedUploads.length > 0) {
        toast.warning(`Erfolgreich gesendet, aber ${failedUploads.length} Datei(en) konnten nicht hochgeladen werden.`);
      }

      setSubmissionState("success");
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrorMessage(error?.message || "Unbekannter Fehler beim Übermitteln der Daten.");
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

  // Loading state
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

  // Error state
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
            Leider konnte Ihre Anfrage nicht übermittelt werden. Bitte versuchen Sie es erneut.
          </p>
          {errorMessage && (
            <p className="text-sm text-red-400/80 mt-2">
              Fehlerdetails: {errorMessage}
            </p>
          )}
        </div>
        <div className="space-y-3 pt-4">
          <Button
            onClick={submitData}
            size="lg"
            className="w-full rounded-full"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Erneut versuchen
          </Button>
          <Button
            onClick={() => navigate("/kontakt")}
            size="lg"
            variant="outline"
            className="w-full rounded-full"
          >
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

  // Success state
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
        <Button
          onClick={downloadPDF}
          disabled={!pdfBlob}
          size="lg"
          className="w-full rounded-full"
        >
          <Download className="mr-2 h-5 w-5" />
          PDF herunterladen
        </Button>
        <Button
          onClick={() => navigate("/")}
          size="lg"
          variant="outline"
          className="w-full rounded-full"
        >
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
