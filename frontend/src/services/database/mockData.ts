import { Product, Customer, Bill } from '../../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    sku: 'MLK-102',
    name: 'Organic Whole Milk 1L',
    category: 'Dairy & Eggs',
    price: 4.20,
    costPrice: 2.80,
    stock: 48,
    gstRate: 5,
    barcode: '8901234567890',
    unit: 'Bottle',
    minStockLevel: 10,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6e0h4xCzpGRq9rC_uc2LzaVyuHnPbfydaLnqKfp1Qe-EstM2eD3ekxAP6DYdiunPS9xYsyDEJy6v6SBF9Z2FMZEKR-vA8C2Zr2_At5WtQJxI7xcw_K0QQMfK8AzPJ8s7K9WeUANqdB_C77BdMdpt9fEyV-qNMja5bkAC15Pqa-l0-kLCJnS-VJyI1_u_0lMiz5_KTXdsp-BIv20AVBQkq8VZK8lEX8h_lR1mIuz4IA2tMD7idK7rMqg'
  },
  {
    id: 'p2',
    sku: 'AVO-552',
    name: 'Fresh Hass Avocado Tray (4 Pack)',
    category: 'Fresh Produce',
    price: 6.50,
    costPrice: 4.10,
    stock: 24,
    gstRate: 5,
    barcode: '8901234567891',
    unit: 'Pack',
    minStockLevel: 8
  },
  {
    id: 'p3',
    sku: 'RCE-908',
    name: 'Royal Basmati Rice 5kg',
    category: 'Grains & Staples',
    price: 18.90,
    costPrice: 12.50,
    stock: 6,
    gstRate: 5,
    barcode: '8901234567892',
    unit: 'Bag',
    minStockLevel: 12
  },
  {
    id: 'p4',
    sku: 'OIL-441',
    name: 'Extra Virgin Olive Oil 750ml',
    category: 'Oils & Condiments',
    price: 14.20,
    costPrice: 9.30,
    stock: 35,
    gstRate: 12,
    barcode: '8901234567893',
    unit: 'Bottle',
    minStockLevel: 10
  },
  {
    id: 'p5',
    sku: 'BRD-119',
    name: 'Artisanal Sourdough Bread',
    category: 'Bakery',
    price: 5.80,
    costPrice: 3.20,
    stock: 15,
    gstRate: 5,
    barcode: '8901234567894',
    unit: 'Loaf',
    minStockLevel: 5
  },
  {
    id: 'p6',
    sku: 'COF-302',
    name: 'Colombian Dark Roast Coffee Beans 500g',
    category: 'Beverages',
    price: 12.40,
    costPrice: 7.90,
    stock: 42,
    gstRate: 12,
    barcode: '8901234567895',
    unit: 'Pack',
    minStockLevel: 15
  },
  {
    id: 'p7',
    sku: 'CHZ-771',
    name: 'Aged Cheddar Cheese Block 250g',
    category: 'Dairy & Eggs',
    price: 7.30,
    costPrice: 4.80,
    stock: 8,
    gstRate: 12,
    barcode: '8901234567896',
    unit: 'Block',
    minStockLevel: 10
  },
  {
    id: 'p8',
    sku: 'WAT-001',
    name: 'Natural Spring Mineral Water 1.5L',
    category: 'Beverages',
    price: 1.50,
    costPrice: 0.60,
    stock: 120,
    gstRate: 18,
    barcode: '8901234567897',
    unit: 'Bottle',
    minStockLevel: 30
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Walk-in Customer',
    phone: '9999999999',
    loyaltyPoints: 0,
    creditLimit: 0,
    balanceDue: 0,
    totalPurchases: 1420.50,
    tier: 'Regular'
  },
  {
    id: 'c2',
    name: 'David Miller',
    phone: '+1 (555) 234-5678',
    email: 'david.m@example.com',
    address: '424 Elm Street, Apt 3B',
    gstin: '33AAACD1234F1Z5',
    loyaltyPoints: 450,
    creditLimit: 500,
    balanceDue: 45.00,
    totalPurchases: 3240.00,
    tier: 'Gold'
  },
  {
    id: 'c3',
    name: 'Sophia Reynolds',
    phone: '+1 (555) 987-6543',
    email: 'sophia.r@example.com',
    address: '89 Park Avenue',
    loyaltyPoints: 890,
    creditLimit: 1200,
    balanceDue: 0,
    totalPurchases: 7850.25,
    tier: 'VIP'
  },
  {
    id: 'c4',
    name: 'Robert Chen',
    phone: '+1 (555) 456-7890',
    email: 'robert.c@example.com',
    loyaltyPoints: 180,
    creditLimit: 300,
    balanceDue: 120.50,
    totalPurchases: 1120.00,
    tier: 'Silver'
  }
];

export const MOCK_SALES_HISTORY: Bill[] = [
  {
    id: 'b1',
    invoiceNo: 'INV-2025-08492',
    date: '2025-10-24',
    time: '14:38:22',
    customer: MOCK_CUSTOMERS[1],
    items: [
      {
        id: 'bi1',
        product: MOCK_PRODUCTS[0],
        quantity: 2,
        unitPrice: 4.20,
        discount: 0,
        gstRate: 5,
        total: 8.40
      },
      {
        id: 'bi2',
        product: MOCK_PRODUCTS[3],
        quantity: 1,
        unitPrice: 14.20,
        discount: 0,
        gstRate: 12,
        total: 14.20
      }
    ],
    subtotal: 22.60,
    totalGst: 2.12,
    discount: 0,
    additionalFee: 0,
    grandTotal: 24.72,
    paymentMode: 'Card',
    status: 'Completed',
    terminal: 'Terminal 02',
    cashierName: 'Uthira Muthu S P',
    cashierId: 'CK-882'
  },
  {
    id: 'b2',
    invoiceNo: 'INV-2025-08491',
    date: '2025-10-24',
    time: '14:15:04',
    customer: MOCK_CUSTOMERS[0],
    items: [
      {
        id: 'bi3',
        product: MOCK_PRODUCTS[2],
        quantity: 1,
        unitPrice: 18.90,
        discount: 0,
        gstRate: 5,
        total: 18.90
      }
    ],
    subtotal: 18.90,
    totalGst: 0.95,
    discount: 0,
    additionalFee: 0,
    grandTotal: 19.85,
    paymentMode: 'UPI',
    status: 'Completed',
    terminal: 'Terminal 02',
    cashierName: 'Uthira Muthu S P',
    cashierId: 'CK-882'
  },
  {
    id: 'b3',
    invoiceNo: 'INV-2025-08490',
    date: '2025-10-24',
    time: '13:50:11',
    customer: MOCK_CUSTOMERS[2],
    items: [
      {
        id: 'bi4',
        product: MOCK_PRODUCTS[5],
        quantity: 2,
        unitPrice: 12.40,
        discount: 10,
        gstRate: 12,
        total: 22.32
      }
    ],
    subtotal: 24.80,
    totalGst: 2.68,
    discount: 2.48,
    additionalFee: 0,
    grandTotal: 25.00,
    paymentMode: 'Cash',
    status: 'Completed',
    terminal: 'Terminal 01',
    cashierName: 'Marcus Vance',
    cashierId: 'CK-401'
  }
];
