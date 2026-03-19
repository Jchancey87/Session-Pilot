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
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer chaos-overlay"
      onClick={dismissChaos}
    >
      {/* Animated noise texture overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative text-center px-8 max-w-3xl animate-[chaosIn_0.3s_ease-out_forwards]">
        {/* CHAOS label */}
        <div className="amber-glow opacity-80 text-xs tracking-[0.5em] uppercase font-mono mb-6">
          ◈ OBLIQUE STRATEGY ◈
        </div>

        {/* Strategy text */}
        <p className="amber-glow text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          {chaosStrategy}
        </p>

        {/* Dismiss hint */}
        <p className="amber-glow opacity-50 text-xs tracking-widest uppercase mt-10 font-mono">
          CLICK OR WAIT 8 SECONDS
        </p>
      </div>
    </div>
  );
}
