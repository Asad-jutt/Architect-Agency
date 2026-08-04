import React from 'react';
import { ArrowDown } from 'lucide-react';

interface AboutSectionProps {
  playBeep: (freq?: number) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ playBeep }) => {
  return (
    <section className="w-full bg-black border-t border-white/10 select-none overflow-hidden relative" id="section-about">
      <div className="w-full flex flex-col md:flex-row min-h-[450px] md:min-h-[550px]">
        {/* Left Half: Visual Anchor */}
        <div className="w-full md:w-[35%] relative min-h-[260px] md:min-h-[520px] bg-zinc-950 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/10 group">
          {/* Background Grayscale Brutalist Image */}
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
            alt="Brutalist Visual Anchor"
            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Acid Lime Tape Label - EST. 2020 */}
          <div
            className="absolute bottom-6 md:bottom-8 left-[-2%] sm:left-[2%] z-20 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
            style={{ transform: 'rotate(-5deg)' }}
            onClick={() => playBeep(800)}
            id="tape-label-est2020"
          >
            <div className="bg-[#D4FF00] text-black font-syne font-extrabold text-xl sm:text-3xl md:text-4xl tracking-widest px-4 sm:px-7 py-2 md:py-2.5 border-2 border-black shadow-[4px_4px_0px_#000000] uppercase whitespace-nowrap">
              EST. 2020
            </div>
          </div>
        </div>

        {/* Right Half: Content Canvas */}
        <div className="w-full md:w-[65%] bg-black text-white p-5 sm:p-8 md:p-10 lg:p-12 pr-5 sm:pr-8 md:pr-10 flex flex-col justify-between relative overflow-hidden border-t md:border-t-0 border-white/10">
          <div className="space-y-5 max-w-xl">
            {/* Staircase Headline */}
            <div className="space-y-1.5 uppercase select-none">
              <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white tracking-tight">
                I BUILD
              </h2>
              
              <div className="inline-block px-2.5 sm:px-3 py-0.5 my-0.5 bg-white/5 border border-white/20 max-w-full overflow-hidden">
                <span className="font-syne font-black text-base sm:text-2xl md:text-3xl lg:text-4xl leading-[0.9] text-zinc-400 tracking-tight whitespace-nowrap">
                  THE INTERNET&apos;S
                </span>
              </div>

              <h2 
                className="font-syne font-black text-3xl sm:text-4xl md:text-[50px] leading-[0.9] text-[#C6FF00] tracking-tight break-words"
              >
                WILDEST SITES
              </h2>
            </div>

            {/* Bio Copy */}
            <p className="font-space font-light text-base sm:text-lg text-zinc-400 leading-relaxed pt-1">
              Architecting digital chaos into high-performance experiences. We don&apos;t follow the grid—we break it to create memorable motion and unapologetic visual identities for the next generation of web.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-2.5 pt-2 font-mono-code text-xs sm:text-sm">
              <div className="bg-zinc-900 text-white px-4 py-2 rounded-full font-medium border border-white/20 shadow-[2px_2px_0px_#C6FF00] hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors cursor-default">
                120+ Projects
              </div>
              <div className="bg-zinc-900 text-white px-4 py-2 rounded-full font-medium border border-white/20 shadow-[2px_2px_0px_#C6FF00] hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors cursor-default">
                6 Years
              </div>
              <div className="bg-zinc-900 text-white px-4 py-2 rounded-full font-medium border border-white/20 shadow-[2px_2px_0px_#C6FF00] hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors cursor-default">
                40 Clients
              </div>
            </div>
          </div>

          {/* Scroll Badge (Bottom Right) */}
          <div className="pt-6 flex justify-end">
            <div 
              onClick={() => playBeep(650)}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/30 flex items-center justify-center group cursor-pointer hover:border-[#C6FF00] hover:bg-[#C6FF00]/10 transition-colors"
              title="Scroll for more"
              id="badge-scroll-more"
            >
              {/* Rotating Circular Text SVG */}
              <svg 
                className="absolute inset-0 w-full h-full animate-spin-slow" 
                viewBox="0 0 100 100"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="font-mono-code font-bold text-[10px] fill-zinc-300 group-hover:fill-[#C6FF00] tracking-[2.5px] uppercase transition-colors">
                  <textPath href="#circlePath">
                    SCROLL FOR MORE • SCROLL FOR MORE •
                  </textPath>
                </text>
              </svg>

              {/* Center Down Arrow */}
              <ArrowDown className="w-4 h-4 text-[#C6FF00] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
