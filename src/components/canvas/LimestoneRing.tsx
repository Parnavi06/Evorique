import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function LimestoneRing() {
  // Load High-Resolution PBR Texture Set
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  // Configure anisotropic filtering & color spaces
  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Warm Limestone PBR Material
  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#f4ede4',
      roughness: 0.84,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Accent Trim Limestone Material
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

  // Silhouette Figure Material
  const darkFigureMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#242220',
      roughness: 0.9,
      metalness: 0.08
    });
  }, []);

  // Cypress Foliage Material
  const foliageMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#3d4f3e',
      roughness: 0.92,
      metalness: 0.0
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* STATE 01: HERO ISLAND & CONCENTRIC TERRACES */}
      {/* ============================================================ */}

      {/* Main Island Promontory Base */}
      <mesh position={[0, -0.45, 0]} receiveShadow>
        <cylinderGeometry args={[13.5, 15.5, 0.9, 64]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>

      {/* Tier 1 Terrace Platform */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[8.8, 9.6, 0.28, 64]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Tier 2 Terrace Platform */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <cylinderGeometry args={[5.6, 6.2, 0.22, 64]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Tier 3 Ring Base Platform */}
      <mesh position={[0, 0.40, 0]} receiveShadow>
        <cylinderGeometry args={[3.4, 3.8, 0.16, 48]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Low Curved Parapet Walls around Terrace */}
      <group position={[0, 0.25, 0]}>
        <mesh position={[-4.5, 0.25, 2.5]} rotation={[0, 0.6, 0]} receiveShadow>
          <boxGeometry args={[3.5, 0.45, 0.35]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>
        <mesh position={[4.5, 0.25, 2.5]} rotation={[0, -0.6, 0]} receiveShadow>
          <boxGeometry args={[3.5, 0.45, 0.35]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* THE ARCHITECTURAL RING ("The Mark") */}
      {/* ============================================================ */}
      <group position={[0, 2.1, 0]} castShadow receiveShadow>
        {/* Main Beveled Ring Torus */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[2.0, 0.42, 32, 64]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Outer Accent Rim */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[2.42, 0.08, 16, 64]} />
          <primitive object={limestoneTrimMat} attach="material" />
        </mesh>

        {/* Ring Base Support Pillars / Clamps */}
        <mesh position={[-1.75, -1.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.8, 0.95]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[1.75, -1.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.8, 0.95]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      </group>

      {/* Silhouette Figure Standing in Front of the Mark */}
      <group position={[0, 0.52, 1.45]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.08, 0.14, 0.55, 16]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        <mesh position={[-0.045, 0.08, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        <mesh position={[0.045, 0.08, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* STATE 02: INNER COURTYARD & TERRACE PATH */}
      {/* ============================================================ */}
      <group position={[0, 0, -4.5]}>
        {/* Courtyard Walkway Stone Floor */}
        <mesh position={[0, 0.28, 0]} receiveShadow>
          <boxGeometry args={[5.8, 0.3, 8.5]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Stepped Promenade leading up through the courtyard */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, 0.35 + i * 0.09, -0.8 - i * 0.55]} receiveShadow>
            <boxGeometry args={[4.2 - i * 0.1, 0.12, 0.6]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
        ))}

        {/* Left Colonnade Arch Structure */}
        <group position={[-2.6, 1.6, 0]} castShadow receiveShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.6, 3.2, 8.0]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          {[-2.5, 0, 2.5].map((z, idx) => (
            <mesh key={idx} position={[0.31, 0.2, z]} rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
              <primitive object={limestoneTrimMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Right Colonnade Arch Structure */}
        <group position={[2.6, 1.6, 0]} castShadow receiveShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.6, 3.2, 8.0]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          {[-2.5, 0, 2.5].map((z, idx) => (
            <mesh key={idx} position={[-0.31, 0.2, z]} rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
              <primitive object={limestoneTrimMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Architectural Planters with Sculptural Greenery */}
        <group position={[-1.8, 0.6, -1.2]} castShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.7, 0.6, 1.6]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          <mesh position={[0, 1.2, -0.3]} castShadow>
            <coneGeometry args={[0.45, 1.8, 16]} />
            <primitive object={foliageMat} attach="material" />
          </mesh>
          <mesh position={[0, 1.0, 0.3]} castShadow>
            <coneGeometry args={[0.40, 1.5, 16]} />
            <primitive object={foliageMat} attach="material" />
          </mesh>
        </group>

        <group position={[1.8, 0.6, 1.2]} castShadow>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.7, 0.6, 1.6]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <coneGeometry args={[0.45, 1.8, 16]} />
            <primitive object={foliageMat} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
