// ─── Audio Utilities ─────────────────────────────────────────────────────────

/**
 * Play a synthesised chime using the Web Audio API.
 * No audio files required — works on all browsers including iPad Safari.
 */
export function playTransitionChime(): void {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 — major triad
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.8);

      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.85);
    });

    // Close context after all notes finish
    setTimeout(() => ctx.close(), 2000);
  } catch {
    // Silently fail — non-critical feature
  }
}
