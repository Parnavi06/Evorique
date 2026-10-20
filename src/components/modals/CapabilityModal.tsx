import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { CAPABILITIES } from '../../constants/content';

interface CapabilityModalProps {
  capabilityId: string | null;
  onClose: () => void;
  onStartProject: () => void;
}

export const CapabilityModal: React.FC<CapabilityModalProps> = ({
  capabilityId,
  onClose,
  onStartProject
}) => {
  if (!capabilityId) return null;

  const capability = CAPABILITIES.find((c) => c.id === capabilityId);
  if (!capability) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#141414]/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#fbf9f5] rounded-3xl shadow-2xl border border-[#ded5c6] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b border-[#ece5d8] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#91897e] font-medium block">
              Studio Capability
            </span>
            <h3 className="font-editorial text-3xl font-light text-[#1a1918]">
              {capability.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#d5cec2] flex items-center justify-center text-[#595349] hover:text-[#1a1918] hover:border-[#1a1918] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="font-editorial text-xl italic text-[#4a453e]">
            "{capability.tagline}"
          </p>

          <p className="text-xs sm:text-sm text-[#5c564c] leading-relaxed">
            {capability.description}
          </p>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#1a1918] mb-3">
              Standard Deliverables & Engagements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {capability.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#f5f1e8] border border-[#ece5d8] flex items-start gap-2.5 text-xs text-[#403c36]"
                >
                  <Check className="w-3.5 h-3.5 text-[#1a1918] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#ede7dc] text-xs text-[#524c43]">
            <span className="font-medium text-[#1a1918]">Practice Standard:</span> {capability.metrics}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-5 border-t border-[#ece5d8] bg-[#f5f1e8] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest text-[#736d64] hover:text-[#1a1918] font-medium transition-colors"
          >
            Return to World
          </button>

          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="px-6 py-2.5 rounded-full bg-[#1a1918] text-[#fbf9f5] text-xs uppercase tracking-widest font-medium hover:bg-[#333] transition-colors flex items-center gap-2"
          >
            <span>Inquire About {capability.title.split('&')[0].trim()}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
