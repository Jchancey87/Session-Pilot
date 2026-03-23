'use client';

import { useState } from 'react';
import { useSessionStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Play, X } from 'lucide-react';

export function PreSessionForm() {
  const router = useRouter();
  const selectedMission = useSessionStore((s) => s.selectedMission);
  const projectName = useSessionStore((s) => s.projectName);
  const setProjectName = useSessionStore((s) => s.setProjectName);
  const startSession = useSessionStore((s) => s.startSession);
  const goHome = useSessionStore((s) => s.goHome);
  const screen = useSessionStore((s) => s.screen);

  const [error, setError] = useState('');

  const handleStart = () => {
    if (!projectName.trim()) {
      setError('Enter a project name to continue.');
      return;
    }
    startSession();
    router.push('/app/workspace');
  };

  if (screen !== 'PRE_SESSION' || !selectedMission) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]/90 backdrop-blur-xl p-6">
      <div className="w-full max-w-2xl bg-[#121212] border border-zinc-800 rounded-3xl p-10 relative shadow-2xl overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-sonic-primary/10 blur-[100px] pointer-events-none" />

        <button 
          onClick={goHome} 
          className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h4 className="text-[10px] text-sonic-primary font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sonic-primary" />
          SESSION INITIALIZATION
        </h4>

        <h2 className="text-4xl font-bold text-white mb-2">{selectedMission.name}</h2>
        <p className="text-zinc-400 text-sm mb-12 max-w-md leading-relaxed">
          {selectedMission.description || selectedMission.subtitle}
        </p>

        <div className="space-y-8">
          <div>
            <label htmlFor="project-name" className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-4">
              Project Identifier
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder="e.g. NeoSoul_Track_01"
              className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-6 py-5 text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-sonic-primary focus:ring-1 focus:ring-sonic-primary/50 transition-all text-lg shadow-inner"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </div>

          <div className="flex gap-6 pt-4">
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-5 flex-1">
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">DURATION</p>
              <p className="text-xl font-bold text-white">{selectedMission.totalMinutes} min</p>
            </div>
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-5 flex-1">
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">PHASES</p>
              <p className="text-xl font-bold text-white">{selectedMission.phases.length} Stages</p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 bg-sonic-primary hover:bg-sonic-primary/80 text-black font-bold text-lg py-5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] mt-8"
          >
            <Play size={20} className="fill-black" />
            INITIALIZE WORKSPACE
          </button>
        </div>

      </div>
    </div>
  );

}
