import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Barcode, CreditCard } from 'lucide-react';
import { formatCurrency, TAX_RATE } from '../utils/receipt';

interface ReceiptPreviewProps {
  data: {
    storeName: string;
    footerText: string;
    date: string;
    time: string;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      description?: string;
    }>;
    template: {
      name: string;
      thermalTexture: string;
      showTip: boolean;
      showTax: boolean;
      itemLabel: string;
      priceLabel: string;
      quantityLabel: string;
      fields: {
        description: boolean;
        roomNumber?: boolean;
        patientId?: boolean;
        serviceDate?: boolean;
        invoiceNumber?: boolean;
      };
    };
    receiptNumber: string;
    roomNumber?: string;
    patientId?: string;
    serviceDate?: string;
    invoiceNumber?: string;
    paymentInfo: {
      method: string;
      cardLastFour?: string;
      transactionId: string;
    };
  };
  isPrinting: boolean;
  total: number;
  receiptRef: React.RefObject<HTMLDivElement>;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ data, isPrinting, total, receiptRef }) => {
  const subtotal = total;
  const tax = data.template.showTax ? subtotal * TAX_RATE : 0;
  const grandTotal = subtotal + tax;

  return (
    <div id='receipt-preview' className="sticky top-8">
      <motion.div
        ref={receiptRef}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-transparent rounded-xl shadow-lg p-8 overflow-hidden"
        style={{
          backgroundImage: `url(${data.template.thermalTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative">
          <div className="font-mono space-y-4">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{data.storeName || 'Store Name'}</h2>
              <p className="text-sm text-gray-600">
                {data.date} {data.time}
              </p>
              <p className="text-sm text-gray-600">Receipt #{data.receiptNumber}</p>
              
              {/* Template-specific fields */}
              {data.template.fields.roomNumber && data.roomNumber && (
                <p className="text-sm text-gray-600">Room #{data.roomNumber}</p>
              )}
              {data.template.fields.patientId && data.patientId && (
                <p className="text-sm text-gray-600">Patient ID: {data.patientId}</p>
              )}
              {data.template.fields.serviceDate && data.serviceDate && (
                <p className="text-sm text-gray-600">Service Date: {data.serviceDate}</p>
              )}
              {data.template.fields.invoiceNumber && data.invoiceNumber && (
                <p className="text-sm text-gray-600">Invoice #: {data.invoiceNumber}</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-b border-dashed border-gray-300 my-4" />

            {/* Items */}
            <AnimatePresence>
              {data.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={isPrinting ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-gray-500">{item.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Totals */}
            <div className="border-t border-dashed border-gray-300 pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              {data.template.showTax && (
                <div className="flex justify-between text-sm">
                  <span>Tax ({(TAX_RATE * 100).toFixed(2)}%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold pt-2 border-t border-dashed border-gray-300">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>

              {/* Payment Info */}
              <div className="pt-4 text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>{data.paymentInfo.method}</span>
                  {data.paymentInfo.cardLastFour && (
                    <span className="text-gray-500">(**** {data.paymentInfo.cardLastFour})</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Transaction ID: {data.paymentInfo.transactionId}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-4 mt-8">
              <div className="flex justify-center">
                <Barcode className="w-32 h-12" />
              </div>
              <p className="text-sm text-gray-600">{data.footerText || 'Thank you for your business!'}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReceiptPreview;