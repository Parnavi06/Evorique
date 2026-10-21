import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ContactDestinationProps {
  visible: boolean;
}

export function ContactDestination({ visible }: ContactDestinationProps) {
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#f4ede4',
      roughness: 0.85,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneTrimMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.45, 0.45),
      color: '#ded4c5',
      roughness: 0.88,
      metalness: 0.03
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const darkFigureMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#242220',
      roughness: 0.9
    });
  }, []);

  const sunGlowMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#fff5e0',
      transparent: true,
      opacity: 0.95
    });
  }, []);

  if (!visible) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Stone Pier jutting into reflective water */}
      <mesh position={[0, -0.42, 0]} receiveShadow>
        <cylinderGeometry args={[5.2, 5.8, 0.7, 48]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.6, 0.25, 48]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Low Pier Parapet Walls */}
      <mesh position={[-3.6, 0.2, 0]} receiveShadow>
        <boxGeometry args={[0.3, 0.45, 5.0]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>
      <mesh position={[3.6, 0.2, 0]} receiveShadow>
        <boxGeometry args={[0.3, 0.45, 5.0]} />
        <primitive object={limestoneTrimMat} attach="material" />
      </mesh>

      {/* THE MONUMENTAL ARCHED SUN PORTAL GATEWAY */}
      <group position={[0, 0.1, 0]}>
        {/* Left Column */}
        <mesh position={[-1.5, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 3.0, 0.85]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        {/* Right Column */}
        <mesh position={[1.5, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 3.0, 0.85]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Overhead Semicircular Limestone Arch Cap */}
        <group position={[0, 3.0, 0]}>
          <mesh rotation={[0, 0, Math.PI]} castShadow receiveShadow>
            <torusGeometry args={[1.5, 0.45, 16, 32, Math.PI]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
        </group>

        {/* Silhouette Figure Standing Beneath the Arch */}
        <group position={[0, 0.1, 0.2]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.72, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <primitive object={darkFigureMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.08, 0.13, 0.55, 16]} />
            <primitive object={darkFigureMat} attach="material" />
          </mesh>
          <mesh position={[-0.045, 0.08, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.22, 10]} />
            <primitive object={darkFigureMat} attach="material" />
          </mesh>
          <mesh position={[0.045, 0.08, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.22, 10]} />
            <primitive object={darkFigureMat} attach="material" />
          </mesh>
        </group>

        {/* RISING SUN BEAMING DIRECTLY THROUGH THE ARCHWAY */}
        <group position={[0, 2.0, -8.0]}>
          {/* Radiant Sun Disk */}
          <mesh>
            <circleGeometry args={[1.4, 32]} />
            <primitive object={sunGlowMat} attach="material" />
          </mesh>
          {/* Warm Corona Halo */}
          <mesh position={[0, 0, -0.05]}>
            <circleGeometry args={[3.8, 32]} />
            <meshBasicMaterial color="#ffeed4" transparent opacity={0.35} />
          </mesh>
          {/* Intense Sunlight Illuminating the Scene & Water */}
          <pointLight color="#fff0d0" intensity={4.0} distance={30} />
        </group>
      </group>
    </group>
  );
}
