import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe, FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi';
import { GiMushroom } from 'react-icons/gi';
import { useAuth } from '../auth/AuthContext';

const LANGS = [
  { code: 'en', label: 'English', display: 'EN' },
  { code: 'ta', label: 'தமிழ்', display: 'TA' },
  { code: 'kn', label: 'ಕನ್ನಡ', display: 'KN' },
  { code: 'hi', label: 'हिन्दी', display: 'HI' },
  { code: 'te', label: 'తెలుగు', display: 'TE' },
  { code: 'ml', label: 'മലയാളം', display: 'ML' },
];

const NAV = [
  { to: '/', key: 'home' },
  { to: '/guide', key: 'guide' },
  { to: '/franchise', key: 'franchise' },
  { to: '/dashboard', key: 'dashboard' },
  { to: '/marketplace', key: 'marketplace' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getFilteredNav = () => {
    return NAV.filter(n => {
      if (n.key === 'dashboard' || n.key === 'guide') return user?.role === 'farmer';
      if (n.key === 'franchise') return user?.role !== 'farmer';
      return true;
    });
  };
  const currentNav = getFilteredNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    setLangOpen(false);
  };

  const currentLangCode = LANGS.find(l => l.code === i18n.language)?.display || 'EN';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-950/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary-500/20">
              <GiMushroom className="text-white text-lg" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">MycoNaturals</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {currentNav.map(n => (
              <Link key={n.to} to={n.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === n.to ? 'text-primary-400 bg-primary-500/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                {t(`nav.${n.key}`)}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Language Picker */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-sm transition-all">
                <FiGlobe className="text-base" />
                <span className="hidden sm:inline font-mono font-semibold">{currentLangCode}</span>
                <FiChevronDown className={`text-xs transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-44 glass-strong p-1.5 shadow-2xl z-50">
                      {LANGS.map(l => (
                        <button key={l.code} onClick={() => changeLang(l.code)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 ${i18n.language === l.code ? 'bg-primary-500/15 text-primary-400' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                          <span className="font-mono font-semibold">{l.display}</span>
                          <span className="text-white/40">—</span>
                          <span>{l.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2 border-l border-white/10 pl-3 ml-1">
                    <div className="text-xs text-right mr-1">
                        <div className="text-white font-bold">{user.name || user.email.split('@')[0]}</div>
                        <div className="text-primary-400 text-[10px] uppercase tracking-wider">{user.role}</div>
                    </div>
                    <button onClick={logout} className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition" title="Logout">
                        <FiLogOut />
                    </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 border-l border-white/10 pl-3 ml-1">
                    <Link to="/login" className="px-4 py-2 text-sm text-white/70 hover:text-white transition">Log In</Link>
                    <Link to="/signup" className="px-4 py-2 text-sm bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500/20 rounded-lg transition">Sign Up</Link>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all" onClick={() => setOpen(!open)}>
              {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="lg:hidden bg-navy-950/95 backdrop-blur-xl border-t border-white/5 overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {currentNav.map(n => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === n.to ? 'text-primary-400 bg-primary-500/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                  {t(`nav.${n.key}`)}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2">
                {LANGS.map(l => (
                  <button key={l.code} onClick={() => changeLang(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${i18n.language === l.code ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20' : 'text-white/40 bg-white/5 hover:text-white/60'}`}>
                    {l.display}
                  </button>
                ))}
              </div>
              
              <div className="pt-3 border-t border-white/5 mt-2">
                {user ? (
                   <button onClick={() => { logout(); setOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-400/10 rounded-xl transition flex items-center gap-2">
                     <FiLogOut /> Logout ({user.name})
                   </button>
                ) : (
                   <div className="flex flex-col gap-2">
                       <Link to="/login" onClick={() => setOpen(false)} className="w-full px-4 py-2 text-center text-sm bg-white/5 rounded-lg text-white">Log In</Link>
                       <Link to="/signup" onClick={() => setOpen(false)} className="w-full px-4 py-2 text-center text-sm bg-primary-500/20 text-primary-400 rounded-lg">Sign Up</Link>
                   </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
