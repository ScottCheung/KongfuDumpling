/** @format */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Edit3,
  Monitor,
  Database,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChefHat,
} from 'lucide-react';

export default function Home() {
  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    }
  };

  return (
    <div className='min-h-screen bg-[#0a0a0a] text-white selection:bg-amber-500/30 overflow-hidden relative'>
      {/* Decorative Background Elements */}
      <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none'></div>
      <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none'></div>

      <div className='max-w-7xl w-full mx-auto px-6 py-20 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='text-center mb-20'
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='inline-block mb-4 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md'
          >
            <span className='text-amber-500 text-sm font-medium tracking-widest uppercase flex items-center gap-2'>
              <Sparkles size={14} /> Premium Menu System
            </span>
          </motion.div>
          <h1
            className='text-7xl md:text-8xl font-black mb-6 bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent'
            style={{
              fontFamily: 'var(--font-display, Inter), sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Kung Fu Kitchen
          </h1>
          <p className='text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed'>
            Elevate your culinary presentation with our intelligent menu
            management and display solution.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-6 mb-20'>
          {/* Showcase Card */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href='/menu'>
              <div className='group relative h-full bg-white/5 backdrop-blur-xl rounded-4xl p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='relative z-10'>
                  <div className='w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500'>
                    <ChefHat className='text-emerald-500 w-7 h-7' />
                  </div>
                  <h2 className='text-2xl font-bold mb-4 group-hover:text-emerald-500 transition-colors'>
                    Menu Showcase
                  </h2>
                  <p className='text-gray-400 text-base leading-relaxed mb-8'>
                    Browse our gourmet collection with high-fidelity visuals and
                    detailed culinary information.
                  </p>
                  <div className='flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all mt-auto'>
                    View Menu{' '}
                    <ArrowRight size={18} className='text-emerald-500' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div> */}

          {/* Editor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href='/editor'>
              <div className='group relative h-full bg-white/5 backdrop-blur-xl rounded-4xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-500 overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='relative z-10'>
                  <div className='w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/20 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500'>
                    <Edit3 className='text-amber-500 w-7 h-7' />
                  </div>
                  <h2 className='text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors'>
                    Menu Editor
                  </h2>
                  <p className='text-gray-400 text-base leading-relaxed mb-8'>
                    Modify descriptions, adjust pricing, and customize your
                    visual themes with our real-time editor.
                  </p>
                  <div className='flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all mt-auto'>
                    Open Editor{' '}
                    <ArrowRight size={18} className='text-amber-500' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Screen Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href='/screen/1' onClick={enterFullscreen}>
              <div className='group relative h-full bg-white/5 backdrop-blur-xl rounded-4xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-500 overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className='relative z-10'>
                  <div className='w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-500'>
                    <Monitor className='text-orange-500 w-7 h-7' />
                  </div>
                  <h2 className='text-2xl font-bold mb-4 group-hover:text-orange-500 transition-colors'>
                    Display Screen
                  </h2>
                  <p className='text-gray-400 text-base leading-relaxed mb-8'>
                    Display multi-screen menu boards with adaptive layouts that
                    scale across any 16:9 resolution.{' '}
                  </p>
                  <div className='flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all mt-auto'>
                    Launch Display{' '}
                    <ArrowRight size={18} className='text-orange-500' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className='grid md:grid-cols-3 gap-8 py-10 border-t border-white/10'
        >
          <div className='flex flex-col items-center text-center px-4'>
            <div className='w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10'>
              <Database className='text-amber-500/70 w-5 h-5' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Local Storage</h4>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Changes are automatically synced to your browser's local storage.
            </p>
          </div>
          <div className='flex flex-col items-center text-center px-4'>
            <div className='w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10'>
              <RotateCcw className='text-amber-500/70 w-5 h-5' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Instant Reset</h4>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Quickly revert to default templates with a single click at any
              time.
            </p>
          </div>
          <div className='flex flex-col items-center text-center px-4'>
            <div className='w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10'>
              <Sparkles className='text-amber-500/70 w-5 h-5' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Change Tracking</h4>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Visual indicators highlight exactly which fields have been
              modified.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
