import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden studio-depth">
      {/* Volumetric light rays from top-right */}
      <div className="volumetric-light absolute inset-0" />
      
      {/* Key light effect */}
      <div className="key-light" />
      
      {/* Film grain overlay */}
      <div className="film-grain absolute inset-0 pointer-events-none" />
      
      {/* Cinematic vignette */}
      <div className="cinematic-vignette absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[80vh]">
          
          {/* Left side - Text content (asymmetrical, takes more space) */}
          <div className="lg:col-span-7 lg:col-start-1 order-2 lg:order-1">
            {/* Eyebrow - subtle, professional */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-gradient-to-r from-primary/80 to-transparent" />
              <span className="text-muted-foreground tracking-[0.3em] uppercase text-xs font-medium">
                Video Editor & Motion Designer
              </span>
            </motion.div>

            {/* Main headline - cinematic, elegant */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="headline-cinematic text-shadow-deep">
                <span className="block text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-foreground/95">
                  Crafting
                </span>
                <span className="block text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-foreground/95">
                  Visual
                </span>
                <span className="block text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-primary">
                  Stories
                </span>
              </h1>
            </motion.div>

            {/* Subheadline - refined, not generic */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-10 font-light"
            >
              Transforming raw footage into cinematic experiences. 
              Specializing in commercial, documentary & narrative work.
            </motion.p>

            {/* CTA buttons - minimal, high-end */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button 
                size="lg" 
                className="group gap-3 px-8 py-6 btn-primary-cinematic text-base tracking-wide"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg" 
                className="group gap-3 px-6 py-6 text-muted-foreground hover:text-foreground hover:bg-transparent text-base"
              >
                <div className="w-10 h-10 rounded-full border border-muted-foreground/30 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                Watch Showreel
              </Button>
            </motion.div>

            {/* Stats - subtle, not dominating */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-12 mt-16 pt-8 border-t border-border/30"
            >
              <div>
                <span className="block text-3xl font-light text-foreground tracking-tight">50+</span>
                <span className="text-muted-foreground text-sm tracking-wide">Projects Delivered</span>
              </div>
              <div className="w-px h-10 bg-border/50" />
              <div>
                <span className="block text-3xl font-light text-foreground tracking-tight">4</span>
                <span className="text-muted-foreground text-sm tracking-wide">Years in Industry</span>
              </div>
              <div className="w-px h-10 bg-border/50 hidden sm:block" />
              <div className="hidden sm:block">
                <span className="block text-3xl font-light text-foreground tracking-tight">24h</span>
                <span className="text-muted-foreground text-sm tracking-wide">Response Time</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Portrait emerging from darkness */}
          <motion.div 
            className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2 relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            {/* Ambient glow behind portrait - warm, subtle */}
            <div 
              className="absolute inset-0 -z-10"
              style={{
                background: 'radial-gradient(ellipse 70% 60% at 50% 40%, hsl(35 50% 50% / 0.15) 0%, hsl(35 40% 40% / 0.05) 40%, transparent 70%)',
                filter: 'blur(40px)',
                transform: 'scale(1.3)',
              }}
            />
            
            {/* Portrait with cinematic treatment */}
            <div className="relative rim-light">
              <img 
                src={heroPortrait} 
                alt="Video Editor Portrait" 
                className="relative w-[300px] sm:w-[360px] lg:w-[420px] h-auto object-contain"
                style={{
                  filter: 'contrast(1.15) brightness(0.85) saturate(0.9)',
                  maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                }}
              />
              
              {/* Highlight edge - subtle rim light simulation */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, hsl(35 60% 70% / 0.08) 70%, transparent 90%)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, hsl(0 0% 5%) 0%, transparent 100%)',
        }}
      />
    </section>
  );
};

export default Hero;
