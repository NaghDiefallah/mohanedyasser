import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import FilmGrainShader from './FilmGrainShader';
import VolumetricLight from './VolumetricLight';
import DepthParticles from './DepthParticles';

const CinematicScene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Deep background color */}
          <color attach="background" args={['#0a0a0a']} />
          
          {/* Ambient depth */}
          <ambientLight intensity={0.1} />
          
          {/* Key light - warm */}
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffaa66" />
          
          {/* Fill light - cool */}
          <pointLight position={[-5, -2, 3]} intensity={0.1} color="#6688ff" />
          
          {/* Volumetric light rays */}
          <VolumetricLight mousePosition={mousePosition} />
          
          {/* Floating dust particles */}
          <DepthParticles mousePosition={mousePosition} />
          
          {/* Film grain overlay */}
          <FilmGrainShader />
        </Suspense>
      </Canvas>
      
      {/* CSS vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 50% at 50% 50%,
              transparent 0%,
              rgba(0,0,0,0.3) 60%,
              rgba(0,0,0,0.8) 100%
            )
          `,
        }}
      />
    </div>
  );
};

export default CinematicScene;
