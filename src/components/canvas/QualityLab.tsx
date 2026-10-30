import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function QualityLab() {
  const qaScreenTex = useTexture('/screens/qa_screen.jpg');
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    qaScreenTex.colorSpace = THREE.SRGBColorSpace;
    qaScreenTex.generateMipmaps = true;

    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 3);
      t.anisotropy = 16;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [qaScreenTex, limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneFloorMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.3, 0.3),
      color: '#F4F1E9',
      roughness: 0.8
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const aluminumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#D8D8D8', roughness: 0.28, metalness: 0.88 }), []);
  const darkAlumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#252824', roughness: 0.35, metalness: 0.7 }), []);
  const champagneBronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.25, metalness: 0.85 }), []);

  return (
    <group position={[0, 0, -25.0]}>
      {/* ============================================================ */}
      {/* CHAPTER 06: WING E — THE QUALITY LAB (Z = -25.0 to -32.0) */}
      {/* ============================================================ */}

      {/* Lab Floor */}
      <mesh position={[0, 0.28, -3.2]} receiveShadow>
        <boxGeometry args={[14, 0.2, 9]} />
        <primitive object={limestoneFloorMat} attach="material" />
      </mesh>

      {/* Clean White Ceiling Rig with Diffuse Area Lighting */}
      <mesh position={[0, 3.6, -3.2]}>
        <boxGeometry args={[12, 0.1, 7]} />
        <meshStandardMaterial color="#FAF9F6" roughness={0.9} />
      </mesh>
      <pointLight position={[0, 3.3, -3.2]} color="#FAF9F6" intensity={1.6} distance={8} />

      {/* ============================================================ */}
      {/* MULTI-DEVICE RESPONSIVE TESTING RIG BENCH (NO PEOPLE) */}
      {/* ============================================================ */}
      <group position={[0, 0.38, -5.2]}>
        {/* Lab Test Bench Surface */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.08, 1.8]} />
          <meshStandardMaterial color="#FAF9F6" roughness={0.6} />
        </mesh>
        <mesh position={[-1.9, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.5]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
        <mesh position={[1.9, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.5]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* Physical Device Array on Test Bench (Left Side) */}
        {/* 1. Testing Laptop */}
        <group position={[-1.3, 0.49, 0.3]}>
          <mesh position={[0, 0.008, 0.08]} castShadow>
            <boxGeometry args={[0.42, 0.012, 0.28]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.14, -0.06]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.42, 0.26, 0.01]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
        </group>

        {/* 2. Testing Tablet on Angled Stand */}
        <group position={[-0.65, 0.58, 0.35]} rotation={[-0.25, 0, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.26, 0.36, 0.01]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
        </group>

        {/* 3. Testing Smartphones on Dual Aluminium Docks */}
        <group position={[0.65, 0.55, 0.4]} rotation={[-0.28, 0, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.12, 0.24, 0.01]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
        </group>
        <group position={[1.05, 0.55, 0.4]} rotation={[-0.28, 0, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.12, 0.24, 0.01]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
        </group>

        {/* ============================================================ */}
        {/* CENTRAL RELEASE APPROVAL WALL DASHBOARD (The Nested Zoom Target) */}
        {/* Displays the automated test verification & green approval at Z = -31.5 */}
        {/* ============================================================ */}
        <group position={[0, 0.88, -0.2]}>
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.015, 20]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.1, -0.04]}>
            <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>

          {/* Large Validation Screen */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[1.82, 1.02, 0.04]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.15, 0.024]}>
            <planeGeometry args={[1.76, 0.96]} />
            <meshBasicMaterial map={qaScreenTex} toneMapped={false} />
          </mesh>
          {/* Green Verification Aura */}
          <pointLight position={[0, 0.15, 0.5]} color="#27C93F" intensity={1.5} distance={4} />
        </group>
      </group>
    </group>
  );
}
