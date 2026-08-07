import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { requestSectionScroll } from '../utils/scroll';

interface HeroSectionProps {
  playBeep?: (freq?: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  playBeep = () => {},
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
    requestSectionScroll(sectionId);
  };

  return (
    <section 
      className="w-full max-w-[1280px] mx-auto relative overflow-hidden flex flex-col justify-between min-h-hero xl:pt-30 xl:pb-20"
      style={{
        paddingTop: 'clamp(2.5rem, 6vh, 5rem)',
        paddingBottom: 'clamp(2rem, 6vh, 5rem)',
        paddingLeft: 'clamp(1rem, 4vw, 2.25rem)',
        paddingRight: 'clamp(1rem, 4vw, 2.25rem)'
      }}
    >
      {/* Silk Background (original canvas animation — started instantly at page load by an inline script in index.astro, no React hydration required) */}
      <canvas
        id="hero-silk-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
        style={{ objectFit: 'cover' }}
        aria-hidden="true"
      />

      {/* Top Headline Cluster */}
      <div 
        className="relative z-10 w-full select-none" 
        id="headline-cluster"
        style={{ 
          paddingTop: 'clamp(0.5rem, 2vh, 1.5rem)', 
          paddingBottom: 'clamp(1rem, 3vh, 2rem)' 
        }}
      >
        {/* Decorative Sticker Top-Right (Breaking Grid) */}
        <div
          className="absolute -top-1 sm:-top-3 right-[1%] sm:right-[4%] md:right-[12%] z-20 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 max-w-[90vw]"
          style={{ transform: 'rotate(-3.2deg)' }}
          onClick={() => playBeep(700)}
          title="System Release Version"
          id="sticker-release"
        >
          <div 
            className="bg-[#D4FF00] brutalist-shadow-black flex items-center gap-1 sm:gap-2"
            style={{
              padding: 'clamp(0.2rem, 0.5vw, 0.5rem) clamp(0.5rem, 1.2vw, 1rem)'
            }}
          >
            <span 
              className="font-mono-code font-medium text-[#5F7400] whitespace-nowrap"
              style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)' }}
            >
              STABLE_RELEASE_v.4.01
            </span>
          </div>
        </div>

        {/* Heading 1: ARCHITECT */}
        <div className="w-full leading-none pt-2 sm:pt-4 flex justify-center items-center">
          <h1
            className="font-syne font-black uppercase text-white tracking-[-0.03em] sm:tracking-[-0.05em] select-none text-center max-w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-5xl"
            style={{
              fontSize: 'clamp(2rem, 9vw, 8rem)',
            }}
            id="heading-architect"
          >
            ARCHITECT
          </h1>
        </div>

