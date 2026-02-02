import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'silence' | 'reveal' | 'complete'>('silence');
  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();

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

  // Dynamic vignette based on theme
  const vignetteStyle = theme === 'light' 
    ? 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, hsl(210 20% 95% / 0.6) 100%)'
    : 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, hsl(220 30% 6% / 0.6) 100%)';

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] flex items-start overflow-hidden"
      style={{ perspective: '1200px' }}
      key={language} // Re-render on language change
    >
      {/* Fixed hero content */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Central vignette focus */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{ background: vignetteStyle }}
        />

        {/* Text content */}
        <div className={`relative z-30 container mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center ${isRTL ? 'font-arabic' : ''}`}>
          <div className="max-w-5xl">
            
            {/* Main headline - dramatic typography */}
            <div className="mb-8" style={{ perspective: '800px' }}>
              {/* Line 1 */}
              <div className="overflow-hidden mb-2">
                <h1 
                  className="text-[clamp(4rem,15vw,12rem)] leading-[0.9] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
                >
                  {splitText(t.hero.line1, 'text-foreground')}
                </h1>
              </div>
              
              {/* Line 2 */}
              <div className="overflow-hidden mb-2">
                <h1 
                  className="text-[clamp(4rem,15vw,12rem)] leading-[0.9] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
                >
                  {splitText(t.hero.line2, 'text-foreground')}
                </h1>
              </div>
              
              {/* Line 3 with accent */}
              <div className="overflow-hidden">
                <h1 
                  className="text-[clamp(4rem,15vw,12rem)] leading-[0.9] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
                >
                  {splitText(t.hero.line3a, 'text-muted-foreground/50')}
                  {splitText(t.hero.line3b, 'text-primary')}
                </h1>
              </div>
            </div>

            {/* Accent line */}
            <div 
              className="hero-line h-[2px] w-24 md:w-32 origin-center mx-auto mb-6"
              style={{ 
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary)) 50%, transparent)',
              }}
            />

            {/* Subtitle */}
            <p 
              className="hero-subtitle text-sm md:text-base lg:text-lg font-light tracking-wide max-w-lg mx-auto text-muted-foreground"
            >
              {t.hero.subtitle}
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
                {t.hero.description}
              </p>

              {/* CTA buttons */}
              <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <motion.a 
                  href="#work"
                  className="group flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-sm hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-primary">
                    {t.hero.viewWork}
                  </span>
                  <ArrowRight className={`w-4 h-4 text-primary group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </motion.a>

                <motion.a 
                  href="#showreel"
                  className="group flex items-center gap-3 px-6 py-3 hover:bg-secondary/30 rounded-sm transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {t.hero.playReel}
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
              {t.hero.scroll}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicHero;
