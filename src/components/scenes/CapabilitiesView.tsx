import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CAPABILITIES } from '../../constants/content';

interface CapabilitiesViewProps {
  opacity: number;
  onSelectCapability: (id: string) => void;
}

export const CapabilitiesView: React.FC<CapabilitiesViewProps> = ({
  opacity,
  onSelectCapability
}) => {
  if (opacity <= 0.01) return null;

  // Spatial positions corresponding to the 4 architectural hubs of the campus
  const getCardPositionClass = (id: string) => {
    switch (id) {
      case 'strategy':
        // Top-left platform
        return 'top-[20%] left-[8%] sm:left-[14%] md:left-[18%]';
      case 'design':
        // Lower-left platform
        return 'bottom-[24%] left-[6%] sm:left-[12%] md:left-[15%]';
      case 'technology':
        // Top-right platform
        return 'top-[22%] right-[8%] sm:right-[14%] md:right-[18%]';
      case 'engineering':
        // Lower-right platform
        return 'bottom-[22%] right-[6%] sm:right-[12%] md:right-[16%]';
      default:
        return 'top-1/2 left-1/2';
    }
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* 4 Spatial Hub Cards positioned across the landscape */}
      {CAPABILITIES.map((cap) => (
        <div
          key={cap.id}
          className={`absolute ${getCardPositionClass(cap.id)} pointer-events-auto transform -translate-y-1/2`}
        >
          <button
            onClick={() => onSelectCapability(cap.id)}
            className="group block text-left bg-[#ffffff]/90 hover:bg-[#ffffff] backdrop-blur-md p-5 rounded-2xl border border-[#ded5c6] hover:border-[#1a1918] transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-1 w-60 sm:w-68 md:w-72"
          >
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-editorial text-2xl font-light text-[#1a1918]">
                {cap.title}
              </h3>
              <span className="w-6 h-6 rounded-full bg-[#f6f2ea] group-hover:bg-[#1a1918] group-hover:text-[#ffffff] flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-xs text-[#6e685e] leading-relaxed">
              {cap.tagline}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium tracking-wider uppercase text-[#9c9487] group-hover:text-[#1a1918] transition-colors">
              <span>View Practice Details</span>
              <span>→</span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};
