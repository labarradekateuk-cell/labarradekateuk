
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const mapUrl = "https://share.google/XPxsmH6Ir54e139F4";
  const [adminClickCount, setAdminClickCount] = useState(0);
  const clickTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleAdminAccessClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    const newClickCount = adminClickCount + 1;
    setAdminClickCount(newClickCount);
    if (newClickCount >= 5) {
      window.location.hash = '#/admin';
      setAdminClickCount(0);
    } else {
      clickTimeoutRef.current = window.setTimeout(() => {
        setAdminClickCount(0);
      }, 2000);
    }
  };

  const ContactItem: React.FC<{icon: string, title: string, children: React.ReactNode}> = ({icon, title, children}) => (
    <div className="flex items-start space-x-4">
      <div className="bg-white/30 backdrop-blur-sm border border-white/40 shadow-md rounded-full flex-shrink-0 w-12 h-12 flex items-center justify-center text-blue-600 transition-all duration-300">
        <i className={`${icon} text-xl`}></i>
      </div>
      <div>
        <h4 className="font-semibold text-gray-700">{title}</h4>
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );

  return (
    <footer id="contact" className="pb-8 px-4">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl max-w-5xl mx-auto rounded-3xl p-6 md:p-8 text-gray-700">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 font-cursive">{t('contact.title')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <div className="space-y-6 flex flex-col justify-center">
            <ContactItem icon="fas fa-map-marker-alt" title={t('contact.address')}>
              147 Walworth Road, London SE17 1RW<br/>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('contact.map_link')}</a>
            </ContactItem>
            <ContactItem icon="fas fa-phone" title={t('contact.phone')}>
              <a href="tel:+442077012188" className="hover:underline">+44 20 7701 2188</a>
            </ContactItem>
             <ContactItem icon="fab fa-whatsapp" title={t('contact.whatsapp')}>
              <a href="https://wa.me/447424580569" target="_blank" rel="noopener noreferrer" className="hover:underline">+44 7424 580569</a>
            </ContactItem>
             <ContactItem icon="fas fa-utensils" title={t('contact.deliveroo')}>
              <a href="https://deliveroo.co.uk/menu/london/kennington-park/la-barra-walworth-road" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Order for Delivery
              </a>
            </ContactItem>
          </div>
          
          <div className="relative w-full min-h-[300px] lg:min-h-full rounded-2xl overflow-hidden bg-white/20 border border-white/30 p-1 shadow-inner">
            <iframe
                className="w-full h-full rounded-xl pointer-events-none"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.225902099308!2d-0.0991900842306918!3d51.48425907963124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760477a3155555%3A0xe2c67f5c91187c34!2sLa%20Barra%20De%20Kate!5e0!3m2!1sen!2suk!4v1684344555021!5m2!1sen!2suk"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Barra De Kate Location"
            ></iframe>
             <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0" aria-label={t('contact.map_link')}></a>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactItem icon="fas fa-share-alt" title={t('contact.social')}>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/labarradekateuk/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 text-2xl"><i className="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/labarradekateuk/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 text-2xl"><i className="fab fa-facebook"></i></a>
              </div>
            </ContactItem>
             <ContactItem icon="fas fa-shield-alt" title="Food Hygiene">
               {t('contact.fsa_rating')}
            </ContactItem>
            <ContactItem icon="fas fa-exclamation-triangle" title={t('contact.allergens_title')}>
              {t('contact.allergens_text')}
            </ContactItem>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p onClick={handleAdminAccessClick} className="cursor-pointer select-none">
            &copy; {new Date().getFullYear()} La Barra de Kate. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
