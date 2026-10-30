import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { interpolateCamera } from './constants/keyframes';
import { ExperienceCanvas } from './components/canvas/ExperienceCanvas';
import { Chapter01Headquarters } from './components/scenes/Chapter01Headquarters';
import { Chapter02Ideation } from './components/scenes/Chapter02Ideation';
import { Chapter03Strategy } from './components/scenes/Chapter03Strategy';
import { Chapter04Design } from './components/scenes/Chapter04Design';
import { Chapter05Engineering } from './components/scenes/Chapter05Engineering';
import { Chapter06Quality } from './components/scenes/Chapter06Quality';
import { Chapter07Launch } from './components/scenes/Chapter07Launch';
import { Chapter08NextCreation } from './components/scenes/Chapter08NextCreation';
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

  // Calculate opacities across all 8 architectural chapters
  const op1 = calcOpacity(progress, 0.0, 0.0, 0.09, 0.15);
  const op2 = calcOpacity(progress, 0.14, 0.18, 0.25, 0.29);
  const op3 = calcOpacity(progress, 0.28, 0.32, 0.38, 0.42);
  const op4 = calcOpacity(progress, 0.41, 0.45, 0.51, 0.55);
  const op5 = calcOpacity(progress, 0.54, 0.58, 0.64, 0.68);
  const op6 = calcOpacity(progress, 0.67, 0.71, 0.77, 0.81);
  const op7 = calcOpacity(progress, 0.80, 0.83, 0.88, 0.92);
  const op8 = calcOpacity(progress, 0.91, 0.94, 1.0, 1.0);

  // Jump to specific chapter
  const handleNavigateChapter = (chNum: number) => {
    switch (chNum) {
      case 1:
        scrollToProgress(0.0);
        break;
      case 2:
        scrollToProgress(0.20);
        break;
      case 3:
        scrollToProgress(0.33);
        break;
      case 4:
        scrollToProgress(0.46);
        break;
      case 5:
        scrollToProgress(0.59);
        break;
      case 6:
        scrollToProgress(0.72);
        break;
      case 7:
        scrollToProgress(0.85);
        break;
      case 8:
        scrollToProgress(1.0);
        break;
    }
  };

  return (
    <div className="relative w-full min-h-[850vh] bg-[#F4F1E9]">
      {/* Fixed Viewport Shell */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Subtle Architectural Grain Overlay */}
        <div className="absolute inset-0 grain-overlay z-10 pointer-events-none" />

        {/* 3D WebGL Three.js Infinite Zoom World */}
        <ExperienceCanvas progress={progress} />

        {/* CHAPTER 01: THE HEADQUARTERS */}
        <Chapter01Headquarters
          opacity={op1}
          onExploreClick={() => handleNavigateChapter(2)}
        />

        {/* CHAPTER 02: THE IDEATION ROOM */}
        <Chapter02Ideation
          opacity={op2}
          onNextClick={() => handleNavigateChapter(3)}
        />

        {/* CHAPTER 03: THE STRATEGY LAB */}
        <Chapter03Strategy
          opacity={op3}
          onNextClick={() => handleNavigateChapter(4)}
          onCapabilityClick={() => setSelectedCapability('strategy')}
        />

        {/* CHAPTER 04: THE DESIGN STUDIO */}
        <Chapter04Design
          opacity={op4}
          onNextClick={() => handleNavigateChapter(5)}
          onCapabilityClick={() => setSelectedCapability('design')}
        />

        {/* CHAPTER 05: THE ENGINEERING LAB */}
        <Chapter05Engineering
          opacity={op5}
          onNextClick={() => handleNavigateChapter(6)}
          onCapabilityClick={() => setSelectedCapability('engineering')}
        />

        {/* CHAPTER 06: THE QUALITY LAB */}
        <Chapter06Quality
          opacity={op6}
          onNextClick={() => handleNavigateChapter(7)}
          onCapabilityClick={() => setSelectedCapability('quality')}
        />

        {/* CHAPTER 07: THE LAUNCH CHAMBER */}
        <Chapter07Launch
          opacity={op7}
          onExploreAurora={() => setCaseStudyOpen(true)}
          onNextClick={() => handleNavigateChapter(8)}
        />

        {/* CHAPTER 08: THE NEXT CREATION */}
        <Chapter08NextCreation
          opacity={op8}
          onContactClick={() => setContactModalOpen(true)}
          onRestartClick={() => handleNavigateChapter(1)}
        />

        {/* PERSISTENT GLOBAL NAVIGATION & TELEMETRY */}
        <UIOverlay
          progress={progress}
          activeChapter={camData.activeChapter}
          onNavigateChapter={handleNavigateChapter}
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
