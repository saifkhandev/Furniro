import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../lib/api';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [general, setGeneral] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Full name is required';
    else if (name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    else if (!/\d/.test(password)) e.password = 'Password must contain at least one number';
    if (!confirm) e.confirm = 'Confirm password is required';
    else if (confirm !== password) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneral('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      await authAPI.register({ name: name.trim(), email: email.trim().toLowerCase(), password });
      setSuccess('Registration successful! Check your email to verify your account before logging in.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Try again.';
      setGeneral(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl border border-border p-8 md:p-10">
        <h1 className="font-display text-3xl font-bold text-ink mb-2 text-center">Create Account</h1>
        <p className="text-ink-muted text-center mb-8">Join Grove & Co. for exclusive offers</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(o => ({ ...o, name: '' })); setGeneral(''); }}
              className={`w-full px-4 py-3 rounded-lg border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-accent-primary/40 transition ${errors.name ? 'border-error' : 'border-border'}`}
              placeholder="Jordan Smith"
            />
            {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-ink mb-1.5">Email</label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(o => ({ ...o, email: '' })); setGeneral(''); }}
              className={`w-full px-4 py-3 rounded-lg border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-accent-primary/40 transition ${errors.email ? 'border-error' : 'border-border'}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-ink mb-1.5">Password</label>
            <input
              id="reg-password"
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(o => ({ ...o, password: '', confirm: '' })); setGeneral(''); }}
              className={`w-full px-4 py-3 rounded-lg border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-accent-primary/40 transition ${errors.password ? 'border-error' : 'border-border'}`}
              placeholder="At least 6 chars with a number"
            />
            {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-ink mb-1.5">Confirm Password</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={e => { setConfirm(e.target.value); setErrors(o => ({ ...o, confirm: '' })); setGeneral(''); }}
              className={`w-full px-4 py-3 rounded-lg border bg-background text-ink focus:outline-none focus:ring-2 focus:ring-accent-primary/40 transition ${errors.confirm ? 'border-error' : 'border-border'}`}
              placeholder="Confirm password"
            />
            {errors.confirm && <p className="text-error text-xs mt-1">{errors.confirm}</p>}
          </div>
          {general && <p className="text-error text-sm bg-error/10 rounded-lg px-3 py-2">{general}</p>}
          {success && <p className="text-success text-sm bg-success/10 rounded-lg px-3 py-2">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-primary text-white py-3 rounded-lg font-medium hover:bg-accent-primary-hover transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
