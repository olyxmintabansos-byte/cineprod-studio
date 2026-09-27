'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SceneItem,
  CastCallMember,
  ShootDayMeta,
  CineContextType,
  SceneStatus,
  DailiesClip,
  CrewMember,
  LutPreset,
  CrewStatus
} from '@/types/cine';

const DEFAULT_META: ShootDayMeta = {
  dayNumber: 28,
  totalDays: 45,
  productionTitle: 'THE OBSIDIAN HORIZON',
  director: 'Alastair Vance',
  dop: 'Elena Chen, ASC',
  shootDate: '2026-10-14',
  unitCallTime: '05:30 AM',
  location: 'Stage 4 & Dumbo Waterfront, New York',
  weather: {
    condition: 'Partly Overcast / Low Fog',
    tempC: 16,
    sunrise: '06:12 AM',
    sunset: '06:34 PM',
    magicHour: '06:15 PM - 06:45 PM',
  },
  hospitalNearest: 'Brooklyn Methodist Hospital (ER Dept)',
  soundStage: 'Stage 4 Soundproof CineStage',
};

const DEFAULT_SCENES: SceneItem[] = [
  {
    id: 'sc-1',
    sceneNumber: '42A',
    scriptSlug: 'INT. SUBWAY CAR 9 - NIGHT',
    type: 'INT',
    setting: 'Subway Car 9 (Stage 4 Gimbal Rig)',
    timeOfDay: 'NIGHT',
    pagesFraction: '1 4/8 pgs',
    pageCount: 1.5,
    synopsis: 'Marcus discovers the encrypted micro-cassette beneath the conductor seat as the emergency brakes engage.',
    characters: ['MARCUS REED', 'AGENT VANCE'],
    departmentNotes: {
      camera: 'Anamorphic 40mm T2.0, Low Angle Steadicam track',
      sound: 'Practical flickering ballast hum + hydraulic brake hiss',
      lighting: 'Sodium Vapor amber strobe + cool cyan key',
      props: 'Hero 1984 Nagra micro-cassette with blood smear',
    },
    status: 'COMPLETED',
    targetMinutes: 120,
    actualMinutes: 110,
  },
  {
    id: 'sc-2',
    sceneNumber: '43',
    scriptSlug: 'EXT. EAST RIVER WHARF - MAGIC HOUR',
    type: 'EXT',
    setting: 'Pier 17 Cargo Dockside',
    timeOfDay: 'MAGIC HOUR',
    pagesFraction: '2 1/8 pgs',
    pageCount: 2.125,
    synopsis: 'Elena arrives with the forged clearance papers. The exchange goes wrong when an unmarked patrol boat approaches.',
    characters: ['MARCUS REED', 'ELENA ROSTOVA', 'HARBORMASTER'],
    departmentNotes: {
      camera: 'Technocrane 50ft with Scorpio head, 85mm Prime',
      sound: 'Water slap against pilings, offshore foghorn ambience',
      lighting: 'Natural silhouette against sunset, 18kW HMI kicker through haze',
      props: 'Weathered aluminum attaché briefcase & nautical flare',
    },
    status: 'IN_PROGRESS',
    targetMinutes: 180,
  },
  {
    id: 'sc-3',
    sceneNumber: '44',
    scriptSlug: 'INT. WAREHOUSE VAULT - NIGHT',
    type: 'INT',
    setting: 'Industrial Warehouse B (Stage 2)',
    timeOfDay: 'NIGHT',
    pagesFraction: '3 0/8 pgs',
    pageCount: 3.0,
    synopsis: 'Confrontation inside the abandoned cold storage. Stunt sequence with rigged electrical panels and glass partition.',
    characters: ['ELENA ROSTOVA', 'VIKTOR SOKOLOV', 'STUNT DOUBLES (x3)'],
    departmentNotes: {
      camera: 'Dual Camera A/B setup: 35mm & 100mm, 48fps slow motion',
      sound: 'High-splatter squib impacts & glass shatter microphones',
      lighting: 'Cold tungsten overhead grid with flicker box triggers',
      props: 'Sugar glass breakaway windows, rubber prop revolvers',
    },
    status: 'SCHEDULED',
    targetMinutes: 240,
  },
  {
    id: 'sc-4',
    sceneNumber: '45B',
    scriptSlug: 'EXT. ROOFTOP WATER TOWER - DAWN',
    type: 'EXT',
    setting: 'Manhattan Skyline Viewport',
    timeOfDay: 'DAWN',
    pagesFraction: '0 6/8 pgs',
    pageCount: 0.75,
    synopsis: 'Marcus burns the decoded ledger while watching the morning sun break through industrial smog.',
    characters: ['MARCUS REED'],
    departmentNotes: {
      camera: 'Drone Inspire 3 8K ProRes + Ground 50mm Master Prime',
      sound: 'Distant city waking traffic + morning wind rumble',
      lighting: 'Golden dawn rim light, portable bounce fill',
      props: 'Zippo lighter, smoking charred parchment',
    },
    status: 'SCHEDULED',
    targetMinutes: 90,
  },
];

