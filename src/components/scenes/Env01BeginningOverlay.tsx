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
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      {/* Top Space for HUD */}
      <div className="pt-14 sm:pt-16" />

      {/* Main Hero Card — Refined Modernist Sans-Serif Typography */}
      <div className="max-w-md sm:max-w-lg my-auto pointer-events-auto">
        <div className="p-7 sm:p-9 rounded-2xl bg-[#F4F1EA]/85 backdrop-blur-md border border-[#DCD7CE]/75 shadow-[0_8px_32px_rgba(36,37,32,0.03)]">
          {/* Depth Telemetry Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84958B]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#84958B]">
              {env.depthCode}
            </span>
          </div>

          {/* Large EVORIQUE Title in Modern Minimalist Sans-Serif */}
          <h1 className="font-sans font-medium text-4xl sm:text-5xl md:text-[3.4rem] tracking-[0.14em] uppercase text-[#242520] leading-[0.98]">
            Evorique
          </h1>

          {/* Supporting Headline */}
          <p className="mt-4 text-lg sm:text-xl font-sans font-normal text-[#242520] leading-snug">
            "{env.headline}"
          </p>

          {/* Description */}
          <p className="mt-3 text-xs sm:text-sm font-sans font-light text-[#555850] leading-relaxed">
            {env.description}
          </p>

          {/* Enter Action Button */}
          <div className="mt-7 pt-5 border-t border-[#DCD7CE]/60 flex items-center justify-between">
            <button
              onClick={onExploreClick}
              className="group px-6 py-3 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs font-sans font-medium uppercase tracking-widest transition-all duration-300 flex items-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <span>Enter The Infinite Canvas</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#84958B] group-hover:translate-y-0.5 transition-transform" />
            </button>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777970] hidden sm:inline">
              VOL. 01
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="pb-8" />
    </div>
  );
};
