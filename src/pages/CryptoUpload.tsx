import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background.png";

const CryptoUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Bitte wählen Sie mindestens eine Datei aus");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('prognose-documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        return filePath;
      });

      await Promise.all(uploadPromises);

      toast.success("Alle Dateien wurden erfolgreich hochgeladen");
      setFiles([]);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Fehler beim Hochladen der Dateien");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main 
        className="flex-1 relative"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary))]/80 to-[hsl(var(--primary))]/60" />
        
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="backdrop-blur-lg bg-[hsl(var(--glass-bg))] border border-[hsl(var(--glass-border))] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h1 className="text-3xl md:text-4xl font-light text-[hsl(var(--glass-text))] mb-4">
                Krypto-Dokumente hochladen
              </h1>
              <p className="text-[hsl(var(--glass-text))]/70 mb-8">
                Laden Sie Ihre Krypto-Transaktionsbelege und Steuerdokumente hoch.
              </p>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-[hsl(var(--glass-text))] text-lg">
                    Dokumente auswählen
                  </Label>
                  
                  <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-white/50 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
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
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={uploading || files.length === 0}
                  size="lg"
                  className="w-full rounded-full"
                >
                  {uploading ? "Wird hochgeladen..." : "Dateien hochladen"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CryptoUpload;
