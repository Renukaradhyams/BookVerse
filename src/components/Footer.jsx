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

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! Premium literary highlights are on their way. 📚✨');
    e.target.reset();
  };

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }} className="relative z-10 w-full font-sans">
      {/* Sleek Frosted Back to Top bar */}
      <button 
        onClick={scrollToTop}
        className="w-full py-4 text-center text-xs font-bold transition-all duration-300 uppercase tracking-widest border-b select-none cursor-pointer flex items-center justify-center gap-1.5"
        style={{ 
          background: 'rgba(255, 255, 255, 0.01)', 
          color: 'var(--text-secondary)',
          borderColor: 'var(--border-color)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
          e.currentTarget.style.color = 'var(--accent-indigo)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        Back to Top <span>▲</span>
      </button>

      {/* Trust Badge Grid - Frosted Minimal Glassmorphism */}
      <div className="py-12 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl flex items-center gap-4 hover:translate-y-[-2px] transition-all duration-300">
              <span className="text-3xl select-none">🚚</span>
              <div>
                <h5 className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>Free Shipping PAN India</h5>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Complimentary dispatch on orders above ₹499</p>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl flex items-center gap-4 hover:translate-y-[-2px] transition-all duration-300">
              <span className="text-3xl select-none">🤝</span>
              <div>
                <h5 className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>Cash on Delivery (COD)</h5>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Zero advance payment. Pay in Cash/UPI at delivery</p>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl flex items-center gap-4 hover:translate-y-[-2px] transition-all duration-300">
              <span className="text-3xl select-none">🔄</span>
              <div>
                <h5 className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>7-Day Returns Guarantee</h5>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Exchange or instant refund if not fully satisfied</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Newsletter Subscription Banner */}
      <div className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-main">
          <div 
            className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 rounded-2xl border"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-lux)' }}
          >
            <div className="flex-1 text-center lg:text-left space-y-3">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[rgba(245,158,11,0.1)] text-[var(--accent-gold)] px-2 py-0.5 rounded-full">
                  Weekly Dispatch
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Subscribe for Literary Updates
              </h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Join over 50,000+ avid readers. Get handpicked weekly recommendations, exclusive store deals, and author spotlights.
              </p>
            </div>
            
            <div className="flex-1 w-full lg:max-w-md">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input-lux flex-1 text-xs font-semibold"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-lux shrink-0 px-6 py-3 text-xs tracking-wider uppercase font-bold cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </motion.button>
              </form>
              <p className="text-[10px] font-bold mt-3 text-center lg:text-left flex items-center justify-center lg:justify-start gap-1" style={{ color: 'var(--text-secondary)' }}>
                <ShieldCheck size={13} className="text-green-500" />
                No spam, unsubscribe at any time. Secure & Private.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand Block */}
            <div className="space-y-5">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-gold))' }}>
                  <BookOpen size={20} className="text-white" />
                </div>
                <span className="font-black text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent-purple)' }}>Book</span>Verse
                  <span className="text-[10px] font-black ml-1 uppercase tracking-widest text-[var(--accent-gold)]">
                    India
                  </span>
                </span>
              </Link>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                India's premier modern online bookstore. Discover inspiring stories, deep knowledge, and transformative ideas that help you grow.
              </p>
              
              {/* Social Channels */}
              <div className="flex gap-2.5">
                {socialLinks.map(({ icon: Icon, href, color, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border shadow-sm cursor-pointer"
                    style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                    onMouseEnter={e => { 
                      e.currentTarget.style.borderColor = color; 
                      e.currentTarget.style.background = color + '10'; 
                    }}
                    onMouseLeave={e => { 
                      e.currentTarget.style.borderColor = 'var(--border-color)'; 
                      e.currentTarget.style.background = 'var(--bg-primary)'; 
                    }}
                    aria-label={label}
                  >
                    <Icon size={16} style={{ color }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-5">
              <h4 className="font-extrabold text-xs tracking-widest uppercase" style={{ color: 'var(--text-primary)' }}>
                Explore BookVerse
              </h4>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link.to}>
                    <Link to={link.to}
                      className="text-xs font-semibold flex items-center gap-2 transition-all duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--accent-indigo)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateX(0px)';
                      }}
                    >
                      <ArrowRight size={12} className="opacity-75 text-[var(--accent-indigo)]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Genres Column */}
            <div className="space-y-5">
              <h4 className="font-extrabold text-xs tracking-widest uppercase" style={{ color: 'var(--text-primary)' }}>
                Popular Genres
              </h4>
              <ul className="space-y-3">
                {categories.map(cat => (
                  <li key={cat.to}>
                    <Link to={cat.to}
                      className="text-xs font-semibold flex items-center gap-2 transition-all duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--accent-indigo)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateX(0px)';
                      }}
                    >
                      <ArrowRight size={12} className="opacity-75 text-[var(--accent-indigo)]" />
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact & payment strip */}
            <div className="space-y-5">
              <h4 className="font-extrabold text-xs tracking-widest uppercase" style={{ color: 'var(--text-primary)' }}>
                Headquarters
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-indigo)' }} />
                  <span className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    42, Book Street, Connaught Place,<br />New Delhi, 110001, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} style={{ color: 'var(--accent-indigo)' }} />
                  <a href="tel:+911800BOOKVERSE" className="text-xs font-bold hover:underline"
                    style={{ color: 'var(--text-secondary)' }}>+91 1800-BOOKVERSE</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} style={{ color: 'var(--accent-indigo)' }} />
                  <a href="mailto:hello@bookverse.in" className="text-xs font-bold hover:underline"
                    style={{ color: 'var(--text-secondary)' }}>hello@bookverse.in</a>
                </li>
              </ul>

              {/* Secure Payments strip - Clean Amazon Kindle/Notion minimalist layout */}
              <div className="pt-2">
                <p className="text-[9px] font-extrabold tracking-widest uppercase mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                  COD Verification Channels
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['UPI Scan', 'RuPay', 'VISA Card', 'MC Card', 'COD Pay'].map(p => (
                    <span key={p}
                      className="text-[9px] font-black tracking-wide px-2.5 py-1.5 rounded-lg border shadow-sm select-none"
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
              © {new Date().getFullYear()} BookVerse India. All rights reserved. Made with <Heart size={10} className="inline text-red-500 fill-red-500 mx-0.5" /> in India.
            </p>
            <div className="flex flex-wrap gap-5 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
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
