import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, Clock, CheckCircle, 
  MessageSquare, HelpCircle, Zap, ShieldCheck 
} from 'lucide-react';

const CONTACT_EMAIL = 'hello@bookverse.in';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please provide your full name';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Please provide a valid email address';
    if (!form.subject.trim()) e.subject = 'Subject heading is required';
    if (form.message.trim().length < 10) e.message = 'Please write a message of at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    // Build mailto link
    const subject = encodeURIComponent(`[BookVerse Contact] ${form.subject}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    );
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Simulate brief loading state then open mail client
    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Official Support Email', value: 'hello@bookverse.in', link: 'mailto:hello@bookverse.in', color: '#6366f1' },
    { icon: Phone, label: 'Toll-Free Helpline', value: '+91 1800-BOOKVERSE', link: 'tel:+911800BOOKVERSE', color: '#f59e0b' },
    { icon: MapPin, label: 'Corporate Headquarters', value: '42, Book Street, CP, New Delhi 110001', link: '#', color: '#ec4899' },
    { icon: Clock, label: 'Operating Business Hours', value: 'Mon – Sat: 9:00 AM – 7:00 PM IST', link: '#', color: '#10b981' },
  ];

  const faqItems = [
    { q: 'How long does shipment delivery take?', a: 'All shipments are prepared and dispatched within 24 hours. Delivery takes 2-4 business days across India depending on the pincode.' },
    { q: 'What is your standard return policy?', a: 'We offer a 100% stress-free 7-day return policy. If you receive a book that is damaged or simply change your mind, we will exchange it or issue a refund immediately.' },
    { q: 'Do you offer international shipping options?', a: 'Currently we deliver all over India with secure tracking. International shipping pipelines are in development and will launch shortly!' },
    { q: 'How do I track my Cash on Delivery order?', a: 'Once dispatched, we email you a custom BookVerse Express tracking link. You can track its live transit from dispatch to your doorstep.' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Drifting auroras for premium depth */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      <div className="container-main max-w-6xl relative z-10">
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-[rgba(99,102,241,0.06)]" style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
            <Zap size={13} style={{ color: 'var(--accent-indigo)' }} />
            <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--accent-indigo)' }}>
              Concierge Desk
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
            We'd Love to <span className="gradient-text">Hear From You</span>
          </h1>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Have a question, feedback, or special book sourcing request? Reach out to our dedicated concierge staff. We are here to help you turn every page.
          </p>
        </motion.div>

        {/* Form & Cards Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20 items-start">
          {/* Contact Form Container (Left Column) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)]">
                  <MessageSquare size={18} style={{ color: 'var(--accent-indigo)' }} />
                </div>
                <div>
                  <h2 className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
                    Send Us a Message
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Direct dispatch to our literary support desk
                  </p>
                </div>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: 'rgba(16,185,129,0.12)' }}>
                    <CheckCircle size={32} style={{ color: '#10b981' }} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Message Prepared! 🎉</h3>
                    <p className="text-xs max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
                      We have launched your default mail app with the fields filled out. Simply click send in your email client!
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-lux-secondary mt-4 cursor-pointer"
                  >
                    Send Another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Priya Sharma"
                        className="input-lux"
                        style={{ borderColor: errors.name ? '#ef4444' : 'var(--border-color)' }}
                      />
                      {errors.name && <p className="text-xs font-medium" style={{ color: '#f87171' }}>{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="priya@email.com"
                        className="input-lux"
                        style={{ borderColor: errors.email ? '#ef4444' : 'var(--border-color)' }}
                      />
                      {errors.email && <p className="text-xs font-medium" style={{ color: '#f87171' }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      Subject Heading *
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => update('subject', e.target.value)}
                      placeholder="e.g. Sourcing request for rare tech journals"
                      className="input-lux"
                      style={{ borderColor: errors.subject ? '#ef4444' : 'var(--border-color)' }}
                    />
                    {errors.subject && <p className="text-xs font-medium" style={{ color: '#f87171' }}>{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Message *
                      </label>
                      <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
                        {form.message.length} / 500
                      </span>
                    </div>
                    <textarea
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      placeholder="How can we assist you today? Please be as detailed as possible."
                      rows={5}
                      maxLength={500}
                      className="input-lux resize-none"
                      style={{ borderColor: errors.message ? '#ef4444' : 'var(--border-color)' }}
                    />
                    {errors.message && <p className="text-xs font-medium" style={{ color: '#f87171' }}>{errors.message}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-lux w-full py-4 text-base flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2.5">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Routing to mail client...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 font-bold tracking-wide">
                        <Send size={15} />
                        Launch Email Client
                      </span>
                    )}
                  </motion.button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold justify-center" style={{ color: 'var(--text-secondary)' }}>
                    <ShieldCheck size={12} className="text-green-400" />
                    We respect your privacy. Form content is opened directly in your personal client.
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Info cards (Right Column) */}
          <div className="lg:col-span-4 space-y-4">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ scale: 1.01, translateY: -2 }}
                  className="glass-card p-5 flex items-start gap-4 block transition-all"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ 
                      background: `${info.color}10`, 
                      borderColor: `${info.color}25` 
                    }}
                  >
                    <Icon size={18} style={{ color: info.color }} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold hover:text-[var(--accent-indigo)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* Quick response benchmarks card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-5 space-y-4"
              style={{ border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                <Zap size={15} style={{ color: '#f59e0b' }} />
                <span className="font-extrabold text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                  Response Timelines
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { channel: 'Official Email Support', time: 'Within 24 Hours' },
                  { channel: 'Concierge Help desk', time: 'Immediate Response' },
                  { channel: 'Rare Book Sourcing', time: '2-3 Business Days' },
                ].map(r => (
                  <div key={r.channel} className="flex justify-between items-center text-xs">
                    <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>{r.channel}</span>
                    <span className="font-extrabold text-[10px] uppercase tracking-wider bg-[rgba(16,185,129,0.1)] text-green-400 px-2 py-0.5 rounded-full">
                      {r.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1 bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.15)] px-3 py-1 rounded-full text-xs">
              <HelpCircle size={13} style={{ color: '#f59e0b' }} />
              <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: '#f59e0b' }}>FAQ</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xs max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Quick answers to standard procedures, shipping protocols, and returns
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-5">
            {faqItems.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 space-y-2 hover:translate-y-0 hover:border-[var(--border-color)] hover:shadow-lux"
              >
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{faq.q}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
