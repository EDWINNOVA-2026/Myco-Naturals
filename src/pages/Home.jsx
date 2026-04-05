import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiZap, FiActivity, FiHeart, FiShield, FiTrendingUp, FiGrid, FiTarget, FiBook, FiBox, FiServer, FiBell, FiGlobe, FiEye, FiUsers, FiShoppingCart } from 'react-icons/fi';
import { GiMushroom } from 'react-icons/gi';

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const guideRef = useRef(null);
  const howItWorksRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div initial="hidden" animate="show" className="overflow-x-hidden">
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-800 to-primary-900/40" />
        <div className="absolute top-32 -left-32 w-[500px] h-[500px] bg-primary-500/8 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 -right-20 w-[400px] h-[400px] bg-navy-400/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-400/3 rounded-full blur-[150px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-24 pb-16">
          <motion.div variants={fade}>
            <span className="badge-green mb-6 inline-flex"><GiMushroom className="text-sm" /> Smart Farming Ecosystem</span>
          </motion.div>

          <motion.h1 variants={fade} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
            <span className="gradient-text">{t('hero.title')}</span>
          </motion.h1>

          <motion.p variants={fade} className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.sub')}
          </motion.p>

          <motion.div variants={fade} className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => scrollToSection(guideRef)} className="btn-primary text-base">{t('hero.cta1')} <FiArrowRight /></button>
            <button onClick={() => navigate('/franchise')} className="btn-outline text-base">{t('hero.cta2')}</button>
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works (NEW) ─── */}
      <section ref={howItWorksRef} className="section-pad bg-gradient-to-b from-navy-950 to-navy-900/80">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fade} className="badge-green mb-4 inline-flex">{t('howitworks.badge')}</motion.span>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-white">{t('howitworks.title')}</motion.h2>
          </motion.div>

          {/* Steps Flow - Horizontal on desktop */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-6 gap-3 md:gap-4">
            {[
              { icon: FiBook, key: 's1', color: 'from-blue-500/15 to-cyan-500/5' },
              { icon: FiBox, key: 's2', color: 'from-green-500/15 to-emerald-500/5' },
              { icon: FiServer, key: 's3', color: 'from-purple-500/15 to-pink-500/5' },
              { icon: FiBell, key: 's4', color: 'from-yellow-500/15 to-orange-500/5' },
              { icon: FiShoppingCart, key: 's5', color: 'from-red-500/15 to-rose-500/5' },
              { icon: FiShoppingCart, key: 's6', color: 'from-indigo-500/15 to-blue-500/5' },
            ].map((step, idx) => (
              <motion.div key={idx} variants={fade} className="relative">
                <div className={`glass p-6 text-center card-interactive group h-full bg-gradient-to-br ${step.color}`}>
                  <div className="mb-4 text-3xl text-white/70 group-hover:text-primary-400 transition-colors h-10 flex items-center justify-center">
                    <step.icon />
                  </div>
                  <div className="text-sm font-bold text-white mb-2">{t(`howitworks.${step.key}`)}</div>
                  <p className="text-white/35 text-xs leading-relaxed">{t(`howitworks.${step.key}d`)}</p>
                </div>
                {idx < 5 && (
                  <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <FiArrowRight className="text-primary-400/30 text-lg" />
                  </div>
                )}
              </motion.div>
            ))}</motion.div>
        </div>
      </section>

      {/* ─── Why MycoNaturals (NEW) ─── */}
      <section className="section-pad bg-navy-950">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fade} className="badge-green mb-4 inline-flex">{t('whyus.badge')}</motion.span>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-white">{t('whyus.title')}</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-5 gap-6">
            {[
              { icon: FiGlobe, key: 'f1', color: 'text-blue-400' },
              { icon: FiEye, key: 'f2', color: 'text-green-400' },
              { icon: FiBook, key: 'f3', color: 'text-purple-400' },
              { icon: FiUsers, key: 'f4', color: 'text-yellow-400' },
              { icon: FiShoppingCart, key: 'f5', color: 'text-pink-400' },
            ].map((item, i) => (
              <motion.div key={i} variants={fade} className="glass p-6 card-interactive group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`text-2xl ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t(`whyus.${item.key}`)}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{t(`whyus.${item.key}d`)}</p>
              </motion.div>
            ))}</motion.div>
        </div>
      </section>

      {/* ─── Why Cordyceps ─── */}
      <section ref={guideRef} className="section-pad bg-gradient-to-b from-navy-950 to-navy-900/80">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fade} className="badge-green mb-4 inline-flex">{t('why.badge')}</motion.span>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-white">{t('why.title')}</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FiTrendingUp, title: t('why.v1'), desc: t('why.v1d'), grad: 'from-green-500/15 to-emerald-500/5' },
              { icon: FiGrid, title: t('why.v2'), desc: t('why.v2d'), grad: 'from-blue-500/15 to-cyan-500/5' },
              { icon: FiTarget, title: t('why.v3'), desc: t('why.v3d'), grad: 'from-purple-500/15 to-pink-500/5' },
            ].map((c, i) => (
              <motion.div key={i} variants={fade} className="glass p-8 card-interactive group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <c.icon className="text-xl text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Scientific Benefits ─── */}
      <section className="section-pad bg-navy-950">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fade} className="badge-green mb-4 inline-flex">{t('benefits.badge')}</motion.span>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-white">{t('benefits.title')}</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: FiZap, title: t('benefits.b1'), desc: t('benefits.b1d'), color: 'text-yellow-400' },
              { icon: FiActivity, title: t('benefits.b2'), desc: t('benefits.b2d'), color: 'text-blue-400' },
              { icon: FiHeart, title: t('benefits.b3'), desc: t('benefits.b3d'), color: 'text-red-400' },
              { icon: FiShield, title: t('benefits.b4'), desc: t('benefits.b4d'), color: 'text-green-400' },
              { icon: FiTrendingUp, title: t('benefits.b5'), desc: t('benefits.b5d'), color: 'text-purple-400' },
            ].map((b, i) => (
              <motion.div key={i} variants={fade} className="glass p-6 card-interactive text-center">
                <b.icon className={`text-3xl mx-auto mb-4 ${b.color}`} />
                <h3 className="text-white font-bold mb-2">{b.title}</h3>
                <p className="text-white/35 text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section className="section-pad bg-gradient-to-b from-navy-950 to-navy-900/60">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="glass-strong p-10 md:p-14 text-center">
            <motion.span variants={fade} className="badge-green mb-4 inline-flex">{t('about.badge')}</motion.span>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-white mb-6">{t('about.title')}</motion.h2>
            <motion.p variants={fade} className="text-white/50 text-lg leading-relaxed">{t('about.text')}</motion.p>
            <motion.div variants={fade} className="mt-8">
              <button onClick={() => navigate('/franchise')} className="btn-primary">{t('hero.cta2')} <FiArrowRight /></button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Removed Franchise Anchor as it routes to new page */}
    </motion.div>
  );
}
