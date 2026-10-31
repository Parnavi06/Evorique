import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CANVAS_ENVIRONMENTS } from '../../data/canvasData';

interface Env05Props {
  opacity: number;
  onNextClick: () => void;
}

export const Env05AboutOverlay: React.FC<Env05Props> = ({ opacity, onNextClick }) => {
  const env = CANVAS_ENVIRONMENTS.find((e) => e.id === 4) || CANVAS_ENVIRONMENTS[3];
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      <div className="pt-12 sm:pt-14" />

      {/* Main Studio Narrative */}
      <div className="max-w-xl my-auto">
        <div className="text-xs uppercase tracking-ultra-wide font-mono text-[#84958B] mb-2">
          {env.depthCode}
        </div>
        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#242520] leading-[1.02]">
          {env.headline}
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-[#777970] font-light leading-relaxed max-w-lg">
          {env.description}
        </p>

        {/* Studio Tenets Grid */}
        <div className="mt-6 pt-6 border-t border-[#DCD7CE] grid grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-1">
              STUDIO MODEL
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#242520]">
              Independent & Senior-Led
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-1">
              FOCUS
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#242520]">
              Brand • Product • Technology
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pointer-events-auto">
          <button
            onClick={onNextClick}
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#242520] font-medium hover:text-[#84958B] transition-colors"
          >
            <span className="w-9 h-9 rounded-full border border-[#DCD7CE] group-hover:border-[#242520] group-hover:bg-[#242520] group-hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-200">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span>Reach The Final Destination</span>
          </button>
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
};
