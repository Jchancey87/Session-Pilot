'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/lib/store';

export function ChaosOverlay() {
  const chaosVisible = useSessionStore((s) => s.chaosVisible);
  const chaosStrategy = useSessionStore((s) => s.chaosStrategy);
  const dismissChaos = useSessionStore((s) => s.dismissChaos);

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (!chaosVisible) return;
    const timer = setTimeout(() => dismissChaos(), 8000);
    return () => clearTimeout(timer);
  }, [chaosVisible, dismissChaos]);

  if (!chaosVisible) return null;

  return (
    <div
      id="chaos-overlay"
      className="fixed inset-0 z-[200] flex items-center justify-center cursor-pointer bg-[#0A0A0A]/80 backdrop-blur-2xl transition-all duration-500"
      onClick={dismissChaos}
    >
      {/* Animated noise texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-sonic-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative text-center px-8 max-w-4xl animate-[chaosIn_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        {/* CHAOS label */}
        <div className="text-sonic-primary opacity-80 text-[10px] tracking-[0.5em] uppercase font-mono mb-8 flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-sonic-primary/50" />
          OBLIQUE STRATEGY
          <span className="w-8 h-px bg-sonic-primary/50" />
        </div>

        {/* Strategy text */}
        <p className="text-white drop-shadow-[0_0_30px_rgba(0,245,255,0.4)] text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          {chaosStrategy}
        </p>

        {/* Dismiss hint */}
        <p className="text-zinc-500 opacity-60 text-[10px] tracking-[0.2em] uppercase mt-16 font-mono">
          CLICK ANYWHERE TO ACKNOWLEDGE
        </p>
      </div>
    </div>
  );
}
