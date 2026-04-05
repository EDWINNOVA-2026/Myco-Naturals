import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiActivity } from 'react-icons/fi';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const QUICK_ACTIONS = [
  "How to start cultivation?",
  "Ideal temperature and humidity?",
  "Common mistakes?",
  "When to harvest?",
  "Dosage guidance?"
];

// Real AI API endpoint using a free public text completion API
const callRealAI = async (userInput, promptLanguage, history) => {
  const contextData = `
PROJECT CONTEXT:
Startup: MycoNaturals
Products: Dried Cordyceps (₹15,000), Powder (₹8,000), Capsules (₹2,500), Tea (₹1,800).
Franchise: Starter (₹1.5L), Growth (₹3.5L), Enterprise (₹8L+).
Cultivation: 3 Stages - PDA Medium, Liquid Medium, Basal Medium (Brown rice). Time: 60 days.
Sensors: Temp (20-22°C incubation, 16-18°C fruiting), Humidity (80-90%).
`;

  const systemMessage = `You are MycoNaturals AI. Answer succinctly. Use this context: ${contextData}\nRespond in language code: ${promptLanguage}. No medical claims.`;

  // Filter history to just user/ai exchanges for context
  const previousHistory = history
    .filter(msg => msg.id !== 1)
    .map(msg => msg.sender.toUpperCase() + ': ' + msg.text)
    .join('\n');
    
  // Use GET request to bypass CORS preflight issues common in POST from localhosts
  const promptURI = encodeURIComponent(
    systemMessage + "\n\nChat History:\n" + previousHistory + "\n\nUSER: " + userInput + "\nAI: "
  );

  try {
    const res = await fetch(`https://text.pollinations.ai/${promptURI}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.text();
  } catch (err) {
    throw new Error('API Failed');
  }
};

export default function ChatBot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your Smart Cultivation Assistant. Ask me anything about Cordyceps militaris!' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build Prompt Logic
      const systemPrompt = `You are an expert assistant for Cordyceps militaris cultivation. Guide farmers in simple, practical language. Provide step-by-step advice. Include temperature, humidity, and stage-specific suggestions. Avoid medical claims. Respond in language code: ${i18n.language}`;
      
      // Simulate calling an actual API endpoint
      const aiResponse = await callRealAI(userInput, i18n.language, messages);
      
      setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: "Unable to respond right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
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

      {/* Chat Panel Modal/Sidebar */}
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
                  <h3 className="text-white font-bold text-base leading-tight">Smart Cultivation Assistant</h3>
                  <p className="text-white/50 text-[11px]">Ask anything about Cordyceps</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FiX size={20} />
              </button>
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
                    AI is typing...
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
