import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FormData } from "@/pages/Prognose";

interface WorkStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const WorkStep = ({ data, updateData, onNext, onBack }: WorkStepProps) => {
  const handleNext = () => {
    // Validate required fields
    if (!data.occupation || !data.workplace?.street || !data.workplace?.zipCode || !data.workplace?.city) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Beruf & Arbeit
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Informationen zu Ihrer beruflichen Tätigkeit.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-[hsl(var(--glass-text))]">
            Berufsbezeichnung laut Arbeitsvertrag *
          </Label>
          <Input
            id="occupation"
            value={data.occupation}
            onChange={(e) => updateData({ occupation: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="z.B. Software-Entwickler, Krankenschwester"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="homeOfficeDays" className="text-[hsl(var(--glass-text))]">
            Homeoffice-Zeitraum
          </Label>
          <Input
            id="homeOfficeDays"
            value={data.homeOfficeDays}
            onChange={(e) => updateData({ homeOfficeDays: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="z.B. 120 Tage oder 01.01.2024 - 31.12.2024"
          />
          <p className="text-xs text-[hsl(var(--glass-text))]/60">
            Geben Sie die Anzahl der Tage oder den Zeitraum an
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-[hsl(var(--glass-text))]">
            Adresse der Arbeitsstelle *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="workplaceStreet" className="text-[hsl(var(--glass-text))] text-sm mb-1 block">
                Straße und Hausnummer *
              </Label>
              <Input
                id="workplaceStreet"
                value={data.workplace?.street || ""}
                onChange={(e) => updateData({ 
                  workplace: { ...data.workplace, street: e.target.value }
                })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="Straße und Hausnummer"
              />
            </div>
            <div>
              <Label htmlFor="workplaceZipCode" className="text-[hsl(var(--glass-text))] text-sm mb-1 block">
                PLZ *
              </Label>
              <Input
                id="workplaceZipCode"
                value={data.workplace?.zipCode || ""}
                onChange={(e) => updateData({ 
                  workplace: { ...data.workplace, zipCode: e.target.value }
                })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="PLZ"
              />
            </div>
            <div>
              <Label htmlFor="workplaceCity" className="text-[hsl(var(--glass-text))] text-sm mb-1 block">
                Stadt *
              </Label>
              <Input
                id="workplaceCity"
                value={data.workplace?.city || ""}
                onChange={(e) => updateData({ 
                  workplace: { ...data.workplace, city: e.target.value }
                })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="Stadt"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="trainingCosts" className="text-[hsl(var(--glass-text))]">
            Fortbildungskosten (in €)
          </Label>
          <Input
            id="trainingCosts"
            type="number"
            value={data.trainingCosts}
            onChange={(e) => updateData({ trainingCosts: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessEquipment" className="text-[hsl(var(--glass-text))]">
            Geschäftsausstattung (in €)
          </Label>
          <Input
            id="businessEquipment"
            type="number"
            value={data.businessEquipment}
            onChange={(e) => updateData({ businessEquipment: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="0"
          />
          <p className="text-xs text-[hsl(var(--glass-text))]/60">
            z.B. Laptop, Schreibtisch, Bürostuhl
          </p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg" 
          className="flex-1 rounded-full"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Zurück
        </Button>
        <Button 
          onClick={handleNext}
          size="lg" 
          className="flex-1 rounded-full group"
        >
          Weiter
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default WorkStep;
