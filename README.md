# Cases Frontend

A modern case opening application built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern Architecture**: Built with React 18, TypeScript, and Vite
- **Centralized Theme System**: All colors and design tokens in one place
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Telegram Web App Integration**: Native Telegram bot experience
- **Type Safety**: Full TypeScript support
- **Performance Optimized**: Tree-shaking, code splitting, and optimized builds

## 🎨 Theme System

The application uses a centralized theme system located in `src/utils/theme.ts`:

```typescript
import { THEME, getColor, getSpacing } from '@/utils/theme';

// Use theme colors
const primaryColor = getColor('brand.primary');
const spacing = getSpacing('lg');
```

### Available Theme Variables

- **Colors**: Background, text, brand, rarity colors
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, etc.)
- **Typography**: Font sizes, weights, and line heights
- **Shadows**: Box shadow utilities
- **Gradients**: Pre-defined gradient combinations
- **Transitions**: Consistent animation timing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── game/           # Game-specific components
│   ├── layout/         # Layout components
│   └── ui/             # Generic UI components
├── pages/              # Page components
├── store/              # State management (Zustand)
├── styles/             # Global styles and theme
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── hooks/              # Custom React hooks
```

## 🔧 Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Quality

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type checking
pnpm type-check
```

## 🎯 Recent Refactoring

This project has been recently refactored to improve maintainability and performance:

### ✅ Completed

- **Removed Duplicate Components**: Eliminated JSX duplicates in favor of TypeScript versions
- **Centralized Theme System**: All colors and design tokens moved to `src/utils/theme.ts`
- **Updated CSS Variables**: Consistent variable naming and usage across all components
- **Cleaned Dependencies**: Removed unused files and imports
- **Improved Type Safety**: Enhanced TypeScript coverage

### 🗑️ Removed Files

- `src/components/Roulette.jsx` → Replaced by `RouletteWheel.tsx`
- `src/components/CaseCard.jsx` → Replaced by `game/CaseCard.tsx`
- `src/pages/Home.jsx` → Replaced by `HomePage.tsx`
- `src/components/Header.jsx` → Replaced by `layout/Header.tsx`
- Old JSX components (`Balance.jsx`, `UserInfo.jsx`, etc.)

### 🎨 Theme Migration

Colors are now centrally managed and can be accessed via:

```css
/* CSS Variables */
color: var(--color-brand-primary);
background: var(--gradient-brand);

/* Theme Functions in TypeScript */
import { THEME } from '@/utils/theme';
const color = THEME.colors.brand.primary;
```

## 🧩 Component Architecture

### UI Components

- **Button**: Flexible button component with multiple variants
- **Card**: Container component with hover effects
- **Modal**: Responsive modal with keyboard shortcuts
- **Loader**: Loading indicators with different sizes

### Game Components

- **CaseCard**: Interactive case selection cards
- **RouletteWheel**: Animated roulette for case opening
- **PrizeCard**: Prize display with rarity colors

### Layout Components

- **Header**: Top navigation and user info
- **BottomNavigation**: Mobile-friendly navigation
- **LiveStatusBar**: Real-time activity display

## 🚀 Deployment

The application is optimized for deployment on modern hosting platforms:

```bash
# Build for production
pnpm build

# The dist/ folder contains the production build
```

## 📱 Telegram Integration

The app integrates with Telegram Web App API:

- Automatic theme detection
- Viewport management
- Native navigation feel
- Haptic feedback support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the coding standards
4. Test your changes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 