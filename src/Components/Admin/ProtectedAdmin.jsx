import React, { useState, useEffect } from 'react';
import MessageAdmin from './MessageAdmin';
import { Lock, Mail, Eye, EyeOff, LogOut } from 'lucide-react';
import { loginAdmin, logoutAdmin, onAuthChange } from '../../services/authService';

const ProtectedAdmin = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await loginAdmin(email, password);
    
    if (result.success) {
      setEmail('');
      setPassword('');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    const result = await logoutAdmin();
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout ({user.email})
          </button>
        </div>
        <MessageAdmin />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/60">Enter your credentials to access admin panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white/60 text-sm mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@athulportfolio.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white pr-12 focus:ring-2 focus:ring-primary/50 focus:border-primary/30"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-primary"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-primary/10 to-primary rounded-xl font-medium text-white hover:shadow-lg hover:shadow-primary/30 transition disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            Secure admin access with Firebase Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProtectedAdmin;
