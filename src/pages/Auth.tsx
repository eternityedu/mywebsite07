import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { ArrowLeft, User, Lock } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, login, loading } = useSimpleAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(username.trim(), password);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>

        <div className="text-center mb-8">
          <span className="section-label block mb-3">Admin Access</span>
          <h1 className="text-xl font-light tracking-wide">
            Sign In
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="section-label flex items-center gap-2 mb-2">
              <User className="w-3 h-3" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors text-foreground text-sm"
              required
              autoComplete="username"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="section-label flex items-center gap-2 mb-2">
              <Lock className="w-3 h-3" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors text-foreground text-sm"
              required
              autoComplete="current-password"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-destructive text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-minimal justify-center mt-6 py-3 text-xs disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
