import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { SelbstauskunftFormData } from "@/pages/Selbstauskunft";
import { toast } from "sonner";

interface PurposeStepProps {
  formData: SelbstauskunftFormData;
  updateFormData: (data: Partial<SelbstauskunftFormData>) => void;
  onNext: () => void;
}

const PurposeStep = ({ formData, updateFormData, onNext }: PurposeStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.loanPurpose || !formData.loanAmount) {
      toast.error("Bitte geben Sie den Verwendungszweck und den gewünschten Kreditbetrag an");
      return;
    }

    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      toast.error("Bitte akzeptieren Sie die AGB und Datenschutzerklärung");
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-6">
          Verwendungszweck
        </h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="loanAmount" className="text-[hsl(var(--glass-text))]">
          Gewünschter Kreditbetrag *
        </Label>
        <Input
          id="loanAmount"
          type="number"
          step="100"
          value={formData.loanAmount}
          onChange={(e) => updateFormData({ loanAmount: e.target.value })}
          placeholder="0,00 €"
          required
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="loanPurpose" className="text-[hsl(var(--glass-text))]">
          Verwendungszweck des Kredits *
        </Label>
        <Textarea
          id="loanPurpose"
          value={formData.loanPurpose}
          onChange={(e) => updateFormData({ loanPurpose: e.target.value })}
          placeholder="Wofür möchten Sie den Kredit verwenden? (z.B. Umschuldung, Auto, Renovierung, etc.)"
          rows={4}
          required
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 resize-none"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-white/20">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => updateFormData({ acceptTerms: checked as boolean })}
            className="mt-1 border-white/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="acceptTerms"
            className="text-sm text-[hsl(var(--glass-text))] cursor-pointer leading-relaxed"
          >
            Ich akzeptiere die{" "}
            <a href="/agb" target="_blank" className="underline hover:text-primary">
              Allgemeinen Geschäftsbedingungen
            </a>
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptPrivacy"
            checked={formData.acceptPrivacy}
            onCheckedChange={(checked) => updateFormData({ acceptPrivacy: checked as boolean })}
            className="mt-1 border-white/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="acceptPrivacy"
            className="text-sm text-[hsl(var(--glass-text))] cursor-pointer leading-relaxed"
          >
            Ich habe die{" "}
            <a href="/datenschutz" target="_blank" className="underline hover:text-primary">
              Datenschutzerklärung
            </a>{" "}
            zur Kenntnis genommen
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full text-base h-12 group"
      >
        Absenden
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

export default PurposeStep;
