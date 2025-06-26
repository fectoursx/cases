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
        MainButton: {
          setText(text: string): void;
          show(): void;
          hide(): void;
        };
      };
    };
  }
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