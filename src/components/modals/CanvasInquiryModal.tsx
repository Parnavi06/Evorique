import React, { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

interface CanvasInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const CanvasInquiryModal: React.FC<CanvasInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : ['Brand Identity']
  );
  const [timeline, setTimeline] = useState('Q1 2025');
  const [budget, setBudget] = useState('$25k – $50k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#242520]/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#F4F1EA] rounded-3xl border border-[#DCD7CE] shadow-2xl p-6 sm:p-10 flex flex-col justify-between"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[#DCD7CE] hover:border-[#242520] flex items-center justify-center text-[#777970] hover:text-[#242520] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#84958B]/20 border border-[#84958B] flex items-center justify-center text-[#84958B] mb-6">
              <Check className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] mb-2">
              DISPATCHED TO EVORIQUE
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#242520] mb-4">
              Thank you, {name}.
            </h3>
            <p className="text-sm text-[#555850] max-w-md mx-auto leading-relaxed mb-8">
              We have received your project details for <span className="font-medium text-[#242520]">{selectedServices.join(' & ')}</span>. Our studio team will review your inquiry and respond to <span className="font-mono text-[#242520]">{email}</span> within 24 hours.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-8 py-3.5 rounded-full bg-[#242520] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-[#DCD7CE] pb-6 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-1">
                INQUIRE A PROJECT
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#242520]">
                Start a Conversation
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#777970] font-light">
                Direct dialogue with studio partners. No account handlers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-3">
                  1. DISCIPLINES REQUIRED
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Brand Identity',
                    'UI/UX Design',
                    'Website Design',
                    'Web Development',
                    'Creative Technology'
                  ].map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#242520] text-[#FFFFFF] border border-[#242520]'
                            : 'bg-[#FFFFFF] text-[#555850] border border-[#DCD7CE] hover:border-[#242520]'
                        }`}
                      >
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline & Budget Horizions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
                    2. TIMELINE HORIZON
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#DCD7CE] text-xs text-[#242520] focus:outline-none focus:border-[#242520]"
                  >
                    <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                    <option value="Q1 2025">Q1 2025</option>
                    <option value="Q2 2025">Q2 2025</option>
                    <option value="Flexible Horizon">Flexible Horizon</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
                    3. ESTIMATED INVESTMENT
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#DCD7CE] text-xs text-[#242520] focus:outline-none focus:border-[#242520]"
                  >
                    <option value="$15k – $25k">$15k – $25k</option>
                    <option value="$25k – $50k">$25k – $50k</option>
                    <option value="$50k – $100k">$50k – $100k</option>
                    <option value="$100k+">$100k+</option>
                  </select>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
                    4. YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Soren K."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#DCD7CE] text-xs text-[#242520] placeholder-[#B7B5AA] focus:outline-none focus:border-[#242520]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
                    5. WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="soren@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#DCD7CE] text-xs text-[#242520] placeholder-[#B7B5AA] focus:outline-none focus:border-[#242520]"
                  />
                </div>
              </div>

              {/* Brief */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
                  6. ABOUT YOUR AMBITION (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a brief description of the challenge, objectives, and timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#DCD7CE] text-xs text-[#242520] placeholder-[#B7B5AA] focus:outline-none focus:border-[#242520] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#777970] font-mono">
                  SLA: Response within 24 hours.
                </span>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
