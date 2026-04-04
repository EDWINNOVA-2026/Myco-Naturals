import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { FiThermometer, FiDroplet, FiSun, FiWind } from 'react-icons/fi';

function genData() {
  const now = Date.now();
  return Array.from({ length: 24 }, (_, i) => {
    const h = new Date(now - (23 - i) * 3600000).getHours();
    return {
      time: `${h}:00`,
      temperature: 22 + Math.random() * 6,
      humidity: 70 + Math.random() * 20,
      light: 200 + Math.random() * 300,
      co2: 400 + Math.random() * 200,
    };
  });
}

export default function Monitoring() {
  const { t } = useLanguage();
  const [data, setData] = useState(genData());
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const interval = setInterval(() => {
      setData(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: 22 + Math.random() * 6,
          humidity: 70 + Math.random() * 20,
          light: 200 + Math.random() * 300,
          co2: 400 + Math.random() * 200,
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [live]);

  const current = data[data.length - 1];
  const getStatus = (type, val) => {
    if (type === 'temperature') return val >= 20 && val <= 26 ? 'optimal' : val > 28 || val < 18 ? 'critical' : 'warning';
    if (type === 'humidity') return val >= 70 && val <= 85 ? 'optimal' : val > 90 || val < 60 ? 'critical' : 'warning';
    if (type === 'light') return val >= 200 && val <= 400 ? 'optimal' : 'warning';
    return val <= 600 ? 'optimal' : val > 800 ? 'critical' : 'warning';
  };

  const sensors = [
    { key: 'temperature', icon: FiThermometer, value: `${current.temperature.toFixed(1)}°C`, range: '20-26°C', color: '#f97316', gradient: 'from-orange-500 to-red-500' },
    { key: 'humidity', icon: FiDroplet, value: `${current.humidity.toFixed(1)}%`, range: '70-85%', color: '#3b82f6', gradient: 'from-blue-500 to-cyan-500' },
    { key: 'light', icon: FiSun, value: `${current.light.toFixed(0)} lux`, range: '200-400 lux', color: '#eab308', gradient: 'from-yellow-500 to-amber-500' },
    { key: 'co2', icon: FiWind, value: `${current.co2.toFixed(0)} ppm`, range: '<600 ppm', color: '#8b5cf6', gradient: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{t('farmer.monitoring')}</h2>
        <button onClick={() => setLive(!live)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${live ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'bg-white/5 text-white/50 border border-white/10'}`}>
          {live ? '🟢 Live' : '⏸ Paused'}
        </button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensors.map(s => {
          const status = getStatus(s.key, current[s.key]);
          return (
            <motion.div key={s.key} whileHover={{ scale: 1.02 }} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                  <s.icon className="text-white text-lg" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg font-medium ${status === 'optimal' ? 'status-optimal' : status === 'warning' ? 'status-warning' : 'status-critical'}`}>
                  {t(`sensor.${status}`)}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-white/40 text-sm mt-1">{t(`sensor.${s.key}`)}</div>
              <div className="text-white/20 text-xs mt-1">Range: {s.range}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4">{t('sensor.temperature')} & {t('sensor.humidity')}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: 12 }} />
              <Area type="monotone" dataKey="temperature" stroke="#f97316" fill="url(#tempGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="url(#humGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4">{t('sensor.light')} & {t('sensor.co2')}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: 12 }} />
              <Line type="monotone" dataKey="light" stroke="#eab308" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="co2" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
