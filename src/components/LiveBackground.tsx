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
        background: 'linear-gradient(180deg, hsl(218 55% 12%) 0%, hsl(215 55% 25%) 40%, hsl(207 65% 45%) 70%, hsl(200 80% 70%) 100%)',
      }}
    >
      {/* Deep navy overlay at top for depth */}
      <motion.div
        className="absolute"
        style={{
          width: '150vw',
          height: '60vh',
          top: '-10%',
          left: '-25%',
          background: 'radial-gradient(ellipse 100% 80% at 50% 0%, hsl(218 60% 8% / 0.7) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          scale: [1, 1.05, 1.02, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mid-blue glow band */}
      <motion.div
        className="absolute"
        style={{
          width: '140vw',
          height: '50vh',
          top: '30%',
          left: '-20%',
          background: 'radial-gradient(ellipse 100% 60% at 50% 50%, hsl(210 60% 35% / 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light sky blue glow at bottom */}
      <motion.div
        className="absolute"
        style={{
          width: '120vw',
          height: '50vh',
          bottom: '-10%',
          left: '-10%',
          background: 'radial-gradient(ellipse 80% 70% at 50% 100%, hsl(200 85% 75% / 0.5) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 50, 25, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating light wisps */}
      <motion.div
        className="absolute"
        style={{
          width: '60vw',
          height: '30vh',
          top: '50%',
          left: '20%',
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, hsl(205 70% 55% / 0.3) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -30, 15, 0],
          opacity: [0.4, 0.7, 0.5, 0.4],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle horizontal color band transitions */}
      <motion.div
        className="absolute"
        style={{
          width: '100vw',
          height: '25vh',
          top: '25%',
          left: '0',
          background: 'linear-gradient(180deg, transparent 0%, hsl(212 60% 30% / 0.3) 50%, transparent 100%)',
          filter: 'blur(30px)',
        }}
        animate={{
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mouse-reactive subtle glow */}
      <motion.div
        className="absolute"
        style={{
          width: '40vw',
          height: '40vh',
          background: 'radial-gradient(circle, hsl(205 75% 60% / 0.08) 0%, transparent 50%)',
          filter: 'blur(60px)',
          left: `${mousePosition.x * 100 - 20}%`,
          top: `${mousePosition.y * 100 - 20}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 15,
          damping: 40,
        }}
      />

      {/* Soft vignette - subtle dark edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, hsl(218 55% 8% / 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default LiveBackground;
