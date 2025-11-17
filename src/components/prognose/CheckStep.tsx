import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FormData } from "@/pages/Prognose";

interface CheckStepProps {
  data: FormData;
  onNext: () => void;
  onBack: () => void;
}

const CheckStep = ({ data, onNext, onBack }: CheckStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Überprüfung Ihrer Angaben
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte überprüfen Sie Ihre bisherigen Angaben. Sie können jederzeit zurückgehen und Änderungen vornehmen.
        </p>
      </div>

      <div className="space-y-6 bg-white/5 rounded-lg p-6 border border-white/10">
        <div>
          <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Persönliche Informationen</h3>
          <div className="space-y-2 text-sm">
            <p className="text-[hsl(var(--glass-text))]/80">
              <span className="font-medium">Name:</span> {data.firstName} {data.lastName}
            </p>
            <p className="text-[hsl(var(--glass-text))]/80">
              <span className="font-medium">Geburtsdatum:</span> {data.birthDate || 'Nicht angegeben'}
            </p>
            <p className="text-[hsl(var(--glass-text))]/80">
              <span className="font-medium">E-Mail:</span> {data.email}
            </p>
            <p className="text-[hsl(var(--glass-text))]/80">
              <span className="font-medium">Adresse:</span> {data.address}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Familiensituation</h3>
          <div className="space-y-2 text-sm">
            <p className="text-[hsl(var(--glass-text))]/80">
              <span className="font-medium">Familienstand:</span> {data.maritalStatus || 'Nicht angegeben'}
            </p>
            {data.maritalStatus === 'verheiratet' && data.spouseName && (
              <p className="text-[hsl(var(--glass-text))]/80">
                <span className="font-medium">Ehepartner:</span> {data.spouseName}
              </p>
            )}
            {data.hasChildren && data.children?.length > 0 && (
              <p className="text-[hsl(var(--glass-text))]/80">
                <span className="font-medium">Kinder:</span> {data.children.length}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Berufliche Tätigkeit</h3>
          <div className="space-y-2 text-sm">
            <p className="text-[hsl(var(--glass-text))]/80">
              <span className="font-medium">Beruf:</span> {data.occupation || 'Nicht angegeben'}
            </p>
            <p className="text-[hsl(var(--glass-text))]/80">
              <span className="font-medium">Home-Office Tage/Woche:</span> {data.homeOfficeDays || 'Nicht angegeben'}
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-[hsl(var(--glass-text))]/80">
            💡 Falls Sie Änderungen vornehmen möchten, nutzen Sie den "Zurück"-Button.
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

export default CheckStep;