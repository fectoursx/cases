import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUIStore } from '@/store/uiStore';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import { HomePage } from '@/pages/HomePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import './App.css';

const AppContent: React.FC = () => {
  const { activePage } = useUIStore();
  const { webApp, isExpanded, isAvailable } = useTelegramWebApp();

  useEffect(() => {  }, [webApp]);

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
    <div className={`app-container ${isAvailable ? 'tg-viewport' : ''} ${isExpanded ? 'tg-expanded' : ''}`}>
      {renderPage()}
      <BottomNavigation />
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