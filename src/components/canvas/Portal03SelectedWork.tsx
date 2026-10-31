import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Portal03Props {
  onSelectProject?: (id: string) => void;
}

export function Portal03SelectedWork({ onSelectProject }: Portal03Props) {
  const [auroraTex, markTex, studioTex, archipelagoTex] = useTexture([
    '/scenes/state_04_a_project.jpg',
    '/scenes/state_01_the_mark.jpg',
    '/scenes/state_03_inside_studio.jpg',
    '/scenes/state_06_capabilities.jpg'
  ]);

  useMemo(() => {
    [auroraTex, markTex, studioTex, archipelagoTex].forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
    });
  }, [auroraTex, markTex, studioTex, archipelagoTex]);

  const limestoneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#F4F1EA', roughness: 0.82 }), []);
  const travertineMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#E5E0D6', roughness: 0.86 }), []);
  const bronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.28, metalness: 0.85 }), []);
  const crystallineMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FAF8F5',
    transmission: 0.94,
    transparent: true,
    roughness: 0.04,
    ior: 1.55,
    thickness: 0.4
  }), []);

  const exhibits = [
    { id: 'aurora', title: 'Aurora', pos: [-3.4, 1.8, 4] as [number, number, number], tex: auroraTex },
    { id: 'the-mark', title: 'The Mark', pos: [3.4, 1.8, 4] as [number, number, number], tex: markTex },
    { id: 'studio-workspace', title: 'Studio', pos: [-3.4, 1.8, -2] as [number, number, number], tex: studioTex },
    { id: 'archipelago', title: 'Archipelago', pos: [3.4, 1.8, -2] as [number, number, number], tex: archipelagoTex },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Floating Gallery Promenade Floor (Z = 9 to -9) */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <boxGeometry args={[14, 0.5, 18]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Flanking Gallery Parapets */}
      {[-6.8, 6.8].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.8, 18]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      ))}

      {/* 4 Sculptural Project Plinths with Real Artwork */}
      {exhibits.map((ex) => (
        <group
          key={ex.id}
          position={ex.pos}
          onClick={() => onSelectProject?.(ex.id)}
        >
          {/* Honed Stone Pedestal Base */}
          <mesh position={[0, -1.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 1.6, 0.5]} />
            <primitive object={travertineMat} attach="material" />
          </mesh>

          {/* Bronze Display Frame */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[2.3, 1.5, 0.08]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>

          {/* High-Resolution Project Artwork Canvas */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[2.18, 1.38]} />
            <meshBasicMaterial map={ex.tex} />
          </mesh>

          {/* Gallery Plinth Spotlight */}
          <pointLight position={[0, 1.2, 0.8]} color="#FFF6EA" intensity={1.5} distance={4.5} />
        </group>
      ))}

      {/* 2. THE CRYSTALLINE PORTAL FRAME (Z = -8.0) */}
      <group position={[0, 2.6, -8.0]}>
        {/* Monolithic Portal Piers */}
        <mesh position={[-2.6, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 6.4, 1.4]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[2.6, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 6.4, 1.4]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 3.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.6, 0.8, 1.6]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Luminous Crystalline Aperture Prism */}
        <mesh position={[0, 0.6, -0.2]}>
          <boxGeometry args={[3.8, 5.0, 0.2]} />
          <primitive object={crystallineMat} attach="material" />
        </mesh>

        {/* Luminous Gateway Glow into Environment 03 */}
        <pointLight position={[0, 1.2, -0.6]} color="#FFF2DC" intensity={2.2} distance={8} />
      </group>
    </group>
  );
}
