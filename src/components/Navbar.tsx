import React from 'react';
import { LayoutGrid, Volume2, VolumeX, Activity, Database, Cpu } from 'lucide-react';

interface NavbarProps {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playBeep: (freq?: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  setSoundEnabled,
  playBeep,
}) => {
  const scrollToSection = (sectionId: string, freq = 600) => {
    playBeep(freq);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 select-none relative z-30">
      {/* Brand Logo */}
      <div
        onClick={() => {
          playBeep(440);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-3 cursor-pointer group py-1"
        id="nav-logo-brand"
      >
        <div className="w-6 h-6 grid grid-cols-2 gap-0.5 p-0.5 bg-black border border-[#C6FF00] group-hover:bg-[#C6FF00] transition-colors duration-200">
          <div className="bg-[#C6FF00] group-hover:bg-black transition-colors" />
          <div className="bg-[#C6FF00] group-hover:bg-black transition-colors" />
          <div className="bg-[#C6FF00] group-hover:bg-black transition-colors" />
          <div className="bg-[#C6FF00] group-hover:bg-black transition-colors" />
        </div>
        <span className="font-mono-code font-bold text-sm tracking-widest text-[#C6FF00] group-hover:text-white transition-colors">
          ARCHITECT.EXE
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8 font-mono-code font-medium tracking-wider w-full md:w-auto">
        <button
          onClick={() => scrollToSection('section-project-cards', 700)}
          className="flex items-center gap-1.5 sm:gap-2 transition-colors duration-150 py-1.5 px-2.5 sm:px-3 text-[#C6FF00] hover:text-white border border-transparent cursor-pointer text-[12px]"
          id="nav-link-works"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C6FF00] animate-ping opacity-75" />
          <LayoutGrid className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline" />
          SELECTED_WORKS
        </button>

        <button
          onClick={() => scrollToSection('section-process', 800)}
          className="flex items-center gap-1.5 sm:gap-2 transition-colors duration-150 py-1.5 px-2.5 sm:px-3 text-white/80 hover:text-[#C6FF00] border border-transparent cursor-pointer text-[12px]"
          id="nav-link-process"
        >
          <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline" />
          OUR_PROCESS
        </button>

        <button
          onClick={() => scrollToSection('section-about', 900)}
          className="flex items-center gap-1.5 sm:gap-2 transition-colors duration-150 py-1.5 px-2.5 sm:px-3 text-white/80 hover:text-[#C6FF00] border border-transparent cursor-pointer text-[12px]"
          id="nav-link-about"
        >
          <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline" />
          ABOUT_MANIFESTO
        </button>

        {/* Audio FX Toggle */}
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playBeep(900);
          }}
          title={soundEnabled ? 'Disable Audio FX' : 'Enable Audio FX'}
          className="border border-white/20 hover:border-[#C6FF00] text-white/70 hover:text-[#C6FF00] transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
          style={{ padding: '6px' }}
          id="btn-toggle-sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#C6FF00]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>
      </nav>
    </header>
  );
};
