'use client';

import React, { useState } from 'react';
import {
  Film,
  Filter,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Camera,
  Scissors,
  Eye
} from 'lucide-react';
import { useCine } from '@/context/CineContext';
import { SceneStatus, SceneType, TimeOfDay } from '@/types/cine';

export default function SceneBreakdownPage() {
  const { scenes, activeFilter, setActiveFilter, updateSceneStatus, addScene, setSlateScene } = useCine();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSceneId, setSelectedSceneId] = useState<string>(scenes[0]?.id || '');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Scene Form State
  const [newSceneNumber, setNewSceneNumber] = useState('');
  const [newScriptSlug, setNewScriptSlug] = useState('');
  const [newType, setNewType] = useState<SceneType>('INT');
  const [newTimeOfDay, setNewTimeOfDay] = useState<TimeOfDay>('NIGHT');
  const [newSetting, setNewSetting] = useState('');
  const [newPagesFraction, setNewPagesFraction] = useState('1 2/8 pgs');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newCharacters, setNewCharacters] = useState('MARCUS REED, ELENA');

  const filteredScenes = scenes.filter((scene) => {
    const matchesFilter =
      activeFilter === 'ALL'
        ? true
        : activeFilter === 'INT'
        ? scene.type === 'INT'
        : activeFilter === 'EXT'
        ? scene.type === 'EXT'
        : activeFilter === 'NIGHT'
        ? scene.timeOfDay === 'NIGHT'
        : scene.timeOfDay === 'DAY' || scene.timeOfDay === 'DAWN' || scene.timeOfDay === 'MAGIC HOUR';

    const matchesSearch =
      scene.sceneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.scriptSlug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const activeScene = scenes.find((s) => s.id === selectedSceneId) || scenes[0];

  const handleCreateScene = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSceneNumber || !newScriptSlug) return;

    addScene({
      sceneNumber: newSceneNumber,
      scriptSlug: newScriptSlug,
      type: newType,
      setting: newSetting || 'Stage 4 Soundstage',
      timeOfDay: newTimeOfDay,
      pagesFraction: newPagesFraction,
      pageCount: 1.25,
      synopsis: newSynopsis || 'Scene action pending director notation.',
      characters: newCharacters.split(',').map((c) => c.trim()),
      departmentNotes: {
        camera: 'Standard Prime 50mm T2.0',
        sound: 'Lavs + Boom mic overhead',
        lighting: 'Tungsten key + soft bounce',
        props: 'Standard continuity hand props',
      },
      status: 'SCHEDULED',
      targetMinutes: 120,
    });

    setShowAddModal(false);
    setNewSceneNumber('');
    setNewScriptSlug('');
    setNewSynopsis('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b border-zinc-800 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            SCRIPT SUPERVISOR CONTINUITY LEDGER
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-100">
            Scene Breakdown & Coverage Matrix
          </h1>
          <p className="text-zinc-400 text-xs mt-1">
            Tracking INT/EXT ratios, script page fractions, camera setups, and technical department notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD SCENE BREAKDOWN</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121215] p-3 rounded border border-zinc-800">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {(['ALL', 'INT', 'EXT', 'DAY', 'NIGHT'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-xs transition-colors cursor-pointer ${
                activeFilter === filter
                  ? 'bg-amber-400 text-black'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search scene, slug, character..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-black border border-zinc-700 rounded text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
          />
        </div>
      </div>

      {/* Magazine Editorial Split Screen: Left Scene Cards, Right Deep Script Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scene Index List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredScenes.map((scene) => {
            const isSelected = scene.id === selectedSceneId;
            return (
              <div
                key={scene.id}
                onClick={() => setSelectedSceneId(scene.id)}
                className={`p-4 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-zinc-800/90 border-amber-500/60 shadow-lg'
                    : 'bg-[#121215] border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-amber-400">
                      SCENE {scene.sceneNumber}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-300">
                      {scene.type} • {scene.timeOfDay}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{scene.pagesFraction}</span>
                </div>

                <div className="mt-2 font-editorial font-bold text-sm text-zinc-200">
                  {scene.scriptSlug}
                </div>

                <p className="mt-1 text-xs text-zinc-400 line-clamp-2">{scene.synopsis}</p>

                <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">
                    Est. {scene.targetMinutes}m • {scene.characters.length} Actors
                  </span>
                  <span
                    className={`font-bold ${
                      scene.status === 'COMPLETED'
                        ? 'text-emerald-400'
                        : scene.status === 'IN_PROGRESS'
                        ? 'text-amber-400'
                        : 'text-zinc-500'
                    }`}
                  >
                    {scene.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Editorial Breakdown Viewport (7 Cols) */}
        {activeScene && (
          <div className="lg:col-span-7 bg-[#121215] border border-zinc-800 rounded-sm p-6 space-y-6">
            {/* Header Slug */}
            <div className="border-b border-zinc-800 pb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-amber-400 font-bold text-sm">SCENE {activeScene.sceneNumber}</span>
                  <span>•</span>
                  <span>SETTING: {activeScene.setting}</span>
                </div>
                <h2 className="font-editorial text-2xl font-bold text-zinc-100 mt-1">
                  {activeScene.scriptSlug}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSlateScene(activeScene.sceneNumber)}
                  className="px-2.5 py-1 bg-amber-500 text-black font-mono font-bold text-xs uppercase rounded cursor-pointer hover:bg-amber-400"
                >
                  LOAD TO SLATE
                </button>
              </div>
            </div>

            {/* Script Synopsis & Continuity */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                NARRATIVE ACTION & CONTINUITY NOTES
              </h3>
              <div className="bg-black/60 p-4 border border-zinc-800 font-editorial text-zinc-300 text-sm leading-relaxed rounded">
                &ldquo;{activeScene.synopsis}&rdquo;
              </div>
            </div>

            {/* Department Breakdown Grid */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                DEPARTMENT TECHNICAL SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <div className="flex items-center gap-1.5 font-mono text-amber-400 font-bold mb-1">
                    <Camera className="w-3.5 h-3.5" /> CAMERA & OPTICS
                  </div>
                  <p className="text-zinc-300 font-sans">{activeScene.departmentNotes.camera}</p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <div className="flex items-center gap-1.5 font-mono text-sky-400 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" /> SOUND & AMBIENCE
                  </div>
                  <p className="text-zinc-300 font-sans">{activeScene.departmentNotes.sound}</p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <div className="flex items-center gap-1.5 font-mono text-yellow-300 font-bold mb-1">
                    <Layers className="w-3.5 h-3.5" /> LIGHTING & GRIP
                  </div>
                  <p className="text-zinc-300 font-sans">{activeScene.departmentNotes.lighting}</p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <div className="flex items-center gap-1.5 font-mono text-red-400 font-bold mb-1">
                    <Scissors className="w-3.5 h-3.5" /> PROPS & CONTINUITY
                  </div>
                  <p className="text-zinc-300 font-sans">{activeScene.departmentNotes.props}</p>
                </div>
              </div>
            </div>

            {/* Cast In This Scene */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                CAST PERSONNEL REQUIRED ON SET
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeScene.characters.map((char, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-xs font-mono text-zinc-200 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{char}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Quick Toggle */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">SUPERVISOR APPROVAL:</span>
              <div className="flex items-center gap-2">
                {(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED'] as SceneStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateSceneStatus(activeScene.id, st)}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                      activeScene.status === st
                        ? 'bg-amber-400 text-black'
                        : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Scene Breakdown */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-zinc-700 rounded-sm max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-editorial text-lg font-bold text-zinc-100">
                NEW SCENE SCRIPT BREAKDOWN
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-500 hover:text-zinc-300 font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateScene} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-zinc-400 mb-1">SCENE NUMBER</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 46A"
                    value={newSceneNumber}
                    onChange={(e) => setNewSceneNumber(e.target.value)}
                    className="w-full bg-black border border-zinc-700 p-2 rounded text-zinc-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-zinc-400 mb-1">PAGE FRACTION</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 3/8 pgs"
                    value={newPagesFraction}
                    onChange={(e) => setNewPagesFraction(e.target.value)}
                    className="w-full bg-black border border-zinc-700 p-2 rounded text-zinc-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-zinc-400 mb-1">SCRIPT SLUG LINE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. INT. POLICE INTERROGATION ROOM - NIGHT"
                  value={newScriptSlug}
                  onChange={(e) => setNewScriptSlug(e.target.value)}
                  className="w-full bg-black border border-zinc-700 p-2 rounded text-zinc-200 font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-zinc-400 mb-1">TYPE</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as SceneType)}
                    className="w-full bg-black border border-zinc-700 p-2 rounded text-zinc-200 font-mono"
                  >
                    <option value="INT">INT (Interior)</option>
                    <option value="EXT">EXT (Exterior)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-zinc-400 mb-1">TIME OF DAY</label>
                  <select
                    value={newTimeOfDay}
                    onChange={(e) => setNewTimeOfDay(e.target.value as TimeOfDay)}
                    className="w-full bg-black border border-zinc-700 p-2 rounded text-zinc-200 font-mono"
                  >
                    <option value="DAY">DAY</option>
                    <option value="NIGHT">NIGHT</option>
                    <option value="DAWN">DAWN</option>
                    <option value="DUSK">DUSK</option>
                    <option value="MAGIC HOUR">MAGIC HOUR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-zinc-400 mb-1">SETTING / STAGE LOCATION</label>
                <input
                  type="text"
                  placeholder="e.g. Stage 4 Set A"
                  value={newSetting}
                  onChange={(e) => setNewSetting(e.target.value)}
                  className="w-full bg-black border border-zinc-700 p-2 rounded text-zinc-200 font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-zinc-400 mb-1">CHARACTERS (COMMA SEPARATED)</label>
                <input
                  type="text"
                  placeholder="MARCUS REED, DETECTIVE COLE"
                  value={newCharacters}
                  onChange={(e) => setNewCharacters(e.target.value)}
                  className="w-full bg-black border border-zinc-700 p-2 rounded text-zinc-200 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-mono text-zinc-400 mb-1">SYNOPSIS / CONTINUITY</label>
                <textarea
                  rows={3}
                  placeholder="Brief synopsis of dramatic action..."
                  value={newSynopsis}
                  onChange={(e) => setNewSynopsis(e.target.value)}
                  className="w-full bg-black border border-zinc-700 p-2 rounded text-zinc-200 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded font-mono hover:bg-zinc-700 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono uppercase rounded cursor-pointer"
                >
                  SAVE SCENE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
