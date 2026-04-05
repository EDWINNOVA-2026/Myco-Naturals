import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiCircle } from 'react-icons/fi';
import VoiceAssistantPlayer from '../components/VoiceAssistantPlayer';

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Guide() {
  const { t } = useTranslation();
  const [activeStage, setActiveStage] = useState(0);
  const [activeSteps, setActiveSteps] = useState([0, 0, 0]);

  const STAGES = [
    {
      id: 1,
      titleKey: "stage1",
      purposeKey: "stage1p",
      icon: "🧫",
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
      stepCount: 5,
      finalKey: "stage1f",
      image: "stage1.jpg"
    },
    {
      id: 2,
      titleKey: "stage2",
      purposeKey: "stage2p",
      icon: "💧",
      color: "from-teal-500 to-emerald-500",
      shadow: "shadow-teal-500/20",
      stepCount: 5,
      finalKey: "stage2f",
      image: "stage2.jpg"
    },
    {
      id: 3,
      titleKey: "stage3",
      purposeKey: "stage3p",
      icon: "🌾",
      color: "from-orange-500 to-amber-500",
      shadow: "shadow-orange-500/20",
      stepCount: 6,
      finalKey: "stage3f",
      image: "stage3.jpg"
    }
  ];

  const getStageSteps = (stageId) => {
    const steps = [];
    for (let i = 1; i <= STAGES[stageId].stepCount; i++) {
      steps.push({
        titleKey: `s${stageId + 1}step${i}`,
        contentKey: `s${stageId + 1}step${i}c`
      });
    }
    return steps;
  };

  const currentStage = STAGES[activeStage];
  const currentStepIndex = activeSteps[activeStage];
  const currentSteps = getStageSteps(activeStage);
  
  const currentStepTexts = currentSteps.map(step => {
    const title = t(`guide.${step.titleKey}`);
    const contents = t(`guide.${step.contentKey}`, { returnObjects: true }) || [];
    return `${title}. ${contents.join('. ')}`;
  });
  
  const isFinalStep = currentStepIndex === currentSteps.length;

  const setStep = (stepIdx) => {
    setActiveSteps(prev => {
      const next = [...prev];
      next[activeStage] = stepIdx;
      return next;
    });
  };

  const nextStep = () => {
    if (currentStepIndex < currentSteps.length) {
      setStep(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setStep(currentStepIndex - 1);
    }
  };

  return (
    <motion.div initial="hidden" animate="show" className="pt-24 pb-16 min-h-screen flex flex-col">
      {/* Header */}
      <section className="section-pad bg-gradient-to-b from-navy-950 to-navy-900/60 text-center pb-8 md:pb-12 border-b border-white/5">
        <motion.div variants={stagger} className="max-w-3xl mx-auto">
          <motion.span variants={fade} className="badge-green mb-4 inline-flex">{t('guide.badge')}</motion.span>
          <motion.h1 variants={fade} className="text-3xl md:text-5xl font-bold gradient-text mb-4">{t('guide.title')}</motion.h1>
          <motion.p variants={fade} className="text-white/50 text-lg">{t('guide.sub')}</motion.p>
        </motion.div>
      </section>

      <div className="flex-1 bg-navy-900/30">
        <div className="max-w-5xl mx-auto px-4 py-10">
          
          <div className="mb-8 text-center md:text-left">
             <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
              <span className="text-3xl">📘</span> Cultivation Guides
            </h2>
            <p className="text-white/50 text-lg">Select a stage below to view its visual guide and detailed step sequence.</p>
          </div>

          {/* Stage Selector */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStage(idx);
                  setActiveSteps(prev => {
                    const next = [...prev];
                    next[idx] = 0;
                    return next;
                  });
                }}
                className={`p-6 rounded-xl text-center transition-all group ${
                  activeStage === idx 
                    ? `bg-gradient-to-br ${stage.color} shadow-2xl ${stage.shadow}` 
                    : 'bg-white/5 border border-white/10 hover:bg-white/8'
                }`}
              >
                <span className={`text-3xl block mb-2 ${activeStage !== idx && 'group-hover:scale-110'} transition-transform`}>
                  {stage.icon}
                </span>
                <h3 className={`font-bold text-lg ${activeStage === idx ? 'text-white' : 'text-white/70'}`}>
                  {t(`guide.${stage.titleKey}`)}
                </h3>
                <p className={`text-xs mt-1 ${activeStage === idx ? 'text-white/80' : 'text-white/40'}`}>
                  {t(`guide.${stage.purposeKey}`)}
                </p>
              </button>
            ))}
          </div>

          {/* Dynamic Image Container */}
          <div className="mb-12 bg-navy-950/40 border border-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-sm shadow-xl">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeStage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                src={`${import.meta.env.BASE_URL}${currentStage.image}`} 
                alt={t(`guide.${currentStage.titleKey}`)}
                className="w-full h-auto object-contain rounded-xl border border-white/10 shadow-2xl bg-white/5 min-h-[200px]"
                onError={(e) => { e.target.style.display = 'none'; }}
                onLoad={(e) => { e.target.style.display = 'block'; }}
              />
            </AnimatePresence>
          </div>

          <VoiceAssistantPlayer 
            steps={currentStepTexts}
            currentStepIndex={currentStepIndex}
            onStepChange={setStep}
            isFinalStep={isFinalStep}
          />

          {/* Content Area - Two Column Layout */}
          <div className="grid md:grid-cols-12 gap-8">
            {/* Left Column: Step Selector */}
            <div className="md:col-span-3 lg:col-span-3">
              <div className="space-y-2 sticky top-24">
                {currentSteps.map((step, idx) => {
                  const isPast = currentStepIndex > idx;
                  const isCurrent = currentStepIndex === idx;
                  return (
                    <button 
                      key={idx}
                      onClick={() => setStep(idx)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                        isCurrent 
                          ? 'bg-white/10 border border-white/10 shadow-md' 
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        isCurrent || isPast 
                          ? `bg-gradient-to-br ${currentStage.color} text-white` 
                          : 'bg-white/5 text-white/30'
                      }`}>
                        {isPast ? <FiCheck className="text-white" /> : idx + 1}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        isCurrent ? 'text-white' : isPast ? 'text-white/70' : 'text-white/40'
                      }`}>
                         {t(`guide.${currentSteps[idx].titleKey}`)}
                      </span>
                    </button>
                  );
                })}
                
                {/* Final step indicator */}
                <button 
                  onClick={() => setStep(currentSteps.length)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all mt-4 ${
                    isFinalStep 
                      ? 'bg-white/10 border border-white/10 shadow-md' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors ${
                    isFinalStep ? `bg-gradient-to-br ${currentStage.color} text-white` : 'bg-white/5 text-white/30'
                  }`}>
                    🚀
                  </div>
                  <span className={`text-sm font-bold transition-colors ${
                    isFinalStep ? 'text-white' : 'text-white/40'
                  }`}>
                    {t('guide.final')}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Step Content */}
            <div className="md:col-span-9 lg:col-span-9 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isFinalStep ? (
                  <motion.div 
                    key={`step-${activeStage}-${currentStepIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-primary-400 font-semibold text-xs mb-4 tracking-widest uppercase">
                      Step {currentStepIndex + 1} of {currentSteps.length}
                    </div>
                    
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 border-b border-white/5 pb-4">
                      {t(`guide.${currentSteps[currentStepIndex].titleKey}`)}
                    </h2>
                    
                    <ul className="space-y-4 mb-12">
                      {(t(`guide.${currentSteps[currentStepIndex].contentKey}`, { returnObjects: true }) || []).map((item, i) => (
                        <li key={i} className="flex flex-start gap-4 text-white/70 text-lg leading-relaxed">
                          <span className="text-primary-400 mt-1.5 flex-shrink-0"><FiCircle size={14} fill="currentColor" opacity={0.2} /></span>
                          <div className="whitespace-pre-line">{item}</div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={`final-${activeStage}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-10"
                  >
                    <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${currentStage.color} shadow-2xl ${currentStage.shadow} flex items-center justify-center text-4xl mb-6`}>
                      {currentStage.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Stage Complete!</h2>
                    <div className="inline-block mt-4 glass-strong px-6 py-4 rounded-xl border border-white/20">
                      <p className="text-xl font-medium text-white/90">
                        {t(`guide.${currentStage.finalKey}`)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons inside content area at bottom */}
              <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/5">
                <button 
                  onClick={prevStep} 
                  disabled={currentStepIndex === 0}
                  className="btn-outline !py-2.5 !px-5 flex items-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> {t('guide.prev')}
                </button>
                
                <button 
                  onClick={nextStep} 
                  disabled={isFinalStep}
                  className="btn-primary !py-2.5 !px-6 flex items-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isFinalStep ? t('guide.done') : t('guide.next')} {!isFinalStep && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
