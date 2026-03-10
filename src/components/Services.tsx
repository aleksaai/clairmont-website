import { motion } from "motion/react";
import { Calculator, CreditCard, Home, TrendingUp, Sun, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Calculator,
      title: t('services', 'taxService'),
      description: t('services', 'taxServiceDesc'),
      link: "/prognose",
      cta: t('services', 'taxServiceCta'),
    },
    {
      icon: CreditCard,
      title: t('services', 'privateLoans'),
      description: t('services', 'privateLoansDesc'),
      link: "/selbstauskunft",
      cta: t('services', 'privateLoansDescCta'),
    },
    {
      icon: Home,
      title: t('services', 'mortgageTitle'),
      description: t('services', 'mortgageDesc'),
      link: "/baufinanzierung-selbstauskunft",
      cta: t('services', 'privateLoansDescCta'),
    },
    {
      icon: TrendingUp,
      title: t('services', 'investmentTitle'),
      description: t('services', 'investmentDesc'),
      link: "/prognose",
    },
    {
      icon: Sun,
      title: t('services', 'solarTitle'),
      description: t('services', 'solarDesc'),
      link: "/prognose",
    },
    {
      icon: Users,
      title: t('services', 'portalTitle'),
      description: t('services', 'portalDesc'),
      link: "/prognose",
    },
  ];

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
            <span className="text-sm font-medium text-primary">{t('services', 'badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-4">
            {t('services', 'title')}
          </h2>
          <p className="text-lg md:text-xl text-primary/70 max-w-3xl mx-auto font-light">
            {t('services', 'subtitle')}
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
                  <CardDescription className="text-base">{service.description}</CardDescription>
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
