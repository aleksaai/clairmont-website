import { useState } from "react";
import { ArrowLeft, ArrowRight, FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from "@/pages/Prognose";

interface SupportingDocumentsStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type FileField =
  | "trainingCostDocuments"
  | "businessEquipmentDocuments"
  | "businessDocuments"
  | "vehicleDocuments"
  | "propertyDocuments"
  | "educationDocuments"
  | "spouseIncomeDocuments"
  | "spouseParentalBenefitDocuments";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const SupportingDocumentsStep = ({ data, updateData, onNext, onBack }: SupportingDocumentsStepProps) => {
  const [dragActive, setDragActive] = useState<FileField | null>(null);

  const appendFiles = (field: FileField, files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((file) => {
      if (file.size === 0) {
        alert(`${file.name} ist leer und wird übersprungen.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} ist größer als 10MB und wird übersprungen.`);
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;
    updateData({ [field]: [...(data[field] || []), ...validFiles] } as Partial<FormData>);
  };

  const removeFile = (field: FileField, index: number) => {
    const files = data[field] || [];
    updateData({ [field]: files.filter((_, fileIndex) => fileIndex !== index) } as Partial<FormData>);
  };

  const renderUploadArea = (field: FileField, label: string, required: boolean) => {
    const files = data[field] || [];
    const isActive = dragActive === field;

    return (
      <div className="space-y-2">
        <Label className="text-[hsl(var(--glass-text))]">
          {label} {required && <span className="text-red-300">*</span>}
        </Label>
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            setDragActive(field);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragActive(null)}
          onDrop={(event) => {
            event.preventDefault();
            setDragActive(null);
            appendFiles(field, event.dataTransfer.files);
          }}
          className={`relative rounded-2xl border-2 border-dashed p-5 text-center transition-colors ${
            isActive ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10" : "border-white/20 bg-white/5"
          }`}
        >
          <input
            type="file"
            multiple
            onChange={(event) => event.target.files && appendFiles(field, event.target.files)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <Upload className="mx-auto mb-3 h-9 w-9 text-[hsl(var(--glass-text))]/55" />
          <p className="text-sm text-[hsl(var(--glass-text))]/85">Dateien hierher ziehen oder klicken</p>
          <p className="mt-1 text-xs text-[hsl(var(--glass-text))]/55">Beliebiges Dokumentformat bis 10MB</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2 pt-1">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                  <span className="truncate text-sm text-[hsl(var(--glass-text))]">{file.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(field, index)}
                  className="text-red-300 hover:bg-red-400/10 hover:text-red-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const requiredGroups: Array<[FileField, string, boolean]> = [];
  const hasTrainingCosts = Number(data.trainingCosts || 0) > 0;
  const hasBusinessEquipment = Number(data.businessEquipment || 0) > 0;

  if (hasTrainingCosts) requiredGroups.push(["trainingCostDocuments", "Nachweise zu Fortbildungskosten", true]);
  if (hasBusinessEquipment) requiredGroups.push(["businessEquipmentDocuments", "Nachweise zu Arbeitsmitteln", true]);
  if (data.hasBusiness) requiredGroups.push(["businessDocuments", "EÜR, Bilanz oder Nachweise zur Selbstständigkeit", true]);
  if (data.hasVehicle) requiredGroups.push(["vehicleDocuments", "KFZ-Unterlagen und relevante Fahrzeugkosten", true]);
  if (data.hasProperty) requiredGroups.push(["propertyDocuments", "Unterlagen zur Immobilie", true]);
  if (data.educationCompleted) requiredGroups.push(["educationDocuments", "Unterlagen zu Ausbildung, Studium oder Fortbildung", true]);
  if (data.maritalStatus === "verheiratet" && data.spouseEmployed) requiredGroups.push(["spouseIncomeDocuments", "Einkommens-/Steuerunterlagen des Ehepartners", true]);
  if (data.maritalStatus === "verheiratet" && data.spouseReceivedParentalBenefit) requiredGroups.push(["spouseParentalBenefitDocuments", "Nachweis zum Elterngeld des Ehepartners", true]);

  const handleNext = () => {
    if (data.hasVehicle == null) {
      alert("Bitte beantworten Sie die KFZ-Frage.");
      return;
    }
    if (data.educationCompleted == null) {
      alert("Bitte beantworten Sie die Frage zu Ausbildung, Studium oder Fortbildung.");
      return;
    }
    if (data.maritalStatus === "verheiratet" && data.spouseReceivedParentalBenefit == null) {
      alert("Bitte beantworten Sie die Elterngeld-Frage zum Ehepartner.");
      return;
    }
    for (const [field, label] of requiredGroups) {
      if (!data[field]?.length) {
        alert(`Bitte laden Sie folgende Unterlagen hoch: ${label}`);
        return;
      }
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Nachweise & Sonderfälle
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Je nach Antwort benötigen wir zusätzliche Unterlagen. Nur relevante Uploads werden angezeigt.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Haben Sie ein KFZ steuerlich relevant genutzt?</Label>
          <RadioGroup
            value={data.hasVehicle == null ? "" : data.hasVehicle ? "ja" : "nein"}
            onValueChange={(value) => updateData({ hasVehicle: value === "ja" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="vehicle-yes" className="border-white/40" />
              <Label htmlFor="vehicle-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="vehicle-no" className="border-white/40" />
              <Label htmlFor="vehicle-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 space-y-3">
          <Label className="text-[hsl(var(--glass-text))]">Abgeschlossene Ausbildung, Studium oder Fortbildung?</Label>
          <RadioGroup
            value={data.educationCompleted == null ? "" : data.educationCompleted ? "ja" : "nein"}
            onValueChange={(value) => updateData({ educationCompleted: value === "ja" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="education-yes" className="border-white/40" />
              <Label htmlFor="education-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nein" id="education-no" className="border-white/40" />
              <Label htmlFor="education-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
            </div>
          </RadioGroup>
        </div>

        {data.maritalStatus === "verheiratet" && (
          <div className="rounded-2xl border border-white/15 bg-white/5 p-4 space-y-3">
            <Label className="text-[hsl(var(--glass-text))]">Hat Ihr Ehepartner Elterngeld erhalten?</Label>
            <RadioGroup
              value={data.spouseReceivedParentalBenefit == null ? "" : data.spouseReceivedParentalBenefit ? "ja" : "nein"}
              onValueChange={(value) => updateData({ spouseReceivedParentalBenefit: value === "ja" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ja" id="parental-yes" className="border-white/40" />
                <Label htmlFor="parental-yes" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Ja</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nein" id="parental-no" className="border-white/40" />
                <Label htmlFor="parental-no" className="text-[hsl(var(--glass-text))] font-normal cursor-pointer">Nein</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {requiredGroups.length === 0 ? (
          <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm text-[hsl(var(--glass-text))]/80">
            Aktuell sind aus Ihren bisherigen Angaben keine zusätzlichen Pflichtnachweise erforderlich.
          </div>
        ) : (
          requiredGroups.map(([field, label, required]) => (
            <div key={field}>{renderUploadArea(field, label, required)}</div>
          ))
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1 rounded-full">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Zurück
        </Button>
        <Button onClick={handleNext} size="lg" className="flex-1 rounded-full group">
          Weiter
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default SupportingDocumentsStep;
