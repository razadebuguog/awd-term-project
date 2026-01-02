'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '../ThemeContext';
import { Mail, Lock, LogIn, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

const COLOR_LIGHT_BG = '#F9FAFB';
const COLOR_DARK_BG = '#0F172A';
const COLOR_ACCENT = '#06B6D4';
const COLOR_DARK_TEXT = '#1E293B';
const COLOR_MUTED = '#64748B';
const COLOR_WHITE = '#FFFFFF';

const Login = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const user = { name: email.split('@')[0] || 'User', email };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      setSuccess('Login successful (frontend only). Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isDarkMode = theme === 'dark';
  const bgColor = isDarkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG;
  const cardColor = isDarkMode ? COLOR_DARK_BG : COLOR_WHITE;
  const textColor = isDarkMode ? COLOR_LIGHT_BG : COLOR_DARK_TEXT;
  const inputBorderColor = isDarkMode ? COLOR_MUTED : '#E5E7EB';

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl transition-all duration-300"
        style={{
          backgroundColor: cardColor,
          boxShadow: isDarkMode
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.3)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Link
          href="/"
          className="flex items-center text-sm font-medium mb-8 transition"
          style={{ color: isLinkHovered ? COLOR_ACCENT : COLOR_MUTED }}
          onMouseEnter={() => setIsLinkHovered(true)}
          onMouseLeave={() => setIsLinkHovered(false)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h2
          className="text-4xl font-extrabold mb-2 text-center"
          style={{ color: textColor }}
        >
          Welcome Back
        </h2>
        <p className="text-center mb-8" style={{ color: COLOR_MUTED }}>
          Sign in to continue to your documents.
        </p>

        {error && (
          <div className="p-3 mb-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-medium border border-red-300 flex items-center">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-3 mb-4 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-300 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: textColor }}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: COLOR_MUTED }}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition duration-150"
                style={{
                  backgroundColor: isDarkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG,
                  color: textColor,
                  borderColor: inputBorderColor,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLOR_ACCENT)}
                onBlur={(e) => (e.currentTarget.style.borderColor = inputBorderColor)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: textColor }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: COLOR_MUTED }}
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition duration-150"
                style={{
                  backgroundColor: isDarkMode ? COLOR_DARK_BG : COLOR_LIGHT_BG,
                  color: textColor,
                  borderColor: inputBorderColor,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLOR_ACCENT)}
                onBlur={(e) => (e.currentTarget.style.borderColor = inputBorderColor)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium hover:underline"
              style={{ color: COLOR_MUTED }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-bold transition duration-300 transform shadow-xl hover:scale-[1.01] active:scale-[0.98]"
            style={{
              backgroundColor: COLOR_ACCENT,
              color: COLOR_WHITE,
              boxShadow: `0 10px 15px -3px ${COLOR_ACCENT}40, 0 4px 6px -4px ${COLOR_ACCENT}40`,
            }}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
            ) : (
              <LogIn className="w-5 h-5 mr-2" />
            )}
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm" style={{ color: COLOR_MUTED }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold hover:underline" style={{ color: COLOR_ACCENT }}>
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
