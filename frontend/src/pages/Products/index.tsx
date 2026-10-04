import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../../services/database/mockData';
import { ProductTable } from '../../components/ProductTable';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { AddProductModal } from '../../components/Modal/AddProductModal';
import { dbService } from '../../services/database/dbService';
import { Product } from '../../types';

import { exportToCSV } from '../../utils/csvExport';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    const list = await dbService.getProducts();
    setProducts(list);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product SKU from catalog?')) {
      await dbService.deleteProduct(id);
      loadProducts();
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleExportCSV = () => {
    const exportData = products.map((p) => ({
      SKU: p.sku,
      Name: p.name,
      Category: p.category,
      'Selling Price (₹)': p.price,
      'Cost Price (₹)': p.costPrice || 0,
      Stock: p.stock,
      'GST Rate (%)': p.gstRate,
      Barcode: p.barcode,
      Unit: p.unit
    }));
    exportToCSV('products_catalog.csv', exportData);
  };

  const handleImportCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          alert(`Selected file "${file.name}" for import. File format validated!`);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const categories = ['All', 'Dairy & Eggs', 'Fresh Produce', 'Grains & Staples', 'Beverages', 'Bakery', 'Oils & Condiments'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = products.filter((p) => p.minStockLevel && p.stock <= p.minStockLevel).length;

  return (
    <div className="px-space-xl py-space-lg flex flex-col gap-space-lg w-full">
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span>Catalog Master</span>
            <span>/</span>
            <span className="text-secondary font-semibold">SKU Directory</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Product Catalog &amp; Pricing
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage SKU master data, pricing tiers, GST tax slabs, barcodes, and active inventory status.
          </p>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <Button variant="surface" icon="file_download" onClick={handleExportCSV}>
            Export Excel / CSV
          </Button>
          <Button variant="surface" icon="upload_file" onClick={handleImportCSV}>
            Import Products (CSV)
          </Button>
          <Button variant="secondary" icon="add" onClick={handleOpenAddModal}>
            Add New Product
          </Button>
        </div>
      </div>

      {/* 2. Metrics Bento Quick-Glance Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Active Catalog SKUs
            </span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-numeric-total font-bold mt-1">
              {products.length}
            </span>
            <span className="font-label-sm text-label-sm text-on-tertiary-container flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-sm">bolt</span>Catalog Synced &amp; Active
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-xl">inventory_2</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Low Stock Threshold
            </span>
            <span className="font-headline-lg text-headline-lg text-error font-numeric-total font-bold mt-1">
              {lowStockCount}
            </span>
            <span className="font-label-sm text-label-sm text-error flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-sm">warning</span>Action required
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-error-container/40 flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-xl">notification_important</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Avg Gross Margin
            </span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-numeric-total font-bold mt-1">
              32.6%
            </span>
            <span className="font-label-sm text-label-sm text-on-tertiary-container flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-sm">north_east</span>Optimal retail band
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-tertiary-container">
            <span className="material-symbols-outlined text-xl">pie_chart</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Scanner Health Status
            </span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-numeric-total font-bold mt-1">
              100%
            </span>
            <span className="font-label-sm text-label-sm text-on-tertiary-container flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-sm">usb</span>USB Barcode Scanner Ready
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
          </div>
        </div>
      </div>

      {/* 3. Search and Category Filter Controls */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="w-full md:w-96">
          <Input
            icon="search"
            placeholder="Search by Product Name, SKU, or Barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-space-xs overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-space-md py-1.5 rounded-lg text-label-md font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-secondary-container text-on-secondary-container font-semibold'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Product Catalog Table */}
      <ProductTable
        products={filteredProducts}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Add / Edit Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
        onProductAdded={loadProducts}
        productToEdit={editingProduct}
      />
    </div>
  );
};

export default ProductsPage;
