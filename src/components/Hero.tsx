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
          
          {/* Left side - Portrait - Clean circular frame */}
          <motion.div 
            className="relative flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Subtle glow behind portrait */}
            <div 
              className="absolute inset-0 blur-[100px] opacity-30 -z-10"
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)'
              }}
            />
            
            {/* Portrait image - clean circular frame */}
            <div className="relative">
              {/* Border ring */}
              <div 
                className="absolute -inset-2 rounded-full opacity-30"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.5), transparent 50%)',
                }}
              />
              
              <img 
                src={heroPortrait} 
                alt="Video Editor Portrait" 
                className="w-[240px] sm:w-[280px] lg:w-[340px] h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-full"
                style={{
                  filter: 'contrast(1.15) brightness(0.95)',
                  border: '2px solid hsl(0 0% 20%)',
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
                className="text-[clamp(4rem,15vw,12rem)] leading-[0.85] text-white uppercase font-black tracking-tight glitch-hover"
                data-text="VIDEO EDITOR"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '-0.03em',
                }}
              >
                VIDEO<br />
                <span className="text-primary text-glow">EDITOR</span>
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
              className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10"
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
                className="gap-3 text-lg px-8 border-border hover:border-primary hover:text-primary uppercase tracking-wider font-medium"
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
