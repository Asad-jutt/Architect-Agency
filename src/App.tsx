import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectCardsSection } from './components/ProjectCardsSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { Component as SilkBackground } from './components/ui/silk-background-animation';
import { playBeep as triggerBeep } from './utils/audio';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playBeep = (freq?: number) => {
    triggerBeep(freq, 0.05, soundEnabled);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative font-geist selection:bg-[#C6FF00] selection:text-black flex flex-col justify-between overflow-x-hidden">
      {/* Silk Background Animation */}
      <SilkBackground isBackgroundOnly={true} />

      {/* Background Subtle Cybernetic Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `radial-[#C6FF00] 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        {/* Navigation Header */}
        <Navbar
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          playBeep={playBeep}
        />

        {/* Hero Section */}
        <main className="flex-1 flex flex-col">
          <HeroSection
            playBeep={playBeep}
          />

          {/* Horizontal Scroll Track / Project Cards Section Below Hero */}
          <ProjectCardsSection
            playBeep={playBeep}
          />

          {/* New Process Section */}
          <ProcessSection
            playBeep={playBeep}
          />

          {/* About Section Below Process Section */}
          <AboutSection playBeep={playBeep} />
        </main>
      </div>
    </div>
  );
}

