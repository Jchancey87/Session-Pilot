// ─── Zustand Session State Machine ───────────────────────────────────────────

import { create } from 'zustand';
import { Mission, Phase, MISSIONS } from '@/lib/missions';
import { SessionRecord, generateId } from '@/lib/storage';

export type AppScreen =
  | 'IDLE'           // Mission selector
  | 'PRE_SESSION'    // Project name input
  | 'RUNNING'        // Timer active
  | 'POST_SESSION'   // Save form
  | 'ARCHIVE';       // History list

interface SessionState {
  // ── Screen ────────────────────────────────────────────────────────────────
  screen: AppScreen;

  // ── Mission ───────────────────────────────────────────────────────────────
  selectedMission: Mission | null;
  currentPhaseIndex: number;
  timeRemaining: number;   // seconds
  isRunning: boolean;
  sessionStartTime: number | null;  // Date.now() when session began

  // ── Pre-session fields ────────────────────────────────────────────────────
  projectName: string;
  sessionId: string;

  // ── Chaos ─────────────────────────────────────────────────────────────────
  chaosVisible: boolean;
  chaosStrategy: string;

  // ── Actions ───────────────────────────────────────────────────────────────
  selectMission: (mission: Mission) => void;
  setProjectName: (name: string) => void;
  startSession: () => void;
  tickTimer: () => void;           // called every second by PhaseTimer
  advancePhase: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  triggerChaos: (strategy: string) => void;
  dismissChaos: () => void;
  endSession: () => void;          // go to POST_SESSION
  goToArchive: () => void;
  goHome: () => void;

  // ── Derived helpers ───────────────────────────────────────────────────────
  currentPhase: () => Phase | null;
  pendingSession: () => Partial<SessionRecord>;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  screen: 'IDLE',
  selectedMission: null,
  currentPhaseIndex: 0,
  timeRemaining: 0,
  isRunning: false,
  sessionStartTime: null,
  projectName: '',
  sessionId: generateId(),
  chaosVisible: false,
  chaosStrategy: '',

  selectMission: (mission) =>
    set({ selectedMission: mission, screen: 'PRE_SESSION', currentPhaseIndex: 0 }),

  setProjectName: (name) => set({ projectName: name }),

  startSession: () => {
    const { selectedMission } = get();
    if (!selectedMission) return;
    set({
      screen: 'RUNNING',
      isRunning: true,
      currentPhaseIndex: 0,
      timeRemaining: selectedMission.phases[0].durationSeconds,
      sessionStartTime: Date.now(),
    });
  },

  tickTimer: () => {
    const { timeRemaining, isRunning } = get();
    if (!isRunning) return;
    if (timeRemaining > 0) {
      set({ timeRemaining: timeRemaining - 1 });
    }
    // Auto-advance is handled by PhaseTimer useEffect watching timeRemaining === 0
  },

  advancePhase: () => {
    const { selectedMission, currentPhaseIndex } = get();
    if (!selectedMission) return;
    const nextIndex = currentPhaseIndex + 1;
    if (nextIndex >= selectedMission.phases.length) {
      // Mission complete → POST_SESSION
      set({ isRunning: false, screen: 'POST_SESSION' });
    } else {
      set({
        currentPhaseIndex: nextIndex,
        timeRemaining: selectedMission.phases[nextIndex].durationSeconds,
      });
    }
  },

  pauseTimer: () => set({ isRunning: false }),
  resumeTimer: () => set({ isRunning: true }),

  triggerChaos: (strategy) => set({ chaosVisible: true, chaosStrategy: strategy }),
  dismissChaos: () => set({ chaosVisible: false }),

  endSession: () => set({ isRunning: false, screen: 'POST_SESSION' }),
  goToArchive: () => set({ screen: 'ARCHIVE' }),

  goHome: () =>
    set({
      screen: 'IDLE',
      selectedMission: null,
      currentPhaseIndex: 0,
      timeRemaining: 0,
      isRunning: false,
      projectName: '',
      sessionId: generateId(),
      chaosVisible: false,
    }),

  currentPhase: () => {
    const { selectedMission, currentPhaseIndex } = get();
    return selectedMission?.phases[currentPhaseIndex] ?? null;
  },

  pendingSession: () => {
    const { sessionId, projectName, selectedMission, currentPhaseIndex, sessionStartTime } = get();
    const elapsed = sessionStartTime ? Math.floor((Date.now() - sessionStartTime) / 1000) : 0;
    return {
      id: sessionId,
      date: new Date().toISOString(),
      projectName,
      missionId: selectedMission?.id ?? '',
      missionName: selectedMission?.name ?? '',
      phasesCompleted: currentPhaseIndex + 1,
      totalPhases: selectedMission?.phases.length ?? 0,
      duration: elapsed,
    };
  },
}));

// ─── Convenience: get current mission phases for progress display ─────────────
export const getMissions = () => MISSIONS;
