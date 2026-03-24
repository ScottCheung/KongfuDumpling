/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useMenuStore } from '@/lib/store/menu-store';
import { PriceDisplay } from '@/app/editor/components/PriceDisplay';
import { motion } from 'framer-motion';
import { AutoScroll } from '@/components/UI/AutoScroll/AutoScroll';
import menuData from '../../../../data/menu.json';
import Image from 'next/image';

export default function Screen1() {
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
        <div className='text-4xl font-bold text-white uppercase tracking-tighter'>
          Loading...
        </div>
      </div>
    );
  }

  const dumplings = categories.find((cat) => cat.id === 'homemade-dumplings');
  const sideDish = categories.find((cat) => cat.id === 'side-dish');

  if (!dumplings || !sideDish) return null;

  return (
    <div className='h-screen w-screen overflow-hidden bg-[#0a0a0a] relative'>
      {/* Background */}
      <div className='absolute inset-0 opacity-[0.03]'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 70% 70%, #ffd700 0%, transparent 60%)`,
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main Content */}
      <main className='relative z-10 p-page flex gap-[6vw] h-full items-start'>
        {/* Left Side: Featured Protagonist (主角) */}
        <section className='flex-[1.6] flex flex-col h-full pt-[2vw]'>
          <div className='absolute w-[60%]'>
            <div
              className='text-[10vw] -mt-[5vw] font-black leading-tight'
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Kong Fu
            </div>
            <div
              className='text-[8vw] -mt-[4vw] font-black leading-tight'
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dumpling
            </div>
          </div>

          <div className='flex  mt-[10vw] flex-col gap-[1vw]'>
            {/* Featured Item Details - Above Image (上下架构) */}
            <div className='w-full text-center flex flex-col gap-[1.2vw] mb-[2vw]'>
              {/* Emphasized Large Image */}
              <div className='relative w-full max-w-[32vw] aspect-square mx-auto'>
                {dumplings.items[0]?.image && (
                  <motion.div
                    animate={{ y: [-20, 20, -20], scale: [1.3, 1.5, 1.3] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                    }}
                    className='relative w-full h-full'
                  >
                    <Image
                      src={dumplings.items[0].image}
                      alt={dumplings.items[0].name}
                      fill
                      priority
                      sizes='32vw'
                      className='object-contain filter drop-shadow-[0_30px_60px_rgba(256,256,156,0.3)]'
                    />
                  </motion.div>
                )}

                {/* Featured Price Badge */}
                <div className='absolute -right-[8vw] bottom-0 flex items-center justify-center font-bold italic tracking-wider text-[#F3D092] capitalize rounded-full'>
                  <div className='flex items-baseline'>
                    <div className='text-[6vw] z-30'>$</div>
                    <div className='text-[12vw] z-30'>1</div>
                    <div className='text-[3vw] z-30'>/ pcs</div>
                  </div>
                  <div className='w-full h-full bg-black/50 absolute blur-3xl z-0 scale-150'></div>
                </div>
              </div>

              <div className='flex flex-wrap justify-center gap-[0.8vw] z-40 -mt-[3vw]'>
                {/* All Tags display */}
                {/* {dumplings.items[0]?.tags?.ingredients?.map((tag) => (
                  <span key={tag} className='px-[0.8vw] py-[0.1vw] bg-white/10 text-white/60 rounded-[0.4vw] text-[1vw]'>{tag}</span>
                ))}
                {dumplings.items[0]?.tags?.flavors?.map((tag) => (
                  <span key={tag} className='px-[0.8vw] py-[0.1vw] bg-[#ffd700]/10 text-[#ffd700] rounded-[0.4vw] text-[1vw]'>{tag}</span>
                ))} */}
                {dumplings.items[0]?.tags?.restrictions?.map((tag) => (
                  <span
                    key={tag}
                    className='px-[0.8vw] py-[0.1vw] bg-[#ff9500]/10 text-[#ff9500] rounded-[0.4vw] text-[1vw]'
                  >
                    {tag}
                  </span>
                ))}

                {/* Options display */}
                {dumplings.items[0]?.options?.map((opt: any, i: number) => (
                  <span
                    key={i}
                    className='px-[0.8vw] py-[0.1vw] bg-linear-to-r from-[#ff6b35]/20 backdrop-blur-sm to-[#f7931e]/20 text-[#ff9500] rounded-full font-bold border border-[#ff9500]/30 text-[1vw]'
                  >
                    {opt.name} {opt.price > 0 && `+$${opt.price.toFixed(2)}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Compact Vertical List */}
        <section className='flex-[1.4] h-full flex flex-col '>
          {/* List of other Dumplings */}
          <div className='flex flex-col gap-[1vw] mb-[4vw]'>
            <div className='text-[#ffd700] text-[1vw] font-bold uppercase tracking-widest border-b-4 border-[#ffd700]/20 pb-[0.5vw] '>
              {dumplings.name}
            </div>
            {dumplings.items.map((item) => (
              <div key={item.id} className='flex items-center group'>
                <div className='w-[5vw] h-[5vw] shrink-0 mr-[1.5vw] bg-white/5 rounded-full p-[0.3vw] relative overflow-hidden'>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes='5vw'
                      className='object-contain p-[0.3vw]'
                    />
                  )}
                </div>
                <div className='flex-1 flex flex-col'>
                  <div className='flex items-baseline justify-between'>
                    <h4 className='text-[1.5vw] font-bold text-white leading-none whitespace-nowrap'>
                      {item.name}
                    </h4>
                    <span className='flex-1 border-b border-dashed border-white/20 mx-[1vw] mb-[0.4vw]'></span>

                    <PriceDisplay
                      size={1}
                      price={item.price || 0}
                      className='z-10 text-[#F3D092]'
                    />
                  </div>
                  {/* Item Tags under Title */}
                  <div className='flex flex-wrap gap-[0.5vw] mt-[0.5vw]'>
                    {item.tags?.ingredients?.map((tag) => (
                      <span
                        key={tag}
                        className='px-[0.4vw] bg-white/10 text-white/60 rounded-[0.2vw] text-[0.7vw]'
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags?.flavors?.map((tag) => (
                      <span
                        key={tag}
                        className='px-[0.4vw] bg-[#ffd700]/10 text-[#ffd700] rounded-[0.2vw] text-[0.7vw]'
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags?.restrictions?.map((tag) => (
                      <span
                        key={tag}
                        className='px-[0.4vw] bg-[#ff9500]/10 text-[#ff9500] rounded-[0.2vw] text-[0.7vw]'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Side Dishes: List with Images */}
          <div className='flex flex-col gap-[1vw]'>
            <div className='text-[#ffd700] text-[1vw] font-bold uppercase tracking-widest border-b-4 border-[#ffd700]/20 pb-[0.5vw] '>
              {sideDish.name}
            </div>

            {sideDish.items.map((item) => (
              <div key={item.id} className='flex items-center group'>
                <div className='w-[5vw] h-[5vw] shrink-0 mr-[1.5vw] bg-white/5 rounded-full p-[0.3vw] relative overflow-hidden'>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes='5vw'
                      className='object-contain p-[0.3vw] transition-transform group-hover:scale-110'
                    />
                  )}
                </div>
                <div className='flex-1 flex flex-col'>
                  <div className='flex items-baseline justify-between'>
                    <h4 className='text-[1.5vw] font-bold text-white leading-none whitespace-nowrap'>
                      {item.name}
                    </h4>
                    <span className='flex-1 border-b border-dashed border-white/20 mx-[1vw] mb-[0.4vw]'></span>
                    <PriceDisplay
                      size={1}
                      price={item.price || 0}
                      className='z-10 text-[#F3D092]'
                    />
                  </div>
                  {/* Tags for Side Dish under Title */}
                  <div className='flex flex-wrap gap-[0.5vw] mt-[0.3vw]'>
                    {item.tags?.ingredients?.map((tag) => (
                      <span
                        key={tag}
                        className='px-[0.4vw] bg-white/10 text-white/60 rounded-[0.2vw] text-[0.7vw]'
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags?.flavors?.map((tag) => (
                      <span
                        key={tag}
                        className='px-[0.4vw] bg-[#ffd700]/10 text-[#ffd700] rounded-[0.2vw] text-[0.7vw]'
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags?.restrictions?.map((tag) => (
                      <span
                        key={tag}
                        className='px-[0.4vw] bg-[#ff9500]/10 text-[#ff9500] rounded-[0.2vw] text-[0.7vw]'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
