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
      roughness: 0.80,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const travertineMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      color: '#E5E0D6',
      roughness: 0.84,
      metalness: 0.04
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  const champagneBronzeMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B69A70',
      roughness: 0.28,
      metalness: 0.88
    });
  }, []);

  const darkMetalMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#242520',
      roughness: 0.4,
      metalness: 0.65
    });
  }, []);

  const waterMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4B7E79',
      roughness: 0.08,
      metalness: 0.22,
      transparent: true,
      opacity: 0.94
    });
  }, []);

  // Multi-tier foliage materials for sophisticated Mediterranean cypress trees
  const foliageMat1 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3F523E', roughness: 0.88 }), []);
  const foliageMat2 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#4E634D', roughness: 0.90 }), []);
  const trunkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#342A22', roughness: 0.95 }), []);

  useFrame((_, delta) => {
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.07;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. MASTER ARRIVAL PLATFORM & PROMENADE (Z = 15 to 29)        */}
      {/* ============================================================ */}

      {/* Substructure Island Base (Grounds the architecture in water) */}
      <mesh position={[0, -0.5, 22]} receiveShadow>
        <boxGeometry args={[42, 0.6, 26]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Main Travertine Arrival Podium (Z = 19.5 to 29.5) */}
      <mesh position={[0, -0.25, 24.5]} receiveShadow>
        <boxGeometry args={[28, 0.5, 12]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Central Honed Paved Promenade Runway */}
      <mesh position={[0, -0.22, 24.5]} receiveShadow>
        <boxGeometry args={[8.8, 0.52, 11.5]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Bronze Reveal Strips Marking the Promenade Axis */}
      {[-4.4, 4.4].map((x, i) => (
        <mesh key={i} position={[x, 0.02, 24.5]}>
          <boxGeometry args={[0.04, 0.02, 11.5]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
      ))}

      {/* Cascading 5-Tier Travertine Steps Leading up to Portal (Z = 15.5 to 19.5) */}
      {[0, 1, 2, 3, 4].map((step) => {
        const z = 19.2 - step * 0.85;
        const y = -0.15 + step * 0.11;
        return (
          <group key={step} position={[0, y, z]}>
            <mesh receiveShadow>
              <boxGeometry args={[13.5 - step * 0.4, 0.16, 0.95]} />
              <primitive object={travertineMat} attach="material" />
            </mesh>
            {/* Subtle Bronze Nosing / Under-step Shadow Line */}
            <mesh position={[0, 0.08, 0.47]}>
              <boxGeometry args={[13.3 - step * 0.4, 0.02, 0.02]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* Elevated Portal Threshold Terrace (Z = 13.5 to 15.8) */}
      <mesh position={[0, 0.35, 14.6]} receiveShadow>
        <boxGeometry args={[16.0, 0.3, 2.8]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Flanking Reflecting Water Pools with Coping Borders */}
      {[-10.2, 10.2].map((x, i) => (
        <group key={i} position={[x, -0.15, 23.5]}>
          {/* Raised Travertine Coping Border */}
          <mesh receiveShadow>
            <boxGeometry args={[8.4, 0.45, 10.5]} />
            <primitive object={travertineMat} attach="material" />
          </mesh>
          {/* Water Surface */}
          <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[7.4, 9.5]} />
            <primitive object={waterMat} attach="material" />
          </mesh>
          {/* Submerged Warm Turquoise Accent Lighting */}
          <pointLight position={[0, 0.28, 0]} color="#7FD4CB" intensity={1.4} distance={6} />
        </group>
      ))}

      {/* Symmetrical Mediterranean Italian Cypress Allée (6 Trees) */}
      {[-4.8, 4.8].map((x, colIdx) => (
        <group key={colIdx}>
          {[18.5, 22.5, 26.5].map((z, rowIdx) => (
            <group key={rowIdx} position={[x, -0.05, z]}>
              {/* Travertine Square Planter Box */}
              <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.1, 0.52, 1.1]} />
                <primitive object={travertineMat} attach="material" />
              </mesh>
              {/* Bronze Top Coping Strip */}
              <mesh position={[0, 0.52, 0]}>
                <boxGeometry args={[1.12, 0.02, 1.12]} />
                <primitive object={champagneBronzeMat} attach="material" />
              </mesh>
              {/* Planter Soil Bed */}
              <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.9, 0.9]} />
                <meshStandardMaterial color="#2B3028" roughness={0.95} />
              </mesh>
              {/* Slender Tree Trunk */}
              <mesh position={[0, 0.8, 0]} castShadow>
                <cylinderGeometry args={[0.06, 0.08, 0.8, 12]} />
                <primitive object={trunkMat} attach="material" />
              </mesh>
              {/* Multi-tier Stylised Cypress Foliage */}
              <mesh position={[0, 1.35, 0]} castShadow>
                <coneGeometry args={[0.42, 1.4, 16]} />
                <primitive object={foliageMat1} attach="material" />
              </mesh>
              <mesh position={[0, 2.05, 0]} rotation={[0, 0.25, 0]} castShadow>
                <coneGeometry args={[0.34, 1.3, 14]} />
                <primitive object={foliageMat2} attach="material" />
              </mesh>
              <mesh position={[0, 2.7, 0]} rotation={[0, -0.2, 0]} castShadow>
                <coneGeometry args={[0.24, 1.1, 12]} />
                <primitive object={foliageMat1} attach="material" />
              </mesh>
              <mesh position={[0, 3.25, 0]} castShadow>
                <coneGeometry args={[0.14, 0.8, 10]} />
                <primitive object={foliageMat2} attach="material" />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* ============================================================ */}
      {/* 2. THE MONUMENTAL ARCHITECTURAL PORTAL INSTALLATION (Z = 14) */}
      {/* ============================================================ */}

      <group position={[0, 2.8, 14.0]}>
        {/* --- Flanking Monolithic Limestone Pylon Wings (Left & Right) --- */}
        {/* Left Pylon Wing */}
        <group position={[-6.2, 0.4, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 6.8, 1.6]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          {/* Architectural Horizontal Reveal Grooves */}
          {[-1.8, -0.6, 0.6, 1.8].map((y, i) => (
            <mesh key={i} position={[0, y, 0.81]}>
              <boxGeometry args={[4.1, 0.04, 0.02]} />
              <primitive object={darkMetalMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Right Pylon Wing */}
        <group position={[6.2, 0.4, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 6.8, 1.6]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          {/* Architectural Horizontal Reveal Grooves */}
          {[-1.8, -0.6, 0.6, 1.8].map((y, i) => (
            <mesh key={i} position={[0, y, 0.81]}>
              <boxGeometry args={[4.1, 0.04, 0.02]} />
              <primitive object={darkMetalMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* --- Upper Architectural Lintel Beam (Framing the Arch) --- */}
        <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[16.6, 0.8, 2.0]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 3.42, 1.02]}>
          <boxGeometry args={[16.2, 0.06, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* --- Portal Pedestal Anchor Blocks --- */}
        <mesh position={[-2.8, -2.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.8, 1.6]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        <mesh position={[2.8, -2.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.8, 1.6]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* --- PRIMARY CIRCULAR MONOLITHIC STONE RING --- */}
        <mesh castShadow receiveShadow>
          {/* Torus Geometry: Radius 2.6, Tube 0.85 (Camera passes through at [0, 2.2, 14.8]) */}
          <torusGeometry args={[2.6, 0.85, 28, 56]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* --- Rotating Floating Concentric Bronze Ring --- */}
        <group ref={innerRingRef} position={[0, 0, 0.1]}>
          <mesh>
            <torusGeometry args={[1.9, 0.045, 16, 44]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
          {/* Four Subtle Radial Celestial Markers */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, idx) => (
            <mesh key={idx} rotation={[0, 0, rot]} position={[0, 0, 0]}>
              <boxGeometry args={[0.05, 0.32, 0.05]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* --- ARCHITECTURAL DEPTH BEHIND THE PORTAL (Receding Concentric Portals) --- */}
        {/* Secondary Receding Ring at Z = -1.2 relative to portal */}
        <mesh position={[0, 0, -1.2]} castShadow receiveShadow>
          <torusGeometry args={[2.3, 0.55, 20, 40]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Tertiary Receding Archway at Z = -2.4 relative to portal */}
        <mesh position={[0, 0, -2.4]} castShadow receiveShadow>
          <torusGeometry args={[2.0, 0.45, 20, 36]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Warm Golden Aperture Illumination Radiating into the World */}
        <pointLight position={[0, 0, -0.6]} color="#FFF3DD" intensity={2.6} distance={10} />
      </group>

      {/* ============================================================ */}
      {/* 3. DISTANT ARCHITECTURAL HORIZON SILHOUETTES (Z = -20 to -40)*/}
      {/* ============================================================ */}
      <group position={[0, 0, -28]}>
        {/* Soft Distant Pavilion Silhouettes */}
        {[-22, 22].map((x, i) => (
          <group key={i} position={[x, 3.5, 0]}>
            <mesh>
              <boxGeometry args={[8.0, 7.0, 2.0]} />
              <meshStandardMaterial color="#E8E3D8" roughness={0.9} />
            </mesh>
            <mesh position={[0, 3.8, 0]}>
              <boxGeometry args={[9.2, 0.5, 2.4]} />
              <meshStandardMaterial color="#DDD7CB" roughness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Distant Colonnade Silhouettes */}
        {[-14, -10, 10, 14].map((x, i) => (
          <mesh key={i} position={[x, 2.8, -4]}>
            <cylinderGeometry args={[0.25, 0.25, 6.0, 12]} />
            <meshStandardMaterial color="#DDD7CB" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
