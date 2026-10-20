import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function LimestoneRing() {
  const limestoneBump = useTexture('/textures/limestone_bump.png');
  const heroPlate = useTexture('/scenes/state_01_the_mark.jpg');
  const thinkingPlate = useTexture('/scenes/state_02_the_thinking.jpg');

  limestoneBump.wrapS = THREE.RepeatWrapping;
  limestoneBump.wrapT = THREE.RepeatWrapping;
  limestoneBump.repeat.set(4, 4);

  // Common limestone material
  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#d6cec2',
      roughness: 0.88,
      metalness: 0.05,
      bumpMap: limestoneBump,
      bumpScale: 0.03
    });
  }, [limestoneBump]);

  const darkFigureMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#262422',
      roughness: 0.9,
      metalness: 0.1
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* High-Fidelity Distant Architectural Panorama Backdrop for State 01 */}
      <group position={[0, 4.5, -28]}>
        <mesh>
          <planeGeometry args={[44, 26]} />
          <meshBasicMaterial map={heroPlate} toneMapped={false} />
        </mesh>
      </group>

      {/* Main Island Platform */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[12, 14, 0.8, 48]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Stepped Concentric Terraces */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[8.0, 8.8, 0.25, 48]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <cylinderGeometry args={[5.0, 5.6, 0.2, 48]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* THE 3D LIMESTONE RING ("The Mark") */}
      <group position={[0, 1.85, 0]} castShadow receiveShadow>
        {/* Ring Torus */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[2.0, 0.36, 32, 64]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Ring Base Supports */}
        <mesh position={[-1.7, -1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.7, 0.8]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[1.7, -1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.7, 0.8]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      </group>

      {/* Silhouette Figure Standing in Front of the Mark */}
      <group position={[0, 0.45, 1.35]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.08, 0.14, 0.55, 16]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        <mesh position={[-0.045, 0.08, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
        <mesh position={[0.045, 0.08, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
          <primitive object={darkFigureMat} attach="material" />
        </mesh>
      </group>

      {/* STATE 02: INNER COURTYARD (Nested directly through the ring at Z = -4.5) */}
      <group position={[0, 1.5, -4.5]}>
        {/* Photographic plate of State 02 inner courtyard framing the vista */}
        <mesh position={[0, 0.5, -1.2]}>
          <planeGeometry args={[14, 9]} />
          <meshBasicMaterial map={thinkingPlate} toneMapped={false} />
        </mesh>

        {/* Physical Courtyard Stone Walkway */}
        <mesh position={[0, -1.35, 0]} receiveShadow>
          <boxGeometry args={[6.5, 0.3, 8.0]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Colonnade Side Flanks */}
        <mesh position={[-3.0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 3.8, 7.5]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[3.0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 3.8, 7.5]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
