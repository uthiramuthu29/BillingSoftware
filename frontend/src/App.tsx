import React, { useState } from 'react';
import { MainLayout, PageId } from './components/Layout';
import { DashboardPage } from './pages/Dashboard/index';
import { NewBillPage } from './pages/NewBill/index';
import { ProductsPage } from './pages/Products/index';
import { CustomersPage } from './pages/Customers/index';
import { SalesHistoryPage } from './pages/SalesHistory/index';
import { SettingsPage } from './pages/Settings/index';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('new-bill');

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'new-bill':
        return <NewBillPage />;
      case 'products':
        return <ProductsPage />;
      case 'customers':
        return <CustomersPage />;
      case 'sales-history':
        return <SalesHistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <NewBillPage />;
    }
  };

  return (
    <MainLayout activePage={activePage} onNavigate={(page) => setActivePage(page)}>
      {renderActivePage()}
    </MainLayout>
  );
};

export default App;
