import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiShoppingCart, FiStar, FiHeart, FiZap, FiShield, FiActivity } from 'react-icons/fi';

const products = [
  { id: 1, name: 'Premium Dried Cordyceps', price: 15000, unit: '100g', rating: 4.8, reviews: 124, badge: 'Best Seller', image: '🍄' },
  { id: 2, name: 'Immune booster', price: 8000, unit: '50g', rating: 4.6, reviews: 89, badge: 'Popular', image: '🫙' },
  { id: 3, name: 'Cordyceps Capsules', price: 2500, unit: '60 caps', rating: 4.7, reviews: 203, badge: 'Easy Use', image: '💊' },
  { id: 4, name: 'Cordyceps Tea Blend', price: 1800, unit: '30 bags', rating: 4.5, reviews: 67, badge: 'New', image: '🍵' },
  { id: 5, name: 'Cordyceps Tincture', price: 3500, unit: '30ml', rating: 4.9, reviews: 45, badge: 'Premium', image: '💧' },
  { id: 6, name: 'Cordyceps Energy Bar', price: 500, unit: '1 bar', rating: 4.3, reviews: 156, badge: 'Snack', image: '🍫' },
];

const benefits = [
  { icon: FiZap, title: 'Boosts Energy', desc: 'Natural ATP production enhancer', color: 'text-yellow-400' },
  { icon: FiShield, title: 'Immunity Support', desc: 'Strengthens immune response', color: 'text-green-400' },
  { icon: FiActivity, title: 'Stamina Enhancement', desc: 'Improves physical endurance', color: 'text-blue-400' },
  { icon: FiHeart, title: 'Heart Health', desc: 'Supports cardiovascular function', color: 'text-red-400' },
];

export default function ConsumerHome() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Benefits */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Why Cordyceps?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-card p-5 card-hover text-center">
              <b.icon className={`text-2xl mx-auto mb-3 ${b.color}`} />
              <h3 className="text-white font-semibold text-sm mb-1">{b.title}</h3>
              <p className="text-white/40 text-xs">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{t('consumer.browse')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
              className="glass-card overflow-hidden card-hover group">
              <div className="p-6 pb-0">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-4xl">{p.image}</span>
                  <span className="text-xs px-2 py-1 rounded-lg bg-primary-500/20 text-primary-400 font-medium">{p.badge}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{p.name}</h3>
                <p className="text-white/30 text-xs">Per {p.unit}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-400 text-xs fill-yellow-400" />
                    <span className="text-white/60 text-xs">{p.rating}</span>
                  </div>
                  <span className="text-white/20 text-xs">({p.reviews} reviews)</span>
                </div>
              </div>
              <div className="p-6 pt-4 flex items-center justify-between">
                <div className="text-xl font-bold text-primary-400">₹{p.price.toLocaleString()}</div>
                <button className="flex items-center gap-2 bg-primary-500/20 text-primary-400 text-sm font-medium px-4 py-2 rounded-xl hover:bg-primary-500/30 transition-colors">
                  <FiShoppingCart className="text-sm" /> {t('marketplace.addToCart')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
