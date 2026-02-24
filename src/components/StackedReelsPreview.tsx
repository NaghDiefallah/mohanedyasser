import { useNavigate } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getReelsProjects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import ProjectThumbnail from "./ProjectThumbnail";

const reelsProjects = getReelsProjects();

const rotations = [-6, -3, 0, 3, 6];

const StackedReelsPreview = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const stackProjects = reelsProjects.slice(0, 5);

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
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
        </div>

        {/* ===== DESKTOP: Grid Layout (hidden on mobile) ===== */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
          {stackProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                className="cursor-pointer group"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                onClick={() => navigate("/reels")}
              >
                <div
                  className="w-full h-64 rounded-xl overflow-hidden border border-border bg-card transition-shadow duration-300"
                  style={{
                    boxShadow: "0 4px 20px -4px hsl(0 0% 0% / 0.3)",
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

        {/* ===== MOBILE: Vertical card list (hidden on desktop) ===== */}
        <div className="flex flex-col gap-4 md:hidden mb-8">
          {stackProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => navigate("/reels")}
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

        {/* View All Reels Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className={`group gap-3 px-8 py-6 font-bold uppercase tracking-wider text-sm text-white ${isRTL ? "font-arabic" : ""}`}
            style={{
              backgroundColor: "#0077b6",
              boxShadow: "0 0 20px rgba(57, 107, 128, 0.4)",
            }}
            onClick={() => navigate("/reels")}
          >
            {isRTL ? "عرض كل الريلز" : "View All Reels"}
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

export default StackedReelsPreview;
