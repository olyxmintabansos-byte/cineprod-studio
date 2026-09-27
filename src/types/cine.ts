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
  activeSceneId: string;
  timecode: string;
  activeFilter: 'ALL' | 'INT' | 'EXT' | 'NIGHT' | 'DAY';
  setActiveFilter: (filter: 'ALL' | 'INT' | 'EXT' | 'NIGHT' | 'DAY') => void;
  updateSceneStatus: (id: string, status: SceneStatus) => void;
  updateCastStatus: (id: string, status: CastCallMember['status']) => void;
  addScene: (scene: Omit<SceneItem, 'id'>) => void;
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
