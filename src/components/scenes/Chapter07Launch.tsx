import React from 'react';
import { ArrowUpRight, ArrowRight, ExternalLink } from 'lucide-react';
import { CHAPTERS, AURORA_CASE_STUDY } from '../../constants/content';

interface Chapter07Props {
  opacity: number;
  onExploreAurora: () => void;
  onNextClick: () => void;
}

export const Chapter07Launch: React.FC<Chapter07Props> = ({
  opacity,
  onExploreAurora,
  onNextClick
}) => {
  const info = CHAPTERS[6];
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
          CHAPTER 07 — PRODUCT LAUNCH
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
        <div className="mt-3 inline-block px-3 py-1 rounded-md bg-[#252824]/5 border border-[#C9C1B3]/40 text-[11px] font-mono text-[#777970]">
          AURORA // {AURORA_CASE_STUDY.tagline}
        </div>
        <p className="mt-3 text-xs sm:text-sm text-[#777970] font-normal leading-relaxed max-w-md">
          {info.description}
        </p>

        {/* Action Triggers */}
        <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
          <button
            onClick={onExploreAurora}
            className="group px-6 py-3 rounded-full bg-[#252824] hover:bg-[#181A18] text-[#FAF9F6] text-xs uppercase tracking-widest font-medium transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow-md"
          >
            <span>Read Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B69A70] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onNextClick}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#C9C1B3] bg-[#FAF9F6]/80 hover:bg-[#FAF9F6] text-xs uppercase tracking-widest text-[#252824] font-medium transition-all"
          >
            <span>{info.transitionPrompt}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
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
          CHAMPAGNE BRONZE PAVILION // LAUNCH PEDESTAL
        </div>
      </div>
    </div>
  );
};
