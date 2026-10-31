import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/site';

interface NavigationProps {
  onNavigateHome: () => void;
  onOpenProjectInquiry: () => void;
  activeProjectSlug: string | null;
}

export const Navigation: React.FC<NavigationProps> = ({
  onNavigateHome,
  onOpenProjectInquiry,
  activeProjectSlug
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (activeProjectSlug) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F4F1EA]/92 backdrop-blur-md py-4 border-b border-[#DCD7CE]/60 shadow-[0_2px_20px_rgba(0,0,0,0.02)]'
            : 'bg-transparent py-6 sm:py-8'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
          {/* Top Left Wordmark */}
          <button
            onClick={onNavigateHome}
            className="group text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#242520]"
            aria-label="Evorique Home"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-normal tracking-tight text-[#242520] group-hover:opacity-75 transition-opacity">
              {SITE.brand}
            </span>
            <span className="hidden sm:inline-block ml-3 text-[10px] uppercase tracking-ultra-wide font-medium text-[#B7B5AA]">
              / GALLERY
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Main Navigation">
            {SITE.navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-xs uppercase tracking-ultra-wide font-medium text-[#777970] hover:text-[#242520] transition-colors relative group py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#242520] transition-all duration-200 group-hover:w-full" />
              </button>
            ))}

            <button
              onClick={onOpenProjectInquiry}
              className="ml-3 px-5 py-2.5 rounded-full border border-[#242520] text-[#242520] hover:bg-[#242520] hover:text-[#FFFFFF] text-[11px] uppercase tracking-wider font-medium transition-all duration-200 flex items-center gap-2 group"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onOpenProjectInquiry}
              className="px-3.5 py-1.5 rounded-full border border-[#242520] text-[#242520] text-[10px] uppercase tracking-wider font-medium"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#242520] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F4F1EA] flex flex-col justify-between p-8 sm:p-12 md:hidden animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#DCD7CE] pb-6">
            <span className="font-editorial text-2xl text-[#242520]">{SITE.brand}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#242520]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 py-8">
            {SITE.navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left font-editorial text-4xl text-[#242520] hover:text-[#84958B] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-[#DCD7CE] pt-6 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectInquiry();
              }}
              className="w-full py-4 rounded-full bg-[#242520] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium text-center"
            >
              Start a Project
            </button>
            <div className="text-[11px] text-[#B7B5AA] text-center uppercase tracking-wider">
              {SITE.tagline}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
