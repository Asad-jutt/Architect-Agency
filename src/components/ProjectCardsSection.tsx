import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Maximize2,
  Cpu,
  Zap,
  Activity,
  Terminal,
  X,
} from 'lucide-react';

interface ProjectCardData {
  id: string;
  number: string;
  title: string;
  badge1: string;
  badge2: string;
  accentColor: string; // CSS color string e.g. '#C6FF00', '#FF007F', '#00FFFF', '#FFFFFF'
  imageUrl: string;
  description: string;
}

const PROJECT_CARDS: ProjectCardData[] = [
  {
    id: 'project-void',
    number: '01',
    title: 'PROJECT VOID',
    badge1: 'WEBFLOW',
    badge2: '2024',
    accentColor: '#C6FF00',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    description: 'Monochromatic spatial brutalist web design exploring negative space and raw concrete grid typography.',
  },
  {
    id: 'system-core',
    number: '02',
    title: 'SYSTEM CORE',
    badge1: 'EXPERIMENTAL',
    badge2: '2025',
    accentColor: '#FF007F',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    description: 'High-frequency telemetry stream and cybernetic infrastructure monitoring dashboard with real-time logs.',
  },
  {
    id: 'liquid-metal',
    number: '03',
    title: 'LIQUID METAL',
    badge1: 'COMMERCIAL',
    badge2: '2026',
    accentColor: '#00FFFF',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    description: 'Generative fluid dynamics simulation engine running WebGL shaders for high-end digital art installations.',
  },
  {
    id: 'neural-grid',
    number: '04',
    title: 'NEURAL GRID',
    badge1: 'RESEARCH',
    badge2: '2026',
    accentColor: '#FFFFFF',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    description: 'Autonomous knowledge graph and neural synthesis agent interface powering multi-agent research tasks.',
  },
];

interface ProjectCardsSectionProps {
  playBeep: (freq?: number) => void;
}

