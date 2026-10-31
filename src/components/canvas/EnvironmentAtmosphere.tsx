import { useRef } from 'react';
import * as THREE from 'three';

export function EnvironmentAtmosphere() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Primary Ivory Sky & Atmospheric Haze */}
      <color attach="background" args={['#F4F1E9']} />
      <fog attach="fog" args={['#F4F1E9', 32, 135]} />

      {/* Daylight Ambient & Hemisphere Lighting */}
      <ambientLight color="#FAF9F6" intensity={0.85} />
      <hemisphereLight args={['#FAF9F6', '#E8E7E0', 0.85]} />

      {/* Key Sunlight (Warm Natural Daylight) */}
      <directionalLight
        ref={dirLightRef}
        position={[26, 32, 18]}
        intensity={2.3}
        color="#FFF4DF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={130}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={35}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0001}
      />

      {/* Gentle Secondary Architectural Rim Light */}
      <directionalLight
        position={[-18, 16, -12]}
        intensity={0.55}
        color="#E8E7E0"
      />

      {/* Warm Horizon Fill */}
      <directionalLight
        position={[0, 4, -45]}
        intensity={0.4}
        color="#FAF9F6"
      />

      {/* DISTANT CAMPUS LANDSCAPE & HILLS (Subtle Architectural Horizon) */}
      <group position={[0, -0.6, -75]}>
        {/* Layer 3 - Distant Soft Horizon Ridge */}
        <mesh position={[0, 10, -25]}>
          <planeGeometry args={[160, 28]} />
          <meshBasicMaterial color="#E8E7E0" transparent opacity={0.65} />
        </mesh>

        {/* Layer 2 - Gentle Geometric Terraces */}
        <group position={[0, 4, -12]}>
          {[-50, -25, 0, 25, 50].map((x, i) => (
            <mesh key={i} position={[x, 3.2 + (i % 3) * 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[18 + i * 2, 18 + i * 2, 2]} />
              <meshBasicMaterial color="#DFD7CB" />
            </mesh>
          ))}
        </group>

        {/* Layer 1 - Landscaped Campus Foothills */}
        <group position={[0, 0, 0]}>
          {[-42, -18, 18, 42].map((x, i) => (
            <mesh key={i} position={[x, 1.8 + (i % 2) * 1.0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[14 + i * 2, 14 + i * 2, 2]} />
              <meshBasicMaterial color="#D6CEBF" />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}
