



import React, { useState } from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const placeholderImage = 'https://via.placeholder.com/800x600.png?text=No+Image';

const formatCurrency = (price: number, currencyCode: string = 'GBP') => {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  } catch (error) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price);
  }
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const hasImages = product.images && product.images.length > 0;
  const currentImage = hasImages ? product.images[currentIndex] : placeholderImage;

  const goToPrevious = () => {
    if (!hasImages) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? product.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (!hasImages) return;
    const isLastSlide = currentIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
        setAdded(false);
    }, 2000);
  };
  
  const handleQuantityChange = (amount: number) => {
      setQuantity(prev => Math.max(1, prev + amount));
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-700 hover:text-black text-3xl z-20 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
            &times;
        </button>
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative flex-shrink-0 bg-black/10">
          <img src={currentImage} alt={`${product.name[language] || product.name['en']} ${currentIndex + 1}`} className="w-full h-full object-contain"/>
          {hasImages && product.images.length > 1 && (
            <>
              <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/40 text-gray-800 text-2xl"><i className="fas fa-chevron-left"></i></button>
              <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/40 text-gray-800 text-2xl"><i className="fas fa-chevron-right"></i></button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-110' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{product.name[language] || product.name['en']}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{product.description[language] || product.description['en']}</p>
            </div>
            <div className="mt-auto">
                <p className="text-3xl font-bold text-green-600 mb-4">{formatCurrency(product.price * quantity, product.currency)}</p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 p-1 bg-white/30 border border-white/40 rounded-xl shadow-sm">
                        <button onClick={() => handleQuantityChange(-1)} className="w-10 h-10 flex items-center justify-center font-semibold text-lg text-gray-700 rounded-lg transition-all duration-200 hover:bg-white/40 active:bg-white/20">-</button>
                        <span className="w-12 text-center text-lg font-bold text-gray-800">{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)} className="w-10 h-10 flex items-center justify-center font-semibold text-lg text-gray-700 rounded-lg transition-all duration-200 hover:bg-white/40 active:bg-white/20">+</button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className={`flex-grow w-full py-3 text-md font-semibold text-white rounded-xl shadow-lg transition-all duration-300 ${added ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {added ? (
                            <>
                                <i className="fas fa-check mr-2"></i> Added!
                            </>
                        ) : (
                            <>
                                <i className="fas fa-cart-plus mr-2"></i> {t('menu.add_to_cart')}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
