'use client';

import { useState, useEffect } from 'react';
import { Award, Clock, Sliders, Activity, MoreVertical, LayoutGrid, Headphones, Loader2, Database } from 'lucide-react';
import { useSessionStore } from '@/lib/store';

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s focus`;
  const m = Math.floor(seconds / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m focus`;
  return `${m}m focus`;
}

export default function Tracker() {
  const sessions = useSessionStore((s) => s.sessions);
  const isLoading = useSessionStore((s) => s.isLoading);
  const fetchSessions = useSessionStore((s) => s.fetchSessions);
  const removeSession = useSessionStore((s) => s.removeSession);
  const migrateData = useSessionStore((s) => s.migrateData);

  const [migrationCount, setMigrationCount] = useState<number | null>(null);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useEffect(() => {
    // Check for local storage data to suggest migration
    const localData = localStorage.getItem('session-pilot-sessions');
    if (localData) {
      const parsed = JSON.parse(localData);
      if (parsed.length > 0) {
        setMigrationCount(parsed.length);
      }
    }
  }, []);

  const handleMigrate = async () => {
    const count = await migrateData();
    if (count > 0) {
      setMigrationCount(null);
      alert(`Successfully migrated ${count} sessions to your home server!`);
    }
  };

  // Calculate Mastery Index
  const masteryIndex = sessions.length > 0 
    ? Math.min(100, Math.floor((sessions.reduce((acc, s) => acc + (s.phasesCompleted / Math.max(s.totalPhases, 1)), 0) / sessions.length) * 100))
    : 0;

  // Calculate Waveform (30 days)
  const today = new Date();
  today.setHours(0,0,0,0);
  
  const waveformHeights = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    
    // Find sessions for this day
    const daySessions = sessions.filter(s => {
      const sDate = new Date(s.date);
      return sDate.getFullYear() === d.getFullYear() && 
             sDate.getMonth() === d.getMonth() && 
             sDate.getDate() === d.getDate();
    });

    // Score based on total duration (maxes out visually at around 2 hours)
    const totalDuration = daySessions.reduce((acc, s) => acc + s.duration, 0);
    const maxDuration = 7200; // 2 hours in seconds
    const heightRatio = totalDuration > 0 ? Math.max(0.1, Math.min(1, totalDuration / maxDuration)) : 0.1;
    
    return {
      height: Math.floor(heightRatio * 10), // 1 to 10
      isActive: daySessions.length > 0
    };
  });
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
      {/* ── Header ── */}
      <div className="mb-12">
        <h4 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-4 border-t-2 border-sonic-secondary w-12 pt-4">
          PERSONAL GROWTH
        </h4>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight text-white">Sonic Evolution</h1>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              Your journey through the soundscape. Every mission completed is 
              a frequency mastered in your technical sanctuary.
            </p>
          </div>
          <div className="md:text-right">
            <h2 className="text-5xl font-light text-sonic-primary tracking-tighter">{masteryIndex}%</h2>
            <p className="text-[9px] text-zinc-500 tracking-widest uppercase font-mono mt-2">
              MASTERY INDEX
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        {/* ── Activity Waveform ── */}
        <div className="lg:col-span-8 bg-[#121212] border border-zinc-800 rounded-xl p-8 flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Activity Waveform</h3>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Focus intensity over the last 30 days</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sonic-primary animate-pulse" />
              <span className="text-[8px] text-sonic-primary tracking-widest uppercase font-mono">LIVE TRACKING</span>
            </div>
          </div>
          
          <div className="w-full flex items-end justify-between items-stretch h-32 gap-1.5">
            {waveformHeights.map((day, i) => {
              return (
                <div 
                  key={i} 
                  className={`w-full rounded-t-sm transition-all duration-500 ${day.isActive ? 'bg-sonic-primary shadow-[0_0_12px_rgba(0,245,255,0.4)]' : 'bg-zinc-800'}`} 
                  style={{ height: `${Math.max(day.height, 1) * 10}%` }} 
                  title={day.isActive ? 'Active Day' : 'Rest Day'}
                />
              );
            })}
          </div>
          
          <div className="flex justify-between items-center mt-6 text-[9px] text-zinc-600 font-mono tracking-widest uppercase">
            <span>OCT 01</span>
            <span>OCT 15</span>
            <span>PRESENT</span>
          </div>
        </div>

        {/* ── Milestones ── */}
        <div className="lg:col-span-4 bg-[#0A0A0A] border border-zinc-900 rounded-xl flex flex-col">
          <div className="p-6">
            <h3 className="text-sm font-bold text-white mb-1">Milestones</h3>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Unlocked accolades</p>
          </div>
          
          <div className="flex-1 px-6 pb-6 grid grid-cols-2 gap-4">
            <div className={`bg-[#1A1A1A] rounded-xl flex flex-col items-center justify-center p-4 border transition-colors ${sessions.length >= 10 ? 'border-sonic-primary/50' : 'border-zinc-800 opacity-60'}`}>
              <Award size={20} className={`${sessions.length >= 10 ? 'text-sonic-primary' : 'text-zinc-600'} mb-3`} />
              <span className={`text-[8px] font-mono tracking-widest uppercase ${sessions.length >= 10 ? 'text-zinc-400' : 'text-zinc-600'}`}>10 MISSIONS</span>
            </div>
            <div className="bg-[#121212] rounded-xl flex flex-col items-center justify-center p-4 border border-zinc-800 opacity-60">
              <Activity size={20} className="text-zinc-600 mb-3" />
              <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-600">EAR TRAINING V</span>
            </div>
            <div className="bg-[#1A1A1A] rounded-xl flex flex-col items-center justify-center p-4 border border-zinc-800 hover:border-sonic-primary/50 transition-colors">
              <Clock size={20} className="text-sonic-primary mb-3" />
              <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-400">FLOW STATE</span>
            </div>
            <div className="bg-[#121212] rounded-xl flex flex-col items-center justify-center p-4 border border-zinc-800 opacity-60">
              <Sliders size={20} className="text-zinc-600 mb-3" />
              <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-600">MIXING KING</span>
            </div>
          </div>
          
          <div className="p-4 border-t border-zinc-900">
            <button className="w-full py-3 bg-[#121212] hover:bg-[#1A1A1A] rounded text-[10px] font-mono tracking-widest text-sonic-secondary transition-colors">
              VIEW ALL 14 BADGES
            </button>
          </div>
        </div>
      </div>

      {/* ── Migration Alert ── */}
      {migrationCount !== null && (
        <div className="mb-12 p-6 bg-sonic-primary/10 border border-sonic-primary/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,245,255,0.05)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sonic-primary/20 flex items-center justify-center">
              <Database className="text-sonic-primary" size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold leading-tight">Local Data Found</h3>
              <p className="text-zinc-500 text-xs">You have {migrationCount} sessions stored on this device. Sync them to your home server?</p>
            </div>
          </div>
          <button 
            onClick={handleMigrate}
            className="px-6 py-2.5 bg-sonic-primary hover:bg-sonic-primary/80 text-black font-bold text-xs rounded-lg transition-all shadow-[0_0_15px_rgba(0,245,255,0.2)]"
          >
            SYNC TO POSTGRESQL
          </button>
        </div>
      )}

      {/* ── Mission Archive ── */}
      <div className="mb-20">
        <div className="flex justify-between items-end mb-8 border-b border-zinc-900 pb-4">
          <h2 className="text-2xl font-bold text-white">Mission Archive</h2>
          <div className="flex gap-4">
            <button className="px-4 py-1.5 rounded-full bg-sonic-secondary/20 text-sonic-secondary text-[10px] font-mono tracking-widest font-bold">ALL TIME</button>
            <button className="px-4 py-1.5 text-zinc-500 hover:text-white text-[10px] font-mono tracking-widest transition-colors">BY TYPE</button>
          </div>
        </div>

        <div className="space-y-3">
          {sessions.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm border border-zinc-900 rounded-lg border-dashed">
              No deployed missions yet. Initialize a session to begin tracking.
            </div>
          ) : (
            sessions.map((session, i) => {
              const dateStr = new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const score = Math.floor((session.phasesCompleted / session.totalPhases) * 100);
              
              return (
                <div key={session.id || i} className="flex items-center justify-between p-4 bg-[#121212] border border-zinc-800 rounded-lg hover:border-sonic-secondary/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-[#1A1A1A] flex items-center justify-center">
                      <LayoutGrid size={14} className="text-zinc-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-sonic-secondary transition-colors">{session.missionName}</h4>
                      <p className="text-[10px] text-zinc-600 font-mono">Completed {dateStr} • {formatDuration(session.duration)} • {session.projectName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="block text-[8px] text-zinc-600 font-mono tracking-widest">SCORE</span>
                      <span className="block text-sm font-bold text-sonic-primary">{score}%</span>
                    </div>
                    <button 
                      onClick={() => removeSession(session.id)}
                      className="text-zinc-600 hover:text-red-500 transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Evolution Path ── */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-zinc-900 pb-4">Evolution Path</h2>
        
        <div className="relative border-l border-zinc-800 ml-3 space-y-12 pb-8">
          {/* Node 1 */}
          <div className="relative pl-8">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-sonic-primary shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
            <h5 className="text-[9px] text-sonic-primary font-bold tracking-widest font-mono uppercase mb-2">LEVEL 04 ACHIEVED</h5>
            <h3 className="text-lg font-bold text-white mb-2">Sonic Architect</h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              Gained proficiency in multi-band dynamics and spatial acoustics. Missions now focus on full production pipelines.
            </p>
          </div>

          {/* Node 2 */}
          <div className="relative pl-8 opacity-60">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-700 border-2 border-[#0A0A0A]" />
            <h5 className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mb-2">SEPT 24, 2024</h5>
            <h3 className="text-lg font-bold text-zinc-300 mb-2">Signal Path Specialist</h3>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-lg">
              Mastered the routing and processing chains across major software environments.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
