import { Mail, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToTop = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="relative py-16 px-6 mt-32 overflow-hidden">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent" />
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      {/* Decorative orb */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-primary font-medium text-xl">Clairmont Advisory</span>
            </div>
            <p className="text-primary/70 text-sm leading-relaxed font-light mb-6">
              Ihre Experten für Steuererstattungen. 
              Wir maximieren Ihre Rückzahlung schnell, sicher und unkompliziert.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@clairmont-advisory.de" className="flex items-center gap-3 text-primary/70 hover:text-primary transition-colors text-sm font-light">
                <Mail className="h-4 w-4" />
                info@clairmont-advisory.de
              </a>
              <a href="tel:+4917684569934" className="flex items-center gap-3 text-primary/70 hover:text-primary transition-colors text-sm font-light">
                <Phone className="h-4 w-4" />
                +49 176 84569934
              </a>
              <div className="flex items-center gap-3 text-primary/70 text-sm font-light">
                <MapPin className="h-4 w-4" />
                Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-primary font-medium mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={scrollToTop} className="text-primary/70 hover:text-primary transition-colors text-sm font-light">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('why-clairmont')} className="text-primary/70 hover:text-primary transition-colors text-sm font-light">
                  Über uns
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('statistics')} className="text-primary/70 hover:text-primary transition-colors text-sm font-light">
                  Leistungen
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="text-primary/70 hover:text-primary transition-colors text-sm font-light">
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-primary font-medium mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/impressum" className="text-primary/70 hover:text-primary transition-colors text-sm font-light">
                  Impressum
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary/70 hover:text-primary transition-colors text-sm font-light">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="text-primary/70 hover:text-primary transition-colors text-sm font-light">
                  AGB
                </a>
              </li>
              <li>
                <a href="#" className="text-primary/70 hover:text-primary transition-colors text-sm font-light">
                  Cookie-Richtlinie
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary/50 text-sm font-light">
              © {new Date().getFullYear()} Clairmont Advisory. Alle Rechte vorbehalten.
            </p>
            <p className="text-primary/50 text-sm font-light">
              Made with ❤️ in Berlin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
