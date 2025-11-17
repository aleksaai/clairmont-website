import { motion } from "motion/react";
import officeImage from "@/assets/clairmont-office.png";

const WhyClairmont = () => {
  const benefits = [
    {
      title: "Schnelle, unkomplizierte Beratung",
      description: "Zeit ist entscheidend. Sie erhalten direkte Antworten und verständliche Lösungen – ohne Umwege, ohne Fachjargon."
    },
    {
      title: "Expertise trifft auf Präzision",
      description: "Jahrzehntelange Erfahrung vereint mit datenbasierten Entscheidungsprozessen für Finanzierungslösungen, die wirklich passen."
    },
    {
      title: "Maßgeschneiderte Konzepte",
      description: "Intelligente Analysen und internationales Partnernetzwerk für Strategien, die Ihre Ziele optimal unterstützen."
    },
    {
      title: "Transparenz auf jedem Schritt",
      description: "Nachvollziehbare Berechnungen, klare Konditionen und vollständige Kostentransparenz. Sie behalten die Kontrolle."
    },
    {
      title: "Internationales Netzwerk",
      description: "Digitale Systeme und weltweite Kontakte für reibungslose Abläufe bei komplexen oder grenzüberschreitenden Projekten."
    }
  ];

  return (
    <section id="why-clairmont" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-4">
            Warum Clairmont Advisory?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500" />
            <img 
              src={officeImage} 
              alt="Clairmont Advisory Office" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent z-20" />
          </motion.div>

          <div className="space-y-8 lg:pt-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative pl-6 border-l-2 border-primary/20 hover:border-primary transition-colors duration-300">
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                  <h3 className="text-xl font-medium text-primary mb-2 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="pt-6 pl-6 border-l-2 border-primary/10"
            >
              <p className="text-primary/70 leading-relaxed italic">
                Egal ob Privathaushalt, Familie oder Unternehmen – wir beraten alle Kundengruppen individuell und auf Augenhöhe. Vertrauen Sie unserer Expertise und erreichen Sie Ihr Ziel mit maximaler Planungssicherheit.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyClairmont;
