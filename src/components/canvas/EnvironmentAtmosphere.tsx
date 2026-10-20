import { useRef } from 'react';
import * as THREE from 'three';

export function EnvironmentAtmosphere() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Background color and atmospheric depth fog */}
      <color attach="background" args={['#f6f2ea']} />
      <fog attach="fog" args={['#f6f2ea', 12, 75]} />

      {/* Ambient & Hemisphere Lighting */}
      <ambientLight color="#fff8ee" intensity={0.8} />
      <hemisphereLight
        args={['#fffbf2', '#dcd4c6', 0.85]}
      />

      {/* Main Warm Directional Sunlight */}
      <directionalLight
        ref={dirLightRef}
        position={[18, 24, 14]}
        intensity={1.8}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />

      {/* Soft Secondary Sunlight for architectural rim highlights */}
      <directionalLight
        position={[-12, 10, -10]}
        intensity={0.65}
        color="#ede7dc"
      />

      {/* Distant Mountain Silhouettes on Horizon */}
      <group position={[0, -0.6, -45]}>
        <mesh position={[-25, 6, 0]}>
          <coneGeometry args={[18, 14, 16]} />
          <meshBasicMaterial color="#e2dacf" />
        </mesh>
        <mesh position={[20, 8, -5]}>
          <coneGeometry args={[22, 18, 16]} />
          <meshBasicMaterial color="#dfd6c8" />
        </mesh>
        <mesh position={[0, 10, -15]}>
          <coneGeometry args={[32, 22, 16]} />
          <meshBasicMaterial color="#dcd2c4" />
        </mesh>
      </group>
    </>
  );
}
