import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye, Sparkles, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function BookCard({ book, index = 0 }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inCart = isInCart(book.id);
  const inWishlist = isInWishlist(book.id);

  const fallbackImage = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.35), ease: [0.16, 1, 0.3, 1] }}
      className="h-full flex"
    >
      <div
        className="group relative glass-card p-3 flex flex-col justify-between flex-1 rounded-[24px] w-full transition-all duration-500 overflow-hidden border border-white/5 hover:border-indigo-500/25"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: 'var(--shadow-lux)'
        }}
      >
        
        {/* Upper Visual Bay */}
        <div className="relative rounded-[18px] overflow-hidden aspect-[3/4] bg-slate-950 shrink-0">
          
          {/* Discount Ribbon */}
          {book.discount > 0 && (
            <div className="absolute top-2 left-2 z-20">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[9px] font-black tracking-wider uppercase text-pink-400 bg-pink-500/15 border border-pink-500/20 shadow-lg">
                <Flame size={9} className="animate-bounce" />
                {book.discount}% OFF
              </span>
            </div>
          )}

          {/* Premium tag or bestseller indicators */}
          {book.badge && (
            <div className="absolute top-2 right-2 z-20">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[8px] font-black tracking-widest uppercase text-amber-400 bg-amber-500/15 border border-amber-500/20 shadow-lg">
                <Sparkles size={8} className="animate-pulse" />
                {book.badge}
              </span>
            </div>
          )}

          {/* Book Image Cover */}
          <img
            src={imageError ? fallbackImage : book.cover}
            alt={book.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Frosted Action Overlay (Framer Motion spring) */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Link to={`/product/${book.id}`}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-colors shadow-lg"
                title="Explore Details"
              >
                <Eye size={18} className="text-white" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => toggleWishlist(book)}
              className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border shadow-lg transition-colors"
              style={{
                background: inWishlist ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.1)',
                borderColor: inWishlist ? 'rgba(236,72,153,0.4)' : 'rgba(255,255,255,0.15)',
              }}
              title="Add to Wishlist"
            >
              <Heart size={18} fill={inWishlist ? '#ec4899' : 'none'} className={inWishlist ? 'text-pink-400' : 'text-white'} />
            </motion.button>
          </div>
        </div>

        {/* Lower Info Compartment */}
        <div className="pt-4 px-2 flex flex-col justify-between flex-grow gap-3">
          
          <div className="flex flex-col gap-1.5 text-left">
            {/* Genre indicator */}
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-indigo-400">
              {book.genre}
            </span>

            {/* Locked Heights titles to prevent shifting layouts */}
            <Link to={`/product/${book.id}`} className="block">
              <h3
                className="font-extrabold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors duration-200 line-clamp-1 leading-snug"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {book.title}
              </h3>
            </Link>

            <p className="text-[10px] font-semibold text-slate-400" style={{ color: 'var(--text-secondary)' }}>
              by {book.author}
            </p>

            {/* Ratings & reviews row */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={9}
                    fill={star <= Math.floor(book.rating) ? '#f59e0b' : 'none'}
                    className={star <= Math.floor(book.rating) ? 'text-amber-500' : 'text-slate-600'}
                  />
                ))}
              </div>
              <span className="text-[10px] font-black text-amber-500">{book.rating}</span>
              <span className="text-[9px] text-slate-500">({book.reviews >= 1000 ? `${(book.reviews / 1000).toFixed(1)}k` : book.reviews})</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Price section with MRPS */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-slate-100" style={{ color: 'var(--text-primary)' }}>₹{book.price}</span>
                {book.mrp > book.price && (
                  <span className="text-[11px] line-through text-slate-500 font-semibold">₹{book.mrp}</span>
                )}
              </div>
              
              {/* Delivery Tag or low stock warnings */}
              {book.stockCount <= 50 ? (
                <span className="text-[9px] font-black text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded-md uppercase">Only {book.stockCount} left</span>
              ) : book.price >= 499 ? (
                <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md uppercase">Free Ship</span>
              ) : (
                <span className="text-[9px] font-bold text-slate-400 bg-white/5 px-1.5 py-0.5 rounded-md">+₹49 Del.</span>
              )}
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(book)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 shadow-lg cursor-pointer"
                style={{
                  background: inCart 
                    ? 'rgba(99, 102, 241, 0.08)' 
                    : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: inCart ? '#a78bfa' : 'white',
                  border: inCart ? '1.5px solid rgba(99, 102, 241, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <ShoppingCart size={13} className={inCart ? 'text-indigo-400' : 'text-white'} />
                <span>{inCart ? 'In Basket' : 'Add to Cart'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWishlist(book)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 cursor-pointer"
                style={{
                  background: inWishlist ? 'rgba(236,72,153,0.1)' : 'rgba(255, 255, 255, 0.03)',
                  borderColor: inWishlist ? 'rgba(236,72,153,0.3)' : 'var(--border-color)',
                }}
              >
                <Heart size={14} fill={inWishlist ? '#ec4899' : 'none'}
                  style={{ color: inWishlist ? '#ec4899' : 'var(--text-secondary)' }} />
              </motion.button>
            </div>
          </div>

        </div>

        {/* Dynamic aurora glow lines at the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #ec4899, transparent)' }} />
      </div>
    </motion.div>
  );
}
