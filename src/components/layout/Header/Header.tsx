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
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer} onClick={handleProfileClick}>
          <img src={user.avatar} alt="User avatar" className={styles.avatar} />
        </div>
        <span className={styles.username}>{user.name}</span>
      </div>
      
      <div className={styles.walletInfo}>
        <div className={styles.walletAddress}>
          {user.wallet} <ChevronDown size={16} />
        </div>
        <div className={styles.balance}>
          {user.balance.toFixed(2)} <span className={styles.token}>T</span>
        </div>
      </div>
    </header>
  );
}; 