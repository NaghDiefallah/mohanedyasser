import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/logo-icon.png';
const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'silence' | 'reveal' | 'complete'>('silence');
  const {
    t,
    isRTL,
    language
  } = useLanguage();
  const {
    theme
  } = useTheme();

  // Cinematic reveal with silence
  useEffect(() => {
    const silenceTimer = setTimeout(() => {
      setPhase('reveal');
    }, 800);
    return () => clearTimeout(silenceTimer);
  }, []);
  useEffect(() => {
    if (phase !== 'reveal') return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out'
        },
        onComplete: () => setPhase('complete')
      });
      gsap.set('.hero-element', {
        y: 60,
        opacity: 0
      });

      // Staggered reveal
      tl.to('.hero-element', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      }, 0.2);
    }, containerRef);
    return () => ctx.revert();
  }, [phase]);

  // Dynamic background based on theme
  const bgOverlay = theme === 'light' ? 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 50% 95% / 0.3) 0%, transparent 60%)' : 'radial-gradient(ellipse 80% 60% at 30% 50%, hsl(195 100% 50% / 0.08) 0%, transparent 50%)';
  return <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12" key={language}>
      {/* Subtle background overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
      background: bgOverlay
    }} />
      
      {/* Geometric light streaks - only in dark mode */}
      {theme === 'dark' && <>
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20" style={{
        background: 'linear-gradient(135deg, transparent 30%, hsl(195 100% 50% / 0.1) 50%, transparent 70%)'
      }} />
          <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 pointer-events-none opacity-10" style={{
        background: 'radial-gradient(ellipse at center, hsl(300 50% 50% / 0.2) 0%, transparent 70%)'
      }} />
        </>}

      {/* Main content */}
      <div className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-20 ${isRTL ? 'font-arabic' : ''}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isRTL ? 'direction-rtl' : ''}`}>
          
          {/* Left Sidebar - Logo & Stats */}
          <motion.div className={`lg:col-span-3 flex flex-col items-center lg:items-start gap-8 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`} initial={{
          opacity: 0,
          x: isRTL ? 40 : -40
        }} animate={{
          opacity: phase !== 'silence' ? 1 : 0,
          x: phase !== 'silence' ? 0 : isRTL ? 40 : -40
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
            {/* Logo */}
            <div className="hero-element relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-xl flex items-center justify-center overflow-hidden" style={{
              background: theme === 'dark' ? 'linear-gradient(135deg, hsl(220 30% 12%) 0%, hsl(220 30% 8%) 100%)' : 'linear-gradient(135deg, hsl(210 20% 98%) 0%, hsl(210 20% 95%) 100%)',
              boxShadow: theme === 'dark' ? '0 0 30px hsl(195 100% 50% / 0.15), inset 0 1px 0 hsl(195 100% 50% / 0.1)' : '0 10px 40px hsl(210 20% 50% / 0.15)',
              border: theme === 'dark' ? '1px solid hsl(195 100% 50% / 0.2)' : '1px solid hsl(210 20% 90%)'
            }}>
                <img alt="Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" src="/lovable-uploads/4aebbd86-f802-4ff0-af74-268afb8d1275.png" />
              </div>
            </div>

            {/* Stats */}
            <div className="hero-element flex flex-row lg:flex-col gap-4 lg:gap-3 text-center lg:text-left">
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-primary">{t.hero.projects}</span>
              </div>
              <div className="w-px lg:w-12 h-6 lg:h-px bg-border lg:my-1" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-primary">{t.hero.experience}</span>
              </div>
              <div className="w-px lg:w-12 h-6 lg:h-px bg-border lg:my-1" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-primary">{t.hero.response}</span>
              </div>
            </div>
          </motion.div>

          {/* Main Content - Center Right */}
          <div className={`lg:col-span-9 ${isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
            {/* Name */}
            <motion.p className="hero-element text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-4" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: phase !== 'silence' ? 1 : 0,
            y: phase !== 'silence' ? 0 : 30
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }}>
              {t.hero.name}
            </motion.p>

            {/* Main Heading */}
            <motion.div className="hero-element mb-6" initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: phase !== 'silence' ? 1 : 0,
            y: phase !== 'silence' ? 0 : 50
          }} transition={{
            duration: 0.9,
            delay: 0.5
          }}>
              <h1 className="text-[clamp(4rem,12vw,10rem)] leading-[0.9] font-bold tracking-[-0.02em]" style={{
              fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif"
            }}>
                <span className="block text-foreground">{t.hero.title1}</span>
                <span className="block text-primary" style={{
                textShadow: theme === 'dark' ? '0 0 40px hsl(195 100% 50% / 0.5)' : 'none'
              }}>
                  {t.hero.title2}
                </span>
              </h1>
            </motion.div>

            {/* Software Stack */}
            <motion.p className="hero-element text-sm md:text-base text-muted-foreground mb-10 max-w-xl leading-relaxed" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: phase !== 'silence' ? 1 : 0,
            y: phase !== 'silence' ? 0 : 30
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
              {t.hero.software}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className={`hero-element flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: phase !== 'silence' ? 1 : 0,
            y: phase !== 'silence' ? 0 : 30
          }} transition={{
            duration: 0.8,
            delay: 0.7
          }}>
              <Button size="lg" className="group gap-3 px-8 py-6 font-bold uppercase tracking-wider text-base" style={{
              boxShadow: '0 0 30px hsl(195 100% 50% / 0.4), 0 0 60px hsl(195 100% 50% / 0.2)'
            }}>
                {t.hero.seeMyWork}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button variant="outline" size="lg" className="group gap-3 px-8 py-6 font-bold uppercase tracking-wider text-base border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5">
                <MessageCircle className="w-5 h-5" />
                {t.hero.letsTalk}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
};
export default CinematicHero;