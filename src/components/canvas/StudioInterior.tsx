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
      tex.repeat.set(4, 4);
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
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#d4bc9e',
      roughness: 0.50,
      metalness: 0.02
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
      roughness: 0.38,
      metalness: 0.65
    });
  }, []);

  const glassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#f0f8f7',
      transmission: 0.90,
      opacity: 1,
      transparent: true,
      roughness: 0.06,
      ior: 1.5,
      thickness: 0.25
    });
  }, []);

  const foliageMat1 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#384c39', roughness: 0.9 }), []);
  const foliageMat2 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#445b45', roughness: 0.9 }), []);

  return (
    <group position={[0, 0, -16.0]}>
      {/* Studio Room Floor with subtle reflection */}
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <boxGeometry args={[15, 0.2, 13]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Sweeping Limestone Arch Overhead Vault Ceiling */}
      <group position={[0, 3.4, 1.2]}>
        <mesh rotation={[0, 0, Math.PI]} castShadow receiveShadow>
          <torusGeometry args={[4.5, 0.55, 16, 32, Math.PI]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      </group>

      {/* Back Wall with Window Aperture */}
      <mesh position={[0, 3.2, -4.0]} castShadow receiveShadow>
        <boxGeometry args={[14, 5.8, 0.5]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Panoramic Studio Window */}
      <mesh position={[0, 2.6, -3.7]}>
        <planeGeometry args={[10.5, 3.8]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Window Structural Metal Mullions */}
      <group position={[0, 2.6, -3.68]}>
        <mesh position={[-3.5, 0, 0]}>
          <boxGeometry args={[0.08, 3.8, 0.08]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 3.8, 0.08]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[3.5, 0, 0]}>
          <boxGeometry args={[0.08, 3.8, 0.08]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
      </group>

      {/* Sunlit Outdoor Greenery Visible Through Window */}
      <group position={[0, 1.2, -5.2]}>
        <mesh position={[-3.2, 1.8, 0]} castShadow>
          <coneGeometry args={[1.2, 3.6, 16]} />
          <primitive object={foliageMat1} attach="material" />
        </mesh>
        <mesh position={[3.2, 2.0, 0]} castShadow>
          <coneGeometry args={[1.4, 4.0, 16]} />
          <primitive object={foliageMat2} attach="material" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* WORKSTATION DESK WITH NATURAL OAK PBR & ARCHITECTURAL PROPS */}
      {/* ============================================================ */}
      <group position={[0, 0.05, 0]}>
        {/* Solid Oak Tabletop */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.08, 1.7]} />
          <primitive object={woodMat} attach="material" />
        </mesh>

        {/* Desk Pedestal Supports */}
        <mesh position={[-1.45, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.5]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[1.45, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.5]} />
          <primitive object={woodMat} attach="material" />
        </mesh>

        {/* Ceramic Coffee Mug */}
        <group position={[-0.85, 0.54, 0.18]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.09, 24]} />
            <meshStandardMaterial color="#edeae3" roughness={0.32} />
          </mesh>
          {/* Coffee liquid surface inside mug */}
          <mesh position={[0, 0.038, 0]}>
            <circleGeometry args={[0.038, 16]} />
            <meshStandardMaterial color="#2c1d11" roughness={0.15} />
          </mesh>
        </group>

        {/* Drafting Sketchbook & Precision Pen */}
        <mesh position={[-0.45, 0.50, 0.22]} rotation={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.24, 0.015, 0.32]} />
          <meshStandardMaterial color="#ded7cc" roughness={0.8} />
        </mesh>
        <mesh position={[-0.24, 0.51, 0.22]} rotation={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.16, 12]} />
          <meshStandardMaterial color="#1a1918" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Minimalist Architect Task Lamp */}
        <group position={[-1.25, 0.65, -0.4]}>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.015, 16]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <mesh position={[0.05, 0.08, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.01, 0.01, 0.45, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0.2, 0.28, 0]} rotation={[0, 0, 0.8]}>
            <coneGeometry args={[0.06, 0.12, 16]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <pointLight position={[0.22, 0.24, 0]} color="#fff8ee" intensity={0.8} distance={2.5} />
        </group>

        {/* Background Designer Display Monitor */}
        <group position={[0.95, 0.74, -0.18]}>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.28, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.27, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.015, 16]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.85, 0.50, 0.03]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
        </group>

        {/* Minimalist Studio Chair */}
        <group position={[0, 0.32, 0.95]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.55, 0.06, 0.52]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.52, 0.24]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[0.5, 0.62, 0.06]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.42, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
        </group>

        {/* ============================================================ */}
        {/* HIGH-FIDELITY 3D LAPTOP (THE PORTAL FOR STATES 04 & 05) */}
        {/* ============================================================ */}
        <group position={[0, 0.49, 0]}>
          {/* Aluminum Laptop Base Chassis */}
          <mesh position={[0, 0.008, 0.08]} castShadow>
            <boxGeometry args={[0.54, 0.014, 0.38]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>

          {/* Chiclet Keyboard Recess */}
          <mesh position={[0, 0.016, 0.06]}>
            <boxGeometry args={[0.44, 0.002, 0.19]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>

          {/* Glass Precision Trackpad */}
          <mesh position={[0, 0.016, 0.21]}>
            <boxGeometry args={[0.16, 0.001, 0.1]} />
            <meshStandardMaterial color="#bebebe" roughness={0.25} metalness={0.7} />
          </mesh>

          {/* Laptop Display Lid with Hinge Pivot (Tilted back ~105 degrees) */}
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

              {/* GLOWING LAPTOP SCREEN DISPLAY (The portal into Aurora) */}
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
