import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SITE } from '../data/site';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full pt-16 pb-12 px-6 sm:px-10 md:px-14 max-w-[1440px] mx-auto">
      {/* Large Editorial Watermark */}
      <div className="w-full overflow-hidden select-none pb-12 sm:pb-16 border-b border-[#DCD7CE]">
        <div className="font-editorial text-[14vw] sm:text-[13vw] font-normal tracking-tight text-[#E5E0D6] leading-[0.85] whitespace-nowrap">
          {SITE.brand}
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777970]">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#B7B5AA]">
            © {new Date().getFullYear()} {SITE.brand} STUDIO
          </span>
          <span>•</span>
          <span className="text-[11px] italic font-editorial text-[#555850]">
            "{SITE.tagline}"
          </span>
        </div>

        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-ultra-wide text-[#777970] hover:text-[#242520] transition-colors"
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <div className="w-7 h-7 rounded-full border border-[#DCD7CE] group-hover:border-[#242520] group-hover:bg-[#242520] group-hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-200">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </footer>
  );
};
