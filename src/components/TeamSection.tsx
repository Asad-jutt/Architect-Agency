import React from 'react';
import TeamShowcase from './ui/team-showcase';
import { Users } from 'lucide-react';

interface TeamSectionProps {
  playBeep: (freq?: number) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ playBeep }) => {
  return (
    <section 
      className="w-full bg-black text-white border-t border-b border-white/10 relative py-12 sm:py-16 md:py-20 select-none overflow-hidden" 
      id="section-team"
    >
      {/* Background Subtle Cyber Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#C6FF00 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 font-mono-code text-xs text-[#C6FF00] mb-2.5">
            <span className="w-2 h-2 bg-[#C6FF00] inline-block animate-pulse" />
            <span className="uppercase tracking-widest font-bold">// CORE_TEAM // CREATIVE_UNIT</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/15 pb-5">
            <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-none text-white">
              TEAM_LOGS: <span className="text-zinc-500">OPERATIVES</span>
            </h2>

            <div className="font-mono-code text-[11px] sm:text-xs text-zinc-400 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#C6FF00]" />
              <span>6 OPERATIVES ACTIVE // HOVER TO INSPECT</span>
            </div>
          </div>
        </div>

        {/* Team Showcase Component */}
        <TeamShowcase playBeep={playBeep} />
      </div>
    </section>
  );
};
