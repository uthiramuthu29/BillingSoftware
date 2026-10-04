import React from 'react';
import logo from '../../assets/Gokul_Dairy_Logo.png';

export type PageId = 'dashboard' | 'new-bill' | 'products' | 'customers' | 'sales-history' | 'settings';

export interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const navItems: { id: PageId; label: string; icon: string; shortcut?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'analytics' },
    { id: 'new-bill', label: 'Billing (POS)', icon: 'point_of_sale', shortcut: 'F1' },
    { id: 'sales-history', label: 'Sales History', icon: 'receipt_long' },
    { id: 'products', label: 'Products', icon: 'inventory_2' },
    { id: 'customers', label: 'Customers', icon: 'groups' },
    { id: 'settings', label: 'Settings', icon: 'tune' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex flex-col justify-between select-none border-r border-surface-container-high">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-space-lg flex items-center gap-space-sm bg-surface-container-low border-b border-surface-container-high">
          <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center p-0.5 overflow-hidden border border-surface-container-high shrink-0">
            <img src={typeof logo === 'string' ? logo : logo.src} alt="Gokul Dairy Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
              Gokul Dairy Farm
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              Store #04 · Downtown Branch
            </span>
          </div>
        </div>

        {/* Terminal Info Subheader */}
        <div className="px-space-md py-space-sm bg-surface-container-highest/40 flex items-center justify-between border-b border-surface-container-high">
          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-sm text-secondary">desktop_windows</span>
            Terminal 02
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-sm text-secondary">schedule</span>
            Shift A
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-space-xs px-space-sm py-space-md">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center justify-between px-space-md py-space-sm rounded-lg transition-colors w-full text-left ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-headline-sm shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-space-md">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span className="font-label-lg text-label-lg">{item.label}</span>
                </div>
                {item.shortcut && (
                  <span
                    className={`font-label-sm text-label-sm px-space-xs rounded ${
                      isActive ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status */}
      {/* <div className="p-space-md bg-surface-container-low flex flex-col gap-space-sm border-t border-surface-container-high">
        <div className="flex flex-col gap-1 border-b border-surface-container pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-on-tertiary-container shrink-0 animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
              Database: SQLite 3.45.1 (Local)
            </span>
          </div>
          <span
            className="font-label-sm text-[10px] text-on-surface-variant font-mono truncate pl-3.5"
            title="C:\ApexPOS\Data\apex_pos.db"
          >
            Path: C:\ApexPOS\Data\apex_pos.db
          </span>
        </div>
        <div className="flex flex-col gap-0.5 pt-1">
          <span className="font-label-sm text-[10px] text-on-tertiary-container font-semibold uppercase tracking-wider">
            100% Offline Standalone · Win64
          </span>
          <div className="flex items-center justify-between text-on-surface-variant text-[11px]">
            <span>Station #02 (Desktop)</span>
            <span className="font-numeric-table font-semibold">POS-942</span>
          </div>
        </div>
      </div> */}
    </aside>
  );
};
