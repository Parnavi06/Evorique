import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CanvasCameraRig } from './CanvasCameraRig';
import { InfiniteWorld } from './InfiniteWorld';

interface InfiniteCanvasProps {
  progress: number;
  onSelectProject?: (id: string) => void;
}

export function InfiniteCanvas({ progress, onSelectProject }: InfiniteCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 3.6, 28.0], fov: 48 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.06
        }}
        shadows
      >
        <CanvasCameraRig progress={progress} />
        <InfiniteWorld progress={progress} onSelectProject={onSelectProject} />
      </Canvas>
    </div>
  );
}
