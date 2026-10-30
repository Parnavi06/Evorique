import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function HeadquartersCampus() {
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 6);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Primary Limestone Material (#F4F1E9 base tone)
  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#F4F1E9',
      roughness: 0.82,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Darker Travertine Trim Material (#E8E7E0 tone)
  const travertineMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.45, 0.45),
      color: '#E8E7E0',
      roughness: 0.85,
      metalness: 0.04
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Champagne Bronze Accent Metal (#B69A70)
  const champagneBronzeMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B69A70',
      roughness: 0.28,
      metalness: 0.85
    });
  }, []);

  // Architectural Clear Glass
  const architecturalGlassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FAF9F6',
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 0.35,
      specularIntensity: 1
    });
  }, []);

  // Subtle Greenery Materials (Muted Sage & Cypress)
  const sageFoliageMat1 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5A6E58', roughness: 0.88 }), []);
  const sageFoliageMat2 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#445642', roughness: 0.92 }), []);

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* CHAPTER 01: CAMPUS ENTRANCE PLAZA & REFLECTING WATER POOLS */}
      {/* ============================================================ */}

      {/* Main Travertine Arrival Plaza Podium */}
      <mesh position={[0, -0.4, 14]} receiveShadow>
        <boxGeometry args={[32, 0.8, 22]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Stepped Terraces Leading up to Portal (Z = 12 to 6) */}
      {[0, 1, 2, 3].map((step) => (
        <mesh key={step} position={[0, -0.2 + step * 0.12, 10 - step * 1.2]} receiveShadow>
          <boxGeometry args={[18 - step * 0.8, 0.16, 1.4]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      ))}

      {/* Flanking Reflecting Water Pools (Left & Right of Plaza) */}
      <group position={[-11, -0.1, 12]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[7, 0.35, 12]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6.2, 11.2]} />
          <meshStandardMaterial color="#5A8882" roughness={0.12} metalness={0.2} transparent opacity={0.92} />
        </mesh>
      </group>

      <group position={[11, -0.1, 12]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[7, 0.35, 12]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6.2, 11.2]} />
          <meshStandardMaterial color="#5A8882" roughness={0.12} metalness={0.2} transparent opacity={0.92} />
        </mesh>
      </group>

      {/* Symmetrical Cypress Planters on Promenade */}
      {[-7.5, 7.5].map((x, i) => (
        <group key={i} position={[x, 0.25, 7]}>
          <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
            <boxGeometry args={[1.2, 0.6, 1.2]} />
            <primitive object={travertineMat} attach="material" />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <coneGeometry args={[0.45, 1.6, 16]} />
            <primitive object={sageFoliageMat1} attach="material" />
          </mesh>
          <mesh position={[0, 1.9, 0]} castShadow>
            <coneGeometry args={[0.32, 1.2, 14]} />
            <primitive object={sageFoliageMat2} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ============================================================ */}
      {/* GRAND HEADQUARTERS ENTRANCE FACADE (Z = 5.0) */}
      {/* ============================================================ */}

      {/* Monumental Limestone Portal Colonnade */}
      <group position={[0, 2.8, 5.0]} castShadow receiveShadow>
        {/* Left Portal Pylon */}
        <mesh position={[-4.8, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 5.8, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Right Portal Pylon */}
        <mesh position={[4.8, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 5.8, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Grand Architectural Canopy / Lintel */}
        <mesh position={[0, 2.9, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[13.5, 0.8, 2.8]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Champagne Bronze Inset Fascia on Lintel */}
        <mesh position={[0, 2.75, 1.82]}>
          <boxGeometry args={[10.2, 0.12, 0.05]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* "EVORIQUE" Architectural Wordmark Lettering */}
        <group position={[0, 2.9, 1.85]}>
          {/* Subtle architectural plate */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[4.8, 0.45, 0.04]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
          {/* Subtle glow rim for brand lettering */}
          <pointLight position={[0, 0, 0.5]} color="#FFF4DF" intensity={1.8} distance={6} />
        </group>
      </group>

      {/* Panoramic Architectural Glass Curtain Wall (Z = 4.8) */}
      {/* Revealing the interconnected workspaces inside! */}
      <mesh position={[0, 2.5, 4.8]}>
        <planeGeometry args={[7.4, 5.0]} />
        <primitive object={architecturalGlassMat} attach="material" />
      </mesh>

      {/* DOUBLE PIVOT GLASS ENTRANCE DOORS (The transition target into Chapter 02) */}
      <group position={[0, 1.6, 4.85]}>
        {/* Left Pivot Door with Champagne Bronze Frame & Long Vertical Handle */}
        <group position={[-1.4, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.35, 3.2, 0.04]} />
            <primitive object={architecturalGlassMat} attach="material" />
          </mesh>
          <mesh position={[0.55, 0, 0.05]}>
            <cylinderGeometry args={[0.02, 0.02, 1.6, 12]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
        </group>

        {/* Right Pivot Door with Champagne Bronze Frame & Long Vertical Handle */}
        <group position={[1.4, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.35, 3.2, 0.04]} />
            <primitive object={architecturalGlassMat} attach="material" />
          </mesh>
          <mesh position={[-0.55, 0, 0.05]}>
            <cylinderGeometry args={[0.02, 0.02, 1.6, 12]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
