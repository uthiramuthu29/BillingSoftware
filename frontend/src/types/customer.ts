export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  gstin?: string;
  loyaltyPoints: number;
  creditLimit: number;
  balanceDue: number;
  totalPurchases: number;
  tier: 'Regular' | 'Silver' | 'Gold' | 'VIP';
}
