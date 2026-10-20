import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StudioOverlayProps {
  opacity: number;
  onZoomProject: () => void;
}

export const StudioOverlay: React.FC<StudioOverlayProps> = ({ opacity, onZoomProject }) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-md mt-12 sm:mt-18 md:mt-20">
        <span className="text-[11px] uppercase tracking-widest text-[#8c8578] font-medium block mb-2">
          Environment & Process
        </span>
        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1a1918] leading-[1.05]">
          A place<br />
          where ideas<br />
          turn real.
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-[#5c564c] leading-relaxed max-w-sm">
          We combine product strategy, interactive systems, and spatial design to translate ambitious concepts into production-grade digital products.
        </p>

        {/* Explore our work button */}
        <div className="mt-8 pointer-events-auto">
          <button
            onClick={onZoomProject}
            className="group flex items-center gap-3 text-xs uppercase tracking-widest text-[#1a1918] font-medium"
          >
            <span className="w-10 h-10 rounded-full border border-[#b8b0a2] group-hover:border-[#1a1918] group-hover:bg-[#1a1918] group-hover:text-[#ffffff] flex items-center justify-center transition-all duration-200">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span>Explore our work</span>
          </button>
        </div>
      </div>

      {/* Curved Arrow Annotation: "Zoom into a project" pointing to desk laptop */}
      <div className="absolute right-[16%] sm:right-[20%] md:right-[24%] top-[30%] md:top-[28%] pointer-events-auto flex items-center">
        <div className="relative group cursor-pointer" onClick={onZoomProject}>
          <svg className="w-28 h-20 text-[#2d2b28] transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 70" fill="none">
            <path
              d="M 10 20 Q 60 5 85 45"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
            <polygon points="85,45 80,36 88,38" fill="currentColor" />
          </svg>
          <span className="absolute -top-3 left-6 text-[11px] uppercase tracking-widest text-[#2c2a27] font-medium whitespace-nowrap group-hover:text-[#000000] transition-colors">
            Zoom into a project
          </span>
        </div>
      </div>
    </div>
  );
};
