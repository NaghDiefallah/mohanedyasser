import brandCommercialImg from "@/assets/brand-commercial.jpg";
import brandCommercialAvif320 from "@/assets/optimized/brand-commercial-320w.avif";
import brandCommercialAvif480 from "@/assets/optimized/brand-commercial-480w.avif";
import brandCommercialAvif640 from "@/assets/optimized/brand-commercial-640w.avif";
import brandCommercialAvif960 from "@/assets/optimized/brand-commercial-960w.avif";
import brandCommercialWebp320 from "@/assets/optimized/brand-commercial-320w.webp";
import brandCommercialWebp480 from "@/assets/optimized/brand-commercial-480w.webp";
import brandCommercialWebp640 from "@/assets/optimized/brand-commercial-640w.webp";
import brandCommercialWebp960 from "@/assets/optimized/brand-commercial-960w.webp";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  type: "reel" | "motion-graphics";
  thumbnail: string;
  thumbnailSrcSet?: {
    avif: string;
    webp: string;
  };
  thumbnailSizes?: string;
  videoUrl: string;
  rotation: number;
  // Extended details for project page
  description: string;
  client?: string;
  year: string;
  duration?: string;
  role: string;
  tools: string[];
  behindTheScenes: {
    title: string;
    description: string;
    image?: string;
  }[];
  credits?: {
    role: string;
    name: string;
  }[];
}

export const allProjects: Project[] = [
  // Reels
  {
    id: 1,
    slug: "brand-commercial",
    title: "Brand Commercial",
    category: "Commercial",
    type: "reel",
    thumbnail: brandCommercialImg,
    thumbnailSrcSet: {
      avif: `${brandCommercialAvif320} 320w, ${brandCommercialAvif480} 480w, ${brandCommercialAvif640} 640w, ${brandCommercialAvif960} 960w`,
      webp: `${brandCommercialWebp320} 320w, ${brandCommercialWebp480} 480w, ${brandCommercialWebp640} 640w, ${brandCommercialWebp960} 960w`,
    },
    thumbnailSizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: -2,
    description: "A high-energy commercial showcasing the brand's innovative spirit and modern aesthetic. This project pushed the boundaries of visual storytelling with dynamic camera movements and bold color grading.",
    client: "Creative Agency",
    year: "2024",
    duration: "60 seconds",
    role: "Director & Editor",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D"],
    behindTheScenes: [
      {
        title: "Concept Development",
        description: "Started with storyboards and mood boards to capture the brand's essence. The creative process involved multiple iterations to find the perfect visual language.",
      },
      {
        title: "Color Grading",
        description: "Developed a unique color palette that enhanced the emotional impact of each scene while maintaining brand consistency.",
      },
      {
        title: "Sound Design",
        description: "Collaborated with sound designers to create an immersive audio experience that complemented the visual narrative.",
      },
    ],
    credits: [
      { role: "Director", name: "Mohand Yasser" },
      { role: "Cinematographer", name: "Alex Chen" },
      { role: "Sound Design", name: "Sarah Williams" },
    ],
  },
  {
    id: 2,
    slug: "music-video",
    title: "Music Video",
    category: "Music",
    type: "reel",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: 3,
    description: "An experimental music video that blends performance footage with abstract visual elements. The project explores the relationship between sound and image through innovative editing techniques.",
    client: "Independent Artist",
    year: "2024",
    duration: "3:45",
    role: "Director & Editor",
    tools: ["Premiere Pro", "After Effects", "Blender"],
    behindTheScenes: [
      {
        title: "Visual Concept",
        description: "Worked closely with the artist to develop a visual language that matched the song's emotional journey.",
      },
      {
        title: "Performance Capture",
        description: "Shot across multiple locations to capture the raw energy and emotion of the performance.",
      },
    ],
    credits: [
      { role: "Director", name: "Mohand Yasser" },
      { role: "Artist", name: "The Collective" },
    ],
  },
  {
    id: 3,
    slug: "documentary",
    title: "Documentary",
    category: "Film",
    type: "reel",
    thumbnail: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: -1.5,
    description: "A compelling documentary exploring the intersection of art and technology. This project involved months of research and interviews to craft an authentic narrative.",
    year: "2023",
    duration: "25 minutes",
    role: "Editor & Colorist",
    tools: ["Premiere Pro", "DaVinci Resolve", "Audition"],
    behindTheScenes: [
      {
        title: "Research Phase",
        description: "Spent weeks interviewing subjects and researching the topic to ensure authenticity and depth.",
      },
      {
        title: "Post-Production",
        description: "The editing process took over 200 hours to craft the perfect narrative flow.",
      },
    ],
  },
  // Motion Graphics
  {
    id: 4,
    slug: "social-campaign",
    title: "Social Campaign",
    category: "Social Media",
    type: "motion-graphics",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: 2.5,
    description: "A series of animated social media content designed to maximize engagement and brand awareness. Each piece was optimized for different platforms while maintaining visual consistency.",
    client: "Tech Startup",
    year: "2024",
    role: "Motion Designer",
    tools: ["After Effects", "Illustrator", "Photoshop"],
    behindTheScenes: [
      {
        title: "Platform Optimization",
        description: "Created multiple versions optimized for Instagram, TikTok, and YouTube Shorts.",
      },
      {
        title: "Animation Style",
        description: "Developed a signature animation style that became instantly recognizable across platforms.",
      },
    ],
  },
  {
    id: 5,
    slug: "product-launch",
    title: "Product Launch",
    category: "Commercial",
    type: "motion-graphics",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: -3,
    description: "A sleek product launch video combining 3D product visualization with dynamic motion graphics. The project showcased the product's features through engaging visual storytelling.",
    client: "Electronics Brand",
    year: "2024",
    duration: "90 seconds",
    role: "Motion Designer & 3D Artist",
    tools: ["Cinema 4D", "After Effects", "Octane Render"],
    behindTheScenes: [
      {
        title: "3D Modeling",
        description: "Created detailed 3D models of the product from CAD files provided by the client.",
      },
      {
        title: "Lighting & Rendering",
        description: "Used physically-based rendering to achieve photorealistic product shots.",
      },
      {
        title: "Motion Design",
        description: "Added dynamic transitions and kinetic typography to enhance the presentation.",
      },
    ],
    credits: [
      { role: "Motion Design", name: "Mohand Yasser" },
      { role: "3D Supervisor", name: "Mike Johnson" },
    ],
  },
  {
    id: 6,
    slug: "motion-reel",
    title: "Motion Reel",
    category: "Animation",
    type: "motion-graphics",
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rotation: 1.5,
    description: "A showcase reel highlighting the best motion graphics work from the past year. Features a variety of styles from minimal 2D animation to complex 3D compositions.",
    year: "2024",
    duration: "2 minutes",
    role: "Motion Designer",
    tools: ["After Effects", "Cinema 4D", "Blender", "Premiere Pro"],
    behindTheScenes: [
      {
        title: "Project Selection",
        description: "Curated the best moments from dozens of projects to create a cohesive showreel.",
      },
      {
        title: "Pacing & Flow",
        description: "Carefully edited to maintain energy while showcasing the diversity of work.",
      },
    ],
  },
];

export const getReelsProjects = () => allProjects.filter(p => p.type === "reel");
export const getMotionGraphicsProjects = () => allProjects.filter(p => p.type === "motion-graphics");
export const getProjectBySlug = (slug: string) => allProjects.find(p => p.slug === slug);
export const getRelatedProjects = (currentSlug: string, limit = 3) => 
  allProjects.filter(p => p.slug !== currentSlug).slice(0, limit);
