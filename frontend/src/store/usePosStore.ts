import { create } from 'zustand';
import { Product, Customer, BillItem, PaymentMode, Bill } from '../types';
import { MOCK_CUSTOMERS, MOCK_SALES_HISTORY } from '../services/database/mockData';

import { dbService } from '../services/database/dbService';

interface HeldBill {
  id: string;
  timestamp: string;
  items: BillItem[];
  customer?: Customer;
  note?: string;
}

interface PosState {
  activeInvoiceNo: string;
  selectedCustomer: Customer;
  cartItems: BillItem[];
  discountAmount: number;
  additionalFee: number;
  paymentMode: PaymentMode;
  heldBills: HeldBill[];
  isPrintModalOpen: boolean;
  isAddCustomSkuOpen: boolean;
  activePrintBill?: Bill;
  
  // Actions
  setSelectedCustomer: (customer: Customer) => void;
  addItemToCart: (product: Product, qty?: number) => void;
  updateItemQuantity: (itemId: string, qty: number) => void;
  updateItemDiscount: (itemId: string, discount: number) => void;
  removeItemFromCart: (itemId: string) => void;
  clearCart: () => void;
  setDiscountAmount: (amount: number) => void;
  setAdditionalFee: (fee: number) => void;
  setPaymentMode: (mode: PaymentMode) => void;
  holdCurrentBill: () => void;
  recallHeldBill: (heldBillId: string) => void;
  checkoutCurrentBill: () => Bill;
  openPrintModal: (bill?: Bill) => void;
  closePrintModal: () => void;
  setAddCustomSkuOpen: (open: boolean) => void;
}

