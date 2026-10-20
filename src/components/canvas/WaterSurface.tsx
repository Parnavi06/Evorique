import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function WaterSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const waterNormal = useTexture('/textures/water_normal.png');

  // Configure texture wrapping and repeat
  waterNormal.wrapS = THREE.RepeatWrapping;
  waterNormal.wrapT = THREE.RepeatWrapping;
  waterNormal.repeat.set(16, 16);

  useFrame((_, delta) => {
    if (waterNormal) {
      waterNormal.offset.x = (waterNormal.offset.x + delta * 0.015) % 1;
      waterNormal.offset.y = (waterNormal.offset.y + delta * 0.009) % 1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.65, 0]}
      receiveShadow
    >
      <planeGeometry args={[180, 180, 48, 48]} />
      <meshStandardMaterial
        color="#62928c"
        roughness={0.22}
        metalness={0.15}
        normalMap={waterNormal}
        normalScale={new THREE.Vector2(0.2, 0.2)}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}
