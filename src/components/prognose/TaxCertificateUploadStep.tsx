import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Upload, X } from "lucide-react";
import { FormData } from "@/pages/Prognose";
import { useState } from "react";

interface TaxCertificateUploadStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TaxCertificateUploadStep = ({ data, updateData, onNext, onBack }: TaxCertificateUploadStepProps) => {
  const [dragActiveYear, setDragActiveYear] = useState<string | null>(null);

  const updateWorkPeriod = (year: string, field: "from" | "to" | "gapExplanation", value: string) => {
    const currentPeriods = data.workPeriodsByYear || {};
    updateData({
      workPeriodsByYear: {
        ...currentPeriods,
        [year]: {
          from: currentPeriods[year]?.from || "",
          to: currentPeriods[year]?.to || "",
          gapExplanation: currentPeriods[year]?.gapExplanation || "",
          [field]: value,
        },
      },
    });
  };

  const hasYearGap = (year: string) => {
    const period = data.workPeriodsByYear?.[year];
    return !!period?.from && !!period?.to && (period.from !== `${year}-01-01` || period.to !== `${year}-12-31`);
  };

  const handleDrag = (e: React.DragEvent, year: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveYear(year);
    } else if (e.type === "dragleave") {
      setDragActiveYear(null);
    }
  };

  const handleDrop = (e: React.DragEvent, year: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveYear(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files, year);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, year: string) => {
    if (e.target.files) {
      handleFiles(e.target.files, year);
    }
  };

  const handleFiles = (files: FileList, year: string) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (file.size === 0) {
        alert(`${file.name} ist leer und wird übersprungen.`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} ist größer als 10MB und wird übersprungen.`);
        return false;
      }
      return true;
    });

    const currentCertificates = data.taxCertificatesByYear || {};
    const yearFiles = currentCertificates[year] || [];
    updateData({ 
      taxCertificatesByYear: {
        ...currentCertificates,
        [year]: [...yearFiles, ...validFiles]
      }
    });
  };

  const removeFile = (year: string, fileIndex: number) => {
    const currentCertificates = data.taxCertificatesByYear || {};
    const yearFiles = currentCertificates[year] || [];
    const newYearFiles = yearFiles.filter((_, i) => i !== fileIndex);
    
    updateData({ 
      taxCertificatesByYear: {
        ...currentCertificates,
        [year]: newYearFiles
      }
    });
  };

  const handleNext = () => {
    // Check if all selected years have at least one file
    const missingYears: string[] = [];
    data.taxYears.forEach(year => {
      const yearFiles = data.taxCertificatesByYear?.[year] || [];
      if (yearFiles.length === 0) {
        missingYears.push(year);
      }
    });

    if (missingYears.length > 0) {
      alert(`Bitte laden Sie mindestens einen Lohnsteuerbescheid für folgende Jahre hoch: ${missingYears.join(', ')}`);
      return;
    }

    for (const year of data.taxYears) {
      const period = data.workPeriodsByYear?.[year];
      if (!period?.from || !period?.to) {
        alert(`Bitte geben Sie den Arbeitszeitraum für ${year} an.`);
        return;
      }
      if (hasYearGap(year) && !period.gapExplanation.trim()) {
        alert(`Bitte erklären Sie die Lücke im Jahr ${year}.`);
        return;
      }
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Lohnsteuerbescheide hochladen
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte laden Sie für jedes ausgewählte Jahr den entsprechenden Lohnsteuerbescheid hoch.
        </p>
      </div>

      <div className="space-y-6">
        {data.taxYears.map((year) => {
          const yearFiles = data.taxCertificatesByYear?.[year] || [];
          const isDragActive = dragActiveYear === year;

          return (
            <div key={year} className="space-y-3">
              <Label className="text-[hsl(var(--glass-text))] text-lg font-medium">
                Lohnsteuerbescheid {year} *
              </Label>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <Label className="text-[hsl(var(--glass-text))]">
                  Von wann bis wann haben Sie im Jahr {year} gearbeitet? *
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor={`work-from-${year}`} className="text-xs text-[hsl(var(--glass-text))]/70">Von</Label>
                    <Input
                      id={`work-from-${year}`}
                      type="date"
                      value={data.workPeriodsByYear?.[year]?.from || ""}
                      onChange={(event) => updateWorkPeriod(year, "from", event.target.value)}
                      className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`work-to-${year}`} className="text-xs text-[hsl(var(--glass-text))]/70">Bis</Label>
                    <Input
                      id={`work-to-${year}`}
                      type="date"
                      value={data.workPeriodsByYear?.[year]?.to || ""}
                      onChange={(event) => updateWorkPeriod(year, "to", event.target.value)}
                      className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))]"
                    />
                  </div>
                </div>
                {hasYearGap(year) && (
                  <div className="space-y-2">
                    <Label htmlFor={`gap-${year}`} className="text-[hsl(var(--glass-text))]">
                      Bitte erklären Sie die Lücke im Jahr {year} *
                    </Label>
                    <Textarea
                      id={`gap-${year}`}
                      value={data.workPeriodsByYear?.[year]?.gapExplanation || ""}
                      onChange={(event) => updateWorkPeriod(year, "gapExplanation", event.target.value)}
                      className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50"
                      placeholder="z.B. arbeitslos, Elternzeit, Studium, Krankheit, Arbeitgeberwechsel..."
                    />
                  </div>
                )}
              </div>
              
              <div
                onDragEnter={(e) => handleDrag(e, year)}
                onDragLeave={(e) => handleDrag(e, year)}
                onDragOver={(e) => handleDrag(e, year)}
                onDrop={(e) => handleDrop(e, year)}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragActive
                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <Upload className="mx-auto h-10 w-10 text-[hsl(var(--glass-text))]/50 mb-3" />
                <p className="text-[hsl(var(--glass-text))] mb-2">
                  Dateien hierher ziehen oder klicken zum Auswählen
                </p>
                <p className="text-sm text-[hsl(var(--glass-text))]/60 mb-3">
                  Beliebiges Dokumentformat, maximal 10MB pro Datei
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileInput(e, year)}
                  className="hidden"
                  id={`tax-certificate-${year}`}
                />
                <label htmlFor={`tax-certificate-${year}`}>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] hover:bg-white/20"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`tax-certificate-${year}`)?.click();
                    }}
                  >
                    Dateien auswählen
                  </Button>
                </label>
              </div>

              {yearFiles.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--glass-text))] text-sm">Hochgeladene Dateien:</Label>
                  <div className="space-y-2">
                    {yearFiles.map((file, index) => (
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
                          onClick={() => removeFile(year, index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-[hsl(var(--glass-text))]/80">
            💡 Bitte laden Sie für jedes ausgewählte Jahr den entsprechenden Lohnsteuerbescheid hoch. Dies hilft uns, eine genauere Prognose zu erstellen.
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

export default TaxCertificateUploadStep;
