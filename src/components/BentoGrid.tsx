import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { getReelsProjects, getMotionGraphicsProjects } from "@/data/projects";
import TiltCard from "./TiltCard";
import ViewportReveal from "./ViewportReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const reelsProjects = getReelsProjects();
const motionGraphicsProjects = getMotionGraphicsProjects();

// Premium project card with 3D tilt
const ProjectCard = ({ project, index }: { project: typeof reelsProjects[0]; index: number }) => {
  const navigate = useNavigate();

  return (
    <ViewportReveal>
      <TiltCard
        className="group"
        onClick={() => navigate(`/project/${project.slug}`)}
        tiltAmount={8}
      >
        {/* Card container */}
        <div 
          className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 group-hover:border-primary/50"
          style={{
            boxShadow: '0 4px 20px -4px hsl(202 75% 5% / 0.5)',
          }}
        >
          {/* Image area */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.div 
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                style={{
                  boxShadow: '0 0 30px hsl(var(--primary) / 0.5)'
                }}
              >
                <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
              </motion.div>
            </div>

            {/* Neon border on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 0 1px hsl(var(--primary) / 0.5)',
              }}
            />
          </div>
          
          {/* Content area */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
              {project.category}
            </span>
          </div>
        </div>
      </TiltCard>
    </ViewportReveal>
  );
};

const BentoGrid = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ===== REELS SECTION ===== */}
        <ViewportReveal className="text-center mb-6 md:mb-8 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
              {t.work.reelsLabel}
            </span>
            <div className="h-px w-8 md:w-12 bg-primary" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight">
            {t.work.reelsTitle}
          </h2>
          
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            {t.work.reelsDescription}
          </p>
        </ViewportReveal>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
          {reelsProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ===== MOTION GRAPHICS SECTION ===== */}
        <ViewportReveal className="text-center mb-6 md:mb-8 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
              {t.work.motionLabel}
            </span>
            <div className="h-px w-8 md:w-12 bg-primary" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight">
            {t.work.motionTitle} <span className="text-primary">{t.work.motionTitleHighlight}</span>
          </h2>
          
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            {t.work.motionDescription}
          </p>
        </ViewportReveal>

        {/* Motion Graphics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {motionGraphicsProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;