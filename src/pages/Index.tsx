import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyClairmont from "@/components/WhyClairmont";
import Testimonials from "@/components/Testimonials";
import Statistics from "@/components/Statistics";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

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
    </div>
  );
};

export default Index;
