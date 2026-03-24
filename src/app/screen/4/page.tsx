/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useMenuStore } from '@/lib/store/menu-store';
import { PriceDisplay } from '@/app/editor/components/PriceDisplay';
import { motion } from 'framer-motion';
import menuData from '../../../../data/menu.json';
import Image from 'next/image';

export default function Screen4() {
  const { categories, isLoaded, setCategories } = useMenuStore();
  const [mounted, setMounted] = useState(false);

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

  return (
    <div className='h-screen w-screen overflow-hidden bg-[#0a0a0a] relative'>
      {/* Background with slight grain or pattern */}
      <div className='absolute inset-0 opacity-[0.03] pointer-events-none'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 70% 70%, #ffd700 0%, transparent 60%)`,
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main Content */}
      <main className='relative z-10 p-[2vw] h-full flex flex-col'>
        <header className='-mt-[1vw] mb-[2vw] flex justify-between items-end'>
          <div
            className='text-[4vw] font-black leading-tight'
            style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            All Menu
          </div>
          <div className='text-[#ffd700]/20 text-[1.2vw] font-bold uppercase tracking-[0.5em] mb-[1vw]'>
            Signature Flavors
          </div>
        </header>

        <section className='flex-1 grid grid-cols-3 gap-[4vw] -mt-[2vw] '>
          {/* Column 1: Dumplings & Side Dishes */}
          <div className='flex flex-col gap-[4vw]'>
            {categories.filter(cat => ['homemade-dumplings', 'side-dish'].includes(cat.id)).map(cat => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>

          {/* Column 2: Rice Bowls */}
          <div className='flex flex-col gap-[4vw]'>
            {categories.filter(cat => ['kong-fu-rice-bowls'].includes(cat.id)).map(cat => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>

          {/* Column 3: Soup & Noodles */}
          <div className='flex flex-col gap-[4vw]'>
            {categories.filter(cat => ['soup', 'noodle-fried-rice'].includes(cat.id)).map(cat => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function CategorySection({ category }: { category: any }) {
  return (
    <div className='flex flex-col gap-[1vw]'>
      <div className='text-[#ffd700] text-[1vw] font-bold uppercase tracking-widest border-b-4 border-[#ffd700]/20 pb-[0.5vw] '>
        {category.name}
      </div>
      <div className='flex flex-col gap-[0.7vw]'>
        {category.items.map((item: any) => (
          <div key={item.id} className='flex items-center group'>
            <div className='w-[4vw] h-[4vw] shrink-0 mr-[0.5vw] rounded-full relative overflow-hidden'>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes='4vw'
                  className='object-contain transition-transform'
                />
              )}
            </div>
            <div className='flex-1 flex flex-col -mt-[1vw]'>
              <div className='flex items-center justify-between'>
                <h4 className='text-[1vw] font-bold text-white leading-none whitespace-nowrap'>
                  {item.name}
                </h4>
                <span className='flex-1 border-b border-dashed border-white/20 mx-[0.8vw] mb-[0.3vw]'></span>
                <PriceDisplay
                  size={1}
                  price={item.price || 0}
                  className='z-10 text-[#F3D092]'
                />
              </div>
              {/* Item Tags */}
              <div className='flex flex-wrap gap-[0.4vw] text-[0.6vw]'>
                {item.tags?.ingredients?.map((tag: string) => (
                  <span
                    key={tag}
                    className='px-[0.4vw] bg-white/10 text-white/60 rounded-[0.2vw] '
                  >
                    {tag}
                  </span>
                ))}
                {item.tags?.flavors?.map((tag: string) => (
                  <span
                    key={tag}
                    className='px-[0.4vw] bg-[#ffd700]/10 text-[#ffd700] rounded-[0.2vw] '
                  >
                    {tag}
                  </span>
                ))}
                {item.tags?.restrictions?.map((tag: string) => (
                  <span
                    key={tag}
                    className='px-[0.4vw] bg-[#ff9500]/10 text-[#ff9500] rounded-[0.2vw] '
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
