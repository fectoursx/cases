import { create } from 'zustand';
import { Case } from '@/types/game';

interface CasesState {
  cases: Case[];
  isLoading: boolean;
  error: string | null;
}

interface CasesActions {
  setCases: (cases: Case[]) => void;
  addCase: (caseData: Case) => void;
  removeCase: (caseId: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const mockCases: Case[] = [
  {
    id: 1,
    name: 'Free Case',
    image: '/assets/images/free-case.png',
    price: 0,
    background: '#0088FF',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/assets/images/teddy.png', rarity: 'common' },
      { id: 2, name: 'Scroll', price: 24.06, image: '/assets/images/scroll.png', rarity: 'common' },
      { id: 3, name: 'Token', price: 5.50, image: '/assets/images/token.png', rarity: 'common' },
      { id: 4, name: 'Gold Token', price: 15.75, image: '/assets/images/token-gold.png', rarity: 'rare' },
      { id: 5, name: 'Wizard Hat', price: 35.20, image: '/assets/images/wizard-hat.png', rarity: 'rare' },
      { id: 6, name: 'Helmet', price: 18.90, image: '/assets/images/helmet.png', rarity: 'rare' },
      { id: 7, name: 'Diamond', price: 48.15, image: '/assets/images/diamond.png', rarity: 'epic' },
      { id: 8, name: 'Burger', price: 12.30, image: '/assets/images/burger.png', rarity: 'common' },
      { id: 9, name: 'Dragon', price: 89.99, image: '/assets/images/dragon.png', rarity: 'epic' },
      { id: 10, name: 'Frog', price: 1562.28, image: '/assets/images/frog.png', rarity: 'legendary' },
      { id: 11, name: 'Gift', price: 25.00, image: '/assets/images/gift.png', rarity: 'rare' },
      { id: 12, name: 'Lightning', price: 42.50, image: '/assets/images/lightning.svg', rarity: 'epic' },
    ]
  },
  {
    id: 2,
    name: 'Heroic helmet',
    image: '/assets/images/helmet.png',
    price: 5,
    background: '#8B4513',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/assets/images/teddy.png', rarity: 'common' },
      { id: 2, name: 'Scroll', price: 24.06, image: '/assets/images/scroll.png', rarity: 'common' },
      { id: 3, name: 'Frog', price: 1562.28, image: '/assets/images/frog.png', rarity: 'legendary' },
      { id: 4, name: 'Diamond', price: 48.15, image: '/assets/images/diamond.png', rarity: 'epic' },
      { id: 5, name: 'Token', price: 5.50, image: '/assets/images/token.png', rarity: 'common' },
      { id: 6, name: 'Gold Token', price: 15.75, image: '/assets/images/token-gold.png', rarity: 'rare' },
      { id: 7, name: 'Wizard Hat', price: 35.20, image: '/assets/images/wizard-hat.png', rarity: 'rare' },
      { id: 8, name: 'Helmet', price: 18.90, image: '/assets/images/helmet.png', rarity: 'rare' },
      { id: 9, name: 'Burger', price: 12.30, image: '/assets/images/burger.png', rarity: 'common' },
      { id: 10, name: 'Dragon', price: 89.99, image: '/assets/images/dragon.png', rarity: 'epic' },
      { id: 11, name: 'Gift', price: 25.00, image: '/assets/images/gift.png', rarity: 'rare' },
      { id: 12, name: 'Lightning', price: 42.50, image: '/assets/images/lightning.svg', rarity: 'epic' },
    ]
  },
  {
    id: 3,
    name: 'Dragon Scale',
    image: '/assets/images/dragon.png',
    price: 10,
    background: '#FF4500',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/assets/images/teddy.png', rarity: 'common' },
      { id: 2, name: 'Scroll', price: 24.06, image: '/assets/images/scroll.png', rarity: 'common' },
      { id: 3, name: 'Token', price: 5.50, image: '/assets/images/token.png', rarity: 'common' },
      { id: 4, name: 'Gold Token', price: 15.75, image: '/assets/images/token-gold.png', rarity: 'rare' },
      { id: 5, name: 'Wizard Hat', price: 35.20, image: '/assets/images/wizard-hat.png', rarity: 'rare' },
      { id: 6, name: 'Helmet', price: 18.90, image: '/assets/images/helmet.png', rarity: 'rare' },
      { id: 7, name: 'Diamond', price: 48.15, image: '/assets/images/diamond.png', rarity: 'epic' },
      { id: 8, name: 'Burger', price: 12.30, image: '/assets/images/burger.png', rarity: 'common' },
      { id: 9, name: 'Dragon', price: 89.99, image: '/assets/images/dragon.png', rarity: 'epic' },
      { id: 10, name: 'Frog', price: 1562.28, image: '/assets/images/frog.png', rarity: 'legendary' },
      { id: 11, name: 'Gift', price: 25.00, image: '/assets/images/gift.png', rarity: 'rare' },
      { id: 12, name: 'Lightning', price: 42.50, image: '/assets/images/lightning.svg', rarity: 'epic' },
    ]
  },
  {
    id: 4,
    name: 'Mystic Frog',
    image: '/assets/images/frog.png',
    price: 20,
    background: '#FFD700',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/assets/images/teddy.png', rarity: 'common' },
      { id: 2, name: 'Scroll', price: 24.06, image: '/assets/images/scroll.png', rarity: 'common' },
      { id: 3, name: 'Token', price: 5.50, image: '/assets/images/token.png', rarity: 'common' },
      { id: 4, name: 'Gold Token', price: 15.75, image: '/assets/images/token-gold.png', rarity: 'rare' },
      { id: 5, name: 'Wizard Hat', price: 35.20, image: '/assets/images/wizard-hat.png', rarity: 'rare' },
      { id: 6, name: 'Helmet', price: 18.90, image: '/assets/images/helmet.png', rarity: 'rare' },
      { id: 7, name: 'Diamond', price: 48.15, image: '/assets/images/diamond.png', rarity: 'epic' },
      { id: 8, name: 'Burger', price: 12.30, image: '/assets/images/burger.png', rarity: 'common' },
      { id: 9, name: 'Dragon', price: 89.99, image: '/assets/images/dragon.png', rarity: 'epic' },
      { id: 10, name: 'Frog', price: 1562.28, image: '/assets/images/frog.png', rarity: 'legendary' },
      { id: 11, name: 'Gift', price: 25.00, image: '/assets/images/gift.png', rarity: 'rare' },
      { id: 12, name: 'Lightning', price: 42.50, image: '/assets/images/lightning.svg', rarity: 'epic' },
    ]
  },
  {
    id: 5,
    name: 'Golden Gift',
    image: '/assets/images/gift.png',
    price: 1,
    background: '#32CD32',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/assets/images/teddy.png', rarity: 'common' },
      { id: 2, name: 'Token', price: 5.50, image: '/assets/images/token.png', rarity: 'common' },
      { id: 3, name: 'Gold Token', price: 15.75, image: '/assets/images/token-gold.png', rarity: 'rare' },
      { id: 4, name: 'Gift', price: 25.00, image: '/assets/images/gift.png', rarity: 'rare' },
    ]
  },
  {
    id: 6,
    name: 'Magic Scroll',
    image: '/assets/images/scroll.png',
    price: 3,
    background: '#4169E1',
    items: [
      { id: 1, name: 'Scroll', price: 24.06, image: '/assets/images/scroll.png', rarity: 'common' },
      { id: 2, name: 'Wizard Hat', price: 35.20, image: '/assets/images/wizard-hat.png', rarity: 'rare' },
      { id: 3, name: 'Diamond', price: 48.15, image: '/assets/images/diamond.png', rarity: 'epic' },
    ]
  },
  {
    id: 7,
    name: 'Bear Dream',
    image: '/assets/images/teddy.png',
    price: 25,
    background: '#FF1493',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/assets/images/teddy.png', rarity: 'common' },
      { id: 2, name: 'Frog', price: 1562.28, image: '/assets/images/frog.png', rarity: 'legendary' },
    ]
  },
  {
    id: 8,
    name: 'Diamond Vault',
    image: '/assets/images/diamond.png',
    price: 50,
    background: '#8A2BE2',
    items: [
      { id: 1, name: 'Diamond', price: 48.15, image: '/assets/images/diamond.png', rarity: 'epic' },
      { id: 2, name: 'Frog', price: 1562.28, image: '/assets/images/frog.png', rarity: 'legendary' },
    ]
  }
];

export const useCasesStore = create<CasesState & CasesActions>((set) => ({
  cases: mockCases,
  isLoading: false,
  error: null,

  setCases: (cases) => set({ cases }),

  addCase: (caseData) =>
    set((state) => ({
      cases: [...state.cases, caseData]
    })),

  removeCase: (caseId) =>
    set((state) => ({
      cases: state.cases.filter(c => c.id !== caseId)
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error })
})); 