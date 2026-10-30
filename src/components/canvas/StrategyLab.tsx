import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function StrategyLab() {
  const strategyScreenTex = useTexture('/screens/strategy_screen.jpg');
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    strategyScreenTex.colorSpace = THREE.SRGBColorSpace;
    strategyScreenTex.generateMipmaps = true;

    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 3);
      t.anisotropy = 16;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [strategyScreenTex, limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#F4F1E9',
      roughness: 0.82
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const darkAlumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#252824', roughness: 0.35, metalness: 0.7 }), []);
  const champagneBronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.25, metalness: 0.85 }), []);
  const frostedGlassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FAF9F6',
      transmission: 0.82,
      opacity: 1,
      transparent: true,
      roughness: 0.28,
      ior: 1.48,
      thickness: 0.3
    });
  }, []);

  return (
    <group position={[0, 0, -4.5]}>
      {/* ============================================================ */}
      {/* CHAPTER 03: WING B — THE STRATEGY LAB (Z = -4.5 to -8.5) */}
      {/* ============================================================ */}

      {/* Lab Limestone Flooring */}
      <mesh position={[0, 0.28, -2.0]} receiveShadow>
        <boxGeometry args={[13.5, 0.2, 8.0]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Acoustic Baffle Ceiling Panels */}
      {[-3.5, -2.0, -0.5].map((z, i) => (
        <mesh key={i} position={[0, 3.4, z]}>
          <boxGeometry args={[11.5, 0.08, 0.8]} />
          <meshStandardMaterial color="#E8E7E0" roughness={0.9} />
        </mesh>
      ))}

      {/* Freestanding Frosted Glass Discovery Whiteboard (Left) */}
      <group position={[-3.8, 1.5, -1.8]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 2.2, 3.2]} />
          <primitive object={frostedGlassMat} attach="material" />
        </mesh>
        {/* Bronze stand feet */}
        <mesh position={[0, -1.1, -1.2]}>
          <boxGeometry args={[0.4, 0.06, 0.06]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
        <mesh position={[0, -1.1, 1.2]}>
          <boxGeometry args={[0.4, 0.06, 0.06]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
      </group>

      {/* Wall-Mounted Research Telemetry Screen (Right) */}
      <group position={[4.5, 1.8, -1.8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 1.8, 0.05]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[3.1, 1.7]} />
          <meshStandardMaterial color="#FAF9F6" roughness={0.4} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* CENTRAL USER JOURNEY & IA WALL DISPLAY (The Zoom Target) */}
      {/* Positioned at Z = -3.5 in local space (Z = -8.0 in world space) */}
      {/* ============================================================ */}
      <group position={[0.5, 1.7, -3.5]}>
        <mesh position={[0, 0, -0.05]} castShadow>
          <boxGeometry args={[4.6, 2.5, 0.08]} />
          <primitive object={darkAlumMat} attach="material" />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[4.48, 2.44, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
        {/* Strategy Screen showing User Journey & Information Architecture */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[4.4, 2.36]} />
          <meshBasicMaterial map={strategyScreenTex} toneMapped={false} />
        </mesh>
        {/* Ambient Display Halo */}
        <pointLight position={[0, 0, 0.5]} color="#FAF9F6" intensity={1.4} distance={6} />
      </group>
    </group>
  );
}
