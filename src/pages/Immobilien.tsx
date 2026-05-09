import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Building2, Globe, Search, FileText, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/services/immobilien-hero.jpg";

const Immobilien = () => {
  const navigate = useNavigate();

  const services = [
    { icon: Building2, title: "Exklusive Bauprojekte", desc: "Zugang zu exklusiven Bauprojekten in Dubai (UAE), Istanbul (Türkei), Aserbaidschan und weiteren Standorten." },
    { icon: Globe, title: "Investmentberatung", desc: "Individuelle Investmentberatung für Wohn- und Gewerbeimmobilien." },
    { icon: Handshake, title: "Projektvermittlung", desc: "Vermittlung von Neubauprojekten führender Entwickler." },
    { icon: FileText, title: "Abwicklung", desc: "Unterstützung bei der gesamten Abwicklung — von der Auswahl bis zum Vertragsabschluss." },
    { icon: Search, title: "Suchaufträge", desc: "Maßgeschneiderte Suchaufträge für Investoren mit individuellen Anforderungen." },
  ];

  const locations = [
    { name: "UAE — Dubai", route: "/bauprojekte/dubai", count: "17 Projekte" },
    { name: "Türkei — Istanbul", route: "/bauprojekte/istanbul", count: "Projekte verfügbar" },
    { name: "Aserbaidschan — Baku", route: "/bauprojekte/aserbaidschan", count: "Projekte verfügbar" },
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
              <span className="text-sm font-medium text-[hsl(var(--glass-text))]">Real Estate</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[hsl(var(--glass-text))] mb-6 leading-tight">
              Immobilien, Investments<br />& Bauprojekte
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto mb-10">
              Beratung für Investitionen in Immobilien und Gewerbeobjekte — international, exklusiv, renditeorientiert.
            </p>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt?service=immobilien")}>
              Projekte ansehen <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Standorte */}
      <section className="py-24 bg-primary/[0.03]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-primary mb-4">Unsere Standorte</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">Entdecken Sie unsere exklusiven Bauprojekte an internationalen Top-Standorten.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {locations.map((loc, index) => (
              <motion.div key={loc.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                <button
                  onClick={() => navigate(loc.route)}
                  className="w-full bg-background rounded-3xl p-10 border border-primary/10 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-2">{loc.name}</h3>
                  <p className="text-muted-foreground font-light text-sm">{loc.count}</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    Projekte ansehen <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Suchauftrag CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-6">Nichts Passendes gefunden?</h2>
            <p className="text-lg text-muted-foreground font-light mb-10 max-w-2xl mx-auto">
              Erstellen Sie einen Suchauftrag und wir finden die perfekte Immobilie für Sie — individuell und exklusiv.
            </p>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/kontakt?service=immobilien")}>
              Suchauftrag erstellen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Immobilien;
