import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
    const { t } = useLanguage();
    
    const banners = [
      'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % banners.length;
            setCurrentIndex(nextIndex);
        }, 5000); // Change slide every 5 seconds

        return () => clearTimeout(timer);
    }, [currentIndex, banners.length]);
    
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    }

    return (
        <section className="py-16 md:py-24 flex flex-col items-center text-center">
            <div className="w-full max-w-5xl mx-auto p-2 md:p-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl mb-8">
                <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                    {banners.map((url, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                            style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            aria-hidden={index !== currentIndex}
                        />
                    ))}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-110' : 'bg-white/50'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md mb-8">
                {t('hero.subtitle')}
            </p>
            <a
                href="https://deliveroo.co.uk/menu/london/kennington-park/la-barra-walworth-road"
                target="_blank"
                rel="noopener noreferrer"
                className="neumorphic-button px-8 py-4 text-lg font-bold text-red-600 rounded-xl"
            >
                {t('hero.menu_button')}
            </a>
        </section>
    );
};

export default Hero;
