'use client';

import { useEffect, useCallback } from 'react';
import { useSessionStore } from '@/lib/store';
import { getRandomStrategy } from '@/lib/strategies';
import { Shuffle } from 'lucide-react';

export function ChaosButton() {
  const triggerChaos = useSessionStore((s) => s.triggerChaos);
  const chaosVisible = useSessionStore((s) => s.chaosVisible);

  const fire = useCallback(() => {
    if (chaosVisible) return; // Don't stack
    triggerChaos(getRandomStrategy());
  }, [triggerChaos, chaosVisible]);

  // Spacebar shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.code === 'Space') {
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
      className="group flex items-center gap-3 px-8 py-5 rounded-2xl border-2 border-amber-500
        bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black
        font-bold text-lg tracking-widest uppercase transition-all duration-200
        active:scale-95 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30
        min-w-[200px] justify-center"
    >
      <Shuffle size={20} className="transition-transform group-hover:rotate-180 duration-300" />
      CHAOS
    </button>
  );
}
