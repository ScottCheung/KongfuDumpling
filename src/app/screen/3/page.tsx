/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useMenuStore } from '@/lib/store/menu-store';
import { PriceDisplay } from '@/app/editor/components/PriceDisplay';
import { motion } from 'framer-motion';
import { AutoScroll } from '@/components/UI/AutoScroll/AutoScroll';
import menuData from '../../../../data/menu.json';
import Image from 'next/image';

export default function Screen3() {
  const { categories, isLoaded, setCategories } = useMenuStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      setCategories(menuData.categories as any);
    }

    setMounted(true);

    // Set CSS variable for responsive scaling based on viewport oo
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
        <div className='text-4xl font-bold text-white'>Loading...</div>
      </div>
    );
  }

  const soup = categories.find((cat) => cat.id === 'soup');
  const noodleRice = categories.find((cat) => cat.id === 'noodle-fried-rice');

  if (!soup || !noodleRice) return null;

  // Combine items from both categories
  const allItems = [...soup.items, ...noodleRice.items];

  return (
    <div className='h-screen w-screen overflow-hidden bg-[#0a0a0a] relative'>
      {/* Main Content */}
      <main className='relative z-10  flex flex-col'>
        <div
          className='text-[8vw] font-black absolute -top-[3vw] left-[3vw]  -z-10'
          style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Soup & Noodles
        </div>

        {/* Grid for all items */}
        <div className='absolute top-[8vw]  grid z-30 grid-cols-4 gap-[3vw] pl-[2vw] pr-[4vw]'>
          {allItems.map((item, idx) => (
            <div key={item.id} className='group relative'>
              <div className='relative h-full flex flex-col'>
                {/* Image with responsive height */}
                <div className='relative  w-full  max-w-[17VW]  mx-auto'>
                  {item.image && (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 100,
                        repeat: Infinity,
                      }}
                      className='relative flex overflow-hidden w-full aspect-square'
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes='17vw'
                        className='z-30 object-contain shadow-xl'
                      />
                    </motion.div>
                  )}

                  {/* Price Badge - positioned relative to image container */}
                  <div className='absolute -right-[4vw] bottom-[2vw] flex items-baseline justify-center font-bold italic tracking-wider text-[#F3D092] gap-[0.2vw] capitalize rounded-full'>
                    {item.options.length !== 0 && <div className='z-30 text-[1vw]'>From </div>}
                    <PriceDisplay
                      price={item.price || 0}
                      className='z-30'
                      size={2}
                    />
                    <div className='w-full h-full bg-black absolute blur-xl z-0'></div>
                  </div>
                </div>

                {/* Content */}
                <div className='flex flex-col gap-[1vw] justify-center z-20 -mt-[2.5vw]'>
                  <div className='flex relative justify-center'>
                    {/* <AutoScroll speed={5}> */}
                    <h3 className=' font-bold px-5 text-[1.8vw]  text-stroke  z-20 text-white text-center leading-[2.2vw]'>
                      {item.name}
                    </h3>
                    {/* </AutoScroll> */}
                    <div className='w-full h-full bg-black absolute blur-xl z-0'></div>
                  </div>

                  <div className='text-[0.9vw] flex flex-col gap-[0.5vw] -mt-[0.5vw] z-20'>
                    {/* Tags Display */}
                    {(item.tags?.ingredients?.length ||
                      item.tags?.flavors?.length ||
                      item.tags?.restrictions?.length) && (
                        <div className='flex flex-wrap justify-center gap-[0.5vw]'>
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
                      <div className='flex flex-wrap justify-center  gap-[0.5vw]'>
                        {item.options.map((opt: any, i: number) => (
                          <span
                            key={i}
                            className='px-[0.5vw] text-[0.8vw] bg-gradient-to-r from-[#ff6b35]/20 to-[#f7931e]/20 text-[#ff9500] rounded-full font-medium  border border-[#ff9500]/30'
                          >
                            {opt.name + ' '}
                            {
                              <span className='text-[#ffd700] font-bold'>
                                $ {(item.price + opt.price).toFixed(2)}
                              </span>
                            }
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