const DEFAULT_CAST: CastCallMember[] = [
  {
    id: 'c-1',
    castNumber: 1,
    characterName: 'Marcus Reed',
    actorName: 'Sterling K. Thorne',
    makeupCall: '05:45 AM',
    setCall: '06:45 AM',
    scenesToday: ['42A', '43', '45B'],
    status: 'ON_SET',
    trailerNumber: 'Trailer A-1 (Executive)',
  },
  {
    id: 'c-2',
    castNumber: 2,
    characterName: 'Elena Rostova',
    actorName: 'Sienna Delacroix',
    makeupCall: '06:15 AM',
    setCall: '07:15 AM',
    scenesToday: ['43', '44'],
    status: 'IN_MAKEUP',
    trailerNumber: 'Trailer A-2',
  },
  {
    id: 'c-3',
    castNumber: 5,
    characterName: 'Viktor Sokolov',
    actorName: 'Goran Radic',
    makeupCall: '09:00 AM',
    setCall: '10:30 AM',
    scenesToday: ['44'],
    status: 'TRANSIT',
    trailerNumber: 'Trailer B-3',
  },
  {
    id: 'c-4',
    castNumber: 8,
    characterName: 'Harbormaster',
    actorName: 'Julian Croft',
    makeupCall: '07:00 AM',
    setCall: '07:45 AM',
    scenesToday: ['43'],
    status: 'ON_SET',
    trailerNumber: 'Green Room Stage 4',
  },
];

const DEFAULT_DAILIES: DailiesClip[] = [
  {
    id: 'dl-1',
    roll: 'A-01',
    scene: '42A',
    take: 1,
    duration: '00:01:42:12',
    timecodeIn: '10:14:02:00',
    timecodeOut: '10:15:44:12',
    lens: 'Cooke Anamorphic 40mm',
    fps: 24,
    isCircleTake: false,
    directorNote: 'False start on subway door mechanism. Camera operator adjusted framing.',
    lutApplied: 'ARRI_709',
    soundRoll: 'SR-04',
    audioSync: 'LOCKED',
    cameraCard: 'CFexpress Mag 1 (Stage 4)',
    aperture: 'T2.8',
    iso: 800,
  },
  {
    id: 'dl-2',
    roll: 'A-01',
    scene: '42A',
    take: 3,
    duration: '00:02:18:04',
    timecodeIn: '10:28:11:00',
    timecodeOut: '10:30:29:04',
    lens: 'Cooke Anamorphic 40mm',
    fps: 24,
    isCircleTake: true,
    directorNote: 'Master take! Incredible intensity when Marcus grasps the cassette. Send to editorial immediately.',
    lutApplied: 'NOIR_HICON',
    soundRoll: 'SR-04',
    audioSync: 'LOCKED',
    cameraCard: 'CFexpress Mag 1',
    aperture: 'T2.0',
    iso: 800,
  },
  {
    id: 'dl-3',
    roll: 'B-04',
    scene: '43',
    take: 1,
    duration: '00:03:04:18',
    timecodeIn: '16:42:00:10',
    timecodeOut: '16:45:04:28',
    lens: 'Arri Signature Prime 85mm',
    fps: 24,
    isCircleTake: false,
    directorNote: 'Good natural sunset flare, but wind gust clipped audio channel 2 on Pier 17.',
    lutApplied: 'KODAK_2383',
    soundRoll: 'SR-05',
    audioSync: 'DRIFT_DETECTED',
    cameraCard: 'CFexpress Mag 2',
    aperture: 'T1.8',
    iso: 400,
  },
  {
    id: 'dl-4',
    roll: 'B-04',
    scene: '43',
    take: 2,
    duration: '00:02:45:00',
    timecodeIn: '17:02:14:00',
    timecodeOut: '17:04:59:00',
    lens: 'Arri Signature Prime 85mm',
    fps: 24,
    isCircleTake: true,
    directorNote: 'Stunning magic hour color. Elena silhouette against East River wharf is cinematic perfection.',
    lutApplied: 'TEAL_ORANGE',
    soundRoll: 'SR-05',
    audioSync: 'LOCKED',
    cameraCard: 'CFexpress Mag 2',
    aperture: 'T2.0',
    iso: 500,
  },
  {
    id: 'dl-5',
    roll: 'C-02',
    scene: '44',
    take: 1,
    duration: '00:01:12:00',
    timecodeIn: '19:15:30:00',
    timecodeOut: '19:16:42:00',
    lens: 'Zeiss Master Prime 35mm',
    fps: 48,
    isCircleTake: false,
    directorNote: 'High-speed 48fps stunt run. Breakaway glass did not shatter cleanly on cue.',
    lutApplied: 'BLEACH_BYPASS',
    soundRoll: 'SR-06',
    audioSync: 'WILD_TRACK',
    cameraCard: 'CFexpress Mag 3',
    aperture: 'T2.8',
    iso: 1600,
  },
];

