import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Portal05About() {
  const [woodDiffuse, woodNormal, woodRoughness] = useTexture([
    '/textures/wood_diffuse.jpg',
    '/textures/wood_normal.jpg',
    '/textures/wood_roughness.jpg',
  ]);

  const limestoneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#F4F1EA', roughness: 0.8 }), []);
  const travertineMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#E5E0D6', roughness: 0.85 }), []);
  const bronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.28, metalness: 0.85 }), []);

  const oakMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: woodDiffuse,
      normalMap: woodNormal,
      roughnessMap: woodRoughness,
      color: '#D4BC9E',
      roughness: 0.45,
      metalness: 0.03
    });
  }, [woodDiffuse, woodNormal, woodRoughness]);

  const glassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FAF8F5',
      transmission: 0.9,
      transparent: true,
      roughness: 0.04,
      ior: 1.5,
      thickness: 0.2
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Observatory Platform Floor (Z = -42 to -58) */}
      <mesh position={[0, -0.3, -50]} receiveShadow>
        <boxGeometry args={[18, 0.5, 18]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Flanking Curved Observatory Walls with Slit Windows */}
      {[-7.5, 7.5].map((x, i) => (
        <group key={i} position={[x, 2.8, -50]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 5.8, 17.5]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          {/* Panoramic Slit Windows */}
          {[-6, -2, 2, 6].map((zOffset, winIdx) => (
            <mesh key={winIdx} position={[i === 0 ? 0.61 : -0.61, 0, zOffset]}>
              <boxGeometry args={[0.04, 3.4, 1.8]} />
              <primitive object={glassMat} attach="material" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Centerpiece: Scandinavian Oak Studio Worktable (Symbol of Craft & Honest Work) */}
      <group position={[0, 0.4, -49]}>
        {/* Table Top */}
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 0.12, 2.0]} />
          <primitive object={oakMat} attach="material" />
        </mesh>
        {/* Travertine Slab Legs */}
        <mesh position={[-2.1, -0.05, 0]} castShadow>
          <boxGeometry args={[0.25, 0.76, 1.8]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        <mesh position={[2.1, -0.05, 0]} castShadow>
          <boxGeometry args={[0.25, 0.76, 1.8]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
      </group>

      {/* Suspended Minimalist Linear Architectural Luminaire */}
      <group position={[0, 3.6, -49]}>
        <mesh>
          <boxGeometry args={[4.2, 0.08, 0.12]} />
          <primitive object={bronzeMat} attach="material" />
        </mesh>
        <pointLight position={[0, -0.2, 0]} color="#FFF4DF" intensity={2.0} distance={7} />
      </group>

      {/* 2. OBSERVATORY BALCONY THRESHOLD (Z = -58.0) */}
      <group position={[0, 2.6, -58.0]}>
        <mesh position={[-2.4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 6.2, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[2.4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 6.2, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 3.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.2, 0.8, 1.4]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Luminous Light Spill into Final Horizon Destination */}
        <pointLight position={[0, 1.5, -0.8]} color="#FFF3DC" intensity={2.4} distance={9} />
      </group>
    </group>
  );
}
