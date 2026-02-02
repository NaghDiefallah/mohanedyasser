import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import FilmGrainShader from './FilmGrainShader';
import VolumetricLight from './VolumetricLight';
import DepthParticles from './DepthParticles';
import InteractiveGeometry from './InteractiveGeometry';

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
          <color attach="background" args={['#030508']} />
          
          {/* Ambient depth */}
          <ambientLight intensity={0.15} />
          
          {/* Key light - cyan tint */}
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#00b8d4" />
          
          {/* Fill light - deep blue */}
          <pointLight position={[-5, -2, 3]} intensity={0.2} color="#1a365d" />
          
          {/* Interactive 3D geometric shapes */}
          <InteractiveGeometry mousePosition={mousePosition} />
          
          {/* Volumetric light rays */}
          <VolumetricLight mousePosition={mousePosition} />
          
          {/* Floating dust particles */}
          <DepthParticles mousePosition={mousePosition} />
          
          {/* Film grain overlay */}
          <FilmGrainShader />
        </Suspense>
      </Canvas>
      
      {/* CSS gradient overlay - black gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 50%,
              rgba(8,15,20,0.3) 0%,
              rgba(3,5,8,0.7) 60%,
              rgba(0,0,0,0.95) 100%
            )
          `,
        }}
      />
    </div>
  );
};

export default CinematicScene;
