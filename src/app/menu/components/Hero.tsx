'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className='relative h-[70vh] flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/menu_hero.png'
          alt='Menu Hero'
          fill
          className='object-cover opacity-60 scale-105'
          priority
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/20 via-[#0a0a0a]/40 to-[#0a0a0a]'></div>
      </div>

      <div className='relative z-10 text-center px-6 max-w-4xl pt-[20vh]'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md mb-6'>
            <Sparkles size={14} className='text-amber-500' />
            <span className='text-amber-500 text-xs font-bold tracking-[0.2em] uppercase'>Signature Menu</span>
          </div>
          <h1 className='text-6xl md:text-8xl font-black mb-6 bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent'>
            KunFu Dumpling
          </h1>
          <p className='text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto'>
            Start your Culinary Journey, discover the authentic flavors of our kitchen, crafted with tradition and passion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
