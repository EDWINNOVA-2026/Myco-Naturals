import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiInfo, FiHeart, FiZap, FiSun, FiTrendingUp } from 'react-icons/fi';

const dosageTable = {
  child: { 
    light: { immunity: 'Mix ¼ teaspoon Immune booster with warm milk once daily in the morning.', energy: 'Add ¼ teaspoon Immune booster to smoothie or juice, 3-4 times a week.', wellness: 'Small daily intake of ¼ teaspoon with warm water or honey.', performance: 'Not recommended for children under 12 years.' },
    medium: { immunity: 'Mix ¼ teaspoon Immune booster with warm milk once daily.', energy: 'Add ¼ teaspoon Immune booster to smoothie, 3-4 times a week.', wellness: 'Small daily intake of ¼ teaspoon with warm water.', performance: 'Not recommended for children.' },
    heavy: { immunity: 'Mix ½ teaspoon Immune booster with warm milk once daily.', energy: 'Add ½ teaspoon Immune booster to smoothie, 3-4 times a week.', wellness: 'Daily intake of ½ teaspoon with warm water.', performance: 'Consult healthcare provider first.' },
  },
  adult: { 
    light: { immunity: 'Take ½ teaspoon Immune booster with warm water daily, morning preferred.', energy: 'Take 1 teaspoon Immune booster or 2 capsules 30 minutes before exercise.', wellness: 'Recommended ½ teaspoon daily with warm water.', performance: '1 teaspoon Immune booster 30-45 minutes before intense activity for peak performance.' },
    medium: { immunity: 'Take ½ to 1 teaspoon Immune booster with warm water daily, preferably in the morning.', energy: 'Take 1 teaspoon Immune booster or 2 capsules 30 minutes before exercise or activity.', wellness: 'Recommended ½ to 1 teaspoon daily with warm water. Can be mixed with tea or coffee.', performance: '1 teaspoon Immune booster or 2-3 capsules 30 minutes before exercise for enhanced stamina.' },
    heavy: { immunity: 'Take 1 teaspoon Immune booster with warm water daily.', energy: 'Take 1.5 teaspoons Immune booster or 3 capsules 30 minutes before exercise.', wellness: 'Recommended 1 teaspoon daily with warm water for sustained wellness.', performance: '1.5 teaspoons Immune booster or 3 capsules 30 minutes before intense physical activity.' },
  },
  elderly: { 
    light: { immunity: 'Take ¼ teaspoon Immune booster with warm water daily. Start with smaller dose.', energy: 'Take ½ teaspoon Immune booster with warm milk in the morning for sustained energy.', wellness: 'Small daily intake of ¼ teaspoon with warm water. Consult doctor if on medications.', performance: 'Consult healthcare provider before use.' },
    medium: { immunity: 'Take ¼ to ½ teaspoon Immune booster with warm water daily.', energy: 'Take ½ teaspoon Immune booster with warm milk in the morning.', wellness: 'Daily intake of ¼ to ½ teaspoon with warm water.', performance: 'Recommended ½ teaspoon daily, morning preferred. Consult doctor.' },
    heavy: { immunity: 'Take ½ teaspoon Immune booster with warm water daily.', energy: 'Take ½ to 1 teaspoon Immune booster with warm milk in the morning.', wellness: 'Daily intake of ½ teaspoon with warm water or herbal tea.', performance: 'Consult healthcare provider before use for fitness activities.' },
  },
};

export default function DosageGuide() {
  const { t } = useLanguage();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [purpose, setPurpose] = useState('');
  const result = age && weight && purpose ? dosageTable[age]?.[weight]?.[purpose] : null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-white">{t('dosage.title')}</h2>

      <div className="glass-card p-6">
        <div className="space-y-6">
          {/* Age Group */}
          <div>
            <label className="text-white/60 text-sm mb-3 block">{t('dosage.age')}</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'child', label: t('dosage.child'), emoji: '👶', sub: '5-17 yrs' },
                { key: 'adult', label: t('dosage.adult'), emoji: '🧑', sub: '18-59 yrs' },
                { key: 'elderly', label: t('dosage.elderly'), emoji: '👴', sub: '60+ yrs' },
              ].map(a => (
                <button key={a.key} onClick={() => setAge(a.key)}
                  className={`p-4 rounded-xl text-center transition-all ${age === a.key ? 'bg-primary-500/20 border-2 border-primary-400' : 'bg-white/5 border-2 border-transparent hover:bg-white/8'}`}>
                  <div className="text-2xl mb-1">{a.emoji}</div>
                  <div className="text-white text-sm font-medium">{a.label}</div>
                  <div className="text-white/30 text-xs">{a.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Weight Category */}
          <div>
            <label className="text-white/60 text-sm mb-3 block">Body Weight</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'light', label: 'Light', emoji: '⚖️', sub: '< 50 kg' },
                { key: 'medium', label: 'Medium', emoji: '⚖️', sub: '50-75 kg' },
                { key: 'heavy', label: 'Heavy', emoji: '⚖️', sub: '> 75 kg' },
              ].map(w => (
                <button key={w.key} onClick={() => setWeight(w.key)}
                  className={`p-4 rounded-xl text-center transition-all ${weight === w.key ? 'bg-primary-500/20 border-2 border-primary-400' : 'bg-white/5 border-2 border-transparent hover:bg-white/8'}`}>
                  <div className="text-2xl mb-1">{w.emoji}</div>
                  <div className="text-white text-sm font-medium">{w.label}</div>
                  <div className="text-white/30 text-xs">{w.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="text-white/60 text-sm mb-3 block">{t('dosage.purpose')}</label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { key: 'immunity', label: t('dosage.immunity'), icon: FiHeart, color: 'text-green-400' },
                { key: 'energy', label: t('dosage.energy'), icon: FiZap, color: 'text-yellow-400' },
                { key: 'wellness', label: t('dosage.wellness'), icon: FiSun, color: 'text-blue-400' },
                { key: 'performance', label: 'Performance', icon: FiTrendingUp, color: 'text-purple-400' },
              ].map(p => (
                <button key={p.key} onClick={() => setPurpose(p.key)}
                  className={`p-4 rounded-xl text-center transition-all ${purpose === p.key ? 'bg-primary-500/20 border-2 border-primary-400' : 'bg-white/5 border-2 border-transparent hover:bg-white/8'}`}>
                  <p.icon className={`text-2xl mx-auto mb-1 ${p.color}`} />
                  <div className="text-white text-sm font-medium">{p.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 border-l-4 border-primary-400">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <FiInfo className="text-primary-400" /> {t('dosage.result')}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">{result}</p>
        </motion.div>
      )}

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
        <p className="text-yellow-400/70 text-xs flex items-start gap-2">
          <FiInfo className="flex-shrink-0 mt-0.5" />
          {t('dosage.disclaimer')}
        </p>
      </div>
    </div>
  );
}
