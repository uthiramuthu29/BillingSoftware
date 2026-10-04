import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  let maxWidthClass = 'max-w-lg';
  switch (maxWidth) {
    case 'sm':
      maxWidthClass = 'max-w-sm';
      break;
    case 'md':
      maxWidthClass = 'max-w-md';
      break;
    case 'lg':
      maxWidthClass = 'max-w-lg';
      break;
    case 'xl':
      maxWidthClass = 'max-w-xl';
      break;
    case '2xl':
      maxWidthClass = 'max-w-2xl';
      break;
    case '4xl':
      maxWidthClass = 'max-w-4xl';
      break;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-black/50 backdrop-blur-xs">
      <div
        className={`w-full bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh] overflow-hidden ${maxWidthClass}`}
      >
        {/* Modal Header */}
        {title && (
          <div className="px-space-xl py-space-md border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/50">
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                {title}
              </h3>
              {subtitle && (
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-space-xl overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
