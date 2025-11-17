import { Home, Calculator, FileText, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RealEstateFinancing = () => {
  const features = [
    {
      icon: Calculator,
      title: "Zinsvergleich",
      description: "Vergleich von über 400 Banken und Sparkassen für beste Konditionen"
    },
    {
      icon: FileText,
      title: "Vollständige Betreuung",
      description: "Von der ersten Beratung bis zur Schlüsselübergabe an Ihrer Seite"
    },
    {
      icon: Headphones,
      title: "Persönlicher Ansprechpartner",
      description: "Ein fester Berater für alle Fragen rund um Ihre Baufinanzierung"
    }
  ];

  const financingTypes = [
    "Neubaufinanzierung",
    "Kauffinanzierung",
    "Anschlussfinanzierung",
    "Forward-Darlehen",
    "KfW-Förderung",
    "Modernisierungskredite"
  ];

  return (
    <section id="real-estate-financing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
              <Home className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6">
            Baufinanzierung & Immobilienkredit
          </h2>
          <p className="text-xl md:text-2xl text-primary/70 max-w-3xl mx-auto font-light">
            Ihr Weg zur Traumimmobilie – mit der optimalen Finanzierung
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-primary/10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-light text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-base leading-relaxed text-primary/60 font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-light text-primary mb-8">
              Unsere Finanzierungslösungen
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {financingTypes.map((type, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-primary/5 border border-primary/10"
                >
                  <p className="text-base text-primary/70 font-light">{type}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-light text-primary mb-6">
              Warum Baufinanzierung mit uns?
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-lg text-primary/70 font-light">
                  Unabhängige Beratung ohne Bankbindung
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-lg text-primary/70 font-light">
                  Kostenfreie Erstberatung und Finanzierungscheck
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-lg text-primary/70 font-light">
                  Schnelle Zusage und unkomplizierte Abwicklung
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-lg text-primary/70 font-light">
                  Betreuung auch nach der Finanzierung
                </p>
              </div>
            </div>
            <Link to="/prognose">
              <Button size="lg" className="w-full text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                Zur Selbstauskunft
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateFinancing;
