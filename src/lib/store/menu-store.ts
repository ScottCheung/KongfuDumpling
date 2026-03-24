import { create } from 'zustand';
import { MenuItem, MenuCategory, ModificationHistory } from '@/types/menu';

interface MenuStore {
  categories: MenuCategory[];
  history: ModificationHistory[];
  isLoaded: boolean;
  originalCategories: MenuCategory[];
  
  // Actions
  loadFromJSON: () => Promise<void>;
  updateItem: (categoryId: string, itemId: string, updates: Partial<MenuItem>) => Promise<void>;
  updateCategory: (categoryId: string, updates: Partial<MenuCategory>) => Promise<void>;
  addItem: (categoryId: string, item: Omit<MenuItem, 'id'>) => Promise<void>;
  deleteItem: (categoryId: string, itemId: string) => Promise<void>;
  resetItem: (categoryId: string, itemId: string) => Promise<void>;
  restoreFromBackup: () => Promise<void>;
  saveChanges: () => Promise<void>;
  getModifiedCount: () => number;
  getOriginalItem: (categoryId: string, itemId: string) => MenuItem | undefined;
  setCategories: (categories: MenuCategory[]) => void;
  getAllItems: () => MenuItem[];
}

import menuData from '../../../data/menu.json';

export const useMenuStore = create<MenuStore>((set, get) => ({
  categories: [],
  history: [],
  isLoaded: false,
  originalCategories: [],
  loadFromJSON: async () => {
    if (typeof window === 'undefined') return;
    
    try {
      console.log('📖 Loading from JSON file directly');
      
      const data = menuData;
      
      set({ 
        categories: data.categories || [],
        originalCategories: JSON.parse(JSON.stringify(data.categories || [])),
        history: [],
        isLoaded: true 
      });
      
      console.log('✅ Data loaded successfully from JSON');
    } catch (error) {
      console.error('Failed to load data from JSON:', error);
      set({ 
        categories: [],
        originalCategories: [],
        isLoaded: true 
      });
    }
  },

  setCategories: (categories: MenuCategory[]) => {
    set({ 
      categories: categories || [],
      originalCategories: JSON.parse(JSON.stringify(categories || [])),
      history: [],
      isLoaded: true 
    });
  },

  getAllItems: () => {
    const { categories } = get();
    const allItems: MenuItem[] = [];
    categories.forEach(category => {
      category.items.forEach(item => {
        allItems.push({
          ...item,
          category: category.name
        } as any);
      });
    });
    return allItems;
  },

  updateItem: async (categoryId: string, itemId: string, updates: Partial<MenuItem>) => {
    const { categories, originalCategories } = get();
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    
    if (categoryIndex === -1) return;
    
    const itemIndex = categories[categoryIndex].items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    
    const currentItem = categories[categoryIndex].items[itemIndex];
    const originalCategory = originalCategories.find(cat => cat.id === categoryId);
    const originalItem = originalCategory?.items.find(item => item.id === itemId);
    const modifiedFields = new Set<string>();

    // Compare with original values
    if (originalItem) {
      const fieldsToCheck: (keyof MenuItem)[] = ['name', 'price', 'description', 'image', 'tags', 'options'];
      fieldsToCheck.forEach(field => {
        const newValue = updates[field] !== undefined ? updates[field] : currentItem[field];
        const oldValue = originalItem[field];
        
        // Special handling for tags object comparison
        if (field === 'tags') {
          const newTagsStr = JSON.stringify(newValue || { ingredients: [], flavors: [], restrictions: [] });
          const oldTagsStr = JSON.stringify(oldValue || { ingredients: [], flavors: [], restrictions: [] });
          if (newTagsStr !== oldTagsStr) {
            modifiedFields.add(field);
          }
        } 
        // Special handling for options array comparison
        else if (field === 'options') {
          const newOptionsStr = JSON.stringify(newValue || []);
          const oldOptionsStr = JSON.stringify(oldValue || []);
          if (newOptionsStr !== oldOptionsStr) {
            modifiedFields.add(field);
          }
        }
        else if (newValue !== oldValue) {
          modifiedFields.add(field as string);
        }
      });
    }

    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items[itemIndex] = {
      ...currentItem,
      ...updates,
      isModified: modifiedFields.size > 0,
      modifiedFields: Array.from(modifiedFields),
    };

    set({ categories: updatedCategories });
  },

  updateCategory: async (categoryId: string, updates: Partial<MenuCategory>) => {
    const { categories, originalCategories } = get();
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    
    if (categoryIndex === -1) return;
    
    const currentCategory = categories[categoryIndex];
    const originalCategory = originalCategories.find(cat => cat.id === categoryId);
    const modifiedFields = new Set<string>();

    // Compare with original values
    if (originalCategory) {
      const fieldsToCheck: (keyof MenuCategory)[] = ['name', 'description'];
      fieldsToCheck.forEach(field => {
        const newValue = updates[field] !== undefined ? updates[field] : currentCategory[field];
        const oldValue = originalCategory[field];
        
        if (newValue !== oldValue) {
          modifiedFields.add(field as string);
        }
      });
    }

    const updatedCategories = [...categories];
    updatedCategories[categoryIndex] = {
      ...currentCategory,
      ...updates,
      isModified: modifiedFields.size > 0,
      modifiedFields: Array.from(modifiedFields),
    };

    set({ categories: updatedCategories });
  },

  addItem: async (categoryId: string, item: Omit<MenuItem, 'id'>) => {
    const { categories } = get();
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    
    if (categoryIndex === -1) return;
    
    // 生成新的 ID
    let maxId = 0;
    categories.forEach(cat => {
      cat.items.forEach(item => {
        const numId = parseInt(item.id.replace(/\D/g, '')) || 0;
        maxId = Math.max(maxId, numId);
      });
    });
    
    const newItem: MenuItem = {
      ...item,
      id: `${maxId + 1}`,
      isModified: true,
      modifiedFields: ['name', 'price', 'description'],
    };
    
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items.push(newItem);
    set({ categories: updatedCategories });
  },

  deleteItem: async (categoryId: string, itemId: string) => {
    const { categories } = get();
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    
    if (categoryIndex === -1) return;
    
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items = updatedCategories[categoryIndex].items.filter(
      item => item.id !== itemId
    );
    set({ categories: updatedCategories });
  },

  resetItem: async (categoryId: string, itemId: string) => {
    const { categories, originalCategories } = get();
    const originalCategory = originalCategories.find(cat => cat.id === categoryId);
    const originalItem = originalCategory?.items.find(item => item.id === itemId);
    
    if (!originalItem) return;

    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    if (categoryIndex === -1) return;

    const updatedCategories = [...categories];
    const itemIndex = updatedCategories[categoryIndex].items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      updatedCategories[categoryIndex].items[itemIndex] = {
        ...originalItem,
        isModified: false,
        modifiedFields: []
      };
    }

    set({ categories: updatedCategories });
  },

  saveChanges: async () => {
    const { categories } = get();
    
    if (typeof window === 'undefined') return;
    
    try {
      console.log('💾 Saving changes to JSON file');
      
      // 清除所有修改标记
      const cleanedCategories = categories.map(category => ({
        ...category,
        isModified: false,
        modifiedFields: [],
        items: category.items.map(item => ({
          ...item,
          isModified: false,
          modifiedFields: [],
        }))
      }));
      
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: cleanedCategories }),
      });
      
      // 更新 store，清除修改标记并更新原始数据
      set({ 
        categories: cleanedCategories,
        originalCategories: JSON.parse(JSON.stringify(cleanedCategories)),
        history: [],
      });
      
      console.log('✅ Changes saved successfully');
    } catch (error) {
      console.error('Failed to save changes:', error);
      throw error;
    }
  },

  restoreFromBackup: async () => {
    if (typeof window === 'undefined') return;
    
    try {
      console.log('🔄 Restoring from backup');
      const response = await fetch('/api/menu', { method: 'PATCH' });
      
      if (!response.ok) throw new Error('Failed to restore from backup');
      
      const result = await response.json();
      
      const restoredCategories = result.data.categories || [];
      
      set({ 
        categories: restoredCategories,
        originalCategories: JSON.parse(JSON.stringify(restoredCategories)),
        history: [],
      });
      
      console.log('✅ Data restored from backup successfully');
    } catch (error) {
      console.error('Failed to restore from backup:', error);
      throw error;
    }
  },

  getModifiedCount: () => {
    const { categories, originalCategories } = get();
    
    let count = 0;
    
    // 检查修改的类别
    categories.forEach(category => {
      if (category.isModified) count++;
      
      // 检查修改的项目
      category.items.forEach(item => {
        if (item.isModified) count++;
      });
      
      // 检查新增的项目
      const originalCategory = originalCategories.find(cat => cat.id === category.id);
      if (originalCategory) {
        const addedItems = category.items.filter(
          item => !originalCategory.items.find(origItem => origItem.id === item.id)
        );
        count += addedItems.length;
      }
    });
    
    // 检查删除的项目
    originalCategories.forEach(originalCategory => {
      const currentCategory = categories.find(cat => cat.id === originalCategory.id);
      if (currentCategory) {
        const deletedItems = originalCategory.items.filter(
          origItem => !currentCategory.items.find(item => item.id === origItem.id)
        );
        count += deletedItems.length;
      }
    });
    
    return count;
  },

  getOriginalItem: (categoryId: string, itemId: string) => {
    const { originalCategories } = get();
    const category = originalCategories.find(cat => cat.id === categoryId);
    return category?.items.find(item => item.id === itemId);
  },
}));
