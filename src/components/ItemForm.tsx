import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ReceiptTemplate } from '../utils/receipt';

interface ItemFormProps {
  onAdd: (item: { name: string; price: number; quantity: number; description?: string }) => void;
  template: ReceiptTemplate;
}

const ItemForm: React.FC<ItemFormProps> = ({ onAdd, template }) => {
  const [item, setItem] = useState({
    name: '',
    price: '',
    quantity: '1',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item.name && item.price) {
      onAdd({
        name: item.name,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        description: item.description || undefined,
      });
      setItem({ name: '', price: '', quantity: '1', description: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={item.name}
          onChange={(e) => setItem(prev => ({ ...prev, name: e.target.value }))}
          placeholder={template.itemLabel}
          className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          value={item.price}
          onChange={(e) => setItem(prev => ({ ...prev, price: e.target.value }))}
          placeholder={template.priceLabel}
          step="0.01"
          min="0"
          className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      {template.fields.description && (
        <input
          type="text"
          value={item.description}
          onChange={(e) => setItem(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Description (optional)"
          className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      )}
      <div className="flex gap-4">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => setItem(prev => ({ ...prev, quantity: e.target.value }))}
          placeholder={template.quantityLabel}
          min="1"
          className="w-24 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add {template.itemLabel}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;