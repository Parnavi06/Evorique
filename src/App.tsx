import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { interpolateCamera } from './constants/keyframes';
import { ExperienceCanvas } from './components/canvas/ExperienceCanvas';
import { HeroOverlay } from './components/scenes/HeroOverlay';
import { ThinkingOverlay } from './components/scenes/ThinkingOverlay';
import { StudioOverlay } from './components/scenes/StudioOverlay';
import { ProjectTeaserOverlay } from './components/scenes/ProjectTeaserOverlay';
import { AuroraProjectView } from './components/scenes/AuroraProjectView';
import { CapabilitiesView } from './components/scenes/CapabilitiesView';
import { ContactOverlay } from './components/scenes/ContactOverlay';
import { UIOverlay } from './components/overlay/UIOverlay';
import { CaseStudyModal } from './components/modals/CaseStudyModal';
import { CapabilityModal } from './components/modals/CapabilityModal';
import { ContactModal } from './components/modals/ContactModal';

// Helper to calculate smooth fade opacities between keyframe thresholds
function calcOpacity(p: number, start: number, peak1: number, peak2: number, end: number): number {
  if (p < start || p > end) return 0;
  if (p >= peak1 && p <= peak2) return 1;
  if (p < peak1) return Math.max(0, Math.min(1, (p - start) / (peak1 - start)));
  return Math.max(0, Math.min(1, (end - p) / (end - peak2)));
}

export default function App() {
  // Modal states
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const isAnyModalOpen = caseStudyOpen || selectedCapability !== null || contactModalOpen;

  // Smooth scroll controller
  const { progress, scrollToProgress } = useSmoothScroll({ isModalOpen: isAnyModalOpen });
  const camData = interpolateCamera(progress);

  // Calculate opacities for the 7 visual states
  const op1 = calcOpacity(progress, 0.0, 0.0, 0.10, 0.16);
  const op2 = calcOpacity(progress, 0.15, 0.20, 0.27, 0.32);
  const op3 = calcOpacity(progress, 0.30, 0.35, 0.42, 0.47);
  const op4 = calcOpacity(progress, 0.46, 0.49, 0.53, 0.56);
  const op5 = calcOpacity(progress, 0.56, 0.60, 0.68, 0.72);
  const op6 = calcOpacity(progress, 0.73, 0.78, 0.86, 0.90);
  const op7 = calcOpacity(progress, 0.89, 0.94, 1.0, 1.0);

  // State jump triggers
  const handleNavigateState = (stateNum: number) => {
    switch (stateNum) {
      case 1:
        scrollToProgress(0.0);
        break;
      case 2:
        scrollToProgress(0.24);
        break;
      case 3:
        scrollToProgress(0.38);
        break;
      case 4:
        scrollToProgress(0.50);
        break;
      case 5:
        scrollToProgress(0.64);
        break;
      case 6:
        scrollToProgress(0.84);
        break;
      case 7:
        scrollToProgress(1.0);
        break;
    }
  };

  return (
    <div className="relative w-full min-h-[750vh] bg-[#fbf9f5]">
      {/* Fixed Viewport Shell */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Subtle Architectural Grain Overlay */}
        <div className="absolute inset-0 grain-overlay z-10 pointer-events-none" />

        {/* 3D WebGL Three.js Infinite Zoom World */}
        <ExperienceCanvas progress={progress} />

        {/* STATE 01: THE MARK */}
        <HeroOverlay
          opacity={op1}
          onExploreClick={() => handleNavigateState(2)}
        />

        {/* STATE 02: THE THINKING */}
        <ThinkingOverlay
          opacity={op2}
          onNextClick={() => handleNavigateState(3)}
        />

        {/* STATE 03: INSIDE OUR STUDIO */}
        <StudioOverlay
          opacity={op3}
          onZoomProject={() => handleNavigateState(4)}
        />

        {/* STATE 04: A PROJECT */}
        <ProjectTeaserOverlay
          opacity={op4}
          onEnterScreen={() => handleNavigateState(5)}
        />

        {/* STATE 05: INSIDE THE PROJECT (AURORA) */}
        <AuroraProjectView
          opacity={op5}
          onOpenCaseStudy={() => setCaseStudyOpen(true)}
          onPullBack={() => handleNavigateState(6)}
        />

        {/* STATE 06: CAPABILITIES */}
        <CapabilitiesView
          opacity={op6}
          onSelectCapability={(id) => setSelectedCapability(id)}
        />

        {/* STATE 07: CONTACT */}
        <ContactOverlay
          opacity={op7}
          onOpenContactModal={() => setContactModalOpen(true)}
        />

        {/* PERSISTENT GLOBAL NAVIGATION & CONTROLS */}
        <UIOverlay
          progress={progress}
          activeState={camData.activeState}
          onNavigateState={handleNavigateState}
          onOpenContact={() => setContactModalOpen(true)}
        />
      </div>

      {/* INTERACTIVE MODALS & DRAWERS */}
      <CaseStudyModal
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
      />

      <CapabilityModal
        capabilityId={selectedCapability}
        onClose={() => setSelectedCapability(null)}
        onStartProject={() => {
          setSelectedCapability(null);
          setContactModalOpen(true);
        }}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
