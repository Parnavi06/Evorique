import { Suspense } from 'react';
import { EnvironmentAtmosphere } from './EnvironmentAtmosphere';
import { WaterSurface } from './WaterSurface';
import { HeadquartersCampus } from './HeadquartersCampus';
import { IdeationBoardroom } from './IdeationBoardroom';
import { StrategyLab } from './StrategyLab';
import { DesignStudio } from './DesignStudio';
import { EngineeringLab } from './EngineeringLab';
import { QualityLab } from './QualityLab';
import { LaunchChamber } from './LaunchChamber';
import { FacilityAtrium } from './FacilityAtrium';

interface WorldProps {
  progress: number;
}

export function World({ progress }: WorldProps) {
  // Coordinated visibility thresholds for performance and visual clarity
  const showCampus = progress <= 0.28 || progress >= 0.88;
  const showIdeation = progress >= 0.08 && progress <= 0.38;
  const showStrategy = progress >= 0.24 && progress <= 0.50;
  const showDesign = progress >= 0.36 && progress <= 0.64;
  const showEngineering = progress >= 0.48 && progress <= 0.76;
  const showQuality = progress >= 0.60 && progress <= 0.88;
  const showLaunch = progress >= 0.72 && progress <= 0.96;
  const showAtrium = progress >= 0.86;

  return (
    <Suspense fallback={null}>
      {/* Lighting, Atmosphere & Sky */}
      <EnvironmentAtmosphere />

      {/* Reflecting Water Planes */}
      <WaterSurface />

      {/* Chapter 01 — The Headquarters Campus Plaza */}
      {showCampus && <HeadquartersCampus />}

      {/* Chapter 02 — The Ideation Boardroom */}
      {showIdeation && <IdeationBoardroom />}

      {/* Chapter 03 — The Strategy Lab */}
      {showStrategy && <StrategyLab />}

      {/* Chapter 04 — The Design Studio */}
      {showDesign && <DesignStudio />}

      {/* Chapter 05 — The Engineering Lab */}
      {showEngineering && <EngineeringLab />}

      {/* Chapter 06 — The Quality Lab */}
      {showQuality && <QualityLab />}

      {/* Chapter 07 — The Launch Chamber */}
      {showLaunch && <LaunchChamber />}

      {/* Chapter 08 — The Facility Atrium Retrospective */}
      <FacilityAtrium visible={showAtrium} />
    </Suspense>
  );
}
