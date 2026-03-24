export interface PhaseTemplate {
  name: string;
  instrument: string;
  instructions: string;
}

export const DIGITAKT_PHASES: PhaseTemplate[] = [
  { name: '1-Pad Challenge', instrument: 'Digitakt', instructions: 'Commit to a single track. Build a complete 16-step groove relying solely on aggressive parameter locking (p-locks) for pitch, decay, and filter changes per step to squeeze an entire kit out of one sound.' },
  { name: 'Swing Foundation', instrument: 'Digitakt', instructions: 'Program a foundational beat with extreme swing (>60%). The golden rule: the kick drum must never land on the downbeat (the 1). Force the groove to pull the listener forward.' },
  { name: 'Polyrhythmic Texture', instrument: 'Digitakt', instructions: 'Divorce your tracks from the main grid. Set one percussive track to a 5/16 scale length and a complementary texture to 7/16. Let them drift endlessly against a straight 4/4 kick to create generative hypnosis.' },
  { name: 'Micro-Chop Surgery', instrument: 'Digitakt', instructions: 'Sample a mundane sound (your own voice humming, a desk tap). Chop it into microscopic fragments, pitch them wildly, and use them as your primary percussive driving force instead of traditional hi-hats.' },
  { name: 'Off-Grid Pocket Drill', instrument: 'Digitakt', instructions: 'Turn off all quantization. Manually play or micro-nudge every single snare and hi-hat off the grid. Find the pocket where the beat feels both sloppy and undeniably human.' },
  { name: 'Generative LFO Mayhem', instrument: 'Digitakt', instructions: 'Assign a random LFO to sample start position and a secondary unsynced LFO to pitch. Send a drum break through it and spend this phase trying to tame and clip the resulting chaos into a usable rhythmic bed.' },
  { name: 'Waveform Extraction', instrument: 'Digitakt', instructions: 'Take a heavy kick drum sample, loop a single cycle waveform from its tail, and shape the amp envelope to play it chromatically as a thick, gritty sub-bass line.' },
];

export const RHODES_PHASES: PhaseTemplate[] = [
  { name: 'Harmonic Cage', instrument: 'Rhodes', instructions: 'Restrict your palette entirely. You are permitted to use exactly 3 specific notes from the scale for the entire duration of this phase. Focus purely on rhythm, velocity dynamics, and timbre.' },
  { name: 'Left-Hand Fasting', instrument: 'Rhodes', instructions: 'Play a lush 4-chord progression, but absolutely no root notes are allowed in your left hand. Use rootless voicings (3rds, 7ths, 9ths) to leave a massive, untouched pocket for the bass later.' },
  { name: 'The Drone Lick', instrument: 'Rhodes', instructions: 'Hold down a single, thick bass drone note (use a weight or tape if necessary). Improvise a slow, evolving, melancholic melody over it, leaning hard into the dissonant passing tones.' },
  { name: 'Respecting the Void', instrument: 'Rhodes', instructions: 'Play a heavily effected chord. Wait exactly 4 bars in total silence. Play the next chord. Embrace the awkward empty space and let the preamp noise and tape hiss become part of the composition.' },
  { name: 'Percussive Comping', instrument: 'Rhodes', instructions: 'Treat the keyboard like a drum kit. Two-handed rhythmic stabs only, locked tightly to the kick and snare pocket. No sustained notes; make it sharp, percussive, and funk-driven.' },
  { name: 'Contrary Motion', instrument: 'Rhodes', instructions: 'Write a progression focusing strictly on voice leading: construct it so the bassline walks stepwise downwards while the top melody note walks exactly upwards in contrary motion.' },
];

