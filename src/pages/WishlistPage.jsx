import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach(item => {
      addToCart(item);
    });
    toast.success('All items added to your cart! 🛒', {
      style: { background: '#0b0b14', color: '#f3f4f6', border: '1px solid rgba(16,185,129,0.2)' }
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        {/* Backdrop aurora lights */}
        <div className="aurora-bg">
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md px-6 relative z-10"
        >
          <div className="text-7xl select-none animate-bounce duration-[3000ms]">💔</div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
              Wishlist is Empty
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Your collection is waiting to be filled. Save books that spark your curiosity and explore them later.
            </p>
          </div>
          
          <Link to="/products" className="inline-block pt-2">
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              className="btn-lux px-8 py-3.5 text-xs tracking-wider uppercase font-bold cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={15} />
                Discover Masterpieces
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Drifting auroras for premium depth */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      <div className="container-main max-w-[1400px] relative z-10">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-purple flex items-center gap-1">
                <Heart size={10} className="fill-current text-pink-500" /> Curated Shelf
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              My Wishlist
            </h1>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              You have <span className="font-extrabold text-[var(--accent-pink)]">{wishlistItems.length} publications</span> reserved
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddAllToCart}
            className="btn-lux flex items-center gap-2 text-xs tracking-wider uppercase font-bold py-3 px-6 cursor-pointer"
          >
            <ShoppingCart size={14} />
            Add All to Cart
          </motion.button>
        </div>

        {/* Saved Books Grid Shelf */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlistItems.map((book, i) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-card overflow-hidden group flex flex-col justify-between"
              >
                {/* Book Card Core Body */}
                <div className="p-4 space-y-4">
                  {/* Aspect Lock Cover image grid */}
                  <Link to={`/product/${book.id}`} className="block relative overflow-hidden rounded-2xl aspect-[3/4] border" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-[var(--accent-indigo)] px-2.5 py-1 rounded-full shadow-lg">
                        Quick Details
                      </span>
                    </div>
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop'; }} 
                    />
                  </Link>

                  {/* Metadata and Rating */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[var(--accent-purple)] bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.15)] px-2 py-0.5 rounded-md">
                        {book.genre}
                      </span>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Star size={10} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                        <span className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>{book.rating}</span>
                      </div>
                    </div>

                    <Link to={`/product/${book.id}`}>
                      <h3 className="font-extrabold text-sm leading-snug hover:text-[var(--accent-indigo)] transition-colors line-clamp-2"
                        style={{ color: 'var(--text-primary)' }}>
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>by {book.author}</p>
                  </div>
                </div>

                {/* Price tag & Interactive buying button shelf */}
                <div className="px-4 pb-4 space-y-3">
                  <div className="flex items-baseline gap-2 border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="font-black text-base" style={{ color: 'var(--text-primary)' }}>₹{book.price}</span>
                    <span className="text-[10px] line-through font-semibold" style={{ color: 'var(--text-secondary)' }}>₹{book.mrp}</span>
                    <span className="text-[9px] font-extrabold text-[var(--accent-gold)] bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] px-1.5 py-0.5 rounded">
                      {book.discount}% OFF
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(book)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer"
                      style={{
                        background: isInCart(book.id) ? 'rgba(99,102,241,0.06)' : 'linear-gradient(135deg, var(--accent-indigo), var(--accent-purple))',
                        color: isInCart(book.id) ? 'var(--accent-indigo)' : 'white',
                        borderColor: isInCart(book.id) ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      <ShoppingCart size={13} />
                      {isInCart(book.id) ? 'In Basket' : 'Add to Cart'}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        removeFromWishlist(book.id);
                        toast.success('Removed from wishlist.', {
                          style: { background: '#0b0b14', color: '#f3f4f6', border: '1px solid rgba(239,68,68,0.15)' }
                        });
                      }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all cursor-pointer bg-[rgba(239,68,68,0.05)] border-[rgba(239,68,68,0.15)] hover:bg-[rgba(239,68,68,0.12)] hover:border-[rgba(239,68,68,0.25)] text-red-400"
                    >
                      <Trash2 size={13} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
