import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function IdeationBoardroom() {
  const ideationScreenTex = useTexture('/screens/ideation_screen.jpg');
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

  // Configure textures
  useMemo(() => {
    ideationScreenTex.colorSpace = THREE.SRGBColorSpace;
    ideationScreenTex.generateMipmaps = true;

    [woodDiffuse, woodNormal, woodRoughness].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(2, 2);
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
  }, [ideationScreenTex, woodDiffuse, woodNormal, woodRoughness, limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Materials
  const travertineFloorMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.3, 0.3),
      color: '#F4F1E9',
      roughness: 0.78,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const oakTableMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: woodDiffuse,
      normalMap: woodNormal,
      roughnessMap: woodRoughness,
      normalScale: new THREE.Vector2(0.25, 0.25),
      color: '#D4BC9E',
      roughness: 0.45,
      metalness: 0.03
    });
  }, [woodDiffuse, woodNormal, woodRoughness]);

  const darkAlumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#252824', roughness: 0.35, metalness: 0.7 }), []);
  const champagneBronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.25, metalness: 0.85 }), []);
  const chairLeatherMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3A3D39', roughness: 0.65 }), []);

  const glassPartitionMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FAF9F6',
      transmission: 0.90,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      thickness: 0.2
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* CHAPTER 02: WING A — THE IDEATION BOARDROOM (Z = 3.5 to -3.0) */}
      {/* ============================================================ */}

      {/* Boardroom Travertine Floor */}
      <mesh position={[0, 0.28, -0.5]} receiveShadow>
        <boxGeometry args={[13.5, 0.2, 8.5]} />
        <primitive object={travertineFloorMat} attach="material" />
      </mesh>

      {/* Boardroom Ceiling with Recessed Warm Lighting */}
      <mesh position={[0, 3.6, -0.5]}>
        <boxGeometry args={[13.5, 0.2, 8.5]} />
        <meshStandardMaterial color="#FAF9F6" roughness={0.9} />
      </mesh>
      <pointLight position={[0, 3.3, -0.5]} color="#FFF4DF" intensity={1.5} distance={9} />

      {/* Left Wall (Limestone with Framed Concept Sketchboards) */}
      <group position={[-6.7, 1.9, -0.5]}>
        <mesh>
          <boxGeometry args={[0.2, 3.4, 8.5]} />
          <primitive object={travertineFloorMat} attach="material" />
        </mesh>
        {/* Concept Sketchboard 1 */}
        <mesh position={[0.12, 0.2, -1.5]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.2, 1.4]} />
          <meshStandardMaterial color="#FAF9F6" roughness={0.7} />
        </mesh>
        {/* Concept Sketchboard 2 */}
        <mesh position={[0.12, 0.2, 1.5]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.2, 1.4]} />
          <meshStandardMaterial color="#FAF9F6" roughness={0.7} />
        </mesh>
      </group>

      {/* Right Wall (Panoramic Architectural Glass Looking into Landscaped Atrium) */}
      <group position={[6.7, 1.9, -0.5]}>
        <mesh>
          <boxGeometry args={[0.08, 3.4, 8.5]} />
          <primitive object={glassPartitionMat} attach="material" />
        </mesh>
        {/* Mullions */}
        {[-2.8, 0, 2.8].map((z, i) => (
          <mesh key={i} position={[0, 0, z]}>
            <boxGeometry args={[0.12, 3.4, 0.08]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* ============================================================ */}
      {/* MONUMENTAL BOARDROOM TABLE & CHAIRS (NO PEOPLE) */}
      {/* ============================================================ */}
      <group position={[0, 0.38, -0.2]}>
        {/* Long Oak Conference Tabletop with Chamfered Edges */}
        <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.08, 4.4]} />
          <primitive object={oakTableMat} attach="material" />
        </mesh>
        {/* Champagne Bronze Inset Cable Tray / Power Rail */}
        <mesh position={[0, 0.485, 0]}>
          <boxGeometry args={[0.22, 0.01, 2.8]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* Sculptural Travertine Table Pedestals */}
        <mesh position={[0, 0.22, -1.4]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.44, 0.35]} />
          <primitive object={travertineFloorMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.22, 1.4]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.44, 0.35]} />
          <primitive object={travertineFloorMat} attach="material" />
        </mesh>

        {/* Table Accessories (Ceramic Pitcher & Glass Tumblers) */}
        <mesh position={[0, 0.58, -0.4]} castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.22, 16]} />
          <meshStandardMaterial color="#FAF9F6" roughness={0.3} />
        </mesh>
        <mesh position={[0.2, 0.53, -0.4]} castShadow>
          <cylinderGeometry args={[0.035, 0.03, 0.1, 16]} />
          <primitive object={glassPartitionMat} attach="material" />
        </mesh>

        {/* 6 Executive Cantilever Chairs (Unoccupied, strictly no people) */}
        {[-1.5, 0, 1.5].map((z, i) => (
          <group key={i}>
            {/* Left side chair */}
            <group position={[-1.6, 0, z]} rotation={[0, Math.PI / 2, 0]}>
              <mesh position={[0, 0.26, 0]} castShadow>
                <boxGeometry args={[0.55, 0.06, 0.52]} />
                <primitive object={chairLeatherMat} attach="material" />
              </mesh>
              <mesh position={[0, 0.56, -0.24]} rotation={[-0.08, 0, 0]} castShadow>
                <boxGeometry args={[0.52, 0.58, 0.06]} />
                <primitive object={chairLeatherMat} attach="material" />
              </mesh>
              <mesh position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.24, 12]} />
                <primitive object={darkAlumMat} attach="material" />
              </mesh>
            </group>
            {/* Right side chair */}
            <group position={[1.6, 0, z]} rotation={[0, -Math.PI / 2, 0]}>
              <mesh position={[0, 0.26, 0]} castShadow>
                <boxGeometry args={[0.55, 0.06, 0.52]} />
                <primitive object={chairLeatherMat} attach="material" />
              </mesh>
              <mesh position={[0, 0.56, -0.24]} rotation={[-0.08, 0, 0]} castShadow>
                <boxGeometry args={[0.52, 0.58, 0.06]} />
                <primitive object={chairLeatherMat} attach="material" />
              </mesh>
              <mesh position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.24, 12]} />
                <primitive object={darkAlumMat} attach="material" />
              </mesh>
            </group>
          </group>
        ))}
      </group>

      {/* ============================================================ */}
      {/* 120-INCH ULTRA-HD PRESENTATION DISPLAY (The Nested Zoom Target) */}
      {/* Positioned on the front wall at Z = -2.8 */}
      {/* ============================================================ */}
      <group position={[0, 1.9, -2.8]}>
        {/* Wall Mount Back Panel */}
        <mesh position={[0, 0, -0.05]} castShadow>
          <boxGeometry args={[4.4, 2.5, 0.08]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        {/* Champagne Bronze Framing Edge */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[4.28, 2.44, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
        {/* High-Resolution Presentation Screen Mesh (Displays Ideation Brief & Aurora Concept) */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[4.2, 2.36]} />
          <meshBasicMaterial map={ideationScreenTex} toneMapped={false} />
        </mesh>
        {/* Subtle Ambient Presentation Glow */}
        <pointLight position={[0, 0, 0.4]} color="#FAF9F6" intensity={1.2} distance={5} />
      </group>
    </group>
  );
}
