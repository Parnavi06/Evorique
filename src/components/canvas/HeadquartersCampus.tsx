import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function HeadquartersCampus() {
  const [limestoneDiffuse, limestoneNormal, limestoneRoughness] = useTexture([
    '/textures/limestone_diffuse.jpg',
    '/textures/limestone_normal.jpg',
    '/textures/limestone_roughness.jpg',
  ]);
  const [woodDiffuse, woodNormal, woodRoughness] = useTexture([
    '/textures/wood_diffuse.jpg',
    '/textures/wood_normal.jpg',
    '/textures/wood_roughness.jpg',
  ]);

  useMemo(() => {
    [limestoneDiffuse, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(5, 5);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    limestoneDiffuse.colorSpace = THREE.SRGBColorSpace;
    limestoneNormal.colorSpace = THREE.NoColorSpace;
    limestoneRoughness.colorSpace = THREE.NoColorSpace;

    [woodDiffuse, woodNormal, woodRoughness].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
    });
    woodDiffuse.colorSpace = THREE.SRGBColorSpace;
    woodNormal.colorSpace = THREE.NoColorSpace;
    woodRoughness.colorSpace = THREE.NoColorSpace;
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness, woodDiffuse, woodNormal, woodRoughness]);

  // Primary Limestone Facade Material (#F4F1E9 base tone)
  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#F4F1E9',
      roughness: 0.80,
      metalness: 0.02
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Darker Travertine Trim & Steps Material (#E8E7E0 tone)
  const travertineMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneDiffuse,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.45, 0.45),
      color: '#E8E7E0',
      roughness: 0.85,
      metalness: 0.04
    });
  }, [limestoneDiffuse, limestoneNormal, limestoneRoughness]);

  // Champagne Bronze Accent Metal (#B69A70)
  const champagneBronzeMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B69A70',
      roughness: 0.28,
      metalness: 0.88
    });
  }, []);

  // Architectural Dark Charcoal Metal for Mullions (#252824)
  const darkMetalMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#252824',
      roughness: 0.35,
      metalness: 0.65
    });
  }, []);

  // Architectural Clear Glass
  const architecturalGlassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FAF9F6',
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.52,
      thickness: 0.35,
      specularIntensity: 1
    });
  }, []);

  // Warm Slatted Oak for Interior Foyer Wall
  const warmWoodMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: woodDiffuse,
      normalMap: woodNormal,
      roughnessMap: woodRoughness,
      color: '#D4BC9E',
      roughness: 0.45,
      metalness: 0.03
    });
  }, [woodDiffuse, woodNormal, woodRoughness]);

  // Subtle Greenery Materials (Muted Sage & Cypress)
  const sageFoliageMat1 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5A6E58', roughness: 0.88 }), []);
  const sageFoliageMat2 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#445642', roughness: 0.92 }), []);
  const boxwoodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#4A5D46', roughness: 0.9 }), []);

  // Pool Water Material
  const poolWaterMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4B7F79',
      roughness: 0.08,
      metalness: 0.25,
      transparent: true,
      opacity: 0.92
    });
  }, []);

  // Pre-calculated horizontal wing fin positions (12 fins each side)
  const finIndices = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. THE COMPLETE ARCHITECTURAL HEADQUARTERS FACADE            */}
      {/* ============================================================ */}

      {/* --- CENTRAL MONUMENTAL ENTRANCE PORTICO (X = -7 to +7, Z = 5.0 to 3.2) --- */}
      <group position={[0, 0, 4.6]}>
        {/* Left Monumental Entrance Column / Pylon */}
        <mesh position={[-6.2, 4.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 8.8, 1.8]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Right Monumental Entrance Column / Pylon */}
        <mesh position={[6.2, 4.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 8.8, 1.8]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Monumental Upper Architrave & Entablature Beam */}
        <mesh position={[0, 8.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[16.6, 1.4, 2.4]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Champagne Bronze Inset Fascia Band */}
        <mesh position={[0, 7.5, 1.22]}>
          <boxGeometry args={[14.2, 0.14, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* Prominent Architectural Signage: "EVORIQUE" */}
        <group position={[0, 4.65, 1.25]}>
          {/* Backing plaque */}
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[5.2, 0.55, 0.04]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
          {/* Subtle architectural light washing the brand emblem */}
          <pointLight position={[0, 0.4, 0.6]} color="#FFF4DF" intensity={2.0} distance={5} />
        </group>

        {/* Cantilevered Entrance Canopy at Y = 4.0 */}
        <group position={[0, 4.0, 1.2]} castShadow receiveShadow>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[10.6, 0.35, 3.2]} />
            <primitive object={limestoneMat} attach="material" />
          </mesh>
          {/* Bronze Underside Fascia Trim */}
          <mesh position={[0, -0.16, 0]}>
            <boxGeometry args={[10.3, 0.04, 3.0]} />
            <primitive object={champagneBronzeMat} attach="material" />
          </mesh>
          {/* 6 Recessed Architectural Downlights into the Canopy Soffit */}
          {[-3.6, -1.8, 0, 1.8, 3.6].map((x, i) => (
            <group key={i} position={[x, -0.19, 0.5]}>
              <mesh>
                <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
                <meshBasicMaterial color="#FFF5E4" />
              </mesh>
            </group>
          ))}
          <pointLight position={[0, -0.3, 0.5]} color="#FFF5E4" intensity={2.2} distance={6} />
        </group>

        {/* Double-Height Glass Curtain Wall Behind Columns (Z = -0.9 relative to portico) */}
        <mesh position={[0, 4.0, -0.9]}>
          <planeGeometry args={[10.2, 7.8]} />
          <primitive object={architecturalGlassMat} attach="material" />
        </mesh>

        {/* Dark Bronze Curtain Wall Mullions */}
        {[-3.4, 0, 3.4].map((x, i) => (
          <mesh key={i} position={[x, 4.0, -0.88]}>
            <boxGeometry args={[0.08, 7.8, 0.08]} />
            <primitive object={darkMetalMat} attach="material" />
          </mesh>
        ))}
        {[2.4, 5.2].map((y, i) => (
          <mesh key={i} position={[0, y, -0.88]}>
            <boxGeometry args={[10.2, 0.08, 0.08]} />
            <primitive object={darkMetalMat} attach="material" />
          </mesh>
        ))}

        {/* DOUBLE PIVOT GLASS ENTRANCE DOORS (The transition target into Chapter 02) */}
        <group position={[0, 1.7, -0.8]}>
          {/* Left Pivot Door */}
          <group position={[-1.4, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.35, 3.4, 0.05]} />
              <primitive object={architecturalGlassMat} attach="material" />
            </mesh>
            {/* Bronze Door Perimeter Frame */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.38, 3.44, 0.04]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
            {/* Tall Vertical Cylindrical Pull Bar */}
            <mesh position={[0.55, 0, 0.06]}>
              <cylinderGeometry args={[0.02, 0.02, 2.0, 16]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
          </group>

          {/* Right Pivot Door */}
          <group position={[1.4, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.35, 3.4, 0.05]} />
              <primitive object={architecturalGlassMat} attach="material" />
            </mesh>
            {/* Bronze Door Perimeter Frame */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.38, 3.44, 0.04]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
            {/* Tall Vertical Cylindrical Pull Bar */}
            <mesh position={[-0.55, 0, 0.06]}>
              <cylinderGeometry args={[0.02, 0.02, 2.0, 16]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
          </group>
        </group>

        {/* Visible Illuminated Interior Vestibule / Lobby */}
        <group position={[0, 1.8, -2.6]}>
          {/* Warm Oak Slatted Feature Wall */}
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[8.0, 4.2, 0.1]} />
            <primitive object={warmWoodMat} attach="material" />
          </mesh>
          {/* Minimalist Honed Charcoal Reception Credenza */}
          <mesh position={[0, -0.8, 0.8]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 0.9, 0.9]} />
            <primitive object={darkMetalMat} attach="material" />
          </mesh>
          {/* Warm Interior Foyer Chandelier Glow */}
          <pointLight position={[0, 2.2, 0.4]} color="#FFE8C4" intensity={2.4} distance={8} />
        </group>
      </group>

      {/* --- WEST WING (LEFT ARCHITECTURAL WING: X = -7.3 to -48, Z = 3.8) --- */}
      <group position={[-27.5, 0, 3.8]}>
        {/* Continuous Ground Plinth */}
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <boxGeometry args={[41, 0.4, 3.6]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Ground Floor Glass Curtain Wall (Y = 0.4 to 4.0) */}
        <mesh position={[0, 2.2, 0.4]}>
          <planeGeometry args={[39.5, 3.6]} />
          <primitive object={architecturalGlassMat} attach="material" />
        </mesh>

        {/* Ground Floor Dark Bronze Mullions */}
        {[-16, -11, -6, -1, 4, 9, 14].map((x, i) => (
          <mesh key={i} position={[x, 2.2, 0.42]}>
            <boxGeometry args={[0.08, 3.6, 0.08]} />
            <primitive object={darkMetalMat} attach="material" />
          </mesh>
        ))}

        {/* Interior Ground Floor Warm Glow Spill */}
        <pointLight position={[-8, 2.2, -1.0]} color="#FFEBC2" intensity={1.2} distance={14} />
        <pointLight position={[8, 2.2, -1.0]} color="#FFEBC2" intensity={1.2} distance={14} />

        {/* Cantilevered Intermediate Floor Slab at Y = 4.1 */}
        <mesh position={[0, 4.1, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[41.5, 0.5, 3.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 4.1, 2.12]}>
          <boxGeometry args={[41.5, 0.08, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* Upper Floor Glass Gallery (Y = 4.35 to 8.0) */}
        <mesh position={[0, 6.15, 0.4]}>
          <planeGeometry args={[39.5, 3.6]} />
          <primitive object={architecturalGlassMat} attach="material" />
        </mesh>

        {/* Rhythmic Vertical Limestone Brise-Soleil Fins (Catching Sunlight & Casting Diagonal Shadows) */}
        {finIndices.map((i) => {
          const x = -17.5 + i * 2.9;
          return (
            <mesh key={i} position={[x, 6.15, 0.9]} rotation={[0, 0.18, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.22, 3.6, 0.85]} />
              <primitive object={limestoneMat} attach="material" />
            </mesh>
          );
        })}

        {/* West End Monumental Limestone Anchor Pavilion (X = -18 to -23 relative to wing center) */}
        <mesh position={[-19.5, 4.4, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[4.5, 8.8, 4.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Roof Cornice & Deep Cantilevered Overhang (Y = 8.4) */}
        <mesh position={[0, 8.4, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[42.5, 0.6, 3.6]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 8.35, 2.42]}>
          <boxGeometry args={[42.5, 0.08, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
      </group>

      {/* --- EAST WING (RIGHT ARCHITECTURAL WING: X = +7.3 to +48, Z = 3.8) --- */}
      <group position={[27.5, 0, 3.8]}>
        {/* Continuous Ground Plinth */}
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <boxGeometry args={[41, 0.4, 3.6]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>

        {/* Ground Floor Glass Curtain Wall (Y = 0.4 to 4.0) */}
        <mesh position={[0, 2.2, 0.4]}>
          <planeGeometry args={[39.5, 3.6]} />
          <primitive object={architecturalGlassMat} attach="material" />
        </mesh>

        {/* Ground Floor Dark Bronze Mullions */}
        {[-14, -9, -4, 1, 6, 11, 16].map((x, i) => (
          <mesh key={i} position={[x, 2.2, 0.42]}>
            <boxGeometry args={[0.08, 3.6, 0.08]} />
            <primitive object={darkMetalMat} attach="material" />
          </mesh>
        ))}

        {/* Interior Ground Floor Warm Glow Spill */}
        <pointLight position={[-8, 2.2, -1.0]} color="#FFEBC2" intensity={1.2} distance={14} />
        <pointLight position={[8, 2.2, -1.0]} color="#FFEBC2" intensity={1.2} distance={14} />

        {/* Cantilevered Intermediate Floor Slab at Y = 4.1 */}
        <mesh position={[0, 4.1, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[41.5, 0.5, 3.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 4.1, 2.12]}>
          <boxGeometry args={[41.5, 0.08, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>

        {/* Upper Floor Glass Gallery (Y = 4.35 to 8.0) */}
        <mesh position={[0, 6.15, 0.4]}>
          <planeGeometry args={[39.5, 3.6]} />
          <primitive object={architecturalGlassMat} attach="material" />
        </mesh>

        {/* Rhythmic Vertical Limestone Brise-Soleil Fins */}
        {finIndices.map((i) => {
          const x = -16.0 + i * 2.9;
          return (
            <mesh key={i} position={[x, 6.15, 0.9]} rotation={[0, -0.18, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.22, 3.6, 0.85]} />
              <primitive object={limestoneMat} attach="material" />
            </mesh>
          );
        })}

        {/* East End Monumental Limestone Anchor Pavilion */}
        <mesh position={[19.5, 4.4, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[4.5, 8.8, 4.2]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>

        {/* Roof Cornice & Deep Cantilevered Overhang (Y = 8.4) */}
        <mesh position={[0, 8.4, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[42.5, 0.6, 3.6]} />
          <primitive object={limestoneMat} attach="material" />
        </mesh>
        <mesh position={[0, 8.35, 2.42]}>
          <boxGeometry args={[42.5, 0.08, 0.04]} />
          <primitive object={champagneBronzeMat} attach="material" />
        </mesh>
      </group>

      {/* Low Manicured Boxwood Shrub Hedge Along Building Foundation Base */}
      <mesh position={[-25, 0.45, 5.8]}>
        <boxGeometry args={[34, 0.4, 0.6]} />
        <primitive object={boxwoodMat} attach="material" />
      </mesh>
      <mesh position={[25, 0.45, 5.8]}>
        <boxGeometry args={[34, 0.4, 0.6]} />
        <primitive object={boxwoodMat} attach="material" />
      </mesh>

      {/* ============================================================ */}
      {/* 2. THE MONUMENTAL ARRIVAL ESPLANADE & FORECOURT (Z = 6 to 25)*/}
      {/* ============================================================ */}

      {/* Main Elevated Arrival Terrace Under Portico (Z = 4.8 to 8.0) */}
      <mesh position={[0, 0.15, 6.4]} receiveShadow>
        <boxGeometry args={[14.5, 0.3, 3.5]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Cascading Tiered Travertine Steps (Z = 8.0 to 12.5) */}
      {[0, 1, 2, 3, 4].map((step) => {
        const z = 8.4 + step * 0.9;
        const y = 0.1 - step * 0.08;
        return (
          <group key={step} position={[0, y, z]}>
            <mesh receiveShadow>
              <boxGeometry args={[13.8 - step * 0.4, 0.16, 0.95]} />
              <primitive object={travertineMat} attach="material" />
            </mesh>
            {/* Subtle Bronze Nosing / Step LED reveal */}
            <mesh position={[0, 0.08, 0.47]}>
              <boxGeometry args={[13.6 - step * 0.4, 0.02, 0.02]} />
              <primitive object={champagneBronzeMat} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* Central Travertine Grand Promenade Paved Walkway (Z = 12.5 to 26) */}
      <mesh position={[0, -0.25, 19.0]} receiveShadow>
        <boxGeometry args={[12.0, 0.4, 14.0]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Ground-Recessed Pathway Indicator Lights Marking the Axis */}
      {[14, 17, 20, 23].map((z, i) => (
        <group key={i}>
          <mesh position={[-5.4, -0.04, z]}>
            <cylinderGeometry args={[0.06, 0.06, 0.02, 12]} />
            <meshBasicMaterial color="#FFE8C0" />
          </mesh>
          <mesh position={[5.4, -0.04, z]}>
            <cylinderGeometry args={[0.06, 0.06, 0.02, 12]} />
            <meshBasicMaterial color="#FFE8C0" />
          </mesh>
        </group>
      ))}

      {/* --- FLANKING EXPANSIVE REFLECTING WATER POOLS --- */}
      {/* West Reflecting Pool (Left of Promenade, X = -14.5, Z = 16.5) */}
      <group position={[-15.2, -0.3, 16.5]}>
        {/* Pool Basework Travertine Coping */}
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <boxGeometry args={[13.5, 0.4, 15.5]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        {/* Reflecting Pool Water Surface */}
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12.2, 14.2]} />
          <primitive object={poolWaterMat} attach="material" />
        </mesh>
        {/* Submerged Pool Accent Lights */}
        <pointLight position={[0, 0.25, 0]} color="#7FD4CB" intensity={1.5} distance={7} />
      </group>

      {/* East Reflecting Pool (Right of Promenade, X = +14.5, Z = 16.5) */}
      <group position={[15.2, -0.3, 16.5]}>
        {/* Pool Basework Travertine Coping */}
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <boxGeometry args={[13.5, 0.4, 15.5]} />
          <primitive object={travertineMat} attach="material" />
        </mesh>
        {/* Reflecting Pool Water Surface */}
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12.2, 14.2]} />
          <primitive object={poolWaterMat} attach="material" />
        </mesh>
        {/* Submerged Pool Accent Lights */}
        <pointLight position={[0, 0.25, 0]} color="#7FD4CB" intensity={1.5} distance={7} />
      </group>

      {/* --- ARCHITECTURAL PLANTERS WITH ITALIAN CYPRESS TREES --- */}
      {/* Symmetrical Cypress Colonnade Along the Promenade Edge */}
      {[-7.2, 7.2].map((x, colIdx) => (
        <group key={colIdx}>
          {[9.5, 14.5, 19.5, 24.5].map((z, rowIdx) => (
            <group key={rowIdx} position={[x, -0.05, z]}>
              {/* Travertine Square Planter Box */}
              <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.3, 0.5, 1.3]} />
                <primitive object={travertineMat} attach="material" />
              </mesh>
              {/* Planter Soil Bed */}
              <mesh position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1.0, 1.0]} />
                <meshStandardMaterial color="#2E332C" roughness={0.95} />
              </mesh>
              {/* Elegant Sculptural Cypress Tree Base Tier */}
              <mesh position={[0, 1.4, 0]} castShadow>
                <coneGeometry args={[0.48, 1.9, 14]} />
                <primitive object={sageFoliageMat1} attach="material" />
              </mesh>
              {/* Cypress Tree Upper Tier */}
              <mesh position={[0, 2.4, 0]} castShadow>
                <coneGeometry args={[0.34, 1.8, 12]} />
                <primitive object={sageFoliageMat2} attach="material" />
              </mesh>
              {/* Cypress Tree Crown */}
              <mesh position={[0, 3.2, 0]} castShadow>
                <coneGeometry args={[0.18, 1.0, 10]} />
                <primitive object={sageFoliageMat1} attach="material" />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* ============================================================ */}
      {/* 3. EXTENDED COASTAL ISLAND PLATFORM & WATER EDGE             */}
      {/* ============================================================ */}

      {/* Master Substructure Island Podium (Extends beneath whole campus) */}
      <mesh position={[0, -0.5, 14.0]} receiveShadow>
        <boxGeometry args={[102, 0.6, 32]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Low Stepping Stone Perimeter Terraces on Outer Edges */}
      <mesh position={[-44, -0.55, 14.0]} receiveShadow>
        <boxGeometry args={[10, 0.3, 30]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>
      <mesh position={[44, -0.55, 14.0]} receiveShadow>
        <boxGeometry args={[10, 0.3, 30]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>
    </group>
  );
}
