import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUIStore } from '@/store/uiStore';
import { HomePage } from '@/pages/HomePage';
import { ProfilePage } from '@/pages/ProfilePage';
import './App.css';

const AppContent: React.FC = () => {
  const { activePage } = useUIStore();

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.MainButton.setText('Открыть кейс');
      window.Telegram.WebApp.MainButton.show();
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'main':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'weekly':
        return <div className="page-container"><h2>Weekly Page</h2><p>Coming soon...</p></div>;
      case 'jackpot':
        return <div className="page-container"><h2>JackPot Page</h2><p>Coming soon...</p></div>;
      case 'upgrade':
        return <div className="page-container"><h2>Upgrade Page</h2><p>Coming soon...</p></div>;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App; 