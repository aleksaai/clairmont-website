import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { Banknote, UserCheck, Target, Timer, Info } from "lucide-react";
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
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
        
        <div className="relative flex flex-col items-center text-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md" />
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/10">
              {icon}
            </div>
          </div>
          
          <div className="text-5xl md:text-6xl font-bold text-primary tracking-tight bg-gradient-to-br from-primary to-primary/70 bg-clip-text">
            {prefix}
            <AnimatedCounter value={value} duration={duration} />
            {suffix}
          </div>
          
          <div className="flex items-center gap-2 justify-center min-h-[48px]">
            <p className="text-foreground/80 text-sm md:text-base font-medium leading-tight max-w-[200px]">{label}</p>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <button className="flex-shrink-0 p-1.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[280px] md:max-w-[340px] p-4 z-[100] bg-popover/95 backdrop-blur-sm border-primary/20" side="top" sideOffset={8}>
                <p className="text-sm leading-relaxed text-popover-foreground">{tooltip}</p>
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
      icon: <Banknote className="w-7 h-7" />,
      value: 3800,
      prefix: "€",
      label: "⌀ Rückerstattung",
      tooltip: "Basierend auf den Erstattungen unserer Mandanten der letzten Jahre. Die tatsächliche Rückerstattung hängt immer von Ihrer persönlichen Situation ab und kann höher oder niedriger ausfallen.",
      duration: 2.5,
    },
    {
      icon: <UserCheck className="w-7 h-7" />,
      value: 5000,
      suffix: "+",
      label: "Zufriedene Kunden",
      tooltip: "Mehr als 5.000 zufriedene Mandanten in allen 16 Bundesländern Deutschlands.",
      duration: 2,
    },
    {
      icon: <Target className="w-7 h-7" />,
      value: 98,
      suffix: "%",
      label: "Erfolgsquote",
      tooltip: "In über 98 % der Fälle weicht die tatsächliche Erstattung höchstens im Rahmen von ca. 50–150 € von unserer Prognose ab. Sollte die Abweichung größer sein und nicht nachvollziehbar begründet werden können, suchen wir gemeinsam nach einer Lösung – Kundenzufriedenheit hat bei uns oberste Priorität.",
      duration: 1.5,
    },
    {
      icon: <Timer className="w-7 h-7" />,
      value: 14,
      suffix: " Tage",
      label: "⌀ Bearbeitungszeit (unser Anteil)",
      tooltip: "Durchschnittliche Bearbeitungszeit durch unser Team ab Vorliegen aller Unterlagen. Die Bearbeitungszeit des Finanzamts ist hiervon unabhängig und kann je nach Bundesland und Auslastung zwischen ca. 1–3 Monaten (schnelle Fälle) und 4–6 Monaten oder länger liegen.",
      duration: 1,
    },
  ];

  return (
    <TooltipProvider>
      <section id="statistics" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-3xl mx-auto mb-20"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center justify-center px-5 py-2 border border-primary/30 rounded-full mb-8 bg-primary/5 backdrop-blur-sm"
            >
              <span className="text-sm font-semibold text-primary">Unsere Erfolge</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-center mb-6 leading-tight">
              Zahlen, die <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">überzeugen</span>
            </h2>
            <p className="text-center text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Tausende Deutsche vertrauen bereits auf unsere Expertise. Werden Sie Teil unserer Erfolgsgeschichte.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
