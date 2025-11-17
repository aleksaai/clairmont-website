import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { SelbstauskunftFormData } from "@/pages/Selbstauskunft";
import { toast } from "sonner";

interface IncomeJobStepProps {
  formData: SelbstauskunftFormData;
  updateFormData: (data: Partial<SelbstauskunftFormData>) => void;
  onNext: () => void;
}

const IncomeJobStep = ({ formData, updateFormData, onNext }: IncomeJobStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobTitle) {
      toast.error("Bitte geben Sie Ihre Berufsbezeichnung an");
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-6">
          Einkommen & Beruf
        </h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-[hsl(var(--glass-text))]">
          Berufsbezeichnung *
        </Label>
        <Input
          id="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => updateFormData({ jobTitle: e.target.value })}
          required
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="paySlips" className="text-[hsl(var(--glass-text))]">
          2-3 aktuelle Gehaltsabrechnungen *
        </Label>
        <Input
          id="paySlips"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            updateFormData({ paySlips: files });
          }}
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <p className="text-xs text-[hsl(var(--glass-text))]/60">
          Bitte laden Sie Ihre letzten 2-3 Gehaltsabrechnungen hoch
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="salaryProof" className="text-[hsl(var(--glass-text))]">
          Letzter Gehaltsnachweis im Original *
        </Label>
        <Input
          id="salaryProof"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            updateFormData({ salaryProof: files });
          }}
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <p className="text-xs text-[hsl(var(--glass-text))]/60">
          Digital möglich
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rentWarm" className="text-[hsl(var(--glass-text))]">
          Warmmiete (falls zur Miete) (optional)
        </Label>
        <Input
          id="rentWarm"
          type="number"
          step="0.01"
          value={formData.rentWarm || ""}
          onChange={(e) => updateFormData({ rentWarm: e.target.value })}
          placeholder="0,00 €"
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
        />
      </div>

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

export default IncomeJobStep;
