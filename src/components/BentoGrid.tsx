import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  rotation: number;
}

import brandCommercialImg from "@/assets/brand-commercial.jpg";

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Commercial",
    category: "Commercial",
    thumbnail: brandCommercialImg,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: -2,
  },
  {
    id: 2,
    title: "Music Video",
    category: "Music",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: 3,
  },
  {
    id: 3,
    title: "Documentary",
    category: "Film",
    thumbnail: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: -1.5,
  },
  {
    id: 4,
    title: "Social Campaign",
    category: "Social Media",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: 2.5,
  },
  {
    id: 5,
    title: "Product Launch",
    category: "Commercial",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: -3,
  },
  {
    id: 6,
    title: "Motion Reel",
    category: "Motion Graphics",
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: 1.5,
  },
];

// Hand-drawn SVG frame component
const PolaroidFrame = ({ rotation, children, className }: { rotation: number; children: React.ReactNode; className?: string }) => (
  <div 
    className={`relative ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Rough hand-drawn border effect */}
    <svg 
      className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none z-10"
      viewBox="0 0 100 120"
      preserveAspectRatio="none"
    >
      {/* Rough rectangle path */}
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

const BentoGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
        {/* Section Header - Brush stroke style */}
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
                textShadow: '0 0 20px hsl(142 70% 45% / 0.6)'
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
              EDITS & <span className="text-primary" style={{ textShadow: '0 0 30px hsl(142 70% 45% / 0.7), 4px 4px 0 hsl(0 0% 0% / 0.3)' }}>REELS</span>
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
                stroke="hsl(142 70% 45%)"
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

        {/* Polaroid-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotate: project.rotation * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: project.rotation }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PolaroidFrame rotation={project.rotation}>
                <div 
                  className="group relative cursor-pointer bg-black p-3 pb-16"
                  onClick={() => setSelectedProject(project)}
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
                          boxShadow: '0 0 40px hsl(142 70% 45% / 0.6)'
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
                      style={{ textShadow: '0 0 10px hsl(142 70% 45% / 0.5)' }}
                    >
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 60px -10px hsl(142 70% 45% / 0.2), 0 0 80px -20px hsl(142 70% 45% / 0.4)'
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

      {/* Video Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black border-2 border-white/20">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/80 backdrop-blur-sm p-2 hover:bg-primary transition-colors">
            <X className="w-5 h-5" />
          </DialogClose>
          {selectedProject && (
            <div className="aspect-video w-full">
              <iframe
                src={selectedProject.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BentoGrid;
