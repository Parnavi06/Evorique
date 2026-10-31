import { Suspense } from 'react';
import { useStoneMaterials } from './StoneMaterials';
import { PortalModel } from './PortalModel';
import { ArchitecturalEnvironment } from './ArchitecturalEnvironment';
import { ReflectingPool } from './ReflectingPool';
import { Landscaping } from './Landscaping';

export function Portal01Beginning() {
  const {
    limestoneMat,
    travertineMat,
    champagneBronzeMat,
    waterMat,
    foliageMat,
    trunkMat,
    waterNormal
  } = useStoneMaterials();

  return (
    <Suspense fallback={null}>
      <group position={[0, 0, 0]}>
        {/* 1. Architectural Promenade, Terraces, and Distant Horizon */}
        <ArchitecturalEnvironment
          limestoneMat={limestoneMat}
          travertineMat={travertineMat}
          champagneBronzeMat={champagneBronzeMat}
        />

        {/* 2. Monumental Architectural Portal Installation (X=0, Y=2.8, Z=14.0) */}
        <PortalModel
          limestoneMat={limestoneMat}
          travertineMat={travertineMat}
          champagneBronzeMat={champagneBronzeMat}
        />

        {/* 3. Calm Reflective Architectural Water Basins */}
        <ReflectingPool
          waterMat={waterMat}
          waterNormal={waterNormal}
        />

        {/* 4. Restrained Mediterranean Landscaping (Cypress & Botanical Planters) */}
        <Landscaping
          foliageMat={foliageMat}
          trunkMat={trunkMat}
          travertineMat={travertineMat}
        />
      </group>
    </Suspense>
  );
}
