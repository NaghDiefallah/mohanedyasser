import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

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
    
    // Calculate offset from center (max 15px movement)
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

  // Dynamic background based on theme
  const bgOverlay = theme === 'light' 
    ? 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 50% 95% / 0.3) 0%, transparent 60%)' 
    : 'radial-gradient(ellipse 80% 60% at 30% 50%, hsl(195 100% 50% / 0.06) 0%, transparent 50%)';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20" key={language}>
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
      <div className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 ${isRTL ? 'font-arabic' : ''}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center ${isRTL ? 'direction-rtl' : ''}`}>
          
          {/* Left Sidebar - Massive Logo & Stats */}
          <div className={`lg:col-span-5 flex flex-col items-center gap-8 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            {/* MASSIVE Logo with Magnetic Hover */}
            <motion.div 
              ref={logoRef}
              className="flex justify-center"
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
              style={{ x, y }}
            >
              <motion.img 
                alt="Mohaned Yasser Logo" 
                className="w-48 h-48 md:w-64 md:h-64 lg:w-[320px] lg:h-[320px] xl:w-[380px] xl:h-[380px] object-contain cursor-pointer" 
                style={{
                  filter: theme === 'dark' 
                    ? 'drop-shadow(0 0 60px hsl(195 100% 50% / 0.4)) drop-shadow(0 0 120px hsl(195 100% 50% / 0.25))' 
                    : 'none'
                }} 
                src="/lovable-uploads/4aebbd86-f802-4ff0-af74-268afb8d1275.png"
                whileHover={{ 
                  scale: 1.05,
                  filter: theme === 'dark' 
                    ? 'drop-shadow(0 0 80px hsl(195 100% 50% / 0.7)) drop-shadow(0 0 150px hsl(195 100% 50% / 0.5)) drop-shadow(0 0 200px hsl(195 100% 50% / 0.3))' 
                    : 'drop-shadow(0 0 40px hsl(195 100% 50% / 0.4))'
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
            </motion.div>

            {/* Stats - Vertically stacked below logo */}
            <div className="flex flex-col items-center gap-4">
              <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.projects}</span>
              <div className="w-16 h-px bg-primary/30" />
              <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.experience}</span>
              <div className="w-16 h-px bg-primary/30" />
              <span className="text-sm md:text-base font-bold text-primary tracking-widest uppercase">{t.hero.response}</span>
            </div>
          </div>

          {/* Vertical Divider Line */}
          <div 
            className={`hidden lg:block absolute top-[10%] w-px h-[80%] bg-gradient-to-b from-primary/50 via-primary/30 to-transparent ${isRTL ? 'right-[41.66%]' : 'left-[41.66%]'}`}
          />

          {/* Main Content - Right */}
          <div className={`lg:col-span-7 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            {/* Name */}
            <p className={`text-sm md:text-base uppercase tracking-[0.4em] text-muted-foreground mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.hero.name}
            </p>

            {/* Main Heading */}
            <div className="mb-6">
              <h1 
                className={`text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] font-bold tracking-[-0.02em] ${isRTL ? 'text-right' : 'text-left'}`} 
                style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-foreground">{t.hero.title1}</span>
                <span 
                  className="block"
                  style={{
                    color: '#00a8e8',
                    textShadow: theme === 'dark' ? '0 0 60px hsl(195 100% 50% / 0.6), 0 0 120px hsl(195 100% 50% / 0.3), 0 0 180px hsl(300 50% 50% / 0.15)' : 'none'
                  }}
                >
                  {t.hero.title2}
                </span>
              </h1>
            </div>

            {/* Software Stack */}
            <p className={`text-sm md:text-base text-muted-foreground mb-10 max-w-xl leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.hero.software}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                size="lg" 
                className="group gap-3 px-10 py-7 font-bold uppercase tracking-wider text-base" 
                style={{
                  backgroundColor: '#00a8e8',
                  boxShadow: '0 0 40px hsl(195 100% 50% / 0.5), 0 0 80px hsl(195 100% 50% / 0.25)'
                }}
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t.hero.seeMyWork}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group gap-3 px-10 py-7 font-bold uppercase tracking-wider text-base hover:bg-primary/5" 
                style={{
                  borderColor: 'hsl(195 100% 50% / 0.4)',
                  boxShadow: theme === 'dark' ? '0 0 25px hsl(195 100% 50% / 0.15), 0 0 50px hsl(300 50% 50% / 0.05)' : 'none'
                }}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <MessageCircle className="w-5 h-5" />
                {t.hero.letsTalk}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
