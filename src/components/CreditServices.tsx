import { Building2, TrendingUp, Shield, CheckCircle } from "lucide-react";

const CreditServices = () => {
  const benefits = [
    "Unabhängige Beratung ohne Bankbindung",
    "Vergleich von über 400 Kreditanbietern",
    "Optimierung Ihrer Kreditkonditionen",
    "Begleitung bis zur Auszahlung"
  ];

  return (
    <section id="credit-services" className="py-32 px-6 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6">
            Kreditberatung & Privatkredite
          </h2>
          <p className="text-xl md:text-2xl text-primary/70 max-w-3xl mx-auto font-light">
            Maßgeschneiderte Finanzierungslösungen für Ihre individuellen Bedürfnisse
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="relative p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-primary mb-4">
              Immobilienfinanzierung
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-primary/60 font-light">
              Optimale Konditionen für Ihren Immobilienkauf oder Ihre Anschlussfinanzierung
            </p>
          </div>

          <div className="relative p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-primary mb-4">
              Umschuldung
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-primary/60 font-light">
              Reduzieren Sie Ihre monatlichen Belastungen durch Zusammenführung bestehender Kredite
            </p>
          </div>

          <div className="relative p-10 rounded-3xl bg-white/80 backdrop-blur-sm shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-primary mb-4">
              Privatkredite
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-primary/60 font-light">
              Flexible Finanzierungslösungen für Ihre persönlichen Projekte und Investitionen
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-primary/5 p-10 md:p-16">
          <h3 className="text-3xl md:text-4xl font-light text-primary mb-8 text-center">
            Ihre Vorteile
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg text-primary/70 font-light">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditServices;
