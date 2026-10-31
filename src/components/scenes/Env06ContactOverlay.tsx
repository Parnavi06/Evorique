import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, RotateCcw, Mail } from 'lucide-react';
import { CANVAS_ENVIRONMENTS } from '../../data/canvasData';

interface Env06Props {
  opacity: number;
  onOpenInquiry: () => void;
  onRestartClick: () => void;
}

export const Env06ContactOverlay: React.FC<Env06Props> = ({
  opacity,
  onOpenInquiry,
  onRestartClick
}) => {
  const env = CANVAS_ENVIRONMENTS[5];
  const [copied, setCopied] = useState(false);

  if (opacity <= 0.01) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('inquiries@evorique.agency');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 transition-opacity duration-300 select-none z-10"
      style={{ opacity }}
    >
      <div className="pt-12 sm:pt-14" />

      {/* Main Destination Callout */}
      <div className="max-w-xl my-auto text-center sm:text-left mx-auto sm:mx-0">
        <div className="text-xs uppercase tracking-ultra-wide font-mono text-[#84958B] mb-2">
          {env.depthCode}
        </div>
        <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#242520] leading-[0.95]">
          {env.headline}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#555850] font-light leading-relaxed max-w-lg">
          {env.description}
        </p>

        {/* Action Triggers */}
        <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 pointer-events-auto">
          <button
            onClick={onOpenInquiry}
            className="group px-8 py-4 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center gap-3 shadow-md hover:scale-105"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#84958B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#DCD7CE] bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-xs uppercase tracking-widest text-[#242520] font-medium transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#84958B]" />
                <span>EMAIL COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#777970]" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>

          <button
            onClick={onRestartClick}
            className="inline-flex items-center gap-2 px-5 py-4 rounded-full border border-[#DCD7CE] bg-transparent text-xs uppercase tracking-widest text-[#777970] hover:text-[#242520] font-medium transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REVISIT THE CANVAS</span>
          </button>
        </div>

        {/* Email Direct Line */}
        <div className="mt-6 pointer-events-auto">
          <a
            href="mailto:inquiries@evorique.agency"
            className="inline-flex items-center gap-2 text-xs text-[#777970] hover:text-[#242520] transition-colors font-mono"
          >
            <Mail className="w-3.5 h-3.5 text-[#84958B]" />
            <span>inquiries@evorique.agency</span>
          </a>
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
};
