'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Clapperboard, Video, Sliders, Users, Radio, Clock, ShieldAlert } from 'lucide-react';
import { useCine } from '@/context/CineContext';

export function Navbar() {
  const pathname = usePathname();
  const { meta, timecode, activeSlate } = useCine();

  const navLinks = [
    { href: '/', label: 'CALL SHEET', icon: Clapperboard, sub: 'DAY OVERVIEW' },
    { href: '/scenes/', label: 'SCENE BREAKDOWN', icon: Film, sub: 'SCRIPT SUPERVISOR' },
    { href: '/dailies/', label: 'DAILIES & COLOR', icon: Sliders, sub: 'LUT / WAVEFORM' },
    { href: '/crew/', label: 'CREW DISPATCH', icon: Users, sub: 'DEPARTMENTS' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800">
      {/* Top Film Slate Bar */}
      <div className="bg-[#121215] border-b border-zinc-900 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between text-zinc-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-amber-400">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
            <span className="uppercase">PRODUCTION LIVE:</span>
            <span className="text-zinc-100 font-editorial tracking-normal font-semibold">
              {meta.productionTitle}
            </span>
          </div>
          <span className="hidden sm:inline-block text-zinc-600">|</span>
          <span className="hidden sm:inline-block">DAY {meta.dayNumber} OF {meta.totalDays}</span>
          <span className="hidden md:inline-block text-zinc-600">|</span>
          <span className="hidden md:inline-block font-mono">DIR: {meta.director}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-black px-2.5 py-0.5 rounded border border-zinc-800 text-[11px] font-mono">
            <span className="text-zinc-500">SLATE:</span>
            <span className="text-amber-400 font-bold">{activeSlate.roll}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">SC {activeSlate.scene}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-bold">TK {activeSlate.take}</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs bg-zinc-950 px-2.5 py-0.5 rounded border border-red-950/60 text-red-400">
            <Clock className="w-3 h-3 text-red-500 animate-spin" />
            <span className="timecode-mono font-bold tracking-wider">{timecode}</span>
            <span className="text-[9px] text-red-500/80 uppercase">NDF 24FPS</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-zinc-700 flex items-center justify-center clapper-stripes group-hover:border-amber-400 transition-colors">
              <div className="w-6 h-6 bg-black rounded-xs flex items-center justify-center">
                <Film className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="font-editorial text-lg font-bold tracking-tight text-zinc-100 flex items-center gap-1.5">
                CINEPROD <span className="font-sans text-[10px] tracking-widest px-1.5 py-0.5 bg-amber-400 text-black font-extrabold uppercase rounded-xs">STUDIO</span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                TITAN #36 • MAGAZINE EDITORIAL NOIR
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col px-3.5 py-2 rounded-sm transition-all border ${
                    isActive
                      ? 'bg-zinc-800/90 text-amber-400 border-amber-500/40 shadow-inner'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                    <span className="text-xs font-bold tracking-wider uppercase font-sans">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 pl-5 tracking-tight">
                    {item.sub}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`[STAGE 4 DISPATCH BROADCAST]\nSound Bell Ringing!\nCamera Rolling on Scene ${activeSlate.scene} Take ${activeSlate.take}.\nAll departments stand by.`)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">BELL & ROLL</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
