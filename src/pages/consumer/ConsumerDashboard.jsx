import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiHome, FiShoppingBag, FiHeart, FiShoppingCart, FiMenu, FiLogOut } from 'react-icons/fi';
import { GiMushroom } from 'react-icons/gi';
import ConsumerHome from './ConsumerHome';
import DosageGuide from './DosageGuide';
import Cart from './Cart';

const navItems = [
  { path: '/consumer', icon: FiHome, key: 'dashboard' },
  { path: '/consumer/dosage', icon: FiHeart, key: 'dosage' },
  { path: '/consumer/cart', icon: FiShoppingCart, key: 'cart' },
];

export default function ConsumerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, lang, setLang, LANGUAGES } = useLanguage();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-secondary-900 flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-secondary-900/95 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <GiMushroom className="text-white text-lg" />
            </div>
            <span className="text-white font-bold">MycoNaturals</span>
          </Link>
          <div className="mb-8 p-3 glass-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0) || 'C'}
              </div>
              <div>
                <div className="text-white text-sm font-medium">{user?.name}</div>
                <div className="text-blue-400 text-xs">🛒 Consumer</div>
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map(item => (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}>
                <item.icon className="text-lg" />
                {t(`consumer.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
          <div className="flex flex-wrap gap-1 mb-4">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)}
                className={`px-2 py-1 rounded text-xs ${lang === l.code ? 'bg-primary-500/20 text-primary-400' : 'text-white/30 hover:text-white/50'}`}>
                {l.flag}
              </button>
            ))}
          </div>
          <button onClick={logout} className="sidebar-link text-red-400 hover:text-red-300 w-full">
            <FiLogOut className="text-lg" /> {t('nav.logout')}
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-secondary-900/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="lg:hidden text-white text-xl" onClick={() => setSidebarOpen(true)}><FiMenu /></button>
            <h1 className="text-white font-semibold text-lg">{t('consumer.welcome')}, {user?.name?.split(' ')[0]} 👋</h1>
            <Link to="/consumer/cart" className="relative">
              <FiShoppingCart className="text-white/60 text-xl" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-500 rounded-full text-white text-[10px] flex items-center justify-center">3</span>
            </Link>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<ConsumerHome />} />
            <Route path="dosage" element={<DosageGuide />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
