import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Rechtsberatung = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(208,48%,12%)] via-[hsl(208,48%,18%)] to-[hsl(208,48%,8%)]">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-light text-[hsl(var(--glass-text))] mb-6">
              Rechtsberatung
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto">
              Kompetente rechtliche Beratung durch unser exklusives Partnernetzwerk.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/20 p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.3)]"
          >
            <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--glass-text))] mb-6">
              Rechtliche Expertise für Ihr Anliegen
            </h2>
            <p className="text-[hsl(var(--glass-text))]/80 font-light leading-relaxed mb-6">
              Clairmont Advisory vermittelt professionelle Rechtsberatung über unser exklusives Partnernetzwerk. 
              Ob Wirtschaftsrecht, Vertragsrecht, Immobilienrecht oder internationale Rechtsangelegenheiten – 
              wir verbinden Sie mit den richtigen Experten für Ihre individuelle Situation.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Wirtschaftsrecht</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Beratung bei Unternehmensgründung, Gesellschaftsrecht und geschäftlichen Transaktionen.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Vertragsrecht</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Prüfung, Erstellung und Verhandlung von Verträgen aller Art.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Immobilienrecht</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Rechtliche Begleitung bei Immobilientransaktionen im In- und Ausland.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Internationales Recht</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Grenzüberschreitende Rechtsberatung für internationale Geschäftstätigkeiten.
                </p>
              </div>
            </div>

            <p className="text-[hsl(var(--glass-text))]/60 font-light text-sm mb-8 text-center italic">
              Weitere Details und das spezifische Selbstauskunftsformular werden in Kürze ergänzt.
            </p>

            <div className="text-center">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt")}>
                Jetzt Beratung anfragen <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[hsl(var(--glass-text))]/50 text-sm font-light text-center">
            * Die Rechtsberatung erfolgt über unsere exklusiven Partner.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rechtsberatung;
