// ─── LocalStorage Persistence ────────────────────────────────────────────────

export interface SessionRecord {
  id: string;
  date: string;            // ISO string
  projectName: string;
  missionId: string;
  missionName: string;
  phasesCompleted: number;
  totalPhases: number;
  duration: number;        // seconds actually elapsed
  digitaktPattern: string;
  rhodesSettings: string;
  synthPatch: string;
  notes: string;
}

const STORAGE_KEY = 'session-pilot-sessions';

export function getSessions(): SessionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SessionRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveSession(session: SessionRecord): void {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  const existing = sessions.findIndex((s) => s.id === session.id);
  if (existing >= 0) {
    sessions[existing] = session;
  } else {
    sessions.unshift(session); // newest first
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function deleteSession(id: string): void {
  if (typeof window === 'undefined') return;
  const sessions = getSessions().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
