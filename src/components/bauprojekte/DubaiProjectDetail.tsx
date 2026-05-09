import { useNavigate } from "react-router-dom";
import { DubaiProject } from "@/data/dubaiProjects";
import { MapPin, Building2, Calendar, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  project: DubaiProject;
}

const DubaiProjectDetail = ({ project }: Props) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/bauprojekte/dubai")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </button>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <img
            src={project.images[activeImage]}
            alt={project.name}
            className="w-full h-[300px] md:h-[500px] object-cover"
          />
        </div>

        {/* Thumbnail gallery */}
        {project.images.length > 1 && (
          <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{project.name}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {project.district}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> {project.developer}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Übergabe: {project.handover}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Über das Projekt</h2>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Ausstattung</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <h3 className="text-sm font-medium text-foreground mb-1">Finishing & Materialien</h3>
                  <p className="text-sm text-muted-foreground">{project.finishing}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <h3 className="text-sm font-medium text-foreground mb-1">Küche & Geräte</h3>
                  <p className="text-sm text-muted-foreground">{project.kitchen}</p>
                </div>
              </div>
            </div>

            {/* Units table */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Verfügbare Einheiten</h2>
              <div className="overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Typ</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Schlafzimmer</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Fläche</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Preis ab</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.units.map((unit, i) => (
                      <tr key={i} className="border-t border-border/30">
                        <td className="py-3 px-4 text-muted-foreground">{unit.type}</td>
                        <td className="py-3 px-4 text-muted-foreground">{unit.bedrooms}</td>
                        <td className="py-3 px-4 text-muted-foreground">{unit.area}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{unit.priceFrom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-border/50 bg-card p-6 space-y-5">
              <h3 className="text-lg font-semibold text-foreground">Interesse an diesem Projekt?</h3>
              <p className="text-sm text-muted-foreground">
                Füllen Sie eine kurze Selbstauskunft aus und wir melden uns bei Ihnen mit allen Details.
              </p>
              <Button
                className="w-full rounded-full gap-2"
                onClick={() => navigate("/kontakt?service=immobilien")}
              >
                Kontakt aufnehmen <ChevronRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Kostenlos & unverbindlich
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DubaiProjectDetail;
