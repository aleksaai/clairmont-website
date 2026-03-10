import { useLanguage } from "@/i18n/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    { title: t('howItWorks', 'step1Title'), number: "01", description: t('howItWorks', 'step1Desc') },
    { title: t('howItWorks', 'step2Title'), number: "02", description: t('howItWorks', 'step2Desc') },
    { title: t('howItWorks', 'step3Title'), number: "03", description: t('howItWorks', 'step3Desc') },
  ];

  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-primary mb-6">
            {t('howItWorks', 'title')}
          </h2>
          <p className="text-xl md:text-2xl text-primary/70 max-w-3xl mx-auto font-light">
            {t('howItWorks', 'subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="relative h-full p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
                <div className="mb-8">
                  <span className="text-7xl font-extralight text-primary/30">{step.number}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-primary mb-4">{step.title}</h3>
                <p className="text-base md:text-lg leading-relaxed text-primary/60 font-light">{step.description}</p>
              </div>
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
