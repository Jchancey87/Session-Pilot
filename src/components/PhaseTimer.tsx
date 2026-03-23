'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useSessionStore } from '@/lib/store';
import { playTransitionChime } from '@/lib/audio';
import { SkipForward, Pause, Play, StopCircle } from 'lucide-react';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ── Mission color → class mappings ───────────────────────────────────────────
const COLOR_MAP = {
  amber: {
    timer: 'text-sonic-tertiary',
    timerGlow: '',
    phaseName: 'text-sonic-tertiary',
    progressBar: 'bg-sonic-tertiary',
    overallBar: 'bg-sonic-tertiary/40',
    dot: 'bg-sonic-tertiary',
    ambientRing: 'ambient-amber',
  },
  emerald: {
    timer: 'text-sonic-primary',
    timerGlow: '',
    phaseName: 'text-sonic-primary',
    progressBar: 'bg-sonic-primary',
    overallBar: 'bg-sonic-primary/40',
    dot: 'bg-sonic-primary',
    ambientRing: 'ambient-emerald',
  },
  violet: {
    timer: 'text-sonic-secondary',
    timerGlow: '',
    phaseName: 'text-sonic-secondary',
    progressBar: 'bg-sonic-secondary',
    overallBar: 'bg-sonic-secondary/40',
    dot: 'bg-sonic-secondary',
    ambientRing: 'ambient-violet',
  },
  cyan: {
    timer: 'text-sonic-primary',
    timerGlow: '',
    phaseName: 'text-sonic-primary',
    progressBar: 'bg-sonic-primary',
    overallBar: 'bg-sonic-primary/40',
    dot: 'bg-sonic-primary',
    ambientRing: 'ambient-cyan',
  },
};

