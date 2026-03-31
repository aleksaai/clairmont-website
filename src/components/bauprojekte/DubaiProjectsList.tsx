import { useNavigate } from "react-router-dom";
import { dubaiProjects } from "@/data/dubaiProjects";
import { MapPin, Building2, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import ctaBg from "@/assets/projects/dubai/cta-bg.jpg";

const DubaiProjectsList = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("nav", "buildingProjects")} – Dubai
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entdecken Sie unsere exklusiven Immobilienprojekte in Dubai – von luxuriösen Villen bis zu modernen Apartments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dubaiProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => navigate(`/bauprojekte/dubai/${project.id}`)}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.district}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Building2 className="w-4 h-4" />
                  {project.developer}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.units.slice(0, 3).map((unit, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {unit.bedrooms}
                    </span>
                  ))}
                  {project.units.length > 3 && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      +{project.units.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">ab</span>
                    <p className="text-sm font-semibold text-foreground">{project.units[0].priceFrom}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-20 relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 backdrop-blur-2xl p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Search className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Nichts Passendes gefunden?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Erstellen Sie einen kostenlosen Suchauftrag und wir finden die perfekte Immobilie für Sie – ganz nach Ihren Wünschen.
            </p>
            <Button
              size="lg"
              className="rounded-full px-10 py-6 text-base gap-2"
              onClick={() => navigate("/kontakt")}
            >
              Jetzt Suchauftrag anlegen <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-xs text-muted-foreground mt-4">Kostenlos & unverbindlich</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DubaiProjectsList;
