import { useLanguage } from "@/contexts/LanguageContext";
import ViewportReveal from "./ViewportReveal";
import { Mic, Volume2, AudioWaveform } from "lucide-react";

const VocalEnhance = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <ViewportReveal className="text-center mb-6 md:mb-8 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
              {isRTL ? "معالجة الصوت" : "Audio Processing"}
            </span>
            <div className="h-px w-8 md:w-12 bg-primary" />
          </div>

          <h2
            className={`text-3xl sm:text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight ${isRTL ? 'font-arabic' : ''}`}
          >
            <span className="whitespace-nowrap">{isRTL ? "تحسين" : "VOCAL"}</span>{" "}
            <span className="text-primary whitespace-nowrap">
              {isRTL ? "الأصوات" : "ENHANCE"}
            </span>
          </h2>

          <p className={`text-muted-foreground max-w-md mx-auto text-sm md:text-base ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL
              ? "معالجة صوتية احترافية لجعل كل كلمة واضحة ومؤثرة."
              : "Professional audio processing to make every word clear and impactful."}
          </p>
        </ViewportReveal>

        {/* Audio Features Grid */}


        {/* Audio Waveform Visual */}
        
      </div>
    </section>
  );
};

export default VocalEnhance;