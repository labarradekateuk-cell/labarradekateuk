import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await login(email, password);
    if (error) {
      setError(error.message || 'Invalid login attempt.');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-8 neu-outset">
        <div>
           <img src="https://lh3.googleusercontent.com/pw/AP1GczNAo9UaVfrx17NH3XRuch8bUAfwtq6TjVDWQJsGcNlSlQbdRj5QqqhjOCUOBeCCThcSFyuHRmWgrvi3XEEkf3Yy1-5UnJAtxA4OZJREU00Pzq95BbV1f6IDl6fBEG-LiG80J-fTH35XM1d09zgFSJU=w559-h419-s-no-gm?authuser=0" alt="Logo" className="w-40 mx-auto" />
          <h2 className="mt-6 text-center text-3xl font-bold neu-text-color">
            Admin Panel Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="neu-inset w-full px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-gray-400 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="neu-inset w-full px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-gray-400 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="neu-button w-full flex justify-center py-3 px-4 text-sm font-medium"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
            <a href="/#" className="neu-button inline-block px-5 py-2 text-sm font-medium">
                Volver a la página de inicio
            </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;