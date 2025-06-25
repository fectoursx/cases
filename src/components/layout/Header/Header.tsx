import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { user } = useUserStore();
  const { setActivePage } = useUIStore();

  const handleProfileClick = () => {
    setActivePage('profile');
  };

  return (
    <header className={styles.userHeader}>
      <div className={styles.userHeaderRow}>
        <div className={styles.profile} onClick={handleProfileClick}>
          <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{user.name}</div>
          </div>
        </div>
        
        <div className={styles.walletSection}>
          <div className={styles.walletDropdownContainer}>
            <button className={styles.walletAddressButton}>
              <span>{user.wallet || 'UQDKd...hxwP'}</span>
              <ChevronDown size={10} />
            </button>
          </div>
          <div className={styles.coinCountContainer} onClick={handleProfileClick}>
            <div className={styles.coinCount}>{user.balance.toFixed(2)}</div>
            <div className={styles.coinContainer}>
              <div className={styles.coin}>
                <div className={styles.coinIcon}>V</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 