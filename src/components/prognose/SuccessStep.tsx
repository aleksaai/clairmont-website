import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormData } from "@/pages/Prognose";
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

    // Send email
    const sendEmail = async () => {
      try {
        const { error } = await supabase.functions.invoke('send-prognose-email', {
          body: { 
            formData,
            userEmail: formData.firstName + '@example.com' // Replace with actual email field
          }
        });
        
        if (error) throw error;
        toast.success('E-Mail erfolgreich gesendet');
      } catch (error) {
        console.error('Email error:', error);
        toast.error('E-Mail konnte nicht gesendet werden');
      }
    };
    
    sendEmail();
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
