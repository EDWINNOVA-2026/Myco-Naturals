import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiDollarSign, FiTrendingUp, FiMapPin, FiSend } from 'react-icons/fi';

export default function Franchise() {
  const { t } = useLanguage();
  const [investment, setInvestment] = useState(200000);
  const [applied, setApplied] = useState(false);
  const monthlyRevenue = Math.round(investment * 0.15);
  const yearlyROI = Math.round((monthlyRevenue * 12 / investment) * 100);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">{t('franchise.title')}</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ROI Calculator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-primary-400" /> {t('franchise.investment')}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-white/50 text-sm mb-2 block">Investment Amount (₹)</label>
              <input type="range" min="100000" max="1000000" step="50000" value={investment} onChange={e => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500" />
              <div className="text-2xl font-bold text-white mt-2">₹{(investment / 100000).toFixed(1)}L</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Monthly Revenue', value: `₹${(monthlyRevenue / 1000).toFixed(0)}K`, icon: FiDollarSign },
                { label: 'Yearly ROI', value: `${yearlyROI}%`, icon: FiTrendingUp },
                { label: 'Break Even', value: `${Math.ceil(investment / monthlyRevenue)} months`, icon: FiMapPin },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/3 text-center">
                  <item.icon className="text-primary-400 text-lg mx-auto mb-2" />
                  <div className="text-white font-bold text-sm">{item.value}</div>
                  <div className="text-white/30 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Apply */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <FiSend className="text-primary-400" /> {t('franchise.apply')}
          </h3>
          {applied ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h4 className="text-xl font-bold text-white mb-2">Application Submitted!</h4>
              <p className="text-white/40 text-sm">Our team will contact you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setApplied(true); }} className="space-y-4">
              <input type="text" placeholder="Full Name" className="input-field" required />
              <input type="tel" placeholder="Phone Number" className="input-field" required />
              <input type="text" placeholder="City / Location" className="input-field" required />
              <select className="input-field">
                <option value="">Investment Budget</option>
                <option>₹1L - ₹3L</option>
                <option>₹3L - ₹5L</option>
                <option>₹5L - ₹10L</option>
                <option>₹10L+</option>
              </select>
              <textarea placeholder="Tell us about yourself..." className="input-field h-20 resize-none" />
              <button type="submit" className="btn-primary w-full">{t('franchise.apply')}</button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Benefits */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: '🏠', title: 'Small Space', desc: 'Start with just 10x10 ft room' },
          { icon: '📚', title: 'Full Training', desc: 'Complete cultivation & business training' },
          { icon: '🤝', title: 'Full Support', desc: 'Ongoing technical & marketing support' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-card p-6 text-center card-hover">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
            <p className="text-white/40 text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
