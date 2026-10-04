import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input } from '../Input';
import { Button } from '../Button';
import { dbService } from '../../services/database/dbService';

export interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerAdded?: () => void;
}

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onCustomerAdded
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gstin, setGstin] = useState('');
  const [tier, setTier] = useState<'Regular' | 'Silver' | 'Gold' | 'VIP'>('Regular');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    await dbService.addCustomer({
      name,
      phone,
      email,
      address,
      gstin,
      creditLimit: 500,
      tier
    });

    if (onCustomerAdded) onCustomerAdded();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Customer"
      subtitle="Add customer to store directory and loyalty tracking"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        <Input
          label="Full Name"
          placeholder="e.g. David Miller"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-space-md">
          <Input
            label="Phone Number"
            placeholder="e.g. +1 (555) 234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            placeholder="david.m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Input
          label="Street Address"
          placeholder="424 Elm Street, Apt 3B"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-space-md">
          <Input
            label="GSTIN Number (Optional)"
            placeholder="33AAACD1234F1Z5"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
              Membership Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as any)}
              className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg border border-surface-container-high font-body-md text-on-surface outline-none focus:border-secondary"
            >
              <option value="Regular">Regular</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-space-sm pt-space-md border-t border-surface-container-high">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="secondary" icon="person_add">
            Register Customer
          </Button>
        </div>
      </form>
    </Modal>
  );
};
