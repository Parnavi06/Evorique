import React from 'react';
import { ArrowDown } from 'lucide-react';
import { CANVAS_ENVIRONMENTS } from '../../data/canvasData';

interface Env01Props {
  opacity: number;
  onExploreClick: () => void;
}

export const Env01BeginningOverlay: React.FC<Env01Props> = ({ opacity, onExploreClick }) => {
  const env = CANVAS_ENVIRONMENTS[0];
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-16 transition-opacity duration-500 select-none z-10"
      style={{ opacity }}
    >
      {/* Top Spacer for HUD Navigation Bar */}
      <div className="pt-16 sm:pt-20" />

      {/* Main Hero Spread */}
      <div className="w-full my-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left Editorial Column */}
        <div className="max-w-md sm:max-w-lg pointer-events-auto pl-1 sm:pl-4">
          {/* Eyebrow with Fine Horizontal Accent Line */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#777970]">
              01 — THE MARK
            </span>
            <div className="w-8 h-[1px] bg-[#B7B5AA]" />
          </div>

          {/* Refined Master Wordmark */}
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-normal text-[#242520] tracking-tight leading-[0.96] mb-4">
            Evorique
          </h1>

          {/* Core Tagline from Master Storyboard */}
          <p className="font-sans text-base sm:text-lg text-[#555850] font-light max-w-xs leading-snug mb-3">
            Digital products for a more human future.
          </p>

          {/* Supporting Narrative */}
          <p className="font-sans text-xs sm:text-sm font-light text-[#777970] leading-relaxed max-w-sm mb-8">
            {env.description}
          </p>

          {/* Tactical Entry Button & Scroll Cue */}
          <div className="flex items-center gap-4 pt-1">
            <button
              onClick={onExploreClick}
              className="group px-7 py-3.5 rounded-full bg-[#242520] hover:bg-[#151614] text-[#F4F1EA] text-xs font-sans font-medium tracking-[0.14em] uppercase transition-all duration-300 flex items-center gap-3 shadow-[0_4px_16px_rgba(36,37,32,0.12)] hover:shadow-[0_8px_24px_rgba(36,37,32,0.22)] hover:scale-[1.02]"
            >
              <span>Enter The Canvas</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#B89F77] group-hover:translate-y-0.5 transition-transform" />
            </button>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#84958B] hidden sm:inline">
              Scroll to zoom
            </span>
          </div>
        </div>

        {/* Right Floating Annotation — Exact match with master storyboard */}
        <div className="hidden lg:flex flex-col items-center gap-2 pointer-events-auto pr-16 select-none opacity-85">
          <div className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/80 backdrop-blur-md border border-[#DCD7CE] text-[11px] font-mono tracking-wider text-[#555850] flex items-center gap-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89F77] animate-pulse" />
            <span>Zoom into the mark</span>
          </div>
          <svg className="w-16 h-12 text-[#B7B5AA]" viewBox="0 0 64 48" fill="none">
            <path
              d="M32 0 C 32 20, 20 36, 4 44"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <circle cx="4" cy="44" r="2.5" fill="#B89F77" />
          </svg>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="pb-8 sm:pb-12" />
    </div>
  );
};
