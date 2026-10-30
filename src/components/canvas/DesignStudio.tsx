import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function DesignStudio() {
  const designScreenTex = useTexture('/screens/design_screen.jpg');
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);
  const [woodDiffuse, woodNormal, woodRoughness] = useTexture([
    '/textures/wood_diffuse.jpg',
    '/textures/wood_normal.jpg',
    '/textures/wood_roughness.jpg',
  ]);

  useMemo(() => {
    designScreenTex.colorSpace = THREE.SRGBColorSpace;
    designScreenTex.generateMipmaps = true;

    [woodDiffuse, woodNormal, woodRoughness].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 3);
      t.anisotropy = 16;
    });
    woodDiffuse.colorSpace = THREE.SRGBColorSpace;
    woodNormal.colorSpace = THREE.NoColorSpace;
    woodRoughness.colorSpace = THREE.NoColorSpace;

    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 3);
      t.anisotropy = 16;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [designScreenTex, woodDiffuse, woodNormal, woodRoughness, limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const oakBenchMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: woodDiffuse,
      normalMap: woodNormal,
      roughnessMap: woodRoughness,
      normalScale: new THREE.Vector2(0.3, 0.3),
      color: '#D4BC9E',
      roughness: 0.48
    });
  }, [woodDiffuse, woodNormal, woodRoughness]);

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

  const aluminumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#D6D6D6', roughness: 0.28, metalness: 0.88 }), []);
  const darkAlumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#252824', roughness: 0.38, metalness: 0.65 }), []);
  const champagneBronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.25, metalness: 0.85 }), []);

  return (
    <group position={[0, 0, -12.0]}>
      {/* ============================================================ */}
      {/* CHAPTER 04: WING C — THE DESIGN STUDIO (Z = -12.0 to -17.0) */}
      {/* ============================================================ */}

      {/* Studio Limestone Floor */}
      <mesh position={[0, 0.28, -2.5]} receiveShadow>
        <boxGeometry args={[14, 0.2, 9]} />
        <primitive object={limestoneFloorMat} attach="material" />
      </mesh>

      {/* Sweeping Limestone Arch Overhead Vault Ceiling */}
      <group position={[0, 3.4, -2.0]}>
        <mesh rotation={[0, 0, Math.PI]} castShadow receiveShadow>
          <torusGeometry args={[4.4, 0.5, 16, 32, Math.PI]} />
          <primitive object={limestoneFloorMat} attach="material" />
        </mesh>
      </group>

      {/* Studio Rear Wall with Frosted Glass Slits */}
      <mesh position={[0, 2.5, -4.5]} castShadow receiveShadow>
        <boxGeometry args={[13.5, 4.4, 0.4]} />
        <primitive object={limestoneFloorMat} attach="material" />
      </mesh>

      {/* ============================================================ */}
      {/* PROFESSIONAL DESIGN WORKBENCH & HARDWARE (NO PEOPLE) */}
      {/* ============================================================ */}
      <group position={[0, 0.38, -3.2]}>
        {/* Solid Scandinavian Oak Long Workbench */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.08, 1.8]} />
          <primitive object={oakBenchMat} attach="material" />
        </mesh>

        {/* Minimalist Champagne Metal Trestles */}
        <mesh position={[-1.8, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.5]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
        <mesh position={[1.8, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.5]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* Design Artifacts: Color Swatch Fan, Typography Specimen Book, Stylus */}
        <mesh position={[-1.2, 0.50, 0.3]} rotation={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.26, 0.02, 0.36]} />
          <meshStandardMaterial color="#FAF9F6" roughness={0.7} />
        </mesh>
        <mesh position={[-0.8, 0.51, 0.35]} rotation={[0, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.18, 12]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>

        {/* Secondary Display (Left - Design Tokens Explorer) */}
        <group position={[-1.3, 0.82, -0.2]} rotation={[0, 0.25, 0]}>
          <mesh position={[0, -0.18, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.32, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.85, 0.52, 0.03]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
        </group>

        {/* Studio Designer Task Lamp */}
        <group position={[1.6, 0.72, -0.3]}>
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.015, 16]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <mesh position={[-0.1, 0.08, 0]} rotation={[0, 0, 0.35]}>
            <cylinderGeometry args={[0.01, 0.01, 0.45, 12]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
          <mesh position={[-0.24, 0.28, 0]} rotation={[0, 0, -0.8]}>
            <coneGeometry args={[0.06, 0.14, 16]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <pointLight position={[-0.26, 0.24, 0]} color="#FFF4DF" intensity={0.9} distance={3} />
        </group>

        {/* ============================================================ */}
        {/* MAIN 34-INCH CURVED STUDIO MONITOR (The Nested Zoom Target) */}
        {/* Displays the Aurora Design System Figma Canvas at Z = -16.2 in world space */}
        {/* ============================================================ */}
        <group position={[0, 0.82, -0.2]}>
          {/* Aluminum Stand */}
          <mesh position={[0, -0.24, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.015, 20]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.1, -0.04]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.32, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>

          {/* Monitor Shell (Dark Aluminum Back) */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[1.72, 0.88, 0.04]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          {/* Front Bezel */}
          <mesh position={[0, 0.15, 0.022]}>
            <boxGeometry args={[1.70, 0.86, 0.005]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          {/* Ultrawide Display Glass with High-Res Figma Canvas */}
          <mesh position={[0, 0.15, 0.028]}>
            <planeGeometry args={[1.66, 0.82]} />
            <meshBasicMaterial map={designScreenTex} toneMapped={false} />
          </mesh>
          {/* Subtle Ambient Screen Reflection */}
          <pointLight position={[0, 0.15, 0.5]} color="#FAF9F6" intensity={1.5} distance={4} />
        </group>
      </group>
    </group>
  );
}
