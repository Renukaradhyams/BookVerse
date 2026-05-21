import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, List, Star, Compass } from 'lucide-react';
import BookCard from '../components/BookCard';
import { books, categories } from '../data/books';

const sortOptions = [
  { value: 'featured', label: 'Featured Collections' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Editorial Rating' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'discount', label: 'Highest Discounts' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extract state from query params
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'featured';
  const priceParam = parseInt(searchParams.get('max_price') || '2000');
  const ratingParam = parseFloat(searchParams.get('rating') || '0');

  // Page level filter states
  const [search, setSearch] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [priceRange, setPriceRange] = useState([0, priceParam]);
  const [minRating, setMinRating] = useState(ratingParam);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Synchronize internal states with URL parameter modifications
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  // Update query params when state changes
  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === 'all' || value === '' || value === 0 || value === 'featured') {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    updateParams({ category: catId });
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    updateParams({ q: val });
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    updateParams({ sort: val });
  };

  const handlePriceChange = (val) => {
    setPriceRange([priceRange[0], val]);
    updateParams({ max_price: val });
  };

  const handleRatingChange = (val) => {
    setMinRating(val);
    updateParams({ rating: val });
  };

  const resetAllFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSortBy('featured');
    setPriceRange([0, 2000]);
    setMinRating(0);
    setSearchParams(new URLSearchParams());
  };

  // Perform core listings calculations
  const filtered = useMemo(() => {
    let result = [...books];
    
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
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

  // Sidebar Sub-component
  const Sidebar = () => (
    <div className="glass-card p-6 sticky top-24 border border-white/5 flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-100 flex items-center gap-2">
          <Compass size={14} className="text-indigo-400" />
          Filter Library
        </h3>
        {(selectedCategory !== 'all' || search !== '' || priceRange[1] !== 2000 || minRating !== 0) && (
          <button onClick={resetAllFilters} className="text-[10px] font-black uppercase text-indigo-400 hover:text-indigo-300">
            Clear All
          </button>
        )}
      </div>

      {/* Categories Shelf */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3" style={{ color: 'var(--text-secondary)' }}>CURATED GENRES</p>
        <div className="flex flex-col gap-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-300 group"
              style={{
                background: selectedCategory === cat.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                color: selectedCategory === cat.id ? '#a78bfa' : 'var(--text-secondary)',
                border: selectedCategory === cat.id ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid transparent',
              }}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-sm group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                <span className="font-bold">{cat.label}</span>
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider Overhaul */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400" style={{ color: 'var(--text-secondary)' }}>MAX PRICE</p>
          <span className="text-xs font-black text-indigo-400">₹{priceRange[1]}</span>
        </div>
        <div className="px-1 py-2">
          <input
            type="range"
            min="200"
            max="2000"
            step="50"
            value={priceRange[1]}
            onChange={e => handlePriceChange(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            style={{ accentColor: '#6366f1' }}
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-bold mt-2">
            <span>₹200</span>
            <span>₹1,000</span>
            <span>₹2,000</span>
          </div>
        </div>
      </div>

      {/* Rating Filters */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3" style={{ color: 'var(--text-secondary)' }}>MINIMUM RATING</p>
        <div className="flex flex-col gap-1">
          {[0, 4.5, 4.7, 4.9].map(r => (
            <button
              key={r}
              onClick={() => handleRatingChange(r)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-300"
              style={{
                background: minRating === r ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                color: minRating === r ? '#fbbf24' : 'var(--text-secondary)',
                border: minRating === r ? '1px solid rgba(245, 158, 11, 0.15)' : '1px solid transparent',
              }}
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(st => (
                  <Star key={st} size={9} fill={r !== 0 && st <= Math.floor(r) ? '#fbbf24' : 'none'}
                    className={r !== 0 && st <= Math.floor(r) ? 'text-amber-500' : 'text-slate-600'} />
                ))}
              </div>
              <span className="font-bold">{r === 0 ? 'All Star Ratings' : `${r}+ Stars`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background Animated Aurora Lights */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" style={{ width: '400px', height: '400px' }} />
        <div className="aurora-blob aurora-2" style={{ width: '400px', height: '400px' }} />
      </div>

      <div className="container-main relative z-10">
        
        {/* Header Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 mb-3">
            <Compass size={11} />
            Library Vault
          </div>
          <h1 className="font-extrabold tracking-tight leading-none text-slate-100 mb-3 text-3xl md:text-4xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Curated Library shelf
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            Explore <span className="text-indigo-400 font-black">{filtered.length}</span> luxury paperbacks matching your criteria
          </p>
        </motion.div>

        {/* Filters Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl glass border border-white/5 mb-8">
          
          {/* Search box overlay */}
          <div className="flex-1 min-w-[240px] flex items-center gap-3 bg-white/3 border border-white/5 rounded-2xl px-4 py-2.5 focus-within:border-indigo-500/30 transition-all duration-300">
            <Search size={14} className="text-indigo-400 shrink-0" />
            <input
              type="text"
              placeholder="Search author, title, genre..."
              value={search}
              onChange={e => handleSearchChange(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-xs font-semibold"
              style={{ color: 'var(--text-primary)' }}
            />
            {search && (
              <button onClick={() => handleSearchChange('')}>
                <X size={14} className="text-slate-400 hover:text-white" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={e => handleSortChange(e.target.value)}
              className="appearance-none bg-white/3 border border-white/5 text-slate-200 pl-4 pr-10 py-2.5 rounded-2xl text-xs font-bold focus:outline-none focus:border-indigo-500/30 cursor-pointer min-w-[190px]"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value} style={{ background: '#0b0b14', color: '#cbd5e1' }}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Layout / Toggle modes */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-white/3 border border-white/5 p-1 rounded-2xl shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: viewMode === 'grid' ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: viewMode === 'grid' ? '#a78bfa' : 'var(--text-secondary)'
                }}
                title="Grid View"
              >
                <Grid3X3 size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: viewMode === 'list' ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: viewMode === 'list' ? '#a78bfa' : 'var(--text-secondary)'
                }}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white/3 border border-white/5 py-2.5 px-4 rounded-2xl text-xs font-bold text-slate-200"
            >
              <SlidersHorizontal size={14} className="text-indigo-400" />
              <span>Filters</span>
            </button>
          </div>

        </div>

        {/* Product Shelf Grid Layout */}
        <div className="flex gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <Sidebar />
          </div>

          {/* Mobile Filter Sidebar Drawer */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] p-5 lg:hidden overflow-y-auto"
                  style={{ background: '#0b0b14', borderRight: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-100">Filters</h3>
                    <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                      <X size={16} className="text-slate-200" />
                    </button>
                  </div>
                  <Sidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Grid Shelf Output */}
          <div className="flex-grow">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-16 text-center border border-white/5 rounded-[24px]"
              >
                <div className="text-5xl mb-4 animate-bounce">📚</div>
                <h3 className="text-lg font-extrabold text-slate-200 mb-2">No matching works located</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Try adjusting your search criteria, reducing rating requirements, or expanding your price ceilings.
                </p>
                <button onClick={resetAllFilters} className="btn-lux mt-6 px-6 py-2.5 text-xs">
                  Reset All Options
                </button>
              </motion.div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'flex flex-col gap-5 text-left'
              }>
                <AnimatePresence mode="popLayout">
                  {filtered.map((book, i) => {
                    if (viewMode === 'grid') {
                      return <BookCard key={book.id} book={book} index={i} />;
                    }
                    
                    // Detailed List Row configuration
                    return (
                      <motion.div
                        key={book.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.4 }}
                        className="glass-card p-5 flex flex-col sm:flex-row gap-5 items-center justify-between border border-white/5 hover:border-indigo-500/20 rounded-[24px]"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-5 flex-1 min-w-0">
                          <img
                            src={book.cover}
                            alt=""
                            className="w-20 h-28 object-cover rounded-xl shrink-0 shadow-lg border border-white/10"
                            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }}
                          />
                          <div className="flex-1 min-w-0 text-center sm:text-left">
                            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400">{book.genre}</span>
                            <h3 className="font-extrabold text-base text-slate-100 mt-1 truncate">{book.title}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">by {book.author}</p>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed max-w-xl">{book.description}</p>
                          </div>
                        </div>

                        {/* Price & Cart Actions right block */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t border-white/5 sm:border-0">
                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-lg font-black text-indigo-400 block">₹{book.price}</span>
                            {book.discount > 0 && <span className="text-[10px] font-black text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded-md mt-1 inline-block uppercase">{book.discount}% OFF</span>}
                          </div>
                          <Link to={`/product/${book.id}`} className="shrink-0">
                            <button className="btn-lux text-xs py-2 px-5 rounded-xl">
                              Explore Edition
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
