import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { getReelsProjects, getMotionGraphicsProjects } from "@/data/projects";

const reelsProjects = getReelsProjects();
const motionGraphicsProjects = getMotionGraphicsProjects();

// Animated doodle wrapper
const AnimatedDoodle = ({ children, animation = "wiggle", delay = 0 }: { children: React.ReactNode; animation?: "wiggle" | "pulse" | "bounce" | "spin"; delay?: number }) => {
  const animations = {
    wiggle: {
      rotate: [0, -8, 8, -5, 5, 0],
      transition: { duration: 0.6, ease: "easeInOut" as const, delay }
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 0.8, ease: "easeInOut" as const, delay }
    },
    bounce: {
      y: [0, -6, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const, delay }
    },
    spin: {
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.7, ease: "easeInOut" as const, delay }
    }
  };

  return (
    <motion.div
      whileHover={animations[animation]}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// Doodle components
const HeartDoodle = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <AnimatedDoodle animation="pulse" delay={delay}>
    <svg className={className} width="30" height="28" viewBox="0 0 30 28" fill="none">
      <path
        d="M 15 26 C 12 23, 3 17, 3 9 C 3 4, 7 2, 10 2 C 12 2, 14 3, 15 5 C 16 3, 18 2, 20 2 C 23 2, 27 4, 27 9 C 27 17, 18 23, 15 26 Z"
        stroke="hsl(142 70% 45%)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="drop-shadow-[0_0_6px_hsl(142_70%_45%_/_0.6)]"
      />
    </svg>
  </AnimatedDoodle>
);

const StarDoodle = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <AnimatedDoodle animation="spin" delay={delay}>
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M 14 2 L 16 10 L 25 10 L 18 15 L 21 24 L 14 19 L 7 24 L 10 15 L 3 10 L 12 10 Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
      />
    </svg>
  </AnimatedDoodle>
);

const ArrowDoodle = ({ className, direction = "right", delay = 0 }: { className?: string; direction?: "right" | "left" | "up" | "down"; delay?: number }) => {
  const paths: Record<string, string> = {
    right: "M 2 15 C 8 14, 18 16, 28 15 M 22 10 L 28 15 L 22 20",
    left: "M 28 15 C 22 14, 12 16, 2 15 M 8 10 L 2 15 L 8 20",
    up: "M 15 28 C 14 22, 16 12, 15 2 M 10 8 L 15 2 L 20 8",
    down: "M 15 2 C 14 8, 16 18, 15 28 M 10 22 L 15 28 L 20 22",
  };
  return (
    <AnimatedDoodle animation="bounce" delay={delay}>
      <svg className={className} width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d={paths[direction]}
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
        />
      </svg>
    </AnimatedDoodle>
  );
};

const ScribbleDoodle = ({ className, variant = 1, delay = 0 }: { className?: string; variant?: number; delay?: number }) => {
  const paths = [
    "M 2 15 C 8 5, 15 25, 22 10 C 28 0, 35 20, 40 15",
    "M 5 5 C 10 10, 5 15, 10 20 C 15 25, 20 15, 25 20",
    "M 2 10 Q 10 2, 20 12 Q 30 22, 40 10",
  ];
  return (
    <AnimatedDoodle animation="wiggle" delay={delay}>
      <svg className={className} width="42" height="28" viewBox="0 0 42 28" fill="none">
        <path
          d={paths[variant % paths.length]}
          stroke="hsl(142 70% 45%)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="drop-shadow-[0_0_6px_hsl(142_70%_45%_/_0.5)]"
        />
      </svg>
    </AnimatedDoodle>
  );
};

const CrossDoodle = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <AnimatedDoodle animation="spin" delay={delay}>
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M 3 3 L 17 17 M 17 3 L 3 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </AnimatedDoodle>
);

const CircleDoodle = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <AnimatedDoodle animation="pulse" delay={delay}>
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M 16 3 C 25 2, 30 10, 29 16 C 28 24, 22 30, 16 29 C 8 28, 2 22, 3 16 C 4 8, 10 3, 16 3"
        stroke="hsl(142 70% 45%)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="drop-shadow-[0_0_6px_hsl(142_70%_45%_/_0.5)]"
      />
    </svg>
  </AnimatedDoodle>
);

