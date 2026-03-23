import Link from 'next/link';
import Image from 'next/image';
import { User, Zap, BarChart2, CheckCircle2, SlidersHorizontal, Layers, PlaySquare } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-sonic-neutral text-white selection:bg-sonic-primary/30">
      
      {/* ── Top Navigation ── */}
      <nav className="fixed top-0 w-full z-50 bg-sonic-neutral/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl tracking-tight font-bold">Sonic Sanctuary</div>
          
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/" className="text-sonic-primary font-medium border-b-2 border-sonic-primary pb-1">Missions</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Workspace</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Tracker</Link>
          </div>

          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 hover:border-sonic-primary/50 bg-[#1A1A1A] transition-all">
            <User size={18} className="text-zinc-400" />
          </button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            backgroundPosition: 'center center',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          
          {/* Left: Copy & CTAs */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              <span className="block text-white mb-2">Practice with</span>
              <span className="block text-white mb-2">Purpose.</span>
              <span 
                className="block text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
              >
                Master Your
              </span>
              <span 
                className="block text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
              >
                Craft.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl max-w-md mb-12 leading-relaxed">
              Join Sonic Sanctuary for structured music production missions designed to pull you out of the loop and into the flow.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/app"
                className="flex items-center gap-2 px-8 py-4 bg-sonic-primary hover:bg-sonic-primary/80 text-black font-semibold rounded-lg transition-all"
              >
                Start Your First Mission <Zap size={18} fill="currentColor" />
              </Link>
              <Link 
                href="#studio-api"
                className="px-8 py-4 border border-zinc-800 hover:border-zinc-500 rounded-lg text-zinc-300 font-medium transition-all"
              >
                Explore Studio API
              </Link>
            </div>
          </div>

          {/* Right: Active Transmission Widget */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="absolute -top-12 right-0 text-right">
                <div className="text-5xl font-light text-sonic-primary tracking-tighter">001</div>
                <div className="text-[10px] tracking-widest text-zinc-500 uppercase">Active Transmission</div>
              </div>

              <div className="w-full bg-[#161616] border border-zinc-800 rounded-xl p-8 shadow-2xl shadow-sonic-primary/5">
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3 py-1 bg-sonic-secondary/30 text-sonic-secondary text-[10px] font-bold tracking-widest uppercase rounded">
                    Training Mode
                  </span>
                  <BarChart2 size={16} className="text-sonic-primary" />
                </div>
                
                <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">Current Mission</p>
                <h3 className="text-2xl font-bold text-white mb-10 leading-snug">
                  Advanced Compression Flow
                </h3>

                <div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-sonic-primary rounded-full w-[66%]" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest">
                    <span className="text-zinc-600">PROGRESS</span>
                    <span className="text-sonic-primary">66%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h4 className="text-sonic-primary text-[10px] font-bold tracking-widest uppercase mb-4">The Mission Hub</h4>
            <h2 className="text-3xl font-bold">Structured for Immersion</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#121212] border border-zinc-800 rounded-xl p-8 hover:border-sonic-secondary transition-colors group">
              <div className="w-10 h-10 rounded bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-sonic-secondary/20 transition-colors">
                <SlidersHorizontal size={18} className="text-sonic-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sonic Sculpting</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Master the art of frequency separation and dynamic control through 12 focused mix challenges.
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#1A1A1A] text-zinc-400 text-[10px] tracking-widest font-mono uppercase">EQUALIZATION</span>
                <span className="px-2.5 py-1 rounded bg-[#1A1A1A] text-zinc-400 text-[10px] tracking-widest font-mono uppercase">2 HRS</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#121212] border border-zinc-800 rounded-xl p-8 hover:border-sonic-secondary transition-colors group">
              <div className="w-10 h-10 rounded bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-sonic-secondary/20 transition-colors">
                <Layers size={18} className="text-sonic-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Melodic Architect</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Generate complex motifs from minimalist patterns. A deep dive into theory and flow.
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#1A1A1A] text-zinc-400 text-[10px] tracking-widest font-mono uppercase">COMPOSITION</span>
                <span className="px-2.5 py-1 rounded bg-[#1A1A1A] text-zinc-400 text-[10px] tracking-widest font-mono uppercase">5 HRS</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#121212] border border-zinc-800 rounded-xl p-8 hover:border-sonic-secondary transition-colors group">
              <div className="w-10 h-10 rounded bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-sonic-secondary/20 transition-colors">
                <PlaySquare size={18} className="text-sonic-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Signal Flow Pro</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Optimize your studio environment. From routing logic to hardware integration.
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#1A1A1A] text-zinc-400 text-[10px] tracking-widest font-mono uppercase">WORKFLOW</span>
                <span className="px-2.5 py-1 rounded bg-[#1A1A1A] text-zinc-400 text-[10px] tracking-widest font-mono uppercase">2 HRS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Studio API Section ── */}
      <section id="studio-api" className="py-24 bg-sonic-neutral">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image & Telemetry Widget */}
          <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/3] bg-black">
            <Image 
              src="/studio-api.png" 
              alt="Studio Setup" 
              fill 
              className="object-cover opacity-80"
            />
            
            {/* Telemetry Widget Overlay */}
            <div className="absolute bottom-6 right-6 bg-[#161616]/90 backdrop-blur-md border border-zinc-800 rounded-xl px-6 py-4 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sonic-primary animate-pulse" />
                <span className="text-[9px] text-zinc-400 tracking-widest uppercase">Live Telemetry</span>
              </div>
              <div className="text-3xl font-bold font-mono text-white mb-1">142 BPM</div>
              <div className="text-[8px] text-zinc-500 tracking-widest font-mono">CREATIVE PULSE DETECTED</div>
            </div>
          </div>

          {/* Copy List */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">The Studio API.</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-sonic-primary mb-8">Direct Input to Mastery.</h2>
            
            <p className="text-zinc-400 text-base leading-relaxed mb-10">
              Our proprietary tracking system monitors your session focus, technical accuracy, and harmonic density to provide real-time feedback that actually matters. No fluff, just results.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle2 size={24} className="text-sonic-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Dynamic Mission Pathways</h4>
                  <p className="text-sm text-zinc-500">Course corrects based on your actual DAW session data.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 size={24} className="text-sonic-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Zero-Distraction Mode</h4>
                  <p className="text-sm text-zinc-500">Exclusive desktop client that silences digital noise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-900 bg-[#0A0A0A] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold tracking-tighter text-lg">SONIC SANCTUARY</div>
          
          <div className="flex items-center gap-8 text-[10px] tracking-widest font-mono text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">PRIVACY</Link>
            <Link href="#" className="hover:text-white transition-colors">TERMS</Link>
            <Link href="#" className="hover:text-white transition-colors">SUPPORT</Link>
            <Link href="#studio-api" className="hover:text-white transition-colors">STUDIO API</Link>
          </div>

          <div className="text-[10px] tracking-widest font-mono text-zinc-700">
            © 2026 SONIC SANCTUARY. DESIGNED FOR FLOW.
          </div>
        </div>
      </footer>
    </div>
  );
}
