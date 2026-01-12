import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Download, AlertTriangle, Upload, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "@/pages/Prognose";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generatePrognosePDF } from "@/utils/pdfGenerator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SuccessStepProps {
  formData: FormData;
}

interface MissingDocument {
  key: string;
  label: string;
  required: boolean;
}

interface UploadResult {
  paths: string[];
  errors: string[];
}

interface WebhookResponse {
  success: boolean;
  message?: string;
  filesCount?: number;
  expectedFilesCount?: number;
  downloadFailures?: Array<{ filePath: string; fieldName: string; errorMessage?: string }>;
  webhookStatus?: string;
  webhookError?: string;
  pdfGenerated?: boolean;
  error?: string;
}

const SuccessStep = ({ formData }: SuccessStepProps) => {
  const navigate = useNavigate();
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [missingDocuments, setMissingDocuments] = useState<MissingDocument[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [reuploadedFiles, setReuploadedFiles] = useState<Record<string, File[]>>({});
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [webhookResponse, setWebhookResponse] = useState<WebhookResponse | null>(null);
  
  const hasAutoSubmitted = useRef(false);

  // Check if required documents are valid File objects
  useEffect(() => {
    const missing: MissingDocument[] = [];
    
    // Check ID card (mandatory)
    const hasValidIdCard = formData.documents?.idCard?.some(f => f instanceof File);
    if (!hasValidIdCard) {
      missing.push({ key: 'idCard', label: 'Personalausweis', required: true });
    }
    
    // Check tax certificates if years were selected
    if (formData.taxYears?.length > 0) {
      const hasValidTaxCerts = formData.taxCertificatesByYear && 
        Object.values(formData.taxCertificatesByYear).some(files => 
          files?.some(f => f instanceof File)
        );
      if (!hasValidTaxCerts) {
        missing.push({ key: 'taxCertificates', label: 'Lohnsteuerbescheide', required: true });
      }
    }
    
    // Check disability certificate if applicable
    if (formData.hasDisability) {
      const hasValidDisabilityCert = formData.documents?.disabilityCertificate?.some(f => f instanceof File) ||
        (formData.disabilityProof && formData.disabilityProof instanceof File);
      if (!hasValidDisabilityCert) {
        missing.push({ key: 'disabilityCertificate', label: 'Behindertenausweis', required: true });
      }
    }
    
    setMissingDocuments(missing);
  }, [formData]);

  // Generate PDF on mount
  useEffect(() => {
    try {
      const pdf = generatePrognosePDF(formData);
      setPdfBlob(pdf);
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('PDF konnte nicht erstellt werden');
    }
  }, [formData]);

  // Auto-submit if no documents are missing
  useEffect(() => {
    if (missingDocuments.length === 0 && !hasAutoSubmitted.current && !isSubmitting && !submissionComplete) {
      hasAutoSubmitted.current = true;
      uploadAndSubmit();
    }
  }, [missingDocuments]);

  const sanitizeFileName = (name: string): string => {
    return name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '_');
  };

  const uploadFiles = async (files: any, folder: string): Promise<UploadResult> => {
    const list = Array.isArray(files) ? files : (files ? [files] : []);
    if (list.length === 0) return { paths: [], errors: [] };

    const validItems = list.filter((f) => typeof f === 'string' || f instanceof File);

    if (validItems.length === 0 && list.length > 0) {
      return {
        paths: [],
        errors: ['Dokumente wurden nach einem Neuladen der Seite nicht korrekt übernommen. Bitte laden Sie die Dokumente erneut hoch.'],
      };
    }

    const paths: string[] = [];
    const errors: string[] = [];

    for (const file of validItems) {
      if (typeof file === 'string') {
        paths.push(file);
        continue;
      }

      try {
        const timestamp = Date.now();
        const rawName = file.name || 'upload';
        const safeName = sanitizeFileName(rawName);
        const fileName = `${timestamp}_${safeName}`;
        const filePath = `${folder}/${fileName}`;

        console.log('Uploading file:', fileName, 'to', folder);
        const { error } = await supabase.storage
          .from('prognose-documents')
          .upload(filePath, file);

        if (error) {
          console.error('Upload error for', rawName, ':', error);
          errors.push(`${rawName}: ${error.message}`);
          continue;
        }

        paths.push(filePath);
        console.log('Successfully uploaded:', fileName);
      } catch (err: any) {
        console.error('Unexpected error uploading file:', file.name, err);
        errors.push(`${file.name}: ${err.message || 'Unbekannter Fehler'}`);
      }
    }

    return { paths, errors };
  };

  const submitToWebhook = async (uploadedPaths: Record<string, any>): Promise<WebhookResponse> => {
    console.log('Submitting to webhook with uploaded paths:', uploadedPaths);
    
    const { data, error } = await supabase.functions.invoke('submit-prognose-webhook', {
      body: {
        data: formData,
        uploadedPaths: uploadedPaths
      }
    });
    
    if (error) {
      console.error('Webhook invoke error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Webhook response:', data);
    return data as WebhookResponse;
  };

  const uploadAndSubmit = async () => {
    setIsSubmitting(true);
    setUploadErrors([]);
    setWebhookResponse(null);
    
    try {
      console.log('Starting file upload process...');
      const allErrors: string[] = [];
      
      // Track all uploaded paths for webhook
      const uploadedPaths: Record<string, any> = {
        documents: {} as Record<string, string[]>,
        taxCertificatesByYear: {} as Record<string, string[]>,
        additionalDocuments: [] as string[],
        propertyDocuments: [] as string[],
        cryptoDocuments: [] as string[],
        disabilityProof: [] as string[],
        alimonyProof: [] as string[],
        spouseTaxDocument: [] as string[]
      };

      // Merge reuploaded files with formData
      const effectiveFormData = { ...formData };
      if (reuploadedFiles.idCard?.length) {
        effectiveFormData.documents = {
          ...effectiveFormData.documents,
          idCard: reuploadedFiles.idCard
        };
      }
      if (reuploadedFiles.taxCertificates?.length) {
        const years = formData.taxYears || [];
        if (years.length > 0) {
          effectiveFormData.taxCertificatesByYear = {
            ...effectiveFormData.taxCertificatesByYear,
            [years[0]]: reuploadedFiles.taxCertificates
          };
        }
      }
      if (reuploadedFiles.disabilityCertificate?.length) {
        effectiveFormData.documents = {
          ...effectiveFormData.documents,
          disabilityCertificate: reuploadedFiles.disabilityCertificate
        };
      }

      // Upload all document types from formData.documents
      if (effectiveFormData.documents) {
        console.log('Processing documents...');
        
        if (effectiveFormData.documents.taxCertificate) {
          const result = await uploadFiles(effectiveFormData.documents.taxCertificate, 'tax-certificates');
          uploadedPaths.documents.taxCertificate = result.paths;
          allErrors.push(...result.errors);
        }
        if (effectiveFormData.documents.idCard) {
          const result = await uploadFiles(effectiveFormData.documents.idCard, 'id-cards');
          uploadedPaths.documents.idCard = result.paths;
          allErrors.push(...result.errors);
        }
        if (effectiveFormData.documents.disabilityCertificate) {
          const result = await uploadFiles(effectiveFormData.documents.disabilityCertificate, 'disability-certificates');
          uploadedPaths.documents.disabilityCertificate = result.paths;
          allErrors.push(...result.errors);
        }
        if (effectiveFormData.documents.otherDocuments) {
          const result = await uploadFiles(effectiveFormData.documents.otherDocuments, 'other-documents');
          uploadedPaths.documents.otherDocuments = result.paths;
          allErrors.push(...result.errors);
        }
      }

      // Upload tax certificates by year
      if (effectiveFormData.taxCertificatesByYear) {
        console.log('Processing tax certificates by year...');
        for (const [year, files] of Object.entries(effectiveFormData.taxCertificatesByYear)) {
          const result = await uploadFiles(files, `tax-certificates/${year}`);
          uploadedPaths.taxCertificatesByYear[year] = result.paths;
          allErrors.push(...result.errors);
        }
      }

      // Upload property documents
      if (effectiveFormData.propertyDocuments) {
        console.log('Processing property documents...');
        const result = await uploadFiles(effectiveFormData.propertyDocuments, 'property-documents');
        uploadedPaths.propertyDocuments = result.paths;
        allErrors.push(...result.errors);
      }

      // Upload additional documents
      if (effectiveFormData.additionalDocuments) {
        console.log('Processing additional documents...');
        const result = await uploadFiles(effectiveFormData.additionalDocuments, 'additional-documents');
        uploadedPaths.additionalDocuments = result.paths;
        allErrors.push(...result.errors);
      }

      // Upload crypto documents
      if (effectiveFormData.cryptoDocuments) {
        console.log('Processing crypto documents...');
        const result = await uploadFiles(effectiveFormData.cryptoDocuments, 'crypto-documents');
        uploadedPaths.cryptoDocuments = result.paths;
        allErrors.push(...result.errors);
      }

      // Upload disability proof (single file field)
      if (effectiveFormData.disabilityProof) {
        console.log('Processing disability proof...');
        const result = await uploadFiles(effectiveFormData.disabilityProof, 'disability-proof');
        uploadedPaths.disabilityProof = result.paths;
        allErrors.push(...result.errors);
      }

      // Upload alimony proof (single file field)
      if (effectiveFormData.alimonyProof) {
        console.log('Processing alimony proof...');
        const result = await uploadFiles(effectiveFormData.alimonyProof, 'alimony-proof');
        uploadedPaths.alimonyProof = result.paths;
        allErrors.push(...result.errors);
      }

      // Upload spouse tax document (single file field)
      if (effectiveFormData.spouseTaxDocument) {
        console.log('Processing spouse tax document...');
        const result = await uploadFiles(effectiveFormData.spouseTaxDocument, 'spouse-tax-documents');
        uploadedPaths.spouseTaxDocument = result.paths;
        allErrors.push(...result.errors);
      }

      console.log('All files uploaded. Paths:', uploadedPaths);

      // Check if required files are missing after upload
      const requiredMissing: MissingDocument[] = [];

      const hasIdCard = (uploadedPaths.documents.idCard?.length || 0) > 0;
      if (!hasIdCard) {
        requiredMissing.push({ key: 'idCard', label: 'Personalausweis', required: true });
      }

      if (formData.taxYears?.length > 0) {
        const hasAnyTaxCert = Object.values(uploadedPaths.taxCertificatesByYear).some((arr: any) => (arr?.length || 0) > 0);
        if (!hasAnyTaxCert) {
          requiredMissing.push({ key: 'taxCertificates', label: 'Lohnsteuerbescheide', required: true });
        }
      }

      if (formData.hasDisability) {
        const hasDisability = (uploadedPaths.documents.disabilityCertificate?.length || 0) > 0 ||
          (uploadedPaths.disabilityProof?.length || 0) > 0;
        if (!hasDisability) {
          requiredMissing.push({ key: 'disabilityCertificate', label: 'Behindertenausweis', required: true });
        }
      }

      // Block submission if required documents are missing
      if (requiredMissing.length > 0) {
        toast.error(`Fehlende Dokumente: ${requiredMissing.map((d) => d.label).join(', ')}. Bitte laden Sie diese erneut hoch.`);
        setMissingDocuments(requiredMissing);
        setIsSubmitting(false);
        return;
      }

      // Block submission if there are upload errors
      if (allErrors.length > 0) {
        console.error('Upload errors:', allErrors);
        setUploadErrors(allErrors);
        toast.error(`${allErrors.length} Datei(en) konnten nicht hochgeladen werden. Bitte versuchen Sie es erneut.`);
        setIsSubmitting(false);
        return;
      }

      // Submit to webhook
      const response = await submitToWebhook(uploadedPaths);
      setWebhookResponse(response);

      if (!response.success) {
        toast.error(response.error || 'Daten konnten nicht übermittelt werden');
        setIsSubmitting(false);
        return;
      }

      // Log success details
      console.log(`Webhook successful: ${response.filesCount}/${response.expectedFilesCount} files sent`);

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-prognose-email', {
        body: {
          formData: { ...formData, uploadedPaths },
          userEmail: formData.email || 'no-email@example.com'
        }
      });
      
      if (emailError) {
        console.error('Email error:', emailError);
        toast.warning('Daten übermittelt, aber Bestätigungs-E-Mail konnte nicht gesendet werden');
      } else {
        toast.success('Daten erfolgreich übermittelt');
      }
      
      setSubmissionComplete(true);
    } catch (error) {
      console.error('Upload or submission error:', error);
      toast.error('Fehler beim Hochladen der Dateien');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (key: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setReuploadedFiles(prev => ({
        ...prev,
        [key]: Array.from(files)
      }));
    }
  };

  const handleReuploadSubmit = () => {
    const stillMissing = missingDocuments.filter(doc => 
      doc.required && (!reuploadedFiles[doc.key] || reuploadedFiles[doc.key].length === 0)
    );
    
    if (stillMissing.length > 0) {
      toast.error(`Bitte laden Sie alle erforderlichen Dokumente hoch: ${stillMissing.map(d => d.label).join(', ')}`);
      return;
    }
    
    uploadAndSubmit();
  };

  const handleRetry = () => {
    setUploadErrors([]);
    setWebhookResponse(null);
    uploadAndSubmit();
  };

  const downloadPDF = () => {
    if (!pdfBlob) {
      toast.error('PDF ist noch nicht bereit');
      return;
    }

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

  // Show upload errors UI
  if (uploadErrors.length > 0 && !submissionComplete) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/20 p-6">
            <XCircle className="w-16 h-16 text-red-400" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-4">
            Upload fehlgeschlagen
          </h2>
          <p className="text-[hsl(var(--glass-text))]/80">
            Folgende Dateien konnten nicht hochgeladen werden:
          </p>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-2">
          {uploadErrors.map((error, index) => (
            <div key={index} className="text-sm text-red-300 flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span>{error}</span>
            </div>
          ))}
        </div>

        <Button 
          onClick={handleRetry}
          size="lg" 
          className="w-full rounded-full"
        >
          <Upload className="mr-2 h-5 w-5" />
          Erneut versuchen
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
    );
  }

  // Show reupload UI if documents are missing
  if (missingDocuments.length > 0 && !submissionComplete) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-yellow-500/20 p-6">
            <AlertTriangle className="w-16 h-16 text-yellow-400" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-4">
            Dokumente erneut hochladen
          </h2>
          <p className="text-[hsl(var(--glass-text))]/80">
            Nach dem Neuladen der Seite müssen folgende Dokumente erneut ausgewählt werden:
          </p>
        </div>

        <div className="space-y-4">
          {missingDocuments.map((doc) => (
            <div key={doc.key} className="bg-white/5 rounded-xl p-4 space-y-3">
              <Label className="text-[hsl(var(--glass-text))] flex items-center gap-2">
                {doc.label}
                {doc.required && <span className="text-red-400 text-sm">*</span>}
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => handleFileChange(doc.key, e.target.files)}
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                />
              </div>
              {reuploadedFiles[doc.key]?.length > 0 && (
                <div className="text-sm text-green-400">
                  ✓ {reuploadedFiles[doc.key].length} Datei(en) ausgewählt
                </div>
              )}
            </div>
          ))}
        </div>

        <Button 
          onClick={handleReuploadSubmit}
          disabled={isSubmitting}
          size="lg" 
          className="w-full rounded-full"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Wird hochgeladen...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Dokumente hochladen & absenden
            </>
          )}
        </Button>

        <p className="text-sm text-center text-[hsl(var(--glass-text))]/60">
          Tipp: Vermeiden Sie das Neuladen der Seite während des Ausfüllens
        </p>
      </div>
    );
  }

  // Show loading state while submitting
  if (isSubmitting) {
    return (
      <div className="space-y-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-500/20 p-6">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-4">
            Daten werden übermittelt...
          </h2>
          <p className="text-[hsl(var(--glass-text))]/80">
            Bitte warten Sie, während Ihre Dokumente hochgeladen werden.
          </p>
        </div>
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
            <p className="text-base">
              Schauen Sie in Ihr Postfach
            </p>
          </div>
        </div>
      </div>

      {webhookResponse && (
        <div className="bg-white/5 rounded-xl p-4 text-left text-sm">
          <p className="text-[hsl(var(--glass-text))]/70">
            <strong>Status:</strong> {webhookResponse.filesCount}/{webhookResponse.expectedFilesCount} Dateien übermittelt
          </p>
          {webhookResponse.downloadFailures && webhookResponse.downloadFailures.length > 0 && (
            <p className="text-yellow-400 mt-1">
              Hinweis: {webhookResponse.downloadFailures.length} Datei(en) konnten serverseitig nicht verarbeitet werden
            </p>
          )}
        </div>
      )}

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
          variant="default"
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
