import { Mission, Phase } from '@/lib/missions';
import {
  DIGITAKT_PHASES,
  RHODES_PHASES,
  SYNTH_PHASES,
  BITWIG_PHASES,
  WILDCARD_PHASES,
  PhaseTemplate,
} from '@/lib/phase-pools';

const COLORS = ['amber', 'emerald', 'violet', 'cyan'] as const;

/** Random utility: returns random int between min and max (inclusive) */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Random utility: returns random element from array */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Random utility: pick multiple distinct random elements */
function pickMultiple<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
}

const CONSTRAINTS: { text: string; icon: any }[] = [
  { text: 'Sine waves only', icon: 'Waves' },
  { text: 'No samples allowed', icon: 'Ban' },
  { text: 'Maximum 8 tracks', icon: 'Layers' },
  { text: 'Volume automation only', icon: 'Volume2' },
  { text: 'BPM must remain fixed', icon: 'Clock' },
  { text: 'Analog-only effects', icon: 'Zap' },
  { text: 'One-shot percussion only', icon: 'Mic' },
  { text: 'No reverb allowed', icon: 'Ban' },
  { text: '100% dry signals only', icon: 'Volume2' },
  { text: 'Mono-compatible mix', icon: 'Layers' }
];

const RESOURCES = [
  { title: 'Subtractive Arranging', description: 'The power of removing elements to create flow.' },
  { title: 'Harmonic Series', description: 'Understanding odd vs even harmonics.' },
  { title: 'The Haas Effect', description: 'Using time-delays to create artificial width.' },
  { title: 'Sidechain Mastery', description: 'Creating the classic pumping effect.' },
  { title: 'LUFS Explained', description: 'Why integrated loudness matters for streaming.' },
  { title: 'Organic Layering', description: 'Blending field recordings with synths.' },
  { title: 'Transient Shaping', description: 'Punchy drums without clipping.' }
];

/** Maps a PhaseTemplate into an actual Phase with an ID and generated duration */
function hydratePhase(template: PhaseTemplate, minMin: number, maxMin: number): Phase {
  const durationSeconds = randomInt(minMin, maxMin) * 60;
  return {
    id: `ph-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: template.name,
    instrument: template.instrument,
    instructions: template.instructions,
    durationSeconds,
  };
}

/** 
 * ARCHETYPE 1: THE DEEP DIVE
 * Focuses 3-4 phases heavily on a single instrument, followed by an arrangement phase.
 */
function buildDeepDiveMission(): Mission {
  const instruments = [
    { name: 'Digitakt', pool: DIGITAKT_PHASES, adjectives: ['Rhythm', 'Pocket', 'Groove', 'Percussion'] },
    { name: 'Rhodes', pool: RHODES_PHASES, adjectives: ['Harmonic', 'Chordal', 'Melody', 'Voicing'] },
    { name: 'Mono Synth', pool: SYNTH_PHASES, adjectives: ['Bass', 'Arp', 'Lead', 'Sub'] },
    { name: 'Bitwig', pool: BITWIG_PHASES, adjectives: ['Texture', 'Arrangement', 'Resampling', 'Bus'] },
  ];
  
  const focus = pickRandom(instruments);
  const adj = pickRandom(focus.adjectives);
  const phaseCount = randomInt(3, 4);
  
  const selectedTemplates = pickMultiple(focus.pool, phaseCount);
  const wildcardPhase = pickRandom(WILDCARD_PHASES);

  const phases = [
    ...selectedTemplates.map(t => hydratePhase(t, 10, 15)),
    hydratePhase(wildcardPhase, 5, 10) // ending wild card
  ];

  const totalMinutes = phases.reduce((acc, p) => acc + (p.durationSeconds / 60), 0);

  return {
    id: `mission-gen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: `The ${focus.name} ${adj} Study`,
    subtitle: `${focus.name}-focused deep practice drill`,
    color: pickRandom([...COLORS]),
    totalMinutes,
    phases,
    constraints: pickMultiple(CONSTRAINTS, 3),
    resources: pickMultiple(RESOURCES, 2)
  };
}

/** 
 * ARCHETYPE 2: THE LAYER CAKE
 * A traditional multi-instrument build: Beat -> Chords -> Bass -> Texture/Wildcard.
 */
function buildLayerCakeMission(): Mission {
  const templates = [
    pickRandom(DIGITAKT_PHASES),
    pickRandom(RHODES_PHASES),
    pickRandom(SYNTH_PHASES),
    pickRandom(BITWIG_PHASES),
  ];

  // Randomly add a 5th phase maybe?
  if (Math.random() > 0.5) {
    templates.push(pickRandom(WILDCARD_PHASES));
  }

  const phases = templates.map(t => hydratePhase(t, 8, 12));
  const totalMinutes = phases.reduce((acc, p) => acc + (p.durationSeconds / 60), 0);

  const vibeWords = ['Session', 'Foundation', 'Stack', 'Build', 'Groove'];

  return {
    id: `mission-gen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: `The Full-Stack ${pickRandom(vibeWords)}`,
    subtitle: `Step-by-step 4-instrument progression`,
    color: pickRandom([...COLORS]),
    totalMinutes,
    phases,
    constraints: pickMultiple(CONSTRAINTS, 3),
    resources: pickMultiple(RESOURCES, 2)
  };
}

/** 
 * ARCHETYPE 3: THE CHAOS RUN (Franken Mission)
 * Utterly random selection across all pools. Very high variance in constraints.
 */
function buildChaosRunMission(): Mission {
  const ALL_POOLS = [
    ...DIGITAKT_PHASES,
    ...RHODES_PHASES,
    ...SYNTH_PHASES,
    ...BITWIG_PHASES,
    ...WILDCARD_PHASES
  ];

  const phaseCount = randomInt(4, 6);
  const selectedTemplates = pickMultiple(ALL_POOLS, phaseCount);
  const phases = selectedTemplates.map(t => hydratePhase(t, 6, 15));
  const totalMinutes = phases.reduce((acc, p) => acc + (p.durationSeconds / 60), 0);

  const crazyNames = ['Franken-Jam', 'The Rogue Run', 'Abstract Collider', 'Chaos Theory', 'Oddity Routine'];

  return {
    id: `mission-gen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: `Project: ${pickRandom(crazyNames)}`,
    subtitle: `Unpredictable, highly constrained aesthetic`,
    color: pickRandom([...COLORS]),
    totalMinutes,
    phases,
    constraints: pickMultiple(CONSTRAINTS, randomInt(3, 5)),
    resources: pickMultiple(RESOURCES, 2)
  };
}

/**
 * Generates `count` dynamically synthesized missions from scratch.
 * Each slot randomly rolls between one of 3 archetypes: Deep Dive, Layer Cake, or Chaos.
 */
export function generateDailyMissions(count = 4): Mission[] {
  const generated: Mission[] = [];
  
  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    if (roll < 0.33) {
      generated.push(buildDeepDiveMission());
    } else if (roll < 0.66) {
      generated.push(buildLayerCakeMission());
    } else {
      generated.push(buildChaosRunMission());
    }
  }

  return generated;
}
