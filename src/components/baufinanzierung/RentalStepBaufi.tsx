import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BaufiFormData } from "@/pages/BaufinanzierungSelbstauskunft";

interface RentalStepBaufiProps {
  data: BaufiFormData;
  updateData: (data: Partial<BaufiFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const RentalStepBaufi = ({ data, updateData, onNext, onBack }: RentalStepBaufiProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-2">
          Vermietung
        </h2>
        <p className="text-[hsl(var(--glass-text))]/70">
          Bitte laden Sie alle Dokumente zur Vermietung hoch.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rentalContracts" className="text-[hsl(var(--glass-text))]">Mietverträge</Label>
          <Input
            id="rentalContracts"
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={(e) => updateData({ rentalContracts: e.target.files ? Array.from(e.target.files) : [] })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
          />
          <p className="text-xs text-[hsl(var(--glass-text))]/60">
            Alle aktuellen Mietverträge mit Mietern
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rentalList" className="text-[hsl(var(--glass-text))]">
            Mietaufstellung mit Unterschrift des Eigentümers
          </Label>
          <Input
            id="rentalList"
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={(e) => updateData({ rentalList: e.target.files ? Array.from(e.target.files) : [] })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
          />
          <p className="text-xs text-[hsl(var(--glass-text))]/60">
            Übersicht aller Mieteinheiten mit Mieteinnahmen
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rentalIncomeProof" className="text-[hsl(var(--glass-text))]">
            Nachweise Mieteingänge
          </Label>
          <Input
            id="rentalIncomeProof"
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={(e) => updateData({ rentalIncomeProof: e.target.files ? Array.from(e.target.files) : [] })}
            className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white/20 file:text-[hsl(var(--glass-text))] hover:file:bg-white/30"
          />
          <p className="text-xs text-[hsl(var(--glass-text))]/60">
            Aktuelle Kontoauszüge mit Mieteinzahlungen
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

export default RentalStepBaufi;