import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface SpecialCircumstancesStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SpecialCircumstancesStep = ({ data, updateData, onNext, onBack }: SpecialCircumstancesStepProps) => {
  const [showDisabilityUpload, setShowDisabilityUpload] = useState(data.hasDisability);
  const [showAlimonyUpload, setShowAlimonyUpload] = useState(data.paysAlimony);

  const handleNext = () => {
    // Validate that proof is uploaded if disability or alimony is selected
    if (data.hasDisability && !data.disabilityProof) {
      alert("Bitte laden Sie einen Nachweis für Ihre Behinderung hoch.");
      return;
    }
    if (data.paysAlimony && !data.alimonyProof) {
      alert("Bitte laden Sie einen Nachweis für Ihre Unterhaltszahlungen hoch.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Besondere Umstände
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Zusätzliche steuerrelevante Informationen.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Liegt eine körperliche oder geistige Behinderung vor?
          </Label>
          <RadioGroup
            value={showDisabilityUpload ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasDisability = value === "ja";
              setShowDisabilityUpload(hasDisability);
              updateData({ hasDisability });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="disability-yes" className="border-white/40" />
              <Label htmlFor="disability-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="disability-no" className="border-white/40" />
              <Label htmlFor="disability-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showDisabilityUpload && (
          <div className="space-y-2">
            <Label htmlFor="disabilityProof" className="text-[hsl(var(--glass-text))]">
              Beleg hochladen
            </Label>
            <Input
              id="disabilityProof"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) updateData({ disabilityProof: file });
              }}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
            <p className="text-xs text-[hsl(var(--glass-text))]/60">
              z.B. Schwerbehindertenausweis, ärztliches Attest (PDF, JPG oder PNG, max. 10MB)
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Haben Sie Unterhaltszahlungen geleistet?
          </Label>
          <RadioGroup
            value={showAlimonyUpload ? "ja" : "nein"}
            onValueChange={(value) => {
              const paysAlimony = value === "ja";
              setShowAlimonyUpload(paysAlimony);
              updateData({ paysAlimony });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="alimony-yes" className="border-white/40" />
              <Label htmlFor="alimony-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="alimony-no" className="border-white/40" />
              <Label htmlFor="alimony-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showAlimonyUpload && (
          <div className="space-y-2">
            <Label htmlFor="alimonyProof" className="text-[hsl(var(--glass-text))]">
              Belege hochladen
            </Label>
            <Input
              id="alimonyProof"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) updateData({ alimonyProof: file });
              }}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
            <p className="text-xs text-[hsl(var(--glass-text))]/60">
              z.B. Unterhaltsbeschluss, Zahlungsnachweise (PDF, JPG oder PNG, max. 10MB)
            </p>
          </div>
        )}
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

export default SpecialCircumstancesStep;
