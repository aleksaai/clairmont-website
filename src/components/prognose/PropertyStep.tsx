import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface PropertyStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PropertyStep = ({ data, updateData, onNext, onBack }: PropertyStepProps) => {
  const [showProperties, setShowProperties] = useState(data.hasProperty);

  const handleNext = () => {
    if (showProperties && data.properties.length > 0) {
      // Validate all properties have required fields filled
      for (let i = 0; i < data.properties.length; i++) {
        const property = data.properties[i];
        if (!property.address || !property.purchasePrice || !property.purchaseDate || 
            !property.completionDate || !property.numberOfUnits || !property.rentedArea || 
            !property.rent || !property.interestExpense || !property.notaryCosts || !property.propertyTax) {
          alert(`Bitte füllen Sie alle Pflichtfelder für Immobilie ${i + 1} aus.`);
          return;
        }
      }
    }
    onNext();
  };

  const addProperty = () => {
    const newProperties = [
      ...data.properties,
      {
        address: "",
        purchasePrice: "",
        purchaseDate: "",
        completionDate: "",
        numberOfUnits: "",
        rentedArea: "",
        rent: "",
        additionalCosts: "",
        interestExpense: "",
        notaryCosts: "",
        propertyTax: "",
      },
    ];
    updateData({ properties: newProperties });
  };

  const removeProperty = (index: number) => {
    const newProperties = data.properties.filter((_, i) => i !== index);
    updateData({ properties: newProperties });
  };

  const updateProperty = (index: number, field: string, value: string) => {
    const newProperties = [...data.properties];
    newProperties[index] = { ...newProperties[index], [field]: value };
    updateData({ properties: newProperties });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Immobilienbesitz
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Angaben zu Ihren Immobilien.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Besitzen Sie Immobilien?
          </Label>
          <RadioGroup
            value={showProperties ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasProps = value === "ja";
              setShowProperties(hasProps);
              updateData({ hasProperty: hasProps });
              if (hasProps && data.properties.length === 0) {
                addProperty();
              }
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="property-yes" className="border-white/40" />
              <Label htmlFor="property-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="property-no" className="border-white/40" />
              <Label htmlFor="property-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showProperties && (
          <div className="space-y-6">
            {data.properties.map((property, index) => (
              <div key={index} className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-[hsl(var(--glass-text))]">
                    Immobilie {index + 1}
                  </h3>
                  {data.properties.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProperty(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--glass-text))] text-sm">Adresse *</Label>
                    <Input
                      value={property.address}
                      onChange={(e) => updateProperty(index, "address", e.target.value)}
                      className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                      placeholder="Straße, Hausnummer, PLZ, Ort"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Kaufpreis (€) *</Label>
                      <Input
                        type="number"
                        value={property.purchasePrice}
                        onChange={(e) => updateProperty(index, "purchasePrice", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Anschaffungsdatum *</Label>
                      <Input
                        type="date"
                        value={property.purchaseDate}
                        onChange={(e) => updateProperty(index, "purchaseDate", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Fertigstellungsdatum *</Label>
                      <Input
                        type="date"
                        value={property.completionDate}
                        onChange={(e) => updateProperty(index, "completionDate", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Anzahl Wohnungen *</Label>
                      <Input
                        type="number"
                        value={property.numberOfUnits}
                        onChange={(e) => updateProperty(index, "numberOfUnits", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Vermietete Fläche (m²) *</Label>
                      <Input
                        type="number"
                        value={property.rentedArea}
                        onChange={(e) => updateProperty(index, "rentedArea", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Kaltmiete (€) *</Label>
                      <Input
                        type="number"
                        value={property.rent}
                        onChange={(e) => updateProperty(index, "rent", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--glass-text))] text-sm">
                      Neben- und Betriebskosten (€, optional)
                    </Label>
                    <Input
                      type="number"
                      value={property.additionalCosts || ""}
                      onChange={(e) => updateProperty(index, "additionalCosts", e.target.value)}
                      className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Schuldzinsen (€) *</Label>
                      <Input
                        type="number"
                        value={property.interestExpense}
                        onChange={(e) => updateProperty(index, "interestExpense", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Notarkosten (€) *</Label>
                      <Input
                        type="number"
                        value={property.notaryCosts}
                        onChange={(e) => updateProperty(index, "notaryCosts", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--glass-text))] text-sm">Grundsteuer (€) *</Label>
                      <Input
                        type="number"
                        value={property.propertyTax}
                        onChange={(e) => updateProperty(index, "propertyTax", e.target.value)}
                        className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addProperty}
              className="w-full rounded-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Weitere Immobilie hinzufügen
            </Button>
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

export default PropertyStep;
