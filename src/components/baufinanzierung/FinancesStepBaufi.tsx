import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BaufiFormData } from "@/pages/BaufinanzierungSelbstauskunft";
import { useState } from "react";

interface FinancesStepBaufiProps {
  data: BaufiFormData;
  updateData: (data: Partial<BaufiFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const FinancesStepBaufi = ({ data, updateData, onNext, onBack }: FinancesStepBaufiProps) => {
  const [showSelfEmployed, setShowSelfEmployed] = useState(data.isSelfEmployed);
  const [showPrivateInsurance, setShowPrivateInsurance] = useState(data.hasPrivateHealthInsurance);

  const handleNext = () => {
    if (data.isSelfEmployed && (!data.bwa2024 || data.bwa2024.length === 0)) {
      alert("Bitte laden Sie Ihre BWA 2024 hoch.");
      return;
    }
    if (data.hasPrivateHealthInsurance && (!data.privateHealthInsuranceProof || data.privateHealthInsuranceProof.length === 0)) {
      alert("Bitte laden Sie Ihren PKV-Nachweis hoch.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Finanzen & Einkommen
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte laden Sie Ihre Einkommensnachweise und Steuerdokumente hoch.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-[hsl(var(--glass-text))] text-lg font-medium">Einkommenssteuerbescheide</Label>
          
          <div className="space-y-2">
            <Label htmlFor="taxReturns2021" className="text-[hsl(var(--glass-text))] text-sm">2021</Label>
            <Input
              id="taxReturns2021"
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={(e) => updateData({ taxReturns2021: e.target.files ? Array.from(e.target.files) : [] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxReturns2022" className="text-[hsl(var(--glass-text))] text-sm">2022</Label>
            <Input
              id="taxReturns2022"
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={(e) => updateData({ taxReturns2022: e.target.files ? Array.from(e.target.files) : [] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxReturns2023" className="text-[hsl(var(--glass-text))] text-sm">2023</Label>
            <Input
              id="taxReturns2023"
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={(e) => updateData({ taxReturns2023: e.target.files ? Array.from(e.target.files) : [] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxReturns2024" className="text-[hsl(var(--glass-text))] text-sm">2024</Label>
            <Input
              id="taxReturns2024"
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={(e) => updateData({ taxReturns2024: e.target.files ? Array.from(e.target.files) : [] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="balanceSheets2024" className="text-[hsl(var(--glass-text))]">Summen-/Saldenlisten 2024 (optional)</Label>
          <Input
            id="balanceSheets2024"
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={(e) => updateData({ balanceSheets2024: e.target.files ? Array.from(e.target.files) : [] })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Sind Sie selbstständig/Unternehmer?</Label>
          <RadioGroup
            value={showSelfEmployed ? "ja" : "nein"}
            onValueChange={(value) => {
              const selfEmployed = value === "ja";
              setShowSelfEmployed(selfEmployed);
              updateData({ isSelfEmployed: selfEmployed });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="selfemployed-yes" className="border-white/40" />
              <Label htmlFor="selfemployed-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="selfemployed-no" className="border-white/40" />
              <Label htmlFor="selfemployed-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        {showSelfEmployed && (
          <div className="space-y-2">
            <Label htmlFor="bwa2024" className="text-[hsl(var(--glass-text))]">BWA 2024 *</Label>
            <Input
              id="bwa2024"
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={(e) => updateData({ bwa2024: e.target.files ? Array.from(e.target.files) : [] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>
        )}

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Sind Sie privat krankenversichert?</Label>
          <RadioGroup
            value={showPrivateInsurance ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasPrivate = value === "ja";
              setShowPrivateInsurance(hasPrivate);
              updateData({ hasPrivateHealthInsurance: hasPrivate });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="pkv-yes" className="border-white/40" />
              <Label htmlFor="pkv-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="pkv-no" className="border-white/40" />
              <Label htmlFor="pkv-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        {showPrivateInsurance && (
          <div className="space-y-2">
            <Label htmlFor="pkvProof" className="text-[hsl(var(--glass-text))]">Nachweis Privatkrankenversicherung *</Label>
            <Input
              id="pkvProof"
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={(e) => updateData({ privateHealthInsuranceProof: e.target.files ? Array.from(e.target.files) : [] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80 text-white hover:opacity-90"
        >
          Weiter
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FinancesStepBaufi;