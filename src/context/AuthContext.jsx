import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bookverse_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bookverse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bookverse_user');
    }
  }, [user]);

  // Mock login - replace with Firebase Auth
  const login = async (email, password) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      if (email && password.length >= 6) {
        const mockUser = {
          uid: 'user_' + Date.now(),
          email,
          displayName: email.split('@')[0],
          photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=6c3bd5&color=fff`,
          createdAt: new Date().toISOString(),
        };
        setUser(mockUser);
        toast.success(`Welcome back, ${mockUser.displayName}! 👋`, {
          style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
        });
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed', {
        style: { background: '#1a1a2e', color: '#e2e8f0' }
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (email && password.length >= 6 && name) {
        const mockUser = {
          uid: 'user_' + Date.now(),
          email,
          displayName: name,
          photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6c3bd5&color=fff`,
          createdAt: new Date().toISOString(),
        };
        setUser(mockUser);
        toast.success(`Account created! Welcome to BookVerse, ${name}! 🎉`, {
          style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
        });
        return { success: true };
      } else {
        throw new Error('Please fill all fields correctly');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed', {
        style: { background: '#1a1a2e', color: '#e2e8f0' }
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const names = ['Priya Sharma', 'Arjun Mehta', 'Ananya Krishnan', 'Rahul Gupta'];
      const name = names[Math.floor(Math.random() * names.length)];
      const mockUser = {
        uid: 'google_' + Date.now(),
        email: name.toLowerCase().replace(' ', '.') + '@gmail.com',
        displayName: name,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6c3bd5&color=fff`,
        provider: 'google',
        createdAt: new Date().toISOString(),
      };
      setUser(mockUser);
      toast.success(`Welcome, ${name}! 🎉`, {
        style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
      });
      return { success: true };
    } catch (error) {
      toast.error('Google Sign-In failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    toast.success('Logged out successfully', {
      icon: '👋',
      style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(108,59,213,0.3)' }
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
