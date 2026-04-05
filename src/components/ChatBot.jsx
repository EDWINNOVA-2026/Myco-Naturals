import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiActivity, FiVolume2, FiSquare, FiPause, FiPlay, FiSettings } from 'react-icons/fi';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getBestAnswer } from '../utils/qaMatcher';
import { useVoice } from '../hooks/useVoice';

const QUICK_ACTIONS = [
  "How to start cultivation?",
  "Ideal temperature and humidity?",
  "Common mistakes?",
  "When to harvest?",
  "Dosage guidance?"
];

export default function ChatBot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your Smart Cultivation Assistant. Ask me anything about Cordyceps militaris!' }
  ]);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  const { play, stop, togglePause, isPlaying, isPaused, speed, setSpeed } = useVoice();

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (userInput) => {
    if (!userInput.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Simulate small completely offline delay
    setTimeout(() => {
      const aiResponse = getBestAnswer(userInput);
      setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: aiResponse }]);
      setLoading(false);
      
      // Auto play the new message
      play(aiResponse);
    }, 400);
  };

  const handleReplayLast = () => {
    const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
    if (lastAiMessage) {
      play(lastAiMessage.text);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-full flex items-center justify-center text-navy-950 shadow-[0_0_15px_rgba(74,222,128,0.3)] z-50 cursor-pointer"
          >
            <FiMessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 sm:w-[400px] w-[calc(100vw-3rem)] h-[600px] max-h-[80vh] flex flex-col glass-strong rounded-2xl shadow-2xl z-50 overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-4 border-b border-white/10 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <FiActivity className="text-primary-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base leading-tight">Smart Assistant</h3>
                  <p className="text-white/50 text-[11px]">Fully Offline • Powered by AI</p>
                </div>
              </div>
              <button 
                onClick={() => { setIsOpen(false); stop(); }}
                className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Voice Controls Sidebar Component */}
            <div className="bg-navy-950/50 border-b border-white/5 px-4 py-2 flex items-center justify-between shadow-inner relative">
              <div className="flex items-center gap-2">
                <button 
                  onClick={isPlaying && !isPaused ? togglePause : handleReplayLast} 
                  className="p-1.5 rounded-full bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition shadow-sm"
                  title="Play / Pause"
                >
                  {isPlaying && !isPaused ? <FiPause size={14} /> : <FiPlay size={14} className="translate-x-px" />}
                </button>
                <button 
                  onClick={stop} 
                  disabled={!isPlaying}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 disabled:opacity-30 transition"
                  title="Stop Audio"
                >
                  <FiSquare size={14} />
                </button>
                <span className="text-xs text-white/40 ml-2">
                  {isPlaying ? (isPaused ? 'Voice Paused' : 'Voice Active 🔊') : 'Voice Assistant'}
                </span>
              </div>
              
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-full transition-colors ${showSettings ? 'bg-white/10 text-white' : 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white'}`}
                title="Voice Settings"
              >
                <FiSettings size={14} />
              </button>

              <AnimatePresence>
                  {showSettings && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="absolute right-4 top-full mt-1 w-40 bg-navy-900 border border-white/10 rounded-lg shadow-xl p-2 z-[100]"
                    >
                      <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider block mb-1">Voice Speed</label>
                      <div className="flex gap-1">
                        {[0.75, 1, 1.25].map(s => (
                          <button 
                            key={s} 
                            onClick={() => { setSpeed(s); setShowSettings(false); }}
                            className={`flex-1 text-xs py-1 rounded border ${speed === s ? 'border-primary-500 bg-primary-500/20 text-primary-400' : 'border-white/10 text-white/70 hover:bg-white/5'}`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              
              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white/5 text-white/50 px-4 py-3 rounded-2xl rounded-tl-sm text-sm flex items-center gap-2">
                    <span className="flex gap-1">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-1.5 h-1.5 bg-white/50 rounded-full"></motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/50 rounded-full"></motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/50 rounded-full"></motion.span>
                    </span>
                    Searching database...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-white/5 bg-navy-900/30 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2 shrink-0">
              {QUICK_ACTIONS.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(action)}
                  disabled={loading}
                  className="inline-block px-3 py-1.5 bg-primary-500/10 text-primary-300 text-xs rounded-full border border-primary-500/20 hover:bg-primary-500/20 transition-colors disabled:opacity-50"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
