import { motion } from "motion/react";
import { TrendingUp, Shield, Target, PiggyBank, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InvestmentConsulting = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Individuelle Anlagestrategie",
      description: "Maßgeschneiderte Investmentlösungen basierend auf Ihren persönlichen Zielen und Ihrer Risikobereitschaft.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Diversifikation & Risikomanagement",
      description: "Professionelle Streuung Ihrer Investments über verschiedene Anlageklassen für optimalen Vermögensschutz.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Transparente Kostenstruktur",
      description: "Keine versteckten Gebühren – Sie erhalten eine klare Übersicht aller Kosten und Renditeerwartungen.",
    },
  ];

  const investmentTypes = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "ETF & Fondssparen",
      description: "Langfristiger Vermögensaufbau durch breit gestreute Indexfonds und aktiv gemanagte Fonds.",
    },
    {
      icon: <PiggyBank className="w-8 h-8" />,
      title: "Altersvorsorge",
      description: "Renditestarke Vorsorgelösungen für eine finanziell abgesicherte Zukunft im Ruhestand.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Vermögensverwaltung",
      description: "Individuelle Portfolioverwaltung für anspruchsvolle Anleger mit größeren Vermögenswerten.",
    },
  ];

  const reasons = [
    "Unabhängige Beratung ohne Produktbindung",
    "Zugang zu institutionellen Anlagekonditionen",
    "Regelmäßiges Portfolio-Monitoring",
    "Steueroptimierte Anlagestrategien",
  ];

  return (
    <section id="investment-consulting" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">Investmentberatung</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary text-center mb-6">
            Intelligent investieren für Ihre Zukunft
          </h2>
          <p className="text-center text-lg text-primary/70 leading-relaxed mb-8">
            Professionelle Investmentberatung für nachhaltigen Vermögensaufbau. Wir entwickeln mit Ihnen eine Anlagestrategie, die zu Ihren Zielen und Ihrer Lebenssituation passt.
          </p>

          <Link to="/prognose">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full">
              Zur Selbstauskunft
            </Button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-primary mb-3">{feature.title}</h3>
              <p className="text-primary/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Investment Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-light text-primary text-center mb-12">
            Unsere Investmentlösungen
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {investmentTypes.map((type, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                  {type.icon}
                </div>
                <h4 className="text-xl font-medium text-primary mb-3">{type.title}</h4>
                <p className="text-primary/70 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-light text-primary text-center mb-12">
            Warum Clairmont Investment?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/5"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-primary/80 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentConsulting;
