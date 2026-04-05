import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiX, FiCheckCircle, FiStar, FiClock, FiShield } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };
const WHY_ICONS = ['🎓', '📦', '🛠️', '🤝'];

const TRAINING_PROGRAM = [
  {
    day: "Day 1",
    title: "Introduction & Market Potential",
    icon: "📚", // education
    short: "Include overview, benefits, market demand, ROI, and business opportunities.",
    content: [
      "Overview of mushroom cultivation (focus on Cordyceps militaris)",
      "History and medicinal importance",
      "Health benefits & applications (tea, supplements, extracts)",
      "Market demand in India & global trends",
      "Profit margins and business models",
      "Required investment & ROI estimation",
      "Legal requirements and certifications"
    ],
    bonus: [
      "Case studies of successful growers",
      "Branding & positioning basics"
    ]
  },
  {
    day: "Day 2",
    title: "PDA Medium Training",
    icon: "🔬", // lab
    short: "Include PDA preparation, sterilization, inoculation, contamination control, and lab setup.",
    content: [
      "What is PDA (Potato Dextrose Agar)",
      "Importance in fungal culture growth",
      "Step-by-step preparation of PDA medium",
      "Sterilization techniques (autoclave usage)",
      "Inoculation process (aseptic conditions)",
      "Contamination identification & control",
      "Lab setup basics"
    ],
    bonus: [
      "Troubleshooting contamination issues",
      "Cost-effective lab setup tips"
    ]
  },
  {
    day: "Day 3",
    title: "Liquid Culture Training",
    icon: "🧪", // growth
    short: "Include liquid culture preparation, incubation, scaling, and efficiency tips.",
    content: [
      "Introduction to liquid culture methods",
      "Preparation of nutrient broth",
      "Inoculation techniques for liquid media",
      "Shaking/incubation methods",
      "Growth monitoring techniques",
      "Scaling production using liquid culture"
    ],
    bonus: [
      "Increasing yield efficiency",
      "Common mistakes beginners make"
    ]
  },
  {
    day: "Day 4",
    title: "Basal Medium Training",
    icon: "🌾", // harvest
    short: "Include substrate preparation, inoculation, incubation, harvesting, and packaging.",
    content: [
      "Composition of basal substrate",
      "Substrate preparation techniques",
      "Sterilization & inoculation",
      "Incubation conditions (temperature, humidity, light)",
      "Harvesting process",
      "Drying & storage methods"
    ],
    bonus: [
      "Quality grading",
      "Packaging for tea products"
    ]
  }
];

