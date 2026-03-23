'use client';

import { useState } from 'react';
import { useSessionStore } from '@/lib/store';
import { getMissions } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Play, Clock, Lock, HeartPulse } from 'lucide-react';
import { PreSessionForm } from '@/components/PreSessionForm';

export default function MissionsDashboard() {
  const router = useRouter();
  const selectMission = useSessionStore((s) => s.selectMission);
  const startSession = useSessionStore((s) => s.startSession);
  const missions = getMissions();
  const [activeCategory, setActiveCategory] = useState<string>('All Missions');

  const displayMissions = missions.filter(m => 
    activeCategory === 'All Missions' ? true : m.category?.toUpperCase() === activeCategory.toUpperCase()
  );

  const handleStartMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;
    
    // Selecting the mission automatically sets the store screen to 'PRE_SESSION',
    // triggering the new PreSessionForm modal overlay to appear.
    selectMission(mission);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h4 className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-4 border-t-2 border-sonic-secondary w-12 pt-4">
          PRODUCER DASHBOARD
        </h4>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Current Missions</h1>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              Refine your sonic signature through focused daily rituals. 
              Your path to mastery is composed of intent and repetition.
            </p>
          </div>
          <div className="md:text-right">
            <h2 className="text-5xl font-light text-sonic-primary tracking-tighter">74%</h2>
            <p className="text-[9px] text-zinc-500 tracking-widest uppercase font-mono mt-2">
              WEEKLY FLOW STATE
            </p>
          </div>
        </div>
      </div>
      
      {/* ── Filter Pills ── */}
      <div className="flex flex-wrap gap-3 mb-10">
        {['All Missions', 'Sound Design', 'Arrangement', 'Mixing', 'Mastering'].map(filter => {
          const isActive = activeCategory === filter;
          return (
            <button 
              key={filter}
              onClick={() => setActiveCategory(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-sonic-secondary/20 text-sonic-secondary border border-sonic-secondary/30' 
                  : 'bg-[#1A1A1A] text-zinc-400 border border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* ── Mission Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {displayMissions.map((mission, idx) => {
          const isLocked = mission.id === 'granular-textures';
          const isResuming = mission.id === 'vocal-spatialization'; // matching design

          return (
            <div 
              key={mission.id} 
              className={`relative bg-[#121212] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between group overflow-hidden ${isLocked ? 'opacity-60' : 'hover:border-sonic-secondary/50'} transition-all min-h-[220px]`}
            >
              {isResuming && (
                <div className="absolute top-0 left-0 w-1 h-full bg-sonic-primary" />
              )}
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-[#1A1A1A] rounded text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                    {mission.category || 'MISSION'}
                  </span>
                  
                  {isResuming && <HeartPulse size={16} className="text-sonic-primary" />}
                  {isLocked && <Lock size={14} className="text-zinc-600" />}
                </div>

                <h3 className="text-xl font-bold mb-2">{mission.name}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                  {mission.description || mission.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-2 text-zinc-600">
                  <Clock size={12} />
                  <span className="text-[10px] font-mono">{mission.totalMinutes > 0 ? `${mission.totalMinutes} min` : '--'}</span>
                </div>

                {!isLocked && (
                  <button 
                    onClick={() => handleStartMission(mission.id)}
                    className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
                      isResuming 
                        ? 'bg-white text-black hover:bg-zinc-200' 
                        : 'bg-transparent border border-zinc-700 hover:border-white'
                    }`}
                  >
                    {isResuming ? 'RESUME MISSION' : 'START'}
                  </button>
                )}
                {isLocked && (
                  <div className="w-1/2 h-1 bg-zinc-800 rounded-full" />
                )}
              </div>
            </div>
          );
        })}

        {/* ── Producer Insight Widget ── */}
        <div className="bg-[#121212] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-sonic-primary uppercase font-bold italic mb-4">
              PRODUCER INSIGHT
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Your mixing speed has increased by 12% this week. Focus on "Phase Alignment" next.
            </p>
          </div>
          <div className="flex items-end gap-1.5 h-12 mt-6">
            {[4, 6, 8, 3, 7, 5, 9].map((h, i) => (
              <div key={i} className="w-2 bg-sonic-primary rounded-sm" style={{ height: `${h * 10}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Exploration ── */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#101010] border border-zinc-800 p-12">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 80% 50%, #00F5FF 0%, transparent 50%)'
        }} />
        
        <div className="relative z-10 max-w-lg">
          <h4 className="text-sonic-primary text-[10px] font-bold tracking-widest uppercase mb-4 tracking-widest">
            FEATURED EXPLORATION
          </h4>
          <h2 className="text-4xl font-bold mb-4">Acoustic Archeology</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Transform found sounds into playable instruments using creative sampling and impulse response modeling.
          </p>
          <button className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-colors">
            BEGIN EXPEDITION
          </button>
        </div>
      </div>

      <PreSessionForm />
    </div>
  );
}
