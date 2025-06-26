import { useEffect, useState } from 'react';

interface TelegramWebApp {
  ready(): void;
  expand(): void;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  MainButton: {
    setText(text: string): void;
    show(): void;
    hide(): void;
  };
}

export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      setWebApp(tg);
      
      // Инициализация
      tg.ready();
      
      // Разворачиваем на весь экран
      tg.expand();
      setIsExpanded(tg.isExpanded);
      
      // Настраиваем цвета
      tg.setHeaderColor('#141415');
      tg.setBackgroundColor('#141415');
      
      // Отключаем подтверждение закрытия
      tg.disableClosingConfirmation();
      
      // Обновляем CSS переменные для viewport
      const updateViewportHeight = () => {
        document.documentElement.style.setProperty('--tg-viewport-height', `${tg.viewportHeight}px`);
        document.documentElement.style.setProperty('--tg-viewport-stable-height', `${tg.viewportStableHeight}px`);
      };
      
      updateViewportHeight();
      
      // Слушаем изменения viewport
      const handleViewportChanged = () => {
        updateViewportHeight();
        setIsExpanded(tg.isExpanded);
      };
      
      // Добавляем обработчик событий (если поддерживается)
      if ('addEventListener' in tg) {
        (tg as any).addEventListener('viewportChanged', handleViewportChanged);
      }
      
      return () => {
        if ('removeEventListener' in tg) {
          (tg as any).removeEventListener('viewportChanged', handleViewportChanged);
        }
      };
    }
  }, []);

  return {
    webApp,
    isExpanded,
    isAvailable: !!webApp
  };
}; 