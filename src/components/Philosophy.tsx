import React from 'react';
import { SITE } from '../data/site';

export const Philosophy: React.FC = () => {
  return (
    <section className="w-full py-24 sm:py-32 px-6 sm:px-10 md:px-14 max-w-[1440px] mx-auto border-b border-[#DCD7CE]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Typographic Statement */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-4">
            SECTION 03 // THE PHILOSOPHY
          </span>

          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#242520] leading-[1.0] max-w-xl">
            {SITE.philosophy.headline}
          </h2>

          <p className="mt-8 text-base sm:text-lg text-[#555850] font-light leading-relaxed max-w-lg">
            {SITE.philosophy.body}
          </p>

          {/* Three Deliberate Tenets */}
          <div className="mt-12 pt-8 border-t border-[#DCD7CE] grid grid-cols-1 sm:grid-cols-3 gap-8">
            {SITE.philosophy.principles.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#84958B] mb-2">
                  0{idx + 1}
                </span>
                <h4 className="font-editorial text-xl font-normal text-[#242520] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#777970] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Architectural Visual Exhibition Plate */}
        <div className="lg:col-span-5 relative">
          <div className="p-3 sm:p-4 bg-[#FFFFFF] rounded-2xl border border-[#DCD7CE] shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#E5E0D6] relative">
              <img
                src="/scenes/state_03_inside_studio.jpg"
                alt="Evorique studio architecture"
                className="w-full h-full object-cover object-center filter saturate-[0.92] hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#242520]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-[#FFFFFF]">
                <span className="text-[9px] font-mono uppercase tracking-ultra-wide text-[#F4F1EA]/80 block">
                  STUDIO ARCHITECTURE // FOCUS
                </span>
                <span className="font-editorial text-lg text-[#FFFFFF]">
                  Form follows intention.
                </span>
              </div>
            </div>

            <div className="pt-3 px-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#777970]">
              <span>NATURAL DAYLIGHT STUDY</span>
              <span className="text-[#84958B]">HONED LIMESTONE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
