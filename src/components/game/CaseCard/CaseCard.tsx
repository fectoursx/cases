import React from 'react';
import { Case } from '@/types/game';
import { useGameStore } from '@/store/gameStore';
import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import styles from './CaseCard.module.css';

interface CaseCardProps {
  caseData: Case;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  const { openCase } = useGameStore();
  const { user, updateBalance } = useUserStore();
  const { addNotification } = useUIStore();

  const handleOpenCase = () => {
    // Проверяем, достаточно ли средств для открытия кейса
    if (caseData.price > 0 && user.balance < caseData.price) {
      addNotification({
        type: 'error',
        message: 'Недостаточно средств для открытия кейса'
      });
      return;
    }

    // Списываем средства если кейс не бесплатный
    if (caseData.price > 0) {
      updateBalance(-caseData.price);
    }

    // Открываем кейс
    openCase(caseData, false);
  };

  return (
    <div 
      className={styles.caseCard} 
      onClick={handleOpenCase}
      style={{ background: caseData.background }}
    >
      <img 
        src={caseData.image} 
        alt={caseData.name} 
        className={styles.caseImage} 
      />
      <div className={styles.caseInfo}>
        <h3 className={styles.caseName}>{caseData.name}</h3>
        {caseData.price > 0 && (
          <div className={styles.casePrice}>
            {caseData.price} <span className={styles.token}>T</span>
          </div>
        )}
        {caseData.price === 0 && (
          <div className={styles.freeLabel}>FREE</div>
        )}
      </div>
    </div>
  );
}; 