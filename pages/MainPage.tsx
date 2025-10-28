
import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import ShoppingCart from '../components/ShoppingCart';

const MainPage: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
      <div className="relative bg-[#e0e5ec] text-gray-700 min-h-screen">
        <div 
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-fixed z-0"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/pw/AP1GczOCzRZyk5D9Bp4zXBQylpyE_LaahmOu4P0zjTdyP9fa4vflfdbY0jWqQjKm2xoQ9HxlSE3l5BKRzn_Ia-hxCa0X8-rp-CfWEUGgImi16AGVHqNS5XlrqP0Ob6Q8O9OURlkrOdlIsfeNbeV4ABejfww=w1487-h991-s-no-gm?authuser=0')" }}
        >
          <div className="absolute inset-0 bg-white/75"></div>
        </div>
        
        <div className="relative z-10">
          <Header 
            onCartClick={() => setCartOpen(true)} 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectedCategoryChange={setSelectedCategory}
          />
          <main className="container mx-auto px-4 pt-24 pb-12">
            <Hero />
            <Menu searchQuery={searchQuery} selectedCategory={selectedCategory} />
          </main>
          <Footer />
        </div>
        
        <ShoppingCart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      </div>
  );
};

export default MainPage;
