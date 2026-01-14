import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.png";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex items-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left side - Portrait with pulsing backlight */}
          <motion.div 
            className="relative flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Pulsing radial glow behind portrait */}
            <div 
              className="absolute inset-0 pulse-glow -z-10"
              style={{
                background: 'radial-gradient(circle at 50% 40%, hsl(142 70% 45% / 0.35) 0%, hsl(142 70% 45% / 0.15) 30%, transparent 60%)',
                filter: 'blur(60px)',
                transform: 'scale(1.5)',
              }}
            />
            
            {/* Portrait image - balanced size, blended into background */}
            <img 
              src={heroPortrait} 
              alt="Video Editor Portrait" 
              className="relative w-[280px] sm:w-[320px] lg:w-[400px] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700"
              style={{
                filter: 'contrast(1.1) brightness(0.9)',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            />
          </motion.div>

          {/* Right side - Text content - shifted for balance */}
          <div className="relative flex-1 text-center lg:text-left lg:-ml-8 lg:mt-6">
            {/* Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-semibold tracking-[0.2em] uppercase text-xs">
                Video Editor & Motion Designer
              </span>
            </motion.div>

            {/* Main headline - Industrial, heavy weight with glitch effect */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative mb-8"
            >
              <h1 
                className="text-[clamp(4rem,15vw,12rem)] leading-[0.85] text-white uppercase font-black tracking-tight headline-hover-outline"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '-0.03em',
                }}
              >
                VIDEO<br />
                <span 
                  className="text-primary text-glow glitch-hover inline-block"
                  data-text="EDITOR"
                >
                  EDITOR
                </span>
              </h1>
              
              {/* Minimal accent line */}
              <motion.div 
                className="h-1 bg-primary mt-4"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{ maxWidth: '200px' }}
              />
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              Turning raw footage into cinematic experiences with DaVinci Resolve & After Effects.
            </motion.p>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button 
                size="lg" 
                className="group gap-3 text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
              >
                See my work
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-3 text-lg px-8 border-primary/60 text-primary hover:border-primary hover:bg-primary/10 uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
              >
                Let's talk
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center lg:justify-start gap-12 mt-12"
            >
              <div className="text-center lg:text-left">
                <span className="block text-4xl font-black text-white">50+</span>
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Projects</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-4xl font-black text-white">4 yrs</span>
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Experience</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-4xl font-black text-white">24h</span>
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
