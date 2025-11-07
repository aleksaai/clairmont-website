import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface PersonalInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalInfoStep = ({ data, updateData, onNext, onBack }: PersonalInfoStepProps) => {
  const [showAlternativeAddress, setShowAlternativeAddress] = useState(data.differentAddress);

  const handleNext = () => {
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.birthDate || !data.gender || !data.nationality || 
        !data.email || !data.personalInfo?.street || !data.personalInfo?.zipCode || !data.personalInfo?.city) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Persönliche Angaben
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte geben Sie Ihre persönlichen Daten ein.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[hsl(var(--glass-text))]">
              Vorname *
            </Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              placeholder="Max"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-[hsl(var(--glass-text))]">
              Nachname *
            </Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              placeholder="Mustermann"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-[hsl(var(--glass-text))]">
            Geburtsdatum *
          </Label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate}
            onChange={(e) => updateData({ birthDate: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[hsl(var(--glass-text))]">
            Geschlecht *
          </Label>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="männlich">Männlich</SelectItem>
              <SelectItem value="weiblich">Weiblich</SelectItem>
              <SelectItem value="divers">Divers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality" className="text-[hsl(var(--glass-text))]">
            Staatsangehörigkeit *
          </Label>
          <Input
            id="nationality"
            value={data.nationality}
            onChange={(e) => updateData({ nationality: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="Deutsch"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[hsl(var(--glass-text))]">
            E-Mail-Adresse *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="ihre.email@beispiel.de"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street" className="text-[hsl(var(--glass-text))]">
            Strasse und Hausnummer *
          </Label>
          <Input
            id="street"
            value={data.personalInfo?.street || ""}
            onChange={(e) => updateData({ 
              personalInfo: { ...data.personalInfo, street: e.target.value }
            })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="Musterstrasse 123"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-[hsl(var(--glass-text))]">
              PLZ *
            </Label>
            <Input
              id="zipCode"
              value={data.personalInfo?.zipCode || ""}
              onChange={(e) => updateData({ 
                personalInfo: { ...data.personalInfo, zipCode: e.target.value }
              })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              placeholder="8000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-[hsl(var(--glass-text))]">
              Ort *
            </Label>
            <Input
              id="city"
              value={data.personalInfo?.city || ""}
              onChange={(e) => updateData({ 
                personalInfo: { ...data.personalInfo, city: e.target.value }
              })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              placeholder="Zürich"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Weicht die Adresse auf dem Lohnsteuerbescheid ab?
          </Label>
          <RadioGroup
            value={showAlternativeAddress ? "ja" : "nein"}
            onValueChange={(value) => {
              const isDifferent = value === "ja";
              setShowAlternativeAddress(isDifferent);
              updateData({ differentAddress: isDifferent });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="different-yes" className="border-white/40" />
              <Label htmlFor="different-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="different-no" className="border-white/40" />
              <Label htmlFor="different-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showAlternativeAddress && (
          <div className="space-y-2">
            <Label htmlFor="alternativeAddress" className="text-[hsl(var(--glass-text))]">
              Abweichende Adresse
            </Label>
            <Input
              id="alternativeAddress"
              value={data.alternativeAddress || ""}
              onChange={(e) => updateData({ alternativeAddress: e.target.value })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              placeholder="Straße, Hausnummer, PLZ, Ort"
            />
          </div>
        )}
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

export default PersonalInfoStep;
