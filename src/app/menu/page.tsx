/** @format */

'use client';

import React, { useEffect, useState } from 'react';
import menuData from '@/../data/menu.json';
import { Category } from './components/types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';

export default function MenuShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>(menuData.categories[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active category based on scroll position
      const sections = menuData.categories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveCategory(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='min-h-screen bg-[#0a0a0a] text-white selection:bg-amber-500/30 font-sans'>
      {/* Navigation */}
      <Navigation 
        categories={menuData.categories as Category[]} 
        activeCategory={activeCategory} 
        scrolled={scrolled} 
        scrollToCategory={scrollToCategory} 
      />

      {/* Hero Section */}
      <Hero />

      {/* Menu Categories */}
      <main className='max-w-7xl mx-auto px-6 pb-40'>
        {menuData.categories.map((category, catIndex) => (
          <CategorySection 
            key={category.id} 
            category={category as Category} 
            isLast={catIndex === menuData.categories.length - 1} 
          />
        ))}
      </main>

      {/* Footer / CTA */}
      <Footer />

      {/* Background blobs */}
      <div className='fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none -z-10'></div>
      <div className='fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none -z-10'></div>
    </div>
  );
}
