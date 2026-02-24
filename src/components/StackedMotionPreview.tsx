import { useNavigate } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getMotionGraphicsProjects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import ProjectThumbnail from "./ProjectThumbnail";

const motionProjects = getMotionGraphicsProjects();

const rotations = [-6, -3, 0, 3, 6];

const StackedMotionPreview = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const stackProjects = motionProjects.slice(0, 5);

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
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
        </div>

        {/* ===== DESKTOP: Stacked Album (hidden on mobile) ===== */}
        <div className="hidden md:flex justify-center items-center mb-12">
          <div className="relative w-[420px] h-[320px]">
            {stackProjects.map((project, index) => {
              const rotation = rotations[index] || 0;
              const zIndex = index === Math.floor(stackProjects.length / 2) ? 10 : stackProjects.length - Math.abs(index - Math.floor(stackProjects.length / 2));
              const xOffset = (index - Math.floor(stackProjects.length / 2)) * 18;

              return (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 cursor-pointer group"
                  style={{
                    zIndex,
                  }}
                  initial={{
                    rotate: rotation,
                    x: xOffset,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotate: 0,
                    zIndex: 20,
                    y: -20,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  onClick={() => navigate("/motion-graphics")}
                >
                  <div
                    className="w-full h-full rounded-xl overflow-hidden border border-border bg-card transition-shadow duration-300"
                    style={{
                      boxShadow: `0 ${4 + index * 2}px ${20 + index * 5}px -4px hsl(0 0% 0% / ${0.3 + index * 0.05})`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <ProjectThumbnail
                        project={project}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Play button on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div
                          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center"
                          style={{
                            boxShadow: "0 0 20px hsl(var(--primary) / 0.4)",
                          }}
                        >
                          <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Title at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-foreground font-bold text-lg">{project.title}</h3>
                        <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== MOBILE: Vertical card list (hidden on desktop) ===== */}
        <div className="flex flex-col gap-4 md:hidden mb-8">
          {stackProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => navigate("/motion-graphics")}
            >
              <div className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <ProjectThumbnail
                    project={project}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 100vw, 100vw"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {project.title}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Motion Graphics Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className={`group gap-3 px-8 py-6 font-bold uppercase tracking-wider text-sm text-white ${isRTL ? "font-arabic" : ""}`}
            style={{
              backgroundColor: "#0077b6",
              boxShadow: "0 0 20px rgba(0, 168, 232, 0.4)",
            }}
            onClick={() => navigate("/motion-graphics")}
          >
            {isRTL ? "عرض كل الموشن جرافيك" : "View All Motion Graphics"}
            <ArrowRight
              className={`w-4 h-4 transition-transform ${
                isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StackedMotionPreview;
