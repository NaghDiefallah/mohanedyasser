import { useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { throttle } from '@/utils/taskScheduler';
import { davinciResolveSources, logoMarkSources } from '@/data/imageSources';
import adobeAe from '@/assets/adobe-after-effects.svg';
import adobePr from '@/assets/adobe-premiere-pro.svg';
import adobePs from '@/assets/adobe-photoshop.svg';
import adobeAu from '@/assets/adobe-audition.svg';

const softwareList = [
  { src: adobeAe, name: 'After Effects' },
  { src: adobePr, name: 'Premiere Pro' },
  { src: adobeAu, name: 'Audition' },
  { src: davinciResolveSources, name: 'DaVinci Resolve' },
  { src: adobePs, name: 'Photoshop' },
];

const softwareIconSizes = "(max-width: 640px) 40px, 48px";

const resolveSoftwareSources = (source: string | typeof davinciResolveSources) =>
  typeof source === 'string' ? { fallback: source } : source;

const SoftwareIcon = ({
  source,
  name,
  className,
  width,
  height,
}: {
  source: string | typeof davinciResolveSources;
  name: string;
  className: string;
  width: number;
  height: number;
}) => {
  const resolvedSource = resolveSoftwareSources(source);

  if ('avifSrcSet' in resolvedSource && 'webpSrcSet' in resolvedSource) {
    return (
      <picture>
        <source type="image/avif" srcSet={resolvedSource.avifSrcSet} sizes={softwareIconSizes} />
        <source type="image/webp" srcSet={resolvedSource.webpSrcSet} sizes={softwareIconSizes} />
        <motion.img
          src={resolvedSource.fallback}
          alt={name}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width={width}
          height={height}
          className={className}
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </picture>
    );
  }

  return (
    <motion.img
      src={resolvedSource.fallback}
      alt={name}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      width={width}
      height={height}
      className={className}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
};

const logoMarkSizes = "(max-width: 640px) 60vw, 288px";

const LogoMark = ({ className, onClick }: { className: string; onClick: () => void }) => (
  <picture className="block">
    <source type="image/avif" srcSet={logoMarkSources.avifSrcSet} sizes={logoMarkSizes} />
    <source type="image/webp" srcSet={logoMarkSources.webpSrcSet} sizes={logoMarkSizes} />
    <motion.img
      alt="Mohaned Yasser Logo"
      className={className}
      style={{ filter: 'none' }}
      src={logoMarkSources.fallback}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    />
  </picture>
);

const CinematicHero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = useMemo(() => ({ stiffness: 150, damping: 15 }), []);
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleLogoMouseMove = useCallback(throttle((e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.08);
    mouseY.set((e.clientY - centerY) * 0.08);
  }, 16), [mouseX, mouseY]); // ~60fps throttle

  const handleLogoMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();

  const bgOverlay = useMemo(() => theme === 'light'
    ? 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 50% 95% / 0.3) 0%, transparent 60%)'
    : 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(195 100% 50% / 0.06) 0%, transparent 50%)',
  [theme]);

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

      <div className={`relative z-10 container mx-auto px-5 sm:px-6 ${isRTL ? 'font-arabic' : ''}`}>

        {/* ===== MOBILE / TABLET: Single column stacked (< 1024px) ===== */}
        <div className="flex flex-col items-center text-center gap-5 lg:hidden">
          {/* Logo */}
          <motion.div
            ref={logoRef}
            className="flex justify-center"
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            style={{ x, y }}
          >
            <LogoMark
              className="w-36 h-36 sm:w-44 sm:h-44 object-contain cursor-pointer"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </motion.div>

          {/* Name */}
          <p className={`text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
            {t.hero.name}
          </p>

          {/* Heading */}
          <div>
            <h1
              className="text-[clamp(3.5rem,14vw,7rem)] leading-[0.9] font-bold tracking-[-0.02em]"
              style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
            >
              <span className="block text-foreground">{t.hero.title1}</span>
              <span className="block whitespace-nowrap text-primary">
                {t.hero.title2}
              </span>
            </h1>
          </div>

          {/* Software icons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {softwareList.map((software) => (
              <Tooltip key={software.name}>
                <TooltipTrigger asChild>
                  <SoftwareIcon
                    source={software.src}
                    name={software.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer"
                    width={40}
                    height={40}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-xl border-primary/30 text-foreground">
                  <p className="font-medium">{software.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}>{t.hero.projects}</span>
            <div className="w-px h-4 bg-primary/30" />
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}>{t.hero.experience}</span>
            <div className="w-px h-4 bg-primary/30" />
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}>{t.hero.response}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto sm:justify-center">
            <Button
              size="lg"
              className={`group gap-3 px-8 py-6 sm:py-7 font-bold uppercase tracking-wider text-sm sm:text-base w-full sm:w-auto text-white ${isRTL ? 'font-arabic' : ''}`}
                    style={{
                      backgroundColor: '#0077b6',
                      boxShadow: '0 0 20px rgba(0, 168, 232, 0.4)',
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
              }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.hero.letsTalk}
            </Button>
          </div>
        </div>

        {/* ===== DESKTOP: Two-column layout with center divider (>= 1024px) ===== */}
        <div className={`hidden lg:grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-center min-h-[70vh] ${isRTL ? 'direction-ltr' : ''}`}>
          
          {/* LEFT COLUMN: Logo + Stats (in LTR) / Content (in RTL) */}
          <div className={`flex flex-col items-center justify-center gap-8 px-8 ${isRTL ? 'order-3' : 'order-1'}`}>
            {isRTL ? (
              /* RTL: Right side shows content */
              <>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-arabic">
                  {t.hero.name}
                </p>

                <h1
                  className="text-[clamp(5rem,8vw,9rem)] leading-[0.9] font-bold tracking-[-0.02em] text-center"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  <span className="block text-foreground">{t.hero.title1}</span>
                  <span className="block whitespace-nowrap text-primary">
                    {t.hero.title2}
                  </span>
                </h1>

                <div className="flex items-center gap-4">
                  {softwareList.map((software) => (
                    <Tooltip key={software.name}>
                      <TooltipTrigger asChild>
                        <SoftwareIcon
                          source={software.src}
                          name={software.name}
                          className="w-12 h-12 cursor-pointer"
                          width={48}
                          height={48}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-xl border-primary/30 text-foreground">
                        <p className="font-medium">{software.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="group gap-3 px-8 py-7 font-bold font-arabic uppercase tracking-wider text-base text-white"
                    style={{
                      backgroundColor: '#0077b6',
                      boxShadow: '0 0 20px rgba(0, 168, 232, 0.4)',
                    }}
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.hero.seeMyWork}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1 rotate-180" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="group gap-3 px-8 py-7 font-bold font-arabic uppercase tracking-wider text-base hover:bg-primary/5"
                    style={{
                      borderColor: 'hsl(195 100% 50% / 0.4)',
                    }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.hero.letsTalk}
                  </Button>
                </div>
              </>
            ) : (
              /* LTR: Left side shows Logo + Stats */
              <>
                <motion.div
                  ref={logoRef}
                  className="flex justify-center"
                  onMouseMove={handleLogoMouseMove}
                  onMouseLeave={handleLogoMouseLeave}
                  style={{ x, y }}
                >
                  <LogoMark
                    className="w-56 h-56 xl:w-72 xl:h-72 object-contain cursor-pointer"
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  />
                </motion.div>

                {/* Stats — stacked vertically */}
                <div className="flex flex-col items-center gap-3 mt-4">
                  <span className="text-sm font-bold text-primary tracking-widest uppercase">{t.hero.projects}</span>
                  <div className="w-10 h-px bg-primary/30" />
                  <span className="text-sm font-bold text-primary tracking-widest uppercase">{t.hero.experience}</span>
                  <div className="w-10 h-px bg-primary/30" />
                  <span className="text-sm font-bold text-primary tracking-widest uppercase">{t.hero.response}</span>
                </div>
              </>
            )}
          </div>

          {/* CENTER DIVIDER */}
          <div className="order-2 relative h-[60vh] flex items-center justify-center">
            <div
              className="w-px h-full"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(180deg, transparent 0%, hsl(195 100% 50% / 0.4) 30%, hsl(195 100% 50% / 0.6) 50%, hsl(195 100% 50% / 0.4) 70%, transparent 100%)'
                  : 'linear-gradient(180deg, transparent 0%, hsl(195 100% 40% / 0.3) 30%, hsl(195 100% 40% / 0.5) 50%, hsl(195 100% 40% / 0.3) 70%, transparent 100%)',
              }}
            />
          </div>

          {/* RIGHT COLUMN: Content (in LTR) / Logo + Stats (in RTL) */}
          <div className={`flex flex-col gap-6 px-8 ${isRTL ? 'order-1 items-center text-center' : 'order-3 items-start'}`}>
            {isRTL ? (
              /* RTL: Left side shows Logo + Stats */
              <>
                <motion.div
                  ref={logoRef}
                  className="flex justify-center"
                  onMouseMove={handleLogoMouseMove}
                  onMouseLeave={handleLogoMouseLeave}
                  style={{ x, y }}
                >
                  <LogoMark
                    className="w-56 h-56 xl:w-72 xl:h-72 object-contain cursor-pointer"
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  />
                </motion.div>

                <div className="flex flex-col items-center gap-3 mt-4">
                  <span className="text-sm font-bold text-primary tracking-widest uppercase font-arabic">{t.hero.projects}</span>
                  <div className="w-10 h-px bg-primary/30" />
                  <span className="text-sm font-bold text-primary tracking-widest uppercase font-arabic">{t.hero.experience}</span>
                  <div className="w-10 h-px bg-primary/30" />
                  <span className="text-sm font-bold text-primary tracking-widest uppercase font-arabic">{t.hero.response}</span>
                </div>
              </>
            ) : (
              /* LTR: Right side shows content */
              <>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  {t.hero.name}
                </p>

                <h1
                  className="text-[clamp(5rem,8vw,9rem)] leading-[0.9] font-bold tracking-[-0.02em]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-foreground">{t.hero.title1}</span>
                  <span className="block whitespace-nowrap text-primary">
                    {t.hero.title2}
                  </span>
                </h1>

                <div className="flex items-center gap-4">
                  {softwareList.map((software) => (
                    <Tooltip key={software.name}>
                      <TooltipTrigger asChild>
                        <SoftwareIcon
                          source={software.src}
                          name={software.name}
                          className="w-12 h-12 cursor-pointer"
                          width={48}
                          height={48}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-xl border-primary/30 text-foreground">
                        <p className="font-medium">{software.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                <div className="flex gap-4 mt-2">
                  <Button
                    size="lg"
                    className="group gap-3 px-8 py-7 font-bold uppercase tracking-wider text-base text-white"
                    style={{
                      backgroundColor: '#0077b6',
                      boxShadow: '0 0 20px rgba(0, 168, 232, 0.4)',
                    }}
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.hero.seeMyWork}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="group gap-3 px-8 py-7 font-bold uppercase tracking-wider text-base hover:bg-primary/5"
                    style={{
                      borderColor: 'hsl(195 100% 50% / 0.4)',
                    }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.hero.letsTalk}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CinematicHero;