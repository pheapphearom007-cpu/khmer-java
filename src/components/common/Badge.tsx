import React from 'react';

export type BadgeVariant = 'brand' | 'success' | 'warning' | 'danger' | 'neutral' | 'purple';
export type BadgeSize = 'xs' | 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulseDot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  brand: {
    container: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200/80 dark:border-rose-900/60',
    dot: 'bg-rose-500',
  },
  success: {
    container: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/60',
    dot: 'bg-emerald-500',
  },
  warning: {
    container: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/60',
    dot: 'bg-amber-500',
  },
  danger: {
    container: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200/80 dark:border-rose-900/60',
    dot: 'bg-rose-500',
  },
  neutral: {
    container: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700',
    dot: 'bg-slate-400',
  },
  purple: {
    container: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200/80 dark:border-purple-900/60',
    dot: 'bg-purple-500',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'text-[10px] px-2 py-0.5 gap-1',
  sm: 'text-[11px] px-2.5 py-0.5 gap-1.5 font-medium',
  md: 'text-xs px-3 py-1 gap-1.5 font-semibold',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'sm',
  dot = false,
  pulseDot = false,
  className = '',
}) => {
  const styles = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${
        styles.container
      } ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${styles.dot} ${
            pulseDot ? 'animate-pulse' : ''
          }`}
        />
      )}
      <span>{children}</span>
    </span>
  );
};
