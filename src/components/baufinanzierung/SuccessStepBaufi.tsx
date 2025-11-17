import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BaufiFormData } from "@/pages/BaufinanzierungSelbstauskunft";

interface SuccessStepBaufiProps {
  formData: BaufiFormData;
}

const SuccessStepBaufi = ({ formData }: SuccessStepBaufiProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-green-500/20 rounded-full">
            <CheckCircle2 className="h-16 w-16 text-green-400" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-light text-[hsl(var(--glass-text))]">
          Vielen Dank!
        </h2>
        
        <p className="text-lg text-[hsl(var(--glass-text))]/80 max-w-lg mx-auto">
          Ihre Anfrage für eine Baufinanzierung wurde erfolgreich übermittelt.
        </p>
      </div>

      <div className="p-6 bg-white/5 rounded-lg border border-white/10 max-w-md mx-auto text-left">
        <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">
          Wie geht es weiter?
        </h3>
        <ul className="space-y-2 text-[hsl(var(--glass-text))]/70">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(var(--primary))] mt-0.5">•</span>
            <span>Wir prüfen Ihre Unterlagen und melden uns innerhalb von 24 Stunden bei Ihnen</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(var(--primary))] mt-0.5">•</span>
            <span>Falls Dokumente fehlen, kontaktieren wir Sie telefonisch oder per E-Mail</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(var(--primary))] mt-0.5">•</span>
            <span>Anschließend erstellen wir Ihnen ein maßgeschneidertes Finanzierungsangebot</span>
          </li>
        </ul>
      </div>

      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg max-w-md mx-auto">
        <p className="text-sm text-[hsl(var(--glass-text))]/80">
          <strong>Bestätigung:</strong> Eine Kopie Ihrer Anfrage wurde an <strong>{formData.email}</strong> gesendet.
        </p>
      </div>

      <div className="pt-4">
        <Button
          onClick={() => navigate("/")}
          size="lg"
          className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80 text-white hover:opacity-90"
        >
          Zurück zur Startseite
        </Button>
      </div>
    </div>
  );
};

export default SuccessStepBaufi;