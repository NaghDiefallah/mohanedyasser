import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import heroPortrait from '@/assets/hero-portrait.png';

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'silence' | 'reveal' | 'complete'>('silence');

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const portraitX = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const portraitY = useTransform(smoothMouseY, [-1, 1], [10, -10]);
  const portraitRotate = useTransform(smoothMouseX, [-1, 1], [1.5, -1.5]);

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

  // Cinematic reveal with silence
  useEffect(() => {
    // 1.5 seconds of silence
    const silenceTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1500);

    return () => clearTimeout(silenceTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'reveal') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => setPhase('complete'),
      });

      // Words emerge from darkness
      gsap.set('.hero-word', { 
        y: 80, 
        opacity: 0,
        filter: 'blur(8px)',
      });
      gsap.set('.hero-portrait-container', { 
        opacity: 0, 
        scale: 1.05,
        filter: 'blur(4px)',
      });
      gsap.set('.hero-accent-line', { scaleX: 0 });

      // Portrait bleeds in first
      tl.to('.hero-portrait-container', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power2.out',
      }, 0);

      // Words cut in with weight
      tl.to('.hero-word', {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        stagger: 0.3,
        ease: 'power3.out',
      }, 0.8);

      // Accent line slices across
      tl.to('.hero-accent-line', {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 2.2);

    }, containerRef);

    return () => ctx.revert();
  }, [phase]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
      style={{ perspective: '1200px' }}
    >
      {/* Heavy vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Subtle top light */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 30% -10%, rgba(255,255,255,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Portrait - dominant, emerging from shadow */}
      <motion.div 
        className="hero-portrait-container absolute inset-0 flex items-center justify-end z-10"
        style={{
          x: portraitX,
          y: portraitY,
          rotateY: portraitRotate,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center lg:justify-end lg:pr-[5%]">
          <img 
            src={heroPortrait} 
            alt="" 
            className="h-[85vh] max-h-[900px] w-auto object-contain"
            style={{
              filter: 'contrast(1.15) brightness(0.75) saturate(0.7)',
              maskImage: 'radial-gradient(ellipse 70% 80% at 50% 40%, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 40%, black 30%, transparent 80%)',
            }}
          />
          
          {/* Cold rim light */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              background: 'linear-gradient(110deg, transparent 50%, rgba(180,200,220,0.08) 80%, transparent 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* Text - minimal, positioned with intent */}
      <div className="relative z-30 container mx-auto px-8 md:px-16 lg:px-24">
        <div className="max-w-[50%]">
          {/* The statement - 3 words max per line */}
          <div className="space-y-2">
            <div className="hero-word overflow-hidden">
              <h1 
                className="text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase"
                style={{ 
                  fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                  color: 'rgba(255,255,255,0.95)',
                }}
              >
                I
              </h1>
            </div>
            <div className="hero-word overflow-hidden">
              <h1 
                className="text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase"
                style={{ 
                  fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                  color: 'rgba(255,255,255,0.95)',
                }}
              >
                Cut
              </h1>
            </div>
            <div className="hero-word overflow-hidden">
              <h1 
                className="text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-bold tracking-[-0.03em] uppercase"
                style={{ 
                  fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>The</span>{' '}
                <span>Noise.</span>
              </h1>
            </div>
          </div>

          {/* Accent line */}
          <div 
            className="hero-accent-line mt-12 h-[1px] w-32 origin-left"
            style={{ 
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* Scroll hint - appears late */}
      <motion.div 
        className="absolute bottom-12 left-8 md:left-16 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'complete' ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className="w-[1px] h-12 bg-white/20 origin-top"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span 
            className="text-[10px] uppercase tracking-[0.3em] font-light"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
