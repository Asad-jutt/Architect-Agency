import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Terminal, RefreshCw } from 'lucide-react';

interface HeroSectionProps {
  playBeep: (freq?: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  playBeep,
}) => {
  const [latency, setLatency] = useState(12);

  // Simulate real live ping/latency oscillation
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2;
      setLatency((prev) => Math.min(24, Math.max(8, prev + delta)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pb-16 md:pb-24 relative flex flex-col justify-between min-h-[calc(100vh-80px)]"
      style={{ paddingTop: '30px', paddingLeft: 'clamp(1rem, 4vw, 33px)' }}
    >
      {/* Top Headline Cluster */}
      <div 
        className="relative w-full select-none" 
        id="headline-cluster"
        style={{ paddingTop: '20px', paddingBottom: '25px', paddingLeft: '1px' }}
      >
        {/* Decorative Sticker Top-Right (Breaking Grid) */}
        <div
          className="absolute -top-1 sm:-top-3 right-[1%] sm:right-[4%] md:right-[12%] z-20 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ transform: 'rotate(-3.2deg)' }}
          onClick={() => playBeep(700)}
          title="System Release Version"
          id="sticker-release"
        >
          <div className="bg-[#D4FF00] brutalist-shadow-black px-2.5 sm:px-4 py-1 sm:py-2 flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono-code font-medium text-[12px] text-[#5F7400] whitespace-nowrap">
              STABLE_RELEASE_v.4.01
            </span>
          </div>
        </div>

        {/* Heading 1: ARCHITECT */}
        <div className="w-full overflow-hidden leading-none pt-2">
          <h1
            className="font-syne font-extrabold uppercase text-white tracking-[-0.03em] sm:tracking-[-0.05em] leading-[0.85] select-none text-center break-words"
            style={{ mixBlendMode: 'overlay', fontSize: 'clamp(2.75rem, 11vw, 116.88px)', textAlign: 'center' }}
            id="heading-architect"
          >
            ARCHITECT
          </h1>
        </div>

        {/* Decorative Sticker Bottom-Left (Breaking Grid) */}
        <div
          className="absolute -bottom-3 sm:-bottom-5 left-[1%] sm:left-[4%] md:left-[8%] z-20 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ transform: 'rotate(-3.2deg)' }}
          onClick={() => playBeep(650)}
          title="Brutalist DNA Flag"
          id="sticker-dna"
        >
          <div className="bg-white brutalist-shadow-black px-3 sm:px-6 py-1 sm:py-1.5 flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono-code font-medium text-[12px] text-black whitespace-nowrap">
              BRUTALIST_DNA_LOADED
            </span>
          </div>
        </div>
      </div>

      {/* CTA and Details (Asymmetrical Grid) */}
      <div 
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end"
        style={{ paddingTop: '50px' }}
      >
        {/* Left Column: Bio & Magnetic Acid Green CTA */}
        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
          {/* Vertical Border Container */}
          <div className="border-l-2 border-[#D4FF00] pl-4 sm:pl-6 md:pl-8 py-1 sm:py-2 max-w-xl">
            <p className="font-geist font-normal text-[18px] text-[#E4E3DB] leading-[1.5] sm:leading-[1.6]">
              Engineering immersive digital ecosystems through hyper-creative
              technical maximalism. Zero clutter. Pure performance.
            </p>
          </div>

          {/* Call to Action: Magnetic Acid Green Button */}
          <div className="pt-1 sm:pt-2">
            <button
              onClick={() => {
                playBeep(950);
                scrollToSection('section-project-cards');
              }}
              onMouseEnter={() => {
                playBeep(600);
              }}
              className="w-full sm:w-auto bg-[#C6FF00] hover:bg-white text-black font-mono-code font-bold tracking-[1.2px] sm:tracking-[1.4px] uppercase flex items-center justify-center sm:justify-start gap-3 sm:gap-4 transition-all duration-200 group cursor-pointer brutalist-shadow-black hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 min-h-[48px]"
              style={{ paddingLeft: '18px', paddingRight: '18px', paddingTop: '12px', paddingBottom: '12px' }}
              id="btn-initialize-system"
            >
              <span className="text-[14px]">EXPLORE_PROJECTS</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        {/* Right Column: Secondary Minimalist Tech Sidebar */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3 font-mono-code text-left lg:text-right pt-4 lg:pt-0 border-t border-white/10 lg:border-t-0">
          {/* Global Status Container */}
          <div
            onClick={() => {
              playBeep(700);
              scrollToSection('section-process');
            }}
            className="flex flex-col items-start lg:items-end cursor-pointer group py-1"
            id="status-container-click"
          >
            <span className="text-[12px] tracking-[1.4px] uppercase text-white/40 group-hover:text-white transition-colors">
              GLOBAL_STATUS
            </span>
            <span className="text-[14px] font-semibold text-[#C6FF00] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] inline-block animate-pulse" />
              OPERATIONAL_100%
            </span>
          </div>

          {/* Horizontal Divider */}
          <div className="w-full lg:w-[320px] h-[1px] bg-white/20 my-1 sm:my-2" />

          {/* Latency Container */}
          <div className="flex flex-col items-start lg:items-end py-1">
            <span className="text-[12px] tracking-[1.4px] uppercase text-white/40">
              LATENCY
            </span>
            <span className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
              {latency}MS
              <span className="text-xs text-white/30 uppercase">(ping)</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
