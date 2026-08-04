import React from 'react';
import TextLoop from './ui/TextLoop';

interface LogoStripSectionProps {
  playBeep?: (freq?: number) => void;
}

export const LogoStripSection: React.FC<LogoStripSectionProps> = () => {
  return (
    <section 
      className="w-full bg-black text-white border-t border-b border-white/10 relative py-8 sm:py-12 select-none overflow-hidden" 
      id="section-text-loop"
    >
      {/* Background Subtle Cyber Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#C6FF00 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Dynamic React Bits TextLoop Wave Ribbon */}
      <div className="w-full overflow-hidden relative">
        <TextLoop
          text="ARCHITECT.EXE ✦ HIGH-PERFORMANCE WEBFLOW ✦ UNHINGED CREATIVITY ✦ LIQUID ANIMATIONS ✦ CYBERNETIC UI ✦ 3D INTERACTION"
          shape="wave"
          speed={85}
          direction="forward"
          separator="✦"
          curviness={65}
          fontSize={34}
          fontWeight={900}
          letterSpacing={3}
          uppercase={true}
          color="#000000"
          ribbon={true}
          ribbonColor="#C6FF00"
          ribbonWidth={78}
          pauseOnHover={true}
        />
      </div>
    </section>
  );
};

