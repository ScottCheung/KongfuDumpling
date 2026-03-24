/** @format */

import { useState } from 'react';
import { MenuItem } from '@/types/menu';

export function useEditorState() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<{
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  }>({
    ingredients: [],
    flavors: [],
    restrictions: [],
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newItemForm, setNewItemForm] = useState<Omit<MenuItem, 'id'> & { category?: string }>({
    category: '',
    name: '',
    price: 0,
    description: '',
    tags: {
      ingredients: [],
      flavors: [],
      restrictions: [],
    },
  });
  const [isManagingTags, setIsManagingTags] = useState(false);

  return {
    editingId,
    setEditingId,
    editForm,
    setEditForm,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    isAddingNew,
    setIsAddingNew,
    showSaveConfirm,
    setShowSaveConfirm,
    uploadingImage,
    setUploadingImage,
    newItemForm,
    setNewItemForm,
    isManagingTags,
    setIsManagingTags,
  };
}
