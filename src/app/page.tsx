'use client';

import { useSessionStore } from '@/lib/store';
import { MissionSelector } from '@/components/MissionSelector';
import { PreSessionForm } from '@/components/PreSessionForm';
import { PhaseTimer } from '@/components/PhaseTimer';
import { ChaosButton } from '@/components/ChaosButton';
import { ChaosOverlay } from '@/components/ChaosOverlay';
import { PostSessionForm } from '@/components/PostSessionForm';
import { SessionArchive } from '@/components/SessionArchive';

export default function Home() {
  const screen = useSessionStore((s) => s.screen);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Status indicator — always visible at top */}
      <div className="fixed top-4 right-4 z-10 flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            screen === 'RUNNING' ? 'bg-red-400 animate-pulse' : 'bg-zinc-700'
          }`}
        />
        <span className="text-zinc-700 text-xs tracking-widest uppercase">
          {screen === 'RUNNING' ? 'REC' : screen.replace('_', ' ')}
        </span>
      </div>

      {/* Screen switcher */}
      <div className="w-full flex items-center justify-center">
        {screen === 'IDLE' && <MissionSelector />}
        {screen === 'PRE_SESSION' && <PreSessionForm />}

        {screen === 'RUNNING' && (
          <div className="w-full flex flex-col items-center gap-8">
            <PhaseTimer />
            <ChaosButton />
            <p className="text-zinc-700 text-xs tracking-widest">
              PRESS SPACEBAR FOR OBLIQUE STRATEGY
            </p>
          </div>
        )}

        {screen === 'POST_SESSION' && <PostSessionForm />}
        {screen === 'ARCHIVE' && <SessionArchive />}
      </div>

      {/* Chaos overlay — rendered globally so it covers everything */}
      <ChaosOverlay />
    </main>
  );
}
