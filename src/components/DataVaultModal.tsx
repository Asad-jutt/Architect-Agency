import React, { useState } from 'react';
import { X, ExternalLink, Code2, Layers, Cpu, Database, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  metrics: string;
  codeSnippet: string;
}

const PROJECTS: Project[] = [
  {
    id: 'nexus-os',
    title: 'NEXUS.OS',
    category: 'Spatial Web Engine',
    year: '2026',
    description: 'High-throughput WebGL spatial interface built for real-time telemetry rendering and zero-latency canvas operations.',
    tech: ['TypeScript', 'WebGL2', 'Vite', 'Tailwind CSS'],
    metrics: '60 FPS @ 4K // <2ms Input Latency',
    codeSnippet: `const spatialEngine = new SpatialPipeline({
  renderer: 'webgl2',
  antialiasing: false,
  brutalistGrid: true
});
spatialEngine.mount('#viewport');`,
  },
  {
    id: 'hyper-flow',
    title: 'HYPER_FLOW',
    category: 'Distributed Data Mesh',
    year: '2025',
    description: 'Autonomous state synchronization engine connecting edge node clusters with deterministic conflict resolution.',
    tech: ['Go', 'WebSockets', 'React 19', 'Express'],
    metrics: '1.2M Events/sec // 99.999% Availability',
    codeSnippet: `type DataMesh struct {
  Nodes map[string]*Node
  SyncLock sync.RWMutex
}
func (dm *DataMesh) BroadcastState(ctx Context) error { ... }`,
  },
  {
    id: 'kinetic-synth',
    title: 'KINETIC_SYNTH',
    category: 'Algorithmic Web Audio',
    year: '2025',
    description: 'Procedural sound synthesis engine for cybernetic UI feedback and generative minimalist ambient loops.',
    tech: ['Web Audio API', 'React 19', 'TypeScript'],
    metrics: '44.1kHz Oscillators // Low CPU Footprint',
    codeSnippet: `const ctx = new AudioContext();
const osc = ctx.createOscillator();
osc.type = 'sawtooth';
osc.frequency.setValueAtTime(440, ctx.currentTime);`,
  },
  {
    id: 'neural-vault',
    title: 'NEURAL_VAULT',
    category: 'Autonomous Knowledge AI',
    year: '2026',
    description: 'Hyper-indexed local-first vector search engine with server-side Gemini AI summarization pipelines.',
    tech: ['Gemini AI API', 'Node.js', 'Vector DB', 'Tailwind'],
    metrics: 'Sub-50ms Embeddings // Contextual Memory',
    codeSnippet: `import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({ ... });`,
  },
];

interface DataVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  playBeep: (freq?: number) => void;
}

export const DataVaultModal: React.FC<DataVaultModalProps> = ({
  isOpen,
  onClose,
  playBeep,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={() => {
        playBeep(300);
        onClose();
      }}
    >
      <div 
        className="bg-black border-2 border-white/30 hover:border-[#D4FF00] w-full max-w-4xl text-white font-mono-code brutalist-shadow-white overflow-hidden relative flex flex-col max-h-[90vh] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-white text-black px-4 py-3 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-2 font-bold text-sm tracking-wider">
            <Database className="w-4 h-4 text-black" />
            <span>DATA_VAULT // ARCHITECTURE_ARCHIVE</span>
          </div>
          <button
            onClick={() => {
              playBeep(300);
              onClose();
            }}
            className="p-2.5 hover:bg-black hover:text-white transition-colors border border-black font-bold text-xs"
            id="btn-close-vault-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Left: Project List */}
          <div className="lg:col-span-5 border-r border-white/20 p-4 space-y-3 overflow-y-auto max-h-[40vh] lg:max-h-full">
            <div className="text-xs text-white/40 uppercase tracking-widest pb-1 border-b border-white/10">
              SELECT_RECORD ({PROJECTS.length})
            </div>

            {PROJECTS.map((proj) => {
              const isSelected = selectedProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    playBeep(500);
                    setSelectedProject(proj);
                  }}
                  className={`p-3 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4FF00] text-black border-[#D4FF00] brutalist-shadow-black'
                      : 'border-white/10 hover:border-white/40 bg-white/5 text-white'
                  }`}
                  id={`vault-item-${proj.id}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm tracking-wide">{proj.title}</span>
                    <span className="text-xs opacity-75">{proj.year}</span>
                  </div>
                  <div className="text-xs opacity-80 truncate">{proj.category}</div>
                </div>
              );
            })}
          </div>

          {/* Right: Project Details & Code Viewer */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between overflow-y-auto space-y-6 bg-black">
            {selectedProject && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/20 pb-3">
                    <div>
                      <span className="text-xs text-[#D4FF00] uppercase tracking-widest block">
                        {selectedProject.category}
                      </span>
                      <h2 className="font-syne text-2xl font-extrabold text-white tracking-wide">
                        {selectedProject.title}
                      </h2>
                    </div>
                    <span className="px-3 py-1 bg-white/10 border border-white/20 text-xs text-white">
                      REV_{selectedProject.year}
                    </span>
                  </div>

                  <p className="font-geist text-sm text-white/80 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Performance Metric */}
                  <div className="p-3 bg-white/5 border border-white/10 text-xs flex items-center justify-between">
                    <span className="text-white/50">BENCHMARK:</span>
                    <span className="text-[#D4FF00] font-bold">{selectedProject.metrics}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="space-y-1.5">
                    <span className="text-xs text-white/50 block">TECH_STACK:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs border border-white/30 bg-black text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Snippet Inspector */}
                  <div className="space-y-1">
                    <span className="text-xs text-white/50 flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-[#D4FF00]" />
                      SYSTEM_ENTRY_POINT:
                    </span>
                    <pre className="p-3 bg-zinc-950 border border-white/20 text-xs text-[#D4FF00] overflow-x-auto leading-relaxed">
                      <code>{selectedProject.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      playBeep(800);
                      alert(`Accessing core architecture details for ${selectedProject.title}`);
                    }}
                    className="px-4 py-2 bg-[#D4FF00] text-black font-bold text-xs uppercase hover:bg-white transition-colors flex items-center gap-2 brutalist-shadow-black"
                  >
                    INSPECT_SOURCE
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
