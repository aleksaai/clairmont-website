import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { dubaiProjects } from "@/data/dubaiProjects";
import DubaiProjectsList from "@/components/bauprojekte/DubaiProjectsList";
import DubaiProjectDetail from "@/components/bauprojekte/DubaiProjectDetail";
import IstanbulProjectsList from "@/components/bauprojekte/IstanbulProjectsList";
import AzerbaijanProjectsList from "@/components/bauprojekte/AzerbaijanProjectsList";

const Bauprojekte = () => {
  const { country, projectId } = useParams<{ country: string; projectId?: string }>();
  const { t } = useLanguage();

  const countryKeys: Record<string, string> = {
    dubai: "dubai",
    istanbul: "istanbul",
    aserbaidschan: "azerbaijan",
  };

  if (!country || !countryKeys[country]) {
    return <Navigate to="/" replace />;
  }

  // Dubai with project detail
  if (country === "dubai" && projectId) {
    const project = dubaiProjects.find((p) => p.id === projectId);
    if (!project) return <Navigate to="/bauprojekte/dubai" replace />;
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <DubaiProjectDetail project={project} />
        <Footer />
      </div>
    );
  }

  // Dubai listing
  if (country === "dubai") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <DubaiProjectsList />
        <Footer />
      </div>
    );
  }

  // Istanbul listing
  if (country === "istanbul") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <IstanbulProjectsList />
        <Footer />
      </div>
    );
  }

  // Azerbaijan listing
  if (country === "aserbaidschan") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <AzerbaijanProjectsList />
        <Footer />
      </div>
    );
  }

  // Placeholder for other countries
  const countryName = t("nav", countryKeys[country]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("nav", "buildingProjects")} – {countryName}
          </h1>
          <p className="text-muted-foreground text-lg">
            Projekte werden in Kürze hinzugefügt.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bauprojekte;
