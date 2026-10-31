import React, { useState } from 'react';
import { useCanvasScroll } from './hooks/useCanvasScroll';
import { interpolateCanvasCamera } from './constants/canvasKeyframes';
import { InfiniteCanvas } from './components/canvas/InfiniteCanvas';
import { CanvasHUD } from './components/overlay/CanvasHUD';
import { Env01BeginningOverlay } from './components/scenes/Env01BeginningOverlay';
import { Env02CreativeMindOverlay } from './components/scenes/Env02CreativeMindOverlay';
import { Env03SelectedWorkOverlay } from './components/scenes/Env03SelectedWorkOverlay';
import { Env04ServicesOverlay } from './components/scenes/Env04ServicesOverlay';
import { Env05AboutOverlay } from './components/scenes/Env05AboutOverlay';
import { Env06ContactOverlay } from './components/scenes/Env06ContactOverlay';
import { CanvasProjectModal } from './components/modals/CanvasProjectModal';
import { CanvasInquiryModal } from './components/modals/CanvasInquiryModal';

// Helper to calculate smooth fade opacities between keyframe thresholds
function calcOpacity(p: number, start: number, peak1: number, peak2: number, end: number): number {
  if (p < start || p > end) return 0;
  if (p >= peak1 && p <= peak2) return 1;
  if (p < peak1) return Math.max(0, Math.min(1, (p - start) / (peak1 - start)));
  return Math.max(0, Math.min(1, (end - p) / (end - peak2)));
}

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const isModalOpen = selectedProjectId !== null || inquiryModalOpen;

  // Continuous zoom scroll engine
  const { progress, scrollToProgress } = useCanvasScroll({ isModalOpen });
  const camData = interpolateCanvasCamera(progress);

  // Opacity transitions across the 6 nested visual environments
  const op1 = calcOpacity(progress, 0.0, 0.0, 0.10, 0.17);
  const op2 = calcOpacity(progress, 0.16, 0.22, 0.30, 0.35);
  const op3 = calcOpacity(progress, 0.34, 0.40, 0.48, 0.53);
  const op4 = calcOpacity(progress, 0.52, 0.58, 0.66, 0.71);
  const op5 = calcOpacity(progress, 0.70, 0.76, 0.83, 0.87);
  const op6 = calcOpacity(progress, 0.86, 0.91, 1.0, 1.0);

  // Smooth jump to any environment
  const handleNavigateEnv = (id: number) => {
    switch (id) {
      case 1:
        scrollToProgress(0.0);
        break;
      case 2:
        scrollToProgress(0.25);
        break;
      case 3:
        scrollToProgress(0.44);
        break;
      case 4:
        scrollToProgress(0.62);
        break;
      case 5:
        scrollToProgress(0.79);
        break;
      case 6:
        scrollToProgress(1.0);
        break;
    }
  };

  const handleOpenInquiryForService = (serviceName: string) => {
    setPreselectedService(serviceName);
    setInquiryModalOpen(true);
  };

  return (
    <div className="relative w-full min-h-[650vh] bg-[#F4F1EA] text-[#242520] selection:bg-[#E5E0D6] selection:text-[#242520]">
      {/* Fixed Viewport Shell */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Subtle Architectural Grain Overlay */}
        <div className="absolute inset-0 gallery-grain z-10 pointer-events-none opacity-40" />

        {/* 3D Continuous Infinite Zoom Canvas */}
        <InfiniteCanvas
          progress={progress}
          onSelectProject={(id) => setSelectedProjectId(id)}
        />

        {/* ENVIRONMENT 01: THE BEGINNING */}
        <Env01BeginningOverlay
          opacity={op1}
          onExploreClick={() => handleNavigateEnv(2)}
        />

        {/* ENVIRONMENT 02: THE CREATIVE MIND */}
        <Env02CreativeMindOverlay
          opacity={op2}
          onNextClick={() => handleNavigateEnv(3)}
        />

        {/* ENVIRONMENT 03: SELECTED WORK */}
        <Env03SelectedWorkOverlay
          opacity={op3}
          onSelectProject={(id) => setSelectedProjectId(id)}
          onNextClick={() => handleNavigateEnv(4)}
        />

        {/* ENVIRONMENT 04: SERVICES */}
        <Env04ServicesOverlay
          opacity={op4}
          onNextClick={() => handleNavigateEnv(5)}
          onSelectService={handleOpenInquiryForService}
        />

        {/* ENVIRONMENT 05: ABOUT EVORIQUE */}
        <Env05AboutOverlay
          opacity={op5}
          onNextClick={() => handleNavigateEnv(6)}
        />

        {/* ENVIRONMENT 06: THE DESTINATION */}
        <Env06ContactOverlay
          opacity={op6}
          onOpenInquiry={() => {
            setPreselectedService(undefined);
            setInquiryModalOpen(true);
          }}
          onRestartClick={() => handleNavigateEnv(1)}
        />

        {/* PERSISTENT CANVAS HUD NAVIGATION & CONTROLS */}
        <CanvasHUD
          progress={progress}
          activeEnvId={camData.environmentId}
          onNavigateEnv={handleNavigateEnv}
          onOpenInquiry={() => {
            setPreselectedService(undefined);
            setInquiryModalOpen(true);
          }}
        />
      </div>

      {/* Case Study Detail Modal */}
      <CanvasProjectModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        onOpenInquiryForProject={(title) => {
          setPreselectedService(title);
          setInquiryModalOpen(true);
        }}
      />

      {/* Commission Project Inquiry Modal */}
      <CanvasInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
}
