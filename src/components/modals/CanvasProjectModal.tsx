import React from 'react';
import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_EXHIBITS, PortfolioExhibit } from '../../data/canvasData';

interface CanvasProjectModalProps {
  projectId: string | null;
  onClose: () => void;
  onOpenInquiryForProject: (title: string) => void;
}

export const CanvasProjectModal: React.FC<CanvasProjectModalProps> = ({
  projectId,
  onClose,
  onOpenInquiryForProject
}) => {
  if (!projectId) return null;

  const project: PortfolioExhibit | undefined = PORTFOLIO_EXHIBITS.find((p) => p.id === projectId);
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#242520]/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F4F1EA] rounded-3xl border border-[#DCD7CE] shadow-2xl flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#DCD7CE] flex items-center justify-between bg-[#F4F1EA] sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block">
              PORTFOLIO EXHIBIT // {project.year}
            </span>
            <h3 className="font-editorial text-3xl font-normal text-[#242520]">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#DCD7CE] hover:border-[#242520] flex items-center justify-center text-[#777970] hover:text-[#242520] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Artwork Frame */}
          <div className="rounded-2xl overflow-hidden border border-[#DCD7CE] bg-[#E5E0D6]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[55vh] object-cover object-center filter saturate-[0.95]"
            />
          </div>

          {/* Overview & Tagline */}
          <div>
            <p className="text-xl sm:text-2xl font-editorial italic text-[#555850] mb-3">
              "{project.tagline}"
            </p>
            <p className="text-sm sm:text-base text-[#555850] font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Deliverables & Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#DCD7CE]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-3">
                CORE DELIVERABLES
              </span>
              <ul className="space-y-2">
                {project.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-[#242520] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#84958B] shrink-0" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-3">
                VALIDATION & METRICS
              </span>
              <p className="text-xs text-[#777970] font-light leading-relaxed">
                {project.metrics}
              </p>

              <button
                onClick={() => {
                  onClose();
                  onOpenInquiryForProject(project.title);
                }}
                className="mt-6 w-full py-3.5 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 group"
              >
                <span>Inquire About Similar Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
