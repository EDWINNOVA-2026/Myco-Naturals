import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function useVoice() {
  const { i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [voices, setVoices] = useState([]);
  
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const updateVoices = () => setVoices(synthRef.current.getVoices());
    synthRef.current.addEventListener('voiceschanged', updateVoices);
    updateVoices();
    return () => synthRef.current.removeEventListener('voiceschanged', updateVoices);
  }, []);

  const getBestVoice = () => {
    const langMap = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', ml: 'ml-IN', te: 'te-IN', kn: 'kn-IN' };
    const target = langMap[i18n.language] || 'en-IN';
    
    let voice = voices.find(v => v.lang === target) ||
                voices.find(v => v.lang.startsWith(target.split('-')[0])) ||
                voices.find(v => v.localService) || 
                voices[0];
    return voice;
  };

  const stop = () => {
    if (synthRef.current.speaking) synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const play = (text) => {
    if (!text) return;
    stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    const voice = getBestVoice();
    if (voice) utterance.voice = voice;
    
    utterance.lang = voice?.lang || 'en-US';
    utterance.rate = speed;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    } else {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  return { play, stop, togglePause, isPlaying, isPaused, speed, setSpeed };
}
