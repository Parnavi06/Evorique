import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface PortalModelProps {
  limestoneMat: THREE.Material;
  travertineMat: THREE.Material;
  champagneBronzeMat: THREE.Material;
}

export function PortalModel({ limestoneMat, travertineMat, champagneBronzeMat }: PortalModelProps) {
  const innerRingRef = useRef<THREE.Group>(null);

  // Load the professionally modeled architectural portal GLB
  const { scene } = useGLTF('/models/portal/portal.glb');

  // Clone scene and assign PBR stone materials with shadows
  const portalScene = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.name.includes('Pedestal')) {
          child.material = travertineMat;
        } else {
          child.material = limestoneMat;
        }
      }
    });
    return cloned;
  }, [scene, limestoneMat, travertineMat]);

  // Subtle rotation of inner celestial bronze ring
  useFrame((_, delta) => {
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Architectural Portal GLB Model (Centered at X=0, Y=2.8, Z=14.0) */}
      <primitive object={portalScene} />

      {/* 2. Concentric Precision Bronze Reveal Ring (recessed inside the stone profile) */}
      <mesh position={[0, 2.8, 14.12]}>
        <torusGeometry args={[2.02, 0.035, 20, 56]} />
        <primitive object={champagneBronzeMat} attach="material" />
      </mesh>

      {/* 3. Suspended Rotating Inner Celestial Ring */}
      <group ref={innerRingRef} position={[0, 2.8, 14.0]}>
        <mesh>
          <torusGeometry args={[1.72, 0.022, 16, 48]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
        {/* Minimal Sculptural Axis Ticks */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, idx) => (
          <mesh key={idx} rotation={[0, 0, rot]} position={[0, 0, 0]}>
            <boxGeometry args={[0.035, 0.22, 0.035]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* 4. Receding Depth Architrave (Z = 12.8, frames transition into Selected Work) */}
      <mesh position={[0, 2.8, 12.8]} castShadow receiveShadow>
        <torusGeometry args={[2.1, 0.30, 24, 48]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* 5. Warm Golden Aperture Spill Light */}
      <pointLight position={[0, 2.8, 13.4]} color="#FFF3DD" intensity={2.2} distance={9} />
    </group>
  );
}

useGLTF.preload('/models/portal/portal.glb');
