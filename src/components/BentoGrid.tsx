import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { getReelsProjects, getMotionGraphicsProjects } from "@/data/projects";

const reelsProjects = getReelsProjects();
const motionGraphicsProjects = getMotionGraphicsProjects();

// Clean, minimal project card
const ProjectCard = ({ project, index }: { project: typeof reelsProjects[0]; index: number }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      {/* Card container - flat, clean */}
      <div 
        className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 group-hover:border-primary/50"
        style={{
          boxShadow: '0 4px 20px -4px hsl(0 0% 0% / 0.5)',
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
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
            {project.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ===== REELS SECTION ===== */}
        <ScrollReveal className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold">
              Latest Work
            </span>
            <div className="h-px w-12 bg-primary" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
            REELS
          </h2>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            Raw cuts. Pure creativity. Each frame tells a story.
          </p>
        </ScrollReveal>

        {/* Reels Grid - Clean, flat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reelsProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ===== MOTION GRAPHICS SECTION ===== */}
        <ScrollReveal className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold">
              Animation & Graphics
            </span>
            <div className="h-px w-12 bg-primary" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
            MOTION <span className="text-primary text-glow">GRAPHICS</span>
          </h2>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            Dynamic visuals. Seamless motion. Bringing ideas to life.
          </p>
        </ScrollReveal>

        {/* Motion Graphics Grid - Clean, flat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motionGraphicsProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
