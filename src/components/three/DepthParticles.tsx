import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DepthParticlesProps {
  mousePosition: { x: number; y: number };
}

const DepthParticles = ({ mousePosition }: DepthParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 150;

  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a wide area
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      // Slow, random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002 + 0.001;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

      // Variable sizes
      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, velocities, sizes };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positionsArray = positionAttribute.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      // Update positions with velocity
      positionsArray[i * 3] += velocities[i * 3];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Mouse influence
      positionsArray[i * 3] += mousePosition.x * 0.0005;
      positionsArray[i * 3 + 1] += mousePosition.y * 0.0005;

      // Wrap around boundaries
      if (positionsArray[i * 3 + 1] > 8) {
        positionsArray[i * 3 + 1] = -8;
        positionsArray[i * 3] = (Math.random() - 0.5) * 20;
      }
      if (positionsArray[i * 3] > 10) positionsArray[i * 3] = -10;
      if (positionsArray[i * 3] < -10) positionsArray[i * 3] = 10;
    }

    positionAttribute.needsUpdate = true;

    // Subtle rotation
    pointsRef.current.rotation.y += 0.0001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DepthParticles;
