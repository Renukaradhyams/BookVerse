import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Heart, Star, BookOpen, ArrowLeft,
  Package, Truck, Shield, Tag, Share2, Award, Clock
} from 'lucide-react';
import { books } from '../data/books';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import BookCard from '../components/BookCard';

function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} size={size}
          fill={star <= Math.floor(rating) ? '#f59e0b' : 'none'}
          style={{ color: '#f59e0b', opacity: star <= Math.floor(rating) ? 1 : 0.3 }}
        />
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find(b => b.id === parseInt(id));
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [imageError, setImageError] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Book Not Found</h2>
          <Link to="/products">
            <button className="btn-primary mt-4"><span>Browse Books</span></button>
          </Link>
        </div>
      </div>
    );
  }

  const related = books.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);
  const images = [book.cover, book.cover, book.cover];
  const inCart = isInCart(book.id);
  const inWishlist = isInWishlist(book.id);

  const sampleReviews = [
    { name: 'Priya S.', avatar: 'https://i.pravatar.cc/40?img=47', rating: 5, date: '2 weeks ago', text: 'Absolutely loved this book! Changed my perspective completely. Must read for everyone.', verified: true },
    { name: 'Rahul M.', avatar: 'https://i.pravatar.cc/40?img=12', rating: 5, date: '1 month ago', text: 'One of the best books I\'ve read this year. The concepts are clear and actionable.', verified: true },
    { name: 'Ananya K.', avatar: 'https://i.pravatar.cc/40?img=45', rating: 4, date: '3 months ago', text: 'Great read! Highly informative with practical examples. Would definitely recommend.', verified: false },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-purple-400 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <span>/</span>
          <Link to="/products" className="hover:text-purple-400 transition-colors">Books</Link>
          <span>/</span>
          <span className="truncate max-w-48" style={{ color: 'var(--text-primary)' }}>{book.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] glass-card"
            >
              <img
                src={imageError ? 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=800&fit=crop' : images[selectedImage]}
                alt={book.title}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
              {book.discount > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="discount-badge text-sm px-3 py-1">-{book.discount}% OFF</span>
                </div>
              )}
              {book.badge && (
                <div className="absolute top-4 right-4">
                  <span className="badge badge-purple">{book.badge}</span>
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className="w-20 h-28 rounded-xl overflow-hidden border-2 transition-all"
                  style={{ borderColor: selectedImage === i ? '#6c3bd5' : 'var(--border-color)' }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div>
                <span className="badge badge-purple mb-3 inline-block">{book.genre}</span>
                <h1 className="section-title text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
                  {book.title}
                </h1>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>by <span className="font-semibold" style={{ color: '#a78bfa' }}>{book.author}</span></p>
              </div>

              {/* Rating Row */}
              <div className="flex items-center gap-4 flex-wrap">
                <StarRating rating={book.rating} />
                <span className="font-bold text-lg" style={{ color: '#f59e0b' }}>{book.rating}</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  ({book.reviews.toLocaleString()} reviews)
                </span>
                <span className="text-sm" style={{ color: '#4ade80' }}>
                  {book.sold.toLocaleString()}+ sold
                </span>
              </div>

              {/* Price */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>₹{book.price}</span>
                  <span className="text-xl line-through" style={{ color: 'var(--text-secondary)' }}>₹{book.mrp}</span>
                  <span className="discount-badge text-sm">{book.discount}% off</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: '#4ade80' }}>
                    You save ₹{book.mrp - book.price}!
                  </span>
                </div>
                {book.price >= 499 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Truck size={14} style={{ color: '#4ade80' }} />
                    <span className="text-sm" style={{ color: '#4ade80' }}>Free delivery on this order</span>
                  </div>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${book.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-sm font-medium" style={{ color: book.inStock ? '#4ade80' : '#f87171' }}>
                  {book.inStock ? `In Stock (${book.stockCount} left)` : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Quantity:</span>
                <div className="flex items-center gap-2 glass-card px-1">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,59,213,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >−</button>
                  <span className="w-8 text-center font-bold" style={{ color: 'var(--text-primary)' }}>{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(10, q + 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,59,213,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToCart(book, qty)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all"
                  style={{
                    background: inCart ? 'rgba(108,59,213,0.3)' : 'linear-gradient(135deg, #6c3bd5, #8b5cf6)',
                    color: 'white',
                    border: inCart ? '1px solid rgba(108,59,213,0.5)' : 'none',
                    minWidth: '160px',
                  }}
                >
                  <ShoppingCart size={18} />
                  {inCart ? 'Added to Cart' : 'Add to Cart'}
                </motion.button>
                <Link to="/checkout" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addToCart(book, qty)}
                    className="btn-gold w-full py-3.5 text-base justify-center"
                  >
                    Buy Now
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist(book)}
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 btn-secondary"
                  style={{
                    background: inWishlist ? 'rgba(236,72,153,0.2)' : 'var(--bg-secondary)',
                    border: `1px solid ${inWishlist ? 'rgba(236,72,153,0.4)' : 'var(--border-color)'}`,
                  }}
                >
                  <Heart size={20} fill={inWishlist ? '#ec4899' : 'none'}
                    style={{ color: inWishlist ? '#ec4899' : 'var(--text-secondary)' }} />
                </motion.button>
              </div>

              {/* Book Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BookOpen, label: 'Pages', value: `${book.pages} pages` },
                  { icon: Award, label: 'Publisher', value: book.publisher },
                  { icon: Tag, label: 'Language', value: book.language },
                  { icon: Clock, label: 'Published', value: new Date(book.publishDate).getFullYear() },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass-card p-3 flex items-center gap-3">
                    <Icon size={16} style={{ color: '#a78bfa' }} />
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, text: 'Secure Payment' },
                  { icon: Truck, text: 'Fast Delivery' },
                  { icon: Package, text: 'Easy Returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl"
                    style={{ background: 'rgba(108,59,213,0.1)', color: '#a78bfa', border: '1px solid rgba(108,59,213,0.2)' }}>
                    <Icon size={12} />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div className="mb-16">
          <div className="flex gap-1 mb-6 glass-card p-1.5 w-fit">
            {['description', 'reviews', 'details'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 rounded-xl font-medium text-sm capitalize transition-all duration-200"
                style={{
                  background: activeTab === tab ? 'linear-gradient(135deg, #6c3bd5, #8b5cf6)' : 'transparent',
                  color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6"
            >
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{book.description}</p>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{book.longDescription}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {book.tags.map(tag => (
                      <span key={tag} className="badge badge-purple">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-5">
                  {/* Rating Overview */}
                  <div className="glass-card p-5 mb-6">
                    <div className="flex items-center gap-8 flex-wrap">
                      <div className="text-center">
                        <div className="text-5xl font-bold gradient-text-gold">{book.rating}</div>
                        <StarRating rating={book.rating} size={18} />
                        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                          {book.reviews.toLocaleString()} reviews
                        </p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5,4,3,2,1].map(stars => (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="text-sm w-6" style={{ color: 'var(--text-secondary)' }}>{stars}★</span>
                            <div className="flex-1 rounded-full h-2" style={{ background: 'var(--bg-primary)' }}>
                              <div className="h-full rounded-full" style={{
                                width: `${[72, 18, 7, 2, 1][5 - stars]}%`,
                                background: 'linear-gradient(90deg, #f59e0b, #f97316)'
                              }} />
                            </div>
                            <span className="text-xs w-8" style={{ color: 'var(--text-secondary)' }}>
                              {[72, 18, 7, 2, 1][5 - stars]}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {sampleReviews.map((review, i) => (
                    <div key={i} className="glass-card p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <img src={review.avatar} alt={review.name}
                          className="w-10 h-10 rounded-full object-cover border"
                          style={{ borderColor: 'rgba(108,59,213,0.3)' }} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{review.name}</span>
                              {review.verified && <span className="badge badge-green" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>✓ Verified</span>}
                            </div>
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{review.date}</span>
                          </div>
                          <StarRating rating={review.rating} size={12} />
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{review.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'ISBN', value: book.isbn },
                    { label: 'Pages', value: `${book.pages} pages` },
                    { label: 'Publisher', value: book.publisher },
                    { label: 'Language', value: book.language },
                    { label: 'Publish Date', value: book.publishDate },
                    { label: 'Genre', value: book.genre },
                    { label: 'In Stock', value: book.inStock ? 'Yes' : 'No' },
                    { label: 'Weight', value: '300g (approx)' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 px-4 rounded-xl"
                      style={{ background: 'rgba(108,59,213,0.05)', border: '1px solid rgba(108,59,213,0.1)' }}>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Books */}
        {related.length > 0 && (
          <div>
            <h2 className="section-title text-2xl mb-6" style={{ color: 'var(--text-primary)' }}>
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {related.map((b, i) => <BookCard key={b.id} book={b} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
