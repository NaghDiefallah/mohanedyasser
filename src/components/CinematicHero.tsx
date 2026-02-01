import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'silence' | 'reveal' | 'complete'>('silence');

  // Scroll tracking for second reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-based transforms for reveal section
  const revealOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.15, 0.35], [60, 0]);
  const revealBlur = useTransform(scrollYProgress, [0.15, 0.3], [8, 0]);
  const lineScale = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);

  // Cinematic reveal with silence
  useEffect(() => {
    const silenceTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1500);

    return () => clearTimeout(silenceTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'reveal') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => setPhase('complete'),
      });

      gsap.set('.hero-word', { 
        y: 80, 
        opacity: 0,
        filter: 'blur(8px)',
      });
      gsap.set('.hero-accent-line', { scaleX: 0 });

      tl.to('.hero-word', {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        stagger: 0.3,
        ease: 'power3.out',
      }, 0.3);

      tl.to('.hero-accent-line', {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 1.5);

    }, containerRef);

    return () => ctx.revert();
  }, [phase]);

  return (
    <>
      <section 
        ref={containerRef}
        className="relative min-h-[150vh] flex items-start overflow-hidden"
        style={{ 
          perspective: '1200px',
          background: 'hsl(202 75% 12%)',
        }}
      >
        {/* Fixed hero content */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          {/* Heavy vignette */}
          <div 
            className="absolute inset-0 pointer-events-none z-40"
            style={{
              background: 'radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, hsl(202 75% 8% / 0.8) 100%)',
            }}
          />

          {/* Subtle ambient glow */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 30%, hsl(195 100% 45% / 0.08) 0%, transparent 60%)',
            }}
          />

          {/* Text - centered, minimal */}
          <div className="relative z-30 container mx-auto px-8 md:px-16 lg:px-24 flex flex-col items-center text-center">
            <div className="max-w-4xl">
              {/* The statement - 3 words max per line */}
              <div className="space-y-2">
                <div className="hero-word overflow-hidden">
                  <h1 
                    className="text-[clamp(3rem,10vw,10rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase"
                    style={{ 
                      fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                      color: 'hsl(0 0% 95%)',
                    }}
                  >
                    I
                  </h1>
                </div>
                <div className="hero-word overflow-hidden">
                  <h1 
                    className="text-[clamp(3rem,10vw,10rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase"
                    style={{ 
                      fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                      color: 'hsl(0 0% 95%)',
                    }}
                  >
                    Cut
                  </h1>
                </div>
                <div className="hero-word overflow-hidden">
                  <h1 
                    className="text-[clamp(3rem,10vw,10rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase"
                    style={{ 
                      fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                    }}
                  >
                    <span style={{ color: 'hsl(195 60% 50% / 0.5)' }}>The</span>{' '}
                    <span style={{ color: 'hsl(195 100% 50%)' }}>Noise.</span>
                  </h1>
                </div>
              </div>

              {/* Accent line */}
              <div 
                className="hero-accent-line mt-12 h-[2px] w-32 origin-center mx-auto"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, hsl(195 100% 50% / 0.6) 50%, transparent)',
                }}
              />

              {/* Second reveal - context & CTA */}
              <motion.div 
                ref={revealRef}
                className="mt-20"
                style={{ 
                  opacity: revealOpacity,
                  y: revealY,
                  filter: `blur(${revealBlur}px)`,
                }}
              >
                <p 
                  className="text-sm md:text-base font-light tracking-wide max-w-md mx-auto mb-8"
                  style={{ color: 'hsl(195 40% 70%)' }}
                >
                  Video editor & motion designer for brands that refuse to blend in.
                </p>

                {/* Reveal accent line */}
                <motion.div 
                  className="h-[1px] w-16 mb-8 origin-center mx-auto"
                  style={{ 
                    scaleX: lineScale,
                    background: 'hsl(195 100% 50% / 0.3)',
                  }}
                />

                {/* View Work CTA */}
                <motion.a 
                  href="#work"
                  className="group inline-flex items-center gap-4"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <span 
                    className="text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-300"
                    style={{ color: 'hsl(195 100% 50% / 0.6)' }}
                  >
                    View Work
                  </span>
                  <ArrowRight 
                    className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: 'hsl(195 100% 50% / 0.6)' }}
                  />
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint - appears late */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'complete' ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div 
                className="w-[1px] h-12 origin-top"
                style={{ background: 'hsl(195 100% 50% / 0.3)' }}
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span 
                className="text-[10px] uppercase tracking-[0.3em] font-light"
                style={{ color: 'hsl(195 100% 50% / 0.4)' }}
              >
                Scroll
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CinematicHero;
