/** @format */

'use client';

import { useState } from 'react';
import { useTagsStore } from '@/lib/store/tags-store';
import { Button } from '@/components/UI/Button';
import { InputField } from '@/components/UI/input';
import { Badge } from '@/components/UI/badge';
import { X, Plus, Save, RotateCcw, Utensils, Flame, AlertTriangle } from 'lucide-react';

interface ManageTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManageTagsModal({ isOpen, onClose }: ManageTagsModalProps) {
  const { tags, addTag, removeTag, saveTags, resetTags, restoreFromBackup, isModified } = useTagsStore();
  const [newTag, setNewTag] = useState({ ingredients: '', flavors: '', restrictions: '' });

  if (!isOpen) return null;

  const handleAddTag = (type: 'ingredients' | 'flavors' | 'restrictions') => {
    const tag = newTag[type].trim();
    if (tag) {
      addTag(type, tag);
      setNewTag({ ...newTag, [type]: '' });
    }
  };

  const handleSave = async () => {
    try {
      await saveTags();
      alert('Tags saved successfully!');
      onClose();
    } catch (error) {
      alert('Failed to save tags');
    }
  };

  const handleRestore = async () => {
    if (confirm('Are you sure you want to restore tags from backup?')) {
      try {
        await restoreFromBackup();
        alert('Tags restored from backup!');
      } catch (error) {
        alert('Failed to restore tags');
      }
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      resetTags();
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-panel rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-border'>
        {/* Header */}
        <div className='bg-primary px-6 py-4 flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-primary-foreground'>Manage Tags</h2>
          <button
            onClick={onClose}
            className='text-primary-foreground hover:opacity-80 transition-opacity'
          >
            <X className='size-6' />
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6 space-y-6'>
          {/* Ingredients */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2 text-lg font-semibold text-ink-primary'>
              <Utensils className='size-5' />
              <span>Ingredients</span>
            </div>
            <div className='flex gap-2'>
              <InputField
                label=''
                placeholder='Add new ingredient tag...'
                value={newTag.ingredients}
                onChange={(e) => setNewTag({ ...newTag, ingredients: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag('ingredients');
                  }
                }}
                containerClassName='flex-1'
              />
              <Button
                onClick={() => handleAddTag('ingredients')}
                Icon={Plus}
                disabled={!newTag.ingredients.trim()}
              >
                Add
              </Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {tags.ingredients.map((tag) => (
                <Badge
                  key={tag}
                  variant='default'
                  className='flex items-center gap-1 pr-1'
                >
                  {tag}
                  <button
                    onClick={() => removeTag('ingredients', tag)}
                    className='ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5'
                  >
                    <X className='size-3' />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Flavors */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2 text-lg font-semibold text-ink-primary'>
              <Flame className='size-5' />
              <span>Flavors</span>
            </div>
            <div className='flex gap-2'>
              <InputField
                label=''
                placeholder='Add new flavor tag...'
                value={newTag.flavors}
                onChange={(e) => setNewTag({ ...newTag, flavors: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag('flavors');
                  }
                }}
                containerClassName='flex-1'
              />
              <Button
                onClick={() => handleAddTag('flavors')}
                Icon={Plus}
                disabled={!newTag.flavors.trim()}
              >
                Add
              </Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {tags.flavors.map((tag) => (
                <Badge
                  key={tag}
                  variant='destructive'
                  className='flex items-center gap-1 pr-1'
                >
                  {tag}
                  <button
                    onClick={() => removeTag('flavors', tag)}
                    className='ml-1 hover:bg-destructive-foreground/20 rounded-full p-0.5'
                  >
                    <X className='size-3' />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2 text-lg font-semibold text-ink-primary'>
              <AlertTriangle className='size-5' />
              <span>Dietary Restrictions</span>
            </div>
            <div className='flex gap-2'>
              <InputField
                label=''
                placeholder='Add new dietary restriction tag...'
                value={newTag.restrictions}
                onChange={(e) => setNewTag({ ...newTag, restrictions: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag('restrictions');
                  }
                }}
                containerClassName='flex-1'
              />
              <Button
                onClick={() => handleAddTag('restrictions')}
                Icon={Plus}
                disabled={!newTag.restrictions.trim()}
              >
                Add
              </Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {tags.restrictions.map((tag) => (
                <Badge
                  key={tag}
                  variant='success'
                  className='flex items-center gap-1 pr-1'
                >
                  {tag}
                  <button
                    onClick={() => removeTag('restrictions', tag)}
                    className='ml-1 hover:bg-success-foreground/20 rounded-full p-0.5'
                  >
                    <X className='size-3' />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='border-t border-border px-6 py-4 flex items-center justify-between bg-panel/50'>
          <div className='flex gap-2'>
            <Button
              onClick={handleRestore}
              variant='outline'
              Icon={RotateCcw}
            >
              Restore Backup
            </Button>
            {isModified && (
              <Button
                onClick={handleReset}
                variant='ghost'
              >
                Reset Changes
              </Button>
            )}
          </div>
          <div className='flex gap-2'>
            <Button onClick={onClose} variant='outline'>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              Icon={Save}
              disabled={!isModified}
            >
              Save Tags
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
