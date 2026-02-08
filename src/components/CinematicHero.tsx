import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import adobeAe from '@/assets/adobe-after-effects.svg';
import adobePr from '@/assets/adobe-premiere-pro.svg';
import adobePs from '@/assets/adobe-photoshop.svg';
import adobeAu from '@/assets/adobe-audition.svg';
import davinciResolve from '@/assets/davinci-resolve.svg';

const softwareList = [
  { src: adobeAe, name: 'After Effects' },
  { src: adobePr, name: 'Premiere Pro' },
  { src: adobeAu, name: 'Audition' },
  { src: davinciResolve, name: 'DaVinci Resolve' },
  { src: adobePs, name: 'Photoshop' },
];

const CinematicHero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.08);
    mouseY.set((e.clientY - centerY) * 0.08);
  };

  const handleLogoMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();

  const bgOverlay = theme === 'light'
    ? 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 50% 95% / 0.3) 0%, transparent 60%)'
    : 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 100% 50% / 0.06) 0%, transparent 50%)';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16" key={language}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: bgOverlay }} />

      {theme === 'dark' && (
        <>
          <div
            className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-15"
            style={{ background: 'linear-gradient(135deg, transparent 30%, hsl(195 100% 50% / 0.08) 50%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-1/3 h-1/2 pointer-events-none opacity-10"
            style={{ background: 'radial-gradient(ellipse at center, hsl(300 50% 50% / 0.15) 0%, transparent 70%)' }}
          />
        </>
      )}

      {/* Single Column Centered Layout */}
      <div className={`relative z-10 container mx-auto px-5 sm:px-6 ${isRTL ? 'font-arabic' : ''}`}>
        <div className="flex flex-col items-center text-center gap-5 md:gap-6 max-w-3xl mx-auto">

          {/* Logo */}
          <motion.div
            ref={logoRef}
            className="flex justify-center"
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              alt="Mohaned Yasser Logo"
              className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain cursor-pointer"
              style={{
                filter: theme === 'dark'
                  ? 'drop-shadow(0 0 40px hsl(195 100% 50% / 0.4)) drop-shadow(0 0 80px hsl(195 100% 50% / 0.25))'
                  : 'none'
              }}
              src="/lovable-uploads/4aebbd86-f802-4ff0-af74-268afb8d1275.png"
              whileHover={{
                scale: 1.05,
                filter: theme === 'dark'
                  ? 'drop-shadow(0 0 60px hsl(195 100% 50% / 0.7)) drop-shadow(0 0 100px hsl(195 100% 50% / 0.5))'
                  : 'drop-shadow(0 0 30px hsl(195 100% 50% / 0.4))'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>

          {/* Name */}
          <motion.p
            className={`text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {t.hero.name}
          </motion.p>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1
              className="text-[clamp(3.5rem,14vw,9rem)] leading-[0.9] font-bold tracking-[-0.02em]"
              style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
            >
              <span className="block text-foreground">{t.hero.title1}</span>
              <span
                className="block whitespace-nowrap"
                style={{
                  color: '#00a8e8',
                  textShadow: theme === 'dark' ? '0 0 60px hsl(195 100% 50% / 0.6), 0 0 120px hsl(195 100% 50% / 0.3)' : 'none'
                }}
              >
                {t.hero.title2}
              </span>
            </h1>
          </motion.div>

          {/* Software Logos */}
          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {softwareList.map((software) => (
              <Tooltip key={software.name}>
                <TooltipTrigger asChild>
                  <motion.img
                    src={software.src}
                    alt={software.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-xl border-primary/30 text-foreground">
                  <p className="font-medium">{software.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}>{t.hero.projects}</span>
            <div className="w-px h-4 bg-primary/30" />
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}>{t.hero.experience}</span>
            <div className="w-px h-4 bg-primary/30" />
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}>{t.hero.response}</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto sm:justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className={`group gap-3 px-8 py-6 sm:py-7 font-bold uppercase tracking-wider text-sm sm:text-base w-full sm:w-auto ${isRTL ? 'font-arabic' : ''}`}
              style={{
                backgroundColor: '#00a8e8',
                boxShadow: '0 0 30px hsl(195 100% 50% / 0.5), 0 0 60px hsl(195 100% 50% / 0.25)'
              }}
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.seeMyWork}
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className={`group gap-3 px-8 py-6 sm:py-7 font-bold uppercase tracking-wider text-sm sm:text-base hover:bg-primary/5 w-full sm:w-auto ${isRTL ? 'font-arabic' : ''}`}
              style={{
                borderColor: 'hsl(195 100% 50% / 0.4)',
                boxShadow: theme === 'dark' ? '0 0 25px hsl(195 100% 50% / 0.15)' : 'none'
              }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.hero.letsTalk}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
