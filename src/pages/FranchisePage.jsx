import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiX, FiCheckCircle, FiStar } from 'react-icons/fi';

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };
const WHY_ICONS = ['🎓', '📦', '🛠️', '🤝'];

export default function FranchisePage() {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whys = Array.from({ length: 4 }, (_, i) => ({ icon: WHY_ICONS[i], title: t(`franchise.w${i + 1}`), desc: t(`franchise.w${i + 1}d`) }));
  const plans = [
    { key: 'plan1', popular: false },
    { key: 'plan2', popular: true },
    { key: 'plan3', popular: false },
  ];

  return (
    <motion.div initial="hidden" animate="show" className="pt-24 pb-16">
      {/* Header */}
      <section className="section-pad bg-gradient-to-b from-navy-950 to-navy-900/60 text-center">
        <motion.div variants={stagger} className="max-w-3xl mx-auto">
          <motion.h1 variants={fade} className="text-3xl md:text-5xl font-bold gradient-text mb-4">{t('franchise.title')}</motion.h1>
          <motion.p variants={fade} className="text-white/50 text-lg">{t('franchise.sub')}</motion.p>
        </motion.div>
      </section>

      {/* Why Join */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="max-w-6xl mx-auto px-4 mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {whys.map((w, i) => (
          <motion.div key={i} variants={fade} className="glass p-6 card-interactive text-center">
            <div className="text-3xl mb-3">{w.icon}</div>
            <h3 className="text-white font-bold text-sm mb-2">{w.title}</h3>
            <p className="text-white/35 text-xs leading-relaxed">{w.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Investment Plans */}
      <section className="section-pad">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-5xl mx-auto text-center">
          <motion.h2 variants={fade} className="text-2xl md:text-3xl font-bold text-white mb-2">{t('franchise.invest')}</motion.h2>
          <motion.p variants={fade} className="text-white/40 mb-12">{t('franchise.investSub')}</motion.p>

          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <motion.div key={i} variants={fade}
                className={`glass p-8 card-interactive relative ${p.popular ? 'ring-2 ring-primary-500/50 shadow-lg shadow-primary-500/10' : ''}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <FiStar className="text-xs" /> Popular
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{t(`franchise.${p.key}`)}</h3>
                <div className="text-3xl font-extrabold gradient-text mb-4">{t(`franchise.${p.key}p`)}</div>
                <p className="text-white/40 text-sm mb-6">{t(`franchise.${p.key}d`)}</p>
                <button onClick={() => setModal(true)} className={p.popular ? 'btn-primary w-full' : 'btn-outline w-full'}>
                  {t('franchise.apply')} <FiArrowRight />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden p-10 md:p-14 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-navy-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Future?</h2>
            <p className="text-white/60 mb-6">Start earning ₹1L–₹2L per kg with our complete support ecosystem.</p>
            <button onClick={() => setModal(true)} className="bg-white text-navy-900 font-bold py-3.5 px-8 rounded-xl hover:bg-white/90 transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer">
              {t('franchise.apply')} <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setModal(false); setSubmitted(false); }} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative glass-strong p-8 w-full max-w-md z-10">
              <button onClick={() => { setModal(false); setSubmitted(false); }} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors cursor-pointer">
                <FiX className="text-xl" />
              </button>

              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="text-primary-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-white/40 text-sm">Our team will contact you within 48 hours.</p>
                  <button onClick={() => { setModal(false); setSubmitted(false); }} className="btn-primary mt-6">Close</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-6">{t('franchise.formTitle')}</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                    <input type="text" placeholder={t('franchise.fname')} className="input-dark" required />
                    <input type="tel" placeholder={t('franchise.phone')} className="input-dark" required />
                    <input type="text" placeholder={t('franchise.city')} className="input-dark" required />
                    <select className="input-dark" required defaultValue="">
                      <option value="" disabled>{t('franchise.budget')}</option>
                      <option>₹1L – ₹3L</option>
                      <option>₹3L – ₹5L</option>
                      <option>₹5L – ₹10L</option>
                      <option>₹10L+</option>
                    </select>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1 !py-2.5">{t('franchise.cancel')}</button>
                      <button type="submit" className="btn-primary flex-1 !py-2.5">{t('franchise.submit')}</button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
