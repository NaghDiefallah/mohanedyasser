import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-32 md:pb-40 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle neon glow - top right */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)'
        }}
      />
      
      {/* Secondary glow - bottom left */}
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-15 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="max-w-6xl">
          {/* Eyebrow */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold mb-6 tracking-widest uppercase text-sm"
          >
            Video Editor & Motion Designer
          </motion.p>

          {/* Main headline - aggressive, cinematic */}
          <div className="space-y-1 md:space-y-0">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.95] tracking-tight text-foreground"
            >
              I craft stories
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.95] tracking-tight text-foreground text-glow"
            >
              through motion.
            </motion.h1>
          </div>

          {/* Description - left aligned, shorter */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            Turning raw footage into cinematic experiences with DaVinci Resolve & After Effects.
          </motion.p>

          {/* CTA - simple, understated */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-8"
          >
            <Button variant="hero" size="lg" className="group gap-3">
              See my work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Stats row - adds credibility without being flashy */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-20 flex gap-12 md:gap-16 text-sm"
          >
            <div>
              <span className="block text-2xl font-semibold text-foreground">50+</span>
              <span className="text-muted-foreground">Projects delivered</span>
            </div>
            <div>
              <span className="block text-2xl font-semibold text-foreground">4 yrs</span>
              <span className="text-muted-foreground">Experience</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-2xl font-semibold text-foreground">24h</span>
              <span className="text-muted-foreground">Avg. response</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
