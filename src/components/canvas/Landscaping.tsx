import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface LandscapingProps {
  foliageMat: THREE.Material;
  trunkMat: THREE.Material;
  travertineMat: THREE.Material;
}

export function Landscaping({ foliageMat, trunkMat, travertineMat }: LandscapingProps) {
  // Load the professionally modeled Mediterranean Columnar Cypress GLB
  const { scene: cypressScene } = useGLTF('/models/landscaping/cypress.glb');

  // Load the official Khronos museum-grade architectural botanical plant GLB
  const { scene: plantScene } = useGLTF('/models/landscaping/diffuse_transmission_plant.glb');

  // Configure Left Columnar Cypress with organic scale and rotation
  const leftCypress = useMemo(() => {
    const cloned = cypressScene.clone(true);
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = foliageMat;
      }
    });
    return cloned;
  }, [cypressScene, foliageMat]);

  // Configure Right Columnar Cypress with organic scale variation
  const rightCypress = useMemo(() => {
    const cloned = cypressScene.clone(true);
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = foliageMat;
      }
    });
    return cloned;
  }, [cypressScene, foliageMat]);

  // Configure Curated Architectural Potted Planters
  const leftPlanter = useMemo(() => {
    const cloned = plantScene.clone(true);
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [plantScene]);

  const rightPlanter = useMemo(() => {
    const cloned = plantScene.clone(true);
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [plantScene]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Restrained Mediterranean Italian Cypress (West / Left Flank) */}
      <group position={[-4.5, 0.12, 17.8]} rotation={[0, 0.45, 0]} scale={[1.02, 1.05, 1.02]}>
        <primitive object={leftCypress} />
      </group>

      {/* 2. Restrained Mediterranean Italian Cypress (East / Right Flank) */}
      <group position={[4.5, 0.12, 17.8]} rotation={[0, -0.65, 0]} scale={[0.96, 1.0, 0.96]}>
        <primitive object={rightCypress} />
      </group>

      {/* 3. Museum-Grade Architectural Botanical Planter (West Promenade Edge) */}
      <group position={[-6.2, 0.12, 25.5]} scale={[1.4, 1.4, 1.4]}>
        <primitive object={leftPlanter} />
      </group>

      {/* 4. Museum-Grade Architectural Botanical Planter (East Promenade Edge) */}
      <group position={[6.2, 0.12, 25.5]} scale={[1.4, 1.4, 1.4]}>
        <primitive object={rightPlanter} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/landscaping/cypress.glb');
useGLTF.preload('/models/landscaping/diffuse_transmission_plant.glb');