export default function FranchisePage() {
  const { t } = useTranslation();
  const { user, submitFranchiseApp, simulateApproval } = useAuth();
  const navigate = useNavigate();
  
  const [modal, setModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', budget: '' });
  const [expandedDay, setExpandedDay] = useState(null);

  const whys = Array.from({ length: 4 }, (_, i) => ({ icon: WHY_ICONS[i], title: t(`franchise.w${i + 1}`), desc: t(`franchise.w${i + 1}d`) }));
  const plans = [
    { key: 'plan1', popular: false },
    { key: 'plan2', popular: true },
    { key: 'plan3', popular: false },
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    submitFranchiseApp(formData);
    setSubmitted(true);
  };

  const openAppModal = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setModal(true);
  };

  return (
    <motion.div initial="hidden" animate="show" className="pt-24 pb-16">
      {/* Header */}
      <section className="section-pad bg-gradient-to-b from-navy-950 to-navy-900/60 text-center relative overflow-hidden">
        <motion.div variants={stagger} className="max-w-3xl mx-auto relative z-10">
          <motion.h1 variants={fade} className="text-3xl md:text-5xl font-bold gradient-text mb-4">{t('franchise.title')}</motion.h1>
          <motion.p variants={fade} className="text-white/50 text-lg mb-8">{t('franchise.sub')}</motion.p>
          
          {user?.status === 'pending' && (
            <motion.div variants={fade} className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 inline-block max-w-lg mb-8">
              <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold mb-2">
                <FiClock /> Application Pending Review
              </div>
              <p className="text-white/60 text-sm mb-4">You have already submitted an application. Please wait for our team to contact you.</p>
              <button onClick={() => { simulateApproval(); alert("Demo Mode: You are now an approved Farmer!"); navigate('/dashboard'); }} className="px-4 py-2 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 rounded-lg text-sm font-bold border border-yellow-500/30 transition shadow-lg shadow-yellow-500/10">
                Simulate Approval (Demo)
              </button>
            </motion.div>
          )}

          {user?.status === 'approved' && (
            <motion.div variants={fade} className="bg-primary-500/10 border border-primary-500/20 rounded-2xl p-6 inline-block max-w-lg mb-8">
              <div className="flex items-center justify-center gap-2 text-primary-400 font-bold mb-2">
                <FiShield /> Officially Approved Farmer
              </div>
              <p className="text-white/60 text-sm mb-4">Welcome to the ecosystem. Your franchise portal is fully unlocked.</p>
              <button onClick={() => navigate('/dashboard')} className="btn-primary">
                Open Dashboard <FiArrowRight />
              </button>
            </motion.div>
          )}

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
                <button 
                  onClick={openAppModal} 
                  disabled={user?.role === 'farmer' || user?.status === 'pending'}
                  className={`${p.popular ? 'btn-primary' : 'btn-outline'} w-full disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {user?.role === 'farmer' ? 'Already Joined' : t('franchise.apply')} <FiArrowRight />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Complete Training Program */}
      <section className="section-pad bg-navy-900/40 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full pointer-events-none" />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Training Program</motion.h2>
            <motion.p variants={fade} className="text-white/50 text-lg">Master the art of Cordyceps cultivation in just 4 days with our intensive, hands-on syllabus.</motion.p>
          </div>

          <motion.div variants={stagger} className="flex flex-col gap-4 mb-16">
            {TRAINING_PROGRAM.map((dayData, idx) => {
              const isExpanded = expandedDay === idx;
              return (
                <motion.div key={idx} variants={fade} className="glass overflow-hidden rounded-2xl transition-all duration-300">
                  <button 
                    onClick={() => setExpandedDay(isExpanded ? null : idx)}
                    className={`w-full text-left p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${isExpanded ? 'bg-primary-500/10' : 'hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl shrink-0 transition-colors ${isExpanded ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'bg-navy-950 border border-white/10'}`}>
                        {dayData.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1"><span className="text-primary-400">{dayData.day}:</span> {dayData.title}</h3>
                        <p className="text-white/40 text-sm">{dayData.short}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${isExpanded ? 'border-primary-400 text-primary-400 rotate-90' : 'border-white/10 text-white/40'}`}>
                      <FiArrowRight />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/5"
                      >
                        <div className="p-6 sm:px-10 pb-8 bg-navy-950/30">
                          <ul className="space-y-3 mb-6">
                            {dayData.content.map((point, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <FiCheckCircle className="text-primary-400 mt-1 shrink-0" />
                                <span className="text-white/70 text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="bg-primary-950/30 border border-primary-500/20 rounded-xl p-4">
                            <h4 className="text-primary-400 font-bold mb-2 flex items-center gap-2">👉 Bonus Sessions</h4>
                            <ul className="space-y-1.5">
                              {dayData.bonus.map((bonus, i) => (
                                <li key={i} className="text-white/60 text-sm flex gap-2">
                                  <span className="text-primary-500/50">•</span> {bonus}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bonus Summary Section */}
          <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div variants={fade} className="glass p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gradient-to-tr from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-yellow-500/20">⭐</div>
              <h3 className="text-xl font-bold text-white mb-4">What You’ll Get</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Professional Starter Kit included</li>
                <li>Lifetime Ongoing Support & Guidance</li>
                <li>Exclusive Marketing & Sales Help</li>
              </ul>
            </motion.div>

            <motion.div variants={fade} className="glass p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 text-green-400 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-green-500/20">💰</div>
              <h3 className="text-xl font-bold text-white mb-4">Earning Potential</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>₹1,00,000+ per kg in premium markets</li>
                <li>Consistent passive revenue stream</li>
                <li>Sell directly to our central distribution</li>
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div variants={fade} className="flex justify-center mt-10">
            <button 
              onClick={openAppModal} 
              disabled={user?.role === 'farmer' || user?.status === 'pending'}
              className="btn-primary flex items-center gap-2 !px-8 !py-4 text-lg shadow-xl shadow-primary-500/20 group hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
            >
              📞 Apply Now to Join <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Layer (Replaces original simple CTA) */}

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
                  <p className="text-white/40 text-sm mb-6">Our team will contact you. Your status has been upgraded to Pending.</p>
                  <button onClick={() => { setModal(false); setSubmitted(false); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="btn-primary w-full">View Status</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-6">{t('franchise.formTitle')}</h3>
                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    <input type="text" placeholder={t('franchise.fname', 'Full Name')} className="input-dark" required 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input type="tel" placeholder={t('franchise.phone', 'Phone Number')} className="input-dark" required 
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input type="text" placeholder={t('franchise.city', 'City & State')} className="input-dark" required 
                      value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                    <select className="input-dark text-white/50" required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                      <option value="" disabled>{t('franchise.budget', 'Select Budget Range')}</option>
                      <option value="1">₹1L – ₹3L</option>
                      <option value="3">₹3L – ₹5L</option>
                      <option value="5">₹5L – ₹10L</option>
                      <option value="10">₹10L+</option>
                    </select>
                    <div className="flex gap-3 pt-4 border-t border-white/5">
                      <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1 !py-3">{t('franchise.cancel')}</button>
                      <button type="submit" className="btn-primary flex-1 !py-3">{t('franchise.submit')}</button>
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
