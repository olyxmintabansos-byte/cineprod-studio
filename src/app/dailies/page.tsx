'use client';

import React, { useState } from 'react';
import {
  Sliders,
  Play,
  RotateCcw,
  Star,
  CheckCircle2,
  AlertCircle,
  Eye,
  Camera,
  Film,
  Layers,
  Sparkles,
  Volume2,
  Tv,
  Download
} from 'lucide-react';
import { useCine } from '@/context/CineContext';
import { DailiesClip, LutPreset } from '@/types/cine';
import confetti from 'canvas-confetti';

export default function DailiesReviewPage() {
  const { dailiesClips, toggleCircleTake, setClipLut, timecode } = useCine();

  const [selectedClipId, setSelectedClipId] = useState<string>(dailiesClips[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'2.39:1' | '16:9' | '4:3'>('2.39:1');
  const [showFalseColor, setShowFalseColor] = useState(false);
  const [showFramingGuides, setShowFramingGuides] = useState(true);

  const activeClip = dailiesClips.find((c) => c.id === selectedClipId) || dailiesClips[0];

  const lutPaletteMap: Record<LutPreset, { name: string; filterClass: string; desc: string }> = {
    KODAK_2383: {
      name: 'Kodak Vision3 2383 Print',
      filterClass: 'contrast-125 saturate-110 sepia-25 hue-rotate-[-5deg]',
      desc: 'Classic Hollywood film stock with warm golden highlights and deep black roll-off.',
    },
    ARRI_709: {
      name: 'Arri Alexa 709 Standard',
      filterClass: 'contrast-105 saturate-100',
      desc: 'Natural neutral documentary color response with linear mid-tones.',
    },
    NOIR_HICON: {
      name: 'Noir High Contrast B&W',
      filterClass: 'grayscale contrast-175 brightness-95',
      desc: 'Dramatic chiaroscuro silver gelatin monochrome. Crushed shadows with brilliant whites.',
    },
    BLEACH_BYPASS: {
      name: 'ENR Bleach Bypass 50%',
      filterClass: 'contrast-150 saturate-50 brightness-90',
      desc: 'Gritty industrial desaturated metallic palette with silver retention.',
    },
    TEAL_ORANGE: {
      name: 'Blockbuster Teal & Orange',
      filterClass: 'contrast-115 hue-rotate-15 saturate-130',
      desc: 'Modern cinematic color grade with cyan shadows and rich skin tone warmth.',
    },
  };

  const handleCircleCelebration = (clip: DailiesClip) => {
    toggleCircleTake(clip.id);
    if (!clip.isCircleTake) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff'],
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b border-zinc-800 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            POST-PRODUCTION & COLOR SCIENCE TELEMETRY
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-100">
            Dailies Review & Color Grading Suite
          </h1>
          <p className="text-zinc-400 text-xs mt-1">
            Reel inspection, 3D LUT preview matrix, SMPTE audio sync verification, and Director Circle Take approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded text-xs font-mono text-zinc-400">
            CIRCLE TAKES APPROVED:{' '}
            <span className="text-amber-400 font-bold">
              {dailiesClips.filter((c) => c.isCircleTake).length} / {dailiesClips.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Viewport Grid: Left Monitor, Right Clip Info & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulated Cine Monitor (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-black border-2 border-zinc-800 rounded-sm p-4 relative overflow-hidden shadow-2xl">
            {/* Monitor Top Overlay Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-900 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-zinc-200 font-bold">ALEXA 35 4.6K OPEN GATE</span>
                <span className="text-zinc-600">|</span>
                <span className="text-amber-400">{activeClip.lens}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{aspectRatio}</span>
                <span className="text-emerald-400 font-bold">{activeClip.fps} FPS</span>
              </div>
            </div>

            {/* Video Viewport Simulated Screen */}
            <div
              className={`w-full bg-[#0a0a0d] relative flex items-center justify-center overflow-hidden border border-zinc-900 transition-all ${
                aspectRatio === '2.39:1'
                  ? 'aspect-[2.39/1]'
                  : aspectRatio === '16:9'
                  ? 'aspect-[16/9]'
                  : 'aspect-[4/3]'
              }`}
            >
              {/* Background Atmospheric Canvas with Filter applied */}
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  lutPaletteMap[activeClip.lutApplied].filterClass
                } ${showFalseColor ? 'brightness-125 saturate-200 hue-rotate-90' : ''}`}
                style={{
                  background:
                    'radial-gradient(ellipse at 40% 40%, rgba(30, 41, 59, 0.9) 0%, rgba(9, 9, 11, 0.95) 75%), linear-gradient(135deg, #18181b 0%, #09090b 100%)',
                }}
              >
                {/* Simulated Film Grain & Dramatic Scene Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <Film className="w-32 h-32 text-zinc-700/50" />
                </div>
              </div>

              {/* Framing Guides Overlay */}
              {showFramingGuides && (
                <div className="absolute inset-0 pointer-events-none border border-zinc-600/30 flex items-center justify-center">
                  <div className="w-16 h-16 border-t border-b border-l border-r border-zinc-500/40 relative">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-500/40"></div>
                    <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-500/40"></div>
                  </div>
                  {/* Aspect Ratio Mattes */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-zinc-500">
                    SAFE ACTION 90%
                  </div>
                </div>
              )}

              {/* False Color Thermal Scale Indicator */}
              {showFalseColor && (
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 rounded text-[9px] font-mono flex items-center justify-between text-zinc-300 border border-zinc-700">
                  <span className="text-purple-400">CLIPPED SHADOW (0 IRE)</span>
                  <span className="text-blue-400">18% GRAY (38 IRE)</span>
                  <span className="text-pink-400">SKIN TONE (55-65 IRE)</span>
                  <span className="text-red-500 font-bold">BLOWN HIGHLIGHT (100 IRE)</span>
                </div>
              )}

              {/* Center Slate Play Badge */}
              <div className="relative z-10 text-center">
                <div className="font-editorial text-xl sm:text-2xl font-bold tracking-widest text-zinc-200">
                  SCENE {activeClip.scene} • TAKE {activeClip.take}
                </div>
                <div className="font-mono text-xs text-amber-400 mt-1">
                  ROLL {activeClip.roll} • {activeClip.timecodeIn}
                </div>
              </div>

              {/* Circle Take Stamp */}
              {activeClip.isCircleTake && (
                <div className="absolute top-4 right-4 z-20 bg-amber-500 text-black px-2.5 py-1 rounded font-mono font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-black" />
                  <span>CIRCLE TAKE</span>
                </div>
              )}
            </div>

            {/* Monitor Controls Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-400' : ''}`} />
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <button
                  onClick={() => setShowFalseColor(!showFalseColor)}
                  className={`px-3 py-1.5 rounded border transition-colors cursor-pointer ${
                    showFalseColor
                      ? 'bg-purple-950 border-purple-500 text-purple-200'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  FALSE COLOR
                </button>
                <button
                  onClick={() => setShowFramingGuides(!showFramingGuides)}
                  className={`px-3 py-1.5 rounded border transition-colors cursor-pointer ${
                    showFramingGuides
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                  }`}
                >
                  GUIDES
                </button>
              </div>

              {/* Aspect Ratio Selector */}
              <div className="flex items-center gap-1">
                {(['2.39:1', '16:9', '4:3'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-2 py-1 rounded text-[10px] cursor-pointer ${
                      aspectRatio === ratio
                        ? 'bg-amber-400 text-black font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Color Grading LUT Matrix */}
          <div className="bg-[#121215] border border-zinc-800 rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>ACTIVE 3D LUT EMULATION PIPELINE</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">COLOR SPACE: ACEScc</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {(Object.keys(lutPaletteMap) as LutPreset[]).map((lutKey) => {
                const isSelected = activeClip.lutApplied === lutKey;
                const lutData = lutPaletteMap[lutKey];
                return (
                  <div
                    key={lutKey}
                    onClick={() => setClipLut(activeClip.id, lutKey)}
                    className={`p-2.5 rounded border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-zinc-800 border-amber-400 shadow'
                        : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-zinc-200">{lutData.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">{lutData.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Take Technical Telemetry & Director Notes (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Clip Header & Circle Take Toggle */}
          <div className="bg-[#121215] border border-zinc-800 rounded p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">INSPECTED CLIP</span>
                <h2 className="font-editorial text-2xl font-bold text-zinc-100">
                  SCENE {activeClip.scene} • TAKE {activeClip.take}
                </h2>
                <div className="font-mono text-xs text-amber-400">ROLL {activeClip.roll}</div>
              </div>

              <button
                onClick={() => handleCircleCelebration(activeClip)}
                className={`px-3 py-2 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeClip.isCircleTake
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${activeClip.isCircleTake ? 'fill-black' : ''}`} />
                <span>{activeClip.isCircleTake ? 'CIRCLE APPROVED' : 'MARK CIRCLE TAKE'}</span>
              </button>
            </div>

            {/* Technical Metadata Table */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/60 p-3 rounded border border-zinc-800">
              <div>
                <span className="text-zinc-500 block text-[10px]">TIMECODE IN</span>
                <span className="text-zinc-200">{activeClip.timecodeIn}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">TIMECODE OUT</span>
                <span className="text-zinc-200">{activeClip.timecodeOut}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">DURATION</span>
                <span className="text-amber-400 font-bold">{activeClip.duration}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">APERTURE / ISO</span>
                <span className="text-zinc-200">
                  {activeClip.aperture} • ISO {activeClip.iso}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">AUDIO SYNC STATUS</span>
                <span
                  className={`font-bold ${
                    activeClip.audioSync === 'LOCKED'
                      ? 'text-emerald-400'
                      : activeClip.audioSync === 'DRIFT_DETECTED'
                      ? 'text-red-400'
                      : 'text-zinc-400'
                  }`}
                >
                  {activeClip.audioSync}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">SOUND ROLL</span>
                <span className="text-zinc-200">{activeClip.soundRoll}</span>
              </div>
            </div>

            {/* Director / Script Supervisor Note */}
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase mb-1">DIRECTOR REMARK</div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 font-editorial text-sm text-zinc-300 rounded italic leading-relaxed">
                &ldquo;{activeClip.directorNote}&rdquo;
              </div>
            </div>
          </div>

          {/* Dailies Reel Queue List */}
          <div className="bg-[#121215] border border-zinc-800 rounded p-4 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              SHOOT DAY REEL LOG ({dailiesClips.length} TAKES)
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {dailiesClips.map((clip) => {
                const isSelected = clip.id === selectedClipId;
                return (
                  <div
                    key={clip.id}
                    onClick={() => setSelectedClipId(clip.id)}
                    className={`p-3 rounded border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-zinc-800 border-amber-400'
                        : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center font-mono text-xs font-bold text-amber-400 border border-zinc-700">
                        {clip.take}
                      </div>
                      <div>
                        <div className="font-editorial text-sm font-bold text-zinc-200">
                          SCENE {clip.scene} • TK {clip.take}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500">
                          {clip.roll} • {clip.duration} • {clip.lens}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {clip.isCircleTake && (
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      )}
                      <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">
                        {clip.lutApplied}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
