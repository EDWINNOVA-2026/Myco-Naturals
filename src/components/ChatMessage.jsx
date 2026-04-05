import { motion } from 'framer-motion';

export default function ChatMessage({ message }) {
  const isAi = message.sender === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full mb-4 ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${
          isAi
            ? 'bg-white/10 text-white rounded-tl-sm border border-white/5 backdrop-blur-sm'
            : 'bg-gradient-to-br from-primary-500/30 to-primary-600/30 text-primary-50 rounded-tr-sm border border-primary-400/20 backdrop-blur-sm'
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}
