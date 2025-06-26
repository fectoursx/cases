import React, { useState, useRef, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useGameStore } from '@/store/gameStore';
import { useUserStore } from '@/store/userStore';
import { PrizeCard } from '../PrizeCard';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Loader } from '@/components/ui/Loader';
import styles from './RouletteWheel.module.css';

const MULTIPLIERS = [
  { value: 1, label: 'x1' },
  { value: 2, label: 'x2' },
  { value: 3, label: 'x3' }
];

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
  const [selectedMultiplier, setSelectedMultiplier] = useState(1);
  const rouletteRef = useRef<HTMLDivElement>(null);

  // Состояние анимации
  const [finalPosition, setFinalPosition] = useState(0);

  // Рассчитываем финальную позицию анимации
  const calculateFinalPosition = (winningIndex: number) => {
    if (!currentCase) return 0;
    
    const itemWidth = 108; // ширина элемента + gap (100px + 8px)
    const totalItems = currentCase.items.length;
    const baseSpins = 5; // количество полных оборотов для эффекта
    const baseDistance = baseSpins * totalItems * itemWidth;
    
    // Позиция выигрышного элемента для центрирования под курсором
    const winningPosition = winningIndex * itemWidth;
    const centerOffset = itemWidth / 2; // центрируем элемент под курсором
    
    return -(baseDistance + winningPosition - centerOffset);
  };

  // Анимация рулетки
  const rouletteAnimation = useSpring({
    from: { transform: 'translateX(0px)' },
    to: { 
      transform: isSpinning ? `translateX(${finalPosition}px)` : 'translateX(0px)'
    },
    config: { 
      duration: isSpinning ? 4000 : 300,
      easing: isSpinning 
        ? (t: number) => {
            // Easing для реалистичного замедления
            return 1 - Math.pow(1 - t, 4);
          }
        : (t: number) => t
    },
    reset: !isSpinning && !showResult
  });

  const handleSpin = () => {
    if (!currentCase) return;

    const totalPrice = currentCase.price * selectedMultiplier;
    if (user.balance < totalPrice) {
      return;
    }
    
    // Рассчитываем случайный индекс выигрышного элемента
    const randomItemIndex = Math.floor(Math.random() * currentCase.items.length);
    
    // Устанавливаем финальную позицию анимации
    const position = calculateFinalPosition(randomItemIndex);
    setFinalPosition(position);
    
    startSpin(randomItemIndex);
  };

  const handleQuickSpin = () => {
    if (!currentCase) return;

    const totalPrice = currentCase.price * selectedMultiplier;
    if (user.balance < totalPrice) {
      return;
    }

    // Рассчитываем случайный индекс выигрышного элемента
    const randomItemIndex = Math.floor(Math.random() * currentCase.items.length);
    
    // Устанавливаем финальную позицию анимации
    const position = calculateFinalPosition(randomItemIndex);
    setFinalPosition(position);
    
    startSpin(randomItemIndex);
  };

  const handleClose = () => {
    setFinalPosition(0);
    closeCase();
  };

  // Сброс позиции после закрытия результата
  useEffect(() => {
    if (!showResult && !isSpinning && finalPosition !== 0) {
      const timer = setTimeout(() => {
        setFinalPosition(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showResult, isSpinning, finalPosition]);

  const handleMultiplierChange = (multiplier: number) => {
    if (!isSpinning) {
      setSelectedMultiplier(multiplier);
    }
  };

  const handleKeepPrize = () => {
    if (spinResult && currentCase) {
      addToInventory(spinResult.prize, currentCase.name);
      closeCase();
    }
  };

  const handleQuickSell = () => {
    if (spinResult) {
      // Добавляем цену приза к балансу пользователя
      closeCase();
    }
  };

  const handleUpgrade = () => {
    // Логика апгрейда
    closeCase();
  };

  if (!currentCase) return null;

  // Создаем массив элементов для рулетки (дублируем для плавной анимации)
  const rouletteItems = [];
  for (let i = 0; i < 200; i++) {
    const item = currentCase.items[i % currentCase.items.length];
    rouletteItems.push({
      ...item,
      uniqueId: `${item.id}-${i}`
    });
  }

  const totalPrice = currentCase.price * selectedMultiplier;
  const hasEnoughFunds = user.balance >= totalPrice;

  return (
    <Modal
      isOpen={!!currentCase}
      onClose={handleClose}
      title={currentCase.name}
      size="lg"
    >
      {!showResult ? (
        <div className={styles.rouletteContainer}>
          {/* Мультипликаторы */}
          <div className={styles.multiplierTabs}>
            {MULTIPLIERS.map((multiplier) => (
              <button
                key={multiplier.value}
                className={`${styles.multiplierTab} ${
                  selectedMultiplier === multiplier.value ? styles.active : ''
                } ${isSpinning ? styles.disabled : ''}`}
                onClick={() => handleMultiplierChange(multiplier.value)}
                disabled={isSpinning}
              >
                {multiplier.label}
              </button>
            ))}
          </div>

          {/* Рулетка */}
          <div className={styles.rouletteViewport}>
            <animated.div 
              className={styles.rouletteItems} 
              style={rouletteAnimation}
              ref={rouletteRef}
            >
              {rouletteItems.map((item) => (
                <div key={item.uniqueId} className={styles.rouletteItem}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                  />
                  <div className={styles.prizeHint}>
                    <img 
                      src="/assets/images/ton.svg" 
                      alt="TON" 
                      className={styles.coinIcon}
                    />
                    <span>{item.price}</span>
                  </div>
                </div>
              ))}
            </animated.div>
            <div className={styles.shadowRight} />
          </div>

          {/* Кнопки действий */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.spinButton}
              onClick={handleSpin}
              disabled={isSpinning || !hasEnoughFunds}
            >
              {isSpinning ? 'Spinning...' : `Spin ${totalPrice.toFixed(2)}`}
              <img 
                src="/assets/images/ton.svg" 
                alt="TON" 
                style={{ width: '16px', height: '16px', marginLeft: '8px' }}
              />
            </button>
            <button 
              className={styles.quickSpinButton}
              onClick={handleQuickSpin}
              disabled={isSpinning || !hasEnoughFunds}
            >
              Quick Spin {totalPrice.toFixed(2)}
              <img 
                src="/assets/images/ton.svg" 
                alt="TON" 
                style={{ width: '14px', height: '14px' }}
              />
            </button>
          </div>

          {!hasEnoughFunds && (
            <div style={{ 
              textAlign: 'center', 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: '14px',
              marginTop: '12px'
            }}>
              Insufficient balance. Need {totalPrice.toFixed(2)} TON
            </div>
          )}

          {/* Возможные призы */}
          <div className={styles.prizesSection}>
            <div className={styles.prizesTitle}>Possible prizes:</div>
            <div className={styles.prizesGrid}>
              {currentCase.items.map((item) => (
                <div key={item.id} className={styles.prizeGridItem}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.prizePrice}>
                    <img 
                      src="/assets/images/ton.svg" 
                      alt="TON" 
                      style={{ width: '10px', height: '10px' }}
                    />
                    <span>{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.resultContainer}>
          <div style={{ 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.7)', 
            marginBottom: '8px' 
          }}>
            {currentCase.name}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#0075FF'
          }}>
            <img 
              src="/assets/images/ton.svg" 
              alt="TON" 
              style={{ width: '24px', height: '24px' }}
            />
            <span>{spinResult?.prize.price}</span>
            <span style={{ fontSize: '16px', color: 'white' }}>✦</span>
          </div>

          <div className={styles.resultPrize}>
            {spinResult && (
              <div style={{ 
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
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
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  ✦ ✦ ✦
                </div>
              </div>
            )}
          </div>

          <div className={styles.resultActions}>
            <button 
              className={styles.keepButton}
              onClick={handleKeepPrize}
            >
              Keep it
            </button>
            <button 
              className={styles.quickSellButton}
              onClick={handleQuickSell}
            >
              Quick Sell {spinResult?.prize.price}
              <img 
                src="/assets/images/ton.svg" 
                alt="TON" 
                style={{ width: '14px', height: '14px' }}
              />
            </button>
            <button 
              className={styles.upgradeButton}
              onClick={handleUpgrade}
            >
              Upgrade
            </button>
          </div>

          {/* Возможные призы в результате */}
          <div className={styles.prizesSection}>
            <div className={styles.prizesTitle}>Possible prizes:</div>
            <div className={styles.prizesGrid}>
              {currentCase.items.slice(0, 9).map((item) => (
                <div key={item.id} className={styles.prizeGridItem}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.prizePrice}>
                    <img 
                      src="/assets/images/ton.svg" 
                      alt="TON" 
                      style={{ width: '10px', height: '10px' }}
                    />
                    <span>{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}; 