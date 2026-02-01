import CinematicHero from "@/components/CinematicHero";
import BentoGrid from "@/components/BentoGrid";
import Services from "@/components/Services";
import StickyFooter from "@/components/StickyFooter";
import CinematicScene from "@/components/three/CinematicScene";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen text-white relative" style={{ background: 'hsl(202 75% 12%)' }}>
      {/* Three.js cinematic background with volumetric light, particles, and grain */}
      <CinematicScene />
      
      {/* Scroll-triggered Navbar */}
      <Navbar />
      
      {/* Main content */}
      <main className="relative z-10">
        <CinematicHero />
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
