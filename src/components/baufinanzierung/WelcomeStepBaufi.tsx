import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Home, CreditCard } from "lucide-react";

interface WelcomeStepBaufiProps {
  onNext: () => void;
}

const WelcomeStepBaufi = ({ onNext }: WelcomeStepBaufiProps) => {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-[hsl(var(--primary))]/20 rounded-full">
            <Home className="h-12 w-12 text-[hsl(var(--primary))]" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-light text-[hsl(var(--glass-text))]">
          Baufinanzierung Selbstauskunft
        </h1>
        
        <p className="text-lg text-[hsl(var(--glass-text))]/80 max-w-lg mx-auto">
          Willkommen bei Ihrer Baufinanzierungsanfrage. Bitte halten Sie folgende Unterlagen bereit:
        </p>
      </div>

      <div className="grid gap-4 text-left max-w-md mx-auto">
        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
          <FileText className="h-5 w-5 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-[hsl(var(--glass-text))] mb-1">Persönliche Dokumente</h3>
            <p className="text-sm text-[hsl(var(--glass-text))]/70">
              Personalausweise, Einkommensnachweise, Steuerbescheide
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
          <CreditCard className="h-5 w-5 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-[hsl(var(--glass-text))] mb-1">Finanzielle Verpflichtungen</h3>
            <p className="text-sm text-[hsl(var(--glass-text))]/70">
              Laufende Kredite, Unterhaltszahlungen
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
          <Home className="h-5 w-5 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-[hsl(var(--glass-text))] mb-1">Objektdaten</h3>
            <p className="text-sm text-[hsl(var(--glass-text))]/70">
              Grundbuchauszug, Energieausweis, Baupläne, Fotos
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-sm text-[hsl(var(--glass-text))]/60 mb-4">
          Die Bearbeitung dauert ca. 5-10 Minuten
        </p>
        <Button
          onClick={onNext}
          size="lg"
          className="w-full md:w-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80 text-white hover:opacity-90"
        >
          Jetzt starten
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStepBaufi;