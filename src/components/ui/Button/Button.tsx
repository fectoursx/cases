import React from 'react';
import { clsx } from 'clsx';
import { ButtonProps } from '@/types/ui';
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  children,
  className
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.loading]: loading,
          [styles.disabled]: disabled || loading
        },
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className={styles.spinner}>
          <div className={styles.spinnerIcon}></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}; 