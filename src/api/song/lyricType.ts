interface Lrc {
  version: number;
  lyric: string;
}

interface Klyric {
  version: number;
  lyric: string;
}

interface Tlyric {
  version: number;
  lyric: string;
}

interface Romalrc {
  version: number;
  lyric: string;
}

export interface Lyric {
  sgc: boolean;
  sfy: boolean;
  qfy: boolean;
  lrc: Lrc;
  klyric: Klyric;
  tlyric: Tlyric;
  romalrc: Romalrc;
  code: number;
}
