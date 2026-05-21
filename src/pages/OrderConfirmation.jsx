import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle, Package, Truck, Download, Home,
  ShoppingBag, Star, Share2, Calendar, CreditCard
} from 'lucide-react';
import jsPDF from 'jspdf';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, form, items, total, paymentMethod } = location.state || {};
  const confettiRef = useRef(null);

  useEffect(() => {
    if (!orderId) { navigate('/'); return; }
  }, [orderId, navigate]);

  if (!orderId) return null;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(108, 59, 213);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('BookVerse India', 14, 18);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('India\'s Premium Online Bookstore', 14, 26);
    doc.text('hello@bookverse.in | +91 1800-BOOKVERSE', 14, 32);

    // Invoice title
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('TAX INVOICE', 130, 50);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Order ID: ${orderId}`, 14, 50);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 14, 57);
    doc.text(`Payment: ${paymentMethod?.toUpperCase() || 'ONLINE'}`, 14, 64);

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 70, 196, 70);

    // Bill to
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 59, 213);
    doc.text('Bill To:', 14, 80);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(form?.name || 'Customer', 14, 88);
    doc.text(form?.email || '', 14, 95);
    doc.text(form?.phone || '', 14, 102);
    doc.text(`${form?.address || ''}, ${form?.city || ''}`, 14, 109);
    doc.text(`${form?.state || ''} – ${form?.pincode || ''}`, 14, 116);

    // Items Table header
    doc.setFillColor(240, 235, 255);
    doc.rect(14, 125, 182, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('Book Title', 16, 133);
    doc.text('Author', 110, 133);
    doc.text('Qty', 155, 133);
    doc.text('Price', 175, 133);

    // Items
    let y = 148;
    doc.setFont('helvetica', 'normal');
    (items || []).forEach(item => {
      doc.text(item.title.substring(0, 35), 16, y);
      doc.text(item.author.substring(0, 20), 110, y);
      doc.text(String(item.quantity), 155, y);
      doc.text(`Rs.${item.price * item.quantity}`, 175, y);
      y += 10;
    });

    // Totals
    doc.line(14, y + 5, 196, y + 5);
    y += 15;
    doc.setFont('helvetica', 'bold');
    doc.text(`Subtotal: Rs.${total}`, 140, y);
    y += 8;
    doc.text(`GST (18%): Rs.${Math.round(total * 0.18)}`, 140, y);
    y += 8;
    doc.setTextColor(108, 59, 213);
    doc.setFontSize(13);
    doc.text(`TOTAL: Rs.${total}`, 140, y + 4);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for shopping with BookVerse India! Happy Reading! 📚', 14, 280);
    doc.text('This is a computer-generated invoice. No signature required.', 14, 286);

    doc.save(`BookVerse_Invoice_${orderId}.pdf`);
  };

  const trackingSteps = [
    { icon: CheckCircle, label: 'Order Confirmed', done: true, time: 'Just now' },
    { icon: Package, label: 'Being Packed', done: false, time: 'Within 24 hrs' },
    { icon: Truck, label: 'Out for Delivery', done: false, time: '2-4 Business Days' },
    { icon: Home, label: 'Delivered', done: false, time: formattedDelivery },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-main max-w-3xl">

        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center mb-10"
        >
          <div className="relative inline-block mb-6">
            {/* Glow rings */}
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1 + i * 0.4, opacity: 0 }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                style={{ background: 'rgba(34,197,94,0.2)' }}
              />
            ))}
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
            >
              <CheckCircle size={48} className="text-white" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="section-title text-4xl mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Order Placed! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Thank you, <span className="font-semibold" style={{ color: '#a78bfa' }}>{form?.name?.split(' ')[0]}</span>! Your books are on their way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl"
            style={{ background: 'rgba(108,59,213,0.15)', border: '1px solid rgba(108,59,213,0.3)' }}
          >
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Order ID:</span>
            <span className="font-bold text-lg" style={{ color: '#a78bfa' }}>{orderId}</span>
          </motion.div>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-5"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(245,158,11,0.15)' }}>
              <Calendar size={24} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Estimated Delivery
              </p>
              <p className="text-lg font-bold" style={{ color: '#f59e0b' }}>{formattedDelivery}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Delivery to: {form?.address}, {form?.city}, {form?.state} – {form?.pincode}
              </p>
            </div>
            <div className="sm:ml-auto">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Payment</p>
              <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                {paymentMethod === 'cod' ? 'Cash on Delivery' :
                  paymentMethod === 'upi' ? 'UPI' : 'Card'} — ₹{total}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tracking Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 mb-5"
        >
          <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Truck size={18} style={{ color: '#6c3bd5' }} /> Order Tracking
          </h3>
          <div className="space-y-4">
            {trackingSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: step.done ? 'rgba(34,197,94,0.2)' : 'var(--bg-primary)',
                        border: `1px solid ${step.done ? 'rgba(34,197,94,0.4)' : 'var(--border-color)'}`,
                      }}
                    >
                      <Icon size={18} style={{ color: step.done ? '#4ade80' : 'var(--text-secondary)' }} />
                    </div>
                    {i < trackingSteps.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-0.5 h-4"
                        style={{ background: step.done ? '#4ade80' : 'var(--border-color)' }} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-sm" style={{ color: step.done ? '#4ade80' : 'var(--text-primary)' }}>
                      {step.label} {step.done && '✓'}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Ordered Items */}
        {items && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-6 mb-5"
          >
            <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Your Books</h3>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(108,59,213,0.05)', border: '1px solid rgba(108,59,213,0.1)' }}>
                  <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0">
                    <img src={item.cover} alt={item.title} className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=40&h=56&fit=crop'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>by {item.author} × {item.quantity}</p>
                  </div>
                  <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={downloadInvoice}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{
              background: 'rgba(34,197,94,0.15)',
              color: '#4ade80',
              border: '1px solid rgba(34,197,94,0.3)',
            }}
          >
            <Download size={16} />
            Download Invoice
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'BookVerse Order', text: `I just ordered books from BookVerse India! Order: ${orderId}` });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm btn-secondary"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          >
            <Share2 size={16} />
            Share
          </motion.button>

          <Link to="/products" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full justify-center py-3"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={16} />
                Continue Shopping
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Rating Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="glass-card p-5 mt-5 text-center"
          style={{ border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Enjoying BookVerse India?</p>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Rate your experience</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(s => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="text-2xl"
              >
                ⭐
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
