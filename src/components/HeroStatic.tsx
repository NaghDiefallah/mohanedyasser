import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { logoMarkSources } from "@/data/imageSources";

const HeroStatic = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16">
      <div className={`relative z-10 container mx-auto px-5 sm:px-6 ${isRTL ? "font-arabic" : ""}`}>
        <div className="flex flex-col items-center text-center gap-5">
          <picture>
            <source type="image/avif" srcSet={logoMarkSources.avifSrcSet} sizes="(max-width: 640px) 60vw, 288px" />
            <source type="image/webp" srcSet={logoMarkSources.webpSrcSet} sizes="(max-width: 640px) 60vw, 288px" />
            <img
              src={logoMarkSources.fallback}
              alt="Mohaned Yasser Logo"
              className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          <p className={`text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground ${isRTL ? "font-arabic" : ""}`}>
            {t.hero.name}
          </p>

          <h1
            className="text-[clamp(3.5rem,14vw,7rem)] leading-[0.9] font-bold tracking-[-0.02em]"
            style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "sans-serif, 'Bebas Neue'" }}
          >
            <span className="block text-foreground">{t.hero.title1}</span>
            <span className="block whitespace-nowrap text-primary">{t.hero.title2}</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto sm:justify-center">
            <Button
              size="lg"
              className={`group gap-3 px-8 py-6 sm:py-7 font-bold uppercase tracking-wider text-sm sm:text-base w-full sm:w-auto text-white ${isRTL ? "font-arabic" : ""}`}
              style={{
                backgroundColor: "#0077b6",
                boxShadow: "0 0 20px rgba(0, 168, 232, 0.4)",
              }}
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.seeMyWork}
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className={`group gap-3 px-8 py-6 sm:py-7 font-bold uppercase tracking-wider text-sm sm:text-base hover:bg-primary/5 w-full sm:w-auto text-foreground ${isRTL ? "font-arabic" : ""}`}
              style={{
                borderColor: "hsl(195 100% 35% / 0.6)",
              }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.hero.letsTalk}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? "font-arabic" : ""}`}>{t.hero.projects}</span>
            <div className="w-px h-4 bg-primary/30" />
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? "font-arabic" : ""}`}>{t.hero.experience}</span>
            <div className="w-px h-4 bg-primary/30" />
            <span className={`text-xs sm:text-sm font-bold text-primary tracking-widest uppercase ${isRTL ? "font-arabic" : ""}`}>{t.hero.response}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStatic;
