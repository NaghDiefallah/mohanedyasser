import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread particles in a wide ellipsoid shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.5; // x - wider
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8; // y - shorter
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.5 - 2; // z - depth

      scales[i] = Math.random() * 0.5 + 0.2;
    }

    return [positions, scales];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;

    // Subtle floating animation
    const positionsArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positionsArray[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#86efac"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const GlowOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = time * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Primary glow orb */}
      <mesh position={[2, 0.5, -3]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Secondary orb */}
      <mesh position={[-2.5, -0.5, -4]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color="#4ade80"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Accent orb */}
      <mesh position={[0, 1.5, -5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#166534"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const ParticleField = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
        <GlowOrbs />
      </Canvas>
    </div>
  );
};

export default ParticleField;
