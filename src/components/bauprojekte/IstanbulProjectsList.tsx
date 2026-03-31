import { useNavigate } from "react-router-dom";
import { MapPin, Building2, ArrowRight, Search, Clock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import aktasLife from "@/assets/projects/istanbul/aktas-life.jpg";
import ctaBg from "@/assets/projects/istanbul/cta-bg.jpg";

const IstanbulProjectsList = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("nav", "buildingProjects")} – Istanbul
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            In einer der prestigeträchtigsten Gegenden Istanbuls, Sarıyer, erwartet Sie ein ruhiges und naturnahes Leben.
          </p>
        </div>

        {/* Aktaş Life Zekeriyaköy - Featured Project */}
        <div className="rounded-[2.5rem] overflow-hidden border border-border/50 bg-card mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src={aktasLife}
                alt="Aktaş Life Zekeriyaköy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
                <Home className="w-4 h-4" />
                Exklusives Villenprojekt
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Aktaş Life Zekeriyaköy
              </h2>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
                <MapPin className="w-4 h-4" />
                Uskumruköy, Sarıyer – Istanbul
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Ein exklusives Wohnprojekt bestehend aus 10 freistehenden Villen mit privaten Gärten, direkt an der Kilyos Caddesi. Moderne Architektur harmonisch verbunden mit der umliegenden grünen Natur. Hervorragende Verkehrsanbindung zur Nordmarmara-Autobahn, Strände von Kilyos, Belgrader Wald und Zentrum von Sarıyer in wenigen Minuten erreichbar.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Typ</p>
                  <p className="text-sm font-medium text-foreground">Freistehende Villen</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Einheiten</p>
                  <p className="text-sm font-medium text-foreground">10 Villen</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Preis</p>
                  <p className="text-sm font-medium text-foreground">ab 1.000.000 USD</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> Im Bau
                  </p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mb-6 space-y-1">
                <p>• Verkauf über notariellen Kaufvorvertrag (Satış Vaadi Sözleşmesi)</p>
                <p>• Fertigstellung und Übergabe Ende des Jahres geplant</p>
              </div>

              <Button
                className="rounded-full gap-2 w-fit"
                onClick={() => navigate("/kontakt")}
              >
                Interesse bekunden <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Coming Soon Info */}
        <div className="rounded-2xl border border-border/50 bg-card p-8 text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Weitere Projekte folgen in Kürze</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Wir arbeiten aktuell an weiteren exklusiven Istanbul-Projekten. Besuchen Sie diese Seite bald wieder oder kontaktieren Sie uns für aktuelle Informationen.
          </p>
        </div>

        {/* CTA Box */}
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <img src={ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 p-10 md:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <Search className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Nichts Passendes gefunden?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Erstellen Sie einen kostenlosen Suchauftrag und wir finden die perfekte Immobilie für Sie – ganz nach Ihren Wünschen.
            </p>
            <Button size="lg" className="rounded-full px-10 py-6 text-base gap-2" onClick={() => navigate("/kontakt")}>
              Jetzt Suchauftrag anlegen <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-xs text-white/50 mt-4">Kostenlos & unverbindlich</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IstanbulProjectsList;
