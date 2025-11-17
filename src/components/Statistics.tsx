import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { Euro, Users, TrendingUp, Clock, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  tooltip: string;
  duration?: number;
}

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("de-DE").format(
          Math.floor(latest)
        );
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

const StatCard = ({ icon, value, suffix = "", prefix = "", label, tooltip, duration }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <div className="p-10 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-2xl bg-primary/5 text-primary">
            {icon}
          </div>
          <div className="text-5xl md:text-6xl font-light text-primary tracking-tight">
            {prefix}
            <AnimatedCounter value={value} duration={duration} />
            {suffix}
          </div>
          <div className="flex items-center gap-2 justify-center">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[200px]">{label}</p>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[280px] md:max-w-[320px] p-4" side="top">
                <p className="text-sm leading-relaxed">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Statistics = () => {
  const stats = [
    {
      icon: <Euro className="w-8 h-8" />,
      value: 3800,
      prefix: "€",
      label: "⌀ Rückerstattung",
      tooltip: "Basierend auf den Erstattungen unserer Mandanten der letzten Jahre. Die tatsächliche Rückerstattung hängt immer von Ihrer persönlichen Situation ab und kann höher oder niedriger ausfallen.",
      duration: 2.5,
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 5000,
      suffix: "+",
      label: "Zufriedene Kunden",
      tooltip: "Mehr als 5.000 zufriedene Mandanten in allen 16 Bundesländern Deutschlands.",
      duration: 2,
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 98,
      suffix: "%",
      label: "Erfolgsquote",
      tooltip: "In über 98 % der Fälle weicht die tatsächliche Erstattung höchstens im Rahmen von ca. 50–150 € von unserer Prognose ab. Sollte die Abweichung größer sein und nicht nachvollziehbar begründet werden können, suchen wir gemeinsam nach einer Lösung – Kundenzufriedenheit hat bei uns oberste Priorität.",
      duration: 1.5,
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: 14,
      suffix: " Tage",
      label: "⌀ Bearbeitungszeit",
      tooltip: "Durchschnittliche Bearbeitungszeit durch unser Team ab Vorliegen aller Unterlagen. Die Bearbeitungszeit des Finanzamts ist hiervon unabhängig und kann je nach Bundesland und Auslastung zwischen ca. 1–3 Monaten (schnelle Fälle) und 4–6 Monaten oder länger liegen.",
      duration: 1,
    },
  ];

  return (
    <TooltipProvider>
      <section id="statistics" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 border border-primary/20 rounded-full mb-6">
              <span className="text-sm font-medium text-primary">Unsere Erfolge</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary text-center mb-6">
              Zahlen, die überzeugen
            </h2>
            <p className="text-center text-lg text-primary/70 leading-relaxed">
              Tausende Deutsche vertrauen bereits auf unsere Expertise. Werden Sie Teil unserer Erfolgsgeschichte.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Statistics;
