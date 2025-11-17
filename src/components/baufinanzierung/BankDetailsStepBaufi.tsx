import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BaufiFormData } from "@/pages/BaufinanzierungSelbstauskunft";

interface BankDetailsStepBaufiProps {
  data: BaufiFormData;
  updateData: (data: Partial<BaufiFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BankDetailsStepBaufi = ({ data, updateData, onNext, onBack }: BankDetailsStepBaufiProps) => {
  const handleSubmit = () => {
    if (!data.iban) {
      alert("Bitte geben Sie Ihre IBAN ein.");
      return;
    }
    if (!data.confirmCorrectness || !data.acceptTerms || !data.acceptPrivacy) {
      alert("Bitte bestätigen Sie alle erforderlichen Felder.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Bankdaten & Bestätigung
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Fast geschafft! Bitte geben Sie Ihre Bankdaten an.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="iban" className="text-[hsl(var(--glass-text))]">
            IBAN *
          </Label>
          <Input
            id="iban"
            value={data.iban}
            onChange={(e) => updateData({ iban: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="DE89 3704 0044 0532 0130 00"
          />
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="confirmCorrectness"
              checked={data.confirmCorrectness}
              onCheckedChange={(checked) => updateData({ confirmCorrectness: checked as boolean })}
              className="mt-0.5 border-white/40"
            />
            <Label
              htmlFor="confirmCorrectness"
              className="text-[hsl(var(--glass-text))] font-normal cursor-pointer leading-relaxed"
            >
              Ich bestätige, dass alle Angaben korrekt sind. *
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="acceptTerms"
              checked={data.acceptTerms}
              onCheckedChange={(checked) => updateData({ acceptTerms: checked as boolean })}
              className="mt-0.5 border-white/40"
            />
            <Label
              htmlFor="acceptTerms"
              className="text-[hsl(var(--glass-text))] font-normal cursor-pointer leading-relaxed"
            >
              Ich akzeptiere die{" "}
              <a href="/agb" target="_blank" className="underline hover:text-[hsl(var(--glass-text))]/80">
                AGB
              </a>
              . *
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="acceptPrivacy"
              checked={data.acceptPrivacy}
              onCheckedChange={(checked) => updateData({ acceptPrivacy: checked as boolean })}
              className="mt-0.5 border-white/40"
            />
            <Label
              htmlFor="acceptPrivacy"
              className="text-[hsl(var(--glass-text))] font-normal cursor-pointer leading-relaxed"
            >
              Ich stimme der{" "}
              <a
                href="/datenschutz"
                target="_blank"
                className="underline hover:text-[hsl(var(--glass-text))]/80"
              >
                Datenschutzerklärung
              </a>{" "}
              zu. *
            </Label>
          </div>
        </div>
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
          onClick={handleSubmit}
          size="lg"
          className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80 text-white hover:opacity-90"
        >
          Anfrage absenden
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BankDetailsStepBaufi;