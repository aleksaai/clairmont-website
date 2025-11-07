import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Upload, X, FileText } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";
import { toast } from "sonner";

interface DocumentUploadStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DocumentUploadStep = ({ data, updateData, onNext, onBack }: DocumentUploadStepProps) => {
  const [dragActive, setDragActive] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(field);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = (e: React.DragEvent, field: keyof NonNullable<FormData['documents']>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files, field);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof NonNullable<FormData['documents']>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files, field);
  };

  const handleFiles = (files: File[], field: keyof NonNullable<FormData['documents']>) => {
    if (files.length === 0) return;
    
    // Validate file size (max 10MB per file)
    const invalidFiles = files.filter(f => f.size > 10 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast.error("Einige Dateien sind größer als 10MB");
      return;
    }
    
    const currentDocuments = data.documents || {};
    const existingFiles = currentDocuments[field] || [];
    
    updateData({
      documents: {
        ...currentDocuments,
        [field]: [...existingFiles, ...files]
      }
    });
    
    toast.success(`${files.length} Datei(en) hochgeladen`);
  };

  const removeFile = (field: keyof NonNullable<FormData['documents']>, index: number) => {
    const currentDocuments = data.documents || {};
    const files = currentDocuments[field] || [];
    const newFiles = files.filter((_, i) => i !== index);
    
    updateData({
      documents: {
        ...currentDocuments,
        [field]: newFiles.length > 0 ? newFiles : undefined
      }
    });
  };

  const handleNext = () => {
    const docs = data.documents || {};
    
    // Validate mandatory documents
    if (!docs.taxCertificate || docs.taxCertificate.length === 0) {
      alert("Bitte laden Sie Ihre Lohnsteuerbescheinigung hoch.");
      return;
    }
    
    if (!docs.idCard || docs.idCard.length === 0) {
      alert("Bitte laden Sie Ihren Personalausweis hoch.");
      return;
    }
    
    // Check disability certificate if user has disability
    if (data.hasDisability && (!docs.disabilityCertificate || docs.disabilityCertificate.length === 0)) {
      alert("Bitte laden Sie Ihren Behindertenausweis hoch.");
      return;
    }
    
    onNext();
  };

  const renderUploadArea = (
    field: keyof NonNullable<FormData['documents']>,
    label: string,
    required: boolean = false
  ) => {
    const files = data.documents?.[field] || [];
    const isActive = dragActive === field;
    
    return (
      <div className="space-y-2">
        <Label className="text-[hsl(var(--glass-text))]">
          {label} {required && <span className="text-red-400">*</span>}
        </Label>
        
        <div
          onDragEnter={(e) => handleDrag(e, field)}
          onDragLeave={(e) => handleDrag(e, field)}
          onDragOver={(e) => handleDrag(e, field)}
          onDrop={(e) => handleDrop(e, field)}
          className={`relative border-2 border-dashed rounded-2xl p-6 transition-all ${
            isActive
              ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10"
              : "border-white/20 bg-white/5"
          }`}
        >
          <input
            type="file"
            multiple
            onChange={(e) => handleFileInput(e, field)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          
          <div className="text-center space-y-2">
            <Upload className="w-10 h-10 mx-auto text-[hsl(var(--glass-text))]/60" />
            <p className="text-[hsl(var(--glass-text))]/80">
              Dateien hierher ziehen oder <span className="text-[hsl(var(--primary))] underline">durchsuchen</span>
            </p>
            <p className="text-xs text-[hsl(var(--glass-text))]/60">
              PDF, JPG oder PNG (max. 10MB pro Datei)
            </p>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2 mt-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                  <div>
                    <p className="text-sm text-[hsl(var(--glass-text))]">{file.name}</p>
                    <p className="text-xs text-[hsl(var(--glass-text))]/60">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(field, index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Dokumente hochladen
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte laden Sie die folgenden Dokumente hoch.
        </p>
      </div>

      <div className="space-y-6">
        {renderUploadArea("taxCertificate", "Lohnsteuerbescheinigung", true)}
        {renderUploadArea("idCard", "Personalausweis", true)}
        
        {data.hasDisability && renderUploadArea("disabilityCertificate", "Behindertenausweis", true)}
        
        {renderUploadArea("otherDocuments", "Sonstige Belege (optional)", false)}
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
          Absenden
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadStep;
