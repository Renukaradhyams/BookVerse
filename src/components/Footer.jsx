import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Mail, Phone, MapPin, ArrowRight, Heart, Sparkles, ShieldCheck
} from 'lucide-react';

const InstagramIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const FacebookIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

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
    { icon: InstagramIcon, href: '#', color: '#E1306C', label: 'Instagram' },
    { icon: TwitterIcon, href: '#', color: '#1DA1F2', label: 'Twitter' },
    { icon: FacebookIcon, href: '#', color: '#4267B2', label: 'Facebook' },
    { icon: YoutubeIcon, href: '#', color: '#FF0000', label: 'YouTube' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }} className="relative z-10 w-full">
      {/* Back to Top bar */}
      <button 
        onClick={scrollToTop}
        className="w-full py-4 text-center text-xs font-extrabold transition-all duration-300 uppercase tracking-widest border-b select-none cursor-pointer flex items-center justify-center gap-1.5"
        style={{ 
          background: 'var(--bg-secondary)', 
          color: 'var(--text-secondary)',
          borderColor: 'var(--border-color)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(108, 59, 213, 0.08)';
          e.currentTarget.style.color = 'var(--accent-purple)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg-secondary)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        Back to Top <span>▲</span>
      </button>

      {/* Premium Trust Badge Strip */}
      <div className="py-10 border-b" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:translate-y-[-2px] border border-transparent hover:border-[var(--border-color)] hover:shadow-sm" style={{ background: 'var(--bg-card)' }}>
              <span className="text-3xl mb-3">🚚</span>
              <h5 className="font-extrabold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>Free Shipping PAN India</h5>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>On all orders above ₹499</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:translate-y-[-2px] border border-transparent hover:border-[var(--border-color)] hover:shadow-sm" style={{ background: 'var(--bg-card)' }}>
              <span className="text-3xl mb-3">🤝</span>
              <h5 className="font-extrabold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>Cash on Delivery (COD)</h5>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Pay in cash or UPI upon delivery</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:translate-y-[-2px] border border-transparent hover:border-[var(--border-color)] hover:shadow-sm" style={{ background: 'var(--bg-card)' }}>
              <span className="text-3xl mb-3">🔄</span>
              <h5 className="font-extrabold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>Easy Returns</h5>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>7-day hassle-free exchange/refund</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter - Solid elegant banner */}
      <div className="py-14" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main">
          <div 
            className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 rounded-2xl border shadow-sm"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <Sparkles size={16} style={{ color: '#f59e0b' }} />
                <span className="text-xs font-bold badge badge-gold">Newsletter</span>
              </div>
              <h3 className="section-title text-2xl md:text-3xl mb-2 font-extrabold" style={{ color: 'var(--text-primary)' }}>
                Subscribe for Literary Updates
              </h3>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Join over 50,000+ avid readers. Get handpicked weekly recommendations, exclusive store deals, and author spotlights.
              </p>
            </div>
            <div className="flex-1 w-full lg:max-w-md">
              <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input-field flex-1 text-sm font-semibold"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-gold shrink-0 px-6 py-3 font-bold cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={16} />
                </motion.button>
              </form>
              <p className="text-xs mt-2.5 text-center lg:text-left font-semibold flex items-center justify-center lg:justify-start gap-1" style={{ color: 'var(--text-secondary)' }}>
                <ShieldCheck size={13} className="text-green-500" />
                No spam, unsubscribe at any time. Secure & Private.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand Block */}
            <div>
              <Link to="/" className="flex items-center gap-2.5 mb-5 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #6c3bd5, #f59e0b)' }}>
                  <BookOpen size={20} className="text-white" />
                </div>
                <span className="font-extrabold text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent-purple)' }}>Book</span>Verse
                  <span className="text-xs font-bold ml-1" style={{ color: 'var(--accent-gold)' }}>INDIA</span>
                </span>
              </Link>
              <p className="text-sm font-semibold leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                India's premier online bookstore. Discover inspiring stories, deep knowledge, and transformative ideas that help you grow.
              </p>
              {/* Social media connections */}
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, color, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border shadow-sm cursor-pointer"
                    style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                    onMouseEnter={e => { 
                      e.currentTarget.style.borderColor = color; 
                      e.currentTarget.style.background = color + '15'; 
                    }}
                    onMouseLeave={e => { 
                      e.currentTarget.style.borderColor = 'var(--border-color)'; 
                      e.currentTarget.style.background = 'var(--bg-primary)'; 
                    }}
                    aria-label={label}
                  >
                    <Icon size={18} style={{ color }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation column */}
            <div>
              <h4 className="font-extrabold text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-primary)' }}>
                Explore BookVerse
              </h4>
              <ul className="space-y-3.5">
                {quickLinks.map(link => (
                  <li key={link.to}>
                    <Link to={link.to}
                      className="text-sm font-semibold flex items-center gap-2 transition-all duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--accent-purple)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateX(0px)';
                      }}
                    >
                      <ArrowRight size={12} className="opacity-70 text-[var(--accent-purple)]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories column */}
            <div>
              <h4 className="font-extrabold text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-primary)' }}>
                Popular Categories
              </h4>
              <ul className="space-y-3.5">
                {categories.map(cat => (
                  <li key={cat.to}>
                    <Link to={cat.to}
                      className="text-sm font-semibold flex items-center gap-2 transition-all duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--accent-purple)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateX(0px)';
                      }}
                    >
                      <ArrowRight size={12} className="opacity-70 text-[var(--accent-purple)]" />
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="font-extrabold text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-primary)' }}>
                Get In Touch
              </h4>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-purple)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    42, Book Street, Connaught Place<br />New Delhi, 110001, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} style={{ color: 'var(--accent-purple)' }} />
                  <a href="tel:+911800BOOKVERSE" className="text-sm font-bold hover:underline"
                    style={{ color: 'var(--text-secondary)' }}>+91 1800-BOOKVERSE</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} style={{ color: 'var(--accent-purple)' }} />
                  <a href="mailto:hello@bookverse.in" className="text-sm font-bold hover:underline"
                    style={{ color: 'var(--text-secondary)' }}>hello@bookverse.in</a>
                </li>
              </ul>

              {/* Secure payments - Solid Flipkart style */}
              <div>
                <p className="text-[10px] font-extrabold tracking-widest uppercase mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                  Secure Payment Guarantee
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['UPI', 'VISA', 'MC', 'RuPay', 'COD Only'].map(p => (
                    <span key={p}
                      className="text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg border shadow-sm select-none"
                      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
            style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
              © {new Date().getFullYear()} BookVerse India. All rights reserved. Made with <Heart size={12} className="inline text-red-500 fill-red-500" /> in India.
            </p>
            <div className="flex flex-wrap gap-5 text-xs font-extrabold" style={{ color: 'var(--text-secondary)' }}>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Shipping Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Returns & Refunds</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
