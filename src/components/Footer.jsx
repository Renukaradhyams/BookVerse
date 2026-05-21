import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Mail, Phone, MapPin, Globe, MessageCircle, Users, Play,
  ArrowRight, Heart, Sparkles
} from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'All Books' },
    { to: '/products?category=bestseller', label: 'Bestsellers' },
    { to: '/products?category=new', label: 'New Arrivals' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const categories = [
    { to: '/products?category=self-help', label: 'Self-Help' },
    { to: '/products?category=finance', label: 'Finance' },
    { to: '/products?category=technology', label: 'Technology' },
    { to: '/products?category=fiction', label: 'Fiction' },
    { to: '/products?category=business', label: 'Business' },
  ];

  const socialLinks = [
    { icon: Globe, href: '#', color: '#E1306C', label: 'Instagram' },
    { icon: MessageCircle, href: '#', color: '#1DA1F2', label: 'Twitter' },
    { icon: Users, href: '#', color: '#4267B2', label: 'Facebook' },
    { icon: Play, href: '#', color: '#FF0000', label: 'YouTube' },
  ];

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      {/* Newsletter */}
      <div className="py-12"
        style={{ background: 'linear-gradient(135deg, rgba(108,59,213,0.1), rgba(245,158,11,0.05))' }}>
        <div className="container-main">
          <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Sparkles size={18} style={{ color: '#f59e0b' }} />
                <span className="text-sm font-semibold badge badge-gold">Newsletter</span>
              </div>
              <h3 className="section-title text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                Get Book Recommendations
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Join 50,000+ readers. Get weekly picks, exclusive deals & author spotlights.
              </p>
            </div>
            <div className="flex-1 w-full md:max-w-md">
              <form onSubmit={e => e.preventDefault()} className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-field flex-1"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-gold shrink-0 px-5"
                >
                  <ArrowRight size={18} />
                </motion.button>
              </form>
              <p className="text-xs mt-2 text-center md:text-left" style={{ color: 'var(--text-secondary)' }}>
                No spam, unsubscribe anytime. 🔒
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6c3bd5, #f59e0b)' }}>
                  <BookOpen size={18} className="text-white" />
                </div>
                <span className="font-bold text-xl gradient-text" style={{ fontFamily: 'Playfair Display, serif' }}>
                  BookVerse India
                </span>
              </Link>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                India's most premium online bookstore. Discover stories, knowledge, and ideas that transform your world.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, color, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = color + '20'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'var(--glass-bg)'; }}
                    aria-label={label}
                  >
                    <Icon size={16} style={{ color }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map(link => (
                  <li key={link.to}>
                    <Link to={link.to}
                      className="text-sm flex items-center gap-2 transition-colors duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      <ArrowRight size={12} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Categories</h4>
              <ul className="space-y-2.5">
                {categories.map(cat => (
                  <li key={cat.to}>
                    <Link to={cat.to}
                      className="text-sm flex items-center gap-2 transition-colors duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      <ArrowRight size={12} />
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#a78bfa' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    42, Book Street, Connaught Place<br />New Delhi, 110001, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} style={{ color: '#a78bfa' }} />
                  <a href="tel:+911800BOOKVERSE" className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}>+91 1800-BOOKVERSE</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} style={{ color: '#a78bfa' }} />
                  <a href="mailto:hello@bookverse.in" className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}>hello@bookverse.in</a>
                </li>
              </ul>

              {/* Payment badges */}
              <div className="mt-6">
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                  SECURE PAYMENT
                </p>
                <div className="flex flex-wrap gap-2">
                  {['UPI', 'VISA', 'MC', 'RuPay', 'COD'].map(p => (
                    <span key={p}
                      className="text-xs px-2 py-1 rounded-md font-bold"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              © 2024 BookVerse India. Made with <Heart size={12} className="inline text-pink-500 fill-pink-500" /> in India.
            </p>
            <div className="flex gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Shipping Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
