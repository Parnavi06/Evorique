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
    waterNormal.repeat.set(14, 14);
    waterNormal.anisotropy = 16;
    waterNormal.generateMipmaps = true;
    waterNormal.colorSpace = THREE.NoColorSpace;
  }, [waterNormal]);

  useFrame((_, delta) => {
    if (waterNormal) {
      waterNormal.offset.x = (waterNormal.offset.x + delta * 0.014) % 1;
      waterNormal.offset.y = (waterNormal.offset.y + delta * 0.008) % 1;
    }
  });

  return (
    <group position={[0, -0.62, 0]}>
      {/* Primary Calm Turquoise Water Surface */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[260, 260, 64, 64]} />
        <meshStandardMaterial
          color="#528882"
          roughness={0.14}
          metalness={0.15}
          normalMap={waterNormal}
          normalScale={new THREE.Vector2(0.22, 0.22)}
          transparent
          opacity={0.94}
        />
      </mesh>

      {/* Subsurface Water Depth Layer for Deep Light Absorption */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[260, 260]} />
        <meshBasicMaterial color="#3b6b66" />
      </mesh>
    </group>
  );
}
