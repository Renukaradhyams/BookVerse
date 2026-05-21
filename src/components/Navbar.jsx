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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(24px)' : 'none' }}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6c3bd5, #f59e0b)' }}>
              <BookOpen size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="gradient-text">BookVerse</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}> India</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-white'
                    : ''
                }`}
                style={{
                  color: location.pathname === link.to ? '#a78bfa' : 'var(--text-secondary)',
                  background: location.pathname === link.to ? 'rgba(108,59,213,0.15)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-md relative hidden md:block">
            <div className="flex items-center gap-2 input-field py-2.5">
              <Search size={16} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-sm"
                style={{ color: 'var(--text-primary)' }}
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
                  <X size={14} style={{ color: 'var(--text-secondary)' }} />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            <AnimatePresence>
              {searchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 left-0 right-0 glass rounded-2xl overflow-hidden shadow-2xl z-50"
                  style={{ border: '1px solid rgba(108,59,213,0.2)' }}
                >
                  {searchResults.map(book => (
                    <button
                      key={book.id}
                      onClick={() => {
                        navigate(`/product/${book.id}`);
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 transition-all duration-200 text-left"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,59,213,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <img src={book.cover} alt={book.title}
                        className="w-10 h-14 object-cover rounded-lg shrink-0"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }}
                      />
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{book.title}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{book.author}</p>
                        <p className="text-sm font-bold mt-1" style={{ color: '#a78bfa' }}>₹{book.price}</p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => { navigate('/products'); setSearchOpen(false); }}
                    className="w-full p-3 text-center text-sm font-medium"
                    style={{ color: '#a78bfa' }}
                  >
                    View all results →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              title="Toggle theme"
            >
              {isDark ? <Sun size={16} style={{ color: '#f59e0b' }} /> : <Moon size={16} style={{ color: '#6c3bd5' }} />}
            </motion.button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              >
                <Heart size={16} style={{ color: '#ec4899' }} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    style={{ background: '#ec4899', fontSize: '10px' }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              >
                <ShoppingCart size={16} style={{ color: '#a78bfa' }} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    style={{ background: '#6c3bd5', fontSize: '10px' }}
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>



            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
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
            className="md:hidden glass border-t"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <div className="container-main py-4 flex flex-col gap-2">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 input-field py-2.5">
                <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Search books..."
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
                  className="px-4 py-3 rounded-xl font-medium text-sm"
                  style={{
                    color: location.pathname === link.to ? '#a78bfa' : 'var(--text-secondary)',
                    background: location.pathname === link.to ? 'rgba(108,59,213,0.15)' : 'transparent',
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
