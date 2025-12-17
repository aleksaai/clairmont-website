import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SelbstauskunftFormData } from "@/pages/Selbstauskunft";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SuccessStepSelbstProps {
  formData: SelbstauskunftFormData;
}

const SuccessStepSelbst = ({ formData }: SuccessStepSelbstProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(true);

  useEffect(() => {
    const sanitizeFileName = (fileName: string): string => {
      return fileName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9._-]/g, '_');
    };

    const uploadFiles = async (files: File[] | undefined, category: string): Promise<string[]> => {
      if (!files || files.length === 0) return [];
      
      const uploadPromises = files.map(async (file) => {
        const sanitizedName = sanitizeFileName(file.name);
        const filePath = `${category}/${Date.now()}_${sanitizedName}`;
        
        try {
          const { error } = await supabase.storage
            .from('prognose-documents')
            .upload(filePath, file);
          
          if (error) {
            console.error(`Error uploading ${file.name}:`, error);
            return null;
          }
          
          return filePath;
        } catch (err) {
          console.error(`Failed to upload ${file.name}:`, err);
          return null;
        }
      });
      
      const results = await Promise.all(uploadPromises);
      return results.filter((path): path is string => path !== null);
    };

    const submitData = async () => {
      try {
        setIsSubmitting(true);
        
        // Upload all files
        const idDocumentPaths = await uploadFiles(formData.idDocument, 'selbstauskunft/id-documents');
        const paySlipPaths = await uploadFiles(formData.paySlips, 'selbstauskunft/pay-slips');
        const salaryProofPaths = await uploadFiles(formData.salaryProof, 'selbstauskunft/salary-proof');
        const bankStatementPaths = await uploadFiles(formData.bankStatements, 'selbstauskunft/bank-statements');
        const insuranceContractPaths = await uploadFiles(formData.insuranceContract, 'selbstauskunft/insurance-contracts');

        // Track failed uploads
        const failedUploads: string[] = [];
        
        const checkFailedUploads = (files: File[] | undefined, uploadedPaths: string[]) => {
          if (files && files.length > uploadedPaths.length) {
            const uploadedCount = uploadedPaths.length;
            const totalCount = files.length;
            for (let i = uploadedCount; i < totalCount; i++) {
              if (files[i]) {
                failedUploads.push(files[i].name);
              }
            }
          }
        };

        checkFailedUploads(formData.idDocument, idDocumentPaths);
        checkFailedUploads(formData.paySlips, paySlipPaths);
        checkFailedUploads(formData.salaryProof, salaryProofPaths);
        checkFailedUploads(formData.bankStatements, bankStatementPaths);
        checkFailedUploads(formData.insuranceContract, insuranceContractPaths);

        // Prepare data for email
        const emailData = {
          ...formData,
          idDocument: idDocumentPaths,
          paySlips: paySlipPaths,
          salaryProof: salaryProofPaths,
          bankStatements: bankStatementPaths,
          insuranceContract: insuranceContractPaths,
          failedUploads: failedUploads.length > 0 ? failedUploads : undefined,
        };

        const { error } = await supabase.functions.invoke('send-selbstauskunft-email', {
          body: emailData
        });

        if (error) throw error;

        // Also send to credit-webhook
        try {
          const webhookFormData = new FormData();
          webhookFormData.append('data', JSON.stringify(emailData));
          
          const webhookResponse = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-selbstauskunft-webhook`,
            {
              method: 'POST',
              body: webhookFormData,
            }
          );
          
          if (!webhookResponse.ok) {
            console.error('Webhook submission failed:', await webhookResponse.text());
          } else {
            console.log('Webhook submission successful');
          }
        } catch (webhookError) {
          console.error('Error sending to webhook:', webhookError);
          // Don't fail the whole submission if webhook fails
        }

        if (failedUploads.length > 0) {
          toast.warning(`E-Mail erfolgreich gesendet, aber ${failedUploads.length} Datei(en) konnten nicht hochgeladen werden.`);
        }
        
        setIsSubmitting(false);
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error("Es gab ein Problem beim Absenden. Bitte kontaktieren Sie uns direkt.");
        setIsSubmitting(false);
      }
    };

    submitData();
  }, [formData]);

  return (
    <div className="space-y-8 text-center">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-light text-[hsl(var(--glass-text))] mb-4">
          {isSubmitting ? "Ihre Daten werden übermittelt..." : "Vielen Dank!"}
        </h2>
        <p className="text-lg text-[hsl(var(--glass-text))]/80 mb-4">
          {isSubmitting 
            ? "Bitte warten Sie einen Moment, während wir Ihre Unterlagen hochladen und übermitteln."
            : "Ihre Selbstauskunft wurde erfolgreich übermittelt."
          }
        </p>
        {!isSubmitting && (
          <p className="text-base text-[hsl(var(--glass-text))]/70">
            Wir werden Ihre Unterlagen prüfen und uns schnellstmöglich bei Ihnen melden, um die nächsten Schritte zu besprechen.
          </p>
        )}
      </div>

      {!isSubmitting && (
        <>
          <div className="space-y-4 pt-6 border-t border-white/20">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-[hsl(var(--glass-text))]/80 mt-0.5 flex-shrink-0" />
              <p className="text-[hsl(var(--glass-text))]/80 text-left">
                <span className="font-medium">Was passiert als nächstes?</span><br />
                Unser Team wird Ihre Angaben sorgfältig prüfen und verschiedene Kreditangebote für Sie vergleichen.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[hsl(var(--glass-text))]/80 mt-0.5 flex-shrink-0" />
              <p className="text-[hsl(var(--glass-text))]/80 text-left">
                <span className="font-medium">Rückmeldung innerhalb von 24-48 Stunden</span><br />
                Sie erhalten eine persönliche Beratung und ein individuelles Angebot.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[hsl(var(--glass-text))]/80 mt-0.5 flex-shrink-0" />
              <p className="text-[hsl(var(--glass-text))]/80 text-left">
                <span className="font-medium">Kostenlos & unverbindlich</span><br />
                Es entstehen Ihnen keinerlei Kosten oder Verpflichtungen.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="flex-1 rounded-full bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
            >
              <Home className="w-4 h-4 mr-2" />
              Zur Startseite
            </Button>
            <Button
              onClick={() => navigate("/kontakt")}
              size="lg"
              className="flex-1 rounded-full"
            >
              Kontakt aufnehmen
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SuccessStepSelbst;
