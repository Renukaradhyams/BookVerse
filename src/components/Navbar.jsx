import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, Heart, ShoppingCart, Sun, Moon,
  Menu, X, ChevronDown, Sparkles, BookMarked, Compass, ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { books, categories } from '../data/books';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  
  const searchRef = useRef(null);
  const megaMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { toggleTheme, isDark } = useTheme();

  // Scroll detection for navbar shrinking & lighting
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Handle live search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = books.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.genre.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  }, [searchQuery]);

  // Click outside to close overlays
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'All Books' },
    { to: '/contact', label: 'Support' },
  ];

  const handleCategorySelect = (categoryId) => {
    setMegaMenuOpen(false);
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b backdrop-blur-xl ${
        scrolled 
          ? 'h-20 shadow-[0_10px_30px_rgba(0,0,0,0.08)]' 
          : 'h-24'
      }`}
      style={{
        background: scrolled 
          ? 'var(--glass-bg)' 
          : 'rgba(7, 7, 13, 0.15)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="container-main h-full flex items-center justify-between gap-6 relative">
        
        {/* Left: Luxury Branding */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden transition-transform duration-500 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #ec4899 100%)' }}>
            <BookOpen size={22} className="text-white relative z-10" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="gradient-text font-black">Book</span>
              <span className="text-slate-100 dark:text-white" style={{ color: 'var(--text-primary)' }}>Verse</span>
            </span>
            <span className="text-[9px] font-black tracking-[0.25em] uppercase mt-1 leading-none text-amber-500 flex items-center gap-1">
              <span>India</span>
              <Sparkles size={8} className="animate-pulse" />
            </span>
          </div>
        </Link>

        {/* Center: Premium Nav Links & Categories Dropdown */}
        <div className="hidden md:flex items-center gap-1.5 relative">
          {navLinks.slice(0, 1).map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="relative px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300"
              style={{
                color: location.pathname === link.to ? '#818cf8' : 'var(--text-secondary)',
              }}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899)' }}
                />
              )}
            </Link>
          ))}

          {/* Mega Menu Category Link */}
          <div ref={megaMenuRef} className="relative">
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 ${
                megaMenuOpen ? 'text-[#818cf8]' : 'text-[var(--text-secondary)]'
              }`}
            >
              <span>Explore Categories</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${megaMenuOpen ? 'rotate-180 text-indigo-400' : ''}`} />
            </button>

            {/* Glass Mega Menu */}
            <AnimatePresence>
              {megaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[340px] rounded-3xl glass shadow-2xl p-4 border border-white/10 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                    <span className="text-xs font-black tracking-wider text-amber-500 uppercase flex items-center gap-1.5">
                      <Compass size={12} />
                      Curated Shelves
                    </span>
                    <span className="text-[10px] text-slate-400">15 Premium Books</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-200 group text-left"
                        style={{
                          background: 'transparent',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                          e.currentTarget.style.paddingLeft = '16px';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.paddingLeft = '12px';
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-indigo-500/10 group-hover:scale-110 transition-transform duration-300">
                            {cat.icon}
                          </span>
                          <div>
                            <p className="font-bold text-sm text-slate-100 group-hover:text-white" style={{ color: 'var(--text-primary)' }}>{cat.label}</p>
                            <p className="text-[10px] text-slate-400" style={{ color: 'var(--text-muted)' }}>Explore Collection</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-400 group-hover:text-amber-400 group-hover:border-amber-500/20">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="relative px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300"
              style={{
                color: location.pathname === link.to ? '#818cf8' : 'var(--text-secondary)',
              }}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899)' }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Center-Right: Premium Interactive Search Overlay */}
        <div ref={searchRef} className="flex-1 max-w-sm relative hidden lg:block z-40">
          <div className="flex items-center gap-3 glass rounded-2xl px-4 py-2.5 transition-all duration-300 border border-white/5 hover:border-indigo-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.08)]">
            <Search size={15} className="text-indigo-400" />
            <input
              type="text"
              placeholder="Search premium titles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-xs font-semibold"
              style={{ color: 'var(--text-primary)' }}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
                <X size={14} className="text-slate-400 hover:text-white" />
              </button>
            )}
          </div>

          {/* Search Dropdown with Motion */}
          <AnimatePresence>
            {searchOpen && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full mt-3 left-0 right-0 rounded-3xl glass p-2 border border-white/10 z-50 shadow-2xl overflow-hidden"
              >
                {searchResults.map(book => (
                  <button
                    key={book.id}
                    onClick={() => {
                      navigate(`/product/${book.id}`);
                      setSearchQuery('');
                      setSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-2.5 rounded-2xl transition-all duration-200 text-left hover:bg-indigo-500/5 group"
                  >
                    <img src={book.cover} alt={book.title}
                      className="w-10 h-14 object-cover rounded-xl shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }}
                    />
                    <div className="flex-1">
                      <p className="font-extrabold text-xs text-slate-100 group-hover:text-white" style={{ color: 'var(--text-primary)' }}>{book.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{book.author}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs font-black text-indigo-400">₹{book.price}</span>
                        <span className="text-[9px] font-black text-amber-500 uppercase bg-amber-500/10 px-1.5 py-0.5 rounded-md">⭐ {book.rating}</span>
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => { navigate('/products'); setSearchOpen(false); }}
                  className="w-full mt-1.5 py-3 rounded-2xl text-center text-xs font-bold text-indigo-300 hover:text-indigo-200 transition-colors"
                  style={{
                    background: 'rgba(99, 102, 241, 0.06)'
                  }}
                >
                  View All Search Results →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/5"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
            title="Toggle color theme"
          >
            {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-400" />}
          </motion.button>

          {/* Wishlist Button */}
          <Link to="/wishlist" className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/5"
              style={{ background: 'rgba(255, 255, 255, 0.03)' }}
              title="View Wishlist"
            >
              <Heart size={17} className="text-pink-400 fill-pink-500/10 hover:fill-pink-500/80 transition-all duration-300" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5.5 h-5.5 rounded-full text-white text-[10px] flex items-center justify-center font-black shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Link>

          {/* Cart Button */}
          <Link to="/cart" className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/5"
              style={{ background: 'rgba(255, 255, 255, 0.03)' }}
              title="View Shopping Cart"
            >
              <ShoppingCart size={17} className="text-indigo-400" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5.5 h-5.5 rounded-full text-white text-[10px] flex items-center justify-center font-black shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Link>

          {/* Premium reader badge */}
          <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
              <ShieldCheck size={14} className="text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-200">Express User</span>
              <span className="text-[8px] font-bold text-slate-400">COD Guarantee</span>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/5"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          >
            {mobileMenuOpen ? <X size={18} className="text-slate-100" /> : <Menu size={18} className="text-slate-100" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 backdrop-blur-2xl"
            style={{
              background: 'var(--bg-secondary)',
            }}
          >
            <div className="container-main py-6 flex flex-col gap-4">
              
              {/* Mobile Search Overlay */}
              <div className="flex items-center gap-3 glass rounded-2xl px-4 py-3 border border-white/5">
                <Search size={15} className="text-indigo-400" />
                <input
                  type="text"
                  placeholder="Search books, authors..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-xs"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1.5">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-4 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-between"
                    style={{
                      color: location.pathname === link.to ? '#818cf8' : 'var(--text-secondary)',
                      background: location.pathname === link.to ? 'rgba(99, 102, 241, 0.06)' : 'transparent',
                    }}
                  >
                    <span>{link.label}</span>
                    <Compass size={14} className="opacity-40" />
                  </Link>
                ))}
              </div>

              {/* Categories Shelf Accordion in Mobile */}
              <div className="px-4 py-3 rounded-2xl bg-white/3 border border-white/5">
                <p className="text-[10px] font-black uppercase text-amber-500 tracking-wider mb-2">Popular Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(1, 5).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(`/products?category=${cat.id}`);
                      }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-white/2 hover:bg-indigo-500/5 text-left border border-white/5"
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span className="text-xs font-bold text-slate-300">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
