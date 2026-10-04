import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Input } from '../Input';
import { Button } from '../Button';
import { dbService } from '../../services/database/dbService';
import { Product } from '../../types';

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded?: () => void;
  productToEdit?: Product | null;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onProductAdded,
  productToEdit
}) => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [gstRate, setGstRate] = useState('5');
  const [barcode, setBarcode] = useState('');
  const [unit, setUnit] = useState('Piece');

  useEffect(() => {
    if (productToEdit) {
      setSku(productToEdit.sku || '');
      setName(productToEdit.name || '');
      setCategory(productToEdit.category || 'General');
      setPrice(productToEdit.price !== undefined ? String(productToEdit.price) : '');
      setStock(productToEdit.stock !== undefined ? String(productToEdit.stock) : '');
      setGstRate(productToEdit.gstRate !== undefined ? String(productToEdit.gstRate) : '5');
      setBarcode(productToEdit.barcode || '');
      setUnit(productToEdit.unit || 'Piece');
    } else {
      setSku('');
      setName('');
      setCategory('General');
      setPrice('');
      setStock('');
      setGstRate('5');
      setBarcode('');
      setUnit('Piece');
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    if (productToEdit) {
      await dbService.updateProduct(productToEdit.id, {
        sku,
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        gstRate: parseFloat(gstRate),
        barcode,
        unit
      });
    } else {
      await dbService.addProduct({
        sku: sku || `SKU-${Math.floor(100 + Math.random() * 900)}`,
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        gstRate: parseFloat(gstRate),
        barcode: barcode || `${Date.now()}`,
        unit,
        minStockLevel: 5
      });
    }

    if (onProductAdded) onProductAdded();
    onClose();
  };

  const isEditing = Boolean(productToEdit);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Product Details' : 'Add New Product SKU'}
      subtitle={isEditing ? `Update catalog information for ${productToEdit?.sku}` : 'Register master data in catalog'}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        <div className="grid grid-cols-2 gap-space-md">
          <Input
            label="Product Name"
            placeholder="e.g. Organic Whole Milk 1L"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="SKU Code"
            placeholder="e.g. MLK-102"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-space-md">
          <Input
            label="Category"
            placeholder="e.g. Dairy & Eggs"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            label="Barcode EAN/UPC"
            placeholder="e.g. 8901234567890"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-space-md">
          <Input
            label="Selling Price (₹)"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            label="Stock Quantity"
            type="number"
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <Input
            label="Unit"
            placeholder="Bottle, Pack, Bag"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
            GST Tax Slab
          </label>
          <select
            value={gstRate}
            onChange={(e) => setGstRate(e.target.value)}
            className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg border border-surface-container-high font-body-md text-on-surface outline-none focus:border-secondary"
          >
            <option value="0">0% GST (Exempted)</option>
            <option value="5">5% GST (Standard Essentials)</option>
            <option value="12">12% GST (Processed Items)</option>
            <option value="18">18% GST (Standard Goods)</option>
            <option value="28">28% GST (Luxury)</option>
          </select>
        </div>

        <div className="flex justify-end gap-space-sm pt-space-md border-t border-surface-container-high">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="secondary" icon={isEditing ? 'edit' : 'add'}>
            {isEditing ? 'Save Changes' : 'Save Product SKU'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
