import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Plus, X } from "lucide-react";
import { SelbstauskunftFormData } from "@/pages/Selbstauskunft";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ObligationsStepProps {
  formData: SelbstauskunftFormData;
  updateFormData: (data: Partial<SelbstauskunftFormData>) => void;
  onNext: () => void;
}

const ObligationsStep = ({ formData, updateFormData, onNext }: ObligationsStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addLoan = () => {
    updateFormData({
      existingLoans: [...formData.existingLoans, { type: "", amount: "", monthlyPayment: "" }]
    });
  };

  const removeLoan = (index: number) => {
    const newLoans = formData.existingLoans.filter((_, i) => i !== index);
    updateFormData({ existingLoans: newLoans });
  };

  const updateLoan = (index: number, field: string, value: string) => {
    const newLoans = [...formData.existingLoans];
    newLoans[index] = { ...newLoans[index], [field]: value };
    updateFormData({ existingLoans: newLoans });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-6">
          Verpflichtungen
        </h2>
        <p className="text-sm text-[hsl(var(--glass-text))]/70">
          Bitte geben Sie alle bestehenden Kredite und Verpflichtungen an
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-[hsl(var(--glass-text))]">
            Bestehende Kredite (inkl. 0%-Finanzierungen)
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLoan}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Kredit hinzufügen
          </Button>
        </div>

        {formData.existingLoans.map((loan, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-[hsl(var(--glass-text))]">
                Kredit {index + 1}
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeLoan(index)}
                className="text-[hsl(var(--glass-text))]/70 hover:text-[hsl(var(--glass-text))] hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <Select
                value={loan.type}
                onValueChange={(value) => updateLoan(index, "type", value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]">
                  <SelectValue placeholder="Art des Kredits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ratenkredit">Ratenkredit</SelectItem>
                  <SelectItem value="autokredit">Autokredit</SelectItem>
                  <SelectItem value="baufinanzierung">Baufinanzierung</SelectItem>
                  <SelectItem value="0prozent">0%-Finanzierung</SelectItem>
                  <SelectItem value="dispo">Dispositionskredit</SelectItem>
                  <SelectItem value="sonstige">Sonstige</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                step="0.01"
                placeholder="Restschuld in €"
                value={loan.amount}
                onChange={(e) => updateLoan(index, "amount", e.target.value)}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              />
              <Input
                type="number"
                step="0.01"
                placeholder="Monatliche Rate in €"
                value={loan.monthlyPayment}
                onChange={(e) => updateLoan(index, "monthlyPayment", e.target.value)}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="alimonyObligations" className="text-[hsl(var(--glass-text))]">
          Unterhaltsverpflichtungen (optional)
        </Label>
        <Textarea
          id="alimonyObligations"
          value={formData.alimonyObligations || ""}
          onChange={(e) => updateFormData({ alimonyObligations: e.target.value })}
          placeholder="Kinder- oder Ehegattenunterhalt (Betrag und Empfänger)"
          rows={3}
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherObligations" className="text-[hsl(var(--glass-text))]">
          Sonstige zivilrechtliche Verpflichtungen (optional)
        </Label>
        <Textarea
          id="otherObligations"
          value={formData.otherObligations || ""}
          onChange={(e) => updateFormData({ otherObligations: e.target.value })}
          placeholder="Bitte beschreiben Sie weitere Verpflichtungen"
          rows={3}
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 resize-none"
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

export default ObligationsStep;
