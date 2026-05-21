import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle, Package, Truck, Download, Home,
  ShoppingBag, Star, Share2, Calendar, CreditCard, ShieldCheck
} from 'lucide-react';
import jsPDF from 'jspdf';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, form, items, total, paymentMethod } = location.state || {};

  useEffect(() => {
    if (!orderId) { 
      navigate('/'); 
      return; 
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Header Color band
    doc.setFillColor(79, 70, 229); // Indigo primary
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
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('TAX INVOICE', 130, 50);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text(`Invoice ID: BV-INV-${orderId}`, 14, 50);
    doc.text(`Date of Issue: ${new Date().toLocaleDateString('en-IN')}`, 14, 57);
    doc.text(`Payment Basis: ${paymentMethod?.toUpperCase() || 'COD'}`, 14, 64);

    // Separator line
    doc.setDrawColor(229, 231, 235);
    doc.line(14, 70, 196, 70);

    // Billing address block
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text('Delivered & Billed To:', 14, 80);
    doc.setTextColor(55, 65, 81);
    doc.setFont('helvetica', 'normal');
    doc.text(form?.name || 'Customer', 14, 88);
    doc.text(form?.email || '', 14, 95);
    doc.text(`+91 ${form?.phone || ''}`, 14, 102);
    doc.text(`${form?.address || ''}, ${form?.city || ''}`, 14, 109);
    doc.text(`${form?.state || ''} – ${form?.pincode || ''}`, 14, 116);

    // Items table header row
    doc.setFillColor(243, 244, 246);
    doc.rect(14, 125, 182, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Book Title', 16, 131);
    doc.text('Author', 110, 131);
    doc.text('Qty', 155, 131);
    doc.text('Price Total', 175, 131);

    // Populate rows
    let y = 145;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    (items || []).forEach(item => {
      doc.text(item.title.substring(0, 35), 16, y);
      doc.text(item.author.substring(0, 20), 110, y);
      doc.text(String(item.quantity), 155, y);
      doc.text(`Rs.${item.price * item.quantity}`, 175, y);
      y += 10;
    });

    // Dividers and calculations
    doc.line(14, y + 5, 196, y + 5);
    y += 15;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text(`Subtotal: Rs.${total}`, 140, y);
    y += 8;
    doc.text(`GST Included: Yes`, 140, y);
    y += 8;
    doc.setTextColor(79, 70, 229);
    doc.setFontSize(13);
    doc.text(`GRAND TOTAL: Rs.${total}`, 140, y + 4);

    // Footer info
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for shopping with BookVerse India! Enjoy your readings! 📚✨', 14, 275);
    doc.text('This tax invoice is a secure digital record. Authorized BookVerse India dispatch.', 14, 281);

    doc.save(`BookVerse_TaxInvoice_${orderId}.pdf`);
  };

  const trackingSteps = [
    { icon: CheckCircle, label: 'Order Confirmed & Approved', done: true, time: 'Just now' },
    { icon: Package, label: 'Packed in Luxury Giftbox', done: false, time: 'Within 24 Hours' },
    { icon: Truck, label: 'Dispatched via Express Courier', done: false, time: '2-3 Business Days' },
    { icon: Home, label: 'Delivered at Doorstep', done: false, time: formattedDelivery },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Drifting auroras for premium depth */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      <div className="container-main max-w-3xl relative z-10">
        
        {/* Animated celebration block */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          className="text-center mb-12 space-y-5"
        >
          <div className="relative inline-block">
            {/* Soft glowing structural rings */}
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 1 + i * 0.35, opacity: 0 }}
                transition={{ duration: 2.2, delay: i * 0.4, repeat: Infinity }}
                style={{ background: 'rgba(34,197,94,0.15)' }}
              />
            ))}
            <motion.div
              initial={{ rotate: -90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="w-20 h-20 rounded-full flex items-center justify-center relative z-10 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
            >
              <CheckCircle size={36} className="text-white" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Order Confirmed! 🎉
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Thank you, <span className="font-extrabold text-[var(--accent-indigo)]">{form?.name?.split(' ')[0]}</span>. Your order is registered and prepped for dispatch.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-[rgba(99,102,241,0.06)]" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: 'var(--text-secondary)' }}>Order ID:</span>
            <span className="font-extrabold text-sm" style={{ color: 'var(--accent-indigo)' }}>{orderId}</span>
          </div>
        </motion.div>

        {/* Dynamic delivery dates grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
                <Calendar size={22} style={{ color: 'var(--accent-gold)' }} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                  Estimated Courier Arrival
                </p>
                <p className="text-lg font-extrabold" style={{ color: 'var(--accent-gold)' }}>{formattedDelivery}</p>
              </div>
            </div>
            
            <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>COD Total Due</p>
              <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                ₹{total} <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>({paymentMethod === 'cod' ? 'Cash/UPI' : 'UPI'})</span>
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            <span className="font-semibold">🏠 Destination Address:</span>
            <span className="font-bold text-right" style={{ color: 'var(--text-primary)' }}>
              {form?.address}, {form?.city}, {form?.state} - {form?.pincode}
            </span>
          </div>
        </motion.div>

        {/* Tracking milestones panels */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-6 space-y-6"
        >
          <h3 className="font-extrabold text-sm uppercase tracking-widest flex items-center gap-2 border-b pb-3" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
            <Truck size={16} className="text-[var(--accent-indigo)]" /> Dispatch Timeline
          </h3>

          <div className="relative pl-6 space-y-6 border-l" style={{ borderColor: 'var(--border-color)' }}>
            {trackingSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Glowing vertical marker pins */}
                  <div 
                    className="absolute -left-[37px] w-6 h-6 rounded-lg flex items-center justify-center border transition-all"
                    style={{
                      background: step.done ? 'rgba(16,185,129,0.15)' : 'var(--bg-primary)',
                      borderColor: step.done ? '#10b981' : 'var(--border-color)',
                      color: step.done ? '#10b981' : 'var(--text-muted)'
                    }}
                  >
                    <Icon size={12} />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs" style={{ color: step.done ? '#10b981' : 'var(--text-primary)' }}>
                      {step.label}
                    </h4>
                    <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                      Benchmark: {step.time}
                    </p>
                  </div>
                  
                  {step.done && (
                    <span className="text-[9px] font-black uppercase tracking-wider bg-[rgba(16,185,129,0.1)] text-green-400 border border-[rgba(16,185,129,0.2)] px-2 py-0.5 rounded">
                      Completed
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Purchased Books items list */}
        {items && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 mb-6 space-y-4"
          >
            <h3 className="font-extrabold text-sm uppercase tracking-widest border-b pb-3" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
              Ordered Items
            </h3>
            
            <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0 border shadow">
                    <img src={item.cover} alt={item.title} className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=40&h=56&fit=crop'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>by {item.author} — <span className="font-semibold">Qty: {item.quantity}</span></p>
                  </div>
                  <span className="font-extrabold text-xs" style={{ color: 'var(--text-primary)' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Controls Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadInvoice}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase border shadow cursor-pointer transition-all bg-[rgba(16,185,129,0.06)] border-[rgba(16,185,129,0.25)] hover:bg-[rgba(16,185,129,0.12)] text-green-400"
          >
            <Download size={14} />
            Download PDF Invoice
          </motion.button>

          <Link to="/products" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-lux w-full justify-center py-3.5 text-xs tracking-wider uppercase font-bold cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={14} />
                Continue Exploring
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Micro Rating prompt block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="glass p-5 rounded-2xl mt-8 text-center space-y-3"
          style={{ border: '1px solid rgba(245,158,11,0.25)' }}
        >
          <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>Love shopping at BookVerse India?</p>
          <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Click to rate your concierge experience</p>
          <div className="flex gap-2.5 justify-center">
            {[1, 2, 3, 4, 5].map(s => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                className="text-xl filter drop-shadow cursor-pointer select-none"
              >
                ⭐
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Safe store guarantee badge */}
        <div className="flex items-center justify-center gap-1.5 mt-8 text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>
          <ShieldCheck size={12} className="text-green-400 animate-pulse" /> 100% Secure Transaction. Handled by BookVerse logistics.
        </div>
      </div>
    </div>
  );
}
