import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../lib/api';
import useAuthStore from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(s => s.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [general, setGeneral] = useState('');

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneral('');
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await authAPI.login({ email: email.trim().toLowerCase(), password });
      const { user, tokens } = res.data.data;
      setAuth(user, tokens.accessToken, tokens.refreshToken);
      navigate('/account');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      setGeneral(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl border border-border p-8 md:p-10">
        <h1 className="font-display text-3xl font-bold text-ink mb-2 text-center">Welcome Back</h1>
        <p className="text-ink-muted text-center mb-8">Sign in to your Grove & Co. account</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(o => ({ ...o, email: '' })); setGeneral(''); }}
              className={`w-full px-4 py-3 rounded-lg border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-accent-primary/40 transition ${errors.email ? 'border-error' : 'border-border'}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(o => ({ ...o, password: '' })); setGeneral(''); }}
              className={`w-full px-4 py-3 rounded-lg border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-accent-primary/40 transition ${errors.password ? 'border-error' : 'border-border'}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
          </div>
          {general && <p className="text-error text-sm bg-error/10 rounded-lg px-3 py-2">{general}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-primary text-white py-3 rounded-lg font-medium hover:bg-accent-primary-hover transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-ink-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
