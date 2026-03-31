import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Calculator, FileSearch, Laptop, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/services/steuer-arbeitnehmer-hero.jpg";

const SteueroptimierungArbeitnehmer = () => {
  const navigate = useNavigate();

  const services = [
    { icon: Calculator, title: "Steuererklärung", desc: "Erstellung und Optimierung Ihrer Steuererklärung (1–4 Jahre rückwirkend möglich)." },
    { icon: FileSearch, title: "Abzugsmöglichkeiten", desc: "Prüfung aller relevanten Abzugsmöglichkeiten (Werbungskosten, Sonderausgaben, außergewöhnliche Belastungen)." },
    { icon: CheckCircle, title: "Maximale Erstattung", desc: "Maximierung Ihrer Steuererstattung durch systematische Analyse." },
    { icon: Laptop, title: "Digitaler Prozess", desc: "Dokumente bequem über unsere Plattform einreichen — einfach und transparent." },
    { icon: Users, title: "Persönliche Betreuung", desc: "Persönliche Betreuung durch unser Serviceteam bei jedem Schritt." },
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
              <span className="text-sm font-medium text-[hsl(var(--glass-text))]">Steuerservice</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[hsl(var(--glass-text))] mb-6 leading-tight">
              Steueroptimierung<br />für Arbeitnehmer
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/80 font-light max-w-2xl mx-auto mb-10">
              Optimierung Ihres Nettogehalts durch individuelle Steuerstrategien — einfach, transparent und professionell.
            </p>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/prognose")}>
              Jetzt Selbstauskunft ausfüllen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-primary mb-4">Was wir bieten</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">Ihr Weg zur maximalen Steuererstattung — professionell und unkompliziert.</p>
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
              Arbeitnehmer in Deutschland, die ihre Steuererklärung professionell erstellen lassen und das Maximum aus ihrer Erstattung herausholen möchten.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-primary/[0.03]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-6">Steuererklärung leicht gemacht</h2>
            <p className="text-lg text-muted-foreground font-light mb-10 max-w-2xl mx-auto">Füllen Sie unsere Selbstauskunft aus und wir kümmern uns um den Rest.</p>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => navigate("/prognose")}>
              Jetzt Selbstauskunft ausfüllen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-muted-foreground/60 text-sm font-light mt-8">* Die Steuerberatung erfolgt über unsere exklusiven Partner.</p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SteueroptimierungArbeitnehmer;
