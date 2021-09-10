import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from 'src/locales/ko.json';
// import en from 'src/locales/en.json';

const resources = {
  ko: {
    translation: ko,
  },
  // en: {
  //   translation: en,
  // },
};

export const defaultLanguage = 'ko';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    // debug: true,
  });

export const languages = [
  { value: 'ko', name: '한국어' },
  // { value: 'en', name: 'English' },
];

export default i18n;
