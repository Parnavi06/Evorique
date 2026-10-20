import React from 'react';

interface HeroOverlayProps {
  opacity: number;
  onExploreClick: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ opacity, onExploreClick }) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Editorial Title Block - Clean, elegant, non-overlapping */}
      <div className="max-w-md mt-8 sm:mt-12 md:mt-14">
        <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1a1918] leading-[0.95]">
          Evorique
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-[#33302c] font-light leading-snug">
          Digital products<br />
          for a more human future.
        </p>
      </div>

      {/* Curved Arrow Annotation: "Zoom into the mark" */}
      <div className="absolute right-[18%] sm:right-[24%] md:right-[28%] top-[34%] md:top-[32%] pointer-events-auto flex items-center">
        <div className="relative group cursor-pointer" onClick={onExploreClick}>
          <svg className="w-24 h-16 text-[#2d2b28] drop-shadow-sm transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 60" fill="none">
            <path
              d="M 10 50 Q 55 10 90 28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
            <polygon points="90,28 82,23 83,32" fill="currentColor" />
          </svg>
          <span className="absolute -top-3 left-6 text-[11px] uppercase tracking-widest text-[#2c2a27] font-medium whitespace-nowrap group-hover:text-[#000000] transition-colors">
            Zoom into the mark
          </span>
        </div>
      </div>
    </div>
  );
};
