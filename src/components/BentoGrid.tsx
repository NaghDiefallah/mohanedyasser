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

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Commercial",
    category: "Commercial",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Music Video",
    category: "Music",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Documentary",
    category: "Film",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "Social Campaign",
    category: "Social Media",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    title: "Product Launch",
    category: "Commercial",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 6,
    title: "Motion Reel",
    category: "Motion Graphics",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    span: "md:col-span-1 md:row-span-1",
  },
];

const BentoGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 space-y-4">
          <span className="text-primary uppercase tracking-widest text-sm font-semibold">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-black">The Work</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A curated selection of projects showcasing storytelling, technical precision, and creative vision.
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer card-hover-scale ${project.span}`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail */}
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 60px -20px hsl(142 70% 45% / 0.3)'
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
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mt-1">{project.title}</h3>
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
