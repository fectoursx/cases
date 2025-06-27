import React from 'react';
import { ASSET_PATHS, MESSAGES } from '@/utils/constants';
import { THEME_COLORS } from '@/styles/theme';
import styles from '../RouletteWheel.module.css';

interface ActionButtonsProps {
  isSpinning: boolean;
  hasEnoughFunds: boolean;
  spinCost: number;
  onSpin: () => void;
  onQuickSpin: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSpinning,
  hasEnoughFunds,
  spinCost,
  onSpin,
  onQuickSpin
}) => {
  return (
    <>
      <div className={styles.actionButtons}>
        <button 
          className={styles.spinButton}
          onClick={onSpin}
          disabled={isSpinning || !hasEnoughFunds}
        >
          {isSpinning ? MESSAGES.SPINNING : `Spin ${spinCost.toFixed(2)}`}
          <img 
            src={ASSET_PATHS.IMAGES.TON} 
            alt="TON" 
            style={{ width: '16px', height: '16px', marginLeft: '8px' }}
          />
        </button>
        <button 
          className={styles.quickSpinButton}
          onClick={onQuickSpin}
          disabled={isSpinning || !hasEnoughFunds}
        >
          Quick Spin {spinCost.toFixed(2)}
          <img 
            src={ASSET_PATHS.IMAGES.TON} 
            alt="TON" 
            style={{ width: '14px', height: '14px' }}
          />
        </button>
      </div>

      {!hasEnoughFunds && (
        <div style={{ 
          textAlign: 'center', 
          color: THEME_COLORS.textSecondary, 
          fontSize: '14px',
          marginTop: '12px'
        }}>
          {MESSAGES.INSUFFICIENT_BALANCE} {spinCost.toFixed(2)} TON
        </div>
      )}
    </>
  );
}; 