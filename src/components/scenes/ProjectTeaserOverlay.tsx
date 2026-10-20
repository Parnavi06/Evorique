import React from 'react';

interface ProjectTeaserOverlayProps {
  opacity: number;
  onEnterScreen: () => void;
}

export const ProjectTeaserOverlay: React.FC<ProjectTeaserOverlayProps> = ({ opacity, onEnterScreen }) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-end p-8 sm:p-12 md:p-16 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Curved Arrow: "Zoom further into the project" */}
      <div className="absolute right-[24%] sm:right-[30%] md:right-[34%] bottom-[24%] pointer-events-auto flex items-center">
        <div className="relative group cursor-pointer" onClick={onEnterScreen}>
          <svg className="w-32 h-16 text-[#ffffff] drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 50" fill="none">
            <path
              d="M 10 40 Q 50 10 85 28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
            <polygon points="85,28 77,22 79,31" fill="currentColor" />
          </svg>
          <span className="absolute -top-3 left-6 text-[11px] uppercase tracking-widest text-[#ffffff] drop-shadow-md font-medium whitespace-nowrap group-hover:underline transition-all">
            Zoom further into the project
          </span>
        </div>
      </div>
    </div>
  );
};
