

import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';
import ProductDetailModal from './ProductDetailModal';

type LayoutView = 'grid-1' | 'grid-2' | 'grid-4' | 'list';

const tagIcons: { [key: string]: string } = {
  beef: '🥩',
  pork: '🐖',
  chicken: '🍗',
  seafood: '🦐',
  fish: '🐟',
  vegetarian: '🥬',
  egg: '🥚',
  cheese: '🧀',
  alcoholic: '🍹',
  'hot-drink': '☕',
  shrimp: '🦐',
};

const placeholderImage = 'https://via.placeholder.com/400x300.png?text=No+Image';

const filterCategories = [
    { key: 'starters', tag: 'starter' },
    { key: 'meat', tag: ['beef', 'pork', 'chicken'] },
    { key: 'seafood', tag: 'seafood' },
    { key: 'vegetarian', tag: 'vegetarian' },
    { key: 'drinks', tag: 'drink' },
];

interface MenuProps {
  searchQuery: string;
  selectedCategory: string | null;
}

const Menu: React.FC<MenuProps> = ({ searchQuery, selectedCategory }) => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [layout, setLayout] = useState<LayoutView>('grid-4');
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setTagFilter(current => (current === tag ? null : tag));
  };
  
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.isVisible);

    if (selectedCategory) {
        const categoryDef = filterCategories.find(c => c.key === selectedCategory);
        if (categoryDef && categoryDef.tag) {
            const tagsToFilter = categoryDef.tag;
            if (Array.isArray(tagsToFilter)) {
                result = result.filter(p => p.tags && tagsToFilter.some(t => p.tags!.includes(t)));
            } else {
                result = result.filter(p => p.tags?.includes(tagsToFilter));
            }
        }
    }

    if (tagFilter) {
        result = result.filter(p => p.tags?.includes(tagFilter));
    }

    if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        result = result.filter(p =>
            (p.name[language] || p.name['en'])?.toLowerCase().includes(lowerCaseQuery) ||
            (p.description[language] || p.description['en'])?.toLowerCase().includes(lowerCaseQuery)
        );
    }
    return result;
  }, [products, selectedCategory, tagFilter, searchQuery, language]);


  const handleViewDetails = (product: Product) => {
    setDetailProduct(product);
  };

  const handleCloseDetails = () => {
    setDetailProduct(null);
  };

  const LayoutButton: React.FC<{view: LayoutView, icon: string}> = ({ view, icon }) => (
     <button 
        onClick={() => setLayout(view)} 
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${layout === view ? 'bg-white/50 text-blue-600 shadow-md' : 'bg-white/20 text-gray-600 hover:bg-white/40'}`}
        aria-label={`Switch to ${view} view`}
    >
        <i className={`fas ${icon}`}></i>
     </button>
  );
  
  const layoutClasses = {
      'grid-4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8',
      'grid-2': 'grid grid-cols-1 md:grid-cols-2 gap-8',
      'grid-1': 'grid grid-cols-1 gap-8 max-w-3xl mx-auto',
      'list': 'flex flex-col gap-4 max-w-4xl mx-auto'
  };
  
  const ProductCard: React.FC<{product: Product}> = ({ product }) => {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
    };
    
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : placeholderImage;

    const renderTags = () => (
      product.tags && (
        <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
            {product.tags.filter(tag => tagIcons[tag]).map(tag => (
                <span key={tag} onClick={(e) => handleTagClick(e, tag)} className="text-lg filter grayscale transition-all duration-300 hover:grayscale-0 cursor-pointer" title={tag.charAt(0).toUpperCase() + tag.slice(1)}>
                    {tagIcons[tag]}
                </span>
            ))}
        </div>
      )
    );

    if (layout === 'list') {
      return (
         <div 
            className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 hover:shadow-2xl hover:border-white/50 cursor-pointer"
            onClick={() => handleViewDetails(product)}
          >
            <img src={imageUrl} alt={product.name[language]} className="w-full sm:w-28 sm:h-28 object-cover rounded-xl flex-shrink-0" />
            <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800">{product.name[language] || product.name['en']}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description[language] || product.description['en']}</p>
                {renderTags()}
            </div>
            <div className="flex-shrink-0 flex sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4">
                 <p className="text-lg font-bold text-green-600 mb-2">£{product.price.toFixed(2)}</p>
                 <button
                    onClick={handleAddToCart}
                    className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
                >
                    {t('menu.add_to_cart')}
                </button>
            </div>
         </div>
      );
    }

    return (
       <div 
        className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/50 cursor-pointer"
        onClick={() => handleViewDetails(product)}
       >
          <img src={imageUrl} alt={product.name[language]} className="w-full h-44 sm:h-48 object-cover rounded-xl mb-4" />
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name[language] || product.name['en']}</h3>
            <p className="text-sm text-gray-600 mb-4">{product.description[language] || product.description['en']}</p>
          </div>
          <div className="mt-auto">
            <div className="flex flex-wrap items-center gap-2 mb-2">
                {product.tags?.filter(tag => tagIcons[tag]).map(tag => (
                    <span key={tag} onClick={(e) => handleTagClick(e, tag)} className="text-xl filter grayscale transition-all duration-300 hover:grayscale-0 cursor-pointer" title={tag.charAt(0).toUpperCase() + tag.slice(1)}>
                        {tagIcons[tag]}
                    </span>
                ))}
            </div>
            <p className="text-xl font-bold text-green-600 mb-4">£{product.price.toFixed(2)}</p>
            <button
                onClick={handleAddToCart}
                className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
            >
                {t('menu.add_to_cart')}
            </button>
          </div>
        </div>
    );
  }

  return (
    <>
      <section id="menu" className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 font-cursive">{t('menu.title')}</h2>
        
        {/* Category filters removed from here */}

        {tagFilter && (
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                    {t('menu.filtering_by')}: <span className="text-xl">{tagIcons[tagFilter]}</span> {tagFilter}
                    <button onClick={() => setTagFilter(null)} className="ml-1 text-blue-600 hover:text-blue-800 font-bold">&times;</button>
                </span>
            </div>
        )}

        <div className="flex justify-center items-center gap-2 mb-10 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl max-w-xs mx-auto shadow-md">
            <LayoutButton view="grid-1" icon="fa-square" />
            <LayoutButton view="grid-2" icon="fa-grip" />
            <LayoutButton view="grid-4" icon="fa-grip-vertical" />
            <LayoutButton view="list" icon="fa-list" />
        </div>

        {filteredProducts.length > 0 ? (
            <div className={layoutClasses[layout]}>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16 px-4">
                <p className="text-gray-600 text-lg bg-white/20 backdrop-blur-sm p-6 rounded-xl shadow-md inline-block">{t('menu.no_results')}</p>
            </div>
        )}

      </section>
      {detailProduct && (
        <ProductDetailModal product={detailProduct} onClose={handleCloseDetails} />
      )}
    </>
  );
};

export default Menu;
