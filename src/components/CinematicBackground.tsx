import { motion } from "framer-motion";

const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden studio-depth">
      {/* Base gradient with depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 70% 20%, hsl(220 15% 10% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 80% 80% at 30% 90%, hsl(20 15% 8% / 0.4) 0%, transparent 40%),
            radial-gradient(ellipse 60% 40% at 50% 100%, hsl(0 0% 7% / 0.6) 0%, transparent 50%),
            hsl(0 0% 5%)
          `,
        }}
      />

      {/* Volumetric light beams - subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/4 right-0 w-1/2 h-[150%] opacity-[0.03]"
          style={{
            background: `
              conic-gradient(
                from 160deg at 100% 30%,
                transparent 0deg,
                hsl(40 40% 85%) 15deg,
                transparent 35deg,
                transparent 50deg,
                hsl(40 30% 80%) 65deg,
                transparent 85deg,
                transparent 100deg
              )
            `,
            transformOrigin: '100% 30%',
          }}
          animate={{
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Subtle warm accent in corner */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-1/3"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, hsl(35 50% 50% / 0.04) 0%, transparent 60%)',
        }}
      />

      {/* Film grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Heavy vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 75% 55% at 50% 50%,
              transparent 20%,
              hsl(0 0% 3% / 0.5) 70%,
              hsl(0 0% 2% / 0.9) 100%
            )
          `,
        }}
      />

      {/* Top edge darkening */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(0 0% 3% / 0.6) 0%, transparent 100%)',
        }}
      />

      {/* Bottom edge darkening */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(0 0% 3% / 0.6) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default CinematicBackground;
