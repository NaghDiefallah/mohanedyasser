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

const CinematicHero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Magnetic hover effect for logo
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
    
    const offsetX = (e.clientX - centerX) * 0.08;
    const offsetY = (e.clientY - centerY) * 0.08;
    
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleLogoMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();

  const bgOverlay = theme === 'light' 
    ? 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 50% 95% / 0.3) 0%, transparent 60%)' 
    : 'radial-gradient(ellipse 80% 60% at 30% 50%, hsl(195 100% 50% / 0.06) 0%, transparent 50%)';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20" key={language}>
      {/* Subtle background overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: bgOverlay }} />
      
      {/* Geometric light streaks - only in dark mode */}
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

      {/* Main content */}
      <div className={`relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 ${isRTL ? 'font-arabic' : ''}`}>
        {/* Mobile Layout: Single column, stacked */}
        <div className="lg:hidden flex flex-col items-center text-center gap-6">
          {/* Logo */}
          <motion.div 
            ref={logoRef}
            className="flex justify-center"
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            style={{ x, y }}
          >
            <motion.img 
              alt="Mohaned Yasser Logo" 
              className="w-40 h-40 sm:w-52 sm:h-52 object-contain cursor-pointer" 
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
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {t.hero.name}
          </p>

          {/* Main Heading - prevent EDITOR from breaking */}
          <div>
            <h1 
              className="text-[clamp(3rem,15vw,6rem)] leading-[0.9] font-bold tracking-[-0.02em]" 
              style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
            >
              <span className="block text-foreground">{t.hero.title1}</span>
              <span 
                className="block whitespace-nowrap"
                style={{
                  color: '#00a8e8',
                  textShadow: theme === 'dark' ? '0 0 40px hsl(195 100% 50% / 0.6), 0 0 80px hsl(195 100% 50% / 0.3)' : 'none'
                }}
              >
                {t.hero.title2}
              </span>
            </h1>
          </div>

          {/* Software Logos */}
          <div className="flex items-center justify-center gap-3">
            {[
              { src: adobeAe, name: 'After Effects' },
              { src: adobePr, name: 'Premiere Pro' },
              { src: adobePs, name: 'Photoshop' },
              { src: adobeAu, name: 'Audition' },
            ].map((software) => (
              <Tooltip key={software.name}>
                <TooltipTrigger asChild>
                  <motion.img
                    src={software.src}
                    alt={software.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-xl border-primary/30 text-foreground">
                  <p className="font-medium">{software.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase">{t.hero.projects}</span>
            <div className="w-px h-4 bg-primary/30" />
            <span className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase">{t.hero.experience}</span>
            <div className="w-px h-4 bg-primary/30" />
            <span className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase">{t.hero.response}</span>
          </div>

          {/* CTA Buttons - Full width on mobile */}
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <Button 
              size="lg" 
              className="w-full gap-3 py-6 font-bold uppercase tracking-wider text-sm" 
              style={{
                backgroundColor: '#00a8e8',
                boxShadow: '0 0 30px hsl(195 100% 50% / 0.5)'
              }}
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.seeMyWork}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full gap-3 py-6 font-bold uppercase tracking-wider text-sm hover:bg-primary/5" 
              style={{ borderColor: 'hsl(195 100% 50% / 0.4)' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageCircle className="w-4 h-4" />
              {t.hero.letsTalk}
            </Button>
          </div>
        </div>

        {/* Desktop Layout: Two columns with proper RTL support */}
        <div className={`hidden lg:grid grid-cols-12 gap-8 xl:gap-16 items-center relative ${isRTL ? 'direction-rtl' : ''}`}>
          {/* Vertical Divider Line */}
          <div 
            className="absolute top-[10%] w-px h-[80%] bg-gradient-to-b from-primary/50 via-primary/30 to-transparent left-1/2 -translate-x-1/2"
          />

          {/* In RTL: Logo on RIGHT (col 7-12), Content on LEFT (col 1-6) */}
          {/* In LTR: Logo on LEFT (col 1-5), Content on RIGHT (col 6-12) */}
          
          {isRTL ? (
            <>
              {/* RTL: Main Content - LEFT side */}
              <motion.div 
                className="col-span-6 col-start-1 flex flex-col items-center text-center"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-sm md:text-base uppercase tracking-[0.4em] text-muted-foreground mb-4 font-arabic">
                  {t.hero.name}
                </p>

                <div className="mb-6">
                  <h1 
                    className="text-[clamp(4rem,8vw,8rem)] leading-[0.95] font-bold"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
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
                </div>

                {/* Software Icons - Centered */}
                <div className="flex items-center justify-center gap-4 mb-10">
                  {[
                    { src: adobeAe, name: 'After Effects' },
                    { src: adobePr, name: 'Premiere Pro' },
                    { src: adobePs, name: 'Photoshop' },
                    { src: adobeAu, name: 'Audition' },
                  ].map((software) => (
                    <Tooltip key={software.name}>
                      <TooltipTrigger asChild>
                        <motion.img
                          src={software.src}
                          alt={software.name}
                          className="w-10 h-10 md:w-12 md:h-12 cursor-pointer"
                          whileHover={{ scale: 1.15 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-xl border-primary/30 text-foreground">
                        <p className="font-medium">{software.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                {/* CTA Buttons - Centered */}
                <div className="flex flex-row gap-5 justify-center">
                  <Button 
                    size="lg" 
                    className="group gap-3 px-8 py-7 font-bold uppercase tracking-wider text-base font-arabic" 
                    style={{
                      backgroundColor: '#00a8e8',
                      boxShadow: '0 0 40px hsl(195 100% 50% / 0.5), 0 0 80px hsl(195 100% 50% / 0.25)'
                    }}
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.hero.seeMyWork}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1 rotate-180" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group gap-3 px-8 py-7 font-bold uppercase tracking-wider text-base hover:bg-primary/5 font-arabic" 
                    style={{
                      borderColor: 'hsl(195 100% 50% / 0.4)',
                      boxShadow: theme === 'dark' ? '0 0 25px hsl(195 100% 50% / 0.15)' : 'none'
                    }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.hero.letsTalk}
                  </Button>
                </div>
              </motion.div>

              {/* RTL: Logo & Stats - RIGHT side */}
              <motion.div 
                className="col-span-5 col-start-8 flex flex-col items-center gap-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  ref={logoRef}
                  className="flex justify-center"
                  onMouseMove={handleLogoMouseMove}
                  onMouseLeave={handleLogoMouseLeave}
                  style={{ x, y }}
                >
                  <motion.img 
                    alt="Mohaned Yasser Logo" 
                    className="w-[280px] h-[280px] xl:w-[340px] xl:h-[340px] object-contain cursor-pointer" 
                    style={{
                      filter: theme === 'dark' 
                        ? 'drop-shadow(0 0 60px hsl(195 100% 50% / 0.4)) drop-shadow(0 0 120px hsl(195 100% 50% / 0.25))' 
                        : 'none'
                    }} 
                    src="/lovable-uploads/4aebbd86-f802-4ff0-af74-268afb8d1275.png"
                    whileHover={{ 
                      scale: 1.05,
                      filter: theme === 'dark' 
                        ? 'drop-shadow(0 0 80px hsl(195 100% 50% / 0.7)) drop-shadow(0 0 150px hsl(195 100% 50% / 0.5))' 
                        : 'drop-shadow(0 0 40px hsl(195 100% 50% / 0.4))'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>

                <div className="flex flex-col items-center gap-4 font-arabic">
                  <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.projects}</span>
                  <div className="w-16 h-px bg-primary/30" />
                  <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.experience}</span>
                  <div className="w-16 h-px bg-primary/30" />
                  <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.response}</span>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* LTR: Logo & Stats - LEFT side */}
              <motion.div 
                className="col-span-5 col-start-1 flex flex-col items-center gap-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  ref={logoRef}
                  className="flex justify-center"
                  onMouseMove={handleLogoMouseMove}
                  onMouseLeave={handleLogoMouseLeave}
                  style={{ x, y }}
                >
                  <motion.img 
                    alt="Mohaned Yasser Logo" 
                    className="w-[280px] h-[280px] xl:w-[340px] xl:h-[340px] object-contain cursor-pointer" 
                    style={{
                      filter: theme === 'dark' 
                        ? 'drop-shadow(0 0 60px hsl(195 100% 50% / 0.4)) drop-shadow(0 0 120px hsl(195 100% 50% / 0.25))' 
                        : 'none'
                    }} 
                    src="/lovable-uploads/4aebbd86-f802-4ff0-af74-268afb8d1275.png"
                    whileHover={{ 
                      scale: 1.05,
                      filter: theme === 'dark' 
                        ? 'drop-shadow(0 0 80px hsl(195 100% 50% / 0.7)) drop-shadow(0 0 150px hsl(195 100% 50% / 0.5))' 
                        : 'drop-shadow(0 0 40px hsl(195 100% 50% / 0.4))'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>

                <div className="flex flex-col items-center gap-4">
                  <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.projects}</span>
                  <div className="w-16 h-px bg-primary/30" />
                  <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.experience}</span>
                  <div className="w-16 h-px bg-primary/30" />
                  <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.response}</span>
                </div>
              </motion.div>

              {/* LTR: Main Content - RIGHT side */}
              <motion.div 
                className="col-span-7 col-start-6 text-left"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-sm md:text-base uppercase tracking-[0.4em] text-muted-foreground mb-4">
                  {t.hero.name}
                </p>

                <div className="mb-6">
                  <h1 
                    className="text-[clamp(4rem,8vw,8rem)] leading-[0.9] font-bold tracking-[-0.02em]" 
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
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
                </div>

                <div className="flex items-center gap-4 mb-10">
                  {[
                    { src: adobeAe, name: 'After Effects' },
                    { src: adobePr, name: 'Premiere Pro' },
                    { src: adobePs, name: 'Photoshop' },
                    { src: adobeAu, name: 'Audition' },
                  ].map((software) => (
                    <Tooltip key={software.name}>
                      <TooltipTrigger asChild>
                        <motion.img
                          src={software.src}
                          alt={software.name}
                          className="w-10 h-10 md:w-12 md:h-12 cursor-pointer"
                          whileHover={{ scale: 1.15 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-xl border-primary/30 text-foreground">
                        <p className="font-medium">{software.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                <div className="flex flex-row gap-5">
                  <Button 
                    size="lg" 
                    className="group gap-3 px-10 py-7 font-bold uppercase tracking-wider text-base" 
                    style={{
                      backgroundColor: '#00a8e8',
                      boxShadow: '0 0 40px hsl(195 100% 50% / 0.5), 0 0 80px hsl(195 100% 50% / 0.25)'
                    }}
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.hero.seeMyWork}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group gap-3 px-10 py-7 font-bold uppercase tracking-wider text-base hover:bg-primary/5" 
                    style={{
                      borderColor: 'hsl(195 100% 50% / 0.4)',
                      boxShadow: theme === 'dark' ? '0 0 25px hsl(195 100% 50% / 0.15)' : 'none'
                    }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.hero.letsTalk}
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
