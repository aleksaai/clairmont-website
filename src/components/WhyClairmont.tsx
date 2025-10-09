import officeImage from "@/assets/clairmont-office.png";

const WhyClairmont = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Warum Clairmont Advisory?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Mit über 15 Jahren Erfahrung in der Finanzberatung und einem tiefen Verständnis für die Immobilienbranche bieten wir Ihnen maßgeschneiderte Lösungen für Ihre Investitionsziele.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Expertise & Erfahrung</h3>
                  <p className="text-muted-foreground">Profitieren Sie von jahrelanger Branchenerfahrung und fundierten Marktkenntnissen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Individuelle Beratung</h3>
                  <p className="text-muted-foreground">Jede Investition ist einzigartig - wir entwickeln Strategien, die zu Ihnen passen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Transparenz & Vertrauen</h3>
                  <p className="text-muted-foreground">Klare Kommunikation und vollständige Transparenz in allen Projektphasen.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={officeImage} 
                alt="Clairmont Advisory Office" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyClairmont;
