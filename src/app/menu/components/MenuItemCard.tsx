'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame, Leaf } from 'lucide-react';
import { PriceDisplay } from '@/app/editor/components/PriceDisplay';
import { MenuItem } from './types';

interface MenuItemCardProps {
  item: MenuItem;
  categoryImage?: string;
}

export default function MenuItemCard({ item, categoryImage }: MenuItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
      className='group relative bg-white/3 backdrop-blur-2xl rounded-3xl p-5 border border-white/5 hover:border-white/10 all duration-500'
    >
      <div className='relative h-56 rounded-2xl  mb-6'>
        <Image
          src={item.image || categoryImage || '/api/placeholder/400/300'}
          alt={item.name}
          fill
          className='object-contain transform duration-700 '
        />

        <div className='absolute -right-2  -bottom-4 flex items-center justify-center font-bold italic tracking-wider text-[#F3D092] capitalize rounded-full'>
          <PriceDisplay
            price={item.price || 0}
            className='z-10 scale-60'
          />
          <div className='w-full h-full bg-white/3 absolute blur-xl z-0'></div>
        </div>
      </div>

      <div className='px-2'>
        <h3 className='text-xl font-bold mb-2 group-hover:text-amber-500 colors'>
          {item.name}
        </h3>
        {item.description && (
          <p className='text-gray-400/80 text-sm line-clamp-2 mb-4 font-light'>
            {item.description}
          </p>
        )}

        <div className='space-y-4 mb-6'>
          {/* Ingredients */}
          {item.tags.ingredients.length > 0 && (
            <div>
              <span className='text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2'>Ingredients / 材料</span>
              <div className='flex flex-wrap gap-1'>
                {item.tags.ingredients.map(ing => (
                  <span key={ing} className='text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5'>
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Flavors & Restrictions */}
          {(item.tags.flavors.length > 0 || item.tags.restrictions.length > 0) && (
            <div className='flex flex-wrap gap-4'>
              {item.tags.flavors.length > 0 && (
                <div className='flex-1 min-w-[120px]'>
                  <span className='text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2'>Flavors / 口味</span>
                  <div className='flex flex-wrap gap-1.5'>
                    {item.tags.flavors.map(tag => (
                      <span key={tag} className='flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-orange-400/90 bg-orange-400/5 px-2 py-1 rounded-md border border-orange-400/10'>
                        <Flame size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {item.tags.restrictions.length > 0 && (
                <div className='flex-1 min-w-[120px]'>
                  <span className='text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2'>Dietary / 禁忌</span>
                  <div className='flex flex-wrap gap-1.5'>
                    {item.tags.restrictions.map(tag => (
                      <span key={tag} className='flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-500/90 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10'>
                        <Leaf size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Options */}
        {item.options && item.options.length > 0 && (
          <div className='mb-6 space-y-3 '>
            <span className='text-[10px] uppercase tracking-widest text-amber-500/80 font-bold block'>Selection Options / 规格选项</span>
            <div className='grid gap-3'>
              {item.options.map((opt, idx) => (
                <div key={idx} className='group/opt border-l-2 border-amber-500/20 hover:border-amber-500/50 pl-3 py-1 all'>
                  <div className='flex justify-between items-center mb-1'>
                    <span className='text-sm font-semibold text-gray-200 group-hover/opt:text-white colors'>{opt.name}</span>
                    {opt.price > 0 && <span className='text-xs font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded'>+${opt.price}</span>}
                  </div>
                  <div className='flex flex-wrap gap-x-2 gap-y-1'>
                    {opt.tags.ingredients.map((ing, i) => (
                      <span key={ing} className='text-[10px] text-gray-500 font-medium'>
                        {ing}{i < opt.tags.ingredients.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
