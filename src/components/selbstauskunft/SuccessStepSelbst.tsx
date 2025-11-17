import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SelbstauskunftFormData } from "@/pages/Selbstauskunft";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SuccessStepSelbstProps {
  formData: SelbstauskunftFormData;
}

const SuccessStepSelbst = ({ formData }: SuccessStepSelbstProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const submitData = async () => {
      try {
        const { error } = await supabase.functions.invoke('send-selbstauskunft-email', {
          body: formData
        });

        if (error) throw error;
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error("Es gab ein Problem beim Absenden. Bitte kontaktieren Sie uns direkt.");
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
          Vielen Dank!
        </h2>
        <p className="text-lg text-[hsl(var(--glass-text))]/80 mb-4">
          Ihre Selbstauskunft wurde erfolgreich übermittelt.
        </p>
        <p className="text-base text-[hsl(var(--glass-text))]/70">
          Wir werden Ihre Unterlagen prüfen und uns schnellstmöglich bei Ihnen melden, um die nächsten Schritte zu besprechen.
        </p>
      </div>

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
    </div>
  );
};

export default SuccessStepSelbst;
