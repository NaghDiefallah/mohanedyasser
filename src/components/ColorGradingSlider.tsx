import { useState, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ViewportReveal from "./ViewportReveal";
import beforeImage from "@/assets/color-grading-before.png";
import afterImage from "@/assets/color-grading-after.png";

const ColorGradingSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();

  const getPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(Math.max((x / rect.width) * 100, 0), 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const pos = getPosition(e.clientX);
    if (pos !== null) setSliderPosition(pos);
  }, [getPosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const pos = getPosition(e.clientX);
    if (pos !== null) setSliderPosition(pos);
  }, [isDragging, getPosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <ViewportReveal className="text-center mb-6 md:mb-8 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
              {t.colorGrading?.label || "Color Correction"}
            </span>
            <div className="h-px w-8 md:w-12 bg-primary" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight">
            <span className="whitespace-nowrap">{t.colorGrading?.title || "COLOR"}</span>{" "}
            <span className="text-primary text-glow whitespace-nowrap">
              {t.colorGrading?.titleHighlight || "GRADING"}
            </span>
          </h2>
          
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            {t.colorGrading?.description || "Drag the slider to see the before and after transformation."}
          </p>
        </ViewportReveal>

        {/* Before/After Slider */}
        <ViewportReveal>
          <div
            ref={containerRef}
            className="relative aspect-[9/16] sm:aspect-[4/5] md:aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden select-none touch-none"
            dir="ltr"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              boxShadow: '0 0 40px hsl(195 100% 50% / 0.15), 0 4px 30px -10px hsl(0 0% 0% / 0.5)',
              cursor: 'ew-resize',
            }}
          >
            {/* After Image */}
            <img
              src={afterImage}
              alt={isRTL ? "بعد" : "After"}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
            />

            {/* Before Image — clipped */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={beforeImage}
                alt={isRTL ? "قبل" : "Before"}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Slider Line + Handle */}
            <div
              className="absolute top-0 bottom-0 z-10 pointer-events-none"
              style={{
                left: `${sliderPosition}%`,
                transform: 'translateX(-50%)',
                width: '4px',
              }}
            >
              {/* Vertical neon line */}
              <div
                className="absolute inset-0 w-[2px] md:w-[3px] mx-auto"
                style={{
                  background: '#00a8e8',
                  boxShadow: '0 0 10px #00a8e8, 0 0 20px #00a8e8, 0 0 30px hsl(195 100% 50% / 0.5)',
                }}
              />

              {/* Circular handle */}
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '44px',
                  height: '44px',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00a8e8 0%, #0077b6 100%)',
                  boxShadow: '0 0 20px #00a8e8, 0 0 40px hsl(195 100% 50% / 0.5)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="white">
                    <path d="M6 0L0 6L6 12V0Z" />
                  </svg>
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="white">
                    <path d="M2 0L8 6L2 12V0Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Dynamic Label */}
            <div
              className="absolute top-3 md:top-4 right-3 md:right-4 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider pointer-events-none"
              style={{
                background: sliderPosition > 50
                  ? 'hsl(195 100% 50% / 0.2)'
                  : 'hsl(0 0% 0% / 0.6)',
                backdropFilter: 'blur(10px)',
                border: sliderPosition > 50
                  ? '1px solid hsl(195 100% 50% / 0.3)'
                  : '1px solid hsl(0 0% 100% / 0.1)',
                transition: 'background 0.3s ease, border 0.3s ease',
              }}
            >
              <span
                className={sliderPosition > 50 ? 'text-primary' : 'text-white/80'}
                style={{ transition: 'color 0.3s ease' }}
              >
                {sliderPosition > 50
                  ? (t.colorGrading?.after || "AFTER")
                  : (t.colorGrading?.before || "BEFORE")
                }
              </span>
            </div>
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
};

export default ColorGradingSlider;