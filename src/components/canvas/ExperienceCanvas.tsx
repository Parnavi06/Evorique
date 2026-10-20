import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraController } from './CameraController';
import { World } from './World';

interface ExperienceCanvasProps {
  progress: number;
}

export function ExperienceCanvas({ progress }: ExperienceCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 3.4, 15.0], fov: 46 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.04
        }}
        shadows
      >
        <CameraController progress={progress} />
        <World progress={progress} />
      </Canvas>
    </div>
  );
}
