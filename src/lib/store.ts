// ─── Zustand Session State Machine ───────────────────────────────────────────

import { create } from 'zustand';
import { Mission, Phase, MISSIONS } from '@/lib/missions';
import { SessionRecord, generateId, getSessions, saveSession, deleteSession, migrateFromLocalStorage } from '@/lib/storage';
import { getStrategyForInstrument } from '@/lib/strategies';
import { playChaosChime, playTransitionChime } from '@/lib/audio';

export type AppScreen =
  | 'IDLE'           // Mission selector
  | 'PRE_SESSION'    // Project name input
  | 'RUNNING'        // Timer active
  | 'PHASE_TRANSITION' // Between stages
  | 'POST_SESSION'   // Save form
  | 'ARCHIVE';       // History list

interface SessionState {
  // ... current fields ...
  screen: AppScreen;
  selectedMission: Mission | null;
  currentPhaseIndex: number;
  timeRemaining: number;
  isRunning: boolean;
  sessionStartTime: number | null;
  projectName: string;
  sessionId: string;
  chaosVisible: boolean;
  chaosStrategy: string;
  capturedChaosStrategies: string[];
  autoChaosFiredThisPhase: boolean;
  
  // Persistent data
  sessions: SessionRecord[];
  isLoading: boolean;

  // Actions
  selectMission: (mission: Mission) => void;
  setProjectName: (name: string) => void;
  startSession: () => void;
  tickTimer: () => void;
  advancePhase: () => void;
  startNextPhase: () => void; // New action to exit transition
  pauseTimer: () => void;
  resumeTimer: () => void;
  triggerChaos: (strategy?: string) => void;
  dismissChaos: () => void;
  endSession: () => void;
  goToArchive: () => void;
  goHome: () => void;
  replayMission: (missionId: string) => void;
  currentPhase: () => Phase | null;
  pendingSession: () => Partial<SessionRecord>;
  
  // Async Data Actions
  fetchSessions: () => Promise<void>;
  saveCurrentSession: (overrides: Partial<SessionRecord>) => Promise<void>;
  removeSession: (id: string) => Promise<void>;
  migrateData: () => Promise<number>;
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
  capturedChaosStrategies: [],
  autoChaosFiredThisPhase: false,
  sessions: [],
  isLoading: false,

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
      capturedChaosStrategies: [],
      autoChaosFiredThisPhase: false,
    });
  },

  tickTimer: () => {
    const {
      timeRemaining, isRunning, selectedMission,
      currentPhaseIndex, autoChaosFiredThisPhase, chaosVisible,
      advancePhase
    } = get();
    if (!isRunning) return;

    if (timeRemaining > 0) {
      set({ timeRemaining: timeRemaining - 1 });
    } else {
      // Auto-advance
      advancePhase();
    }

    // Auto-fire chaos at 30% of phase elapsed
    if (!autoChaosFiredThisPhase && !chaosVisible && selectedMission) {
      const phase = selectedMission.phases[currentPhaseIndex];
      const elapsed = phase.durationSeconds - timeRemaining;
      const triggerAt = Math.floor(phase.durationSeconds * 0.3);
      if (elapsed >= triggerAt && elapsed > 0) {
        const strategy = getStrategyForInstrument(phase.instrument);
        playChaosChime();
        set({
          chaosVisible: true,
          chaosStrategy: strategy,
          capturedChaosStrategies: [...get().capturedChaosStrategies, strategy],
          autoChaosFiredThisPhase: true,
        });
      }
    }
  },

  advancePhase: () => {
    const { selectedMission, currentPhaseIndex } = get();
    if (!selectedMission) return;
    
    // Play transition chime
    playTransitionChime();

    if (currentPhaseIndex >= selectedMission.phases.length - 1) {
      // Mission complete → POST_SESSION
      set({ isRunning: false, screen: 'POST_SESSION' });
    } else {
      // Transition state
      set({ 
        isRunning: false, 
        screen: 'PHASE_TRANSITION',
        autoChaosFiredThisPhase: false 
      });
    }
  },

  startNextPhase: () => {
    const { selectedMission, currentPhaseIndex } = get();
    if (!selectedMission) return;
    const nextIndex = currentPhaseIndex + 1;
    set({
      screen: 'RUNNING',
      isRunning: true,
      currentPhaseIndex: nextIndex,
      timeRemaining: selectedMission.phases[nextIndex].durationSeconds,
    });
  },

  pauseTimer: () => set({ isRunning: false }),
  resumeTimer: () => set({ isRunning: true }),

  triggerChaos: (strategy) => {
    set((state) => {
      const generatedStrategy = strategy || getStrategyForInstrument(state.selectedMission?.phases[state.currentPhaseIndex]?.instrument || 'General');
      return {
        chaosVisible: true,
        chaosStrategy: generatedStrategy,
        // Record manual chaos triggers in history too
        capturedChaosStrategies: [...state.capturedChaosStrategies, generatedStrategy],
      };
    });
  },

  dismissChaos: () => set({ chaosVisible: false }),

  endSession: () => set({ isRunning: false, screen: 'POST_SESSION' }),
  goToArchive: () => set({ screen: 'ARCHIVE' }),

  replayMission: (missionId: string) => {
    const mission = MISSIONS.find((m) => m.id === missionId);
    if (!mission) return;
    set({
      selectedMission: mission,
      screen: 'PRE_SESSION',
      currentPhaseIndex: 0,
      projectName: '',
      sessionId: generateId(),
      capturedChaosStrategies: [],
      autoChaosFiredThisPhase: false,
    });
  },

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
      capturedChaosStrategies: [],
      autoChaosFiredThisPhase: false,
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

  fetchSessions: async () => {
    set({ isLoading: true });
    const sessions = await getSessions();
    set({ sessions, isLoading: false });
  },

  saveCurrentSession: async (overrides) => {
    const { pendingSession } = get();
    const sessionToSave = { ...pendingSession(), ...overrides } as SessionRecord;
    await saveSession(sessionToSave);
    await get().fetchSessions(); // Refresh list
  },

  removeSession: async (id) => {
    await deleteSession(id);
    await get().fetchSessions(); // Refresh list
  },

  migrateData: async () => {
    const count = await migrateFromLocalStorage();
    if (count > 0) {
      await get().fetchSessions();
    }
    return count;
  },
}));

// ─── Convenience: get current mission phases for progress display ─────────────
export const getMissions = () => MISSIONS;
