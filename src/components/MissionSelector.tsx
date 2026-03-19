'use client';

import { MISSIONS } from '@/lib/missions';
import { useSessionStore } from '@/lib/store';
import { Clock, Zap, Music } from 'lucide-react';

const COLOR_MAP = {
  amber: {
    border: 'border-amber-500/40 hover:border-amber-500',
    glow: 'hover:shadow-amber-500/20',
    badge: 'bg-amber-500/20 text-amber-400',
    icon: 'text-amber-500',
    title: 'group-hover:text-amber-400',
  },
  emerald: {
    border: 'border-emerald-500/40 hover:border-emerald-500',
    glow: 'hover:shadow-emerald-500/20',
    badge: 'bg-emerald-500/20 text-emerald-400',
    icon: 'text-emerald-500',
    title: 'group-hover:text-emerald-400',
  },
  violet: {
    border: 'border-violet-500/40 hover:border-violet-500',
    glow: 'hover:shadow-violet-500/20',
    badge: 'bg-violet-500/20 text-violet-400',
    icon: 'text-violet-500',
    title: 'group-hover:text-violet-400',
  },
  cyan: {
    border: 'border-cyan-500/40 hover:border-cyan-500',
    glow: 'hover:shadow-cyan-500/20',
    badge: 'bg-cyan-500/20 text-cyan-400',
    icon: 'text-cyan-500',
    title: 'group-hover:text-cyan-400',
  },
};

export function MissionSelector() {
  const selectMission = useSessionStore((s) => s.selectMission);
  const goToArchive = useSessionStore((s) => s.goToArchive);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          SESSION PILOT v1.0
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-3">
          SELECT MISSION
        </h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase">
          Choose your session structure
        </p>
      </div>

      {/* Mission cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MISSIONS.map((mission) => {
          const c = COLOR_MAP[mission.color];
          return (
            <button
              key={mission.id}
              id={`mission-${mission.id}`}
              onClick={() => selectMission(mission)}
              className={`group relative text-left p-6 rounded-2xl border bg-zinc-900/60 backdrop-blur transition-all duration-300
                ${c.border} ${c.glow}
                hover:shadow-2xl hover:bg-zinc-900/90 active:scale-[0.98]`}
            >
              {/* Duration badge */}
              <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${c.badge} mb-4`}>
                <Clock size={10} />
                {mission.totalMinutes} min
              </span>

              <h2 className={`text-xl font-bold text-white mb-1 transition-colors duration-200 ${c.title}`}>
                {mission.name}
              </h2>
              <p className="text-zinc-500 text-sm mb-5">{mission.subtitle}</p>

              {/* Phase list */}
              <div className="space-y-1.5">
                {mission.phases.map((phase, i) => (
                  <div key={phase.id} className="flex items-center gap-3 text-xs">
                    <span className="text-zinc-600 font-mono w-4">{i + 1}</span>
                    <span className="text-zinc-400">{phase.name}</span>
                    <span className="ml-auto text-zinc-600 font-mono">
                      {Math.floor(phase.durationSeconds / 60)}m
                    </span>
                  </div>
                ))}
              </div>

              {/* Instrument row */}
              <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center gap-2">
                <Music size={12} className={c.icon} />
                <span className="text-zinc-600 text-xs">
                  {[...new Set(mission.phases.map((p) => p.instrument.split(' ')[0]))].join(' · ')}
                </span>
              </div>

              {/* Arrow */}
              <div className={`absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity ${c.icon}`}>
                <Zap size={16} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Archive link */}
      <div className="text-center mt-8">
        <button
          onClick={goToArchive}
          className="text-zinc-600 hover:text-zinc-400 text-sm tracking-widest uppercase transition-colors"
        >
          VIEW SESSION ARCHIVE →
        </button>
      </div>
    </div>
  );
}
