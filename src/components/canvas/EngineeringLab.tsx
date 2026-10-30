import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function EngineeringLab() {
  const codeScreenTex = useTexture('/screens/code_screen.jpg');
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    codeScreenTex.colorSpace = THREE.SRGBColorSpace;
    codeScreenTex.generateMipmaps = true;

    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 3);
      t.anisotropy = 16;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [codeScreenTex, limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneFloorMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.3, 0.3),
      color: '#F4F1E9',
      roughness: 0.8
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const aluminumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#D6D6D6', roughness: 0.28, metalness: 0.88 }), []);
  const darkAlumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1E201E', roughness: 0.35, metalness: 0.7 }), []);
  const champagneBronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.25, metalness: 0.85 }), []);

  return (
    <group position={[0, 0, -18.0]}>
      {/* ============================================================ */}
      {/* CHAPTER 05: WING D — THE ENGINEERING LAB (Z = -18.0 to -24.0) */}
      {/* ============================================================ */}

      {/* Engineering Floor */}
      <mesh position={[0, 0.28, -2.8]} receiveShadow>
        <boxGeometry args={[14, 0.2, 9]} />
        <primitive object={limestoneFloorMat} attach="material" />
      </mesh>

      {/* Industrial Server Rack Enclosure in Background */}
      <group position={[4.8, 1.8, -3.2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 3.0, 1.4]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        {/* Blinking green / amber status LEDs */}
        <mesh position={[-0.61, 0.6, 0]}>
          <planeGeometry args={[0.02, 1.8]} />
          <meshBasicMaterial color="#27C93F" />
        </mesh>
        <mesh position={[-0.61, -0.4, 0]}>
          <planeGeometry args={[0.02, 0.8]} />
          <meshBasicMaterial color="#B69A70" />
        </mesh>
      </group>

      {/* Left Wall Architecture Schema Board */}
      <group position={[-5.0, 1.8, -2.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.4, 1.8, 0.05]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[3.3, 1.7]} />
          <meshStandardMaterial color="#FAF9F6" roughness={0.4} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* DEVELOPER COCKPIT WORKBENCH & DUAL DISPLAYS (NO PEOPLE) */}
      {/* ============================================================ */}
      <group position={[-0.4, 0.38, -4.5]}>
        {/* Matte Charcoal Engineering Desk */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.06, 1.6]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[-1.6, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.4]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[1.6, 0.22, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 1.4]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>

        {/* Vertical Side Monitor (Documentation / API Specs) */}
        <group position={[1.2, 0.86, -0.1]} rotation={[0, -0.3, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.32, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.55, 0.95, 0.03]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.1, 0.02]}>
            <planeGeometry args={[0.51, 0.91]} />
            <meshStandardMaterial color="#FAF9F6" roughness={0.5} />
          </mesh>
        </group>

        {/* Mechanical Keyboard & Trackball */}
        <mesh position={[0, 0.49, 0.35]} castShadow>
          <boxGeometry args={[0.42, 0.02, 0.14]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[0.32, 0.49, 0.35]} castShadow>
          <boxGeometry args={[0.08, 0.02, 0.12]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>

        {/* ============================================================ */}
        {/* MAIN CODE REPOSITORY 4K MONITOR (The Nested Zoom Target) */}
        {/* Displays Syntax-Highlighted TypeScript & Terminal at Z = -23.5 in world */}
        {/* ============================================================ */}
        <group position={[0, 0.82, -0.1]}>
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.015, 20]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.1, -0.04]}>
            <cylinderGeometry args={[0.02, 0.02, 0.32, 12]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>

          {/* Monitor Enclosure */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[1.72, 0.96, 0.04]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          {/* Champagne Accent Lintel Trim */}
          <mesh position={[0, 0.64, 0]}>
            <boxGeometry args={[1.72, 0.02, 0.05]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
          {/* Main IDE Screen Display Mesh */}
          <mesh position={[0, 0.15, 0.026]}>
            <planeGeometry args={[1.66, 0.90]} />
            <meshBasicMaterial map={codeScreenTex} toneMapped={false} />
          </mesh>
          <pointLight position={[0, 0.15, 0.5]} color="#27C93F" intensity={1.1} distance={3.5} />
        </group>
      </group>
    </group>
  );
}
