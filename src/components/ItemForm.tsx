import { Check, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReceiptTemplate } from '../utils/receipt';

interface ItemFormProps {
  onAdd: (item: { name: string; price: number; quantity: number; description?: string }) => void;
  onEdit?: (item: { name: string; price: number; quantity: number; description?: string }, index: number) => void;
  template: ReceiptTemplate;
  editingItem?: { name: string; price: number; quantity: number; description?: string };
  editingIndex?: number;
}

const ItemForm: React.FC<ItemFormProps> = ({ onAdd, onEdit, template, editingItem, editingIndex }) => {
  const { t, i18n } = useTranslation();
  const isRealEstate = template.fields.purchaseAmount;
  const [item, setItem] = useState({
    name: editingItem?.name || '',
    price: editingItem?.price?.toString() || (isRealEstate ? '0' : ''),
    quantity: editingItem?.quantity?.toString() || '1',
    description: editingItem?.description || '',
  });

  useEffect(() => {
    if (editingItem) {
      setItem({
        name: editingItem.name,
        price: editingItem.price.toString(),
        quantity: editingItem.quantity.toString(),
        description: editingItem.description || '',
      });
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item.name && (item.price || isRealEstate)) {
      const newItem = {
        name: item.name,
        price: parseFloat(item.price) || 0,
        quantity: parseInt(item.quantity),
        description: item.description || undefined,
      };

      if (editingIndex !== undefined && onEdit) {
        onEdit(newItem, editingIndex);
      } else {
        onAdd(newItem);
      }
      setItem({ 
        name: '', 
        price: isRealEstate ? '0' : '', 
        quantity: '1', 
        description: '' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={item.name}
          onChange={(e) => setItem(prev => ({ ...prev, name: e.target.value }))}
          placeholder={t(template.itemLabel)}
          className="rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:outline-none px-2 py-1 text-base transition-colors duration-200"
          required
        />
        <input
          type="number"
          value={item.price}
          onChange={(e) => setItem(prev => ({ ...prev, price: e.target.value }))}
          placeholder={isRealEstate ? "0 (Optional)" : t(template.priceLabel)}
          step="0.01"
          min="0"
          className="rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:outline-none px-2 py-1 text-base transition-colors duration-200"
          required={!isRealEstate}
        />
      </div>
      {template.fields.description && (
        <input
          type="text"
          value={item.description}
          onChange={(e) => setItem(prev => ({ ...prev, description: e.target.value }))}
          placeholder={t('description')}
          className="w-full rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:outline-none px-2 py-1 text-base transition-colors duration-200"
        />
      )}
      <div className="flex gap-4">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => setItem(prev => ({ ...prev, quantity: e.target.value }))}
          placeholder={t(template.quantityLabel)}
          min="1"
          className="w-28 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:outline-none px-2 py-1 text-base transition-colors duration-200"
          required
        />
        <button
          type="submit"
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-600 transition-colors duration-200 text-base"
        >
          {editingIndex !== undefined ? <Check className="w-5 h-5 text-green-500" /> : <Plus className="w-5 h-5" />}
          {editingIndex !== undefined ? t('edit') : t('add')}{i18n.language === 'zh' ? '' : ' '}{t(template.itemLabel)}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;