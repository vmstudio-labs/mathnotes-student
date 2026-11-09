import React, { createContext, useContext, useState } from 'react';
import { translations, SupportedLanguage, TranslationSchema } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  isHindi: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  isHindi: false,
  toggleLanguage: () => {},
  setLanguage: () => {},
  t: translations.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const isHindi = language === 'hi';
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, isHindi, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
