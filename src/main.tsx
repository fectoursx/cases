import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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
    <App />
  </React.StrictMode>
); 