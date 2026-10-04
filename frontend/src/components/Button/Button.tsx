import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'surface';
  size?: 'sm' | 'md' | 'lg';
  icon?: string; // Material symbol icon name
  kbd?: string; // Keyboard shortcut string (e.g. F2, F8, F9)
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  kbd,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-primary text-on-primary hover:bg-primary-container font-semibold shadow-sm';
      break;
    case 'secondary':
      variantClasses = 'bg-secondary text-on-secondary hover:bg-secondary/90 font-semibold shadow-sm';
      break;
    case 'outline':
      variantClasses = 'bg-transparent border border-outline-variant text-on-surface hover:bg-surface-container transition-colors';
      break;
    case 'surface':
      variantClasses = 'bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent text-on-surface hover:bg-surface-container-low transition-colors';
      break;
    case 'danger':
      variantClasses = 'bg-error text-on-error hover:bg-error/90 font-semibold shadow-sm';
      break;
  }

  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'px-space-sm py-1.5 text-label-sm font-medium gap-space-xs rounded-md';
      break;
    case 'md':
      sizeClasses = 'px-space-md py-2 text-label-lg font-medium gap-space-sm rounded-lg';
      break;
    case 'lg':
      sizeClasses = 'px-space-lg py-2.5 text-label-lg font-semibold gap-space-md rounded-xl';
      break;
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-secondary/40 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined text-base animate-spin mr-1.5">progress_activity</span>
      ) : icon ? (
        <span className="material-symbols-outlined text-xl">{icon}</span>
      ) : null}

      {kbd && (
        <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary font-bold font-numeric-table text-label-sm shadow-sm mr-1">
          {kbd}
        </kbd>
      )}

      <span>{children}</span>
    </button>
  );
};
