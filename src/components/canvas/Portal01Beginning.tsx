import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Portal01Beginning() {
  const innerRingRef = useRef<THREE.Group>(null);

  // High-resolution architectural stone and water normal maps
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness, waterNormal] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
    '/textures/water_normal.jpg',
  ]);

  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      tex.anisotropy = 16;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;

    waterNormal.wrapS = THREE.RepeatWrapping;
    waterNormal.wrapT = THREE.RepeatWrapping;
    waterNormal.repeat.set(6, 6);
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness, waterNormal]);

  // Honed architectural limestone for monumental portal and pathway
  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#F4F1EA',
      roughness: 0.80,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Warm natural travertine for plinths, coping, and steps
  const travertineMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.4, 0.4),
      color: '#E5E0D6',
      roughness: 0.84,
      metalness: 0.03
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Architectural satin champagne bronze for subtle reveals and celestial ring
  const champagneBronzeMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B89F77',
      roughness: 0.24,
      metalness: 0.88
    });
  }, []);

  // Serene dark mineral reflective architectural pool (glass-like water mirror)
  const waterMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      normalMap: waterNormal,
      normalScale: new THREE.Vector2(0.08, 0.08),
      color: '#263735',
      roughness: 0.06,
      metalness: 0.32,
      transparent: true,
      opacity: 0.95
    });
  }, [waterNormal]);

  // Subtle kinetic life in the suspended inner bronze ring
  useFrame((_, delta) => {
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* LAYER 1: FOREGROUND — REFINED PROMENADE & REFLECTING POOLS   */}
      {/* ============================================================ */}

      {/* Sub-podium Grounding (Z = 15 to 30) */}
      <mesh position={[0, -0.3, 22.5]} receiveShadow>
        <boxGeometry args={[26, 0.5, 17]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Honed Central Promenade Runway */}
      <mesh position={[0, -0.02, 22.5]} receiveShadow>
        <boxGeometry args={[6.8, 0.08, 15]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Subtle Longitudinal Bronze Inlay Lines Framing the Pathway */}
      {[-3.4, 3.4].map((x, i) => (
        <mesh key={i} position={[x, 0.03, 22.5]}>
          <boxGeometry args={[0.03, 0.02, 15]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
      ))}

      {/* Broad Monumental Architectural Steps Leading to Portal */}
      <group position={[0, 0, 0]}>
        {/* Step 1 */}
        <mesh position={[0, 0.07, 17.5]} receiveShadow>
          <boxGeometry args={[7.6, 0.14, 1.6]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        {/* Step 2 */}
        <mesh position={[0, 0.20, 15.9]} receiveShadow>
          <boxGeometry args={[7.4, 0.14, 1.4]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
      </group>

      {/* Flanking Reflecting Architectural Water Mirrors */}
      {[-8.2, 8.2].map((x, i) => (
        <group key={i} position={[x, -0.05, 22.0]}>
          {/* Honed Travertine Basin Coping */}
          <mesh receiveShadow>
            <boxGeometry args={[6.8, 0.38, 13.5]} />
            <primitive object={travertineMat} attach="material" />
          </mesh>
          {/* Reflective Water Surface */}
          <mesh position={[0, 0.20, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[6.2, 12.8]} />
            <primitive object={waterMat} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ============================================================ */}
      {/* LAYER 2: MIDDLE GROUND — MONUMENTAL PORTAL SCULPTURE (Z=14) */}
      {/* ============================================================ */}

      <group position={[0, 2.8, 14.0]}>
        {/* Architectural Pedestal Plinth Anchoring the Sculpture */}
        <mesh position={[0, -2.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 0.7, 1.8]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        {/* Footing Shadow Reveal */}
        <mesh position={[0, -2.73, 0]}>
          <boxGeometry args={[7.3, 0.04, 1.84]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* PRIMARY MONOLITHIC CIRCULAR STONE RING */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[2.7, 0.65, 36, 64]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Inner Chamfered Reveal Ring (Creates architectural shadow & depth) */}
        <mesh position={[0, 0, -0.16]} castShadow receiveShadow>
          <torusGeometry args={[2.22, 0.22, 28, 56]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Fine Recessed Bronze Inlay Rim */}
        <mesh position={[0, 0, 0.12]}>
          <torusGeometry args={[2.02, 0.035, 20, 56]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* Suspended Rotating Celestial Ring */}
        <group ref={innerRingRef} position={[0, 0, 0.0]}>
          <mesh>
            <torusGeometry args={[1.72, 0.022, 16, 48]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
          {/* Minimal Sculptural Axis Markers */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, idx) => (
            <mesh key={idx} rotation={[0, 0, rot]} position={[0, 0, 0]}>
              <boxGeometry args={[0.035, 0.22, 0.035]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Receding Concentric Portal Ring (Physical depth toward Selected Work) */}
        <mesh position={[0, 0, -1.2]} castShadow receiveShadow>
          <torusGeometry args={[2.1, 0.32, 24, 48]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Warm Atmospheric Illumination Spilling Through Aperture */}
        <pointLight position={[0, 0, -0.6]} color="#FFF3DD" intensity={2.2} distance={9} />
      </group>

      {/* ============================================================ */}
      {/* LAYER 3: BACKGROUND — SOFTLY ILLUMINATED HORIZON PLINTH       */}
      {/* ============================================================ */}

      <group position={[0, 0.8, -38]}>
        {/* Low Horizontal Architectural Boundary Wall in Morning Mist */}
        <mesh receiveShadow>
          <boxGeometry args={[90, 1.6, 2.0]} />
          <meshStandardMaterial color="#E8E3D8" roughness={0.9} />
        </mesh>
        {/* Subtle Horizontal Bronze Horizon Line */}
        <mesh position={[0, 0.82, 0.95]}>
          <boxGeometry args={[88, 0.03, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
