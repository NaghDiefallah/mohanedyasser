import { Film, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const services = [
  {
    icon: Film,
    title: "Video Editing",
    description: "Professional cutting, pacing, and storytelling that keeps audiences engaged from start to finish.",
    price: "Starting at $500",
    features: ["Narrative structure", "Sound design", "Color matching", "Delivery in all formats"],
  },
  {
    icon: Palette,
    title: "Color Grading",
    description: "Cinematic color correction and grading that elevates your footage to a professional look.",
    price: "Starting at $300",
    features: ["LUT creation", "Scene matching", "Film emulation", "HDR support"],
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    description: "Eye-catching animations, titles, and visual effects that bring your brand to life.",
    price: "Starting at $750",
    features: ["Logo animations", "Kinetic typography", "2D/3D elements", "Social media assets"],
  },
];

const Services = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Background accent */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, hsl(142 70% 45% / 0.1) 0%, transparent 50%)'
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 space-y-4">
          <span className="text-primary uppercase tracking-widest text-sm font-semibold">Services</span>
          <h2 className="text-4xl md:text-6xl font-black">What I Offer</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            End-to-end post-production services tailored to your vision and budget.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 flex flex-col h-full group rounded-2xl backdrop-blur-xl transition-all duration-300 hover:border-primary/40"
              style={{
                background: 'hsl(192 40% 14% / 0.85)',
                border: '1px solid hsl(192 25% 35% / 0.5)',
                boxShadow: 'none'
              }}
              whileHover={{
                boxShadow: '0 0 50px -15px hsl(142 70% 45% / 0.4)'
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300 border border-primary/20">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price & CTA */}
              <div className="pt-6 border-t border-border/50">
                <p className="text-2xl font-bold text-gradient mb-4">{service.price}</p>
                <Button variant="outline" className="w-full group-hover:border-primary/50 group-hover:bg-primary/5">
                  Get Quote
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
