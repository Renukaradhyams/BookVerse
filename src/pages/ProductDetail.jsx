import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Heart, Star, BookOpen, ArrowLeft,
  Package, Truck, ShieldCheck, Tag, Compass, Sparkles, Flame, CheckCircle, Gift
} from 'lucide-react';
import { books } from '../data/books';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import BookCard from '../components/BookCard';

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

  // Restore scroll positions on mount/product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    setQty(1);
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="aurora-bg">
          <div className="aurora-blob aurora-1" />
        </div>
        <div className="text-center relative z-10 glass-card p-10 max-w-md border border-white/5">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-black mb-2 text-slate-100">Edition Not Located</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            The book you are looking for does not exist in our premium catalog.
          </p>
          <Link to="/products">
            <button className="btn-lux px-6 py-2.5 text-xs">
              <span>Return to Catalog</span>
            </button>
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
    { name: 'Priya Sharma', location: 'Mumbai', rating: 5, date: '2 weeks ago', text: 'Absolutely lovedJames Clear\'s tone! The concepts are extremely actionable. Fast delivery by BookVerse.', verified: true },
    { name: 'Rahul Mehta', location: 'Bangalore', rating: 5, date: '1 month ago', text: 'Stunning premium print! The cover feels luxurious. My COD order arrived in perfect state.', verified: true },
    { name: 'Ananya Krishnan', location: 'Chennai', rating: 4, date: '3 months ago', text: 'Incredibly neat packaging. The book has minor marks on corner but print quality is outstanding.', verified: true },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Drifting Auroras */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" style={{ width: '500px', height: '500px' }} />
        <div className="aurora-blob aurora-3" style={{ width: '400px', height: '400px', right: '10%' }} />
      </div>

      <div className="container-main relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
          <button onClick={() => navigate('/products')} className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
            <ArrowLeft size={13} /> Return to Curation
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>{book.genre}</span>
          <span>/</span>
          <span className="truncate max-w-48 text-slate-100" style={{ color: 'var(--text-primary)' }}>{book.title}</span>
        </div>

        {/* Core Product Presentation Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start">
          
          {/* Left Visual Column: Sticky Photo Desk */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden aspect-[3/4] glass-card p-3 border border-white/5 shadow-2xl"
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-950">
                <img
                  src={imageError ? 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=800&fit=crop' : images[selectedImage]}
                  alt={book.title}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
                
                {book.discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wider uppercase text-pink-400 bg-pink-500/15 border border-pink-500/20">
                      <Flame size={10} className="animate-bounce" />
                      {book.discount}% publisher drop
                    </span>
                  </div>
                )}
                
                {book.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase text-amber-400 bg-amber-500/15 border border-amber-500/20">
                      <Sparkles size={10} />
                      {book.badge}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Frost Thumbnails picker */}
            <div className="flex gap-3 justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className="w-16 h-20 sm:w-20 sm:h-26 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-slate-900"
                  style={{ borderColor: selectedImage === i ? '#6366f1' : 'var(--border-color)' }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover rounded-xl"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Details Column */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">{book.genre}</span>
                <h1 className="font-extrabold text-slate-100 tracking-tight leading-tight mt-2 text-3xl md:text-4xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {book.title}
                </h1>
                <p className="text-sm font-bold text-slate-400 mt-1">by <span className="text-indigo-300 font-extrabold">{book.author}</span></p>
              </div>

              {/* Verified Badges and Ratings Row */}
              <div className="flex flex-wrap items-center gap-4 py-2 border-y border-white/5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(st => (
                    <Star key={st} size={13} fill={st <= Math.floor(book.rating) ? '#fbbf24' : 'none'}
                      className={st <= Math.floor(book.rating) ? 'text-amber-400' : 'text-slate-600'} />
                  ))}
                </div>
                <span className="text-sm font-black text-amber-500">{book.rating} Stars</span>
                <span className="text-xs text-slate-400 font-semibold">({book.reviews.toLocaleString()} verified reviews)</span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  {book.sold.toLocaleString()}+ Express orders
                </span>
              </div>

              {/* Price Panel */}
              <div className="glass-card p-6 border border-white/5 flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500/5 filter blur-xl" />
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-black text-slate-100">₹{book.price}</span>
                  {book.mrp > book.price && (
                    <>
                      <span className="text-lg line-through text-slate-500 font-bold">₹{book.mrp}</span>
                      <span className="text-xs font-black uppercase text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-lg">
                        Save ₹{book.mrp - book.price} ({book.discount}% Drop)
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <p className="text-xs font-bold text-emerald-400">Cash On Delivery Available Nationwide</p>
                </div>

                {book.price >= 499 ? (
                  <div className="flex items-center gap-2.5 mt-1 border-t border-white/5 pt-3">
                    <Truck size={14} className="text-indigo-400" />
                    <span className="text-xs text-slate-400 font-bold">This premium order qualifies for <span className="text-emerald-400 font-black">Free Shipping</span></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 mt-1 border-t border-white/5 pt-3">
                    <Truck size={14} className="text-indigo-400" />
                    <span className="text-xs text-slate-400 font-bold">Standard dispatch flat fee <span className="text-amber-500 font-black">₹49</span> (Free shipping above ₹499)</span>
                  </div>
                )}
              </div>

              {/* Scarcity Alerts */}
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/3 border border-white/5">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${book.inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <div className="text-xs text-left">
                  <span className="font-extrabold" style={{ color: book.inStock ? '#10b981' : '#f43f5e' }}>
                    {book.inStock ? 'Edition In Stock' : 'Temporarily Out of Stock'}
                  </span>
                  <span className="text-slate-400 ml-1.5">({book.stockCount} secure copies remaining in local hub)</span>
                </div>
              </div>

              {/* Qty Switcher */}
              <div className="flex items-center gap-5 pt-2">
                <span className="text-xs font-black uppercase text-slate-400" style={{ color: 'var(--text-secondary)' }}>Select Copies:</span>
                <div className="flex items-center bg-white/3 border border-white/5 rounded-2xl p-1 shrink-0">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-slate-300 hover:text-white transition-colors"
                  >−</button>
                  <span className="w-10 text-center text-sm font-black text-slate-100">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(book.stockCount, q + 1))}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-slate-300 hover:text-white transition-colors"
                  >+</button>
                </div>
              </div>

              {/* Luxury Checkout CTAs */}
              <div className="flex gap-4 flex-wrap pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToCart(book, qty)}
                  className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm shadow-xl cursor-pointer"
                  style={{
                    background: inCart 
                      ? 'rgba(99, 102, 241, 0.08)' 
                      : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    color: inCart ? '#a78bfa' : 'white',
                    border: inCart ? '1.5px solid rgba(99, 102, 241, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                    minWidth: '180px'
                  }}
                >
                  <ShoppingCart size={16} />
                  <span>{inCart ? 'Basket Updated' : 'Add to Shopping Cart'}</span>
                </motion.button>

                <Link to="/checkout" className="flex-grow min-w-[180px]">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addToCart(book, qty)}
                    className="btn-lux w-full py-4 text-sm justify-center shadow-xl"
                  >
                    <span>Instant COD Order</span>
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleWishlist(book)}
                  className="w-13 h-13 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0 cursor-pointer"
                  style={{
                    background: inWishlist ? 'rgba(236,72,153,0.1)' : 'rgba(255, 255, 255, 0.03)',
                    borderColor: inWishlist ? 'rgba(236,72,153,0.3)' : 'var(--border-color)',
                  }}
                  title="Bookmark Edition"
                >
                  <Heart size={18} fill={inWishlist ? '#ec4899' : 'none'}
                    style={{ color: inWishlist ? '#ec4899' : 'var(--text-secondary)' }} />
                </motion.button>
              </div>

              {/* Metadata Details Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: BookOpen, label: 'Page Extent', value: `${book.pages} Pages` },
                  { icon: Compass, label: 'Publisher House', value: book.publisher },
                  { icon: Tag, label: 'Print Language', value: book.language },
                  { icon: Gift, label: 'Edition ISBN', value: book.isbn },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass-card p-4 flex items-center gap-3.5 border border-white/5 text-left">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-500/10 shrink-0">
                      <Icon size={16} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
                      <p className="text-xs font-bold text-slate-200 mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

        </div>

        {/* Description & Review Tabs Section */}
        <div className="mb-20">
          <div className="flex gap-1.5 mb-8 glass-card p-1.5 w-fit border border-white/5 rounded-2xl">
            {['description', 'reviews', 'specifications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs capitalize transition-all duration-300"
                style={{
                  background: activeTab === tab ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
                  color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                }}
              >
                {tab === 'reviews' ? 'Reader Reviews' : tab}
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
              className="glass-card p-8 border border-white/5 text-left"
            >
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm uppercase text-slate-200 tracking-wider">Book Abstract</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-medium">{book.description}</p>
                  <h3 className="font-extrabold text-sm uppercase text-slate-200 tracking-wider pt-4">In-Depth Editorial Analysis</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-medium">{book.longDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-6">
                    {book.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/5 text-slate-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  
                  {/* Reviews aggregate card */}
                  <div className="glass-card p-6 border border-white/5 bg-slate-900/50">
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-4 text-center md:border-r border-white/5 py-4">
                        <span className="text-5xl font-black text-amber-500 font-sans">{book.rating}</span>
                        <div className="flex justify-center gap-0.5 mt-2">
                          {[1,2,3,4,5].map(st => (
                            <Star key={st} size={14} fill={st <= Math.round(book.rating) ? '#fbbf24' : 'none'} className="text-amber-500" />
                          ))}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{book.reviews.toLocaleString()} member ratings</p>
                      </div>

                      <div className="md:col-span-8 space-y-2.5">
                        {[5, 4, 3, 2, 1].map(stars => {
                          const percentages = [75, 17, 5, 2, 1];
                          const percent = percentages[5 - stars];
                          return (
                            <div key={stars} className="flex items-center gap-4 text-xs font-bold">
                              <span className="w-10 text-slate-400 text-right">{stars} Star</span>
                              <div className="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{
                                  width: `${percent}%`,
                                  background: 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                                }} />
                              </div>
                              <span className="w-8 text-slate-400 text-left">{percent}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Individual Review list */}
                  <div className="space-y-4">
                    {sampleReviews.map((rev, i) => (
                      <div key={i} className="glass-card p-6 border border-white/5 text-left">
                        <div className="flex items-start gap-4 justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black text-indigo-400 text-xs">
                              {rev.name.split(' ').map(n=>n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-xs text-slate-100">{rev.name}</span>
                                {rev.verified && (
                                  <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                    <CheckCircle size={8} /> Verified
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-0.5 mt-1">
                                {[1,2,3,4,5].map(st => (
                                  <Star key={st} size={10} fill={st <= rev.rating ? '#fbbf24' : 'none'} className="text-amber-500" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold">{rev.date}</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-medium italic mt-4">"{rev.text}"</p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Standard ISBN-13', value: book.isbn },
                    { label: 'Print Extent', value: `${book.pages} printed pages` },
                    { label: 'Publisher imprint', value: book.publisher },
                    { label: 'Primary Language', value: book.language },
                    { label: 'Publish Date', value: book.publishDate },
                    { label: 'Curated Category', value: book.genre },
                    { label: 'Stock Guarantee', value: book.inStock ? 'Available for COD' : 'Out of stock' },
                    { label: 'Shipping Weight', value: '450 grams (deluxe hardcover)' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-3.5 px-5 rounded-2xl border border-white/5 bg-slate-900/40">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{label}</span>
                      <span className="text-xs font-bold text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* You Might Also Like Related Shelf */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 mb-4 w-fit">
              <Compass size={11} />
              Similar Collections
            </div>
            <h2 className="font-extrabold text-slate-100 tracking-tight text-xl md:text-2xl mb-8 text-left" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Readers Who Explored This Also Selected
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {related.map((b, i) => <BookCard key={b.id} book={b} index={i} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
