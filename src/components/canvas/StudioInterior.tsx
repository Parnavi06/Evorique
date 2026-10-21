import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function StudioInterior() {
  const laptopScreenTex = useTexture('/scenes/laptop_screen_content.jpg');

  // Limestone PBR
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  // Oak Wood PBR
  const [woodDiffuse, woodNormal, woodRoughness] = useTexture([
    '/textures/wood_diffuse.jpg',
    '/textures/wood_normal.jpg',
    '/textures/wood_roughness.jpg',
  ]);

  // Configure texture parameters
  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;

    [woodDiffuse, woodNormal, woodRoughness].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    woodDiffuse.colorSpace = THREE.SRGBColorSpace;
    woodNormal.colorSpace = THREE.NoColorSpace;
    woodRoughness.colorSpace = THREE.NoColorSpace;
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness, woodDiffuse, woodNormal, woodRoughness]);

  // Materials
  const woodMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: woodDiffuse,
      normalMap: woodNormal,
      roughnessMap: woodRoughness,
      normalScale: new THREE.Vector2(0.3, 0.3),
      color: '#d4bc9e',
      roughness: 0.52,
      metalness: 0.03
    });
  }, [woodDiffuse, woodNormal, woodRoughness]);

  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#f0e9df',
      roughness: 0.85,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const aluminumMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#d8d8d8',
      roughness: 0.28,
      metalness: 0.88
    });
  }, []);

  const darkAlumMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1a1918',
      roughness: 0.35,
      metalness: 0.7
    });
  }, []);

  const glassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#f0f8f7',
      transmission: 0.88,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
      thickness: 0.25
    });
  }, []);

  const foliageMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#344736',
      roughness: 0.9
    });
  }, []);

  return (
    <group position={[0, 0, -16.0]}>
      {/* Studio Room Floor */}
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <boxGeometry args={[14, 0.2, 12]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Sweeping Limestone Arch Overhead Vault */}
      <group position={[0, 3.2, 1.2]}>
        <mesh rotation={[0, 0, Math.PI]} castShadow receiveShadow>
          <torusGeometry args={[4.2, 0.55, 16, 32, Math.PI]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      </group>

      {/* Back Architectural Wall with Window Aperture */}
      <mesh position={[0, 3.0, -3.8]} castShadow receiveShadow>
        <boxGeometry args={[13, 5.5, 0.5]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Panoramic Window Framing External Nature */}
      <mesh position={[0, 2.5, -3.5]}>
        <planeGeometry args={[9.5, 3.6]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Window Structural Mullions */}
      <group position={[0, 2.5, -3.48]}>
        <mesh position={[-3.1, 0, 0]}>
          <boxGeometry args={[0.08, 3.6, 0.08]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 3.6, 0.08]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[3.1, 0, 0]}>
          <boxGeometry args={[0.08, 3.6, 0.08]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
      </group>

      {/* Outside Trees Visible Through Window */}
      <group position={[0, 1.0, -4.8]}>
        <mesh position={[-2.8, 1.6, 0]}>
          <coneGeometry args={[1.0, 3.2, 12]} />
          <primitive object={foliageMat} attach="material" />
        </mesh>
        <mesh position={[2.8, 1.8, 0]}>
          <coneGeometry args={[1.2, 3.5, 12]} />
          <primitive object={foliageMat} attach="material" />
        </mesh>
      </group>

      {/* PHYSICAL WORKSTATION DESK WITH NATURAL OAK PBR */}
      <group position={[0, 0.05, 0]}>
        {/* Natural Oak Tabletop */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.08, 1.6]} />
          <primitive object={woodMat} attach="material" />
        </mesh>

        {/* Desk Pedestals */}
        <mesh position={[-1.4, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.4]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[1.4, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.4]} />
          <primitive object={woodMat} attach="material" />
        </mesh>

        {/* Ceramic Coffee Mug */}
        <mesh position={[-0.8, 0.54, 0.18]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.09, 20]} />
          <meshStandardMaterial color="#ebe6de" roughness={0.35} />
        </mesh>

        {/* Drafting Notebook & Pen */}
        <mesh position={[-0.42, 0.5, 0.22]} rotation={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.22, 0.015, 0.3]} />
          <meshStandardMaterial color="#ded7cc" roughness={0.8} />
        </mesh>
        <mesh position={[-0.22, 0.51, 0.22]} rotation={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.16, 10]} />
          <meshStandardMaterial color="#1a1918" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Background Desk Monitor */}
        <group position={[0.95, 0.72, -0.15]}>
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.8, 0.48, 0.03]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
        </group>

        {/* 3D LAPTOP (THE PORTAL DESTINATION FOR STATES 04 & 05) */}
        <group position={[0, 0.49, 0]}>
          {/* Aluminum Laptop Base */}
          <mesh position={[0, 0.008, 0.08]} castShadow>
            <boxGeometry args={[0.54, 0.014, 0.38]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          {/* Keyboard Recess */}
          <mesh position={[0, 0.016, 0.06]}>
            <boxGeometry args={[0.44, 0.002, 0.19]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          {/* Glass Trackpad */}
          <mesh position={[0, 0.016, 0.21]}>
            <boxGeometry args={[0.16, 0.001, 0.1]} />
            <meshStandardMaterial color="#b8b8b8" roughness={0.25} metalness={0.7} />
          </mesh>

          {/* Laptop Display Lid with Hinge Pivot */}
          <group position={[0, 0.015, -0.1]}>
            <group rotation={[-0.22, 0, 0]}>
              {/* Aluminum Back Shell */}
              <mesh position={[0, 0.18, 0]} castShadow>
                <boxGeometry args={[0.54, 0.36, 0.012]} />
                <primitive object={aluminumMat} attach="material" />
              </mesh>

              {/* Display Bezel */}
              <mesh position={[0, 0.18, 0.0065]}>
                <boxGeometry args={[0.53, 0.35, 0.002]} />
                <primitive object={darkAlumMat} attach="material" />
              </mesh>

              {/* GLOWING LAPTOP SCREEN (The portal into Aurora) */}
              <mesh position={[0, 0.18, 0.0085]}>
                <planeGeometry args={[0.50, 0.32]} />
                <meshBasicMaterial map={laptopScreenTex} toneMapped={false} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
