'use client';

import { useState } from 'react';
import { useSessionStore } from '@/lib/store';
import { ChevronLeft, Play } from 'lucide-react';

export function PreSessionForm() {
  const selectedMission = useSessionStore((s) => s.selectedMission);
  const projectName = useSessionStore((s) => s.projectName);
  const setProjectName = useSessionStore((s) => s.setProjectName);
  const startSession = useSessionStore((s) => s.startSession);
  const goHome = useSessionStore((s) => s.goHome);

  const [error, setError] = useState('');

  const handleStart = () => {
    if (!projectName.trim()) {
      setError('Enter a Bitwig project name to continue.');
      return;
    }
    startSession();
  };

  if (!selectedMission) return null;

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <button
        onClick={goHome}
        className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-300 text-sm mb-10 transition-colors"
      >
        <ChevronLeft size={14} /> Back to missions
      </button>

      {/* Mission badge */}
      <div className="mb-8">
        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Selected Mission</p>
        <h2 className="text-3xl font-bold text-white">{selectedMission.name}</h2>
        <p className="text-zinc-500 text-sm mt-1">
          {selectedMission.totalMinutes} min · {selectedMission.phases.length} phases
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="project-name"
            className="block text-xs text-zinc-400 tracking-widest uppercase mb-3"
          >
            Bitwig Project Name
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
            placeholder="e.g. NeoSoul_001.bwproject"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 text-white font-mono
              placeholder:text-zinc-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50
              transition-all text-lg"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>

        {/* Phase preview */}
        <div className="border border-zinc-800 rounded-xl p-4">
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3">Session Plan</p>
          <div className="space-y-2">
            {selectedMission.phases.map((phase, i) => (
              <div key={phase.id} className="flex items-center gap-3 text-sm">
                <span className="text-amber-500 font-mono text-xs w-4">{i + 1}</span>
                <span className="text-zinc-300">{phase.name}</span>
                <span className="text-zinc-600 text-xs ml-auto">{phase.instrument}</span>
                <span className="text-amber-500/70 font-mono text-xs">
                  {Math.floor(phase.durationSeconds / 60)}m
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          id="start-session-btn"
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400
            text-black font-bold text-lg py-5 rounded-2xl transition-all duration-200 active:scale-[0.98]
            shadow-lg shadow-amber-500/25"
        >
          <Play size={20} fill="black" />
          START SESSION
        </button>
      </div>
    </div>
  );
}
