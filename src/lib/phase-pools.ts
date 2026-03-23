export interface PhaseTemplate {
  name: string;
  instrument: string;
  instructions: string;
}

export const DIGITAKT_PHASES: PhaseTemplate[] = [
  { name: '1-Pad Challenge', instrument: 'Digitakt', instructions: 'Build a complete 16-step groove using only parameter locks on a single track.' },
  { name: 'Swing Foundation', instrument: 'Digitakt', instructions: 'Program a beat with aggressive swing (>60%). The kick must never hit on the 1.' },
  { name: 'Polyrhythmic Texture', instrument: 'Digitakt', instructions: 'Set one track to a 5/16 scale length and another to 7/16. Let them drift against a straight kick.' },
  { name: 'Vocal Chop Surgery', instrument: 'Digitakt', instructions: 'Sample your own voice or humming. Chop it up and use it as your primary percussive element.' },
  { name: 'Micro-Timing Drill', instrument: 'Digitakt', instructions: 'Nudge every single snare and hi-hat off the grid manually. No quantize allowed.' },
  { name: 'LFO Mayhem', instrument: 'Digitakt', instructions: 'Assign a random LFO to sample start position and another to pitch. Tame the resulting chaos.' },
  { name: 'Bass from a Kick', instrument: 'Digitakt', instructions: 'Take a kick drum, loop a single cycle waveform from it, and play it chromatically as a bassline.' },
];

export const RHODES_PHASES: PhaseTemplate[] = [
  { name: 'Harmonic Cage', instrument: 'Rhodes', instructions: 'You can only use exactly 3 notes from the scale for the entire duration of this phase.' },
  { name: 'Rootless Voicings', instrument: 'Rhodes', instructions: 'Play a 4-chord progression but absolutely no root notes allowed in your left hand.' },
  { name: 'The Drone Lick', instrument: 'Rhodes', instructions: 'Hold down a single bass drone note with a heavy weight or tape. Improvise a slow melody over it.' },
  { name: 'Space Between Chords', instrument: 'Rhodes', instructions: 'Play a chord. Wait exactly 4 bars in silence. Play the next chord. Embrace the awkward empty space.' },
  { name: 'Rhythmic Comping', instrument: 'Rhodes', instructions: 'Treat the keyboard like a drum kit. Two-handed rhythmic stabs only, locked tightly to the pocket.' },
  { name: 'Contrary Motion', instrument: 'Rhodes', instructions: 'Write a progression where the bassline walks down while the top melody line walks exactly up.' },
];

export const SYNTH_PHASES: PhaseTemplate[] = [
  { name: 'Knob Russian Roulette', instrument: 'Mono Synth', instructions: 'Close your eyes. Twist 3 distinct knobs randomly. Open your eyes and build a riff around this new sound.' },
  { name: 'Bass Constriction', instrument: 'Mono Synth', instructions: 'Write a bassline that never moves more than a minor 3rd away from its starting note.' },
  { name: 'Arp Deconstruction', instrument: 'Mono Synth', instructions: 'Turn on the arpeggiator but manually play incredibly slow, disconnected notes to glitch the timing.' },
  { name: 'Filter Sweep Pass', instrument: 'Mono Synth', instructions: 'Record one continuous, live 5-minute filter sweep pass. Commit the audio. No second takes.' },
  { name: 'Sub-bass Pocket', instrument: 'Mono Synth', instructions: 'Write a sub-bass part that only ever plays when the kick drum is completely silent.' },
];

export const BITWIG_PHASES: PhaseTemplate[] = [
  { name: 'Blindfold Texture', instrument: 'Bitwig', instructions: 'Drop a completely random audio effect onto the master or group bus. Force yourself to make it work.' },
  { name: 'The Subtraction Drop', instrument: 'All', instructions: 'Mute the most important foundational element of the track. Build the rest of this phase to compensate for the gap.' },
  { name: '100% Wet Wash', instrument: 'Bitwig', instructions: 'Send the entire mix to a 100% wet giant reverb. Resample the tail, reverse it, use that as your new pad.' },
  { name: 'Ghost Arrangement', instrument: 'Bitwig', instructions: 'Drag out a 3-minute song structure, but rigidly delete exactly 50% of the clips to create stark silence.' },
  { name: 'Genre Warp', instrument: 'All', instructions: 'For the next phase, treat this track as a completely different genre (e.g., add dnb breaks to ambient).' },
  { name: 'Resampling Drill', instrument: 'Bitwig', instructions: 'Bounce the current master out to audio. Slice it unpredictably. Discard all original MIDI.' },
  { name: 'Granular Stretch', instrument: 'Bitwig', instructions: 'Take a 1-second snippet of what you have so far, stretch it to 1 minute, and drench it in shimmer.' },
];

export const WILDCARD_PHASES: PhaseTemplate[] = [
  { name: 'Switch Hands', instrument: 'Any', instructions: 'Play your primary instrument using the opposite hand roles (e.g., left hand melodies, right hand chords/bass).' },
  { name: 'BPM Roulette', instrument: 'All', instructions: 'Immediately change the project tempo by exactly +/- 25 BPM without moving any MIDI. See how it feels.' },
  { name: 'The 4-note Constraint', instrument: 'Any', instructions: 'Delete all but 4 MIDI notes from your sequence. Make those 4 notes sound massive via automation.' },
  { name: 'Total Demolition', instrument: 'Bitwig', instructions: 'Add a distortion or bitcrusher to the master bus. Turn it up until it breaks. Mix into the pain.' },
  { name: 'Field Recording', instrument: 'Digitakt', instructions: 'Grab your phone. Record 10 seconds of room noise or outside street sounds. Make it the rhythmic backbone.' },
];
