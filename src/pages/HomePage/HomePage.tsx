import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useCasesStore } from '@/store/casesStore';
import { Header } from '@/components/layout/Header';
import { CaseCard } from '@/components/game/CaseCard';
import { RouletteWheel } from '@/components/game/RouletteWheel';
import { Button } from '@/components/ui/Button';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const { cases } = useCasesStore();

  return (
    <div className={styles.homePage}>
      <Header />
      
      <div className={styles.casesContainer}>
        {/* Верхний ряд с иконками "Live" */}
        <div className={styles.casesRow}>
          <div className={styles.caseIcon}>
            <div className={styles.liveIndicator}>
              <span className={styles.liveDot}></span>
              Live
            </div>
          </div>
          <div className={styles.caseIcon}>
            <img src="/assets/images/wizard-hat.png" alt="Wizard Hat" />
          </div>
          <div className={styles.caseIcon}>
            <img src="/assets/images/token.png" alt="Token" />
          </div>
          <div className={styles.caseIcon}>
            <img src="/assets/images/token.png" alt="Token" />
          </div>
          <div className={styles.caseIcon}>
            <img src="/assets/images/gift.png" alt="Gift" />
          </div>
          <div className={styles.caseIcon}>
            <img src="/assets/images/token-gold.png" alt="Gold Token" />
          </div>
        </div>
        
        {/* Баннер новостей */}
        <div className={styles.newsBanner}>
          <div className={styles.newsIcon}>
            <AlertTriangle size={20} />
          </div>
          <span className={styles.newsText}>Проверьте наши новости</span>
          <Button size="sm" variant="outline">
            Открыть @case
          </Button>
        </div>
        
        {/* Сетка кейсов */}
        <div className={styles.casesGrid}>
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseData={caseItem} />
          ))}
        </div>
      </div>
      
      {/* Компонент рулетки */}
      <RouletteWheel />
    </div>
  );
}; 