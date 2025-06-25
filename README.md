# 🎰 Cases Frontend

Фронтенд приложение для кейсов с рулеткой, построенное на React + TypeScript + Zustand.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
pnpm install

# Запуск в режиме разработки
pnpm dev

# Сборка для продакшена
pnpm build

# Предварительный просмотр сборки
pnpm preview
```

## 📁 Структура проекта

```
src/
├── components/          # Компоненты
│   ├── ui/             # Базовые UI компоненты
│   ├── layout/         # Компоненты макета
│   └── game/           # Игровые компоненты
├── pages/              # Страницы приложения
├── store/              # Zustand stores
├── types/              # TypeScript типы
├── styles/             # Глобальные стили
└── utils/              # Утилиты
```

## 🎯 Основные возможности

- **TypeScript** - строгая типизация
- **CSS Modules** - изолированные стили
- **Zustand** - легковесный state management
- **React Spring** - плавные анимации
- **Telegram WebApp** - интеграция с Telegram

## 🎮 Компоненты

### UI Components
- `Button` - кнопки с разными вариантами
- `Card` - карточки контента
- `Modal` - модальные окна

### Game Components
- `CaseCard` - карточка кейса
- `RouletteWheel` - рулетка для розыгрыша
- `PrizeCard` - карточка приза

### Layout Components
- `Header` - шапка приложения
- `Navigation` - навигация

## 🎨 Стили

Проект использует CSS Modules для изолированных стилей компонентов и глобальные CSS переменные для консистентности дизайна.

### CSS переменные
```css
--primary-color: #667eea
--secondary-color: #764ba2
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

## 🏪 Store Management

Используется Zustand для управления состоянием:

- `userStore` - данные пользователя и инвентарь
- `gameStore` - игровая логика
- `casesStore` - данные кейсов
- `uiStore` - состояние UI

## 🎰 Игровая механика

1. Пользователь выбирает кейс
2. Проверяется баланс
3. Запускается анимация рулетки
4. Определяется выигрышный приз
5. Приз добавляется в инвентарь

## 📱 Telegram WebApp

Приложение интегрировано с Telegram WebApp API для:
- Получения данных пользователя
- Управления основной кнопкой
- Адаптации к теме Telegram

## 🛠 Разработка

### Добавление нового компонента

```bash
# Создайте папку компонента
mkdir src/components/ui/NewComponent

# Создайте файлы
touch src/components/ui/NewComponent/NewComponent.tsx
touch src/components/ui/NewComponent/NewComponent.module.css
touch src/components/ui/NewComponent/index.ts
```

### Структура компонента

```tsx
// NewComponent.tsx
import React from 'react';
import styles from './NewComponent.module.css';

interface NewComponentProps {
  // props here
}

export const NewComponent: React.FC<NewComponentProps> = (props) => {
  return (
    <div className={styles.container}>
      {/* component content */}
    </div>
  );
};
```

## 📋 Скрипты

- `pnpm dev` - запуск dev сервера
- `pnpm build` - сборка для продакшена
- `pnpm preview` - предпросмотр сборки
- `pnpm lint` - проверка кода
- `pnpm type-check` - проверка типов

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для фичи
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License 