import React from 'react';
import { BillItem } from '../../types';
import { usePosStore } from '../../store/usePosStore';

export interface BillItemsTableProps {
  items: BillItem[];
}

export const BillItemsTable: React.FC<BillItemsTableProps> = ({ items }) => {
  const { updateItemQuantity, updateItemDiscount, removeItemFromCart, clearCart } = usePosStore();

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container flex flex-col h-full overflow-hidden">
      {/* Table Header */}
      <div className="p-space-md border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/40">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-secondary text-xl">shopping_cart</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Bill Items</h2>
          <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
            {items.reduce((acc, i) => acc + i.quantity, 0)} Items
          </span>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-error font-label-sm text-label-sm hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">delete_sweep</span> Clear All
          </button>
        )}
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-space-xl text-on-surface-variant min-h-[300px]">
            <span className="material-symbols-outlined text-5xl mb-space-sm text-outline-variant">
              add_shopping_cart
            </span>
            <p className="font-headline-sm text-headline-sm text-on-surface mb-1">
              No Items Added to Current Bill
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center max-w-sm">
              Scan barcode above or press <kbd className="px-1 py-0.5 rounded bg-surface-container font-bold">F1</kbd> to search and select products from the catalog.
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase bg-surface-container-low/60">
                <th className="py-space-sm px-space-md font-semibold">Product Info</th>
                <th className="py-space-sm px-space-sm font-semibold text-center">Unit Price</th>
                <th className="py-space-sm px-space-sm font-semibold text-center">Qty</th>
                <th className="py-space-sm px-space-sm font-semibold text-center">Disc (%)</th>
                <th className="py-space-sm px-space-sm font-semibold text-center">GST %</th>
                <th className="py-space-sm px-space-md font-semibold text-right">Line Total</th>
                <th className="py-space-sm px-space-sm text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {item.product.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-numeric-table">
                        SKU: {item.product.sku}
                      </span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm text-center font-numeric-table font-medium text-on-surface">
                    ₹{item.unitPrice.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <div className="inline-flex items-center bg-surface-container rounded-lg border border-surface-container-high overflow-hidden">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-surface-container-high text-on-surface"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-numeric-table font-bold text-label-md">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-surface-container-high text-on-surface"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.discount}
                      onChange={(e) => updateItemDiscount(item.id, parseFloat(e.target.value) || 0)}
                      className="w-12 text-center bg-surface-container px-1 py-1 rounded border border-surface-container-high font-numeric-table font-medium outline-none focus:border-secondary"
                    />
                  </td>
                  <td className="py-space-sm px-space-sm text-center font-numeric-table text-on-surface-variant text-label-sm">
                    {item.gstRate}%
                  </td>
                  <td className="py-space-sm px-space-md text-right font-numeric-table font-bold text-headline-sm text-on-surface">
                    ₹{item.total.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="p-1 rounded text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-colors"
                      title="Remove Item"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
