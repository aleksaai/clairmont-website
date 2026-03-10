import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Upload, X } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface AdditionalDocumentsStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const AdditionalDocumentsStep = ({ data, updateData, onNext, onBack }: AdditionalDocumentsStepProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} ist größer als 10MB und wird übersprungen.`);
        return false;
      }
      return true;
    });

    const currentFiles = data.additionalDocuments || [];
    updateData({ additionalDocuments: [...currentFiles, ...validFiles] });
  };

  const removeFile = (index: number) => {
    const currentFiles = data.additionalDocuments || [];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    updateData({ additionalDocuments: newFiles });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Weitere Unterlagen
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Haben Sie weitere steuerrelevante Unterlagen, die Sie uns zur Verfügung stellen möchten? (Optional)
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-[hsl(var(--glass-text))] mb-2 block">
            Weitere Dokumente (Optional)
          </Label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10"
                : "border-white/20 hover:border-white/40"
            }`}
          >
            <Upload className="mx-auto h-12 w-12 text-[hsl(var(--glass-text))]/50 mb-4" />
            <p className="text-[hsl(var(--glass-text))] mb-2">
              Dateien hierher ziehen oder klicken zum Auswählen
            </p>
            <p className="text-sm text-[hsl(var(--glass-text))]/60 mb-4">
              PDF, Bilder (JPG, PNG, HEIC, WEBP) oder Office-Dokumente (max. 10MB)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp,.gif,.bmp,.tiff,.tif,.doc,.docx,.xls,.xlsx"
              onChange={handleFileInput}
              className="hidden"
              id="additional-docs-upload"
            />
            <label htmlFor="additional-docs-upload">
              <Button
                type="button"
                variant="outline"
                className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("additional-docs-upload")?.click();
                }}
              >
                Dateien auswählen
              </Button>
            </label>
          </div>
        </div>

        {data.additionalDocuments && data.additionalDocuments.length > 0 && (
          <div className="space-y-2">
            <Label className="text-[hsl(var(--glass-text))]">Hochgeladene Dateien:</Label>
            <div className="space-y-2">
              {data.additionalDocuments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <span className="text-sm text-[hsl(var(--glass-text))] truncate flex-1">
                    {file.name}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-[hsl(var(--glass-text))]/80">
            💡 Sie können hier beliebige weitere Dokumente hochladen, die für Ihre Steuerprognose relevant sein könnten (z.B. Spendenbescheinigungen, Handwerkerrechnungen, etc.).
          </p>
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

export default AdditionalDocumentsStep;