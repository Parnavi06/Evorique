import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/site';

interface StudioProps {
  onOpenProjectInquiry: () => void;
}

export const Studio: React.FC<StudioProps> = ({ onOpenProjectInquiry }) => {
  return (
    <section id="studio" className="w-full py-24 sm:py-32 px-6 sm:px-10 md:px-14 max-w-[1440px] mx-auto border-b border-[#DCD7CE]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Visual Exhibition Plate */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="p-3 sm:p-4 bg-[#FFFFFF] rounded-2xl border border-[#DCD7CE] shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#E5E0D6] relative">
              <img
                src="/scenes/state_02_the_thinking.jpg"
                alt="Evorique architectural portal study"
                className="w-full h-full object-cover object-center filter saturate-[0.92] hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#242520]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-[#FFFFFF]">
                <span className="text-[9px] font-mono uppercase tracking-ultra-wide text-[#F4F1EA]/80 block">
                  INDEPENDENT STUDIO ENVIRONMENT
                </span>
                <span className="font-editorial text-lg text-[#FFFFFF]">
                  Crafted with deliberate restraint.
                </span>
              </div>
            </div>

            <div className="pt-3 px-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#777970]">
              <span>STUDIO APERTURE STUDY</span>
              <span className="text-[#84958B]">MONOLITHIC LIMESTONE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Honest Editorial Narrative */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-4">
            SECTION 06 // THE STUDIO
          </span>

          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#242520] leading-[1.0] max-w-xl">
            {SITE.studio.headline}
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-[#3A3C35] font-light leading-relaxed max-w-lg">
            {SITE.studio.body}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-[#777970] font-light leading-relaxed max-w-lg">
            {SITE.studio.statement}
          </p>

          {/* Real Studio Attributes Grid */}
          <div className="mt-10 pt-8 border-t border-[#DCD7CE] grid grid-cols-2 sm:grid-cols-2 gap-6">
            {SITE.studio.attributes.map((attr, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-ultra-wide text-[#84958B] font-mono block mb-1">
                  {attr.label}
                </span>
                <span className="text-sm sm:text-base font-editorial text-[#242520]">
                  {attr.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6">
            <button
              onClick={onOpenProjectInquiry}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-medium text-[#242520] hover:text-[#84958B] transition-colors group"
            >
              <span>DISCUSS A COLLABORATION</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
