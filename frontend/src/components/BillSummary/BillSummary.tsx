import React from 'react';
import { usePosStore } from '../../store/usePosStore';
import { Button } from '../Button';
import { PaymentMode } from '../../types';

export const BillSummary: React.FC = () => {
  const {
    cartItems,
    selectedCustomer,
    setSelectedCustomer,
    discountAmount,
    setDiscountAmount,
    additionalFee,
    setAdditionalFee,
    paymentMode,
    setPaymentMode,
    checkoutCurrentBill,
    holdCurrentBill,
    heldBills
  } = usePosStore();

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const totalGst = cartItems.reduce((acc, item) => acc + (item.total * (item.gstRate / 100)), 0);
  const grandTotal = Math.max(0, subtotal + totalGst - discountAmount + additionalFee);

  const paymentModes: PaymentMode[] = ['Cash', 'UPI', 'Card', 'Credit'];

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container p-space-md flex flex-col gap-space-md h-full justify-between">
      {/* 1. Customer Selector Bar */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
            Customer Information
          </span>
          <span className="text-secondary text-label-sm font-semibold hover:underline cursor-pointer">
            + Change Customer
          </span>
        </div>
        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
              {selectedCustomer.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                {selectedCustomer.name}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-numeric-table">
                {selectedCustomer.phone} · Points: {selectedCustomer.loyaltyPoints}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
            {selectedCustomer.tier}
          </span>
        </div>
      </div>

      {/* 2. Numerical Breakdown */}
      <div className="flex flex-col gap-space-xs border-t border-b border-surface-container-high py-space-sm">
        <div className="flex items-center justify-between font-body-md text-on-surface-variant">
          <span>Item Subtotal ({cartItems.length} SKUs)</span>
          <span className="font-numeric-table font-semibold text-on-surface">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between font-body-md text-on-surface-variant">
          <span>Estimated GST Tax</span>
          <span className="font-numeric-table font-semibold text-on-surface">
            +₹{totalGst.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between font-body-md text-on-surface-variant">
          <span>Cart Discount</span>
          <div className="flex items-center gap-1">
            <span className="text-error font-semibold">-₹</span>
            <input
              type="number"
              min="0"
              value={discountAmount || ''}
              placeholder="0.00"
              onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
              className="w-20 text-right bg-surface-container-low px-2 py-0.5 rounded border border-surface-container-high font-numeric-table font-bold text-on-surface outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="flex items-center justify-between font-body-md text-on-surface-variant">
          <span>Delivery / Extra Fee</span>
          <div className="flex items-center gap-1">
            <span>+₹</span>
            <input
              type="number"
              min="0"
              value={additionalFee || ''}
              placeholder="0.00"
              onChange={(e) => setAdditionalFee(parseFloat(e.target.value) || 0)}
              className="w-20 text-right bg-surface-container-low px-2 py-0.5 rounded border border-surface-container-high font-numeric-table font-bold text-on-surface outline-none focus:border-secondary"
            />
          </div>
        </div>
      </div>

      {/* 3. Grand Total Display */}
      <div className="p-space-md rounded-xl bg-primary-container text-on-primary flex flex-col gap-1 shadow-inner">
        <span className="font-label-sm text-label-sm text-on-primary-container uppercase font-semibold tracking-wider">
          Total Payable Amount
        </span>
        <div className="flex items-baseline justify-between">
          <span className="font-numeric-total text-numeric-total text-white leading-none">
            ₹{grandTotal.toFixed(2)}
          </span>
          <span className="font-label-sm text-label-sm text-tertiary-fixed font-semibold">
            Included Taxes & Fees
          </span>
        </div>
      </div>

      {/* 4. Payment Method Selector */}
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
          Select Payment Method
        </span>
        <div className="grid grid-cols-4 gap-space-xs">
          {paymentModes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPaymentMode(mode)}
              className={`py-2 px-1 rounded-lg text-label-md font-semibold transition-all border ${
                paymentMode === mode
                  ? 'bg-secondary-container text-on-secondary-container border-secondary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant border-surface-container-high hover:bg-surface-container'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Primary Checkout Actions */}
      <div className="flex flex-col gap-space-sm pt-space-xs">
        <Button
          variant="secondary"
          size="lg"
          kbd="F8"
          icon="check_circle"
          onClick={checkoutCurrentBill}
          disabled={cartItems.length === 0}
          className="w-full justify-center py-3 text-lg"
        >
          Pay & Clear Invoice (₹{grandTotal.toFixed(2)})
        </Button>

        <div className="grid grid-cols-2 gap-space-xs">
          <Button
            variant="surface"
            size="md"
            kbd="F4"
            onClick={holdCurrentBill}
            disabled={cartItems.length === 0}
            className="justify-center"
          >
            Hold Bill ({heldBills.length})
          </Button>

          <Button
            variant="outline"
            size="md"
            kbd="F9"
            icon="print"
            onClick={() => usePosStore.getState().openPrintModal()}
            className="justify-center"
          >
            Print Preview
          </Button>
        </div>
      </div>
    </div>
  );
};
