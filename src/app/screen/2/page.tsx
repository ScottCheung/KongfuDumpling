/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useMenuStore } from '@/lib/store/menu-store';
import { PriceDisplay } from '@/app/editor/components/PriceDisplay';
import { MenuItem } from '@/types/menu';
import { motion } from 'framer-motion';
import { AutoScroll } from '@/components/UI/AutoScroll/AutoScroll';
import menuData from '../../../../data/menu.json';
import Image from 'next/image';

export default function Screen2() {
  const { categories, isLoaded, setCategories } = useMenuStore();
  const [mounted, setMounted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<{
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  }>({
    ingredients: [],
    flavors: [],
    restrictions: [],
  });

  useEffect(() => {
    if (!isLoaded) {
      setCategories(menuData.categories as any);
    }
    setMounted(true);

    // Set CSS variable for responsive scaling based on viewport
    const updateScale = () => {
      const baseWidth = 1920; // 设计基准宽度
      const scale = window.innerWidth / baseWidth;
      document.documentElement.style.setProperty(
        '--screen-scale',
        scale.toString(),
      );
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isLoaded, setCategories]);

  if (!isLoaded) {
    return (
      <div className='h-screen flex items-center justify-center bg-[#0a0a0a]'>
        <div className='text-4xl font-bold text-white uppercase tracking-tighter'>Loading...</div>
      </div>
    );
  }

  const riceBowls = categories.find((cat) => cat.id === 'kong-fu-rice-bowls');

  if (!riceBowls) return null;

  // Filter items based on selected tags
  const filteredItems = riceBowls.items.filter((item) => {
    const hasSelectedIngredients =
      selectedTags.ingredients.length === 0 ||
      selectedTags.ingredients.every((tag) =>
        item.tags?.ingredients?.includes(tag),
      );
    const hasSelectedFlavors =
      selectedTags.flavors.length === 0 ||
      selectedTags.flavors.every((tag) => item.tags?.flavors?.includes(tag));
    const hasSelectedRestrictions =
      selectedTags.restrictions.length === 0 ||
      selectedTags.restrictions.every((tag) =>
        item.tags?.restrictions?.includes(tag),
      );

    return (
      hasSelectedIngredients && hasSelectedFlavors && hasSelectedRestrictions
    );
  });

  // Get all unique tags from items
  const allTags = {
    ingredients: Array.from(
      new Set(riceBowls.items.flatMap((item) => item.tags?.ingredients || [])),
    ),
    flavors: Array.from(
      new Set(riceBowls.items.flatMap((item) => item.tags?.flavors || [])),
    ),
    restrictions: Array.from(
      new Set(riceBowls.items.flatMap((item) => item.tags?.restrictions || [])),
    ),
  };

  const handleTagToggle = (
    type: 'ingredients' | 'flavors' | 'restrictions',
    tag: string,
  ) => {
    setSelectedTags((prev) => {
      const currentTypeTags = prev[type];
      const newTypeTags =
        currentTypeTags.includes(tag) ?
          currentTypeTags.filter((t) => t !== tag)
        : [...currentTypeTags, tag];
      return {
        ...prev,
        [type]: newTypeTags,
      };
    });
  };

  return (
    <div className='h-screen w-screen overflow-hidden bg-[#0a0a0a] relative'>
      {/* Background */}
      <div className='absolute inset-0 opacity-[0.03]'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 20% 40%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 80% 60%, #ffd700 0%, transparent 60%)`,
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main Content */}
      <main className='relative z-10  flex flex-col p-[1vw]'>
 
              <div
                className='text-[10vw] absolute top-[vw] left-[3vw] font-black   -z-10'
                style={{
                  background:
                    'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Rice Bowls
              </div>

        {/* Grid for all rice bowls */}
        <div className=' grid z-30 grid-cols-4  gap-[2vw]  pr-[2vw] '>
<div></div><div></div>
          {filteredItems.map((item, idx) => (
            <div key={item.id} className='group relative '>
              <div className='relative h-full flex flex-col '>
                {/* Image with responsive height */}
                <div className='relative  w-full mx-auto  max-w-[15VW] -mt-[1vw] '>
                  {item.image && (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 100,
                        repeat: Infinity,
                      }}
                      className='relative overflow-hidden w-full aspect-square'
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes='15vw'
                        className='z-30 object-contain shadow-xl'
                      />
                    </motion.div>
                  )}

                  {/* Price Badge - positioned relative to image container */}
                  <div className='absolute -right-[5vw]  bottom-[2vw] flex items-center justify-center font-bold italic tracking-wider text-[#F3D092] capitalize rounded-full'>
                    <PriceDisplay
                      price={item.price || 0}
                      className='z-10'
                    />
                    <div className='w-full h-full bg-black absolute blur-xl z-0'></div>
                  </div>
                </div>

                {/* Content */}
                <div className='flex flex-col gap-[1vw]  justify-center z-20 -mt-[3vw]'>
                  <AutoScroll speed={5}>
                  <h3 className=' font-bold px-5 text-[2vw] text-white text-center leading-tight'>
                    {item.name}
                  </h3>
</AutoScroll>
    
<div className='text-[0.9vw] flex mx-auto'>
                  {/* Tags Display */}
                  {(item.tags?.ingredients?.length ||
                    item.tags?.flavors?.length ||
                    item.tags?.restrictions?.length) && (
                    <div
                      className='flex flex-wrap justify-center gap-[0.5vw]'
                    >
                      {item.tags.ingredients?.map((tag) => (
                        <span
                          key={tag}
                          className='px-[0.5vw] bg-white/10 text-white/60 rounded'
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.flavors?.map((tag) => (
                        <span
                          key={tag}
                          className='px-[0.5vw] bg-[#ffd700]/20 text-[#ffd700] rounded'
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.restrictions?.map((tag) => (
                        <span
                          key={tag}
                          className='px-[0.5vw] bg-[#ff9500]/20 text-[#ff9500] rounded'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Options Display as Tags */}
                  {item.options && item.options.length > 0 && (
                    <div className='flex flex-wrap justify-center  text-[1vw] gap-[0.5vw]'>
                      {item.options.map((opt: any, i: number) => (
                        <span
                          key={i}
                          className='px-[0.5vw] bg-gradient-to-r from-[#ff6b35]/20 to-[#f7931e]/20 text-[#ff9500] rounded-full font-medium border border-[#ff9500]/30'
                        >
                          {opt.name}
                          {opt.price && opt.price > 0 && (
                            <span className='text-[#ffd700] font-bold'>
                              +${opt.price.toFixed(2)}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
