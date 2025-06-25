// Константы приложения

export const APP_CONFIG = {
  name: 'Cases Frontend',
  version: '1.0.0',
  description: 'Приложение для открытия кейсов с рулеткой'
} as const;

export const GAME_CONFIG = {
  spinDuration: 8000, // Время вращения рулетки в мс
  resultDelay: 1000,  // Задержка перед показом результата в мс
  animationTension: 60,
  animationFriction: 25
} as const;

export const UI_CONFIG = {
  notificationDuration: 5000, // Время показа уведомления в мс
  maxInventoryDisplay: 50,    // Максимальное количество элементов для отображения в инвентаре
  caseGridColumns: {
    mobile: 2,
    tablet: 3,
    desktop: 4
  }
} as const;

export const RARITY_COLORS = {
  common: '#9ca3af',
  rare: '#3b82f6',
  epic: '#8b5cf6',
  legendary: '#f59e0b'
} as const;

export const TOKEN_SYMBOL = 'T';

export const ROUTES = {
  home: '/',
  profile: '/profile',
  inventory: '/inventory',
  weekly: '/weekly',
  jackpot: '/jackpot',
  upgrade: '/upgrade'
} as const; 