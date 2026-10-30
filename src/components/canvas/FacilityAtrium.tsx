import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface FacilityAtriumProps {
  visible: boolean;
}

export function FacilityAtrium({ visible }: FacilityAtriumProps) {
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(6, 6);
      t.anisotropy = 16;
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
      color: '#F4F1E9',
      roughness: 0.82
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const travertineMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.45, 0.45),
      color: '#E8E7E0',
      roughness: 0.85
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const champagneBronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.25, metalness: 0.85 }), []);
  const glassRoofMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FAF9F6',
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.52,
      thickness: 0.4
    });
  }, []);

  if (!visible) return null;

  return (
    <group position={[0, 0, -10.0]}>
      {/* ============================================================ */}
      {/* CHAPTER 08: THE FACILITY ATRIUM RETROSPECTIVE (AERIAL ARCHITECTURE) */}
      {/* ============================================================ */}

      {/* Grand Central Atrium Plaza Floor */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[22, 24, 0.6, 64]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Concentric Limestone Promenade Terraces */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[14, 15.5, 0.3, 64]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <cylinderGeometry args={[8.5, 9.2, 0.2, 48]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Central Illuminated Glass Geodesic Atrium Skylight Dome */}
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 2.4, 0]}>
          <sphereGeometry args={[4.2, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <primitive object={glassRoofMat} attach="material" />
        </mesh>
        {/* Internal Daylight Warm Core Glow */}
        <pointLight position={[0, 2.2, 0]} color="#FFF4DF" intensity={3.5} distance={18} />
      </group>

      {/* Interconnecting Architectural Skybridges linking the Facility Wings */}
      {/* North Bridge */}
      <mesh position={[0, 0.45, -12]} receiveShadow>
        <boxGeometry args={[3.2, 0.25, 10]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>
      {/* South Bridge */}
      <mesh position={[0, 0.45, 12]} receiveShadow>
        <boxGeometry args={[3.2, 0.25, 10]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>
      {/* West Skybridge */}
      <mesh position={[-12, 0.45, 0]} receiveShadow>
        <boxGeometry args={[10, 0.25, 3.2]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>
      {/* East Skybridge */}
      <mesh position={[12, 0.45, 0]} receiveShadow>
        <boxGeometry args={[10, 0.25, 3.2]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Champagne Bronze Perimeter Balustrades */}
      <mesh position={[0, 3.2, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[4.5, 0.08, 16, 64]} />
        <primitive object={champagneBronzeMat} attach="material" />
      </mesh>

      {/* Grand Monolithic Arch Gateway on Atrium Promontory */}
      <group position={[0, 1.2, 8]}>
        <mesh position={[-1.8, 1.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 3.6, 0.9]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[1.8, 1.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 3.6, 0.9]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <group position={[0, 3.6, 0]}>
          <mesh rotation={[0, 0, Math.PI]} castShadow receiveShadow>
            <torusGeometry args={[1.8, 0.45, 16, 32, Math.PI]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
