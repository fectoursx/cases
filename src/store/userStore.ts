import { create } from 'zustand';
import { User, InventoryItem } from '@/types/user';
import { Prize } from '@/types/game';

interface UserState {
  user: User;
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  setUser: (user: User) => void;
  updateBalance: (amount: number) => void;
  addToInventory: (prize: Prize, fromCase: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  disconnectWallet: () => void;
}

const initialUser: User = {
  id: '718903327',
  name: 'Qiwi',
  avatar: '/assets/images/avatar.png',
  balance: 100.00,
  wallet: 'UQDKd...hxwP',
  inventory: []
};

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: initialUser,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  updateBalance: (amount) => 
    set((state) => ({
      user: {
        ...state.user,
        balance: Math.max(0, state.user.balance + amount)
      }
    })),

  addToInventory: (prize, fromCase) =>
    set((state) => {
      const inventoryItem: InventoryItem = {
        id: `${Date.now()}-${prize.id}`,
        prize,
        obtainedAt: Date.now(),
        fromCase
      };
      
      return {
        user: {
          ...state.user,
          inventory: [...state.user.inventory, inventoryItem]
        }
      };
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  disconnectWallet: () =>
    set((state) => ({
      user: {
        ...state.user,
        wallet: undefined
      }
    }))
})); 