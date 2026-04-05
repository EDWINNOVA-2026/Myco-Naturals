import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { motion } from 'framer-motion';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = signup(name, email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="pt-32 pb-16 min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 max-w-md w-full relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm border border-red-500/30">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/60 text-sm mb-2">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-400 transition" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-400 transition" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-400 transition" />
          </div>
          <button type="submit" className="w-full btn-primary py-3.5 mt-4 text-lg">Sign Up</button>
        </form>
        
        <p className="text-center text-white/60 text-sm mt-8">
          Already have an account? <Link to="/login" className="text-primary-400 font-semibold hover:text-primary-300 transition">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
