import { Suspense } from 'react';
import { AtmosphericLighting } from './AtmosphericLighting';
import { Portal01Beginning } from './Portal01Beginning';
import { Portal02CreativeMind } from './Portal02CreativeMind';
import { Portal03SelectedWork } from './Portal03SelectedWork';
import { Portal04Services } from './Portal04Services';
import { Portal05About } from './Portal05About';
import { Portal06Destination } from './Portal06Destination';

interface InfiniteWorldProps {
  progress: number;
  onSelectProject?: (id: string) => void;
}

export function InfiniteWorld({ progress, onSelectProject }: InfiniteWorldProps) {
  // Coordinated culling for high-performance sub-16ms render loops
  const show01 = progress <= 0.28;
  const show02 = progress >= 0.08 && progress <= 0.46;
  const show03 = progress >= 0.26 && progress <= 0.64;
  const show04 = progress >= 0.44 && progress <= 0.82;
  const show05 = progress >= 0.62 && progress <= 0.94;
  const show06 = progress >= 0.80;

  return (
    <Suspense fallback={null}>
      {/* Warm Ivory Atmosphere & Directional Daylight */}
      <AtmosphericLighting />

      {/* Infinite Canvas Environment 01 — The Beginning */}
      {show01 && <Portal01Beginning />}

      {/* Infinite Canvas Environment 02 — The Creative Mind */}
      {show02 && <Portal02CreativeMind />}

      {/* Infinite Canvas Environment 03 — Selected Work */}
      {show03 && <Portal03SelectedWork onSelectProject={onSelectProject} />}

      {/* Infinite Canvas Environment 04 — Services */}
      {show04 && <Portal04Services />}

      {/* Infinite Canvas Environment 05 — About Evorique */}
      {show05 && <Portal05About />}

      {/* Infinite Canvas Environment 06 — The Destination */}
      {show06 && <Portal06Destination />}
    </Suspense>
  );
}
