import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CapabilitiesLandscapeProps {
  visible: boolean;
}

export function CapabilitiesLandscape({ visible }: CapabilitiesLandscapeProps) {
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#f2ece2',
      roughness: 0.85,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneTrimMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.45, 0.45),
      color: '#ded4c5',
      roughness: 0.88,
      metalness: 0.03
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

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

  const foliageMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#344736',
      roughness: 0.92
    });
  }, []);

  if (!visible) return null;

  return (
    <group position={[0, 0, -8.0]}>
      {/* Central Island Platform with Translucent Glass Geodesic Dome */}
      <group position={[0, 0.4, 0]}>
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderGeometry args={[3.2, 3.6, 0.35, 48]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.35, 0]} receiveShadow>
          <cylinderGeometry args={[2.5, 2.7, 0.2, 48]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>
        {/* Geodesic Dome */}
        <mesh position={[0, 1.45, 0]}>
          <sphereGeometry args={[2.0, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <primitive object={glassDomeMat} attach="material" />
        </mesh>
        {/* Warm Internal Light Glow */}
        <pointLight position={[0, 1.0, 0]} color="#fff6e8" intensity={2.2} distance={10} />
      </group>

      {/* Satellite Pavilions across the Archipelago */}
      {/* 1. Strategy Pavilion (West) */}
      <group position={[-6.2, 0.2, -3.5]}>
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderGeometry args={[2.4, 2.8, 0.35, 36]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.35, 0]} receiveShadow>
          <cylinderGeometry args={[1.5, 1.7, 0.2, 36]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>
        <mesh position={[0.8, 0.8, 0.8]} castShadow>
          <coneGeometry args={[0.35, 1.4, 12]} />
          <primitive object={foliageMat} attach="material" />
        </mesh>
      </group>

      {/* 2. Design Pavilion (Southwest) */}
      <group position={[-4.2, 0.2, 2.8]}>
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderGeometry args={[2.2, 2.5, 0.35, 36]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[-0.7, 0.8, -0.6]} castShadow>
          <coneGeometry args={[0.35, 1.4, 12]} />
          <primitive object={foliageMat} attach="material" />
        </mesh>
      </group>

      {/* 3. Technology Pavilion (East) */}
      <group position={[6.2, 0.2, -3.5]}>
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderGeometry args={[2.4, 2.8, 0.35, 36]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.35, 0]} receiveShadow>
          <cylinderGeometry args={[1.5, 1.7, 0.2, 36]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>
        <mesh position={[-0.8, 0.8, 0.8]} castShadow>
          <coneGeometry args={[0.35, 1.4, 12]} />
          <primitive object={foliageMat} attach="material" />
        </mesh>
      </group>

      {/* 4. Engineering Pavilion (Southeast) */}
      <group position={[4.5, 0.2, 2.8]}>
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderGeometry args={[2.2, 2.5, 0.35, 36]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0.7, 0.8, -0.6]} castShadow>
          <coneGeometry args={[0.35, 1.4, 12]} />
          <primitive object={foliageMat} attach="material" />
        </mesh>
      </group>

      {/* Curved Arched Connecting Stone Bridges */}
      {/* West to Center */}
      <mesh position={[-3.1, 0.38, -1.7]} rotation={[0, 0.48, 0]} receiveShadow>
        <boxGeometry args={[4.0, 0.18, 1.1]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>
      {/* East to Center */}
      <mesh position={[3.1, 0.38, -1.7]} rotation={[0, -0.48, 0]} receiveShadow>
        <boxGeometry args={[4.0, 0.18, 1.1]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>
      {/* SW to Center */}
      <mesh position={[-2.1, 0.36, 1.4]} rotation={[0, -0.62, 0]} receiveShadow>
        <boxGeometry args={[3.0, 0.18, 1.0]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>
      {/* SE to Center */}
      <mesh position={[2.2, 0.36, 1.4]} rotation={[0, 0.62, 0]} receiveShadow>
        <boxGeometry args={[3.0, 0.18, 1.0]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>
    </group>
  );
}
