export type SceneType = 'INT' | 'EXT';
export type TimeOfDay = 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR';
export type SceneStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'POSTPONED';

export interface SceneItem {
  id: string;
  sceneNumber: string;
  scriptSlug: string;
  type: SceneType;
  setting: string;
  timeOfDay: TimeOfDay;
  pagesFraction: string;
  pageCount: number;
  synopsis: string;
  characters: string[];
  departmentNotes: {
    camera: string;
    sound: string;
    lighting: string;
    props: string;
  };
  status: SceneStatus;
  targetMinutes: number;
  actualMinutes?: number;
}

export interface CastCallMember {
  id: string;
  castNumber: number;
  characterName: string;
  actorName: string;
  makeupCall: string;
  setCall: string;
  scenesToday: string[];
  status: 'TRANSIT' | 'IN_MAKEUP' | 'ON_SET' | 'WRAPPED';
  trailerNumber: string;
}

export type LutPreset = 'KODAK_2383' | 'ARRI_709' | 'NOIR_HICON' | 'BLEACH_BYPASS' | 'TEAL_ORANGE';

export interface DailiesClip {
  id: string;
  roll: string;
  scene: string;
  take: number;
  duration: string;
  timecodeIn: string;
  timecodeOut: string;
  lens: string;
  fps: number;
  isCircleTake: boolean;
  directorNote: string;
  lutApplied: LutPreset;
  soundRoll: string;
  audioSync: 'LOCKED' | 'DRIFT_DETECTED' | 'WILD_TRACK';
  cameraCard: string;
  aperture: string;
  iso: number;
}

export type DepartmentType = 'CAMERA' | 'SOUND' | 'LIGHTING' | 'GRIP' | 'ART' | 'WARDROBE' | 'PRODUCTION' | 'DIRECTING';
export type CrewStatus = 'ON_STAGE' | 'EN_ROUTE' | 'PREPPING' | 'WRAPPED';

export interface CrewMember {
  id: string;
  name: string;
  department: DepartmentType;
  role: string;
  callTime: string;
  phone: string;
  walkieChannel: number;
  status: CrewStatus;
  perDiemStatus: 'APPROVED' | 'PENDING';
  badgeId: string;
}

export interface ShootDayMeta {
  dayNumber: number;
  totalDays: number;
  productionTitle: string;
  director: string;
  dop: string;
  shootDate: string;
  unitCallTime: string;
  location: string;
  weather: {
    condition: string;
    tempC: number;
    sunrise: string;
    sunset: string;
    magicHour: string;
  };
  hospitalNearest: string;
  soundStage: string;
}

export interface CineContextType {
  meta: ShootDayMeta;
  scenes: SceneItem[];
  castMembers: CastCallMember[];
  dailiesClips: DailiesClip[];
  crewMembers: CrewMember[];
  activeSceneId: string;
  timecode: string;
  activeFilter: 'ALL' | 'INT' | 'EXT' | 'NIGHT' | 'DAY';
  setActiveFilter: (filter: 'ALL' | 'INT' | 'EXT' | 'NIGHT' | 'DAY') => void;
  updateSceneStatus: (id: string, status: SceneStatus) => void;
  updateCastStatus: (id: string, status: CastCallMember['status']) => void;
  addScene: (scene: Omit<SceneItem, 'id'>) => void;
  toggleCircleTake: (clipId: string) => void;
  setClipLut: (clipId: string, lut: LutPreset) => void;
  updateCrewStatus: (id: string, status: CrewStatus) => void;
  broadcastCallAlert: (customMessage: string) => void;
  activeSlate: {
    roll: string;
    scene: string;
    take: number;
    fps: number;
    shutter: string;
    iso: number;
    kelvin: number;
  };
  incrementTake: () => void;
  setSlateScene: (sceneNum: string) => void;
}
