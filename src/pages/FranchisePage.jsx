import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiX, FiCheckCircle, FiStar, FiClock, FiShield, FiMapPin, FiCalendar, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sendFranchiseApplicationEmail } from '../utils/emailService';

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };
const WHY_ICONS = ['🎓', '📦', '🛠️', '🤝'];

const TRAINING_HIGHLIGHTS = [
  { icon: '📍', label: 'Training Mode', value: 'Offline (In-Person)', color: 'text-orange-400' },
  { icon: '📅', label: 'Duration', value: '4 Days Intensive', color: 'text-blue-400' },
  { icon: '💰', label: 'Training Fee', value: '₹7,000 Only', color: 'text-green-400' },
  { icon: '🎓', label: 'Certificate', value: 'Completion Certificate', color: 'text-purple-400' },
  { icon: '👥', label: 'Batch Size', value: 'Small Batches (Max 10)', color: 'text-yellow-400' },
  { icon: '📱', label: 'Confirmation', value: 'WhatsApp Notification', color: 'text-primary-400' },
];

const SUPPORT_CARDS = [
  {
    icon: '📚',
    title: 'Complete Training',
    price: '₹7,000',
    badge: 'OFFLINE • IN-PERSON',
    description: '4-Day intensive hands-on offline cultivation program — ₹7,000 per participant',
    details: [
      '📖 DAY 1 - MARKET & BUSINESS FUNDAMENTALS',
      '• Overview of Cordyceps militaris species and characteristics',
      '• Health benefits, medical applications, and market demand',
      '• Global & Indian market analysis with pricing trends',
      '• ROI projections and business opportunity breakdown',
      '• Space requirements, equipment needs, and initial investment',
      '• Setup overview and timeline to first harvest',
      '',
      '🔬 DAY 2 - PDA LAB-LEVEL CULTURE PREPARATION',
      '• Understanding Potato Dextrose Agar (PDA) medium composition',
      '• Step-by-step PDA preparation and sterilization methods',
      '• Autoclave & pressure cooker sterilization techniques',
      '• Culture inoculation process with sterile techniques',
      '• Contamination control & prevention strategies',
      '• Lab setup requirements and hygiene protocols',
      '• Hands-on: Preparing PDA plates and inoculating cultures',
      '',
      '🧪 DAY 3 - LIQUID CULTURE SCALING',
      '• Why liquid media is essential for production scaling',
      '• Nutrient liquid medium preparation and composition',
      '• Liquid culture inoculation procedures',
      '• Shaking, incubation, and optimal growth conditions',
      '• Temperature & pH management for cultures',
      '• Identifying healthy vs. contaminated cultures',
      '• Production efficiency tips and timeline',
      '• Hands-on: Creating liquid starter cultures',
      '',
      '🌾 DAY 4 - SUBSTRATE & FRUITING MANAGEMENT',
      '• Basal substrate preparation using rice and supplements',
      '• Container selection, filling, and sterilization',
      '• Inoculation with prepared liquid culture',
      '• Environmental control: temperature, humidity, light',
      '• Fruiting stage progression and identification',
      '• Harvesting techniques and timing optimization',
      '• Post-harvest processing and quality control',
      '• Packaging and storage best practices',
      '• Common challenges and troubleshooting guide'
    ]
  },
  {
    icon: '📦',
    title: 'Raw Material Supply',
    description: 'Premium, lab-tested cultivation essentials',
    details: [
      '🧬 CORDYCEPS SPAWN & CULTURES',
      '• High-quality, lab-tested Cordyceps militaris spawn strains',
      '• Pure culture lines with guaranteed viability rates 95%+',
      '• Consistent quality control and batch testing protocols',
      '• Multiple spawn types: liquid spawn, grain spawn, sawdust spawn',
      '• Regular supply chain with multiple shipments per month',
      '',
      '🍚 NUTRIENT-RICH SUBSTRATES',
      '• Premium rice bran with optimal nutrient composition',
      '• Sterilized supplement blends for enhanced growth',
      '• Pre-mixed substrate formulations for beginners',
      '• Bulk substrate supply for scaled operations',
      '• Custom formulations based on cultivation stage',
      '',
      '🧼 STERILE CONSUMABLES & TOOLS',
      '• Pre-sterilized cultivation bottles and jars',
      '• PDA media plates and liquid nutrient solutions',
      '• Sterilized inoculation loops and transfer equipment',
      '• Sterile filters and syringes for culture transfers',
      '• Quality assurance certificates with each shipment',
      '',
      '🎁 READY-TO-USE CULTIVATION KITS',
      '• Complete beginner starter kits with all materials',
      '• Step-by-step instruction guides included',
      '• Pre-measured ingredients for consistency',
      '• Video tutorials for kit assembly and use',
      '• Phone support during initial setup',
      '',
      '🚚 SUPPLY CHAIN & LOGISTICS',
      '• Consistent delivery schedules with 95% on-time record',
      '• Temperature-controlled packaging during shipping',
      '• Tracking and proof of delivery for all shipments',
      '• Dedicated supply manager for bulk orders',
      '• Emergency supply options for urgent needs'
    ]
  },
  {
    icon: '🛠️',
    title: 'Technical Guidance',
    description: '24/7 expert support from experienced cultivators',
    details: [
      '📱 24/7 EXPERT SUPPORT CHANNELS',
      '• WhatsApp/Phone support: Immediate response within 30 minutes',
      '• Email support: Detailed technical guidance within 24 hours',
      '• Video call consultation: Weekly scheduled expert sessions',
      '• Community forum: Real-time discussions with 500+ farmers',
      '• Emergency hotline: Priority support for critical issues',
      '',
      '🔧 REAL-TIME TROUBLESHOOTING',
      '• Immediate diagnosis of contamination and diseases',
      '• Photo/video analysis of growth issues',
      '• Customized solutions based on your specific conditions',
      '• Preventive maintenance scheduling and advice',
      '• Regular check-in calls during first 6 months',
      '',
      '🌡️ ENVIRONMENTAL OPTIMIZATION',
      '• Personalized temperature and humidity guidelines',
      '• Climate control equipment recommendations',
      '• Space utilization and rack arrangement optimization',
      '• Lighting setup for fruiting stage optimization',
      '• Ventilation and air quality management',
      '',
      '👨‍🌾 STEP-BY-STEP CULTIVATION SUPPORT',
      '• Daily guidance during critical growth phases',
      '• Weekly progress check-ins and assessments',
      '• Milestone celebrations and motivation calls',
      '• Documentation and progress tracking assistance',
      '• Knowledge base access with 200+ FAQs',
      '',
      '📈 SCALING & PRODUCTION EFFICIENCY',
      '• Multi-batch planning and scheduling',
      '• Capacity expansion strategies and timelines',
      '• Equipment upgrade recommendations',
      '• Labor efficiency optimization',
      '• Production forecasting and planning tools available'
    ]
  },
  {
    icon: '🤝',
    title: 'Buy-back Guarantee',
    description: 'Assured market with guaranteed stable income',
    details: [
      '✅ GUARANTEED PURCHASE COMMITMENT',
      '• Written buy-back agreement for 100% of your harvest',
      '• No quality inspection failures or rejections',
      '• Purchase rate: 95% of cultivation output minimum',
      '• Multi-year contracts available for planning stability',
      '• No middlemen or market volatility concerns',
      '',
      '💰 FIXED & STABLE PRICING MODEL',
      '• Base price: ₹1,00,000+ per kg (varies by grade)',
      '• Premium grade bonus: Extra 10-15% for top quality',
      '• Transparent pricing announced monthly',
      '• Price protection: Guaranteed minimum floor price',
      '• Payment within 48 hours of delivery and inspection',
      '',
      '🛡️ ZERO MARKET RISK FOR FARMERS',
      '• We handle all market logistics and distribution',
      '• Insurance coverage on your entire harvest',
      '• Weather-related loss protection programs',
      '• Crop failure guarantee (replanting support)',
      '• No need to find buyers or negotiate prices',
      '',
      '🚜 DIRECT & CONVENIENT PROCUREMENT',
      '• Farm pickup service (we handle transportation)',
      '• No quality deductions for reasonable variations',
      '• Cold chain maintained from farm to buyer',
      '• Batch processing and quality grading on-site',
      '• Direct payment transfer to your bank account',
      '',
      '💼 STEADY INCOME & BUSINESS SECURITY',
      '• Consistent monthly income enabling financial planning',
      '• Scalable income with each additional cycle',
      '• Support for seasonal crop planning',
      '• Long-term partnership and growth roadmap',
      '• Access to better financing through partnership'
    ]
  }
];

