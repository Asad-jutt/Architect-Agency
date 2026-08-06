import React from 'react';
import { LayoutGrid, Home, Activity, Cpu } from 'lucide-react';

interface NavbarProps {
  currentView?: 'home' | 'works' | 'project-detail';
  onNavigateHome: () => void;
  onOpenWorksPage: () => void;
  playBeep?: (freq?: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'home',
  onNavigateHome,
  onOpenWorksPage,
  playBeep,
}) => {
  const handleLogoClick = () => {
    if (playBeep) playBeep(440);
    if (currentView !== 'home') {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleWorksClick = () => {
    if (playBeep) playBeep(700);
    if (currentView !== 'home') {
      onOpenWorksPage();
    } else {
      const el = document.getElementById('section-project-cards');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onOpenWorksPage();
      }
    }
  };

  const scrollToSection = (sectionId: string, freq = 600) => {
    if (playBeep) playBeep(freq);
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-3 sm:pt-5 pb-3 flex flex-col md:flex-row items-center justify-between gap-3 border-b border-white/10 select-none relative z-30">
      {/* Brand Logo */}
      <div
        onClick={handleLogoClick}
        className="flex items-center gap-2.5 cursor-pointer group py-0.5"
        id="nav-logo-brand"
      >
        <div className="w-5 h-5 grid grid-cols-2 gap-0.5 p-0.5 bg-black border border-[#C6FF00] group-hover:bg-[#C6FF00] transition-colors duration-200">
          <div className="bg-[#C6FF00] group-hover:bg-black transition-colors" />
          <div className="bg-[#C6FF00] group-hover:bg-black transition-colors" />
          <div className="bg-[#C6FF00] group-hover:bg-black transition-colors" />
          <div className="bg-[#C6FF00] group-hover:bg-black transition-colors" />
        </div>
        <span className="font-mono-code font-bold text-xs tracking-widest text-[#C6FF00] group-hover:text-white transition-colors">
          ARCHITECT.EXE
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 md:gap-4 font-mono-code font-medium tracking-wider w-full md:w-auto">
        {currentView !== 'home' && (
          <button
            onClick={() => {
              if (playBeep) playBeep(500);
              onNavigateHome();
            }}
            className="flex items-center gap-1 sm:gap-1.5 transition-colors duration-150 py-1.5 px-1.5 sm:px-2.5 text-white/80 hover:text-[#C6FF00] border border-transparent cursor-pointer text-[10px] sm:text-[11px] min-h-[36px]"
            id="nav-link-home"
          >
            <Home className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline shrink-0" />
            <span className="whitespace-nowrap">HOME</span>
          </button>
        )}

        <button
          onClick={handleWorksClick}
          className={`flex items-center gap-1 sm:gap-1.5 transition-colors duration-150 py-1.5 px-1.5 sm:px-2.5 border border-transparent cursor-pointer text-[10px] sm:text-[11px] min-h-[36px] ${
            currentView === 'works' ? 'text-[#C6FF00] font-bold border-[#C6FF00]/40 bg-[#12130F]' : 'text-[#C6FF00] hover:text-white'
          }`}
          id="nav-link-works"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C6FF00] animate-ping opacity-75 shrink-0" />
          <LayoutGrid className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline shrink-0" />
          <span className="whitespace-nowrap">SELECTED_WORKS</span>
        </button>

        <button
          onClick={() => scrollToSection('section-process', 800)}
          className="flex items-center gap-1 sm:gap-1.5 transition-colors duration-150 py-1.5 px-1.5 sm:px-2.5 text-white/80 hover:text-[#C6FF00] border border-transparent cursor-pointer text-[10px] sm:text-[11px] min-h-[36px]"
          id="nav-link-process"
        >
          <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline shrink-0" />
          <span className="whitespace-nowrap">OUR_PROCESS</span>
        </button>

        <button
          onClick={() => scrollToSection('section-about', 900)}
          className="flex items-center gap-1 sm:gap-1.5 transition-colors duration-150 py-1.5 px-1.5 sm:px-2.5 text-white/80 hover:text-[#C6FF00] border border-transparent cursor-pointer text-[10px] sm:text-[11px] min-h-[36px]"
          id="nav-link-about"
        >
          <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline shrink-0" />
          <span className="whitespace-nowrap">ABOUT_MANIFESTO</span>
        </button>
      </nav>
    </header>
  );
};
