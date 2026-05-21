import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles, Crown, Zap, Star } from 'lucide-react';
import BookCard from "../components/BookCard";
import { books, categories, testimonials, stats } from "../data/books";
import Hero from "../components/Hero";
import { useInView } from 'react-intersection-observer';

function SectionHeader({ badge, title, subtitle, icon: Icon }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      {badge && (
        <div className="flex items-center gap-2 justify-center mb-3">
          {Icon && <Icon size={16} style={{ color: '#f59e0b' }} />}
          <span className="badge badge-gold">{badge}</span>
        </div>
      )}
      <h2 className="section-title mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      {subtitle && (
        <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
      )}
    </motion.div>
  );
}

function StatCounter({ value, label, icon }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center glass-card p-6"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-bold gradient-text-gold">{value}</div>
      <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const trendingBooks = books.filter(b => b.isTrending);
  const bestSellers = books.filter(b => b.isBestSeller).slice(0, 8);
  const newArrivals = books.filter(b => b.isNew);
  const allBooks = books.slice(0, 8);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const categoryIcons = ['📚', '🧠', '💰', '💻', '✨', '📈', '🌍', '🎭'];
  const categoryData = [
    { name: 'Self-Help', count: 45, color: '#6c3bd5', to: '/products?category=self-help' },
    { name: 'Finance', count: 32, color: '#f59e0b', to: '/products?category=finance' },
    { name: 'Technology', count: 58, color: '#3b82f6', to: '/products?category=technology' },
    { name: 'Fiction', count: 124, color: '#ec4899', to: '/products?category=fiction' },
    { name: 'Business', count: 41, color: '#10b981', to: '/products?category=business' },
    { name: 'History', count: 29, color: '#f97316', to: '/products?category=non-fiction' },
    { name: 'Science', count: 36, color: '#06b6d4', to: '/products?category=technology' },
    { name: 'Biography', count: 22, color: '#8b5cf6', to: '/products?category=non-fiction' },
  ];

  return (
    <div>
      <Hero />

      {/* Stats Section */}
      <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCounter key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Books Carousel */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main">
          <SectionHeader
            badge="Trending Now"
            icon={TrendingUp}
            title="What Everyone's Reading"
            subtitle="Discover the most popular books loved by thousands of Indian readers this week."
          />
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={swiper => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="pb-10"
            >
              {trendingBooks.map((book, i) => (
                <SwiperSlide key={book.id}>
                  <BookCard book={book} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Nav Buttons */}
            <button ref={prevRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 glass rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: '1px solid var(--glass-border)' }}>
              <ChevronLeft size={18} style={{ color: 'var(--text-primary)' }} />
            </button>
            <button ref={nextRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 glass rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: '1px solid var(--glass-border)' }}>
              <ChevronRight size={18} style={{ color: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-main">
          <SectionHeader
            badge="Browse by Category"
            icon={Sparkles}
            title="Explore Every Genre"
            subtitle="From page-turning fiction to life-changing non-fiction, find your perfect read."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categoryData.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link to={cat.to}>
                  <div
                    className="group glass-card p-6 text-center cursor-pointer relative overflow-hidden"
                    style={{ border: `1px solid ${cat.color}20` }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${cat.color}10, transparent)` }}
                    />
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl transition-transform group-hover:scale-110 duration-300"
                      style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                    >
                      {categoryIcons[i]}
                    </div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{cat.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{cat.count}+ Books</p>
                    <div
                      className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main">
          <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crown size={16} style={{ color: '#f59e0b' }} />
                <span className="badge badge-gold">Best Sellers</span>
              </div>
              <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>All-Time Favourites</h2>
              <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
                Books that have changed millions of lives.
              </p>
            </div>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary"
              >
                View All Books →
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {bestSellers.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendation Banner */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(108,59,213,0.2), rgba(245,158,11,0.1), rgba(236,72,153,0.1))',
              border: '1px solid rgba(108,59,213,0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(108,59,213,0.3), transparent)' }} />
            <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full blur-2xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.2), transparent)' }} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={18} style={{ color: '#f59e0b' }} />
                  <span className="badge badge-gold">AI-Powered</span>
                </div>
                <h2 className="section-title text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
                  Books Curated Just For You
                </h2>
                <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Our intelligent recommendation engine analyzes your reading patterns to suggest 
                  books you'll absolutely love. Get personalized picks every week.
                </p>
                <Link to="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary"
                  >
                    <span className="flex items-center gap-2">
                      <Zap size={16} />
                      Get Personalized Picks
                    </span>
                  </motion.button>
                </Link>
              </div>

              {/* Recommendation Cards Preview */}
              <div className="flex gap-3 shrink-0">
                {books.filter(b => b.rating >= 4.7).slice(0, 3).map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="cursor-pointer"
                  >
                    <Link to={`/product/${book.id}`}>
                      <div
                        className="rounded-xl overflow-hidden shadow-xl"
                        style={{
                          width: i === 1 ? '90px' : '75px',
                          height: i === 1 ? '130px' : '108px',
                          transform: i === 0 ? 'rotate(-8deg)' : i === 2 ? 'rotate(8deg)' : 'none',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        }}
                      >
                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Books Grid */}
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-main">
          <SectionHeader
            badge="New Arrivals"
            icon={Sparkles}
            title="Fresh Off the Press"
            subtitle="The latest additions to our collection — be the first to read them."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {allBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-10 py-4 text-base"
              >
                <span className="flex items-center gap-2">
                  Explore All Books
                  <Sparkles size={16} />
                </span>
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main">
          <SectionHeader
            badge="Reader Stories"
            icon={Star}
            title="What Our Readers Say"
            subtitle="Real reviews from real book lovers across India."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.avatar} alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: 'rgba(108,59,213,0.3)' }} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.location}</div>
                  </div>
                  {t.verified && (
                    <span className="ml-auto badge badge-green text-xs" style={{ fontSize: '0.65rem' }}>✓ Verified</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} fill={s <= t.rating ? '#f59e0b' : 'none'}
                      style={{ color: s <= t.rating ? '#f59e0b' : 'var(--text-secondary)' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center glass-card p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(108,59,213,0.1), rgba(236,72,153,0.05))' }} />
            <div className="relative z-10">
              <h2 className="section-title mb-4" style={{ color: 'var(--text-primary)' }}>
                Your Next Adventure Awaits
              </h2>
              <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Join millions of readers. Get exclusive deals, early access to new releases, 
                and personalized recommendations.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary text-base px-8 py-4"
                  >
                    <span>Start Shopping →</span>
                  </motion.button>
                </Link>
                <Link to="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-secondary text-base px-8 py-4"
                  >
                    Create Free Account
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
