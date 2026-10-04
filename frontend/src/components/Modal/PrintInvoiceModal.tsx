import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { usePosStore } from '../../store/usePosStore';

export const PrintInvoiceModal: React.FC = () => {
  const { isPrintModalOpen, closePrintModal, activePrintBill } = usePosStore();

  if (!activePrintBill) return null;

  return (
    <Modal
      isOpen={isPrintModalOpen}
      onClose={closePrintModal}
      title={`Print Invoice Preview — ${activePrintBill.invoiceNo}`}
      subtitle="Standard A4 Thermal / PDF Tax Invoice Output"
      maxWidth="4xl"
    >
      <div className="flex flex-col gap-space-lg">
        {/* Printable A4 Container */}
        <div
          id="printable-a4-invoice"
          className="bg-white text-black p-8 rounded-lg shadow-sm border border-gray-200 font-sans text-sm flex flex-col gap-6"
        >
          {/* 1. Header & Store Info */}
          <div className="flex items-start justify-between border-b pb-6 border-gray-200">
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                APEX RETAIL MART
              </span>
              <span className="text-xs text-gray-500 font-medium mt-1">
                Store #04 · 123 Commercial Avenue, Downtown Branch
              </span>
              <span className="text-xs text-gray-500">
                GSTIN: 33AAACD9901F1Z2 · Phone: +1 (800) 555-0199
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl font-bold text-blue-600">TAX INVOICE</span>
              <span className="font-mono text-sm font-semibold text-gray-800">
                #{activePrintBill.invoiceNo}
              </span>
              <span className="text-xs text-gray-500">
                Date: {activePrintBill.date} · {activePrintBill.time}
              </span>
              <span className="text-xs text-gray-500">
                Terminal: {activePrintBill.terminal} (Cashier: {activePrintBill.cashierName})
              </span>
            </div>
          </div>

          {/* 2. Customer & Billed To */}
          <div className="flex justify-between bg-gray-50 p-4 rounded-md border border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                Billed To:
              </span>
              <span className="font-semibold text-gray-900">
                {activePrintBill.customer?.name || 'Walk-in Customer'}
              </span>
              <span className="text-xs text-gray-600">
                Phone: {activePrintBill.customer?.phone || 'N/A'}
              </span>
              {activePrintBill.customer?.address && (
                <span className="text-xs text-gray-600">
                  Address: {activePrintBill.customer.address}
                </span>
              )}
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                Payment Mode:
              </span>
              <span className="font-semibold text-green-700">
                {activePrintBill.paymentMode} (Paid)
              </span>
            </div>
          </div>

          {/* 3. Items Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-900 text-xs font-bold uppercase text-gray-700 bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Item Description</th>
                <th className="py-2 px-3 text-center">HSN/SKU</th>
                <th className="py-2 px-3 text-right">Rate</th>
                <th className="py-2 px-3 text-center">Qty</th>
                <th className="py-2 px-3 text-center">GST %</th>
                <th className="py-2 px-3 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activePrintBill.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-2 px-3 font-mono text-xs">{index + 1}</td>
                  <td className="py-2 px-3 font-semibold text-gray-900">
                    {item.product.name}
                  </td>
                  <td className="py-2 px-3 text-center font-mono text-xs text-gray-600">
                    {item.product.sku}
                  </td>
                  <td className="py-2 px-3 text-right font-mono">
                    ₹{item.unitPrice.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-center font-semibold font-mono">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-3 text-center font-mono text-xs">
                    {item.gstRate}%
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold">
                    ₹{item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 4. Total Breakdown */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <div className="w-64 flex flex-col gap-1 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-mono font-semibold">₹{activePrintBill.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total GST Tax:</span>
                <span className="font-mono font-semibold">₹{activePrintBill.totalGst.toFixed(2)}</span>
              </div>
              {activePrintBill.discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount Applied:</span>
                  <span className="font-mono font-semibold">-₹{activePrintBill.discount.toFixed(2)}</span>
                </div>
              )}
              {activePrintBill.additionalFee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Delivery/Extra Fee:</span>
                  <span className="font-mono font-semibold">+₹{activePrintBill.additionalFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-2 border-gray-300">
                <span>Grand Total:</span>
                <span className="font-mono text-lg text-blue-700">₹{activePrintBill.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* 5. Footer Terms */}
          <div className="border-t pt-4 text-center text-xs text-gray-500">
            Thank you for shopping with Apex Retail Mart! Please preserve this invoice for returns or exchanges within 14 days.
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <Button variant="outline" onClick={closePrintModal}>
            Close Preview
          </Button>
          <Button
            variant="secondary"
            kbd="F9"
            icon="print"
            onClick={() => window.print()}
          >
            Send to Thermal / A4 Printer
          </Button>
        </div>
      </div>
    </Modal>
  );
};
