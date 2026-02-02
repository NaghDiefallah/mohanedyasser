import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'silence' | 'reveal' | 'complete'>('silence');

  // Scroll tracking for second reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-based transforms for reveal section
  const revealOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.15, 0.35], [60, 0]);

  // Cinematic reveal with silence
  useEffect(() => {
    const silenceTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1200);

    return () => clearTimeout(silenceTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'reveal') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => setPhase('complete'),
      });

      gsap.set('.hero-char', { 
        y: 120, 
        opacity: 0,
        rotateX: -90,
      });
      gsap.set('.hero-line', { scaleX: 0 });
      gsap.set('.hero-subtitle', { y: 30, opacity: 0 });

      // Character by character reveal
      tl.to('.hero-char', {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out',
      }, 0.2);

      // Accent line
      tl.to('.hero-line', {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 1);

      // Subtitle
      tl.to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 1.2);

    }, containerRef);

    return () => ctx.revert();
  }, [phase]);

  // Split text into characters
  const splitText = (text: string, className: string = '') => {
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className={`hero-char inline-block ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] flex items-start overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Fixed hero content */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Central vignette focus */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, hsl(202 75% 8% / 0.6) 100%)',
          }}
        />

        {/* Text content */}
        <div className="relative z-30 container mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
          <div className="max-w-5xl">
            
            {/* Main headline - dramatic typography */}
            <div className="mb-8" style={{ perspective: '800px' }}>
              {/* "I" */}
              <div className="overflow-hidden mb-2">
                <h1 
                  className="text-[clamp(4rem,15vw,12rem)] leading-[0.9] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {splitText('I', 'text-foreground')}
                </h1>
              </div>
              
              {/* "CUT" */}
              <div className="overflow-hidden mb-2">
                <h1 
                  className="text-[clamp(4rem,15vw,12rem)] leading-[0.9] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {splitText('CUT', 'text-foreground')}
                </h1>
              </div>
              
              {/* "THE NOISE." with accent */}
              <div className="overflow-hidden">
                <h1 
                  className="text-[clamp(4rem,15vw,12rem)] leading-[0.9] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {splitText('THE ', 'text-muted-foreground/50')}
                  {splitText('NOISE.', 'text-primary')}
                </h1>
              </div>
            </div>

            {/* Accent line */}
            <div 
              className="hero-line h-[2px] w-24 md:w-32 origin-left mx-auto mb-6"
              style={{ 
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary)) 50%, transparent)',
              }}
            />

            {/* Subtitle */}
            <p 
              className="hero-subtitle text-sm md:text-base lg:text-lg font-light tracking-wide max-w-lg mx-auto text-muted-foreground"
            >
              Video Editor & Motion Designer
            </p>

            {/* Scroll reveal section */}
            <motion.div 
              className="mt-16 md:mt-20"
              style={{ 
                opacity: revealOpacity,
                y: revealY,
              }}
            >
              {/* Extended description */}
              <p className="text-xs md:text-sm text-muted-foreground/70 max-w-md mx-auto mb-8 leading-relaxed">
                Crafting cinematic experiences for brands that refuse to blend in. 
                From concept to final cut.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a 
                  href="#work"
                  className="group flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-sm hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-primary">
                    View Work
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a 
                  href="#showreel"
                  className="group flex items-center gap-3 px-6 py-3 hover:bg-secondary/30 rounded-sm transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    Play Reel
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'complete' ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              className="w-[1px] h-8 md:h-12 origin-top bg-primary/30"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[9px] uppercase tracking-[0.3em] text-primary/40">
              Scroll
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicHero;
