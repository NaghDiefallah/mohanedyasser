import { useNavigate } from "react-router-dom";
import { Play, Check } from "lucide-react";
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
    <ViewportReveal delay={index * 0.1}>
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
          
          {/* Content area with slide-up animation */}
          <motion.div 
            className="p-5"
            initial={{ y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
              {project.category}
            </span>
          </motion.div>
        </div>
      </TiltCard>
    </ViewportReveal>
  );
};

const BentoGrid = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <section className="py-12 md:py-16 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ===== REELS SECTION ===== */}
        <ViewportReveal className="text-center mb-8 space-y-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold">
              {t.work.reelsLabel}
            </span>
            <div className="h-px w-12 bg-primary" />
          </motion.div>
          
          {/* Section title with glow-up animation */}
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ 
              opacity: 1, 
              filter: "blur(0px)",
              textShadow: [
                "0 0 0px hsl(195 100% 50% / 0)",
                "0 0 30px hsl(195 100% 50% / 0.4)",
                "0 0 10px hsl(195 100% 50% / 0.2)"
              ]
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.work.reelsTitle}
          </motion.h2>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            {t.work.reelsDescription}
          </p>
        </ViewportReveal>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reelsProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ===== MOTION GRAPHICS SECTION ===== */}
        <ViewportReveal className="text-center mb-8 space-y-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold">
              {t.work.motionLabel}
            </span>
            <div className="h-px w-12 bg-primary" />
          </motion.div>
          
          {/* Section title with glow-up animation */}
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ 
              opacity: 1, 
              filter: "blur(0px)"
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.work.motionTitle} <motion.span 
              className="text-primary"
              initial={{ textShadow: "0 0 0px hsl(195 100% 50% / 0)" }}
              whileInView={{ 
                textShadow: [
                  "0 0 0px hsl(195 100% 50% / 0)",
                  "0 0 40px hsl(195 100% 50% / 0.6)",
                  "0 0 20px hsl(195 100% 50% / 0.4)"
                ]
              }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >{t.work.motionTitleHighlight}</motion.span>
          </motion.h2>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            {t.work.motionDescription}
          </p>
        </ViewportReveal>

        {/* Motion Graphics - Two Column Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Left: Featured Video */}
          <div className={`lg:col-span-1 ${isRTL ? 'lg:col-start-2' : ''}`}>
            {motionGraphicsProjects[0] && (
              <ViewportReveal>
                <TiltCard
                  className="group"
                  onClick={() => window.location.href = `/project/${motionGraphicsProjects[0].slug}`}
                  tiltAmount={6}
                >
                  <div 
                    className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 group-hover:border-primary/50"
                    style={{ boxShadow: '0 4px 20px -4px hsl(0 0% 0% / 0.5)' }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={motionGraphicsProjects[0].thumbnail}
                        alt={motionGraphicsProjects[0].title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.div 
                          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}
                        >
                          <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                        </motion.div>
                      </div>
                    </div>
                    <motion.div 
                      className="p-6"
                      initial={{ y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {motionGraphicsProjects[0].title}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                        {motionGraphicsProjects[0].category}
                      </span>
                    </motion.div>
                  </div>
                </TiltCard>
              </ViewportReveal>
            )}
          </div>

          {/* Right: Skills/Specs List */}
          <div className={`lg:col-span-1 flex flex-col justify-center ${isRTL ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <ViewportReveal delay={0.2}>
              <div className="space-y-6">
                <h3 className={`text-2xl font-bold text-foreground uppercase tracking-tight mb-8 ${isRTL ? 'text-right' : ''}`}>
                  {t.work.whatICreate}
                </h3>
                
                {t.work.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(195 100% 50% / 0.4)" }}
                      style={{ boxShadow: '0 0 10px hsl(var(--primary) / 0.3)' }}
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </motion.div>
                    <span className="text-muted-foreground text-lg font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </ViewportReveal>

            {/* Additional project cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {motionGraphicsProjects.slice(1, 3).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
