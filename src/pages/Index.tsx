import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import BentoGrid from "@/components/BentoGrid";
import Services from "@/components/Services";
import StickyFooter from "@/components/StickyFooter";
import LiveBackground from "@/components/LiveBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Live animated background */}
      <LiveBackground />
      
      {/* Main content */}
      <main className="pb-24 relative z-10">
        <Hero />
        <TechStack />
        <BentoGrid />
        <Services />
      </main>

      {/* Sticky Footer */}
      <StickyFooter />
    </div>
  );
};

export default Index;
