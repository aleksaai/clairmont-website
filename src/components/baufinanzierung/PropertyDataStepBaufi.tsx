import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { BaufiFormData } from "@/pages/BaufinanzierungSelbstauskunft";
import { useState } from "react";

interface PropertyDataStepBaufiProps {
  data: BaufiFormData;
  updateData: (data: Partial<BaufiFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PropertyDataStepBaufi = ({ data, updateData, onNext, onBack }: PropertyDataStepBaufiProps) => {
  const [showRental, setShowRental] = useState(data.isRented);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Objektdaten zur Immobilie
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte laden Sie alle relevanten Dokumente zur Immobilie hoch.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Besitzen Sie einen Grundbuchauszug?</Label>
          <RadioGroup
            value={data.hasLandRegisterExtract ? "ja" : "nein"}
            onValueChange={(value) => updateData({ hasLandRegisterExtract: value === "ja" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="gba-yes" className="border-white/40" />
              <Label htmlFor="gba-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="gba-no" className="border-white/40" />
              <Label htmlFor="gba-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
          {data.hasLandRegisterExtract ? (
            <div className="space-y-2 pt-2">
              <Label htmlFor="landRegister" className="text-[hsl(var(--glass-text))] text-sm">Grundbuchauszug hochladen</Label>
              <Input
                id="landRegister"
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={(e) => updateData({ landRegisterExtract: e.target.files ? Array.from(e.target.files) : [] })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
              />
            </div>
          ) : (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[hsl(var(--glass-text))]/80">
                Kein Problem, wir können den Grundbuchauszug gemeinsam bestellen.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Besitzen Sie einen Energieausweis?</Label>
          <RadioGroup
            value={data.hasEnergyCertificate ? "ja" : "nein"}
            onValueChange={(value) => updateData({ hasEnergyCertificate: value === "ja" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="energy-yes" className="border-white/40" />
              <Label htmlFor="energy-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="energy-no" className="border-white/40" />
              <Label htmlFor="energy-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
          {data.hasEnergyCertificate ? (
            <div className="space-y-2 pt-2">
              <Label htmlFor="energyCert" className="text-[hsl(var(--glass-text))] text-sm">Energieausweis hochladen</Label>
              <Input
                id="energyCert"
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={(e) => updateData({ energyCertificate: e.target.files ? Array.from(e.target.files) : [] })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
              />
            </div>
          ) : (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[hsl(var(--glass-text))]/80">
                Wir unterstützen Sie gerne bei der Erstellung eines Energieausweises.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Besitzen Sie eine Wohnflächenberechnung?</Label>
          <RadioGroup
            value={data.hasLivingSpaceCalculation ? "ja" : "nein"}
            onValueChange={(value) => updateData({ hasLivingSpaceCalculation: value === "ja" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="space-yes" className="border-white/40" />
              <Label htmlFor="space-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="space-no" className="border-white/40" />
              <Label htmlFor="space-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
          {data.hasLivingSpaceCalculation ? (
            <div className="space-y-2 pt-2">
              <Label htmlFor="livingSpace" className="text-[hsl(var(--glass-text))] text-sm">Wohnflächenberechnung hochladen</Label>
              <Input
                id="livingSpace"
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={(e) => updateData({ livingSpaceCalculation: e.target.files ? Array.from(e.target.files) : [] })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
              />
            </div>
          ) : (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[hsl(var(--glass-text))]/80">
                Gemeinsame Erstellung der Wohnflächenberechnung ist möglich.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cadastralMap" className="text-[hsl(var(--glass-text))]">Flurkarte (optional)</Label>
          <Input
            id="cadastralMap"
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={(e) => updateData({ cadastralMap: e.target.files ? Array.from(e.target.files) : [] })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="division" className="text-[hsl(var(--glass-text))]">Teilungserklärung + Teilungsplan (optional)</Label>
          <Input
            id="division"
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={(e) => updateData({ divisionDeclaration: e.target.files ? Array.from(e.target.files) : [] })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="buildingPlans" className="text-[hsl(var(--glass-text))]">Baupläne (optional)</Label>
          <Input
            id="buildingPlans"
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={(e) => updateData({ buildingPlans: e.target.files ? Array.from(e.target.files) : [] })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="photosInterior" className="text-[hsl(var(--glass-text))] text-sm">Fotos Innenbereich</Label>
            <Input
              id="photosInterior"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => updateData({ photosInterior: e.target.files ? Array.from(e.target.files) : [] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photosExterior" className="text-[hsl(var(--glass-text))] text-sm">Fotos Außenbereich</Label>
            <Input
              id="photosExterior"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => updateData({ photosExterior: e.target.files ? Array.from(e.target.files) : [] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Label className="text-[hsl(var(--glass-text))]">Wird die Immobilie vermietet?</Label>
          <RadioGroup
            value={showRental ? "ja" : "nein"}
            onValueChange={(value) => {
              const isRented = value === "ja";
              setShowRental(isRented);
              updateData({ isRented });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="rental-yes" className="border-white/40" />
              <Label htmlFor="rental-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="rental-no" className="border-white/40" />
              <Label htmlFor="rental-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
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

export default PropertyDataStepBaufi;