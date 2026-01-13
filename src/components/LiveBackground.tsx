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
        background: 'hsl(218 55% 12%)',
      }}
    >
      {/* Deep navy layer 1 - very slow drift, bottom heavy */}
      <motion.div
        className="absolute"
        style={{
          width: '150vw',
          height: '120vh',
          bottom: '-40%',
          left: '-25%',
          background: 'radial-gradient(ellipse 80% 60% at 40% 80%, hsl(218 60% 8% / 0.9) 0%, transparent 50%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Deep navy layer 2 - darker drift, top area */}
      <motion.div
        className="absolute"
        style={{
          width: '140vw',
          height: '100vh',
          top: '-30%',
          right: '-30%',
          background: 'radial-gradient(ellipse 70% 50% at 60% 30%, hsl(220 50% 6% / 0.8) 0%, transparent 55%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -50, 25, 0],
          y: [0, 30, -15, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mid-blue aurora layer - subtle color injection */}
      <motion.div
        className="absolute"
        style={{
          width: '120vw',
          height: '100vh',
          top: '0%',
          left: '-10%',
          background: 'radial-gradient(ellipse 60% 80% at 30% 50%, hsl(215 65% 35% / 0.25) 0%, transparent 50%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, 80, 40, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 1.08, 1],
          opacity: [0.6, 1, 0.7, 0.6],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sky blue accent glow - right side */}
      <motion.div
        className="absolute"
        style={{
          width: '80vw',
          height: '80vh',
          top: '10%',
          right: '-10%',
          background: 'radial-gradient(ellipse 50% 70% at 80% 40%, hsl(200 85% 75% / 0.12) 0%, transparent 50%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -60, -30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Moving smoke wisp 1 - horizontal drift */}
      <motion.div
        className="absolute"
        style={{
          width: '60vw',
          height: '40vh',
          top: '20%',
          left: '10%',
          background: 'radial-gradient(ellipse 80% 40% at 50% 50%, hsl(215 50% 25% / 0.5) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 200, 100, 0],
          opacity: [0.3, 0.6, 0.4, 0.3],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Moving smoke wisp 2 - slower counter-drift */}
      <motion.div
        className="absolute"
        style={{
          width: '50vw',
          height: '35vh',
          bottom: '30%',
          right: '5%',
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, hsl(220 45% 18% / 0.6) 0%, transparent 55%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -150, -70, 0],
          opacity: [0.4, 0.7, 0.5, 0.4],
        }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mouse-reactive subtle glow - sky blue */}
      <motion.div
        className="absolute"
        style={{
          width: '40vw',
          height: '40vh',
          background: 'radial-gradient(circle, hsl(207 70% 55% / 0.06) 0%, transparent 50%)',
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

      {/* Heavy vignette - cinematic dark edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 20%, hsl(220 60% 4% / 0.95) 100%)',
        }}
      />
    </div>
  );
};

export default LiveBackground;