export const ProjectCardsSection: React.FC<ProjectCardsSectionProps> = ({
  playBeep,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [activeProject, setActiveProject] = useState<ProjectCardData | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'specs' | 'metrics'>('overview');
  const [isZoomed, setIsZoomed] = useState(false);

  const checkScrollability = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability);
      checkScrollability();
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollability);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    playBeep(700);
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center bg-black text-white border-t border-b border-white/10 relative py-6 sm:py-8 md:py-10 select-none overflow-hidden" id="section-project-cards">
      {/* Header bar with controls */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono-code">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#C6FF00] inline-block animate-pulse" />
          <h2 className="text-xs sm:text-sm font-bold tracking-[2px] text-white/80 uppercase">
            SELECTED_WORKS // HORIZONTAL_SCROLL_TRACK
          </h2>
        </div>

        {/* Scroll navigation controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-white/40 hidden sm:inline-block mr-2">
            SWIPE OR USE NAVIGATION [← →]
          </span>
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className={`p-1.5 sm:p-2 border transition-colors ${
              canScrollLeft
                ? 'border-white/30 text-white hover:border-[#C6FF00] hover:text-[#C6FF00] cursor-pointer'
                : 'border-white/10 text-white/20 cursor-not-allowed'
            }`}
            title="Scroll Left"
            id="btn-scroll-left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`p-1.5 sm:p-2 border transition-colors ${
              canScrollRight
                ? 'border-white/30 text-white hover:border-[#C6FF00] hover:text-[#C6FF00] cursor-pointer'
                : 'border-white/10 text-white/20 cursor-not-allowed'
            }`}
            title="Scroll Right"
            id="btn-scroll-right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className="w-full relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth border-t border-b border-white/10 bg-black"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECT_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                playBeep(850);
                setActiveProject(card);
              }}
              className="flex-none w-[230px] sm:w-[280px] md:w-[320px] h-[320px] sm:h-[370px] md:h-[410px] border-r border-white/10 bg-black relative flex flex-col justify-between group snap-start transition-colors duration-300 hover:bg-zinc-950 cursor-pointer"
              id={`card-${card.id}`}
            >
              {/* Top 58%: Project Image Container */}
              <div className="relative w-full h-[58%] overflow-hidden bg-zinc-900">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10 font-mono-code text-[10px] text-white/80 bg-black/80 border border-white/20 px-2 py-0.5 backdrop-blur-sm">
                  RECORD_{card.number}
                </div>
              </div>

              {/* Middle: Custom Colored Accent Bar */}
              <div
                className="w-full h-[3px] z-10 transition-all duration-300 group-hover:h-[4px]"
                style={{ backgroundColor: card.accentColor }}
              />

              {/* Bottom 42%: Metadata & Title */}
              <div className="relative w-full h-[42%] p-4 sm:p-5 flex flex-col justify-between bg-black z-10 overflow-hidden">
                {/* Background Giant Watermark Number */}
                <div
                  className="absolute -top-2 -left-1 font-space font-bold text-[55px] sm:text-[75px] md:text-[85px] leading-none text-white/10 select-none pointer-events-none transition-opacity group-hover:text-white/20"
                  style={{ opacity: 0.15 }}
                >
                  {card.number}
                </div>

                {/* Project Title */}
                <div className="relative z-10 pt-1">
                  <h3 className="font-space font-bold text-lg sm:text-xl md:text-2xl leading-[1.0] text-white uppercase tracking-tight group-hover:text-[#C6FF00] transition-colors">
                    {card.title}
                  </h3>
                </div>

                {/* Badges & Action Button */}
                <div className="relative z-10 flex items-end justify-between pt-2 gap-2">
                  {/* Category & Year Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 font-mono-code text-[9px] sm:text-[10px] text-white/60">
                    <div className="border border-white/20 px-1.5 py-0.5 uppercase tracking-wider">
                      {card.badge1}
                    </div>
                    <div className="border border-white/20 px-1.5 py-0.5 uppercase tracking-wider">
                      {card.badge2}
                    </div>
                  </div>

                  {/* Circular Floating Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playBeep(850);
                      setActiveProject(card);
                    }}
                    className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#C6FF00] text-black flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer brutalist-shadow-black hover:rotate-12 shrink-0"
                    title={`Inspect ${card.title}`}
                    id={`btn-open-${card.id}`}
                  >
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Fidelity Immersive Electric Cyan Project Details Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn cursor-pointer"
          onClick={() => {
            playBeep(300);
            setActiveProject(null);
          }}
          id="project-details-modal-backdrop"
        >
          {/* Subtle Grid Pattern Overlay in Backdrop */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'radial-gradient(#00F0FF 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div
            className="bg-zinc-950 border-2 border-[#00F0FF] w-full max-w-3xl text-white font-mono-code shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden relative cursor-default max-h-[92vh] flex flex-col rounded-none"
            onClick={(e) => e.stopPropagation()}
            id="project-details-modal-content"
          >
            {/* Corner HUD Crosshairs */}
            <div className="absolute top-1 left-1 text-[#00F0FF] text-[10px] pointer-events-none z-20 font-bold">+</div>
            <div className="absolute top-1 right-1 text-[#00F0FF] text-[10px] pointer-events-none z-20 font-bold">+</div>
            <div className="absolute bottom-1 left-1 text-[#00F0FF] text-[10px] pointer-events-none z-20 font-bold">+</div>
            <div className="absolute bottom-1 right-1 text-[#00F0FF] text-[10px] pointer-events-none z-20 font-bold">+</div>

            {/* Modal Header Bar */}
            <div className="p-3 sm:p-4 bg-zinc-900 border-b border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-between font-bold text-xs sm:text-sm tracking-wider">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 bg-[#00F0FF] inline-block animate-pulse shadow-[0_0_8px_#00F0FF]" />
                <span className="text-white font-syne font-extrabold uppercase tracking-wide">
                  RECORD_{activeProject.number} // {activeProject.title}
                </span>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] text-zinc-400 hidden sm:inline border border-white/10 px-2 py-0.5">
                  CYBER_HUD_V2.4
                </span>
                <button
                  onClick={() => {
                    playBeep(300);
                    setActiveProject(null);
                  }}
                  className="p-1 bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-colors border border-[#00F0FF] font-bold text-xs cursor-pointer uppercase flex items-center gap-1"
                  id="btn-close-project-details"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">CLOSE</span>
                </button>
              </div>
            </div>

            {/* Immersive HUD Tab Bar */}
            <div className="flex items-center bg-black border-b border-white/10 text-xs font-mono-code overflow-x-auto scrollbar-none">
              <button
                onClick={() => {
                  playBeep(700);
                  setModalTab('overview');
                }}
                className={`px-4 py-3 flex items-center gap-2 border-r border-white/10 transition-colors whitespace-nowrap cursor-pointer ${
                  modalTab === 'overview'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-b-2 border-b-[#00F0FF] font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>01 // OVERVIEW</span>
              </button>

              <button
                onClick={() => {
                  playBeep(800);
                  setModalTab('specs');
                }}
                className={`px-4 py-3 flex items-center gap-2 border-r border-white/10 transition-colors whitespace-nowrap cursor-pointer ${
                  modalTab === 'specs'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-b-2 border-b-[#00F0FF] font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>02 // TECH SPECS</span>
              </button>

              <button
                onClick={() => {
                  playBeep(900);
                  setModalTab('metrics');
                }}
                className={`px-4 py-3 flex items-center gap-2 border-r border-white/10 transition-colors whitespace-nowrap cursor-pointer ${
                  modalTab === 'metrics'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-b-2 border-b-[#00F0FF] font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>03 // BENCHMARKS</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-7 space-y-6 overflow-y-auto bg-black flex-1">
              {modalTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Hero Image Container */}
                  <div className="w-full h-52 sm:h-72 overflow-hidden border border-[#00F0FF]/30 relative group bg-zinc-900">
                    <img
                      src={activeProject.imageUrl}
                      alt={activeProject.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isZoomed ? 'scale-125' : 'scale-100'
                      }`}
                    />
                    
                    {/* Scanline Effect Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

                    <div className="absolute top-3 left-3 bg-black/90 border border-[#00F0FF] px-2.5 py-1 text-[11px] text-[#00F0FF] font-bold tracking-wider flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                      <span>RENDER_ENGINE: WEBGL_2.0</span>
                    </div>

                    <button
                      onClick={() => {
                        playBeep(1000);
                        setIsZoomed(!isZoomed);
                      }}
                      className="absolute bottom-3 right-3 bg-black/90 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-black border border-[#00F0FF] p-2 text-xs transition-colors cursor-pointer flex items-center gap-1 font-bold"
                      title="Toggle Lightbox Zoom"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{isZoomed ? 'RESET_ZOOM' : 'INSPECT_FULL'}</span>
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-mono-code text-xs text-[#00F0FF] mb-1">
                      <span>// ACTIVE_RECORD_IDENTITY</span>
                    </div>
                    <h3 className="font-syne font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-3">
                      {activeProject.title}
                    </h3>
                    <p className="font-space text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-zinc-950 border border-white/10 flex flex-col justify-between">
                      <span className="font-mono-code text-[10px] text-zinc-500">FRAMEWORK</span>
                      <span className="font-mono-code text-xs font-bold text-[#00F0FF] mt-1">{activeProject.badge1}</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-white/10 flex flex-col justify-between">
                      <span className="font-mono-code text-[10px] text-zinc-500">RELEASE YEAR</span>
                      <span className="font-mono-code text-xs font-bold text-[#00F0FF] mt-1">{activeProject.badge2}</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-white/10 flex flex-col justify-between">
                      <span className="font-mono-code text-[10px] text-zinc-500">ACCESSIBILITY</span>
                      <span className="font-mono-code text-xs font-bold text-[#00F0FF] mt-1">WCAG_AA_PASS</span>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'specs' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border border-[#00F0FF]/30 p-4 bg-zinc-950/80">
                    <div className="flex items-center gap-2 font-mono-code text-xs text-[#00F0FF] mb-2 font-bold">
                      <Cpu className="w-4 h-4" />
                      <span>SYSTEM_ARCHITECTURE_MATRIX</span>
                    </div>
                    <p className="font-space text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Built with an uncompromising brutalist design philosophy. Engineered with zero unnecessary dependencies, high-fps hardware canvas, and modular state management.
                    </p>
                  </div>

                  <div className="space-y-3 font-mono-code text-xs">
                    <div className="p-3 bg-zinc-950 border border-white/10 flex items-center justify-between">
                      <span className="text-zinc-400">CORE PIPELINE:</span>
                      <span className="text-[#00F0FF] font-bold">Vite + React 19 + TypeScript</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-white/10 flex items-center justify-between">
                      <span className="text-zinc-400">STYLING ENGINE:</span>
                      <span className="text-[#00F0FF] font-bold">Tailwind CSS v4 + Custom Utility Matrix</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-white/10 flex items-center justify-between">
                      <span className="text-zinc-400">AUDIO SYNTHESIS:</span>
                      <span className="text-[#00F0FF] font-bold">Web Audio API Sine Oscillator</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-white/10 flex items-center justify-between">
                      <span className="text-zinc-400">SECURITY AUDIT:</span>
                      <span className="text-[#00F0FF] font-bold">0 Vulnerabilities / Cloud Run Ready</span>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'metrics' && (
                <div className="space-y-6 animate-fadeIn font-mono-code">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-950 border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">CORE WEB VITALS</span>
                        <span className="text-[#00F0FF] font-bold">99.8 / 100</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 overflow-hidden border border-white/10">
                        <div className="bg-[#00F0FF] h-full w-[99.8%]" />
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">CANVAS STABILITY</span>
                        <span className="text-[#00F0FF] font-bold">60.0 FPS</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 overflow-hidden border border-white/10">
                        <div className="bg-[#00F0FF] h-full w-[100%]" />
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">AUDIO LATENCY</span>
                        <span className="text-[#00F0FF] font-bold">4.2 ms</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 overflow-hidden border border-white/10">
                        <div className="bg-[#00F0FF] h-full w-[95%]" />
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">MEMORY FOOTPRINT</span>
                        <span className="text-[#00F0FF] font-bold">28.4 MB</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 overflow-hidden border border-white/10">
                        <div className="bg-[#00F0FF] h-full w-[88%]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900/50 border border-white/10 text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>TELEMETRY STATUS: LIVE_CONNECTED</span>
                    <span className="text-[#00F0FF] font-bold">PING: 12ms</span>
                  </div>
                </div>
              )}

              {/* Modal Bottom Action Controls */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-3 font-mono-code">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span className="hidden sm:inline">STATUS: LIVE_PRODUCTION_NODE</span>
                  <span className="sm:hidden">LIVE</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playBeep(900);
                      setActiveProject(null);
                    }}
                    className="px-5 py-2.5 bg-[#00F0FF] text-black font-bold text-xs uppercase hover:bg-white transition-colors cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  >
                    DISMISS RECORD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
