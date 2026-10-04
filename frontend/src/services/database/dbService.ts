import { MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_SALES_HISTORY } from './mockData';
import { Product, Customer, Bill } from '../../types';

declare global {
  interface Window {
    electronAPI?: {
      isElectron: boolean;
      platform: string;
      printReceipt: (options: any) => Promise<{ success: boolean; error?: string }>;
      db: {
        getProducts: () => Promise<Product[]>;
        addProduct: (product: Product) => Promise<Product>;
        updateProduct: (id: string, updates: Partial<Product>) => Promise<Product | null>;
        deleteProduct: (id: string) => Promise<any>;
        getCustomers: () => Promise<Customer[]>;
        addCustomer: (customer: Customer) => Promise<Customer>;
        getBills: () => Promise<Bill[]>;
        createBill: (bill: Bill) => Promise<Bill>;
      };
    };
  }
}

export class DatabaseService {
  private static instance: DatabaseService;
  private products: Product[] = [...MOCK_PRODUCTS];
  private customers: Customer[] = [...MOCK_CUSTOMERS];
  private bills: Bill[] = [...MOCK_SALES_HISTORY];

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private isElectronDB(): boolean {
    return typeof window !== 'undefined' && Boolean(window.electronAPI?.db);
  }

  // Product Operations
  public async getProducts(): Promise<Product[]> {
    if (this.isElectronDB()) {
      return await window.electronAPI!.db.getProducts();
    }
    return this.products;
  }

  public async getProductByBarcode(barcode: string): Promise<Product | undefined> {
    const products = await this.getProducts();
    return products.find(
      (p) => p.barcode === barcode || p.sku.toLowerCase() === barcode.toLowerCase()
    );
  }

  public async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: `p_${Date.now()}`
    };

    if (this.isElectronDB()) {
      return await window.electronAPI!.db.addProduct(newProduct);
    }

    this.products.unshift(newProduct);
    return newProduct;
  }

  public async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    if (this.isElectronDB()) {
      const res = await window.electronAPI!.db.updateProduct(id, updates);
      return res || undefined;
    }

    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return this.products[index];
    }
    return undefined;
  }

  public async deleteProduct(id: string): Promise<boolean> {
    if (this.isElectronDB()) {
      await window.electronAPI!.db.deleteProduct(id);
      return true;
    }

    this.products = this.products.filter((p) => p.id !== id);
    return true;
  }

  // Customer Operations
  public async getCustomers(): Promise<Customer[]> {
    if (this.isElectronDB()) {
      return await window.electronAPI!.db.getCustomers();
    }
    return this.customers;
  }

  public async addCustomer(customer: Omit<Customer, 'id' | 'totalPurchases' | 'loyaltyPoints' | 'balanceDue'>): Promise<Customer> {
    const newCustomer: Customer = {
      ...customer,
      id: `c_${Date.now()}`,
      totalPurchases: 0,
      loyaltyPoints: 10,
      balanceDue: 0
    };

    if (this.isElectronDB()) {
      return await window.electronAPI!.db.addCustomer(newCustomer);
    }

    this.customers.unshift(newCustomer);
    return newCustomer;
  }

  // Bill Operations
  public async getBills(): Promise<Bill[]> {
    if (this.isElectronDB()) {
      return await window.electronAPI!.db.getBills();
    }
    return this.bills;
  }

  public async createBill(bill: Omit<Bill, 'id'>): Promise<Bill> {
    const newBill: Bill = {
      ...bill,
      id: `b_${Date.now()}`
    };

    if (this.isElectronDB()) {
      return await window.electronAPI!.db.createBill(newBill);
    }

    this.bills.unshift(newBill);
    return newBill;
  }
}

export const dbService = DatabaseService.getInstance();
