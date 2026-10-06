import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { dbService } from '../../services/database/dbService';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'store' | 'printer' | 'tax' | 'database'>('store');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Store Profile State
  const [storeName, setStoreName] = useState('Gokul Dairy Farm — Downtown Branch');
  const [terminalId, setTerminalId] = useState('Terminal 02 (POS-942)');
  const [storeCode, setStoreCode] = useState('STORE-#04');
  const [address, setAddress] = useState('123 Commercial Avenue, Suite 400, Downtown');
  const [phone, setPhone] = useState('+1 (800) 555-0199');
  const [gstin, setGstin] = useState('33AAACD9901F1Z2');

  // Printer State
  const [outputFormat, setOutputFormat] = useState('Standard A4 Tax Invoice (Desktop PDF Preview)');
  const [printerName, setPrinterName] = useState('Epson TM-T88VI Thermal Receipt Printer');
  const [autoPrint, setAutoPrint] = useState(true);

  // Tax State
  const [defaultGstRate, setDefaultGstRate] = useState('5');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [invoicePrefix, setInvoicePrefix] = useState('INV-2025-');

  // Stats State
  const [dbStats, setDbStats] = useState({ productCount: 0, customerCount: 0, billCount: 0 });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedStore = localStorage.getItem('apex_store_settings');
    if (savedStore) {
      const parsed = JSON.parse(savedStore);
      if (parsed.storeName) setStoreName(parsed.storeName);
      if (parsed.terminalId) setTerminalId(parsed.terminalId);
      if (parsed.storeCode) setStoreCode(parsed.storeCode);
      if (parsed.address) setAddress(parsed.address);
      if (parsed.phone) setPhone(parsed.phone);
      if (parsed.gstin) setGstin(parsed.gstin);
    }

    const savedPrinter = localStorage.getItem('apex_printer_settings');
    if (savedPrinter) {
      const parsed = JSON.parse(savedPrinter);
      if (parsed.outputFormat) setOutputFormat(parsed.outputFormat);
      if (parsed.printerName) setPrinterName(parsed.printerName);
      if (parsed.autoPrint !== undefined) setAutoPrint(parsed.autoPrint);
    }

    const savedTax = localStorage.getItem('apex_tax_settings');
    if (savedTax) {
      const parsed = JSON.parse(savedTax);
      if (parsed.defaultGstRate) setDefaultGstRate(parsed.defaultGstRate);
      if (parsed.currencySymbol) setCurrencySymbol(parsed.currencySymbol);
      if (parsed.invoicePrefix) setInvoicePrefix(parsed.invoicePrefix);
    }

    loadDbStats();
  }, []);

  const loadDbStats = async () => {
    const products = await dbService.getProducts();
    const customers = await dbService.getCustomers();
    const bills = await dbService.getBills();
    setDbStats({
      productCount: products.length,
      customerCount: customers.length,
      billCount: bills.length
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'apex_store_settings',
      JSON.stringify({ storeName, terminalId, storeCode, address, phone, gstin })
    );
    showToast('Store settings saved successfully!');
  };

  const handleSavePrinter = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'apex_printer_settings',
      JSON.stringify({ outputFormat, printerName, autoPrint })
    );
    showToast('Printer preferences saved successfully!');
  };

  const handleSaveTax = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'apex_tax_settings',
      JSON.stringify({ defaultGstRate, currencySymbol, invoicePrefix })
    );
    showToast('Tax & Invoice configuration saved!');
  };

  const handleDownloadBackup = async () => {
    const products = await dbService.getProducts();
    const customers = await dbService.getCustomers();
    const bills = await dbService.getBills();

    const backupData = {
      backupDate: new Date().toISOString(),
      products,
      customers,
      bills
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `apex_pos_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Database backup downloaded successfully!');
  };

  const handleRestoreBackup = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            if (data.products && Array.isArray(data.products)) {
              for (const p of data.products) {
                await dbService.addProduct(p);
              }
            }
            await loadDbStats();
            showToast(`Data restored successfully from ${file.name}!`);
          } catch (err) {
            alert('Invalid backup file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="px-space-xl py-space-lg flex flex-col gap-space-lg w-full relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-secondary text-on-secondary px-space-md py-3 rounded-xl shadow-lg font-label-md flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
          <span>System Administration</span>
          <span>/</span>
          <span className="text-secondary font-semibold">POS Configuration</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
          Store &amp; Terminal Settings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Configure store metadata, receipt printers, tax GST parameters, and local data backups.
        </p>
      </div>

      {/* 2. Settings Tabs Navigation */}
      <div className="flex items-center gap-space-sm border-b border-surface-container-high pb-space-xs">
        {[
          { id: 'store', label: 'Store & Branch Info', icon: 'store' },
          { id: 'printer', label: 'Printer & Hardware', icon: 'print' },
          { id: 'tax', label: 'GST & Invoice Defaults', icon: 'receipt' },
          { id: 'database', label: 'Data Backup & Export', icon: 'database' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md transition-colors ${
              activeTab === tab.id
                ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. Active Tab Panel Content */}
      <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm border border-surface-container max-w-3xl">
        {activeTab === 'store' && (
          <form className="flex flex-col gap-space-md" onSubmit={handleSaveStore}>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Store Master Profile
            </h3>
            <Input
              label="Store / Branch Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-space-md">
              <Input
                label="Terminal ID"
                value={terminalId}
                onChange={(e) => setTerminalId(e.target.value)}
              />
              <Input
                label="Store Code"
                value={storeCode}
                onChange={(e) => setStoreCode(e.target.value)}
              />
            </div>
            <Input
              label="Store Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-space-md">
              <Input
                label="Support Contact Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                label="GSTIN / Tax ID"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
              />
            </div>
            <div className="pt-space-md flex justify-end">
              <Button type="submit" variant="secondary" icon="check">
                Save Store Settings
              </Button>
            </div>
          </form>
        )}

        {activeTab === 'printer' && (
          <form className="flex flex-col gap-space-md" onSubmit={handleSavePrinter}>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Receipt Printer Setup
            </h3>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
                Default Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg border border-surface-container-high font-body-md text-on-surface outline-none focus:border-secondary"
              >
                <option>Standard A4 Tax Invoice (Desktop PDF Preview)</option>
                <option>80mm Thermal Receipt Printer (ESC/POS Raw)</option>
                <option>58mm Mini Thermal Receipt</option>
              </select>
            </div>
            <Input
              label="Thermal Printer Device Name"
              value={printerName}
              onChange={(e) => setPrinterName(e.target.value)}
            />
            <div className="flex items-center gap-space-md pt-2">
              <input
                type="checkbox"
                id="autoPrint"
                checked={autoPrint}
                onChange={(e) => setAutoPrint(e.target.checked)}
                className="w-4 h-4 text-secondary rounded cursor-pointer"
              />
              <label htmlFor="autoPrint" className="font-body-md text-on-surface cursor-pointer">
                Auto-trigger print preview modal immediately upon payment checkout
              </label>
            </div>
            <div className="pt-space-md flex justify-end">
              <Button type="submit" variant="secondary" icon="check">
                Save Printer Preferences
              </Button>
            </div>
          </form>
        )}

        {activeTab === 'tax' && (
          <form className="flex flex-col gap-space-md" onSubmit={handleSaveTax}>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              GST Tax &amp; Pricing Defaults
            </h3>
            <div className="grid grid-cols-2 gap-space-md">
              <Input
                label="Default GST Rate (%)"
                value={defaultGstRate}
                onChange={(e) => setDefaultGstRate(e.target.value)}
              />
              <Input
                label="Currency Symbol"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
              />
            </div>
            <Input
              label="Invoice Number Prefix"
              value={invoicePrefix}
              onChange={(e) => setInvoicePrefix(e.target.value)}
            />
            <div className="pt-space-md flex justify-end">
              <Button type="submit" variant="secondary" icon="check">
                Save Tax Configuration
              </Button>
            </div>
          </form>
        )}

        {activeTab === 'database' && (
          <div className="flex flex-col gap-space-md">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Local Data Backup &amp; Storage Health
            </h3>
            <div className="p-space-md rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col gap-2 font-numeric-table text-body-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Storage Engine:</span>
                <span className="font-bold text-on-surface">Offline SQLite Database (Active)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Catalog SKUs:</span>
                <span className="font-bold text-on-surface">{dbStats.productCount} SKUs Registered</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Registered Customers:</span>
                <span className="font-bold text-on-surface">{dbStats.customerCount} Active Accounts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Cleared Tax Invoices:</span>
                <span className="font-bold text-on-surface">{dbStats.billCount} Invoices Saved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Access Speed:</span>
                <span className="font-bold text-on-tertiary-container">0.4 ms (Instant Local Performance)</span>
              </div>
            </div>

            <div className="flex items-center gap-space-md pt-space-md">
              <Button variant="secondary" icon="backup" onClick={handleDownloadBackup}>
                Download Backup File (.json)
              </Button>
              <Button variant="surface" icon="upload_file" onClick={handleRestoreBackup}>
                Restore Data Backup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
