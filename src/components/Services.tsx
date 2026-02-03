import { Film, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceIcons = [Film, Palette, Sparkles];

const Services = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-8 md:mb-10 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
              {t.services.label}
            </span>
            <div className="h-px w-8 md:w-12 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight">
            {t.services.title} <span className="text-primary text-glow">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            {t.services.description}
          </p>
        </ScrollReveal>

        {/* Services Grid - Single column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {t.services.items.map((service, index) => {
            const IconComponent = serviceIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-5 sm:p-6 md:p-8 flex flex-col h-full group rounded-lg transition-all duration-300 bg-card border border-border hover:border-primary/50 ${isRTL ? 'text-right' : ''}`}
                style={{
                  boxShadow: '0 4px 20px -4px hsl(202 75% 5% / 0.5)',
                }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300 border border-primary/20 ${isRTL ? 'ml-auto' : ''}`}>
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow text-sm leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="pt-6 border-t border-border">
                  <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 uppercase tracking-wider text-sm font-semibold"
                  >
                    {t.services.getQuote}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
