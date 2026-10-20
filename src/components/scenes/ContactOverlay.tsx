import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ContactOverlayProps {
  opacity: number;
  onOpenContactModal: () => void;
}

export const ContactOverlay: React.FC<ContactOverlayProps> = ({
  opacity,
  onOpenContactModal
}) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Top Right Tagline */}
      <div className="w-full flex justify-end">
        <span className="text-[11px] font-medium tracking-ultra-wide uppercase text-[#5c564b]">
          BUILT TO LEAVE A MARK —
        </span>
      </div>

      {/* Main Left Editorial Block */}
      <div className="max-w-lg mb-10 sm:mb-14 md:mb-16">
        <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1a1918] leading-[1.02]">
          Let's make<br />
          something matter.
        </h2>

        <p className="mt-5 text-sm sm:text-base text-[#524d44] font-light leading-relaxed max-w-md">
          Every journey leads to the same place — a conversation. Tell us about your idea and we'll help you take it from concept to reality.
        </p>

        <div className="mt-8 pointer-events-auto">
          <button
            onClick={onOpenContactModal}
            className="px-8 py-4 rounded-full bg-[#1a1918] text-[#fbf9f5] text-xs font-medium uppercase tracking-widest hover:bg-[#333333] transition-all flex items-center gap-3 shadow-md hover:shadow-xl hover:gap-4 group"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 text-[#fbf9f5] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Right Brand Mark */}
      <div className="w-full flex justify-end items-end">
        <span className="font-editorial text-3xl sm:text-4xl font-light text-[#1a1918]">
          Evorique
        </span>
      </div>
    </div>
  );
};
