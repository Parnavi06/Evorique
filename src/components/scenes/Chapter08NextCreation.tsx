import React from 'react';
import { ArrowUpRight, RotateCcw, Mail } from 'lucide-react';
import { CHAPTERS } from '../../constants/content';

interface Chapter08Props {
  opacity: number;
  onContactClick: () => void;
  onRestartClick: () => void;
}

export const Chapter08NextCreation: React.FC<Chapter08Props> = ({
  opacity,
  onContactClick,
  onRestartClick
}) => {
  const info = CHAPTERS[7];
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
          CHAPTER 08 — THE NEXT CREATION
        </div>
      </div>

      {/* Main Retrospective Centerpiece */}
      <div className="max-w-xl my-auto text-center sm:text-left mx-auto sm:mx-0">
        <div className="text-xs uppercase tracking-ultra-wide font-medium text-[#B69A70] mb-3">
          {info.subtitle}
        </div>
        <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#252824] leading-[0.98]">
          {info.headline}
        </h2>
        <p className="mt-5 text-sm sm:text-base text-[#777970] font-normal leading-relaxed max-w-lg">
          {info.description}
        </p>

        {/* Action Triggers */}
        <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 pointer-events-auto">
          <button
            onClick={onContactClick}
            className="group px-8 py-4 rounded-full bg-[#252824] hover:bg-[#181A18] text-[#FAF9F6] text-xs uppercase tracking-widest font-medium transition-all duration-200 flex items-center gap-3 shadow-md hover:shadow-lg hover:scale-105"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4 text-[#B69A70] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onRestartClick}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-[#C9C1B3] bg-[#FAF9F6]/90 hover:bg-[#FAF9F6] text-xs uppercase tracking-widest text-[#252824] font-medium transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#777970]" />
            <span>Revisit The Factory</span>
          </button>
        </div>

        {/* Direct Contact Line */}
        <div className="mt-6 pointer-events-auto">
          <a
            href="mailto:inquiries@evorique.agency"
            className="inline-flex items-center gap-2 text-xs text-[#777970] hover:text-[#252824] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#B69A70]" />
            <span className="underline underline-offset-4 font-mono">inquiries@evorique.agency</span>
          </a>
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
          GLOBAL CLIENT PARTNERSHIPS // END-TO-END FACTORY
        </div>
      </div>
    </div>
  );
};
