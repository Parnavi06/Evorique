import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function AtmosphericLighting() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  // Focus directional sunlight shadow map directly onto the hero portal installation
  const lightTarget = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(0, 2.0, 16.0);
    return obj;
  }, []);

  return (
    <>
      <primitive object={lightTarget} />

      {/* Primary Warm Ivory Background & Fog */}
      <color attach="background" args={['#F4F1EA']} />
      <fog attach="fog" args={['#F4F1EA', 20, 85]} />

      {/* Ambient & Hemisphere Lighting */}
      <ambientLight color="#FAF8F5" intensity={0.88} />
      <hemisphereLight args={['#FAF8F5', '#E5E0D6', 0.82]} />

      {/* Primary Warm Architectural Sunlight */}
      <directionalLight
        ref={dirLightRef}
        target={lightTarget}
        position={[22, 32, 24]}
        intensity={2.3}
        color="#FFF7EA"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={90}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-bias={-0.0001}
      />

      {/* Soft Architectural Fill Light from opposite direction */}
      <directionalLight
        position={[-20, 16, -10]}
        intensity={0.45}
        color="#E5E0D6"
      />
    </>
  );
}
