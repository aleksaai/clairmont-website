import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const countryKeys: Record<string, string> = {
  dubai: "dubai",
  istanbul: "istanbul",
  aserbaidschan: "azerbaijan",
};

const Bauprojekte = () => {
  const { country } = useParams<{ country: string }>();
  const { t } = useLanguage();

  if (!country || !countryKeys[country]) {
    return <Navigate to="/" replace />;
  }

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
            {countryName} — Projekte werden in Kürze hinzugefügt.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bauprojekte;
