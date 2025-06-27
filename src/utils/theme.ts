// Centralized theme configuration
export const THEME = {
  // Base colors
  colors: {
    // Background colors
    background: {
      primary: '#141415',
      secondary: '#1a1a1b',
      card: '#2a2a2a',
      modal: 'rgba(0, 0, 0, 0.8)',
      overlay: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      hint: 'rgba(163, 171, 187, 0.12)',
    },
    
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#F0F2F5',
      muted: 'rgba(255, 255, 255, 0.7)',
      accent: '#0075FF',
    },
    
    // Brand colors
    brand: {
      primary: '#0075FF',
      secondary: '#00C9FF',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      live: '#23C265',
    },
    
    // Case rarity colors
    rarity: {
      common: '#9ca3af',
      uncommon: '#22c55e',
      rare: '#3b82f6',
      epic: '#8b5cf6',
      legendary: '#f59e0b',
      mythic: '#ef4444',
    },
    
    // Gradient definitions
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
      brand: 'linear-gradient(135deg, #0090FF 0%, #00C9FF 100%)',
      blue: 'linear-gradient(135deg, rgba(0, 117, 255, 0.8), rgba(0, 117, 255, 1))',
      green: 'linear-gradient(135deg, rgba(80, 222, 37, 0.8), rgba(80, 222, 37, 1))',
    },
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
  },
  
  // Border radius
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.2)',
    glow: '0 0 20px rgba(0, 117, 255, 0.4)',
  },
  
  // Typography
  typography: {
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.25s ease',
    slow: '0.4s ease',
  },
  
  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
} as const;

// Helper functions for theme usage
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = THEME.colors;
  
  for (const key of keys) {
    value = value?.[key];
    if (!value) break;
  }
  
  return value || path;
};

export const getSpacing = (size: keyof typeof THEME.spacing): string => {
  return THEME.spacing[size];
};

export const getRadius = (size: keyof typeof THEME.radius): string => {
  return THEME.radius[size];
};

export const getShadow = (size: keyof typeof THEME.shadows): string => {
  return THEME.shadows[size];
};

// CSS custom properties for use in CSS files
export const CSS_VARIABLES = `
:root {
  /* Background colors */
  --color-background-primary: ${THEME.colors.background.primary};
  --color-background-secondary: ${THEME.colors.background.secondary};
  --color-background-card: ${THEME.colors.background.card};
  --color-background-modal: ${THEME.colors.background.modal};
  --color-background-overlay: ${THEME.colors.background.overlay};
  --color-background-border: ${THEME.colors.background.border};
  --color-background-hint: ${THEME.colors.background.hint};
  
  /* Text colors */
  --color-text-primary: ${THEME.colors.text.primary};
  --color-text-secondary: ${THEME.colors.text.secondary};
  --color-text-muted: ${THEME.colors.text.muted};
  --color-text-accent: ${THEME.colors.text.accent};
  
  /* Brand colors */
  --color-brand-primary: ${THEME.colors.brand.primary};
  --color-brand-secondary: ${THEME.colors.brand.secondary};
  --color-brand-success: ${THEME.colors.brand.success};
  --color-brand-warning: ${THEME.colors.brand.warning};
  --color-brand-error: ${THEME.colors.brand.error};
  --color-brand-live: ${THEME.colors.brand.live};
  
  /* Rarity colors */
  --color-rarity-common: ${THEME.colors.rarity.common};
  --color-rarity-uncommon: ${THEME.colors.rarity.uncommon};
  --color-rarity-rare: ${THEME.colors.rarity.rare};
  --color-rarity-epic: ${THEME.colors.rarity.epic};
  --color-rarity-legendary: ${THEME.colors.rarity.legendary};
  --color-rarity-mythic: ${THEME.colors.rarity.mythic};
  
  /* Gradients */
  --gradient-primary: ${THEME.colors.gradients.primary};
  --gradient-secondary: ${THEME.colors.gradients.secondary};
  --gradient-success: ${THEME.colors.gradients.success};
  --gradient-brand: ${THEME.colors.gradients.brand};
  --gradient-blue: ${THEME.colors.gradients.blue};
  --gradient-green: ${THEME.colors.gradients.green};
  
  /* Spacing */
  --spacing-xs: ${THEME.spacing.xs};
  --spacing-sm: ${THEME.spacing.sm};
  --spacing-md: ${THEME.spacing.md};
  --spacing-lg: ${THEME.spacing.lg};
  --spacing-xl: ${THEME.spacing.xl};
  --spacing-2xl: ${THEME.spacing['2xl']};
  --spacing-3xl: ${THEME.spacing['3xl']};
  --spacing-4xl: ${THEME.spacing['4xl']};
  
  /* Border radius */
  --radius-sm: ${THEME.radius.sm};
  --radius-md: ${THEME.radius.md};
  --radius-lg: ${THEME.radius.lg};
  --radius-xl: ${THEME.radius.xl};
  --radius-round: ${THEME.radius.round};
  
  /* Shadows */
  --shadow-sm: ${THEME.shadows.sm};
  --shadow-md: ${THEME.shadows.md};
  --shadow-lg: ${THEME.shadows.lg};
  --shadow-xl: ${THEME.shadows.xl};
  --shadow-glow: ${THEME.shadows.glow};
  
  /* Typography */
  --font-size-xs: ${THEME.typography.fontSize.xs};
  --font-size-sm: ${THEME.typography.fontSize.sm};
  --font-size-md: ${THEME.typography.fontSize.md};
  --font-size-lg: ${THEME.typography.fontSize.lg};
  --font-size-xl: ${THEME.typography.fontSize.xl};
  --font-size-2xl: ${THEME.typography.fontSize['2xl']};
  
  --font-weight-normal: ${THEME.typography.fontWeight.normal};
  --font-weight-medium: ${THEME.typography.fontWeight.medium};
  --font-weight-semibold: ${THEME.typography.fontWeight.semibold};
  --font-weight-bold: ${THEME.typography.fontWeight.bold};
  
  /* Transitions */
  --transition-fast: ${THEME.transitions.fast};
  --transition-normal: ${THEME.transitions.normal};
  --transition-slow: ${THEME.transitions.slow};
}
`; 