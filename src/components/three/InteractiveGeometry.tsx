import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveGeometryProps {
  mousePosition: { x: number; y: number };
}

// Floating geometric shape component
const FloatingShape = ({ 
  position, 
  geometry, 
  color, 
  mousePosition, 
  rotationSpeed,
  floatSpeed,
  floatAmplitude,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: 'octahedron' | 'icosahedron' | 'tetrahedron' | 'torus' | 'ring';
  color: string;
  mousePosition: { x: number; y: number };
  rotationSpeed: number;
  floatSpeed: number;
  floatAmplitude: number;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => position, [position]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Floating motion
    meshRef.current.position.y = initialPosition[1] + Math.sin(time * floatSpeed) * floatAmplitude;
    meshRef.current.position.x = initialPosition[0] + Math.cos(time * floatSpeed * 0.7) * (floatAmplitude * 0.3);
    
    // Mouse parallax effect
    meshRef.current.position.x += mousePosition.x * 0.3;
    meshRef.current.position.y += mousePosition.y * 0.2;
    
    // Rotation
    meshRef.current.rotation.x += rotationSpeed * 0.5;
    meshRef.current.rotation.y += rotationSpeed;
    meshRef.current.rotation.z += rotationSpeed * 0.3;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'octahedron':
        return <octahedronGeometry args={[0.5 * scale, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.4 * scale, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[0.5 * scale, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.35 * scale, 0.1 * scale, 16, 32]} />;
      case 'ring':
        return <ringGeometry args={[0.3 * scale, 0.5 * scale, 6]} />;
      default:
        return <octahedronGeometry args={[0.5 * scale, 0]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshBasicMaterial 
        color={color}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Glowing orb component
const GlowOrb = ({
  position,
  mousePosition,
  color,
  size = 0.15,
  pulseSpeed = 1,
}: {
  position: [number, number, number];
  mousePosition: { x: number; y: number };
  color: string;
  size?: number;
  pulseSpeed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => position, [position]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Pulsing scale
    const pulse = 1 + Math.sin(time * pulseSpeed) * 0.2;
    meshRef.current.scale.setScalar(pulse);
    
    // Floating
    meshRef.current.position.y = initialPosition[1] + Math.sin(time * 0.8) * 0.3;
    meshRef.current.position.x = initialPosition[0] + Math.cos(time * 0.5) * 0.2;
    
    // Mouse influence
    meshRef.current.position.x += mousePosition.x * 0.5;
    meshRef.current.position.y += mousePosition.y * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial 
        color={color}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Connecting lines between shapes
const ConnectionLines = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions } = useMemo(() => {
    const positions = new Float32Array(60); // 10 lines * 2 points * 3 coords
    
    const points = [
      [-3, 2, -2], [-1, -1, -1],
      [3, 1.5, -1.5], [1, -0.5, -2],
      [-2, -2, -1], [2, 0, -1.5],
      [0, 2.5, -2], [-1.5, 0, -1],
      [2.5, -1.5, -1], [0, 1, -1.5],
    ];
    
    for (let i = 0; i < 10; i++) {
      const fromIdx = i;
      const toIdx = (i + 3) % 10;
      
      positions[i * 6] = points[fromIdx][0];
      positions[i * 6 + 1] = points[fromIdx][1];
      positions[i * 6 + 2] = points[fromIdx][2];
      positions[i * 6 + 3] = points[toIdx][0];
      positions[i * 6 + 4] = points[toIdx][1];
      positions[i * 6 + 5] = points[toIdx][2];
    }
    
    return { positions };
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    
    // Subtle rotation based on mouse
    linesRef.current.rotation.z = mousePosition.x * 0.05;
    linesRef.current.rotation.x = mousePosition.y * 0.03;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={20}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color="#00b8d4" 
        transparent 
        opacity={0.15}
      />
    </lineSegments>
  );
};

const InteractiveGeometry = ({ mousePosition }: InteractiveGeometryProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Subtle overall rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Main geometric shapes - cyan wireframes */}
      <FloatingShape
        position={[-3.5, 1.5, -2]}
        geometry="octahedron"
        color="#00b8d4"
        mousePosition={mousePosition}
        rotationSpeed={0.003}
        floatSpeed={0.5}
        floatAmplitude={0.4}
        scale={1.2}
      />
      
      <FloatingShape
        position={[3.5, -0.5, -1.5]}
        geometry="icosahedron"
        color="#00b8d4"
        mousePosition={mousePosition}
        rotationSpeed={0.004}
        floatSpeed={0.6}
        floatAmplitude={0.35}
        scale={1}
      />
      
      <FloatingShape
        position={[-2, -2, -1]}
        geometry="tetrahedron"
        color="#0099b8"
        mousePosition={mousePosition}
        rotationSpeed={0.005}
        floatSpeed={0.4}
        floatAmplitude={0.3}
        scale={0.8}
      />
      
      <FloatingShape
        position={[2.5, 2, -2.5]}
        geometry="torus"
        color="#00d4ff"
        mousePosition={mousePosition}
        rotationSpeed={0.002}
        floatSpeed={0.7}
        floatAmplitude={0.5}
        scale={1.5}
      />
      
      <FloatingShape
        position={[0, -2.5, -1.8]}
        geometry="ring"
        color="#00b8d4"
        mousePosition={mousePosition}
        rotationSpeed={0.006}
        floatSpeed={0.55}
        floatAmplitude={0.25}
        scale={1.3}
      />
      
      {/* Secondary shapes - smaller, more subtle */}
      <FloatingShape
        position={[-4.5, -1, -3]}
        geometry="octahedron"
        color="#006680"
        mousePosition={mousePosition}
        rotationSpeed={0.002}
        floatSpeed={0.3}
        floatAmplitude={0.2}
        scale={0.5}
      />
      
      <FloatingShape
        position={[4, 2.5, -2.8]}
        geometry="icosahedron"
        color="#006680"
        mousePosition={mousePosition}
        rotationSpeed={0.003}
        floatSpeed={0.45}
        floatAmplitude={0.3}
        scale={0.6}
      />
      
      {/* Glowing orbs - accent points */}
      <GlowOrb
        position={[-1.5, 1, -1]}
        mousePosition={mousePosition}
        color="#00d4ff"
        size={0.08}
        pulseSpeed={1.2}
      />
      
      <GlowOrb
        position={[1.5, -1, -1.2]}
        mousePosition={mousePosition}
        color="#00b8d4"
        size={0.1}
        pulseSpeed={0.8}
      />
      
      <GlowOrb
        position={[0, 2, -1.5]}
        mousePosition={mousePosition}
        color="#00d4ff"
        size={0.06}
        pulseSpeed={1.5}
      />
      
      <GlowOrb
        position={[-3, 0, -2]}
        mousePosition={mousePosition}
        color="#0099b8"
        size={0.07}
        pulseSpeed={1}
      />
      
      <GlowOrb
        position={[3, 0.5, -1.8]}
        mousePosition={mousePosition}
        color="#00d4ff"
        size={0.09}
        pulseSpeed={0.9}
      />
      
      {/* Connection lines */}
      <ConnectionLines mousePosition={mousePosition} />
    </group>
  );
};

export default InteractiveGeometry;
