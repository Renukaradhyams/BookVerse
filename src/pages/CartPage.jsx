import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Trash2, Plus, Minus, Tag, Truck,
  ArrowRight, ShoppingBag, ArrowLeft, Shield, Package, X
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

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await new Promise(r => setTimeout(r, 500));
    applyCoupon(couponInput, coupons);
    setCouponLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
            Your Cart is Empty
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
            Looks like you haven't added any books yet. Time to explore!
          </p>
          <Link to="/products">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-primary text-base px-10 py-4">
              <span className="flex items-center gap-2">
                <ShoppingBag size={18} />
                Browse Books
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="section-title text-3xl" style={{ color: 'var(--text-primary)' }}>
            Shopping Cart
          </h1>
          <span className="badge badge-purple">{cartItems.length} items</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-4 flex gap-4"
                >
                  {/* Cover */}
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <div className="w-20 h-28 rounded-xl overflow-hidden">
                      <img src={item.cover} alt={item.title}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=112&fit=crop'; }} />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold leading-tight hover:text-purple-400 transition-colors"
                            style={{ color: 'var(--text-primary)' }}>
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>by {item.author}</p>
                        <span className="badge badge-purple mt-1 inline-block" style={{ fontSize: '0.65rem' }}>{item.genre}</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0"
                        style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>₹{item.price}</span>
                        <span className="text-sm line-through" style={{ color: 'var(--text-secondary)' }}>₹{item.mrp}</span>
                        <span className="discount-badge">{item.discount}%</span>
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-2 glass-card px-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,59,213,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <Minus size={12} style={{ color: 'var(--text-primary)' }} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,59,213,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <Plus size={12} style={{ color: 'var(--text-primary)' }} />
                        </button>
                      </div>
                    </div>

                    {/* Item subtotal */}
                    <p className="text-sm font-semibold mt-2" style={{ color: '#a78bfa' }}>
                      Item total: ₹{item.price * item.quantity}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Coupon Code */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} style={{ color: '#f59e0b' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Apply Coupon Code</h3>
              </div>

              {coupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <div>
                    <p className="font-bold" style={{ color: '#4ade80' }}>{coupon.code}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {coupon.description} — Saved ₹{couponDiscount}
                    </p>
                  </div>
                  <button onClick={removeCoupon}
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g. INDIA20)"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                    className="input-field flex-1 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="btn-primary py-2.5 px-5 text-sm shrink-0"
                  >
                    <span>{couponLoading ? '...' : 'Apply'}</span>
                  </motion.button>
                </div>
              )}

              <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                Try: BOOKVERSE10, INDIA20, FLAT100, NEWUSER, SAVE200
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="glass-card p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-5" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                Order Summary
              </h3>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({cartItems.length} items)</span>
                  <span style={{ color: 'var(--text-primary)' }}>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>GST (18%)</span>
                  <span style={{ color: 'var(--text-primary)' }}>₹{gst}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                    <Truck size={13} />
                    Shipping
                  </span>
                  <span style={{ color: shipping === 0 ? '#4ade80' : 'var(--text-primary)' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Add ₹{499 - subtotal > 0 ? 499 - subtotal : 0} more for free delivery
                  </p>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#4ade80' }}>Coupon Discount</span>
                    <span style={{ color: '#4ade80' }}>-₹{couponDiscount}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 mb-5" style={{ borderTop: '1px solid var(--glass-border)' }}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text-gold">₹{total}</div>
                    {couponDiscount > 0 && (
                      <div className="text-xs" style={{ color: '#4ade80' }}>
                        You save ₹{couponDiscount + (subtotal > 499 ? 49 : 0)}!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-gold w-full justify-center py-4 text-base mb-3"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/products">
                <button className="btn-secondary w-full justify-center py-3 text-sm">
                  Continue Shopping
                </button>
              </Link>

              {/* Guarantees */}
              <div className="mt-5 pt-5 space-y-2" style={{ borderTop: '1px solid var(--glass-border)' }}>
                {[
                  { icon: Shield, text: '100% Secure Checkout' },
                  { icon: Package, text: 'Easy 7-day Returns' },
                  { icon: Truck, text: 'Fast & Reliable Delivery' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <Icon size={12} style={{ color: '#4ade80' }} />
                    {text}
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
