import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useCasesStore } from '@/store/casesStore';
import { Header } from '@/components/layout/Header';
import { LiveStatusBar } from '@/components/layout/LiveStatusBar';
import { CaseCard } from '@/components/game/CaseCard';
import { RouletteWheel } from '@/components/game/RouletteWheel';
import { Button } from '@/components/ui/Button';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const { cases, isLoading } = useCasesStore();

  if (isLoading) {
    return (
      <div className={styles.homePage}>
        <Header />
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <Header />
      
      <div className={styles.casesContainer}>
        {/* Live status bar */}
        <LiveStatusBar />

        {/* Free case banner */}
        <div className={styles.freeCaseBanner}>
          <div className={styles.lightningIcon}>
            <img src="/assets/images/lightning.svg" alt="Lightning" />
          </div>
          <div className={styles.bannerContent}>
            <div className={styles.coinWrapper}>
              <img src="/assets/images/wizard-hat.png" alt="Coin" />
            </div>
            <div className={styles.bannerText}>Check our news</div>
          </div>
          <Button size="sm" className={styles.telegramButton}>
            Open @case
          </Button>
        </div>
        
        {/* Сетка кейсов */}
        <div className={styles.casesGrid}>
          {cases.length > 0 ? (
            cases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseData={caseItem} />
            ))
          ) : (
            <div className={styles.noCases}>
              Кейсы загружаются...
            </div>
          )}
        </div>
      </div>
      
      {/* Компонент рулетки */}
      <RouletteWheel />
    </div>
  );
}; 