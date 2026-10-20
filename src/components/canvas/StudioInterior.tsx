import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function StudioInterior() {
  const studioPlate = useTexture('/scenes/state_03_inside_studio.jpg');
  const deskPlate = useTexture('/scenes/state_04_a_project.jpg');
  const laptopScreenTex = useTexture('/scenes/laptop_screen_content.jpg');
  const limestoneBump = useTexture('/textures/limestone_bump.png');

  // Materials
  const woodMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#baa68c',
      roughness: 0.55,
      metalness: 0.05
    });
  }, []);

  const aluminumMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#d4d4d4',
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

  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ded6c9',
      roughness: 0.88,
      metalness: 0.05,
      bumpMap: limestoneBump,
      bumpScale: 0.03
    });
  }, [limestoneBump]);

  return (
    <group position={[0, 0, -16.0]}>
      {/* Studio Interior Architectural Backdrop (State 03 Environment) */}
      <mesh position={[0, 2.2, -5.2]}>
        <planeGeometry args={[16, 10]} />
        <meshBasicMaterial map={studioPlate} toneMapped={false} />
      </mesh>

      {/* Studio Polished Floor */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <boxGeometry args={[14, 0.2, 12]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Close-Up Desk Architectural Backdrop for State 04 Transition */}
      <mesh position={[0, 0.8, -1.8]}>
        <planeGeometry args={[5.2, 3.4]} />
        <meshBasicMaterial map={deskPlate} toneMapped={false} />
      </mesh>

      {/* PHYSICAL WORKSTATION DESK */}
      <group position={[0, 0.05, 0]}>
        {/* Wood Tabletop */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.08, 1.8]} />
          <primitive object={woodMat} attach="material" />
        </mesh>

        {/* Desk Pedestals */}
        <mesh position={[-1.5, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.5]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[1.5, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.5]} />
          <primitive object={woodMat} attach="material" />
        </mesh>

        {/* Ceramic Mug */}
        <mesh position={[-0.85, 0.54, 0.2]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.09, 24]} />
          <meshStandardMaterial color="#ebe6de" roughness={0.35} />
        </mesh>

        {/* Drafting Pen & Notebook */}
        <mesh position={[-0.45, 0.5, 0.25]} rotation={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.22, 0.015, 0.32]} />
          <meshStandardMaterial color="#ded7cc" roughness={0.8} />
        </mesh>
        <mesh position={[-0.25, 0.51, 0.25]} rotation={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.16, 12]} />
          <meshStandardMaterial color="#1a1918" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 3D LAPTOP (PORTAL DESTINATION FOR STATE 04 & 05) */}
        <group position={[0, 0.49, 0]}>
          {/* Laptop Base (Chassis) */}
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
