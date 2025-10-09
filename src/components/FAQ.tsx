import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Wer kann eine Mehrwertsteuer-Rückerstattung beantragen?",
      answer: "Unternehmen und Selbstständige aus dem Ausland, die in Deutschland Vorsteuer gezahlt haben, können eine Rückerstattung beantragen. Dies gilt insbesondere für Geschäftsreisen, Messen, Schulungen oder den Kauf von Waren und Dienstleistungen.",
    },
    {
      question: "Wie lange dauert der Rückerstattungsprozess?",
      answer: "Die durchschnittliche Bearbeitungszeit beträgt etwa 14 Tage ab Einreichung der vollständigen Unterlagen. Die tatsächliche Dauer kann je nach Komplexität des Falls und Arbeitsbelastung der Finanzbehörden variieren.",
    },
    {
      question: "Welche Dokumente werden für die Rückerstattung benötigt?",
      answer: "Sie benötigen Originalrechnungen, Zahlungsnachweise, Reisebelege und weitere relevante Dokumente. Wir erstellen für Sie eine detaillierte Checkliste und unterstützen Sie bei der vollständigen Zusammenstellung aller erforderlichen Unterlagen.",
    },
    {
      question: "Wie hoch sind die Kosten für Ihre Dienstleistung?",
      answer: "Unsere Vergütung erfolgt erfolgsbasiert. Sie zahlen nur, wenn die Rückerstattung erfolgreich ist. Die genauen Konditionen besprechen wir transparent in einem persönlichen Beratungsgespräch.",
    },
    {
      question: "Gibt es eine Frist für die Antragstellung?",
      answer: "Ja, der Antrag muss in der Regel bis zum 30. September des Folgejahres eingereicht werden. Für Ausgaben aus 2024 haben Sie also bis zum 30. September 2025 Zeit. Wir empfehlen jedoch, frühzeitig zu starten.",
    },
    {
      question: "Kann ich auch Rückerstattungen für mehrere Jahre beantragen?",
      answer: "Ja, unter bestimmten Voraussetzungen können auch Anträge für vergangene Jahre nachgereicht werden. Wir prüfen gerne Ihre individuelle Situation und beraten Sie zu den Möglichkeiten.",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-sm md:text-base font-light text-primary/50 mb-3 tracking-wider uppercase">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto font-light">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um die Mehrwertsteuer-Rückerstattung
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
