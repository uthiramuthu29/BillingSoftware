import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database/dbService';
import { Bill } from '../../types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { usePosStore } from '../../store/usePosStore';

export const SalesHistoryPage: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { openPrintModal } = usePosStore();

  const loadBills = async () => {
    const list = await dbService.getBills();
    setBills(list);
  };

  useEffect(() => {
    loadBills();
  }, []);

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bill.customer && bill.customer.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="px-space-xl py-space-lg flex flex-col gap-space-lg w-full">
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span>Sales &amp; Audit</span>
            <span>/</span>
            <span className="text-secondary font-semibold">Sales Ledger</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Historical Invoices &amp; Receipts
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Full audit ledger of all issued tax invoices, payment tenders, refunds, and print history.
          </p>
        </div>
      </div>

      {/* 2. Filter Controls */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="w-full md:w-96">
          <Input
            icon="search"
            placeholder="Search Invoice # or Customer Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-space-xs overflow-x-auto w-full md:w-auto">
          {['All', 'Completed', 'Hold', 'Refunded'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-space-md py-1.5 rounded-lg text-label-md font-medium whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-secondary-container text-on-secondary-container font-semibold'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Invoices Ledger Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase bg-surface-container-low/60">
              <th className="py-space-sm px-space-md font-semibold">Invoice Details</th>
              <th className="py-space-sm px-space-md font-semibold">Date &amp; Time</th>
              <th className="py-space-sm px-space-md font-semibold">Customer</th>
              <th className="py-space-sm px-space-md font-semibold text-center">Payment Tender</th>
              <th className="py-space-sm px-space-md font-semibold text-right">Subtotal</th>
              <th className="py-space-sm px-space-md font-semibold text-right">Tax (GST)</th>
              <th className="py-space-sm px-space-md font-semibold text-right">Grand Total</th>
              <th className="py-space-sm px-space-md font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high">
            {filteredBills.map((bill) => (
              <tr key={bill.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="py-space-md px-space-md">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold font-numeric-table">
                      {bill.invoiceNo}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {bill.terminal} · Cashier: {bill.cashierName}
                    </span>
                  </div>
                </td>
                <td className="py-space-md px-space-md font-numeric-table">
                  <div className="flex flex-col">
                    <span className="font-medium text-on-surface">{bill.date}</span>
                    <span className="text-label-sm text-on-surface-variant">{bill.time}</span>
                  </div>
                </td>
                <td className="py-space-md px-space-md font-body-md text-on-surface font-medium">
                  {bill.customer?.name || 'Walk-in Customer'}
                </td>
                <td className="py-space-md px-space-md text-center">
                  <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm font-semibold">
                    {bill.paymentMode}
                  </span>
                </td>
                <td className="py-space-md px-space-md text-right font-numeric-table text-on-surface-variant">
                  ₹{bill.subtotal.toFixed(2)}
                </td>
                <td className="py-space-md px-space-md text-right font-numeric-table text-on-surface-variant">
                  +₹{bill.totalGst.toFixed(2)}
                </td>
                <td className="py-space-md px-space-md text-right font-numeric-table font-bold text-headline-sm text-on-surface">
                  ₹{bill.grandTotal.toFixed(2)}
                </td>
                <td className="py-space-md px-space-md text-center">
                  <Button variant="ghost" size="sm" icon="print" onClick={() => openPrintModal(bill)}>
                    View / Print
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistoryPage;
