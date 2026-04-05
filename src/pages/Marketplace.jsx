import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiZap, FiShield, FiActivity, FiHeart, FiInfo } from 'react-icons/fi';

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const PRODUCTS = [
  { key: 'p1', emoji: '🍄', badge: 'Best Seller', rating: 4.8 },
  { key: 'p2', emoji: '🫙', badge: 'Popular', rating: 4.6 },
  { key: 'p3', emoji: '💊', badge: 'Easy Use', rating: 4.7 },
  { key: 'p4', emoji: '🍵', badge: 'New', rating: 4.5 },
];

const DOSAGE = {
  child:   { immunity: 'Mix ¼ tsp Immune booster with warm milk once daily in the morning.', energy: 'Add ¼ tsp Immune booster to smoothie or juice, 3–4 times a week.', wellness: 'Small daily intake of ¼ tsp with warm water or honey.', recovery: 'Mix ¼ tsp with water after physical activity.' },
  adult:   { immunity: 'Take ½–1 tsp Immune booster with warm water daily, preferably morning.', energy: 'Take 1 tsp Immune booster or 2 capsules 30 min before exercise.', wellness: '½ tsp daily with warm water. Can mix with tea or coffee.', recovery: 'Take 1 tsp Immune booster with protein shake after workouts for fast muscle repair.' },
  elderly: { immunity: 'Take ¼–½ tsp Immune booster with warm water daily. Start with smaller dose.', energy: 'Take ½ tsp Immune booster with warm milk in the morning for sustained energy.', wellness: 'Small daily intake of ¼ tsp with warm water. Consult doctor if on medications.', recovery: 'Take ½ tsp with warm water in the evening for joint and muscle recovery.' },
};

