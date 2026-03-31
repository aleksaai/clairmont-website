import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Unternehmensberatung = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(208,48%,12%)] via-[hsl(208,48%,18%)] to-[hsl(208,48%,8%)]">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-light text-[hsl(var(--glass-text))] mb-6">
              Unternehmensberatung
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto">
              Strategische Beratung für nachhaltiges Unternehmenswachstum.
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
              Was wir bieten
            </h2>
            <p className="text-[hsl(var(--glass-text))]/80 font-light leading-relaxed mb-6">
              Clairmont Advisory bietet umfassende Beratungsleistungen für Unternehmen, die ihr volles Potenzial 
              entfalten möchten. Von der strategischen Planung über die operative Optimierung bis hin zur 
              Digitalisierung – wir begleiten Sie auf dem Weg zum Erfolg.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Strategieberatung</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Entwicklung und Umsetzung von Wachstumsstrategien für Ihr Unternehmen.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Prozessoptimierung</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Analyse und Verbesserung Ihrer Geschäftsprozesse für mehr Effizienz.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Digitalisierung</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Begleitung bei der digitalen Transformation Ihres Unternehmens.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-[hsl(var(--glass-text))] mb-3">Finanzplanung</h3>
                <p className="text-[hsl(var(--glass-text))]/70 font-light text-sm">
                  Langfristige Finanzstrategien und Investitionsplanung.
                </p>
              </div>
            </div>

            <p className="text-[hsl(var(--glass-text))]/60 font-light text-sm mb-8 text-center italic">
              Weitere Details zu unseren Beratungsleistungen werden in Kürze ergänzt.
            </p>

            <div className="text-center">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt")}>
                Jetzt Beratung anfragen <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Unternehmensberatung;