// Doodle configurations for each card
const doodleConfigs = [
  { hearts: [{ pos: "-top-6 -right-8", rotate: 15 }], stars: [{ pos: "-bottom-4 -left-6", rotate: -10 }], arrows: [{ pos: "top-1/2 -right-12", direction: "right" as const }] },
  { scribbles: [{ pos: "-top-8 left-1/4", variant: 0 }], circles: [{ pos: "-bottom-6 -right-4" }], crosses: [{ pos: "-top-4 -left-6" }] },
  { hearts: [{ pos: "-bottom-6 -right-6", rotate: -20 }], arrows: [{ pos: "-top-6 left-1/3", direction: "down" as const }] },
  { stars: [{ pos: "-top-6 -left-4", rotate: 12 }], scribbles: [{ pos: "-bottom-8 right-1/4", variant: 1 }] },
  { circles: [{ pos: "-top-4 -right-6" }], hearts: [{ pos: "-bottom-4 left-1/4", rotate: 10 }], crosses: [{ pos: "top-1/3 -left-8" }] },
  { arrows: [{ pos: "-bottom-8 -right-8", direction: "up" as const }], stars: [{ pos: "-top-4 right-1/4", rotate: -15 }], scribbles: [{ pos: "-bottom-6 -left-10", variant: 2 }] },
];

// Hand-drawn SVG frame component
const PolaroidFrame = ({ rotation, children, className, doodleIndex }: { rotation: number; children: React.ReactNode; className?: string; doodleIndex: number }) => {
  const config = doodleConfigs[doodleIndex % doodleConfigs.length];
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Doodle annotations */}
      {config.hearts?.map((h, i) => (
        <HeartDoodle key={`heart-${i}`} className={`absolute ${h.pos} z-30 pointer-events-none`} />
      ))}
      {config.stars?.map((s, i) => (
        <StarDoodle key={`star-${i}`} className={`absolute ${s.pos} z-30 pointer-events-none`} />
      ))}
      {config.arrows?.map((a, i) => (
        <ArrowDoodle key={`arrow-${i}`} className={`absolute ${a.pos} z-30 pointer-events-none`} direction={a.direction} />
      ))}
      {config.scribbles?.map((s, i) => (
        <ScribbleDoodle key={`scribble-${i}`} className={`absolute ${s.pos} z-30 pointer-events-none`} variant={s.variant} />
      ))}
      {config.circles?.map((c, i) => (
        <CircleDoodle key={`circle-${i}`} className={`absolute ${c.pos} z-30 pointer-events-none`} />
      ))}
      {config.crosses?.map((x, i) => (
        <CrossDoodle key={`cross-${i}`} className={`absolute ${x.pos} z-30 pointer-events-none`} />
      ))}
      
      {/* Rough hand-drawn border effect */}
      <svg 
        className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none z-10"
        viewBox="0 0 100 120"
        preserveAspectRatio="none"
      >
        <path
          d="M 2 3 
             C 5 1, 15 2, 25 1.5 
             C 40 0.5, 60 2, 75 1 
             C 85 0.5, 95 1.5, 98 3
             C 99 15, 98 30, 99 45
             C 100 60, 98 75, 99 90
             C 100 105, 98 115, 97 118
             C 85 119, 75 117, 60 118.5
             C 45 120, 25 118, 10 119
             C 4 118.5, 2 117, 1 115
             C 0 100, 2 85, 1 70
             C 0 55, 1 40, 0 25
             C 1 10, 0 5, 2 3 Z"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      </svg>
      
      {/* Tape effect on top */}
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/20 backdrop-blur-sm z-20 rounded-sm"
        style={{ 
          transform: `translateX(-50%) rotate(${-rotation * 0.5}deg)`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      />
      
      {children}
    </div>
  );
};

const BentoGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 md:py-48 px-6 relative overflow-hidden">
      {/* Scratchy background texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* ===== REELS SECTION ===== */}
        <ScrollReveal className="text-center mb-24 space-y-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <span 
              className="text-primary uppercase tracking-[0.3em] text-sm font-bold"
              style={{
                textShadow: '0 0 20px hsl(var(--primary) / 0.6)'
              }}
            >
              Latest Work
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </motion.div>
          
          {/* Grunge-style title */}
          <div className="relative inline-block">
            <h2 
              className="text-5xl md:text-8xl font-black text-white tracking-tight"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.03em',
                textShadow: '4px 4px 0 hsl(0 0% 0% / 0.3)',
              }}
            >
              <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.7), 4px 4px 0 hsl(0 0% 0% / 0.3)' }}>REELS</span>
            </h2>
            
            {/* Decorative underline scribble */}
            <svg 
              className="absolute -bottom-4 left-0 w-full h-8"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 10 C 30 5, 60 15, 90 10 C 120 5, 150 12, 180 8 C 210 4, 240 14, 270 10 C 290 7, 300 10, 300 10"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                className="opacity-60"
              />
            </svg>
          </div>
          
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mt-8">
            Raw cuts. Pure creativity. Each frame tells a story.
          </p>
        </ScrollReveal>

        {/* Reels Polaroid-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-32">
          {reelsProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotate: project.rotation * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: project.rotation }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PolaroidFrame rotation={project.rotation} doodleIndex={index}>
                <div 
                  className="group relative cursor-pointer bg-black p-3 pb-16"
                  onClick={() => navigate(`/project/${project.slug}`)}
                >
                  {/* Photo area */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Cinematic bars */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black/80" />
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-black/80" />
                    
                    {/* Scan lines effect */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                      }}
                    />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        style={{
                          boxShadow: '0 0 40px hsl(var(--primary) / 0.6)'
                        }}
                      >
                        <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                      </motion.div>
                    </div>
                    
                    {/* Corner marks */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/50" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/50" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/50" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/50" />
                  </div>
                  
                  {/* Polaroid caption area */}
                  <div className="absolute bottom-2 left-0 right-0 px-4 text-center">
                    <p 
                      className="text-white font-bold text-lg tracking-wide"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      {project.title}
                    </p>
                    <span 
                      className="text-primary text-xs uppercase tracking-[0.2em] font-semibold"
                      style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
                    >
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 60px -10px hsl(var(--primary) / 0.2), 0 0 80px -20px hsl(var(--primary) / 0.4)'
                    }}
                  />
                </div>
              </PolaroidFrame>
            </motion.div>
          ))}
        </div>

        {/* ===== MOTION GRAPHICS SECTION ===== */}
        <ScrollReveal className="text-center mb-24 space-y-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <span 
              className="text-primary uppercase tracking-[0.3em] text-sm font-bold"
              style={{
                textShadow: '0 0 20px hsl(var(--primary) / 0.6)'
              }}
            >
              Animation & Graphics
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </motion.div>
          
          {/* Grunge-style title */}
          <div className="relative inline-block">
            <h2 
              className="text-5xl md:text-8xl font-black text-white tracking-tight"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.03em',
                textShadow: '4px 4px 0 hsl(0 0% 0% / 0.3)',
              }}
            >
              MOTION <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.7), 4px 4px 0 hsl(0 0% 0% / 0.3)' }}>GRAPHICS</span>
            </h2>
            
            {/* Decorative underline scribble */}
            <svg 
              className="absolute -bottom-4 left-0 w-full h-8"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 10 C 30 5, 60 15, 90 10 C 120 5, 150 12, 180 8 C 210 4, 240 14, 270 10 C 290 7, 300 10, 300 10"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                className="opacity-60"
              />
            </svg>
          </div>
          
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mt-8">
            Dynamic visuals. Seamless motion. Bringing ideas to life.
          </p>
        </ScrollReveal>

        {/* Motion Graphics Polaroid-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {motionGraphicsProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotate: project.rotation * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: project.rotation }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PolaroidFrame rotation={project.rotation} doodleIndex={index + 3}>
                <div 
                  className="group relative cursor-pointer bg-black p-3 pb-16"
                  onClick={() => navigate(`/project/${project.slug}`)}
                >
                  {/* Photo area */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Cinematic bars */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black/80" />
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-black/80" />
                    
                    {/* Scan lines effect */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                      }}
                    />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        style={{
                          boxShadow: '0 0 40px hsl(var(--primary) / 0.6)'
                        }}
                      >
                        <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                      </motion.div>
                    </div>
                    
                    {/* Corner marks */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/50" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/50" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/50" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/50" />
                  </div>
                  
                  {/* Polaroid caption area */}
                  <div className="absolute bottom-2 left-0 right-0 px-4 text-center">
                    <p 
                      className="text-white font-bold text-lg tracking-wide"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      {project.title}
                    </p>
                    <span 
                      className="text-primary text-xs uppercase tracking-[0.2em] font-semibold"
                      style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
                    >
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 60px -10px hsl(var(--primary) / 0.2), 0 0 80px -20px hsl(var(--primary) / 0.4)'
                    }}
                  />
                </div>
              </PolaroidFrame>
            </motion.div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 opacity-20 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="30" y1="5" x2="30" y2="55" stroke="white" strokeWidth="1" />
            <line x1="5" y1="30" x2="55" y2="30" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="absolute bottom-40 left-10 opacity-15 pointer-events-none rotate-12">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <path d="M 10 40 L 40 10 L 70 40 L 40 70 Z" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      </div>

    </section>
  );
};

export default BentoGrid;
