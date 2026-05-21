import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  ChevronLeft, ChevronRight, TrendingUp, Sparkles, Crown, Zap, Star,
  Brain, IndianRupee, Laptop, BookOpen, History, Atom, Award, Compass, ShieldAlert
} from 'lucide-react';
import BookCard from "../components/BookCard";
import { books, testimonials, stats } from "../data/books";
import Hero from "../components/Hero";

function SectionHeader({ badge, title, subtitle, icon: Icon }) {
  return (
    <div className="text-center mb-16 max-w-3xl mx-auto px-4">
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/15 mb-4">
          {Icon && <Icon size={12} className="animate-pulse" />}
          <span>{badge}</span>
        </div>
      )}
      <h2 className="font-extrabold tracking-tight leading-tight text-slate-100 mb-4" 
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute w-20 h-20 rounded-full bg-indigo-500/5 -top-6 -right-6 filter blur-xl" />
      <span className="text-3xl mb-3">{icon}</span>
      <span className="text-3xl font-black tracking-tight text-slate-100 font-sans" style={{ color: 'var(--text-primary)' }}>
        {value}
      </span>
      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-2">{label}</span>
    </motion.div>
  );
}

export default function Home() {
  const trendingBooks = books.filter(b => b.isTrending);
  const bestSellers = books.filter(b => b.isBestSeller).slice(0, 8);
  const newArrivals = books.slice(6, 14);
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const bentoCategories = [
    { id: 'self-help', name: 'Self-Improvement', count: 45, color: '#818cf8', icon: Brain, span: 'col-span-12 sm:col-span-6 lg:col-span-5 h-[230px]', desc: 'Form habits, master productivity & expand thinking' },
    { id: 'finance', name: 'Wealth & Personal Finance', count: 32, color: '#fbbf24', icon: IndianRupee, span: 'col-span-12 sm:col-span-6 lg:col-span-3 h-[230px]', desc: 'Money rules & investment philosophy' },
    { id: 'technology', name: 'Tech & AI Mastery', count: 58, color: '#38bdf8', icon: Laptop, span: 'col-span-12 lg:col-span-4 h-[230px]', desc: 'Deep learning, clean engineering & systems' },
    { id: 'fiction', name: 'Modern & Classic Fiction', count: 124, color: '#f472b6', icon: BookOpen, span: 'col-span-12 sm:col-span-7 lg:col-span-6 h-[230px]', desc: 'Immersive stories & legendary masterpieces' },
    { id: 'business', name: 'Startup & Strategy', count: 41, color: '#34d399', icon: TrendingUp, span: 'col-span-12 sm:col-span-5 lg:col-span-3 h-[230px]', desc: 'Business frameworks & venture execution' },
    { id: 'non-fiction', name: 'History & Biography', count: 29, color: '#fb923c', icon: History, span: 'col-span-12 lg:col-span-3 h-[230px]', desc: 'Civilizations, rulers & human evolution' },
  ];

  return (
    <div className="overflow-hidden">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Value Indicators / Stats */}
      <section className="py-16 border-y border-white/5 relative z-10" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trending Carousel (Swiper) */}
      <section className="py-[120px] relative" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
            <div className="text-left md:max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/15 mb-3">
                <TrendingUp size={11} />
                Weekly Buzz
              </div>
              <h2 className="font-extrabold tracking-tight leading-tight text-slate-100" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: 'var(--text-primary)' }}>
                What Everyone's Reading Now
              </h2>
            </div>
            
            {/* Swiper Frosted Controls */}
            <div className="flex items-center gap-2">
              <button ref={prevRef}
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all">
                <ChevronLeft size={20} className="text-slate-200" />
              </button>
              <button ref={nextRef}
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all">
                <ChevronRight size={20} className="text-slate-200" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
              }}
              className="pb-14 !overflow-visible"
            >
              {trendingBooks.map((book, i) => (
                <SwiperSlide key={book.id}>
                  <BookCard book={book} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 4. Asymmetric Bento Grid Categories */}
      <section className="py-[120px]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-main">
          <SectionHeader
            badge="Premium Curation"
            icon={Sparkles}
            title="Browse by Curated Shelves"
            subtitle="Assembled carefully for the selective reader. Dive into top-tier editions across deep-tech, mind engineering, classics, and personal leverage."
          />

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-12 gap-6 mt-12">
            {bentoCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={cat.span}
                >
                  <Link to={`/products?category=${cat.id}`}>
                    <div
                      className="glass-card p-8 h-full flex flex-col justify-between cursor-pointer relative overflow-hidden group border border-white/5 hover:border-indigo-500/20"
                      style={{ 
                        boxShadow: 'var(--shadow-lux)',
                      }}
                    >
                      {/* Ambient Gradient Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 10% 10%, ${cat.color}12, transparent 60%)` }} />
                      
                      <div className="relative z-10">
                        {/* Upper row: Icon & Counters */}
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                            style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}25` }}>
                            <Icon size={22} style={{ color: cat.color }} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-slate-400 group-hover:text-slate-200">
                            {cat.count}+ Titles
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="font-extrabold text-lg mt-6 text-slate-100 group-hover:text-white" style={{ color: 'var(--text-primary)' }}>{cat.name}</h3>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{cat.desc}</p>
                      </div>

                      {/* Bottom glow line */}
                      <div className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="py-[120px]" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/15 mb-3">
                <Crown size={11} />
                Gold Standard
              </div>
              <h2 className="font-extrabold tracking-tight leading-tight text-slate-100" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: 'var(--text-primary)' }}>
                All-Time Classics & Bestsellers
              </h2>
            </div>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-lux-secondary shrink-0"
              >
                <span>View Curation Shelf</span>
                <ChevronRight size={16} />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Premium AI-Powered Recommendation Callout */}
      <section className="py-12 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] p-8 md:p-14 relative overflow-hidden border border-white/5 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(236,72,153,0.06) 50%, rgba(245,158,11,0.03) 100%)',
            }}
          >
            {/* Aurora Background blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-2xl pointer-events-none opacity-10"
              style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.3), transparent)' }} />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-left lg:max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 mb-4">
                  <Zap size={11} className="text-amber-400" />
                  Smart Curation System
                </div>
                <h2 className="font-extrabold tracking-tight leading-tight text-slate-100 mb-4" 
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>
                  Books Picked Specially For Your Intellect
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-400 mb-8" style={{ color: 'var(--text-secondary)' }}>
                  Our proprietary algorithmic recommendation matches your strategic reading criteria. Tell us what subjects you want to leverage, and receive detailed reading paths.
                </p>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-lux"
                  >
                    <Compass size={16} />
                    <span>Get Smart Picks</span>
                  </motion.button>
                </Link>
              </div>

              {/* Overlapping Floating Mini Books Visual */}
              <div className="flex gap-4 shrink-0 pointer-events-none relative h-36 w-60 items-center justify-center">
                {books.filter(b => b.rating >= 4.7).slice(0, 3).map((book, i) => (
                  <motion.div
                    key={book.id}
                    className="absolute shadow-2xl rounded-xl overflow-hidden border border-white/10 bg-slate-950"
                    style={{
                      width: i === 1 ? '90px' : '75px',
                      height: i === 1 ? '130px' : '108px',
                      transform: i === 0 ? 'translateX(-50px) rotate(-10deg) scale(0.9)' : i === 2 ? 'translateX(50px) rotate(10deg) scale(0.9)' : 'none',
                      zIndex: i === 1 ? 10 : 5,
                      boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)'
                    }}
                    animate={{ y: i % 2 === 0 ? [0, -6, 0] : [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  >
                    <img src={book.cover} alt="" className="w-full h-full object-cover"
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #1e1e3f, #0b0b14)';
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. New Arrivals Section */}
      <section className="py-[120px]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-main">
          <SectionHeader
            badge="Fresh Curation"
            icon={Sparkles}
            title="Fresh Additions to BookVerse"
            subtitle="The absolute latest entries into our national catalog. Secure these limited copies before stock sells out."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-lux px-10 py-4"
              >
                <span>Explore Full Library</span>
                <Sparkles size={15} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Reader Testimonials with Locked Heights */}
      <section className="py-[120px]" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main">
          <SectionHeader
            badge="Reader Integrity"
            icon={Star}
            title="What Express Members Say"
            subtitle="100% verified customer feedbacks from elite readers, founders, developers, and collectors across Mumbai, Bangalore, Chennai, and Delhi."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-6 flex flex-col justify-between border border-white/5 h-[230px]"
              >
                <div>
                  {/* Top user profile line */}
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt=""
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                      onError={e => { e.target.src = `https://i.pravatar.cc/80?img=${t.id * 10}`; }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-xs text-slate-100 truncate" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.location}</p>
                    </div>
                    {t.verified && (
                      <span className="shrink-0 text-[8px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">✓ COD Order</span>
                    )}
                  </div>
                  {/* Ratings */}
                  <div className="flex items-center gap-0.5 mt-4">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={11} fill={s <= t.rating ? '#fbbf24' : 'none'}
                        style={{ color: s <= t.rating ? '#fbbf24' : 'var(--border-color)' }} />
                    ))}
                  </div>
                </div>

                {/* Text quote - auto clamp to prevent breaks */}
                <p className="text-[11.5px] leading-relaxed italic text-slate-300 font-medium line-clamp-4 mt-2" style={{ color: 'var(--text-secondary)' }}>
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA Overhaul */}
      <section className="py-[100px]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center glass-card p-12 md:p-16 relative overflow-hidden border border-indigo-500/10"
            style={{
              boxShadow: 'var(--shadow-lux)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(236,72,153,0.04) 100%)' }} />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-extrabold tracking-tight leading-tight text-slate-100 mb-4" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
                Elevate Your Personal Library Today
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300 mb-8" style={{ color: 'var(--text-secondary)' }}>
                Access premium paperbacks and rare collection items delivered securely to your doorstep anywhere in India. Pure cash on delivery. Zero advance fees.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-lux text-base px-8 py-4"
                  >
                    <span>Begin Browsing →</span>
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-lux-secondary text-base px-8 py-4"
                  >
                    <span>Connect with Support</span>
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
