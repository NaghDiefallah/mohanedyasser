import CinematicHero from "@/components/CinematicHero";
import StackedReelsPreview from "@/components/StackedReelsPreview";
import StackedMotionPreview from "@/components/StackedMotionPreview";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import About from "@/components/About";
import StickyFooter from "@/components/StickyFooter";
import CinematicScene from "@/components/three/CinematicScene";
import Navbar from "@/components/Navbar";
import ColorGradingSlider from "@/components/ColorGradingSlider";
import VocalEnhance from "@/components/VocalEnhance";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { theme } = useTheme();
  
  const bgStyle = theme === 'light'
    ? 'linear-gradient(180deg, hsl(210 20% 98%) 0%, hsl(210 20% 95%) 50%, hsl(210 20% 98%) 100%)'
    : 'linear-gradient(180deg, #030508 0%, #0a1015 50%, #050810 100%)';

  return (
    <div className="min-h-screen relative w-full" style={{ background: bgStyle, overflowX: 'hidden' }}>
      {/* Three.js cinematic background - only show in dark mode */}
      {theme === 'dark' && <CinematicScene />}
      
      {/* Light mode subtle background */}
      {theme === 'light' && (
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 30%, hsl(195 100% 90% / 0.3) 0%, transparent 60%)',
            }}
          />
        </div>
      )}
      
      {/* Scroll-triggered Navbar */}
      <Navbar />
      
      {/* Main content */}
      <main className="relative z-10">
        <section id="home">
          <CinematicHero />
        </section>
        <section id="work">
          <StackedReelsPreview />
          <StackedMotionPreview />
        </section>
        {/* Color Grading Slider - After Motion Graphics */}
        <section id="color-grading">
          <ColorGradingSlider />
        </section>
        {/* Vocal Enhance - After Color Grading */}
        <section id="vocal-enhance">
          <VocalEnhance />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Sticky Footer */}
      <StickyFooter />
    </div>
  );
};

export default Index;
