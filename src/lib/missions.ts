// ─── Mission & Phase Data ───────────────────────────────────────────────────

export interface Phase {
  id: string;
  name: string;
  durationSeconds: number;
  instrument: string;
  instructions: string;
}

export interface Constraint {
  text: string;
  icon: 'Layers' | 'Ban' | 'Waves' | 'Zap' | 'Volume2' | 'Mic' | 'Clock';
}

export interface Resource {
  title: string;
  description: string;
  url?: string;
}

export interface Mission {
  id: string;
  name: string;
  subtitle: string;
  description?: string;
  category?: string;
  totalMinutes: number;
  phases: Phase[];
  color: 'amber' | 'emerald' | 'violet' | 'cyan';
  constraints?: Constraint[];
  resources?: Resource[];
}

export const MISSIONS: Mission[] = [
  {
    id: 'vocal-spatialization',
    name: 'Vocal Spacialization',
    subtitle: 'Depth and environment',
    description: 'Master the art of depth using serial delays and parallel reverbs to place vocals in a 3D space.',
    category: 'MIXING',
    totalMinutes: 15,
    color: 'cyan',
    phases: [
      { id: 'vs-1', name: 'Serial Delay', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Set up 1/8th and 1/4 note delays. EQ the returns.' },
      { id: 'vs-2', name: 'Parallel Reverb', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Send delays into a dark plate reverb. Blend to taste.' }
    ],
    constraints: [
      { text: 'No reverb on the dry signal', icon: 'Ban' },
      { text: 'Maximum 3 delay taps', icon: 'Layers' },
      { text: 'Mono-only effects chain', icon: 'Volume2' }
    ],
    resources: [
      { title: 'The Haas Effect', description: 'Using time-delays to create artificial stereo width.' },
      { title: 'Spectral Panning', description: 'Placing sounds using frequency instead of just volume.' }
    ]
  },
  {
    id: 'fm-synthesis-basics',
    name: 'FM Synthesis Basics',
    subtitle: 'Metallic textures',
    description: 'Explore frequency modulation to create evolving, metallic textures from simple sine waves.',
    category: 'SOUND DESIGN',
    totalMinutes: 25,
    color: 'amber',
    phases: [
      { id: 'fm-1', name: 'Carrier & Modulator', durationSeconds: 750, instrument: 'Mono Synth', instructions: 'Set a 1:2 ratio. Increase FM amount slowly.' },
      { id: 'fm-2', name: 'Envelope Shaping', durationSeconds: 750, instrument: 'Mono Synth', instructions: 'Assign a quick decay envelope to the FM index.' }
    ],
    constraints: [
      { text: 'Sine waves only', icon: 'Waves' },
      { text: 'No external effects', icon: 'Ban' },
      { text: 'Fixed 4-voice polyphony', icon: 'Layers' }
    ],
    resources: [
      { title: 'FM Math Basics', description: 'Understanding ratios and sideband mathematics.' },
      { title: 'Chowning Method', description: 'John Chowning\'s original synthesis breakthrough.' }
    ]
  },
  {
    id: 'energy-mapping',
    name: 'Energy Mapping',
    subtitle: 'Tension and Release',
    description: 'Map the tension and release cycles of your track to ensure perfect emotional pacing.',
    category: 'ARRANGEMENT',
    totalMinutes: 20,
    color: 'violet',
    phases: [
      { id: 'em-1', name: 'Build the Drop', durationSeconds: 600, instrument: 'All', instructions: 'Remove bass and kick. Add riser elements.' },
      { id: 'em-2', name: 'The Impact', durationSeconds: 600, instrument: 'All', instructions: 'Reintroduce all elements with a crash and heavy sub.' }
    ],
    constraints: [
      { text: 'BPM must remain at 128', icon: 'Clock' },
      { text: 'White noise risers only', icon: 'Waves' },
      { text: 'Maximum 16 bar sections', icon: 'Layers' }
    ],
    resources: [
      { title: 'Tension Theory', description: 'How to use Shepard tones and noise for buildup.' },
      { title: 'The Big Drop', description: 'Techniques for maximum low-end impact.' }
    ]
  },
  {
    id: 'loudness-standards',
    name: 'Loudness Standards',
    subtitle: 'Optimization',
    description: 'Understand LUFS and true peak limiting for streaming platform optimization.',
    category: 'MASTERING',
    totalMinutes: 10,
    color: 'emerald',
    phases: [
      { id: 'ls-1', name: 'Gain Staging', durationSeconds: 300, instrument: 'Bitwig', instructions: 'Ensure mix peaks at -6dB before the master bus.' },
      { id: 'ls-2', name: 'True Peak Limiting', durationSeconds: 300, instrument: 'Bitwig', instructions: 'Set ceiling to -1dB. Push gain to hit -14 LUFS.' }
    ],
    constraints: [
      { text: 'Target -14 LUFS exactly', icon: 'Volume2' },
      { text: 'No clipping on master bus', icon: 'Ban' },
      { text: 'Use reference tracks', icon: 'Clock' }
    ],
    resources: [
      { title: 'LUFS Explained', description: 'Why integrated loudness matters for Spotify/Apple Music.' },
      { title: 'True Peak vs Peak', description: 'Preventing inter-sample clipping.' }
    ]
  },
  {
    id: 'granular-textures',
    name: 'Granular Textures',
    subtitle: 'Time and pitch manipulation',
    description: 'Master the art of slicing audio into tiny grains to manipulate time and pitch independently.',
    category: 'SOUND DESIGN',
    totalMinutes: 20,
    color: 'cyan',
    phases: [
      { id: 'gt-1', name: 'Grain Cloud', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Generate a dense grain cloud. Modulate grain position.' },
      { id: 'gt-2', name: 'Time Stretching', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Slow down the sample to 10% speed. Keep original pitch.' }
    ],
    constraints: [
      { text: 'Maximum 50ms grain size', icon: 'Layers' },
      { text: 'No melodic playback', icon: 'Ban' },
      { text: 'Use only found sounds', icon: 'Mic' }
    ],
    resources: [
      { title: 'Granular Synthesis 101', description: 'The fundamentals of slicing audio into tiny grains.' },
      { title: 'Curtis Roads: Microsound', description: 'Insights from the pioneer of granular techniques.' }
    ]
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
        instructions: 'Heavily processed vocal snippets. Use them as rhythmic ghosts.',
      },
      {
        id: 'pb-subtract',
        name: 'Subtraction',
        durationSeconds: 900,
        instrument: 'All',
        instructions: 'Remove elements until it hurts. Export what remains. Less is the arrangement.',
      },
    ],
    constraints: [
      { text: '100% wet reverb only', icon: 'Waves' },
      { text: 'No traditional song structure', icon: 'Ban' },
      { text: 'Maximum 4 audio tracks', icon: 'Layers' }
    ],
    resources: [
      { title: 'The Art of Decay', description: 'How to use long reverb tails as a melodic instrument.' },
      { title: 'Ghost Rhythms', description: 'Placing percussion in the background of a mix.' }
    ]
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
    constraints: [
      { text: 'Swing must be > 60%', icon: 'Clock' },
      { text: 'Sidechain on everything', icon: 'Zap' },
      { text: 'Rhodes is the only poly instrument', icon: 'Layers' }
    ],
    resources: [
      { title: 'Sidechain Mastery', description: 'Creating the classic "pumping" effect.' },
      { title: 'Swing and Groove', description: 'Understanding micro-timing in electronic music.' }
    ]
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
    constraints: [
      { text: 'All instruments 50%+ wet reverb', icon: 'Waves' },
      { text: 'No sharp transients', icon: 'Ban' },
      { text: 'Pitch modulation on every track', icon: 'Zap' }
    ],
    resources: [
      { title: 'Wall of Sound', description: 'Phil Spector to Kevin Shields: The history of density.' },
      { title: 'Reverb as Instrument', description: 'Modulating decay times for melodic movement.' }
    ]
  },
  {
    id: 'folk-hop-drift',
    name: 'Folk-Hop Drift',
    subtitle: 'Nostalgic vibes & acoustic chops',
    totalMinutes: 48,
    color: 'amber',
    phases: [
      { id: 'fhd-1', name: 'Acoustic Strum', durationSeconds: 720, instrument: 'Rhodes / Guitar', instructions: 'Acoustic strum (11th fret patterns). Focus on the core progression.' },
      { id: 'fhd-2', name: 'Tambourine Shaker', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Tambourine and shaker grooves to build the pocket.' },
      { id: 'fhd-3', name: 'Lap Steel Ambient', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Lap steel ambient layer. Add vinyl crackle and tape warble.' },
      { id: 'fhd-4', name: 'Guitar Solo Haze', durationSeconds: 720, instrument: 'Mono Synth', instructions: 'Guitar solo haze over the track. Embrace the imperfections.' },
    ],
    constraints: [
      { text: 'Vinyl crackle must be present', icon: 'Volume2' },
      { text: 'No digital-clean sounds', icon: 'Ban' },
      { text: 'Low-pass filter on master', icon: 'Waves' }
    ],
    resources: [
      { title: 'Nostalgia Mixing', description: 'Techniques for adding warmth and tape artifacts.' },
      { title: 'Organic Layering', description: 'Blending field recordings with acoustic loops.' }
    ]
  },
  {
    id: 'vinyl-country-road',
    name: 'Vinyl Country Road',
    subtitle: 'Tape spacer and folk textures',
    totalMinutes: 48,
    color: 'emerald',
    phases: [
      { id: 'vcr-1', name: 'Shuffle Kick', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Shuffle kick and pedal steel sample. Establish the groove.' },
      { id: 'vcr-2', name: 'Bass DI', durationSeconds: 720, instrument: 'Mono Synth', instructions: 'Bass DI (soothe/tape spacer) to anchor the low end.' },
      { id: 'vcr-3', name: 'Folk Textures', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Folk textures and foley loops to build atmosphere.' },
      { id: 'vcr-4', name: 'Dust Highway', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Crackle + dust highway melody. Play loosely.' },
    ],
    constraints: [
      { text: 'Mono kick and bass only', icon: 'Volume2' },
      { text: 'No reverb on the dry guitar', icon: 'Ban' },
      { text: 'Maximum 12 tracks', icon: 'Layers' }
    ],
    resources: [
      { title: 'The Country Soul', description: 'History of the Nashville shuffle and pedal steel.' },
      { title: 'Analog Saturation', description: 'Using tape emulation to glue acoustic tracks.' }
    ]
  },
  {
    id: 'freak-sample-loop',
    name: 'Freak Sample Loop',
    subtitle: 'Live sampling & non-synced loops',
    totalMinutes: 50,
    color: 'violet',
    phases: [
      { id: 'fsl-1', name: 'Rhythmic Trigger', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Rhythmic sampler trigger (no sync). Freak-folk energy.' },
      { id: 'fsl-2', name: 'Effects Jam', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Effects processor jam (wave folder, distortion, ring mod).' },
      { id: 'fsl-3', name: 'Odd Chords', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Humming or vamping over odd chords.' },
      { id: 'fsl-4', name: 'Noise Collapse', durationSeconds: 840, instrument: 'All', instructions: 'Build to noise collapse. Let the feedback take over.' },
    ],
    constraints: [
      { text: 'No quantize allowed', icon: 'Ban' },
      { text: 'Asynchronous loops only', icon: 'Clock' },
      { text: 'One track must be feedback-only', icon: 'Zap' }
    ],
    resources: [
      { title: 'Indeterminacy in Music', description: 'John Cage and the beauty of accidents.' },
      { title: 'Feedback Loops as Synthesis', description: 'Creating sound from the output of an effects chain.' }
    ]
  },
  {
    id: 'ethnic-folk-pulse',
    name: 'Ethnic Folk Pulse',
    subtitle: 'Tribal patterns & field noise',
    totalMinutes: 48,
    color: 'cyan',
    phases: [
      { id: 'efp-1', name: 'Cajon Slap', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Cajon slap layer. Use brushes or sticks.' },
      { id: 'efp-2', name: '3/4 Tribal Pattern', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Add a 3/4 tribal pattern to the existing groove.' },
      { id: 'efp-3', name: 'Field Noise', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Field noise + rectifier to grit up the texture.' },
      { id: 'efp-4', name: 'Folk Groove', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Ethnic flip to folk groove to tie it together.' },
    ],
    constraints: [
      { text: 'Odd time signatures only', icon: 'Clock' },
      { text: 'Primary source is field recording', icon: 'Mic' },
      { text: 'No electric bass allowed', icon: 'Ban' }
    ],
    resources: [
      { title: 'Ethno-Musicology', description: 'Exploring rhythmic patterns from non-western cultures.' },
      { title: 'Foley for Rhythm', description: 'Turning everyday objects into a drum kit.' }
    ]
  },
  {
    id: 'wichita-dust-bowl',
    name: 'Wichita Dust Bowl',
    subtitle: 'Countrypolitan strings & warmth',
    totalMinutes: 48,
    color: 'amber',
    phases: [
      { id: 'wdb-1', name: 'Twang Guitar', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Twang guitar lick. Imitate orchestration via samples.' },
      { id: 'wdb-2', name: 'Plush Strings', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Plush strings sweep for that 60s-70s classic feel.' },
      { id: 'wdb-3', name: 'Slide Shuffle', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Soft slide shuffle rhythm pattern.' },
      { id: 'wdb-4', name: 'Reflections', durationSeconds: 720, instrument: 'Mono Synth', instructions: 'Vinyl nostalgia + reflection mix down.' },
    ],
    constraints: [
      { text: 'String sections must be dry', icon: 'Ban' },
      { text: 'Maximum 16 tracks', icon: 'Layers' },
      { text: 'BPM must be slow (< 80)', icon: 'Clock' }
    ],
    resources: [
      { title: 'The Nashville Sound', description: 'Orchestrating country music in the 60s.' },
      { title: 'Nostalgic Reverence', description: 'Mixing for an "old radio" feel.' }
    ]
  },
  {
    id: 'phoenix-sample-ranch',
    name: 'Phoenix Sample Ranch',
    subtitle: 'Suburban country lo-fi',
    totalMinutes: 48,
    color: 'emerald',
    phases: [
      { id: 'psr-1', name: 'Melody Chop', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Homesick melody chop as the core hook.' },
      { id: 'psr-2', name: 'Backing Layer', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Horn or vocal backing layer for warmth.' },
      { id: 'psr-3', name: '3/4 Rhythm', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Complex 3/4 rhythm underneath the main chop.' },
      { id: 'psr-4', name: 'Suburban Lo-Fi', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Suburban country lo-fi arrangement and mixdown.' },
    ],
    constraints: [
      { text: 'Lo-fi bitcrush on master', icon: 'Zap' },
      { text: 'Sampling suburban sounds only', icon: 'Mic' },
      { text: 'No complex harmonies', icon: 'Ban' }
    ],
    resources: [
      { title: 'Lo-Fi Aesthetics', description: 'The beauty of bits and lowered sample rates.' },
      { title: 'Suburban Soundscapes', description: 'Finding music in the mundane.' }
    ]
  },
  {
    id: 'drum-bus-glue',
    name: 'Drum Bus Glue',
    subtitle: 'Cohesion and punch',
    description: 'Master bus compression and parallel saturation to make your drum group sound like a single instrument.',
    category: 'MIXING',
    totalMinutes: 20,
    color: 'emerald',
    phases: [
      { id: 'dbg-1', name: 'Parallel Saturation', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Send the drum bus to a heavy distortion return. Blend it under the clean signal for thickness.' },
      { id: 'dbg-2', name: 'VCA Compression', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Apply a VCA compressor to the drum bus. Slow attack, fast release, targeting 2-3dB of gain reduction.' }
    ],
    constraints: [
      { text: 'Dry/Wet must be 100% on saturation', icon: 'Volume2' },
      { text: 'No EQ after compression', icon: 'Ban' },
      { text: 'Mono-compatible punch only', icon: 'Layers' }
    ],
    resources: [
      { title: 'VCA Compression', description: 'Why VCAs are the king of drum bus compression.' },
      { title: 'Parallel Processing', description: 'The "New York" compression trick.' }
    ]
  },
  {
    id: 'low-end-management',
    name: 'Low End Management',
    subtitle: 'Kick and bass relationship',
    description: 'Carve out space so your kick and sub bass hit hard without clashing.',
    category: 'MIXING',
    totalMinutes: 30,
    color: 'cyan',
    phases: [
      { id: 'lem-1', name: 'Dynamic EQ', durationSeconds: 900, instrument: 'Bitwig', instructions: 'Set up dynamic EQ on the bass bus, ducking the fundamental frequency of the kick drum.' },
      { id: 'lem-2', name: 'Sub Harmonics', durationSeconds: 900, instrument: 'Bitwig', instructions: 'Add a sub-harmonic generator to the bass for consistent low-end weight below 60Hz.' }
    ],
    constraints: [
      { text: 'Kick must be mono below 100Hz', icon: 'Volume2' },
      { text: 'Sidechain must be at least 15ms', icon: 'Clock' },
      { text: 'No sub-bass movement during kick', icon: 'Ban' }
    ],
    resources: [
      { title: 'The Low End Theory', description: 'Balancing 30Hz to 120Hz.' },
      { title: 'Phase Alignment', description: 'Ensuring kick and sub don\'t cancel each other out.' }
    ]
  },
  {
    id: 'wavetable-morphing',
    name: 'Wavetable Morphing',
    subtitle: 'Evolving timbres',
    description: 'Create complex, evolving pads using wavetable synthesis and slow LFO modulation.',
    category: 'SOUND DESIGN',
    totalMinutes: 20,
    color: 'violet',
    phases: [
      { id: 'wtm-1', name: 'Wave Scanning', durationSeconds: 600, instrument: 'Polysynth', instructions: 'Assign a slow, unsynced LFO to the wavetable position for continuous timbral shifting.' },
      { id: 'wtm-2', name: 'Filter FM', durationSeconds: 600, instrument: 'Polysynth', instructions: 'Route oscillator 2 to modulate the filter cutoff at audio rates for aggressive textures.' }
    ],
    constraints: [
      { text: 'No reverb allowed this phase', icon: 'Ban' },
      { text: 'Continuous LFO movement', icon: 'Waves' },
      { text: 'Wavetable synthesis only', icon: 'Zap' }
    ],
    resources: [
      { title: 'Wavetable Synthesis', description: 'From PPG to Serum: The evolution of tables.' },
      { title: 'Audio Rate Modulation', description: 'FM and AM secrets for metallic grit.' }
    ]
  },
  {
    id: 'foley-layering',
    name: 'Foley Layering',
    subtitle: 'Organic textures',
    description: 'Blend organic recordings with synthetic sounds to breathe life into rigid patterns.',
    category: 'SOUND DESIGN',
    totalMinutes: 25,
    color: 'amber',
    phases: [
      { id: 'fl-1', name: 'Transient Matching', durationSeconds: 750, instrument: 'Digitakt', instructions: 'Layer acoustic metallic hits perfectly with synthetic snare transients.' },
      { id: 'fl-2', name: 'Granular Ambience', durationSeconds: 750, instrument: 'Bitwig', instructions: 'Load a field recording into a granular synth to create a responsive, textural pad.' }
    ],
    constraints: [
      { text: 'Sample your own environment', icon: 'Mic' },
      { text: 'No digital sample packs', icon: 'Ban' },
      { text: 'Blend 50/50 organic/synthetic', icon: 'Layers' }
    ],
    resources: [
      { title: 'The Sound of Nature', description: 'Recording textures with your phone.' },
      { title: 'Transient Shaping', description: 'Aligning foley hits with drum transients.' }
    ]
  },
  {
    id: '8-bar-loop-escape',
    name: '8-Bar Loop Escape',
    subtitle: 'Breaking the cycle',
    description: 'Transform a stagnant 8-bar loop into a dynamic, full-length arrangement.',
    category: 'ARRANGEMENT',
    totalMinutes: 40,
    color: 'cyan',
    phases: [
      { id: '8bl-1', name: 'Subtractive Arrangement', durationSeconds: 1200, instrument: 'Bitwig', instructions: 'Copy the loop across 4 minutes. Delete elements to carve out an intro, verse, and breakdown.' },
      { id: '8bl-2', name: 'Automation Arcs', durationSeconds: 1200, instrument: 'Bitwig', instructions: 'Draw macro automation curves across the entire track for filter cutoffs and reverb sends.' }
    ],
    constraints: [
      { text: 'Maximum 8 tracks total', icon: 'Layers' },
      { text: 'No new melodic ideas', icon: 'Ban' },
      { text: 'Volume automation only', icon: 'Volume2' }
    ],
    resources: [
      { title: 'Subtractive Arranging', description: 'The power of removing elements to create flow.' },
      { title: 'Energy Management', description: 'Visualizing the "wave" of a 4-minute track.' }
    ]
  },
  {
    id: 'micro-edits-glitches',
    name: 'Micro-Edits',
    subtitle: 'Ear candy transitions',
    description: 'Add intricate stutters and reverse elements to bridge structural changes.',
    category: 'ARRANGEMENT',
    totalMinutes: 15,
    color: 'emerald',
    phases: [
      { id: 'meg-1', name: 'Audio Chopping', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Bounce to audio. Create 1/32nd note stutters at the end of every 8th bar transition.' },
      { id: 'meg-2', name: 'Reverse Reverbs', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Print a reverb tail of the lead vocal, reverse it, and lead into the next section.' }
    ],
    constraints: [
      { text: 'No MIDI for glitches, only audio', icon: 'Ban' },
      { text: 'Stutters must stay on grid', icon: 'Clock' },
      { text: 'Maximum 1 bar glitch length', icon: 'Layers' }
    ],
    resources: [
      { title: 'Glitch Aesthetics', description: 'IDM techniques for modern pop.' },
      { title: 'Audio Manipulation', description: 'Advanced warping and reversing tricks.' }
    ]
  },
  {
    id: 'stereo-field-expansion',
    name: 'Stereo Field Expansion',
    subtitle: 'Mid/Side processing',
    description: 'Widen your mix without losing mono compatibility or centre punch.',
    category: 'MASTERING',
    totalMinutes: 15,
    color: 'violet',
    phases: [
      { id: 'sfe-1', name: 'Mid Cleansing', durationSeconds: 450, instrument: 'Bitwig', instructions: 'EQ the mid channel: clear mud around 300Hz and boost the presence peak.' },
      { id: 'sfe-2', name: 'Side Excitement', durationSeconds: 450, instrument: 'Bitwig', instructions: 'High-pass the side channel at 150Hz and apply subtle saturation to the highs.' }
    ],
    constraints: [
      { text: 'Center must remain mono', icon: 'Volume2' },
      { text: 'Center peak < Side peak', icon: 'Zap' },
      { text: 'Check mono compatibility', icon: 'Ban' }
    ],
    resources: [
      { title: 'Mid/Side Theory', description: 'Separating the Phantom Center from the sides.' },
      { title: 'The Panning Paradox', description: 'When wider sounds smaller.' }
    ]
  },
  {
    id: 'harmonic-excitement',
    name: 'Harmonic Excitement',
    subtitle: 'Perceived loudness',
    description: 'Use multi-band saturation to increase perceived loudness without destroying dynamics.',
    category: 'MASTERING',
    totalMinutes: 20,
    color: 'amber',
    phases: [
      { id: 'he-1', name: 'Tape Saturation', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Apply subtle tape saturation to the master bus to glue the transients and warm the mid-range.' },
      { id: 'he-2', name: 'High-end Sparkle', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Use an exciter on the highest frequency band (above 8kHz) to add air and sheen.' }
    ],
    constraints: [
      { text: 'Drive must be < 10%', icon: 'Volume2' },
      { text: 'No EQ boosts on master', icon: 'Ban' },
      { text: 'Warmth over brightness', icon: 'Waves' }
    ],
    resources: [
      { title: 'Harmonic Series', description: 'Understanding odd vs even harmonics.' },
      { title: 'Saturation Workflow', description: 'Serial vs parallel master bus chain.' }
    ]
  }
];
