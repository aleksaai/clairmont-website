import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroMountain from "@/assets/hero-mountain.png";

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroMountain})`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--glass-bg))] backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[hsl(var(--glass-text))] mb-6 leading-tight">
            Kostenlose Steuer-Prognose<br />
            schnell, transparent, unverbindlich
          </h1>
          
          <p className="text-lg md:text-xl text-[hsl(var(--glass-text))]/90 mb-10 leading-relaxed max-w-xl">
            Erfahren Sie kostenlos, wie viel Steuern Sie zurückbekommen können. Bis zu 5.000€ pro Jahr – einfach, schnell und ohne Risiko.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8" onClick={() => navigate("/prognose")}>
              Jetzt Prognose erhalten
            </Button>
            <Button variant="glass" size="lg" className="rounded-full px-8" onClick={scrollToHowItWorks}>
              Mehr erfahren
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
