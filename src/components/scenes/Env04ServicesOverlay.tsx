import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CANVAS_ENVIRONMENTS, STUDIO_SERVICES } from '../../data/canvasData';

interface Env04Props {
  opacity: number;
  onNextClick: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const Env04ServicesOverlay: React.FC<Env04Props> = ({
  opacity,
  onNextClick,
  onSelectService
}) => {
  const env = CANVAS_ENVIRONMENTS.find((e) => e.id === 3) || CANVAS_ENVIRONMENTS[2];
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      <div className="pt-12 sm:pt-14" />

      {/* Main Services Editorial Matrix */}
      <div className="w-full my-auto flex flex-col justify-between gap-6">
        <div className="max-w-xl">
          <div className="text-xs uppercase tracking-ultra-wide font-mono text-[#84958B] mb-2">
            {env.depthCode}
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#242520] leading-[1.02]">
            {env.headline}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#777970] font-light leading-relaxed max-w-lg">
            {env.description}
          </p>
        </div>

        {/* 5 Editorial Service Strips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pointer-events-auto pt-2">
          {STUDIO_SERVICES.map((s) => (
            <div
              key={s.number}
              onClick={() => onSelectService?.(s.title)}
              className="p-4 rounded-2xl bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] backdrop-blur-md border border-[#DCD7CE] hover:border-[#242520] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <span className="font-mono text-xs text-[#84958B] block mb-1">
                  {s.number}
                </span>
                <h3 className="font-editorial text-xl font-normal text-[#242520] mb-2">
                  {s.title}
                </h3>
                <p className="text-[11px] text-[#777970] font-light leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#DCD7CE]/60 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#242520] font-medium">
                <span>Inquire</span>
                <span>+</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 pointer-events-auto">
          <button
            onClick={onNextClick}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#242520] font-medium hover:text-[#84958B] transition-colors"
          >
            <span>Proceed to Studio Observatory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
};
