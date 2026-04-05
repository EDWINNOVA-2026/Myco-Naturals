import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiMapPin, FiPhone, FiUser } from 'react-icons/fi';

const ALL_PRODUCTS = {
  'p1_250': { id: 'p1_250', name: 'Premium Dried Cordyceps', price: 15000, unit: '250g (1/4 kg)', image: '🍄' },
  'p1_500': { id: 'p1_500', name: 'Premium Dried Cordyceps', price: 30000, unit: '500g (1/2 kg)', image: '🍄' },
  'p1_1000': { id: 'p1_1000', name: 'Premium Dried Cordyceps', price: 60000, unit: '1kg', image: '🍄' },
  
  'p2_100': { id: 'p2_100', name: 'Immune booster', price: 500, unit: '100g', image: '🫙' },
  'p2_250': { id: 'p2_250', name: 'Immune booster', price: 1250, unit: '250g', image: '🫙' },
  'p2_500': { id: 'p2_500', name: 'Immune booster', price: 2500, unit: '500g', image: '🫙' },
  'p2_1000': { id: 'p2_1000', name: 'Immune booster', price: 5000, unit: '1kg', image: '🫙' },

  'p3_30': { id: 'p3_30', name: 'Cordyceps Capsules', price: 500, unit: '30 caps', image: '💊' },
  'p3_60': { id: 'p3_60', name: 'Cordyceps Capsules', price: 1000, unit: '60 caps', image: '💊' },
  'p3_90': { id: 'p3_90', name: 'Cordyceps Capsules', price: 1500, unit: '90 caps', image: '💊' },

  'p4_1': { id: 'p4_1', name: 'Cordyceps Tea Blend', price: 30, unit: '1 Sachet (3g)', image: '🍵' },
  'p4_10': { id: 'p4_10', name: 'Cordyceps Tea Blend', price: 300, unit: '1 Packet (10 Sachets)', image: '🍵' },
};

export default function Cart() {
  const { t } = useTranslation();
  const location = useLocation();
  
  const [items, setItems] = useState(() => {
    if (location.state?.cartState) {
      const initialItems = [];
      Object.entries(location.state.cartState).forEach(([key, qty]) => {
          if (ALL_PRODUCTS[key] && qty > 0) {
              initialItems.push({ ...ALL_PRODUCTS[key], qty });
          }
      });
      return initialItems;
    }
    return [];
  });
  const [ordered, setOrdered] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendToWhatsApp = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill all fields');
      return;
    }

    // Format order message
    const orderDetails = items.map(item => `${item.name} (${item.unit}) × ${item.qty} = ₹${(item.price * item.qty).toLocaleString()}`).join('\n');
    
    const message = `🛒 *New Order from MycoNaturals*\n\n👤 *Customer Name:* ${formData.name}\n📱 *Phone:* ${formData.phone}\n📍 *Address:* ${formData.address}\n\n📦 *Order Details:*\n${orderDetails}\n\n💰 *Total Amount:* ₹${total.toLocaleString()}\n\n---\nThank you for ordering!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919360370893?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear form and show confirmation
    setOrdered(true);
    setShowCheckout(false);
    setFormData({ name: '', phone: '', address: '' });
  };

  if (ordered) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center max-w-md mx-auto mt-24">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-white mb-2">Order Placed!</h2>
        <p className="text-white/40">Thank you for your order. You will receive a confirmation shortly.</p>
        <button onClick={() => { setItems(initialCart); setOrdered(false); }} className="btn-primary mt-6">Continue Shopping</button>
      </motion.div>
    );
  }

  return (
    <div className="pt-24 pb-16 space-y-6 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-white">{t('consumer.cart', 'Shopping Cart')}</h2>

      {items.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <FiShoppingBag className="text-4xl text-white/20 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Your cart is empty</h3>
          <p className="text-white/40 text-sm">Browse our products to get started</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-card p-5 flex items-center gap-4">
                <div className="text-3xl">{item.image}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                  <p className="text-white/30 text-xs">Per {item.unit}</p>
                  <p className="text-primary-400 font-bold mt-1">₹{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10">
                    <FiMinus className="text-sm" />
                  </button>
                  <span className="text-white font-medium w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10">
                    <FiPlus className="text-sm" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">₹{(item.price * item.qty).toLocaleString()}</p>
                  <button onClick={() => remove(item.id)} className="text-red-400/50 hover:text-red-400 mt-1">
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass-card p-6 h-fit sticky top-24">
            <h3 className="text-white font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-white/50 truncate mr-2">{i.name} × {i.qty}</span>
                  <span className="text-white/70">₹{(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="text-white font-medium">Total</span>
                <span className="text-primary-400 font-bold text-lg">₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => setShowCheckout(true)} className="btn-primary w-full">{t('marketplace.buy')}</button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="glass-card p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Delivery Details</h3>

            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-2 flex items-center gap-2">
                  <FiUser className="text-sm" />
                  Full Name
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-primary-400" />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 flex items-center gap-2">
                  <FiPhone className="text-sm" />
                  Phone Number
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  placeholder="10-digit phone number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-primary-400" />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 flex items-center gap-2">
                  <FiMapPin className="text-sm" />
                  Delivery Address
                </label>
                <textarea name="address" value={formData.address} onChange={handleInputChange}
                  placeholder="House no, Street, Area, City, Pincode" rows="3" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-primary-400" />
              </div>

              <div className="bg-primary-400/10 border border-primary-400/30 p-4 rounded-lg">
                <p className="text-primary-300 text-sm"><strong>Total Amount:</strong> ₹{total.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowCheckout(false)} className="flex-1 px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10">Cancel</button>
              <button onClick={sendToWhatsApp} className="flex-1 btn-primary">Send to WhatsApp</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
