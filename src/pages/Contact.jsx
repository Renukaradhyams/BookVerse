import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, MessageSquare, HelpCircle, Zap } from 'lucide-react';

const CONTACT_EMAIL = 'hello@bookverse.in';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    // Build mailto link — opens user's default email app with form pre-filled
    const subject = encodeURIComponent(`[BookVerse Contact] ${form.subject}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    );
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Simulate a brief loading state then open mail client
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
    { icon: Mail, label: 'Email', value: 'hello@bookverse.in', link: 'mailto:hello@bookverse.in', color: '#6c3bd5' },
    { icon: Phone, label: 'Phone', value: '+91 1800-BOOKVERSE', link: 'tel:+911800BOOKVERSE', color: '#f59e0b' },
    { icon: MapPin, label: 'Office', value: '42, Book Street, Connaught Place, New Delhi 110001', link: '#', color: '#ec4899' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9AM–7PM IST', link: '#', color: '#4ade80' },
  ];

  const faqItems = [
    { q: 'How long does delivery take?', a: 'Standard delivery takes 2-5 business days. Express delivery (1-2 days) is available in metro cities.' },
    { q: 'What is your return policy?', a: 'We offer hassle-free 7-day returns for all books in original condition. Return shipping is free.' },
    { q: 'Do you offer international shipping?', a: 'Currently we ship across all 29 states of India. International shipping is coming soon!' },
    { q: 'How can I track my order?', a: 'You will receive a tracking link via email/SMS once your order is shipped.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-main">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="badge badge-purple">📬 Get in Touch</span>
          </div>
          <h1 className="section-title mb-3" style={{ color: 'var(--text-primary)' }}>
            We'd Love to Hear From You
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Have a question, suggestion, or just want to talk books? Our team is here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8"
            >
              <h2 className="font-bold text-xl mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <MessageSquare size={20} style={{ color: '#6c3bd5' }} />
                Send Us a Message
              </h2>

              {status === 'success' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(34,197,94,0.15)' }}>
                    <CheckCircle size={40} style={{ color: '#4ade80' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Thanks for reaching out! We'll respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-primary mt-6"
                  >
                    <span>Send Another</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Priya Sharma"
                        className="input-field"
                        style={{ borderColor: errors.name ? '#f87171' : undefined }}
                      />
                      {errors.name && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="priya@email.com"
                        className="input-field"
                        style={{ borderColor: errors.email ? '#f87171' : undefined }}
                      />
                      {errors.email && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => update('subject', e.target.value)}
                      placeholder="How can we help you?"
                      className="input-field"
                      style={{ borderColor: errors.subject ? '#f87171' : undefined }}
                    />
                    {errors.subject && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      placeholder="Tell us more about your query..."
                      rows={5}
                      className="input-field resize-none"
                      style={{ borderColor: errors.message ? '#f87171' : undefined }}
                    />
                    <div className="flex justify-between">
                      {errors.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.message}</p>}
                      <p className="text-xs ml-auto mt-1" style={{ color: 'var(--text-secondary)' }}>{form.message.length}/500</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center py-4 text-base"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        Send Message
                      </span>
                    )}
                  </motion.button>

                  <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                    🔒 Your information is secure and will never be shared.
                  </p>
                </form>
              )}
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-5 flex items-start gap-4 block"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}
                  >
                    <Icon size={20} style={{ color: info.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{info.label}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{info.value}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Response time */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-5"
              style={{ border: '1px solid rgba(108,59,213,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} style={{ color: '#f59e0b' }} />
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Fast Response</span>
              </div>
              <div className="space-y-2">
                {[
                  { channel: 'Email', time: '< 24 hours' },
                  { channel: 'Chat', time: '< 2 hours' },
                  { channel: 'Phone', time: 'Immediate' },
                ].map(r => (
                  <div key={r.channel} className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-secondary)' }}>{r.channel}</span>
                    <span className="font-medium" style={{ color: '#4ade80' }}>{r.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle size={16} style={{ color: '#f59e0b' }} />
              <span className="badge badge-gold">FAQ</span>
            </div>
            <h2 className="section-title text-2xl" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {faqItems.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
              >
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
