/** @format */

import { MenuItem, MenuOption } from '@/types/menu';
import { TagSelector } from './TagSelector';
import Image from 'next/image';
import { InputField, Input } from '@/components/UI/input';
import { Button } from '@/components/UI/Button';
import { Card, CardContent } from '@/components/UI/card';
import { Badge } from '@/components/UI/badge';
import { Save, X, Plus, Trash2, Upload } from 'lucide-react';

interface MenuItemEditDrawerProps {
  editForm: Partial<MenuItem>;
  onFormChange: (updates: Partial<MenuItem>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function MenuItemEditDrawer({
  editForm,
  onFormChange,
  onImageChange,
  uploadingImage,
  onSave,
  onCancel,
}: MenuItemEditDrawerProps) {
  const handleTagToggle = (
    type: 'ingredients' | 'flavors' | 'restrictions',
    tag: string,
  ) => {
    const currentTags = editForm.tags || {
      ingredients: [],
      flavors: [],
      restrictions: [],
    };
    const currentTypeTags = currentTags[type] || [];
    const newTypeTags = currentTypeTags.includes(tag) ?
      currentTypeTags.filter((t) => t !== tag)
    : [...currentTypeTags, tag];

    onFormChange({
      tags: {
        ...currentTags,
        [type]: newTypeTags,
      },
    });
  };

  const hasOptions = editForm.options && editForm.options.length > 0;

  // Add option
  const handleAddOption = () => {
    const newOption: MenuOption = {
      name: '',
      price: 0,
      tags: { ingredients: [], flavors: [], restrictions: [] },
    };
    onFormChange({
      options: [...(editForm.options || []), newOption],
    });
  };

  // Remove option
  const handleRemoveOption = (index: number) => {
    const newOptions = [...(editForm.options || [])];
    newOptions.splice(index, 1);
    onFormChange({ options: newOptions });
  };

  // Update option
  const handleOptionChange = (
    index: number,
    updates: Partial<MenuOption>,
  ) => {
    const newOptions = [...(editForm.options || [])];
    newOptions[index] = { 
      ...newOptions[index], 
      ...updates,
      tags: updates.tags ? { ...updates.tags } : newOptions[index].tags
    };
    onFormChange({ options: newOptions });
  };

  // Update option tags
  const handleOptionTagToggle = (
    optionIndex: number,
    type: 'ingredients' | 'flavors' | 'restrictions',
    tag: string,
  ) => {
    const newOptions = [...(editForm.options || [])];
    const option = newOptions[optionIndex];
    const currentTags = option.tags || {
      ingredients: [],
      flavors: [],
      restrictions: [],
    };
    const currentTypeTags = currentTags[type] || [];
    const newTypeTags = currentTypeTags.includes(tag) ?
      currentTypeTags.filter((t) => t !== tag)
    : [...currentTypeTags, tag];

    newOptions[optionIndex] = {
      ...option,
      tags: {
        ...currentTags,
        [type]: newTypeTags,
      },
    };
    
    onFormChange({ options: newOptions });
  };

  // Calculate base price
  const getBasePrice = () => {
    if (editForm.options && editForm.options.length > 0) {
      const prices = editForm.options
        .map((opt) => opt.price)
        .filter((p): p is number => p !== undefined);
      return prices.length > 0 ? Math.min(...prices) : 0;
    }
    return editForm.price || 0;
  };

  const basePrice = getBasePrice();

  return (
    <div className='h-full flex flex-col'>
      {/* Header */}
      <div className='p-6 border-b border-border bg-panel'>
        <h2 className='text-2xl font-bold text-ink-primary'>Edit Menu Item</h2>
        <p className='text-sm text-ink-secondary mt-1'>
          Update item details, pricing, and options
        </p>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-6 space-y-4'>
        <InputField
          label='Item Name'
          value={editForm.name || ''}
          onChange={(e) => onFormChange({ name: e.target.value })}
          required
        />

        {/* Image Upload */}
        <div>
          <label className='block text-sm font-medium text-ink-primary mb-2'>
            Item Image
          </label>
          <div className='flex items-center gap-4'>
            <Input
              type='file'
              accept='image/*'
              onChange={onImageChange}
              disabled={uploadingImage}
              className='flex-1'
            />
            {uploadingImage && (
              <Badge variant='warning' className='flex items-center gap-1'>
                <Upload className='size-3 animate-pulse' />
                Uploading...
              </Badge>
            )}
          </div>
          {editForm.image && (
            <div className='mt-2 relative w-32 h-32'>
              <Image
                src={editForm.image}
                alt='Preview'
                fill
                sizes='128px'
                className='object-cover rounded-lg border border-border'
              />
            </div>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <InputField
            label={hasOptions ? 'Base Price ($)' : 'Price ($)'}
            type='number'
            step='0.5'
            value={editForm.price || ''}
            onChange={(e) =>
              onFormChange({ price: parseFloat(e.target.value) || 0 })
            }
          />
          <InputField
            label='Description (optional)'
            value={editForm.description || ''}
            onChange={(e) => onFormChange({ description: e.target.value })}
          />
        </div>

        {/* Tags */}
        <TagSelector
          selectedTags={
            editForm.tags || { ingredients: [], flavors: [], restrictions: [] }
          }
          onToggle={handleTagToggle}
        />

        {/* Options Management */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div>
              <label className='block text-sm font-medium text-ink-primary'>
                Item Options
              </label>
              <p className='text-xs text-ink-secondary mt-1'>
                Add multiple options (e.g., different proteins). Each option's price is additional to the base price.
              </p>
            </div>
            <Button
              onClick={handleAddOption}
              variant='secondary'
              size='sm'
              Icon={Plus}
            >
              Add Option
            </Button>
          </div>

          {hasOptions && (
            <div className='space-y-3'>
              {editForm.options!.map((option, index) => {
                const priceDiff = (option.price || 0) - basePrice;
                return (
                  <Card key={index} className='bg-primary/5'>
                    <CardContent className='space-y-3'>
                      <div className='flex items-center justify-between'>
                        <Badge variant='neutral'>Option {index + 1}</Badge>
                        <Button
                          onClick={() => handleRemoveOption(index)}
                          variant='destructive'
                          size='sm'
                          Icon={Trash2}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className='grid grid-cols-2 gap-3'>
                        <InputField
                          label='Option Name'
                          value={option.name}
                          onChange={(e) =>
                            handleOptionChange(index, { name: e.target.value })
                          }
                          required
                        />
                        <InputField
                          label='Additional Price ($)'
                          type='number'
                          step='0.5'
                          value={option.price || ''}
                          onChange={(e) =>
                            handleOptionChange(index, {
                              price: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>

                      <TagSelector
                        selectedTags={
                          option.tags || {
                            ingredients: [],
                            flavors: [],
                            restrictions: [],
                          }
                        }
                        onToggle={(type, tag) =>
                          handleOptionTagToggle(index, type, tag)
                        }
                      />
                    </CardContent>
                  </Card>
                );
              })}
              <div className='text-sm text-ink-secondary bg-primary/5 p-3 rounded-lg'>
                Base price: ${(editForm.price || 0).toFixed(2)} | Options add to this base price
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='p-6 border-t border-border bg-panel flex gap-3'>
        <Button onClick={onSave} variant='default' Icon={Save} className='flex-1'>
          Save Changes
        </Button>
        <Button onClick={onCancel} variant='secondary' Icon={X}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
