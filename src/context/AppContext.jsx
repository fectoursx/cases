import { createContext, useState, useContext } from 'react';

// Создаем контекст приложения
const AppContext = createContext();

// Данные для демонстрации
const mockCases = [
  {
    id: 1,
    name: 'Free Case',
    image: '/src/assets/images/free-case.png',
    price: 0,
    background: '#0088FF',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/src/assets/images/teddy.png' },
      { id: 2, name: 'Scroll', price: 24.06, image: '/src/assets/images/scroll.png' },
    ]
  },
  {
    id: 2,
    name: 'Heroic helmet',
    image: '/src/assets/images/helmet.png',
    price: 5,
    background: '#8B4513',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/src/assets/images/teddy.png' },
      { id: 2, name: 'Scroll', price: 24.06, image: '/src/assets/images/scroll.png' },
      { id: 3, name: 'Frog', price: 1562.28, image: '/src/assets/images/frog.png' },
      { id: 4, name: 'Diamond', price: 48.15, image: '/src/assets/images/diamond.png' },
    ]
  },
  {
    id: 3,
    name: 'Dragon Scale',
    image: '/src/assets/images/dragon.png',
    price: 10,
    background: '#FF4500',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/src/assets/images/teddy.png' },
      { id: 2, name: 'Scroll', price: 24.06, image: '/src/assets/images/scroll.png' },
    ]
  },
  {
    id: 4,
    name: 'Burger',
    image: '/src/assets/images/burger.png',
    price: 15,
    background: '#FFD700',
    items: [
      { id: 1, name: 'Teddy Bear', price: 10.91, image: '/src/assets/images/teddy.png' },
      { id: 2, name: 'Scroll', price: 24.06, image: '/src/assets/images/scroll.png' },
    ]
  }
];

// Провайдер контекста
export const AppProvider = ({ children }) => {
  // Состояние пользователя
  const [user, setUser] = useState({
    name: 'Dmitry',
    id: '#718903327',
    avatar: '/src/assets/images/avatar.png',
    balance: 0.00,
    wallet: 'UQDKd...hxwP',
    inventory: []
  });

  // Состояние для кейсов
  const [cases, setCases] = useState(mockCases);
  
  // Состояние для текущего открытого кейса
  const [currentCase, setCurrentCase] = useState(null);
  
  // Состояние для анимации рулетки
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Состояние для выигрыша
  const [prize, setPrize] = useState(null);

  // Функция для открытия кейса
  const openCase = (caseId, isDemo = false) => {
    const selectedCase = cases.find(c => c.id === caseId);
    if (!selectedCase) return;
    
    setCurrentCase(selectedCase);
    
    // Если не демо-режим и недостаточно средств, не открываем кейс
    if (!isDemo && user.balance < selectedCase.price) {
      return false;
    }
    
    // Если не демо-режим, списываем средства
    if (!isDemo) {
      setUser(prev => ({
        ...prev,
        balance: prev.balance - selectedCase.price
      }));
    }
    
    return true;
  };

  // Функция для запуска вращения рулетки
  const spinRoulette = (caseId, isDemo = false) => {
    const canOpen = openCase(caseId, isDemo);
    if (!canOpen) return;
    
    setIsSpinning(true);
    
    // Имитация задержки для анимации
    setTimeout(() => {
      // Выбираем случайный приз из кейса
      const selectedCase = cases.find(c => c.id === caseId);
      const randomIndex = Math.floor(Math.random() * selectedCase.items.length);
      const wonPrize = selectedCase.items[randomIndex];
      
      setPrize(wonPrize);
      setIsSpinning(false);
      
      // Если не демо-режим, добавляем приз в инвентарь
      if (!isDemo) {
        setUser(prev => ({
          ...prev,
          inventory: [...prev.inventory, wonPrize]
        }));
      }
    }, 3000);
  };

  // Функция для пополнения баланса
  const deposit = (amount) => {
    setUser(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  // Функция для отключения кошелька
  const disconnectWallet = () => {
    setUser(prev => ({
      ...prev,
      wallet: null
    }));
  };

  // Значение контекста
  const value = {
    user,
    setUser,
    cases,
    currentCase,
    isSpinning,
    prize,
    openCase,
    spinRoulette,
    deposit,
    disconnectWallet
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Хук для использования контекста
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

