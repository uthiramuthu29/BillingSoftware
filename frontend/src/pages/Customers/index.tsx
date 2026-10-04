import React, { useState, useEffect } from 'react';
import { MOCK_CUSTOMERS } from '../../services/database/mockData';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { AddCustomerModal } from '../../components/Modal/AddCustomerModal';
import { dbService } from '../../services/database/dbService';
import { Customer } from '../../types';

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const loadCustomers = async () => {
    const list = await dbService.getCustomers();
    setCustomers(list);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="px-space-xl py-space-lg flex flex-col gap-space-lg w-full">
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span>CRM &amp; Accounts</span>
            <span>/</span>
            <span className="text-secondary font-semibold">Customer Directory</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Customers &amp; Loyalty Ledger
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage customer accounts, track credit limits, pending balance dues, and loyalty reward tiers.
          </p>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <Button variant="secondary" icon="person_add" onClick={() => setIsAddModalOpen(true)}>
            Register New Customer
          </Button>
        </div>
      </div>

      {/* 2. Quick Search & Directory Tools */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="w-full md:w-96">
          <Input
            icon="search"
            placeholder="Search by Name, Phone, or Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
          <span>Total Registered: <strong className="text-on-surface">{customers.length}</strong></span>
          <span>Active Accounts: <strong className="text-on-tertiary-container">{customers.length}</strong></span>
        </div>
      </div>

      {/* 3. Customer Directory Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase bg-surface-container-low/60">
              <th className="py-space-sm px-space-md font-semibold">Customer Details</th>
              <th className="py-space-sm px-space-md font-semibold">Phone &amp; Email</th>
              <th className="py-space-sm px-space-md font-semibold text-center">Loyalty Tier</th>
              <th className="py-space-sm px-space-md font-semibold text-center">Reward Points</th>
              <th className="py-space-sm px-space-md font-semibold text-right">Credit Limit / Due</th>
              <th className="py-space-sm px-space-md font-semibold text-right">Total Purchases</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="py-space-md px-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {customer.name}
                      </span>
                      {customer.address && (
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {customer.address}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-space-md px-space-md">
                  <div className="flex flex-col font-numeric-table">
                    <span className="font-medium text-on-surface">{customer.phone}</span>
                    <span className="text-label-sm text-on-surface-variant">{customer.email || 'N/A'}</span>
                  </div>
                </td>
                <td className="py-space-md px-space-md text-center">
                  <span className="px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm font-semibold">
                    {customer.tier}
                  </span>
                </td>
                <td className="py-space-md px-space-md text-center font-numeric-table font-bold text-secondary">
                  {customer.loyaltyPoints} pts
                </td>
                <td className="py-space-md px-space-md text-right font-numeric-table">
                  <div className="flex flex-col text-right">
                    <span className="font-semibold text-on-surface">
                      Limit: ₹{customer.creditLimit.toFixed(2)}
                    </span>
                    {customer.balanceDue > 0 ? (
                      <span className="text-label-sm font-bold text-error">
                        Due: ₹{customer.balanceDue.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-label-sm text-on-tertiary-container font-medium">
                        No Pending Due
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-space-md px-space-md text-right font-numeric-table font-bold text-headline-sm text-on-surface">
                  ₹{customer.totalPurchases.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCustomerAdded={loadCustomers}
      />
    </div>
  );
};

export default CustomersPage;
