import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface WelcomeStepSelbstProps {
  onNext: () => void;
}

const WelcomeStepSelbst = ({ onNext }: WelcomeStepSelbstProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[hsl(var(--glass-text))] mb-4">
          Selbstauskunft für Privatkredite
        </h1>
        <p className="text-lg text-[hsl(var(--glass-text))]/80 mb-6">
          Um Ihnen die bestmöglichen Konditionen für Ihren Privatkredit anzubieten, benötigen wir einige Informationen von Ihnen.
        </p>
        <p className="text-base text-[hsl(var(--glass-text))]/70">
          Der gesamte Prozess dauert nur wenige Minuten und ist völlig unverbindlich.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[hsl(var(--glass-text))]/80 mt-0.5 flex-shrink-0" />
          <p className="text-[hsl(var(--glass-text))]/80">
            <span className="font-medium">100% kostenlos & unverbindlich</span> - Keine versteckten Kosten
          </p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[hsl(var(--glass-text))]/80 mt-0.5 flex-shrink-0" />
          <p className="text-[hsl(var(--glass-text))]/80">
            <span className="font-medium">Schnell & einfach</span> - In nur 10-15 Minuten erledigt
          </p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[hsl(var(--glass-text))]/80 mt-0.5 flex-shrink-0" />
          <p className="text-[hsl(var(--glass-text))]/80">
            <span className="font-medium">Datenschutzkonform</span> - Ihre Daten sind bei uns sicher
          </p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[hsl(var(--glass-text))]/80 mt-0.5 flex-shrink-0" />
          <p className="text-[hsl(var(--glass-text))]/80">
            <span className="font-medium">Beste Konditionen</span> - Wir vergleichen für Sie die besten Angebote
          </p>
        </div>
      </div>

      <Button 
        onClick={onNext}
        size="lg" 
        className="w-full rounded-full text-base md:text-lg h-14 shadow-lg hover:shadow-xl transition-shadow group"
      >
        Jetzt starten
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default WelcomeStepSelbst;
