import React, { useState } from 'react';
import { Volume2, VolumeX, Compass } from 'lucide-react';
import { soundSystem } from '../../utils/audio';

interface UIOverlayProps {
  progress: number;
  activeState: number;
  onNavigateState: (stateIndex: number) => void;
  onOpenContact: () => void;
}

const STATE_NAMES = [
  '01 — THE MARK',
  '02 — THE THINKING',
  '03 — INSIDE OUR STUDIO',
  '04 — A PROJECT',
  '05 — INSIDE THE PROJECT',
  '06 — CAPABILITIES',
  '07 — CONTACT'
];

export const UIOverlay: React.FC<UIOverlayProps> = ({
  progress,
  activeState,
  onNavigateState,
  onOpenContact
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const toggleSound = () => {
    const isPlaying = soundSystem.toggle();
    setSoundEnabled(isPlaying);
  };

  const stateLabel = STATE_NAMES[activeState - 1] || '01 — THE MARK';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-8 md:p-12 select-none">
      {/* TOP BAR */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        {/* Left: Current State Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium tracking-ultra-wide uppercase text-[#33302c]">
            {stateLabel}
          </span>
        </div>

        {/* Right: Scroll Indicator, Audio Toggle & Scenes Menu */}
        <div className="flex items-center gap-5 sm:gap-6">
          {/* Scroll Dash Indicator matching reference */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium tracking-ultra-wide uppercase text-[#47423b]">
            <span>SCROLL</span>
            <div className="w-12 h-[1.5px] bg-[#d5cec2] relative overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#1a1918] transition-all duration-100"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>

          {/* Audio Atmosphere Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle ambient atmosphere sound"
            className="w-8 h-8 rounded-full border border-[#d5cec2] bg-[#fbf9f5]/85 hover:bg-[#ffffff] flex items-center justify-center text-[#4a453e] hover:text-[#1a1918] transition-colors"
            title={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#1a1918]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#857e74]" />
            )}
          </button>

          {/* Quick Scene Directory */}
          <button
            onClick={() => setNavMenuOpen(!navMenuOpen)}
            className="px-3.5 py-1.5 rounded-full border border-[#d5cec2] bg-[#fbf9f5]/85 hover:bg-[#ffffff] text-[10px] font-semibold tracking-wider uppercase text-[#33302c] hover:text-[#1a1918] flex items-center gap-2 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Scenes</span>
          </button>
        </div>
      </header>

      {/* DROPDOWN SCENE DIRECTORY */}
      {navMenuOpen && (
        <div className="absolute top-20 right-6 sm:right-8 md:right-12 w-64 bg-[#fbf9f5]/95 backdrop-blur-xl p-3.5 rounded-2xl border border-[#ded5c6] shadow-2xl pointer-events-auto space-y-1 animate-fade-in z-50">
          <div className="text-[10px] uppercase tracking-widest text-[#948d82] px-3 py-1 font-semibold">
            Jump to Destination
          </div>
          {STATE_NAMES.map((name, idx) => {
            const stateNum = idx + 1;
            const isCurrent = stateNum === activeState;
            return (
              <button
                key={name}
                onClick={() => {
                  onNavigateState(stateNum);
                  setNavMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs tracking-wider transition-colors flex items-center justify-between ${
                  isCurrent
                    ? 'bg-[#1a1918] text-[#ffffff] font-medium'
                    : 'text-[#47423b] hover:bg-[#ece6dc]'
                }`}
              >
                <span>{name}</span>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]" />}
              </button>
            );
          })}
        </div>
      )}

      {/* BOTTOM BAR */}
      <footer className="w-full flex items-end justify-between pointer-events-auto">
        {/* Left: Minimal Pagination Dots / Numbers matching reference (01 02 03 04 05 06 07) */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-mono tracking-wider text-[#736d64]">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isActive = num === activeState;
            return (
              <button
                key={num}
                onClick={() => onNavigateState(num)}
                className={`transition-all duration-200 flex items-center gap-1 ${
                  isActive
                    ? 'text-[#1a1918] font-bold scale-110'
                    : 'hover:text-[#1a1918] text-[#8c8577]'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#1a1918] inline-block" />}
                <span>0{num}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick CTA on early scenes or minimal watermark */}
        {activeState < 7 && (
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="text-xs uppercase tracking-widest text-[#5c564c] hover:text-[#1a1918] transition-colors font-medium hidden sm:inline"
            >
              Contact
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};
