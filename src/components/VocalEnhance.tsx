import { useLanguage } from "@/contexts/LanguageContext";
import ViewportReveal from "./ViewportReveal";
import { Mic, Volume2, AudioWaveform } from "lucide-react";

const VocalEnhance = () => {
  const { t, isRTL } = useLanguage();

  const features = isRTL
    ? [
        { icon: Mic, title: "تنظيف الصوت", desc: "إزالة الضوضاء والتشويش بالكامل" },
        { icon: AudioWaveform, title: "توازن الترددات", desc: "معالجة EQ احترافية للوضوح" },
        { icon: Volume2, title: "ضغط ديناميكي", desc: "مستوى صوت متسق واحترافي" },
      ]
    : [
        { icon: Mic, title: "Noise Removal", desc: "Crystal clear audio with zero background noise" },
        { icon: AudioWaveform, title: "EQ Balancing", desc: "Professional frequency tuning for clarity" },
        { icon: Volume2, title: "Dynamic Range", desc: "Consistent, broadcast-ready audio levels" },
      ];

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
            <span className="text-primary text-glow whitespace-nowrap">
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
        <ViewportReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="relative group rounded-xl p-6 md:p-8 text-center bg-card border border-border transition-all duration-300 hover:border-primary/40"
                  style={{
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-foreground font-bold text-base md:text-lg mb-2 ${isRTL ? 'font-arabic' : ''}`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-muted-foreground text-xs md:text-sm leading-relaxed ${isRTL ? 'font-arabic' : ''}`}
                  >
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </ViewportReveal>

        {/* Audio Waveform Visual */}
        <ViewportReveal>
          <div className="mt-8 md:mt-12 max-w-3xl mx-auto">
            <div
              className="relative rounded-xl overflow-hidden p-6 md:p-8 bg-card border border-border"
              style={{
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 0 40px hsl(var(--primary) / 0.1), 0 4px 30px -10px hsl(0 0% 0% / 0.3)",
              }}
            >
              {/* Waveform visualization — static bars */}
              <div className="flex items-center justify-center gap-[2px] md:gap-1 h-20 md:h-28">
                {Array.from({ length: 60 }).map((_, i) => {
                  const height = Math.sin((i / 60) * Math.PI * 3) * 0.6 + 0.4;
                  const isCenter = i > 20 && i < 40;
                  return (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: "clamp(2px, 0.8vw, 4px)",
                        height: `${height * 100}%`,
                        background: isCenter
                          ? "hsl(var(--primary))"
                          : "hsl(var(--primary) / 0.3)",
                        boxShadow: isCenter
                          ? "0 0 8px hsl(var(--primary) / 0.5)"
                          : "none",
                      }}
                    />
                  );
                })}
              </div>

              {/* Labels */}
              <div className={`flex justify-between mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider">
                  {isRTL ? "الصوت الخام" : "Raw Audio"}
                </span>
                <span
                  className="text-primary text-[10px] md:text-xs uppercase tracking-wider font-bold"
                  style={{
                    textShadow: "0 0 10px hsl(var(--primary) / 0.4)",
                  }}
                >
                  {isRTL ? "صوت محسّن" : "Enhanced"}
                </span>
              </div>
            </div>
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
};

export default VocalEnhance;