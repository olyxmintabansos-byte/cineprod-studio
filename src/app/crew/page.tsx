'use client';

import React, { useState } from 'react';
import {
  Users,
  Radio,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  Download,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { useCine } from '@/context/CineContext';
import { DepartmentType, CrewStatus } from '@/types/cine';
import confetti from 'canvas-confetti';

export default function CrewDispatchPage() {
  const { crewMembers, updateCrewStatus, broadcastCallAlert, meta, timecode } = useCine();

  const [selectedDept, setSelectedDept] = useState<'ALL' | DepartmentType>('ALL');
  const [broadcastMessage, setBroadcastMessage] = useState('Standby on Stage 4. Sound rolling in 5 minutes.');
  const [selectedCrewBadge, setSelectedCrewBadge] = useState<string | null>(crewMembers[0]?.id || null);

  const departments: ('ALL' | DepartmentType)[] = [
    'ALL',
    'CAMERA',
    'SOUND',
    'LIGHTING',
    'GRIP',
    'ART',
    'PRODUCTION',
    'WARDROBE',
  ];

  const filteredCrew = crewMembers.filter((m) =>
    selectedDept === 'ALL' ? true : m.department === selectedDept
  );

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    broadcastCallAlert(broadcastMessage);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#fafafa'],
    });
  };

  const activeBadgeCrew = crewMembers.find((m) => m.id === selectedCrewBadge) || crewMembers[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b border-zinc-800 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            LOGISTICS & DEPARTMENT DISPATCH
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-100">
            Crew Department Roster & Call Dispatch
          </h1>
          <p className="text-zinc-400 text-xs mt-1">
            Department walkie channels, arrival tracking, per-diem approval, and stage broadcast intercom.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded text-xs font-mono text-zinc-400">
            ON STAGE NOW:{' '}
            <span className="text-emerald-400 font-bold">
              {crewMembers.filter((c) => c.status === 'ON_STAGE').length} / {crewMembers.length}
            </span>
          </div>
        </div>
      </div>

      {/* Radio Walkie Intercom Channel Quick Directory */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#121215] p-3 rounded border border-zinc-800">
        <div className="bg-black/60 p-2.5 rounded border border-zinc-800">
          <div className="text-[10px] font-mono text-zinc-500">WALKIE CH 1</div>
          <div className="text-sm font-bold text-amber-400 font-mono">PRODUCTION / AD</div>
          <div className="text-[10px] text-zinc-400">UPM, 1st AD, Basecamp</div>
        </div>
        <div className="bg-black/60 p-2.5 rounded border border-zinc-800">
          <div className="text-[10px] font-mono text-zinc-500">WALKIE CH 2</div>
          <div className="text-sm font-bold text-red-400 font-mono">STAGE SAFETY & MEDIC</div>
          <div className="text-[10px] text-zinc-400">Emergency & On-site Nurse</div>
        </div>
        <div className="bg-black/60 p-2.5 rounded border border-zinc-800">
          <div className="text-[10px] font-mono text-zinc-500">WALKIE CH 3</div>
          <div className="text-sm font-bold text-sky-400 font-mono">CAMERA & OPTICS</div>
          <div className="text-[10px] text-zinc-400">DOP, 1st AC, DIT Loader</div>
        </div>
        <div className="bg-black/60 p-2.5 rounded border border-zinc-800">
          <div className="text-[10px] font-mono text-zinc-500">WALKIE CH 4</div>
          <div className="text-sm font-bold text-emerald-400 font-mono">SOUND MIXER & BOOM</div>
          <div className="text-[10px] text-zinc-400">Mic wireless & playback</div>
        </div>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-800">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
              selectedDept === dept
                ? 'bg-amber-400 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Crew Table, Right Badge ID Inspector & Radio Dispatch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Crew Roster Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="overflow-x-auto border border-zinc-800 rounded-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#121215] border-b border-zinc-800 font-mono text-zinc-400 uppercase">
                  <th className="py-3 px-4">CREW NAME</th>
                  <th className="py-3 px-4">DEPT & ROLE</th>
                  <th className="py-3 px-4">CALL TIME</th>
                  <th className="py-3 px-4">WALKIE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 bg-[#0c0c0e]">
                {filteredCrew.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => setSelectedCrewBadge(member.id)}
                    className="hover:bg-zinc-900/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="font-editorial text-sm font-bold text-zinc-200">
                        {member.name}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500">{member.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-zinc-300 font-medium">{member.role}</div>
                      <span className="text-[9px] font-mono text-amber-400 uppercase">
                        {member.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-300">{member.callTime}</td>
                    <td className="py-3 px-4 font-mono text-sky-400 font-bold">
                      CH {member.walkieChannel}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          member.status === 'ON_STAGE'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : member.status === 'PREPPING'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : member.status === 'EN_ROUTE'
                            ? 'bg-sky-950 text-sky-300 border border-sky-800'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select
                        value={member.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          updateCrewStatus(member.id, e.target.value as CrewStatus)
                        }
                        className="bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs px-2 py-1 rounded font-mono cursor-pointer"
                      >
                        <option value="ON_STAGE">ON STAGE</option>
                        <option value="PREPPING">PREPPING</option>
                        <option value="EN_ROUTE">EN ROUTE</option>
                        <option value="WRAPPED">WRAPPED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Physical Production Badge Pass & Radio Dispatch (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Physical Crew Security Badge Pass */}
          {activeBadgeCrew && (
            <div className="bg-[#121215] border-2 border-zinc-700 rounded p-5 shadow-2xl relative space-y-4">
              <div className="h-2 w-16 mx-auto bg-zinc-700 rounded-full mb-2"></div>

              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                  SET ACCESS CREDENTIAL
                </div>
                <div className="text-[10px] font-mono text-amber-400 font-bold">
                  {activeBadgeCrew.badgeId}
                </div>
              </div>

              <div className="text-center py-2">
                <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-amber-400 mx-auto flex items-center justify-center font-editorial text-2xl font-bold text-zinc-200">
                  {activeBadgeCrew.name.slice(0, 1)}
                </div>
                <h3 className="font-editorial text-xl font-bold text-zinc-100 mt-2">
                  {activeBadgeCrew.name}
                </h3>
                <div className="text-xs font-mono text-amber-400 uppercase font-bold">
                  {activeBadgeCrew.role}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">
                  DEPT: {activeBadgeCrew.department}
                </div>
              </div>

              <div className="bg-black/60 p-3 rounded border border-zinc-800 text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">STAGE ACCESS:</span>
                  <span className="text-zinc-200 font-bold">ALL STAGES (1-6)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">PRIMARY RADIO:</span>
                  <span className="text-sky-400 font-bold">CH {activeBadgeCrew.walkieChannel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">PER-DIEM:</span>
                  <span className="text-emerald-400 font-bold">{activeBadgeCrew.perDiemStatus}</span>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="pt-2 text-center">
                <div className="h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[9px] tracking-widest text-zinc-600">
                  ||| | ||||| || ||| |||| || | ||||| |||
                </div>
                <div className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">
                  AUTHORIZED BY {meta.productionTitle}
                </div>
              </div>
            </div>
          )}

          {/* Quick Intercom Broadcast Box */}
          <div className="bg-[#121215] border border-zinc-800 rounded p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-bold">
                STAGE RADIO INTERCOM DISPATCH
              </h3>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-2">
              <textarea
                rows={2}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Broadcast call time update or stage notice..."
                className="w-full bg-black border border-zinc-700 p-2 rounded text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs uppercase rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>BROADCAST TO ALL CHANNELS</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
