import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Philosophy } from './components/Philosophy';
import { Capabilities } from './components/Capabilities';
import { Process } from './components/Process';
import { Studio } from './components/Studio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CaseStudyView } from './components/CaseStudyView';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { PROJECTS, getProjectBySlug } from './data/projects';

export default function App() {
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Sync with browser URL / history for deep linking
  useEffect(() => {
    const parseUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const projectParam = params.get('project');
      if (projectParam && getProjectBySlug(projectParam)) {
        setActiveProjectSlug(projectParam);
      } else {
        setActiveProjectSlug(null);
      }
    };

    parseUrl();
    window.addEventListener('popstate', parseUrl);
    return () => window.removeEventListener('popstate', parseUrl);
  }, []);

  const handleSelectProject = (slug: string) => {
    setActiveProjectSlug(slug);
    const url = new URL(window.location.href);
    url.searchParams.set('project', slug);
    window.history.pushState({}, '', url.toString());
  };

  const handleNavigateHome = () => {
    setActiveProjectSlug(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiryForService = (serviceName: string) => {
    setPreselectedService(serviceName);
    setInquiryModalOpen(true);
  };

  const activeProject = activeProjectSlug ? getProjectBySlug(activeProjectSlug) : undefined;

  return (
    <div className="relative w-full min-h-screen bg-[#F4F1EA] text-[#242520] selection:bg-[#E5E0D6] selection:text-[#242520]">
      {/* Subtle Gallery Grain Texture */}
      <div className="fixed inset-0 gallery-grain pointer-events-none z-0 opacity-40" />

      {/* Persistent Global Navigation */}
      <Navigation
        onNavigateHome={handleNavigateHome}
        onOpenProjectInquiry={() => {
          setPreselectedService(undefined);
          setInquiryModalOpen(true);
        }}
        activeProjectSlug={activeProjectSlug}
      />

      {/* Main Content Area */}
      <main className="relative z-10 w-full">
        {activeProject ? (
          /* INDIVIDUAL CASE STUDY ROUTE */
          <CaseStudyView
            project={activeProject}
            onBack={handleNavigateHome}
            onNavigateToProject={handleSelectProject}
            onOpenProjectInquiry={() => {
              setPreselectedService(activeProject.category);
              setInquiryModalOpen(true);
            }}
          />
        ) : (
          /* 7-SECTION EDITORIAL DIGITAL GALLERY HOMEPAGE */
          <>
            {/* SECTION 01 — THE ENTRANCE / HERO */}
            <Hero
              onExploreWork={() => {
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenProjectInquiry={() => {
                setPreselectedService(undefined);
                setInquiryModalOpen(true);
              }}
            />

            {/* SECTION 02 — SELECTED WORK / THE EXHIBITION */}
            <SelectedWork onSelectProject={handleSelectProject} />

            {/* SECTION 03 — THE PHILOSOPHY */}
            <Philosophy />

            {/* SECTION 04 — CAPABILITIES */}
            <Capabilities onOpenInquiryForCapability={handleOpenInquiryForService} />

            {/* SECTION 05 — THE CREATIVE PROCESS */}
            <Process />

            {/* SECTION 06 — THE STUDIO */}
            <Studio
              onOpenProjectInquiry={() => {
                setPreselectedService(undefined);
                setInquiryModalOpen(true);
              }}
            />

            {/* SECTION 07 — CONTACT / THE FINAL EXHIBITION */}
            <Contact
              onOpenProjectInquiry={() => {
                setPreselectedService(undefined);
                setInquiryModalOpen(true);
              }}
            />
          </>
        )}
      </main>

      {/* Minimal Gallery Footer */}
      <Footer />

      {/* Interactive Project Inquiry Modal / Drawer */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
}
