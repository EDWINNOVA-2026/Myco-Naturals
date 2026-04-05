import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiPackage, FiPlus, FiEye, FiEdit } from 'react-icons/fi';

const mockProducts = [
  { id: 1, name: 'Dried Cordyceps Militaris', price: 15000, unit: '100g', stock: 50, orders: 12, status: 'active' },
  { id: 2, name: 'Immune booster', price: 8000, unit: '50g', stock: 30, orders: 8, status: 'active' },
  { id: 3, name: 'Cordyceps Extract Capsules', price: 2500, unit: '60 caps', stock: 100, orders: 25, status: 'active' },
  { id: 4, name: 'Fresh Cordyceps', price: 20000, unit: '100g', stock: 0, orders: 5, status: 'out_of_stock' },
];

const mockOrders = [
  { id: 'ORD-001', product: 'Dried Cordyceps Militaris', qty: 2, total: 30000, buyer: 'Wellness Store, Chennai', status: 'completed', date: '2026-04-02' },
  { id: 'ORD-002', product: 'Immune booster', qty: 5, total: 40000, buyer: 'Ayurvedic Center, Bangalore', status: 'shipped', date: '2026-04-03' },
  { id: 'ORD-003', product: 'Cordyceps Extract Capsules', qty: 10, total: 25000, buyer: 'Health Store, Hyderabad', status: 'processing', date: '2026-04-04' },
];

export default function FarmerMarketplace() {
  const { t } = useLanguage();
  const [tab, setTab] = useState('products');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{t('marketplace.title')}</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary !py-2 !px-5 !text-sm flex items-center gap-2">
          <FiPlus /> {t('marketplace.listProduct')}
        </button>
      </div>

      <div className="flex gap-2">
        {['products', 'orders'].map(key => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === key ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'text-white/50 hover:text-white/70'}`}
          >
            {key === 'products' ? 'My Products' : t('marketplace.orders')}
          </button>
        ))}
      </div>

      {tab === 'products' ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {mockProducts.map(p => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 card-hover">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-semibold text-sm">{p.name}</h3>
                  <p className="text-white/40 text-xs mt-1">Per {p.unit}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg ${p.status === 'active' ? 'status-optimal' : 'status-critical'}`}>
                  {p.status === 'active' ? 'Active' : 'Out of Stock'}
                </span>
              </div>
              <div className="text-xl font-bold text-primary-400">₹{p.price.toLocaleString()}</div>
              <div className="flex gap-4 mt-3 text-xs text-white/40">
                <span>Stock: {p.stock}</span>
                <span>Orders: {p.orders}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {mockOrders.map(o => (
            <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-sm">{o.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${o.status === 'completed' ? 'status-optimal' : o.status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'status-warning'}`}>
                      {o.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mt-1">{o.product} × {o.qty}</p>
                  <p className="text-white/30 text-xs mt-1">{o.buyer} • {o.date}</p>
                </div>
                <div className="text-primary-400 font-bold">₹{o.total.toLocaleString()}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="glass-card p-6 w-full max-w-md">
            <h3 className="text-white font-semibold text-lg mb-6">{t('marketplace.listProduct')}</h3>
            <form onSubmit={e => { e.preventDefault(); setShowForm(false); }} className="space-y-4">
              <input type="text" placeholder="Product Name" className="input-field" required />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Price (₹)" className="input-field" required />
                <input type="text" placeholder="Unit (e.g. 100g)" className="input-field" required />
              </div>
              <input type="number" placeholder="Stock Quantity" className="input-field" required />
              <textarea placeholder="Description" className="input-field h-20 resize-none" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1 !py-2">Cancel</button>
                <button type="submit" className="btn-primary flex-1 !py-2">List Product</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
