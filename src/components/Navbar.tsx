import React, { useEffect, useState } from 'react';
import { Home, Activity, Cpu, LayoutGrid } from 'lucide-react';
import { requestSectionScroll } from '../utils/scroll';

interface NavbarProps {
  playBeep?: (freq?: number) => void;
  pathname?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ playBeep, pathname }) => {
  const [currentPath, setCurrentPath] = useState<string>(pathname || '/');

  useEffect(() => {
    if (pathname) return;
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, [pathname]);

  const isHome = currentPath === '/' || currentPath === '';
  const isWorks = currentPath === '/works';
  const isProjectDetail = currentPath.startsWith('/projects/');

  const beep = (freq = 600) => {
    if (playBeep) playBeep(freq);
  };

  const goToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    beep(800);
    if (isHome) {
      requestSectionScroll(sectionId);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-3 sm:pt-5 pb-3 flex flex-col md:flex-row items-center justify-between gap-3 border-b border-white/10 select-none relative z-30 xl:pt-3">
      {/* Brand Logo */}
      <a
        href="/"
        onClick={() => beep(440)}
        className="flex items-center gap-2.5 cursor-pointer group py-0.5 no-underline"
        id="nav-logo-brand"
        aria-label="ARCHITECT.EXE home"
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
      </a>

      {/* Navigation Links */}
      <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 md:gap-4 font-mono-code font-medium tracking-wider w-full md:w-auto">
        {!isHome && (
          <a
            href="/"
            onClick={() => beep(500)}
            className="flex items-center gap-1 sm:gap-1.5 transition-colors duration-150 py-1.5 px-1.5 sm:px-2.5 text-white/80 hover:text-[#C6FF00] border border-transparent cursor-pointer text-[10px] sm:text-[11px] min-h-[36px] no-underline"
            id="nav-link-home"
          >
            <Home className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline shrink-0" />
            <span className="whitespace-nowrap">HOME</span>
          </a>
        )}

        <a
          href="/works"
          onClick={() => beep(700)}
          className={`flex items-center gap-1 sm:gap-1.5 transition-colors duration-150 py-1.5 px-1.5 sm:px-2.5 border border-transparent cursor-pointer text-[10px] sm:text-[11px] min-h-[36px] no-underline ${
            isWorks || isProjectDetail
              ? 'text-[#C6FF00] font-bold border-[#C6FF00]/40 bg-[#12130F]'
              : 'text-[#C6FF00] hover:text-white'
          }`}
          id="nav-link-works"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C6FF00] animate-ping opacity-75 shrink-0" />
          <LayoutGrid className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline shrink-0" />
          <span className="whitespace-nowrap">SELECTED_WORKS</span>
        </a>

        <a
          href="/#section-process"
          onClick={(e) => goToSection(e, 'section-process')}
          className="flex items-center gap-1 sm:gap-1.5 transition-colors duration-150 py-1.5 px-1.5 sm:px-2.5 text-white/80 hover:text-[#C6FF00] border border-transparent cursor-pointer text-[10px] sm:text-[11px] min-h-[36px] no-underline"
          id="nav-link-process"
        >
          <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline shrink-0" />
          <span className="whitespace-nowrap">OUR_PROCESS</span>
        </a>

        <a
          href="/#section-about"
          onClick={(e) => goToSection(e, 'section-about')}
          className="flex items-center gap-1 sm:gap-1.5 transition-colors duration-150 py-1.5 px-1.5 sm:px-2.5 text-white/80 hover:text-[#C6FF00] border border-transparent cursor-pointer text-[10px] sm:text-[11px] min-h-[36px] no-underline"
          id="nav-link-about"
        >
          <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline shrink-0" />
          <span className="whitespace-nowrap">ABOUT_MANIFESTO</span>
        </a>
      </nav>
    </header>
  );
};
