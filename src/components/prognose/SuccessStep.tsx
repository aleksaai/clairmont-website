import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "@/pages/Prognose";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generatePrognosePDF } from "@/utils/pdfGenerator";

interface SuccessStepProps {
  formData: FormData;
}

const SuccessStep = ({ formData }: SuccessStepProps) => {
  const navigate = useNavigate();
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    // Generate PDF
    try {
      const pdf = generatePrognosePDF(formData);
      setPdfBlob(pdf);
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('PDF konnte nicht erstellt werden');
    }

    // Upload all files and send email
    const uploadFilesAndSendEmail = async () => {
      try {
        console.log('Starting file upload and email send process...');
        const uploadedData = { ...formData };
        const failedUploads: string[] = [];
        
        // Helper function to sanitize filenames
        const sanitizeFileName = (name: string): string => {
          return name
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/\s+/g, '_') // Replace spaces with underscores
            .replace(/[^a-zA-Z0-9._-]/g, '_'); // Replace other special chars with underscores
        };
        
        // Helper function to upload files and return paths
        const uploadFiles = async (files: any, folder: string): Promise<string[]> => {
          if (!files || files.length === 0) return [];
          
          const paths: string[] = [];
          for (const file of files) {
            // Check if it's already a string path (already uploaded)
            if (typeof file === 'string') {
              paths.push(file);
              continue;
            }
            
            // Check if it's a File object
            if (file instanceof File) {
              try {
                const timestamp = Date.now();
                const rawName = file.name || 'upload';
                const safeName = sanitizeFileName(rawName);
                const fileName = `${timestamp}_${safeName}`;
                const filePath = `${folder}/${fileName}`;
                
                console.log('Uploading file:', fileName, '(original:', rawName, ')');
                const { error } = await supabase.storage
                  .from('prognose-documents')
                  .upload(filePath, file);
                
                if (error) {
                  console.error('Upload error for', rawName, ':', error);
                  failedUploads.push(rawName);
                  continue; // Continue with next file instead of throwing
                }
                
                paths.push(filePath);
                console.log('Successfully uploaded:', fileName);
              } catch (err) {
                console.error('Unexpected error uploading file:', file.name, err);
                failedUploads.push(file.name || 'unknown file');
                continue;
              }
            }
          }
          return paths;
        };

        // Upload all document types
        if (formData.documents) {
          console.log('Processing documents...');
          const uploadedDocs: Record<string, string[]> = {};
          
          if (formData.documents.taxCertificate) {
            uploadedDocs.taxCertificate = await uploadFiles(formData.documents.taxCertificate, 'tax-certificates');
          }
          if (formData.documents.idCard) {
            uploadedDocs.idCard = await uploadFiles(formData.documents.idCard, 'id-cards');
          }
          if (formData.documents.disabilityCertificate) {
            uploadedDocs.disabilityCertificate = await uploadFiles(formData.documents.disabilityCertificate, 'disability-certificates');
          }
          if (formData.documents.otherDocuments) {
            uploadedDocs.otherDocuments = await uploadFiles(formData.documents.otherDocuments, 'other-documents');
          }
          
          uploadedData.documents = uploadedDocs as any;
        }

        // Upload tax certificates by year
        if (formData.taxCertificatesByYear) {
          console.log('Processing tax certificates by year...');
          const uploadedByYear: Record<string, string[]> = {};
          for (const [year, files] of Object.entries(formData.taxCertificatesByYear)) {
            uploadedByYear[year] = await uploadFiles(files, `tax-certificates/${year}`);
          }
          uploadedData.taxCertificatesByYear = uploadedByYear as any;
        }

        // Upload property documents
        if (formData.propertyDocuments) {
          console.log('Processing property documents...');
          uploadedData.propertyDocuments = await uploadFiles(formData.propertyDocuments, 'property-documents') as any;
        }

        // Upload additional documents
        if (formData.additionalDocuments) {
          console.log('Processing additional documents...');
          uploadedData.additionalDocuments = await uploadFiles(formData.additionalDocuments, 'additional-documents') as any;
        }

        console.log('All files processed, sending email...');
        
        // Add failed uploads to the data
        if (failedUploads.length > 0) {
          (uploadedData as any).failedUploads = failedUploads;
          console.warn('Some files failed to upload:', failedUploads);
        }

        // Send email with uploaded file paths
        const { error: emailError } = await supabase.functions.invoke('send-prognose-email', {
          body: {
            formData: uploadedData,
            userEmail: formData.email || 'no-email@example.com'
          }
        });
        
        console.log('Email function invoked, checking for errors...');
        
        if (emailError) throw emailError;
        
        if (failedUploads.length > 0) {
          toast.warning(`E-Mail gesendet, aber ${failedUploads.length} Datei(en) konnten nicht hochgeladen werden`);
        } else {
          toast.success('E-Mail erfolgreich gesendet');
        }
      } catch (error) {
        console.error('Upload or email error:', error);
        toast.error('Fehler beim Hochladen der Dateien oder Senden der E-Mail');
      }
    };

    // Submit to webhook
    const submitToWebhook = async () => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('data', JSON.stringify(formData));

        // Add all document files
        if (formData.documents) {
          formData.documents.taxCertificate?.forEach((file: File) => {
            formDataToSend.append('taxCertificate', file);
          });
          formData.documents.idCard?.forEach((file: File) => {
            formDataToSend.append('idCard', file);
          });
          formData.documents.disabilityCertificate?.forEach((file: File) => {
            formDataToSend.append('disabilityCertificate', file);
          });
          formData.documents.otherDocuments?.forEach((file: File) => {
            formDataToSend.append('otherDocuments', file);
          });
        }

        // Add tax certificates by year
        if (formData.taxCertificatesByYear) {
          for (const [year, files] of Object.entries(formData.taxCertificatesByYear)) {
            if (files && Array.isArray(files)) {
              files.forEach((file: File) => {
                if (file instanceof File) {
                  formDataToSend.append(`taxCertificateYear_${year}`, file);
                }
              });
            }
          }
        }

        // Add additional documents
        if (formData.additionalDocuments && Array.isArray(formData.additionalDocuments)) {
          formData.additionalDocuments.forEach((file: File) => {
            if (file instanceof File) {
              formDataToSend.append('additionalDocuments', file);
            }
          });
        }

        // Add property documents
        if (formData.propertyDocuments && Array.isArray(formData.propertyDocuments)) {
          formData.propertyDocuments.forEach((file: File) => {
            if (file instanceof File) {
              formDataToSend.append('propertyDocuments', file);
            }
          });
        }

        const { error } = await supabase.functions.invoke('submit-prognose-webhook', {
          body: formDataToSend,
        });
        
        if (error) throw error;
        toast.success('Daten erfolgreich übermittelt');
      } catch (error) {
        console.error('Webhook error:', error);
        toast.error('Daten konnten nicht übermittelt werden');
      }
    };
    
    submitToWebhook();
    uploadFilesAndSendEmail();
  }, [formData]);

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
