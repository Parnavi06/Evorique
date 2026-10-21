import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function LimestoneRing() {
  // Load High-Resolution 1024x1024 PBR Texture Set
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  // Configure textures
  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(5, 5);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // High-End Limestone PBR Material
  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.38, 0.38),
      color: '#f3ece2',
      roughness: 0.82,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Accent / Trim Limestone Material
  const limestoneTrimMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.48, 0.48),
      color: '#ded4c5',
      roughness: 0.86,
      metalness: 0.03
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Silhouette Figure Material
  const darkFigureMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#22201e',
      roughness: 0.92,
      metalness: 0.05
    });
  }, []);

  // Multi-tone Realistic Foliage Materials
  const foliageMat1 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#384c39', roughness: 0.9 }), []);
  const foliageMat2 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#445b45', roughness: 0.9 }), []);
  const foliageMat3 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2b3a2c', roughness: 0.95 }), []);

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* STATE 01: ARCHITECTURAL PROMONTORY ISLAND & TERRACED PLAZA */}
      {/* ============================================================ */}

      {/* Underwater Island Foundation Shelf */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <cylinderGeometry args={[15.0, 16.5, 0.7, 64]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>

      {/* Main Island Seawall Platform */}
      <mesh position={[0, -0.35, 0]} receiveShadow>
        <cylinderGeometry args={[13.2, 14.2, 0.55, 64]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>

      {/* Lower Promenade Terrace */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[9.5, 10.2, 0.22, 64]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Mid Promenade Terrace */}
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <cylinderGeometry args={[6.2, 6.8, 0.20, 64]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Upper Monument Plaza Terrace */}
      <mesh position={[0, 0.38, 0]} receiveShadow>
        <cylinderGeometry args={[3.8, 4.2, 0.16, 48]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Curved Perimeter Stone Balustrades / Parapet Benches */}
      <group position={[0, 0.22, 0]}>
        <mesh position={[-4.8, 0.25, 2.6]} rotation={[0, 0.55, 0]} receiveShadow castShadow>
          <boxGeometry args={[4.2, 0.45, 0.38]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>
        <mesh position={[4.8, 0.25, 2.6]} rotation={[0, -0.55, 0]} receiveShadow castShadow>
          <boxGeometry args={[4.2, 0.45, 0.38]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* THE ARCHITECTURAL RING ("The Mark") */}
      {/* Sculptural Monument Standing at Z = 0 */}
      {/* ============================================================ */}
      <group position={[0, 2.15, 0]} castShadow receiveShadow>
        {/* Main Beveled Ring Torus */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[2.0, 0.44, 32, 64]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Outer Accent Rim */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[2.44, 0.08, 16, 64]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>

        {/* Inner Chamfer Rim */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[1.56, 0.06, 16, 64]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>

        {/* Sturdy Limestone Foundation Clamps / Pedestals */}
        <group position={[-1.75, -1.65, 0]} castShadow receiveShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.9, 0.85, 1.0]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.38, 0]}>
            <boxGeometry args={[1.05, 0.16, 1.15]} />
            <primitive object={limestoneTrimMat} attach="material" />
          </mesh>
        </group>

        <group position={[1.75, -1.65, 0]} castShadow receiveShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.9, 0.85, 1.0]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.38, 0]}>
            <boxGeometry args={[1.05, 0.16, 1.15]} />
            <primitive object={limestoneTrimMat} attach="material" />
          </mesh>
        </group>
      </group>

      {/* PROPORTIONAL ARCHITECTURAL HUMAN SILHOUETTE */}
      <group position={[0, 0.48, 1.55]} rotation={[0, Math.PI, 0]}>
        {/* Soft Contact Shadow Decal on Stone Floor */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.24, 16]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.25} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.76, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        {/* Torso & Long Coat Tailored Silhouette */}
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.08, 0.14, 0.58, 16]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.045, 0.08, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 10]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        <mesh position={[0.045, 0.08, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 10]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* STATE 02: INNER COURTYARD & STEPPED ARCHITECTURAL CORRIDOR */}
      {/* Spatially nested directly through the ring opening (Z = -2 to -8) */}
      {/* ============================================================ */}
      <group position={[0, 0, -4.8]}>
        {/* Courtyard Walkway Stone Floor */}
        <mesh position={[0, 0.26, 0]} receiveShadow>
          <boxGeometry args={[6.2, 0.32, 9.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Stepped Promenade leading up toward the studio */}
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[0, 0.32 + i * 0.09, -0.6 - i * 0.58]} receiveShadow>
            <boxGeometry args={[4.4 - i * 0.1, 0.12, 0.65]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
        ))}

        {/* Left Colonnade Archways */}
        <group position={[-2.8, 1.7, 0]} castShadow receiveShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.65, 3.4, 8.8]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          {[-2.6, 0, 2.6].map((z, idx) => (
            <mesh key={idx} position={[0.33, 0.2, z]} rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.85, 0.85, 0.2, 20]} />
              <primitive object={limestoneTrimMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Right Colonnade Archways */}
        <group position={[2.8, 1.7, 0]} castShadow receiveShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.65, 3.4, 8.8]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          {[-2.6, 0, 2.6].map((z, idx) => (
            <mesh key={idx} position={[-0.33, 0.2, z]} rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.85, 0.85, 0.2, 20]} />
              <primitive object={limestoneTrimMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Overhead Pergola Beams (Casting Rhythmic Diagonal Shadows) */}
        {[-3, -1.8, -0.6, 0.6, 1.8, 3].map((z, i) => (
          <mesh key={i} position={[0, 3.35, z]} castShadow receiveShadow>
            <boxGeometry args={[5.8, 0.18, 0.25]} />
            <primitive object={limestoneTrimMat} attach="material" />
          </mesh>
        ))}

        {/* Organic Sculptural Cypress Groves in Stone Planters */}
        {/* Left Planter & Cypress Group */}
        <group position={[-1.9, 0.62, -1.2]} castShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.75, 0.6, 1.8]} />
            <primitive object={limestoneTrimMat} attach="material" />
          </mesh>
          {/* Organic Tiered Cypress 1 */}
          <group position={[0, 0.4, -0.4]}>
            <mesh position={[0, 0.5, 0]} castShadow>
              <coneGeometry args={[0.42, 1.2, 16]} />
              <primitive object={foliageMat1} attach="material" />
            </mesh>
            <mesh position={[0, 1.1, 0]} castShadow>
              <coneGeometry args={[0.34, 1.0, 16]} />
              <primitive object={foliageMat2} attach="material" />
            </mesh>
            <mesh position={[0, 1.6, 0]} castShadow>
              <coneGeometry args={[0.22, 0.8, 14]} />
              <primitive object={foliageMat3} attach="material" />
            </mesh>
          </group>
          {/* Organic Tiered Cypress 2 */}
          <group position={[0, 0.35, 0.4]}>
            <mesh position={[0, 0.45, 0]} castShadow>
              <coneGeometry args={[0.38, 1.1, 16]} />
              <primitive object={foliageMat2} attach="material" />
            </mesh>
            <mesh position={[0, 0.95, 0]} castShadow>
              <coneGeometry args={[0.28, 0.9, 14]} />
              <primitive object={foliageMat1} attach="material" />
            </mesh>
          </group>
        </group>

        {/* Right Planter & Cypress Group */}
        <group position={[1.9, 0.62, 1.2]} castShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.75, 0.6, 1.8]} />
            <primitive object={limestoneTrimMat} attach="material" />
          </mesh>
          <group position={[0, 0.4, 0]}>
            <mesh position={[0, 0.5, 0]} castShadow>
              <coneGeometry args={[0.44, 1.2, 16]} />
              <primitive object={foliageMat1} attach="material" />
            </mesh>
            <mesh position={[0, 1.1, 0]} castShadow>
              <coneGeometry args={[0.32, 1.0, 16]} />
              <primitive object={foliageMat2} attach="material" />
            </mesh>
            <mesh position={[0, 1.65, 0]} castShadow>
              <coneGeometry args={[0.20, 0.8, 14]} />
              <primitive object={foliageMat3} attach="material" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
