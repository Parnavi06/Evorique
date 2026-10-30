import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { CHAPTERS } from '../../constants/content';

interface Chapter04Props {
  opacity: number;
  onNextClick: () => void;
  onCapabilityClick?: () => void;
}

export const Chapter04Design: React.FC<Chapter04Props> = ({
  opacity,
  onNextClick,
  onCapabilityClick
}) => {
  const info = CHAPTERS[3];
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      {/* Top Location Telemetry */}
      <div className="w-full flex justify-between items-center pt-8 md:pt-10">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#FAF9F6]/85 backdrop-blur-md border border-[#C9C1B3]/50 text-[10px] tracking-ultra-wide uppercase font-semibold text-[#777970]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B69A70]" />
          <span>{info.locationCode}</span>
        </div>
        <div className="text-[11px] font-medium tracking-ultra-wide uppercase text-[#B69A70] hidden sm:block">
          CHAPTER 04 — DESIGN & EXPERIENCE
        </div>
      </div>

      {/* Main Narrative Block */}
      <div className="max-w-lg my-auto">
        <div className="text-xs uppercase tracking-ultra-wide font-medium text-[#777970] mb-2">
          {info.narrative}
        </div>
        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#252824] leading-[1.04]">
          {info.headline}
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-[#777970] font-normal leading-relaxed max-w-md">
          {info.description}
        </p>

        {/* Action Triggers */}
        <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
          <button
            onClick={onNextClick}
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#252824] font-medium hover:text-[#181A18] transition-colors"
          >
            <span className="w-9 h-9 rounded-full border border-[#C9C1B3] group-hover:border-[#252824] group-hover:bg-[#252824] group-hover:text-[#FAF9F6] flex items-center justify-center transition-all duration-200">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span>{info.transitionPrompt}</span>
          </button>

          {onCapabilityClick && (
            <button
              onClick={onCapabilityClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9C1B3]/60 bg-[#FAF9F6]/70 hover:bg-[#FAF9F6] text-[11px] uppercase tracking-wider text-[#777970] hover:text-[#252824] transition-all"
            >
              <Layers className="w-3 h-3 text-[#B69A70]" />
              <span>Design System Tokens</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Artifact Bar */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4">
        <div className="flex items-center gap-6 text-xs text-[#777970]">
          {info.artifacts?.map((item, i) => (
            <div key={i} className="hidden sm:block">
              <span className="text-[10px] uppercase tracking-wider text-[#9CA995] block font-medium">{item.label}</span>
              <span className="text-xs text-[#252824] font-medium">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-ultra-wide text-[#777970]">
          CURATED COLOR SWATCHES & 34" WORKBENCH
        </div>
      </div>
    </div>
  );
};
