import { motion } from "motion/react";
import { Calculator, CreditCard, Home, TrendingUp, Sun, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Calculator,
    title: "Steuerberatung",
    description: "Lohnsteuerjahresausgleich, Steuerprognose und Optimierung Ihrer Steuererklärung.",
    link: "/prognose",
    cta: "Kostenlose Steuerprognose",
  },
  {
    icon: CreditCard,
    title: "Privatkredite",
    description: "Kreditberatung, Selbstauskunft und Vermittlung über starke Partner.",
    link: "/selbstauskunft",
    cta: "Jetzt anfragen",
  },
  {
    icon: Home,
    title: "Baufinanzierung",
    description: "Immobilienfinanzierung, Refinanzierung und Ablösung bestehender Kredite.",
    link: "/prognose",
    cta: "Jetzt anfragen",
  },
  {
    icon: TrendingUp,
    title: "Investmentberatung",
    description: "Persönliche Investmentplanung und strategischer Vermögensaufbau.",
    link: "/prognose",
  },
  {
    icon: Sun,
    title: "Solaranlagen",
    description: "Beratung über Partner für Installation, Finanzierung und Rentabilitätsbewertung.",
    link: "/prognose",
  },
  {
    icon: Users,
    title: "Kunden-Portal",
    description: "Digitale Dokumentenverwaltung und Zusammenarbeit (in Planung).",
    link: "/prognose",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">Leistungen</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-4">
            Unsere Leistungen – alles aus einer Hand
          </h2>
          <p className="text-lg md:text-xl text-primary/70 max-w-3xl mx-auto font-light">
            Wir bieten moderne, technologiegestützte Finanz- und Beratungsleistungen in den Bereichen Steuern, Finanzierung, Immobilien und Vermögensaufbau.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {service.cta && (
                    <Button asChild className="w-full">
                      <Link to={service.link}>{service.cta}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
