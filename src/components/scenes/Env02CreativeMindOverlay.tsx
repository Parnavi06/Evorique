import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CANVAS_ENVIRONMENTS } from '../../data/canvasData';

interface Env02Props {
  opacity: number;
  onNextClick: () => void;
}

export const Env02CreativeMindOverlay: React.FC<Env02Props> = ({ opacity, onNextClick }) => {
  const env = CANVAS_ENVIRONMENTS[1];
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      <div className="pt-12 sm:pt-14" />

      {/* Main Philosophy Block */}
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

        {/* Action Button */}
        <div className="mt-8 pointer-events-auto">
          <button
            onClick={onNextClick}
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#242520] font-medium hover:text-[#84958B] transition-colors"
          >
            <span className="w-9 h-9 rounded-full border border-[#DCD7CE] group-hover:border-[#242520] group-hover:bg-[#242520] group-hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-200">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span>Discover Selected Work</span>
          </button>
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
};
