import React from 'react';
import { Sidebar, PageId } from './Sidebar';
import { Header } from './Header';
import { PrintInvoiceModal } from '../Modal/PrintInvoiceModal';

export interface MainLayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  activePage,
  onNavigate,
  children
}) => {
  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased flex flex-col">

      {/* 2. Fixed Sidebar Navigation */}
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      {/* 3. Top Header Bar */}
      <Header />

      {/* 4. Main Page View Container */}
      <main className="pl-64 pt-16 min-h-screen flex-1 flex flex-col">
        {children}
      </main>

      {/* 5. Global Print Invoice Modal */}
      <PrintInvoiceModal />
    </div>
  );
};
