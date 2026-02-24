import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DeferredSection from "@/components/DeferredSection";
import HeroStatic from "@/components/HeroStatic";
import { useTheme } from "@/contexts/ThemeContext";

// Lazy load heavy components and data-dependent components
const CinematicHero = lazy(() => import("@/components/CinematicHero"));
const Reviews = lazy(() => import("@/components/reviews/Reviews"));
const StackedReelsPreview = lazy(() => import("@/components/StackedReelsPreview"));
const StackedMotionPreview = lazy(() => import("@/components/StackedMotionPreview"));
const ColorGradingSlider = lazy(() => import("@/components/ColorGradingSlider"));
const MixingSoundDesign = lazy(() => import("@/components/MixingSoundDesign"));
const VocalEnhance = lazy(() => import("@/components/VocalEnhance"));
const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  const { theme } = useTheme();
  const [shouldRenderScene, setShouldRenderScene] = useState(false);
  const [shouldRenderCinematicHero, setShouldRenderCinematicHero] = useState(false);

  useEffect(() => {
    if (theme !== 'dark') {
      setShouldRenderScene(false);
      return;
    }

    let timeoutId: number | undefined;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const schedule = () => setShouldRenderScene(true);

    if (win.requestIdleCallback) {
      const idleId = win.requestIdleCallback(schedule, { timeout: 2000 });
      return () => win.cancelIdleCallback?.(idleId);
    }

    timeoutId = window.setTimeout(schedule, 1500);
    return () => window.clearTimeout(timeoutId);
  }, [theme]);

  useEffect(() => {
    let timeoutId: number | undefined;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const schedule = () => setShouldRenderCinematicHero(true);

    if (win.requestIdleCallback) {
      const idleId = win.requestIdleCallback(schedule, { timeout: 2000 });
      return () => win.cancelIdleCallback?.(idleId);
    }

    timeoutId = window.setTimeout(schedule, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);
  
  const bgStyle = theme === 'light'
    ? 'linear-gradient(180deg, hsl(210 20% 98%) 0%, hsl(210 20% 95%) 50%, hsl(210 20% 98%) 100%)'
    : 'linear-gradient(180deg, #030508 0%, #0a1015 50%, #050810 100%)';

  return (
    <div className="min-h-screen relative w-full" style={{ background: bgStyle, overflowX: 'hidden' }}>
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
        
        <Navbar />
        
        {/* Main content */}
        <main className="relative z-10">
          <section id="home">
            {shouldRenderCinematicHero ? (
              <Suspense fallback={<div className="h-screen" />}>
                <CinematicHero />
              </Suspense>
            ) : (
              <HeroStatic />
            )}
          </section>
          <DeferredSection minHeight={520}>
            <section id="work">
              <div id="reels">
                <Suspense fallback={<div className="h-[320px]" />}>
                  <StackedReelsPreview />
                </Suspense>
              </div>
              <div id="motion">
                <Suspense fallback={<div className="h-[320px]" />}>
                  <StackedMotionPreview />
                </Suspense>
              </div>
            </section>
          </DeferredSection>
          <DeferredSection minHeight={420}>
            <section id="color-grading">
              <Suspense fallback={<div className="h-[320px]" />}>
                <ColorGradingSlider />
              </Suspense>
            </section>
          </DeferredSection>
          <DeferredSection minHeight={420}>
            <section id="mixing">
              <Suspense fallback={<div className="h-[320px]" />}>
                <MixingSoundDesign />
              </Suspense>
            </section>
          </DeferredSection>
          <DeferredSection minHeight={320}>
            <section id="vocal-enhance">
              <Suspense fallback={<div className="h-[240px]" />}>
                <VocalEnhance />
              </Suspense>
            </section>
          </DeferredSection>
          <DeferredSection minHeight={420}>
            <section id="services">
              <Suspense fallback={<div className="h-[320px]" />}>
                <Services />
              </Suspense>
            </section>
          </DeferredSection>
          <DeferredSection minHeight={420}>
            <section id="about">
              <Suspense fallback={<div className="h-[320px]" />}>
                <About />
              </Suspense>
            </section>
          </DeferredSection>
          <DeferredSection minHeight={420}>
            <section id="reviews">
              <Suspense fallback={<div className="py-20 px-4" />}>
                <Reviews />
              </Suspense>
            </section>
          </DeferredSection>
          <DeferredSection minHeight={320}>
            <section id="contact">
              <Suspense fallback={<div className="h-[240px]" />}>
                <Contact />
              </Suspense>
            </section>
          </DeferredSection>
        </main>

        {/* Sticky Footer Very broken*/}
        {/* <StickyFooter /> */}
    </div>
  );
};

export default Index;
