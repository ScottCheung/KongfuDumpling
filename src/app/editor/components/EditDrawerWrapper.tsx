/** @format */

'use client';

import { useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import { MenuItemEditDrawer } from './MenuItemEditDrawer';
import { useLayoutStore } from '@/lib/store/layout-store';

interface EditDrawerWrapperProps {
  item: MenuItem;
  onSave: (updates: Partial<MenuItem>) => Promise<void>;
  onCancel: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string | null>;
  uploadingImage: boolean;
}

export function EditDrawerWrapper({
  item,
  onSave,
  onCancel,
  onImageChange,
  uploadingImage,
}: EditDrawerWrapperProps) {
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({
    name: item.name,
    price: item.price,
    description: item.description,
    image: item.image,
    tags: item.tags || { ingredients: [], flavors: [], restrictions: [] },
    options: item.options ? JSON.parse(JSON.stringify(item.options)) : [],
  });

  // Reset form when item changes
  useEffect(() => {
    setEditForm({
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      tags: item.tags || { ingredients: [], flavors: [], restrictions: [] },
      options: item.options ? JSON.parse(JSON.stringify(item.options)) : [],
    });
  }, [item.id]);

  const handleFormChange = (updates: Partial<MenuItem>) => {
    setEditForm((prev) => ({ ...prev, ...updates }));
  };

  const handleImageChangeWrapper = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagePath = await onImageChange(e);
    if (imagePath) {
      setEditForm((prev) => ({ ...prev, image: imagePath }));
    }
  };

  const handleSave = async () => {
    await onSave(editForm);
  };

  return (
    <MenuItemEditDrawer
      editForm={editForm}
      onFormChange={handleFormChange}
      onImageChange={handleImageChangeWrapper}
      uploadingImage={uploadingImage}
      onSave={handleSave}
      onCancel={onCancel}
    />
  );
}
