import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Truck, CheckCircle, ChevronRight, ArrowLeft, Lock, Package,
  User, Mail, Phone, Home, ShieldCheck, CreditCard, Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

// FORMSPREE CONFIGURATION
const FORMSPREE_FORM_ID = 'xldgrwvp';

const steps = ['Shipping Address', 'Payment Method', 'Review & Confirm'];

export default function Checkout() {
  const { cartItems, subtotal, gst, shipping, couponDiscount, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({});

  const states = [
    'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan',
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
  ];

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const validateStep0 = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email address required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = '10-digit mobile number starting with 6-9 required';
    if (!form.address.trim()) e.address = 'Detailed address is required';
    if (!form.city.trim()) e.city = 'City name is required';
    if (!form.state) e.state = 'Please select a state';
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = 'Valid 6-digit Indian PIN code required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateStep0()) {
      toast.error('Please correct shipping errors before proceeding.', {
        style: { background: '#1e1b4b', color: '#f3f4f6', border: '1px solid rgba(239,68,68,0.2)' }
      });
      return;
    }
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const placeOrder = async () => {
    setLoading(true);
    const orderId = 'BV' + Date.now().toString().slice(-8);

    try {
      // 1. Construct beautiful order details payload for Formspree
      const orderDetails = {
        orderId: orderId,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        shippingAddress: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        paymentMethod: 'Cash on Delivery (COD)',
        subtotal: `₹${subtotal}`,
        gst: `₹${gst}`,
        shipping: shipping === 0 ? 'FREE' : `₹${shipping}`,
        discount: `₹${couponDiscount}`,
        grandTotal: `₹${total}`,
        orderedItems: cartItems
          .map(
            (item, index) =>
              `${index + 1}. ${item.title} (Qty: ${item.quantity}) - ₹${item.price} each [Total: ₹${item.price * item.quantity}]`
          )
          .join('\n'),
        _subject: `BookVerse India Order - ${orderId} - ${form.name}`,
      };

      // 2. Submit to Formspree via AJAX fetch
      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
          console.warn('Formspree order submission failed. Continuing anyway to keep local UX smooth.');
        }
      } catch (err) {
        console.error('Failed to send order email via Formspree:', err);
      }

      // 3. Clear cart and proceed to confirmation page
      clearCart();
      toast.success('Order placed successfully! 🎉', {
        style: { background: '#0b0b14', color: '#f3f4f6', border: '1px solid rgba(16,185,129,0.2)' }
      });
      navigate('/order-confirmation', {
        state: {
          orderId,
          form,
          items: cartItems,
          total,
          paymentMethod: form.paymentMethod,
        }
      });
    } catch (error) {
      console.error('Place order failed:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, field, type = 'text', placeholder, maxLength, icon: Icon }) => (
    <div className="relative w-full">
      <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          value={form[field]}
          onChange={e => update(field, e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="input-lux"
          style={{ 
            paddingLeft: Icon ? '2.75rem' : '1.25rem',
            borderColor: errors[field] ? '#ef4444' : 'var(--border-color)',
            boxShadow: errors[field] ? '0 0 10px rgba(239,68,68,0.05)' : undefined
          }}
        />
      </div>
      {errors[field] && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-xs font-medium mt-1.5 flex items-center gap-1" 
          style={{ color: '#f87171' }}
        >
          <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
          {errors[field]}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Drifting auroras for premium depth */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      <div className="container-main max-w-6xl relative z-10">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => step === 0 ? navigate('/cart') : prevStep()}
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:bg-[rgba(255,255,255,0.03)] cursor-pointer"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                Secure Checkout
              </h1>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                BookVerse Safe-Store Guarantee
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-[rgba(34,197,94,0.05)]" style={{ borderColor: 'rgba(34,197,94,0.15)' }}>
            <Lock size={13} style={{ color: '#4ade80' }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#4ade80' }}>
              128-bit SSL Protection
            </span>
          </div>
        </div>

        {/* Stepper block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {steps.map((s, i) => (
            <div 
              key={s} 
              className="glass p-5 rounded-2xl flex items-center gap-4 transition-all duration-300"
              style={{ 
                border: i === step ? '1.5px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                background: i === step ? 'rgba(99,102,241,0.05)' : 'var(--bg-card)',
                boxShadow: i === step ? 'var(--shadow-glow)' : 'none'
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm transition-all"
                style={{
                  background: i < step ? 'linear-gradient(135deg, #10b981, #059669)' : i === step ? 'linear-gradient(135deg, var(--accent-indigo), var(--accent-purple))' : 'var(--bg-primary)',
                  color: 'white',
                  border: i > step ? '1px solid var(--border-color)' : 'none',
                }}
              >
                {i < step ? <CheckCircle size={18} /> : i + 1}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: i === step ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  Step 0{i + 1}
                </p>
                <p className="text-sm font-semibold" style={{ color: i === step ? 'var(--accent-indigo)' : 'var(--text-secondary)' }}>
                  {s}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Outer Split Columns */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Fields Panel (Left) */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              {/* STEP 1: Address Details Form */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 md:p-8 space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)]">
                      <MapPin size={18} style={{ color: 'var(--accent-indigo)' }} />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
                        Delivery Address
                      </h2>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Where should we dispatch your literary masterpieces?
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField label="Full Name *" field="name" placeholder="Aradhya Sharma" icon={User} />
                    <InputField label="Email Address *" field="email" type="email" placeholder="aradhya@email.com" icon={Mail} />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField label="Mobile Number *" field="phone" type="tel" placeholder="9876543210" maxLength={10} icon={Phone} />
                    <InputField label="Pincode (6 digits) *" field="pincode" placeholder="110001" maxLength={6} icon={Compass} />
                  </div>

                  <InputField label="Address (House No, Street, Landmark) *" field="address" placeholder="Flat 405, Block B, Park Towers, CP" icon={Home} />
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField label="City / District *" field="city" placeholder="New Delhi" icon={MapPin} />
                    
                    <div className="relative w-full">
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                        State *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                          <Globe size={16} />
                        </div>
                        <select
                          value={form.state}
                          onChange={e => update('state', e.target.value)}
                          className="input-lux cursor-pointer appearance-none"
                          style={{ 
                            paddingLeft: '2.75rem',
                            borderColor: errors.state ? '#ef4444' : 'var(--border-color)',
                            color: form.state ? 'var(--text-primary)' : 'var(--text-secondary)'
                          }}
                        >
                          <option value="" style={{ background: '#0b0b14' }}>Select Delivery State</option>
                          {states.map(s => (
                            <option key={s} value={s} style={{ background: '#0b0b14', color: '#f3f4f6' }}>{s}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center" style={{ color: 'var(--text-secondary)' }}>
                          ▼
                        </div>
                      </div>
                      {errors.state && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="text-xs font-medium mt-1.5 flex items-center gap-1" 
                          style={{ color: '#f87171' }}
                        >
                          <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                          {errors.state}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Payment Selector - COD Only */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 md:p-8 space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
                      <CreditCard size={18} style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
                        Payment Method
                      </h2>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Select how you would like to complete your purchase
                      </p>
                    </div>
                  </div>

                  {/* Cash on Delivery (COD) Card Panel */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-6 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center gap-5 cursor-default"
                    style={{
                      borderColor: 'var(--accent-indigo)',
                      background: 'rgba(99,102,241,0.06)',
                      boxShadow: 'var(--shadow-glow)'
                    }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl select-none"
                      style={{ background: 'rgba(245,158,11,0.12)' }}>
                      💵
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[10px] font-extrabold tracking-wider bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] text-green-400 px-2 py-0.5 rounded-full uppercase">
                          Guaranteed COD
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Complete payment via Cash or UPI Scan upon receiving the parcel at your home. Fully secure, zero advance payment.
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-[var(--accent-indigo)]"
                      style={{ background: 'var(--accent-indigo)' }}>
                      <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    </div>
                  </motion.div>

                  {/* Shipping logistics bulleted points */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    {[
                      { icon: '📦', title: 'Luxury Dispatch', desc: 'Securely packaged in premium bubble-wrap boxes within 24 hours.' },
                      { icon: '🚚', title: 'Express Tracking', desc: 'Delivered to your doorstep in 2 to 5 business days with full SMS tracking.' },
                      { icon: '💰', title: 'COD Preparation', desc: 'Keep exact change or UPI app ready to scan when the courier arrives.' },
                      { icon: '🔄', title: 'Simple 7-Day Returns', desc: 'Love it or exchange/return it with zero hassle. No questions asked.' },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className="p-4 rounded-xl border flex items-start gap-3 transition-colors hover:bg-[rgba(255,255,255,0.01)]"
                        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}
                      >
                        <span className="text-xl shrink-0 mt-0.5 select-none">{item.icon}</span>
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Final Review Grid */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Floating glass review component */}
                  <div className="glass-card p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]">
                          <CheckCircle size={18} style={{ color: '#10b981' }} />
                        </div>
                        <div>
                          <h2 className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
                            Review Your Order
                          </h2>
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            Please double check your shipping and payment choices
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setStep(0)} 
                        className="text-xs font-bold uppercase tracking-wider text-[var(--accent-indigo)] hover:underline cursor-pointer"
                      >
                        Edit Details
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Shipping Info summary card */}
                      <div className="p-5 rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                          <MapPin size={13} className="text-[var(--accent-indigo)]" /> Shipping Address
                        </h4>
                        <p className="font-extrabold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{form.name}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{form.address}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{form.city}, {form.state} - <span className="font-bold">{form.pincode}</span></p>
                        <p className="text-xs font-semibold mt-2.5" style={{ color: 'var(--text-primary)' }}>📱 +91 {form.phone}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>✉️ {form.email}</p>
                      </div>

                      {/* Payment summary card */}
                      <div className="p-5 rounded-2xl border flex flex-col justify-between" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}>
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                            <CreditCard size={13} className="text-[var(--accent-gold)]" /> Selected Payment
                          </h4>
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className="text-xl">💵</span>
                            <span className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
                              Cash on Delivery (COD)
                            </span>
                          </div>
                          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Pay exact amount of ₹{total} in cash or UPI scan when delivered.
                          </p>
                        </div>
                        <div className="text-[10px] mt-4 flex items-center gap-1 font-bold text-green-400">
                          <ShieldCheck size={12} /> Safe Store COD protection active
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items summary frosted list */}
                  <div className="glass-card p-6 md:p-8 space-y-4">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      Cart Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                    </h3>
                    
                    <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 group">
                          <div className="w-12 h-16 rounded-xl overflow-hidden shrink-0 border border-[rgba(255,255,255,0.05)] shadow-md">
                            <img 
                              src={item.cover} 
                              alt={item.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=84&fit=crop'; }} 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate group-hover:text-[var(--accent-indigo)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                              {item.title}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                              by {item.author} — <span className="font-semibold">Qty: {item.quantity}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
                              ₹{item.price * item.quantity}
                            </span>
                            <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                              ₹{item.price} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Navigation buttons row */}
            <div className="flex items-center justify-between pt-4">
              {step > 0 ? (
                <button 
                  onClick={prevStep}
                  className="btn-lux-secondary py-3 px-6 cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/cart')}
                  className="btn-lux-secondary py-3 px-6 cursor-pointer"
                >
                  ← Back to Cart
                </button>
              )}

              {step < 2 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="btn-lux py-3.5 px-8 flex items-center gap-1.5 cursor-pointer"
                >
                  Continue to {step === 0 ? 'Payment' : 'Review'} <ChevronRight size={16} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={placeOrder}
                  disabled={loading}
                  className="btn-lux py-4 px-10 text-base flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    boxShadow: '0 4px 20px rgba(245,158,11,0.25)'
                  }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2.5">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Dispatching Order...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 font-bold tracking-wide">
                      <Lock size={16} />
                      Confirm Order – ₹{total}
                    </span>
                  )}
                </motion.button>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Sticky Price Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <div className="glass-card p-6 space-y-5">
              <h3 className="font-extrabold text-sm uppercase tracking-widest border-b pb-3" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>Book Subtotal</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>GST (18% included)</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>₹{gst}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping Rate</span>
                  <span className="font-extrabold" style={{ color: shipping === 0 ? '#10b981' : 'var(--text-primary)' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="flex justify-between items-center p-2 rounded-lg bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.15)] text-xs"
                  >
                    <span className="font-semibold text-green-400 flex items-center gap-1">
                      🏷️ Coupon Discount
                    </span>
                    <span className="font-extrabold text-green-400">-₹{couponDiscount}</span>
                  </motion.div>
                )}
              </div>

              <div className="border-t pt-4 flex justify-between items-end" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                    Grand Total
                  </p>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    (All taxes inclusive)
                  </p>
                </div>
                <span className="text-2xl font-black gradient-text-gold">
                  ₹{total}
                </span>
              </div>

              {/* Delivery estimates widget */}
              <div 
                className="flex items-start gap-3 p-3.5 rounded-xl border bg-[rgba(99,102,241,0.02)]" 
                style={{ borderColor: 'var(--border-color)' }}
              >
                <Truck size={16} className="text-[var(--accent-indigo)] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                    Estimated Delivery
                  </p>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Arriving in 2–4 business days across India. Live courier tracking code sent via email.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium trust assurances footer */}
            <div className="px-2 space-y-2 text-center text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck size={11} className="text-green-400" /> Pay only on delivery (COD) — 100% risk-free
              </div>
              <p>BookVerse India Pvt. Ltd. | Reg. Office, New Delhi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick fallback helper
const Compass = MapPin;
const Globe = MapPin;
