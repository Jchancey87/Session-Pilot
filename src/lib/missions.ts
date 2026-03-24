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
    description: 'Master the dark art of depth. Instead of drowning a vocal in one massive reverb, use serial delays feeding into parallel plates to place the vocal in a hyper-realistic, three-dimensional space that sits perfectly behind the speakers.',
    category: 'MIXING',
    totalMinutes: 15,
    color: 'cyan',
    phases: [
      { id: 'vs-1', name: 'Serial Delay Staging', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Set up an analog-modeled 1/8th note delay feeding directly into a 1/4 note delay. Roll off everything above 3kHz on the returns to push the repeats backward in the mix.' },
      { id: 'vs-2', name: 'Parallel Plate Integration', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Send only the tails of those delays into a dark, dense plate reverb. Blend this return under the dry vocal until you feel the space without explicitly hearing the effect.' }
    ],
    constraints: [
      { text: 'Zero reverb on the dry vocal signal', icon: 'Ban' },
      { text: 'Maximum of 3 distinct delay taps', icon: 'Layers' },
      { text: 'Keep the entire effects chain mono', icon: 'Volume2' }
    ],
    resources: [
      { title: 'The Haas Effect Exploited', description: 'Using psychoacoustic time-delays to create artificial, phase-accurate stereo width.' },
      { title: 'Spectral Panning', description: 'Placing sounds using frequency brackets instead of just the volume pan pot.' }
    ]
  },
  {
    id: 'fm-synthesis-basics',
    name: 'FM Synthesis Basics',
    subtitle: 'Metallic textures',
    description: 'Abandon subtractive warmth. Dive into the cold, mathematical world of frequency modulation to create evolving, glassy, and metallic textures built entirely from pure sine waves.',
    category: 'SOUND DESIGN',
    totalMinutes: 25,
    color: 'amber',
    phases: [
      { id: 'fm-1', name: 'Carrier & Modulator Architecture', durationSeconds: 750, instrument: 'Mono Synth', instructions: 'Establish a strict 1:2 ratio between carrier and modulator. Slowly increase the FM index amount until the sidebands begin to shatter the fundamental tone.' },
      { id: 'fm-2', name: 'Percussive Envelope Shaping', durationSeconds: 750, instrument: 'Mono Synth', instructions: 'Assign a lightning-fast decay envelope strictly to the FM index (not the amp). Create a sound that starts as a metallic strike and instantly decays into a pure sine tone.' }
    ],
    constraints: [
      { text: 'Absolutely sine waves only', icon: 'Waves' },
      { text: 'Zero external effects (delay/reverb)', icon: 'Ban' },
      { text: 'Hard-coded to 4-voice polyphony', icon: 'Layers' }
    ],
    resources: [
      { title: 'FM Math & Sidebands', description: 'Understanding harmonic ratios and the mathematics of sideband generation.' },
      { title: 'The Chowning Method', description: 'Studying John Chowning\'s original digital synthesis breakthrough at Stanford.' }
    ]
  },
  {
    id: 'energy-mapping',
    name: 'Energy Mapping',
    subtitle: 'Tension and Release',
    description: 'A track is just organized breathing. Map the macro tension and release cycles of your arrangement to ensure perfect emotional pacing and devastating drops.',
    category: 'ARRANGEMENT',
    totalMinutes: 20,
    color: 'violet',
    phases: [
      { id: 'em-1', name: 'Starve the Frequency Spectrum', durationSeconds: 600, instrument: 'All', instructions: 'Ruthlessly high-pass all low end. Remove the kick entirely. Introduce atonal noise sweeps and snare rolls extending over 8 bars to stretch the tension to its breaking point.' },
      { id: 'em-2', name: 'The Kinetic Impact', durationSeconds: 600, instrument: 'All', instructions: 'Reintroduce all foundational elements exactly on the downbeat. Layer a synthesized crash or transient noise burst with the sub-bass to maximize the physical impact of the drop.' }
    ],
    constraints: [
      { text: 'Tempo locked tightly at 128 BPM', icon: 'Clock' },
      { text: 'Risers must be synthesized from white noise', icon: 'Waves' },
      { text: 'Maximum 16 bar sections per idea', icon: 'Layers' }
    ],
    resources: [
      { title: 'Macro Tension Theory', description: 'Using Shepard tones, high-pass filtering, and rhythmic density to build anticipation.' },
      { title: 'The Anatomy of a Drop', description: 'Sub-bass phase alignment and transient design for maximum club impact.' }
    ]
  },
  {
    id: 'loudness-standards',
    name: 'Loudness Standards',
    subtitle: 'Optimization',
    description: 'Demystify the master bus. Learn to balance peak limits with sustained loudness, ensuring your track survives streaming platform normalization without turning into a squashed brick.',
    category: 'MASTERING',
    totalMinutes: 10,
    color: 'emerald',
    phases: [
      { id: 'ls-1', name: 'Surgical Gain Staging', durationSeconds: 300, instrument: 'Bitwig', instructions: 'Pull all faders down. Rebalance the mix strictly ensuring the sum of all parts hits the pre-fader master bus at exactly -6dBFS. Headroom is mandatory.' },
      { id: 'ls-2', name: 'True Peak Limiting', durationSeconds: 300, instrument: 'Bitwig', instructions: 'Engage a True Peak limiter. Set the ceiling to -1.0dB. Carefully push the input gain until the integrated loudness meter reads a steady -14 LUFS.' }
    ],
    constraints: [
      { text: 'Nail exactly -14 LUFS integrated', icon: 'Volume2' },
      { text: 'Zero clipping allowed anywhere in the chain', icon: 'Ban' },
      { text: 'A/B blindly against a commercial reference', icon: 'Clock' }
    ],
    resources: [
      { title: 'LUFS & Normalization Explained', description: 'Why integrated loudness and dynamic range matter for the Spotify/Apple Music algorithms.' },
      { title: 'True Peak vs Sample Peak', description: 'Understanding inter-sample clipping and digital-to-analog conversion artifacts.' }
    ]
  },
  {
    id: 'granular-textures',
    name: 'Granular Textures',
    subtitle: 'Time and pitch manipulation',
    description: 'Shatter linear time. Master the art of slicing distinct audio into microscopic grains, allowing you to freeze time, independently shift pitch, and construct massive harmonic clouds from tiny fragments.',
    category: 'SOUND DESIGN',
    totalMinutes: 20,
    color: 'cyan',
    phases: [
      { id: 'gt-1', name: 'Generating the Grain Cloud', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Load a complex acoustic sample. Generate a dense cloud of grains and assign a slow LFO to scan the grain position back and forth across a specific harmonic hotspot.' },
      { id: 'gt-2', name: 'Extreme Time Stretching', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Slow the total playback speed down to 10% or less while locking the original pitch. Drench the output in chorus to smear the individual grain attack transients.' }
    ],
    constraints: [
      { text: 'Maximum grain size of 50ms', icon: 'Layers' },
      { text: 'No traditional melodic playback allowed', icon: 'Ban' },
      { text: 'Source audio must be a personal field recording', icon: 'Mic' }
    ],
    resources: [
      { title: 'Granular Synthesis 101', description: 'The fundamentals of slicing audio, windowing, and spray parameters.' },
      { title: 'Curtis Roads: Microsound', description: 'Deep academic insights from the pioneer of modern granular techniques.' }
    ]
  },
  {
    id: 'panda-bear',
    name: 'Panda Bear Echo-Chamber',
    subtitle: 'Texture over rhythm',
    description: 'Deconstruct traditional song structures. Build a dense, hypnotic wash of sound where rhythmic loops are permanently blurred by heavy, 100% wet time-based effects and vocal snippets run the arrangement.',
    category: 'ARRANGEMENT',
    totalMinutes: 60,
    color: 'emerald',
    phases: [
      {
        id: 'pb-skeleton',
        name: 'The Skeleton Hook',
        durationSeconds: 900,
        instrument: 'Digitakt',
        instructions: 'Program a bare-bones 2-bar loop: a steady kick, a single repetitive chord stab, and minimal percussion. Resist the urge to add filler. This is your anchor.',
      },
      {
        id: 'pb-blur',
        name: 'The 100% Wet Blur',
        durationSeconds: 900,
        instrument: 'Bitwig',
        instructions: 'Destroy the dry signal entirely. Send the Skeleton through long decay reverbs and multi-tap ping-pong delays set strictly to 100% wet. Smear the transients into a pad.',
      },
      {
        id: 'pb-vocal',
        name: 'Rhythmic Vocal Ghosts',
        durationSeconds: 900,
        instrument: 'Digitakt',
        instructions: 'Sample a sustained vocal note. Heavily process it with formant shifting and bit-reduction, then chop it into a syncopated groove that dances around the blurred chord progression.',
      },
      {
        id: 'pb-subtract',
        name: 'Ruthless Subtraction',
        durationSeconds: 900,
        instrument: 'All',
        instructions: 'Arrange the track by systematically muting elements. Never add a new sound to build tension—only remove elements to create space. Less is the entire arrangement.',
      },
    ],
    constraints: [
      { text: 'All time-based effects must be 100% wet', icon: 'Waves' },
      { text: 'Abandon traditional verse/chorus structure', icon: 'Ban' },
      { text: 'Absolute maximum of 4 audio tracks', icon: 'Layers' }
    ],
    resources: [
      { title: 'The Art of Decay', description: 'Techniques for using 10-second plus reverb tails as a primary melodic instrument.' },
      { title: 'Ghost Rhythms', description: 'Placing percussion so far back in the mix it feels like an auditory hallucination.' }
    ]
  },
  {
    id: 'indietronica',
    name: 'Indietronica Groove',
    subtitle: 'Drum machine meets organic',
    description: 'Fuse the robotic precision of sample-based drum machines with the loose, human imperfection of live organic instruments. Build a groove that makes heads nod without feeling quantized.',
    category: 'ARRANGEMENT',
    totalMinutes: 45,
    color: 'violet',
    phases: [
      {
        id: 'ig-beat',
        name: 'The Swung Foundation',
        durationSeconds: 600,
        instrument: 'Digitakt',
        instructions: 'Build a dry, punchy drum groove with extreme global swing. Program a heavy ghost-trigger sidechain sequence to make the entire kit physically pump against the kick.',
      },
      {
        id: 'ig-hook',
        name: 'The Inevitable Riff',
        durationSeconds: 600,
        instrument: 'Rhodes',
        instructions: 'Write a single, monophonic riff using a maximum of 4 notes. Play it with zero quantization, slightly dragging behind the beat. Loop it until it sounds hypnotically inevitable.',
      },
      {
        id: 'ig-bass',
        name: 'The Anchored Sub',
        durationSeconds: 600,
        instrument: 'Mono Synth',
        instructions: 'Dial in a dark, filtered square wave. Play a strictly root-and-fifth bassline. Hard-sidechain the bass amp envelope to the kick drum for maximum rhythmic pocket.',
      },
      {
        id: 'ig-atmosphere',
        name: 'The Modulated Pad',
        durationSeconds: 600,
        instrument: 'Bitwig',
        instructions: 'Record one continuous, hazy atmospheric pad chord to define the tonal center. Automate a slow, 8-bar low-pass filter sweep to provide a sense of forward motion.',
      },
      {
        id: 'ig-structure',
        name: 'The Block Arrangement',
        durationSeconds: 300,
        instrument: 'Bitwig',
        instructions: 'Quick-arrange in the timeline: Intro, Verse, Drop, Outro. Drag entire 8-bar blocks without overthinking the transitions. Force a minimum arrangement length of 4 minutes.',
      },
    ],
    constraints: [
      { text: 'Global swing parameter must exceed 60%', icon: 'Clock' },
      { text: 'Aggressive sidechain compression on all melodic tracks', icon: 'Zap' },
      { text: 'Only one track may contain polyphonic chords', icon: 'Layers' }
    ],
    resources: [
      { title: 'Sidechain as a Rhythmic Tool', description: 'Moving beyond mixing: using extreme sidechain compression to enforce groove.' },
      { title: 'The Dilla Pocket', description: 'Understanding micro-timing, drag, and rush in sample-based hip-hop and electronic music.' }
    ]
  },
  {
    id: 'shoegaze',
    name: 'Shoegaze Wall of Sound',
    subtitle: 'Everything is reverb',
    description: 'Bury the mix in glorious noise. Use extreme, modulated spatial effects to create a monolithic, impenetrable wall of sound where distinct instruments blur into a single gorgeous drone.',
    category: 'SOUND DESIGN',
    totalMinutes: 50,
    color: 'cyan',
    phases: [
      {
        id: 'sg-drone',
        name: 'The Eternal Drone',
        durationSeconds: 600,
        instrument: 'Rhodes + Bitwig',
        instructions: 'Sustain a dense chord through three cascading chorus pedals and a heavy plate reverb. Do not change the harmony for the duration of this track. Let the modulations swirl.',
      },
      {
        id: 'sg-rhythm',
        name: 'The Buried Rhythm',
        durationSeconds: 600,
        instrument: 'Digitakt',
        instructions: 'Program a washed-out drum pattern. Bury the entire drum bus in a hall reverb to physically distance the kit. Force a minimum of 40% velocity variation to keep the cymbals swirling manually.',
      },
      {
        id: 'sg-melody',
        name: 'The Gliding Lead',
        durationSeconds: 600,
        instrument: 'Mono Synth',
        instructions: 'Write a lethargic, soaring lead melody. Drench it in tape delay and aggressively utilize the pitch bend wheel on every single note as if heavily using a guitar tremolo arm.',
      },
      {
        id: 'sg-noise',
        name: 'The Pink Noise Wash',
        durationSeconds: 600,
        instrument: 'Bitwig',
        instructions: 'Layer continuously-running pink and white noise generators fed heavily through a stereo widener. Subtly modulate their amplitude using the kick drum envelope to give the roar a pulse.',
      },
      {
        id: 'sg-collapse',
        name: 'The Feedback Collapse',
        durationSeconds: 600,
        instrument: 'All',
        instructions: 'Open up the feedback loops on all delays. Gradually pull down the faders on the rhythm section, leaving only an agonizingly slow, howling decay of the drone and noise.',
      },
    ],
    constraints: [
      { text: 'All melodic instruments require a minimum 50% wet reverb send', icon: 'Waves' },
      { text: 'Absolute ban on sharp, dry transients', icon: 'Ban' },
      { text: 'Un-synced pitch modulation on every distinct sound source', icon: 'Zap' }
    ],
    resources: [
      { title: 'The Wall of Sound', description: 'From Phil Spector to Kevin Shields: The history and mixing philosophy of extreme sonic density.' },
      { title: 'Reverb as the Primary Instrument', description: 'Rethinking spatial effects as tone generators through feedback and heavy EQ.' }
    ]
  },
  {
    id: 'folk-hop-drift',
    name: 'Folk-Hop Drift',
    subtitle: 'Nostalgic vibes & acoustic chops',
    description: 'Merge the dusty crackle of sampled acoustic instruments with heavy, modern hip-hop drum programming. Build a deeply nostalgic soundscape that feels like a buried cassette tape.',
    category: 'ARRANGEMENT',
    totalMinutes: 48,
    color: 'amber',
    phases: [
      { id: 'fhd-1', name: 'The Dust Chord Progression', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Sample or record an acoustic-sounding chord progression (fingerpicked guitar or warm Rhodes). Degrade the audio with aggressive wow and flutter to introduce intentional pitch instability.' },
      { id: 'fhd-2', name: 'The Loose Acoustic Pocket', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Program heavily swung, un-quantized percussion using foley samples (tambourines, shakers, thigh slaps). Ensure the snare/snap is audibly lagging behind the beat.' },
      { id: 'fhd-3', name: 'The Granular Lap Steel', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Process a sustained wailing melody (mimicking a lap steel or slide guitar) through a slow granular delay. Bury it in vinyl crackle or tape hiss to complete the physical illusion.' },
      { id: 'fhd-4', name: 'The Hazy Lead Solo', durationSeconds: 720, instrument: 'Mono Synth', instructions: 'Play a wandering, blues-inflected solo over the groove using a distinctly analog, detuned synth patch. Embrace sloppy timing and imperfect pitch bends.' },
    ],
    constraints: [
      { text: 'A continuous bed of vinyl/tape noise must run alongside the entire track', icon: 'Volume2' },
      { text: 'Zero use of digital-clean sine/FM bass sounds', icon: 'Ban' },
      { text: 'Engage a gentle low-pass filter (around 12kHz) directly on the master bus', icon: 'Waves' }
    ],
    resources: [
      { title: 'Nostalgia as an Audio Effect', description: 'Applying Boards of Canada-style tape wow, flutter, and dropouts to modern productions.' },
      { title: 'Organic Layering Techniques', description: 'Achieving depth by blending micro-cassette field recordings with drum breaks.' }
    ]
  },
  {
    id: 'vinyl-country-road',
    name: 'Vinyl Country Road',
    subtitle: 'Tape spacer and folk textures',
    description: 'Construct a warm, dusty Nashville groove. Rely entirely on tape emulation, subtle optical compression, and carefully placed room mics to stitch together a seemingly live acoustic performance.',
    category: 'ARRANGEMENT',
    totalMinutes: 48,
    color: 'emerald',
    phases: [
      { id: 'vcr-1', name: 'The Nashville Shuffle', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Program a classic country shuffle using brushes on a snare and a heavy, muted kick. Keep the velocity incredibly dynamic to humanize the performance.' },
      { id: 'vcr-2', name: 'The Round Bottom', durationSeconds: 720, instrument: 'Mono Synth', instructions: 'Record a muted bass DI (or a pure sine sub). Run it through a vintage tape emulation plugin to roll off the aggressive transients and round out the bottom end.' },
      { id: 'vcr-3', name: 'Room Anatomy', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Process a supplementary rhythmic foley loop through a tight, short room reverb to create the illusion that all instruments were tracked live in the same wood-paneled studio.' },
      { id: 'vcr-4', name: 'The Pedal Steel Ghost', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Write a weeping, slow-moving top melody. Send it through a heavy rotary speaker emulation or analog chorus to mimic the warble of an old pedal steel guitar.' },
    ],
    constraints: [
      { text: 'Kick and Bass must be summed entirely to mono', icon: 'Volume2' },
      { text: 'Absolute ban on digital reverbs exceeding 1.5s decay', icon: 'Ban' },
      { text: 'Limit yourself to a vintage 12-track console mindset', icon: 'Layers' }
    ],
    resources: [
      { title: 'The Country Soul', description: 'Deconstructing the history of the Nashville shuffle and session-player dynamics.' },
      { title: 'Analog Saturation as Glue', description: 'Using subtle tape console emulation to bus acoustic instruments together.' }
    ]
  },
  {
    id: 'freak-sample-loop',
    name: 'Freak Sample Loop',
    subtitle: 'Live sampling & non-synced loops',
    description: 'Embrace absolute chaos and indeterminacy. Build a track completely unmoored from the grid by layering multiple asynchronous loops of varying lengths that drift in and out of phase naturally.',
    category: 'ARRANGEMENT',
    totalMinutes: 50,
    color: 'violet',
    phases: [
      { id: 'fsl-1', name: 'The Unmoored Trigger', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Trigger a raw percussive sample manually without sequencer quantization. Let it loop infinitely, independent of project tempo, creating a frantic freak-folk nervous system.' },
      { id: 'fsl-2', name: 'The Maimed Signal', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Run a melodic sample through a chain of a wavefolder, ring modulator, and hard-clipping distortion. Ride the gain live to make the processor scream rhythmically.' },
      { id: 'fsl-3', name: 'The Atonal Vamp', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Vamp over the roaring chaos using thick, dissonant 4-part clusters. Play purely on gut feeling and polyrhythmic instinct; ignore the DAW metronome entirely.' },
      { id: 'fsl-4', name: 'The Final Collapse', durationSeconds: 840, instrument: 'All', instructions: 'Engage parallel saturation on all busses. Slowly push the master drive until the different asynchronous loops crush into a single howling feedback wall as an outro.' },
    ],
    constraints: [
      { text: 'Zero DAW quantization permitted on any track', icon: 'Ban' },
      { text: 'Every primary loop must have a different, prime-number bar length', icon: 'Clock' },
      { text: 'One track must consist entirely of manipulated hardware/software feedback', icon: 'Zap' }
    ],
    resources: [
      { title: 'Indeterminacy in Music', description: 'John Cage, Steve Reich, and the terrible beauty of phase-shifting accidents.' },
      { title: 'Feedback Loops as Synthesis', description: 'Creating entirely new tones from the snake-eating-its-tail output of a pedal chain.' }
    ]
  },
  {
    id: 'ethnic-folk-pulse',
    name: 'Ethnic Folk Pulse',
    subtitle: 'Tribal patterns & field noise',
    description: 'Ground your digital tools in mud and wood. Construct a deep, heavily syncopated rhythmic bed sourced exclusively from natural field recordings and manipulated acoustic percussion.',
    category: 'ARRANGEMENT',
    totalMinutes: 48,
    color: 'cyan',
    phases: [
      { id: 'efp-1', name: 'The Resonant Wood', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Mic up a physical object (a box, a desk, a cajon). Record multi-velocity slaps with brushes or hands. Sequence this as your organic snare backbeat.' },
      { id: 'efp-2', name: 'The Polyrhythmic Undercurrent', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Program a rigid 3/4 tribal tom or shaker pattern underneath the 4/4 wood slap. Force the listener to search for the true downbeat.' },
      { id: 'efp-3', name: 'The Environmental Bed', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Loop a raw field recording of wind, rain, or a city street. Send it through an amp modeler and gate it rhythmically to the 3/4 pattern to create moving, tonal grit.' },
      { id: 'efp-4', name: 'The Plucked Hook', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Write a percussive, plucked melody. Repitch the entire track slightly out of standard western A=440Hz tuning to give it a distinctly foreign, localized identity.' },
    ],
    constraints: [
      { text: 'Track must heavily feature odd time signatures (e.g., 3/4 or 5/4 against 4/4)', icon: 'Clock' },
      { text: 'The snare/clap must be generated from a personal field recording', icon: 'Mic' },
      { text: 'Zero use of synthesized sub or electric bass allowed', icon: 'Ban' }
    ],
    resources: [
      { title: 'The Ethno-Musicologist Producer', description: 'Polyrhythmic studies: exploring foundational grooves from non-western cultures.' },
      { title: 'Foley for Rhythm', description: 'Creative mic placements for turning everyday household objects into a million-dollar drum kit.' }
    ]
  },
  {
    id: 'wichita-dust-bowl',
    name: 'Wichita Dust Bowl',
    subtitle: 'Countrypolitan strings & warmth',
    description: 'Evoke the sweeping cinematic drama of late 60s country studios. Marry the lonesome sound of a twang guitar with overwhelmingly lush, artificially synthesized string arrangements.',
    category: 'ARRANGEMENT',
    totalMinutes: 48,
    color: 'amber',
    phases: [
      { id: 'wdb-1', name: 'The Lonesome Twang', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Write a sparse, reverb-drenched twang melody acting as the lead vocal. Use heavy portamento or pitch bends to mimic the weep of a slide.' },
      { id: 'wdb-2', name: 'The Wall of Velvet', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Layer multiple vintage string machine emulations (Solina/Mellotron). Wash them in a dark chorus effect to create a thick, undeniably synthetic "Countrypolitan" backing bed.' },
      { id: 'wdb-3', name: 'The Brushes', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Program a suffocatingly soft snare shuffle. Low-pass the entire drum bus to ensure it never competes with the high strings.' },
      { id: 'wdb-4', name: 'The AM Radio Outro', durationSeconds: 720, instrument: 'Mono Synth', instructions: 'Automate a master bus EQ to aggressively filter out the low and high end over the final 30 seconds, mimicking a car driving away and losing radio signal.' },
    ],
    constraints: [
      { text: 'All string section samples must remain bone dry (no reverb) to amplify their synthetic nature', icon: 'Ban' },
      { text: 'Strictly limited to a maximum of 16 tracks', icon: 'Layers' },
      { text: 'BPM must remain devastatingly slow (< 80 BPM)', icon: 'Clock' }
    ],
    resources: [
      { title: 'The Nashville Sound Documented', description: 'How Chet Atkins and Owen Bradley orchestrated country music into mainstream pop in the 1960s.' },
      { title: 'Nostalgic Reverence Mixes', description: 'Filtering techniques for achieving an authentic "old AM radio" dashboard feel.' }
    ]
  },
  {
    id: 'phoenix-sample-ranch',
    name: 'Phoenix Sample Ranch',
    subtitle: 'Suburban country lo-fi',
    description: 'Find profound sadness in the mundane. Chop incredibly dry, unspectacular samples of suburban life into a fractured, deeply melancholic lo-fi hip-hop collage.',
    category: 'ARRANGEMENT',
    totalMinutes: 48,
    color: 'emerald',
    phases: [
      { id: 'psr-1', name: 'The Homesick Chop', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Take a plain acoustic guitar or piano sample. Micro-chop it onto 16 pads. Reassemble the chops into a stumbling, off-kilter hook that feels profoundly homesick.' },
      { id: 'psr-2', name: 'The Distant Horn', durationSeconds: 720, instrument: 'Rhodes', instructions: 'Burry a single brass or vocal sample under immense hiss and low-pass filtering. Fade it in at the end of every 8 bars to provide a fleeting sense of warmth.' },
      { id: 'psr-3', name: 'The Dragging Pocket', durationSeconds: 720, instrument: 'Digitakt', instructions: 'Program a kick and snare loop using samples that have been visibly pitched down. Place the snare so late on the 2 and 4 that the beat almost trips over itself.' },
      { id: 'psr-4', name: 'Cassette Degradation', durationSeconds: 720, instrument: 'Bitwig', instructions: 'Bounce the entire stereo mix. Load it back in and physically destroy the audio with heavy bitcrushing, tape stops, and aggressive multi-band compression.' },
    ],
    constraints: [
      { text: 'Mandatory lo-fi bitcrush or tape degradation on the master bus', icon: 'Zap' },
      { text: 'No synthesizers allowed; build all melody strictly from sampling suburban/house sounds', icon: 'Mic' },
      { text: 'Ban on complex jazz harmonies; stick to devastatingly simple triads', icon: 'Ban' }
    ],
    resources: [
      { title: 'Lo-Fi Aesthetics & Bit Depth', description: 'The melancholic beauty of 12-bit samplers and intentionally lowered sample rates.' },
      { title: 'Suburban Soundscapes', description: 'Finding musicality in the mundane hum of refrigerators and distant traffic.' }
    ]
  },
  {
    id: 'drum-bus-glue',
    name: 'Drum Bus Glue Operations',
    subtitle: 'Cohesion and punch',
    description: 'Transform a disparate collection of weak acoustic/electronic samples into a single, massive, breathing drum organism through mastering-grade bus compression and parallel saturation.',
    category: 'MIXING',
    totalMinutes: 20,
    color: 'emerald',
    phases: [
      { id: 'dbg-1', name: 'The New York Parallel', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Create a pre-fader send from your drum bus into a heavy distortion / infinite ratio compression unit. Destroy the signal, then blend this decimated return subtly under the clean drums for incredible thickness.' },
      { id: 'dbg-2', name: 'VCA Squeezing', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Strap an SSL-style VCA compressor across the main drum group. Dial in a slow attack (to let the stick transients through) and a fast release (to pump with the groove), targeting a maximum of 2-3dB of gain reduction.' }
    ],
    constraints: [
      { text: 'The parallel saturation return must be 100% wet', icon: 'Volume2' },
      { text: 'Absolutely no corrective EQ allowed after the compressor', icon: 'Ban' },
      { text: 'Ensure the resulting punch remains 100% mono-compatible', icon: 'Layers' }
    ],
    resources: [
      { title: 'VCA Compression Secrets', description: 'Why VCA circuits remain the undisputed kings of "glue" and drum bus snap.' },
      { title: 'Parallel Processing in Depth', description: 'Mastering the "New York" compression trick for density without losing dynamic range.' }
    ]
  },
  {
    id: 'low-end-management',
    name: 'Low End Management',
    subtitle: 'Kick and bass phase alignment',
    description: 'Carve out the most contested real estate in modern production. Force an enormous 808 sub and an aggressive analog kick drum to coexist beautifully without masking or canceling each other out.',
    category: 'MIXING',
    totalMinutes: 30,
    color: 'cyan',
    phases: [
      { id: 'lem-1', name: 'Surgical Frequency Ducking', durationSeconds: 900, instrument: 'Bitwig', instructions: 'Identify the exact fundamental frequency of the kick drum (e.g., 55Hz). Set up a hyper-narrow dynamic EQ band on the bass bus to aggressively duck only that specific frequency every time the kick triggers.' },
      { id: 'lem-2', name: 'Sub-Harmonic Foundation', durationSeconds: 900, instrument: 'Bitwig', instructions: 'Insert a sub-harmonic generator (or pure sine wave tracker) locked to the bass. Mix this tightly controlled artificial sub in below 60Hz to ensure absolute low-end consistency regardless of the acoustic bass note.' }
    ],
    constraints: [
      { text: 'Everything below 120Hz must be summed forcefully to mono', icon: 'Volume2' },
      { text: 'Sidechain compression attack must be > 15ms to allow the click through', icon: 'Clock' },
      { text: 'Zero sub-bass pitch movement allowed while the kick is actively decaying', icon: 'Ban' }
    ],
    resources: [
      { title: 'The Low End Theory Application', description: 'Balancing the deadly physics of 30Hz to 120Hz.' },
      { title: 'Oscilloscope Phase Alignment', description: 'Visually ensuring kick and sub waveforms don\'t invert and cancel each other out on large systems.' }
    ]
  },
  {
    id: 'wavetable-morphing',
    name: 'Wavetable Morphing Architecture',
    subtitle: 'Evolving hyper-digital timbres',
    description: 'Leave analog warmth behind. Construct aggressively complex, endlessly evolving cinematic pads by slowly morphing through digital wavetables and weaponizing audio-rate modulation.',
    category: 'SOUND DESIGN',
    totalMinutes: 20,
    color: 'violet',
    phases: [
      { id: 'wtm-1', name: 'Topographic Scanning', durationSeconds: 600, instrument: 'Polysynth', instructions: 'Load a harsh, high-harmonic wavetable (like Spectral or Vocal). Assign a glacially slow, unsynced LFO strictly to the wavetable frame index to create a sound that continuously unfolds over 16 bars.' },
      { id: 'wtm-2', name: 'Filter FM Annihilation', durationSeconds: 600, instrument: 'Polysynth', instructions: 'Route high-pitched oscillator 2 directly into the filter cutoff of oscillator 1. Push it into audio-rate modulation territory to tear the fabric of the pad apart with metallic, screaming grit.' }
    ],
    constraints: [
      { text: 'Mandatory ban on all reverb effects for this entire mission', icon: 'Ban' },
      { text: 'LFO movement must be unsynced and continuous', icon: 'Waves' },
      { text: 'Standard VA oscillators (saw/square) are forbidden; wavetables only', icon: 'Zap' }
    ],
    resources: [
      { title: 'Wavetable Synthesis Unleashed', description: 'From the Waldorf Microwave to Serum: The evolution of scanning frames.' },
      { title: 'Audio Rate Modulation Breakdown', description: 'Exploiting FM and AM synthesis secrets for harsh metallic grit.' }
    ]
  },
  {
    id: 'foley-layering',
    name: 'Foley Micro-Layering',
    subtitle: 'Infusing organic realism',
    description: 'Breathe physical life into stiff, programmed sequences. Micro-layer bespoke acoustic field recordings alongside purely synthetic drum hits to trick the ear into believing a robot has human hands.',
    category: 'SOUND DESIGN',
    totalMinutes: 25,
    color: 'amber',
    phases: [
      { id: 'fl-1', name: 'Surgical Transient Matching', durationSeconds: 750, instrument: 'Digitakt', instructions: 'Record yourself dropping keys or striking a pan. Zoom to sample-level and align this metallic acoustic transient perfectly with the attack of a synthetic 808 snare to create an entirely new hybrid hybrid instrument.' },
      { id: 'fl-2', name: 'Granular Room Tone', durationSeconds: 750, instrument: 'Bitwig', instructions: 'Load a 3-minute recording of an empty room tone into a granular engine. Map grain size to an LFO and use it as a highly responsive, ghostly textural pad playing underneath the entire beat.' }
    ],
    constraints: [
      { text: 'You must personally mic and sample your immediate environment', icon: 'Mic' },
      { text: 'Absolute ban on using commercial digital foley sample packs', icon: 'Ban' },
      { text: 'Every drum hit must enforce a strict 50/50 organic-to-synthetic blend', icon: 'Layers' }
    ],
    resources: [
      { title: 'The Sound of Nature as Synth', description: 'Approaching hyper-detailed foley recording with just your phone.' },
      { title: 'Phase-Accurate Transient Shaping', description: 'Secrets for perfectly aligning acoustic claps with drum machine transients.' }
    ]
  },
  {
    id: '8-bar-loop-escape',
    name: 'The 8-Bar Loop Escape',
    subtitle: 'Breaking the paralysis cycle',
    description: 'Destroy "loopitis." Take a stagnant, over-produced 8-bar loop and ruthlessly stretch it into a dynamic, full-length commercial arrangement using strictly subtractive editing methods.',
    category: 'ARRANGEMENT',
    totalMinutes: 40,
    color: 'cyan',
    phases: [
      { id: '8bl-1', name: 'Subtractive Carving', durationSeconds: 1200, instrument: 'Bitwig', instructions: 'Copy the massive 8-bar "drop" loop constantly across 4 minutes on the timeline. Now, use the mute tool as a scalpel. Delete sheer blocks of midi to blindly carve out a sparse intro, a builder verse, and a breakdown.' },
      { id: '8bl-2', name: 'Macro Emotion Arcs', durationSeconds: 1200, instrument: 'Bitwig', instructions: 'Before touching the arrangement again, draw 4-minute long, sweeping macro automation curves across the master bus or key spatial effects (like reverb sends and master filter cutoffs) to force a sense of linear progression onto the static timeline.' }
    ],
    constraints: [
      { text: 'Project must be paired down to an absolute maximum of 8 tracks total', icon: 'Layers' },
      { text: 'No new melodic midi notes can be recorded; use only what exists', icon: 'Ban' },
      { text: 'All track movement must be dictated strictly by volume/filter automation', icon: 'Volume2' }
    ],
    resources: [
      { title: 'Subtractive Arranging Techniques', description: 'The psychological power of removing elements to create narrative flow.' },
      { title: 'Macro Energy Management', description: 'Visualizing and executing the "wave" of a 4-minute club track.' }
    ]
  },
  {
    id: 'micro-edits-glitches',
    name: 'Advanced Micro-Edits',
    subtitle: 'Stutters & ear candy transitions',
    description: 'Forget sweeping risers. Inject extremely high-resolution, IDM-style ear candy into your transitions by manually hacking audio chunks into intricate stutters and reverse elements to bridge structural changes.',
    category: 'ARRANGEMENT',
    totalMinutes: 15,
    color: 'emerald',
    phases: [
      { id: 'meg-1', name: 'Surgical Audio Chopping', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Bounce your entire drum bus to raw audio. With snap-to-grid turned off, manually slice 1/32nd and 1/64th note repeated stutters right at the end of every 8th bar turnaround. Make it glitch physically.' },
      { id: 'meg-2', name: 'The Haunting Pre-Verb', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Print a massive, 10-second reverb tail of exclusively the lead vocal\'s first word. Reverse that audio tail and use it as a ghostly riser leading directly into the vocal entrance.' }
    ],
    constraints: [
      { text: 'Absolutely no MIDI plugins (like Beat Repeat) for glitches; slice audio manually', icon: 'Ban' },
      { text: 'Stutters must remain rigidly phase-locked to the grid', icon: 'Clock' },
      { text: 'Any single glitch event cannot exceed 1 bar in length', icon: 'Layers' }
    ],
    resources: [
      { title: 'Modern Glitch Aesthetics', description: 'Stealing IDM processing techniques (Aphex Twin/Squarepusher) for modern pop.' },
      { title: 'Advanced Audio Manipulation', description: 'Extreme time-warping and reversing tricks for undeniable ear candy.' }
    ]
  },
  {
    id: 'stereo-field-expansion',
    name: 'Stereo Field Expansion',
    subtitle: 'Mid/Side processing masterclass',
    description: 'Achieve massive spatial width without gutting the power of the track. Utilize Mid/Side processing to aggressively widen the mix margins while keeping the phantom center bulletproof and mono-compatible.',
    category: 'MASTERING',
    totalMinutes: 15,
    color: 'violet',
    phases: [
      { id: 'sfe-1', name: 'Surgical Mid Cleansing', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Engage a Mid/Side EQ. Solo the Mid channel. Ruthlessly clear out mud around 300Hz to make room for the kick/bass, and apply a 1dB boost at the vocal presence peak (usually 2-5kHz) to staple it to the center.' },
      { id: 'sfe-2', name: 'Side Channel Excitement', durationSeconds: 450, instrument: 'Bitwig', instructions: 'Solo the Side channel. Aggressively high-pass everything below 150Hz to keep sub-frequencies strictly mono. Apply subtle tape saturation exclusively to the high-mids on the sides to spread the stereo image artificially.' }
    ],
    constraints: [
      { text: 'The phantom center (kick, bass, lead vocal) must remain rigidly mono', icon: 'Volume2' },
      { text: 'The peak RMS of the Side channel must always be lower than the Mid peak', icon: 'Zap' },
      { text: 'Constantly collapse the master to mono to check for fatal phase cancellation', icon: 'Ban' }
    ],
    resources: [
      { title: 'Mid/Side Theory Deep Dive', description: 'Separating the powerful Phantom Center from the decorational sides.' },
      { title: 'The Panning Paradox', description: 'Psychoacoustics: Understand why making everything wide makes the mix feel small.' }
    ]
  },
  {
    id: 'harmonic-excitement',
    name: 'Harmonic Excitement',
    subtitle: 'Perceived loudness & density',
    description: 'Ditch the limiter. Learn to use multi-band saturation and exciters to drastically increase the perceived loudness, density, and sheer weight of a mix without sacrificing a single decibel of true dynamic range.',
    category: 'MASTERING',
    totalMinutes: 20,
    color: 'amber',
    phases: [
      { id: 'he-1', name: 'The Sub-Harmonic Glue', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Apply subtle, high-quality tape saturation directly across the master bus. Drive the input just hard enough to lightly shave off the sharpest transients, gluing the mid-range together through harmonic distortion.' },
      { id: 'he-2', name: 'Strategic Top-End Sheen', durationSeconds: 600, instrument: 'Bitwig', instructions: 'Target the highest frequency band (above 8kHz). Forego traditional shelving EQ in favor of an exciter. Generate new even-order harmonics to add expensive-sounding "air" and sheen to the cymbals and vocal breath.' }
    ],
    constraints: [
      { text: 'Tape saturation drive knob must remain below 10%', icon: 'Volume2' },
      { text: 'Absolutely no traditional EQ boosts allowed on the master bus', icon: 'Ban' },
      { text: 'Prioritize analog warmth over digital brightness', icon: 'Waves' }
    ],
    resources: [
      { title: 'The Harmonic Series Explored', description: 'Understanding the psychoacoustic difference between odd (aggressive) vs even (musical) harmonics.' },
      { title: 'Advanced Saturation Workflows', description: 'When to use serial clipping vs parallel coloration on the master bus chain.' }
    ]
  }
];
