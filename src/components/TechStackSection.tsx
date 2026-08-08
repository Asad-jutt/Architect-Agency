import React from 'react';
import { SiWebflow, SiZapier, SiMake, SiHubspot, SiAstro, SiSanity, SiVite, SiTypescript, SiReact, SiThreedotjs, SiFramer, SiFigma, SiAirtable } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { Satellite } from 'lucide-react';
import BlurText from './ui/BlurText';
import { OrbitRotation, type OrbitIcon } from './ui/orbit-rotation';

interface TechStackSectionProps {
  playBeep?: (freq?: number) => void;
}

const GoHighLevelIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.4 1.8 4.8 13.2h4.7L7.9 22l8.6-11.4h-4.7l1.6-8.8Z" />
  </svg>
);

const TECH_ICONS: OrbitIcon[] = [
  { Icon: SiWebflow, name: 'Webflow' },
  { Icon: SiZapier, name: 'Zapier' },
  { Icon: SiMake, name: 'Make' },
  { Icon: SiHubspot, name: 'HubSpot' },
  { Icon: GoHighLevelIcon, name: 'GoHighLevel' },
  { Icon: SiAstro, name: 'Astro' },
  { Icon: SiSanity, name: 'Sanity' },
  { Icon: SiVite, name: 'Vite' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: SiReact, name: 'React' },
  { Icon: SiThreedotjs, name: 'Three.js' },
  { Icon: SiFramer, name: 'Framer' },
  { Icon: SiFigma, name: 'Figma' },
  { Icon: SiAirtable, name: 'Airtable' },
];

export const TechStackSection: React.FC<TechStackSectionProps> = ({ playBeep = () => {} }) => {
  return (
    <section
      className="w-full bg-black text-white border-t border-b border-white/10 relative py-12 sm:py-16 md:py-20 select-none overflow-hidden"
      id="section-tech-stack"
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
            <span className="uppercase tracking-widest font-bold">// ORBIT_MATRIX // TECH STACK</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/15 pb-5">
            <BlurText
              as="h2"
              text="WEAPONS OF MASS CREATION"
              highlight={['MASS CREATION']}
              animateBy="words"
              direction="top"
              delay={110}
              stepDuration={0.4}
              className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-none text-white"
            />

            <div className="font-mono-code text-[11px] sm:text-xs text-zinc-400 flex items-center gap-2">
              <Satellite className="w-3.5 h-3.5 text-[#C6FF00] animate-spin-slow" />
              <span>{TECH_ICONS.length} NODES LOCKED INTO ORBIT</span>
            </div>
          </div>
        </div>

        {/* Orbiting Tech Stack */}
        <div
          className="relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] cursor-pointer"
          onClick={() => playBeep(880)}
          title="Initialize tech stack"
        >
          <OrbitRotation
            icons={TECH_ICONS}
            orbitCount={3}
            orbitGap={6}
            centerIcon={{ Icon: FaReact, name: 'React' }}
            size="md"
          />
        </div>

        {/* Legend Chips */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {TECH_ICONS.map((tech) => {
            const Icon = tech.Icon;
            return (
              <button
                key={tech.name}
                onClick={() => playBeep(650 + Math.floor(Math.random() * 300))}
                className="flex items-center gap-2 px-3 py-2.5 bg-zinc-950 border border-white/10 hover:border-[#C6FF00] hover:bg-[#C6FF00]/10 transition-colors font-mono-code text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-300 hover:text-[#C6FF00] text-left min-h-[40px]"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tech.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
