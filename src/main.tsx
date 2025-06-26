import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Loader } from '@/components/ui/Loader';
import './index.css';

// Расширяем глобальный Window для Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
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
      };
    };
  }
}

// Инициализация Telegram Web App
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  
  // Готовность приложения
  tg.ready();
  
  // Разворачиваем приложение на весь экран
  tg.expand();
  
  // Настраиваем цвета интерфейса
  tg.setHeaderColor('#141415');
  tg.setBackgroundColor('#141415');
  
  // Отключаем подтверждение закрытия для лучшего UX
  tg.disableClosingConfirmation();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div className="app-loading"><Loader text="Loading application..." size="lg" /></div>}>
      <App />
    </Suspense>
  </React.StrictMode>
); 