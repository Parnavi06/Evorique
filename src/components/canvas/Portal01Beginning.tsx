import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Portal01Beginning() {
  const innerRingRef = useRef<THREE.Group>(null);

  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.anisotropy = 16;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#F4F1EA',
      roughness: 0.82,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const travertineMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      color: '#E5E0D6',
      roughness: 0.85,
      metalness: 0.04
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const champagneBronzeMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B69A70',
      roughness: 0.28,
      metalness: 0.85
    });
  }, []);

  const waterMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4A7F79',
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92
    });
  }, []);

  const foliageMat1 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#526650', roughness: 0.9 }), []);
  const foliageMat2 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3E4F3C', roughness: 0.92 }), []);

  useFrame((_, delta) => {
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Travertine Arrival Podium (Z = 20 to 28) */}
      <mesh position={[0, -0.3, 22]} receiveShadow>
        <boxGeometry args={[26, 0.6, 16]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Stepped Terraces Leading up to Portal (Z = 16 to 20) */}
      {[0, 1, 2, 3].map((step) => (
        <mesh key={step} position={[0, -0.15 + step * 0.12, 19 - step * 1.0]} receiveShadow>
          <boxGeometry args={[14 - step * 0.6, 0.16, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      ))}

      {/* Flanking Reflecting Water Basins */}
      {[-8.5, 8.5].map((x, i) => (
        <group key={i} position={[x, -0.1, 21]}>
          <mesh receiveShadow>
            <boxGeometry args={[6.5, 0.4, 12]} />
            <primitive object={travertineMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[5.8, 11.2]} />
            <primitive object={waterMat} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Symmetrical Cypress Planters */}
      {[-5.2, 5.2].map((x, i) => (
        <group key={i} position={[x, 0.1, 17]}>
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.5, 1.0]} />
            <primitive object={travertineMat} attach="material" />
          </mesh>
          <mesh position={[0, 1.1, 0]} castShadow>
            <coneGeometry args={[0.38, 1.4, 14]} />
            <primitive object={foliageMat1} attach="material" />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <coneGeometry args={[0.26, 1.1, 12]} />
            <primitive object={foliageMat2} attach="material" />
          </mesh>
        </group>
      ))}

      {/* 2. THE COLOSSAL CIRCULAR LIMESTONE PORTAL (Z = 14.0) */}
      <group position={[0, 2.8, 14.0]}>
        {/* Main Monolithic Stone Ring */}
        <mesh castShadow receiveShadow>
          {/* Torus / Ring geometry: radius 2.6, tube 0.8 */}
          <torusGeometry args={[2.6, 0.85, 24, 48]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Portal Pedestal Base Flanks */}
        <mesh position={[-2.8, -2.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.8, 1.4]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        <mesh position={[2.8, -2.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.8, 1.4]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Floating Concentric Bronze Ring with subtle rotation */}
        <group ref={innerRingRef} position={[0, 0, 0.1]}>
          <mesh>
            <torusGeometry args={[1.9, 0.05, 16, 40]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
          {/* Four radial bronze markers */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, idx) => (
            <mesh key={idx} rotation={[0, 0, rot]} position={[0, 0, 0]}>
              <boxGeometry args={[0.06, 0.35, 0.06]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Luminous Core Light inviting the camera into the portal */}
        <pointLight position={[0, 0, -0.6]} color="#FFF2DC" intensity={2.4} distance={9} />

        {/* Subtle Brand Inscription Plaque above the portal */}
        <group position={[0, 3.8, 0.2]}>
          <mesh>
            <boxGeometry args={[3.4, 0.4, 0.06]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
