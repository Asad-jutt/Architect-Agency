import React from 'react';
import { Terminal, Cpu, Zap, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  ContainerScroll,
  ContainerSticky,
  ProcessCard,
  ProcessCardBody,
  ProcessCardTitle,
} from './ui/process-timeline';

interface ProcessSectionProps {
  playBeep: (freq?: number) => void;
}

interface ProcessStep {
  id: string;
  number: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'process-1',
    number: '01',
    code: 'PHASE_01 // WIRE_STRIP',
    title: 'DISCOVERY & ARCHITECTURE',
    subtitle: 'Deconstructing intent to core visual hierarchy',
    description: 'We audit functional requirements, strip away visual slop, and establish bespoke brutalist spatial layout, typography scales, and acid color palettes.',
    deliverables: ['Scope & Intent Mapping', 'Typography Hierarchy', 'Wireframe Grid Matrix'],
    icon: Terminal,
  },
  {
    id: 'process-2',
    number: '02',
    code: 'PHASE_02 // CANVAS_ENGINE',
    title: 'SILK & KINETIC SYNTHESIS',
    subtitle: 'Engineering high-fps WebGL & canvas dynamics',
    description: 'Building interactive canvas backdrops, silk shader loops, zero-latency web audio soundscapes, and responsive TypeScript component architecture.',
    deliverables: ['Custom Canvas Shaders', 'Audio FX Engine', 'TypeScript Component Tree'],
    icon: Cpu,
  },
  {
    id: 'process-3',
    number: '03',
    code: 'PHASE_03 // CHAOS_RHYTHM',
    title: 'INTERACTION & POLISH',
    subtitle: 'Infusing brutalist character & kinetic feedback',
    description: 'Refining micro-interactions, magnetic buttons, hover rotations, spring physics animations, and high-contrast dark/light responsive boundaries.',
    deliverables: ['Magnetic Hover States', 'Smooth Scroll Tracks', 'Responsive Breakpoints'],
    icon: Zap,
  },
  {
    id: 'process-4',
    number: '04',
    code: 'PHASE_04 // DEPLOY_HARDEN',
    title: 'OPTIMIZATION & LAUNCH',
    subtitle: 'Compiling production code with instant load time',
    description: 'Running strict linter audits, esbuild production optimization, WCAG contrast verification, and instant containerized deployment.',
    deliverables: ['Zero-Slop WCAG Audit', 'esbuild Single Bundle', 'Cloud Run Container'],
    icon: Rocket,
  },
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ playBeep }) => {
  return (
    <section 
      className="w-full bg-black text-white border-t border-b border-white/10 relative py-12 sm:py-16 select-none" 
      id="section-process"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 font-mono-code text-xs sm:text-sm text-[#C6FF00] mb-3">
            <span className="w-2.5 h-2.5 bg-[#C6FF00] inline-block animate-pulse" />
            <span className="font-bold tracking-[2px] uppercase">// 02. METHODOLOGY & TIMELINE</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.95]">
              HOW WE ARCHITECT <br />
              <span className="text-[#C6FF00]">HIGH-PERFORMANCE</span> SITES
            </h2>
            <p className="font-space font-light text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
              Our 4-step horizontal scroll journey turns creative ideas into uncompromising, hyper-fast digital experiences.
            </p>
          </div>
        </div>

        {/* Scrollable Container Timeline */}
        <ContainerScroll className="relative min-h-[240vh] sm:min-h-[280vh] md:min-h-[320vh] mt-8 sm:mt-12 md:mt-16">
          <ContainerSticky className="flex flex-nowrap gap-0 pb-12 pt-4 relative items-stretch">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <ProcessCard
                  key={step.id}
                  itemsLength={PROCESS_STEPS.length}
                  index={index}
                  variant="cyber"
                  size="lg"
                  onClick={() => playBeep(650 + index * 100)}
                  className="w-full sm:w-[70%] min-w-full sm:min-w-[70%] sm:max-w-[70%] shrink-0 border-2 border-white/15 bg-zinc-950/95 hover:border-[#C6FF00] transition-colors cursor-pointer rounded-none group shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                >
                  <ProcessCardTitle className="p-3 sm:p-5 md:p-6 border-r border-white/15 bg-black/80 flex flex-col justify-between shrink-0 w-14 sm:w-20 md:w-24">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#C6FF00] text-black font-space font-bold text-xs sm:text-sm flex justify-center items-center shadow-[0_0_15px_rgba(198,255,0,0.3)] shrink-0">
                      {step.number}
                    </div>
                    <div className="mt-4 sm:mt-8 text-white/40 group-hover:text-[#C6FF00] transition-colors">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </ProcessCardTitle>

                  <ProcessCardBody className="flex flex-col justify-between p-3.5 sm:p-6 md:p-7 gap-3 sm:gap-4 w-full overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                        <span className="font-mono-code text-[9px] sm:text-[10px] text-[#C6FF00] bg-[#C6FF00]/10 border border-[#C6FF00]/30 px-2 py-0.5 uppercase tracking-wider">
                          {step.code}
                        </span>
                        <span className="font-mono-code text-[10px] text-zinc-500 uppercase tracking-wider hidden sm:inline-block">
                          PHASE 0{index + 1} // 04
                        </span>
                      </div>

                      <h3 className="font-syne font-extrabold text-base sm:text-2xl md:text-3xl text-white uppercase tracking-tight mb-1.5 sm:mb-2 group-hover:text-[#C6FF00] transition-colors leading-tight break-words">
                        {step.title}
                      </h3>

                      <p className="font-mono-code text-[10px] sm:text-xs text-zinc-400 mb-2 sm:mb-3">
                        {step.subtitle}
                      </p>

                      <p className="font-space font-light text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3 sm:mb-4">
                        {step.description}
                      </p>
                    </div>

                    <div className="pt-2.5 sm:pt-3 border-t border-white/10 space-y-1.5">
                      <div className="font-mono-code text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider mb-1 sm:mb-1.5">
                        DELIVERABLES:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {step.deliverables.map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5 font-mono-code text-[10px] sm:text-[11px] text-zinc-300 bg-white/5 px-2 py-1 border border-white/5">
                            <CheckCircle2 className="w-3 h-3 text-[#C6FF00] shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ProcessCardBody>
                </ProcessCard>
              );
            })}
          </ContainerSticky>
        </ContainerScroll>

        {/* Process Footer CTA Banner */}
        <div className="mt-6 bg-zinc-950 border border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF00] animate-pulse" />
            <span className="text-xs sm:text-sm text-zinc-300">
              READY TO ELEVATE YOUR DIGITAL IDENTITY?
            </span>
          </div>
          <a
            href="#section-about"
            onClick={() => playBeep(900)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C6FF00] text-black font-bold text-xs uppercase hover:bg-white transition-colors cursor-pointer min-h-[44px]"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

