import { useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ArchitecturalEnvironmentProps {
  limestoneMat: THREE.Material;
  travertineMat: THREE.Material;
  champagneBronzeMat: THREE.Material;
}

export function ArchitecturalEnvironment({
  travertineMat,
  champagneBronzeMat
}: ArchitecturalEnvironmentProps) {
  // Load the professionally modeled architectural promenade and pool coping GLB
  const { scene } = useGLTF('/models/architecture/promenade.glb');

  // Load the photorealistic master coastal architectural vista
  const markVistaTex = useTexture('/scenes/state_01_the_mark.jpg');

  useMemo(() => {
    if (markVistaTex) {
      markVistaTex.colorSpace = THREE.SRGBColorSpace;
      markVistaTex.anisotropy = 16;
    }
  }, [markVistaTex]);

  // Clone scene and configure stone materials and shadow reception
  const promenadeScene = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.receiveShadow = true;
        child.material = travertineMat;
      }
    });
    return cloned;
  }, [scene, travertineMat]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Architectural Promenade & Steps GLB */}
      <primitive object={promenadeScene} />

      {/* 2. Longitudinal Satin Bronze Inlay Strips along Walkway Axis */}
      {[-3.5, 3.5].map((x, i) => (
        <mesh key={i} position={[x, 0.055, 22.3]}>
          <boxGeometry args={[0.025, 0.015, 14.2]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
      ))}

      {/* 3. Photorealistic Mediterranean Coastal Archipelago Panorama (Framed behind portal) */}
      <group position={[0, 8.5, -6.5]}>
        <mesh>
          <planeGeometry args={[46, 25]} />
          <meshBasicMaterial
            map={markVistaTex}
            transparent
            opacity={0.96}
          />
        </mesh>
      </group>

      {/* 4. Soft Distant Horizon Plinth (Z = -38.0 in warm morning mist) */}
      <group position={[0, 0.8, -38.0]}>
        <mesh receiveShadow>
          <boxGeometry args={[92, 1.6, 2.0]} />
          <meshStandardMaterial color="#E8E3D8" roughness={0.92} />
        </mesh>
        <mesh position={[0, 0.82, 0.95]}>
          <boxGeometry args={[90, 0.03, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/architecture/promenade.glb');
useTexture.preload('/scenes/state_01_the_mark.jpg');
