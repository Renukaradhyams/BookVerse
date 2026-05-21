import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Star } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">💔</div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
            Your Wishlist is Empty
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
            Save your favourite books to come back to them later!
          </p>
          <Link to="/products">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-primary text-base px-10 py-4">
              <span className="flex items-center gap-2">
                <ShoppingBag size={18} />
                Find Books to Save
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-main">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="section-title text-3xl" style={{ color: 'var(--text-primary)' }}>
              My Wishlist
            </h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: '#ec4899' }}>{wishlistItems.length} books</span> saved
            </p>
          </div>
          <button
            onClick={() => wishlistItems.forEach(item => { addToCart(item); })}
            className="btn-primary"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={16} />
              Add All to Cart
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {wishlistItems.map((book, i) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-card overflow-hidden group"
              >
                <div className="flex gap-4 p-4">
                  {/* Cover */}
                  <Link to={`/product/${book.id}`} className="shrink-0">
                    <div className="w-20 h-28 rounded-xl overflow-hidden">
                      <img src={book.cover} alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }} />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <span className="badge badge-purple mb-2 inline-block" style={{ fontSize: '0.65rem' }}>{book.genre}</span>
                    <Link to={`/product/${book.id}`}>
                      <h3 className="font-semibold text-sm leading-tight hover:text-purple-400 transition-colors line-clamp-2"
                        style={{ color: 'var(--text-primary)' }}>
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>by {book.author}</p>

                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={10} fill={s <= Math.floor(book.rating) ? '#f59e0b' : 'none'}
                          style={{ color: '#f59e0b' }} />
                      ))}
                      <span className="text-xs ml-1" style={{ color: 'var(--text-secondary)' }}>{book.rating}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold" style={{ color: 'var(--text-primary)' }}>₹{book.price}</span>
                      <span className="text-xs line-through" style={{ color: 'var(--text-secondary)' }}>₹{book.mrp}</span>
                      <span className="discount-badge">{book.discount}%</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 px-4 pb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addToCart(book)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold"
                    style={{
                      background: isInCart(book.id) ? 'rgba(108,59,213,0.3)' : 'linear-gradient(135deg, #6c3bd5, #8b5cf6)',
                      color: 'white',
                    }}
                  >
                    <ShoppingCart size={14} />
                    {isInCart(book.id) ? 'In Cart' : 'Add to Cart'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFromWishlist(book.id)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
