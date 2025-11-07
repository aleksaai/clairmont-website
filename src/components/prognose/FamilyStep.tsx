import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Upload } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface FamilyStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const FamilyStep = ({ data, updateData, onNext, onBack }: FamilyStepProps) => {
  const [showSpouseQuestions, setShowSpouseQuestions] = useState(data.maritalStatus === "verheiratet");
  const [showSpouseEmployed, setShowSpouseEmployed] = useState(data.spouseEmployed || false);

  const handleMaritalStatusChange = (value: string) => {
    const isMarried = value === "verheiratet";
    setShowSpouseQuestions(isMarried);
    updateData({ maritalStatus: value });
  };

  const handleNext = () => {
    if (!data.maritalStatus) {
      alert("Bitte geben Sie Ihren Familienstand an.");
      return;
    }
    
    // Validation for married
    if (data.maritalStatus === "verheiratet") {
      if (!data.marriedSince) {
        alert("Bitte geben Sie an, seit wann Sie verheiratet sind.");
        return;
      }
      if (!data.spouseName || data.spouseName.trim() === "") {
        alert("Bitte geben Sie den Namen Ihres Ehepartners an.");
        return;
      }
    }
    
    // Validation for divorced
    if (data.maritalStatus === "geschieden" && !data.divorceDate) {
      alert("Bitte geben Sie das Datum der Scheidung an.");
      return;
    }
    
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Familiensituation
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Informationen zu Ihrem Familienstand.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[hsl(var(--glass-text))]">
            Familienstand *
          </Label>
          <Select value={data.maritalStatus} onValueChange={handleMaritalStatusChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ledig">Ledig</SelectItem>
              <SelectItem value="verheiratet">Verheiratet</SelectItem>
              <SelectItem value="geschieden">Geschieden</SelectItem>
              <SelectItem value="verwitwet">Verwitwet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.maritalStatus === "geschieden" && (
          <div className="space-y-2">
            <Label htmlFor="divorceDate" className="text-[hsl(var(--glass-text))]">
              Datum der Scheidung *
            </Label>
            <Input
              id="divorceDate"
              type="date"
              value={data.divorceDate || ""}
              onChange={(e) => updateData({ divorceDate: e.target.value })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
            />
          </div>
        )}

        {showSpouseQuestions && (
          <>
            <div className="space-y-2">
              <Label htmlFor="marriedSince" className="text-[hsl(var(--glass-text))]">
                Seit wann verheiratet? *
              </Label>
              <Input
                id="marriedSince"
                type="date"
                value={data.marriedSince || ""}
                onChange={(e) => updateData({ marriedSince: e.target.value })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseName" className="text-[hsl(var(--glass-text))]">
                Name des Ehepartners *
              </Label>
              <Input
                id="spouseName"
                value={data.spouseName || ""}
                onChange={(e) => updateData({ spouseName: e.target.value })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="Vor- und Nachname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseBirthDate" className="text-[hsl(var(--glass-text))]">
                Geburtsdatum des Ehepartners
              </Label>
              <Input
                id="spouseBirthDate"
                type="date"
                value={data.spouseBirthDate || ""}
                onChange={(e) => updateData({ spouseBirthDate: e.target.value })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseOccupation" className="text-[hsl(var(--glass-text))]">
                Beruf des Ehepartners
              </Label>
              <Input
                id="spouseOccupation"
                value={data.spouseOccupation || ""}
                onChange={(e) => updateData({ spouseOccupation: e.target.value })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                placeholder="z.B. Ingenieur, Lehrer, etc."
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[hsl(var(--glass-text))]">
                Ist der Ehepartner berufstätig?
              </Label>
              <RadioGroup
                value={showSpouseEmployed ? "ja" : "nein"}
                onValueChange={(value) => {
                  const isEmployed = value === "ja";
                  setShowSpouseEmployed(isEmployed);
                  updateData({ spouseEmployed: isEmployed });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ja" id="spouse-employed-yes" className="border-white/40" />
                  <Label htmlFor="spouse-employed-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                    Ja
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nein" id="spouse-employed-no" className="border-white/40" />
                  <Label htmlFor="spouse-employed-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                    Nein
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {showSpouseEmployed && (
              <div className="space-y-2">
                <Label htmlFor="spouseTaxDocument" className="text-[hsl(var(--glass-text))]">
                  Steuerbescheid des Ehepartners hochladen
                </Label>
                <div className="relative">
                  <Input
                    id="spouseTaxDocument"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) updateData({ spouseTaxDocument: file });
                    }}
                    className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
                  />
                </div>
                <p className="text-xs text-[hsl(var(--glass-text))]/60">
                  PDF, JPG oder PNG (max. 10MB)
                </p>
              </div>
            )}
          </>
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

export default FamilyStep;