export default function FranchisePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', budget: '' });
  const [selectedSupportCard, setSelectedSupportCard] = useState(null);
  const [trainingModal, setTrainingModal] = useState(false);

  const whys = Array.from({ length: 4 }, (_, i) => ({ icon: WHY_ICONS[i], title: t(`franchise.w${i + 1}`), desc: t(`franchise.w${i + 1}d`) }));
  const plans = [
    { key: 'plan1', popular: false },
    { key: 'plan2', popular: true },
    { key: 'plan3', popular: false },
  ];

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save application to localStorage for your records
      const existingApps = JSON.parse(localStorage.getItem('franchise_applications') || '[]');
      const newApp = {
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toLocaleString(),
        status: 'pending'
      };
      existingApps.push(newApp);
      localStorage.setItem('franchise_applications', JSON.stringify(existingApps));

      // Send email to admin
      const emailResult = await sendFranchiseApplicationEmail(formData);

      console.log('✅ Application saved locally:', newApp);
      console.log('📧 Email sent result:', emailResult);

      alert('✅ Application Submitted Successfully!\n\n📧 Email sent to: thedarvin93@gmail.com\n\n' + (emailResult.message || 'Admin will review and contact you soon.'));

      // Reset form
      setFormData({ name: '', email: '', phone: '', city: '', budget: '', experience: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('❌ Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openAppModal = () => {
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
                <FiClock /> ⏳ Application Under Review
              </div>
              <p className="text-white/60 text-sm">Your franchise application has been received and is being reviewed by our team. We'll contact you within 2-3 business days via phone or email with next steps and approval status.</p>
              <div className="mt-4 pt-4 border-t border-yellow-500/20 text-white/40 text-xs">
                📱 Check your phone and email regularly | ⏸ This usually takes 2-3 business days
              </div>
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
                  className={`${p.popular ? 'btn-primary' : 'btn-outline'} w-full`}
                >
                  {t('franchise.apply')} <FiArrowRight />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== TRAINING SECTION ===== */}
      <section className="section-pad" id="training-section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-6xl mx-auto px-4">
          <motion.div variants={fade} className="text-center mb-12">
            <span className="inline-block bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest">🏫 OFFLINE TRAINING PROGRAM</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">4-Day Cordyceps Cultivation Training</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Join our hands-on, in-person training program and master Cordyceps cultivation from scratch — guided by expert cultivators.</p>
          </motion.div>

          {/* Training Fee Banner */}
          <motion.div variants={fade} className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 rounded-3xl p-8 mb-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, #10b981 0%, transparent 60%), radial-gradient(circle at 70% 50%, #14b8a6 0%, transparent 60%)'}} />
            <div className="relative z-10">
              <p className="text-white/50 text-sm mb-2 uppercase tracking-widest">Complete 4-Day Training Fee</p>
              <div className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-3">₹7,000</div>
              <p className="text-white/60 text-sm mb-6">One-time payment • Includes all materials, study kits & certification</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  id="enroll-training-btn"
                  onClick={() => setTrainingModal(true)}
                  className="btn-primary flex items-center gap-2 !px-6 !py-3 text-sm"
                >
                  🎓 Enroll for Training
                </button>
                <button
                  id="whatsapp-training-btn"
                  onClick={() => window.open(`https://wa.me/919360370893?text=${encodeURIComponent('Hi! I am interested in the 4-Day Cordyceps Cultivation Training (₹7,000). Please share the schedule and batch details.')}`, '_blank')}
                  className="btn-outline flex items-center gap-2 !px-6 !py-3 text-sm"
                >
                  💬 Ask on WhatsApp
                </button>
                <button
                  id="call-training-btn"
                  onClick={() => window.open('tel:+919360370893')}
                  className="flex items-center gap-2 px-6 py-3 text-sm bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-all"
                >
                  📞 Call Us
                </button>
              </div>
            </div>
          </motion.div>

          {/* Training Highlights Grid */}
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {TRAINING_HIGHLIGHTS.map((h, i) => (
              <motion.div key={i} variants={fade} className="glass p-4 rounded-2xl text-center border border-white/10 hover:border-primary-500/30 transition-all">
                <div className="text-2xl mb-2">{h.icon}</div>
                <p className="text-white/40 text-xs mb-1">{h.label}</p>
                <p className={`font-bold text-sm ${h.color}`}>{h.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Day-wise Training Overview */}
          <motion.div variants={fade} className="glass rounded-3xl p-8 mb-10 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">📋 Training Curriculum Overview</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { day: 'Day 1', emoji: '📖', topic: 'Market & Business Fundamentals', desc: 'Market analysis, ROI projections, investment overview & business opportunity breakdown' },
                { day: 'Day 2', emoji: '🔬', topic: 'PDA Lab-Level Culture Prep', desc: 'PDA preparation, sterilization, culture inoculation & contamination control (hands-on)' },
                { day: 'Day 3', emoji: '🧪', topic: 'Liquid Culture Scaling', desc: 'Liquid media preparation, inoculation, temperature & pH management (hands-on)' },
                { day: 'Day 4', emoji: '🌾', topic: 'Substrate & Fruiting Management', desc: 'Basal substrate prep, environmental control, harvesting & post-harvest processing' },
              ].map((d, i) => (
                <div key={i} className="bg-primary-500/5 border border-primary-500/20 rounded-2xl p-5 hover:border-primary-500/40 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">{d.day}</span>
                    <span className="text-xl">{d.emoji}</span>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">{d.topic}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fade} className="flex flex-wrap justify-center gap-4">
            <button
              id="register-training-cta"
              onClick={() => setTrainingModal(true)}
              className="btn-primary flex items-center gap-2 !px-8 !py-4 text-base shadow-xl shadow-primary-500/20 hover:scale-105 transition-all"
            >
              🎓 Register for ₹7,000 Training <FiArrowRight />
            </button>
            <button
              id="view-schedule-btn"
              onClick={() => setSelectedSupportCard(SUPPORT_CARDS[0])}
              className="btn-outline flex items-center gap-2 !px-8 !py-4 text-base hover:scale-105 transition-all"
            >
              📅 View Full Schedule
            </button>
            <button
              id="download-brochure-btn"
              onClick={() => window.open(`https://wa.me/919360370893?text=${encodeURIComponent('Hi! Please send me the training brochure/syllabus for the Cordyceps Cultivation Training Program (₹7,000).')}`, '_blank')}
              className="flex items-center gap-2 px-8 py-4 text-base bg-white/5 border border-white/10 text-white/70 rounded-xl hover:bg-white/10 hover:text-white transition-all"
            >
              📄 Get Brochure on WhatsApp
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Franchise Opportunity - 4 Support Services */}
      <section className="section-pad bg-navy-900/40 border-y border-white/5">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-6xl mx-auto px-4">
          <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">Franchise Opportunity - Complete Support Package</motion.h2>
          <motion.p variants={fade} className="text-white/50 text-center mb-12 max-w-2xl mx-auto">Everything you need to start and scale your Cordyceps cultivation business with confidence and support at every step.</motion.p>

          {/* 4 Support Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SUPPORT_CARDS.map((card, i) => (
              <motion.div key={i} variants={fade}
                onClick={() => setSelectedSupportCard(card)}
                className="glass p-6 card-interactive cursor-pointer hover:border-primary-500/50 border border-white/10 transition-all rounded-2xl group relative">
                {card.price && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg shadow-green-500/30">{card.price}</span>
                  </div>
                )}
                {card.badge && (
                  <div className="mb-2">
                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">{card.badge}</span>
                  </div>
                )}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{card.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed line-clamp-2">{card.description}</p>
                <button className="btn-primary text-xs py-2 w-full font-medium group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-all" onClick={(e) => { e.stopPropagation(); setSelectedSupportCard(card); }}>
                  View Details →
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary Boxes */}
          <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div variants={fade} className="glass p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gradient-to-tr from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-yellow-500/20">⭐</div>
              <h3 className="text-xl font-bold text-white mb-4">What You'll Get</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>🎓 4-Day Hands-On Training Program</li>
                <li>🧬 Premium Lab-Tested Materials & Seeds</li>
                <li>🛠️ 24/7 Expert Technical Support</li>
                <li>🤝 Guaranteed Buy-back Agreement</li>
              </ul>
            </motion.div>

            <motion.div variants={fade} className="glass p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 text-green-400 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-green-500/20">💰</div>
              <h3 className="text-xl font-bold text-white mb-4">Earning Potential</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>₹1,00,000+ per kg in premium markets</li>
                <li>Consistent passive revenue stream</li>
                <li>Multiple harvest cycles per year</li>
                <li>Direct sales to our network</li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div variants={fade} className="flex justify-center">
            <button
              onClick={openAppModal}
              className="btn-primary flex items-center gap-2 !px-8 !py-4 text-lg shadow-xl shadow-primary-500/20 group hover:scale-105 transition-all"
            >
              📞 Apply Now to Join <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </section>

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
                  <h3 className="text-xl font-bold text-white mb-2">✅ Application Submitted!</h3>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                    <p className="text-green-400 font-semibold text-sm mb-1">📱 WhatsApp Notification Sent!</p>
                    <p className="text-white/50 text-xs">Your credentials have been sent to our WhatsApp: <span className="text-primary-400 font-bold">+91 93603 70893</span></p>
                  </div>
                  <p className="text-white/40 text-xs mb-6 leading-relaxed">Our team will review your application and contact you within 2-3 business days via phone or WhatsApp.</p>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-6 text-left">
                    <p className="text-white/60 text-xs"><strong>Next Steps:</strong></p>
                    <ul className="text-white/40 text-xs mt-2 space-y-1">
                      <li>✓ We will verify your details via WhatsApp</li>
                      <li>✓ Schedule a consultation call</li>
                      <li>✓ Approve your franchise application</li>
                      <li>✓ Grant you access to the dashboard</li>
                      <li>✓ Training fee: <span className="text-green-400 font-bold">₹7,000</span> (offline classes)</li>
                    </ul>
                  </div>
                  <button onClick={() => { setModal(false); setSubmitted(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-primary w-full">View Status</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-6">{t('franchise.formTitle')}</h3>
                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    <input type="text" placeholder={t('franchise.fname', 'Full Name')} className="input-dark" required
                      value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <input type="email" placeholder="Email Address" className="input-dark" required
                      value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    <input type="tel" placeholder={t('franchise.phone', 'Phone Number')} className="input-dark" required
                      value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    <input type="text" placeholder={t('franchise.city', 'City & State')} className="input-dark" required
                      value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                    <select className="input-dark text-white/50" required value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })}>
                      <option value="" disabled>{t('franchise.budget', 'Select Budget Range')}</option>
                      <option value="1">₹1L – ₹3L</option>
                      <option value="3">₹3L – ₹5L</option>
                      <option value="5">₹5L – ₹10L</option>
                      <option value="10">₹10L+</option>
                    </select>
                    <div className="flex gap-3 pt-4 border-t border-white/5">
                      <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1 !py-3" disabled={loading}>{t('franchise.cancel')}</button>
                      <button type="submit" disabled={loading} className="btn-primary flex-1 !py-3">{loading ? '⏳ Submitting...' : t('franchise.submit')}</button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Support Card Detail Modal */}
      <AnimatePresence>
        {selectedSupportCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSupportCard(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative glass-strong p-8 w-full max-w-2xl z-10 rounded-2xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedSupportCard(null)} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors cursor-pointer">
                <FiX className="text-2xl" />
              </button>

              <div className="mb-6 flex items-start gap-4">
                <div className="text-5xl">{selectedSupportCard.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedSupportCard.title}</h2>
                  <p className="text-primary-400 text-sm mt-1">{selectedSupportCard.description}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">What's Included:</h3>
              <div className="space-y-3 mb-6">
                {selectedSupportCard.details.map((detail, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-primary-500/5 rounded-lg border border-primary-500/20">
                    <div className="text-primary-400 flex-shrink-0">✓</div>
                    <p className="text-white/80 text-sm">{detail}</p>
                  </motion.div>
                ))}
              </div>

              {selectedSupportCard.title === 'Complete Training' && (
                <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 mb-6">
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold text-primary-300">✨ Complete Curriculum:</span> All 4 days cover cultivation from market understanding through harvest processing with practical hands-on sessions.
                  </p>
                </div>
              )}

              {selectedSupportCard.title === 'Raw Material Supply' && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold text-blue-300">🧪 Quality Guarantee:</span> All materials are lab-tested and certified for optimal cultivation results.
                  </p>
                </div>
              )}

              {selectedSupportCard.title === 'Technical Guidance' && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold text-yellow-300">📞 Availability:</span> Our expert team is available 24/7 to assist you with any cultivation challenges.
                  </p>
                </div>
              )}

              {selectedSupportCard.title === 'Buy-back Guarantee' && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold text-green-300">💰 Security:</span> Your harvest is guaranteed to be purchased at competitive market rates, ensuring stable income.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button onClick={() => setSelectedSupportCard(null)} className="btn-outline flex-1 !py-3">Close</button>
                <button onClick={() => { setSelectedSupportCard(null); openAppModal(); }} className="btn-primary flex-1 !py-3">Apply Now</button>
              </div>
              {selectedSupportCard?.title === 'Complete Training' && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => { setSelectedSupportCard(null); setTrainingModal(true); }}
                    className="w-full py-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-sm font-semibold hover:bg-green-500/20 transition-all"
                  >
                    🎓 Enroll for ₹7,000 Training
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Training Enrollment Modal */}
      <AnimatePresence>
        {trainingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setTrainingModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative glass-strong p-8 w-full max-w-md z-10 rounded-2xl">
              <button onClick={() => setTrainingModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors cursor-pointer">
                <FiX className="text-xl" />
              </button>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🎓</div>
                <h3 className="text-2xl font-bold text-white mb-1">Training Enrollment</h3>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-1">₹7,000</div>
                <p className="text-white/40 text-xs">4-Day Offline Training • In-Person Classes</p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
                <p className="text-orange-400 font-semibold text-sm mb-2">🏫 Offline Training Details</p>
                <ul className="text-white/60 text-xs space-y-1.5">
                  <li>📍 In-Person classes at our Training Center</li>
                  <li>📅 4 Days intensive hands-on program</li>
                  <li>👥 Small batch (Max 10 participants)</li>
                  <li>🧪 Hands-on lab sessions every day</li>
                  <li>🎓 Certificate of Completion provided</li>
                  <li>📱 Your details sent to admin via WhatsApp</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  id="training-whatsapp-enroll-btn"
                  onClick={() => {
                    window.open(`https://wa.me/919360370893?text=${encodeURIComponent('Hi! I want to enroll in the 4-Day Cordyceps Cultivation Training.\n\nName: [Your Name]\nPhone: [Your Phone]\nCity: [Your City]\n\nTraining Fee: ₹7,000\nMode: Offline (In-Person)\n\nPlease confirm next batch dates.')}`, '_blank');
                    setTrainingModal(false);
                  }}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                >
                  💬 Enroll via WhatsApp
                </button>
                <button
                  id="training-call-enroll-btn"
                  onClick={() => window.open('tel:+919360370893')}
                  className="w-full py-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-semibold hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  📞 Call to Enroll: +91 93603 70893
                </button>
                <button
                  id="training-franchise-apply-btn"
                  onClick={() => { setTrainingModal(false); openAppModal(); }}
                  className="w-full py-3 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all"
                >
                  🤝 Apply for Full Franchise Instead
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
