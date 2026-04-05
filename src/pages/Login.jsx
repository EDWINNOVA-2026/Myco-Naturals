import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('user@demo.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="pt-32 pb-16 min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 max-w-md w-full relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm border border-red-500/30">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/60 text-sm mb-2">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-400 transition" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-400 transition" />
          </div>
          <button type="submit" className="w-full btn-primary py-3.5 mt-4 text-lg">Sign In</button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs mb-3 uppercase tracking-wider text-center font-bold">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => {setEmail('user@demo.com'); setPassword('123456');}} className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white/70 transition">User Demo</button>
                <button onClick={() => {setEmail('farmer@demo.com'); setPassword('123456');}} className="px-3 py-2 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 rounded-lg text-xs text-primary-400 transition">Farmer Demo</button>
            </div>
        </div>

        <p className="text-center text-white/60 text-sm mt-8">
          Don't have an account? <Link to="/signup" className="text-primary-400 font-semibold hover:text-primary-300 transition">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
}
