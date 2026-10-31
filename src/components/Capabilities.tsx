import React, { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { SITE, Capability } from '../data/site';

interface CapabilitiesProps {
  onOpenInquiryForCapability: (capabilityName: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onOpenInquiryForCapability }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleRow = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="services" className="w-full py-24 sm:py-32 px-6 sm:px-10 md:px-14 max-w-[1440px] mx-auto border-b border-[#DCD7CE]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#DCD7CE]">
        <div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-3">
            SECTION 04 // DISCIPLINES
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#242520]">
            Capabilities
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-[#777970] font-light leading-relaxed">
          We combine brand vision with technical precision to build enduring products, websites, and spatial systems.
        </p>
      </div>

      {/* Large Typographic Rows */}
      <div className="divide-y divide-[#DCD7CE]">
        {SITE.capabilities.map((cap: Capability, idx: number) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={cap.number}
              className="py-8 sm:py-12 transition-colors duration-200"
            >
              <div
                onClick={() => toggleRow(idx)}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer select-none"
              >
                {/* Number & Title */}
                <div className="flex items-center gap-6 sm:gap-10">
                  <span className="font-mono text-xs sm:text-sm text-[#B7B5AA] group-hover:text-[#84958B] transition-colors">
                    {cap.number}
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#242520] group-hover:text-[#84958B] group-hover:translate-x-2 transition-all duration-300">
                    {cap.title}
                  </h3>
                </div>

                {/* Tagline & Expand Trigger */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <span className="text-xs sm:text-sm text-[#777970] font-light max-w-sm hidden lg:inline-block">
                    {cap.tagline}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#DCD7CE] group-hover:border-[#242520] group-hover:bg-[#242520] group-hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-200">
                    {isExpanded ? (
                      <Minus className="w-4 h-4 transition-transform" />
                    ) : (
                      <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Details Drawer */}
              {isExpanded && (
                <div className="mt-8 pt-8 border-t border-[#DCD7CE]/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                  <div className="lg:col-span-4">
                    <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
                      SCOPE & DELIVERY
                    </span>
                    <p className="text-sm sm:text-base text-[#555850] font-light leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
                      SPECIFIC DELIVERABLES
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCD7CE] text-xs text-[#242520] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex lg:justify-end items-center pt-2">
                    <button
                      onClick={() => onOpenInquiryForCapability(cap.title)}
                      className="px-5 py-3 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-all duration-200 flex items-center gap-2 group"
                    >
                      <span>Inquire This Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
