import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ReflectingPoolProps {
  waterMat: THREE.Material;
  waterNormal: THREE.Texture;
}

export function ReflectingPool({ waterNormal }: ReflectingPoolProps) {
  const leftWaterRef = useRef<THREE.Mesh>(null);
  const rightWaterRef = useRef<THREE.Mesh>(null);

  const normalScale = useMemo(() => new THREE.Vector2(0.06, 0.06), []);

  // Subtle natural water ripple movement
  useFrame((_, delta) => {
    if (waterNormal) {
      waterNormal.offset.x = (waterNormal.offset.x + delta * 0.005) % 1;
      waterNormal.offset.y = (waterNormal.offset.y + delta * 0.003) % 1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* West Reflecting Pool Surface with Real-Time Planar Reflections */}
      <mesh
        ref={leftWaterRef}
        position={[-8.5, 0.08, 22.0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.8, 13.4]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mirror={0.65}
          mixBlur={0.8}
          mixStrength={1.5}
          roughness={0.05}
          metalness={0.28}
          color="#1F3432"
          normalMap={waterNormal}
          normalScale={normalScale}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          depthScale={1.2}
        />
      </mesh>

      {/* East Reflecting Pool Surface with Real-Time Planar Reflections */}
      <mesh
        ref={rightWaterRef}
        position={[8.5, 0.08, 22.0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.8, 13.4]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mirror={0.65}
          mixBlur={0.8}
          mixStrength={1.5}
          roughness={0.05}
          metalness={0.28}
          color="#1F3432"
          normalMap={waterNormal}
          normalScale={normalScale}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          depthScale={1.2}
        />
      </mesh>
    </group>
  );
}
