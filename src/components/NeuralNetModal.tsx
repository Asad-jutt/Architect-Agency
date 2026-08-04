import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal, CornerDownLeft, Sparkles, Send } from 'lucide-react';

interface CommandOutput {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

interface NeuralNetModalProps {
  isOpen: boolean;
  onClose: () => void;
  playBeep: (freq?: number) => void;
}

export const NeuralNetModal: React.FC<NeuralNetModalProps> = ({
  isOpen,
  onClose,
  playBeep,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'boot-1',
      type: 'system',
      text: 'ARCHITECT.EXE [Version 4.01.89] - NEURAL_NET CONSOLE INITIALIZED.',
    },
    {
      id: 'boot-2',
      type: 'system',
      text: 'Type "help" to list available system commands, or type a custom query.',
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    playBeep(750);

    const newHistory: CommandOutput[] = [
      ...history,
      { id: Date.now() + '-in', type: 'input', text: `$ ${cmdStr}` },
    ];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help       - Display command manual
  status     - Query real-time system state
  skills     - List core technical capabilities & stack
  projects   - Show Data Vault architecture records
  contact    - Retrieve direct transmission endpoints
  clear      - Purge terminal buffer`,
        });
        break;

      case 'status':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          text: `[SYSTEM DIAGNOSTIC REPORT]
  - Core Status: OPERATIONAL (100%)
  - Latency: 12ms (Asia-SE Edge)
  - Memory Footprint: 48.2 MB
  - UI Architecture: React 19 + Tailwind v4 + Syne Brutalist Type
  - Security Sandbox: ISOLATED & ENCRYPTED`,
        });
        break;

      case 'skills':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          text: `TECHNICAL STACK & CAPABILITIES:
  [UI/UX]       React 19, TypeScript, Tailwind CSS, Vite, WebGL
  [BACKEND]     Node.js, Express, Go, REST APIs, WebSockets
  [AI/ML]       Gemini AI SDK (@google/genai), Neural Prompt Engineering
  [BRUTALISM]   Pixel-perfect layout, high-contrast typography, zero clutter`,
        });
        break;

      case 'projects':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          text: `ACTIVE RECORDS IN DATA VAULT:
  1. NEXUS.OS       [Spatial Web Engine]
  2. HYPER_FLOW     [Distributed Data Mesh]
  3. KINETIC_SYNTH  [Algorithmic Web Audio]
  4. NEURAL_VAULT   [Autonomous Knowledge AI]`,
        });
        break;

      case 'contact':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          text: `DIRECT TRANSMISSION CHANNELS:
  Email: webflowgeek8@gmail.com
  GitHub: github.com/architect-exe
  Location: Asia-Southeast / Global Remote`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          text: `Exec: Executing query "${cmdStr}"...\n[AI NEURAL RESPONSE]: Command acknowledged. System architecture optimized for maximum throughput. Type "help" for structured commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer"
      onClick={() => {
        playBeep(300);
        onClose();
      }}
    >
      <div 
        className="bg-black border-2 border-[#D4FF00] w-full max-w-3xl text-white font-mono-code brutalist-shadow-green overflow-hidden relative flex flex-col h-[80vh] max-h-[700px] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#D4FF00] text-black px-4 py-3 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-2 font-bold text-sm tracking-wider">
            <Terminal className="w-4 h-4 text-black" />
            <span>NEURAL_NET // INTERACTIVE_CLI_CONSOLE</span>
          </div>
          <button
            onClick={() => {
              playBeep(300);
              onClose();
            }}
            className="p-1 hover:bg-black hover:text-[#D4FF00] transition-colors border border-black font-bold text-xs"
            id="btn-close-neural-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Command Suggestions */}
        <div className="bg-zinc-950 p-2 border-b border-white/20 flex flex-wrap gap-2 text-xs">
          <span className="text-white/40 self-center px-2">SUGGESTIONS:</span>
          {['help', 'status', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="px-2.5 py-1 bg-white/5 border border-white/20 hover:border-[#D4FF00] hover:text-[#D4FF00] transition-colors text-white/90"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-black text-xs leading-relaxed font-mono-code">
          {history.map((item) => (
            <div key={item.id} className="whitespace-pre-wrap">
              {item.type === 'input' && (
                <div className="text-[#D4FF00] font-bold">{item.text}</div>
              )}
              {item.type === 'system' && (
                <div className="text-white/60">{item.text}</div>
              )}
              {item.type === 'output' && (
                <div className="text-white/90 pl-3 border-l-2 border-white/20 my-1">
                  {item.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Line Input */}
        <form
          onSubmit={handleSubmit}
          className="p-3 bg-zinc-950 border-t border-white/20 flex items-center gap-2"
        >
          <span className="text-[#D4FF00] font-bold text-sm select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command or prompt..."
            className="flex-1 bg-transparent text-white font-mono-code text-sm outline-none placeholder:text-white/30"
            id="neural-cli-input"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#D4FF00] text-black font-bold text-xs uppercase hover:bg-white transition-colors flex items-center gap-1 brutalist-shadow-black"
          >
            EXEC <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
