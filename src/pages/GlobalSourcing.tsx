import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Globe, Handshake, FileText, Search, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/services/global-sourcing-hero.jpg";

const GlobalSourcing = () => {
  const navigate = useNavigate();

  const services = [
    { icon: Search, title: "Partnervermittlung", desc: "Identifikation und Vermittlung internationaler Geschäftspartner und Investoren." },
    { icon: Globe, title: "Transaktionsstrukturierung", desc: "Strukturierung komplexer grenzüberschreitender Transaktionen." },
    { icon: Handshake, title: "Vertragsverhandlungen", desc: "Begleitung bei Vertragsverhandlungen und rechtliche Absicherung." },
    { icon: FileText, title: "Due Diligence", desc: "Due-Diligence-Unterstützung bei internationalen Geschäftsanbindungen." },
    { icon: Network, title: "Netzwerk", desc: "Netzwerk in Europa, dem Nahen Osten und der Türkei." },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-[hsl(var(--glass-bg))] backdrop-blur-sm" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center justify-center px-4 py-1.5 border border-white/20 rounded-full mb-6">
              <span className="text-sm font-medium text-[hsl(var(--glass-text))]">International</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[hsl(var(--glass-text))] mb-6 leading-tight">
              Global Sourcing &<br />Deal Structuring
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto mb-10">
              Beratung bei internationalen Transaktionen und komplexen Deals — von der Anbahnung bis zum Abschluss.
            </p>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt?service=global-sourcing")}>
              Jetzt Kontakt aufnehmen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-primary mb-4">Was wir bieten</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="group">
                <div className="bg-primary/5 rounded-3xl p-8 h-full border border-primary/10 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-primary/5 rounded-3xl p-10 border border-primary/10">
            <h3 className="text-2xl font-light text-primary mb-4">Für wen</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Unternehmen und Investoren, die international expandieren, Partnerschaften eingehen oder grenzüberschreitende Deals strukturieren möchten.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-primary/[0.03]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-6">International wachsen?</h2>
            <p className="text-lg text-muted-foreground font-light mb-10 max-w-2xl mx-auto">Kontaktieren Sie uns für ein unverbindliches Erstgespräch.</p>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt?service=global-sourcing")}>
              Jetzt Kontakt aufnehmen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-muted-foreground/60 text-sm font-light mt-8">* Die rechtliche Beratung erfolgt über unsere exklusiven Partner.</p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GlobalSourcing;
