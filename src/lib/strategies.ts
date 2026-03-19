// ─── Oblique Strategies ─────────────────────────────────────────────────────
// Tailored for hardware producers (Rhodes, Digitakt, Mono Synth, Bitwig)

export const STRATEGIES: string[] = [
  // From the spec
  'Shift MIDI 20ms late.',
  'Shells only (1, 3, 7).',
  'Reverse steps 4 & 8.',
  'Mute the Kick. The Rhodes is the percussion now.',

  // Harmonic constraints
  'Play only the root and the 7th. Nothing else.',
  'Move everything up a minor third. Commit.',
  'Invert the chord voicing — top note to bass, bass to top.',
  'Play only one chord for the next 4 bars. Make it interesting.',
  'Substitute a sus2 for every major chord.',
  'Remove the 3rd from every chord.',

  // Rhythmic constraints
  'Add a triplet to every bar. One. Just one.',
  'Shift the snare by exactly one 16th note late.',
  'Remove the downbeat kick. Push the groove.',
  'Double the tempo. Then halve it back. Keep the changes you liked.',
  'Stop quantizing. Play it loose.',
  'Lock everything to the 8th note grid — no exceptions.',
  'Swap the kick and snare roles for this phase.',

  // Texture / production constraints
  'Automate one filter cutoff across 8 bars. Commit the automation.',
  'Add reverb until it sounds wrong. Reduce by 20%. Stop there.',
  'Remove the highest-frequency element from the mix.',
  'Run everything through a bitcrusher at 12-bit for one pass.',
  'Duplicate a loop, pitch it down an octave, hide it at -18dB.',
  'Solo the drums only. Listen for 30 seconds. Then decide what to remove.',
  'Place a single sample backwards under the groove.',

  // Arrangement / workflow constraints
  'Record one live take. Use the first take. Do not punch in.',
  'Delete the last thing you added. Continue.',
  'Stop listening. Play without monitoring for 60 seconds.',
  'Export a rough mix now. Listen back before continuing.',
  'Hand the Digitakt pattern to the metronome — turn off swing.',
  'Only add silence. No new sounds in this phase.',
  'Act as if this is your final version. Mix accordingly.',
  'What is the loudest element? Mute it.',
  'Close your eyes. Play three notes. Keep the best one.',
  'Tune everything down a semitone. Instantly darker.',
];

export function getRandomStrategy(): string {
  return STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)];
}
