const HowItWorks = () => {
  const steps = [
    {
      title: "Daten eingeben",
      number: "01",
      description: "Beantworten Sie ein paar einfache Fragen zu Ihrer beruflichen Situation. Dauert nur 2 Minuten."
    },
    {
      title: "Kostenlose Prognose",
      number: "02",
      description: "Erfahren Sie sofort, wie viel Steuern Sie zurückbekommen können – komplett kostenlos und unverbindlich."
    },
    {
      title: "Steuererklärung einreichen",
      number: "03",
      description: "Optional: Lassen Sie uns Ihre Steuererklärung einreichen. Sie zahlen nur bei Erfolg – 30% der Erstattung."
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-primary mb-6">
            Wie funktioniert's?
          </h2>
          <p className="text-xl md:text-2xl text-primary/70 max-w-3xl mx-auto font-light">
            In nur drei einfachen Schritten zu Ihrer Steuererstattung
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              <div className="relative h-full p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-[inset_0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.08)]">
                {/* Large number */}
                <div className="mb-8">
                  <span className="text-7xl font-extralight text-primary/30">{step.number}</span>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-light text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-primary/60 font-light">
                  {step.description}
                </p>
              </div>

              {/* Connection arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 lg:-right-5 items-center">
                  <div className="w-8 lg:w-10 h-[1px] bg-primary/20" />
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-primary/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
