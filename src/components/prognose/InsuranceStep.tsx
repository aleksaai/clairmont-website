import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface InsuranceStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const InsuranceStep = ({ data, updateData, onNext, onBack }: InsuranceStepProps) => {
  const [showUnionFee, setShowUnionFee] = useState(data.isUnionMember);
  const [showOtherMemberships, setShowOtherMemberships] = useState(data.hasOtherMemberships);

  const addInsurance = () => {
    updateData({
      insurances: [...data.insurances, { type: "", provider: "", yearlyContribution: "" }],
    });
  };

  const removeInsurance = (index: number) => {
    updateData({
      insurances: data.insurances.filter((_, i) => i !== index),
    });
  };

  const updateInsurance = (index: number, field: string, value: string) => {
    const newInsurances = [...data.insurances];
    newInsurances[index] = { ...newInsurances[index], [field]: value };
    updateData({ insurances: newInsurances });
  };

  const handleNext = () => {
    // Validate union name if member
    if (data.isUnionMember && (!data.unionName || data.unionName.trim() === "")) {
      alert("Bitte geben Sie den Namen der Gewerkschaft an.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Mitgliedschaften & Versicherungen
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Angaben zu Mitgliedschaften und Versicherungen.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Sind Sie Mitglied einer Gewerkschaft?
          </Label>
          <RadioGroup
            value={showUnionFee ? "ja" : "nein"}
            onValueChange={(value) => {
              const isMember = value === "ja";
              setShowUnionFee(isMember);
              updateData({ isUnionMember: isMember });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="union-yes" className="border-white/40" />
              <Label htmlFor="union-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="union-no" className="border-white/40" />
              <Label htmlFor="union-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showUnionFee && (
          <>
            <div className="space-y-2">
              <Label htmlFor="unionName" className="text-[hsl(var(--glass-text))]">
                Name der Gewerkschaft *
              </Label>
              <Input
                id="unionName"
                value={data.unionName || ""}
                onChange={(e) => updateData({ unionName: e.target.value })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="z.B. IG Metall, ver.di"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unionFee" className="text-[hsl(var(--glass-text))]">
                Höhe des Beitrags (€)
              </Label>
              <Input
                id="unionFee"
                type="number"
                value={data.unionFee || ""}
                onChange={(e) => updateData({ unionFee: e.target.value })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="0"
              />
            </div>
          </>
        )}

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Haben Sie sonstige Mitgliedschaften oder Bezüge?
          </Label>
          <p className="text-sm text-[hsl(var(--glass-text))]/60">
            z.B. Sozialleistungen, Witwenrente, etc.
          </p>
          <RadioGroup
            value={showOtherMemberships ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasOther = value === "ja";
              setShowOtherMemberships(hasOther);
              updateData({ hasOtherMemberships: hasOther });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="other-yes" className="border-white/40" />
              <Label htmlFor="other-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="other-no" className="border-white/40" />
              <Label htmlFor="other-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showOtherMemberships && (
          <div className="space-y-2">
            <Label htmlFor="otherMembershipsDetails" className="text-[hsl(var(--glass-text))]">
              Bitte angeben
            </Label>
            <Input
              id="otherMembershipsDetails"
              value={data.otherMembershipsDetails || ""}
              onChange={(e) => updateData({ otherMembershipsDetails: e.target.value })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              placeholder="Details zu Mitgliedschaften oder Bezügen"
            />
          </div>
        )}

        <div className="space-y-4">
          <Label className="text-[hsl(var(--glass-text))]">
            Welche Versicherungen haben Sie?
          </Label>

          {data.insurances.length === 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={addInsurance}
              className="w-full rounded-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Versicherung hinzufügen
            </Button>
          )}

          {data.insurances.map((insurance, index) => (
            <div key={index} className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[hsl(var(--glass-text))]">
                  Versicherung {index + 1}
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInsurance(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-[hsl(var(--glass-text))] text-sm">
                  Art der Versicherung
                </Label>
                <Input
                  value={insurance.type}
                  onChange={(e) => updateInsurance(index, "type", e.target.value)}
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                  placeholder="z.B. Haftpflicht, Hausrat, Rechtsschutz"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[hsl(var(--glass-text))] text-sm">
                  Versicherungsanbieter
                </Label>
                <Input
                  value={insurance.provider}
                  onChange={(e) => updateInsurance(index, "provider", e.target.value)}
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                  placeholder="z.B. Allianz, AXA, ERGO"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[hsl(var(--glass-text))] text-sm">
                  Jahresbeitrag (in €)
                </Label>
                <Input
                  type="number"
                  value={insurance.yearlyContribution || ""}
                  onChange={(e) => updateInsurance(index, "yearlyContribution", e.target.value)}
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                  placeholder="0"
                />
              </div>
            </div>
          ))}

          {data.insurances.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={addInsurance}
              className="w-full rounded-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Weitere Versicherung hinzufügen
            </Button>
          )}
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

export default InsuranceStep;
