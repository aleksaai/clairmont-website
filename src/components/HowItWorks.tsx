import { Sparkles, TrendingUp, Shield } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Sparkles,
      title: "Daten eingeben",
      number: "01",
      description: "Beantworten Sie ein paar einfache Fragen zu Ihrer beruflichen Situation. Dauert nur 2 Minuten."
    },
    {
      icon: TrendingUp,
      title: "Kostenlose Prognose",
      number: "02",
      description: "Erfahren Sie sofort, wie viel Steuern Sie zurückbekommen können – komplett kostenlos und unverbindlich."
    },
    {
      icon: Shield,
      title: "Steuererklärung einreichen",
      number: "03",
      description: "Optional: Lassen Sie uns Ihre Steuererklärung einreichen. Sie zahlen nur bei Erfolg – 30% der Erstattung."
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground mb-6">
            Wie funktioniert's?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            In nur drei einfachen Schritten zu Ihrer Steuererstattung
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Glass card with hover effect */}
                <div className="relative h-full p-8 rounded-2xl bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-white/20">
                  {/* Number badge */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold text-[hsl(var(--glass-text))] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[hsl(var(--glass-text))]/80">
                    {step.description}
                  </p>

                  {/* Decorative gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Connection line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-5 lg:-right-6 w-10 lg:w-12 h-[2px] bg-gradient-to-r from-primary/50 to-primary/20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
