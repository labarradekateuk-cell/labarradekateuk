import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
    const { t } = useLanguage();
  return (
    <section id="about" className="py-16">
      <div className="neumorphic-card max-w-4xl mx-auto rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative flex-shrink-0">
            <div className="neumorphic-inset w-40 h-40 md:w-48 md:h-48 p-2 rounded-full">
                <img
                    src="https://images.pexels.com/photos/8578553/pexels-photo-8578553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt={t('about.name')}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 font-cursive">{t('about.title')}</h2>
            <h3 className="text-xl font-semibold text-gray-700">{t('about.name')}</h3>
            <p className="text-md text-gray-500 mb-4">{t('about.role')} &bull; {t('about.since')}</p>
            <p className="text-gray-600 leading-relaxed">
              {t('about.story')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;