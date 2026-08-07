import React from 'react';
import { PROJECTS_LIST, ProjectData } from '../../data/projectsData';
import { WebGLSlider, WebGLSliderSlide } from '../ui/WebGLSlider';

interface WorksPageProps {
  onSelectProject?: (slug: string) => void;
  playBeep?: (freq?: number) => void;
  projects?: ProjectData[];
}

const toSlide = (project: ProjectData): WebGLSliderSlide => ({
  id: project.id,
  slug: project.slug,
  number: project.number,
  title: project.title,
  subtitle: project.subtitle,
  category: project.category,
  year: project.year,
  accentColor: project.accentColor,
  imageUrl: project.imageUrl,
});

export const WorksPage: React.FC<WorksPageProps> = ({
  onSelectProject,
  playBeep,
  projects,
}) => {
  const projectsList = projects && projects.length > 0 ? projects : PROJECTS_LIST;
  const slides = projectsList.map(toSlide);

  const handleSelectProject = (slug: string) => {
    if (onSelectProject) {
      onSelectProject(slug);
      return;
    }
    window.location.href = `/projects/${slug}`;
  };

  return (
    <div className="w-full h-full bg-black text-white font-mono-code select-none overflow-hidden relative">
      <WebGLSlider
        slides={slides}
        onSelectProject={handleSelectProject}
        playBeep={playBeep}
      />
    </div>
  );
};
