import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Portal04Services() {
  const polyhedron1 = useRef<THREE.Mesh>(null);
  const polyhedron2 = useRef<THREE.Mesh>(null);

  const limestoneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#F4F1EA', roughness: 0.8 }), []);
  const travertineMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#E5E0D6', roughness: 0.85 }), []);
  const bronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.25, metalness: 0.88 }), []);

  useFrame((_, delta) => {
    if (polyhedron1.current) {
      polyhedron1.current.rotation.x += delta * 0.2;
      polyhedron1.current.rotation.y += delta * 0.15;
    }
    if (polyhedron2.current) {
      polyhedron2.current.rotation.y -= delta * 0.2;
      polyhedron2.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Atelier Base Floor (Z = -24 to -40) */}
      <mesh position={[0, -0.3, -32]} receiveShadow>
        <boxGeometry args={[18, 0.5, 18]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Symmetrical Flanking Colonnade of Service Stelae */}
      {[-6.2, 6.2].map((x, colIdx) => (
        <group key={colIdx}>
          {[-26, -30, -34, -38].map((z, rowIdx) => (
            <group key={rowIdx} position={[x, 2.5, z]}>
              {/* Monolithic Inscribed Stele */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.5, 5.2, 1.8]} />
                <primitive object={limestoneMat} attach="material" />
              </mesh>
              {/* Bronze Inset Accent Bar */}
              <mesh position={[colIdx === 0 ? 0.26 : -0.26, 0, 0]}>
                <boxGeometry args={[0.02, 4.4, 0.04]} />
                <primitive object={bronzeMat} attach="material" />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Floating Bronze Polyhedra (Symbol of Creative Technology & Geometry) */}
      <mesh ref={polyhedron1} position={[-2.8, 3.8, -29]} castShadow>
        <icosahedronGeometry args={[0.65, 0]} />
        <primitive object={bronzeMat} attach="material" />
      </mesh>

      <mesh ref={polyhedron2} position={[2.8, 3.8, -35]} castShadow>
        <octahedronGeometry args={[0.65, 0]} />
        <primitive object={bronzeMat} attach="material" />
      </mesh>

      {/* 2. THE MONUMENTAL MARBLE DOORWAY (Z = -40.0) */}
      <group position={[0, 2.6, -40.0]}>
        {/* Doorway Frame */}
        <mesh position={[-2.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 6.2, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[2.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 6.2, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 3.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.6, 0.8, 1.4]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Bronze Doorway Header Strip */}
        <mesh position={[0, 3.0, 0.62]}>
          <boxGeometry args={[4.2, 0.12, 0.04]} />
          <primitive object={bronzeMat} attach="material" />
        </mesh>

        {/* Luminous Light Spill into Environment 05 */}
        <pointLight position={[0, 1.5, -0.6]} color="#FFF5E4" intensity={2.2} distance={8} />
      </group>
    </group>
  );
}
