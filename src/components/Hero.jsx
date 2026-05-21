import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star, TrendingUp, BookOpen } from 'lucide-react';

const floatingBooks = [
  { color: '#6c3bd5', angle: -20, delay: 0, scale: 0.9 },
  { color: '#f59e0b', angle: 0, delay: 0.5, scale: 1 },
  { color: '#ec4899', angle: 20, delay: 1, scale: 0.85 },
];

function ParticleSystem() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            background: i % 3 === 0 ? '#6c3bd5' : i % 3 === 1 ? '#f59e0b' : '#ec4899',
            opacity: Math.random() * 0.5 + 0.1,
            animationDuration: `${Math.random() * 15 + 8}s`,
            animationDelay: `${Math.random() * 8}s`,
            bottom: '-10px',
          }}
        />
      ))}
    </div>
  );
}

function Book3D({ color, angle, delay, scale, title, cover }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: angle - 10 }}
      animate={{ opacity: 1, y: 0, rotate: angle }}
      transition={{ delay: delay + 0.8, duration: 0.8, ease: 'easeOut' }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        position: 'absolute',
        transform: `rotate(${angle}deg) scale(${scale})`,
        animation: `floatSlow ${4 + delay}s ease-in-out ${delay}s infinite`,
      }}
    >
      <div
        className="rounded-xl overflow-hidden shadow-2xl"
        style={{
          width: '120px',
          height: '170px',
          boxShadow: `0 25px 60px ${color}60, 0 0 0 1px ${color}30`,
          position: 'relative',
        }}
      >
        {cover ? (
          <img src={cover} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}aa, ${color}44)` }}
          >
            <BookOpen size={40} className="text-white opacity-60" />
          </div>
        )}
        {/* Book spine effect */}
        <div
          className="absolute left-0 top-0 bottom-0 w-4"
          style={{ background: `${color}99`, borderRight: `1px solid ${color}40` }}
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const bookCovers = [
    { color: '#6c3bd5', cover: '/books/atomic_habits.png', angle: -18, delay: 0.3, scale: 0.88 },
    { color: '#f59e0b', cover: '/books/psychology_money.png', angle: 0, delay: 0, scale: 1.05 },
    { color: '#ec4899', cover: '/books/harry_potter.png', angle: 18, delay: 0.6, scale: 0.9 },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'var(--bg-primary)',
        paddingTop: '80px',
      }}
    >
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(108,59,213,0.2) 0%, transparent 70%)',
            top: '-100px', left: '-100px',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
            bottom: '-100px', right: '-100px',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
            top: '40%', right: '30%',
          }}
        />
      </div>

      <ParticleSystem />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(108,59,213,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,59,213,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-main relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="badge badge-purple">
                <Sparkles size={12} />
                India's #1 Online Bookstore
              </span>
              <span className="badge badge-gold">
                <TrendingUp size={12} />
                2M+ Readers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title mb-4 leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--text-primary)' }}
            >
              Discover Your Next{' '}
              <span className="shine-text">Favourite Book</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg leading-relaxed mb-8"
              style={{ color: 'var(--text-secondary)', maxWidth: '520px' }}
            >
              Explore 5,00,000+ books across every genre. Get bestsellers at unbeatable prices, 
              with fast delivery across India. Your story starts here.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: '5L+', label: 'Books' },
                { value: '2M+', label: 'Readers' },
                { value: '500+', label: 'Cities' },
                { value: '4.9★', label: 'Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold gradient-text-gold">{stat.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary text-base px-8 py-3.5"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen size={18} />
                    Explore Books
                    <ArrowRight size={16} />
                  </span>
                </motion.button>
              </Link>
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-secondary text-base px-8 py-3.5"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={18} />
                    Get Started Free
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 mt-8"
            >
              <div className="flex -space-x-2">
                {[47, 68, 45, 12].map(n => (
                  <img key={n} src={`https://i.pravatar.cc/32?img=${n}`} alt=""
                    className="w-8 h-8 rounded-full border-2"
                    style={{ borderColor: 'var(--bg-primary)' }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#f59e0b" style={{ color: '#f59e0b' }} />)}
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Trusted by <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>2M+ readers</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Books Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
            style={{ height: '500px' }}
          >
            {/* Glow circle behind books */}
            <div
              className="absolute rounded-full"
              style={{
                width: '350px', height: '350px',
                background: 'radial-gradient(circle, rgba(108,59,213,0.3), rgba(245,158,11,0.1), transparent 70%)',
                animation: 'pulseGlow 3s ease-in-out infinite',
                filter: 'blur(2px)',
              }}
            />

            {/* Books */}
            <div className="relative flex items-center justify-center" style={{ width: '340px', height: '340px' }}>
              {bookCovers.map((book, i) => (
                <div key={i}
                  className="absolute"
                  style={{
                    left: `${50 + (i - 1) * 35}%`,
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${book.angle}deg) scale(${book.scale})`,
                    zIndex: i === 1 ? 3 : 1,
                    animation: `floatSlow ${5 + i * 1.5}s ease-in-out ${book.delay}s infinite`,
                  }}
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      width: i === 1 ? '150px' : '120px',
                      height: i === 1 ? '210px' : '168px',
                      boxShadow: `0 30px 80px ${book.color}50, 0 0 0 1px ${book.color}20`,
                    }}
                  >
                    <img
                      src={book.cover}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.background = `linear-gradient(135deg, ${book.color}88, ${book.color}33)`; }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 right-8 glass-card p-3"
              style={{ border: '1px solid rgba(245,158,11,0.3)' }}
            >
              <div className="flex items-center gap-2">
                <Star size={14} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Bestseller</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Atomic Habits</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-16 left-6 glass-card p-3"
              style={{ border: '1px solid rgba(108,59,213,0.3)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Fast Delivery</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>2-4 Business Days</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-4 glass-card p-3"
              style={{ border: '1px solid rgba(236,72,153,0.3)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">💰</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Save upto 43%</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Best Prices</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5"
          style={{ borderColor: 'rgba(108,59,213,0.4)' }}>
          <div className="w-1.5 h-2.5 rounded-full"
            style={{ background: '#6c3bd5', animation: 'scrollDown 2s infinite' }} />
        </div>
        <style>{`@keyframes scrollDown { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(8px); opacity: 0; } }`}</style>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
