'use client';

import { useState, useEffect } from 'react';
import { useSessionStore } from '@/lib/store';
import { SessionRecord } from '@/lib/storage';
import {
  Search, Trash2, ChevronDown, ChevronUp,
  Home, Clock, Music, RotateCcw, Star, Zap, Loader2
} from 'lucide-react';

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function MiniStars({ rating }: { rating?: number }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={10}
          className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}
        />
      ))}
    </div>
  );
}

export function SessionArchive() {
  const goHome = useSessionStore((s) => s.goHome);
  const replayMission = useSessionStore((s) => s.replayMission);
  const sessions = useSessionStore((s) => s.sessions);
  const isLoading = useSessionStore((s) => s.isLoading);
  const fetchSessions = useSessionStore((s) => s.fetchSessions);
  const removeSession = useSessionStore((s) => s.removeSession);

  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleDelete = async (id: string) => {
    await removeSession(id);
    if (expanded === id) setExpanded(null);
  };

  const filtered = sessions.filter((s) => {
    const matchesQuery =
      s.projectName.toLowerCase().includes(query.toLowerCase()) ||
      s.missionName.toLowerCase().includes(query.toLowerCase());
    const matchesFav = favoritesOnly ? !!s.isFavorite : true;
    return matchesQuery && matchesFav;
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Studio Archive</h2>
          <p className="text-zinc-600 text-sm">{sessions.length} session{sessions.length !== 1 ? 's' : ''} logged</p>
        </div>
        <button
          onClick={goHome}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500
            text-zinc-500 hover:text-white transition-all text-sm"
        >
          <Home size={14} />
          Home
        </button>
      </div>

      {/* Search + Favorites filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input
            id="archive-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by project or mission..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-3.5
              text-white placeholder:text-zinc-700 focus:outline-none focus:border-amber-500
              focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
          />
        </div>
        <button
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className={`flex items-center gap-2 px-4 rounded-xl border text-sm transition-all shrink-0 ${
            favoritesOnly
              ? 'border-amber-500 bg-amber-500/15 text-amber-400'
              : 'border-zinc-700 hover:border-zinc-500 text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Zap size={14} className={favoritesOnly ? 'fill-amber-400' : ''} />
          Fire
        </button>
      </div>

      {/* Sessions */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-amber-500" size={32} />
          <p className="text-zinc-500 text-sm font-mono tracking-widest">LOADING ARCHIVE...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📼</p>
          <p className="text-zinc-500 text-sm">
            {sessions.length === 0
              ? 'No sessions saved yet. Complete a mission to begin logging.'
              : favoritesOnly
              ? 'No fire sessions yet. Mark a session as 🔥 after completing it.'
              : 'No sessions match your search.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((session) => (
            <div
              key={session.id}
              className="border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-colors bg-zinc-900/40"
            >
              {/* Session header */}
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-900/60 transition-colors"
                onClick={() => setExpanded(expanded === session.id ? null : session.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-white font-medium truncate">{session.projectName}</span>
                    <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                      {session.phasesCompleted}/{session.totalPhases} phases
                    </span>
                    {session.moodEmoji && (
                      <span className="text-base leading-none">{session.moodEmoji}</span>
                    )}
                    {session.isFavorite && (
                      <span className="text-xs">🔥</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-600 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Music size={10} />
                      {session.missionName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {formatDuration(session.duration)}
                    </span>
                    <span>{formatDate(session.date)}</span>
                    <MiniStars rating={session.energyRating} />
                  </div>
                </div>
                <div className="ml-3 text-zinc-600">
                  {expanded === session.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Expanded detail */}
              {expanded === session.id && (
                <div className="px-5 pb-5 border-t border-zinc-800">
                  <div className="grid grid-cols-1 gap-3 pt-4">
                    {session.digitaktPattern && (
                      <div>
                        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Digitakt Pattern</p>
                        <p className="text-zinc-300 font-mono text-sm">{session.digitaktPattern}</p>
                      </div>
                    )}
                    {session.rhodesSettings && (
                      <div>
                        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Rhodes Settings</p>
                        <p className="text-zinc-300 font-mono text-sm">{session.rhodesSettings}</p>
                      </div>
                    )}
                    {session.synthPatch && (
                      <div>
                        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Synth Patch</p>
                        <p className="text-zinc-300 font-mono text-sm">{session.synthPatch}</p>
                      </div>
                    )}
                    {session.notes && (
                      <div>
                        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Notes</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">{session.notes}</p>
                      </div>
                    )}
                    {session.chaosStrategiesUsed && session.chaosStrategiesUsed.length > 0 && (
                      <div>
                        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">
                          Oblique Strategies · {session.chaosStrategiesUsed.length}
                        </p>
                        <ul className="space-y-1">
                          {session.chaosStrategiesUsed.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                              <span className="text-amber-500/50 font-mono shrink-0">{i + 1}.</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action row */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => replayMission(session.missionId)}
                        className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors text-xs"
                      >
                        <RotateCcw size={12} />
                        Replay Mission
                      </button>
                      <button
                        onClick={() => handleDelete(session.id)}
                        className="flex items-center gap-1.5 text-zinc-700 hover:text-red-400 transition-colors text-xs"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New session */}
      <div className="text-center mt-8">
        <button
          onClick={goHome}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm
            transition-all active:scale-95"
        >
          + NEW SESSION
        </button>
      </div>
    </div>
  );
}
