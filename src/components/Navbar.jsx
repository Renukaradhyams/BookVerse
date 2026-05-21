import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, Heart, ShoppingCart, Sun, Moon,
  Menu, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { books } from '../data/books';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Books' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)'
      }}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20 gap-6">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #6c3bd5, #f59e0b)' }}>
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-xl tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                <span style={{ color: 'var(--accent-purple)' }}>Book</span>
                <span style={{ color: 'var(--text-primary)' }}>Verse</span>
                <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 600, marginLeft: '4px' }}>INDIA</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3.5 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-200"
                style={{
                  color: location.pathname === link.to ? 'var(--accent-purple)' : 'var(--text-secondary)',
                  background: location.pathname === link.to ? 'rgba(108,59,213,0.08)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Expanded Center Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-lg relative hidden md:block">
            <div className="flex items-center gap-2.5 input-field py-2">
              <Search size={16} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search over 10,000+ books, authors, genres..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
                  <X size={14} style={{ color: 'var(--text-secondary)' }} />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 right-0 rounded-xl overflow-hidden shadow-2xl z-50"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {searchResults.map(book => (
                    <button
                      key={book.id}
                      onClick={() => {
                        navigate(`/product/${book.id}`);
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                      className="w-full flex items-center gap-3.5 p-3.5 transition-all duration-150 text-left border-b"
                      style={{
                        borderColor: 'var(--border-color)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(108,59,213,0.06)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <img src={book.cover} alt={book.title}
                        className="w-10 h-14 object-cover rounded-md shrink-0 shadow-sm"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }}
                      />
                      <div>
                        <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{book.title}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{book.author}</p>
                        <p className="text-sm font-extrabold mt-1" style={{ color: 'var(--accent-purple)' }}>₹{book.price}</p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => { navigate('/products'); setSearchOpen(false); }}
                    className="w-full py-3.5 text-center text-sm font-bold transition-colors"
                    style={{
                      color: 'var(--accent-purple)',
                      background: 'rgba(108,59,213,0.04)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,59,213,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(108,59,213,0.04)'}
                  >
                    View All Search Results →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
              title="Toggle theme"
            >
              {isDark ? <Sun size={17} style={{ color: '#f59e0b' }} /> : <Moon size={17} style={{ color: '#6c3bd5' }} />}
            </motion.button>

            {/* Wishlist Icon */}
            <Link to="/wishlist">
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                title="Wishlist"
              >
                <Heart size={17} style={{ color: '#ec4899' }} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-extrabold shadow-sm"
                    style={{ background: '#ec4899', fontSize: '9px' }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart">
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                title="Cart"
              >
                <ShoppingCart size={17} style={{ color: 'var(--accent-purple)' }} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-extrabold shadow-sm"
                    style={{ background: 'var(--accent-purple)', fontSize: '9px' }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="container-main py-5 flex flex-col gap-3.5">
              {/* Mobile Search */}
              <div className="flex items-center gap-2.5 input-field py-2.5">
                <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Search books, authors..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-sm"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 rounded-lg font-bold text-sm transition-all"
                  style={{
                    color: location.pathname === link.to ? 'var(--accent-purple)' : 'var(--text-secondary)',
                    background: location.pathname === link.to ? 'rgba(108,59,213,0.06)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
