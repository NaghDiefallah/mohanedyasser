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

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <ViewportReveal className="text-center mb-8 space-y-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold">
              {t.colorGrading?.label || "Color Correction"}
            </span>
            <div className="h-px w-12 bg-primary" />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.colorGrading?.title || "COLOR"}{" "}
            <motion.span 
              className="text-primary"
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
          
          <p className="text-muted-foreground max-w-md mx-auto">
            {t.colorGrading?.description || "Drag the slider to see the before and after transformation."}
          </p>
        </ViewportReveal>

        {/* Before/After Slider */}
        <ViewportReveal delay={0.2}>
          <div
            ref={containerRef}
            className="relative aspect-[9/16] md:aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden cursor-ew-resize select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseDown}
            onTouchMove={handleTouchMove}
            style={{
              boxShadow: '0 0 60px hsl(195 100% 50% / 0.15), 0 4px 40px -10px hsl(0 0% 0% / 0.5)',
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
              style={{ 
                width: `${sliderPosition}%`,
              }}
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
              {/* Neon Blue Line */}
              <div 
                className="w-0.5 h-full"
                style={{
                  background: '#00a8e8',
                  boxShadow: '0 0 10px #00a8e8, 0 0 20px #00a8e8, 0 0 30px hsl(195 100% 50% / 0.5)',
                }}
              />
              
              {/* Glowing Circle Handle */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00a8e8 0%, #0077b6 100%)',
                  boxShadow: '0 0 20px #00a8e8, 0 0 40px hsl(195 100% 50% / 0.5)',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Arrows */}
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

            {/* Before Label */}
            <motion.div
              className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider`}
              style={{
                background: 'hsl(0 0% 0% / 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid hsl(0 0% 100% / 0.1)',
              }}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-white/80">{t.colorGrading?.before || "BEFORE"}</span>
            </motion.div>

            {/* After Label */}
            <motion.div
              className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider`}
              style={{
                background: 'hsl(195 100% 50% / 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid hsl(195 100% 50% / 0.3)',
              }}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-primary">{t.colorGrading?.after || "AFTER"}</span>
            </motion.div>
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
};

export default ColorGradingSlider;
