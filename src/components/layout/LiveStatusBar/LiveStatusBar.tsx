import React, { useState, useEffect } from 'react';
import styles from './LiveStatusBar.module.css';

interface LiveItem {
  id: number;
  image: string;
  name: string;
  price: number;
  userName: string;
}

export const LiveStatusBar: React.FC = () => {
  const [liveItems, setLiveItems] = useState<LiveItem[]>([]);

  // Моковые данные для демонстрации
  const mockLiveItems: LiveItem[] = [
    {
      id: 1,
      image: '/assets/images/frog.png',
      name: 'Mystic Frog',
      price: 1562.28,
      userName: 'Player123'
    },
    {
      id: 2,
      image: '/assets/images/diamond.png',
      name: 'Diamond',
      price: 48.15,
      userName: 'GamerX'
    },
    {
      id: 3,
      image: '/assets/images/dragon.png',
      name: 'Dragon',
      price: 89.99,
      userName: 'CoolUser'
    },
    {
      id: 4,
      image: '/assets/images/wizard-hat.png',
      name: 'Wizard Hat',
      price: 35.20,
      userName: 'MagicFan'
    },
    {
      id: 5,
      image: '/assets/images/wizard-hat.png',
      name: 'Wizard Hat',
      price: 35.20,
      userName: 'MagicFan'
    },
    {
      id: 6,
      image: '/assets/images/dragon.png',
      name: 'Dragon',
      price: 89.99,
      userName: 'CoolUser'
    }
  ];

  useEffect(() => {
    // Симулируем получение live данных
    setLiveItems(mockLiveItems);

    // Симулируем периодическое обновление
    const interval = setInterval(() => {
      const randomItem = mockLiveItems[Math.floor(Math.random() * mockLiveItems.length)];
      setLiveItems(prevItems => {
        const newItems = [...prevItems];
        newItems.shift(); // убираем первый элемент
        newItems.push({
          ...randomItem,
          id: Date.now(), // новый ID для анимации
          userName: `User${Math.floor(Math.random() * 1000)}`
        });
        return newItems;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.liveStatusBar}>
      <div className={styles.liveIndicator}>
        <div className={styles.liveDot}>●</div>
        <div className={styles.liveText}>Live</div>
      </div>
      
      <div className={styles.liveItems}>
        {liveItems.map((item, index) => (
          <div 
            key={`${item.id}-${index}`} 
            className={styles.liveItem}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.liveItemContent}>
              <img 
                src={item.image} 
                alt={item.name} 
                className={styles.liveImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 