/** @format */

'use client';

import { useEffect } from 'react';
import { Badge } from '@/components/UI/badge';
import { Utensils, Flame, AlertTriangle } from 'lucide-react';
import { useTagsStore } from '@/lib/store/tags-store';

interface TagSelectorProps {
  selectedTags: {
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  };
  onToggle: (type: 'ingredients' | 'flavors' | 'restrictions', tag: string) => void;
}

export function TagSelector({ selectedTags, onToggle }: TagSelectorProps) {
  const { tags, loadTags, isLoaded } = useTagsStore();

  useEffect(() => {
    if (!isLoaded) {
      loadTags();
    }
  }, [isLoaded, loadTags]);

  return (
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-ink-primary'>Tags</label>

      {/* Ingredients */}
      <div>
        <p className='text-xs text-ink-secondary mb-1.5 flex items-center gap-1'>
          <Utensils className='size-3' />
          Ingredients
        </p>
        <div className='flex flex-wrap gap-2'>
          {tags.ingredients.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.ingredients.includes(tag) ? 'success' : 'outline'}
              className='cursor-pointer hover:opacity-80 transition-opacity'
              onClick={() => onToggle('ingredients', tag)}
            >
              {selectedTags.ingredients.includes(tag) && '✓ '}
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Flavors */}
      <div>
        <p className='text-xs text-ink-secondary mb-1.5 flex items-center gap-1'>
          <Flame className='size-3' />
          Flavors
        </p>
        <div className='flex flex-wrap gap-2'>
          {tags.flavors.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.flavors.includes(tag) ? 'warning' : 'outline'}
              className='cursor-pointer hover:opacity-80 transition-opacity'
              onClick={() => onToggle('flavors', tag)}
            >
              {selectedTags.flavors.includes(tag) && '✓ '}
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div>
        <p className='text-xs text-ink-secondary mb-1.5 flex items-center gap-1'>
          <AlertTriangle className='size-3' />
          Dietary Restrictions
        </p>
        <div className='flex flex-wrap gap-2'>
          {tags.restrictions.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.restrictions.includes(tag) ? 'destructive' : 'outline'}
              className='cursor-pointer hover:opacity-80 transition-opacity'
              onClick={() => onToggle('restrictions', tag)}
            >
              {selectedTags.restrictions.includes(tag) && '✓ '}
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
