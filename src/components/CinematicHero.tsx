import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import AnimatedText from './AnimatedText';

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
    }, 600);
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
  const bgOverlay = theme === 'light' ? 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 50% 95% / 0.3) 0%, transparent 60%)' : 'radial-gradient(ellipse 80% 60% at 30% 50%, hsl(195 100% 50% / 0.06) 0%, transparent 50%)';
  return <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20" key={language}>
      {/* Subtle background overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
      background: bgOverlay
    }} />
      
      {/* Geometric light streaks - only in dark mode */}
      {theme === 'dark' && <>
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-15" style={{
        background: 'linear-gradient(135deg, transparent 30%, hsl(195 100% 50% / 0.08) 50%, transparent 70%)'
      }} />
          <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 pointer-events-none opacity-10" style={{
        background: 'radial-gradient(ellipse at center, hsl(300 50% 50% / 0.15) 0%, transparent 70%)'
      }} />
        </>}

      {/* Main content */}
      <div className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 ${isRTL ? 'font-arabic' : ''}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center ${isRTL ? 'direction-rtl' : ''}`}>
          
          {/* Left Sidebar - Massive Logo & Stats - No containers */}
          <div className={`lg:col-span-5 flex flex-col items-center lg:items-start gap-8 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            {/* MASSIVE Logo - Stable position, smooth fade-slide entry */}
            <motion.div 
              className="hero-element"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: phase !== 'silence' ? 1 : 0, 
                y: phase !== 'silence' ? 0 : 30
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2, 
                ease: "easeOut"
              }}
            >
              <img 
                alt="Mohaned Yasser Logo" 
                className="w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] object-contain" 
                style={{
                  filter: theme === 'dark' 
                    ? 'drop-shadow(0 0 60px hsl(195 100% 50% / 0.4)) drop-shadow(0 0 120px hsl(195 100% 50% / 0.25))' 
                    : 'none'
                }} 
                src="/lovable-uploads/4aebbd86-f802-4ff0-af74-268afb8d1275.png" 
              />
            </motion.div>

            {/* Stats - Vertically stacked below logo */}
            <motion.div 
              className="hero-element flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase !== 'silence' ? 1 : 0, y: phase !== 'silence' ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.projects}</span>
              <div className="w-16 h-px bg-primary/30" />
              <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.experience}</span>
              <div className="w-16 h-px bg-primary/30" />
              <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.response}</span>
            </motion.div>
          </div>

          {/* Main Content - Right */}
          <div className={`lg:col-span-7 ${isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
            {/* Name - Centered above heading */}
            <motion.p className="hero-element text-sm md:text-base uppercase tracking-[0.4em] text-muted-foreground mb-4 text-center lg:text-left" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: phase !== 'silence' ? 1 : 0,
            y: phase !== 'silence' ? 0 : 30
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} style={{
            textAlign: isRTL ? 'right' : 'left'
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
              <h1 className="text-[clamp(5rem,15vw,13rem)] leading-[0.85] font-bold tracking-[-0.02em]" style={{
              fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif"
            }}>
                <span className="block text-foreground">
                  {phase !== 'silence' ? (
                    <AnimatedText text={t.hero.title1} delay={0.3} staggerChildren={0.04} />
                  ) : t.hero.title1}
                </span>
                <span className="block" style={{
                color: '#00a8e8',
                textShadow: theme === 'dark' ? '0 0 60px hsl(195 100% 50% / 0.6), 0 0 120px hsl(195 100% 50% / 0.3), 0 0 180px hsl(300 50% 50% / 0.15)' : 'none'
              }}>
                  {phase !== 'silence' ? (
                    <AnimatedText text={t.hero.title2} delay={0.5} staggerChildren={0.04} />
                  ) : t.hero.title2}
                </span>
              </h1>
            </motion.div>

            {/* Software Stack - Only software names */}
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
            <motion.div className={`hero-element flex flex-col sm:flex-row gap-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: phase !== 'silence' ? 1 : 0,
            y: phase !== 'silence' ? 0 : 30
          }} transition={{
            duration: 0.8,
            delay: 0.7
          }}>
              <Button size="lg" className="group gap-3 px-10 py-7 font-bold uppercase tracking-wider text-base" style={{
              backgroundColor: '#00a8e8',
              boxShadow: '0 0 40px hsl(195 100% 50% / 0.5), 0 0 80px hsl(195 100% 50% / 0.25)'
            }}>
                {t.hero.seeMyWork}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button variant="outline" size="lg" className="group gap-3 px-10 py-7 font-bold uppercase tracking-wider text-base hover:bg-primary/5" style={{
              borderColor: 'hsl(195 100% 50% / 0.4)',
              boxShadow: theme === 'dark' ? '0 0 25px hsl(195 100% 50% / 0.15), 0 0 50px hsl(300 50% 50% / 0.05)' : 'none'
            }}>
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