// ─── Mission & Phase Data ───────────────────────────────────────────────────

export interface Phase {
  id: string;
  name: string;
  durationSeconds: number;
  instrument: string;
  instructions: string;
}

export interface Mission {
  id: string;
  name: string;
  subtitle: string;
  totalMinutes: number;
  phases: Phase[];
  color: 'amber' | 'emerald' | 'violet' | 'cyan';
}

export const MISSIONS: Mission[] = [
  {
    id: 'neo-soul',
    name: 'Neo-Soul Foundation',
    subtitle: 'Rhodes-led, pocket-first',
    totalMinutes: 40,
    color: 'amber',
    phases: [
      {
        id: 'ns-bed',
        name: 'The Bed',
        durationSeconds: 600,
        instrument: 'Rhodes + Bitwig',
        instructions: '4-bar progression. m9/13th chords only. No melody yet — just the harmonic shell.',
      },
      {
        id: 'ns-pulse',
        name: 'The Pulse',
        durationSeconds: 600,
        instrument: 'Digitakt',
        instructions: 'Kick & snare pattern. Absolutely no hi-hats. Lock to the pocket the Rhodes made.',
      },
      {
        id: 'ns-texture',
        name: 'The Texture',
        durationSeconds: 300,
        instrument: 'Mono Synth',
        instructions: 'Single note granulation in Bitwig. Pad behind the chords. Stay below the Rhodes.',
      },
      {
        id: 'ns-bridge',
        name: 'The Bridge',
        durationSeconds: 600,
        instrument: 'Rhodes',
        instructions: 'Write the B-section. Shift key up +5 semitones. Resolve tension back down.',
      },
      {
        id: 'ns-polish',
        name: 'The Polish',
        durationSeconds: 300,
        instrument: 'Digitakt + Mono Synth',
        instructions: 'One continuous live filter sweep pass. Commit the automation. No second takes.',
      },
    ],
  },
  {
    id: 'panda-bear',
    name: 'Panda Bear Echo-Chamber',
    subtitle: 'Texture over rhythm',
    totalMinutes: 60,
    color: 'emerald',
    phases: [
      {
        id: 'pb-skeleton',
        name: 'The Skeleton',
        durationSeconds: 900,
        instrument: 'Digitakt',
        instructions: 'Bare bones loop — kick, one chord stab, movement. Nothing else. Resist adding.',
      },
      {
        id: 'pb-blur',
        name: 'The Blur',
        durationSeconds: 900,
        instrument: 'Bitwig',
        instructions: 'Layer reverb and delay until the skeleton blurs into texture. 100% wet versions.',
      },
      {
        id: 'pb-vocal',
        name: 'Vocal Chops',
        durationSeconds: 900,
        instrument: 'Digitakt',
        instructions: 'Sample your own voice or hum. Chop it in Digitakt. No clean pitches — only texture.',
      },
      {
        id: 'pb-subtract',
        name: 'Subtraction',
        durationSeconds: 900,
        instrument: 'All',
        instructions: 'Remove elements until it hurts. Export what remains. Less is the arrangement.',
      },
    ],
  },
  {
    id: 'indietronica',
    name: 'Indietronica Groove',
    subtitle: 'Drum machine meets organic',
    totalMinutes: 45,
    color: 'violet',
    phases: [
      {
        id: 'ig-beat',
        name: 'The Beat',
        durationSeconds: 600,
        instrument: 'Digitakt',
        instructions: 'Build a groove with swing. Program sidechain from kick. Keep it danceable.',
      },
      {
        id: 'ig-hook',
        name: 'The Hook',
        durationSeconds: 600,
        instrument: 'Rhodes',
        instructions: 'One riff, max 4 notes. Repeat it until it sounds inevitable. Then stop.',
      },
      {
        id: 'ig-bass',
        name: 'The Bass',
        durationSeconds: 600,
        instrument: 'Mono Synth',
        instructions: 'Sidechain bass to kick. Keep it simple — root and fifth only this phase.',
      },
      {
        id: 'ig-atmosphere',
        name: 'The Atmosphere',
        durationSeconds: 600,
        instrument: 'Bitwig',
        instructions: 'One atmospheric pad, pitched to key. Automate filter cutoff over 8 bars.',
      },
      {
        id: 'ig-structure',
        name: 'The Structure',
        durationSeconds: 300,
        instrument: 'Bitwig',
        instructions: 'Arrange: intro / verse / drop / outro. Drag clips. 4 minutes minimum length.',
      },
    ],
  },
  {
    id: 'shoegaze',
    name: 'Shoegaze Wall',
    subtitle: 'Everything is reverb',
    totalMinutes: 50,
    color: 'cyan',
    phases: [
      {
        id: 'sg-drone',
        name: 'The Drone',
        durationSeconds: 600,
        instrument: 'Rhodes + Bitwig',
        instructions: 'Sustain a single chord through heavy reverb and pitch modulation. No changes.',
      },
      {
        id: 'sg-rhythm',
        name: 'The Rhythm',
        durationSeconds: 600,
        instrument: 'Digitakt',
        instructions: 'Drum pattern buried in reverb. Loose timing. Velocity variation minimum 40%.',
      },
      {
        id: 'sg-melody',
        name: 'The Melody',
        durationSeconds: 600,
        instrument: 'Mono Synth',
        instructions: 'Slow lead over the drone. Play like you are underwater. Lots of bend.',
      },
      {
        id: 'sg-noise',
        name: 'The Noise',
        durationSeconds: 600,
        instrument: 'Bitwig',
        instructions: 'Layer noise generators modulated by the kick gate. Distortion welcome.',
      },
      {
        id: 'sg-collapse',
        name: 'The Collapse',
        durationSeconds: 600,
        instrument: 'All',
        instructions: 'Gradually reduce everything to just the drone fading out. Let it die slowly.',
      },
    ],
  },
];
