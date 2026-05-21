import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Trash2, Plus, Minus, Tag, Truck,
  ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck, Package, X, Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { coupons } from '../data/books';

export default function CartPage() {
  const {
    cartItems, removeFromCart, updateQuantity, subtotal, gst, shipping,
    coupon, couponDiscount, total, applyCoupon, removeCoupon
  } = useCart();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await new Promise(r => setTimeout(r, 600));
    applyCoupon(couponInput, coupons);
    setCouponLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="aurora-bg">
          <div className="aurora-blob aurora-1" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center glass-card p-12 max-w-md border border-white/5 relative z-10"
        >
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="text-2xl font-black mb-3 text-slate-100" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Your Shopping Cart is Empty
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-8">
            You haven't reserved any premium volumes yet. Explore our curated collections to start building your personal library today.
          </p>
          <Link to="/products">
            <motion.button 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }} 
              className="btn-lux px-8 py-3 text-xs"
            >
              <ShoppingBag size={14} />
              <span>Explore Curation Shelf</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background Animated Aurora Lights */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-2" style={{ width: '450px', height: '450px' }} />
      </div>

      <div className="container-main relative z-10">
        
        {/* Header Title Section */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-white/5 mb-10 text-left">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/products')} className="w-10 h-10 rounded-xl bg-white/3 hover:bg-white/5 flex items-center justify-center transition-colors">
              <ArrowLeft size={16} className="text-slate-300" />
            </button>
            <div>
              <h1 className="font-extrabold tracking-tight leading-tight text-slate-100 text-2xl md:text-3xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Shopping Cart
              </h1>
              <p className="text-xs text-slate-400 mt-1">Review items selected for purchase</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
            {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} Reserved Copies
          </span>
        </div>

        {/* Dual-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Reserved Items list */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <AnimatePresence mode="popLayout">
              {cartItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60, height: 0, marginBottom: 0, padding: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-5 flex flex-col sm:flex-row gap-5 items-center justify-between border border-white/5 hover:border-indigo-500/15"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                    {/* Rounded Image cover */}
                    <Link to={`/product/${item.id}`} className="shrink-0 block">
                      <div className="w-16 h-24 rounded-xl overflow-hidden shadow-md border border-white/10">
                        <img src={item.cover} alt={item.title}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }} />
                      </div>
                    </Link>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">{item.genre}</span>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-extrabold text-sm text-slate-100 mt-1 truncate hover:text-indigo-300 transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">by {item.author}</p>
                      
                      {/* Price tag */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-base font-black text-slate-100">₹{item.price}</span>
                        {item.mrp > item.price && (
                          <span className="text-xs line-through text-slate-500 font-bold">₹{item.mrp}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Row Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    
                    {/* Item deletion trash */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-rose-400 transition-all cursor-pointer sm:order-2"
                      title="Discard Item"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* Qty increment block */}
                    <div className="flex items-center bg-white/3 border border-white/5 rounded-xl p-0.5 sm:order-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-slate-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-slate-400 sm:order-3">
                      Subtotal: <span className="text-indigo-400 font-black">₹{item.price * item.quantity}</span>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Coupon Entry box */}
            <div className="glass-card p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={15} className="text-amber-500" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-200">Leverage Coupon Discount</h3>
              </div>

              {coupon ? (
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-left">
                    <p className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                      <Sparkles size={11} />
                      {coupon.code} ACTIVE
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {coupon.description} — Deduction savings of <span className="text-emerald-400 font-bold">₹{couponDiscount}</span>
                    </p>
                  </div>
                  <button onClick={removeCoupon}
                    className="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 flex items-center justify-center text-rose-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2.5">
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g. INDIA20)"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                    className="input-lux text-xs font-bold"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="btn-lux py-3 px-6 text-xs shrink-0"
                  >
                    <span>{couponLoading ? 'Validating...' : 'Apply Code'}</span>
                  </motion.button>
                </div>
              )}

              <p className="text-[10px] text-slate-400 font-semibold mt-3 text-left">
                Available Promos: <span className="text-indigo-400 font-bold">BOOKVERSE10</span>, <span className="text-indigo-400 font-bold">INDIA20</span>, <span className="text-indigo-400 font-bold">FLAT100</span>, <span className="text-indigo-400 font-bold">NEWUSER</span>, <span className="text-indigo-400 font-bold">SAVE200</span>
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary block */}
          <div className="lg:col-span-4 text-left">
            <div className="glass-card p-6 sticky top-24 border border-white/5">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-200 mb-6 pb-3 border-b border-white/5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>Cart Items Subtotal</span>
                  <span className="text-slate-200">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>GST & Service Surcharge (18%)</span>
                  <span className="text-slate-200">₹{gst}</span>
                </div>
                
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Truck size={13} className="text-indigo-400" />
                    Express Dispatch
                  </span>
                  <span className={shipping === 0 ? 'text-emerald-400 font-black' : 'text-slate-200'}>
                    {shipping === 0 ? 'FREE DELIVERY' : `₹${shipping}`}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <p className="text-[10px] font-bold text-amber-500 bg-amber-500/5 px-2.5 py-1.5 rounded-lg">
                    Add ₹{499 - subtotal} more to unlock Free Delivery!
                  </p>
                )}
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-xs font-black text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/15">
                    <span>Coupon Savings</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-5 border-t border-white/5 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-sm uppercase text-slate-300">Net Payable</span>
                  <div className="text-right">
                    <div className="text-2xl font-black gradient-text-gold font-sans">₹{total}</div>
                    {couponDiscount > 0 && (
                      <span className="text-[10px] font-black text-emerald-400 block mt-1">
                        You saved ₹{couponDiscount + (shipping === 0 ? 49 : 0)}!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Instant COD CTA */}
              <div className="space-y-3">
                <Link to="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-lux w-full py-4 text-xs shadow-xl justify-center font-black"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </Link>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-lux-secondary w-full py-3.5 text-xs justify-center font-bold"
                  >
                    <span>Continue Shopping</span>
                  </motion.button>
                </Link>
              </div>

              {/* Secure Checkout Trust details */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
                {[
                  { icon: ShieldCheck, text: 'Pure Cash On Delivery Guarantee' },
                  { icon: Package, text: 'Frosted Custom Damage-Proof Case Pack' },
                  { icon: Truck, text: 'Express Delivery via Local Air Dispatch' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-[10px] font-bold text-slate-400">
                    <Icon size={14} className="text-emerald-400 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
