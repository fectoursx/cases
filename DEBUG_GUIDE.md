# 🐛 Руководство по отладке и обработке ошибок

## 📋 Содержание

1. [Инструменты отладки](#инструменты-отладки)
2. [Error Boundary](#error-boundary)
3. [Централизованная обработка ошибок](#централизованная-обработка-ошибок)
4. [Хуки для отладки](#хуки-для-отладки)
5. [Отображение ошибок в UI](#отображение-ошибок-в-ui)
6. [Практические примеры](#практические-примеры)
7. [Настройка DevTools](#настройка-devtools)

## 🛠️ Инструменты отладки

### Настройки Vite
- **Source Maps**: Включены для разработки и продакшена
- **Dev Server**: Автоматическое открытие браузера на порту 3000
- **Hot Reload**: Автоматическая перезагрузка при изменениях

### Запуск в режиме отладки
```bash
# Разработка с отладкой
pnpm dev

# Продакшен сборка с source maps
pnpm build
pnpm preview
```

## 🛡️ Error Boundary

Error Boundary - это React компонент, который отлавливает ошибки в дочерних компонентах.

### Использование
```jsx
import ErrorBoundary from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Особенности
- ✅ Отлавливает ошибки рендеринга
- ✅ Показывает fallback UI
- ✅ Логирует ошибки в консоль
- ✅ Интеграция с сервисами аналитики
- ✅ Кнопка восстановления

## 🔧 Централизованная обработка ошибок

### Основные функции
```javascript
import { 
  handleError, 
  createError, 
  safeExecute, 
  safeExecuteSync 
} from '@/lib/errorHandler';

// Обработка ошибки
handleError(error, { type: 'custom', context: 'user-action' });

// Создание пользовательской ошибки
const error = createError('Custom error message', { userId: 123 });

// Безопасное выполнение асинхронной функции
const result = await safeExecute(async () => {
  // Ваш код
}, 'API Call');

// Безопасное выполнение синхронной функции
const result = safeExecuteSync(() => {
  // Ваш код
}, 'Calculation');
```

### Автоматический отлов
- ❌ Необработанные ошибки JavaScript
- ❌ Необработанные отклонения промисов
- ❌ Ошибки в event handlers

## 🎣 Хуки для отладки

### useDebug
Отслеживает рендеры и предоставляет функции логирования.

```jsx
import { useDebug } from '@/hooks/useDebug';

const MyComponent = (props) => {
  const { log, logError, logWarning, renderCount } = useDebug('MyComponent', props);
  
  log('Component rendered', { props });
  logError('Something went wrong', error);
  logWarning('Deprecated feature used', { feature: 'oldApi' });
  
  return <div>Renders: {renderCount}</div>;
};
```

### usePerformanceDebug
Отслеживает производительность компонента.

```jsx
import { usePerformanceDebug } from '@/hooks/useDebug';

const MyComponent = () => {
  const { getRenderDuration, getTotalDuration } = usePerformanceDebug('MyComponent');
  
  return (
    <div>
      Render time: {getRenderDuration().toFixed(2)}ms
    </div>
  );
};
```

### useStateDebug
Отслеживает изменения состояния.

```jsx
import { useStateDebug } from '@/hooks/useDebug';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  useStateDebug(count, 'count'); // Логирует изменения count
  
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
};
```

### debugApiCall
Отлаживает API запросы.

```jsx
import { debugApiCall } from '@/hooks/useDebug';

const fetchData = async () => {
  const result = await debugApiCall(
    () => fetch('/api/data').then(r => r.json()),
    'Fetch User Data'
  );
  return result;
};
```

## 🎨 Отображение ошибок в UI

### ErrorDisplay компонент
Автоматически отображает ошибки в правом нижнем углу экрана.

**Функции:**
- 📱 Уведомления в реальном времени
- 📋 Копирование деталей ошибки
- 🔍 Stack trace (только в development)
- ❌ Закрытие отдельных ошибок
- 🧹 Очистка всех ошибок

## 💡 Практические примеры

### Пример 1: Отладка компонента
```jsx
import React, { useState } from 'react';
import { useDebug, useStateDebug } from '@/hooks/useDebug';
import { safeExecute } from '@/lib/errorHandler';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { log, logError } = useDebug('UserProfile', { user, isEditing });
  useStateDebug(isEditing, 'isEditing');

  const handleSave = async () => {
    await safeExecute(async () => {
      log('Saving user profile', { user });
      // API call
      await saveUser(user);
      log('Profile saved successfully');
    }, 'Save Profile');
  };

  return (
    <div>
      {/* UI компоненты */}
    </div>
  );
};
```

### Пример 2: Отладка API запросов
```jsx
import { debugApiCall, createError } from '@/lib/errorHandler';

const apiService = {
  async fetchUsers() {
    return debugApiCall(async () => {
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw createError('Failed to fetch users', {
          status: response.status,
          statusText: response.statusText
        });
      }
      
      return response.json();
    }, 'Fetch Users');
  }
};
```

### Пример 3: Обработка ошибок в формах
```jsx
import { useDebug } from '@/hooks/useDebug';
import { safeExecute } from '@/lib/errorHandler';

const LoginForm = () => {
  const { logError } = useDebug('LoginForm');

  const handleSubmit = async (formData) => {
    await safeExecute(async () => {
      // Валидация
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required');
      }

      // API запрос
      const response = await login(formData);
      
      if (!response.success) {
        throw new Error(response.message);
      }
    }, 'Login Submit');
  };
};
```

## 🔧 Настройка DevTools

### Chrome DevTools
1. **Console**: Основные логи и ошибки
2. **Sources**: Отладка с source maps
3. **Network**: Мониторинг API запросов
4. **Performance**: Анализ производительности
5. **React DevTools**: Отладка React компонентов

### Полезные настройки
```javascript
// В консоли браузера
localStorage.setItem('debug', '*'); // Включить все логи
localStorage.removeItem('debug');   // Отключить логи

// Глобальные функции отладки
window.__DEBUG_MODE__ = true;  // Включить режим отладки
window.__DEBUG_MODE__ = false; // Отключить режим отладки
```

### Фильтрация логов
```javascript
// В консоли DevTools
// Показать только ошибки
console.error('Error message');

// Группировка логов
console.group('API Calls');
console.log('Request 1');
console.log('Request 2');
console.groupEnd();
```

## 🚀 Лучшие практики

### ✅ Рекомендуется
- Используйте Error Boundary для критических компонентов
- Логируйте ошибки с контекстом
- Обрабатывайте ошибки на уровне компонентов
- Используйте типизированные ошибки
- Тестируйте обработку ошибок

### ❌ Избегайте
- Игнорирования ошибок
- Логирования чувствительных данных
- Слишком подробных логов в продакшене
- Отсутствия fallback UI
- Небезопасного выполнения кода

## 📊 Мониторинг ошибок

### Интеграция с сервисами
- **Google Analytics**: Автоматическая отправка ошибок
- **Sentry**: Детальная аналитика ошибок
- **LogRocket**: Запись сессий пользователей
- **Custom API**: Собственный сервис логирования

### Метрики для отслеживания
- Количество ошибок по типам
- Время восстановления после ошибок
- Влияние ошибок на пользовательский опыт
- Географическое распределение ошибок

---

## 🎯 Быстрый старт

1. **Запустите проект**: `pnpm dev`
2. **Откройте DevTools**: F12
3. **Перейдите на вкладку Console**
4. **Используйте DebugExample компонент** для тестирования
5. **Наблюдайте за логами и ошибками**

Теперь у вас есть полная система отладки и обработки ошибок! 🎉 