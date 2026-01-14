import { motion } from "framer-motion";

const PerspectiveGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floor grid - perspective moving towards user */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: '500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <motion.div
          className="absolute w-[200%] h-[200%] left-[-50%] top-[40%]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg)',
            backgroundImage: `
              linear-gradient(to right, hsl(0 0% 20% / 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(0 0% 20% / 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 60px'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Ceiling grid - optional subtle effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          perspective: '500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <motion.div
          className="absolute w-[200%] h-[100%] left-[-50%] bottom-[60%]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-60deg)',
            backgroundImage: `
              linear-gradient(to right, hsl(0 0% 20% / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(0 0% 20% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px -60px'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
};

export default PerspectiveGrid;
