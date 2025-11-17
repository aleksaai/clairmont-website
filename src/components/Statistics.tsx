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
      <div className="relative px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary flex-shrink-0">
            {icon}
          </div>
          <div className="flex flex-col">
            <div className="text-2xl md:text-3xl font-light text-primary tracking-tight">
              {prefix}
              <AnimatedCounter value={value} duration={duration} />
              {suffix}
            </div>
            <p className="text-xs md:text-sm text-primary/60 font-light mt-0.5">{label}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Statistics = () => {
  const stats = [
    {
      icon: <Euro className="w-5 h-5" />,
      value: 3800,
      prefix: "€",
      label: "⌀ Rückerstattung",
      duration: 2.5,
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: 5000,
      suffix: "+",
      label: "Zufriedene Kunden",
      duration: 2,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: 98,
      suffix: "%",
      label: "Erfolgsquote",
      duration: 1.5,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      value: 14,
      suffix: " Tage",
      label: "⌀ Bearbeitungszeit",
      duration: 1,
    },
  ];

  return (
    <section id="statistics" className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
