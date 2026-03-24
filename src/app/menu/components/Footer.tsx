'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Utensils, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='relative py-60 overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/order_ready_bg.png'
          alt='Order Ready'
          fill
          className='object-cover opacity-50 scale-110'
        />
        <div className='absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-black'></div>
        <div className='absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent'></div>
      </div>

      <div className='max-w-4xl mx-auto px-6 text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md mb-8'>
            <Utensils size={14} className='text-amber-500' />
            <span className='text-amber-500 text-xs font-bold tracking-[0.2em] uppercase'>Experience More</span>
          </div>
          <h2 className='text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent'>
            Ready to <span className='text-amber-500'>Order?</span>
          </h2>
          <p className='text-xl md:text-2xl text-gray-400 mb-12 font-light max-w-2xl mx-auto leading-relaxed'>
            Taste the tradition, embrace the craft. Your culinary journey continues at KunFu Dumpling.
          </p>
          <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
            <Link href='/' className='group px-12 py-5 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center gap-2'>
              Back to Home <ChevronRight size={18} className='group-hover:translate-x-1 transition-transform' />
            </Link>
            <Link href='/editor' className='px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 backdrop-blur-md hover:scale-105 transition-all'>
              View Admin Panel
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
