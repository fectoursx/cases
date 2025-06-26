import React from 'react';
import { useUIStore } from '@/store/uiStore';
import styles from './BottomNavigation.module.css';

interface NavigationTab {
  id: string;
  label: string;
  icon: 'main' | 'weekly' | 'jackpot' | 'upgrade' | 'profile';
}

const navigationTabs: NavigationTab[] = [
  { id: 'main', label: 'Main', icon: 'main' },
  { id: 'weekly', label: 'Weekly', icon: 'weekly' },
  { id: 'upgrade', label: 'Upgrade', icon: 'upgrade' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
];

const renderIcon = (iconType: string) => {
  switch (iconType) {
    case 'main':
      return (
        <div className={styles.mainIcon}>
          <div className={styles.mainSquare}></div>
          <div className={styles.mainSquare}></div>
          <div className={styles.mainSquare}></div>
          <div className={styles.mainSquare}></div>
        </div>
      );
    case 'weekly':
      return <img src="/assets/images/lightning.svg" alt="Weekly" className={styles.iconImage} />;
    case 'jackpot':
      return <img src="/assets/images/jackpot.svg" alt="JackPot" className={styles.iconImage} />;
    case 'upgrade':
      return <img src="/assets/images/upgrade.svg" alt="Upgrade" className={styles.iconImage} />;
    case 'profile':
      return <img src="/assets/images/profile.svg" alt="Profile" className={styles.iconImage} />;
    default:
      return null;
  }
};

export const BottomNavigation: React.FC = () => {
  const { activePage, setActivePage } = useUIStore();

  return (
    <nav className={styles.footerMenu}>
      {navigationTabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.footerTab} ${activePage === tab.id ? styles.footerTabActive : ''}`}
          onClick={() => setActivePage(tab.id as any)}
        >
          <div className={styles.footerIcon}>
            {renderIcon(tab.icon)}
          </div>
          <div className={styles.footerLabel}>{tab.label}</div>
        </div>
      ))}
    </nav>
  );
}; 