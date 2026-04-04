import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiTrendingUp, FiThermometer, FiDroplet, FiPackage, FiDollarSign } from 'react-icons/fi';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function FarmerHome() {
  const { t } = useLanguage();
  const stats = [
    { icon: FiThermometer, label: t('sensor.temperature'), value: '24°C', status: 'optimal', color: 'from-green-500 to-emerald-600' },
    { icon: FiDroplet, label: t('sensor.humidity'), value: '78%', status: 'optimal', color: 'from-blue-500 to-cyan-600' },
    { icon: FiPackage, label: 'Active Batches', value: '3', status: 'info', color: 'from-purple-500 to-pink-600' },
    { icon: FiDollarSign, label: 'Revenue', value: '₹2.4L', status: 'info', color: 'from-yellow-500 to-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={fadeIn} className="glass-card p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white text-lg" />
              </div>
              {stat.status === 'optimal' && <span className="status-optimal text-xs px-2 py-1 rounded-lg font-medium">{t('sensor.optimal')}</span>}
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-white/40 text-sm mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { time: '2 hrs ago', text: 'Batch #3 humidity adjusted to 78%', type: 'success' },
              { time: '5 hrs ago', text: 'Temperature alert resolved', type: 'warning' },
              { time: '1 day ago', text: 'New order received - 500g dried Cordyceps', type: 'info' },
              { time: '2 days ago', text: 'E-Learning: Module 3 completed', type: 'success' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.type === 'success' ? 'bg-green-400' : item.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                <div>
                  <p className="text-white/70 text-sm">{item.text}</p>
                  <p className="text-white/30 text-xs mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📊', label: 'View Sensors', desc: 'Check real-time data' },
              { icon: '📚', label: 'Continue Learning', desc: 'Module 4 awaits' },
              { icon: '🛒', label: 'Marketplace', desc: '2 new inquiries' },
              { icon: '🔔', label: 'Alerts', desc: 'All systems normal' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/3 hover:bg-white/5 transition-all cursor-pointer hover:scale-[1.02]">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-white text-sm font-medium">{item.label}</div>
                <div className="text-white/40 text-xs mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