export function PhaseTimer() {
  const selectedMission = useSessionStore((s) => s.selectedMission);
  const currentPhaseIndex = useSessionStore((s) => s.currentPhaseIndex);
  const timeRemaining = useSessionStore((s) => s.timeRemaining);
  const isRunning = useSessionStore((s) => s.isRunning);
  const tickTimer = useSessionStore((s) => s.tickTimer);
  const advancePhase = useSessionStore((s) => s.advancePhase);
  const pauseTimer = useSessionStore((s) => s.pauseTimer);
  const resumeTimer = useSessionStore((s) => s.resumeTimer);
  const endSession = useSessionStore((s) => s.endSession);
  const currentPhase = useSessionStore((s) => s.currentPhase)();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const prevTimeRef = useRef<number>(timeRemaining);

  // ── Wake Lock ─────────────────────────────────────────────────────────────
  const requestWakeLock = useCallback(async () => {
    if ('wakeLock' in navigator) {
      try {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      } catch {
        // Non-critical — silently ignore
      }
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    wakeLockRef.current?.release();
    wakeLockRef.current = null;
  }, []);

  useEffect(() => {
    requestWakeLock();
    return () => releaseWakeLock();
  }, [requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') requestWakeLock();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [requestWakeLock]);

  // ── Countdown interval ────────────────────────────────────────────────────
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

  // ── Auto-advance when time hits 0 ─────────────────────────────────────────
  useEffect(() => {
    if (prevTimeRef.current > 0 && timeRemaining === 0) {
      playTransitionChime();
      advancePhase();
    }
    prevTimeRef.current = timeRemaining;
  }, [timeRemaining, advancePhase]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        isRunning ? pauseTimer() : resumeTimer();
      } else if (e.code === 'KeyS') {
        e.preventDefault();
        playTransitionChime();
        advancePhase();
      } else if (e.code === 'KeyE') {
        e.preventDefault();
        endSession();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isRunning, pauseTimer, resumeTimer, advancePhase, endSession]);

  if (!selectedMission || !currentPhase) return null;

  const c = COLOR_MAP[selectedMission.color];
  const totalPhases = selectedMission.phases.length;
  const phaseDuration = currentPhase.durationSeconds;
  const elapsed = phaseDuration - timeRemaining;
  const progress = Math.min(elapsed / phaseDuration, 1);

  const totalSeconds = selectedMission.phases.reduce((a, p) => a + p.durationSeconds, 0);
  const completedSeconds = selectedMission.phases
    .slice(0, currentPhaseIndex)
    .reduce((a, p) => a + p.durationSeconds, 0);
  const overallProgress = (completedSeconds + elapsed) / totalSeconds;

  const isLowTime = timeRemaining <= 60 && timeRemaining > 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Mission name */}
      <div className="text-center mb-2">
        <p className="text-zinc-600 text-xs tracking-widest uppercase">{selectedMission.name}</p>
      </div>

      {/* Overall progress dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {selectedMission.phases.map((phase, i) => (
          <div key={phase.id} className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i < currentPhaseIndex
                  ? `${c.dot} opacity-50`
                  : i === currentPhaseIndex
                  ? `${c.dot} scale-125`
                  : 'bg-zinc-700'
              }`}
            />
          </div>
        ))}
        <span className="text-zinc-600 text-xs font-mono ml-2">
          {currentPhaseIndex + 1}/{totalPhases}
        </span>
      </div>

      {/* Phase name */}
      <div className="text-center mb-2">
        <h2 className={`text-2xl font-bold tracking-wider ${c.phaseName}`}>
          {currentPhase.name}
        </h2>
        <p className="text-zinc-500 text-sm">{currentPhase.instrument}</p>
      </div>

      {/* Main timer + ambient ring */}
      <div className="relative text-center my-8">
        {/* Ambient breathing ring */}
        <div
          className={`ambient-ring ${c.ambientRing}`}
          style={{ width: '320px', height: '320px' }}
        />

        <div
          className={`relative text-8xl md:text-9xl font-bold font-mono tracking-tight transition-colors duration-300 ${
            isLowTime
              ? 'text-red-400 animate-pulse'
              : timeRemaining === 0
              ? 'text-emerald-400'
              : c.timer
          }`}
        >
          {formatTime(timeRemaining)}
        </div>
      </div>

      {/* Phase progress bar */}
      <div className="mb-2">
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${c.progressBar} rounded-full transition-all duration-1000`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-8">
        <div className="h-0.5 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className={`h-full ${c.overallBar} rounded-full transition-all duration-1000`}
            style={{ width: `${overallProgress * 100}%` }}
          />
        </div>
        <p className="text-zinc-700 text-xs text-right mt-1 font-mono">
          {Math.round(overallProgress * 100)}% complete
        </p>
      </div>

      {/* Instructions card */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 mb-8">
        <p className="text-zinc-300 text-base leading-relaxed">{currentPhase.instructions}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          id="pause-resume-btn"
          onClick={isRunning ? pauseTimer : resumeTimer}
          className="flex items-center gap-2 px-6 py-4 rounded-xl border border-zinc-700 hover:border-sonic-primary
            text-zinc-300 hover:text-white transition-all active:scale-95 text-sm"
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          {isRunning ? 'Pause' : 'Resume'}
        </button>

        <button
          id="skip-phase-btn"
          onClick={() => { playTransitionChime(); advancePhase(); }}
          className={`flex items-center gap-2 px-6 py-4 rounded-xl border border-opacity-40
            transition-all active:scale-95 text-sm
            border-zinc-600 hover:border-sonic-secondary text-zinc-400 hover:text-white`}
        >
          <SkipForward size={16} />
          Skip Phase
        </button>

        <button
          id="end-session-btn"
          onClick={endSession}
          className="flex items-center gap-2 px-6 py-4 rounded-xl border border-zinc-800 hover:border-red-900
            text-zinc-600 hover:text-red-400 transition-all active:scale-95 text-sm"
        >
          <StopCircle size={16} />
          End
        </button>
      </div>
    </div>
  );
}
