import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SITE } from '../data/site';

interface HeroProps {
  onExploreWork: () => void;
  onOpenProjectInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenProjectInquiry }) => {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen pt-28 sm:pt-36 pb-16 px-6 sm:px-10 md:px-14 flex flex-col justify-between max-w-[1440px] mx-auto border-b border-[#DCD7CE]">
      {/* Top Gallery Telemetry Line */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between pb-8 sm:pb-12 border-b border-[#DCD7CE]/60"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84958B]" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#777970]">
            {SITE.eyebrow}
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#B7B5AA]">
          EXHIBITION // VOL. 01 — 2025
        </div>
      </motion.div>

      {/* Main Asymmetric Editorial Composition */}
      <div className="my-auto py-8 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Monumental Editorial Statement */}
        <div className="lg:col-span-7 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-ultra-wide text-[#84958B] font-medium mb-4 sm:mb-6"
          >
            {SITE.tagline}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.2rem] font-normal tracking-tight text-[#242520] leading-[0.94] max-w-2xl"
          >
            WE MAKE IDEAS
            <span className="italic block font-light text-[#383A34] sm:mt-1">
              IMPOSSIBLE
            </span>
            TO IGNORE.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-[#555850] font-light leading-relaxed max-w-lg"
          >
            {SITE.positioning}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <button
              onClick={onExploreWork}
              className="group px-8 py-4 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#84958B] group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenProjectInquiry}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#DCD7CE] hover:border-[#242520] bg-transparent text-xs uppercase tracking-widest text-[#242520] font-medium transition-colors group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#777970] group-hover:text-[#242520] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Architectural Exhibition Artwork Plate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative p-3 sm:p-4 bg-[#FFFFFF] rounded-2xl border border-[#DCD7CE] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-xl overflow-hidden bg-[#E5E0D6]">
              <img
                src="/scenes/state_01_the_mark.jpg"
                alt="Evorique architectural brand environment"
                className="w-full h-full object-cover object-center filter saturate-[0.92] hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#242520]/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#FFFFFF] text-xs">
                <div>
                  <span className="text-[9px] uppercase tracking-ultra-wide block font-mono text-[#F4F1EA]/80">
                    PLATE 01 — ARCHITECTURAL HORIZON
                  </span>
                  <span className="font-editorial text-lg tracking-tight text-[#FFFFFF]">
                    The Mark // Spatial Identity
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#242520]/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[#F4F1EA]">
                  2025
                </span>
              </div>
            </div>

            {/* Gallery Specimen Tag */}
            <div className="pt-3.5 px-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#777970]">
              <span>CURATED FOR EVORIQUE GALLERY</span>
              <span className="text-[#84958B]">• ACTIVE STUDY</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#777970]"
      >
        <div className="flex items-center gap-6">
          <span className="text-[10px] uppercase tracking-ultra-wide text-[#B7B5AA]">PRACTICE:</span>
          <span className="text-[11px] font-medium text-[#242520]">Identity • Digital • Technology</span>
        </div>

        <button
          onClick={onExploreWork}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-ultra-wide text-[#777970] hover:text-[#242520] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-12 h-[1px] bg-[#DCD7CE] group-hover:bg-[#242520] relative overflow-hidden transition-colors">
            <div className="absolute inset-0 bg-[#242520] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </div>
        </button>
      </motion.div>
    </section>
  );
};
