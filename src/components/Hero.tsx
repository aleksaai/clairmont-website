import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heroBg1 from "@/assets/hero-mountain-1.png";
import heroBg2 from "@/assets/hero-mountain-2.png";
import heroBg3 from "@/assets/hero-mountain-3.png";
import heroBg4 from "@/assets/hero-mountain-4.png";

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [heroBg1, heroBg2, heroBg3, heroBg4];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000); // Change every 10 seconds
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Rotating Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            opacity: currentImageIndex === index ? 1 : 0,
          }}
        />
      ))}
      
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
