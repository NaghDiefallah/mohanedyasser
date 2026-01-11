import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  // Smooth spring physics for mouse following
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        background: 'hsl(192 35% 22%)',
      }}
    >
      {/* Smoke Layer 1 - Deep charcoal drift, ultra slow */}
      <motion.div
        className="absolute"
        style={{
          width: '150vw',
          height: '120vh',
          top: '-20%',
          left: '-25%',
          background: 'radial-gradient(ellipse 100% 80% at 50% 40%, hsl(200 30% 8% / 0.6) 0%, transparent 50%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.05, 1.02, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Smoke Layer 2 - Teal mist, drifting right */}
      <motion.div
        className="absolute"
        style={{
          width: '120vw',
          height: '100vh',
          top: '-30%',
          right: '-20%',
          background: 'radial-gradient(ellipse 80% 60% at 70% 30%, hsl(192 50% 18% / 0.25) 0%, transparent 55%)',
          filter: 'blur(100px)',
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: [1, 1.08, 1.02, 1],
          rotate: [0, 1, -0.5, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Smoke Layer 3 - Lime green whisper, barely visible */}
      <motion.div
        className="absolute"
        style={{
          width: '100vw',
          height: '80vh',
          top: '15%',
          right: '-5%',
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, hsl(142 70% 45% / 0.06) 0%, transparent 45%)',
          filter: 'blur(130px)',
        }}
        animate={{
          x: [0, 60, 30, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.12, 0.98, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Smoke Layer 4 - Bottom shadow crawl */}
      <motion.div
        className="absolute"
        style={{
          width: '140vw',
          height: '80vh',
          bottom: '-20%',
          left: '-20%',
          background: 'radial-gradient(ellipse 90% 70% at 40% 90%, hsl(200 40% 6% / 0.7) 0%, transparent 50%)',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -30, 10, 0],
          scale: [1, 1.06, 1.03, 1],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Smoke Layer 5 - Mid-left teal accent */}
      <motion.div
        className="absolute"
        style={{
          width: '70vw',
          height: '70vh',
          top: '25%',
          left: '-15%',
          background: 'radial-gradient(ellipse 50% 70% at 25% 50%, hsl(192 60% 22% / 0.15) 0%, transparent 50%)',
          filter: 'blur(110px)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 30, -15, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Smoke Layer 6 - Mouse-reactive subtle glow */}
      <motion.div
        className="absolute"
        style={{
          width: '50vw',
          height: '50vh',
          background: 'radial-gradient(circle, hsl(142 70% 45% / 0.04) 0%, transparent 50%)',
          filter: 'blur(100px)',
          left: `${mousePosition.x * 100 - 25}%`,
          top: `${mousePosition.y * 100 - 25}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 15,
          damping: 40,
        }}
      />

      {/* Smoke Layer 7 - Central ambient pulse */}
      <motion.div
        className="absolute"
        style={{
          width: '100vw',
          height: '100vh',
          top: '0',
          left: '0',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, hsl(195 40% 12% / 0.08) 0%, transparent 55%)',
          filter: 'blur(120px)',
        }}
        animate={{
          scale: [1, 1.2, 1.08, 1],
          opacity: [0.6, 0.9, 0.5, 0.6],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle vignette - darker edges for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(200 60% 2% / 0.8) 100%)',
        }}
      />
    </div>
  );
};

export default LiveBackground;