        {/* Decorative Sticker Bottom-Left (Breaking Grid) */}
        <div
          className="absolute -bottom-3 sm:-bottom-5 left-[1%] sm:left-[4%] md:left-[8%] z-20 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 max-w-[90vw]"
          style={{ transform: 'rotate(-3.2deg)' }}
          onClick={() => playBeep(650)}
          title="Brutalist DNA Flag"
          id="sticker-dna"
        >
          <div 
            className="bg-white brutalist-shadow-black flex items-center gap-1 sm:gap-2"
            style={{
              padding: 'clamp(0.2rem, 0.5vw, 0.4rem) clamp(0.6rem, 1.5vw, 1.25rem)'
            }}
          >
            <span 
              className="font-mono-code font-medium text-black whitespace-nowrap"
              style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)' }}
            >
              BRUTALIST_DNA_LOADED
            </span>
          </div>
        </div>
      </div>

      {/* CTA and Details (Asymmetrical Grid) */}
      <div 
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end relative z-30 md:flex md:flex-row md:items-end md:justify-between"
        style={{ paddingTop: 'clamp(1.5rem, 4vh, 2.5rem)' }}
      >
        {/* Left Column: Bio & Magnetic Acid Green CTA */}
        <div 
          className="lg:col-span-7 flex flex-col relative z-30 md:flex-1"
          style={{ gap: 'clamp(1rem, 2.5vh, 2rem)' }}
        >
          {/* Vertical Border Container */}
          <div 
            className="border-l-2 border-[#D4FF00] py-1 max-w-xl"
            style={{ paddingLeft: 'clamp(0.875rem, 2.5vw, 1.75rem)' }}
            id="hero-bio"
          >
            <p 
              className="font-geist font-normal text-[#E4E3DB] leading-[1.5]"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.125rem)' }}
            >
              Engineering immersive digital ecosystems through hyper-creative
              technical maximalism. Zero clutter. Pure performance.
            </p>
          </div>

          {/* Call to Action: Agency Grade High-Impact Button */}
          <div className="pt-2 sm:pt-4 relative z-30">
            <button
              onClick={() => {
                playBeep(950);
                scrollToSection('section-project-cards');
              }}
              onMouseEnter={() => {
                playBeep(600);
              }}
              className="w-full sm:w-auto relative group inline-flex items-center justify-between sm:justify-start gap-4 sm:gap-6 bg-[#C6FF00] hover:bg-white text-black font-syne font-black tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(198,255,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] hover:-translate-y-1 active:translate-y-0 rounded-none border-2 border-black overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:ring-offset-2 focus:ring-offset-black touch-manipulation md:mr-0 md:pr-5 md:pl-2 md:pt-2 md:pb-2"
              style={{
                padding: 'clamp(0.5rem, 1.2vh, 0.75rem) clamp(1rem, 2.5vw, 1.75rem)',
                minHeight: '44px'
              }}
              id="btn-initialize-system"
            >
              {/* Subtle light streak backdrop animation */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Left Badge Indicator */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span 
                  className="font-mono-code font-bold text-black/80 tracking-widest"
                  style={{ fontSize: 'clamp(0.55rem, 1vw, 0.6875rem)' }}
                >
                  [01]
                </span>
              </div>

              {/* Main Button Text */}
              <span 
                className="font-extrabold tracking-widest text-black whitespace-nowrap"
                style={{ fontSize: 'clamp(0.6875rem, 1.15vw, 0.8125rem)' }}
              >
                EXPLORE_PROJECTS
              </span>

              {/* Right Arrow Pill Badge */}
              <div className="w-6 h-6 rounded-full bg-black text-[#C6FF00] group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 shrink-0">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Secondary Minimalist Tech Sidebar */}
        <div 
          className="lg:col-span-5 flex flex-col items-start lg:items-end font-mono-code text-left lg:text-right pt-4 lg:pt-0 border-t border-white/10 lg:border-t-0 md:flex-none"
          style={{ gap: 'clamp(0.5rem, 1.5vh, 0.875rem)' }}
        >
          {/* Global Status Container */}
          <div
            onClick={() => {
              playBeep(700);
              scrollToSection('section-process');
            }}
            className="flex flex-col items-start lg:items-end cursor-pointer group py-1"
            id="status-container-click"
          >
            <span 
              className="tracking-[1.4px] uppercase text-white/40 group-hover:text-white transition-colors"
              style={{ fontSize: 'clamp(0.6875rem, 1.2vw, 0.75rem)' }}
            >
              GLOBAL_STATUS
            </span>
            <span 
              className="font-semibold text-[#C6FF00] flex items-center gap-2"
              style={{ fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] inline-block animate-pulse" />
              OPERATIONAL_100%
            </span>
          </div>

          {/* Horizontal Divider */}
          <div className="w-full lg:w-[320px] h-[1px] bg-white/20 my-1" />

          {/* Latency Container */}
          <div className="flex flex-col items-start lg:items-end py-1" id="latency-container">
            <span 
              className="tracking-[1.4px] uppercase text-white/40"
              style={{ fontSize: 'clamp(0.6875rem, 1.2vw, 0.75rem)' }}
            >
              LATENCY
            </span>
            <span 
              className="font-medium text-white flex items-center gap-2"
              style={{ fontSize: 'clamp(0.875rem, 1.6vw, 1rem)' }}
            >
              {latency}MS
              <span 
                className="text-white/30 uppercase"
                style={{ fontSize: 'clamp(0.65rem, 1.1vw, 0.75rem)' }}
              >
                (ping)
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