export const usePosStore = create<PosState>((set, get) => ({
  activeInvoiceNo: 'INV-2025-08493',
  selectedCustomer: MOCK_CUSTOMERS[0],
  cartItems: [
    {
      id: 'item-1',
      product: {
        id: 'p1',
        sku: 'MLK-102',
        name: 'Organic Whole Milk 1L',
        category: 'Dairy & Eggs',
        price: 4.20,
        stock: 48,
        gstRate: 5,
        barcode: '8901234567890',
        unit: 'Bottle'
      },
      quantity: 2,
      unitPrice: 4.20,
      discount: 0,
      gstRate: 5,
      total: 8.40
    }
  ],
  discountAmount: 0,
  additionalFee: 0,
  paymentMode: 'Cash',
  heldBills: [
    {
      id: 'hb-1',
      timestamp: '14:20 PM',
      items: [
        {
          id: 'hbi-1',
          product: {
            id: 'p3',
            sku: 'RCE-908',
            name: 'Royal Basmati Rice 5kg',
            category: 'Grains & Staples',
            price: 18.90,
            stock: 6,
            gstRate: 5,
            barcode: '8901234567892',
            unit: 'Bag'
          },
          quantity: 1,
          unitPrice: 18.90,
          discount: 0,
          gstRate: 5,
          total: 18.90
        }
      ],
      customer: MOCK_CUSTOMERS[1],
      note: 'Waiting for cash withdrawal'
    }
  ],
  isPrintModalOpen: false,
  isAddCustomSkuOpen: false,
  activePrintBill: MOCK_SALES_HISTORY[0],

  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),

  addItemToCart: (product, qty = 1) => {
    const { cartItems } = get();
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);

    if (existingIndex !== -1) {
      const updated = [...cartItems];
      const currentItem = updated[existingIndex];
      const newQty = currentItem.quantity + qty;
      updated[existingIndex] = {
        ...currentItem,
        quantity: newQty,
        total: (currentItem.unitPrice - (currentItem.unitPrice * (currentItem.discount / 100))) * newQty
      };
      set({ cartItems: updated });
    } else {
      const newItem: BillItem = {
        id: `bi_${Date.now()}_${Math.random()}`,
        product,
        quantity: qty,
        unitPrice: product.price,
        discount: 0,
        gstRate: product.gstRate,
        total: product.price * qty
      };
      set({ cartItems: [...cartItems, newItem] });
    }
  },

  updateItemQuantity: (itemId, qty) => {
    if (qty <= 0) {
      get().removeItemFromCart(itemId);
      return;
    }
    const updated = get().cartItems.map((item) => {
      if (item.id === itemId) {
        const discountedUnitPrice = item.unitPrice - (item.unitPrice * (item.discount / 100));
        return {
          ...item,
          quantity: qty,
          total: discountedUnitPrice * qty
        };
      }
      return item;
    });
    set({ cartItems: updated });
  },

  updateItemDiscount: (itemId, discount) => {
    const updated = get().cartItems.map((item) => {
      if (item.id === itemId) {
        const discountedUnitPrice = item.unitPrice - (item.unitPrice * (discount / 100));
        return {
          ...item,
          discount,
          total: discountedUnitPrice * item.quantity
        };
      }
      return item;
    });
    set({ cartItems: updated });
  },

  removeItemFromCart: (itemId) => {
    set({ cartItems: get().cartItems.filter((i) => i.id !== itemId) });
  },

  clearCart: () => set({ cartItems: [], discountAmount: 0, additionalFee: 0 }),

  setDiscountAmount: (amount) => set({ discountAmount: amount }),
  setAdditionalFee: (fee) => set({ additionalFee: fee }),
  setPaymentMode: (mode) => set({ paymentMode: mode }),

  holdCurrentBill: () => {
    const { cartItems, selectedCustomer, heldBills } = get();
    if (cartItems.length === 0) return;

    const newHeldBill: HeldBill = {
      id: `hb_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: cartItems,
      customer: selectedCustomer
    };

    set({
      heldBills: [...heldBills, newHeldBill],
      cartItems: [],
      selectedCustomer: MOCK_CUSTOMERS[0],
      activeInvoiceNo: `INV-2025-${Math.floor(10000 + Math.random() * 90000)}`
    });
  },

  recallHeldBill: (heldBillId) => {
    const { heldBills } = get();
    const target = heldBills.find((h) => h.id === heldBillId);
    if (target) {
      set({
        cartItems: target.items,
        selectedCustomer: target.customer || MOCK_CUSTOMERS[0],
        heldBills: heldBills.filter((h) => h.id !== heldBillId)
      });
    }
  },

  checkoutCurrentBill: () => {
    const { cartItems, selectedCustomer, discountAmount, additionalFee, paymentMode, activeInvoiceNo } = get();
    
    const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
    const totalGst = cartItems.reduce((acc, item) => acc + (item.total * (item.gstRate / 100)), 0);
    const grandTotal = Math.max(0, subtotal + totalGst - discountAmount + additionalFee);

    const completedBill: Bill = {
      id: `b_${Date.now()}`,
      invoiceNo: activeInvoiceNo,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      customer: selectedCustomer,
      items: cartItems,
      subtotal,
      totalGst,
      discount: discountAmount,
      additionalFee,
      grandTotal,
      paymentMode,
      status: 'Completed',
      terminal: 'Terminal 02',
      cashierName: 'Uthira Muthu S P',
      cashierId: 'CK-882'
    };

    // Save to SQLite / Database
    dbService.createBill(completedBill);

    set({
      cartItems: [],
      discountAmount: 0,
      additionalFee: 0,
      selectedCustomer: MOCK_CUSTOMERS[0],
      activeInvoiceNo: `INV-2025-${Math.floor(10000 + Math.random() * 90000)}`,
      activePrintBill: completedBill,
      isPrintModalOpen: true
    });

    return completedBill;
  },

  openPrintModal: (bill) => set({ isPrintModalOpen: true, activePrintBill: bill || MOCK_SALES_HISTORY[0] }),
  closePrintModal: () => set({ isPrintModalOpen: false }),
  setAddCustomSkuOpen: (open) => set({ isAddCustomSkuOpen: open })
}));
