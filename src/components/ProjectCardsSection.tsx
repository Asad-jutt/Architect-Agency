import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CardCarousel } from './ui/card-carousel';
import { PROJECTS_LIST, ProjectData } from '../data/projectsData';

interface ProjectCardsSectionProps {
  playBeep?: (freq?: number) => void;
  projects?: ProjectData[];
}

interface ProjectCardProps {
  card: ProjectData;
  isActive?: boolean;
  onOpen: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ card, isActive, onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className={`w-full h-[360px] sm:h-[400px] md:h-[430px] border-2 ${
        isActive ? 'border-[#C6FF00] scale-[1.02]' : 'border-white/15'
      } bg-zinc-950 relative flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.8)]`}
      id={`card-${card.id}`}
    >
      {/* Top 58%: Project Image Container */}
      <div className="relative w-full h-[58%] overflow-hidden bg-zinc-900">
        <img
          src={card.imageUrl}
          alt={card.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover filter grayscale contrast-125 transition-all duration-500 ease-out ${
            isActive ? 'scale-105 grayscale-0' : ''
          }`}
        />
        <div
          className={`absolute inset-0 transition-colors ${isActive ? 'bg-transparent' : 'bg-black/20'}`}
        />

        {/* Top Badge */}
        <div className="absolute top-3 left-3 z-10 font-mono-code text-[10px] text-white/80 bg-black/80 border border-white/20 px-2 py-0.5 backdrop-blur-sm">
          RECORD_{card.number}
        </div>
      </div>

      {/* Middle: Custom Colored Accent Bar */}
      <div
        className={`w-full z-10 transition-all duration-300 ${isActive ? 'h-[4px]' : 'h-[3px]'}`}
        style={{ backgroundColor: card.accentColor }}
      />

      {/* Bottom 42%: Metadata & Title */}
      <div className="relative w-full h-[42%] p-4 sm:p-5 flex flex-col justify-between bg-black z-10 overflow-hidden">
        {/* Background Giant Watermark Number */}
        <div
          className={`absolute -top-2 -left-1 font-space font-bold text-[55px] sm:text-[75px] md:text-[85px] leading-none select-none pointer-events-none transition-all ${
            isActive ? 'text-white/20 opacity-20' : 'text-white/10 opacity-15'
          }`}
        >
          {card.number}
        </div>

        {/* Project Title */}
        <div className="relative z-10 pt-1">
          <h3
            className={`font-space font-bold text-lg sm:text-xl md:text-2xl leading-[1.0] uppercase tracking-tight transition-colors ${
              isActive ? 'text-[#C6FF00]' : 'text-white'
            }`}
          >
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
              onOpen();
            }}
            className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#C6FF00] text-black flex items-center justify-center transition-transform duration-300 cursor-pointer brutalist-shadow-black shrink-0 ${
              isActive ? 'scale-110 rotate-12' : ''
            }`}
            title={`View ${card.title} Case Study`}
            id={`btn-open-${card.id}`}
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProjectCardsSection: React.FC<ProjectCardsSectionProps> = ({
  playBeep = () => {},
  projects,
}) => {
  const cards = projects && projects.length > 0 ? projects : PROJECTS_LIST;

  const openProjectDetail = (projectId: string) => {
    const project = cards.find((c) => c.id === projectId);
    const slug = project?.slug || projectId;
    window.location.href = `/projects/${slug}`;
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center bg-black text-white border-t border-b border-white/10 relative py-6 sm:py-8 md:py-10 select-none overflow-x-clip" id="section-project-cards">
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
            window.location.href = '/works';
          }}
          className="group flex items-center gap-2 text-xs font-bold text-[#C6FF00] hover:text-white transition-colors cursor-pointer border border-[#C6FF00]/40 hover:border-[#C6FF00] px-3.5 py-2 bg-[#12130F] min-h-[44px]"
          id="btn-[#1]"
        >
          <span>VIEW_ALL_WORKS_DIRECTORY</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Card Carousel Track Container */}
      <div className="w-full relative px-3 sm:px-6">
        <CardCarousel autoplayDelay={3500} showPagination={true} showNavigation={true}>
          {cards.map((card) => (
            <ProjectCard
              key={card.id}
              card={card}
              onOpen={() => {
                playBeep(850);
                openProjectDetail(card.id);
              }}
            />
          ))}
        </CardCarousel>
      </div>

      {/* Bottom Action CTA Banner */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 mt-8 flex justify-center">
      </div>
    </section>
  );
};
