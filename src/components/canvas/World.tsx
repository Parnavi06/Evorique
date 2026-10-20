import { Suspense } from 'react';
import { EnvironmentAtmosphere } from './EnvironmentAtmosphere';
import { WaterSurface } from './WaterSurface';
import { LimestoneRing } from './LimestoneRing';
import { StudioInterior } from './StudioInterior';
import { CapabilitiesLandscape } from './CapabilitiesLandscape';
import { ContactDestination } from './ContactDestination';

interface WorldProps {
  progress: number;
}

export function World({ progress }: WorldProps) {
  // Smooth visibility culling for performance and visual clarity
  const showRingAndStudio = progress <= 0.76;
  const showCapabilities = progress >= 0.68 && progress <= 0.94;
  const showContact = progress >= 0.88;

  return (
    <Suspense fallback={null}>
      <EnvironmentAtmosphere />
      <WaterSurface />

      {/* States 01, 02, 03, 04, 05: The Ring and Studio */}
      {showRingAndStudio && (
        <group>
          <LimestoneRing />
          <StudioInterior />
        </group>
      )}

      {/* State 06: Capabilities Archipelago */}
      <CapabilitiesLandscape visible={showCapabilities} />

      {/* State 07: Contact Pier & Sunrise Gateway */}
      <ContactDestination visible={showContact} />
    </Suspense>
  );
}
