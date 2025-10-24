import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-6">
      <div className="max-w-6xl mx-auto bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-white/10 rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-[hsl(var(--glass-text))] font-medium text-lg">Clairmont Advisory</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button onClick={scrollToTop} className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm">
            Home
          </button>
          <button onClick={() => scrollToSection('why-clairmont')} className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm">
            Über uns
          </button>
          <button onClick={() => scrollToSection('statistics')} className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm">
            Leistungen
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm">
            FAQ
          </button>
        </div>
        
        <Button variant="glass" className="rounded-full px-5 py-2 text-sm" onClick={() => navigate("/prognose")}>
          Kostenlose Prognose
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
