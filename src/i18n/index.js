import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ta from './locales/ta.json';
import kn from './locales/kn.json';
import hi from './locales/hi.json';
import te from './locales/te.json';
import ml from './locales/ml.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ta: { translation: ta }, kn: { translation: kn }, hi: { translation: hi }, te: { translation: te }, ml: { translation: ml } },
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
