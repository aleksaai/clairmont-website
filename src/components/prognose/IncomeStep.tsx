import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface IncomeStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const IncomeStep = ({ data, updateData, onNext, onBack }: IncomeStepProps) => {
  const [showBusinessType, setShowBusinessType] = useState(data.hasBusiness);
  const [showCryptoInfo, setShowCryptoInfo] = useState(data.hasCryptoIncome);
  const [showSocialBenefitsDetails, setShowSocialBenefitsDetails] = useState(data.hasSocialBenefits);

  const taxYears = ["2022", "2023", "2024", "2025"];

  const handleTaxYearToggle = (year: string, checked: boolean) => {
    const newYears = checked
      ? [...data.taxYears, year]
      : data.taxYears.filter((y) => y !== year);
    updateData({ taxYears: newYears });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Einkommen & Einkünfte
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Angaben zu Ihren Einkommensquellen.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Haben Sie ein Gewerbe?
          </Label>
          <RadioGroup
            value={showBusinessType ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasBiz = value === "ja";
              setShowBusinessType(hasBiz);
              updateData({ hasBusiness: hasBiz });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="business-yes" className="border-white/40" />
              <Label htmlFor="business-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="business-no" className="border-white/40" />
              <Label htmlFor="business-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showBusinessType && (
          <div className="space-y-2">
            <Label className="text-[hsl(var(--glass-text))]">Art des Gewerbes</Label>
            <Select value={data.businessType} onValueChange={(value) => updateData({ businessType: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]">
                <SelectValue placeholder="Bitte wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kleingewerbe">Kleingewerbe</SelectItem>
                <SelectItem value="anderes">Anderes Gewerbe</SelectItem>
              </SelectContent>
            </Select>
            {data.businessType === "kleingewerbe" && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mt-2">
                <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[hsl(var(--glass-text))]/80">
                  Bei Kleingewerbe kontaktieren wir Sie telefonisch für weitere Details.
                </p>
              </div>
            )}
            {data.businessType === "anderes" && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mt-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[hsl(var(--glass-text))]/80">
                  Bei anderen Gewerben ist eventuell keine Übernahme möglich. Wir prüfen dies individuell.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Haben Sie weitere Einkünfte? (z.B. Kryptowährungen, Aktien, Trading, Vermietung, etc.)
          </Label>
          <RadioGroup
            value={showCryptoInfo ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasCrypto = value === "ja";
              setShowCryptoInfo(hasCrypto);
              updateData({ hasCryptoIncome: hasCrypto });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="crypto-yes" className="border-white/40" />
              <Label htmlFor="crypto-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="crypto-no" className="border-white/40" />
              <Label htmlFor="crypto-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
          {showCryptoInfo && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[hsl(var(--glass-text))]/80">
                Im nächsten Schritt können Sie Ihre Transaktionsübersichten hochladen.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Haben Sie im betreffenden Zeitraum ALG oder andere staatliche Sozialleistungen erhalten?
          </Label>
          <RadioGroup
            value={showSocialBenefitsDetails ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasBenefits = value === "ja";
              setShowSocialBenefitsDetails(hasBenefits);
              updateData({ hasSocialBenefits: hasBenefits });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="benefits-yes" className="border-white/40" />
              <Label htmlFor="benefits-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="benefits-no" className="border-white/40" />
              <Label htmlFor="benefits-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showSocialBenefitsDetails && (
          <>
            <div className="space-y-2">
              <Label htmlFor="socialBenefitDetails" className="text-[hsl(var(--glass-text))]">
                Zeitraum und Art der Leistung
              </Label>
              <Input
                id="socialBenefitDetails"
                value={data.socialBenefitDetails || ""}
                onChange={(e) => updateData({ socialBenefitDetails: e.target.value })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="z.B. ALG I von 01/2024 bis 06/2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialBenefitAmount" className="text-[hsl(var(--glass-text))]">
                Summe der erhaltenen Leistung (in €) *
              </Label>
              <Input
                id="socialBenefitAmount"
                type="number"
                value={data.socialBenefitAmount || ""}
                onChange={(e) => updateData({ socialBenefitAmount: e.target.value })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="0"
              />
            </div>
          </>
        )}

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Steuerbescheide vorhanden?
          </Label>
          <p className="text-sm text-[hsl(var(--glass-text))]/60">
            Bitte wählen Sie die Jahre aus, für die Sie Steuerbescheide haben
          </p>
          <div className="space-y-2">
            {taxYears.map((year) => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox
                  id={`tax-year-${year}`}
                  checked={data.taxYears.includes(year)}
                  onCheckedChange={(checked) => handleTaxYearToggle(year, checked as boolean)}
                  className="border-white/40"
                />
                <Label htmlFor={`tax-year-${year}`} className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                  {year}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-xs text-[hsl(var(--glass-text))]/60 mt-2">
            Hinweis: Steuerbescheide müssen lückenlos eingereicht werden. Fehlende Monate bitte im nächsten Schritt begründen.
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
          onClick={onNext}
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

export default IncomeStep;
