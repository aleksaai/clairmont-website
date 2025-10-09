import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import officeBackground from "@/assets/office-background.png";

const Prognose = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${officeBackground})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--glass-bg))] backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück</span>
          </button>

          {/* Glass Form Container */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[hsl(var(--glass-text))] mb-3">
                Kostenlose Steuerprognose
              </h1>
              <p className="text-[hsl(var(--glass-text))]/80 mb-8">
                Erfahren Sie in 2 Minuten, wie viel Geld Sie zurückbekommen können
              </p>
            </motion.div>

            <form className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="name" className="text-[hsl(var(--glass-text))]">
                  Vollständiger Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Max Mustermann"
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:border-white/40 focus:ring-white/20"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-[hsl(var(--glass-text))]">
                  E-Mail-Adresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="max@beispiel.de"
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:border-white/40 focus:ring-white/20"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="phone" className="text-[hsl(var(--glass-text))]">
                  Telefonnummer
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+49 123 456789"
                  className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] placeholder:text-[hsl(var(--glass-text))]/50 focus:border-white/40 focus:ring-white/20"
                />
              </motion.div>

              {/* Employment Status */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="status" className="text-[hsl(var(--glass-text))]">
                  Beschäftigungsstatus
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] focus:border-white/40 focus:ring-white/20">
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="angestellt">Angestellt</SelectItem>
                    <SelectItem value="selbststaendig">Selbstständig</SelectItem>
                    <SelectItem value="beides">Beides</SelectItem>
                    <SelectItem value="rentner">Rentner</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Annual Income */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-2"
              >
                <Label htmlFor="income" className="text-[hsl(var(--glass-text))]">
                  Jährliches Bruttoeinkommen
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-[hsl(var(--glass-text))] focus:border-white/40 focus:ring-white/20">
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unter-20k">Unter 20.000€</SelectItem>
                    <SelectItem value="20-40k">20.000€ - 40.000€</SelectItem>
                    <SelectItem value="40-60k">40.000€ - 60.000€</SelectItem>
                    <SelectItem value="60-80k">60.000€ - 80.000€</SelectItem>
                    <SelectItem value="ueber-80k">Über 80.000€</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="pt-4"
              >
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full rounded-full text-base md:text-lg h-14 shadow-lg hover:shadow-xl transition-shadow group"
                >
                  Prognose jetzt berechnen
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Privacy Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-sm text-[hsl(var(--glass-text))]/60 text-center"
              >
                100% kostenlos • Keine Verpflichtung • Datenschutzkonform
              </motion.p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Prognose;
