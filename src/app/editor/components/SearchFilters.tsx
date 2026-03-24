/** @format */

'use client';

import { useState, useEffect } from 'react';
import { InputField } from '@/components/UI/input';
import { Badge } from '@/components/UI/badge';
import { Button } from '@/components/UI/Button';
import { X, Utensils, Flame, AlertTriangle, Settings } from 'lucide-react';
import { useTagsStore } from '@/lib/store/tags-store';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  selectedTags: {
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  };
  onTagToggle: (type: 'ingredients' | 'flavors' | 'restrictions', tag: string) => void;
  onClearFilters: () => void;
  onManageTags?: () => void;
}

export function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedTags,
  onTagToggle,
  onClearFilters,
  onManageTags,
}: SearchFiltersProps) {
  const { tags, loadTags, isLoaded } = useTagsStore();

  useEffect(() => {
    if (!isLoaded) {
      loadTags();
    }
  }, [isLoaded, loadTags]);

  const hasActiveFilters =
    selectedTags.ingredients.length > 0 ||
    selectedTags.flavors.length > 0 ||
    selectedTags.restrictions.length > 0;

  return (
    <div className='mt-4 space-y-3'>
      <div className='flex gap-4'>
        <InputField
          label='Search'
          placeholder='Search items...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          containerClassName='flex-1'
        />
        <div className='flex-shrink-0'>
          <label className='block text-sm font-medium text-ink-primary mb-2'>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className='input min-w-[200px]'
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tag Filters */}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='text-sm font-medium text-ink-primary'>Filter by Tags</div>
          {onManageTags && (
            <Button
              onClick={onManageTags}
              variant='ghost'
              size='sm'
              Icon={Settings}
            >
              Manage Tags
            </Button>
          )}
        </div>

        {/* Ingredients */}
        <div className='flex items-center gap-2 flex-wrap'>
          <div className='flex items-center gap-1 text-sm font-medium text-ink-primary min-w-[100px]'>
            <Utensils className='size-4' />
            <span>Ingredients:</span>
          </div>
          {tags.ingredients.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.ingredients.includes(tag) ? 'default' : 'outline'}
              className='cursor-pointer hover:opacity-80 transition-opacity'
              onClick={() => onTagToggle('ingredients', tag)}
            >
              {selectedTags.ingredients.includes(tag) && '✓ '}
              {tag}
            </Badge>
          ))}
        </div>

        {/* Flavors */}
        <div className='flex items-center gap-2 flex-wrap'>
          <div className='flex items-center gap-1 text-sm font-medium text-ink-primary min-w-[100px]'>
            <Flame className='size-4' />
            <span>Flavors:</span>
          </div>
          {tags.flavors.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.flavors.includes(tag) ? 'destructive' : 'outline'}
              className='cursor-pointer hover:opacity-80 transition-opacity'
              onClick={() => onTagToggle('flavors', tag)}
            >
              {selectedTags.flavors.includes(tag) && '✓ '}
              {tag}
            </Badge>
          ))}
        </div>

        {/* Restrictions */}
        <div className='flex items-center gap-2 flex-wrap'>
          <div className='flex items-center gap-1 text-sm font-medium text-ink-primary min-w-[100px]'>
            <AlertTriangle className='size-4' />
            <span>Dietary:</span>
          </div>
          {tags.restrictions.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.restrictions.includes(tag) ? 'success' : 'outline'}
              className='cursor-pointer hover:opacity-80 transition-opacity'
              onClick={() => onTagToggle('restrictions', tag)}
            >
              {selectedTags.restrictions.includes(tag) && '✓ '}
              {tag}
            </Badge>
          ))}
        </div>

        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant='ghost'
            size='sm'
            Icon={X}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}


