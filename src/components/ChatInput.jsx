import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-navy-950/80 backdrop-blur-xl rounded-b-2xl">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={disabled}
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 disabled:opacity-50 transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!input.trim() || disabled}
          className="absolute right-1 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary-400 to-primary-500 text-navy-950 disabled:opacity-50 disabled:from-white/20 disabled:to-white/20 disabled:text-white/50 transition-colors shadow-lg"
        >
          <FiSend size={16} />
        </motion.button>
      </div>
    </form>
  );
}
