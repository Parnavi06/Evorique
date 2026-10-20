import React, { useState } from 'react';
import { X, CheckCircle, Shield, Cpu, Layout } from 'lucide-react';
import { AURORA_CASE_STUDY } from '../../constants/content';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'problem' | 'solution' | 'outcomes'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#141414]/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#fbf9f5] rounded-3xl shadow-2xl border border-[#ded5c6] flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#ece5d8] flex items-center justify-between bg-[#fbf9f5]">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-2xl font-semibold text-[#1a1918]">
              {AURORA_CASE_STUDY.title}
            </span>
            <span className="text-[#999285] text-xs uppercase tracking-widest hidden sm:inline">
              / Conceptual Product Study
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#ded5c6] flex items-center justify-center text-[#595349] hover:text-[#1a1918] hover:border-[#1a1918] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 sm:px-8 py-3 bg-[#f5f1e8] border-b border-[#ece5d8] flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-[#736c61] overflow-x-auto">
          <button
            onClick={() => setActiveSection('overview')}
            className={`py-1 whitespace-nowrap transition-colors ${
              activeSection === 'overview' ? 'text-[#1a1918] border-b-2 border-[#1a1918]' : 'hover:text-[#1a1918]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection('problem')}
            className={`py-1 whitespace-nowrap transition-colors ${
              activeSection === 'problem' ? 'text-[#1a1918] border-b-2 border-[#1a1918]' : 'hover:text-[#1a1918]'
            }`}
          >
            The Problem
          </button>
          <button
            onClick={() => setActiveSection('solution')}
            className={`py-1 whitespace-nowrap transition-colors ${
              activeSection === 'solution' ? 'text-[#1a1918] border-b-2 border-[#1a1918]' : 'hover:text-[#1a1918]'
            }`}
          >
            Architecture & Solution
          </button>
          <button
            onClick={() => setActiveSection('outcomes')}
            className={`py-1 whitespace-nowrap transition-colors ${
              activeSection === 'outcomes' ? 'text-[#1a1918] border-b-2 border-[#1a1918]' : 'hover:text-[#1a1918]'
            }`}
          >
            Outcomes & Specifications
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-12 space-y-8">
          {activeSection === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#1a1918]">
                  {AURORA_CASE_STUDY.tagline}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#5c564c] leading-relaxed max-w-3xl">
                  {AURORA_CASE_STUDY.overview}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-[#f5f1e8] border border-[#ece5d8]">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#857d70]">Initiative</div>
                  <div className="text-xs sm:text-sm font-medium text-[#1a1918] mt-1">{AURORA_CASE_STUDY.client}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#857d70]">Discipline</div>
                  <div className="text-xs sm:text-sm font-medium text-[#1a1918] mt-1">{AURORA_CASE_STUDY.category}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#857d70]">Type</div>
                  <div className="text-xs sm:text-sm font-medium text-[#1a1918] mt-1">{AURORA_CASE_STUDY.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#857d70]">Year</div>
                  <div className="text-xs sm:text-sm font-medium text-[#1a1918] mt-1">{AURORA_CASE_STUDY.year}</div>
                </div>
              </div>

              {/* Visual Preview */}
              <div className="rounded-2xl overflow-hidden border border-[#ded5c6]">
                <img
                  src="/scenes/state_05_inside_project.jpg"
                  alt="Aurora Full Interface Overview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {activeSection === 'problem' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <h3 className="font-editorial text-3xl font-light text-[#1a1918]">
                Addressing Cognitive Overload in Finance
              </h3>
              <p className="text-sm sm:text-base text-[#5c564c] leading-relaxed">
                {AURORA_CASE_STUDY.problem}
              </p>
              <div className="p-6 rounded-2xl bg-[#f5f1e8] border-l-4 border-[#1a1918] space-y-3">
                <div className="text-sm font-medium text-[#1a1918]">Identified Friction Points:</div>
                <ul className="text-xs sm:text-sm text-[#635d52] space-y-2 list-disc pl-5">
                  <li>Disjointed mental model between complex desktop banking grids and limited mobile interfaces.</li>
                  <li>Inability to project forward safe-to-spend liquidity across automated recurring commitments.</li>
                  <li>Visual fatigue and defensive user mindset provoked by aggressive alert banners.</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'solution' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="font-editorial text-3xl font-light text-[#1a1918]">
                  Architectural Solution & Key Principles
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#5c564c] max-w-3xl">
                  {AURORA_CASE_STUDY.approach}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {AURORA_CASE_STUDY.features.map((feat, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#ffffff] border border-[#e8e0d2] shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-[#f6f2ea] flex items-center justify-center text-[#1a1918] mb-3">
                      {idx === 0 && <Cpu className="w-4 h-4" />}
                      {idx === 1 && <Shield className="w-4 h-4" />}
                      {idx === 2 && <Layout className="w-4 h-4" />}
                      {idx === 3 && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <h4 className="font-editorial text-xl font-medium text-[#1a1918]">
                      {feat.title}
                    </h4>
                    <p className="mt-2 text-xs text-[#635d52] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'outcomes' && (
            <div className="space-y-8 animate-fade-in">
              <h3 className="font-editorial text-3xl font-light text-[#1a1918]">
                Prototype Specifications & Takeaways
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {AURORA_CASE_STUDY.impact.map((item, idx) => (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#f5f1e8] border border-[#e8e0d2] text-center">
                    <div className="font-editorial text-2xl sm:text-3xl font-light text-[#1a1918]">
                      {item.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[#827a6f] mt-1 font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#ded5c6] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-sm text-[#1a1918]">Looking to build a digital product of similar caliber?</h4>
                  <p className="text-xs text-[#706a5f]">We partner with founders to bring ambitious digital products to market.</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#1a1918] text-[#fbf9f5] text-xs font-medium uppercase tracking-widest hover:bg-[#333] transition-colors whitespace-nowrap"
                >
                  Return to World
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
