/** @format */

'use client';

import { useState } from 'react';

interface EditCategoryDrawerProps {
  categoryName: string;
  categoryDescription?: string;
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
}

export function EditCategoryDrawer({
  categoryName,
  categoryDescription = '',
  onSave,
  onCancel,
}: EditCategoryDrawerProps) {
  const [name, setName] = useState(categoryName);
  const [description, setDescription] = useState(categoryDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), description.trim());
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='px-6 py-4 border-b border-border'>
        <h2 className='text-2xl font-bold text-ink-primary'>Edit Category</h2>
      </div>

      <form onSubmit={handleSubmit} className='flex-1 flex flex-col'>
        <div className='flex-1 overflow-y-auto px-6 py-6 space-y-6'>
          <div>
            <label className='block text-sm font-medium text-ink-primary mb-2'>
              Category Name *
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 bg-background border border-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-primary'
              placeholder='Enter category name'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-ink-primary mb-2'>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full px-4 py-2 bg-background border border-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none'
              placeholder='Enter category description (optional)'
              rows={4}
            />
          </div>
        </div>

        <div className='px-6 py-4 border-t border-border flex gap-3'>
          <button
            type='button'
            onClick={onCancel}
            className='flex-1 px-4 py-2 bg-panel hover:bg-panel/80 text-ink-primary rounded-lg transition-colors'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium'
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
