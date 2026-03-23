'use client';

import { useEffect, useCallback } from 'react';
import { useSessionStore } from '@/lib/store';
import { getStrategyForInstrument } from '@/lib/strategies';
import { playChaosChime } from '@/lib/audio';
import { Shuffle } from 'lucide-react';

export function ChaosButton() {
  const triggerChaos = useSessionStore((s) => s.triggerChaos);
  const chaosVisible = useSessionStore((s) => s.chaosVisible);
  const currentPhase = useSessionStore((s) => s.currentPhase)();

  const fire = useCallback(() => {
    if (chaosVisible) return; // Don't stack
    const strategy = getStrategyForInstrument(currentPhase?.instrument ?? '');
    playChaosChime();
    triggerChaos(strategy);
  }, [triggerChaos, chaosVisible, currentPhase]);

  // C key shortcut (Space is now reserved for pause/resume in PhaseTimer)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.code === 'KeyC') {
        e.preventDefault();
        fire();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fire]);

  return (
    <button
      id="chaos-btn"
      onClick={fire}
      className="group flex items-center gap-3 px-8 py-5 rounded-2xl border border-sonic-secondary/50
        bg-sonic-secondary/20 hover:bg-sonic-primary hover:border-sonic-primary text-sonic-primary hover:text-sonic-neutral
        font-bold text-lg tracking-widest uppercase transition-all duration-200
        active:scale-95 shadow-lg shadow-sonic-primary/10 hover:shadow-sonic-primary/30
        min-w-[200px] justify-center"
    >
      <Shuffle size={20} className="transition-transform group-hover:rotate-180 duration-300" />
      CHAOS
    </button>
  );
}