export default function Marketplace() {
  const { t } = useTranslation();
  const [cart, setCart] = useState({});
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [purpose, setPurpose] = useState('');

  const addToCart = (key) => setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  const totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
  
  const getDosageResult = () => {
    if (!age || !weight || !purpose) return null;
    let base = DOSAGE[age]?.[purpose];
    if (!base) return null;
    let wMod = '';
    if (weight === 'light') wMod = ' (We suggest reducing the standard portion by 20% based on your weight class.)';
    if (weight === 'heavy') wMod = ' (You may safely increase the portion by 20% based on your weight class.)';
    return base + wMod;
  };
  const dosageResult = getDosageResult();

  return (
    <motion.div initial="hidden" animate="show" className="pt-24 pb-16">
      {/* Header */}
      <section className="section-pad bg-gradient-to-b from-navy-950 to-navy-900/60 text-center">
        <motion.div variants={stagger} className="max-w-3xl mx-auto">
          <motion.h1 variants={fade} className="text-3xl md:text-5xl font-bold gradient-text mb-4">{t('market.title')}</motion.h1>
          <motion.p variants={fade} className="text-white/50 text-lg">{t('market.sub')}</motion.p>
        </motion.div>
      </section>

      {/* Benefits */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="max-w-6xl mx-auto px-4 mt-14 mb-14">
        <motion.h2 variants={fade} className="text-xl font-bold text-white mb-6 text-center">{t('market.benefitsTitle')}</motion.h2>
        <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FiZap, title: t('market.ben1'), desc: t('market.ben1d'), color: 'text-yellow-400' },
            { icon: FiShield, title: t('market.ben2'), desc: t('market.ben2d'), color: 'text-green-400' },
            { icon: FiActivity, title: t('market.ben3'), desc: t('market.ben3d'), color: 'text-blue-400' },
            { icon: FiHeart, title: t('market.ben4'), desc: t('market.ben4d'), color: 'text-red-400' },
          ].map((b, i) => (
            <motion.div key={i} variants={fade} className="glass p-5 card-interactive text-center">
              <b.icon className={`text-2xl mx-auto mb-2 ${b.color}`} />
              <h3 className="text-white font-semibold text-sm mb-1">{b.title}</h3>
              <p className="text-white/35 text-xs">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Products */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.div key={p.key} variants={fade} className="glass overflow-hidden card-interactive group">
              <div className="p-6 pb-3">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-4xl group-hover:scale-110 transition-transform inline-block">{p.emoji}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-lg bg-primary-500/15 text-primary-400 font-semibold">{p.badge}</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-0.5">{t(`market.${p.key}`)}</h3>
                <p className="text-white/30 text-xs mb-2">{t(`market.${p.key}d`)}</p>
                <div className="flex items-center gap-1.5">
                  <FiStar className="text-yellow-400 text-xs" style={{ fill: '#facc15' }} />
                  <span className="text-white/50 text-xs">{p.rating}</span>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <div className="text-xl font-extrabold text-primary-400">{t(`market.${p.key}p`)}</div>
                <button onClick={() => addToCart(p.key)}
                  className="flex items-center gap-1.5 bg-primary-500/15 text-primary-400 text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-primary-500/25 transition-all cursor-pointer active:scale-95">
                  <FiShoppingCart className="text-sm" />
                  {cart[p.key] ? `(${cart[p.key]})` : t('market.addCart')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {totalCount > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mt-10">
            <Link to="/cart" state={{ cartState: cart }} className="btn-primary flex items-center gap-3 !px-8 !py-4 text-lg shadow-xl shadow-primary-500/20 group hover:scale-105 transition-all">
              <FiShoppingCart className="text-xl group-hover:-rotate-12 transition-transform" /> 
              Proceed to Checkout ({totalCount} items)
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Dosage Guidance */}
      <section className="max-w-2xl mx-auto px-4 mb-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fade} className="text-2xl font-bold text-white mb-6 text-center">{t('market.dosage')}</motion.h2>

          <motion.div variants={fade} className="glass p-6 space-y-6">
            {/* Age */}
            <div>
              <label className="text-white/50 text-sm mb-3 block">{t('market.age')}</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'child', label: t('market.child'), emoji: '👶' },
                  { key: 'adult', label: t('market.adult'), emoji: '🧑' },
                  { key: 'elderly', label: t('market.elderly'), emoji: '👴' },
                ].map(a => (
                  <button key={a.key} onClick={() => setAge(a.key)}
                    className={`p-4 rounded-xl text-center transition-all cursor-pointer ${age === a.key ? 'bg-primary-500/15 border-2 border-primary-400/50 shadow-lg shadow-primary-500/10' : 'bg-white/3 border-2 border-transparent hover:bg-white/5'}`}>
                    <div className="text-2xl mb-1">{a.emoji}</div>
                    <div className="text-white text-xs font-medium">{a.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="text-white/50 text-sm mb-3 block">{t('market.weight', 'Weight Category')}</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'light', label: t('market.light', '< 50 kg'), emoji: '🪶' },
                  { key: 'average', label: t('market.average', '50–80 kg'), emoji: '⚖️' },
                  { key: 'heavy', label: t('market.heavy', '> 80 kg'), emoji: '🏋️' },
                ].map(w => (
                  <button key={w.key} onClick={() => setWeight(w.key)}
                    className={`p-4 rounded-xl text-center transition-all cursor-pointer ${weight === w.key ? 'bg-primary-500/15 border-2 border-primary-400/50 shadow-lg shadow-primary-500/10' : 'bg-white/3 border-2 border-transparent hover:bg-white/5'}`}>
                    <div className="text-2xl mb-1">{w.emoji}</div>
                    <div className="text-white text-xs font-medium">{w.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="text-white/50 text-sm mb-3 block">{t('market.purpose')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'immunity', label: t('market.immunity'), icon: FiShield, color: 'text-green-400' },
                  { key: 'energy', label: t('market.energy'), icon: FiZap, color: 'text-yellow-400' },
                  { key: 'wellness', label: t('market.wellness'), icon: FiHeart, color: 'text-blue-400' },
                  { key: 'recovery', label: t('market.recovery', 'Recovery'), icon: FiActivity, color: 'text-orange-400' },
                ].map(p => (
                  <button key={p.key} onClick={() => setPurpose(p.key)}
                    className={`p-4 rounded-xl text-center transition-all cursor-pointer ${purpose === p.key ? 'bg-primary-500/15 border-2 border-primary-400/50 shadow-lg shadow-primary-500/10' : 'bg-white/3 border-2 border-transparent hover:bg-white/5'}`}>
                    <p.icon className={`text-xl mx-auto mb-1 ${p.color}`} />
                    <div className="text-white text-xs font-medium">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Result */}
          {dosageResult && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="glass-strong p-6 mt-4 border-l-4 border-primary-500">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><FiInfo className="text-primary-400" /> {t('market.result')}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{dosageResult}</p>
            </motion.div>
          )}

          {/* Disclaimer */}
          <div className="mt-4 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
            <p className="text-yellow-400/60 text-xs flex items-start gap-2"><FiInfo className="flex-shrink-0 mt-0.5" /> {t('market.disclaimer')}</p>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
