import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Ich habe über 3.200€ zurückbekommen! Der Prozess war super einfach und das Team sehr professionell.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    name: "Anna Schmidt",
    role: "Selbstständige",
  },
  {
    text: "Endlich eine Steuerberatung, die transparent ist. Keine versteckten Kosten, alles klar kommuniziert.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    name: "Michael Weber",
    role: "Angestellter",
  },
  {
    text: "Dank Clairmont Advisory habe ich zum ersten Mal eine Steuererklärung gemacht - völlig stressfrei!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    name: "Sarah Müller",
    role: "Berufseinsteigerin",
  },
  {
    text: "Die Beratung war ausgezeichnet. Ich konnte 4.500€ zurückholen, von denen ich nichts wusste.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    name: "Thomas Fischer",
    role: "Ingenieur",
  },
  {
    text: "Schnell, unkompliziert und professionell. Innerhalb von 2 Wochen hatte ich mein Geld auf dem Konto.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    name: "Julia Becker",
    role: "Marketing Managerin",
  },
  {
    text: "Ich war skeptisch, aber das Team hat alle meine Fragen beantwortet. Absolut empfehlenswert!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    name: "Markus Hoffmann",
    role: "Geschäftsführer",
  },
  {
    text: "Die kostenlose Prognose hat mich überzeugt. 2.800€ Rückerstattung - genau wie vorhergesagt!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    name: "Laura Klein",
    role: "Lehrerin",
  },
  {
    text: "Hervorragender Service! Das Team hat sich um alles gekümmert, ich musste kaum etwas tun.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
    name: "Daniel Braun",
    role: "IT-Berater",
  },
  {
    text: "Transparente Preise, keine Überraschungen. Genau so stelle ich mir moderne Steuerberatung vor.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    name: "Nina Wagner",
    role: "Architektin",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">Testimonials</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary text-center mb-6">
            Was unsere Kunden sagen
          </h2>
          <p className="text-center text-lg text-primary/70 leading-relaxed">
            Erfahren Sie, wie wir anderen geholfen haben, ihre Steuerrückerstattung zu maximieren.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
