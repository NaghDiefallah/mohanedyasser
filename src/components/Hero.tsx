import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.png";

// Hand-drawn doodle SVG components
const CrownDoodle = () => (
  <svg viewBox="0 0 60 40" className="w-16 h-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 35 L10 15 L20 25 L30 8 L40 25 L50 15 L55 35 Z" className="text-primary" />
    <circle cx="10" cy="12" r="3" className="fill-primary text-primary" />
    <circle cx="30" cy="5" r="3" className="fill-primary text-primary" />
    <circle cx="50" cy="12" r="3" className="fill-primary text-primary" />
  </svg>
);

const HeartDoodle = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M20 35 C5 25 5 12 12 8 C18 5 20 10 20 15 C20 10 22 5 28 8 C35 12 35 25 20 35 Z" className="text-primary fill-primary/30" />
  </svg>
);

const StarDoodle = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M20 5 L23 15 L33 15 L25 22 L28 33 L20 26 L12 33 L15 22 L7 15 L17 15 Z" className="text-primary" />
  </svg>
);

const TicTacToeDoodle = () => (
  <svg viewBox="0 0 50 50" className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="17" y1="5" x2="17" y2="45" className="text-muted-foreground/60" />
    <line x1="33" y1="5" x2="33" y2="45" className="text-muted-foreground/60" />
    <line x1="5" y1="17" x2="45" y2="17" className="text-muted-foreground/60" />
    <line x1="5" y1="33" x2="45" y2="33" className="text-muted-foreground/60" />
    {/* X marks */}
    <line x1="7" y1="7" x2="14" y2="14" className="text-primary" strokeWidth="2.5" />
    <line x1="14" y1="7" x2="7" y2="14" className="text-primary" strokeWidth="2.5" />
    <line x1="36" y1="20" x2="43" y2="27" className="text-primary" strokeWidth="2.5" />
    <line x1="43" y1="20" x2="36" y2="27" className="text-primary" strokeWidth="2.5" />
    {/* O marks */}
    <circle cx="25" cy="25" r="5" className="text-muted-foreground/80" strokeWidth="2" />
    <circle cx="10" cy="40" r="4" className="text-muted-foreground/80" strokeWidth="2" />
  </svg>
);

const ScribbleLine = () => (
  <svg viewBox="0 0 100 20" className="w-24 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 10 Q20 5 35 12 T65 8 T95 10" className="text-muted-foreground/40" />
  </svg>
);

const ArrowDoodle = () => (
  <svg viewBox="0 0 60 30" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 15 Q25 8 45 15" className="text-primary" />
    <path d="M38 8 L48 15 L38 22" className="text-primary" />
  </svg>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Grunge texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Text content */}
          <div className="relative z-20 order-2 lg:order-1">
            {/* Eyebrow with arrow */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-primary font-semibold tracking-widest uppercase text-xs">
                Video Editor & Motion Designer
              </span>
              <ArrowDoodle />
            </motion.div>

            {/* Main headline - Brush stroke style */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <h1 
                className="text-[clamp(4rem,15vw,10rem)] font-black leading-[0.85] tracking-tight text-foreground uppercase"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  textShadow: '4px 4px 0px hsl(var(--primary) / 0.3)'
                }}
              >
                EDITOR
              </h1>
              
              {/* Decorative scribble under text */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-2 left-0 origin-left"
              >
                <svg viewBox="0 0 200 15" className="w-48 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M5 8 Q50 3 100 10 T195 7" className="text-primary" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-base text-muted-foreground max-w-md leading-relaxed"
            >
              Turning raw footage into cinematic experiences with DaVinci Resolve & After Effects.
            </motion.p>

            {/* CTA with doodle */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-6"
            >
              <Button variant="hero" size="lg" className="group gap-3">
                See my work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              {/* Heart doodle next to CTA */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <HeartDoodle />
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 flex gap-10 text-sm"
            >
              <div>
                <span className="block text-2xl font-bold text-foreground">50+</span>
                <span className="text-muted-foreground text-xs uppercase tracking-wide">Projects</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-foreground">4 yrs</span>
                <span className="text-muted-foreground text-xs uppercase tracking-wide">Experience</span>
              </div>
              <div className="hidden sm:block">
                <span className="block text-2xl font-bold text-foreground">24h</span>
                <span className="text-muted-foreground text-xs uppercase tracking-wide">Response</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Portrait with doodles */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Crown doodle above head */}
            <motion.div 
              className="absolute -top-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-1/3 z-30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div
                animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <CrownDoodle />
              </motion.div>
            </motion.div>

            {/* Tic-tac-toe doodle */}
            <motion.div 
              className="absolute top-10 -right-4 lg:right-0 z-30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <TicTacToeDoodle />
              </motion.div>
            </motion.div>

            {/* Star doodles */}
            <motion.div 
              className="absolute top-1/4 -left-4 lg:left-8 z-30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <StarDoodle />
              </motion.div>
            </motion.div>

            {/* Scribble lines */}
            <motion.div 
              className="absolute bottom-1/4 -left-8 lg:left-0 z-30 opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <ScribbleLine />
            </motion.div>

            {/* Portrait image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Glow behind portrait */}
              <div 
                className="absolute inset-0 blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)'
                }}
              />
              
              <img 
                src={heroPortrait}
                alt="Video Editor Portrait"
                className="relative z-10 w-[280px] sm:w-[340px] lg:w-[420px] h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                style={{
                  filter: 'contrast(1.1)',
                  maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
