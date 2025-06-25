import { create } from 'zustand';
import { Case, GameSession, SpinResult } from '@/types/game';

interface GameState {
  currentCase: Case | null;
  isSpinning: boolean;
  currentSession: GameSession | null;
  spinResult: SpinResult | null;
  showResult: boolean;
}

interface GameActions {
  openCase: (caseData: Case, isDemo: boolean) => void;
  closeCase: () => void;
  startSpin: () => void;
  finishSpin: (result: SpinResult) => void;
  showSpinResult: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  currentCase: null,
  isSpinning: false,
  currentSession: null,
  spinResult: null,
  showResult: false,

  openCase: (caseData, isDemo) => {
    const session: GameSession = {
      caseId: caseData.id,
      isDemo,
      startTime: Date.now()
    };

    set({
      currentCase: caseData,
      currentSession: session,
      isSpinning: false,
      spinResult: null,
      showResult: false
    });
  },

  closeCase: () => {
    set({
      currentCase: null,
      currentSession: null,
      isSpinning: false,
      spinResult: null,
      showResult: false
    });
  },

  startSpin: () => {
    const { currentCase } = get();
    if (!currentCase) return;

    set({ isSpinning: true, showResult: false });

    // Симуляция спина с задержкой
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * currentCase.items.length);
      const winningPrize = currentCase.items[randomIndex];
      
      const result: SpinResult = {
        prize: winningPrize,
        position: randomIndex,
        timestamp: Date.now()
      };

      set((state) => ({
        isSpinning: false,
        spinResult: result,
        currentSession: state.currentSession ? {
          ...state.currentSession,
          result
        } : null
      }));

      // Показываем результат через небольшую задержку
      setTimeout(() => {
        set({ showResult: true });
      }, 1000);
    }, 8000);
  },

  finishSpin: (result) => {
    set((state) => ({
      isSpinning: false,
      spinResult: result,
      currentSession: state.currentSession ? {
        ...state.currentSession,
        result
      } : null
    }));
  },

  showSpinResult: () => {
    set({ showResult: true });
  },

  resetGame: () => {
    set({
      currentCase: null,
      currentSession: null,
      isSpinning: false,
      spinResult: null,
      showResult: false
    });
  }
})); 