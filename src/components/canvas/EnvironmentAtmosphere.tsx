import { useRef } from 'react';
import * as THREE from 'three';

export function EnvironmentAtmosphere() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Background warm ivory sky color and atmospheric depth haze */}
      <color attach="background" args={['#f6f1e8']} />
      <fog attach="fog" args={['#f6f1e8', 14, 85]} />

      {/* Soft Ambient & Hemisphere Lighting */}
      <ambientLight color="#fff8ee" intensity={0.85} />
      <hemisphereLight args={['#fffdf7', '#ded5c5', 0.9]} />

      {/* Main Warm Directional Sunlight */}
      <directionalLight
        ref={dirLightRef}
        position={[16, 26, 12]}
        intensity={2.0}
        color="#fff4df"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={85}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-bias={-0.0001}
      />

      {/* Gentle Rim Fill Light */}
      <directionalLight
        position={[-14, 12, -8]}
        intensity={0.6}
        color="#ede6db"
      />

      {/* Distant Sculptural Horizon Mountain Ridges in Soft Atmosphere */}
      <group position={[0, -0.6, -55]}>
        {/* Soft Ridge West */}
        <mesh position={[-28, 4.5, 0]}>
          <cylinderGeometry args={[22, 28, 8, 32]} />
          <meshBasicMaterial color="#e5ded3" />
        </mesh>
        {/* Soft Ridge East */}
        <mesh position={[26, 5.5, -4]}>
          <cylinderGeometry args={[24, 30, 10, 32]} />
          <meshBasicMaterial color="#dfd7cb" />
        </mesh>
        {/* Central Distant Ridge */}
        <mesh position={[0, 7.0, -12]}>
          <cylinderGeometry args={[34, 40, 12, 32]} />
          <meshBasicMaterial color="#dcd4c7" />
        </mesh>
      </group>
    </>
  );
}
