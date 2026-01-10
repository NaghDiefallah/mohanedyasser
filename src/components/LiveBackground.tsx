import { motion } from "framer-motion";

const LiveBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep radial gradient background - teal center fading to near black */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, hsl(192 45% 18%) 0%, hsl(192 50% 8%) 50%, hsl(200 60% 4%) 100%)',
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(142 70% 45%) 0%, transparent 70%)',
          top: '-10%',
          right: '-5%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(192 60% 40%) 0%, transparent 70%)',
          bottom: '10%',
          left: '-10%',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(142 70% 45%) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(142 70% 45% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(142 70% 45% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 100% / 0.1) 2px, hsl(0 0% 100% / 0.1) 4px)',
        }}
        animate={{
          y: [0, 4],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Strong vignette overlay - darker edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, hsl(200 60% 4% / 0.7) 80%, hsl(200 60% 2%) 100%)',
        }}
      />
    </div>
  );
};

export default LiveBackground;
