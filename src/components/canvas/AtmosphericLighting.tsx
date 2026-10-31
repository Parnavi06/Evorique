import { useRef, useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function AtmosphericLighting() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const { gl, scene } = useThree();

  // Load photorealistic master architectural scene as the PBR radiance environment map (IBL)
  const envTexture = useTexture('/scenes/state_01_the_mark.jpg');

  useEffect(() => {
    if (!envTexture) return;
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;

    return () => {
      pmremGenerator.dispose();
      envMap.dispose();
    };
  }, [envTexture, gl, scene]);

  // Focus directional sunlight shadow map directly onto the hero portal installation
  const lightTarget = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(0, 2.0, 16.0);
    return obj;
  }, []);

  return (
    <>
      <primitive object={lightTarget} />

      {/* Primary Warm Ivory Fog with deep natural aerial perspective */}
      <color attach="background" args={['#F4F1EA']} />
      <fog attach="fog" args={['#F4F1EA', 50, 160]} />

      {/* Ambient & Natural Atmospheric Hemisphere Lighting */}
      <ambientLight color="#FFF8EF" intensity={0.75} />
      <hemisphereLight args={['#FFF8F0', '#DDD7CD', 0.85]} />

      {/* Primary Warm Directional Sunlight with sharp contact shadows */}
      <directionalLight
        ref={dirLightRef}
        target={lightTarget}
        position={[22, 32, 24]}
        intensity={2.4}
        color="#FFF6EA"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={95}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-bias={-0.0001}
      />

      {/* Soft Architectural Fill Light from opposite direction */}
      <directionalLight
        position={[-20, 16, -10]}
        intensity={0.4}
        color="#E5DFC9"
      />
    </>
  );
}
