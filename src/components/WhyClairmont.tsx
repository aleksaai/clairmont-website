import { motion } from "motion/react";
import officeImage from "@/assets/clairmont-office.png";
import { useLanguage } from "@/i18n/LanguageContext";

const WhyClairmont = () => {
  const { t } = useLanguage();

  const benefits = [
    { title: t('whyClairmont', 'benefit1Title'), description: t('whyClairmont', 'benefit1Desc') },
    { title: t('whyClairmont', 'benefit2Title'), description: t('whyClairmont', 'benefit2Desc') },
    { title: t('whyClairmont', 'benefit3Title'), description: t('whyClairmont', 'benefit3Desc') },
    { title: t('whyClairmont', 'benefit4Title'), description: t('whyClairmont', 'benefit4Desc') },
    { title: t('whyClairmont', 'benefit5Title'), description: t('whyClairmont', 'benefit5Desc') },
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
            <span className="text-sm font-medium text-primary">{t('whyClairmont', 'badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-4">
            {t('whyClairmont', 'title')}
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

          <div className="space-y-6 lg:pt-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative">
                  <h3 className="text-xl font-medium text-primary mb-2 leading-tight group-hover:text-primary/80 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
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
              className="pt-4 mt-4 border-t border-primary/10"
            >
              <p className="text-primary/70 leading-relaxed italic">
                {t('whyClairmont', 'closing')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyClairmont;
