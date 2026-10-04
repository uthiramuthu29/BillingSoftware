import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database/dbService';
import { Bill } from '../../types';
import { Button } from '../../components/Button';
import { usePosStore } from '../../store/usePosStore';
import { exportToCSV } from '../../utils/csvExport';

export const DashboardPage: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [dateLabel, setDateLabel] = useState('Today: Oct 24, 2024');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const { openPrintModal } = usePosStore();

  const loadBills = async () => {
    const list = await dbService.getBills();
    setBills(list);
  };

  useEffect(() => {
    loadBills();
  }, []);

  const grossSales = bills.reduce((acc, b) => acc + b.grandTotal, 0);
  const avgTicket = bills.length > 0 ? grossSales / bills.length : 0;
  const cashSales = bills.filter((b) => b.paymentMode === 'Cash').reduce((acc, b) => acc + b.grandTotal, 0);
  const digitalSales = bills.filter((b) => b.paymentMode === 'UPI' || b.paymentMode === 'Card').reduce((acc, b) => acc + b.grandTotal, 0);
  const digitalShare = grossSales > 0 ? ((digitalSales / grossSales) * 100).toFixed(1) : '0';

  const handleExportReport = () => {
    const reportData = bills.map((bill) => ({
      'Invoice No': bill.invoiceNo,
      Date: bill.date,
      Time: bill.time,
      Customer: bill.customer?.name || 'Walk-in Customer',
      'Payment Tender': bill.paymentMode,
      'Subtotal (₹)': bill.subtotal,
      'Tax GST (₹)': bill.totalGst,
      'Grand Total (₹)': bill.grandTotal,
      Status: bill.status
    }));
    exportToCSV('sales_report.csv', reportData);
  };

  return (
    <div className="p-space-lg xl:p-space-xl flex flex-col gap-space-lg w-full">
      {/* 1. Header Command Bar */}
      <div className="flex flex-col 2xl:flex-row items-start 2xl:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span>Store Intelligence</span>
            <span>/</span>
            <span>Shift Audit</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold leading-tight">
            Sales &amp; Cash-Counter Reports
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Daily reconciliations, payment tender audit, product velocity, and shift performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm w-full 2xl:w-auto">
          {/* Date Selector */}
          <div className="relative inline-flex items-center">
            <button
              onClick={() => setIsDateOpen(!isDateOpen)}
              className="h-10 px-space-md bg-surface-container-low text-on-surface rounded-lg font-label-md text-label-md flex items-center gap-space-xs shadow-sm hover:bg-surface-container border border-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-lg">calendar_month</span>
              <span className="font-semibold">{dateLabel}</span>
              <span className="material-symbols-outlined text-base text-on-surface-variant">
                arrow_drop_down
              </span>
            </button>
            {isDateOpen && (
              <div className="absolute top-11 left-0 z-30 w-56 bg-surface-container-lowest rounded-xl shadow-xl p-space-xs flex flex-col gap-1 border border-surface-container-high">
                {['Today: Oct 24, 2024', 'Yesterday: Oct 23, 2024', 'This Week (Oct 20-26)', 'This Month: Oct 2024'].map(
                  (label) => (
                    <button
                      key={label}
                      onClick={() => {
                        setDateLabel(label);
                        setIsDateOpen(false);
                      }}
                      className="px-space-md py-1.5 text-left font-label-md text-label-md rounded text-on-surface hover:bg-surface-container transition-colors"
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <Button variant="surface" kbd="F9" icon="print" onClick={() => window.print()}>
            Print Summary
          </Button>
          <Button variant="secondary" icon="file_download" onClick={handleExportReport}>
            Export Report (CSV)
          </Button>
        </div>
      </div>

      {/* 2. Key Metrics Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Card 1: Gross Sales */}
        <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Gross Sales Today
            </span>
            <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">trending_up</span>+14.2%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-numeric-total text-numeric-total text-on-surface font-bold leading-tight">
              ₹{grossSales.toFixed(2)}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-numeric-table mt-1">
              {bills.length} Invoices Cleared · 0.8ms Local Latency
            </span>
          </div>
        </div>

        {/* Card 2: Average Ticket Value */}
        <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Average Ticket Value
            </span>
            <div className="p-1 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">receipt_long</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-numeric-total text-numeric-total text-on-surface font-bold leading-tight">
              ₹{avgTicket.toFixed(2)}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Per basket average
            </span>
          </div>
        </div>

        {/* Card 3: Cash in Register */}
        <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Cash in Register (Till)
            </span>
            <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">verified</span>Verified
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-numeric-total text-numeric-total text-on-surface font-bold leading-tight">
              ₹{(cashSales + 200).toFixed(2)}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Opening Float: ₹200.00
            </span>
          </div>
        </div>

        {/* Card 4: Digital Payments (UPI / Card) */}
        <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              UPI &amp; Card Settlements
            </span>
            <div className="p-1 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">credit_card</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-numeric-total text-numeric-total text-on-surface font-bold leading-tight">
              ₹{digitalSales.toFixed(2)}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              {digitalShare}% Digital Volume Share
            </span>
          </div>
        </div>
      </div>

      {/* 3. Recent Transactions Table Section */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container p-space-md flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-xl">history</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Today's Cleared Invoices Log
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Showing latest transactions ({bills.length} total)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase bg-surface-container-low/60">
                <th className="py-space-sm px-space-md font-semibold">Invoice No</th>
                <th className="py-space-sm px-space-md font-semibold">Time</th>
                <th className="py-space-sm px-space-md font-semibold">Customer</th>
                <th className="py-space-sm px-space-md font-semibold text-center">Tender</th>
                <th className="py-space-sm px-space-md font-semibold text-right">Amount</th>
                <th className="py-space-sm px-space-md font-semibold text-center">Status</th>
                <th className="py-space-sm px-space-md font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-space-sm px-space-md font-numeric-table font-bold text-on-surface">
                    {bill.invoiceNo}
                  </td>
                  <td className="py-space-sm px-space-md font-numeric-table text-on-surface-variant">
                    {bill.time}
                  </td>
                  <td className="py-space-sm px-space-md font-body-md text-on-surface font-medium">
                    {bill.customer?.name || 'Walk-in Customer'}
                  </td>
                  <td className="py-space-sm px-space-md text-center">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm font-semibold">
                      {bill.paymentMode}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-right font-numeric-table font-bold text-on-surface">
                    ₹{bill.grandTotal.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-md text-center">
                    <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-tertiary-container font-label-sm font-semibold">
                      {bill.status}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-center">
                    <button
                      onClick={() => openPrintModal(bill)}
                      className="p-1 rounded text-secondary hover:bg-surface-container font-label-sm font-semibold"
                    >
                      Print Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
