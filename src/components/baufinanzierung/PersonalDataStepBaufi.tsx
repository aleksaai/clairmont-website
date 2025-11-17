import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { BaufiFormData } from "@/pages/BaufinanzierungSelbstauskunft";
import { useState } from "react";

interface PersonalDataStepBaufiProps {
  data: BaufiFormData;
  updateData: (data: Partial<BaufiFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalDataStepBaufi = ({ data, updateData, onNext, onBack }: PersonalDataStepBaufiProps) => {
  const [showSpouse, setShowSpouse] = useState(data.isMarried);
  const [showChildren, setShowChildren] = useState(data.hasChildren);

  const addChild = () => {
    updateData({
      children: [...data.children, { firstName: "", lastName: "", birthDate: "" }]
    });
  };

  const removeChild = (index: number) => {
    updateData({
      children: data.children.filter((_, i) => i !== index)
    });
  };

  const updateChild = (index: number, field: string, value: string) => {
    const newChildren = [...data.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    updateData({ children: newChildren });
  };

  const handleNext = () => {
    if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.address || !data.livingThereSince) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    if (!data.idCardFront || !data.idCardBack) {
      alert("Bitte laden Sie Vorder- und Rückseite Ihres Personalausweises hoch.");
      return;
    }
    if (data.isMarried && !data.spouseIdCard) {
      alert("Bitte laden Sie den Personalausweis Ihres Ehepartners hoch.");
      return;
    }
    if (data.hasChildren && data.children.length === 0) {
      alert("Bitte fügen Sie mindestens ein Kind hinzu.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Persönliche Daten
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte geben Sie Ihre persönlichen Informationen an.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[hsl(var(--glass-text))]">Vorname *</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-[hsl(var(--glass-text))]">Nachname *</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[hsl(var(--glass-text))]">Telefonnummer *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="+49 123 456789"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[hsl(var(--glass-text))]">E-Mail-Adresse *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-[hsl(var(--glass-text))]">Aktuelle Wohnadresse *</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
            placeholder="Straße, PLZ, Ort"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="livingThereSince" className="text-[hsl(var(--glass-text))]">Wohnhaft seit *</Label>
          <Input
            id="livingThereSince"
            type="month"
            value={data.livingThereSince}
            onChange={(e) => updateData({ livingThereSince: e.target.value })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Personalausweis (Vorder- & Rückseite) *</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idCardFront" className="text-[hsl(var(--glass-text))] text-sm">Vorderseite</Label>
              <Input
                id="idCardFront"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => updateData({ idCardFront: e.target.files?.[0] })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idCardBack" className="text-[hsl(var(--glass-text))] text-sm">Rückseite</Label>
              <Input
                id="idCardBack"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => updateData({ idCardBack: e.target.files?.[0] })}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Sind Sie verheiratet?</Label>
          <RadioGroup
            value={showSpouse ? "ja" : "nein"}
            onValueChange={(value) => {
              const married = value === "ja";
              setShowSpouse(married);
              updateData({ isMarried: married });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="married-yes" className="border-white/40" />
              <Label htmlFor="married-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="married-no" className="border-white/40" />
              <Label htmlFor="married-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        {showSpouse && (
          <div className="space-y-2">
            <Label htmlFor="spouseIdCard" className="text-[hsl(var(--glass-text))]">Personalausweis Ehepartner *</Label>
            <Input
              id="spouseIdCard"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => updateData({ spouseIdCard: e.target.files?.[0] })}
              className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
            />
          </div>
        )}

        <div className="space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Haben Sie Kinder?</Label>
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
              <Label htmlFor="children-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="children-no" className="border-white/40" />
              <Label htmlFor="children-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        {showChildren && (
          <div className="space-y-4">
            {data.children.map((child, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-[hsl(var(--glass-text))] font-medium">Kind {index + 1}</Label>
                  {data.children.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChild(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Vorname"
                    value={child.firstName}
                    onChange={(e) => updateChild(index, "firstName", e.target.value)}
                    className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                  />
                  <Input
                    placeholder="Nachname"
                    value={child.lastName}
                    onChange={(e) => updateChild(index, "lastName", e.target.value)}
                    className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                  />
                </div>
                <Input
                  type="date"
                  placeholder="Geburtsdatum"
                  value={child.birthDate}
                  onChange={(e) => updateChild(index, "birthDate", e.target.value)}
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addChild}
              className="w-full bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
            >
              <Plus className="mr-2 h-4 w-4" />
              Weiteres Kind hinzufügen
            </Button>
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
          onClick={handleNext}
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

export default PersonalDataStepBaufi;