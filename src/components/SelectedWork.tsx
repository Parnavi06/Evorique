import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, Project } from '../data/projects';

interface SelectedWorkProps {
  onSelectProject: (slug: string) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const p1 = PROJECTS[0]; // Aurora (Large Featured)
  const p2 = PROJECTS[1]; // The Mark (Tall / Portrait)
  const p3 = PROJECTS[2]; // Studio Workspace (Wide / Landscape)
  const p4 = PROJECTS[3]; // Archipelago (Large Featured)

  return (
    <section id="work" className="w-full py-24 sm:py-32 px-6 sm:px-10 md:px-14 max-w-[1440px] mx-auto border-b border-[#DCD7CE]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#DCD7CE]">
        <div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-ultra-wide uppercase text-[#84958B] block mb-3">
            SECTION 02 // THE EXHIBITION
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#242520]">
            Selected Works
          </h2>
        </div>
        <div className="max-w-sm text-xs sm:text-sm text-[#777970] font-light leading-relaxed">
          A curated exhibition of digital experiences, brand identities, and spatial systems engineered with deliberate intention.
        </div>
      </div>

      {/* Asymmetric Exhibition Gallery */}
      <div className="pt-12 sm:pt-16 space-y-20 sm:space-y-28">
        {/* EXHIBIT 01: Large Featured Project (Aurora) */}
        {p1 && (
          <article
            onClick={() => onSelectProject(p1.slug)}
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-8 overflow-hidden rounded-2xl bg-[#E5E0D6] border border-[#DCD7CE] shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p1.featuredImage}
                  alt={p1.title}
                  className="w-full h-full object-cover object-center filter saturate-[0.95] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#DCD7CE] text-[10px] font-mono uppercase tracking-wider text-[#242520]">
                FEATURED EXHIBIT
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-[#84958B] mb-2">
                <span>{p1.eyebrow}</span>
                <span>•</span>
                <span>{p1.year}</span>
              </div>

              <h3 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-[#242520] group-hover:text-[#84958B] transition-colors flex items-center justify-between">
                <span>{p1.title}</span>
                <ArrowUpRight className="w-6 h-6 text-[#777970] group-hover:text-[#242520] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </h3>

              <p className="mt-2 text-sm italic font-editorial text-[#555850]">
                "{p1.tagline}"
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[#777970] font-light leading-relaxed">
                {p1.shortDescription}
              </p>

              <div className="mt-6 pt-6 border-t border-[#DCD7CE] flex flex-wrap gap-2">
                {p1.role.map((r) => (
                  <span
                    key={r}
                    className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#DCD7CE] text-[10px] font-medium uppercase tracking-wider text-[#555850]"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#242520] group-hover:underline underline-offset-4">
                <span>Explore Full Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </article>
        )}

        {/* EXHIBIT 02 & 03: Asymmetric Split (The Mark & Studio Interior) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Project 2: The Mark (Portrait 4:5 Proportion) */}
          {p2 && (
            <article
              onClick={() => onSelectProject(p2.slug)}
              className="group cursor-pointer md:col-span-6 lg:col-span-5 flex flex-col"
            >
              <div className="overflow-hidden rounded-2xl bg-[#E5E0D6] border border-[#DCD7CE] shadow-[0_4px_24px_rgba(0,0,0,0.03)] aspect-[4/5] relative">
                <img
                  src={p2.featuredImage}
                  alt={p2.title}
                  className="w-full h-full object-cover object-center filter saturate-[0.92] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FFFFFF]">
                  <span className="text-[10px] font-mono uppercase bg-[#242520]/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {p2.category}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-[#84958B] mb-1">
                  <span>{p2.eyebrow}</span>
                  <span>•</span>
                  <span>{p2.year}</span>
                </div>

                <h3 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-[#242520] group-hover:text-[#84958B] transition-colors flex items-center justify-between">
                  <span>{p2.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#777970] group-hover:text-[#242520] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#777970] font-light leading-relaxed">
                  {p2.shortDescription}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#242520] group-hover:underline underline-offset-4">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          )}

          {/* Project 3: Studio Interior (Landscape 16:10 Proportion, Offset Column) */}
          {p3 && (
            <article
              onClick={() => onSelectProject(p3.slug)}
              className="group cursor-pointer md:col-span-6 lg:col-span-7 flex flex-col md:pt-14"
            >
              <div className="overflow-hidden rounded-2xl bg-[#E5E0D6] border border-[#DCD7CE] shadow-[0_4px_24px_rgba(0,0,0,0.03)] aspect-[16/10] relative">
                <img
                  src={p3.featuredImage}
                  alt={p3.title}
                  className="w-full h-full object-cover object-center filter saturate-[0.92] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FFFFFF]">
                  <span className="text-[10px] font-mono uppercase bg-[#242520]/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {p3.category}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-[#84958B] mb-1">
                  <span>{p3.eyebrow}</span>
                  <span>•</span>
                  <span>{p3.year}</span>
                </div>

                <h3 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-[#242520] group-hover:text-[#84958B] transition-colors flex items-center justify-between">
                  <span>{p3.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#777970] group-hover:text-[#242520] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#777970] font-light leading-relaxed">
                  {p3.shortDescription}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#242520] group-hover:underline underline-offset-4">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          )}
        </div>

        {/* EXHIBIT 04: Large Featured Project (Archipelago) */}
        {p4 && (
          <article
            onClick={() => onSelectProject(p4.slug)}
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 border-t border-[#DCD7CE]/60"
          >
            <div className="lg:col-span-8 overflow-hidden rounded-2xl bg-[#E5E0D6] border border-[#DCD7CE] shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={p4.featuredImage}
                  alt={p4.title}
                  className="w-full h-full object-cover object-center filter saturate-[0.92] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#DCD7CE] text-[10px] font-mono uppercase tracking-wider text-[#242520]">
                RESEARCH EXHIBIT
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-[#84958B] mb-2">
                <span>{p4.eyebrow}</span>
                <span>•</span>
                <span>{p4.year}</span>
              </div>

              <h3 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-[#242520] group-hover:text-[#84958B] transition-colors flex items-center justify-between">
                <span>{p4.title}</span>
                <ArrowUpRight className="w-6 h-6 text-[#777970] group-hover:text-[#242520] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </h3>

              <p className="mt-2 text-sm italic font-editorial text-[#555850]">
                "{p4.tagline}"
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[#777970] font-light leading-relaxed">
                {p4.shortDescription}
              </p>

              <div className="mt-6 pt-6 border-t border-[#DCD7CE] flex flex-wrap gap-2">
                {p4.role.map((r) => (
                  <span
                    key={r}
                    className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#DCD7CE] text-[10px] font-medium uppercase tracking-wider text-[#555850]"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#242520] group-hover:underline underline-offset-4">
                <span>Explore Full Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
