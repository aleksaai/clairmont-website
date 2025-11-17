import { motion } from "motion/react";
import { Clock, Target, Award, Shield, Globe } from "lucide-react";

const WhyClairmont = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Schnelle, unkomplizierte Beratung",
      description: "Wir wissen: Zeit ist entscheidend. Darum erhalten Sie bei uns direkte Antworten und verständliche Lösungen – ohne Umwege, ohne Fachjargon."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expertise trifft auf Präzision",
      description: "Unsere Beraterinnen und Berater vereinen jahrzehntelange Erfahrung mit datenbasierten Entscheidungsprozessen. So entstehen Finanzierungslösungen, die wirklich zu Ihnen passen."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Maßgeschneiderte Konzepte",
      description: "Jedes Vorhaben ist einzigartig. Mithilfe intelligenter Analysen und unseres internationalen Partnernetzwerks entwickeln wir Strategien, die Ihre Ziele optimal unterstützen."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Transparenz auf jedem Schritt",
      description: "Wir schaffen Klarheit – mit nachvollziehbaren Berechnungen, klaren Konditionen und vollständiger Kostentransparenz. So behalten Sie jederzeit die Kontrolle."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Internationales Netzwerk",
      description: "Unsere internationalen Kontakte und digitalen Systeme ermöglichen einen reibungslosen Ablauf, auch bei komplexen oder grenzüberschreitenden Projekten."
    }
  ];

  return (
    <section id="why-clairmont" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">Ihre Vorteile</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-4">
            Warum Clairmont Advisory?
          </h2>
          <p className="text-lg text-primary/70 max-w-2xl mx-auto">
            Egal ob Privathaushalt, Familie oder Unternehmen – wir beraten alle Kundengruppen individuell und auf Augenhöhe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-2 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-primary/70 max-w-3xl mx-auto mt-12 leading-relaxed"
        >
          Vertrauen Sie unserer Expertise und erreichen Sie Ihr Ziel mit maximaler Planungssicherheit. Nehmen Sie Kontakt auf – jetzt unverbindlich beraten lassen.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyClairmont;
