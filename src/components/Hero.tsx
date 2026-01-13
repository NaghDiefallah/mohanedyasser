import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.png";

// Simple animated doodle components
const CrownDoodle = () => (
  <motion.svg 
    viewBox="0 0 80 50" 
    className="w-20 h-14" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    animate={{ y: [-2, 2, -2], rotate: [-2, 2, -2] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M10 40 L18 18 L30 30 L40 10 L50 30 L62 18 L70 40" className="text-primary" />
    <path d="M10 40 L70 40" className="text-primary" />
    <circle cx="18" cy="15" r="3" className="fill-primary text-primary" />
    <circle cx="40" cy="7" r="3" className="fill-primary text-primary" />
    <circle cx="62" cy="15" r="3" className="fill-primary text-primary" />
  </motion.svg>
);

const HeartDoodle = () => (
  <motion.svg 
    viewBox="0 0 50 50" 
    className="w-12 h-12" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round"
    animate={{ scale: [1, 1.15, 1] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M25 42 C8 28 8 15 15 10 C22 6 25 12 25 18 C25 12 28 6 35 10 C42 15 42 28 25 42 Z" className="text-primary fill-primary/20" />
  </motion.svg>
);

const StarDoodle = () => (
  <motion.svg 
    viewBox="0 0 50 50" 
    className="w-10 h-10" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round"
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  >
    <path d="M25 5 L29 18 L42 18 L31 27 L35 42 L25 32 L15 42 L19 27 L8 18 L21 18 Z" className="text-primary" />
  </motion.svg>
);

const SparklesDoodle = () => (
  <motion.svg 
    viewBox="0 0 60 60" 
    className="w-14 h-14" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round"
    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M30 10 L30 20" className="text-primary" />
    <path d="M30 40 L30 50" className="text-primary" />
    <path d="M10 30 L20 30" className="text-primary" />
    <path d="M40 30 L50 30" className="text-primary" />
    <path d="M16 16 L22 22" className="text-primary" />
    <path d="M38 38 L44 44" className="text-primary" />
    <path d="M16 44 L22 38" className="text-primary" />
    <path d="M38 22 L44 16" className="text-primary" />
  </motion.svg>
);

const ArrowDoodle = () => (
  <motion.svg 
    viewBox="0 0 80 40" 
    className="w-20 h-10" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    animate={{ x: [0, 5, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M5 20 Q30 10 55 20" className="text-primary" />
    <path d="M48 12 L58 20 L48 28" className="text-primary" />
  </motion.svg>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left side - Portrait */}
          <motion.div 
            className="relative flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Crown above portrait */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
              <CrownDoodle />
            </div>

            {/* Star doodle top-right */}
            <div className="absolute -top-4 -right-8 z-20">
              <StarDoodle />
            </div>

            {/* Heart doodle bottom-left */}
            <div className="absolute bottom-20 -left-10 z-20">
              <HeartDoodle />
            </div>

            {/* Sparkles doodle */}
            <div className="absolute top-1/3 -right-12 z-20">
              <SparklesDoodle />
            </div>

            {/* Portrait glow */}
            <div 
              className="absolute inset-0 blur-[80px] opacity-40 -z-10"
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)'
              }}
            />
            
            {/* Portrait image */}
            <div className="relative group">
              <img 
                src={heroPortrait}
                alt="Video Editor Portrait"
                className="w-[260px] sm:w-[320px] lg:w-[380px] h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                style={{
                  filter: 'contrast(1.1)',
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                }}
              />
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <div className="relative flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <span className="text-primary font-semibold tracking-[0.2em] uppercase text-xs">
                Video Editor & Motion Designer
              </span>
              <ArrowDoodle />
            </motion.div>

            {/* Main headline - Brush stroke style */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative mb-8"
            >
              <h1 
                className="text-[clamp(5rem,18vw,14rem)] leading-[0.8] text-foreground uppercase"
                style={{
                  fontFamily: "'Permanent Marker', cursive",
                  letterSpacing: '0.02em',
                  textShadow: '6px 6px 0px hsl(var(--primary) / 0.4), 12px 12px 0px hsl(var(--primary) / 0.15)'
                }}
              >
                EDITOR
              </h1>
              
              {/* Underline scribble */}
              <motion.svg 
                viewBox="0 0 300 20" 
                className="w-full max-w-md h-6 mt-2"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <motion.path 
                  d="M10 10 Q75 5 150 12 T290 8" 
                  className="text-primary"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </motion.svg>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              Turning raw footage into cinematic experiences with DaVinci Resolve & After Effects.
            </motion.p>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12"
            >
              <Button variant="hero" size="xl" className="group gap-3 text-lg px-10">
                See my work
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button variant="outline" size="xl" className="gap-3 text-lg px-10 border-primary/30 hover:border-primary">
                Let's talk
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center lg:justify-start gap-12"
            >
              <div className="text-center lg:text-left">
                <span className="block text-3xl font-bold text-foreground">50+</span>
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Projects</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-3xl font-bold text-foreground">4 yrs</span>
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Experience</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-3xl font-bold text-foreground">24h</span>
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Response</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
