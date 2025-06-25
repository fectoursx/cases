import { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaTimes } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import PrizeItem from './PrizeItem';

const Roulette = () => {
  const { currentCase, isSpinning, prize, user, spinRoulette } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winningItem, setWinningItem] = useState(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [rouletteStopped, setRouletteStopped] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const rouletteRef = useRef(null);
  
  // Показываем модальное окно, когда есть текущий кейс
  useEffect(() => {
    if (currentCase) {
      setShowModal(true);
      setShowResult(false);
      setWinningItem(null);
      setAnimationFinished(false);
      setRouletteStopped(false);
    } else {
      setShowModal(false);
    }
  }, [currentCase]);

  // Отслеживаем изменение состояния вращения и приза
  useEffect(() => {
    if (!isSpinning && prize && !showResult && animationFinished) {
      // Когда анимация полностью завершена, ждем еще намного больше для полной остановки
      setTimeout(() => {
        setRouletteStopped(true);
      }, 3000); // Увеличиваем до 3 секунд после окончания анимации
    }
  }, [isSpinning, prize, showResult, animationFinished]);

  // Показываем результат только после полной остановки рулетки
  useEffect(() => {
    if (rouletteStopped && prize && !showResult) {
      // Определяем приз по позиции курсора
      const itemWidth = 100; // Примерная ширина элемента в процентах
      const totalItems = currentCase.items.length;
      const finalPosition = cursorPosition % (totalItems * itemWidth);
      const itemIndex = Math.floor(finalPosition / itemWidth) % totalItems;
      const actualWinningItem = currentCase.items[itemIndex];
      
      setTimeout(() => {
        setWinningItem(actualWinningItem);
        setShowResult(true);
        
        // Добавляем приз в инвентарь пользователя (если не демо-режим)
        if (!demoMode && actualWinningItem) {
          // Здесь можно добавить логику для обновления инвентаря пользователя
          console.log('Выигран приз:', actualWinningItem);
        }
      }, 4000); // Увеличиваем задержку до 4 секунд для просмотра результата
    }
  }, [rouletteStopped, prize, showResult, cursorPosition, currentCase, demoMode]);

  // Сбрасываем флаги при начале нового спина
  useEffect(() => {
    if (isSpinning) {
      setAnimationFinished(false);
      setRouletteStopped(false);
    }
  }, [isSpinning]);

  // Анимация для рулетки
  const rouletteAnimation = useSpring({
    from: { transform: 'translateX(0%)' },
    to: { 
      transform: isSpinning 
        ? 'translateX(-4000%)' // Увеличиваем дистанцию для более длинной прокрутки
        : 'translateX(0%)' 
    },
    config: { 
      duration: isSpinning ? 8000 : 0, // Увеличиваем время до 8 секунд
      tension: 60, // Уменьшаем напряжение для более плавного замедления
      friction: 25 // Увеличиваем трение для более реалистичного замедления
    },
    reset: !isSpinning,
    onRest: () => {
      // Когда анимация завершена, устанавливаем финальную позицию курсора
      if (isSpinning) {
        console.log('Анимация завершена');
        setAnimationFinished(true);
        // Рассчитываем финальную позицию курсора
        const finalPosition = 4000; // Позиция после прокрутки
        setCursorPosition(finalPosition);
      }
    }
  });

  // Обработчик для закрытия модального окна
  const handleClose = () => {
    setShowModal(false);
    setShowResult(false);
    setWinningItem(null);
    setAnimationFinished(false);
    setRouletteStopped(false);
  };

  // Обработчик для переключения режима (реальный/демо)
  const handleModeToggle = (mode) => {
    setDemoMode(mode === 'demo');
  };

  // Обработчик для запуска рулетки
  const handleSpin = () => {
    if (currentCase) {
      // Если демо-режим или достаточно средств
      if (demoMode || user.balance >= currentCase.price) {
        spinRoulette(currentCase.id, demoMode);
      }
    }
  };

  // Если нет текущего кейса, не отображаем ничего
  if (!showModal || !currentCase) {
    return null;
  }

  // Проверяем, достаточно ли средств для открытия кейса
  const hasEnoughFunds = user.balance >= currentCase.price;

  return (
    <div className="roulette-modal">
      <div className="roulette-content">
        <div className="roulette-header">
          <h2>{currentCase.name}</h2>
          <button className="close-button" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        {!showResult ? (
          <>
            <div className="roulette-container">
              <div className="roulette-viewport">
                <div className="roulette-marker"></div>
                <animated.div 
                  className="roulette-items" 
                  style={rouletteAnimation}
                  ref={rouletteRef}
                >
                  {/* Дублируем предметы много раз для создания эффекта бесконечной прокрутки */}
                  {Array(40).fill().map((_, arrayIndex) => (
                    currentCase.items.map((item, itemIndex) => (
                      <PrizeItem 
                        key={`${item.id}-${arrayIndex}-${itemIndex}`} 
                        item={item} 
                      />
                    ))
                  ))}
                </animated.div>
              </div>
            </div>

            <div className="roulette-mode-selector">
              <button 
                className={`mode-button ${!demoMode ? 'active' : ''}`}
                onClick={() => handleModeToggle('real')}
              >
                Real
              </button>
              <button 
                className={`mode-button ${demoMode ? 'active' : ''}`}
                onClick={() => handleModeToggle('demo')}
              >
                Demo
              </button>
            </div>

            {!hasEnoughFunds && !demoMode ? (
              <>
                <div className="insufficient-funds">
                  <span className="info-icon">i</span> Not enough funds
                </div>
                <button className="deposit-button">
                  Deposit
                </button>
              </>
            ) : (
              <button 
                className="spin-button"
                onClick={handleSpin}
                disabled={isSpinning}
              >
                {isSpinning ? 'Spinning...' : 'Spin'}
              </button>
            )}
          </>
        ) : (
          <div className="result-container">
            <h3 className="result-title">You won!</h3>
            <div className="result-prize">
              <img 
                src={winningItem?.image} 
                alt={winningItem?.name} 
                className="result-image" 
              />
              <div className="result-price">
                <span className="token-icon">T</span> {winningItem?.price.toFixed(2)}
              </div>
            </div>
            <button 
              className="continue-button"
              onClick={handleClose}
            >
              Continue
            </button>
          </div>
        )}

        <div className="possible-prizes">
          <h3>Possible prizes:</h3>
          <div className="prize-list">
            {currentCase.items.map((item) => (
              <div key={item.id} className="possible-prize-item">
                <span className="token-icon">T</span> {item.price.toFixed(2)}
                <img src={item.image} alt={item.name} className="small-prize-image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roulette;

