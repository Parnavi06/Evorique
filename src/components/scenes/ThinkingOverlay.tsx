import React from 'react';

interface ThinkingOverlayProps {
  opacity: number;
  onNextClick: () => void;
}

export const ThinkingOverlay: React.FC<ThinkingOverlayProps> = ({ opacity, onNextClick }) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-md mt-14 sm:mt-20 md:mt-24">
        <span className="text-[11px] uppercase tracking-widest text-[#8c8578] font-medium block mb-2">
          Studio Philosophy
        </span>
        <h2 className="font-editorial text-4xl sm:text-5xl font-light tracking-tight text-[#1a1918] leading-tight">
          Ideas that move the world.
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-[#5c564c] font-normal leading-relaxed">
          We approach strategy, design, and engineering not as sequential handoffs, but as a singular architectural craft. By stripping away transient visual noise, we create software with lasting utility and quiet authority.
        </p>
      </div>

      {/* Right-aligned Pillar Words as shown in reference */}
      <div className="absolute right-8 sm:right-16 md:right-24 top-[32%] text-right font-editorial text-3xl sm:text-4xl text-[#1a1918] font-light space-y-1">
        <div className="hover:translate-x-[-4px] transition-transform">Ideas</div>
        <div className="hover:translate-x-[-4px] transition-transform">Design</div>
        <div className="hover:translate-x-[-4px] transition-transform">Technology</div>
        <div className="hover:translate-x-[-4px] transition-transform">Impact</div>
      </div>

      {/* Curved Arrow: "Continue zooming in" */}
      <div className="absolute right-[28%] sm:right-[34%] md:right-[38%] bottom-[30%] pointer-events-auto flex items-center">
        <div className="relative group cursor-pointer" onClick={onNextClick}>
          <svg className="w-28 h-14 text-[#2d2b28] transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 50" fill="none">
            <path
              d="M 90 40 Q 50 45 15 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
            <polygon points="15,15 24,18 20,27" fill="currentColor" />
          </svg>
          <span className="absolute top-2 left-16 text-[11px] uppercase tracking-widest text-[#2c2a27] font-medium whitespace-nowrap group-hover:text-[#000000] transition-colors">
            Continue zooming in
          </span>
        </div>
      </div>
    </div>
  );
};
