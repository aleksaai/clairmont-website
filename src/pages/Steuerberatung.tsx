import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Home, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Steuerberatung = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(208,48%,12%)] via-[hsl(208,48%,18%)] to-[hsl(208,48%,8%)]">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-light text-[hsl(var(--glass-text))] mb-6">
              Steueroptimierung für Unternehmen
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto">
              Professionelle Steuerberatung für Selbständige und Unternehmen – maßgeschneidert auf Ihre Bedürfnisse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/20 p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.3)]"
          >
            <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-6">
              Für wen ist dieser Service?
            </h2>
            <p className="text-[hsl(var(--glass-text))]/80 font-light leading-relaxed mb-6">
              Clairmont Advisory vermittelt professionelle Steuerberatung für Selbständige und Unternehmen ab 500.000 € Jahresumsatz. 
              Unsere exklusiven Partner analysieren Ihre steuerliche Situation und entwickeln individuelle Strategien zur 
              nachhaltigen Steueroptimierung – rechtssicher und zukunftsorientiert.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Steuerliche Analyse</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Umfassende Prüfung Ihrer aktuellen steuerlichen Struktur und Identifikation von Optimierungspotenzialen.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Strategieentwicklung</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Individuelle Steuerstrategien, die auf Ihre Unternehmensstruktur und Ihre Ziele abgestimmt sind.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Laufende Betreuung</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Kontinuierliche steuerliche Begleitung und proaktive Anpassung an gesetzliche Änderungen.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Internationale Expertise</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Grenzüberschreitende Steuerplanung für Unternehmen mit internationaler Geschäftstätigkeit.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt")}>
                Jetzt Beratung anfragen <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[hsl(var(--glass-text))]/50 text-sm font-light text-center">
            * Die Steuerberatung erfolgt über unsere exklusiven Partner.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Steuerberatung;
