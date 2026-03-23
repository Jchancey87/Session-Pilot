// ─── API & Persistent Storage (PostgreSQL via Next.js API) ───────────────────

export interface SessionRecord {
  id: string;
  date: string;            // ISO string
  projectName: string;
  missionId: string;
  missionName: string;
  phasesCompleted: number;
  totalPhases: number;
  duration: number;        // seconds actually elapsed
  digitaktPattern?: string;
  rhodesSettings?: string;
  synthPatch?: string;
  notes?: string;
  energyRating?: number;          // 1–5
  moodEmoji?: string;             // ⚡ 🔥 💤 🌀 🎯
  chaosStrategiesUsed?: string[]; // strategies triggered during the session
  isFavorite?: boolean;
}

const STORAGE_KEY = 'session-pilot-sessions';

/**
 * Fetch all sessions from the database
 */
export async function getSessions(): Promise<SessionRecord[]> {
  try {
    const res = await fetch('/api/sessions');
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

/**
 * Save or update a session in the database
 */
export async function saveSession(session: SessionRecord): Promise<void> {
  try {
    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
    if (!res.ok) throw new Error('Failed to save');
  } catch (error) {
    console.error('API Error:', error);
    // Fallback? For now just log.
  }
}

/**
 * Delete a session from the database
 */
export async function deleteSession(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/sessions/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete');
  } catch (error) {
    console.error('API Error:', error);
  }
}

/**
 * Utility to migrate data from localStorage to PostgreSQL
 */
export async function migrateFromLocalStorage(): Promise<number> {
  if (typeof window === 'undefined') return 0;
  
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return 0;

  try {
    const localSessions = JSON.parse(raw) as SessionRecord[];
    if (localSessions.length === 0) return 0;

    console.log(`Migrating ${localSessions.length} sessions to PostgreSQL...`);
    
    for (const session of localSessions) {
      await saveSession(session);
    }

    // Clear localStorage after successful migration
    localStorage.removeItem(STORAGE_KEY);
    return localSessions.length;
  } catch (error) {
    console.error('Migration failed:', error);
    return 0;
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

