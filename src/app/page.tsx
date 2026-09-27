'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clapperboard,
  Clock,
  Sun,
  Moon,
  CloudFog,
  MapPin,
  Users,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Sparkles,
  Camera,
  Film,
  PhoneCall,
  Sliders
} from 'lucide-react';
import { useCine } from '@/context/CineContext';
import { CastCallMember } from '@/types/cine';
import confetti from 'canvas-confetti';

export default function CallSheetDashboard() {
  const {
    meta,
    scenes,
    castMembers,
    activeSlate,
    incrementTake,
    setSlateScene,
    updateSceneStatus,
    updateCastStatus
  } = useCine();

  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'CAST' | 'SLATE'>('SCHEDULE');

  const totalPagesToday = scenes.reduce((acc, s) => acc + s.pageCount, 0);
  const completedScenes = scenes.filter((s) => s.status === 'COMPLETED').length;
  const progressPercent = Math.round((completedScenes / scenes.length) * 100);

  const handleWrapCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fafafa', '#d97706', '#71717a'],
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Magazine Hero Header */}
      <div className="border-b-2 border-zinc-800 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-zinc-800 text-zinc-300 border border-zinc-700">
                OFFICIAL DAILY CALL SHEET • EDITION NO. {meta.dayNumber}
              </span>
              <span className="text-zinc-600 font-mono text-xs">DATE: {meta.shootDate}</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100">
              {meta.productionTitle}
            </h1>
            <p className="mt-2 text-zinc-400 font-sans text-sm max-w-2xl">
              Principal photography day <span className="text-amber-400 font-bold">{meta.dayNumber}</span> of{' '}
              <span className="text-zinc-200">{meta.totalDays}</span>. Unit Call time is{' '}
              <span className="font-mono text-amber-400 font-bold">{meta.unitCallTime}</span> sharp on Stage 4.
            </p>
          </div>

          {/* Key Production Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#121215] p-3 rounded-sm border border-zinc-800">
            <div className="border-r border-zinc-800/80 pr-3">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">PAGES PLANNED</div>
              <div className="font-editorial text-2xl font-bold text-zinc-100">
                {totalPagesToday.toFixed(3)}
              </div>
              <div className="text-[10px] text-zinc-400">{scenes.length} Scenes</div>
            </div>
            <div className="border-r border-zinc-800/80 pr-3">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">UNIT CALL</div>
              <div className="font-mono text-xl font-bold text-amber-400">
                {meta.unitCallTime}
              </div>
              <div className="text-[10px] text-zinc-400">Breakfast 05:00</div>
            </div>
            <div className="border-r border-zinc-800/80 pr-3">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">MAGIC HOUR</div>
              <div className="font-mono text-sm font-bold text-sky-400">
                {meta.weather.magicHour}
              </div>
              <div className="text-[10px] text-zinc-400">Sunset {meta.weather.sunset}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">DAY STATUS</div>
              <div className="font-mono text-xl font-bold text-emerald-400">
                {progressPercent}%
              </div>
              <div className="text-[10px] text-zinc-400">{completedScenes}/{scenes.length} Wrapped</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather & Location Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weather & Sun Tracking */}
        <div className="bg-[#121215] border border-zinc-800 p-4 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 border border-zinc-700/60 rounded text-amber-400">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-zinc-400">METEOROLOGY & LIGHT</div>
              <div className="text-sm font-bold text-zinc-200">{meta.weather.condition}</div>
              <div className="text-xs text-zinc-500">
                Temp: {meta.weather.tempC}°C • Sunrise: {meta.weather.sunrise}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono px-2 py-0.5 bg-sky-950/80 text-sky-300 border border-sky-800/60 rounded">
              EXT SHOOT WINDOW
            </span>
          </div>
        </div>

        {/* Primary Stage Location */}
        <div className="bg-[#121215] border border-zinc-800 p-4 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 border border-zinc-700/60 rounded text-zinc-300">
              <MapPin className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-zinc-400">LOCATION BASE</div>
              <div className="text-sm font-bold text-zinc-200">{meta.soundStage}</div>
              <div className="text-xs text-zinc-500 truncate max-w-[200px]">{meta.location}</div>
            </div>
          </div>
        </div>

        {/* Emergency Medical */}
        <div className="bg-[#121215] border border-zinc-800 p-4 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 border border-zinc-700/60 rounded text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-zinc-400">NEAREST EMERGENCY HOSP</div>
              <div className="text-sm font-bold text-zinc-200">{meta.hospitalNearest}</div>
              <div className="text-xs text-red-400 font-mono">Medic On-Site: Ch 2 Radio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('SCHEDULE')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider font-mono transition-colors relative cursor-pointer ${
              activeTab === 'SCHEDULE'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            SHOOTING SCHEDULE ({scenes.length} SCENES)
          </button>
          <button
            onClick={() => setActiveTab('CAST')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider font-mono transition-colors relative cursor-pointer ${
              activeTab === 'CAST'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            CAST CALL MATRIX ({castMembers.length} ACTORS)
          </button>
          <button
            onClick={() => setActiveTab('SLATE')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider font-mono transition-colors relative cursor-pointer ${
              activeTab === 'SLATE'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            ACTIVE CLAPPER SLATE HUD
          </button>
        </div>

        <button
          onClick={handleWrapCelebration}
          className="text-xs font-mono text-zinc-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>CALL DAY WRAP</span>
        </button>
      </div>

      {/* TAB 1: SHOOTING SCHEDULE */}
      {activeTab === 'SCHEDULE' && (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-zinc-800 rounded-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#121215] border-b border-zinc-800 font-mono text-zinc-400 uppercase">
                  <th className="py-3 px-4">SCENE #</th>
                  <th className="py-3 px-4">SET & DESCRIPTION</th>
                  <th className="py-3 px-4">I/E & TIME</th>
                  <th className="py-3 px-4">PAGES</th>
                  <th className="py-3 px-4">CAST REQUIRED</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 bg-[#0c0c0e]">
                {scenes.map((scene) => (
                  <tr
                    key={scene.id}
                    className={`hover:bg-zinc-900/60 transition-colors ${
                      scene.status === 'IN_PROGRESS' ? 'bg-amber-950/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400 text-sm">
                      {scene.sceneNumber}
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-bold text-zinc-200 text-sm font-sans">{scene.scriptSlug}</div>
                      <p className="text-zinc-400 text-[11px] line-clamp-2 mt-0.5">{scene.synopsis}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 mr-1.5">
                        {scene.type}
                      </span>
                      <span className="text-zinc-400">{scene.timeOfDay}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-300">
                      {scene.pagesFraction}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {scene.characters.map((char, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 rounded-xs font-mono"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {scene.status === 'COMPLETED' && (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> WRAPPED
                        </span>
                      )}
                      {scene.status === 'IN_PROGRESS' && (
                        <span className="inline-flex items-center gap-1 text-amber-400 font-bold animate-pulse">
                          <Play className="w-3.5 h-3.5" /> ROLLING
                        </span>
                      )}
                      {scene.status === 'SCHEDULED' && (
                        <span className="text-zinc-500 font-medium">UPCOMING</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSlateScene(scene.sceneNumber)}
                          title="Set to Clapper Slate"
                          className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px] font-mono cursor-pointer"
                        >
                          SLATE
                        </button>
                        {scene.status !== 'COMPLETED' ? (
                          <button
                            onClick={() => updateSceneStatus(scene.id, 'COMPLETED')}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-mono font-bold cursor-pointer"
                          >
                            WRAP
                          </button>
                        ) : (
                          <button
                            onClick={() => updateSceneStatus(scene.id, 'IN_PROGRESS')}
                            className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded text-[10px] font-mono cursor-pointer"
                          >
                            RE-OPEN
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CAST CALL MATRIX */}
      {activeTab === 'CAST' && (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-zinc-800 rounded-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#121215] border-b border-zinc-800 font-mono text-zinc-400 uppercase">
                  <th className="py-3 px-4">CAST #</th>
                  <th className="py-3 px-4">CHARACTER NAME</th>
                  <th className="py-3 px-4">ACTOR / TALENT</th>
                  <th className="py-3 px-4">MAKEUP CALL</th>
                  <th className="py-3 px-4">ON-SET CALL</th>
                  <th className="py-3 px-4">SCENES TODAY</th>
                  <th className="py-3 px-4">BASE TRAILER</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">UPDATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 bg-[#0c0c0e]">
                {castMembers.map((actor) => (
                  <tr key={actor.id} className="hover:bg-zinc-900/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400 text-sm">
                      #{actor.castNumber}
                    </td>
                    <td className="py-3.5 px-4 font-editorial text-base font-bold text-zinc-100">
                      {actor.characterName}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 font-sans font-medium">
                      {actor.actorName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-400">
                      {actor.makeupCall}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-400 font-bold">
                      {actor.setCall}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-300">
                      {actor.scenesToday.join(', ')}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-zinc-500">
                      {actor.trailerNumber}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          actor.status === 'ON_SET'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : actor.status === 'IN_MAKEUP'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : actor.status === 'TRANSIT'
                            ? 'bg-sky-950 text-sky-300 border border-sky-800'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {actor.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={actor.status}
                        onChange={(e) =>
                          updateCastStatus(actor.id, e.target.value as CastCallMember['status'])
                        }
                        className="bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs px-2 py-1 rounded font-mono cursor-pointer"
                      >
                        <option value="TRANSIT">TRANSIT</option>
                        <option value="IN_MAKEUP">IN MAKEUP</option>
                        <option value="ON_SET">ON SET</option>
                        <option value="WRAPPED">WRAPPED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE CLAPPER SLATE HUD */}
      {activeTab === 'SLATE' && (
        <div className="max-w-2xl mx-auto bg-[#121215] border-2 border-zinc-700 rounded p-6 shadow-2xl space-y-6">
          {/* Physical Clapper Stripes Header */}
          <div className="h-12 w-full clapper-stripes rounded-t border-b-2 border-zinc-800 shadow-inner flex items-center justify-center">
            <div className="bg-black/90 px-4 py-1 text-xs font-mono font-bold tracking-widest text-amber-400 border border-zinc-700">
              CINEPROD SOUND SYNC SLATE
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-editorial text-2xl font-bold tracking-wider text-zinc-100 uppercase">
              {meta.productionTitle}
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              DIRECTOR: {meta.director} • DOP: {meta.dop}
            </p>
          </div>

          {/* Slate Digits Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-black p-4 border border-zinc-800 rounded">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">ROLL</div>
              <div className="text-3xl font-mono font-bold text-zinc-100">{activeSlate.roll}</div>
            </div>
            <div className="bg-black p-4 border border-zinc-800 rounded">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">SCENE</div>
              <div className="text-3xl font-mono font-bold text-amber-400">{activeSlate.scene}</div>
            </div>
            <div className="bg-black p-4 border border-zinc-800 rounded">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">TAKE</div>
              <div className="text-3xl font-mono font-bold text-emerald-400">{activeSlate.take}</div>
            </div>
          </div>

          {/* Camera Settings Telemetry */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono bg-zinc-950 p-3 rounded border border-zinc-900">
            <div>
              <span className="text-zinc-500 block text-[9px]">FPS</span>
              <span className="text-zinc-300 font-bold">{activeSlate.fps} fps</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[9px]">SHUTTER</span>
              <span className="text-zinc-300 font-bold">{activeSlate.shutter}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[9px]">ISO</span>
              <span className="text-zinc-300 font-bold">{activeSlate.iso}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[9px]">KELVIN</span>
              <span className="text-zinc-300 font-bold">{activeSlate.kelvin}K</span>
            </div>
          </div>

          {/* Slate Control Actions */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={incrementTake}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-sm tracking-wider uppercase rounded shadow transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>NEXT TAKE (+1)</span>
            </button>
            <Link
              href="/dailies/"
              className="py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs rounded border border-zinc-700 flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>REVIEW DAILIES</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
