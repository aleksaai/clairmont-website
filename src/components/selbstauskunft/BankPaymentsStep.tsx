import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { SelbstauskunftFormData } from "@/pages/Selbstauskunft";
import { toast } from "sonner";

interface BankPaymentsStepProps {
  formData: SelbstauskunftFormData;
  updateFormData: (data: Partial<SelbstauskunftFormData>) => void;
  onNext: () => void;
}

const BankPaymentsStep = ({ formData, updateFormData, onNext }: BankPaymentsStepProps) => {
  const validateIBAN = (iban: string) => {
    // Basic IBAN validation (DE IBAN has 22 characters)
    const cleanIban = iban.replace(/\s/g, '');
    return cleanIban.length >= 15 && cleanIban.length <= 34;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.iban) {
      toast.error("Bitte geben Sie Ihre IBAN an");
      return;
    }

    if (!validateIBAN(formData.iban)) {
      toast.error("Bitte geben Sie eine gültige IBAN ein");
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-6">
          Bank & Zahlungen
        </h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="iban" className="text-[hsl(var(--glass-text))]">
          IBAN für Auszahlung *
        </Label>
        <Input
          id="iban"
          value={formData.iban}
          onChange={(e) => updateFormData({ iban: e.target.value.toUpperCase() })}
          placeholder="DE89 3704 0044 0532 0130 00"
          required
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bankStatements" className="text-[hsl(var(--glass-text))]">
          Kontoauszüge *
        </Label>
        <Input
          id="bankStatements"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            updateFormData({ bankStatements: files });
          }}
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <p className="text-xs text-[hsl(var(--glass-text))]/60">
          Aktueller Monat oder letzte 4 Wochen
        </p>
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

export default BankPaymentsStep;
