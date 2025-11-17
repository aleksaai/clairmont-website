import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";
import { SelbstauskunftFormData } from "@/pages/Selbstauskunft";

interface InsuranceStepSelbstProps {
  formData: SelbstauskunftFormData;
  updateFormData: (data: Partial<SelbstauskunftFormData>) => void;
  onNext: () => void;
}

const InsuranceStepSelbst = ({ formData, updateFormData, onNext }: InsuranceStepSelbstProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-6">
          Versicherung
        </h2>
      </div>

      <div className="space-y-4">
        <Label className="text-[hsl(var(--glass-text))]">
          Sind Sie privat krankenversichert?
        </Label>
        <RadioGroup
          value={formData.hasPrivateInsurance ? "yes" : "no"}
          onValueChange={(value) => updateFormData({ hasPrivateInsurance: value === "yes" })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="insurance-yes" className="border-white/40 text-primary" />
            <Label htmlFor="insurance-yes" className="text-[hsl(var(--glass-text))] cursor-pointer font-normal">
              Ja
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="insurance-no" className="border-white/40 text-primary" />
            <Label htmlFor="insurance-no" className="text-[hsl(var(--glass-text))] cursor-pointer font-normal">
              Nein
            </Label>
          </div>
        </RadioGroup>
      </div>

      {formData.hasPrivateInsurance && (
        <div className="space-y-2">
          <Label htmlFor="insuranceContract" className="text-[hsl(var(--glass-text))]">
            Versicherungsvertrag hochladen *
          </Label>
          <Input
            id="insuranceContract"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              updateFormData({ insuranceContract: files });
            }}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full text-base h-12 group"
      >
        Weiter
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

export default InsuranceStepSelbst;
