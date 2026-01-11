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
      {/* Aurora Layer 1 - Large teal blob, top-right */}
      <motion.div
        className="absolute"
        style={{
          width: '120vw',
          height: '100vh',
          top: '-30%',
          right: '-20%',
          background: 'radial-gradient(ellipse 80% 50% at 70% 30%, hsl(192 70% 25% / 0.12) 0%, transparent 60%)',
          filter: 'blur(100px)',
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: [1, 1.08, 1.02, 1],
          rotate: [0, 2, -1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 2 - Lime green glow, center-right, moves slower */}
      <motion.div
        className="absolute"
        style={{
          width: '80vw',
          height: '80vh',
          top: '10%',
          right: '0%',
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, hsl(142 70% 45% / 0.1) 0%, transparent 50%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 3 - Deep teal smoke, bottom-left */}
      <motion.div
        className="absolute"
        style={{
          width: '100vw',
          height: '70vh',
          bottom: '-10%',
          left: '-20%',
          background: 'radial-gradient(ellipse 70% 60% at 30% 80%, hsl(192 60% 20% / 0.15) 0%, transparent 55%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 20, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 4 - Subtle lime accent, mid-left */}
      <motion.div
        className="absolute"
        style={{
          width: '60vw',
          height: '60vh',
          top: '30%',
          left: '-10%',
          background: 'radial-gradient(ellipse 50% 70% at 20% 50%, hsl(142 70% 45% / 0.08) 0%, transparent 50%)',
          filter: 'blur(110px)',
        }}
        animate={{
          x: [0, 60, -20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 5 - Mouse-reactive glow */}
      <motion.div
        className="absolute"
        style={{
          width: '50vw',
          height: '50vh',
          background: 'radial-gradient(circle, hsl(142 70% 45% / 0.06) 0%, transparent 50%)',
          filter: 'blur(80px)',
          left: `${mousePosition.x * 100 - 25}%`,
          top: `${mousePosition.y * 100 - 25}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 20,
          damping: 30,
        }}
      />

      {/* Aurora Layer 6 - Slow morphing central glow */}
      <motion.div
        className="absolute"
        style={{
          width: '100vw',
          height: '100vh',
          top: '0',
          left: '0',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, hsl(195 50% 15% / 0.1) 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
        animate={{
          scale: [1, 1.3, 1.1, 1],
          opacity: [0.8, 1, 0.7, 0.8],
        }}
        transition={{
          duration: 30,
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