import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { Euro, Users, TrendingUp, Clock } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
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

const StatCard = ({ icon, value, suffix = "", prefix = "", label, duration }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative p-10 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-2xl bg-primary/5 text-primary">
            {icon}
          </div>
          <div className="text-5xl md:text-6xl font-light text-primary tracking-tight">
            {prefix}
            <AnimatedCounter value={value} duration={duration} />
            {suffix}
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[200px]">{label}</p>
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
      duration: 2.5,
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 5000,
      suffix: "+",
      label: "Zufriedene Kunden",
      duration: 2,
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 98,
      suffix: "%",
      label: "Erfolgsquote",
      duration: 1.5,
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: 14,
      suffix: " Tage",
      label: "⌀ Bearbeitungszeit",
      duration: 1,
    },
  ];

  return (
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
  );
};

export default Statistics;
