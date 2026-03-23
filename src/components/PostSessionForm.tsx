'use client';

import { useState } from 'react';
import { useSessionStore } from '@/lib/store';
import { saveSession, SessionRecord } from '@/lib/storage';
import { Save, Archive, Star, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MOOD_EMOJIS = ['⚡', '🔥', '💤', '🌀', '🎯'];

export function PostSessionForm() {
  const router = useRouter();
  const pendingSession = useSessionStore((s) => s.pendingSession)();
  const capturedChaosStrategies = useSessionStore((s) => s.capturedChaosStrategies);
  const goToArchive = useSessionStore((s) => s.goToArchive);
  const goHome = useSessionStore((s) => s.goHome);

  const [digitaktPattern, setDigitaktPattern] = useState('');
  const [rhodesSettings, setRhodesSettings] = useState('');
  const [synthPatch, setSynthPatch] = useState('');
  const [notes, setNotes] = useState('');
  const [energyRating, setEnergyRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [moodEmoji, setMoodEmoji] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveCurrentSession = useSessionStore((s) => s.saveCurrentSession);

  const handleSave = async () => {
    await saveCurrentSession({
      digitaktPattern,
      rhodesSettings,
      synthPatch,
      notes,
      energyRating: energyRating || undefined,
      moodEmoji: moodEmoji || undefined,
      chaosStrategiesUsed: capturedChaosStrategies.length > 0 ? capturedChaosStrategies : undefined,
      isFavorite,
    });
    setSaved(true);
    setTimeout(() => {
      goToArchive();
      router.push('/app/tracker');
    }, 1200);
  };

  const durationMin = Math.floor((pendingSession.duration ?? 0) / 60);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sonic-primary/10 border border-sonic-primary/30 mb-6 shadow-[0_0_30px_rgba(0,245,255,0.15)] relative">
          <div className="absolute inset-0 rounded-full bg-sonic-primary/5 blur-md" />
          <span className="text-4xl relative z-10">🎹</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Session Complete</h2>
        <p className="text-zinc-500 text-sm">
          {pendingSession.missionName} · {pendingSession.phasesCompleted}/{pendingSession.totalPhases} phases ·{' '}
          {durationMin}m elapsed
        </p>
      </div>

      <div className="space-y-5">

        {/* ── Energy Rating ─────────────────────────────────────────────────── */}
        <div>
          <label className="block text-xs text-zinc-400 tracking-widest uppercase mb-3">
            Session Energy
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setEnergyRating(star === energyRating ? 0 : star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform active:scale-90"
              >
                <Star
                  size={28}
                  className={`transition-colors duration-200 ${
                    star <= (hoverRating || energyRating)
                      ? 'text-sonic-primary fill-sonic-primary drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]'
                      : 'text-zinc-800'
                  }`}
                />
              </button>
            ))}
            {energyRating > 0 && (
              <span className="text-zinc-500 text-xs ml-2 font-mono">
                {['', 'Rough', 'OK', 'Good', 'Great', 'On Fire'][energyRating]}
              </span>
            )}
          </div>
        </div>

        {/* ── Mood Emoji ────────────────────────────────────────────────────── */}
        <div>
          <label className="block text-xs text-zinc-400 tracking-widest uppercase mb-3">
            Session Vibe
          </label>
          <div className="flex items-center gap-3">
            {MOOD_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setMoodEmoji(emoji === moodEmoji ? '' : emoji)}
                className={`text-2xl w-14 h-14 rounded-2xl border transition-all active:scale-90 flex items-center justify-center ${
                  emoji === moodEmoji
                    ? 'border-sonic-primary bg-sonic-primary/10 scale-105 shadow-[0_0_15px_rgba(0,245,255,0.2)]'
                    : 'border-zinc-800 hover:border-zinc-600 bg-[#121212]'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* ── Mark as Fire ──────────────────────────────────────────────────── */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`flex items-center justify-center w-full gap-3 px-6 py-4 rounded-xl border transition-all active:scale-[0.98] ${
            isFavorite
              ? 'border-sonic-secondary bg-sonic-secondary/10 text-sonic-secondary shadow-[0_0_15px_rgba(113,201,206,0.15)]'
              : 'border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-white bg-[#121212]'
          }`}
        >
          <Zap size={18} className={isFavorite ? 'fill-sonic-secondary' : ''} />
          <span className="text-sm font-bold tracking-wide">
            {isFavorite ? 'MARKED AS FIRE 🔥' : 'MARK AS FIRE 🔥'}
          </span>
        </button>

        {capturedChaosStrategies.length > 0 && (
          <div className="border border-sonic-primary/30 rounded-xl p-5 bg-sonic-primary/5">
            <p className="text-sonic-primary text-[10px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sonic-primary animate-pulse" />
              Oblique Strategies Triggered · {capturedChaosStrategies.length}
            </p>
            <ul className="space-y-2 text-sm text-zinc-300">
              {capturedChaosStrategies.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-sonic-primary font-mono text-[10px] mt-1 opacity-70">0{i + 1}</span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Instrument gear notes ─────────────────────────────────────────── */}
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
            className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-4 text-white font-mono
              placeholder:text-zinc-600 focus:outline-none focus:border-sonic-primary focus:ring-1 focus:ring-sonic-primary/50 transition-all shadow-inner"
          />
        </div>

        <div>
          <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
            Rhodes Settings
          </label>
          <input
            id="rhodes-settings"
            type="text"
            value={rhodesSettings}
            onChange={(e) => setRhodesSettings(e.target.value)}
            placeholder="e.g. Treble 6, Bass 4, Vibe off"
            className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-4 text-white font-mono
              placeholder:text-zinc-600 focus:outline-none focus:border-sonic-primary focus:ring-1 focus:ring-sonic-primary/50 transition-all shadow-inner"
          />
        </div>

        <div>
          <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
            Synth Patch
          </label>
          <input
            id="synth-patch"
            type="text"
            value={synthPatch}
            onChange={(e) => setSynthPatch(e.target.value)}
            placeholder="e.g. Moog: Init + LFO mod wheel"
            className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-4 text-white font-mono
              placeholder:text-zinc-600 focus:outline-none focus:border-sonic-primary focus:ring-1 focus:ring-sonic-primary/50 transition-all shadow-inner"
          />
        </div>

        <div>
          <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
            Session Notes
          </label>
          <textarea
            id="session-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What worked? What to revisit next time?"
            rows={4}
            className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-4 text-white
              placeholder:text-zinc-600 focus:outline-none focus:border-sonic-primary focus:ring-1 focus:ring-sonic-primary/50
              transition-all resize-none shadow-inner"
          />
        </div>

        <div className="flex gap-4 pt-4 mb-8">
          <button
            id="save-session-btn"
            onClick={handleSave}
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-xl font-bold text-base
              transition-all duration-300 active:scale-[0.98]
              ${saved
                ? 'bg-sonic-secondary text-black shadow-[0_0_20px_rgba(113,201,206,0.3)]'
                : 'bg-sonic-primary hover:bg-sonic-primary/80 text-black shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]'
              }`}
          >
            <Save size={20} />
            {saved ? 'SESSION ARCHIVED ✓' : 'SAVE TO ARCHIVE'}
          </button>

          <button
            onClick={() => {
              goHome();
              router.push('/app/missions');
            }}
            className="px-8 py-5 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-400
              hover:text-white transition-all active:scale-[0.98] text-sm font-semibold bg-[#121212]"
          >
            DISCARD
          </button>
        </div>

      </div>
    </div>
  );
}
