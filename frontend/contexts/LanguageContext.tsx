'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr' | 'am';

interface Translations {
  [key: string]: any;
}

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && ['en', 'fr', 'am'].includes(saved)) {
      setLanguage(saved);
    } else {
      setLanguage('en');
    }
  }, []);

  // Load translations whenever language changes
  useEffect(() => {
    if (!isMounted) return;

    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/locales/${language}.json`);
        const data = await response.json();
        setTranslations(data);
        localStorage.setItem('language', language);
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language, isMounted]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string, defaultValue = key) => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return typeof value === 'string' ? value : defaultValue;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
