import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import BentoGrid from "@/components/BentoGrid";
import Services from "@/components/Services";
import StickyFooter from "@/components/StickyFooter";
import LiveBackground from "@/components/LiveBackground";
import Navbar from "@/components/Navbar";
import { Suspense, lazy } from "react";

const ParticleField = lazy(() => import("@/components/ParticleField"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Live animated background */}
      <LiveBackground />
      
      {/* 3D Particle Effect - Full page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>
      {/* Scroll-triggered Navbar */}
      <Navbar />
      
      {/* Main content */}
      <main className="pb-24 relative z-10">
        <Hero />
        <TechStack />
        <section id="work">
          <BentoGrid />
        </section>
        <section id="services">
          <Services />
        </section>
      </main>

      {/* Sticky Footer */}
      <StickyFooter />
    </div>
  );
};

export default Index;
