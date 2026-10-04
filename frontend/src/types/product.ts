export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  costPrice?: number;
  stock: number;
  gstRate: number; // e.g. 5, 12, 18
  barcode: string;
  image?: string;
  unit: string;
  minStockLevel?: number;
}
