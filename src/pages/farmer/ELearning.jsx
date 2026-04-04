import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiCheckCircle, FiCircle, FiBookOpen, FiPlay } from 'react-icons/fi';

const modules = [
  { id: 1, title: 'Introduction to Cordyceps', lessons: 5, duration: '45 min', completed: true, topics: ['What is Cordyceps?', 'Market Value & Demand', 'Species Overview', 'Business Potential', 'Getting Started'] },
  { id: 2, title: 'Setting Up Your Farm', lessons: 6, duration: '1 hr', completed: true, topics: ['Room Requirements', 'Equipment List', 'Substrate Preparation', 'Sterilization Process', 'Climate Control Setup', 'Safety Protocols'] },
  { id: 3, title: 'Cultivation Process', lessons: 8, duration: '1.5 hr', completed: true, topics: ['Inoculation', 'Incubation Phase', 'Fruiting Conditions', 'Moisture Management', 'Light Cycles', 'CO2 Management', 'Contamination Prevention', 'Growth Monitoring'] },
  { id: 4, title: 'IoT Monitoring Setup', lessons: 5, duration: '1 hr', completed: false, topics: ['Sensor Types', 'ESP32 Setup', 'Dashboard Configuration', 'Alert Thresholds', 'Troubleshooting'] },
  { id: 5, title: 'Harvesting & Processing', lessons: 4, duration: '40 min', completed: false, topics: ['When to Harvest', 'Harvesting Techniques', 'Drying Process', 'Packaging'] },
  { id: 6, title: 'Marketing & Sales', lessons: 5, duration: '50 min', completed: false, topics: ['Market Analysis', 'Pricing Strategy', 'Online Selling', 'B2B Sales', 'Brand Building'] },
];

export default function ELearning() {
  const { t } = useLanguage();
  const [expandedModule, setExpandedModule] = useState(null);
  const completedCount = modules.filter(m => m.completed).length;
  const progress = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{t('farmer.elearning')}</h2>
        <div className="text-primary-400 text-sm font-medium">{progress}% Complete</div>
      </div>

      {/* Progress Bar */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-sm">Course Progress</span>
          <span className="text-white text-sm font-medium">{completedCount}/{modules.length} Modules</span>
        </div>
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" />
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3">
        {modules.map((mod) => (
          <motion.div key={mod.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: mod.id * 0.05 }}
            className="glass-card overflow-hidden card-hover"
          >
            <button onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)} className="w-full p-5 flex items-center gap-4 text-left">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${mod.completed ? 'bg-primary-500/20' : 'bg-white/5'}`}>
                {mod.completed ? <FiCheckCircle className="text-primary-400 text-lg" /> : <span className="text-white/40 font-bold text-sm">{mod.id}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-sm ${mod.completed ? 'text-white' : 'text-white/70'}`}>{mod.title}</h3>
                <div className="flex gap-3 mt-1">
                  <span className="text-white/30 text-xs">{mod.lessons} lessons</span>
                  <span className="text-white/30 text-xs">⏱ {mod.duration}</span>
                </div>
              </div>
              {mod.completed ? (
                <span className="status-optimal text-xs px-3 py-1 rounded-lg font-medium">Done</span>
              ) : (
                <span className="text-white/30 text-xs">Pending</span>
              )}
            </button>
            {expandedModule === mod.id && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="border-t border-white/5 px-5 py-4">
                <div className="space-y-2">
                  {mod.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/3 transition-colors">
                      {mod.completed ? <FiCheckCircle className="text-primary-400 text-sm flex-shrink-0" /> : <FiCircle className="text-white/20 text-sm flex-shrink-0" />}
                      <span className="text-white/60 text-sm">{topic}</span>
                      <FiPlay className="text-white/20 ml-auto text-sm" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
