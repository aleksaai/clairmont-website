import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const languageLabels: Record<Language, string> = {
  de: '🇩🇪 DE',
  en: '🇬🇧 EN',
  tr: '🇹🇷 TR',
};

const leistungenItems = [
  { label: "Steueroptimierung Unternehmen", path: "/steuerberatung" },
  { label: "Steueroptimierung Arbeitnehmer", path: "/steueroptimierung-arbeitnehmer" },
  { label: "Global Sourcing & Deals", path: "/global-sourcing" },
  { label: "Unternehmensberatung", path: "/unternehmensberatung" },
  { label: "AI & Due Diligence", path: "/ai-due-diligence" },
  { label: "Payment Solutions", path: "/payment-solutions" },
  { label: "Solaranlagen & Wärmepumpen", path: "/solaranlagen" },
  { label: "Immobilien", path: "/immobilien" },
  { label: "Karriere & Partnerschaften", path: "/karriere" },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    setMobileOpen(false);
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
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const LanguageSwitcher = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm flex items-center gap-1">
        <Globe className="w-4 h-4" />
        <ChevronDown className="w-3 h-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-white/10">
        {(['de', 'en', 'tr'] as Language[]).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`cursor-pointer text-[hsl(var(--glass-text))] ${language === lang ? 'font-semibold' : ''}`}
          >
            {languageLabels[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-6">
      <div className="max-w-6xl mx-auto bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-white/10 rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Clairmont Advisory Logo" className="h-8 w-8" />
          <span className="text-[hsl(var(--glass-text))] font-medium text-lg">Clairmont Advisory</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button onClick={scrollToTop} className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm">
            {t('nav', 'home')}
          </button>
          <button onClick={() => scrollToSection('why-clairmont')} className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm">
            {t('nav', 'about')}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm flex items-center gap-1">
              {t('nav', 'services')}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-white/10 w-64">
              {leistungenItems.map((item) => (
                <DropdownMenuItem
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer text-[hsl(var(--glass-text))]"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm flex items-center gap-1">
              {t('nav', 'forms')}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-white/10">
              <DropdownMenuItem onClick={() => navigate("/prognose")} className="cursor-pointer text-[hsl(var(--glass-text))]">
                {t('nav', 'taxPrognosis')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/selbstauskunft")} className="cursor-pointer text-[hsl(var(--glass-text))]">
                {t('nav', 'privateLoan')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/baufinanzierung-selbstauskunft")} className="cursor-pointer text-[hsl(var(--glass-text))]">
                {t('nav', 'mortgage')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button onClick={() => scrollToSection('faq')} className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors text-sm">
            {t('nav', 'faq')}
          </button>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-[hsl(var(--glass-text))]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[hsl(var(--glass-bg))] backdrop-blur-xl border-white/10 overflow-y-auto">
              <div className="flex flex-col gap-4 mt-8">
                <button onClick={scrollToTop} className="text-[hsl(var(--glass-text))] text-lg text-left">{t('nav', 'home')}</button>
                <button onClick={() => scrollToSection('why-clairmont')} className="text-[hsl(var(--glass-text))] text-lg text-left">{t('nav', 'about')}</button>
                
                <div className="text-[hsl(var(--glass-text))] text-lg font-semibold mt-2">{t('nav', 'services')}</div>
                {leistungenItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMobileOpen(false); }}
                    className="text-[hsl(var(--glass-text))] text-base text-left pl-4"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="text-[hsl(var(--glass-text))] text-lg font-semibold mt-2">{t('nav', 'forms')}</div>
                <button onClick={() => { navigate("/prognose"); setMobileOpen(false); }} className="text-[hsl(var(--glass-text))] text-base text-left pl-4">{t('nav', 'taxPrognosis')}</button>
                <button onClick={() => { navigate("/selbstauskunft"); setMobileOpen(false); }} className="text-[hsl(var(--glass-text))] text-base text-left pl-4">{t('nav', 'privateLoan')}</button>
                <button onClick={() => { navigate("/baufinanzierung-selbstauskunft"); setMobileOpen(false); }} className="text-[hsl(var(--glass-text))] text-base text-left pl-4">{t('nav', 'mortgage')}</button>

                <button onClick={() => scrollToSection('faq')} className="text-[hsl(var(--glass-text))] text-lg text-left mt-2">{t('nav', 'faq')}</button>
                <Button className="rounded-full mt-4" onClick={() => { navigate("/kontakt"); setMobileOpen(false); }}>{t('nav', 'contact')}</Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button variant="glass" className="hidden md:inline-flex rounded-full px-5 py-2 text-sm" onClick={() => navigate("/kontakt")}>
            {t('nav', 'contact')}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
