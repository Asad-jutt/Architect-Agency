import React, { useState, useEffect } from 'react';
import { X, Activity, Cpu, Server, Wifi, ShieldCheck, RefreshCw } from 'lucide-react';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  playBeep: (freq?: number) => void;
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({
  isOpen,
  onClose,
  playBeep,
}) => {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(48.2);
  const [uptime, setUptime] = useState(99.99);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setFps(58 + Math.floor(Math.random() * 3));
      setMemory(+(48.0 + Math.random() * 0.8).toFixed(1));
    }, 1500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={() => {
        playBeep(300);
        onClose();
      }}
    >
      <div 
        className="bg-black border-2 border-[#D4FF00] w-full max-w-2xl text-white font-mono-code brutalist-shadow-green overflow-hidden relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#D4FF00] text-black px-4 py-3 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-2 font-bold text-sm tracking-wider">
            <Activity className="w-4 h-4 animate-spin text-black" />
            <span>SYSTEM_STATUS // DIAGNOSTICS_PANEL</span>
          </div>
          <button
            onClick={() => {
              playBeep(300);
              onClose();
            }}
            className="p-1 hover:bg-black hover:text-[#D4FF00] transition-colors border border-black font-bold text-xs"
            id="btn-close-status-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Status Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="border border-white/20 p-3 bg-white/5 flex flex-col">
              <span className="text-xs text-white/50">RENDER_FPS</span>
              <span className="text-xl font-bold text-[#D4FF00]">{fps} FPS</span>
            </div>
            <div className="border border-white/20 p-3 bg-white/5 flex flex-col">
              <span className="text-xs text-white/50">HEAP_MEMORY</span>
              <span className="text-xl font-bold text-white">{memory} MB</span>
            </div>
            <div className="border border-white/20 p-3 bg-white/5 flex flex-col">
              <span className="text-xs text-white/50">NODE_UPTIME</span>
              <span className="text-xl font-bold text-[#D4FF00]">{uptime}%</span>
            </div>
            <div className="border border-white/20 p-3 bg-white/5 flex flex-col">
              <span className="text-xs text-white/50">SECURITY</span>
              <span className="text-xl font-bold text-white flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#D4FF00]" />
                LOCKED
              </span>
            </div>
          </div>

          {/* System Environment Matrix */}
          <div className="border border-white/20 p-4 space-y-3">
            <h3 className="text-xs text-[#D4FF00] uppercase tracking-wider font-bold flex items-center gap-2">
              <Server className="w-4 h-4" />
              ENVIRONMENT_SPECIFICATION
            </h3>
            <div className="space-y-2 text-xs text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>RUNTIME:</span>
                <span className="text-white font-bold">Vite 6 + React 19 + TypeScript</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>STYLE_ENGINE:</span>
                <span className="text-white font-bold">Tailwind CSS v4 (Pure Utility)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>TYPOGRAPHY:</span>
                <span className="text-white font-bold">Syne + JetBrains Mono + Geist</span>
              </div>
              <div className="flex justify-between">
                <span>CANVAS_RENDERER:</span>
                <span className="text-[#D4FF00] font-bold">GPU Accelerated // HTML5</span>
              </div>
            </div>
          </div>

          {/* Architecture Log Stream */}
          <div className="bg-black/90 border border-white/20 p-4 font-mono-code text-xs space-y-1.5">
            <div className="text-white/40">// REAL-TIME EVENT STREAM</div>
            <div className="text-[#D4FF00]">[00:00:01] Brutalist core initialized successfully.</div>
            <div className="text-white/80">[00:00:02] Loading Syne display typography & vector nodes...</div>
            <div className="text-white/80">[00:00:03] Audio synthesizer connected to Web Audio API.</div>
            <div className="text-[#D4FF00]">[STATUS] All services operational with zero overhead.</div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/5 border-t border-white/20 flex justify-between items-center text-xs">
          <span className="text-white/50">HOST: CLOUD_RUN // REGION: ASIA-SE</span>
          <button
            onClick={() => {
              playBeep(400);
              onClose();
            }}
            className="px-4 py-2 bg-[#D4FF00] text-black font-bold uppercase hover:bg-white transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
