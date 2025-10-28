
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

// Define filter categories here for the new search panel
const filterCategories = [
    { key: 'all', tag: null, icon: 'fa-utensils' },
    { key: 'starters', tag: 'starter', icon: 'fa-pepper-hot' },
    { key: 'meat', tag: ['beef', 'pork', 'chicken'], icon: 'fa-drumstick-bite' },
    { key: 'seafood', tag: 'seafood', icon: 'fa-fish' },
    { key: 'vegetarian', tag: 'vegetarian', icon: 'fa-leaf' },
    { key: 'drinks', tag: 'drink', icon: 'fa-cocktail' },
];

interface HeaderProps {
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onSelectedCategoryChange: (category: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, searchQuery, onSearchChange, selectedCategory, onSelectedCategoryChange }) => {
  const { cartCount } = useCart();
  const { language, setLanguage, t, languages } = useLanguage();
  const [isLangOpen, setLangOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (!isSearchOpen) return;
        // Check if the click was on the search icon itself to prevent immediate closing
        const searchIconButton = document.getElementById('search-icon-button');
        if (searchIconButton && searchIconButton.contains(event.target as Node)) return;
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);
  
  const handleCategoryClick = (categoryKey: string | null) => {
    onSelectedCategoryChange(categoryKey === 'all' ? null : categoryKey);
  }

  const HeaderButton: React.FC<{onClick?: () => void, href?: string, children: React.ReactNode, className?: string, id?: string}> = ({ onClick, href, children, className, id }) => {
    const commonProps = {
        id,
        className: `flex items-center justify-center p-2 transition-all duration-300 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg hover:bg-white/40 shadow-sm ${className}`,
        onClick: onClick
    }
    return href ? <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>{children}</a> : <button {...commonProps}>{children}</button>
  }

  const navLinks = (
    <>
      <a href="https://deliveroo.co.uk/menu/london/kennington-park/la-barra-walworth-road" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm md:text-base font-medium text-gray-700 hover:text-black transition-colors">{t('header.menu')}</a>
      <a href="#contact" className="px-3 py-2 text-sm md:text-base font-medium text-gray-700 hover:text-black transition-colors">{t('header.contact')}</a>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 md:p-4">
      <div className="container mx-auto flex items-center justify-between p-2 md:p-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg">
        <a href="#" className="flex-shrink-0">
          <img src="https://lh3.googleusercontent.com/pw/AP1GczNAo9UaVfrx17NH3XRuch8bUAfwtq6TjVDWQJsGcNlSlQbdRj5QqqhjOCUOBeCCThcSFyuHRmWgrvi3XEEkf3Yy1-5UnJAtxA4OZJREU00Pzq95BbV1f6IDl6fBEG-LiG80J-fTH35XM1d09zgFSJU=w559-h419-s-no-gm?authuser=0" alt="La Barra de Kate Logo" className="h-10 md:h-12" />
        </a>
        
        <nav className="hidden lg:flex items-center space-x-2">
          {navLinks}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative" ref={searchRef}>
            <HeaderButton id="search-icon-button" onClick={() => setSearchOpen(prev => !prev)} className="w-10 h-10 md:w-12 md:h-12">
              <i className="fas fa-search text-gray-700 text-lg"></i>
            </HeaderButton>
            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-full max-w-sm sm:w-96 p-4 bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg">
                <div className="relative mb-4">
                   <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={t('menu.search_placeholder')}
                    className="w-full py-2 pl-10 pr-10 bg-white/60 backdrop-blur-xl border border-white/30 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
                      <i className="fas fa-times-circle"></i>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {filterCategories.map(cat => (
                        <button
                            key={cat.key}
                            onClick={() => handleCategoryClick(cat.key)}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${(selectedCategory === cat.key || (cat.key === 'all' && !selectedCategory)) ? 'bg-white/50 text-blue-700 shadow-md' : 'bg-transparent text-gray-600 hover:bg-white/30'}`}
                        >
                            <i className={`fas ${cat.icon}`}></i>
                            <span>{t(`menu.filters.${cat.key}`)}</span>
                        </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={langRef}>
            <HeaderButton onClick={() => setLangOpen(!isLangOpen)} className="w-10 h-10 md:w-12 md:h-12">
              <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
            </HeaderButton>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/60 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg overflow-hidden">
                <ul>
                  {languages.map(lang => (
                    <li key={lang.code}>
                      <button
                        onClick={() => { setLanguage(lang.code as Language); setLangOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/50 flex items-center"
                      >
                        <span className="mr-3">{lang.flag}</span>
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <HeaderButton onClick={onCartClick} className="w-10 h-10 md:w-12 md:h-12">
              <i className="fas fa-shopping-cart text-gray-700 text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                  {cartCount}
                </span>
              )}
            </HeaderButton>
          </div>
          
          <div className="lg:hidden" ref={menuRef}>
            <HeaderButton onClick={() => setMenuOpen(!isMenuOpen)} className="w-10 h-10 md:w-12 md:h-12">
               <i className="fas fa-bars text-gray-700 text-lg"></i>
            </HeaderButton>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/60 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col p-2">
                        {navLinks}
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
