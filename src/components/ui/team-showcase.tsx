import React, { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '../../lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'CHADRACK V.',
    role: 'DIRECTOR OF PHOTOGRAPHY',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    social: { twitter: '#', linkedin: '#', behance: '#' },
  },
  {
    id: '2',
    name: 'MAK VIESAINTE',
    role: 'FOUNDER // CREATIVE ARCHITECT',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'OSIRIS BALONGA',
    role: 'LEAD FRONTEND ENGINE',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'JACQUES M.',
    role: 'PRODUCT OWNER & STRATEGIST',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    social: { linkedin: '#' },
  },
  {
    id: '5',
    name: 'RICHE MAKSO',
    role: 'CTO // PRODUCT DESIGNER',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '6',
    name: 'JEMIMA K.',
    role: '3D & MOTION ARTISTE',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    social: { instagram: '#', behance: '#' },
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
  playBeep?: (freq?: number) => void;
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS, playBeep }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleHover = (id: string | null) => {
    setHoveredId(id);
    if (id && playBeep) {
      playBeep(650);
    }
  };

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto py-4 px-2 font-mono-code">
      {/* ── Left: photo grid ── */}
      <div className="flex gap-3 md:gap-4 flex-shrink-0 overflow-x-auto pb-2 md:pb-0 max-w-full justify-center">
        {/* Column 1 */}
        <div className="flex flex-col gap-3 md:gap-4">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
              hoveredId={hoveredId}
              onHover={handleHover}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3 md:gap-4 mt-[40px] sm:mt-[48px] md:mt-[56px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
              hoveredId={hoveredId}
              onHover={handleHover}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3 md:gap-4 mt-[18px] sm:mt-[22px] md:mt-[28px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
              hoveredId={hoveredId}
              onHover={handleHover}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-2 md:pt-4 flex-1 w-full border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={handleHover}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg cursor-pointer flex-shrink-0 transition-all duration-300 border-2',
        isActive ? 'border-[#C6FF00] scale-105 shadow-[0_0_15px_rgba(198,255,0,0.3)] z-10' : 'border-white/15',
        className,
        isDimmed ? 'opacity-40 grayscale' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-all duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1.05)' : 'grayscale(1) brightness(0.75)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance;

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-300 p-2 rounded-md hover:bg-white/5',
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social*/}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'w-2 h-2 rounded-none flex-shrink-0 transition-all duration-300',
            isActive ? 'bg-[#C6FF00] w-4' : 'bg-white/30',
          )}
        />
        <span
          className={cn(
            'font-syne font-extrabold text-base md:text-lg uppercase tracking-tight transition-colors duration-300',
            isActive ? 'text-[#C6FF00]' : 'text-white/90',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-auto md:ml-2 transition-all duration-200',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-zinc-400 hover:text-[#C6FF00] hover:bg-white/10 transition-all duration-150"
                title="X / Twitter"
              >
                <FaTwitter size={12} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-zinc-400 hover:text-[#C6FF00] hover:bg-white/10 transition-all duration-150"
                title="LinkedIn"
              >
                <FaLinkedinIn size={12} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-zinc-400 hover:text-[#C6FF00] hover:bg-white/10 transition-all duration-150"
                title="Instagram"
              >
                <FaInstagram size={12} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-zinc-400 hover:text-[#C6FF00] hover:bg-white/10 transition-all duration-150"
                title="Behance"
              >
                <FaBehance size={12} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-1 pl-4 font-mono-code text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
        {member.role}
      </p>
    </div>
  );
}
