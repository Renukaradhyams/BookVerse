import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, BookOpen, Mail, Lock, User, ArrowRight, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [tab, setTab] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (tab === 'register' && !form.name.trim()) e.name = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    let result;
    if (tab === 'login') {
      result = await login(form.email, form.password);
    } else {
      result = await register(form.name, form.email, form.password);
    }
    if (result?.success) navigate('/');
  };

  const benefits = [
    'Personalized AI book recommendations',
    'Exclusive members-only VIP pricing',
    'Track courier shipments in real-time',
    'Curate wishlists & library history',
    'Priority access to rare first editions',
  ];

  return (
    <div className="min-h-screen pt-20 flex relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Dynamic drifting background auroras */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      {/* Left Panel: Luxury Brand Info (visible on desktop) */}
      <div className="hidden lg:flex flex-col justify-between p-16 w-5/12 relative overflow-hidden border-r shadow-2xl z-10"
        style={{ 
          background: 'linear-gradient(135deg, rgba(11, 11, 20, 0.9) 0%, rgba(20, 20, 45, 0.95) 100%)',
          borderColor: 'var(--border-color)' 
        }}>
        
        {/* Soft layout glow grids */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full blur-3xl w-[400px] h-[400px]"
            style={{ background: 'rgba(99,102,241,0.12)', top: '-10%', left: '-10%' }} />
          <div className="absolute rounded-full blur-3xl w-[300px] h-[300px]"
            style={{ background: 'rgba(245,158,11,0.08)', bottom: '-10%', right: '-10%' }} />
        </div>

        {/* Brand Label */}
        <div className="relative z-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-gold))' }}>
              <BookOpen size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              <span className="text-[var(--accent-purple)]">Book</span>Verse <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)]">India</span>
            </span>
          </Link>
        </div>

        {/* Benefits text stack */}
        <div className="relative z-20 space-y-6 my-auto pt-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1 bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] px-3 py-1 rounded-full text-xs text-[var(--accent-indigo)] font-bold">
              <Sparkles size={12} /> Premium Reader Club
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              Discover Your Next <span className="gradient-text">Literary Adventure</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Sign in to secure access to India's most curated literary catalogues and start collecting masterpiece titles today.
            </p>
          </div>

          <ul className="space-y-3.5">
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3 text-xs font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                <CheckCircle size={15} className="text-green-400 shrink-0" />
                {b}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Trust Stats Counter banner */}
        <div className="relative z-20 border-t pt-8 grid grid-cols-3 gap-6" style={{ borderColor: 'var(--border-color)' }}>
          {[
            { value: '2M+', label: 'Avid Readers' },
            { value: '5L+', label: 'VIP Editions' },
            { value: '4.9★', label: 'Store Rating' }
          ].map(s => (
            <div key={s.label} className="space-y-0.5">
              <div className="text-xl font-black gradient-text-gold">{s.value}</div>
              <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Sleek Form Interface */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Frosted Segment tab switcher */}
          <div className="glass p-1.5 rounded-2xl flex border" style={{ borderColor: 'var(--border-color)' }}>
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setErrors({}); }}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                style={{
                  background: tab === t ? 'linear-gradient(135deg, var(--accent-indigo), var(--accent-purple))' : 'transparent',
                  color: tab === t ? 'white' : 'var(--text-secondary)',
                  boxShadow: tab === t ? 'var(--shadow-glow)' : 'none'
                }}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2 text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {tab === 'login' ? 'Welcome Back! 👋' : 'Join BookVerse! 🚀'}
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {tab === 'login' ? 'Sign in to access your custom profile & dashboard.' : 'Register to start collecting and saving curated publications.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {tab === 'register' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Priya Sharma"
                        className="input-lux pl-11"
                        style={{ borderColor: errors.name ? '#ef4444' : 'var(--border-color)' }}
                      />
                    </div>
                    {errors.name && <p className="text-xs font-medium" style={{ color: '#f87171' }}>{errors.name}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="you@email.com"
                      className="input-lux pl-11"
                      style={{ borderColor: errors.email ? '#ef4444' : 'var(--border-color)' }}
                    />
                  </div>
                  {errors.email && <p className="text-xs font-medium" style={{ color: '#f87171' }}>{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Secret Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => update('password', e.target.value)}
                      placeholder="Min. 6 characters"
                      className="input-lux pl-11 pr-11"
                      style={{ borderColor: errors.password ? '#ef4444' : 'var(--border-color)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs font-medium" style={{ color: '#f87171' }}>{errors.password}</p>}
                </div>

                {tab === 'login' && (
                  <div className="flex justify-end pt-1">
                    <button type="button" className="text-xs font-bold text-[var(--accent-indigo)] hover:underline cursor-pointer">
                      Forgot Credentials?
                    </button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={loading}
                  className="btn-lux w-full justify-center py-4 text-xs tracking-wider uppercase font-bold mt-4 cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2.5">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authenticating Account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 font-bold">
                      {tab === 'login' ? 'Sign In Credentials' : 'Register Account'}
                      <ArrowRight size={14} />
                    </span>
                  )}
                </motion.button>

                {tab === 'register' && (
                  <p className="text-[10px] leading-relaxed text-center" style={{ color: 'var(--text-secondary)' }}>
                    By creating a reader profile, you agree to our{' '}
                    <a href="#" className="font-bold hover:underline" style={{ color: '#a78bfa' }}>Terms of Service</a> and{' '}
                    <a href="#" className="font-bold hover:underline" style={{ color: '#a78bfa' }}>Privacy Policy</a>.
                  </p>
                )}
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>
            <ShieldCheck size={12} className="text-green-400" /> Secure SSL direct identity portal.
          </div>
        </motion.div>
      </div>
    </div>
  );
}