const DEFAULT_CREW: CrewMember[] = [
  {
    id: 'cr-1',
    name: 'Elena Chen, ASC',
    department: 'CAMERA',
    role: 'Director of Photography (DOP)',
    callTime: '05:15 AM',
    phone: '+1 (555) 492-8812',
    walkieChannel: 3,
    status: 'ON_STAGE',
    perDiemStatus: 'APPROVED',
    badgeId: 'CP-DOP-01',
  },
  {
    id: 'cr-2',
    name: 'Theo Brauer',
    department: 'CAMERA',
    role: '1st Assistant Camera (A-Cam Focus Puller)',
    callTime: '05:15 AM',
    phone: '+1 (555) 381-9902',
    walkieChannel: 3,
    status: 'ON_STAGE',
    perDiemStatus: 'APPROVED',
    badgeId: 'CP-CAM-02',
  },
  {
    id: 'cr-3',
    name: 'Ronan Gallagher',
    department: 'SOUND',
    role: 'Production Sound Mixer',
    callTime: '05:30 AM',
    phone: '+1 (555) 714-2201',
    walkieChannel: 4,
    status: 'ON_STAGE',
    perDiemStatus: 'APPROVED',
    badgeId: 'CP-SND-01',
  },
  {
    id: 'cr-4',
    name: 'Maya Kowalski',
    department: 'LIGHTING',
    role: 'Chief Lighting Technician (Gaffer)',
    callTime: '05:00 AM',
    phone: '+1 (555) 890-4133',
    walkieChannel: 2,
    status: 'ON_STAGE',
    perDiemStatus: 'APPROVED',
    badgeId: 'CP-LTG-01',
  },
  {
    id: 'cr-5',
    name: 'Declan Hayes',
    department: 'GRIP',
    role: 'Key Grip / Technocrane Operator',
    callTime: '05:00 AM',
    phone: '+1 (555) 233-8719',
    walkieChannel: 2,
    status: 'ON_STAGE',
    perDiemStatus: 'APPROVED',
    badgeId: 'CP-GRP-01',
  },
  {
    id: 'cr-6',
    name: 'Chloe Laurent',
    department: 'ART',
    role: 'Production Designer & Props Master',
    callTime: '06:00 AM',
    phone: '+1 (555) 604-1188',
    walkieChannel: 1,
    status: 'PREPPING',
    perDiemStatus: 'APPROVED',
    badgeId: 'CP-ART-01',
  },
  {
    id: 'cr-7',
    name: 'Kofi Mensah',
    department: 'PRODUCTION',
    role: 'Unit Production Manager (UPM)',
    callTime: '04:45 AM',
    phone: '+1 (555) 912-3344',
    walkieChannel: 1,
    status: 'ON_STAGE',
    perDiemStatus: 'APPROVED',
    badgeId: 'CP-UPM-01',
  },
  {
    id: 'cr-8',
    name: 'Sabrina Vega',
    department: 'WARDROBE',
    role: 'Key Costume Supervisor',
    callTime: '05:30 AM',
    phone: '+1 (555) 441-2809',
    walkieChannel: 1,
    status: 'EN_ROUTE',
    perDiemStatus: 'PENDING',
    badgeId: 'CP-WRD-01',
  },
];

