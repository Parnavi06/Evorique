import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CANVAS_ENVIRONMENTS, PORTFOLIO_EXHIBITS, PortfolioExhibit } from '../../data/canvasData';

interface Env03Props {
  opacity: number;
  onSelectProject: (id: string) => void;
  onNextClick: () => void;
}

export const Env03SelectedWorkOverlay: React.FC<Env03Props> = ({
  opacity,
  onSelectProject,
  onNextClick
}) => {
  const env = CANVAS_ENVIRONMENTS[2];
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      <div className="pt-12 sm:pt-14" />

      {/* Main Narrative Block & Project Tray */}
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

        {/* Curated Project Quick-Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto pt-2">
          {PORTFOLIO_EXHIBITS.map((p: PortfolioExhibit) => (
            <div
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              className="group cursor-pointer p-4 rounded-2xl bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] backdrop-blur-md border border-[#DCD7CE] hover:border-[#242520] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#84958B] mb-2">
                  <span>{p.year}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B7B5AA] group-hover:text-[#242520] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-normal text-[#242520] group-hover:text-[#84958B] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[11px] text-[#777970] font-light line-clamp-2 mt-1">
                  {p.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#DCD7CE]/60 flex items-center justify-between text-[10px] uppercase tracking-wider font-medium text-[#242520]">
                <span>Case Study</span>
                <span className="font-mono text-[#B7B5AA]">0{p.id === 'aurora' ? '1' : p.id === 'the-mark' ? '2' : p.id === 'studio-workspace' ? '3' : '4'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transition Action */}
        <div className="pt-2 pointer-events-auto">
          <button
            onClick={onNextClick}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#242520] font-medium hover:text-[#84958B] transition-colors"
          >
            <span>Zoom Into Studio Disciplines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
};
