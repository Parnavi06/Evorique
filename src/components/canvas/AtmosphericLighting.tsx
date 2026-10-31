import { useRef } from 'react';
import * as THREE from 'three';

export function AtmosphericLighting() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Primary Warm Ivory Background & Fog */}
      <color attach="background" args={['#F4F1EA']} />
      <fog attach="fog" args={['#F4F1EA', 20, 85]} />

      {/* Ambient & Hemisphere Lighting */}
      <ambientLight color="#FAF8F5" intensity={0.9} />
      <hemisphereLight args={['#FAF8F5', '#E5E0D6', 0.8]} />

      {/* Primary Warm Sunlight */}
      <directionalLight
        ref={dirLightRef}
        position={[24, 34, 18]}
        intensity={2.2}
        color="#FFF6E8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0001}
      />

      {/* Soft Fill Light from opposite direction */}
      <directionalLight
        position={[-18, 14, -10]}
        intensity={0.5}
        color="#E5E0D6"
      />
    </>
  );
}
