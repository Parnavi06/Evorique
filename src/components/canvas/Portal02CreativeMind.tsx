import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Portal02CreativeMind() {
  const armillaryRef = useRef<THREE.Group>(null);
  const armillaryInnerRef = useRef<THREE.Group>(null);

  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.3, 0.3),
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

  const bronzeMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B69A70',
      roughness: 0.25,
      metalness: 0.88
    });
  }, []);

  const glassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FAF8F5',
      transmission: 0.9,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      thickness: 0.25
    });
  }, []);

  useFrame((_, delta) => {
    if (armillaryRef.current) {
      armillaryRef.current.rotation.y += delta * 0.12;
    }
    if (armillaryInnerRef.current) {
      armillaryInnerRef.current.rotation.x += delta * 0.16;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Sanctuary Base Floor (Z = 12 to -4) */}
      <mesh position={[0, -0.3, 4]} receiveShadow>
        <boxGeometry args={[22, 0.6, 18]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Symmetrical Flanking Colonnade of Vaulted Arches */}
      {[-7, 7].map((x, colIdx) => (
        <group key={colIdx}>
          {[10, 6, 2, -2].map((z, rowIdx) => (
            <group key={rowIdx} position={[x, 2.8, z]}>
              {/* Slender Limestone Column */}
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.35, 0.45, 6.2, 16]} />
                <primitive object={limestoneMat} attach="material" />
              </mesh>
              {/* Capital & Architrave Block */}
              <mesh position={[0, 3.2, 0]} castShadow>
                <boxGeometry args={[1.2, 0.4, 1.2]} />
                <primitive object={travertineMat} attach="material" />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Floating Escher-esque Geometric Staircases */}
      <group position={[-3.8, 1.5, 6]} rotation={[0, 0.35, 0.2]}>
        {[0, 1, 2, 3, 4].map((step) => (
          <mesh key={step} position={[0, step * 0.22, step * 0.45]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.15, 0.45]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
        ))}
      </group>

      <group position={[3.8, 2.2, 2]} rotation={[0, -0.35, -0.2]}>
        {[0, 1, 2, 3, 4].map((step) => (
          <mesh key={step} position={[0, step * 0.22, -step * 0.45]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.15, 0.45]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Suspended Brass Armillary Sphere (Symbol of Creative Architecture) */}
      <group position={[0, 4.2, 3.5]}>
        {/* Fine Suspended Cable */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 3.6, 8]} />
          <primitive object={bronzeMat} attach="material" />
        </mesh>
        {/* Outer Gyro Ring */}
        <group ref={armillaryRef}>
          <mesh>
            <torusGeometry args={[1.2, 0.04, 16, 36]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
          {/* Inner Gyro Ring */}
          <group ref={armillaryInnerRef}>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.9, 0.035, 16, 32]} />
              <primitive object={bronzeMat} attach="material" />
            </mesh>
            {/* Luminous Core Sphere */}
            <mesh>
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshBasicMaterial color="#FFF5E4" />
            </mesh>
          </group>
        </group>
        <pointLight position={[0, 0, 0]} color="#FFF2DC" intensity={1.8} distance={6} />
      </group>

      {/* 2. THE CONSERVATORY ROTUNDA PORTAL (Z = -4.0) */}
      <group position={[0, 2.8, -4.0]}>
        {/* Arched Rotunda Portal Frame */}
        <mesh position={[-2.4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 6.2, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[2.4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 6.2, 1.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 3.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.0, 0.8, 1.4]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Conservatory Glazed Rotunda Dome */}
        <mesh position={[0, 1.2, -0.4]}>
          <planeGeometry args={[3.6, 4.8]} />
          <primitive object={glassMat} attach="material" />
        </mesh>

        {/* Bronze Arched Aperture Trim */}
        <mesh position={[0, 1.8, -0.35]}>
          <torusGeometry args={[1.8, 0.04, 16, 32, Math.PI]} />
          <primitive object={bronzeMat} attach="material" />
        </mesh>

        {/* Luminous Portal Core into Environment 03 */}
        <pointLight position={[0, 1.5, -0.8]} color="#FFF8EC" intensity={2.2} distance={8} />
      </group>
    </group>
  );
}
