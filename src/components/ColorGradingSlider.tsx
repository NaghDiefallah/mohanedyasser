import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ViewportReveal from "./ViewportReveal";
import beforeImage from "@/assets/color-grading-before.png";
import afterImage from "@/assets/color-grading-after.png";

const ColorGradingSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalEnd = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalEnd);
    window.addEventListener("touchend", handleGlobalEnd);
    return () => {
      window.removeEventListener("mouseup", handleGlobalEnd);
      window.removeEventListener("touchend", handleGlobalEnd);
    };
  }, []);

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <ViewportReveal className="text-center mb-6 md:mb-8 space-y-3 md:space-y-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-8 md:w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
              {t.colorGrading?.label || "Color Correction"}
            </span>
            <div className="h-px w-8 md:w-12 bg-primary" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="whitespace-nowrap">{t.colorGrading?.title || "COLOR"}</span>{" "}
            <motion.span 
              className="text-primary whitespace-nowrap"
              initial={{ textShadow: "0 0 0px hsl(195 100% 50% / 0)" }}
              whileInView={{ 
                textShadow: [
                  "0 0 0px hsl(195 100% 50% / 0)",
                  "0 0 40px hsl(195 100% 50% / 0.6)",
                  "0 0 20px hsl(195 100% 50% / 0.4)"
                ]
              }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t.colorGrading?.titleHighlight || "GRADING"}
            </motion.span>
          </motion.h2>
          
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            {t.colorGrading?.description || "Drag the slider to see the before and after transformation."}
          </p>
        </ViewportReveal>

        {/* Before/After Slider - Touch optimized, RTL-safe */}
        <ViewportReveal delay={0.2}>
          <div
            ref={containerRef}
            className="relative aspect-[9/16] sm:aspect-[4/5] md:aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden cursor-ew-resize select-none touch-none"
            dir="ltr"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{
              boxShadow: '0 0 40px hsl(195 100% 50% / 0.15), 0 4px 30px -10px hsl(0 0% 0% / 0.5)',
            }}
          >
            {/* After Image (Full width, behind) */}
            <img
              src={afterImage}
              alt={isRTL ? "بعد" : "After"}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={beforeImage}
                alt={isRTL ? "قبل" : "Before"}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
                  maxWidth: 'none',
                }}
                draggable={false}
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div
                className="w-0.5 md:w-1 h-full mx-auto"
                style={{
                  background: '#00a8e8',
                  boxShadow: '0 0 10px #00a8e8, 0 0 20px #00a8e8, 0 0 30px hsl(195 100% 50% / 0.5)',
                }}
              />

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00a8e8 0%, #0077b6 100%)',
                  boxShadow: '0 0 20px #00a8e8, 0 0 40px hsl(195 100% 50% / 0.5)',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-1">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="white">
                    <path d="M6 0L0 6L6 12V0Z" />
                  </svg>
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="white">
                    <path d="M2 0L8 6L2 12V0Z" />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Dynamic Label - always top-right, text changes based on slider */}
            <motion.div
              className="absolute top-3 md:top-4 right-3 md:right-4 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider"
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
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
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
            </motion.div>
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
};

export default ColorGradingSlider;
