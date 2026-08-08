import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Cpu,
  Activity,
  CheckCircle2,
  Maximize2,
  Zap,
  Globe,
  Layers,
  Shield,
  Sparkles,
} from 'lucide-react';
import { ProjectData, PROJECTS_LIST } from '../../data/projectsData';
import BlurText from '../ui/BlurText';

interface ProjectDetailPageProps {
  project: ProjectData;
  projects?: ProjectData[];
  playBeep?: (freq?: number) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  projects,
  playBeep,
}) => {
  const projectList = projects && projects.length > 0 ? projects : PROJECTS_LIST;
  const [selectedImage, setSelectedImage] = useState<string>(project.imageUrl);
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'specs' | 'gallery'>('overview');
  const [isZoomed, setIsZoomed] = useState(false);

  // Find index for Prev/Next navigation
  const currentIndex = projectList.findIndex((p) => p.id === project.id);
  const prevProject = projectList[(currentIndex - 1 + projectList.length) % projectList.length];
  const nextProject = projectList[(currentIndex + 1) % projectList.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(project.imageUrl);
  }, [project.id]);

  const triggerBeep = (freq = 700) => {
    if (playBeep) playBeep(freq);
  };

  const navigateToProject = (p: ProjectData) => {
    triggerBeep(700);
    window.location.href = `/projects/${p.slug || p.id}`;
  };

  return (
    <div className="w-full min-h-screen bg-black text-white font-mono-code select-none pb-20 pt-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1280px] mx-auto space-y-8 sm:space-y-12">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
          <a
            href="/works"
            onClick={() => triggerBeep(500)}
            className="group flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#12130F] border border-white/20 hover:border-[#C6FF00] text-zinc-300 hover:text-[#C6FF00] transition-all rounded duration-200 cursor-pointer text-xs sm:text-sm font-bold uppercase no-underline"
            id="btn-back-to-works"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>← BACK_TO_ALL_WORKS</span>
          </a>

          <div className="flex items-center gap-2 text-xs text-[#C6FF00] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
            <span className="uppercase">RECORD_{project.number} // {project.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <span className="px-2 py-0.5 bg-[#12130F] border border-white/10 text-[#C6FF00] font-bold">
              {project.category}
            </span>
            <span className="px-2 py-0.5 bg-[#12130F] border border-white/10 text-zinc-300">
              YEAR_{project.year}
            </span>
            <span className="px-2 py-0.5 bg-[#12130F] border border-white/10 text-zinc-300">
              CLIENT: {project.client}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 min-w-0">
              <BlurText
                as="h1"
                text={project.title}
                animateBy="words"
                direction="top"
                delay={90}
                stepDuration={0.4}
                className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-none break-words"
              />
              <p className="font-space text-base sm:text-lg lg:text-xl text-zinc-300 font-medium break-words">
                {project.subtitle}
              </p>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerBeep(900)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C6FF00] text-black font-syne font-extrabold text-sm uppercase hover:bg-white transition-all cursor-pointer shadow-[0_0_20px_rgba(198,255,0,0.3)] hover:scale-105 active:scale-95 shrink-0"
                id="btn-live-preview"
              >
                <Globe className="w-4 h-4" />
                <span>LAUNCH_LIVE_SITE</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </a>
            )}
          </div>
        </div>

        {/* Main Display Canvas */}
        <div className="relative w-full h-[260px] sm:h-[380px] md:h-[460px] border-2 border-white/20 hover:border-[#C6FF00] overflow-hidden bg-zinc-950 transition-colors">
          <img
            src={selectedImage}
            alt={project.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isZoomed ? 'scale-125' : 'scale-100'
            }`}
          />

          {/* Cyber Scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

          {/* Top Badge */}
          <div className="absolute top-4 left-4 z-10 bg-black/90 border border-[#C6FF00] px-3 py-1 text-xs text-[#C6FF00] font-bold flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-ping" />
            <span>PRIMARY_RENDER // HIGH_RES</span>
          </div>

          <button
            onClick={() => {
              triggerBeep(800);
              setIsZoomed(!isZoomed);
            }}
            className="absolute bottom-4 right-4 z-10 bg-black/90 hover:bg-[#C6FF00] text-[#C6FF00] hover:text-black border border-[#C6FF00] px-3 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Inspect Canvas"
          >
            <Maximize2 className="w-4 h-4" />
            <span>{isZoomed ? 'RESET_ZOOM' : 'INSPECT_CANVAS'}</span>
          </button>
        </div>

        {/* Gallery Thumbnails Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {project.galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                triggerBeep(750);
                setSelectedImage(img);
              }}
              className={`h-24 sm:h-32 border-2 cursor-pointer overflow-hidden transition-all ${
                selectedImage === img
                  ? 'border-[#C6FF00] opacity-100 scale-[1.02] shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
              }`}
            >
              <img src={img} alt={`Gallery ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-white/20 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#12130F]">
          <button
            onClick={() => {
              triggerBeep(650);
              setActiveTab('overview');
            }}
            className={`px-5 py-4 flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider transition-colors border-r border-white/10 whitespace-nowrap cursor-pointer min-h-[48px] ${
              activeTab === 'overview'
                ? 'bg-[#C6FF00] text-black font-extrabold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>01 // OVERVIEW</span>
          </button>

          <button
            onClick={() => {
              triggerBeep(650);
              setActiveTab('challenge');
            }}
            className={`px-5 py-4 flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider transition-colors border-r border-white/10 whitespace-nowrap cursor-pointer min-h-[48px] ${
              activeTab === 'challenge'
                ? 'bg-[#C6FF00] text-black font-extrabold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>02 // CHALLENGE & SOLUTION</span>
          </button>

          <button
            onClick={() => {
              triggerBeep(650);
              setActiveTab('specs');
            }}
            className={`px-5 py-4 flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider transition-colors border-r border-white/10 whitespace-nowrap cursor-pointer min-h-[48px] ${
              activeTab === 'specs'
                ? 'bg-[#C6FF00] text-black font-extrabold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>03 // TECH SPECS</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-[#12130F] border border-white/10 p-6 sm:p-8 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-3">
                <h3 className="font-syne font-extrabold text-xl text-[#C6FF00] uppercase">
                  PROJECT BRIEF & ARCHITECTURAL PHILOSOPHY
                </h3>
                <p className="font-space text-base sm:text-lg text-zinc-200 leading-relaxed">
                  {project.fullOverview}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 bg-black border border-white/10 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase">{m.label}</span>
                    <p className="text-xl sm:text-2xl font-bold text-[#C6FF00]">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenge' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              <div className="p-5 bg-black border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase">
                  <Zap className="w-4 h-4" />
                  <span>THE ARCHITECTURAL CHALLENGE</span>
                </div>
                <p className="font-space text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-5 bg-black border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-[#C6FF00] font-bold text-xs uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>THE DEPLOYED SOLUTION</span>
                </div>
                <p className="font-space text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4 font-mono-code text-xs sm:text-sm animate-fadeIn">
              <div className="p-4 bg-black border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-zinc-500">FRAMEWORK & STACK:</span>
                <span className="text-[#C6FF00] font-bold">{project.techSpecs.framework}</span>
              </div>

              <div className="p-4 bg-black border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-zinc-500">STYLING ENGINE:</span>
                <span className="text-[#C6FF00] font-bold">{project.techSpecs.styling}</span>
              </div>

              <div className="p-4 bg-black border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-zinc-500">ANIMATION PIPELINE:</span>
                <span className="text-[#C6FF00] font-bold">{project.techSpecs.animations}</span>
              </div>

              <div className="p-4 bg-black border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-zinc-500">LIGHTHOUSE AUDIT:</span>
                <span className="text-[#C6FF00] font-bold">{project.techSpecs.performanceScore}</span>
              </div>

              <div className="p-4 bg-black border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-zinc-500">EDGE INFRASTRUCTURE:</span>
                <span className="text-[#C6FF00] font-bold">{project.techSpecs.hosting}</span>
              </div>
            </div>
          )}
        </div>

        {/* Next / Previous Collection Items Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/15">
          <a
            href={`/projects/${prevProject.slug || prevProject.id}`}
            onClick={() => triggerBeep(700)}
            className="group p-5 bg-[#12130F] border border-white/10 hover:border-[#C6FF00] text-left transition-all duration-300 flex items-center gap-4 cursor-pointer no-underline"
            id="btn-prev-project"
          >
            <ArrowLeft className="w-5 h-5 text-[#C6FF00] group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">PREVIOUS_RECORD</span>
              <span className="font-syne font-bold text-base text-white group-hover:text-[#C6FF00] transition-colors">
                {prevProject.title}
              </span>
            </div>
          </a>

          <a
            href={`/projects/${nextProject.slug || nextProject.id}`}
            onClick={() => triggerBeep(700)}
            className="group p-5 bg-[#12130F] border border-white/10 hover:border-[#C6FF00] text-right transition-all duration-300 flex items-center justify-end gap-4 cursor-pointer no-underline"
            id="btn-next-project"
          >
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">NEXT_RECORD</span>
              <span className="font-syne font-bold text-base text-white group-hover:text-[#C6FF00] transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#C6FF00] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
};
