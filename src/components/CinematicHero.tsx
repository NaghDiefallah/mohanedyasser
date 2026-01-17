import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import heroPortrait from '@/assets/hero-portrait.png';

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for cursor following
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform values for parallax layers
  const portraitX = useTransform(smoothMouseX, [-1, 1], [20, -20]);
  const portraitY = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const portraitRotate = useTransform(smoothMouseX, [-1, 1], [2, -2]);
  
  const textX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  const lightX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const lightY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // GSAP cinematic entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => setIsLoaded(true),
      });

      // Initial state
      gsap.set('.hero-line', { y: 120, opacity: 0, rotationX: -40 });
      gsap.set('.hero-eyebrow', { x: -100, opacity: 0 });
      gsap.set('.hero-description', { y: 40, opacity: 0 });
      gsap.set('.hero-cta', { y: 60, opacity: 0 });
      gsap.set('.hero-stat', { y: 40, opacity: 0 });
      gsap.set('.hero-portrait', { scale: 1.1, opacity: 0, x: 50 });
      gsap.set('.hero-light-sweep', { x: '-100%' });

      // Light sweep across screen
      tl.to('.hero-light-sweep', {
        x: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
      }, 0.3);

      // Portrait emerges
      tl.to('.hero-portrait', {
        scale: 1,
        opacity: 1,
        x: 0,
        duration: 1.8,
        ease: 'power3.out',
      }, 0.5);

      // Eyebrow slides in
      tl.to('.hero-eyebrow', {
        x: 0,
        opacity: 1,
        duration: 0.8,
      }, 0.8);

      // Headline lines stagger in cinematically
      tl.to('.hero-line', {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.15,
      }, 1);

      // Description fades up
      tl.to('.hero-description', {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, 1.8);

      // CTAs appear
      tl.to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
      }, 2);

      // Stats roll in
      tl.to('.hero-stat', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
      }, 2.3);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Cinematic light sweep effect */}
      <div 
        className="hero-light-sweep absolute inset-0 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,200,150,0.08) 40%, rgba(255,220,180,0.15) 50%, rgba(255,200,150,0.08) 60%, transparent 100%)',
        }}
      />

      {/* Dynamic light source that follows mouse */}
      <motion.div 
        className="absolute pointer-events-none z-0"
        style={{
          x: lightX,
          y: lightY,
          width: '60%',
          height: '80%',
          top: '-20%',
          right: '-10%',
          background: 'radial-gradient(ellipse at center, rgba(255,180,120,0.08) 0%, rgba(255,150,100,0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-[85vh]">
          
          {/* Left - Text content */}
          <motion.div 
            className="lg:col-span-7 relative"
            style={{ x: textX, y: textY }}
          >
            {/* Eyebrow */}
            <div className="hero-eyebrow flex items-center gap-4 mb-10">
              <div className="w-16 h-px bg-gradient-to-r from-amber-500/60 to-transparent" />
              <span 
                className="tracking-[0.4em] uppercase text-[10px] font-medium"
                style={{ color: 'rgba(255,200,150,0.7)' }}
              >
                Video Editor & Motion Designer
              </span>
            </div>

            {/* Headline container */}
            <div ref={headlineRef} className="mb-10 overflow-hidden">
              <div className="hero-line origin-bottom">
                <h1 
                  className="text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.02em]"
                  style={{ 
                    fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                    color: 'rgba(255,255,255,0.95)',
                    textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  CRAFTING CINEMA
                </h1>
              </div>
              <div className="hero-line origin-bottom">
                <h1 
                  className="text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.02em] inline-block"
                  style={{ 
                    fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                    background: 'linear-gradient(135deg, #f5a623 0%, #e8932c 50%, #d4820f 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                    filter: 'drop-shadow(0 0 40px rgba(245,166,35,0.3))',
                  }}
                >
                  FRAME BY FRAME
                </h1>
              </div>
            </div>

            {/* Description */}
            <p 
              className="hero-description text-lg md:text-xl max-w-xl leading-relaxed mb-12 font-light"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Transforming raw footage into cinematic experiences. 
              Commercial, documentary & narrative work for brands that demand excellence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5 mb-16">
              <motion.button 
                className="hero-cta group relative px-8 py-4 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'linear-gradient(135deg, #c4891f 0%, #a06d15 100%)',
                  borderRadius: '2px',
                }}
              >
                <span className="relative z-10 flex items-center gap-3 text-black font-semibold tracking-wide text-sm uppercase">
                  View Portfolio
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
              
              <motion.button 
                className="hero-cta group flex items-center gap-4 px-6 py-4"
                whileHover={{ x: 5 }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:border-amber-500/50 group-hover:bg-amber-500/10"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <Play className="w-4 h-4 ml-0.5" style={{ color: 'rgba(255,255,255,0.8)' }} />
                </div>
                <span 
                  className="text-sm uppercase tracking-wider font-medium transition-colors group-hover:text-amber-400"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  Watch Showreel
                </span>
              </motion.button>
            </div>

            {/* Stats */}
            <div 
              className="flex items-center gap-10 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '4', label: 'Years' },
                { value: '24h', label: 'Response' },
              ].map((stat, i) => (
                <div key={i} className="hero-stat">
                  <span 
                    className="block text-3xl font-light tracking-tight"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    {stat.value}
                  </span>
                  <span 
                    className="text-xs uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Portrait with parallax */}
          <motion.div 
            className="hero-portrait lg:col-span-5 relative flex justify-center lg:justify-end"
            style={{
              x: portraitX,
              y: portraitY,
              rotateY: portraitRotate,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ambient glow */}
            <div 
              className="absolute inset-0 -z-10"
              style={{
                background: 'radial-gradient(ellipse 80% 70% at 50% 30%, rgba(200,140,80,0.15) 0%, rgba(180,120,60,0.05) 40%, transparent 70%)',
                filter: 'blur(50px)',
                transform: 'scale(1.4)',
              }}
            />
            
            {/* Portrait */}
            <div className="relative">
              <img 
                src={heroPortrait} 
                alt="Video Editor" 
                className="relative w-[320px] sm:w-[380px] lg:w-[460px] h-auto object-contain"
                style={{
                  filter: 'contrast(1.1) brightness(0.9) saturate(0.85)',
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                }}
              />
              
              {/* Rim light overlay */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background: 'linear-gradient(120deg, transparent 40%, rgba(255,180,120,0.15) 70%, transparent 100%)',
                }}
              />

              {/* Edge highlight */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 60%, rgba(255,200,150,0.08) 90%, transparent 100%)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
        }}
      />

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div 
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-2"
          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-0.5 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
