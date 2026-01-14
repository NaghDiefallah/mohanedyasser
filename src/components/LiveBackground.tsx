import { useRef } from "react";

const LiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        background: '#050505',
      }}
    >
      {/* Subtle gradient overlay at top */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 50% at 50% 0%, hsl(0 0% 8%) 0%, transparent 50%)',
        }}
      />

      {/* Very subtle neon green glow - bottom corner */}
      <div
        className="absolute"
        style={{
          width: '60vw',
          height: '40vh',
          bottom: '-10%',
          right: '-10%',
          background: 'radial-gradient(ellipse 80% 80% at 70% 100%, hsl(142 70% 45% / 0.04) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Subtle top-left accent */}
      <div
        className="absolute"
        style={{
          width: '40vw',
          height: '30vh',
          top: '0',
          left: '0',
          background: 'radial-gradient(ellipse 80% 80% at 0% 0%, hsl(0 0% 15% / 0.5) 0%, transparent 50%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, hsl(0 0% 0% / 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default LiveBackground;
