import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bookverse_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('bookverse_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (book) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === book.id)) {
        return prev;
      }
      toast.success(`"${book.title}" added to wishlist!`, {
        icon: '❤️',
        style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(236,72,153,0.3)' }
      });
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== bookId));
    toast.success('Removed from wishlist', {
      icon: '💔',
      style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
    });
  };

  const isInWishlist = (bookId) => wishlistItems.some(item => item.id === bookId);

  const toggleWishlist = (book) => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      wishlistCount,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
