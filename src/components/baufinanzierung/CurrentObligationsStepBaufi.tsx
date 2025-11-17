import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { BaufiFormData } from "@/pages/BaufinanzierungSelbstauskunft";
import { useState } from "react";

interface CurrentObligationsStepBaufiProps {
  data: BaufiFormData;
  updateData: (data: Partial<BaufiFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CurrentObligationsStepBaufi = ({ data, updateData, onNext, onBack }: CurrentObligationsStepBaufiProps) => {
  const [showOtherObligations, setShowOtherObligations] = useState(data.hasOtherObligations);

  const addLoan = () => {
    updateData({
      currentLoans: [...data.currentLoans, { lender: "", monthlyRate: "", remainingDebt: "", isToBeReplaced: false }]
    });
  };

  const removeLoan = (index: number) => {
    updateData({
      currentLoans: data.currentLoans.filter((_, i) => i !== index)
    });
  };

  const updateLoan = (index: number, field: string, value: string | boolean) => {
    const newLoans = [...data.currentLoans];
    newLoans[index] = { ...newLoans[index], [field]: value };
    updateData({ currentLoans: newLoans });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Laufende Verpflichtungen
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte geben Sie Ihre laufenden Kredite und Verpflichtungen an.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-[hsl(var(--glass-text))] text-lg font-medium">Laufende Kredite</Label>
          
          {data.currentLoans.length === 0 ? (
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
              <p className="text-[hsl(var(--glass-text))]/60 text-sm">
                Noch keine Kredite hinzugefügt
              </p>
            </div>
          ) : (
            data.currentLoans.map((loan, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-[hsl(var(--glass-text))] font-medium">Kredit {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLoan(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <Input
                    placeholder="Kreditgeber"
                    value={loan.lender}
                    onChange={(e) => updateLoan(index, "lender", e.target.value)}
                    className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Monatliche Rate (€)"
                      type="number"
                      value={loan.monthlyRate}
                      onChange={(e) => updateLoan(index, "monthlyRate", e.target.value)}
                      className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                    />
                    <Input
                      placeholder="Restschuld (€)"
                      type="number"
                      value={loan.remainingDebt}
                      onChange={(e) => updateLoan(index, "remainingDebt", e.target.value)}
                      className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`replace-${index}`}
                      checked={loan.isToBeReplaced}
                      onCheckedChange={(checked) => updateLoan(index, "isToBeReplaced", checked as boolean)}
                      className="border-white/40"
                    />
                    <Label htmlFor={`replace-${index}`} className="text-[hsl(var(--glass-text))] font-normal cursor-pointer text-sm">
                      Dieser Kredit soll abgelöst werden
                    </Label>
                  </div>
                </div>
              </div>
            ))
          )}

          <Button
            type="button"
            variant="outline"
            onClick={addLoan}
            className="w-full bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
          >
            <Plus className="mr-2 h-4 w-4" />
            Kredit hinzufügen
          </Button>
        </div>

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Haben Sie weitere Verpflichtungen?</Label>
          <p className="text-sm text-[hsl(var(--glass-text))]/60">
            z.B. Unterhaltszahlungen, Privatkredite ohne Grundpfandrecht
          </p>
          <RadioGroup
            value={showOtherObligations ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasOther = value === "ja";
              setShowOtherObligations(hasOther);
              updateData({ hasOtherObligations: hasOther });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="obligations-yes" className="border-white/40" />
              <Label htmlFor="obligations-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="obligations-no" className="border-white/40" />
              <Label htmlFor="obligations-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        {showOtherObligations && (
          <div className="space-y-2">
            <Label htmlFor="otherObligations" className="text-[hsl(var(--glass-text))]">
              Bitte beschreiben Sie Ihre weiteren Verpflichtungen
            </Label>
            <Textarea
              id="otherObligations"
              value={data.otherObligations || ""}
              onChange={(e) => updateData({ otherObligations: e.target.value })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 min-h-[100px]"
              placeholder="Art der Verpflichtung und monatliche Belastung..."
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
          onClick={onNext}
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

export default CurrentObligationsStepBaufi;