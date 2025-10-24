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
      question: "Wer kann Ihre Unterstützung bei der Steuererklärung nutzen?",
      answer: "Privatpersonen mit Wohnsitz in Deutschland, die ihre Steuererklärung optimieren möchten. Besonders hilfreich ist unser Service für alle, die Steuererstattungen maximieren oder komplexe Sachverhalte wie Kapitalerträge, Versicherungen oder Immobilien korrekt deklarieren möchten.",
    },
    {
      question: "Wie lange dauert die Bearbeitung meiner Steuererklärung?",
      answer: "Die durchschnittliche Bearbeitungszeit durch das Finanzamt beträgt 6-8 Wochen nach Einreichung. Wir erstellen Ihre Steuererklärung in der Regel innerhalb von 14 Tagen nach Erhalt aller benötigten Unterlagen.",
    },
    {
      question: "Welche Dokumente werden für die Steuererklärung benötigt?",
      answer: "Typischerweise benötigen wir Ihre Lohnsteuerbescheinigung, Belege für Versicherungen, Nachweise über Werbungskosten, Spendenquittungen und weitere relevante Dokumente. Nach der Prognose erhalten Sie eine individuell auf Sie zugeschnittene Checkliste.",
    },
    {
      question: "Wie hoch sind die Kosten für Ihre Dienstleistung?",
      answer: "Unsere Vergütung beträgt 30% Ihrer tatsächlichen Steuererstattung. Sie erfahren zunächst kostenlos durch unsere Prognose, wie viel Sie voraussichtlich zurückbekommen. Wenn Sie sich entscheiden fortzufahren, zahlen Sie 30% der prognostizierten Summe im Voraus. Sollte die tatsächliche Erstattung niedriger ausfallen, erstatten wir Ihnen die Differenz zurück – Sie zahlen garantiert nur 30% dessen, was Sie wirklich erhalten.",
    },
    {
      question: "Gibt es eine Frist für die Steuererklärung?",
      answer: "Die reguläre Abgabefrist für die Steuererklärung 2024 endet am 31. Juli 2025. Mit steuerlicher Beratung verlängert sich die Frist bis zum 28. Februar 2026. Wir empfehlen jedoch, frühzeitig zu beginnen, um Ihre Erstattung schneller zu erhalten.",
    },
    {
      question: "Kann ich auch Steuererklärungen für vergangene Jahre nachreichen?",
      answer: "Ja, Sie können Steuererklärungen für bis zu vier Jahre rückwirkend einreichen (ohne Verpflichtung zur Abgabe). Wir prüfen gerne Ihre individuelle Situation und beraten Sie zu möglichen Erstattungen aus Vorjahren.",
    },
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
            <span className="text-sm font-medium text-primary">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto font-light">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um Ihre Steuererklärung
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
