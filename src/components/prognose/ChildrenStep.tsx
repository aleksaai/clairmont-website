import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface ChildrenStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ChildrenStep = ({ data, updateData, onNext, onBack }: ChildrenStepProps) => {
  const [showChildren, setShowChildren] = useState(data.hasChildren);

  const addChild = () => {
    const newChildren = [...data.children, { name: "", birthDate: "", childBenefitPeriod: "" }];
    updateData({ children: newChildren });
  };

  const removeChild = (index: number) => {
    const newChildren = data.children.filter((_, i) => i !== index);
    updateData({ children: newChildren });
  };

  const updateChild = (index: number, field: string, value: string) => {
    const newChildren = [...data.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    updateData({ children: newChildren });
  };

  const handleNext = () => {
    if (showChildren) {
      // Validate that at least one child exists
      if (data.children.length === 0) {
        alert("Bitte fügen Sie mindestens ein Kind hinzu.");
        return;
      }
      
      // Validate that all children have required fields
      for (let i = 0; i < data.children.length; i++) {
        const child = data.children[i];
        if (!child.name || child.name.trim() === "") {
          alert(`Bitte geben Sie den Namen für Kind ${i + 1} an.`);
          return;
        }
        if (!child.birthDate) {
          alert(`Bitte geben Sie das Geburtsdatum für Kind ${i + 1} an.`);
          return;
        }
      }
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Kinder / Kindergeld
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Angaben zu Ihren Kindern und Kindergeldbezug.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">
            Haben Sie Kinder, für die Sie Kindergeld erhalten? *
          </Label>
          <RadioGroup
            value={showChildren ? "ja" : "nein"}
            onValueChange={(value) => {
              const hasKids = value === "ja";
              setShowChildren(hasKids);
              updateData({ hasChildren: hasKids });
              if (hasKids && data.children.length === 0) {
                addChild();
              }
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="children-yes" className="border-white/40" />
              <Label htmlFor="children-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Ja
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="children-no" className="border-white/40" />
              <Label htmlFor="children-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">
                Nein
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showChildren && (
          <div className="space-y-6 mt-6">
            {data.children.map((child, index) => (
              <div key={index} className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-[hsl(var(--glass-text))]">
                    Kind {index + 1}
                  </h3>
                  {data.children.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChild(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-[hsl(var(--glass-text))]">
                    Name des Kindes
                  </Label>
                  <Input
                    value={child.name}
                    onChange={(e) => updateChild(index, "name", e.target.value)}
                    className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                    placeholder="Vor- und Nachname"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[hsl(var(--glass-text))]">
                    Geburtsdatum
                  </Label>
                  <Input
                    type="date"
                    value={child.birthDate}
                    onChange={(e) => updateChild(index, "birthDate", e.target.value)}
                    className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[hsl(var(--glass-text))]">
                    Bezugszeitraum des Kindergeldes
                  </Label>
                  <Input
                    value={child.childBenefitPeriod}
                    onChange={(e) => updateChild(index, "childBenefitPeriod", e.target.value)}
                    className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                    placeholder="z.B. 01/2024 - 12/2024"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addChild}
              className="w-full rounded-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Weiteres Kind hinzufügen
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

export default ChildrenStep;
