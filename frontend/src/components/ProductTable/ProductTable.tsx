import React from 'react';
import { Product } from '../../types';

export interface ProductTableProps {
  products: Product[];
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEditProduct,
  onDeleteProduct
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase bg-surface-container-low/60">
              <th className="py-space-sm px-space-md font-semibold">Product Name & SKU</th>
              <th className="py-space-sm px-space-md font-semibold">Category</th>
              <th className="py-space-sm px-space-md font-semibold text-center">Barcode</th>
              <th className="py-space-sm px-space-md font-semibold text-center">GST Tax Slab</th>
              <th className="py-space-sm px-space-md font-semibold text-right">Unit Price</th>
              <th className="py-space-sm px-space-md font-semibold text-center">Stock Quantity</th>
              <th className="py-space-sm px-space-md font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high">
            {products.map((product) => {
              const isLowStock = product.minStockLevel && product.stock <= product.minStockLevel;
              return (
                <tr key={product.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-space-md px-space-md">
                    <div className="flex items-center gap-space-md">
                      <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center font-bold text-secondary">
                        {product.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          {product.name}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-numeric-table">
                          SKU: {product.sku}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-space-md px-space-md font-body-md text-on-surface">
                    <span className="px-space-sm py-1 rounded-md bg-surface-container text-on-surface font-label-sm font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md text-center font-numeric-table text-on-surface-variant text-label-md">
                    {product.barcode}
                  </td>
                  <td className="py-space-md px-space-md text-center">
                    <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-tertiary-container font-label-sm font-semibold">
                      {product.gstRate}% GST
                    </span>
                  </td>
                  <td className="py-space-md px-space-md text-right font-numeric-table font-bold text-headline-sm text-on-surface">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="py-space-md px-space-md text-center">
                    <span
                      className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold inline-flex items-center gap-1 ${
                        isLowStock
                          ? 'bg-error-container/60 text-error'
                          : 'bg-surface-container-high text-on-tertiary-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">
                        {isLowStock ? 'warning' : 'inventory_2'}
                      </span>
                      {product.stock} {product.unit}s
                    </span>
                  </td>
                  <td className="py-space-md px-space-md text-center">
                    <div className="inline-flex items-center gap-space-xs">
                      <button
                        onClick={() => onEditProduct && onEditProduct(product)}
                        className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors"
                        title="Edit Product"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteProduct && onDeleteProduct(product.id)}
                        className="p-1.5 rounded hover:bg-error-container/40 text-error transition-colors"
                        title="Delete SKU"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
