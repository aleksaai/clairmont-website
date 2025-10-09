import officeImage from "@/assets/clairmont-office.png";

const WhyClairmont = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6">
            Warum Clairmont Advisory?
          </h2>
          <p className="text-xl md:text-2xl text-primary/70 max-w-3xl mx-auto font-light">
            Mit über 15 Jahren Erfahrung in der Finanzberatung und einem tiefen Verständnis für die Immobilienbranche
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-light text-primary mb-3">Expertise & Erfahrung</h3>
              <p className="text-lg text-primary/60 font-light leading-relaxed">
                Profitieren Sie von jahrelanger Branchenerfahrung und fundierten Marktkenntnissen.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-light text-primary mb-3">Individuelle Beratung</h3>
              <p className="text-lg text-primary/60 font-light leading-relaxed">
                Jede Investition ist einzigartig - wir entwickeln Strategien, die zu Ihnen passen.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-light text-primary mb-3">Transparenz & Vertrauen</h3>
              <p className="text-lg text-primary/60 font-light leading-relaxed">
                Klare Kommunikation und vollständige Transparenz in allen Projektphasen.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] h-[600px]">
              <img 
                src={officeImage} 
                alt="Clairmont Advisory Office" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyClairmont;
