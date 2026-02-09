import { Film, Palette, Sparkles, Mic, Music, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceIcons = [Film, Palette, Sparkles, Mic, Music, Bot];

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
            {t.services.title} <span className="text-primary">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            {t.services.description}
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {t.services.items.map((service, index) => {
            const IconComponent = serviceIcons[index] || Sparkles;
            return (
              <div
                key={index}
                className={`p-5 sm:p-6 flex flex-col h-full group rounded-lg transition-all duration-300 bg-card border border-border hover:border-primary/50 ${isRTL ? 'text-right' : ''}`}
                style={{
                  boxShadow: '0 4px 20px -4px hsl(202 75% 5% / 0.5)',
                }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 border border-primary/20 ${isRTL ? 'ml-auto' : ''}`}>
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 flex-grow text-xs sm:text-sm leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-2 text-xs sm:text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="pt-4 sm:pt-6 border-t border-border mt-auto">
                  <p className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">{service.price}</p>
                  <Button
                    variant="outline"
                    className="w-full border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm font-semibold"
                  >
                    {t.services.getQuote}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;