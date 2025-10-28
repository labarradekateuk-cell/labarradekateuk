import React, { useState } from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ImageCarouselProps {
  product: Product;
  onClose: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ product, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useLanguage();

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? product.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full max-w-3xl h-full max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-full w-full bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-4">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-700 hover:text-black text-3xl z-20 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                &times;
            </button>
            <h3 className="absolute top-4 left-4 text-gray-800 text-xl font-semibold drop-shadow-lg">{product.name[language] || product.name['en']}</h3>
            
            <div className="relative w-full h-3/4 flex items-center justify-center">
                {product.images.length > 1 && (
                    <>
                        <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/40 text-gray-800 text-2xl"><i className="fas fa-chevron-left"></i></button>
                        <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/40 text-gray-800 text-2xl"><i className="fas fa-chevron-right"></i></button>
                    </>
                )}
                <img src={product.images[currentIndex]} alt={`${product.name[language]} ${currentIndex + 1}`} className="max-w-full max-h-full object-contain rounded-xl"/>
                 <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-sm rounded-md">
                    {currentIndex + 1} / {product.images.length}
                </div>
            </div>

            {product.images.length > 1 && (
                <div className="w-full h-1/4 mt-4 flex justify-center items-center gap-2 overflow-x-auto p-2">
                    {product.images.map((image, index) => (
                        <img 
                            key={index} 
                            src={image} 
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => goToSlide(index)}
                            className={`h-16 md:h-20 w-auto object-cover rounded-lg cursor-pointer border-2 transition-all ${currentIndex === index ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        />
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;