import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LogoStripSection } from './components/LogoStripSection';
import { ProjectCardsSection } from './components/ProjectCardsSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TeamSection } from './components/TeamSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/ui/habit-faq-scroller';
import { Footer } from './components/ui/modem-animated-footer';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { WorksPage } from './pages/WorksPage';
import { playBeep as triggerBeep } from './utils/audio';
import { useGsapLenis } from './hooks/useGsapLenis';

export default function App() {
  useGsapLenis();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'works' | 'project-detail'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('project-void');

  const playBeep = (freq?: number) => {
    triggerBeep(freq, 0.05, soundEnabled);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWorksPage = () => {
    setCurrentView('works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative font-geist selection:bg-[#C6FF00] selection:text-black flex flex-col justify-between overflow-x-clip">
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
          currentView={currentView}
          onNavigateHome={handleNavigateHome}
          onOpenWorksPage={handleOpenWorksPage}
          playBeep={playBeep}
        />

        {/* Dynamic Route View Rendering */}
        <main className="flex-1 flex flex-col">
          {currentView === 'home' && (
            <>
              <HeroSection playBeep={playBeep} />
              <LogoStripSection playBeep={playBeep} />
              <ProjectCardsSection
                playBeep={playBeep}
                onSelectProject={handleSelectProject}
                onOpenWorksPage={handleOpenWorksPage}
              />
              <ProcessSection playBeep={playBeep} />
              <TestimonialsSection playBeep={playBeep} />
              <AboutSection playBeep={playBeep} />
              <TeamSection playBeep={playBeep} />
              <FaqSection />
            </>
          )}

          {currentView === 'works' && (
            <WorksPage
              onSelectProject={handleSelectProject}
              onNavigateHome={handleNavigateHome}
              playBeep={playBeep}
            />
          )}

          {currentView === 'project-detail' && (
            <ProjectDetailPage
              projectId={selectedProjectId}
              onNavigateBack={() => setCurrentView('works')}
              onSelectProject={handleSelectProject}
              playBeep={playBeep}
            />
          )}

          {/* Animated Modem Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
