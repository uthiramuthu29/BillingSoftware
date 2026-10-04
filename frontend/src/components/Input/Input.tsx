import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
  shortcut?: string;
  suffix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, shortcut, suffix, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-space-xs w-full">
        {label && (
          <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center bg-surface-container-low px-space-md py-2 rounded-lg border border-surface-container-high focus-within:bg-surface-container-lowest focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/30 transition-all">
          {icon && (
            <span className="material-symbols-outlined text-secondary text-xl mr-space-sm">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-transparent outline-none font-body-md text-on-surface placeholder:text-on-surface-variant font-medium ${className}`}
            {...props}
          />
          {shortcut && (
            <span className="ml-2 font-label-sm text-label-sm text-on-surface-variant">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-semibold shadow-sm">
                {shortcut}
              </kbd>
            </span>
          )}
          {suffix}
        </div>
        {error && (
          <span className="font-label-sm text-label-sm text-error font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
