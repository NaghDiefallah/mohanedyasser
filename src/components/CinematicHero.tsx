import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'silence' | 'reveal' | 'complete'>('silence');
  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();

  // Cinematic reveal with silence
  useEffect(() => {
    const silenceTimer = setTimeout(() => {
      setPhase('reveal');
    }, 600);
    return () => clearTimeout(silenceTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => setPhase('complete')
      });
      gsap.set('.hero-element', { y: 60, opacity: 0 });

      tl.to('.hero-element', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out'
      }, 0.2);
    }, containerRef);
    return () => ctx.revert();
  }, [phase]);

  // Dynamic background based on theme
  const bgOverlay = theme === 'light' 
    ? 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 50% 95% / 0.3) 0%, transparent 60%)' 
    : 'radial-gradient(ellipse 80% 60% at 30% 50%, hsl(195 100% 50% / 0.06) 0%, transparent 50%)';

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20" 
      key={language}
    >
      {/* Subtle background overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: bgOverlay }} 
      />
      
      {/* Geometric light streaks - only in dark mode */}
      {theme === 'dark' && (
        <>
          <div 
            className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-15" 
            style={{
              background: 'linear-gradient(135deg, transparent 30%, hsl(195 100% 50% / 0.08) 50%, transparent 70%)'
            }} 
          />
          <div 
            className="absolute bottom-0 left-1/4 w-1/3 h-1/2 pointer-events-none opacity-10" 
            style={{
              background: 'radial-gradient(ellipse at center, hsl(300 50% 50% / 0.15) 0%, transparent 70%)'
            }} 
          />
        </>
      )}

      {/* Main content */}
      <div className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-24 xl:px-32 ${isRTL ? 'font-arabic' : ''}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${isRTL ? 'direction-rtl' : ''}`}>
          
          {/* Left Sidebar - Logo & Stats - No containers */}
          <motion.div 
            className={`lg:col-span-4 flex flex-col items-center lg:items-start gap-10 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={{ 
              opacity: phase !== 'silence' ? 1 : 0, 
              x: phase !== 'silence' ? 0 : (isRTL ? 40 : -40) 
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Large Logo - No container/border */}
            <div className="hero-element">
              <img 
                alt="Mohaned Yasser Logo" 
                className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 object-contain drop-shadow-2xl"
                style={{
                  filter: theme === 'dark' ? 'drop-shadow(0 0 30px hsl(195 100% 50% / 0.3))' : 'drop-shadow(0 10px 30px hsl(210 20% 40% / 0.2))'
                }}
                src="/lovable-uploads/4aebbd86-f802-4ff0-af74-268afb8d1275.png" 
              />
            </div>

            {/* Stats - Clean, no boxes */}
            <div className="hero-element flex flex-row lg:flex-col gap-6 lg:gap-5">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">{t.hero.projects}</span>
              </div>
              <div className="w-px lg:w-16 h-8 lg:h-px bg-primary/20" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">{t.hero.experience}</span>
              </div>
              <div className="w-px lg:w-16 h-8 lg:h-px bg-primary/20" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">{t.hero.response}</span>
              </div>
            </div>
          </motion.div>

          {/* Main Content - Right */}
          <div className={`lg:col-span-8 ${isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
            {/* Name */}
            <motion.p 
              className="hero-element text-sm md:text-base uppercase tracking-[0.35em] text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: phase !== 'silence' ? 1 : 0, 
                y: phase !== 'silence' ? 0 : 30 
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t.hero.name}
            </motion.p>

            {/* Main Heading */}
            <motion.div 
              className="hero-element mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: phase !== 'silence' ? 1 : 0, 
                y: phase !== 'silence' ? 0 : 50 
              }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <h1 
                className="text-[clamp(4.5rem,14vw,12rem)] leading-[0.85] font-bold tracking-[-0.02em]"
                style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-foreground">{t.hero.title1}</span>
                <span 
                  className="block text-primary"
                  style={{
                    textShadow: theme === 'dark' ? '0 0 60px hsl(195 100% 50% / 0.5), 0 0 120px hsl(195 100% 50% / 0.3)' : 'none'
                  }}
                >
                  {t.hero.title2}
                </span>
              </h1>
            </motion.div>

            {/* Software Stack */}
            <motion.p 
              className="hero-element text-base md:text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: phase !== 'silence' ? 1 : 0, 
                y: phase !== 'silence' ? 0 : 30 
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t.hero.software}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className={`hero-element flex flex-col sm:flex-row gap-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: phase !== 'silence' ? 1 : 0, 
                y: phase !== 'silence' ? 0 : 30 
              }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button 
                size="lg" 
                className="group gap-3 px-10 py-7 font-bold uppercase tracking-wider text-base"
                style={{
                  boxShadow: '0 0 35px hsl(195 100% 50% / 0.4), 0 0 70px hsl(195 100% 50% / 0.2)'
                }}
              >
                {t.hero.seeMyWork}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group gap-3 px-10 py-7 font-bold uppercase tracking-wider text-base border-primary/30 hover:border-primary hover:bg-primary/5"
                style={{
                  boxShadow: theme === 'dark' ? '0 0 20px hsl(195 100% 50% / 0.1)' : 'none'
                }}
              >
                <MessageCircle className="w-5 h-5" />
                {t.hero.letsTalk}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;