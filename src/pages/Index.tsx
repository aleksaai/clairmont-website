import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyClairmont from "@/components/WhyClairmont";
import Testimonials from "@/components/Testimonials";
import Statistics from "@/components/Statistics";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <WhyClairmont />
      <Testimonials />
      <Statistics />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
