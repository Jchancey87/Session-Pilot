'use client';

import { useState, useEffect } from 'react';
import { useSessionStore } from '@/lib/store';
import { getSessions, deleteSession, SessionRecord } from '@/lib/storage';
import { Search, Trash2, ChevronDown, ChevronUp, Home, Clock, Music } from 'lucide-react';

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function SessionArchive() {
  const goHome = useSessionStore((s) => s.goHome);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  const handleDelete = (id: string) => {
    deleteSession(id);
    setSessions(getSessions());
    if (expanded === id) setExpanded(null);
  };

  const filtered = sessions.filter(
    (s) =>
      s.projectName.toLowerCase().includes(query.toLowerCase()) ||
      s.missionName.toLowerCase().includes(query.toLowerCase())
  );

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

      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
        <input
          id="archive-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by project name or mission..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-3.5
            text-white placeholder:text-zinc-700 focus:outline-none focus:border-amber-500
            focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
        />
      </div>

      {/* Sessions */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📼</p>
          <p className="text-zinc-500 text-sm">
            {sessions.length === 0 ? 'No sessions saved yet. Complete a mission to begin logging.' : 'No sessions match your search.'}
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
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-medium truncate">{session.projectName}</span>
                    <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                      {session.phasesCompleted}/{session.totalPhases} phases
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-600">
                    <span className="flex items-center gap-1">
                      <Music size={10} />
                      {session.missionName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {formatDuration(session.duration)}
                    </span>
                    <span>{formatDate(session.date)}</span>
                  </div>
                </div>
                <div className="ml-3 text-zinc-600">
                  {expanded === session.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Expanded detail */}
              {expanded === session.id && (
                <div className="px-5 pb-5 border-t border-zinc-800 mt-0">
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
                    <div className="flex justify-end pt-2">
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
