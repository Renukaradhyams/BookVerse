import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, BookOpen, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
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
    'Personalized book recommendations',
    'Exclusive member-only discounts',
    'Track your orders in real-time',
    'Manage wishlist & reading history',
    'Early access to new arrivals',
  ];

  return (
    <div className="min-h-screen pt-16 flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-center p-12 w-2/5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }}>
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full blur-3xl"
            style={{ width: '300px', height: '300px', background: 'rgba(108,59,213,0.3)', top: '-50px', left: '-50px' }} />
          <div className="absolute rounded-full blur-3xl"
            style={{ width: '250px', height: '250px', background: 'rgba(245,158,11,0.2)', bottom: '-50px', right: '-50px' }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6c3bd5, #f59e0b)' }}>
              <BookOpen size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              BookVerse India
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Welcome to Your Literary Universe
          </h2>
          <p className="text-blue-200 mb-8 leading-relaxed">
            Join 2 million+ readers discovering their next favourite book every day.
          </p>

          <ul className="space-y-3">
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-sm text-blue-100"
              >
                <CheckCircle size={16} className="text-green-400 shrink-0" />
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[{ v: '2M+', l: 'Readers' }, { v: '5L+', l: 'Books' }, { v: '4.9★', l: 'Rating' }].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-bold" style={{ color: '#f59e0b' }}>{s.v}</div>
                <div className="text-sm text-blue-300">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Tab switcher */}
          <div className="glass-card p-1.5 mb-8 flex">
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setErrors({}); }}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all duration-200"
                style={{
                  background: tab === t ? 'linear-gradient(135deg, #6c3bd5, #8b5cf6)' : 'transparent',
                  color: tab === t ? 'white' : 'var(--text-secondary)',
                }}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                {tab === 'login' ? 'Welcome Back! 👋' : 'Join BookVerse! 🚀'}
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                {tab === 'login' ? 'Sign in to access your account and reading list.' : 'Create your free account and start exploring.'}
              </p>


              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'register' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Priya Sharma"
                        className="input-field pl-10"
                        style={{ borderColor: errors.name ? '#f87171' : undefined }}
                      />
                    </div>
                    {errors.name && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="you@email.com"
                      className="input-field pl-10"
                      style={{ borderColor: errors.email ? '#f87171' : undefined }}
                    />
                  </div>
                  {errors.email && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => update('password', e.target.value)}
                      placeholder="Min. 6 characters"
                      className="input-field pl-10 pr-10"
                      style={{ borderColor: errors.password ? '#f87171' : undefined }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.password}</p>}
                </div>

                {tab === 'login' && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm" style={{ color: '#a78bfa' }}>
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className="btn-primary w-full justify-center py-4 text-base mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Please wait...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {tab === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={16} />
                    </span>
                  )}
                </motion.button>

                {tab === 'register' && (
                  <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                    By creating an account, you agree to our{' '}
                    <a href="#" style={{ color: '#a78bfa' }}>Terms of Service</a> and{' '}
                    <a href="#" style={{ color: '#a78bfa' }}>Privacy Policy</a>.
                  </p>
                )}
              </form>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
