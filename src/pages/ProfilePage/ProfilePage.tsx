import React from 'react';
import { ArrowLeft, Wallet, Package } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './ProfilePage.module.css';

export const ProfilePage: React.FC = () => {
  const { user, disconnectWallet } = useUserStore();
  const { setActivePage } = useUIStore();

  const handleBackClick = () => {
    setActivePage('main');
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.title}>Профиль</h1>
      </div>

      <div className={styles.content}>
        <Card className={styles.userCard}>
          <div className={styles.userInfo}>
            <img 
              src={user.avatar} 
              alt="User avatar" 
              className={styles.avatar} 
            />
            <div className={styles.userDetails}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userId}>{user.id}</p>
            </div>
          </div>
        </Card>

        <Card className={styles.balanceCard}>
          <div className={styles.balanceHeader}>
            <Wallet size={24} />
            <span>Баланс</span>
          </div>
          <div className={styles.balanceAmount}>
            {user.balance.toFixed(2)} <span className={styles.token}>T</span>
          </div>
          <div className={styles.walletInfo}>
            {user.wallet ? (
              <div className={styles.walletConnected}>
                <span>Кошелек: {user.wallet}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={disconnectWallet}
                >
                  Отключить
                </Button>
              </div>
            ) : (
              <Button variant="primary">
                Подключить кошелек
              </Button>
            )}
          </div>
        </Card>

        <Card className={styles.inventoryCard}>
          <div className={styles.inventoryHeader}>
            <Package size={24} />
            <span>Инвентарь</span>
            <span className={styles.inventoryCount}>
              {user.inventory.length}
            </span>
          </div>
          <div className={styles.inventoryItems}>
            {user.inventory.length === 0 ? (
              <p className={styles.emptyInventory}>
                Ваш инвентарь пуст. Откройте кейсы, чтобы получить предметы!
              </p>
            ) : (
              user.inventory.map((item) => (
                <div key={item.id} className={styles.inventoryItem}>
                  <img 
                    src={item.prize.image} 
                    alt={item.prize.name} 
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.prize.name}</span>
                    <span className={styles.itemPrice}>
                      {item.prize.price.toFixed(2)} T
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}; 