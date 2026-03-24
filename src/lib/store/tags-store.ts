/** @format */

import { create } from 'zustand';

export interface TagsData {
  ingredients: string[];
  flavors: string[];
  restrictions: string[];
  lastModified?: string;
}

interface TagsStore {
  tags: TagsData;
  originalTags: TagsData;
  isLoaded: boolean;
  isModified: boolean;

  // Actions
  loadTags: () => Promise<void>;
  addTag: (type: keyof Omit<TagsData, 'lastModified'>, tag: string) => void;
  removeTag: (type: keyof Omit<TagsData, 'lastModified'>, tag: string) => void;
  saveTags: () => Promise<void>;
  restoreFromBackup: () => Promise<void>;
  resetTags: () => void;
}

export const useTagsStore = create<TagsStore>((set, get) => ({
  tags: {
    ingredients: [],
    flavors: [],
    restrictions: [],
  },
  originalTags: {
    ingredients: [],
    flavors: [],
    restrictions: [],
  },
  isLoaded: false,
  isModified: false,

  loadTags: async () => {
    try {
      const response = await fetch('/api/tags');
      const data = await response.json();
      set({
        tags: data,
        originalTags: JSON.parse(JSON.stringify(data)),
        isLoaded: true,
        isModified: false,
      });
    } catch (error) {
      console.error('Failed to load tags:', error);
    }
  },

  addTag: (type, tag) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    set((state) => {
      const currentTags = state.tags[type];
      if (currentTags.includes(trimmedTag)) return state;

      return {
        tags: {
          ...state.tags,
          [type]: [...currentTags, trimmedTag],
        },
        isModified: true,
      };
    });
  },

  removeTag: (type, tag) => {
    set((state) => ({
      tags: {
        ...state.tags,
        [type]: state.tags[type].filter((t) => t !== tag),
      },
      isModified: true,
    }));
  },

  saveTags: async () => {
    const { tags } = get();
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tags),
      });

      if (response.ok) {
        const savedData = await response.json();
        set({
          tags: savedData,
          originalTags: JSON.parse(JSON.stringify(savedData)),
          isModified: false,
        });
      }
    } catch (error) {
      console.error('Failed to save tags:', error);
      throw error;
    }
  },

  restoreFromBackup: async () => {
    try {
      const response = await fetch('/api/tags/restore', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        set({
          tags: data,
          originalTags: JSON.parse(JSON.stringify(data)),
          isModified: false,
        });
      }
    } catch (error) {
      console.error('Failed to restore tags from backup:', error);
      throw error;
    }
  },

  resetTags: () => {
    const { originalTags } = get();
    set({
      tags: JSON.parse(JSON.stringify(originalTags)),
      isModified: false,
    });
  },
}));
