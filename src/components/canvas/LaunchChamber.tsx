import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function LaunchChamber() {
  const laptopScreenTex = useTexture('/scenes/laptop_screen_content.jpg');
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);

  useMemo(() => {
    laptopScreenTex.colorSpace = THREE.SRGBColorSpace;
    laptopScreenTex.generateMipmaps = true;

    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 3);
      t.anisotropy = 16;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;
  }, [laptopScreenTex, limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#F4F1E9',
      roughness: 0.8
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const champagneBronzeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B69A70', roughness: 0.22, metalness: 0.88 }), []);
  const aluminumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#D6D6D6', roughness: 0.28, metalness: 0.88 }), []);
  const darkAlumMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1E201E', roughness: 0.35, metalness: 0.7 }), []);

  return (
    <group position={[0, 0, -33.0]}>
      {/* ============================================================ */}
      {/* CHAPTER 07: WING F — THE LAUNCH CHAMBER (Z = -33.0 to -40.0) */}
      {/* ============================================================ */}

      {/* Pavilion Limestone Floor */}
      <mesh position={[0, 0.28, -3.5]} receiveShadow>
        <boxGeometry args={[15, 0.2, 10]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Vaulted Monumental Arch Overhead */}
      <group position={[0, 3.6, -3.0]}>
        <mesh rotation={[0, 0, Math.PI]} castShadow receiveShadow>
          <torusGeometry args={[4.6, 0.55, 16, 32, Math.PI]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      </group>

      {/* Champagne Accent Ring on Rear Wall */}
      <group position={[0, 2.4, -6.5]}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[3.2, 0.12, 16, 48]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
        <pointLight position={[0, 0, 0.5]} color="#FFF4DF" intensity={2.4} distance={10} />
      </group>

      {/* ============================================================ */}
      {/* CENTRAL MONOLITHIC PRODUCT PRESENTATION PEDESTAL (NO PEOPLE) */}
      {/* ============================================================ */}
      <group position={[0, 0.38, -4.5]}>
        {/* Tiered Travertine Display Plinth */}
        <mesh position={[0, 0.22, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.6, 0.44, 2.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.46, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.2, 0.08, 1.8]} />
          <meshStandardMaterial color="#FAF9F6" roughness={0.4} />
        </mesh>
        {/* Champagne Bronze Inset Trim */}
        <mesh position={[0, 0.43, 0]}>
          <boxGeometry args={[3.35, 0.02, 1.95]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* 1. Main Showcase Laptop running Aurora (Center) */}
        <group position={[0, 0.51, 0.1]}>
          {/* Base */}
          <mesh position={[0, 0.008, 0.08]} castShadow>
            <boxGeometry args={[0.54, 0.014, 0.38]} />
            <primitive object={aluminumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.016, 0.06]}>
            <boxGeometry args={[0.44, 0.002, 0.19]} />
            <primitive object={darkAlumMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.016, 0.21]}>
            <boxGeometry args={[0.16, 0.001, 0.1]} />
            <meshStandardMaterial color="#BEBEBE" roughness={0.25} metalness={0.7} />
          </mesh>

          {/* Tilted Screen */}
          <group position={[0, 0.015, -0.1]}>
            <group rotation={[-0.22, 0, 0]}>
              <mesh position={[0, 0.18, 0]} castShadow>
                <boxGeometry args={[0.54, 0.36, 0.012]} />
                <primitive object={aluminumMat} attach="material" />
              </mesh>
              <mesh position={[0, 0.18, 0.0065]}>
                <boxGeometry args={[0.53, 0.35, 0.002]} />
                <primitive object={darkAlumMat} attach="material" />
              </mesh>
              <mesh position={[0, 0.18, 0.0085]}>
                <planeGeometry args={[0.50, 0.32]} />
                <meshBasicMaterial map={laptopScreenTex} toneMapped={false} />
              </mesh>
            </group>
          </group>
        </group>

        {/* 2. Companion Mobile Device on Angled Stand (Right) */}
        <group position={[0.85, 0.52, 0.15]} rotation={[0, -0.3, 0]}>
          <group rotation={[-0.25, 0, 0]}>
            <mesh position={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.16, 0.32, 0.012]} />
              <primitive object={darkAlumMat} attach="material" />
            </mesh>
            <mesh position={[0, 0.15, 0.008]}>
              <planeGeometry args={[0.14, 0.30]} />
              <meshStandardMaterial color="#FAF9F6" roughness={0.3} />
            </mesh>
          </group>
        </group>

        {/* 3. Companion Tablet on Stand (Left) */}
        <group position={[-0.85, 0.52, 0.15]} rotation={[0, 0.3, 0]}>
          <group rotation={[-0.25, 0, 0]}>
            <mesh position={[0, 0.18, 0]} castShadow>
              <boxGeometry args={[0.32, 0.44, 0.012]} />
              <primitive object={aluminumMat} attach="material" />
            </mesh>
            <mesh position={[0, 0.18, 0.008]}>
              <planeGeometry args={[0.30, 0.42]} />
              <meshStandardMaterial color="#FAF9F6" roughness={0.3} />
            </mesh>
          </group>
        </group>

        {/* Soft Product Presentation Spotlights */}
        <pointLight position={[0, 1.8, 0.4]} color="#FFF4DF" intensity={2.2} distance={5} />
      </group>
    </group>
  );
}
