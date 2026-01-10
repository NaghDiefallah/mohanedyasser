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
  span: string;
}

import brandCommercialImg from "@/assets/brand-commercial.jpg";

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Commercial",
    category: "Commercial",
    thumbnail: brandCommercialImg,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Music Video",
    category: "Music",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Documentary",
    category: "Film",
    thumbnail: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "Social Campaign",
    category: "Social Media",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    title: "Product Launch",
    category: "Commercial",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 6,
    title: "Motion Reel",
    category: "Motion Graphics",
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-1 md:row-span-1",
  },
];

const BentoGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-32 md:py-48 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20 space-y-4">
          <span 
            className="text-primary uppercase tracking-widest text-sm font-semibold"
            style={{
              textShadow: '0 0 15px hsl(142 70% 45% / 0.5)'
            }}
          >
            Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white">The Work</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A curated selection of projects showcasing storytelling, technical precision, and creative vision.
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 auto-rows-[250px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer card-hover-scale ${project.span}`}
              style={{
                background: 'hsl(0 0% 100% / 0.05)',
                border: '1px solid hsl(192 25% 35% / 0.3)'
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail */}
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Glow border on hover */}
              <div 
                className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/50 transition-all duration-300 pointer-events-none"
                style={{
                  boxShadow: 'none'
                }}
              />
              <motion.div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 80px -20px hsl(142 70% 45% / 0.3), 0 0 40px -10px hsl(142 70% 45% / 0.3)'
                }}
              />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span 
                  className="text-primary text-sm font-medium uppercase tracking-wider"
                  style={{
                    textShadow: '0 0 10px hsl(142 70% 45% / 0.5)'
                  }}
                >
                  {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mt-1 text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-card border-border">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors">
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
