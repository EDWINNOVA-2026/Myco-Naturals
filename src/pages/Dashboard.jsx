import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FiThermometer, FiDroplet, FiSun, FiWind, FiAlertTriangle } from 'react-icons/fi';

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

function genHistory() {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    temperature: +(20 + Math.random() * 8).toFixed(1),
    humidity: +(65 + Math.random() * 25).toFixed(1),
    light: +(150 + Math.random() * 350).toFixed(0),
    co2: +(350 + Math.random() * 400).toFixed(0),
  }));
}

function getStatus(key, val) {
  if (key === 'temperature') return val >= 20 && val <= 26 ? 'optimal' : val > 28 || val < 18 ? 'critical' : 'warning';
  if (key === 'humidity') return val >= 70 && val <= 85 ? 'optimal' : val > 90 || val < 60 ? 'critical' : 'warning';
  if (key === 'light') return val >= 200 && val <= 400 ? 'optimal' : 'warning';
  return val <= 600 ? 'optimal' : val > 800 ? 'critical' : 'warning';
}

const tooltipStyle = { background: '#0f1f3d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e2e8f0', fontSize: 12, padding: '8px 12px' };

export default function Dashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState(genHistory);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setData(prev => [...prev.slice(1), {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: +(20 + Math.random() * 8).toFixed(1),
        humidity: +(65 + Math.random() * 25).toFixed(1),
        light: +(150 + Math.random() * 350).toFixed(0),
        co2: +(350 + Math.random() * 400).toFixed(0),
      }]);
    }, 3000);
    return () => clearInterval(id);
  }, [live]);

  const cur = data[data.length - 1];
  const sensors = [
    { key: 'temperature', icon: FiThermometer, val: cur.temperature, unit: t('dash.unit_c'), label: t('dash.temp'), color: '#f97316', grad: 'from-orange-500 to-red-500' },
    { key: 'humidity', icon: FiDroplet, val: cur.humidity, unit: t('dash.unit_p'), label: t('dash.hum'), color: '#3b82f6', grad: 'from-blue-500 to-cyan-500' },
    { key: 'light', icon: FiSun, val: cur.light, unit: t('dash.unit_lux'), label: t('dash.light'), color: '#eab308', grad: 'from-yellow-500 to-amber-500' },
    { key: 'co2', icon: FiWind, val: cur.co2, unit: t('dash.unit_ppm'), label: t('dash.co2'), color: '#a855f7', grad: 'from-purple-500 to-pink-500' },
  ];

  return (
    <motion.div initial="hidden" animate="show" className="pt-24 pb-16">
      <section className="section-pad bg-gradient-to-b from-navy-950 to-navy-900/60">
        <motion.div variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fade} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">{t('dash.title')}</h1>
              <p className="text-white/40 mt-2">{t('dash.sub')}</p>
            </div>
            <button onClick={() => setLive(!live)}
              className={`self-start px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${live ? 'bg-primary-500/15 text-primary-400 border border-primary-500/25 shadow-lg shadow-primary-500/10' : 'bg-white/5 text-white/40 border border-white/10'}`}>
              {live ? '🟢 Live' : '⏸ Paused'}
            </button>
          </motion.div>

          {/* Sensor Cards */}
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {sensors.map(s => {
              const status = getStatus(s.key, s.val);
              return (
                <motion.div key={s.key} variants={fade} className="glass p-6 card-interactive">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-lg`}>
                      <s.icon className="text-white text-lg" />
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${status === 'optimal' ? 'badge-green' : status === 'warning' ? 'badge-yellow' : 'badge-red'}`}>
                      {t(`dash.${status}`)}
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">{s.val}<span className="text-lg text-white/40 ml-1">{s.unit}</span></div>
                  <div className="text-white/35 text-sm mt-1">{s.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts */}
          <motion.div variants={fade} className="grid lg:grid-cols-2 gap-6 mb-10">
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-4">{t('dash.temp')} & {t('dash.hum')}</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="gTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity={0.25} /><stop offset="100%" stopColor="#f97316" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gHum" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} /><stop offset="100%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="temperature" stroke="#f97316" fill="url(#gTemp)" strokeWidth={2} />
                  <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="url(#gHum)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-4">{t('dash.light')} & {t('dash.co2')}</h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="light" stroke="#eab308" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="co2" stroke="#a855f7" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div variants={fade} className="glass p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FiAlertTriangle className="text-yellow-400" /> {t('dash.alerts')}
            </h3>
            <div className="space-y-3">
              {[
                { msg: t('dash.a1'), type: 'critical', active: cur.temperature > 26 },
                { msg: t('dash.a2'), type: 'warning', active: cur.humidity < 70 },
                { msg: t('dash.a3'), type: 'warning', active: cur.co2 > 600 },
              ].map((a, i) => (
                <div key={i} className={`p-4 rounded-xl border-l-4 transition-all ${a.active ? (a.type === 'critical' ? 'bg-red-500/5 border-red-500' : 'bg-yellow-500/5 border-yellow-500') : 'bg-white/2 border-white/10 opacity-40'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${a.active ? (a.type === 'critical' ? 'bg-red-400 animate-pulse' : 'bg-yellow-400 animate-pulse') : 'bg-white/20'}`} />
                    <p className={`text-sm ${a.active ? 'text-white/80' : 'text-white/30'}`}>{a.msg}</p>
                    {a.active && <span className={`ml-auto text-xs font-semibold ${a.type === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>ACTIVE</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}
