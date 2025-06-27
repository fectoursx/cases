import React from 'react';
import { Prize } from '@/types/game';
import { ASSET_PATHS, MESSAGES } from '@/utils/constants';
import styles from '../RouletteWheel.module.css';

interface PrizesSectionProps {
  items: Prize[];
  maxItems?: number;
}

export const PrizesSection: React.FC<PrizesSectionProps> = ({ 
  items, 
  maxItems = 9 
}) => {
  const displayItems = items.slice(0, maxItems);

  return (
    <div className={styles.prizesSection}>
      <div className={styles.prizesTitle}>{MESSAGES.POSSIBLE_PRIZES}</div>
      <div className={styles.prizesGrid}>
        {displayItems.map((item) => (
          <div key={item.id} className={styles.prizeGridItem}>
            <img src={item.image} alt={item.name} />
            <div className={styles.prizePrice}>
              <img 
                src={ASSET_PATHS.IMAGES.TON} 
                alt="TON" 
                style={{ width: '10px', height: '10px' }}
              />
              <span>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 