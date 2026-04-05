import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPlay, FiPause, FiSquare, FiSkipForward, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceAssistantPlayer({ steps, currentStepIndex, onStepChange, isFinalStep }) {
  const { i18n, t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(parseFloat(localStorage.getItem('voice_speed') || '1'));
  const [autoPlay, setAutoPlay] = useState(localStorage.getItem('voice_autoplay') !== 'false');
  const [showSettings, setShowSettings] = useState(false);
  const [voices, setVoices] = useState([]);
  
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const handleVoiceChanged = () => setVoices(synthRef.current.getVoices());
    synthRef.current.addEventListener('voiceschanged', handleVoiceChanged);
    handleVoiceChanged();
    return () => synthRef.current.removeEventListener('voiceschanged', handleVoiceChanged);
  }, []);

  const getBestVoice = () => {
    const langMap = {
      en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', ml: 'ml-IN', te: 'te-IN', kn: 'kn-IN'
    };
    const targetLang = langMap[i18n.language] || 'en-IN';
    
    // Exact match
    let voice = voices.find(v => v.lang === targetLang);
    // Partial match
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
    }
    // Fallback to Google / any local
    if (!voice) {
      voice = voices.find(v => v.localService) || voices[0];
    }
    return voice;
  };

  const stopSpeaking = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const speakText = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel(); 
    }

    if (!text || isFinalStep) {
      stopSpeaking();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    const voice = getBestVoice();
    if (voice) utterance.voice = voice;
    
    utterance.lang = getBestVoice()?.lang || 'en-US';
    utterance.rate = speed;
    utterance.pitch = 1;

    utterance.onend = () => {
      // Small timeout to allow cleanup
      setTimeout(() => {
        if (autoPlay && !isFinalStep && currentStepIndex < steps.length - 1) {
          onStepChange(currentStepIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 500);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error", e);
      setIsPlaying(false);
    };

    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const togglePlay = () => {
    if (isFinalStep) return;
    
    if (isPlaying) {
      if (isPaused) {
        synthRef.current.resume();
        setIsPaused(false);
      } else {
        synthRef.current.pause();
        setIsPaused(true);
      }
    } else {
      speakText(steps[currentStepIndex]);
    }
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      stopSpeaking();
      onStepChange(currentStepIndex + 1);
    }
  };

  // Effect to handle stage/step changes
  useEffect(() => {
    if (isPlaying && !isPaused && autoPlay) {
      speakText(steps[currentStepIndex]);
    } else {
      stopSpeaking();
    }
    // cleanup
    return () => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, [currentStepIndex, isFinalStep, steps]); // Dependencies trigger read out on step change

  // Updates speed setting
  const changeSpeed = (newSpeed) => {
    setSpeed(newSpeed);
    localStorage.setItem('voice_speed', newSpeed.toString());
    if (isPlaying) {
      // restart current speech with new speed
      speakText(steps[currentStepIndex]);
    }
  };

  // Updates autoplay setting
  const toggleAutoPlay = () => {
    const val = !autoPlay;
    setAutoPlay(val);
    localStorage.setItem('voice_autoplay', val.toString());
  };

  return (
    <div className="bg-navy-800/80 p-4 border border-white/10 rounded-xl shadow-lg mb-6 backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Helper Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/20 text-green-400">
            <span className="text-xl">🎙️</span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Voice Assistant</h3>
            <p className="text-xs text-white/50">
              {isPlaying ? (isPaused ? "Paused" : "Reading step aloud...") : "Ready to read instructions"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePlay}
            disabled={isFinalStep}
            className={`p-3 rounded-full flex items-center justify-center transition-all ${
              isPlaying && !isPaused ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30' : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isPlaying && !isPaused ? "Pause" : "Play"}
          >
            {isPlaying && !isPaused ? <FiPause size={20} /> : <FiPlay size={20} className="translate-x-0.5" />}
          </button>

          <button 
            onClick={stopSpeaking}
            disabled={!isPlaying}
            className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Stop"
          >
            <FiSquare size={18} />
          </button>

          <button 
            onClick={nextStep}
            disabled={isFinalStep || currentStepIndex === steps.length - 1}
            className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next Step"
          >
            <FiSkipForward size={18} />
          </button>
          
          <div className="w-px h-8 bg-white/10 mx-2"></div>

          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-3 rounded-full transition-colors ${showSettings ? 'bg-white/10 text-white' : 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white'}`}
              title="Voice Settings"
            >
              <FiSettings size={18} />
            </button>
            
            <AnimatePresence>
              {showSettings && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-navy-950 border border-white/10 rounded-xl shadow-2xl p-3 z-50 pointer-events-auto"
                >
                  <div className="mb-3">
                    <label className="text-xs text-white/50 font-semibold uppercase tracking-wider block mb-2">Speed</label>
                    <div className="flex gap-1">
                      {[0.75, 1, 1.25].map(s => (
                        <button 
                          key={s} 
                          onClick={() => changeSpeed(s)}
                          className={`flex-1 text-xs py-1.5 rounded-md border ${speed === s ? 'border-primary-500 bg-primary-500/20 text-primary-400' : 'border-white/10 text-white/70 hover:bg-white/5'}`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={autoPlay} 
                        onChange={toggleAutoPlay}
                        className="w-4 h-4 rounded border-white/20 bg-black/50 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors">Auto-play all steps</span>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
