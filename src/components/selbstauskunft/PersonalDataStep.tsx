import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Plus, X } from "lucide-react";
import { SelbstauskunftFormData } from "@/pages/Selbstauskunft";
import { useState } from "react";
import { toast } from "sonner";

interface PersonalDataStepProps {
  formData: SelbstauskunftFormData;
  updateFormData: (data: Partial<SelbstauskunftFormData>) => void;
  onNext: () => void;
}

const PersonalDataStep = ({ formData, updateFormData, onNext }: PersonalDataStepProps) => {
  const [showPreviousAddress, setShowPreviousAddress] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const livingSinceYear = formData.livingSince ? parseInt(formData.livingSince.split('-')[0]) : currentYear;
  const yearsAtAddress = currentYear - livingSinceYear;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.currentAddress || !formData.livingSince) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    if (yearsAtAddress < 5 && !formData.previousAddress) {
      toast.error("Bitte geben Sie Ihre vorherige Adresse an");
      return;
    }

    onNext();
  };

  const addChild = () => {
    updateFormData({
      children: [...formData.children, { name: "", birthDate: "" }]
    });
  };

  const removeChild = (index: number) => {
    const newChildren = formData.children.filter((_, i) => i !== index);
    updateFormData({ children: newChildren });
  };

  const updateChild = (index: number, field: string, value: string) => {
    const newChildren = [...formData.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    updateFormData({ children: newChildren });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-6">
          Persönliche Daten
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-[hsl(var(--glass-text))]">
            Vorname *
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            required
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-[hsl(var(--glass-text))]">
            Nachname *
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            required
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[hsl(var(--glass-text))]">
            E-Mail-Adresse *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[hsl(var(--glass-text))]">
            Telefonnummer *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            required
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAddress" className="text-[hsl(var(--glass-text))]">
          Aktuelle Wohnadresse *
        </Label>
        <Input
          id="currentAddress"
          value={formData.currentAddress}
          onChange={(e) => updateFormData({ currentAddress: e.target.value })}
          placeholder="Straße, Hausnummer, PLZ, Stadt"
          required
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="livingSince" className="text-[hsl(var(--glass-text))]">
          Wohnhaft seit *
        </Label>
        <Input
          id="livingSince"
          type="month"
          value={formData.livingSince}
          onChange={(e) => {
            updateFormData({ livingSince: e.target.value });
            const year = parseInt(e.target.value.split('-')[0]);
            if (currentYear - year < 5) {
              setShowPreviousAddress(true);
            } else {
              setShowPreviousAddress(false);
            }
          }}
          required
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
        />
      </div>

      {showPreviousAddress && (
        <div className="space-y-2">
          <Label htmlFor="previousAddress" className="text-[hsl(var(--glass-text))]">
            Vorherige Adresse * (weniger als 5 Jahre an aktueller Adresse)
          </Label>
          <Input
            id="previousAddress"
            value={formData.previousAddress || ""}
            onChange={(e) => updateFormData({ previousAddress: e.target.value })}
            placeholder="Straße, Hausnummer, PLZ, Stadt"
            required
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="idDocument" className="text-[hsl(var(--glass-text))]">
          Ausweisdokument(e) hochladen
        </Label>
        <Input
          id="idDocument"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            updateFormData({ idDocument: files });
          }}
          className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <p className="text-xs text-[hsl(var(--glass-text))]/60">
          Bei Paaren: beide Partner
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-[hsl(var(--glass-text))]">
            Angaben zu Kindern (optional)
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addChild}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Kind hinzufügen
          </Button>
        </div>

        {formData.children.map((child, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-[hsl(var(--glass-text))]">
                Kind {index + 1}
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeChild(index)}
                className="text-[hsl(var(--glass-text))]/70 hover:text-[hsl(var(--glass-text))] hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Name"
                value={child.name}
                onChange={(e) => updateChild(index, "name", e.target.value)}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              />
              <Input
                type="date"
                placeholder="Geburtsdatum"
                value={child.birthDate}
                onChange={(e) => updateChild(index, "birthDate", e.target.value)}
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full text-base h-12 group"
      >
        Weiter
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

export default PersonalDataStep;
