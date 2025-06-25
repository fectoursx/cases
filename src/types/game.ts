export interface Prize {
  id: number;
  name: string;
  price: number;
  image: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Case {
  id: number;
  name: string;
  image: string;
  price: number;
  background: string;
  items: Prize[];
}

export interface SpinResult {
  prize: Prize;
  position: number;
  timestamp: number;
}

export interface GameSession {
  caseId: number;
  isDemo: boolean;
  startTime: number;
  result?: SpinResult;
} 