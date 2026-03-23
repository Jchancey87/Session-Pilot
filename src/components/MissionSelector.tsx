'use client';

import { useState, useEffect } from 'react';
import { MISSIONS, type Mission } from '@/lib/missions';
import { useSessionStore } from '@/lib/store';
import { Clock, Zap, Music, Shuffle, Dices } from 'lucide-react';
import { generateDailyMissions } from '@/lib/generator';

const COLOR_MAP = {
  amber: {
    border: 'border-sonic-tertiary/40 hover:border-sonic-tertiary',
    glow: 'hover:shadow-sonic-tertiary/20',
    badge: 'bg-sonic-tertiary/20 text-sonic-tertiary',
    icon: 'text-sonic-tertiary',
    title: 'group-hover:text-sonic-tertiary',
  },
  emerald: {
    border: 'border-sonic-primary/40 hover:border-sonic-primary',
    glow: 'hover:shadow-sonic-primary/20',
    badge: 'bg-sonic-primary/20 text-sonic-primary',
    icon: 'text-sonic-primary',
    title: 'group-hover:text-sonic-primary',
  },
  violet: {
    border: 'border-sonic-secondary/40 hover:border-sonic-secondary',
    glow: 'hover:shadow-sonic-secondary/20',
    badge: 'bg-sonic-secondary/20 text-sonic-secondary',
    icon: 'text-sonic-secondary',
    title: 'group-hover:text-sonic-secondary',
  },
  cyan: {
    border: 'border-sonic-primary/40 hover:border-sonic-primary',
    glow: 'hover:shadow-sonic-primary/20',
    badge: 'bg-sonic-primary/20 text-sonic-primary',
    icon: 'text-sonic-primary',
    title: 'group-hover:text-sonic-primary',
  },
};

type DurationFilter = 'all' | 'short' | 'medium' | 'long';

function matchesDuration(totalMinutes: number, filter: DurationFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'short') return totalMinutes < 40;
  if (filter === 'medium') return totalMinutes >= 40 && totalMinutes <= 50;
  if (filter === 'long') return totalMinutes > 50;
  return true;
}

export function MissionSelector() {
  const selectMission = useSessionStore((s) => s.selectMission);
  const goToArchive = useSessionStore((s) => s.goToArchive);
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  
  const [dailyMissions, setDailyMissions] = useState<Mission[]>([]);
  const [showClassics, setShowClassics] = useState(false);

  // Generate 4 randomized daily missions on mount
  useEffect(() => {
    setDailyMissions(generateDailyMissions());
  }, []);

  const activeMissions = showClassics ? MISSIONS : dailyMissions;
  const filteredMissions = activeMissions.filter((m) => matchesDuration(m.totalMinutes, durationFilter));

  const handleSurpriseMe = () => {
    if (filteredMissions.length === 0) return;
    const mission = filteredMissions[Math.floor(Math.random() * filteredMissions.length)];
    selectMission(mission);
  };

  const handleReroll = () => {
    setDailyMissions(generateDailyMissions());
  };

  const filterButtons: { label: string; value: DurationFilter }[] = [
    { label: 'All', value: 'all' },
    { label: '< 40m', value: 'short' },
    { label: '40–50m', value: 'medium' },
    { label: '50m+', value: 'long' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sonic-primary/30 bg-sonic-primary/10 text-sonic-primary text-xs tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-sonic-primary animate-pulse" />
          SESSION PILOT v1.0
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-3">
          SELECT MISSION
        </h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase">
          {showClassics ? 'Classic Session Structures' : 'Daily Generated Missions'}
        </p>
      </div>

      {/* Filter bar + Action Buttons */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        {/* Duration filter pills */}
        <div className="flex items-center gap-2">
          {filterButtons.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setDurationFilter(value)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
                durationFilter === value
                  ? 'bg-sonic-primary text-sonic-neutral'
                  : 'border border-zinc-700 text-zinc-500 hover:border-sonic-secondary hover:text-zinc-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {!showClassics && (
            <button
              id="reroll-btn"
              onClick={handleReroll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700
                hover:border-sonic-primary/60 text-zinc-500 hover:text-sonic-primary
                transition-all active:scale-95 text-xs tracking-widest uppercase"
            >
              <Dices size={13} />
              Re-roll
            </button>
          )}

          <button
            id="surprise-me-btn"
            onClick={handleSurpriseMe}
            disabled={filteredMissions.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700
              hover:border-sonic-primary/60 text-zinc-500 hover:text-sonic-primary
              transition-all active:scale-95 text-xs tracking-widest uppercase
              disabled:opacity-30 disabled:pointer-events-none"
          >
            <Shuffle size={13} />
            Surprise Me
          </button>
        </div>
      </div>

      {/* Mission cards grid */}
      {filteredMissions.length === 0 ? (
        <div className="text-center py-16 text-zinc-600 text-sm">
          No missions in this duration range.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMissions.map((mission) => {
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
                <p className="text-zinc-500 text-sm mb-5">
                  {showClassics ? mission.subtitle : `${mission.phases.length}-Phase Sequence`}
                </p>

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

                {/* Go Arrow */}
                <div className={`absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity ${c.icon}`}>
                  <Zap size={16} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Footer Links (Toggle Classics & Archive) */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <button
          onClick={() => setShowClassics(!showClassics)}
          className="text-zinc-500 hover:text-sonic-primary text-xs tracking-widest uppercase transition-colors"
        >
          {showClassics ? '← BACK TO DAILY MISSIONS' : 'VIEW ALL CLASSICS →'}
        </button>

        <button
          onClick={goToArchive}
          className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest uppercase transition-colors"
        >
          VIEW SESSION ARCHIVE →
        </button>
      </div>
    </div>
  );
}
