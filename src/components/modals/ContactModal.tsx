import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Digital Product Design & Engineering',
    budget: '$50,000 – $100,000',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#141414]/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#fbf9f5] rounded-3xl shadow-2xl border border-[#ded5c6] overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b border-[#ece5d8] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#91897e] font-medium block">
              Initiate Dialogue
            </span>
            <h3 className="font-editorial text-3xl font-light text-[#1a1918]">
              Start a Conversation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#d5cec2] flex items-center justify-center text-[#595349] hover:text-[#1a1918] hover:border-[#1a1918] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#f0ebdF] text-[#1a1918] flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 text-[#1a1918]" />
            </div>
            <h4 className="font-editorial text-3xl font-light text-[#1a1918]">
              Inquiry Dispatched
            </h4>
            <p className="text-xs sm:text-sm text-[#5c564c] leading-relaxed max-w-md mx-auto">
              Thank you, <span className="font-medium text-[#1a1918]">{formData.name}</span>. The partners at Evorique evaluate each inquiry personally. We will review your project parameters and respond within one business day.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-[#1a1918] text-[#fbf9f5] text-xs uppercase tracking-widest font-medium hover:bg-[#333] transition-colors"
              >
                Return to Experience
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696358] mb-1.5 font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded5c6] text-xs sm:text-sm text-[#1a1918] focus:outline-none focus:border-[#1a1918] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696358] mb-1.5 font-medium">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded5c6] text-xs sm:text-sm text-[#1a1918] focus:outline-none focus:border-[#1a1918] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696358] mb-1.5 font-medium">
                  Organization / Entity
                </label>
                <input
                  type="text"
                  placeholder="Studio or Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded5c6] text-xs sm:text-sm text-[#1a1918] focus:outline-none focus:border-[#1a1918] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696358] mb-1.5 font-medium">
                  Estimated Scope
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded5c6] text-xs sm:text-sm text-[#1a1918] focus:outline-none focus:border-[#1a1918] transition-colors"
                >
                  <option>$30,000 – $50,000</option>
                  <option>$50,000 – $100,000</option>
                  <option>$100,000 – $250,000</option>
                  <option>$250,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696358] mb-1.5 font-medium">
                Primary Engagement
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded5c6] text-xs sm:text-sm text-[#1a1918] focus:outline-none focus:border-[#1a1918] transition-colors"
              >
                <option>Digital Product Design & Engineering</option>
                <option>Creative Technology & WebGL Experience</option>
                <option>Multi-Platform Design Systems</option>
                <option>Product Strategy & Technical Architecture</option>
                <option>Applied AI Integration & Specialized Agents</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696358] mb-1.5 font-medium">
                Project Context & Objectives
              </label>
              <textarea
                rows={3}
                placeholder="Share your timeline, current technical state, and what you aim to achieve..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f5f1e8] border border-[#ded5c6] text-xs sm:text-sm text-[#1a1918] focus:outline-none focus:border-[#1a1918] transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-[#8c8578]">
                Confidentiality respected.
              </span>
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[#1a1918] text-[#fbf9f5] text-xs font-medium uppercase tracking-widest hover:bg-[#333] transition-colors flex items-center gap-2"
              >
                <span>Send Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
