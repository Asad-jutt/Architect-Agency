import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CardCarousel } from './ui/card-carousel';
import { PROJECTS_LIST, ProjectData } from '../data/projectsData';

interface ProjectCardsSectionProps {
  playBeep: (freq?: number) => void;
  onSelectProject: (id: string) => void;
  onOpenWorksPage: () => void;
  projects?: ProjectData[];
}

export const ProjectCardsSection: React.FC<ProjectCardsSectionProps> = ({
  playBeep,
  onSelectProject,
  onOpenWorksPage,
  projects,
}) => {
  const cards = projects && projects.length > 0 ? projects : PROJECTS_LIST;

  return (
    <section className="w-full min-h-screen flex flex-col justify-center bg-black text-white border-t border-b border-white/10 relative py-6 sm:py-8 md:py-10 select-none overflow-hidden" id="section-project-cards">
      {/* Header bar with controls */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 mb-6 flex flex-wrap items-center justify-between gap-3 font-mono-code">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#C6FF00] inline-block animate-pulse" />
          <h2 className="text-xs sm:text-sm font-bold tracking-[2px] text-white/80 uppercase">
            SELECTED_WORKS // CAROUSEL_TRACK
          </h2>
        </div>

        <button
          onClick={() => {
            playBeep(800);
            onOpenWorksPage();
          }}
          className="group flex items-center gap-2 text-xs font-bold text-[#C6FF00] hover:text-white transition-colors cursor-pointer border border-[#C6FF00]/40 hover:border-[#C6FF00] px-3.5 py-2 bg-[#12130F] min-h-[44px]"
          id="btn-[#1]"
        >
          <span>VIEW_ALL_WORKS_DIRECTORY</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Card Carousel Track Container */}
      <div className="w-full relative px-2 sm:px-4">
        <CardCarousel autoplayDelay={3500} showPagination={true} showNavigation={true}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                playBeep(850);
                onSelectProject(card.id);
              }}
              className="w-full h-[360px] sm:h-[400px] md:h-[430px] border-2 border-white/15 hover:border-[#C6FF00] bg-zinc-950 relative flex flex-col justify-between group transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
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
                      onSelectProject(card.id);
                    }}
                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#C6FF00] text-black flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer brutalist-shadow-black hover:rotate-12 shrink-0"
                    title={`View ${card.title} Case Study`}
                    id={`btn-open-${card.id}`}
                  >
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </CardCarousel>
      </div>

      {/* Bottom Action CTA Banner */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 mt-8 flex justify-center">
        <button
          onClick={() => {
            playBeep(900);
            onOpenWorksPage();
          }}
          className="group px-8 py-4 bg-[#C6FF00] text-black font-syne font-extrabold text-sm uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-[0_0_20px_rgba(198,255,0,0.3)] hover:scale-105 active:scale-95 flex items-center gap-3"
          id="btn-all-works-cta"
        >
          <span>EXPLORE ALL PROJECTS ({cards.length})</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform stroke-[3]" />
        </button>
      </div>
    </section>
  );
};
