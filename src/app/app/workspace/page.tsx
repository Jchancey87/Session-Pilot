'use client';

import { useEffect, useRef, useState } from 'react';
import { useSessionStore } from '@/lib/store';
import { Play, Pause, RotateCcw, ArrowRight, Layers, Ban, Waves, Zap, Volume2, Mic, Clock } from 'lucide-react';
import { PostSessionForm } from '@/components/PostSessionForm';
import { ChaosOverlay } from '@/components/ChaosOverlay';

const ICON_MAP = {
  Layers,
  Ban,
  Waves,
  Zap,
  Volume2,
  Mic,
  Clock
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function Workspace() {
  const selectedMission = useSessionStore((s) => s.selectedMission);
  const currentPhaseIndex = useSessionStore((s) => s.currentPhaseIndex);
  const timeRemaining = useSessionStore((s) => s.timeRemaining);
  const isRunning = useSessionStore((s) => s.isRunning);
  const tickTimer = useSessionStore((s) => s.tickTimer);
  const advancePhase = useSessionStore((s) => s.advancePhase);
  const pauseTimer = useSessionStore((s) => s.pauseTimer);
  const resumeTimer = useSessionStore((s) => s.resumeTimer);
  const currentPhase = useSessionStore((s) => s.currentPhase)();
  const screen = useSessionStore((s) => s.screen);
  const triggerChaos = useSessionStore((s) => s.triggerChaos);
  const startNextPhase = useSessionStore((s) => s.startNextPhase);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Note: The system-level hotkeys and WakeLock logic from the legacy 
  // PhaseTimer could be added here in a cleanup phase. We focus on UI first.
  
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => tickTimer(), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, tickTimer]);

  if (!selectedMission || !currentPhase) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Active Mission</h2>
          <p className="text-zinc-500 mb-6">Select a mission from the dashboard to begin.</p>
          <a href="/app/missions" className="px-6 py-3 bg-sonic-primary text-black font-semibold rounded hover:bg-sonic-primary/80 transition-colors">
            Go to Missions
          </a>
        </div>
      </div>
    );
  }

  if (screen === 'PHASE_TRANSITION') {
    const nextPhase = selectedMission.phases[currentPhaseIndex + 1];
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
        <div className="text-center max-w-md p-12 bg-[#121212] border border-sonic-primary/20 rounded-3xl shadow-[0_0_50px_rgba(0,245,255,0.1)]">
          <div className="w-16 h-16 bg-sonic-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <RotateCcw className="text-sonic-primary animate-spin-slow" size={32} />
          </div>
          <h2 className="text-[10px] tracking-[0.4em] text-sonic-primary uppercase mb-2">Phase Complete</h2>
          <h3 className="text-3xl font-bold text-white mb-6 uppercase italic">Ready for {nextPhase.name}?</h3>
          
          <div className="text-left bg-[#0A0A0A] p-6 rounded-2xl mb-8 border border-zinc-900">
             <h4 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-2">UPCOMING GOAL:</h4>
             <p className="text-sm text-zinc-300 italic mb-4">"{nextPhase.instructions}"</p>
             <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-600 font-mono uppercase">NEXT INSTRUMENT:</span>
                <span className="text-[10px] text-sonic-primary font-mono uppercase px-2 py-0.5 bg-sonic-primary/10 rounded border border-sonic-primary/20">
                  {nextPhase.instrument}
                </span>
             </div>
          </div>

          <button 
            onClick={startNextPhase}
            className="w-full py-4 bg-sonic-primary hover:bg-sonic-primary/80 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all flex items-center justify-center gap-3 group"
          >
            START NEXT PHASE
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'POST_SESSION') {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
        <PostSessionForm />
      </div>
    );
  }

  const phaseDuration = currentPhase.durationSeconds;
  const elapsed = phaseDuration - timeRemaining;
  const progress = Math.min(elapsed / phaseDuration, 1);

  // Circular Timer SVG Mathematics
  const radius = 180;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  // Progress goes from circumference to 0
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[calc(100vh-80px)]">
      
      {/* ── Chaos Overlay ── */}
      <ChaosOverlay />

      {/* ── Left Column: Constraints ── */}
      <div className="lg:col-span-3 pt-8">
        <h4 className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sonic-primary/50" />
          CURRENT MISSION
        </h4>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">{selectedMission.name}</h1>
        <p className="text-sm text-zinc-400 leading-relaxed mb-12">
          {selectedMission.description || selectedMission.subtitle}
        </p>
 
        <h4 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-6">CONSTRAINTS</h4>
        <div className="space-y-6">
          {(selectedMission.constraints || [
            { text: 'Use only 3 tracks', icon: 'Layers' },
            { text: 'No samples allowed', icon: 'Ban' },
            { text: 'Sine waves only', icon: 'Waves' }
          ]).map((c, i) => {
            const Icon = ICON_MAP[c.icon as keyof typeof ICON_MAP] || Layers;
            return (
              <div key={i} className="flex items-start gap-4">
                <Icon className="text-sonic-primary mt-0.5 shrink-0" size={18} />
                <span className="text-sm font-medium">{c.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Center Column: Timer ── */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center">
        
        {/* Breadcrumb Stepper */}
        <div className="flex items-center gap-3 mb-10 w-full max-w-[400px]">
          {selectedMission.phases.map((p, i) => (
            <div 
              key={p.id} 
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentPhaseIndex 
                  ? 'flex-[3] bg-sonic-primary shadow-[0_0_10px_rgba(0,245,255,0.5)]' 
                  : i < currentPhaseIndex 
                    ? 'flex-[1] bg-sonic-primary/30' 
                    : 'flex-[1] bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Phase Header */}
        <div className="text-center mb-8">
          <div className="text-[10px] tracking-[0.3em] font-mono text-zinc-500 mb-2 uppercase">
            EST. {Math.round(currentPhase.durationSeconds / 60)}m PRACTICE • {currentPhase.instrument}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase italic">
            {currentPhase.name}
          </h2>
        </div>

        {/* Timer UI wrapper */}
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center bg-[#101010] rounded-3xl shadow-2xl border border-zinc-900/50">
          
          <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 400 400">
            {/* Background Track */}
            <circle
              cx="200"
              cy="200"
              r={radius}
              fill="transparent"
              stroke="#1A1A1A"
              strokeWidth={strokeWidth}
            />
            {/* Progress Stroke */}
            <circle
              cx="200"
              cy="200"
              r={radius}
              fill="transparent"
              stroke="#00F5FF"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="drop-shadow-[0_0_12px_rgba(0,245,255,0.6)] transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[120px] font-light tracking-tighter text-sonic-primary leading-none" style={{ textShadow: '0 0 40px rgba(0,245,255,0.2)' }}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-[10px] tracking-[0.3em] font-mono text-zinc-500 mt-4 uppercase">
              REMAINING
            </div>
          </div>
        </div>

        <div className="mt-12 w-full max-w-[500px] p-8 bg-[#121212] border border-zinc-900 rounded-2xl relative overflow-hidden group">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sonic-primary/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-sonic-primary/10 transition-colors" />

          <h4 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-4 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-sonic-primary" />
            CURRENT INSTRUCTIONS
          </h4>
          <p className="text-base text-zinc-200 leading-relaxed italic mb-6">
            "{currentPhase.instructions}"
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-600 font-mono uppercase shrink-0">TARGET INSTRUMENT:</span>
              <span className="text-[10px] text-sonic-primary font-mono uppercase px-2 py-0.5 bg-sonic-primary/10 rounded border border-sonic-primary/20">
                {currentPhase.instrument}
              </span>
            </div>

            {/* Pro Tip Section */}
            <div className="pt-4 border-t border-zinc-900/50">
              <div className="flex items-start gap-3">
                <Zap size={14} className="text-sonic-tertiary mt-0.5 shrink-0" />
                <div>
                  <h5 className="text-[10px] text-sonic-tertiary tracking-widest uppercase mb-1 font-bold">PRO TIP</h5>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {currentPhase.instrument.toLowerCase().includes('digitakt') && "Try micro-timing your percussion hits (~15% late) to create a lazy, human feel."}
                    {currentPhase.instrument.toLowerCase().includes('rhodes') && "Add a slow LFO to your tremolo to prevent the sound from feeling static over long phases."}
                    {currentPhase.instrument.toLowerCase().includes('synth') && "Layer a subtle white noise generator with a high-pass filter to add 'air' to your lead."}
                    {currentPhase.instrument.toLowerCase().includes('bitwig') && "Resample your master tail occasionally and use it as a textural wash for the next phase."}
                    {!['digitakt', 'rhodes', 'synth', 'bitwig'].some(i => currentPhase.instrument.toLowerCase().includes(i)) && "Reserve the 200Hz-400Hz range for your core instruments; keep this layer clean."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-12">
          <button 
            onClick={() => isRunning ? pauseTimer() : resumeTimer()}
            className="w-14 h-14 rounded-xl border border-zinc-800 flex items-center justify-center hover:border-zinc-600 hover:bg-[#1A1A1A] transition-all"
          >
            {isRunning ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
          </button>
          
          <button 
            onClick={advancePhase}
            className="px-8 py-4 bg-sonic-primary hover:bg-sonic-primary/80 text-black font-semibold rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all flex items-center gap-2"
          >
            {currentPhaseIndex < selectedMission.phases.length - 1 ? 'Next Phase' : 'Complete Mission'}
          </button>

          <button 
            onClick={() => triggerChaos()}
            className="w-14 h-14 rounded-xl border border-zinc-800 flex items-center justify-center hover:border-sonic-secondary/50 hover:bg-sonic-secondary/10 group transition-all"
            title="Trigger Chaos"
          >
            <Zap size={20} className="text-zinc-500 group-hover:text-sonic-secondary transition-colors" />
          </button>
        </div>
      </div>

      {/* ── Right Column: Resources ── */}
      <div className="lg:col-span-3 pt-8">
        <h4 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-6">RESOURCES</h4>
        <div className="space-y-4 mb-12">
          {(selectedMission.resources || [
            { title: 'Sound Synthesis', description: 'Advanced sine-wave layering techniques for ambient textures.' },
            { title: 'The Art of Silence', description: 'Understanding the rhythmic value of negative space in audio.' }
          ]).map((r, i) => (
            <a key={i} href={r.url || '#'} className="block p-5 bg-[#121212] border border-zinc-800 hover:border-sonic-secondary rounded-xl transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-sonic-primary text-sm">{r.title}</h5>
                <ArrowRight size={14} className="text-zinc-600 group-hover:text-sonic-primary transition-colors" />
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {r.description}
              </p>
            </a>
          ))}
        </div>

        <h4 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-6">NOTES</h4>
        <div className="w-full h-32 bg-[#121212] border border-zinc-800/50 rounded-xl p-4">
          <textarea 
            className="w-full h-full bg-transparent resize-none outline-none text-sm text-zinc-400 placeholder:text-zinc-700" 
            placeholder="Record session insights..."
          />
        </div>
      </div>

    </div>
  );
}
