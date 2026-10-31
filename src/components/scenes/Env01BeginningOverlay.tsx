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
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      {/* Top Space for HUD */}
      <div className="pt-12 sm:pt-14" />

      {/* Main Hero Statement */}
      <div className="max-w-xl my-auto">
        <div className="text-xs uppercase tracking-ultra-wide font-mono text-[#84958B] mb-3">
          {env.depthCode}
        </div>
        <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#242520] leading-[0.92]">
          Evorique
        </h1>
        <p className="mt-6 text-2xl sm:text-3xl font-editorial italic text-[#383A34] leading-snug max-w-lg">
          "{env.headline}"
        </p>
        <p className="mt-4 text-xs sm:text-sm text-[#777970] font-light leading-relaxed max-w-md">
          {env.description}
        </p>

        {/* Action Button */}
        <div className="mt-8 pointer-events-auto">
          <button
            onClick={onExploreClick}
            className="group px-7 py-3.5 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center gap-3 shadow-md hover:scale-105"
          >
            <span>Enter The Infinite Canvas</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#84958B] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="pb-8" />
    </div>
  );
};
