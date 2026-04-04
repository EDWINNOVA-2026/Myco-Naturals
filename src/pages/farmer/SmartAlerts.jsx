import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiAlertTriangle, FiCheckCircle, FiThermometer, FiDroplet, FiWind, FiBell } from 'react-icons/fi';

function generateAlerts(t) {
  const alerts = [];
  const temp = 22 + Math.random() * 8;
  const humidity = 60 + Math.random() * 35;
  const co2 = 400 + Math.random() * 500;

  if (temp > 27) alerts.push({ id: 1, type: 'critical', icon: FiThermometer, message: t('alerts.tempHigh'), value: `${temp.toFixed(1)}°C`, time: 'Just now' });
  else if (temp < 19) alerts.push({ id: 2, type: 'warning', icon: FiThermometer, message: t('alerts.tempLow'), value: `${temp.toFixed(1)}°C`, time: 'Just now' });

  if (humidity > 88) alerts.push({ id: 3, type: 'warning', icon: FiDroplet, message: t('alerts.humidHigh'), value: `${humidity.toFixed(1)}%`, time: '2 min ago' });
  else if (humidity < 65) alerts.push({ id: 4, type: 'critical', icon: FiDroplet, message: t('alerts.humidLow'), value: `${humidity.toFixed(1)}%`, time: '2 min ago' });

  if (co2 > 700) alerts.push({ id: 5, type: 'warning', icon: FiWind, message: t('alerts.co2High'), value: `${co2.toFixed(0)} ppm`, time: '5 min ago' });

  return alerts;
}

export default function SmartAlerts() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());

  useEffect(() => {
    setAlerts(generateAlerts(t));
    const interval = setInterval(() => setAlerts(generateAlerts(t)), 10000);
    return () => clearInterval(interval);
  }, [t]);

  const activeAlerts = alerts.filter(a => !dismissed.has(a.id));
  const allClear = activeAlerts.length === 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">{t('alerts.title')}</h2>

      {allClear ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-primary-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">All Systems Normal</h3>
          <p className="text-white/40">All sensor readings are within optimal range. No action required.</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {activeAlerts.map(alert => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className={`glass-card p-5 border-l-4 ${alert.type === 'critical' ? 'border-red-500' : 'border-yellow-500'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${alert.type === 'critical' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                    <alert.icon className={`text-lg ${alert.type === 'critical' ? 'text-red-400' : 'text-yellow-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${alert.type === 'critical' ? 'status-critical' : 'status-warning'}`}>
                        {alert.type === 'critical' ? 'CRITICAL' : 'WARNING'}
                      </span>
                      <span className="text-white/30 text-xs">{alert.time}</span>
                    </div>
                    <p className="text-white/80 text-sm">{alert.message}</p>
                    <p className="text-white/40 text-xs mt-1">Current value: {alert.value}</p>
                  </div>
                  <button onClick={() => setDismissed(prev => new Set([...prev, alert.id]))} className="text-white/30 hover:text-white/60 text-sm transition-colors">
                    Dismiss
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-4">Alert Thresholds</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: t('sensor.temperature'), optimal: '20-26°C', warning: '18-20 / 26-28°C', critical: '<18 / >28°C' },
            { label: t('sensor.humidity'), optimal: '70-85%', warning: '60-70 / 85-90%', critical: '<60 / >90%' },
            { label: t('sensor.light'), optimal: '200-400 lux', warning: '<200 / >400 lux', critical: 'N/A' },
            { label: t('sensor.co2'), optimal: '<600 ppm', warning: '600-800 ppm', critical: '>800 ppm' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/3">
              <div className="text-white text-sm font-medium mb-2">{item.label}</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-green-400">Optimal</span><span className="text-white/40">{item.optimal}</span></div>
                <div className="flex justify-between"><span className="text-yellow-400">Warning</span><span className="text-white/40">{item.warning}</span></div>
                <div className="flex justify-between"><span className="text-red-400">Critical</span><span className="text-white/40">{item.critical}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
