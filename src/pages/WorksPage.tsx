import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search, SlidersHorizontal, Terminal, LayoutGrid } from 'lucide-react';
import { PROJECTS_LIST, ProjectData } from '../data/projectsData';

interface WorksPageProps {
  onSelectProject: (id: string) => void;
  onNavigateHome: () => void;
  playBeep?: (freq?: number) => void;
  projects?: ProjectData[];
}

export const WorksPage: React.FC<WorksPageProps> = ({
  onSelectProject,
  onNavigateHome,
  playBeep,
  projects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const triggerBeep = (freq = 700) => {
    if (playBeep) playBeep(freq);
  };

  const categories = ['ALL', 'WEBFLOW', 'EXPERIMENTAL', 'COMMERCIAL', 'RESEARCH'];

  const projectsList = projects && projects.length > 0 ? projects : PROJECTS_LIST;

  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory = selectedCategory === 'ALL' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-black text-white font-mono-code select-none pb-20 pt-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1280px] mx-auto space-y-8 sm:space-y-12">
        
        {/* Top Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
          <button
            onClick={() => {
              triggerBeep(500);
              onNavigateHome();
            }}
            className="group flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#12130F] border border-white/20 hover:border-[#C6FF00] text-zinc-300 hover:text-[#C6FF00] transition-all rounded duration-200 cursor-pointer text-xs sm:text-sm font-bold uppercase"
            id="btn-works-back-home"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>← RETURN_TO_HOME</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#C6FF00] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
            <span className="uppercase">INDEX // ALL_PROJECTS_DIRECTORY</span>
          </div>
        </div>

        {/* Header Hero Title */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-[#C6FF00] font-bold">
            <LayoutGrid className="w-4 h-4" />
            <span>ARCHITECT.EXE // PORTFOLIO_COLLECTION</span>
          </div>

          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            SELECTED_<span className="text-[#C6FF00]">WORKS</span>
          </h1>

          <p className="font-space text-sm sm:text-base text-zinc-300 leading-relaxed">
            Explore our archive of liquid digital surfaces, WebGL experiments, and custom Webflow client deployments engineered for world-class brands.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-[#12130F] border border-white/10 rounded-lg">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  triggerBeep(600);
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-bold transition-all rounded border cursor-pointer uppercase ${
                  selectedCategory === cat
                    ? 'bg-[#C6FF00] text-black border-[#C6FF00]'
                    : 'bg-black text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="SEARCH_WORKS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/15 focus:border-[#C6FF00] text-white text-xs pl-9 pr-3 py-2 outline-none rounded font-mono-code placeholder:text-zinc-600 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                triggerBeep(850);
                onSelectProject(project.id);
              }}
              className="group border-2 border-white/15 hover:border-[#C6FF00] bg-zinc-950 relative flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.8)] overflow-hidden"
              id={`works-card-${project.id}`}
            >
              {/* Image Container */}
              <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-zinc-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                <div className="absolute top-3 left-3 z-10 font-mono-code text-[10px] text-white/80 bg-black/80 border border-white/20 px-2 py-0.5 backdrop-blur-sm">
                  RECORD_{project.number}
                </div>

                <div className="absolute top-3 right-3 z-10 font-mono-code text-[10px] text-[#C6FF00] bg-black/90 border border-[#C6FF00] px-2 py-0.5 font-bold uppercase">
                  {project.category}
                </div>
              </div>

              {/* Accent Line */}
              <div
                className="w-full h-[3px] transition-all duration-300 group-hover:h-[4px]"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Details Content */}
              <div className="p-5 sm:p-6 space-y-4 bg-black">
                <div className="space-y-1">
                  <h2 className="font-syne font-extrabold text-2xl text-white group-hover:text-[#C6FF00] transition-colors uppercase">
                    {project.title}
                  </h2>
                  <p className="font-space text-xs text-zinc-400">
                    {project.subtitle}
                  </p>
                </div>

                <p className="font-mono-code text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[11px] text-zinc-500 font-bold uppercase">YEAR: {project.year}</span>
                  <div className="flex items-center gap-1 text-xs text-[#C6FF00] font-bold group-hover:translate-x-1 transition-transform">
                    <span>VIEW_CASE_STUDY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center bg-[#12130F] border border-white/10 p-8 space-y-3">
              <p className="font-syne font-bold text-lg text-zinc-400">NO_MATCHING_PROJECTS_FOUND</p>
              <p className="text-xs text-zinc-500">Try clearing your search query or selecting a different category filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="px-4 py-2 bg-[#C6FF00] text-black text-xs font-bold uppercase hover:bg-white transition-colors cursor-pointer"
              >
                RESET_FILTERS
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
