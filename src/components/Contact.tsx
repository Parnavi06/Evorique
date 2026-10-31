import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Phone } from 'lucide-react';
import { SITE } from '../data/site';

interface ContactProps {
  onOpenProjectInquiry: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenProjectInquiry }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="w-full pt-24 sm:pt-32 pb-16 px-6 sm:px-10 md:px-14 max-w-[1440px] mx-auto">
      {/* Visual Panorama Banner */}
      <div className="w-full rounded-2xl overflow-hidden border border-[#DCD7CE] bg-[#E5E0D6] mb-16 sm:mb-24 relative shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <div className="aspect-[21/9] sm:aspect-[24/7] overflow-hidden">
          <img
            src="/scenes/state_07_contact.jpg"
            alt="Evorique architectural sunset horizon"
            className="w-full h-full object-cover object-center filter saturate-[0.92]"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#242520]/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-[#FFFFFF]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#F4F1EA]/80 block">
              FINAL EXHIBIT // THE ARCHITECTURAL HORIZON
            </span>
            <span className="font-editorial text-2xl sm:text-3xl text-[#FFFFFF]">
              {SITE.tagline}
            </span>
          </div>
          <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-[#FFFFFF]/20 backdrop-blur-md text-[#FFFFFF]">
            EVORIQUE STUDIO // 2025
          </span>
        </div>
      </div>

      {/* Main Editorial Contact Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#DCD7CE]">
        {/* Left Column: Big Headline & CTA */}
        <div className="lg:col-span-8 flex flex-col">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-4">
            SECTION 07 // INQUIRIES & COLLABORATIONS
          </span>

          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#242520] leading-[0.96] max-w-2xl">
            {SITE.contact.headline}
          </h2>

          <p className="mt-8 text-base sm:text-lg text-[#555850] font-light leading-relaxed max-w-xl">
            {SITE.contact.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenProjectInquiry}
              className="group px-8 py-4 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <span>{SITE.contact.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#84958B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-[#DCD7CE] hover:border-[#242520] bg-transparent text-xs uppercase tracking-widest text-[#242520] font-medium transition-all group"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#84958B]" />
                  <span>EMAIL COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#777970] group-hover:text-[#242520]" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Direct Channels & SLA */}
        <div className="lg:col-span-4 flex flex-col space-y-8 lg:pt-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
              DIRECT INQUIRIES
            </span>
            <a
              href={`mailto:${SITE.contact.email}`}
              className="font-editorial text-2xl text-[#242520] hover:text-[#84958B] transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#777970]" />
              <span>{SITE.contact.email}</span>
            </a>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
              RESPONSE GUARANTEE
            </span>
            <p className="text-xs text-[#777970] font-light leading-relaxed">
              {SITE.contact.responseSla}
            </p>
          </div>

          <div className="pt-4 border-t border-[#DCD7CE]">
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-3">
              FOLLOW THE STUDIO
            </span>
            <div className="flex flex-wrap gap-4">
              {SITE.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#555850] hover:text-[#242520] transition-colors flex items-center gap-1 group font-medium"
                >
                  <span>{s.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B7B5AA] group-hover:text-[#242520] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
