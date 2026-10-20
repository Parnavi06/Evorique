import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CapabilitiesLandscapeProps {
  visible: boolean;
}

export function CapabilitiesLandscape({ visible }: CapabilitiesLandscapeProps) {
  const capabilitiesPlate = useTexture('/scenes/state_06_capabilities.jpg');

  const glassDomeMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#eef6f5',
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
      thickness: 0.4
    });
  }, []);

  if (!visible) return null;

  return (
    <group position={[0, 0, -8.0]}>
      {/* High-Fidelity Aerial Campus Archipelago Backdrop (State 06) */}
      <mesh position={[0, 3.5, -4.5]}>
        <planeGeometry args={[26, 17]} />
        <meshBasicMaterial map={capabilitiesPlate} toneMapped={false} />
      </mesh>

      {/* Central Translucent Glass Geodesic Dome Pavilion */}
      <group position={[0, 1.2, 0]}>
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[1.8, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <primitive object={glassDomeMat} attach="material" />
        </mesh>
        {/* Soft Warm Internal Glow */}
        <pointLight position={[0, 0.8, 0]} color="#fff6e8" intensity={1.8} distance={8} />
      </group>
    </group>
  );
}
