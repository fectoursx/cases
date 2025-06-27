import React, { useEffect } from 'react';
import { useSpring } from 'react-spring';
import { useUserStore } from '@/store/userStore';
import { useRoulette } from '@/hooks/useRoulette';
import { Modal } from '@/components/ui/Modal';
import { 
  MultiplierTabs, 
  RouletteViewport, 
  ActionButtons, 
  PrizesSection, 
  SpinResultDisplay 
} from './components';
import styles from './RouletteWheel.module.css';

export const RouletteWheel: React.FC = () => {
  const { 
    currentCase, 
    isSpinning, 
    spinResult, 
    showResult, 
    selectedMultiplier,
    finalPosition,
    handleSpin,
    handleQuickSpin,
    handleClose,
    handleMultiplierChange,
    resetPosition,
    getAnimationConfig,
    getRouletteItems,
    canAffordSpin,
    getSpinCost,
    multipliers
  } = useRoulette();

  const { addToInventory } = useUserStore();

  const rouletteAnimation = useSpring(getAnimationConfig());

  // Сброс позиции после закрытия результата
  useEffect(() => {
    if (!showResult && !isSpinning && finalPosition !== 0) {
      const timer = setTimeout(() => {
        resetPosition();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showResult, isSpinning, finalPosition, resetPosition]);

  const handleKeepPrize = () => {
    if (spinResult && currentCase) {
      addToInventory(spinResult.prize, currentCase.name);
      handleClose();
    }
  };

  const handleQuickSell = () => {
    if (spinResult) {
      // Добавляем цену приза к балансу пользователя
      handleClose();
    }
  };

  const handleUpgrade = () => {
    // Логика апгрейда
    handleClose();
  };

  if (!currentCase) return null;

  const rouletteItems = getRouletteItems();
  const hasEnoughFunds = canAffordSpin();
  const spinCost = getSpinCost();

  return (
    <Modal
      isOpen={!!currentCase}
      onClose={handleClose}
      title={currentCase.name}
      size="lg"
    >
      {!showResult ? (
        <div className={styles.rouletteContainer}>
          

          <RouletteViewport
            rouletteItems={rouletteItems}
            animationStyle={rouletteAnimation}
          />

          <ActionButtons
            isSpinning={isSpinning}
            hasEnoughFunds={hasEnoughFunds}
            spinCost={spinCost}
            onSpin={handleSpin}
            onQuickSpin={handleQuickSpin}
          />

          <PrizesSection items={currentCase.items} />
        </div>
      ) : (
        <>
          {spinResult && (
            <SpinResultDisplay
              spinResult={spinResult}
              caseName={currentCase.name}
              onKeepPrize={handleKeepPrize}
              onQuickSell={handleQuickSell}
              onUpgrade={handleUpgrade}
            />
          )}
          
          <PrizesSection items={currentCase.items} maxItems={9} />
        </>
      )}
    </Modal>
  );
}; 