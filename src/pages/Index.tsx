import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyClairmont from "@/components/WhyClairmont";
import CreditServices from "@/components/CreditServices";
import RealEstateFinancing from "@/components/RealEstateFinancing";
import Testimonials from "@/components/Testimonials";
import Statistics from "@/components/Statistics";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <WhyClairmont />
      <CreditServices />
      <RealEstateFinancing />
      <Testimonials />
      <Statistics />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
