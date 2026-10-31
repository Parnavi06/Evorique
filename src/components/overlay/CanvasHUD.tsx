import React, { useState } from 'react';
import { Compass, ArrowUpRight, ChevronDown } from 'lucide-react';
import { CANVAS_ENVIRONMENTS } from '../../data/canvasData';

interface CanvasHUDProps {
  progress: number;
  activeEnvId: number;
  onNavigateEnv: (id: number) => void;
  onOpenInquiry: () => void;
}

export const CanvasHUD: React.FC<CanvasHUDProps> = ({
  progress,
  activeEnvId,
  onNavigateEnv,
  onOpenInquiry
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentEnv = CANVAS_ENVIRONMENTS.find((e) => e.id === activeEnvId) || CANVAS_ENVIRONMENTS[0];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-10 md:p-12 select-none">
      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        {/* Left: Minimalist Sans Wordmark & Depth Telemetry */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => onNavigateEnv(1)}
            className="font-sans font-medium text-lg sm:text-xl tracking-[0.08em] uppercase text-[#242520] hover:opacity-70 transition-opacity focus:outline-none"
            aria-label="Evorique Home"
          >
            EVORIQUE
          </button>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/85 backdrop-blur-md border border-[#DCD7CE] text-[10px] font-mono tracking-wider text-[#777970]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84958B]" />
            <span>{currentEnv.depthCode}</span>
          </div>
        </div>

        {/* Right: Progress Indicator & Navigation Dropdown */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Scroll Progress Bar */}
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-[#777970]">
            <span>DEPTH</span>
            <div className="w-16 h-[2px] bg-[#DCD7CE] relative overflow-hidden rounded-full">
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#242520] transition-all duration-100"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span>{Math.round(progress * 100)}%</span>
          </div>

          {/* Quick Jump Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] border border-[#DCD7CE] text-[10px] font-sans font-medium tracking-wider uppercase text-[#242520] flex items-center gap-2 transition-all shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-[#84958B]" />
              <span className="hidden sm:inline">Environments</span>
              <ChevronDown className="w-3 h-3 text-[#777970]" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-10 right-0 w-64 bg-[#F4F1EA]/95 backdrop-blur-xl p-3 rounded-2xl border border-[#DCD7CE] shadow-2xl space-y-1 animate-fade-in z-50">
                <div className="text-[9px] uppercase tracking-ultra-wide text-[#84958B] px-3 py-1 font-mono">
                  NESTED CANVAS SECTORS
                </div>
                {CANVAS_ENVIRONMENTS.map((env) => {
                  const isActive = env.id === activeEnvId;
                  return (
                    <button
                      key={env.id}
                      onClick={() => {
                        onNavigateEnv(env.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs tracking-wider transition-all flex items-center justify-between font-sans ${
                        isActive
                          ? 'bg-[#242520] text-[#FFFFFF] font-medium'
                          : 'text-[#555850] hover:bg-[#E5E0D6]'
                      }`}
                    >
                      <span>0{env.id} — {env.title}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#84958B]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Inquire Button */}
          <button
            onClick={onOpenInquiry}
            className="px-4 py-1.5 rounded-full border border-[#242520] text-[#242520] hover:bg-[#242520] hover:text-[#FFFFFF] text-[10px] font-sans font-medium uppercase tracking-wider transition-all flex items-center gap-1.5"
          >
            <span>INQUIRE</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* Bottom Footer Bar */}
      <footer className="w-full flex items-end justify-between pointer-events-auto">
        {/* Left: Depth Pagination Numbers (01 to 06) */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-mono tracking-wider text-[#777970]">
          {CANVAS_ENVIRONMENTS.map((env) => {
            const isActive = env.id === activeEnvId;
            return (
              <button
                key={env.id}
                onClick={() => onNavigateEnv(env.id)}
                className={`transition-all duration-200 flex items-center gap-1 ${
                  isActive
                    ? 'text-[#242520] font-bold scale-110'
                    : 'hover:text-[#242520] text-[#B7B5AA]'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#84958B] inline-block" />}
                <span>0{env.id}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Scroll Prompt */}
        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#777970]">
          <span>{currentEnv.focalPrompt}</span>
          <div className="w-8 h-[1px] bg-[#DCD7CE]" />
        </div>
      </footer>
    </div>
  );
};
