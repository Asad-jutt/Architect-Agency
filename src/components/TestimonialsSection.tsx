import React from 'react';
import { Disc } from 'lucide-react';

interface TestimonialsSectionProps {
  playBeep: (freq?: number) => void;
}

interface CassetteData {
  id: string;
  side: string;
  speed: string;
  badgeBg: string;
  badgeTextColor: string;
  speedBadgeStyle: string;
  authorColor: string;
  borderColor: string;
  quote: string;
  author: string;
  role: string;
  rotationClass: string;
  frequency: number;
}

const CASSETTES: CassetteData[] = [
  {
    id: 'tape-1',
    side: 'SIDE A',
    speed: 'REEL_SPEED: 100%',
    badgeBg: 'bg-[#C6FF00]',
    badgeTextColor: 'text-black font-extrabold',
    speedBadgeStyle: 'bg-black/20 text-black font-bold',
    authorColor: 'text-[#C6FF00]',
    borderColor: 'hover:border-[#C6FF00]',
    quote: '"The level of technical depth and creative chaos ARCHITECT.EXE brings is unmatched. Our conversion rates went through the roof, but more importantly, our brand feels alive."',
    author: 'SARAH V.',
    role: 'CEO @ NEON_FLUX',
    rotationClass: 'md:-rotate-2',
    frequency: 600,
  },
  {
    id: 'tape-2',
    side: 'SIDE B',
    speed: 'REEL_SPEED: 100%',
    badgeBg: 'bg-zinc-800',
    badgeTextColor: 'text-[#C6FF00] font-extrabold',
    speedBadgeStyle: 'bg-black/60 text-zinc-300 font-bold',
    authorColor: 'text-[#C6FF00]',
    borderColor: 'hover:border-[#C6FF00]',
    quote: '"Finally, a designer who isn\'t afraid to break the rules. The Webflow execution is flawless—performance is high despite the complex liquid animations."',
    author: 'MARCUS REED',
    role: 'CTO @ SYNTH_WAVE',
    rotationClass: 'md:rotate-3',
    frequency: 750,
  },
  {
    id: 'tape-3',
    side: 'SIDE C',
    speed: 'REEL_SPEED: 100%',
    badgeBg: 'bg-white',
    badgeTextColor: 'text-black font-extrabold',
    speedBadgeStyle: 'bg-black/15 text-black font-bold',
    authorColor: 'text-white',
    borderColor: 'hover:border-white',
    quote: '"The \'unhinged\' branding isn\'t just a gimmick. It\'s a philosophy of absolute quality and creative fearlessness. Highly recommended for premium tech builds."',
    author: 'JULIA K.',
    role: 'FOUNDER @ KINETIC_UI',
    rotationClass: 'md:-rotate-1',
    frequency: 900,
  },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ playBeep }) => {
  return (
    <section 
      className="w-full bg-black text-white border-t border-b border-white/10 relative py-12 sm:py-16 md:py-20 select-none overflow-hidden" 
      id="section-testimonials"
    >
      {/* Background Subtle Cyber Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-[#C6FF00] 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 font-mono-code text-xs text-[#C6FF00] mb-2.5">
            <span className="w-2 h-2 bg-[#C6FF00] inline-block animate-pulse" />
            <span className="uppercase tracking-widest font-bold">// VOX_LOGS // TESTIMONIALS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/15 pb-5">
            <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-none text-white">
              VOX_LOGS: <span className="text-zinc-500">TESTIMONIALS</span>
            </h2>

            <div className="font-mono-code text-[11px] sm:text-xs text-zinc-400 flex items-center gap-2">
              <Disc className="w-3.5 h-3.5 text-[#C6FF00] animate-spin-slow" />
              <span>3 CASSETTE REELS LOADED</span>
            </div>
          </div>
        </div>

        {/* Cassette Tapes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-6 items-stretch pt-1 pb-4">
          {CASSETTES.map((tape) => {
            return (
              <div
                key={tape.id}
                onClick={() => playBeep(tape.frequency)}
                className={`group relative bg-[#1A1B16] border-2 border-white/20 ${tape.borderColor} ${tape.rotationClass} hover:rotate-0 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-[8px_8px_0px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden`}
              >
                {/* Screw Holes (4 corners) */}
                <span className="absolute top-2 left-2 w-2 h-2 bg-zinc-800 border border-black rounded-sm z-20 pointer-events-none" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-zinc-800 border border-black rounded-sm z-20 pointer-events-none" />
                <span className="absolute bottom-2 left-2 w-2 h-2 bg-zinc-800 border border-black rounded-sm z-20 pointer-events-none" />
                <span className="absolute bottom-2 right-2 w-2 h-2 bg-zinc-800 border border-black rounded-sm z-20 pointer-events-none" />

                {/* Top Stripe / Tape Label Header */}
                <div className={`w-full ${tape.badgeBg} ${tape.badgeTextColor} px-3.5 py-2.5 border-b-2 border-black flex items-center justify-between z-10`}>
                  <span className="font-syne font-black text-base sm:text-lg tracking-tight uppercase">
                    {tape.side}
                  </span>
                  
                  <div className={`${tape.speedBadgeStyle} px-2 py-0.5 rounded font-mono-code text-[10px] tracking-wider uppercase font-semibold`}>
                    <span>{tape.speed}</span>
                  </div>
                </div>

                {/* Main Quote Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                  <p className="font-mono-code italic text-xs sm:text-xs md:text-sm text-zinc-200 leading-relaxed group-hover:text-white transition-colors">
                    {tape.quote}
                  </p>

                  {/* Author Meta Info */}
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <h3 className={`font-syne font-bold text-sm sm:text-base ${tape.authorColor} tracking-tight`}>
                        {tape.author}
                      </h3>
                      <p className="font-mono-code text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">
                        {tape.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
