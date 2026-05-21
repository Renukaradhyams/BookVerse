import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, List } from 'lucide-react';
import BookCard from '../components/BookCard';
import { books, categories } from '../data/books';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'discount', label: 'Biggest Discount' },
];

export default function Products() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const filtered = useMemo(() => {
    let result = [...books];
    if (search) {
      result = result.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase()) ||
        b.genre.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      result = result.filter(b => b.category === selectedCategory);
    }
    result = result.filter(b => b.price >= priceRange[0] && b.price <= priceRange[1]);
    result = result.filter(b => b.rating >= minRating);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
    }
    return result;
  }, [search, selectedCategory, sortBy, priceRange, minRating]);

  const Sidebar = () => (
    <div className="glass-card p-6 sticky top-24">
      <h3 className="font-bold mb-5" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>
        Filter Books
      </h3>

      {/* Categories */}
      <div className="mb-6">
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>CATEGORY</p>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200"
              style={{
                background: selectedCategory === cat.id ? 'rgba(108,59,213,0.15)' : 'transparent',
                color: selectedCategory === cat.id ? '#a78bfa' : 'var(--text-secondary)',
                border: selectedCategory === cat.id ? '1px solid rgba(108,59,213,0.3)' : '1px solid transparent',
              }}
            >
              <span className="flex items-center gap-2">{cat.icon} {cat.label}</span>
              <span className="text-xs glass px-2 py-0.5 rounded-full">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>PRICE RANGE</p>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>₹{priceRange[0]}</span>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>–</span>
          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>₹{priceRange[1]}</span>
        </div>
        <input type="range" min="0" max="2000" value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-purple-600" style={{ accentColor: '#6c3bd5' }}
        />
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>MIN RATING</p>
        <div className="space-y-1">
          {[0, 4, 4.5, 4.7, 4.9].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200"
              style={{
                background: minRating === r ? 'rgba(245,158,11,0.15)' : 'transparent',
                color: minRating === r ? '#fbbf24' : 'var(--text-secondary)',
              }}
            >
              <span>{'⭐'.repeat(r === 0 ? 1 : Math.floor(r))}</span>
              <span>{r === 0 ? 'All Ratings' : `${r}+ stars`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => { setSelectedCategory('all'); setPriceRange([0, 2000]); setMinRating(0); setSearch(''); }}
        className="w-full btn-secondary text-sm py-2"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="section-title mb-2" style={{ color: 'var(--text-primary)' }}>
            All Books
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Showing <span className="font-semibold" style={{ color: '#a78bfa' }}>{filtered.length}</span> books
          </p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="flex-1 min-w-60 flex items-center gap-2 input-field py-2.5">
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search by title, author, genre..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-sm"
              style={{ color: 'var(--text-primary)' }}
            />
            {search && <button onClick={() => setSearch('')}><X size={14} style={{ color: 'var(--text-secondary)' }} /></button>}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-field py-2.5 pr-8 appearance-none cursor-pointer text-sm"
              style={{ color: 'var(--text-primary)', minWidth: '180px' }}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}
                  style={{ background: 'var(--bg-secondary)' }}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--text-secondary)' }} />
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 glass-card p-1">
            <button
              onClick={() => setViewMode('grid')}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: viewMode === 'grid' ? 'rgba(108,59,213,0.3)' : 'transparent',
                color: viewMode === 'grid' ? '#a78bfa' : 'var(--text-secondary)'
              }}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: viewMode === 'list' ? 'rgba(108,59,213,0.3)' : 'transparent',
                color: viewMode === 'list' ? '#a78bfa' : 'var(--text-secondary)'
              }}
            >
              <List size={15} />
            </button>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 btn-secondary py-2.5 px-4 text-sm"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto p-4"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <div className="flex items-center justify-between mb-4 pt-4">
                  <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Filters</h3>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X size={20} style={{ color: 'var(--text-primary)' }} />
                  </button>
                </div>
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Books Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No books found</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters.</p>
              </motion.div>
            ) : (
              <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                <AnimatePresence mode="popLayout">
                  {filtered.map((book, i) => (
                    <motion.div
                      key={book.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookCard book={book} index={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
