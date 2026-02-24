import { useState, lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { motion } from "framer-motion";
import { getReelsProjects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import ProjectThumbnail from "@/components/ProjectThumbnail";

const CinematicScene = lazy(() => import("@/components/three/CinematicScene"));

const reelsProjects = getReelsProjects();

const ReelsGallery = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [shouldRenderScene, setShouldRenderScene] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (theme !== "dark") {
      setShouldRenderScene(false);
      return;
    }

    let timeoutId: number | undefined;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const schedule = () => setShouldRenderScene(true);

    if (win.requestIdleCallback) {
      const idleId = win.requestIdleCallback(schedule, { timeout: 2000 });
      return () => win.cancelIdleCallback?.(idleId);
    }

    timeoutId = window.setTimeout(schedule, 1500);
    return () => window.clearTimeout(timeoutId);
  }, [theme]);

  const bgStyle =
    theme === "light"
      ? "linear-gradient(180deg, hsl(210 20% 98%) 0%, hsl(210 20% 95%) 50%, hsl(210 20% 98%) 100%)"
      : "linear-gradient(180deg, #030508 0%, #0a1015 50%, #050810 100%)";

  return (
    <div
      className="min-h-screen relative w-full"
      style={{ background: bgStyle, overflowX: "hidden" }}
    >
      {theme === "dark" && shouldRenderScene && (
        <Suspense fallback={null}>
          <CinematicScene />
        </Suspense>
      )}

      {theme === "light" && (
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(195 100% 90% / 0.3) 0%, transparent 60%)",
            }}
          />
        </div>
      )}

      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            to="/#work"
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 group ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <ArrowLeft
              className={`w-5 h-5 transition-transform ${
                isRTL
                  ? "rotate-180 group-hover:translate-x-1"
                  : "group-hover:-translate-x-1"
              }`}
            />
            <span className="text-sm uppercase tracking-wider font-medium">
              {isRTL ? "العودة" : "Back"}
            </span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 md:w-12 bg-primary" />
              <span className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
                {t.work.reelsLabel}
              </span>
              <div className="h-px w-8 md:w-12 bg-primary" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-foreground uppercase tracking-tight">
              {t.work.reelsTitle}
            </h1>

            <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
              {t.work.reelsDescription}
            </p>
          </div>

          {/* Reels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {reelsProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <div
                  className="group cursor-pointer"
                  onClick={() =>
                    setSelectedVideo({
                      url: project.videoUrl,
                      title: project.title,
                    })
                  }
                >
                  <div
                    className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 group-hover:border-primary/50"
                    style={{
                      boxShadow:
                        "0 4px 20px -4px hsl(202 75% 5% / 0.5)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <ProjectThumbnail
                        project={project}
                        className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          style={{
                            boxShadow:
                              "0 0 30px hsl(var(--primary) / 0.5)",
                          }}
                        >
                          <Play
                            className="w-6 h-6 text-primary-foreground ml-1"
                            fill="currentColor"
                          />
                        </motion.div>
                      </div>

                      {/* Hover border */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow:
                            "inset 0 0 0 1px hsl(var(--primary) / 0.5)",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Video Modal */}
      <VideoPlayerModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ""}
        title={selectedVideo?.title || ""}
      />
    </div>
  );
};

export default ReelsGallery;
