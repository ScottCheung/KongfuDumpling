'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Category } from './types';

interface NavigationProps {
  categories: Category[];
  activeCategory: string;
  scrolled: boolean;
  scrollToCategory: (id: string) => void;
}

export default function Navigation({ categories, activeCategory, scrolled, scrollToCategory }: NavigationProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
        <Link href='/' className='flex items-center gap-2 group'>
          <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500/20 transition-colors'>
            <Home size={18} />
          </div>
          {/* <span className='font-bold text-xl tracking-tight'>KONG FU DUMPLING</span> */}
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className={`text-sm font-medium transition-all relative ${activeCategory === category.id ? 'text-amber-500' : 'text-gray-400 hover:text-white'
                }`}
            >
              {category.name}
              {activeCategory === category.id && (
                <motion.div
                  layoutId='activeCat'
                  className='absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500'
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
