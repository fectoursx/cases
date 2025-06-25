import React, { useState, useRef, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useGameStore } from '@/store/gameStore';
import { useUserStore } from '@/store/userStore';
import { PrizeCard } from '../PrizeCard';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import styles from './RouletteWheel.module.css';

export const RouletteWheel: React.FC = () => {
  const { 
    currentCase, 
    isSpinning, 
    spinResult, 
    showResult, 
    startSpin, 
    closeCase 
  } = useGameStore();
  const { user, addToInventory } = useUserStore();
  const [demoMode, setDemoMode] = useState(false);
  const rouletteRef = useRef<HTMLDivElement>(null);

  const rouletteAnimation = useSpring({
    from: { transform: 'translateX(0%)' },
    to: { 
      transform: isSpinning 
        ? 'translateX(-4000%)' 
        : 'translateX(0%)' 
    },
    config: { 
      duration: isSpinning ? 8000 : 0,
      tension: 60,
      friction: 25
    },
    reset: !isSpinning
  });

  const handleSpin = () => {
    if (!currentCase) return;

    // Проверяем достаточность средств для реального режима
    if (!demoMode && user.balance < currentCase.price) {
      return;
    }

    startSpin();
  };

  const handleClose = () => {
    closeCase();
  };

  const handleModeToggle = (mode: 'real' | 'demo') => {
    setDemoMode(mode === 'demo');
  };

  // Добавляем приз в инвентарь после выигрыша
  useEffect(() => {
    if (spinResult && !demoMode && currentCase) {
      addToInventory(spinResult.prize, currentCase.name);
    }
  }, [spinResult, demoMode, currentCase, addToInventory]);

  if (!currentCase) return null;

  const hasEnoughFunds = user.balance >= currentCase.price;

  return (
    <Modal
      isOpen={!!currentCase}
      onClose={handleClose}
      title={currentCase.name}
      size="lg"
    >
      {!showResult ? (
        <div className={styles.rouletteContainer}>
          <div className={styles.rouletteViewport}>
            <div className={styles.rouletteMarker}></div>
            <animated.div 
              className={styles.rouletteItems} 
              style={rouletteAnimation}
              ref={rouletteRef}
            >
              {Array(40).fill(null).map((_, arrayIndex) => (
                currentCase.items.map((item, itemIndex) => (
                  <PrizeCard 
                    key={`${item.id}-${arrayIndex}-${itemIndex}`} 
                    prize={item}
                    className={styles.rouletteItem}
                  />
                ))
              ))}
            </animated.div>
          </div>

          <div className={styles.modeSelector}>
            <Button 
              variant={!demoMode ? 'primary' : 'outline'}
              onClick={() => handleModeToggle('real')}
              size="sm"
            >
              Real
            </Button>
            <Button 
              variant={demoMode ? 'primary' : 'outline'}
              onClick={() => handleModeToggle('demo')}
              size="sm"
            >
              Demo
            </Button>
          </div>

          {!hasEnoughFunds && !demoMode ? (
            <div className={styles.insufficientFunds}>
              <div className={styles.infoMessage}>
                <span className={styles.infoIcon}>ⓘ</span> 
                Недостаточно средств
              </div>
              <Button variant="secondary">
                Пополнить
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleSpin}
              disabled={isSpinning}
              loading={isSpinning}
              size="lg"
              className={styles.spinButton}
            >
              {isSpinning ? 'Крутим...' : 'Крутить'}
            </Button>
          )}
        </div>
      ) : (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>Вы выиграли!</h3>
          <div className={styles.resultPrize}>
            {spinResult && (
              <PrizeCard 
                prize={spinResult.prize} 
                className={styles.winningPrize}
              />
            )}
          </div>
          <Button 
            onClick={handleClose}
            variant="primary"
            size="lg"
          >
            Забрать приз
          </Button>
        </div>
      )}
    </Modal>
  );
}; 