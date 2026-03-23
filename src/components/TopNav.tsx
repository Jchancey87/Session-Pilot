'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

export default function TopNav() {
  const pathname = usePathname() || '';

  const navItems = [
    { label: 'Missions', path: '/app/missions' },
    { label: 'Workspace', path: '/app/workspace' },
    { label: 'Tracker', path: '/app/tracker' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl tracking-tight font-bold hover:text-sonic-primary transition-colors">
          Sonic Sanctuary
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`pb-1 transition-colors ${
                  isActive 
                    ? 'text-sonic-primary font-medium border-b-2 border-sonic-primary' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 hover:border-sonic-primary/50 bg-[#1A1A1A] transition-all">
          <User size={14} className="text-sonic-primary" />
        </button>
      </div>
    </nav>
  );
}
