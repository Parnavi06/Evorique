import { Suspense } from 'react';
import { AtmosphericLighting } from './AtmosphericLighting';
import { Portal01Beginning } from './Portal01Beginning';
import { Portal03SelectedWork } from './Portal03SelectedWork';
import { Portal04Services } from './Portal04Services';
import { Portal05About } from './Portal05About';
import { Portal06Destination } from './Portal06Destination';

interface InfiniteWorldProps {
  progress: number;
  onSelectProject?: (id: string) => void;
}

export function InfiniteWorld({ progress, onSelectProject }: InfiniteWorldProps) {
  // Coordinated culling for high-performance sub-16ms render loops across 5 environments
  const show01 = progress <= 0.30;
  const show02 = progress >= 0.12 && progress <= 0.52; // Selected Work
  const show03 = progress >= 0.34 && progress <= 0.72; // Services
  const show04 = progress >= 0.54 && progress <= 0.90; // About Evorique
  const show05 = progress >= 0.72;                     // The Destination

  return (
    <Suspense fallback={null}>
      {/* Warm Ivory Atmosphere & Directional Daylight */}
      <AtmosphericLighting />

      {/* Infinite Canvas Environment 01 — The Beginning */}
      {show01 && <Portal01Beginning />}

      {/* Infinite Canvas Environment 02 — Selected Work */}
      {show02 && <Portal03SelectedWork onSelectProject={onSelectProject} />}

      {/* Infinite Canvas Environment 03 — Services */}
      {show03 && <Portal04Services />}

      {/* Infinite Canvas Environment 04 — About Evorique */}
      {show04 && <Portal05About />}

      {/* Infinite Canvas Environment 05 — The Destination */}
      {show05 && <Portal06Destination />}
    </Suspense>
  );
}
