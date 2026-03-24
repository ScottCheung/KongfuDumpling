/** @format */

import { MenuItem } from '@/types/menu';
import { TagDisplay } from './TagDisplay';
import Image from 'next/image';
import { Badge } from '@/components/UI/badge';
import { Button } from '@/components/UI/Button';
import { Edit, RotateCcw, Trash2 } from 'lucide-react';
import { PriceDisplay } from './PriceDisplay';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: () => void;
  onReset: () => void;
  onDelete: () => void;
}

export function MenuItemCard({
  item,
  onEdit,
  onReset,
  onDelete,
}: MenuItemCardProps) {
  // Calculate display price
  const getPriceDisplay = () => {
    const basePrice = item.price || 0;

    if (item.options && item.options.length > 0) {
      const optionPrices = item.options.map((opt) => opt.price || 0);

      // Check if all option prices are the same
      const allSame = optionPrices.every((p) => p === optionPrices[0]);

      if (allSame) {
        // All options have same additional price
        const finalPrice = basePrice + optionPrices[0];
        return {
          price: finalPrice,
          showFrom: false,
        };
      } else {
        // Different prices, show lowest
        const lowestOptionPrice = Math.min(...optionPrices);
        const lowestFinalPrice = basePrice + lowestOptionPrice;
        return {
          price: lowestFinalPrice,
          showFrom: true,
        };
      }
    }

    return {
      price: basePrice,
      showFrom: false,
    };
  };

  const { price: displayPrice, showFrom } = getPriceDisplay();
  const hasOptions = item.options && item.options.length > 0;

  return (
    <div className='bg-panel/60 relative group  rounded-card  overflow-hidden hover:bg-primary/10 transition-all duration-300'>
      {/* Header Section */}
      <div className='p-card '>
        <div className='flex items-start gap-4'>
          {/* Image */}
          {item.image && (
            <div className='flex-shrink-0 relative w-20 h-20'>
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes='80px'
                className='object-cover rounded-lg ring-2 ring-border/30'
              />
            </div>
          )}

          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between w-full mb-2'>
              <div className='flex items-center  gap-2'>
                <h3 className='text-xl font-bold text-ink-primary truncate'>
                  {item.name}
                </h3>
                {item.isModified && (
                  <Badge variant='warning' className='flex-shrink-0'>
                    Modified
                  </Badge>
                )}
              </div>
              <div className='flex items-baseline gap-1'>
                <span className=' font-bold text text-primary'>
                  {showFrom && 'from'}
                </span>

                <PriceDisplay
                  price={displayPrice}
                  className='text-4xl text-primary'
                />
              </div>
            </div>

            {/* Options Grid */}
            {hasOptions && (
              <div className='flex flex-wrap gap-4'>
                {item.options!.map((option, idx) => {
                  const basePrice = item.price || 0;
                  const optionPrice = option.price || 0;
                  const finalPrice = basePrice + optionPrice;

                  return (
                    <div
                      key={idx}
                      className='bg-panel  rounded-lg p-3  bg-primary/10 transition-all duration-200 group'
                    >
                      <div className='flex items-baseline justify-start gap-4 mb-2'>
                        <div className='text-ink-primary font-semibold text-lg'>
                          {option.name}
                        </div>
             
                      </div>

                      {/* Tags for each option */}
                      {option.tags && <TagDisplay tags={option.tags} />}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tags - only show if item has no options */}
            {item.tags && !hasOptions && <TagDisplay tags={item.tags} />}
            {item.description && (
              <p className='text-ink-primary text-base mb-2 line-clamp-2'>
                {item.description}
              </p>
            )}
            {item.modifiedFields && item.modifiedFields.length > 0 && (
              <p className='text-xs text-ink-secondary/50 mt-2'>
                Modified: {item.modifiedFields.join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='flex gap-2 absolute bottom-6 right-6 group-hover:opacity-100 opacity-0'>
        <Button onClick={onEdit} variant='secondary' size='sm' Icon={Edit}>
          Edit
        </Button>
        {item.isModified && (
          <Button
            onClick={onReset}
            variant='outline'
            size='sm'
            Icon={RotateCcw}
          >
            Reset
          </Button>
        )}
        <Button
          onClick={onDelete}
          variant='destructive'
          size='sm'
          Icon={Trash2}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
