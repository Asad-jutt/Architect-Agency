import React from 'react';
import { ArrowDown } from 'lucide-react';

interface AboutSectionProps {
  playBeep?: (freq?: number) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ playBeep = () => {} }) => {
  return (
    <section className="w-full bg-black border-t border-white/10 select-none overflow-hidden relative" id="section-about">
    </section>
  );
};
