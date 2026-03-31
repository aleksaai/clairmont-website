import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Lightbulb, Target, Cpu, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/services/unternehmensberatung-hero.jpg";

const Unternehmensberatung = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-[hsl(var(--glass-bg))] backdrop-blur-sm" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center justify-center px-4 py-1.5 border border-white/20 rounded-full mb-6">
              <span className="text-sm font-medium text-[hsl(var(--glass-text))]">Consulting</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[hsl(var(--glass-text))] mb-6 leading-tight">
              Unternehmens­beratung
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto mb-10">
              Strategische Beratung für nachhaltiges Unternehmenswachstum und operative Exzellenz.
            </p>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt")}>
              Jetzt Beratung anfragen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-light text-primary mb-4">
              Unsere Beratungsleistungen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Wir begleiten Unternehmen auf dem Weg zu ihrem vollen Potenzial.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: "Strategieberatung", desc: "Entwicklung und Umsetzung von Wachstumsstrategien, die auf Ihre Marktposition und Ziele abgestimmt sind." },
              { icon: Lightbulb, title: "Prozessoptimierung", desc: "Analyse und Verbesserung Ihrer Geschäftsprozesse für maximale Effizienz und Wettbewerbsfähigkeit." },
              { icon: Cpu, title: "Digitalisierung", desc: "Begleitung bei der digitalen Transformation – von der Strategie bis zur technischen Umsetzung." },
              { icon: PiggyBank, title: "Finanzplanung", desc: "Langfristige Finanzstrategien, Investitionsplanung und Liquiditätsmanagement für Ihr Unternehmen." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-primary/5 rounded-3xl p-10 h-full border border-primary/10 hover:border-primary/20 hover:shadow-lg transition-all duration-300 flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-primary mb-3">{item.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-muted-foreground/60 font-light text-sm text-center mt-12 italic"
          >
            Weitere Details zu unseren Beratungsleistungen werden in Kürze ergänzt.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-primary/[0.03]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-6">
              Lassen Sie uns gemeinsam wachsen
            </h2>
            <p className="text-lg text-muted-foreground font-light mb-10 max-w-2xl mx-auto">
              Kontaktieren Sie uns für ein unverbindliches Erstgespräch.
            </p>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt")}>
              Kontakt aufnehmen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Unternehmensberatung;
