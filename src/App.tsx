import React, { useState, useRef } from 'react';
import { Printer, Store, Calendar, Package, Trash2, Save, Download, CreditCard } from 'lucide-react';
import { ReceiptTemplate, ReceiptItem, generateReceiptNumber, PaymentInfo } from './utils/receipt';
import { templates } from './data/templates';
import ReceiptPreview from './components/ReceiptPreview';
import ItemForm from './components/ItemForm';
import html2canvas from 'html2canvas';

function App() {
  const [receiptData, setReceiptData] = useState({
    storeName: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString(),
    items: [] as ReceiptItem[],
    template: templates[0],
    receiptNumber: generateReceiptNumber(),
    roomNumber: '',
    patientId: '',
    serviceDate: '',
    invoiceNumber: '',
    footerText: 'Thank you for your business!',
    paymentInfo: {
      method: 'Credit Card',
      cardLastFour: '4242',
      transactionId: generateReceiptNumber(),
    } as PaymentInfo,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const calculateTotal = () => {
    return receiptData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleAddItem = (item: ReceiptItem) => {
    setReceiptData(prev => ({
      ...prev,
      items: [...prev.items, item],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setReceiptData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleTemplateChange = (template: ReceiptTemplate) => {
    setReceiptData(prev => ({
      ...prev,
      template,
      storeName: template.defaultStoreName,
      footerText: 'Thank you for your business!',
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsPrinting(true);
    
    // Ensure template with thermalTexture is preserved
    const currentTemplate = receiptData.template;
    
    // Simulate printing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPrinting(false);
    
    // Restore template after printing
    setReceiptData(prev => ({
      ...prev,
      template: currentTemplate
    }));
  };

  const handleDownload = async () => {
    try {
      if (!receiptRef.current) return;

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `receipt-${receiptData.receiptNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download receipt:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Printer className="w-6 h-6" />
                Receipt Generator
              </h1>

              {/* Template Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      receiptData.template.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {template.icon}
                      <span className="font-medium">{template.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Store Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={receiptData.storeName}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, storeName: e.target.value }))}
                      className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter business name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Footer Text
                  </label>
                  <input
                    type="text"
                    value={receiptData.footerText}
                    onChange={(e) => setReceiptData(prev => ({ ...prev, footerText: e.target.value }))}
                    className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter custom footer text"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showTax"
                    checked={receiptData.template.showTax}
                    onChange={(e) => setReceiptData(prev => ({
                      ...prev,
                      template: {
                        ...prev.template,
                        showTax: e.target.checked
                      }
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="showTax" className="text-sm font-medium text-gray-700">
                    Show Tax
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={receiptData.date}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, date: e.target.value }))}
                        className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={receiptData.time}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, time: e.target.value }))}
                        className="pl-3 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Template-specific fields */}
                {receiptData.template.fields.roomNumber && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Number
                    </label>
                    <input
                      type="text"
                      value={receiptData.roomNumber}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, roomNumber: e.target.value }))}
                      className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter room number"
                    />
                  </div>
                )}

                {receiptData.template.fields.patientId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient ID
                    </label>
                    <input
                      type="text"
                      value={receiptData.patientId}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, patientId: e.target.value }))}
                      className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter patient ID"
                    />
                  </div>
                )}

                {receiptData.template.fields.serviceDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Date
                    </label>
                    <input
                      type="date"
                      value={receiptData.serviceDate}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, serviceDate: e.target.value }))}
                      className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                )}

                {receiptData.template.fields.invoiceNumber && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      value={receiptData.invoiceNumber}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                      className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter invoice number"
                    />
                  </div>
                )}

                {/* Payment Information */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        value={receiptData.paymentInfo.method}
                        onChange={(e) => setReceiptData(prev => ({
                          ...prev,
                          paymentInfo: { ...prev.paymentInfo, method: e.target.value }
                        }))}
                        className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>
                    {(receiptData.paymentInfo.method === 'Credit Card' || receiptData.paymentInfo.method === 'Debit Card') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last 4 Digits
                        </label>
                        <input
                          type="text"
                          value={receiptData.paymentInfo.cardLastFour}
                          onChange={(e) => setReceiptData(prev => ({
                            ...prev,
                            paymentInfo: { ...prev.paymentInfo, cardLastFour: e.target.value }
                          }))}
                          maxLength={4}
                          className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="1234"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {receiptData.template.itemLabel}s
                </h2>

                <ItemForm onAdd={handleAddItem} template={receiptData.template} />

                <div className="space-y-2">
                  {receiptData.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-gray-500">{item.description}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center py-4 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || receiptData.items.length === 0}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Generate Receipt
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!isGenerating}
                  className="bg-gray-100 text-gray-600 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Receipt Preview */}
          <div className="w-full lg:w-1/2">
            <ReceiptPreview
              data={receiptData}
              isPrinting={isPrinting}
              total={calculateTotal()}
              receiptRef={receiptRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;