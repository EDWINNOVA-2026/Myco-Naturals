import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { FiDollarSign, FiTrendingUp, FiMapPin, FiSend, FiX } from 'react-icons/fi';

const TrainingDays = [
  {
    day: 1,
    title: 'Introduction & Market Understanding',
    icon: '🌱',
    topics: [
      'Overview of Cordyceps militaris and its importance',
      'Health benefits and medicinal value',
      'Market demand, pricing trends, and export potential',
      'Basic farm setup requirements (space, cost, equipment)',
      'Business model and profit overview'
    ],
    practical: 'Understand the complete business potential and basics',
    outcome: 'Master market opportunity and business fundamentals'
  },
  {
    day: 2,
    title: 'PDA Medium Training (Lab Level)',
    icon: '🧪',
    topics: [
      'What is PDA (Potato Dextrose Agar)',
      'Preparation of PDA medium step-by-step',
      'Sterilization techniques (pressure cooker/autoclave)',
      'Culture inoculation process',
      'Contamination control and clean lab practices'
    ],
    practical: 'Prepare PDA plates and perform inoculation',
    outcome: 'Learn lab-level culture preparation'
  },
  {
    day: 3,
    title: 'Liquid Culture Training',
    icon: '💧',
    topics: [
      'Importance of liquid culture in scaling',
      'Preparation of nutrient liquid medium',
      'Inoculation into liquid culture',
      'Incubation and growth monitoring',
      'Identifying healthy vs contaminated culture'
    ],
    practical: 'Create liquid culture and monitor growth',
    outcome: 'Produce high-quality liquid spawn'
  },
  {
    day: 4,
    title: 'Basal Medium & Fruiting',
    icon: '🍚',
    topics: [
      'Preparation of basal substrate (rice-based)',
      'Filling and sterilizing containers',
      'Inoculation using liquid culture',
      'Environmental control (temperature, humidity, light)',
      'Fruiting and harvesting techniques'
    ],
    practical: 'Setup cultivation jars and observe growth stages',
    outcome: 'Complete full cultivation cycle'
  }
];

const SupportCards = [
  {
    icon: '📚',
    title: 'Complete Training',
    description: '4-Day comprehensive cultivation program',
    details: [
      'Day 1: Market & Business Fundamentals',
      'Day 2: PDA Lab-Level Culture Preparation',
      'Day 3: Liquid Culture Scaling',
      'Day 4: Substrate & Fruiting Management'
    ]
  },
  {
    icon: '📦',
    title: 'Raw Material Supply',
    description: 'Premium cultivation essentials',
    details: [
      'High-quality, lab-tested Cordyceps spawn',
      'Nutrient-rich substrates (rice, supplements)',
      'Sterile consumables (bottles, media, tools)',
      'Ready-to-use cultivation kits for beginners',
      'Consistent supply chain support'
    ]
  },
  {
    icon: '🛠️',
    title: 'Technical Guidance',
    description: 'Expert support throughout cultivation',
    details: [
      '24/7 expert support for farmers',
      'Real-time troubleshooting assistance',
      'Environmental optimization guidance',
      'Step-by-step cultivation support',
      'Help in scaling production efficiently'
    ]
  },
  {
    icon: '🤝',
    title: 'Buy-back Guarantee',
    description: 'Assured market for your harvest',
    details: [
      'Guaranteed purchase of your harvest',
      'Fixed and stable pricing model',
      'No market risk for farmers',
      'Direct procurement from your farm',
      'Ensures steady income and business security'
    ]
  }
];

export default function Franchise() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [investment, setInvestment] = useState(200000);
  const [applied, setApplied] = useState(false);
  const [trainingModalOpen, setTrainingModalOpen] = useState(false);
  const [selectedSupportCard, setSelectedSupportCard] = useState(null);
  const monthlyRevenue = Math.round(investment * 0.15);
  const yearlyROI = Math.round((monthlyRevenue * 12 / investment) * 100);

  const isFarmer = user?.role === 'farmer';
  const isApproved = user?.status === 'approved';

  const handleTrainingClick = () => {
    if (!user) {
      alert('Please login to view the training program');
      return;
    }
    if (!isFarmer || !isApproved) {
      alert('Only approved farmers can access the complete training program');
      return;
    }
    setTrainingModalOpen(true);
  };

  const handleSupportCardClick = (card) => {
    setSelectedSupportCard(card);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">{t('franchise.title')}</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ROI Calculator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-primary-400" /> {t('franchise.investment')}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-white/50 text-sm mb-2 block">Investment Amount (₹)</label>
              <input type="range" min="100000" max="1000000" step="50000" value={investment} onChange={e => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500" />
              <div className="text-2xl font-bold text-white mt-2">₹{(investment / 100000).toFixed(1)}L</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Monthly Revenue', value: `₹${(monthlyRevenue / 1000).toFixed(0)}K`, icon: FiDollarSign },
                { label: 'Yearly ROI', value: `${yearlyROI}%`, icon: FiTrendingUp },
                { label: 'Break Even', value: `${Math.ceil(investment / monthlyRevenue)} months`, icon: FiMapPin },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/3 text-center">
                  <item.icon className="text-primary-400 text-lg mx-auto mb-2" />
                  <div className="text-white font-bold text-sm">{item.value}</div>
                  <div className="text-white/30 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Apply */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <FiSend className="text-primary-400" /> {t('franchise.apply')}
          </h3>
          {applied ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h4 className="text-xl font-bold text-white mb-2">Application Submitted!</h4>
              <p className="text-white/40 text-sm">Our team will contact you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setApplied(true); }} className="space-y-4">
              <input type="text" placeholder="Full Name" className="input-field" required />
              <input type="tel" placeholder="Phone Number" className="input-field" required />
              <input type="text" placeholder="City / Location" className="input-field" required />
              <select className="input-field">
                <option value="">Investment Budget</option>
                <option>₹1L - ₹3L</option>
                <option>₹3L - ₹5L</option>
                <option>₹5L - ₹10L</option>
                <option>₹10L+</option>
              </select>
              <textarea placeholder="Tell us about yourself..." className="input-field h-20 resize-none" />
              <button type="submit" className="btn-primary w-full">{t('franchise.apply')}</button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Benefits */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: '🏠', title: 'Small Space', desc: 'Start with just 10x10 ft room' },
          { icon: '📚', title: 'Full Training', desc: 'Complete cultivation & business training' },
          { icon: '🤝', title: 'Full Support', desc: 'Ongoing technical & marketing support' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-card p-6 text-center card-hover">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
            <p className="text-white/40 text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Complete Training & Support Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6">Comprehensive Training & Support</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SupportCards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card p-6 card-hover group relative cursor-pointer hover:border-primary-500/50 border border-white/10 transition-all"
              onClick={() => handleSupportCardClick(card)}>
              <div className="text-3xl mb-3">{card.icon}</div>
              <h4 className="text-white font-semibold text-base mb-2">{card.title}</h4>
              <p className="text-white/60 text-sm mb-4">{card.description}</p>
              <button
                className="btn-primary text-xs py-2 w-full font-medium hover:bg-primary-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSupportCardClick(card);
                }}>
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Training Modal */}
      {trainingModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 p-6 flex items-center justify-between border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white">4-Day Training Program</h2>
                <p className="text-primary-200 text-sm mt-1">Complete Cordyceps Cultivation Mastery</p>
              </div>
              <button onClick={() => setTrainingModalOpen(false)} className="text-white hover:text-primary-200 p-2">
                <FiX size={24} />
              </button>
            </div>

            {/* Training Days Grid */}
            <div className="p-6 grid sm:grid-cols-2 gap-4">
              {TrainingDays.map((day, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">

                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-3xl">{day.icon}</div>
                    <div>
                      <div className="text-primary-300 text-sm font-medium">Day {day.day}</div>
                      <h3 className="text-white font-bold text-base">{day.title}</h3>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <h4 className="text-white/80 font-semibold text-sm mb-2">Topics:</h4>
                    <ul className="space-y-1">
                      {day.topics.map((topic, j) => (
                        <li key={j} className="text-white/60 text-xs flex items-start gap-2">
                          <span className="text-primary-400 mt-1">✓</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical */}
                  <div className="mb-4 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                    <p className="text-white/80 text-xs">
                      <span className="font-semibold text-primary-300">Practical:</span> {day.practical}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-white/80 text-xs">
                      <span className="font-semibold text-green-300">Outcome:</span> {day.outcome}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/5 border-t border-white/10 p-6 flex gap-3">
              <button onClick={() => setTrainingModalOpen(false)}
                className="flex-1 px-6 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                Close
              </button>
              <button className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all">
                Enroll Now
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Support Card Detail Modal */}
      {selectedSupportCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 p-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedSupportCard.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedSupportCard.title}</h2>
                  <p className="text-primary-200 text-sm mt-1">{selectedSupportCard.description}</p>
                </div>
              </div>
              <button onClick={() => setSelectedSupportCard(null)} className="text-white hover:text-primary-200 p-2 flex-shrink-0">
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">What's Included:</h3>
              <div className="space-y-3">
                {selectedSupportCard.details.map((detail, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary-500/50 transition-colors">
                    <div className="text-primary-400 mt-1 flex-shrink-0">✓</div>
                    <div>
                      <p className="text-white font-medium text-sm">{detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info Based on Card Type */}
              {selectedSupportCard.title === 'Complete Training' && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                    <p className="text-white/80 text-sm">
                      <span className="font-semibold text-primary-300">Full Curriculum Available:</span> Click below to view the complete 4-day training program with detailed topics, practical exercises, and outcomes.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSupportCard(null);
                      setTrainingModalOpen(true);
                    }}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all">
                    View Full 4-Day Training Program
                  </button>
                </div>
              )}

              {selectedSupportCard.title === 'Raw Material Supply' && (
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold text-blue-300">Quality Guarantee:</span> All materials are lab-tested and certified for optimal cultivation results.
                  </p>
                </div>
              )}

              {selectedSupportCard.title === 'Technical Guidance' && (
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold text-yellow-300">Availability:</span> Our expert team is available 24/7 to assist you with any cultivation challenges.
                  </p>
                </div>
              )}

              {selectedSupportCard.title === 'Buy-back Guarantee' && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold text-green-300">Security:</span> Your harvest is guaranteed to be purchased at competitive market rates, ensuring stable income.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/5 border-t border-white/10 p-6 flex gap-3">
              <button onClick={() => setSelectedSupportCard(null)}
                className="flex-1 px-6 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                Close
              </button>
              <button className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all">
                Request More Info
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
