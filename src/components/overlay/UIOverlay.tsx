import React, { useState } from 'react';
import { Volume2, VolumeX, Compass } from 'lucide-react';
import { soundSystem } from '../../utils/audio';

interface UIOverlayProps {
  progress: number;
  activeChapter: number;
  onNavigateChapter: (chapterIndex: number) => void;
  onOpenContact: () => void;
}

const CHAPTER_NAMES = [
  '01 — THE HEADQUARTERS',
  '02 — THE IDEATION ROOM',
  '03 — THE STRATEGY LAB',
  '04 — THE DESIGN STUDIO',
  '05 — THE ENGINEERING LAB',
  '06 — THE QUALITY LAB',
  '07 — THE LAUNCH CHAMBER',
  '08 — THE NEXT CREATION'
];

export const UIOverlay: React.FC<UIOverlayProps> = ({
  progress,
  activeChapter,
  onNavigateChapter,
  onOpenContact
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const toggleSound = () => {
    const isPlaying = soundSystem.toggle();
    setSoundEnabled(isPlaying);
  };

  const currentLabel = CHAPTER_NAMES[activeChapter - 1] || CHAPTER_NAMES[0];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-8 md:p-12 select-none">
      {/* TOP BAR */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        {/* Left: Current Chapter Indicator & Brand Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#B69A70]" />
          <span className="text-[11px] font-medium tracking-ultra-wide uppercase text-[#252824]">
            {currentLabel}
          </span>
        </div>

        {/* Right: Scroll Indicator, Audio Toggle & Scenes Menu */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Scroll Dash Indicator matching reference */}
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-medium tracking-ultra-wide uppercase text-[#777970]">
            <span>EXPLORATION</span>
            <div className="w-14 h-[1.5px] bg-[#C9C1B3]/60 relative overflow-hidden rounded-full">
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#252824] transition-all duration-100"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-[#252824]">{Math.round(progress * 100)}%</span>
          </div>

          {/* Audio Atmosphere Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle ambient atmosphere sound"
            className="w-8 h-8 rounded-full border border-[#C9C1B3]/60 bg-[#FAF9F6]/85 hover:bg-[#FAF9F6] flex items-center justify-center text-[#252824] transition-all duration-200 shadow-sm"
            title={soundEnabled ? 'Mute atmospheric sound' : 'Enable atmospheric sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#252824]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#777970]" />
            )}
          </button>

          {/* Quick Scene Directory */}
          <button
            onClick={() => setNavMenuOpen(!navMenuOpen)}
            className="px-3.5 py-1.5 rounded-full border border-[#C9C1B3]/60 bg-[#FAF9F6]/85 hover:bg-[#FAF9F6] text-[10px] font-medium tracking-wider uppercase text-[#252824] flex items-center gap-2 transition-all duration-200 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 text-[#B69A70]" />
            <span className="hidden sm:inline">Chapters</span>
          </button>
        </div>
      </header>

      {/* DROPDOWN SCENE DIRECTORY */}
      {navMenuOpen && (
        <div className="absolute top-20 right-6 sm:right-8 md:right-12 w-72 bg-[#FAF9F6]/95 backdrop-blur-xl p-3.5 rounded-2xl border border-[#C9C1B3]/60 shadow-xl pointer-events-auto space-y-1 animate-fade-in z-50">
          <div className="text-[10px] uppercase tracking-ultra-wide text-[#777970] px-3 py-1 font-semibold flex items-center justify-between">
            <span>FACILITY DIRECTORY</span>
            <span className="text-[#B69A70]">8 SECTORS</span>
          </div>
          {CHAPTER_NAMES.map((name, idx) => {
            const chNum = idx + 1;
            const isCurrent = chNum === activeChapter;
            return (
              <button
                key={name}
                onClick={() => {
                  onNavigateChapter(chNum);
                  setNavMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs tracking-wider transition-all duration-200 flex items-center justify-between ${
                  isCurrent
                    ? 'bg-[#252824] text-[#FAF9F6] font-medium'
                    : 'text-[#3A3D39] hover:bg-[#E8E7E0]/60'
                }`}
              >
                <span>{name}</span>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#B69A70]" />}
              </button>
            );
          })}
        </div>
      )}

      {/* BOTTOM BAR */}
      <footer className="w-full flex items-end justify-between pointer-events-auto">
        {/* Left: Minimal Pagination Numbers (01 to 08) */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-mono tracking-wider text-[#777970]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
            const isActive = num === activeChapter;
            return (
              <button
                key={num}
                onClick={() => onNavigateChapter(num)}
                className={`transition-all duration-200 flex items-center gap-1 ${
                  isActive
                    ? 'text-[#252824] font-bold scale-110'
                    : 'hover:text-[#252824] text-[#777970]/70'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B69A70] inline-block" />}
                <span>0{num}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Inquire / Contact */}
        {activeChapter < 8 && (
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="text-xs uppercase tracking-widest text-[#777970] hover:text-[#252824] transition-colors font-medium hidden sm:inline"
            >
              Inquire
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};
