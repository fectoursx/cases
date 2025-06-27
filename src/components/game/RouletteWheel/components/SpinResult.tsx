import React from 'react';
import { SpinResult } from '@/types/game';
import { ASSET_PATHS, MESSAGES } from '@/utils/constants';
import { THEME_COLORS } from '@/styles/theme';
import styles from '../RouletteWheel.module.css';

interface SpinResultDisplayProps {
  spinResult: SpinResult;
  caseName: string;
  onKeepPrize: () => void;
  onQuickSell: () => void;
  onUpgrade: () => void;
}

export const SpinResultDisplay: React.FC<SpinResultDisplayProps> = ({
  spinResult,
  caseName,
  onKeepPrize,
  onQuickSell,
  onUpgrade
}) => {
  return (
    <div className={styles.resultContainer}>
      <div style={{ 
        fontSize: '18px', 
        color: THEME_COLORS.textSecondary, 
        marginBottom: '8px' 
      }}>
        {caseName}
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: THEME_COLORS.primary
      }}>
        <img 
          src={ASSET_PATHS.IMAGES.TON} 
          alt="TON" 
          style={{ width: '24px', height: '24px' }}
        />
        <span>{spinResult.prize.price}</span>
        <span style={{ fontSize: '16px', color: THEME_COLORS.text }}>✦</span>
      </div>

      <div className={styles.resultPrize}>
        <div style={{ 
          textAlign: 'center',
          background: THEME_COLORS.surfaceTransparent,
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          position: 'relative'
        }}>
          <img 
            src={spinResult.prize.image} 
            alt={spinResult.prize.name}
            style={{ 
              width: '120px', 
              height: '120px', 
              objectFit: 'contain',
            }}
          />
          <div style={{ 
            position: 'absolute', 
            top: '-10px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            background: THEME_COLORS.overlay,
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px'
          }}>
            ✦ ✦ ✦
          </div>
        </div>
      </div>

      <div className={styles.resultActions}>
        <button 
          className={styles.keepButton}
          onClick={onKeepPrize}
        >
          {MESSAGES.KEEP_IT}
        </button>
        <button 
          className={styles.quickSellButton}
          onClick={onQuickSell}
        >
          {MESSAGES.QUICK_SELL} {spinResult.prize.price}
          <img 
            src={ASSET_PATHS.IMAGES.TON} 
            alt="TON" 
            style={{ width: '14px', height: '14px' }}
          />
        </button>
        <button 
          className={styles.upgradeButton}
          onClick={onUpgrade}
        >
          {MESSAGES.UPGRADE}
        </button>
      </div>
    </div>
  );
}; 