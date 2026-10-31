import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Portal06Destination() {
  const sunDiscRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  const limestoneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#F4F1EA', roughness: 0.8 }), []);
  const travertineMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#E5E0D6', roughness: 0.85 }), []);
  const bronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.28, metalness: 0.85 }), []);
  const waterMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#4B7E79',
    roughness: 0.08,
    metalness: 0.2,
    transparent: true,
    opacity: 0.94
  }), []);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Coastal Promontory Terrace (Z = -60 to -78) */}
      <mesh position={[0, -0.3, -69]} receiveShadow>
        <boxGeometry args={[22, 0.5, 18]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Flanking Water Expanses */}
      <mesh position={[0, -0.2, -75]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 60]} />
        <primitive object={waterMat} attach="material" />
      </mesh>

      {/* 2. THE MONUMENTAL HORIZON ARCH (Z = -76.0) */}
      <group position={[0, 3.2, -76.0]}>
        {/* Left Pylon */}
        <mesh position={[-2.8, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 7.2, 1.6]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Right Pylon */}
        <mesh position={[2.8, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 7.2, 1.6]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Upper Arch Beam */}
        <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 1.2, 1.8]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Bronze Arch Rim */}
        <group ref={ringRef} position={[0, 1.2, 0.1]}>
          <mesh>
            <torusGeometry args={[2.0, 0.04, 16, 40]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </group>

        {/* The Golden Horizon Sun Disc Framed in the Arch */}
        <mesh ref={sunDiscRef} position={[0, 1.2, -8.0]}>
          <circleGeometry args={[2.4, 32]} />
          <meshBasicMaterial color="#FFE6B6" />
        </mesh>
        <pointLight position={[0, 1.2, -7.0]} color="#FFE8C0" intensity={2.8} distance={25} />
      </group>
    </group>
  );
}
