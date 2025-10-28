

import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const placeholderImage = 'https://via.placeholder.com/150';

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, orderType, setOrderType, tableNumber, setTableNumber } = useCart();
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    const itemsMessage = cartItems.map(item => `${item.quantity}x ${item.name[language] || item.name['en']}`).join(', ');
    
    let orderDetails = '';
    if (orderType === 'dine-in') {
      orderDetails = `Pedido para Comer Aquí (Mesa: ${tableNumber || 'N/A'})`;
    } else if (orderType === 'takeaway') {
      orderDetails = `Pedido para Llevar`;
    }

    const fullMessage = `Hola, me gustaría pedir lo siguiente:\n\n*${orderDetails}*\n\n${itemsMessage}\n\n*Total: £${totalPrice.toFixed(2)}*`;
    const whatsappUrl = `https://wa.me/447424580569?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isCheckoutDisabled = cartItems.length === 0 || !orderType || (orderType === 'dine-in' && !tableNumber);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-md max-h-[90vh] bg-white/20 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">{t('cart.title')}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-white/30 backdrop-blur-sm border border-white/50 rounded-full shadow-md text-gray-600 hover:bg-white/40 transition">
            &times;
          </button>
        </div>
        
        <div className="p-4 space-y-4 border-b border-white/20 flex-shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setOrderType('dine-in')}
              className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 border ${orderType === 'dine-in' ? 'bg-white/50 border-white/60 text-blue-700 shadow-md' : 'bg-white/20 border-white/30 text-gray-600'}`}
            >
              <i className="fas fa-utensils mr-2"></i>{t('cart.dine_in')}
            </button>
             <button 
              onClick={() => setOrderType('takeaway')}
              className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 border ${orderType === 'takeaway' ? 'bg-white/50 border-white/60 text-blue-700 shadow-md' : 'bg-white/20 border-white/30 text-gray-600'}`}
            >
              <i className="fas fa-shopping-bag mr-2"></i>{t('cart.takeaway')}
            </button>
          </div>
          {orderType === 'dine-in' && (
             <div className="mt-2">
                <p className="text-center text-sm text-gray-700 mb-2">{t('cart.table_number_prompt')}</p>
                <div className="grid grid-cols-6 gap-2 px-2">
                    {Array.from({ length: 17 }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => setTableNumber(num.toString())}
                        className={`py-2 rounded-lg text-sm font-semibold transition-all duration-200 border text-center ${
                        tableNumber === num.toString()
                            ? 'bg-white/60 border-white/70 text-blue-700 shadow-md scale-105'
                            : 'bg-white/20 border-white/30 text-gray-600 hover:bg-white/40'
                        }`}
                    >
                        {num}
                    </button>
                    ))}
                </div>
            </div>
          )}
          {orderType === 'takeaway' && (
             <div className="p-2 bg-yellow-400/20 border border-yellow-400/30 rounded-lg text-center">
                <p className="text-xs text-yellow-800">{t('cart.takeaway_notice')}</p>
             </div>
          )}
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-700 mt-8">{t('cart.empty')}</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => {
                const imageUrl = item.images && item.images.length > 0 ? item.images[0] : placeholderImage;
                return (
                <li key={item.id} className="flex items-center space-x-3 p-2 bg-white/20 border border-white/30 rounded-xl shadow-sm">
                  <img src={imageUrl} alt={item.name[language]} className="w-16 h-16 object-cover rounded-lg shadow-md flex-shrink-0" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm text-gray-800">{item.name[language] || item.name['en']}</h3>
                    <p className="text-xs text-gray-600">£{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-1.5">
                     <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-sm bg-white/40 rounded-md shadow-sm active:bg-white/30">-</button>
                     <span className="w-8 text-center text-sm font-medium bg-white/20 rounded-md px-1">{item.quantity}</span>
                     <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-sm bg-white/40 rounded-md shadow-sm active:bg-white/30">+</button>
                  </div>
                   <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex-shrink-0 items-center justify-center bg-white/30 rounded-full shadow-sm text-red-500 text-xs flex">&times;</button>
                </li>
              )})}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-white/20 flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700">{t('cart.total')}:</span>
              <span className="text-xl font-bold text-green-700">£{totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              disabled={isCheckoutDisabled}
              className="w-full py-3 text-md font-semibold text-white bg-red-500 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-100 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isCheckoutDisabled ? t('cart.complete_order_prompt') : t('cart.checkout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;