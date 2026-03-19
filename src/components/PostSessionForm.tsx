'use client';

import { useState } from 'react';
import { useSessionStore } from '@/lib/store';
import { saveSession, SessionRecord } from '@/lib/storage';
import { Save, Archive } from 'lucide-react';

export function PostSessionForm() {
  const pendingSession = useSessionStore((s) => s.pendingSession)();
  const goToArchive = useSessionStore((s) => s.goToArchive);
  const goHome = useSessionStore((s) => s.goHome);

  const [digitaktPattern, setDigitaktPattern] = useState('');
  const [rhodesSettings, setRhodesSettings] = useState('');
  const [synthPatch, setSynthPatch] = useState('');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const session: SessionRecord = {
      ...(pendingSession as SessionRecord),
      digitaktPattern,
      rhodesSettings,
      synthPatch,
      notes,
    };
    saveSession(session);
    setSaved(true);
    setTimeout(() => goToArchive(), 1200);
  };

  const durationMin = Math.floor((pendingSession.duration ?? 0) / 60);

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-4">
          <span className="text-3xl">🎹</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-1">Session Complete</h2>
        <p className="text-zinc-500 text-sm">
          {pendingSession.missionName} · {pendingSession.phasesCompleted}/{pendingSession.totalPhases} phases ·{' '}
          {durationMin}m elapsed
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-zinc-400 tracking-widest uppercase mb-2">
            Digitakt Pattern #
          </label>
          <input
            id="digitakt-pattern"
            type="text"
            value={digitaktPattern}
            onChange={(e) => setDigitaktPattern(e.target.value)}
            placeholder="e.g. Bank A, Pattern 1"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white font-mono
              placeholder:text-zinc-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-400 tracking-widest uppercase mb-2">
            Rhodes Settings
          </label>
          <input
            id="rhodes-settings"
            type="text"
            value={rhodesSettings}
            onChange={(e) => setRhodesSettings(e.target.value)}
            placeholder="e.g. Treble 6, Bass 4, Vibe off"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white font-mono
              placeholder:text-zinc-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-400 tracking-widest uppercase mb-2">
            Synth Patch
          </label>
          <input
            id="synth-patch"
            type="text"
            value={synthPatch}
            onChange={(e) => setSynthPatch(e.target.value)}
            placeholder="e.g. Moog: Init + LFO mod wheel"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white font-mono
              placeholder:text-zinc-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-400 tracking-widest uppercase mb-2">
            Session Notes
          </label>
          <textarea
            id="session-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What worked? What to revisit next time?"
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white
              placeholder:text-zinc-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50
              transition-all resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            id="save-session-btn"
            onClick={handleSave}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base
              transition-all duration-300 active:scale-95
              ${saved
                ? 'bg-emerald-500 text-black'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/25'
              }`}
          >
            <Save size={18} />
            {saved ? 'SAVED ✓' : 'SAVE TO ARCHIVE'}
          </button>

          <button
            onClick={goHome}
            className="px-6 py-4 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-500
              hover:text-zinc-300 transition-all active:scale-95 text-sm"
          >
            Skip
          </button>
        </div>

        <button
          onClick={goToArchive}
          className="w-full flex items-center justify-center gap-2 py-3 text-zinc-600 hover:text-zinc-400
            text-sm transition-colors"
        >
          <Archive size={14} />
          View Archive
        </button>
      </div>
    </div>
  );
}
