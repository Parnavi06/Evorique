import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function WaterSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const waterNormal = useTexture('/textures/water_normal.jpg');

  useMemo(() => {
    waterNormal.wrapS = THREE.RepeatWrapping;
    waterNormal.wrapT = THREE.RepeatWrapping;
    waterNormal.repeat.set(12, 12);
    waterNormal.anisotropy = 16;
    waterNormal.generateMipmaps = true;
    waterNormal.colorSpace = THREE.NoColorSpace;
  }, [waterNormal]);

  useFrame((_, delta) => {
    if (waterNormal) {
      waterNormal.offset.x = (waterNormal.offset.x + delta * 0.012) % 1;
      waterNormal.offset.y = (waterNormal.offset.y + delta * 0.007) % 1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.65, 0]}
      receiveShadow
    >
      <planeGeometry args={[220, 220, 64, 64]} />
      <meshStandardMaterial
        color="#5a8d88"
        roughness={0.16}
        metalness={0.12}
        normalMap={waterNormal}
        normalScale={new THREE.Vector2(0.18, 0.18)}
        transparent
        opacity={0.94}
      />
    </mesh>
  );
}
