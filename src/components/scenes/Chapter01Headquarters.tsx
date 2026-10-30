import React from 'react';
import { ArrowDown } from 'lucide-react';
import { CHAPTERS } from '../../constants/content';

interface Chapter01Props {
  opacity: number;
  onExploreClick: () => void;
}

export const Chapter01Headquarters: React.FC<Chapter01Props> = ({ opacity, onExploreClick }) => {
  const info = CHAPTERS[0];
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      {/* Top Telemetry Tag */}
      <div className="w-full flex justify-between items-center pt-8 md:pt-10">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#FAF9F6]/85 backdrop-blur-md border border-[#C9C1B3]/50 text-[10px] tracking-ultra-wide uppercase font-semibold text-[#777970]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B69A70]" />
          <span>{info.locationCode}</span>
        </div>
        <div className="text-[11px] font-medium tracking-ultra-wide uppercase text-[#777970] hidden sm:block">
          THE DIGITAL PRODUCT FACTORY —
        </div>
      </div>

      {/* Main Hero Block */}
      <div className="max-w-xl my-auto">
        <div className="text-xs uppercase tracking-ultra-wide font-medium text-[#B69A70] mb-3">
          {info.subtitle}
        </div>
        <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#252824] leading-[0.92]">
          Evorique
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-[#3A3D39] font-light leading-snug max-w-lg">
          {info.headline}
        </p>
        <p className="mt-4 text-xs sm:text-sm text-[#777970] font-normal leading-relaxed max-w-md">
          {info.description}
        </p>

        {/* Action Button */}
        <div className="mt-8 pointer-events-auto">
          <button
            onClick={onExploreClick}
            className="group px-7 py-3.5 rounded-full bg-[#252824] hover:bg-[#181A18] text-[#FAF9F6] text-xs uppercase tracking-widest font-medium transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow-md hover:gap-4"
          >
            <span>Step Inside The Factory</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B69A70] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Artifact Bar */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4">
        <div className="flex items-center gap-6 text-xs text-[#777970]">
          {info.artifacts?.map((item, i) => (
            <div key={i} className="hidden md:block">
              <span className="text-[10px] uppercase tracking-wider text-[#9CA995] block font-medium">{item.label}</span>
              <span className="text-xs text-[#252824] font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Scroll Guidance */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-ultra-wide text-[#777970] pointer-events-auto">
          <span>SCROLL TO EXPLORE</span>
          <div className="w-8 h-[1px] bg-[#C9C1B3]" />
        </div>
      </div>
    </div>
  );
};
