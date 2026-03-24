/** @format */

import { MenuItem, MenuOption, MenuTags } from '@/types/menu';
import { TagSelector } from './TagSelector';
import Image from 'next/image';
import { InputField, Input } from '@/components/UI/input';
import { Button } from '@/components/UI/Button';
import { Card, CardContent } from '@/components/UI/card';
import { Badge } from '@/components/UI/badge';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface MenuItemEditFormProps {
  editForm: Partial<MenuItem>;
  onFormChange: (updates: Partial<MenuItem>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function MenuItemEditForm({
  editForm,
  onFormChange,
  onImageChange,
  uploadingImage,
  onSave,
  onCancel,
}: MenuItemEditFormProps) {
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

  // 添加选项
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

  // 删除选项
  const handleRemoveOption = (index: number) => {
    const newOptions = [...(editForm.options || [])];
    newOptions.splice(index, 1);
    onFormChange({ options: newOptions });
  };

  // 更新选项
  const handleOptionChange = (
    index: number,
    updates: Partial<MenuOption>,
  ) => {
    const newOptions = [...(editForm.options || [])];
    newOptions[index] = { 
      ...newOptions[index], 
      ...updates,
      // 确保 tags 也被深拷贝
      tags: updates.tags ? { ...updates.tags } : newOptions[index].tags
    };
    onFormChange({ options: newOptions });
  };

  // 更新选项标签
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

  // 计算基础价格
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
    <div className='space-y-4'>
      <InputField
        label='菜品名称'
        value={editForm.name || ''}
        onChange={(e) => onFormChange({ name: e.target.value })}
        required
      />

      {/* 图片上传 */}
      <div>
        <label className='block text-sm font-medium text-amber-900 mb-2'>
          菜品图片
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
            <Badge variant='warning'>上传中...</Badge>
          )}
        </div>
        {editForm.image && (
          <div className='mt-2 relative w-32 h-32'>
            <Image
              src={editForm.image}
              alt='预览'
              fill
              sizes='128px'
              className='object-cover rounded-lg border border-amber-200'
            />
          </div>
        )}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        {!hasOptions && (
          <InputField
            label='价格 ($)'
            type='number'
            step='0.5'
            value={editForm.price || ''}
            onChange={(e) =>
              onFormChange({ price: parseFloat(e.target.value) || 0 })
            }
          />
        )}
        <InputField
          label='描述 (可选)'
          value={editForm.description || ''}
          onChange={(e) => onFormChange({ description: e.target.value })}
        />
      </div>

      {/* 标签选择 */}
      <TagSelector
        selectedTags={
          editForm.tags || { ingredients: [], flavors: [], restrictions: [] }
        }
        onToggle={handleTagToggle}
      />

      {/* 选项管理 */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <div>
            <label className='block text-sm font-medium text-amber-900'>
              菜品选项
            </label>
            <p className='text-xs text-amber-600 mt-1'>
              如果菜品有多个选项（如不同肉类），请在这里添加。价格将显示为"从最低价起"，每个选项显示相对价格差。
            </p>
          </div>
          <Button
            onClick={handleAddOption}
            variant='secondary'
            size='sm'
            Icon={Plus}
          >
            添加选项
          </Button>
        </div>

        {hasOptions && (
          <div className='space-y-3'>
            {editForm.options!.map((option, index) => {
              const priceDiff = (option.price || 0) - basePrice;
              return (
                <Card key={index} className='bg-amber-50/50'>
                  <CardContent className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <Badge variant='neutral'>选项 {index + 1}</Badge>
                      <Button
                        onClick={() => handleRemoveOption(index)}
                        variant='destructive'
                        size='sm'
                        Icon={Trash2}
                      >
                        删除
                      </Button>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                      <InputField
                        label='选项名称'
                        value={option.name}
                        onChange={(e) =>
                          handleOptionChange(index, { name: e.target.value })
                        }
                        required
                      />
                      <div>
                        <InputField
                          label='价格 ($)'
                          type='number'
                          step='0.5'
                          value={option.price || ''}
                          onChange={(e) =>
                            handleOptionChange(index, {
                              price: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                        {priceDiff !== 0 && (
                          <p className='text-xs text-amber-600 mt-1'>
                            相对基础价: +${priceDiff.toFixed(2)}
                          </p>
                        )}
                      </div>
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
            <div className='text-sm text-amber-700 bg-amber-50 p-3 rounded-lg'>
              基础价格（最低价）: ${basePrice.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      <div className='flex gap-3'>
        <Button onClick={onSave} variant='default' Icon={Save}>
          保存
        </Button>
        <Button onClick={onCancel} variant='secondary' Icon={X}>
          取消
        </Button>
      </div>
    </div>
  );
}
