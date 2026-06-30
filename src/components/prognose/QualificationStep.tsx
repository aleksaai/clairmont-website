import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from "@/pages/Prognose";

interface QualificationStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const QualificationStep = ({ data, updateData, onNext, onBack }: QualificationStepProps) => {
  const isDisqualified = data.grossSalaryOver2500 === false && data.wageTaxOver2000 === false;

  const handleNext = () => {
    if (data.grossSalaryOver2500 == null || data.wageTaxOver2000 == null) {
      alert("Bitte beantworten Sie beide Fragen.");
      return;
    }

    if (isDisqualified) return;

    if (!data.federalState?.trim() || !data.qualificationCity?.trim()) {
      alert("Bitte geben Sie Bundesland und Stadt an.");
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Kurzer Vorab-Check
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Damit wir Ihre Anfrage realistisch prüfen können, beantworten Sie bitte diese zwei Fragen.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Haben Sie mindestens 2.500 Euro Bruttoeinkommen pro Monat?
          </Label>
          <RadioGroup
            value={data.grossSalaryOver2500 == null ? "" : data.grossSalaryOver2500 ? "ja" : "nein"}
            onValueChange={(value) => updateData({ grossSalaryOver2500: value === "ja" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="gross-yes" className="border-white/40" />
              <Label htmlFor="gross-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="gross-no" className="border-white/40" />
              <Label htmlFor="gross-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Haben Sie mindestens 2.000 Euro Lohnsteuer eingezahlt?
          </Label>
          <p className="text-xs text-[hsl(var(--glass-text))]/60">
            Den Betrag finden Sie auf der Lohnsteuerbescheinigung bei Position 4.
          </p>
          <RadioGroup
            value={data.wageTaxOver2000 == null ? "" : data.wageTaxOver2000 ? "ja" : "nein"}
            onValueChange={(value) => updateData({ wageTaxOver2000: value === "ja" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="tax-paid-yes" className="border-white/40" />
              <Label htmlFor="tax-paid-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="tax-paid-no" className="border-white/40" />
              <Label htmlFor="tax-paid-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        {isDisqualified && (
          <div className="rounded-2xl border border-yellow-400/30 bg-yellow-500/10 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-300 shrink-0 mt-0.5" />
              <p className="text-sm text-[hsl(var(--glass-text))]/90">
                Leider sind unsere Kapazitäten aktuell auf Arbeitnehmer mit über 2.500 Euro Bruttoeinkommen
                und über 2.000 Euro eingezahlter Lohnsteuer zugeschnitten.
              </p>
            </div>
          </div>
        )}

        {!isDisqualified && (
          <div className="rounded-2xl border border-white/15 bg-white/5 p-4 space-y-4">
            <div>
              <Label className="text-[hsl(var(--glass-text))]">
                In welchem Bundesland und in welcher Stadt wohnen Sie?
              </Label>
              <p className="text-xs text-[hsl(var(--glass-text))]/60 mt-1">
                Diese Angaben helfen uns bei der steuerlichen Einordnung.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="federalState" className="text-[hsl(var(--glass-text))]">
                  Bundesland *
                </Label>
                <Input
                  id="federalState"
                  value={data.federalState || ""}
                  onChange={(e) => updateData({ federalState: e.target.value })}
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                  placeholder="z. B. Nordrhein-Westfalen"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualificationCity" className="text-[hsl(var(--glass-text))]">
                  Stadt *
                </Label>
                <Input
                  id="qualificationCity"
                  value={data.qualificationCity || ""}
                  onChange={(e) => updateData({ qualificationCity: e.target.value })}
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                  placeholder="z. B. Köln"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1 rounded-full">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Zurück
        </Button>
        <Button onClick={handleNext} size="lg" disabled={isDisqualified} className="flex-1 rounded-full group">
          Weiter
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default QualificationStep;
