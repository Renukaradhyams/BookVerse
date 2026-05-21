import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function StarRating({ rating, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          fill={star <= Math.floor(rating) ? '#f59e0b' : star - 0.5 <= rating ? '#f59e0b' : 'none'}
          style={{ color: '#f59e0b', opacity: star <= Math.floor(rating) ? 1 : star - 0.5 <= rating ? 0.7 : 0.3 }}
        />
      ))}
    </div>
  );
}

export default function BookCard({ book, index = 0 }) {
  const [imageError, setImageError] = useState(false);
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
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div
        className="group relative glass-card shimmer-card overflow-hidden"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Discount Badge */}
        {book.discount > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="discount-badge">-{book.discount}%</span>
          </div>
        )}

        {/* Book Badge */}
        {book.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
              {book.badge}
            </span>
          </div>
        )}

        {/* New Badge */}
        {book.isNew && (
          <div className="absolute top-10 left-3 z-10">
            <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
              New
            </span>
          </div>
        )}

        {/* Book Cover */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '2/3', background: 'rgba(0,0,0,0.2)' }}>
          <img
            src={imageError ? fallbackImage : book.cover}
            alt={book.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: 'rgba(0,0,0,0.7)' }}>
            <Link to={`/product/${book.id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 transition-colors hover:bg-white/20"
                title="Quick View"
              >
                <Eye size={18} className="text-white" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleWishlist(book)}
              className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 transition-colors"
              style={{
                background: inWishlist ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.1)',
                title: "Wishlist"
              }}
            >
              <Heart size={18} fill={inWishlist ? '#ec4899' : 'none'} className={inWishlist ? 'text-pink-400' : 'text-white'} />
            </motion.button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          {/* Genre */}
          <span className="text-xs font-medium" style={{ color: '#a78bfa' }}>{book.genre}</span>

          {/* Title & Author */}
          <Link to={`/product/${book.id}`}>
            <h3
              className="font-semibold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-purple-400"
              style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}
            >
              {book.title}
            </h3>
          </Link>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>by {book.author}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={book.rating} />
            <span className="text-xs font-semibold" style={{ color: '#f59e0b' }}>{book.rating}</span>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>({book.reviews.toLocaleString()})</span>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>₹{book.price}</span>
            <span className="text-sm line-through" style={{ color: 'var(--text-secondary)' }}>₹{book.mrp}</span>
            <span className="text-xs font-semibold" style={{ color: '#4ade80' }}>
              Save ₹{book.mrp - book.price}
            </span>
          </div>

          {/* Free delivery tag */}
          {book.price >= 499 && (
            <p className="text-xs font-medium" style={{ color: '#4ade80' }}>✓ Free Delivery</p>
          )}

          {/* Buttons */}
          <div className="flex gap-2 mt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => addToCart(book)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                background: inCart ? 'rgba(108,59,213,0.3)' : 'linear-gradient(135deg, #6c3bd5, #8b5cf6)',
                color: 'white',
                border: inCart ? '1px solid rgba(108,59,213,0.5)' : 'none',
              }}
            >
              <ShoppingCart size={14} />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleWishlist(book)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0"
              style={{
                background: inWishlist ? 'rgba(236,72,153,0.2)' : 'var(--glass-bg)',
                border: `1px solid ${inWishlist ? 'rgba(236,72,153,0.4)' : 'var(--glass-border)'}`,
              }}
            >
              <Heart size={16} fill={inWishlist ? '#ec4899' : 'none'}
                style={{ color: inWishlist ? '#ec4899' : 'var(--text-secondary)' }} />
            </motion.button>
          </div>
        </div>

        {/* Bottom glow on hover */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, transparent, #6c3bd5, #f59e0b, transparent)' }} />
      </div>
    </motion.div>
  );
}