const CineContext = createContext<CineContextType | undefined>(undefined);

export function CineProvider({ children }: { children: React.ReactNode }) {
  const [meta, setMeta] = useState<ShootDayMeta>(DEFAULT_META);
  const [scenes, setScenes] = useState<SceneItem[]>(DEFAULT_SCENES);
  const [castMembers, setCastMembers] = useState<CastCallMember[]>(DEFAULT_CAST);
  const [dailiesClips, setDailiesClips] = useState<DailiesClip[]>(DEFAULT_DAILIES);
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>(DEFAULT_CREW);
  const [activeSceneId, setActiveSceneId] = useState<string>('sc-2');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'INT' | 'EXT' | 'NIGHT' | 'DAY'>('ALL');
  const [timecode, setTimecode] = useState<string>('14:32:08:16');
  const [activeSlate, setActiveSlate] = useState({
    roll: 'B-04',
    scene: '43',
    take: 3,
    fps: 24,
    shutter: '1/48s (180°)',
    iso: 800,
    kelvin: 5600,
  });

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cineprod_state_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.scenes) setScenes(parsed.scenes);
        if (parsed.castMembers) setCastMembers(parsed.castMembers);
        if (parsed.dailiesClips) setDailiesClips(parsed.dailiesClips);
        if (parsed.crewMembers) setCrewMembers(parsed.crewMembers);
        if (parsed.activeSlate) setActiveSlate(parsed.activeSlate);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'cineprod_state_v1',
        JSON.stringify({ scenes, castMembers, dailiesClips, crewMembers, activeSlate })
      );
    } catch {
      // ignore
    }
  }, [scenes, castMembers, dailiesClips, crewMembers, activeSlate]);

  // Live Timecode simulator
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 41); // ~24 fps ticker
    return () => clearInterval(timer);
  }, []);

  const updateSceneStatus = (id: string, status: SceneStatus) => {
    setScenes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const updateCastStatus = (id: string, status: CastCallMember['status']) => {
    setCastMembers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const addScene = (newScene: Omit<SceneItem, 'id'>) => {
    const created: SceneItem = {
      ...newScene,
      id: `sc-${Date.now()}`,
    };
    setScenes((prev) => [...prev, created]);
  };

  const toggleCircleTake = (clipId: string) => {
    setDailiesClips((prev) =>
      prev.map((c) => (c.id === clipId ? { ...c, isCircleTake: !c.isCircleTake } : c))
    );
  };

  const setClipLut = (clipId: string, lut: LutPreset) => {
    setDailiesClips((prev) =>
      prev.map((c) => (c.id === clipId ? { ...c, lutApplied: lut } : c))
    );
  };

  const updateCrewStatus = (id: string, status: CrewStatus) => {
    setCrewMembers((prev) =>
      prev.map((cr) => (cr.id === id ? { ...cr, status } : cr))
    );
  };

  const broadcastCallAlert = (customMessage: string) => {
    alert(`[RADIO CHANNEL 1 PRODUCTION BROADCAST]\nTo: ALL DEPARTMENTS\nMessage: ${customMessage}\nBroadcast Time: ${timecode}`);
  };

  const incrementTake = () => {
    setActiveSlate((prev) => ({
      ...prev,
      take: prev.take + 1,
    }));
  };

  const setSlateScene = (sceneNum: string) => {
    setActiveSlate((prev) => ({
      ...prev,
      scene: sceneNum,
      take: 1,
    }));
  };

  return (
    <CineContext.Provider
      value={{
        meta,
        scenes,
        castMembers,
        dailiesClips,
        crewMembers,
        activeSceneId,
        timecode,
        activeFilter,
        setActiveFilter,
        updateSceneStatus,
        updateCastStatus,
        addScene,
        toggleCircleTake,
        setClipLut,
        updateCrewStatus,
        broadcastCallAlert,
        activeSlate,
        incrementTake,
        setSlateScene,
      }}
    >
      {children}
    </CineContext.Provider>
  );
}

export function useCine() {
  const context = useContext(CineContext);
  if (!context) {
    throw new Error('useCine must be used within a CineProvider');
  }
  return context;
}
