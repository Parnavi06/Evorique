import { useRef } from 'react';
import * as THREE from 'three';

export function EnvironmentAtmosphere() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Background warm ivory sky color and atmospheric depth haze */}
      <color attach="background" args={['#f6f1e8']} />
      <fog attach="fog" args={['#f6f1e8', 16, 95]} />

      {/* Balanced Architectural Lighting System */}
      <ambientLight color="#fff9f0" intensity={0.75} />
      <hemisphereLight args={['#fffdf8', '#ded6c7', 0.85]} />

      {/* Primary Key Sunlight (Warm Morning Sun) */}
      <directionalLight
        ref={dirLightRef}
        position={[18, 28, 14]}
        intensity={2.2}
        color="#fff4df"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={90}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0001}
      />

      {/* Secondary Fill Light for Architectural Softness */}
      <directionalLight
        position={[-16, 14, -10]}
        intensity={0.55}
        color="#ede6db"
      />

      {/* Subtle Warm Horizon Sun Glow */}
      <directionalLight
        position={[0, 4, -40]}
        intensity={0.4}
        color="#ffeed6"
      />

      {/* LAYERED DISTANT HORIZON MOUNTAIN RIDGES (Atmospheric Aerial Perspective) */}
      <group position={[0, -0.8, -60]}>
        {/* Layer 3 - Deep Background Hazy Ridge */}
        <mesh position={[0, 9, -20]}>
          <planeGeometry args={[140, 24]} />
          <meshBasicMaterial color="#e5ddd2" transparent opacity={0.65} />
        </mesh>

        {/* Layer 2 - Mid-Distance Ridge Peaks */}
        <group position={[0, 3, -10]}>
          {[-45, -20, 5, 28, 52].map((x, i) => (
            <mesh key={i} position={[x, 3.5 + (i % 3) * 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[16 + i * 2, 16 + i * 2, 2]} />
              <meshBasicMaterial color="#dfd6ca" />
            </mesh>
          ))}
        </group>

        {/* Layer 1 - Near Horizon Foothills */}
        <group position={[0, 0, 0]}>
          {[-38, -12, 15, 42].map((x, i) => (
            <mesh key={i} position={[x, 1.8 + (i % 2) * 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[12 + i * 2, 12 + i * 2, 2]} />
              <meshBasicMaterial color="#dad0c2" />
            </mesh>
          ))}
        </group>

        {/* Distant City Spires Silhouette across the Water (as in Reference State 01) */}
        <group position={[18, 1.2, 8]}>
          {[
            { x: 0, h: 4.5, w: 0.8 },
            { x: 1.2, h: 6.2, w: 0.9 },
            { x: 2.2, h: 5.0, w: 0.7 },
            { x: 3.4, h: 7.5, w: 1.1 },
            { x: 4.8, h: 5.8, w: 0.8 },
            { x: 6.0, h: 4.2, w: 0.7 }
          ].map((spire, idx) => (
            <mesh key={idx} position={[spire.x, spire.h / 2, 0]}>
              <boxGeometry args={[spire.w, spire.h, 0.6]} />
              <meshBasicMaterial color="#e2dacd" />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}
