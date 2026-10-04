import React, { useEffect } from 'react';
import { usePosStore } from '../../store/usePosStore';
import { SearchInput } from '../../components/Input';
import { BillItemsTable } from '../../components/BillItems';
import { BillSummary } from '../../components/BillSummary';
import { Button } from '../../components/Button';
import { AddProductModal } from '../../components/Modal/AddProductModal';
import { Product } from '../../types';

export const NewBillPage: React.FC = () => {
  const {
    activeInvoiceNo,
    cartItems,
    addItemToCart,
    clearCart,
    holdCurrentBill,
    heldBills,
    recallHeldBill,
    isAddCustomSkuOpen,
    setAddCustomSkuOpen
  } = usePosStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        clearCart();
      } else if (e.key === 'F4') {
        e.preventDefault();
        holdCurrentBill();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearCart, holdCurrentBill]);

  return (
    <div className="p-space-lg flex flex-col gap-space-md w-full">
      {/* 1. Top Counter Action Header */}
      <section className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <div className="p-2 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">receipt_long</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Invoice: #{activeInvoiceNo}
                </span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold">
                  Draft
                </span>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">
                Reg 04 · Active Session
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high">
            <span className="material-symbols-outlined text-secondary text-sm">inventory</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Session Batch:
            </span>
            <span className="font-numeric-table text-numeric-table text-on-surface font-bold">
              #BT-9904
            </span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-space-sm flex-wrap">
          <Button variant="surface" kbd="F2" onClick={clearCart}>
            New Bill (Clear)
          </Button>

          <Button variant="surface" kbd="F4" onClick={holdCurrentBill}>
            Hold Bill
            {heldBills.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                {heldBills.length} on hold
              </span>
            )}
          </Button>

          {heldBills.length > 0 && (
            <div className="flex items-center gap-1">
              {heldBills.map((hb) => (
                <button
                  key={hb.id}
                  onClick={() => recallHeldBill(hb.id)}
                  className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Recall {hb.timestamp} ({hb.items.length})
                </button>
              ))}
            </div>
          )}

          <Button variant="surface" kbd="F7" onClick={() => usePosStore.getState().setAdditionalFee(5)}>
            + Fee / Delivery
          </Button>
        </div>
      </section>

      {/* 2. Search & Barcode Scan Bar */}
      <section className="flex items-center gap-space-md">
        <div className="flex-1">
          <SearchInput onSelectProduct={(p: Product) => addItemToCart(p, 1)} />
        </div>
        <Button
          variant="secondary"
          icon="add"
          onClick={() => setAddCustomSkuOpen(true)}
          className="whitespace-nowrap py-3"
        >
          Add Custom SKU
        </Button>
      </section>

      {/* 3. Main Working Layout (Split view: Left 65%, Right 35%) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        <div className="lg:col-span-7 xl:col-span-8 min-h-[520px]">
          <BillItemsTable items={cartItems} />
        </div>
        <div className="lg:col-span-5 xl:col-span-4 min-h-[520px]">
          <BillSummary />
        </div>
      </section>

      {/* Add Custom SKU Modal */}
      <AddProductModal
        isOpen={isAddCustomSkuOpen}
        onClose={() => setAddCustomSkuOpen(false)}
        onProductAdded={() => {}}
      />
    </div>
  );
};

export default NewBillPage;
