import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Calendar, Clock, User, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { getProjectBySlug, getRelatedProjects, Project } from "@/data/projects";
import LiveBackground from "@/components/LiveBackground";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectThumbnail from "@/components/ProjectThumbnail";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug || "");
  const relatedProjects = getRelatedProjects(slug || "", 3);
  const { t, isRTL } = useLanguage();

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className={`text-center ${isRTL ? 'font-arabic' : ''}`}>
          <h1 className="text-4xl font-bold mb-4">{t.projectDetail.notFound}</h1>
          <Link to="/#work" className="text-primary hover:underline">
            {isRTL ? '→' : '←'} {t.projectDetail.backToWork}
          </Link>
        </div>
      </div>
    );
  }

  const projectTypeLabel = project.type === "reel" 
    ? t.projectDetail.reel 
    : t.projectDetail.motionGraphics;

  return (
    <div className={`min-h-screen bg-background text-foreground relative ${isRTL ? 'font-arabic' : ''}`}>
      <LiveBackground />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate("/#work")}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`w-5 h-5 transition-transform ${isRTL ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
              {t.projectDetail.backToWork}
            </motion.button>

            {/* Project Header */}
            <ScrollReveal>
              <div className={`flex flex-wrap items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-muted-foreground text-sm">
                  {projectTypeLabel}
                </span>
              </div>

              <h1 
                className={`text-5xl md:text-7xl font-black text-foreground mb-6 ${isRTL ? 'text-right' : ''}`}
                style={{
                  textShadow: '4px 4px 0 hsl(0 0% 0% / 0.3)',
                }}
              >
                {project.title}
              </h1>

              <p className={`text-xl text-muted-foreground max-w-3xl leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                {project.description}
              </p>
            </ScrollReveal>

            {/* Project Meta */}
            <ScrollReveal delay={0.1}>
              <div className={`flex flex-wrap gap-6 mt-8 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                {project.client && (
                  <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <User className="w-4 h-4 text-primary" />
                    <span>{project.client}</span>
                  </div>
                )}
                <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{project.year}</span>
                </div>
                {project.duration && (
                  <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{project.duration}</span>
                  </div>
                )}
                <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Wrench className="w-4 h-4 text-primary" />
                  <span>{project.role}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm border border-border">
                <iframe
                  src={project.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50 pointer-events-none" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50 pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className={`text-2xl font-bold text-foreground mb-6 ${isRTL ? 'text-right' : ''}`}>
                {t.projectDetail.toolsUsed}
              </h2>
              <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full bg-card border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Behind The Scenes */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
                <h2 
                  className="text-3xl md:text-5xl font-black text-foreground"
                  style={{ textShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)' }}
                >
                  {t.projectDetail.behindTheScenes}{" "}
                  <span className="text-primary">{t.projectDetail.behindTheScenesHighlight}</span>
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              {project.behindTheScenes.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    className={`relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors ${isRTL ? 'text-right' : ''}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`absolute -top-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm ${isRTL ? '-right-3' : '-left-3'}`}>
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Credits */}
        {project.credits && project.credits.length > 0 && (
          <section className="py-12 px-6">
            <div className="container mx-auto max-w-5xl">
              <ScrollReveal>
                <h2 className={`text-2xl font-bold text-foreground mb-6 ${isRTL ? 'text-right' : ''}`}>
                  {t.projectDetail.credits}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.credits.map((credit, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl bg-card border border-border ${isRTL ? 'text-right' : ''}`}
                    >
                      <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-1">
                        {credit.role}
                      </p>
                      <p className="text-foreground font-medium">{credit.name}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Related Work */}
        <section className="py-16 px-6 pb-32">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 
                className="text-3xl md:text-5xl font-black text-foreground text-center mb-12"
                style={{ textShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)' }}
              >
                {t.projectDetail.relatedWork}{" "}
                <span className="text-primary">{t.projectDetail.relatedWorkHighlight}</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <ScrollReveal key={relatedProject.id} delay={index * 0.1}>
                  <Link to={`/project/${relatedProject.slug}`}>
                    <motion.div
                      className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <ProjectThumbnail
                          project={relatedProject}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Play icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      
                      <div className={`absolute bottom-0 left-0 right-0 p-4 ${isRTL ? 'text-right' : ''}`}>
                        <span className="text-primary text-xs uppercase tracking-wider font-semibold">
                          {relatedProject.category}
                        </span>
                        <h3 className="text-foreground font-bold text-lg mt-1">
                          {relatedProject.title}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;