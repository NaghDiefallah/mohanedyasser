import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 uv = vUv;
    
    // Light source position (top right, influenced by mouse)
    vec2 lightPos = vec2(0.85 + uMouse.x * 0.1, 0.8 + uMouse.y * 0.1);
    
    // Distance from light
    float dist = distance(uv, lightPos);
    
    // Volumetric rays
    float rays = 0.0;
    float angle = atan(uv.y - lightPos.y, uv.x - lightPos.x);
    
    for(float i = 0.0; i < 6.0; i++) {
      float rayAngle = angle + i * 0.5 + uTime * 0.02;
      float rayStrength = sin(rayAngle * 3.0 + uTime * 0.5) * 0.5 + 0.5;
      rays += rayStrength * (1.0 - dist) * 0.12;
    }
    
    // Falloff
    float falloff = 1.0 / (1.0 + dist * 3.5);
    
    // Cyan-blue light colors matching brand
    vec3 cyanLight = vec3(0.0, 0.72, 0.83);
    vec3 deepBlue = vec3(0.1, 0.25, 0.4);
    vec3 lightColor = mix(deepBlue, cyanLight, 0.6);
    
    // Final color
    float intensity = (falloff + rays) * uIntensity;
    vec3 color = lightColor * intensity;
    
    gl_FragColor = vec4(color, intensity * 0.25);
  }
`;

interface VolumetricLightProps {
  mousePosition: { x: number; y: number };
}

const VolumetricLight = ({ mousePosition }: VolumetricLightProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uIntensity: { value: 0.4 },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value.set(
        mousePosition.x * 0.5,
        mousePosition.y * 0.5
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[20, 15]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

export default VolumetricLight;
