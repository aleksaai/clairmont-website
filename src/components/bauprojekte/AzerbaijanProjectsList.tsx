import { useNavigate } from "react-router-dom";
import { MapPin, Building2, ArrowRight, Search, Clock, Shield, Waves, Dumbbell, Car, TreePine, Store, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImg from "@/assets/projects/azerbaijan/imperial-residence.jpg";
import amenitiesImg from "@/assets/projects/azerbaijan/imperial-amenities.jpg";
import interiorImg from "@/assets/projects/azerbaijan/imperial-interior.jpg";
import ctaBg from "@/assets/projects/azerbaijan/cta-bg.jpg";
import { useState } from "react";

const images = [heroImg, interiorImg, amenitiesImg];
const imageLabels = ["Außenansicht", "Interieur", "Amenities"];

const units = [
  { type: "Studio", size: "35 – 45 m²", priceFrom: "ab ca. 71.750 €" },
  { type: "1-Zimmer-Wohnung", size: "50 – 70 m²", priceFrom: "ab ca. 102.500 €" },
  { type: "2-Zimmer-Wohnung", size: "80 – 110 m²", priceFrom: "ab ca. 164.000 €" },
  { type: "3-Zimmer-Wohnung", size: "120 – 160 m²", priceFrom: "ab ca. 246.000 €" },
  { type: "Penthouse", size: "180 – 250 m²", priceFrom: "Auf Anfrage" },
];

const amenities = [
  { icon: Shield, label: "24/7 Sicherheit & Videoüberwachung" },
  { icon: Waves, label: "Schwimmbad exklusiv für Bewohner" },
  { icon: Dumbbell, label: "Fitnesszentrum" },
  { icon: Car, label: "Tiefgarage" },
  { icon: TreePine, label: "Großzügige Grünflächen" },
  { icon: Store, label: "Restaurants, Cafés & Dienstleistungen" },
];

const AzerbaijanProjectsList = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("nav", "buildingProjects")} – Aserbaidschan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium-Wohnkomplex im Herzen von Baku – Prestige, Sicherheit und Komfort auf höchstem Niveau.
          </p>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-4">
          <img src={images[activeImage]} alt="Imperial Residence" className="w-full h-[300px] md:h-[500px] object-cover" />
        </div>
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={imageLabels[i]} className="w-24 h-16 object-cover" />
              <span className="text-[10px] text-muted-foreground block text-center py-0.5">{imageLabels[i]}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Imperial Residence</h2>
              <div className="flex flex-wrap gap-4 text-muted-foreground text-sm mb-1">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Baku, Aserbaidschan – nahe Metrostation Nizami</span>
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Chapman Taylor (Architektur)</span>
              </div>
              <span className="flex items-center gap-1.5 text-primary text-sm font-medium">
                <Clock className="w-4 h-4" /> Übergabe 1. Bauphase: Dezember 2026
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Über das Projekt</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Imperial Residence vereint Prestige, Sicherheit und Komfort und bietet Ihnen ein luxuriöses Wohnerlebnis mit hochwertigen Premium-Apartments im Zentrum der Stadt. Zeitlose Architektur im Londoner Stil, entworfen vom internationalen Architekturbüro Chapman Taylor.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Der Wohnkomplex erstreckt sich über eine Gesamtfläche von 6 Hektar und besteht aus 11 Wohngebäuden mit 14 bis 18 Etagen. Die Anlage wurde als hochwertiger Luxus-Wohnkomplex konzipiert, der modernes Stadtleben mit Komfort, Sicherheit und exklusiver Infrastruktur verbindet.
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Ausstattung & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <a.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Units table */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Verfügbare Einheiten</h3>
              <div className="overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Typ</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Fläche</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Preis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {units.map((unit, i) => (
                      <tr key={i} className="border-t border-border/30">
                        <td className="py-3 px-4 text-foreground font-medium">{unit.type}</td>
                        <td className="py-3 px-4 text-muted-foreground">{unit.size}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{unit.priceFrom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Basispreis: ca. 2.050 € / m² · Preise sind Richtwerte und können je nach Etage und Ausrichtung variieren.</p>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Zahlungsbedingungen</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h4 className="font-medium text-foreground">Sofortzahlung</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Barzahlung zum Festpreis</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h4 className="font-medium text-foreground">Ratenzahlung</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Zinsfrei bis zu 24 oder 36 Monate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-border/50 bg-card p-6 space-y-5">
              <h3 className="text-lg font-semibold text-foreground">Interesse an Imperial Residence?</h3>
              <p className="text-sm text-muted-foreground">
                Kontaktieren Sie uns für detaillierte Grundrisse, genaue Preise und eine persönliche Beratung.
              </p>
              <Button className="w-full rounded-full gap-2" onClick={() => navigate("/kontakt?service=immobilien")}>
                Kontakt aufnehmen <ChevronRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">Kostenlos & unverbindlich</p>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <img src={ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 p-10 md:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <Search className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Nichts Passendes gefunden?</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Erstellen Sie einen kostenlosen Suchauftrag und wir finden die perfekte Immobilie für Sie.
            </p>
            <Button size="lg" className="rounded-full px-10 py-6 text-base gap-2" onClick={() => navigate("/kontakt?service=immobilien")}>
              Jetzt Suchauftrag anlegen <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-xs text-white/50 mt-4">Kostenlos & unverbindlich</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AzerbaijanProjectsList;
