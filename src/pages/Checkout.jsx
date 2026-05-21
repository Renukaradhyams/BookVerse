import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Truck, CheckCircle, ChevronRight, ArrowLeft, Lock, Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

// FORMSPREE CONFIGURATION: Replace with your real Formspree Form ID
const FORMSPREE_FORM_ID = 'xldgrwvp';

const steps = ['Address', 'Payment', 'Review'];

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
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit mobile number required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state) e.state = 'State is required';
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = 'Valid 6-digit pincode required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateStep0()) return;
    setStep(s => s + 1);
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
        _subject: `New BookVerse India Order - ${orderId} (${form.name})`,
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
          console.warn('Formspree order submission failed. Continuing to success page anyway.');
        }
      } catch (err) {
        console.error('Failed to send order email via Formspree:', err);
      }

      // 3. Clear cart and proceed to confirmation
      clearCart();
      toast.success('Order placed successfully! 🎉', {
        style: { background: '#1a1a2e', color: '#e2e8f0' }
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
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, field, type = 'text', placeholder, maxLength }) => (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={e => update(field, e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="input-field"
        style={{ borderColor: errors[field] ? '#f87171' : undefined }}
      />
      {errors[field] && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors[field]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-main max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => step === 0 ? navigate('/cart') : setStep(s => s - 1)}
            className="flex items-center gap-1 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} />
          </button>
          <h1 className="section-title text-3xl" style={{ color: 'var(--text-primary)' }}>Checkout</h1>
          <div className="flex items-center gap-1 ml-auto">
            <Lock size={14} style={{ color: '#4ade80' }} />
            <span className="text-sm" style={{ color: '#4ade80' }}>Secure Checkout</span>
          </div>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-0 mb-10 glass-card p-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300"
                  style={{
                    background: i < step ? '#22c55e' : i === step ? 'linear-gradient(135deg, #6c3bd5, #8b5cf6)' : 'var(--glass-bg)',
                    color: i <= step ? 'white' : 'var(--text-secondary)',
                    border: i > step ? '1px solid var(--glass-border)' : 'none',
                  }}
                >
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className="text-xs mt-1 font-medium" style={{ color: i === step ? '#a78bfa' : 'var(--text-secondary)' }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 rounded-full"
                  style={{ background: i < step ? '#22c55e' : 'var(--glass-bg)' }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 0: Address */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="glass-card p-6 space-y-4"
                >
                  <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <MapPin size={18} style={{ color: '#6c3bd5' }} />
                    Delivery Address
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Full Name *" field="name" placeholder="Priya Sharma" />
                    <InputField label="Email Address *" field="email" type="email" placeholder="priya@email.com" />
                  </div>
                  <InputField label="Mobile Number *" field="phone" type="tel" placeholder="9876543210" maxLength={10} />
                  <InputField label="Address (House No, Street, Area) *" field="address" placeholder="123, MG Road, Koramangala" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="City *" field="city" placeholder="Bangalore" />
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>State *</label>
                      <select
                        value={form.state}
                        onChange={e => update('state', e.target.value)}
                        className="input-field appearance-none"
                        style={{ borderColor: errors.state ? '#f87171' : undefined, color: 'var(--text-primary)' }}
                      >
                        <option value="" style={{ background: 'var(--bg-secondary)' }}>Select State</option>
                        {states.map(s => (
                          <option key={s} value={s} style={{ background: 'var(--bg-secondary)' }}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.state}</p>}
                    </div>
                  </div>
                  <InputField label="Pincode *" field="pincode" placeholder="560001" maxLength={6} />
                </motion.div>
              )}

              {/* STEP 1: Payment — Cash on Delivery only */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="glass-card p-6"
                >
                  <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Package size={18} style={{ color: '#6c3bd5' }} />
                    Payment Method
                  </h2>

                  {/* COD Card — selected by default, no other options */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl mb-5"
                    style={{
                      border: '2px solid #6c3bd5',
                      background: 'rgba(108,59,213,0.08)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: 'rgba(245,158,11,0.15)' }}>💵</div>
                      <div>
                        <p className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Cash on Delivery</p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Pay in cash when your order arrives at your door</p>
                      </div>
                      <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: '#6c3bd5' }}>
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-3">
                    {[
                      { icon: '📦', text: 'Your books will be packed and dispatched within 24 hours.' },
                      { icon: '🚚', text: 'Estimated delivery: 2–5 business days across India.' },
                      { icon: '💰', text: 'Keep exact change ready. Our delivery partner accepts cash only.' },
                      { icon: '🔄', text: 'Easy 7-day returns if you change your mind.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-lg shrink-0">{item.icon}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Review */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-4"
                >
                  {/* Address Review */}
                  <div className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        <MapPin size={15} style={{ color: '#6c3bd5' }} /> Delivery to
                      </h3>
                      <button onClick={() => setStep(0)} className="text-sm" style={{ color: '#a78bfa' }}>Edit</button>
                    </div>
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{form.name}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{form.address}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{form.city}, {form.state} – {form.pincode}</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>📱 {form.phone}</p>
                  </div>

                  {/* Payment Review */}
                  <div className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        <Package size={15} style={{ color: '#6c3bd5' }} /> Payment Method
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💵</span>
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Cash on Delivery</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Pay when your order is delivered</p>
                      </div>
                    </div>
                  </div>

                  {/* Items Review */}
                  <div className="glass-card p-5">
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {cartItems.length} Items
                    </h3>
                    <div className="space-y-3">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0">
                            <img src={item.cover} alt={item.title} className="w-full h-full object-cover"
                              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=40&h=56&fit=crop'; }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="btn-secondary">
                  ← Back
                </button>
              )}
              <div className="ml-auto">
                {step < 2 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    <span className="flex items-center gap-2">
                      Continue <ChevronRight size={16} />
                    </span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={placeOrder}
                    disabled={loading}
                    className="btn-gold px-8 py-4 text-base"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock size={16} />
                        Place Order – ₹{total}
                      </span>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="glass-card p-5 sticky top-24">
              <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                Order Summary
              </h3>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span style={{ color: 'var(--text-primary)' }}>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>GST (18%)</span>
                  <span style={{ color: 'var(--text-primary)' }}>₹{gst}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#4ade80' : 'var(--text-primary)' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span style={{ color: '#4ade80' }}>Coupon</span>
                    <span style={{ color: '#4ade80' }}>-₹{couponDiscount}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-3 mb-4"
                style={{ borderTop: '1px solid var(--glass-border)' }}>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
                <span className="text-xl font-bold gradient-text-gold">₹{total}</span>
              </div>

              <div className="flex items-center gap-2 text-xs p-2 rounded-xl"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <Truck size={12} style={{ color: '#4ade80' }} />
                <span style={{ color: '#4ade80' }}>Estimated delivery: 2-4 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
