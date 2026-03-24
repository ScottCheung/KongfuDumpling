/** @format */

'use client';

import { useState } from 'react';
import { MenuCategory } from '@/types/menu';
import { X } from 'lucide-react';

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: MenuCategory;
  onSave: (updates: Partial<MenuCategory>) => void;
}

export function CategoryEditModal({
  isOpen,
  onClose,
  category,
  onSave,
}: CategoryEditModalProps) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ name, description });
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='bg-panel rounded-2xl shadow-2xl w-full max-w-2xl mx-4 border border-border'>
        <div className='flex items-center justify-between p-6 border-b border-border'>
          <h2 className='text-2xl font-bold text-ink-primary'>
            Edit Category
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-primary/10 rounded-lg transition-colors'
          >
            <X className='w-5 h-5 text-ink-secondary' />
          </button>
        </div>

        <div className='p-6 space-y-6'>
          <div>
            <label className='block text-sm font-medium text-ink-primary mb-2'>
              Category Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-ink-primary'
              placeholder='Enter category name'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-ink-primary mb-2'>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-ink-primary resize-none'
              placeholder='Enter category description'
            />
          </div>
        </div>

        <div className='flex items-center justify-end gap-3 p-6 border-t border-border'>
          <button
            onClick={onClose}
            className='px-6 py-2.5 bg-background hover:bg-border rounded-lg text-ink-primary font-medium transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground font-medium transition-colors'
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
