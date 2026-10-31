import React from 'react';
import { SITE, ProcessStage } from '../data/site';

export const Process: React.FC = () => {
  return (
    <section className="w-full py-24 sm:py-32 px-6 sm:px-10 md:px-14 max-w-[1440px] mx-auto border-b border-[#DCD7CE]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#DCD7CE]">
        <div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-3">
            SECTION 05 // METHODOLOGY
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#242520]">
            {SITE.process.headline}
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-[#777970] font-light leading-relaxed">
          A disciplined four-phase progression that transforms high-ambition concepts into tangible, tested digital realities.
        </p>
      </div>

      {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
      <div className="pt-12 sm:pt-16 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 relative">
        {/* Subtle Horizontal Timeline Rule for Desktop */}
        <div className="hidden md:block absolute top-[4.2rem] left-0 right-0 h-[1px] bg-[#DCD7CE] z-0" />

        {SITE.process.stages.map((stage: ProcessStage, idx: number) => (
          <div
            key={stage.number}
            className="group relative z-10 flex flex-col p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#DCD7CE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#242520] transition-all duration-300"
          >
            {/* Stage Indicator Node */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#DCD7CE]/60">
              <span className="font-mono text-xs text-[#84958B] font-medium">
                PHASE {stage.number}
              </span>
              <div className="w-7 h-7 rounded-full bg-[#F4F1EA] border border-[#DCD7CE] group-hover:bg-[#242520] group-hover:text-[#FFFFFF] flex items-center justify-center text-[11px] font-mono transition-colors">
                {idx + 1}
              </div>
            </div>

            {/* Stage Title & Subtitle */}
            <h3 className="font-editorial text-3xl font-normal tracking-tight text-[#242520] mb-1">
              {stage.title}
            </h3>
            <span className="text-[11px] uppercase tracking-wider text-[#B7B5AA] font-mono block mb-4">
              {stage.subtitle}
            </span>

            {/* Stage Description */}
            <p className="text-xs sm:text-sm text-[#555850] font-light leading-relaxed flex-1">
              {stage.description}
            </p>

            {/* Deliverables List */}
            <div className="mt-6 pt-4 border-t border-[#DCD7CE]/60">
              <span className="text-[9px] uppercase tracking-ultra-wide text-[#84958B] block mb-2 font-mono">
                OUTPUTS
              </span>
              <ul className="space-y-1.5">
                {stage.deliverables.map((d) => (
                  <li key={d} className="text-[11px] text-[#777970] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#84958B]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
