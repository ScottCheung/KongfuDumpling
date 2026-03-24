'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Category } from './types';
import MenuItemCard from './MenuItemCard';

const CATEGORY_IMAGES: Record<string, string> = {
  'homemade-dumplings': '/images/dumplings_module.png',
  'side-dish': '/images/side_dish_module.png',
  'kong-fu-rice-bowls': '/images/rice_bowls_module.png',
  'soup': '/images/soup_module.png',
  'noodle-fried-rice': '/images/noodle_module.png',
};

const CATEGORY_ACCENTS: Record<string, string> = {
  'homemade-dumplings': 'amber',
  'side-dish': 'orange',
  'kong-fu-rice-bowls': 'red',
  'soup': 'emerald',
  'noodle-fried-rice': 'blue',
};

interface CategorySectionProps {
  category: Category;
  isLast: boolean;
}

export default function CategorySection({ category, isLast }: CategorySectionProps) {
  const accentColor = CATEGORY_ACCENTS[category.id] || 'amber';
  const categoryImage = CATEGORY_IMAGES[category.id] || '/images/menu_hero.png';

  return (
    <section
      id={category.id}
      className='py-20 md:py-32 scroll-mt-24'
    >
      <div className='grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start'>
        {/* Category Info Sticky */}
        <div className='lg:sticky lg:top-32'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='relative aspect-4/5 rounded-4xl overflow-hidden mb-8 group'>
              <Image
                src={categoryImage}
                alt={category.name}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent'></div>
              <div className='absolute bottom-8 left-8 right-8'>
                <h2 className='text-4xl font-bold mb-2'>{category.name}</h2>
                <div className={`h-1 w-20 bg-${accentColor}-500 rounded-full`}></div>
              </div>
            </div>
            <p className='text-gray-400 text-lg leading-relaxed mb-6 font-light'>
              {category.description}
            </p>
            <div className='flex items-center gap-4 text-sm text-gray-500'>
              <span className='flex items-center gap-1.5'>
                <span className={`w-2 h-2 rounded-full bg-${accentColor}-500`}></span>
                {category.items.length} Items Available
              </span>
            </div>
          </motion.div>
        </div>

        {/* Items Grid */}
        <div className='grid md:grid-cols-2 gap-6 md:gap-8'>
          {category.items.map((item) => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              categoryImage={categoryImage}
            />
          ))}
        </div>
      </div>

      {!isLast && (
        <div className='w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mt-20 md:mt-32'></div>
      )}
    </section>
  );
}
