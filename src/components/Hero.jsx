import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Star, TrendingUp, BookOpen, Truck, ShieldCheck, Percent, Compass } from 'lucide-react';

function ParticleSystem() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 25 }).map((_, i) => {
        const size = Math.random() * 4 + 1.5;
        const dur = Math.random() * 12 + 10;
        const delay = Math.random() * 6;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              width: `${size}px`,
              height: `${size}px`,
              background: i % 3 === 0 ? 'rgba(99, 102, 241, 0.4)' : i % 3 === 1 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(236, 72, 153, 0.35)',
              opacity: Math.random() * 0.4 + 0.15,
              animation: `float-up ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          15% { opacity: 0.6; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-110vh) scale(0.6) translateX(40px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Parallax mouse movements
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), springConfig);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bookCovers = [
    { 
      id: 1,
      color: '#6366f1', 
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80', 
      angle: -15, 
      delay: 0.1, 
      scale: 0.88,
      title: "Atomic Habits",
      author: "James Clear",
      price: "₹499",
      offset: "-55px"
    },
    { 
      id: 3,
      color: '#f59e0b', 
      cover: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&auto=format&fit=crop&q=80', 
      angle: 0, 
      delay: 0, 
      scale: 1.05,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: "₹449",
      offset: "0px"
    },
    { 
      id: 5,
      color: '#ec4899', 
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80', 
      angle: 15, 
      delay: 0.2, 
      scale: 0.92,
      title: "Clean Code",
      author: "Robert C. Martin",
      price: "₹799",
      offset: "55px"
    },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden pt-24 pb-16 lg:py-0"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background Animated Aurora Lights */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      {/* Grid Mesh Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.25) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <ParticleSystem />

      <div className="container-main relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[80vh]">
          
          {/* Left Column: Premium Typographic Text */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
                <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                Premium Literary Hub
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/15">
                <TrendingUp size={11} />
                2M+ Happy Readers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 font-extrabold tracking-tight leading-[1.08] text-slate-100"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
                color: 'var(--text-primary)'
              }}
            >
              Discover India's <br />
              <span className="gradient-text font-black">Luxury Book Club</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg mb-8 leading-relaxed font-medium"
              style={{ color: 'var(--text-secondary)', maxWidth: '580px' }}
            >
              Explore an exquisite curation of over 500,000+ works spanning mind-shifting finance, clean technology, and premium fiction. Unbeatable publisher discounts, and standard cash on delivery nationwide.
            </motion.p>

            {/* Apple/Notion Style CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-lux group"
                >
                  <span>Browse Curation</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-lux-secondary"
                >
                  <Compass size={16} className="text-indigo-400" />
                  <span>Support Center</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Micro Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5"
            >
              {[
                { val: "5,00,000+", label: "Books Stocked", desc: "Across 25 genres" },
                { val: "24-48 Hours", label: "Express Shipping", desc: "Metro delivery" },
                { val: "100% Secure", label: "Cash On Delivery", desc: "Zero advance fees" },
                { val: "4.9 ★ Rating", label: "Verified Reviews", desc: "1.2 Million stars" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-lg font-black text-slate-100 font-sans" style={{ color: 'var(--text-primary)' }}>{stat.val}</span>
                  <span className="text-xs font-bold text-indigo-400 mt-0.5">{stat.label}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5" style={{ color: 'var(--text-muted)' }}>{stat.desc}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Rotating Stack & Cursor-Following Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] lg:min-h-[500px]">
            
            {/* Ambient Purple Backdrop Circle */}
            <div className="absolute w-72 h-72 rounded-full pointer-events-none filter blur-3xl opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.6), rgba(236,72,153,0.3), transparent 75%)',
                animation: 'pulse-glow 5s infinite ease-in-out'
              }}
            />
            <style>{`
              @keyframes pulse-glow {
                0%, 100% { transform: scale(1); opacity: 0.25; }
                50% { transform: scale(1.15); opacity: 0.35; }
              }
            `}</style>

            {/* Parallax Container */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative flex items-center justify-center w-full h-full"
            >
              {/* Stack of 3D Books */}
              <div className="relative w-64 h-80 flex items-center justify-center">
                {bookCovers.map((book, idx) => {
                  const isHovered = hoveredIndex === idx;
                  return (
                    <motion.div
                      key={book.id}
                      className="absolute cursor-pointer transition-all duration-300 select-none"
                      style={{
                        zIndex: isHovered ? 20 : book.id === 3 ? 10 : 5,
                        transformStyle: 'preserve-3d',
                        left: `calc(50% + ${book.offset})`,
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${book.angle}deg) scale(${book.scale})`,
                      }}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      whileHover={{ 
                        scale: book.scale + 0.08,
                        rotate: book.angle * 0.4,
                        y: -15,
                        z: 50
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                      {/* Realistic 3D Shadow Card */}
                      <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] w-36 h-52 sm:w-40 sm:h-56 border border-white/10 bg-slate-900 group">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={e => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.background = `linear-gradient(135deg, ${book.color}cc, #121225)`;
                          }}
                        />
                        {/* Book Spine Overlay Effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/25 backdrop-blur-[1px] border-r border-white/5" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                          <p className="font-extrabold text-[11px] text-white leading-tight">{book.title}</p>
                          <p className="text-[9px] text-slate-300 mt-0.5">{book.author}</p>
                          <span className="text-xs font-black text-amber-400 mt-1">{book.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating Badge 1: COD Guaranteed */}
              <motion.div
                style={{ translateZ: 60 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 right-2 sm:right-6 p-3 rounded-2xl glass shadow-2xl border border-white/10 flex items-center gap-2.5 min-w-[155px]"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-100">COD Guarantee</p>
                  <p className="text-[8px] font-bold text-slate-400">No Advance Payment</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Free Shipping */}
              <motion.div
                style={{ translateZ: 80 }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-2 -left-2 sm:left-4 p-3 rounded-2xl glass shadow-2xl border border-white/10 flex items-center gap-2.5 min-w-[155px]"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <Truck size={16} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-100">Express Delivery</p>
                  <p className="text-[8px] font-bold text-slate-400">All India Shipping</p>
                </div>
              </motion.div>

              {/* Floating Badge 3: Discount Indicator */}
              <motion.div
                style={{ translateZ: 45 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute top-1/2 -right-8 p-3 rounded-2xl glass shadow-2xl border border-white/10 flex items-center gap-2.5 min-w-[140px]"
              >
                <div className="w-8 h-8 rounded-xl bg-pink-500/15 flex items-center justify-center shrink-0">
                  <Percent size={15} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-100">Up to 40% Off</p>
                  <p className="text-[8px] font-bold text-slate-400">Publisher Discounts</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
