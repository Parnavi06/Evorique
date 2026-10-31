import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ReflectingPoolProps {
  waterMat: THREE.Material;
  waterNormal: THREE.Texture;
}

export function ReflectingPool({ waterMat, waterNormal }: ReflectingPoolProps) {
  const leftWaterRef = useRef<THREE.Mesh>(null);
  const rightWaterRef = useRef<THREE.Mesh>(null);

  // Subtle natural water surface tension motion
  useFrame((_, delta) => {
    if (waterNormal) {
      waterNormal.offset.x = (waterNormal.offset.x + delta * 0.006) % 1;
      waterNormal.offset.y = (waterNormal.offset.y + delta * 0.004) % 1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* West Reflecting Pool Surface (Left of Promenade) */}
      <mesh
        ref={leftWaterRef}
        position={[-8.5, 0.08, 22.0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.8, 13.4]} />
        <primitive object={waterMat} attach="material" />
      </mesh>

      {/* East Reflecting Pool Surface (Right of Promenade) */}
      <mesh
        ref={rightWaterRef}
        position={[8.5, 0.08, 22.0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.8, 13.4]} />
        <primitive object={waterMat} attach="material" />
      </mesh>
    </group>
  );
}
