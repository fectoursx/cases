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

  // Генерируем цвета для радиального градиента на основе цены
  const getGradientColor = (price: number) => {
    if (price === 0) return '#23C265'; // Зеленый для бесплатных
    if (price <= 1) return '#0095EA'; // Синий
    if (price <= 5) return '#8A2BFF'; // Фиолетовый
    if (price <= 15) return '#FF5C2B'; // Оранжевый
    if (price <= 50) return '#FFAE00'; // Желтый
    return '#FF484A'; // Красный для дорогих
  };

  const gradientColor = getGradientColor(caseData.price);
  const backgroundStyle = caseData.price === 0 
    ? {} // Для FREE кейса используем отдельный стиль
    : {
        background: `radial-gradient(61.63% 100.04% at 43.18% 123.86%, ${gradientColor}40 0%, ${gradientColor}00 100%), linear-gradient(rgba(20, 20, 21, 0) 0%, rgb(20, 20, 21) 100%)`
      };

  return (
    <div 
      className={`${styles.caseCard} ${caseData.price === 0 ? styles.freeCase : ''}`}
      onClick={handleOpenCase}
      style={backgroundStyle}
    >
      <div className={styles.caseImageContainer}>
        {caseData.price === 0 && (
          <div className={styles.freeBadge}>
            <span>NEW</span>
          </div>
        )}
        <img 
          src={caseData.image} 
          alt={caseData.name} 
          className={styles.caseImage} 
        />
      </div>
      <div className={styles.caseFooter}>
        {caseData.price > 0 ? (
          <div className={styles.casePrice}>
            {caseData.price} <span className={styles.token}>T</span>
          </div>
        ) : (
          <div className={styles.freeLabel}>Free Case</div>
        )}
      </div>
    </div>
  );
}; 