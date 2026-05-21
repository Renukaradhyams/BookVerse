import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bookverse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('bookverse_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        toast.success(`Updated quantity for "${book.title}"`, {
          icon: '🛒',
          style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
        });
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
            : item
        );
      }
      toast.success(`"${book.title}" added to cart!`, {
        icon: '🛒',
        style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
      });
      return [...prev, { ...book, quantity }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item.id !== bookId));
    toast.success('Removed from cart', {
      icon: '🗑️',
      style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
    });
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity < 1) { removeFromCart(bookId); return; }
    setCartItems(prev =>
      prev.map(item => item.id === bookId ? { ...item, quantity: Math.min(quantity, 10) } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code, coupons) => {
    const couponData = coupons[code.toUpperCase()];
    if (couponData) {
      setCoupon({ code: code.toUpperCase(), ...couponData });
      toast.success(`Coupon "${code.toUpperCase()}" applied! ${couponData.description}`, {
        icon: '🎉',
        style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
      });
      return true;
    } else {
      toast.error('Invalid coupon code', {
        style: { background: '#1a1a2e', color: '#e2e8f0' }
      });
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    toast.success('Coupon removed');
  };

  const isInCart = (bookId) => cartItems.some(item => item.id === bookId);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const gst = Math.round(subtotal * 0.18);

  const shipping = subtotal >= 499 ? 0 : 49;

  const couponDiscount = coupon
    ? coupon.type === 'percent'
      ? Math.round((subtotal * coupon.discount) / 100)
      : Math.min(coupon.discount, subtotal)
    : 0;

  const total = subtotal + gst + shipping - couponDiscount;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      cartCount,
      subtotal,
      gst,
      shipping,
      coupon,
      couponDiscount,
      total,
      applyCoupon,
      removeCoupon,
    }}>
      {children}
    </CartContext.Provider>
  );
};
