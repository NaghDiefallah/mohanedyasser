import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Content - 2 Column Layout */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 pb-16 lg:pb-0">
            {/* Eyebrow */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-semibold mb-6 tracking-widest uppercase text-sm"
              style={{
                textShadow: '0 0 20px hsl(142 70% 45% / 0.6)'
              }}
            >
              Video Editor & Motion Designer
            </motion.p>

            {/* Main headline - white text with lime green glowing keywords */}
            <div className="space-y-1 md:space-y-0">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight text-white"
              >
                I craft stories
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight"
              >
                <span className="text-white">through </span>
                <span 
                  className="text-primary"
                  style={{
                    textShadow: '0 0 30px hsl(142 70% 45% / 0.8), 0 0 60px hsl(142 70% 45% / 0.5), 0 0 90px hsl(142 70% 45% / 0.3)'
                  }}
                >
                  motion.
                </span>
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
              className="mt-16 flex gap-12 md:gap-16 text-sm"
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

          {/* Right Column - Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl translate-x-4 lg:translate-x-8">
              {/* Noir-style portrait with aggressive gradient mask - hiding phone/hands */}
              <div 
                className="relative"
                style={{
                  maskImage: 'radial-gradient(ellipse 70% 55% at 55% 25%, black 25%, transparent 65%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 55% 25%, black 25%, transparent 65%)',
                }}
              >
                <img 
                  src={heroPortrait}
                  alt="Portrait"
                  className="w-full h-auto object-cover scale-110"
                  style={{
                    filter: 'grayscale(100%) contrast(1.5) brightness(0.75)',
                  }}
                />
              </div>
              
              {/* Animated glow pulse behind the portrait */}
              <motion.div 
                className="absolute inset-0 -z-10 blur-3xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(142 70% 45% / 0.4), transparent 60%)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
