export interface ProjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'WEBFLOW' | 'EXPERIMENTAL' | 'COMMERCIAL' | 'RESEARCH';
  badge1: string;
  badge2: string;
  year: string;
  client: string;
  accentColor: string;
  imageUrl: string;
  galleryImages: string[];
  description: string;
  fullOverview: string;
  challenge: string;
  solution: string;
  techSpecs: {
    framework: string;
    styling: string;
    animations: string;
    performanceScore: string;
    hosting: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  liveUrl?: string;
}

export const PROJECTS_LIST: ProjectData[] = [
  {
    id: 'project-void',
    number: '01',
    title: 'PROJECT VOID',
    subtitle: 'Monochromatic Spatial Architecture',
    category: 'WEBFLOW',
    badge1: 'WEBFLOW',
    badge2: '2024',
    year: '2024',
    client: 'KINETIC SPACES LAB',
    accentColor: '#C6FF00',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Monochromatic spatial brutalist web design exploring negative space, raw concrete grids, and reactive typography.',
    fullOverview: 'Project Void is a boundary-pushing digital portfolio built for an avant-garde architectural collective. Designed with high contrast, raw brutalist layout grids, and interactive canvas overlays, it presents physical concrete structures through a liquid web browser medium.',
    challenge: 'Translating heavy architectural materials—raw concrete, steel beams, and shadows—into an ultra-fast, responsive web interface without compromising page load speeds or mobile frame rates.',
    solution: 'Engineered custom WebGL shaders for fluid shadow maps, combined with lightweight Webflow CMS integrations and GSAP timeline scrubbers for seamless section transitions.',
    techSpecs: {
      framework: 'Webflow Enterprise + GSAP',
      styling: 'Custom Brutalist CSS Grid',
      animations: 'WebGL Liquid Displacement Shaders',
      performanceScore: '99/100 Lighthouse Mobile',
      hosting: 'AWS CloudFront Edge CDN',
    },
    metrics: [
      { label: 'PAGE LOAD SPEED', value: '0.4s' },
      { label: 'LIGHTHOUSE SCORE', value: '99/100' },
      { label: 'USER RETENTION', value: '+340%' },
      { label: 'CONVERSION RATE', value: '14.2%' },
    ],
    liveUrl: 'https://architect.exe',
  },
  {
    id: 'system-core',
    number: '02',
    title: 'SYSTEM CORE',
    subtitle: 'High-Frequency Cybernetic Telemetry',
    category: 'EXPERIMENTAL',
    badge1: 'EXPERIMENTAL',
    badge2: '2025',
    year: '2025',
    client: 'NEXUS CYBERNETICS',
    accentColor: '#FF007F',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Real-time telemetry monitoring dashboard with low-latency data streams, cybernetic logs, and spatial HUD controls.',
    fullOverview: 'System Core provides real-time visualization of distributed edge compute nodes. Designed for mission-critical infrastructure teams, it converts raw server telemetry into an intuitive, high-density dark-mode dashboard.',
    challenge: 'Handling thousands of concurrent WebSocket data updates per second without causing UI thread locks or frame drops in browser renderers.',
    solution: 'Utilized OffscreenCanvas rendering workers alongside virtualized list viewports to maintain steady 60 FPS performance during high-throughput network spikes.',
    techSpecs: {
      framework: 'React + TypeScript + WebSockets',
      styling: 'Tailwind CSS + HUD Grid',
      animations: 'OffscreenCanvas Worker Shaders',
      performanceScore: '100/100 Mobile & Desktop',
      hosting: 'Google Cloud Run Container',
    },
    metrics: [
      { label: 'THROUGHPUT CAP', value: '100k msg/s' },
      { label: 'CANVAS RENDER FPS', value: '60.0 FPS' },
      { label: 'NETWORK LATENCY', value: '12ms' },
      { label: 'SYSTEM UPTIME', value: '99.999%' },
    ],
    liveUrl: 'https://architect.exe',
  },
  {
    id: 'liquid-metal',
    number: '03',
    title: 'LIQUID METAL',
    subtitle: 'Generative Fluid Dynamics Simulation',
    category: 'COMMERCIAL',
    badge1: 'COMMERCIAL',
    badge2: '2026',
    year: '2026',
    client: 'AURA CREATIVE STUDIO',
    accentColor: '#00FFFF',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Bespoke WebGL fluid dynamics engine powering interactive luxury product showcases and digital fashion runaways.',
    fullOverview: 'Liquid Metal was commissioned for an international luxury brand launching their virtual flagship store. Users interact with organic metallic surfaces that respond to cursor movement and touch physics in real-time.',
    challenge: 'Achieving photorealistic metallic reflections and fluid viscosity physics in web browsers across diverse mobile hardware GPUs.',
    solution: 'Custom GLSL fragment shaders leveraging HDR environment maps, screen-space reflections, and dynamic texture resolution scaling based on device capabilities.',
    techSpecs: {
      framework: 'Three.js + GLSL + WebGL 2.0',
      styling: 'Minimalist Dark Interface',
      animations: 'Navier-Stokes Fluid Solvers',
      performanceScore: '98/100 Lighthouse',
      hosting: 'Vite Production Edge Bundle',
    },
    metrics: [
      { label: 'VISITOR ENGAGEMENT', value: '+420%' },
      { label: 'AVERAGE DWELL TIME', value: '4m 18s' },
      { label: 'AWARDS WON', value: '3x Awwwards' },
      { label: 'MOBILE RENDER RATE', value: '60 FPS' },
    ],
    liveUrl: 'https://architect.exe',
  },
  {
    id: 'neural-grid',
    number: '04',
    title: 'NEURAL GRID',
    subtitle: 'Autonomous Knowledge Graph Agent Interface',
    category: 'RESEARCH',
    badge1: 'RESEARCH',
    badge2: '2026',
    year: '2026',
    client: 'SYNAPSE AI LABS',
    accentColor: '#FFFFFF',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Spatial 3D graph visualization and neural synthesis interface empowering multi-agent research exploration.',
    fullOverview: 'Neural Grid is a visual command workspace designed for enterprise AI researchers. It connects complex vector embeddings into an interactive 3D node network, letting users trace reasoning pathways visually.',
    challenge: 'Rendering 50,000+ interconnected graph nodes in browser space without lagging user interactions or memory leaks.',
    solution: 'Implemented instanced mesh rendering in WebGL combined with force-directed physics layouts executed on GPU compute passes.',
    techSpecs: {
      framework: 'React + WebGL + D3 Force',
      styling: 'Cybernetic Monospace HUD',
      animations: 'GPU Instanced Mesh Motion',
      performanceScore: '99/100 Mobile & Desktop',
      hosting: 'Cloud Run Enterprise Node',
    },
    metrics: [
      { label: 'NODES RENDERED', value: '50,000+' },
      { label: 'QUERY SPEED', value: '8ms' },
      { label: 'RESEARCH TIME SAVED', value: '65%' },
      { label: 'ACCURACY SCORE', value: '99.4%' },
    ],
    liveUrl: 'https://architect.exe',
  },
];
