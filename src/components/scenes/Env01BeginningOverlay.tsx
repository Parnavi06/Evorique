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

      {/* Main Editorial Text Block — Integrated Seamlessly on the Left (No SaaS Card) */}
      <div className="max-w-md sm:max-w-lg my-auto pointer-events-auto pl-1 sm:pl-4">
        {/* Depth Telemetry Badge */}
        <div className="flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84958B]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#84958B]">
            {env.depthCode}
          </span>
        </div>

        {/* Refined Sans-Serif Wordmark (Balanced letter spacing, elegant weight) */}
        <h1 className="font-sans font-medium text-4xl sm:text-5xl md:text-[3.25rem] tracking-[0.06em] uppercase text-[#242520] leading-none mb-4">
          Evorique
        </h1>

        {/* Supporting Editorial Headline */}
        <p className="font-sans text-lg sm:text-xl md:text-2xl font-normal text-[#242520] leading-snug tracking-tight mb-3 max-w-sm">
          {env.headline}
        </p>

        {/* Narrative Description */}
        <p className="font-sans text-xs sm:text-sm font-light text-[#555850] leading-relaxed max-w-sm mb-8">
          {env.description}
        </p>

        {/* Tactical Entry Button & Scroll Cue */}
        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={onExploreClick}
            className="group px-7 py-3 rounded-full bg-[#242520] hover:bg-[#151614] text-[#F4F1EA] text-xs font-sans font-medium tracking-[0.12em] uppercase transition-all duration-300 flex items-center gap-3 shadow-[0_4px_16px_rgba(36,37,32,0.12)] hover:shadow-[0_8px_24px_rgba(36,37,32,0.2)] hover:scale-[1.02]"
          >
            <span>Enter The Canvas</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B89F77] group-hover:translate-y-0.5 transition-transform" />
          </button>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#84958B] hidden sm:inline">
            Scroll to zoom
          </span>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="pb-8 sm:pb-12" />
    </div>
  );
};
