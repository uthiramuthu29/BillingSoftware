import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
      );
      setCurrentTime(
        now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30 flex items-center justify-between px-space-xl border-b border-surface-container-high">
      <div className="flex items-center gap-space-xl">
        {/* Date & Time Widget */}
        <div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-xs rounded-lg">
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-base">calendar_today</span>
            <span className="font-label-md text-label-md text-on-surface font-medium">
              {currentDate || 'Oct 24, 2024'}
            </span>
          </div>
          <span className="text-outline-variant">|</span>
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-base">timer</span>
            <span className="font-numeric-table text-numeric-table text-on-surface font-semibold">
              {currentTime || '14:38:09 IST'}
            </span>
          </div>
        </div>

        {/* Shortcuts Bar */}
        {/* <div className="hidden xl:flex items-center gap-space-sm px-space-md py-space-xs bg-surface-container rounded-lg">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
            Shortcuts:
          </span>
          <div className="flex items-center gap-space-md">
            <span className="font-label-sm text-label-sm text-on-surface">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary font-bold font-numeric-table shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                F2
              </kbd>{' '}
              New Bill
            </span>
            <span className="font-label-sm text-label-sm text-on-surface">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary font-bold font-numeric-table shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                F8
              </kbd>{' '}
              Payment
            </span>
            <span className="font-label-sm text-label-sm text-on-surface">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary font-bold font-numeric-table shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                F9
              </kbd>{' '}
              Print
            </span>
          </div>
        </div> */}
      </div>

      <div className="flex items-center gap-space-lg">
        {/* Database Status Indicator */}
        {/* <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-highest">
          <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></span>
          <span className="material-symbols-outlined text-sm text-secondary">database</span>
          <span className="font-label-sm text-label-sm font-semibold">
            Local SQLite: Active (0ms Latency)
          </span>
        </div> */}

        {/* Cashier Profile */}
        <div className="flex items-center gap-space-md pl-space-md border-l border-surface-container-high">
          <div className="flex flex-col text-right">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold leading-tight">
              Uthira Muthu S P
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Cashier ID: CK-882
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm shadow-sm">
            UM
          </div>
        </div>
      </div>
    </header>
  );
};
