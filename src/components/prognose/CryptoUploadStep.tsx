import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { FormData } from "@/pages/Prognose";

interface CryptoUploadStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CryptoUploadStep = ({ data, updateData, onNext, onBack }: CryptoUploadStepProps) => {
  const [files, setFiles] = useState<File[]>(data.cryptoDocuments || []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      updateData({ cryptoDocuments: updatedFiles });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    updateData({ cryptoDocuments: updatedFiles });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Krypto-Dokumente hochladen
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Laden Sie Ihre Krypto-Transaktionsbelege und relevante Dokumente hoch.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-[hsl(var(--glass-text))] text-lg">
            Dokumente auswählen
          </Label>
          
          <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-white/50 transition-colors">
            <input
              type="file"
              id="crypto-file-upload"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp,.gif,.bmp,.tiff,.tif,.doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="crypto-file-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <Upload className="h-12 w-12 text-[hsl(var(--glass-text))]/70" />
              <div>
                <p className="text-[hsl(var(--glass-text))] font-medium mb-1">
                  Dateien hierher ziehen oder klicken zum Auswählen
                </p>
                <p className="text-sm text-[hsl(var(--glass-text))]/60">
                  PDF, JPG, PNG, DOC, DOCX
                </p>
              </div>
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label className="text-[hsl(var(--glass-text))]">
                Ausgewählte Dateien ({files.length})
              </Label>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[hsl(var(--glass-text))]/70" />
                      <span className="text-[hsl(var(--glass-text))] text-sm">
                        {file.name}
                      </span>
                      <span className="text-[hsl(var(--glass-text))]/60 text-xs">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
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

          {files.length === 0 && (
            <p className="text-sm text-[hsl(var(--glass-text))]/60 text-center">
              Sie können diesen Schritt auch überspringen und die Dokumente später nachreichen.
            </p>
          )}
        </div>
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
          onClick={onNext}
          size="lg" 
          className="flex-1 rounded-full group"
        >
          {files.length > 0 ? "Weiter" : "Überspringen"}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default CryptoUploadStep;
