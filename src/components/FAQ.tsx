import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    { question: t('faq', 'q1'), answer: t('faq', 'a1') },
    { question: t('faq', 'q2'), answer: t('faq', 'a2') },
    { question: t('faq', 'q3'), answer: t('faq', 'a3') },
    { question: t('faq', 'q4'), answer: t('faq', 'a4') },
    { question: t('faq', 'q5'), answer: t('faq', 'a5') },
    { question: t('faq', 'q6'), answer: t('faq', 'a6') },
  ];

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">{t('faq', 'badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-4">
            {t('faq', 'title')}
          </h2>
          <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto font-light">
            {t('faq', 'subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm border-none rounded-2xl px-6 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]"
              >
                <AccordionTrigger className="text-left text-lg md:text-xl font-light text-primary hover:text-primary/80 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-primary/60 leading-relaxed text-base font-light pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