export const SYNTH_PHASES: PhaseTemplate[] = [
  { name: 'Blind Knob Roulette', instrument: 'Mono Synth', instructions: 'Close your eyes. Twist 3 distinct synthesis parameters (e.g., resonance, envelope amount, oscillator sync) completely at random. Open your eyes and force yourself to build an entire riff around this hostile new timbre.' },
  { name: 'Bass Constriction', instrument: 'Mono Synth', instructions: 'Write a driving bassline that never moves more than a minor 3rd away from its starting root note. Create interest solely through filter sequencing, envelope modulation, and rhythmic syncopation.' },
  { name: 'Arp Deconstruction', instrument: 'Mono Synth', instructions: 'Turn on the arpeggiator (set to random or up/down). Feed it incredibly slow, disconnected midi notes manually so it constantly resets and stutters, breaking the predictable mechanical flow.' },
  { name: 'The Committed Filter Sweep', instrument: 'Mono Synth', instructions: 'Record one continuous, live 5-minute pass of twisting the filter cutoff and resonance by hand over your sequence. Print it to audio immediately. No midi editing, no second takes. Live with the imperfections.' },
  { name: 'Sub-bass Pocket', instrument: 'Mono Synth', instructions: 'Write a massive sub-bass part (pure sine or triangle) that only ever triggers when the kick drum is completely silent. Absolute zero overlap. Perfect low-end puzzle pieces.' },
];

export const BITWIG_PHASES: PhaseTemplate[] = [
  { name: 'Destructive Bus Processing', instrument: 'Bitwig', instructions: 'Drop a completely random, extreme audio effect (ring mod, bitcrusher, phaser) onto the master or drum bus. Set it to 100% wet. Force yourself to sculpt the mix around this glaring flaw until it becomes a feature.' },
  { name: 'The Subtraction Drop', instrument: 'All', instructions: 'Mute the single most important foundational element of the track (the lead vocal, the kick, or the main bass). Build the entirety of this phase specifically to compensate for that massive sonic gap.' },
  { name: '100% Wet Wash', instrument: 'Bitwig', instructions: 'Send your entire melodic bus into a massive, 100% wet, endlessly decaying shimmer reverb. Resample the resulting wash, reverse it, filter it, and use that audio as your new primary chord progression.' },
  { name: 'Negative Space Arrangement', instrument: 'Bitwig', instructions: 'Drag out a standard 3-minute song structure across the timeline. Now, rigidly delete exactly 50% of the clips across all tracks to create jarring, stark periods of absolute silence.' },
  { name: 'Genre Whiplash', instrument: 'All', instructions: 'For the next phase, treat this track as a fundamentally different genre. (e.g., If it is ambient, program a frantic DnB breakbeat underneath. If it is techno, add a sweeping cinematic string section).' },
  { name: 'The Resampling Drill', instrument: 'Bitwig', instructions: 'Bounce the current master output to a single stereo audio file. Slice it unpredictably, rearrange the chunks, and discard all original MIDI and source tracks. There is no going back.' },
  { name: 'Granular Stretch', instrument: 'Bitwig', instructions: 'Take a microscopic 1-second snippet of what you have so far. Stretch it out to last a full minute using PaulXStretch or a granular engine. Drench it in saturation and use it as a textural bed.' },
];

export const WILDCARD_PHASES: PhaseTemplate[] = [
  { name: 'Hemisphere Swap', instrument: 'Any', instructions: 'Play your primary instrument using the exact opposite hand roles (e.g., force your clumsy left hand to play the intricate lead melody while your right hand holds down the static bass).' },
  { name: 'BPM Whiplash', instrument: 'All', instructions: 'Without warning, change the project tempo by exactly +/- 25 BPM. Do not warp or stretch the existing MIDI to compensate. Re-record parts if they now feel fundamentally broken.' },
  { name: 'The 4-Note Diet', instrument: 'Any', instructions: 'Delete all but 4 MIDI notes from your entire sequence. Make those 4 remaining notes sound absolutely massive via extreme automation, saturation, and spatial effects.' },
  { name: 'Master Bus Demolition', instrument: 'Bitwig', instructions: 'Add a heavy distortion unit or bitcrusher directly to the master bus. Turn the drive up until the mix begins to physically break apart. Mix the rest of the phase into the pain.' },
  { name: 'Found Sound Backbone', instrument: 'Digitakt', instructions: 'Grab your phone. Walk away from the desk. Record 10 seconds of room noise, street ambiance, or kitchen clatter. Load it in and make it the primary rhythmic backbone of the track.' },
];
