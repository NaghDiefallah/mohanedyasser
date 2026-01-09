import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      
      {/* Radial gradient for depth */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(174 72% 40% / 0.15) 0%, transparent 60%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full opacity-0 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for new projects</span>
          </div>

          {/* Main headline */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] opacity-0 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Visual Storytelling
            <br />
            <span className="text-gradient">That Converts.</span>
          </h1>

          {/* Sub-headline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            Expert Editing & Motion Graphics using DaVinci Resolve & After Effects.
            Transforming raw footage into cinematic experiences.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button variant="hero" size="xl" className="group">
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
              View Projects
            </Button>
            <Button variant="glass" size="xl">
              Let's Talk
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
