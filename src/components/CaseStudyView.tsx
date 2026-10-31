import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
  onNavigateToProject: (slug: string) => void;
  onOpenProjectInquiry: () => void;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  project,
  onBack,
  onNavigateToProject,
  onOpenProjectInquiry
}) => {
  // Scroll to top when opening case study
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [project.slug]);

  // Find previous and next projects
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <article className="w-full min-h-screen bg-[#F4F1EA] text-[#242520] pt-24 sm:pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between pb-8 mb-8 sm:mb-12 border-b border-[#DCD7CE]">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-xs uppercase tracking-ultra-wide font-medium text-[#777970] hover:text-[#242520] transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-[#DCD7CE] group-hover:border-[#242520] group-hover:bg-[#242520] group-hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-200">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            <span>Return to Gallery</span>
          </button>

          <div className="flex items-center gap-4 text-xs font-mono text-[#84958B]">
            <span>EXHIBIT {currentIndex + 1} OF {PROJECTS.length}</span>
          </div>
        </div>

        {/* 1. Project Title & Metadata Header */}
        <header className="py-8 sm:py-12 max-w-4xl">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#84958B] mb-4">
            <span>{project.eyebrow}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#242520] leading-[0.94]">
            {project.title}
          </h1>

          <p className="mt-6 text-xl sm:text-2xl font-editorial italic text-[#555850] max-w-2xl leading-snug">
            "{project.tagline}"
          </p>

          {/* Project Spec Metadata Strip */}
          <div className="mt-10 pt-8 border-t border-[#DCD7CE] grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-1">
                DISCIPLINE
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#242520]">
                {project.category}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-1">
                CLIENT / CONTEXT
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#242520]">
                {project.client}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-1">
                YEAR
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#242520]">
                {project.year}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-1">
                ROLES
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#242520]">
                {project.role.join(', ')}
              </span>
            </div>
          </div>
        </header>

        {/* 2. Large Project Hero Cover Image */}
        <div className="my-10 sm:my-14 rounded-2xl overflow-hidden border border-[#DCD7CE] bg-[#E5E0D6] shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
          <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover object-center filter saturate-[0.95]"
              loading="eager"
            />
          </div>
        </div>

        {/* 3. Overview & Narrative Exploration */}
        <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-[#DCD7CE]">
          <div className="lg:col-span-4">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-3">
              01 // PROJECT OVERVIEW
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#242520] leading-tight">
              A study in clarity and intentional form.
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col space-y-6 text-sm sm:text-base text-[#555850] font-light leading-relaxed">
            <p className="text-lg sm:text-xl text-[#242520] font-normal leading-relaxed">
              {project.overview}
            </p>
          </div>
        </div>

        {/* 4. Challenge & Creative Direction */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 border-b border-[#DCD7CE]">
          {/* The Brief & Challenge */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#DCD7CE] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-3">
              02 // THE CHALLENGE
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#242520] mb-4">
              The friction to resolve.
            </h3>
            <p className="text-xs sm:text-sm text-[#555850] font-light leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* The Creative Direction */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#DCD7CE] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-3">
              03 // CREATIVE DIRECTION
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#242520] mb-4">
              The architectural aesthetic.
            </h3>
            <p className="text-xs sm:text-sm text-[#555850] font-light leading-relaxed">
              {project.creativeDirection}
            </p>
          </div>
        </div>

        {/* 5. Design Exploration & Impact Highlights */}
        <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-[#DCD7CE]">
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-3">
              04 // DESIGN EXPLORATION
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#242520] mb-6">
              Translating strategy into interface topology.
            </h3>
            <p className="text-xs sm:text-sm text-[#555850] font-light leading-relaxed mb-8">
              {project.designExploration}
            </p>

            {/* Deliverables Checklist */}
            <div className="space-y-3 pt-4 border-t border-[#DCD7CE]">
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-2">
                CORE DELIVERABLES
              </span>
              {project.deliverables.map((deliv, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#242520] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#84958B] shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Metrics Card */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#FFFFFF] border border-[#DCD7CE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] block mb-4">
                PROJECT SPECIFICATIONS
              </span>
              <div className="divide-y divide-[#DCD7CE]">
                {project.impact.map((metric, i) => (
                  <div key={i} className="py-4 flex items-center justify-between">
                    <span className="text-xs text-[#777970]">{metric.label}</span>
                    <span className="text-xs sm:text-sm font-medium text-[#242520] font-mono">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenProjectInquiry}
              className="mt-8 w-full py-4 rounded-full bg-[#242520] hover:bg-[#151614] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-all duration-200 text-center flex items-center justify-center gap-2 group"
            >
              <span>Commission Similar Work</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* 6. Full-Width Gallery Plates */}
        <div className="py-16 sm:py-24 border-b border-[#DCD7CE]">
          <div className="pb-10 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-2">
                05 // EXHIBITION GALLERY
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#242520]">
                Curated Visual Artifacts
              </h3>
            </div>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {project.galleryImages.map((img, i) => (
              <div
                key={i}
                className="p-3 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#DCD7CE] shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
              >
                <div className="overflow-hidden rounded-xl bg-[#E5E0D6]">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-auto max-h-[80vh] object-cover object-center filter saturate-[0.95]"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#777970]">
                  <span className="font-editorial italic text-sm text-[#242520]">{img.caption}</span>
                  <span className="font-mono text-[10px] uppercase text-[#B7B5AA]">PLATE 0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Previous & Next Project Navigation */}
        <div className="pt-16 sm:pt-20 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Previous Project */}
          <button
            onClick={() => onNavigateToProject(prevProject.slug)}
            className="group p-8 rounded-2xl bg-[#FFFFFF] border border-[#DCD7CE] hover:border-[#242520] transition-all duration-300 text-left flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] flex items-center gap-2 mb-2">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS EXHIBIT</span>
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl font-normal text-[#242520] group-hover:text-[#84958B] transition-colors">
                {prevProject.title}
              </h4>
            </div>
            <span className="text-xs text-[#777970] mt-4 font-light block">
              {prevProject.category}
            </span>
          </button>

          {/* Next Project */}
          <button
            onClick={() => onNavigateToProject(nextProject.slug)}
            className="group p-8 rounded-2xl bg-[#FFFFFF] border border-[#DCD7CE] hover:border-[#242520] transition-all duration-300 text-right flex flex-col justify-between items-end"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-[#84958B] flex items-center justify-end gap-2 mb-2">
                <span>NEXT EXHIBIT</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl font-normal text-[#242520] group-hover:text-[#84958B] transition-colors">
                {nextProject.title}
              </h4>
            </div>
            <span className="text-xs text-[#777970] mt-4 font-light block">
              {nextProject.category}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
