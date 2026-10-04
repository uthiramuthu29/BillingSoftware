import { Product } from './product';
import { Customer } from './customer';

export interface BillItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number; // in percentage or fixed amount
  gstRate: number;
  total: number;
}

export type PaymentMode = 'Cash' | 'UPI' | 'Card' | 'Credit';

export interface Bill {
  id: string;
  invoiceNo: string;
  date: string;
  time: string;
  customer?: Customer;
  items: BillItem[];
  subtotal: number;
  totalGst: number;
  discount: number;
  additionalFee: number;
  grandTotal: number;
  paymentMode: PaymentMode;
  status: 'Completed' | 'Hold' | 'Cancelled' | 'Refunded';
  terminal: string;
  cashierName: string;
  cashierId: string;
}
