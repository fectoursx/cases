import React from 'react';
import { useApp } from '../context/AppContext';
import './Footer.css';

const Footer = () => {
  const { activePage, setPage } = useApp();

  const handleTabClick = (tabName) => {
    setPage(tabName);
    console.log(`Переключение на вкладку: ${tabName}`);
    // Здесь можно добавить логику для переключения страниц
  };

  return (
    <nav className="footer-menu">
      <div 
        className={`footer-tab ${activePage === 'main' ? 'footer-tab-active' : ''}`}
        onClick={() => handleTabClick('main')}
      >
        <div className="footer-icon">
          <div className="main-icon">
            <div className="main-square"></div>
            <div className="main-square"></div>
            <div className="main-square"></div>
            <div className="main-square"></div>
          </div>
        </div>
        <div className="footer-label">Main</div>
      </div>
      
      <div 
        className={`footer-tab ${activePage === 'weekly' ? 'footer-tab-active' : ''}`}
        onClick={() => handleTabClick('weekly')}
      >
        <div className="footer-icon">
          <img src="/assets/images/lightning.svg" alt="Weekly" className="icon-image" />
        </div>
        <div className="footer-label">Weekly</div>
      </div>
      
      <div 
        className={`footer-tab ${activePage === 'jackpot' ? 'footer-tab-active' : ''}`}
        onClick={() => handleTabClick('jackpot')}
      >
        <div className="footer-icon">
          <img src="/assets/images/jackpot.svg" alt="JackPot" className="icon-image" />
        </div>
        <div className="footer-label">JackPot</div>
      </div>
      
      <div 
        className={`footer-tab ${activePage === 'upgrade' ? 'footer-tab-active' : ''}`}
        onClick={() => handleTabClick('upgrade')}
      >
        <div className="footer-icon">
          <img src="/assets/images/upgrade.svg" alt="Upgrade" className="icon-image" />
        </div>
        <div className="footer-label">Upgrade</div>
      </div>
      
      <div 
        className={`footer-tab ${activePage === 'profile' ? 'footer-tab-active' : ''}`}
        onClick={() => handleTabClick('profile')}
      >
        <div className="footer-icon">
          <img src="/assets/images/profile.svg" alt="Profile" className="icon-image" />
        </div>
        <div className="footer-label">Profile</div>
      </div>
    </nav>
  );
};

export default Footer; 